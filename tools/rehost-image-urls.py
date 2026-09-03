#!/usr/bin/env python3
"""
Rewrite Storage image URLs in a backup from the OLD project host to the NEW one.

MISSING STEP IN THE MIGRATION, and a silent one: `restore` re-uploads the images to the new
bucket at their original PATHS, but the rows store ABSOLUTE urls
(https://<old-ref>.supabase.co/storage/v1/object/public/images/...). Restore them unchanged and
every avatar, token, map background and shop icon still points at the old project - which, being
restricted, answers 402. The data looks perfect and the app looks broken.

Paths are unchanged (uploads are content-addressed), so only the host swaps.

    python tools/rehost-image-urls.py --old <old-ref> --new <new-ref> --in backup
    python tools/migrate-project.py restore --url https://<new-ref>.supabase.co --key <key> \
           --in backup --no-images          # rows only; images are already up

Idempotent: re-running finds nothing left to change.
"""
import argparse, json, os, re, sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--old", required=True, help="old project ref (the subdomain, not the full url)")
    ap.add_argument("--new", required=True, help="new project ref")
    ap.add_argument("--in", dest="inp", default="backup")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    p = os.path.join(a.inp, "sheets.json")
    raw = open(p, encoding="utf-8").read()
    old = "https://%s.supabase.co" % a.old
    new = "https://%s.supabase.co" % a.new

    n = raw.count(old)
    stray = [u for u in set(re.findall(re.escape(old) + r'[^"\ ]*', raw))
             if "/storage/v1/object/public/" not in u]
    if stray:
        print("REFUSING: the old host also appears outside a Storage path, so a blind swap is not")
        print("safe. Inspect these first:")
        for u in sorted(stray)[:20]:
            print("   " + u)
        sys.exit(1)

    print("%d occurrence(s) of %s -> %s" % (n, old, new))
    if not n:
        print("nothing to do (already rehosted)")
        return
    if a.dry_run:
        print("(dry run — nothing written)")
        return

    out = raw.replace(old, new)
    # sanity: still valid JSON, same number of rows, and no old host left
    rows = json.loads(out)
    body = rows["rows"] if isinstance(rows, dict) and "rows" in rows else rows
    assert out.count(old) == 0, "old host survived the rewrite"
    assert len(body) == len(json.loads(raw) if not isinstance(json.loads(raw), dict)
                            else json.loads(raw)["rows"]), "row count changed"
    open(p, "w", encoding="utf-8").write(out)
    print("wrote %s — %d row(s), %d url(s) now on the new host" % (p, len(body), n))


if __name__ == "__main__":
    main()
