-- ============================================================================
--  PTU Sheet — field-level ("compartmentalized") sync
--  Run this ONCE in Supabase → SQL Editor → New query → Run.
--  Safe to re-run. Nothing breaks if you don't run it — the app falls back to
--  its older whole-sheet writes — but running it is what stops two people
--  editing the same sheet (or dragging two tokens) from fighting each other.
--
--  Requires the `rev` column + trigger from SETUP-CLOUD.md ("Required update
--  for conflict-safe sync"). Run that block first if you haven't.
-- ============================================================================

-- Applies a list of field-level edits to one row, INSIDE ONE ATOMIC STATEMENT.
--
-- p_ops is a JSON array of operations, each with a path `p` into the row's data:
--   {"p":["trainer","money"],                  "v": 1200}   set a value
--   {"p":["pokemon",{"id":"m3"},"currentHP"],  "v": 14}     set a value inside the
--                                                            party member whose id is m3
--   {"p":["pokemon",{"id":"m3"}],              "d": 1}      delete that party member
--   {"p":["fog","map1"],                       "a": ["3,4"]} append to an array
--
-- An {"id": …} path segment is resolved against the array AS IT IS RIGHT NOW, so an
-- edit can never land on the wrong entry because someone else added or removed one
-- in the meantime. Ops whose target no longer exists are skipped rather than
-- recreating something another player deleted.
--
-- Because the whole thing is one UPDATE against the live row, two clients patching
-- DIFFERENT fields both land in full — no versions to compare, nothing to retry, and
-- no chance of one person's save wiping the other's. Only the exact same field written
-- at the same moment is last-writer-wins.
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
  -- lock the row for the duration of this statement so concurrent patches queue instead of racing
  select data into cur from sheets where id = p_id for update;
  if not found then
    return jsonb_build_object('missing', true);      -- the client re-inserts the whole row
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
        -- {"id": …} → the index of that element in the array we're standing on
        idx := null;
        if jsonb_typeof(node) = 'array' then
          select ord - 1 into idx
            from jsonb_array_elements(node) with ordinality as t(elem, ord)
           where elem->>'id' = seg->>'id'
           limit 1;
        end if;
        if idx is null then ok := false; exit; end if;   -- entry is gone → skip this op
        path := path || idx::text;
        node := node -> idx;
      else
        key  := seg #>> '{}';
        path := path || key;
        node := node -> key;
      end if;

      -- a missing container mid-path: create it for a write, abandon the op for a delete
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
