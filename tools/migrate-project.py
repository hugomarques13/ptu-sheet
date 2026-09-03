#!/usr/bin/env python3
"""
Move a PTU Sheet campaign from one Supabase project to another.

Standard library only -- no pip install, no psql, no database password. Everything goes through
the REST + Storage APIs with the project's publishable ("anon") key, which is all the `sheets`
table's RLS policy needs.

It is deliberately two steps, because the source project is the one you are trying to get away
from and it may only be readable for a short while:

    python tools/migrate-project.py dump    --url <OLD_URL> --key <OLD_ANON_KEY> --out backup
    python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_ANON_KEY> --in  backup

`dump` writes everything to disk and touches nothing. Run it the moment the old project answers;
after that you have a complete offline copy and can take as long as you like over the rest.

  --campaign poketicia   limit both steps to one campaign (default: every campaign in the project)
  --no-images            skip the Storage bucket (map backgrounds, avatars, sprites)

Before `restore`, run db/new-db-setup.sql once in the NEW project's SQL editor -- it creates the
table, the rev trigger, ptu_apply_ops and the images bucket. Then put the new URL + key into
config.js and everyone reconnects to the same campaign code as before.
"""

import argparse, base64, json, os, sys, urllib.error, urllib.parse, urllib.request

PAGE = 20          # rows per request: sheets are big (a map row can be hundreds of KB)
TIMEOUT = 120


# ───────────────────────────── plumbing ─────────────────────────────
def call(method, url, key, body=None, headers=None, raw=False):
    hdrs = {"apikey": key, "Authorization": "Bearer " + key}
    if headers:
        hdrs.update(headers)
    data = None
    if body is not None and not isinstance(body, (bytes, bytearray)):
        data = json.dumps(body).encode("utf-8")
        hdrs.setdefault("Content-Type", "application/json")
    elif body is not None:
        data = body
    req = urllib.request.Request(url, data=data, headers=hdrs, method=method)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            payload = r.read()
            if raw:
                return payload
            return json.loads(payload) if payload else None
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "replace")[:400]
        if e.code == 402:
            die("The project at %s is RESTRICTED by Supabase (HTTP 402):\n  %s\n"
                "Nothing can be read or written until that is lifted in the dashboard." % (base_of(url), detail))
        die("%s %s -> HTTP %s\n  %s" % (method, url, e.code, detail))
    except urllib.error.URLError as e:
        die("%s %s -> %s" % (method, url, e.reason))


def base_of(url):
    p = urllib.parse.urlsplit(url)
    return p.scheme + "://" + p.netloc


def die(msg):
    print("\n" + msg, file=sys.stderr)
    sys.exit(1)


def norm_url(u):
    return u.rstrip("/")


# ───────────────────────────── dump ─────────────────────────────
def dump_rows(url, key, campaign):
    """Every sheets row, a page at a time. Ordered by id so paging is stable."""
    rows, offset = [], 0
    where = "&campaign=eq." + urllib.parse.quote(campaign) if campaign else ""
    while True:
        q = "%s/rest/v1/sheets?select=*&order=id.asc&limit=%d&offset=%d%s" % (url, PAGE, offset, where)
        page = call("GET", q, key) or []
        rows.extend(page)
        print("  rows: %d" % len(rows), end="\r", flush=True)
        if len(page) < PAGE:
            break
        offset += PAGE
    print("  rows: %d   " % len(rows))
    return rows


def list_objects(url, key, prefix=""):
    """Storage list is one folder deep and pages, so walk it. Folder entries come back with id=None."""
    out, offset = [], 0
    while True:
        body = {"prefix": prefix, "limit": 100, "offset": offset,
                "sortBy": {"column": "name", "order": "asc"}}
        page = call("POST", "%s/storage/v1/object/list/images" % url, key, body) or []
        for o in page:
            name = (prefix + "/" + o["name"]) if prefix else o["name"]
            if o.get("id") is None:
                out.extend(list_objects(url, key, name))       # a folder
            else:
                out.append({"name": name, "type": (o.get("metadata") or {}).get("mimetype") or "application/octet-stream"})
        if len(page) < 100:
            break
        offset += 100
    return out


