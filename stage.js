/* ===================================================================
   🎭 THE STAGE ENGINE — theatre acts that run themselves (built for the Psychic Gym, v710)

   Loaded AFTER app.js (index.html), like contest.js: it uses app.js's globals, and app.js only reaches in
   through `typeof stageX === "function"` guarded hooks:
     render() / flushUiRefresh("rolls"|"map") → stageRender()      the dock, on every screen
     openMoveRoll / openTrainerAttack (1st roll) → stageOnMoveUsed()  dances, Sonic Moves, repeats
     playSong                                   → stageOnSong()      a Musician's counter-melody
     attackTargetWidget 💥 Apply                → stageOnApply()     crits, Super-Effective, comebacks, the Mega
     applyAutoKO                                → stageOnKO()        every fall, reserves, Plot Twists
     advanceInitiative (round wrap)             → stageOnRoundWrap() scene changes
     abilityDamageMods                          → stageDamageMods()  Forte, Revelation Dance
     Round / Echoed Voice value boxes           → stageMoveUses() / stageEchoRounds()
     renderEncounters header                    → stageEncounterButton()

   WHAT AN ACT IS. An encounter carrying `enc.stage = { act, kind:"ballet"|"opera"|"play", show }` (the
   GAUNTLETS builder writes it). Its Trainers carry `stageOut` (how many of their Pokémon are on stage at once)
   and `stageRole` (conductor); Pokémon carry `stageRole` (singer, star, villain, healer).

   SHARED STATE rides the ROLLS row like contests and Blessings: `rolls.data.stage = { run, last }`.
   `run.events` is APPEND-ONLY — every client that sees something happen (a roll, a hit, a fall) pushes one
   {id,…} entry, and the field-level sync merges arrays of {id} objects by id, so two players cheering at once
   both land. Everything the table sees (Ovation, the Crescendo, KO counts) is DERIVED from that list, so there
   is no counter to race over. Only the GM's client acts on it (follow-up prompts, reserves, scene changes).
=================================================================== */

/* ---------- the rules, as data ---------- */
const STAGE_DANCES = new Set(["aquastep","clangoroussoul","dragondance","featherdance","fierydance","lunardance",
  "petaldance","quiverdance","raindance","revelationdance","swordsdance","teeterdance","victorydance"]);
const STAGE_KIND = {
  ballet: { icon:"\u{1FA70}", style:"Dance Move",  flourish:["acrobatics"] },
  opera:  { icon:"\u{1F3BB}", style:"Sonic Move",  flourish:["charm","focus"] },
  play:   { icon:"\u{1F52E}", style:"comeback",    flourish:["charm","guile"] },
};
const STAGE_SCENES = {
  1: { name:"Corinth",              line:"Psychic Terrain" },
  2: { name:"The Hall of Mirrors",  line:"Wonder Room — Defense and Special Defense swap" },
  3: { name:"Time Unwinds",         line:"Trick Room — Initiative runs backwards" },
};
const STAGE_TWISTS = [
  { key:"topsy", label:"Malamar's Topsy-Turvy on the most-buffed challenger", role:"villain", move:"Topsy-Turvy" },
  { key:"trick", label:"Trick Room early" },
  { key:"mega",  label:"The Mega Evolution early" },
  { key:"heal",  label:"Hatterene's Heal Pulse on Medea's lowest Pokémon", role:"healer", move:"Heal Pulse" },
];
const STAGE_FLOURISH_DC = 16;
const STAGE_OVATION_MAX = 10;
const STAGE_CRESCENDO_MAX = 6;

const stIsDance  = m => STAGE_DANCES.has(moveKey((m && m.name) || m || ""));
const stMove     = m => (typeof m === "string" ? moveByName.get(m.toLowerCase()) : m) || null;
const stIsSonic  = m => { const mm = stMove(m); return !!mm && (moveHasKeyword(mm, "sonic") || moveKey(mm.name) === "drumbeating"); };
const stIsStatus = m => { const mm = stMove(m); return !!mm && String(mm.class || "") === "Status"; };

/* ---------- shared state ---------- */
function stagePeek(){
  if(mode === "cloud"){ const d = cloud.rolls && cloud.rolls.data; return (d && d.stage && typeof d.stage === "object") ? d.stage : null; }
  return (state.stage && typeof state.stage === "object") ? state.stage : null;
}
function stageData(){
  if(mode === "cloud"){
    const d = ensureRolls().data;
    if(!d.stage || typeof d.stage !== "object" || Array.isArray(d.stage)) d.stage = { run:null, last:null };
    return d.stage;
  }
  if(!state.stage || typeof state.stage !== "object") state.stage = { run:null, last:null };
  return state.stage;
}
function stageRun(){ const s = stagePeek(); return (s && s.run && typeof s.run === "object") ? s.run : null; }
function stageSave(){
  if(mode === "cloud") saveRolls(); else save();
  try{ stageRender(); }catch(e){ console.error(e); }
}
function stageRound(){ try{ return (activeMapMeta().initRound) || 1; }catch(e){ return 1; } }
function stageEvents(run){ return Array.isArray(run && run.events) ? run.events : []; }
function stageAppend(ev){
  const d = stageData(), run = d.run; if(!run) return null;
  if(!Array.isArray(run.events)) run.events = [];
  ev.id = "se" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  ev.at = Date.now(); ev.r = stageRound();
  run.events.push(ev);
  stageSave();
  return ev;
}
const stageHas = (run, k, fn) => stageEvents(run).some(e => e.k === k && (!fn || fn(e)));
function stageEnc(run){ return run ? (encList().find(e => e && e.id === run.encId) || null) : null; }
function stageMap(run){
  try{ return (activeMapMeta().maps || []).find(m => m.id === (run && run.mapId)) || null; }catch(e){ return null; }
}
function stageToks(run){ return run && run.mapId ? mapTokensFor(run.mapId) : []; }

