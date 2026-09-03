-- ============================================================================
--  Getting a campaign out of a RESTRICTED project, using only the SQL editor.
--
--  When Supabase restricts a project over its egress quota, REST / Auth / Storage / Realtime all
--  answer HTTP 402 -- but the dashboard's SQL editor talks to the database over a different path
--  and keeps working. So does a direct Postgres connection (see tools/dump-direct.py, which is
--  the nicer route if you're willing to reset the database password).
--
--  Run the blocks below in order. Query 2 is the one that matters: run it, press "Download CSV"
--  on the results, then hand the file to tools/csv-to-backup.py, which turns it into the
--  backup/sheets.json that tools/migrate-project.py restore expects.
-- ============================================================================


-- 1) WHAT IS IN HERE ---------------------------------------------------------
--    Row sizes, biggest first. This is also the receipt for the egress problem: every one of
--    these numbers used to be re-sent to every connected player on every single write.
select id,
       campaign,
       owner_name,
       rev,
       pg_size_pretty(pg_column_size(data)::bigint) as row_size,
       pg_column_size(data)                         as bytes
from sheets
order by bytes desc;

--    Totals per campaign, so you know how big the export will be before you ask for it.
select campaign,
       count(*)                                             as rows,
       pg_size_pretty(sum(pg_column_size(data))::bigint)    as total
from sheets
group by campaign
order by total desc;


-- 2) THE EXPORT --------------------------------------------------------------
--    Run this, then press "Download CSV" above the results grid.
--    `data::text` matters: as jsonb the editor renders it as a collapsed object and the CSV gets
--    a truncated preview instead of the real thing. As text it is exported verbatim, and Python's
--    csv module puts the embedded quotes and newlines back together correctly on the other side.
--
--    Drop the `where` to take every campaign.
select id,
       campaign,
       owner_id,
       owner_name,
       name,
       rev,
       updated_at,
       data::text as data
from sheets
where campaign = 'poketicia'
order by id;

--    Then:  python tools/csv-to-backup.py <the downloaded file>.csv --out backup


-- 3) IF THE EDITOR CHOKES ON THE BIG ROWS ------------------------------------
--    The map, PC and encounter rows can be hundreds of KB each and the results grid has to render
--    whatever it is handed. If the export above times out or comes back truncated, take it in two
--    passes: everything small in one go, then the big rows one at a time.

--    (a) everything under 100 KB, in one CSV
select id, campaign, owner_id, owner_name, name, rev, updated_at, data::text as data
from sheets
where campaign = 'poketicia'
  and pg_column_size(data) < 100000
order by id;

--    (b) which ones are left
select id, pg_column_size(data) as bytes
from sheets
where campaign = 'poketicia'
  and pg_column_size(data) >= 100000
order by bytes desc;

--    (c) one row per CSV -- repeat with each id from (b)
select id, campaign, owner_id, owner_name, name, rev, updated_at, data::text as data
from sheets
where id = 'enc_poketicia';

--    csv-to-backup.py accepts several CSVs at once and merges them:
--        python tools/csv-to-backup.py small.csv enc.csv maptokens.csv --out backup


-- 4) WHAT THIS CANNOT GET ----------------------------------------------------
--    Files in the Storage bucket -- map backgrounds, avatars, sprites. Postgres holds only their
--    metadata; the bytes live behind the same blocked gateway. This lists what exists, so you know
--    what you are missing:
select name,
       pg_size_pretty(((metadata->>'size')::bigint)) as size,
       metadata->>'mimetype'                         as mimetype,
       created_at
from storage.objects
where bucket_id = 'images'
order by (metadata->>'size')::bigint desc;

--    To actually recover the pictures, run tools/rescue-from-cache.js in the GM's browser (and the
--    players') -- they were uploaded with a one-year cache-control, so the browsers that have seen
--    them still hold them on disk.