def cmd_dump(a):
    url = norm_url(a.url)
    os.makedirs(a.out, exist_ok=True)
    print("Reading %s%s" % (base_of(url), (" (campaign %s)" % a.campaign) if a.campaign else ""))

    rows = dump_rows(url, a.key, a.campaign)
    with open(os.path.join(a.out, "sheets.json"), "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False)
    size = os.path.getsize(os.path.join(a.out, "sheets.json"))
    print("  wrote sheets.json (%.1f MB)" % (size / 1048576.0))
    for r in rows:
        print("    %-34s %8.1f KB  %s" % (r["id"], len(json.dumps(r.get("data"))) / 1024.0, r.get("campaign", "")))

    if a.no_images:
        print("  images: skipped")
        return
    print("Reading the images bucket")
    try:
        objs = list_objects(url, a.key)
    except SystemExit:
        raise
    except Exception as e:
        print("  images: could not be listed (%s) -- carrying on without them" % e)
        return
    idir = os.path.join(a.out, "images")
    os.makedirs(idir, exist_ok=True)
    index = []
    for i, o in enumerate(objs, 1):
        blob = call("GET", "%s/storage/v1/object/public/images/%s" % (url, urllib.parse.quote(o["name"])),
                    a.key, raw=True)
        local = o["name"].replace("/", "__")
        with open(os.path.join(idir, local), "wb") as f:
            f.write(blob)
        index.append({"name": o["name"], "file": local, "type": o["type"]})
        print("  images: %d/%d" % (i, len(objs)), end="\r", flush=True)
    with open(os.path.join(a.out, "images.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False)
    print("  images: %d saved   " % len(index))
    print("\nDone. The whole campaign is now in ./%s -- the old project is no longer needed." % a.out)


# ───────────────────────────── restore ─────────────────────────────
def cmd_restore(a):
    url = norm_url(a.url)
    with open(os.path.join(a.inp, "sheets.json"), encoding="utf-8") as f:
        rows = json.load(f)
    if a.campaign:
        rows = [r for r in rows if r.get("campaign") == a.campaign]
    if not rows:
        die("Nothing to restore from ./%s" % a.inp)

    # Let the new project own rev and updated_at: the trigger starts every inserted row at rev 0,
    # and every client re-reads the campaign on connect anyway. Carrying stale revs across would
    # only give the new database a version history it never lived through.
    payload = [{k: r[k] for k in ("id", "campaign", "owner_id", "owner_name", "name", "data") if k in r}
               for r in rows]

    print("Writing %d rows to %s" % (len(payload), base_of(url)))
    for i in range(0, len(payload), 5):
        chunk = payload[i:i + 5]
        call("POST", "%s/rest/v1/sheets" % url, a.key, chunk,
             {"Prefer": "resolution=merge-duplicates,return=minimal"})
        print("  rows: %d/%d" % (min(i + 5, len(payload)), len(payload)), end="\r", flush=True)
    print("  rows: %d/%d   " % (len(payload), len(payload)))

    ipath = os.path.join(a.inp, "images.json")
    if a.no_images or not os.path.exists(ipath):
        print("  images: skipped")
    else:
        with open(ipath, encoding="utf-8") as f:
            index = json.load(f)
        for i, o in enumerate(index, 1):
            # Two shapes: `file` points at backup/images/… (from `dump`), `b64` carries the bytes
            # inline (from tools/rescue-from-cache.js, which pulls them out of a browser's cache).
            if "b64" in o:
                blob = base64.b64decode(o["b64"])
            else:
                with open(os.path.join(a.inp, "images", o["file"]), "rb") as f:
                    blob = f.read()
            call("POST", "%s/storage/v1/object/images/%s" % (url, urllib.parse.quote(o["name"])),
                 a.key, blob, {"Content-Type": o["type"], "x-upsert": "true"})
            print("  images: %d/%d" % (i, len(index)), end="\r", flush=True)
        print("  images: %d uploaded   " % len(index))

    print("\nDone. Put this project's URL + publishable key in config.js, bump app.js?v= in\n"
          "index.html, deploy, and everyone reconnects with the same campaign code.")


# ───────────────────────────── verify ─────────────────────────────
def cmd_verify(a):
    """Ids and byte sizes on both sides, so you can see the copy actually landed."""
    for label, url, key in (("OLD", a.url, a.key), ("NEW", a.to_url, a.to_key)):
        u = norm_url(url)
        where = "&campaign=eq." + urllib.parse.quote(a.campaign) if a.campaign else ""
        rows = call("GET", "%s/rest/v1/sheets?select=id,rev,campaign&order=id.asc%s" % (u, where), key) or []
        print("%s %s: %d rows" % (label, base_of(u), len(rows)))
        for r in rows:
            print("   %-34s rev %s" % (r["id"], r.get("rev")))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    d = sub.add_parser("dump", help="read a project into a local folder")
    d.add_argument("--url", required=True); d.add_argument("--key", required=True)
    d.add_argument("--out", default="backup"); d.add_argument("--campaign")
    d.add_argument("--no-images", action="store_true"); d.set_defaults(fn=cmd_dump)

    r = sub.add_parser("restore", help="write a local folder into a project")
    r.add_argument("--url", required=True); r.add_argument("--key", required=True)
    r.add_argument("--in", dest="inp", default="backup"); r.add_argument("--campaign")
    r.add_argument("--no-images", action="store_true"); r.set_defaults(fn=cmd_restore)

    v = sub.add_parser("verify", help="list both projects' rows side by side")
    v.add_argument("--url", required=True); v.add_argument("--key", required=True)
    v.add_argument("--to-url", required=True); v.add_argument("--to-key", required=True)
    v.add_argument("--campaign"); v.set_defaults(fn=cmd_verify)

    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