/* ---------- who is who ---------- */
function stageSideOf(o, run){
  run = run || stageRun(); if(!o || !run) return null;
  const enc = stageEnc(run);
  if(enc){
    if((enc.mons || []).includes(o)) return "gym";
    for(const w of (enc.trainers || [])) if(w.trainer === o || (w.pokemon || []).includes(o)) return "gym";
    if(o.id){
      if((enc.mons || []).some(p => p.id === o.id)) return "gym";
      for(const w of (enc.trainers || [])) if((w.pokemon || []).some(p => p.id === o.id) || (w.trainer && w.trainer.id && w.trainer.id === o.id)) return "gym";
    }
  }
  const rows = mode === "cloud" ? Object.values(cloud.byId || {}).map(r => r && r.data).filter(Boolean) : (state.characters || []);
  for(const c of rows){
    if(c.trainer === o || (c.pokemon || []).includes(o)) return "party";
    if(o.id && (c.pokemon || []).some(p => p.id === o.id)) return "party";
  }
  return null;
}
const stageAidOf = o => !o ? "" : (o.id ? String(o.id) : "n:" + ownerLabel(o));
function stageTokenOf(o, run){
  if(!o) return null;
  return stageToks(run).find(t => { const L = t.link ? tokenLinked(t) : null; return !!(L && L.obj === o); }) || null;
}
const stageObjOf = t => { try{ const L = t && t.link ? tokenLinked(t) : null; return (L && !L.missing) ? L.obj : null; }catch(e){ return null; } };
function stageByRole(run, role){
  const enc = stageEnc(run); if(!enc) return [];
  const out = [], hit = p => !!p.stageRole && String(p.stageRole).startsWith(role);
  (enc.trainers || []).forEach(w => (w.pokemon || []).forEach(p => { if(hit(p)) out.push(p); }));
  (enc.mons || []).forEach(p => { if(hit(p)) out.push(p); });
  /* a ranked role ("singer1", "singer2"…) comes back in its rank: the Finale goes to the first one standing */
  return out.sort((a, b) => String(a.stageRole).localeCompare(String(b.stageRole)));
}

/* ---------- the hooks ---------- */
function stageOnMoveUsed(o, m, opts){
  const run = stageRun(); if(!run || !o || !m || !m.name) return;
  const side = stageSideOf(o, run); if(!side) return;
  const tok = stageTokenOf(o, run);
  stageAppend({ k:"move", side, aid:stageAidOf(o), who:ownerLabel(o), mon:!isTrainerOwner(o), move:m.name,
    dance:stIsDance(m), sonic:stIsSonic(m), status:stIsStatus(m), tok:tok ? tok.id : null, follow:!!(opts && opts.stageFollow) });
}
function stageOnSong(t){
  const run = stageRun(); if(!run || !t) return;
  const side = stageSideOf(t, run); if(!side) return;
  stageAppend({ k:"song", side, aid:stageAidOf(t), who:ownerLabel(t) });
}
async function stageOnApply(x){
  const run = stageRun(); if(!run || !x || !Array.isArray(x.hits) || !x.hits.length) return;
  let A = x.attacker || null;
  if(!A && x.ctx){ try{ const f = findAttackerSheet(x.ctx); A = (f && (f.obj || f.attacker)) || null; }catch(e){} }
  const side = A ? stageSideOf(A, run) : null;
  const dealt = x.hits.reduce((n, h) => n + Math.max(0, (h.br && h.br.final) || 0), 0);
  const se = x.hits.some(h => h.br && h.br.mult > 1 && (h.br.final || 0) > 0);
  const crit = dealt > 0 && ((x.critExtra || 0) > 0 || !!(x.ctx && x.ctx.crit));
  let comeback = false;
  if(A && side === "party" && dealt > 0){
    const mx = ownerMaxHP(A) || 0, cur = ownerHP(A);
    comeback = mx > 0 && cur > 0 && cur * 4 <= mx;
  }
  stageAppend({ k:"hit", side, aid:A ? stageAidOf(A) : "", who:A ? ownerLabel(A) : ((x.ctx && x.ctx.by) || ""),
    move:(x.ctx && x.ctx.move) || "", dealt, se, crit, comeback });
  /* THE TRANSFORMATION SCENE: the star's first HP bar breaks → it Mega Evolves */
  for(const h of x.hits){
    const o = stageObjOf(h.t);
    if(o && o.stageRole === "star") await stageTryMega(o, h.t, run, "its first bar broke");
  }
}
function stageOnKO(o){
  const run = stageRun(); if(!run || !o) return;
  const side = stageSideOf(o, run); if(!side) return;
  const aid = stageAidOf(o), r = stageRound();
  if(stageHas(run, "ko", e => e.aid === aid && e.r === r)) return;
  stageAppend({ k:"ko", side, aid, who:ownerLabel(o), mon:!isTrainerOwner(o), role:o.stageRole || "" });
  if(side === "gym" && isGM()) setTimeout(() => { try{ stageSendReserves(stageRun()); }catch(e){ console.error(e); } }, 60);
}
function stageOnRoundWrap(){ try{ stageRender(); }catch(e){ console.error(e); } }

