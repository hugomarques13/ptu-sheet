# Moving the campaign to a new Supabase project

Written after the third egress blow-out (2026-09-03), when the old project came back
`HTTP 402 — Service for this project is restricted … exceed_egress_quota` on every endpoint
(REST, Auth, Storage and Realtime alike) and "couldn't connect to the campaign" was really
"the database refuses every request".

Do the two things in order. Moving to a fresh project without step 0 just buys a few weeks
before the same 5 GB is gone again.

---

## 0. The leak is fixed in the app — deploy it

`app.js?v=427` stops the app from re-downloading rows it already has. In short:

* **Row changes travel as ops, not as rows.** Supabase Realtime's `postgres_changes` sends the
  *entire* changed row — the whole `data` jsonb — to every subscribed client on every write, and a
  row over its ~1 MB limit arrives truncated, which made each client re-`SELECT` the whole thing.
  That is the bill. The writer now broadcasts the same field-level ops it sent the server (a couple
  of hundred bytes) and peers replay them. `postgres_changes` sits behind `PG_CHANGES = false`;
  **do not turn it back on.**
* **Resync asks for `id,rev` first.** `resyncCloud()` used to re-read the whole campaign on every
  tab focus and every two quiet minutes, per client. It now polls ids and revs and reads back only
  the rows whose rev actually moved.
* **Tab focus is throttled** to once per 8 s — on a phone `visibilitychange` fires on every app
  switch and every screen unlock.

Both `db/new-db-setup.sql` and `db/patch-ops.sql` are unchanged; the new scheme relies on
`ptu_apply_ops` bumping `rev` by exactly one, which the trigger already does.

---

## 1. Get the data out of the old project

**The restriction is enforced at the HTTP gateway only. The database itself keeps listening.**
Verified on 2026-09-03 against the restricted project: every REST/Auth/Storage/Realtime endpoint
answered 402, while all three Postgres endpoints — the pooler on 5432 and 6543, and
`db.<ref>.supabase.co` on 5432 over IPv6 — completed a TCP connect and answered an `SSLRequest`
with `S`. So a project that Supabase will only un-restrict for money can still be emptied for free.

There are two ways in, both free. Use whichever you already have.

### A. The dashboard SQL editor — no password, no packages

The SQL editor reaches the database on a different path from the public API, so it keeps working
while everything else answers 402. `db/export-via-sql.sql` has the queries; the short version is:

```sql
select id, campaign, owner_id, owner_name, name, rev, updated_at, data::text as data
from sheets where campaign = 'poketicia' order by id;
```

Run it, press **Download CSV**, then:

```bash
python tools/csv-to-backup.py sheets.csv --out backup
```

`data::text` is the part that matters — exported as raw `jsonb` the editor hands the results grid a
collapsed preview and that preview is what lands in the CSV. The converter takes several CSVs and
merges them (higher `rev` wins), so if the editor struggles with the big rows you can export
everything small in one pass and the map/encounter rows one at a time; block 3 of
`export-via-sql.sql` has those queries. It refuses to write a backup with an unparseable row in it
rather than leaving you a hole to find later.

### B. Straight over Postgres — one command, complete

Needs the **database password** (not the publishable key). Dashboard → Project Settings → Database
→ *Reset database password* if you don't have it; that page stays reachable on a restricted project.

```bash
pip install "psycopg[binary]"
```
```bash
python tools/dump-direct.py --ref <old-ref> --region eu-west-2 --out backup
```

It asks for the password at the prompt (or reads `PGPASSWORD`), never writes it anywhere, and
produces exactly the `backup/sheets.json` that `restore` below expects. `--campaign poketicia` for
one campaign; `--port 6543` or `--direct` if the default connection is refused.

### C. If the project is un-restricted after all

Then the plain REST route is simpler and is the only one that also brings the Storage bucket down
with it:

```bash
python tools/migrate-project.py dump --url https://<old-ref>.supabase.co --key <old publishable key> --out backup
```

### The images

