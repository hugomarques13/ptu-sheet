#!/usr/bin/env python3
"""
Dump a campaign straight out of Postgres, bypassing a restricted project's REST API.

When Supabase restricts a project over its egress quota it returns HTTP 402 from the API gateway --
REST, Auth, Storage and Realtime all refuse -- but the DATABASE itself keeps listening. So when
`migrate-project.py dump` can't get in, this can: it connects over the Postgres wire protocol and
writes exactly the same `backup/sheets.json` that `migrate-project.py restore` expects.

    pip install "psycopg[binary]"
    set PGPASSWORD=<your database password>          (Windows: set / PowerShell: $env:PGPASSWORD=)
    python tools/dump-direct.py --ref sorunoixnsdafxxccmyw --region eu-west-2 --out backup

The password is the DATABASE password, not the publishable key -- Dashboard -> Project Settings ->
Database -> "Reset database password" if you don't have it. It is read from PGPASSWORD, or asked for
at the prompt if that isn't set; it is never written to disk and never appears in the output.

    --campaign poketicia   just one campaign (default: all of them)
    --direct               use db.<ref>.supabase.co instead of the pooler (needs working IPv6)
    --port 5432            session mode (default); 6543 is the pooler's transaction mode

WHAT THIS CANNOT GET
Files in the Storage bucket -- map backgrounds, avatars, sprites. Those live behind the same
restricted HTTP gateway; Postgres only holds their metadata. `tools/rescue-from-cache.js` can often
pull them out of a browser's own HTTP cache instead (they were uploaded with a one-year
cache-control), so run that on the GM's machine before clearing anything.
"""

import argparse, getpass, json, os, sys

try:
    import psycopg
except ImportError:
    sys.exit('psycopg is not installed. Run:  pip install "psycopg[binary]"')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--ref", required=True, help="project ref, e.g. sorunoixnsdafxxccmyw")
    ap.add_argument("--region", default="eu-west-2", help="pooler region (default eu-west-2)")
    ap.add_argument("--port", type=int, default=5432, help="5432 session mode (default), 6543 transaction mode")
    ap.add_argument("--direct", action="store_true", help="connect to db.<ref>.supabase.co (IPv6 only)")
    ap.add_argument("--out", default="backup")
    ap.add_argument("--campaign")
    a = ap.parse_args()

    pw = os.environ.get("PGPASSWORD") or getpass.getpass("Database password for %s: " % a.ref)
    if a.direct:
        host, user = "db.%s.supabase.co" % a.ref, "postgres"
    else:
        host, user = "aws-0-%s.pooler.supabase.com" % a.region, "postgres.%s" % a.ref

    conn = "host=%s port=%d dbname=postgres user=%s password=%s sslmode=require connect_timeout=20" % (
        host, a.port, user, pw)
    print("Connecting to %s:%d as %s" % (host, a.port, user))

    where, params = "", ()
    if a.campaign:
        where, params = " where campaign = %s", (a.campaign,)

    os.makedirs(a.out, exist_ok=True)
    rows = []
    try:
        with psycopg.connect(conn) as cx:
            with cx.cursor() as cur:
                # One row at a time: a map or encounter row can be hundreds of KB and there is no
                # reason to hold the whole campaign in memory twice.
                cur.execute("select id, campaign, owner_id, owner_name, name, data, rev, updated_at"
                            " from public.sheets" + where + " order by id", params)
                for r in cur:
                    rows.append({"id": r[0], "campaign": r[1], "owner_id": r[2], "owner_name": r[3],
                                 "name": r[4], "data": r[5], "rev": r[6],
                                 "updated_at": r[7].isoformat() if r[7] else None})
                    print("  rows: %d" % len(rows), end="\r", flush=True)
    except psycopg.OperationalError as e:
        sys.exit("\nCould not connect: %s\n"
                 "Check the password, and try --port 6543, or --direct if your network has IPv6." % e)

    print("  rows: %d   " % len(rows))
    if not rows:
        sys.exit("The query succeeded but returned no rows -- wrong campaign name?")

    path = os.path.join(a.out, "sheets.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False)
    print("  wrote %s (%.1f MB)\n" % (path, os.path.getsize(path) / 1048576.0))
    for r in rows:
        print("    %-34s %8.1f KB  %s" % (r["id"], len(json.dumps(r["data"])) / 1024.0, r["campaign"]))
    print("\nNow: python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_KEY> --in %s" % a.out)


if __name__ == "__main__":
    main()