/* Forte (the Opera) and Revelation Dance's "+5 per other Dance Move used by the user this round" */
function stageDamageMods(p, m, mods){
  const run = stageRun(); if(!run || !p || !m) return;
  if(run.kind === "opera" && stIsSonic(m) && stageSideOf(p, run) === "gym"){
    const c = stageCrescendo(run);
    if(c.n >= 3){ mods.flat += 5; mods.why.push(`\u{1F3BB} Forte +5 damage (Crescendo ${c.n})`); }
  }
  if(moveKey(m.name) === "revelationdance"){
    const aid = stageAidOf(p), r = stageRound();
    const k = Math.min(3, stageEvents(run).filter(e => e.k === "move" && e.aid === aid && e.r === r && e.dance).length);
    if(k){ mods.flat += 5 * k; mods.why.push(`Revelation Dance +${5 * k} (${k} other Dance Move${k === 1 ? "" : "s"} this round)`); }
  }
}
/* Round: "+2 more for each use of Round by any Trainer or Pokemon this round" — the uses before this one */
function stageMoveUses(name){
  const run = stageRun(); if(!run) return 0;
  const r = stageRound(), k = moveKey(name);
  return stageEvents(run).filter(e => e.k === "move" && e.r === r && moveKey(e.move) === k).length;
}
/* Echoed Voice: +4 if it was used last round, +8 if in both of the last two rounds */
function stageEchoRounds(){
  const run = stageRun(); if(!run) return 0;
  const r = stageRound(), used = q => stageEvents(run).some(e => e.k === "move" && e.r === q && moveKey(e.move) === "echoedvoice");
  return used(r - 1) ? (used(r - 2) ? 2 : 1) : 0;
}

/* ---------- derived: Ovation ---------- */
function stageOvation(run){
  const ev = stageEvents(run).slice().sort((a, b) => (a.at || 0) - (b.at || 0));
  const log = []; let n = 0;
  const add = (d, why) => { const was = n; n = Math.max(0, Math.min(STAGE_OVATION_MAX, n + d)); if(n !== was) log.push({ d, why }); };
  const start = run.startRound || 1, cur = stageRound();
  const styleSeen = new Set(), lastMove = {};
  const kind = run.kind;
  for(let r = Math.min(start, cur); r <= cur; r++){
    const rev = ev.filter(e => (e.r || start) === r);
    let dmg = false;
    for(const e of rev){
      if(e.k === "hit"){
        if(e.side === "party" && e.dealt > 0){
          dmg = true;
          if(e.crit) add(1, `${e.who}: a Critical Hit`);
          if(e.se) add(1, `${e.who}: Super-Effective`);
          if(kind === "play" && e.comeback) add(1, `${e.who}: the comeback`);
        }
      } else if(e.k === "ko"){
        add(1, `${e.who} falls`);
      } else if(e.k === "move" && e.side === "party" && e.mon && !e.follow){
        if(lastMove[e.aid] && lastMove[e.aid] === e.move) add(-1, `${e.who} repeats ${e.move}`);
        lastMove[e.aid] = e.move;
        const style = kind === "ballet" ? e.dance : kind === "opera" ? e.sonic : false;
        if(style && !styleSeen.has(e.aid)){ styleSeen.add(e.aid); add(1, `${e.who}'s first ${STAGE_KIND[kind].style}`); }
      } else if(e.k === "flourish" && e.pass){
        add(1, `${e.who}: a Flourish`);
      } else if(e.k === "cheer"){
        add(e.n || 0, e.why || "the house");
      }
    }
    if(r < cur && rev.length && !dmg) add(-1, `round ${r - start + 1}: no challenger dealt damage`);
  }
  return { n, log };
}
/* ---------- derived: the Crescendo (the Opera) ---------- */
function stageCrescendo(run){
  let n = 0, frozen = false, finale = false;
  const ev = stageEvents(run).slice().sort((a, b) => (a.at || 0) - (b.at || 0));
  for(const e of ev){
    if(e.k === "finale"){ finale = true; continue; }
    if(e.k === "ko" && e.role === "conductor"){ frozen = true; continue; }
    if(frozen) continue;
    if(e.k === "move" && e.sonic) n += e.side === "gym" ? 1 : e.side === "party" ? -1 : 0;
    else if(e.k === "song" && e.side === "party") n -= 1;
    else if(e.k === "cres") n += e.n || 0;
    n = Math.max(0, Math.min(STAGE_CRESCENDO_MAX, n));
  }
  return { n, frozen, finale };
}
/* ---------- derived: Act III knockouts and Plot Twists ---------- */
function stageKOs(run){
  const ev = stageEvents(run);
  return { gymDown: ev.filter(e => e.k === "ko" && e.side === "gym" && e.mon).length,
           partyDown: ev.filter(e => e.k === "ko" && e.side === "party" && e.mon).length };
}
function stageTwistsOpen(run){
  const k = stageKOs(run), used = stageEvents(run).filter(e => e.k === "twist").map(e => e.key);
  const earned = Math.max(0, Math.floor((k.gymDown - k.partyDown) / 2));
  const left = STAGE_TWISTS.filter(t => !used.includes(t.key));
  return { k, avail:Math.max(0, earned - used.length), left };
}

