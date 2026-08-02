-- ============================================================================
--  PTU Sheet — COMPLETE fresh-database setup (run ONCE on a brand-new project)
--  Supabase Dashboard → SQL Editor → New query → paste ALL of this → Run.
--  Safe to re-run. Sets up everything the current app expects:
--    sheets table + index + RLS, rev column + bump trigger, Realtime,
--    the ptu_apply_ops field-level sync function, AND the images Storage bucket.
-- ============================================================================

-- 1) core table -------------------------------------------------------------
create table if not exists sheets (
  id          text primary key,
  campaign    text not null,
  owner_id    text not null,
  owner_name  text,
  name        text,
  data        jsonb not null,
  updated_at  timestamptz default now()
);
create index if not exists sheets_campaign_idx on sheets(campaign);

alter table sheets enable row level security;
drop policy if exists "campaign access" on sheets;
create policy "campaign access" on sheets
  for all to anon using (true) with check (true);

-- enable realtime so edits show up live
alter publication supabase_realtime add table sheets;

-- 2) server-owned version counter + timestamp (conflict-safe sync) ----------
alter table sheets add column if not exists rev bigint not null default 0;

create or replace function sheets_bump_rev() returns trigger as $$
begin
  new.updated_at := now();
  if (tg_op = 'UPDATE') then
    new.rev := old.rev + 1;
  else
    new.rev := coalesce(new.rev, 0);
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists sheets_bump_rev_trg on sheets;
create trigger sheets_bump_rev_trg
  before insert or update on sheets
  for each row execute function sheets_bump_rev();

-- 3) field-level ("compartmentalized") sync function ------------------------
create or replace function ptu_apply_ops(p_id text, p_meta jsonb, p_ops jsonb)
returns jsonb
language plpgsql
as $$
declare
  cur     jsonb;
  op      jsonb;
  seg     jsonb;
  path    text[];
  node    jsonb;
  key     text;
  idx     int;
  nsegs   int;
  i       int;
  ok      boolean;
  newrev  bigint;
  newts   timestamptz;
begin
  select data into cur from sheets where id = p_id for update;
  if not found then
    return jsonb_build_object('missing', true);
  end if;

  for op in select value from jsonb_array_elements(p_ops)
  loop
    path  := array[]::text[];
    node  := cur;
    ok    := true;
    nsegs := jsonb_array_length(op->'p');
    i     := 0;

    for seg in select value from jsonb_array_elements(op->'p')
    loop
      i := i + 1;

      if jsonb_typeof(seg) = 'object' then
        idx := null;
        if jsonb_typeof(node) = 'array' then
          select ord - 1 into idx
            from jsonb_array_elements(node) with ordinality as t(elem, ord)
           where elem->>'id' = seg->>'id'
           limit 1;
        end if;
        if idx is null then ok := false; exit; end if;
        path := path || idx::text;
        node := node -> idx;
      else
        key  := seg #>> '{}';
        path := path || key;
        node := node -> key;
      end if;

      if i < nsegs and node is null then
        if op ? 'd' then ok := false; exit; end if;
        cur  := jsonb_set(cur, path, '{}'::jsonb, true);
        node := '{}'::jsonb;
      end if;
    end loop;

    if not ok or nsegs = 0 then continue; end if;

    if op ? 'd' then
      cur := cur #- path;
    elsif op ? 'a' then
      if jsonb_typeof(coalesce(cur #> path, 'null'::jsonb)) <> 'array' then
        cur := jsonb_set(cur, path, '[]'::jsonb, true);
      end if;
      cur := jsonb_set(cur, path, (cur #> path) || (op->'a'), true);
    else
      cur := jsonb_set(cur, path, op->'v', true);
    end if;
  end loop;

  update sheets set
    data       = cur,
    campaign   = coalesce(p_meta->>'campaign',   campaign),
    owner_id   = coalesce(p_meta->>'owner_id',   owner_id),
    owner_name = coalesce(p_meta->>'owner_name', owner_name),
    name       = coalesce(p_meta->>'name',       name)
  where id = p_id
  returning rev, updated_at into newrev, newts;

  return jsonb_build_object('rev', newrev, 'updated_at', newts);
end;
$$;

grant execute on function ptu_apply_ops(text, jsonb, jsonb) to anon, authenticated;

-- 4) images Storage bucket + policies (the egress fix) ----------------------
insert into storage.buckets (id, name, public)
values ('images','images', true)
on conflict (id) do update set public = true;

drop policy if exists "images public read"  on storage.objects;
drop policy if exists "images anon insert"  on storage.objects;
drop policy if exists "images anon update"  on storage.objects;
create policy "images public read"  on storage.objects for select
  to anon, authenticated using (bucket_id = 'images');
create policy "images anon insert"  on storage.objects for insert
  to anon, authenticated with check (bucket_id = 'images');
create policy "images anon update"  on storage.objects for update
  to anon, authenticated using (bucket_id = 'images') with check (bucket_id = 'images');

-- Done. Copy Project URL + anon key into config.js, then deploy.
