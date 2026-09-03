#!/usr/bin/env python3
"""
Turn CSVs downloaded from the Supabase SQL editor into a restorable backup folder.

The dashboard's SQL editor keeps working when the project's REST API is restricted (HTTP 402), so
`db/export-via-sql.sql` + "Download CSV" is a way out that needs no database password and no extra
packages. This puts the pieces back together:

    python tools/csv-to-backup.py sheets.csv --out backup
    python tools/csv-to-backup.py small.csv enc.csv maptokens.csv --out backup   (merged)

Then:

    python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_KEY> --in backup

Give it as many CSVs as you like; rows are keyed by id, and when the same id turns up twice the
copy with the higher `rev` wins. Every file must have been exported with `data::text as data` --
as raw jsonb the editor hands the grid a collapsed preview and the CSV gets that instead of the
real object. If a `data` cell doesn't parse as JSON, this says which row and stops rather than
writing a backup with a hole in it.
"""

import argparse, csv, json, os, sys

REQUIRED = ("id", "data")
CARRIED = ("id", "campaign", "owner_id", "owner_name", "name", "rev", "updated_at")


def read_csv(path):
    # The editor exports RFC4180 with embedded newlines inside the quoted JSON, and a 600 KB cell
    # is far past csv's default field cap.
    csv.field_size_limit(64 * 1024 * 1024)
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        missing = [c for c in REQUIRED if c not in (reader.fieldnames or [])]
        if missing:
            sys.exit("%s has no %s column. Export with:  select id, campaign, owner_id, owner_name,"
                     " name, rev, updated_at, data::text as data from sheets ..." %
                     (os.path.basename(path), " or ".join(missing)))
        return list(reader)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv", nargs="+", help="one or more CSVs downloaded from the SQL editor")
    ap.add_argument("--out", default="backup")
    a = ap.parse_args()

    by_id = {}
    for path in a.csv:
        rows = read_csv(path)
        kept = 0
        for r in rows:
            rid = (r.get("id") or "").strip()
            if not rid:
                continue
            raw = r.get("data") or ""
            try:
                data = json.loads(raw)
            except json.JSONDecodeError as e:
                sys.exit("%s: row %s has unreadable data (%s).\nIt was probably exported as jsonb "
                         "rather than data::text, or the download was truncated -- re-export just "
                         "that row:\n  select id, campaign, owner_id, owner_name, name, rev, "
                         "updated_at, data::text as data from sheets where id = '%s';"
                         % (os.path.basename(path), rid, e, rid))
            rev = r.get("rev")
            try:
                rev = int(rev) if rev not in (None, "") else -1
            except ValueError:
                rev = -1
            row = {k: (r.get(k) or None) for k in CARRIED if k != "rev"}
            row["id"], row["rev"], row["data"] = rid, rev, data
            prev = by_id.get(rid)
            if prev is None or rev >= prev["rev"]:
                by_id[rid] = row
            kept += 1
        print("  %-28s %d row(s)" % (os.path.basename(path), kept))

    if not by_id:
        sys.exit("No rows found in those files.")

    rows = sorted(by_id.values(), key=lambda r: r["id"])
    os.makedirs(a.out, exist_ok=True)
    path = os.path.join(a.out, "sheets.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False)

    print("\nwrote %s (%.1f MB), %d unique row(s):" % (path, os.path.getsize(path) / 1048576.0, len(rows)))
    for r in rows:
        print("   %-34s %8.1f KB  %s" % (r["id"], len(json.dumps(r["data"])) / 1024.0, r.get("campaign") or ""))

    # The reserved rows the app expects. Missing ones aren't fatal -- a campaign that never opened
    # a shop has no shop row -- but a missing map or roster is worth noticing before you restore.
    camps = {r.get("campaign") for r in rows if r.get("campaign")}
    for c in sorted(camps):
        have = {r["id"] for r in rows}
        expected = {"pc_%s" % c: "PC storage", "mapmeta_%s" % c: "map + backgrounds",
                    "maptokens_%s" % c: "map tokens", "mapfog_%s" % c: "fog of war",
                    "enc_%s" % c: "encounters", "shop_%s" % c: "shops", "rolls_%s" % c: "roll feed"}
        absent = [label for rid, label in expected.items() if rid not in have]
        chars = sum(1 for r in rows if r.get("campaign") == c and r["id"] not in expected)
        print("\n%s: %d character sheet(s)%s" % (c, chars, ("; no " + ", ".join(sorted(absent))) if absent else ""))

    print("\nNow: python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_KEY> --in %s" % a.out)


if __name__ == "__main__":
    main()