/* ---------- the cast on the board: who is on stage, who waits ---------- */
function stageCast(run){
  const enc = stageEnc(run); if(!enc) return [];
  const toks = stageToks(run);
  const tokOf = o => toks.find(t => stageObjOf(t) === o) || null;
  return (enc.trainers || []).map(w => {
    const tr = w.trainer || {};
    const out = Math.max(1, parseInt(tr.stageOut) || (w.pokemon || []).length || 1);
    const mons = (w.pokemon || []).map(p => {
      const t = tokOf(p);
      return { p, tok:t, placed:!!t && !t.gmHidden, down:ownerHP(p) <= 0 || (p.statuses || []).includes("knockedOut") };
    });
    return { w, tr, out, ttok:tokOf(tr), mons };
  });
}
function stagePushToken(run, map, link, anchor){
  const byMap = cloud.mapTokens && cloud.mapTokens.data && cloud.mapTokens.data.byMap; if(!byMap) return null;
  const arr = byMap[map.id] || (byMap[map.id] = []);
  const size = autoTokenSize(link);
  const pos = anchor ? freeCellNear(map, anchor, null) : { x:2, y:2 };
  const tok = { id:uid(), size, x:pos.x, y:pos.y, link };
  arr.push(tok);
  return tok;
}
/* a fallen performer's Trainer sends the next one on (Trainers still standing, `stageOut` at a time) */
async function stageSendReserves(run){
  run = run || stageRun(); if(!run || !isGM() || mode !== "cloud") return [];
  const map = stageMap(run); if(!map) return [];
  const sent = [];
  stageCast(run).forEach(c => {
    if(c.ttok && tokenHp(c.ttok).cur <= 0) return;                 // a knocked-out Trainer can't send anyone
    if(!c.ttok && !c.mons.some(m => m.tok)) return;                  // this Trainer isn't on the board at all
    let live = c.mons.filter(m => m.placed && !m.down).length;
    for(const m of c.mons){
      if(live >= c.out) break;
      if(m.placed || m.down) continue;
      if(m.tok && m.tok.gmHidden) delete m.tok.gmHidden;
      else stagePushToken(run, map, { kind:"enc", encId:run.encId, monId:m.p.id }, c.ttok || (c.mons.find(x => x.tok) || {}).tok || null);
      live++;
      sent.push(`${ownerLabel(c.tr)} sends out ${ownerLabel(m.p)}`);
    }
  });
  if(sent.length){
    mapTokensSave(); renderMap();
    toast(`▸ ${sent.join(" · ")} — it acts from the next turn`);
    stageAppend({ k:"reserve", lines:sent });
  }
  return sent;
}
/* the opening cast: every Trainer, and the first `stageOut` of each one's Pokémon, around the stage */
function stagePlaceOpening(run){
  if(!isGM() || mode !== "cloud"){ toast("Placing tokens needs the shared Map (GM)"); return; }
  const map = stageMap(run); if(!map){ toast("The act's map isn't loaded"); return; }
  const toks = stageToks(run);
  let anchor = toks.find(t => tokenSide(t) === "enemy" && stageSideOf(stageObjOf(t), run) === "gym") || null;
  if(!anchor){ const p = toks.find(t => tokenSide(t) === "player"); anchor = p ? { x:p.x, y:p.y - 6, size:1 } : { x:6, y:6, size:1 }; }
  let n = 0;
  stageCast(run).forEach(c => {
    let tt = c.ttok;
    if(!tt){ const w = c.w; tt = stagePushToken(run, map, { kind:"enctrainer", encId:run.encId, trainerId:w.id }, anchor); n++; }
    let live = c.mons.filter(m => m.placed && !m.down).length;
    for(const m of c.mons){
      if(live >= c.out) break;
      if(m.placed || m.down) continue;
      if(m.tok && m.tok.gmHidden) delete m.tok.gmHidden;
      else stagePushToken(run, map, { kind:"enc", encId:run.encId, monId:m.p.id }, tt || anchor);
      live++; n++;
    }
  });
  mapTokensSave(); renderMap();
  toast(n ? `\u{1F4CD} ${n} performer${n === 1 ? "" : "s"} placed — drag them to their marks` : "Everyone in the opening cast is already on the board");
}

/* ---------- the Mega at the climax ---------- */
async function stageTryMega(o, tok, run, why, force){
  if(!o || o.mega || stageHas(run, "mega")) return false;
  if(!force){ if(!isBoss(o)) return false; const b = o.boss; if(!(b && b.curBar < b.actions)) return false; }
  if(tok && tokenHp(tok).cur <= 0) return false;
  const forms = megaFormsFor(o); if(!forms.length) return false;
  megaEvolve(o, forms[0], () => {});
  if(tok && tok.link) await commitTokenSource(tok); else saveEnc();
  stageAppend({ k:"mega", who:ownerLabel(o), why });
  toast(`✨ THE TRANSFORMATION — ${ownerLabel(o)} Mega Evolves (${why})`);
  try{ renderMap(); }catch(e){}
  return true;
}

/* ---------- Act III: the scene changes ---------- */
function stageScene(run, n){
  if(!isGM() || !run || stageHas(run, "scene", e => e.scene === n)) return;
  const map = stageMap(run); const sc = STAGE_SCENES[n]; if(!sc) return;
  if(map){
    try{
      if(n === 1){ setMapTerrain(map, "psychic"); }
      if(n === 2){ if((map.terrains || []).length) setMapTerrain(map, ""); if(!(map.rooms || []).includes("wonder")) toggleMapRoom(map, "wonder"); }
      if(n === 3){ if((map.rooms || []).includes("wonder")) toggleMapRoom(map, "wonder"); if(!(map.rooms || []).includes("trick")) toggleMapRoom(map, "trick"); }
    }catch(e){ console.error("scene change", e); }
  }
  stageAppend({ k:"scene", scene:n, name:sc.name });
  toast(`\u{1F3AD} Scene ${n}: ${sc.name} — ${sc.line}`);
}
function stageSceneNow(run){
  const s = stageEvents(run).filter(e => e.k === "scene").sort((a, b) => (b.at || 0) - (a.at || 0))[0];
  return s ? s.scene : 0;
}
/* the GM's client notices a new round however it arrived (its own ▶, or a player's) */
function stageRoundTick(run){
  if(!run || !isGM()) return;
  const n = stageRound() - (run.startRound || 1) + 1;
  if(run.kind === "play"){
    if(n >= 3 && !stageHas(run, "scene", e => e.scene >= 2)) stageScene(run, 2);
    if(n >= 5 && !stageHas(run, "scene", e => e.scene === 3)) stageScene(run, 3);
  }
}