Map backgrounds, avatars and sprites live in the Storage bucket, behind the gateway that returns
402 — Postgres holds only their metadata, so neither A nor B can bring them
(block 4 of `export-via-sql.sql` lists what exists, so you know what's missing). They were uploaded
with `cacheControl: 31536000`, though, so **any browser that has looked at them in the last year
still has them on disk**. `tools/rescue-from-cache.js`, pasted into the console on the deployed
page, re-fetches every referenced image with `cache: "force-cache"` and downloads the ones that
come back. Run it on the GM's machine **before** clearing anything, and on the players' machines
too — between them they usually cover the whole set. It writes `ptu-rescue-images-<campaign>.json`,
which `restore` uploads straight into the new bucket.

`tools/rescue-images-authoritative.js` is the better one to run for the images once you already
have a real export: `rescue-from-cache.js` derives its URL list from localStorage — only what that
device last saw — whereas this one has the **257 URLs referenced by the actual database** baked in,
extracted from `backup/sheets.json`, so nothing is missed because a device's snapshot was stale. It
also writes `ptu-rescue-MISSING-<campaign>.json` listing exactly what that browser could not find,
so you know what to go looking for on the next machine. Regenerate it if the rows change.

Two tools finish the job once the rescues are in:

* `tools/merge-rescued-images.py <downloads...>` merges every machine's rescue into
  `backup/images.json` (additive, idempotent, dedupes by name), prints coverage against
  `backup/image-urls.json`, and re-emits `tools/rescue-images-REMAINING.js` holding only what is
  still missing — so each successive machine runs a shorter list. NOTE: separate *tabs* of the same
  browser profile share one HTTP cache and add nothing; it takes a different profile or machine.
* `tools/match-local-maps.py <folder> [--apply]` covers what no cache had. Re-uploading a map
  through the app would mint a NEW uid path and lose the image's placement (x/y/w/h) and layer
  order, so this instead matches your local files to the exact paths the rows already reference,
  identifying them by **pixel dimensions** read from the file header (ties broken on filename vs
  map name; anything still ambiguous is reported, never guessed). `backup/missing-maps.json` is the
  worklist it reads.

That same script also rebuilds the **rows** out of localStorage, as a fallback if the direct
Postgres dump can't be made to work. It is strictly worse than the real dump — it is only what that
device last saw — so use it for the images and only fall back to it for the sheets.

---

## 2. Stand up the new project

1. **New Supabase project.** Pick the region closest to the table (the old one was `eu-west-2`).
2. **SQL Editor → New query → paste all of `db/new-db-setup.sql` → Run.** That is the whole
   schema: the `sheets` table and index, RLS, the `rev` column and its bump trigger, Realtime on
   the table, `ptu_apply_ops`, and the public `images` bucket with its policies.
3. **Restore:**

   ```bash
   python tools/migrate-project.py restore --url https://<new-ref>.supabase.co --key <new publishable key> --in backup
   ```

   Rows go in at `rev 0` on purpose — the new database shouldn't inherit a version history it never
   lived through, and every client re-reads the campaign on connect anyway. `restore` reads
   `<in>/images.json` in either shape: the `file` entries `dump` writes, or the inline `b64` entries
   the browser rescue produces — so drop the rescued `images.json` next to a Postgres-dumped
   `sheets.json` and one command uploads both.
4. **Rewrite the image URLs — do not skip this.** `restore` puts the images in the new bucket at
   their original *paths*, but the rows store **absolute** urls carrying the OLD project ref, so
   restoring them unchanged leaves every avatar, token, map background and shop icon pointing at
   the dead project. The data verifies perfectly and the app still looks broken:

   ```bash
   python tools/rehost-image-urls.py --old <old-ref> --new <new-ref> --in backup
   python tools/migrate-project.py restore --url https://<new-ref>.supabase.co --key <new key> --in backup --no-images
   ```

   It refuses to run if the old host appears anywhere outside a Storage path, and is idempotent.

5. **Check it landed.** If the old project is readable, put the two side by side:

   ```bash
   python tools/migrate-project.py verify --url https://<old-ref>.supabase.co --key <old key> --to-url https://<new-ref>.supabase.co --to-key <new key>
   ```

   If it isn't, compare the new project against the dump instead — the row list and byte sizes
   `dump-direct.py` printed are the record of what went in.
6. **Point the app at it.** In `config.js` set `url` and `anonKey` to the new project
   (`gmCode` stays as it is). In `index.html` update the `preconnect` hint to the new host **and**
   bump `app.js?v=`. Also bump `CACHE` in `sw.js`: `config.js` is requested BARE, with no `?v=`, so
   the service worker's cache-first branch will keep serving the old project's config until the
   cache name changes — bumping `app.js?v=` alone does not evict it. Players who still see the old
   project after deploying should tap 🔄 (forceRefresh), which clears both layers.
7. Deploy, then everyone reconnects with the same campaign code and the same names.

---

## Keeping an eye on it

**Reports → Database / Usage → Egress**, once a week. The shape to expect now is a flat line of
tens of MB a day rather than one 2.5 GB spike. If it ever climbs again, the question to ask first
is *"what is sending whole rows?"* — that has been the answer all three times:

1. images stored as base64 inside the `data` jsonb → moved to the `images` bucket;
2. fog-of-war riding along in the hot tokens row → split into `mapfog_<campaign>` and packed;
3. `postgres_changes` echoing every row to every client → replaced by op broadcasts (this one).
