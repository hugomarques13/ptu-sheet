#!/usr/bin/env python3
"""
Merge image rescues from several browsers into one images.json, and emit a smaller rescue script
containing only what is STILL missing.

The rescue has to be run on more than one machine — each browser only kept what it happened to look
at — so this is the loop:

    python tools/merge-rescued-images.py ~/Downloads/ptu-rescue-images-poketicia.json --out backup
    #  -> writes backup/images.json and tools/rescue-images-REMAINING.js
    #  -> run REMAINING.js on the next machine, then merge its download in too

Runs are additive and order does not matter; a name already held is never overwritten by a later
file, so re-merging the same download twice is harmless. Coverage is measured against
backup/image-urls.json, the authoritative list taken from the database export.
"""
import argparse, base64, collections, json, os, re, sys


def folder(name):
    p = name.split("/")
    return p[1] if len(p) > 2 else (p[0] if p else "?")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("rescue", nargs="*", help="ptu-rescue-images-*.json downloads")
    ap.add_argument("--out", default="backup")
    ap.add_argument("--template", default="tools/rescue-images-authoritative.js")
    a = ap.parse_args()

    urls_path = os.path.join(a.out, "image-urls.json")
    if not os.path.exists(urls_path):
        sys.exit("%s not found — run csv-to-backup.py first." % urls_path)
    urls = json.load(open(urls_path, encoding="utf-8"))
    want = {u.split("/object/public/images/")[-1]: u for u in urls}

    images, seen = [], {}
    merged = os.path.join(a.out, "images.json")
    sources = ([merged] if os.path.exists(merged) else []) + a.rescue
    for path in sources:
        try:
            batch = json.load(open(path, encoding="utf-8"))
        except Exception as e:
            sys.exit("could not read %s: %s" % (path, e))
        added = 0
        for o in batch:
            n = o.get("name")
            if not n or n in seen:
                continue
            if not o.get("b64"):
                continue
            seen[n] = True
            images.append(o)
            added += 1
        print("  %-52s +%d" % (os.path.basename(path), added))

    unknown = [n for n in seen if n not in want]
    missing = [n for n in want if n not in seen]

    os.makedirs(a.out, exist_ok=True)
    json.dump(images, open(merged, "w", encoding="utf-8"))
    mb = sum(len(base64.b64decode(o["b64"])) for o in images) / 1048576

    print("\nwrote %s — %d image(s), %.2f MB of actual bytes" % (merged, len(images), mb))
    g = collections.Counter(folder(n) for n in seen if n in want)
    m = collections.Counter(folder(n) for n in missing)
    print("\n%-10s %6s %8s" % ("folder", "have", "missing"))
    for k in sorted(set(g) | set(m)):
        print("%-10s %6d %8d" % (k, g.get(k, 0), m.get(k, 0)))
    print("\nCOVERAGE %d/%d (%.0f%%)" % (len(want) - len(missing), len(want),
                                         100.0 * (len(want) - len(missing)) / max(1, len(want))))
    if unknown:
        print("(%d rescued file(s) not referenced by the current rows — kept anyway)" % len(unknown))

    if not missing:
        print("\nEverything is accounted for. Restore with:")
        print("   python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_KEY> --in %s" % a.out)
        return

    # Re-emit the rescue script with ONLY the missing urls, by swapping the URLS array in the
    # generated script we already know parses. Building the JS from scratch here would risk
    # mangling an escape a second time; a literal splice cannot.
    src = open(a.template, encoding="utf-8", newline="").read()
    new_list = json.dumps([want[n] for n in sorted(missing)], indent=2)
    out_js, n_sub = re.subn(r"const URLS = \[[\s\S]*?\n\];",
                            "const URLS = %s;" % new_list, src, count=1)
    if n_sub != 1:
        sys.exit("could not find the URLS array in %s" % a.template)
    out_js = out_js.replace("ptu-rescue-images-poketicia.json", "ptu-rescue-images-MORE.json")
    out_js = out_js.replace("ptu-rescue-MISSING-poketicia.json", "ptu-rescue-MISSING-MORE.json")
    dest = "tools/rescue-images-REMAINING.js"
    open(dest, "w", encoding="utf-8", newline="\n").write(out_js)
    print("\nStill missing %d. Wrote %s — paste THAT into the console on the next machine,\n"
          "then merge its ptu-rescue-images-MORE.json download back in here." % (len(missing), dest))


if __name__ == "__main__":
    main()