/* ---------- opening a performer's roll from the dock ---------- */
function stageOpenRoll(o, moveName, extra){
  const run = stageRun();
  const m = stMove(moveName); if(!o || !m){ toast(`${moveName}: not in the Move list`); return; }
  const tok = stageTokenOf(o, run);
  const persist = tok ? (() => commitTokenSource(tok)) : saveEnc;
  if(isTrainerOwner(o)) openTrainerAttack(o, m.name, null, Object.assign({ persist }, extra || {}));
  else openMoveRoll(o, m, getSpecies(o.species), Object.assign({ persist, rerender:() => { try{ renderMap(); }catch(e){} } }, extra || {}));
}

/* ---------- Dancer / Revelation follow-ups (Act I) ---------- */
/* Dancer: "Someone within 10 meters uses a Status-Class Dance Move — use it as a free action" (Scene x2).
   Revelation: "Someone within 10 meters uses a damaging Dance Move — use it as a Standard Action interrupt" (Scene x2).
   Only the GYM's dancers are offered here; a challenger's own Dancer is on their sheet's reaction list. */
function stageFollowers(run, ev){
  const toks = stageToks(run), src = toks.find(t => t.id === ev.tok);
  const mv = stMove(ev.move); if(!src || !mv) return [];
  const ab = stIsStatus(mv) ? "Dancer" : "Revelation";
  return toks.filter(t => t.id !== src.id && t.link && tokenSide(t) === "enemy" && !t.gmHidden)
    .map(t => ({ t, o:stageObjOf(t) }))
    .filter(x => x.o && !isTrainerOwner(x.o) && tokenHp(x.t).cur > 0 && ownerHasAbility(x.o, ab)
              && abilityUse(x.o, ab).left > 0 && tokenTileGap(src, x.t) <= 10)
    .map(x => ({ tokId:x.t.id, name:ownerLabel(x.o), ab, left:abilityUse(x.o, ab).left }));
}
async function stageFollow(f, item){
  const run = stageRun(); if(!run) return;
  const tok = stageToks(run).find(t => t.id === item.tokId), o = stageObjOf(tok);
  if(!o){ toast("That dancer isn't on the board any more"); return; }
  const u = abilityUse(o, item.ab);
  if(u.left <= 0 || !u.spend()){ toast(`${item.name}: no ${item.ab} uses left`); return; }
  await commitTokenSource(tok);
  f.list = f.list.filter(x => x.tokId !== item.tokId);
  if(!f.list.length) stageLocal.follows = stageLocal.follows.filter(x => x !== f);
  stageRender();
  stageOpenRoll(o, f.move, { stageFollow:true });
}

/* ---------- Flourish (any Trainer, once a round) ---------- */
function stageSkillRoll(t, k){
  const nDice = Math.max(1, rankDice(t.skills && t.skills[k]));
  let mod = 0;
  try{ mod = categoricBonus(t, k) + edgeSkillBonus(t, k) + gearSkillBonus(t, k) + cardSkillBonus(t, k)
            + buffSkillBonus(t, k) + auraRollBonus(t) + giftSkillBonus(t, k); }catch(e){ mod = 0; }
  const rolls = []; for(let i = 0; i < nDice; i++) rolls.push(1 + Math.floor(Math.random() * 6));
  return { total:rolls.reduce((a, b) => a + b, 0) + mod, rolls, mod, nDice };
}
function stageFlourish(t){
  const run = stageRun(); if(!run || !t) return;
  const aid = stageAidOf(t), r = stageRound();
  if(stageHas(run, "flourish", e => e.aid === aid && e.r === r)){ toast(`${ownerLabel(t)} already played to the house this round`); return; }
  const skills = (STAGE_KIND[run.kind] || STAGE_KIND.play).flourish;
  const k = skills.slice().sort((a, b) => rankDice((t.skills || {})[b]) - rankDice((t.skills || {})[a]))[0];
  const roll = stageSkillRoll(t, k), pass = roll.total >= STAGE_FLOURISH_DC;
  const nm = (SKILLS.find(s => s[0] === k) || [k, k])[1];
  logRoll({ kind:"skill", label:`\u{1F3AD} Flourish — ${nm}`, who:ownerLabel(t),
    headline:`${pass ? "✔" : "✖"} ${roll.total} vs DC ${STAGE_FLOURISH_DC}`,
    lines:[`${roll.nDice}d6${roll.mod ? (roll.mod > 0 ? "+" + roll.mod : roll.mod) : ""} → [${roll.rolls.join(", ")}] = ${roll.total}`,
           pass ? "The house loves it: +1 Ovation" : "It falls flat"] });
  stageAppend({ k:"flourish", aid, who:ownerLabel(t), pass, total:roll.total, skill:nm });
  toast(`\u{1F3AD} ${ownerLabel(t)}'s Flourish (${nm}): ${roll.total} vs ${STAGE_FLOURISH_DC} — ${pass ? "+1 Ovation!" : "no reaction"}`);
}
function stageFlourishTrainers(run){
  if(mode === "cloud"){
    const rows = Object.values(cloud.byId || {}).filter(r => r && r.data && r.data.trainer);
    const mine = isGM() ? rows.filter(r => stageToks(run).some(t => t.link && t.link.sheetId === r.id && t.link.kind === "trainer"))
                        : rows.filter(r => ownsRow(r));
    return mine.map(r => r.data.trainer);
  }
  const c = activeChar(); return c && c.trainer ? [c.trainer] : [];
}

/* ---------- starting, ending, intermission ---------- */
function stageStart(enc){
  if(!isGM()){ toast("Only the GM starts an act"); return; }
  if(!enc || !enc.stage){ toast("This encounter isn't a stage act"); return; }
  const d = stageData();
  if(d.run && d.run.encId !== enc.id && !confirm(`"${d.run.encName}" is still running. Replace it with this act?`)) return;
  let meta = null, map = null;
  try{ meta = activeMapMeta(); map = (meta.maps || []).find(m => m.id === meta.playerMapId) || activeMap(); }catch(e){}
  d.run = { id:"st" + Date.now().toString(36), encId:enc.id, encName:enc.name, act:enc.stage.act || 1, kind:enc.stage.kind || "play",
            show:enc.stage.show || "", mapId:map ? map.id : null, startRound:(meta && meta.initRound) || 1, events:[] };
  d.last = null;
  stageLocal = stageFreshLocal(d.run);
  stageLocal.open = true;
  stageSave();
  toast(`\u{1F3AD} ${enc.name} — the curtain rises${map ? ` on ${map.name || "the map"}` : ""}`);
  if(d.run.kind === "play"){
    stageScene(d.run, 1);
    /* the four trapdoors on the Theater stage come out of hiding when the play begins */
    try{
      const arr = d.run.mapId ? mapTokensFor(d.run.mapId) : [];
      const doors = arr.filter(x => x.trapdoor && x.gmHidden);
      doors.forEach(x => { delete x.gmHidden; });
      if(doors.length){ mapTokensSave(); renderMap(); toast(`\u{1F573} ${doors.length} trapdoors are open on the stage`); }
    }catch(e){ console.error("trapdoors", e); }
  }
  try{ render(); }catch(e){}
}
function stageNextEnc(run){
  if(!run) return null;
  return encList().find(e => e && e.stage && (e.stage.show || "") === (run.show || "") && e.stage.act === (run.act || 0) + 1) || null;
}
async function stageIntermission(){
  const run = stageRun(); if(!run || !isGM()) return;
  const ov = stageOvation(run).n;
  const next = stageNextEnc(run);
  if(!confirm(`End ${run.encName}?\n\nOvation ${ov}.\n`
             + `Every challenger on this board is restored to full HP and cured of Status Conditions (fainted ones included), `
             + `and it becomes a new Scene. Injuries and spent Daily Moves stay.`)) return;
  let healed = 0;
  if(mode === "cloud"){
    try{ await revPoll(); }catch(e){}
    const toks = stageToks(run);
    const rows = playerRestRows().filter(r => toks.some(t => t.link && t.link.sheetId === r.id));
    rows.forEach(r => {
      const c = r.data; applyEndScene(c);
      const t = c.trainer; if(t){ clearAllStatuses(t); t.currentHP = trainerDerived(t).hp; }
      (c.pokemon || []).filter(p => p.onTeam !== false).forEach(p => { clearAllStatuses(p); p.currentHP = pokeDerived(p).maxHP; });
      cloudUpsert(r); healed++;
    });
  }
  if(typeof restoreTrickItemsInEncounters === "function" && restoreTrickItemsInEncounters()) saveEnc();   // Trick lasts until the end of the Scene
  const d = stageData();
  d.last = { act:run.act, name:run.encName, show:run.show || "", ovation:ov, at:Date.now(),
             nextId:next ? next.id : null, nextName:next ? next.name : null, mapId:run.mapId };
  d.run = null;
  stageSave();
  toast(`\u{1F3AD} Curtain. Ovation ${ov} · ${healed} challenger sheet${healed === 1 ? "" : "s"} restored`);
}
function stageStop(){
  if(!isGM()) return;
  if(!confirm("Stop the stage engine for this act? Nothing is healed.")) return;
  const d = stageData(); d.run = null; stageSave();
}
/* ---------- the GM's client reacting to what everybody pushed ---------- */
function stageFreshLocal(run){
  return { runId:run ? run.id : null, seen:new Set(stageEvents(run).map(e => e.id)), follows:[], lastRound:stageRound(),
           open:stageLocal ? stageLocal.open : true, standing:false };
}
let stageLocal = { runId:null, seen:new Set(), follows:[], lastRound:null, open:true, standing:false };
function stageProcess(run){
  if(!run) return;
  if(run.id !== stageLocal.runId) stageLocal = stageFreshLocal(run);
  if(!isGM()) return;
  const r = stageRound();
  if(stageLocal.lastRound == null) stageLocal.lastRound = r;
  if(r !== stageLocal.lastRound){ stageLocal.lastRound = r; stageRoundTick(run); }
  stageEvents(run).forEach(e => {
    if(stageLocal.seen.has(e.id)) return;
    stageLocal.seen.add(e.id);
    if(e.k === "move" && e.dance && !e.follow && e.tok){
      const list = stageFollowers(run, e);
      if(list.length) stageLocal.follows.push({ id:e.id, move:e.move, who:e.who, list });
    }
  });
  if(run.kind === "play" && !stageLocal.standing && stageOvation(run).n >= STAGE_OVATION_MAX){
    stageLocal.standing = true;
    toast("\u{1F339} STANDING OVATION — Medea stops the play. The badge is theirs.");
  }
}

/* ---------- the dock ---------- */
function stageCss(){
  if(document.getElementById("stageCss")) return;
  const st = document.createElement("style"); st.id = "stageCss";
  st.textContent = `
  #stageDock{position:fixed;left:10px;bottom:10px;z-index:55;width:min(330px,calc(100vw - 20px));max-height:62vh;overflow:auto;
    background:var(--panel,#1c1f26);color:var(--text,#eee);border:2px solid #a23b72;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.35);
    font-size:13px;line-height:1.35}
  #stageDock .sd-head{display:flex;align-items:center;gap:6px;padding:7px 10px;background:#a23b72;color:#fff;font-weight:800;cursor:pointer;position:sticky;top:0}
  #stageDock .sd-body{padding:8px 10px;display:flex;flex-direction:column;gap:8px}
  #stageDock .sd-bar{height:10px;border-radius:6px;background:var(--line,#333);overflow:hidden}
  #stageDock .sd-bar>i{display:block;height:100%;background:linear-gradient(90deg,#d6337a,#f0b429)}
  #stageDock .sd-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  #stageDock .sd-row button{padding:3px 8px;font-size:12px}
  #stageDock .sd-sec{border-top:1px solid var(--line,#333);padding-top:6px}
  #stageDock .sd-lbl{font-weight:800;font-size:12px;opacity:.85;margin-bottom:3px}
  #stageDock .sd-big{font-weight:800;color:#f0b429}
  #stageDock .sd-log{font-size:11.5px;opacity:.8}
  `;
  document.head.append(st);
}
function stageBar(n, max){ return el("div", { class:"sd-bar" }, el("i", { style:`width:${Math.round(100 * Math.max(0, Math.min(max, n)) / max)}%` })); }
function stageBtn(label, fn, title){ return el("button", { class:"btn-secondary", title:title || "", onclick:fn }, label); }
function stageDockNode(run, last){
  const gm = isGM();
  const box = el("div", { id:"stageDock" });
  const kind = run ? (STAGE_KIND[run.kind] || STAGE_KIND.play) : null;
  const title = run ? `${kind.icon} ${run.encName}` : `\u{1F3AD} Intermission`;
  const rnd = run ? Math.max(1, stageRound() - (run.startRound || 1) + 1) : 0;
  box.append(el("div", { class:"sd-head", onclick:() => { stageLocal.open = !stageLocal.open; stageRender(); } },
    el("span", { style:"flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, title),
    run ? el("span", { style:"font-weight:600;opacity:.9" }, `Round ${rnd}`) : "",
    el("span", {}, stageLocal.open ? "▾" : "▸")));
  if(!stageLocal.open) return box;
  const body = el("div", { class:"sd-body" }); box.append(body);

  if(!run){
    body.append(el("div", {}, `${last.name}: Ovation ${last.ovation}.`));
    const next = last.nextId ? encList().find(e => e.id === last.nextId) : null;
    const row = el("div", { class:"sd-row" });
    if(next) row.append(el("button", { class:"btn-primary", onclick:() => stageStart(next) }, `\u{1F3AD} Raise the curtain: ${next.name.replace(/^.*?—\s*/, "")}`));
    row.append(stageBtn("✖ Close", () => { const d = stageData(); d.last = null; stageSave(); }));
    body.append(row);
    return box;
  }

  /* 🎭 Ovation — everyone sees it */
  const ov = stageOvation(run);
  const ovSec = el("div", {});
  ovSec.append(el("div", { class:"sd-lbl" }, `\u{1F3AD} Ovation ${ov.n} / ${STAGE_OVATION_MAX}`), stageBar(ov.n, STAGE_OVATION_MAX));
  if(ov.log.length) ovSec.append(el("div", { class:"sd-log" }, ov.log.slice(-3).reverse().map(l => `${l.d > 0 ? "+" : "−"}${Math.abs(l.d)} ${l.why}`).join(" · ")));
  if(run.kind === "play" && ov.n >= STAGE_OVATION_MAX) ovSec.append(el("div", { class:"sd-big" }, "\u{1F339} STANDING OVATION — Medea stops the play. The badge is theirs."));
  const ovRow = el("div", { class:"sd-row", style:"margin-top:4px" });
  stageFlourishTrainers(run).forEach(t => ovRow.append(stageBtn(`\u{1F3AD} Flourish: ${ownerLabel(t)}`, () => stageFlourish(t),
    `Standard Action, once a round: ${kind.flourish.join(" or ")} vs DC ${STAGE_FLOURISH_DC} — +1 Ovation on a pass`)));
  if(gm){
    ovRow.append(stageBtn("+1", () => stageAppend({ k:"cheer", n:1, why:"the GM: a moment the house loved" }), "a cheer the engine can't see (taking a hit for an ally, a great line)"));
    ovRow.append(stageBtn("−1", () => stageAppend({ k:"cheer", n:-1, why:"the GM: the house is bored" })));
  }
  ovSec.append(ovRow);
  body.append(ovSec);

  /* 🎻 the Crescendo */
  if(run.kind === "opera"){
    const c = stageCrescendo(run);
    const sec = el("div", { class:"sd-sec" });
    sec.append(el("div", { class:"sd-lbl" }, `\u{1F3BB} Crescendo ${c.n} / ${STAGE_CRESCENDO_MAX}${c.n >= 3 ? " — FORTE (+5 on the opera's Sonic Moves)" : ""}${c.frozen ? " — frozen (the Maestro is down)" : ""}`),
      stageBar(c.n, STAGE_CRESCENDO_MAX));
    if(gm){
      const row = el("div", { class:"sd-row", style:"margin-top:4px" });
      row.append(stageBtn("+1", () => stageAppend({ k:"cres", n:1 })), stageBtn("−1", () => stageAppend({ k:"cres", n:-1 })));
      sec.append(row);
      if(c.n >= STAGE_CRESCENDO_MAX && !c.finale){
        const singer = stageByRole(run, "singer").find(p => ownerHP(p) > 0 && !(p.statuses || []).includes("knockedOut")
          && usesLeft(p, useKey("move", "Perish Song"), 1) > 0 && stageTokenOf(p, run));
        sec.append(el("div", { class:"sd-big", style:"margin-top:6px" }, "\u{1F3B6} THE FINALE"));
        if(singer) sec.append(el("button", { class:"btn-primary", style:"margin-top:4px", onclick:() => {
          stageAppend({ k:"finale", who:ownerLabel(singer) }); stageOpenRoll(singer, "Perish Song"); } },
          `\u{1F3B5} ${ownerLabel(singer)} sings Perish Song`));
        else sec.append(el("div", { class:"small" }, "No singer is left standing — the Finale fizzles."),
          stageBtn("✔ Mark it", () => stageAppend({ k:"finale", who:"" })));
      }
    }
    body.append(sec);
  }

  /* 🔮 Act III: the scene, the knockouts and the Plot Twists */
  if(run.kind === "play"){
    const sec = el("div", { class:"sd-sec" });
    const sn = stageSceneNow(run);
    sec.append(el("div", { class:"sd-lbl" }, sn ? `Scene ${sn}: ${STAGE_SCENES[sn].name} — ${STAGE_SCENES[sn].line}` : "Scene: not set"));
    const tw = stageTwistsOpen(run);
    sec.append(el("div", { class:"small", style:"margin-top:4px" },
      `Challengers have felled ${tw.k.gymDown} · Medea has felled ${tw.k.partyDown}`));
    if(gm && tw.avail > 0 && tw.left.length){
      sec.append(el("div", { class:"sd-big", style:"margin-top:4px" }, `⚡ PLOT TWIST (${tw.avail})`));
      const row = el("div", { class:"sd-row" });
      tw.left.forEach(t => row.append(stageBtn(t.label, () => stageTwist(run, t))));
      sec.append(row);
    }
    if(gm){
      const row = el("div", { class:"sd-row", style:"margin-top:4px" });
      [1, 2, 3].forEach(n => { if(!stageHas(run, "scene", e => e.scene === n)) row.append(stageBtn(`Scene ${n} now`, () => stageScene(run, n), STAGE_SCENES[n].line)); });
      if(row.childNodes.length) sec.append(row);
    }
    body.append(sec);
  }

  /* 🕺 the corps follows (GM) */
  if(gm && stageLocal.follows.length){
    const sec = el("div", { class:"sd-sec" });
    stageLocal.follows.slice(-3).forEach(f => {
      sec.append(el("div", { class:"sd-lbl" }, `\u{1F57A} ${f.who} danced ${f.move} — who follows?`));
      const row = el("div", { class:"sd-row" });
      f.list.forEach(it => row.append(stageBtn(`${it.name} (${it.ab} ${it.left})`, () => stageFollow(f, it),
        it.ab === "Dancer" ? "Free Action: spends a Dancer use and opens the roll" : "Standard Action interrupt: spends a Revelation use and opens the roll")));
      row.append(stageBtn("✖ nobody", () => { stageLocal.follows = stageLocal.follows.filter(x => x !== f); stageRender(); }));
      sec.append(row);
    });
    body.append(sec);
  }

  /* 🎟 the cast: who is on stage, who waits (GM) */
  if(gm){
    const sec = el("div", { class:"sd-sec" });
    const wings = [];
    stageCast(run).forEach(c => c.mons.forEach(m => { if(!m.placed && !m.down) wings.push(`${ownerLabel(m.p)} (${ownerLabel(c.tr).split(",")[0]})`); }));
    sec.append(el("div", { class:"small" }, wings.length ? `In the wings: ${wings.join(", ")}` : "Nobody left in the wings."));
    const row = el("div", { class:"sd-row", style:"margin-top:4px" });
    row.append(stageBtn("\u{1F4CD} Place the opening cast", () => stagePlaceOpening(run), "every Trainer, and the first of each one's Pokémon up to how many they keep out"),
      stageBtn("▸ Send reserves", () => stageSendReserves(run), "fill each standing Trainer's empty slots from their wings (it also happens by itself on a knockout)"));
    sec.append(row);
    const row2 = el("div", { class:"sd-row", style:"margin-top:4px" });
    row2.append(el("button", { class:"btn-primary", onclick:stageIntermission }, "\u{1F3AD} Curtain → Intermission"),
      stageBtn("✖ Stop", stageStop));
    sec.append(row2);
    body.append(sec);
  }
  return box;
}
function stageTwist(run, t){
  stageAppend({ k:"twist", key:t.key, label:t.label });
  if(t.key === "trick"){ stageScene(run, 3); return; }
  if(t.key === "mega"){
    const star = stageByRole(run, "star")[0];
    if(star) stageTryMega(star, stageTokenOf(star, run), run, "a Plot Twist", true);
    return;
  }
  const who = stageByRole(run, t.role).find(p => ownerHP(p) > 0 && stageTokenOf(p, run));
  if(who) stageOpenRoll(who, t.move);
  else toast(`${t.label}: that performer isn't on stage — play it by hand`);
}
function stageRender(){
  stageCss();
  if(stageRun()) stageProcess(stageRun());           // may append (a scene change) and re-render; read everything after it
  const run = stageRun(), s = stagePeek(), last = s && s.last;
  const old = document.getElementById("stageDock");
  const showLast = !run && last && isGM();
  if(!run && !showLast){ if(old) old.remove(); return; }
  const node = stageDockNode(run, last);
  if(old) old.replaceWith(node); else document.body.append(node);
}
/* the Encounters tab: start (or show) this act */
function stageEncounterButton(enc){
  if(!enc || !enc.stage || !isGM()) return null;
  const run = stageRun();
  if(run && run.encId === enc.id) return el("span", { class:"small", style:"font-weight:800;color:#a23b72;margin-left:6px" }, "\u{1F3AD} on stage now");
  return el("button", { class:"btn-primary", style:"padding:6px 12px;background:#a23b72;border-color:#a23b72",
    title:"Start this act on the Map players are looking at: Ovation, the act's gimmicks, reserves and scene changes run themselves",
    onclick:() => stageStart(enc) }, `\u{1F3AD} Start Act ${enc.stage.act || ""}`.trim());
}

/* app.js finished booting before this file loaded — show the dock if an act was already running */
try{ stageRender(); }catch(e){ console.error(e); }
