/* ===================================================================
   🎀 POKÉMON CONTESTS — PTU 1.05 Core, Chapter 8 (pp.261-270)

   Loaded AFTER app.js (index.html), so everything here can use app.js's globals, and app.js only
   ever reaches in through a handful of `typeof contestX === "function"` guarded hooks:
     render()/flushUiRefresh  → contestRender()          the dock + the stage overlay, on every screen
     openMoveRoll             → contestInterceptMove()   Contest Mode: a Move performs instead of attacking
                              → contestBattleAppealBtn() Battle Contest: the attack ALSO rolls Appeal
     moveLineShort/moveDetailHTML → contestMoveLine()/contestDetailHTML()
     toggleBattle             → contestBattleHook()      "⚔ Battle" in Contest Mode starts a contest
     applyAutoKO / recallPokemon / advanceInitiative → Battle Contest Voltage + rounds
     renderEncounters         → contestEncounterCards()  the 🎀 Contest encounter kind
     renderMonInfo            → contestStatsCard()       Poffins + Contest Stat dice on the sheet

   SHARED STATE. Contest Mode and the running contest live in the shared ROLLS row
   (`rolls_<campaign>.data.contest`) — the row every player may already write to (Blessings, the
   phone). So a player rolls their own Introduction and their own Appeal from their own screen, and
   everybody's stage updates. Offline (local mode) it is `state.contest`, saved with save().

       contest = { on: bool,                  ← Contest Mode (GM switch)
                   run: null | { … } }        ← the contest on stage right now (ctBuildRun)

   Only the GM flips the mode, starts/ends a contest and uses the GM tools. Anyone who can edit a
   contestant's sheet performs for it; NPC coordinators are the GM's.
=================================================================== */

/* ---------- the rules, as data ---------- */
const CT_STATS = ["Cool","Tough","Beauty","Smart","Cute"];
const CT_ICON  = { Cool:"😎", Tough:"💪", Beauty:"💎", Smart:"🎓", Cute:"🎀" };
const CT_COLOR = { Cool:"#2f6fdb", Tough:"#c77700", Beauty:"#8e44ad", Smart:"#13996b", Cute:"#d6337a" };
/* p.262: Attack→Cool, Defense→Tough, Sp.Atk→Beauty, Sp.Def→Smart, Speed→Cute */
const CT_COMBAT = { Cool:"atk", Tough:"def", Beauty:"spatk", Smart:"spdef", Cute:"spd" };
/* the pentagon: each Stat is ALLIED with its two neighbours and OPPOSED to the other two.
   Checked against the book's own example — in a Cool Contest, Smart & Cute are opposed, Tough &
   Beauty allied. */
const CT_RING = ["Cool","Beauty","Cute","Smart","Tough"];
/* Introduction Stage Skills (p.263) and the dice each one makes */
const CT_SKILLS = [["charm","Charm","Cute"],["command","Command","Cool"],["guile","Guile","Smart"],
                   ["intimidate","Intimidate","Tough"],["intuition","Intuition","Beauty"]];
/* Supercontest: 1d6 at the start of each round — 1 Cool, 2 Tough, 3 Beauty, 4 Smart, 5 Cute, 6 re-roll */
const CT_SUPER = [null,"Cool","Tough","Beauty","Smart","Cute"];
/* Position charts (p.265). order[r] = the letters in turn order for round r+1; stage = which TURN
   stands in each spot, left to right. Turn 1 always stands in the middle — the Center of Attention. */
const CT_CHARTS = {
  3: { stage:[3,1,2],     order:[["A","B","C"],["B","C","A"],["C","A","B"]] },
  4: { stage:[2,4,1,3],   order:[["A","B","C","D"],["B","D","A","C"],["C","A","D","B"],["D","C","B","A"]] },
  5: { stage:[5,3,1,2,4], order:[["A","B","C","D","E"],["B","E","D","A","C"],["C","D","B","E","A"],
                                 ["D","A","E","C","B"],["E","C","A","B","D"]] },
};
/* The 23 Contest Effects (p.266). `base` = the Move's own dice; `x` = the dice depend on Voltage. */
const CT_FX = {
  "Attention Grabber": { base:1, dice:"1d6", text:"Each adjacent competitor loses up to 2 Voltage, and you gain the Voltage they lost." },
  "Big Show":          { base:1, dice:"1d6", text:"You gain +3 Voltage." },
  "Catching Up":       { base:2, dice:"2d6", text:"If every adjacent competitor has more Voltage than you: +3d6 and you gain +1 Voltage." },
  "Desperation":       { base:5, dice:"5d6", text:"Every 1 gives you +1 Fumble; every 6 gives +1 more Appeal. Stacks with the Center of Attention." },
  "Double Time":       { base:0, x:true, dice:"Xd6", text:"You lose 2 Voltage. +1d6 per Voltage your adjacent competitors have, −1d6 per Voltage you have left." },
  "Excitement":        { base:3, dice:"3d6", text:"You gain +2 Voltage." },
  "Exhausting Act":    { base:4, dice:"4d6", text:"With 2+ Voltage roll +2d6; then you lose 2 Voltage." },
  "Gamble":            { base:2, dice:"2d6", text:"Every 6 rolled gives you +1 Voltage." },
  "Get Ready":         { base:1, dice:"1d6", text:"You lose 2 Voltage. Next round your Move's own dice are doubled (Contest Stat and Voltage dice are not)." },
  "Good Show":         { base:2, dice:"2d6", text:"If every adjacent competitor has less Voltage than you: +3d6 and you gain +1 Voltage." },
  "Incentives":        { base:3, dice:"3d6", text:"If the Move matches the Contest Type: you gain 1 Voltage and each adjacent competitor loses 1." },
  "Inversed Appeal":   { base:0, x:true, dice:"Xd6", text:"Roll (5 − your Voltage) d6." },
  "Reflective Appeal": { base:0, x:true, dice:"Xd6", text:"Roll d6 equal to your Voltage." },
  "Reliable":          { base:3, dice:"3d6", text:"If you used this same Move last turn: +1d6 and +1 Voltage. Reliable Moves may be repeated." },
  "Sabotage":          { base:3, dice:"3d6", text:"Your dice give you no Appeal — every adjacent competitor gains that many Fumble Points instead." },
  "Safe Option":       { base:4, dice:"4d6", text:"6s give only 1 Appeal this time, but your 1s can't give you Fumble Points." },
  "Saving Grace":      { base:1, dice:"1d6", text:"Lose 1 Fumble per Voltage you have; if that removes 2 or fewer, +1 Voltage. Competitors' Moves can't give you Fumble for the rest of the round." },
  "Seen Nothing Yet":  { base:0, x:true, dice:"Xd6", text:"You lose all your Voltage and roll +2d6 for each point lost." },
  "Special Attention": { base:5, dice:"5d6", text:"Each adjacent competitor gains 1 Voltage." },
  "Steady Performance":{ base:5, dice:"5d6", text:"You gain +1 Voltage." },
  "Tease":             { base:4, dice:"4d6", text:"5s and 6s give only 1 Appeal, but every 6 gives each adjacent competitor +1 Fumble." },
  "Unsettling":        { base:5, dice:"5d6", text:"You lose 2 Voltage and each adjacent competitor loses 1 Voltage." },
};
/* the move data's own spellings ("Get Ready!", "Double TIme", "Inverted Appeal", "Reflective Apeal") */
const CT_FX_ALIAS = { invertedappeal:"Inversed Appeal", reflectiveapeal:"Reflective Appeal", reflectiveappeal:"Reflective Appeal" };
/* Style Expert branch Features that make a Move "one step more aligned" once per Contest (pp.115-117) */
const CT_ALIGN_FEATS = { Beauty:"Fabulous Max", Cool:"Rule of Cool", Cute:"Gleeful Steps", Smart:"Calculated Assault", Tough:"Macho Charge" };
const CT_VARIANTS = {
  standard: { name:"Standard Contest", icon:"🎀", blurb:"One Contest Type the whole time (a “Cool Contest”, a “Cute Contest”…)." },
  super:    { name:"Supercontest",     icon:"🎲", blurb:"The Contest Type is rolled at the start of every round (1d6: Cool, Tough, Beauty, Smart, Cute, re-roll 6)." },
  festival: { name:"Festival",         icon:"🎪", blurb:"Contest after contest: the lowest Appeal is eliminated each time (Appeal carries over) until three are left — the best of the final three wins." },
  battle:   { name:"Battle Contest",   icon:"⚔",  blurb:"A real battle where every Move also rolls Appeal — 1-on-1, every Trainer for themselves, or teams. 3–6 Pokémon each, 2 rounds per Pokémon; most Appeal wins, not the last one standing." },
};

/* ---------- small helpers ---------- */
function ctD6(){ return 1 + Math.floor(Math.random()*6); }
function ctRollN(n){ const out=[]; for(let i=0;i<Math.max(0,n|0);i++) out.push(ctD6()); return out; }
function ctClampV(v){ return Math.max(0, Math.min(5, Math.round(v||0))); }
function ctCap(s){ s = String(s||"").trim().toLowerCase(); return CT_STATS.find(x=>x.toLowerCase()===s) || null; }
function ctNormFx(s){
  const k = String(s||"").toLowerCase().replace(/[^a-z]/g,"");
  if(!k) return null;
  if(CT_FX_ALIAS[k]) return CT_FX_ALIAS[k];
  return Object.keys(CT_FX).find(n=>n.toLowerCase().replace(/[^a-z]/g,"")===k) || null;
}
/* "Cute - Excitement" → { T:"Cute", fx:"Excitement" } */
function ctParseContest(str){
  const m = /^\s*(Cool|Tough|Beauty|Smart|Cute)\s*[-–—:]\s*(.+?)\s*$/i.exec(String(str||""));
  if(!m) return null;
  const fx = ctNormFx(m[2]);
  return fx ? { T: ctCap(m[1]), fx } : null;
}
/* A Move's Contest Type + Effect: the book's, else what the table picked for it in this contest
   (newer Moves and Innovation Moves have none printed). */
function ctMoveContest(m, run){
  if(!m) return null;
  return ctParseContest(m.contest) || (run && run.moveFix && ctParseContest(run.moveFix[m.name])) || null;
}
function ctRelation(T, RT){
  if(!T || !RT) return "none";
  if(T === RT) return "match";
  const d = Math.abs(CT_RING.indexOf(T) - CT_RING.indexOf(RT));
  return (d===1 || d===4) ? "ally" : "oppose";
}
function ctRelLabel(rel){ return { match:"matches the Contest Type (+1d6)", ally:"allied Type (no change)", oppose:"opposed Type (−1d6)", none:"no Contest Type" }[rel] || ""; }
function ctChart(N){
  if(CT_CHARTS[N]) return CT_CHARTS[N];
  /* The book only charts 3, 4 and 5 contestants. Anything else gets a plain rotation: everyone goes
     first (and so stands in the middle) exactly once, odd turns to the left, even to the right. */
  const L = n => String.fromCharCode(65+n), order = [];
  for(let r=0;r<N;r++){ const row=[]; for(let k=0;k<N;k++) row.push(L((r+k)%N)); order.push(row); }
  const left=[], right=[]; for(let t=2;t<=N;t++) (t%2 ? left : right).push(t);
  return { order, stage:[...left.reverse(), 1, ...right], generated:true };
}
function ctTypeChip(T, extra){
  if(!T) return el("span",{class:"ct-chip",style:"background:var(--muted)"}, extra || "no type");
  return el("span",{class:"ct-chip",style:`background:${CT_COLOR[T]}`}, `${CT_ICON[T]} ${T}${extra?` ${extra}`:""}`);
}
function ctVolt(v){
  const box = el("span",{class:"ct-volt",title:`Voltage ${v}/5 — +1d6 per point at the start of the turn`});
  for(let i=0;i<5;i++) box.append(el("i",{class: i<v ? "on" : ""}));
  return box;
}
function ctHasFeat(t, name){ return !!t && (hasFeatureLoose(t, name) || trainerHasEdge(t, name)); }

/* ---------- shared state ---------- */
/* read-only: never creates the rolls row (a blank local row could out-rank the server's on fetch) */
function contestPeek(){
  if(mode==="cloud"){ const d = cloud.rolls && cloud.rolls.data; return (d && d.contest && typeof d.contest==="object") ? d.contest : null; }
  return (state.contest && typeof state.contest==="object") ? state.contest : null;
}
function contestData(){
  if(mode==="cloud"){
    const d = ensureRolls().data;
    if(!d.contest || typeof d.contest!=="object" || Array.isArray(d.contest)) d.contest = { on:false, run:null };
    return d.contest;
  }
  if(!state.contest || typeof state.contest!=="object") state.contest = { on:false, run:null };
  return state.contest;
}
function contestModeOn(){ try{ const c = contestPeek(); return !!(c && c.on); }catch(e){ return false; } }
function contestRunLive(){ const c = contestPeek(); return (c && c.on && c.run && typeof c.run==="object") ? c.run : null; }
function contestSave(){
  if(mode==="cloud") saveRolls(); else save();
  try{ contestRender(); }catch(e){ console.error(e); }
}
/* every write goes through here: mutate the live run, then one save */
function contestWrite(fn){
  const c = contestData();
  if(!c.run){ toast("No contest is running"); return null; }
  const out = fn(c.run, c);
  contestSave();
  return out;
}
function contestSetMode(on){
  if(!isGM()){ toast("Only the GM can switch Contest Mode"); return; }
  const c = contestData();
  if(!on && c.run && c.run.stage!=="results"
     && !confirm("A contest is still on stage. Turn Contest Mode off and stop it?")) return;
  if(!on && c.run && c.run.stage!=="results") c.run = null;
  c.on = !!on;
  contestSave(); render();
  toast(on ? "🎀 Contest Mode ON — every Pokémon Move now performs its Contest Effect"
           : "Contest Mode off — Moves battle normally again");
}

/* ---------- who is who ---------- */
function ctSheetChar(id){
  if(mode==="cloud"){ const r = cloud.byId && cloud.byId[id]; return (r && r.data) || null; }
  return (state.characters||[]).find(c=>c && c.id===id) || null;
}
function ctSheetList(){
  if(mode==="cloud") return Object.values(cloud.byId||{}).filter(r=>r && r.data && r.data.trainer && !charArchived(r.data))
    .map(r=>({ id:r.id, char:r.data, owner:r.owner_name||"" }));
  return (state.characters||[]).filter(c=>c && c.trainer && !charArchived(c)).map(c=>({ id:c.id, char:c, owner:"" }));
}
function ctEncById(id){ try{ return (encList()||[]).find(e=>e && e.id===id) || null; }catch(e){ return null; } }
/* ref = {src:"sheet", sheetId, monId} | {src:"enc", encId, trId, monId} → the LIVE objects */
function ctResolveRef(ref){
  if(!ref) return {};
  if(ref.src==="sheet"){
    const c = ctSheetChar(ref.sheetId); if(!c) return {};
    return { char:c, trainer:c.trainer||null, mon:(c.pokemon||[]).find(x=>x && x.id===ref.monId) || null };
  }
  const e = ctEncById(ref.encId), tr = e && (e.trainers||[]).find(x=>x && x.id===ref.trId);
  return { enc:e, tr, trainer:(tr && tr.trainer) || null, mon:(tr && (tr.pokemon||[]).find(x=>x && x.id===ref.monId)) || null };
}
function ctCanActEnt(ent){
  if(!ent) return false;
  if(isGM()) return true;
  if(ent.src!=="sheet") return false;
  if(mode!=="cloud") return true;
  const r = cloud.byId && cloud.byId[ent.sheetId];
  return !!r && canEdit(r);
}
/* write a sheet/encounter object back after the contest touched it (AP spent) */
function ctPersistRef(ref){
  if(!ref) return;
  if(ref.src==="sheet"){
    if(mode==="cloud"){ const r = cloud.byId[ref.sheetId]; if(r && canEdit(r)) cloudSaveRow(r); }
    else save();
  } else saveEnc();
}
function ctImgOf(p){ const s = String((p && p.image) || ""); return (s && !s.startsWith("data:") && s.length < 700) ? s : ""; }
function ctMonPic(m, cls){ return monSprite(m.species, m.shiny, cls||"s-sm", m.img || undefined); }
function ctEntName(e){ if(!e) return "?"; return (e.mons && e.mons.length===1) ? `${e.mons[0].name}` : (e.trainer || "Trainer"); }
function ctEntFull(e){ if(!e) return "?"; return (e.mons && e.mons.length===1) ? `${e.mons[0].name} (${e.trainer})` : e.trainer; }

/* ---------- a Pokémon's Contest Stat dice (p.262) ---------- */
function ctPoffins(p){
  const o = (p && p.poffins && typeof p.poffins==="object") ? p.poffins : {}, out = {};
  CT_STATS.forEach(s=> out[s] = Math.max(0, Math.round(+o[s]||0)));
  return out;
}
/* 1 Poffin, +1 per 5 Levels, at most 6 (Lv 25) — Grace lets its owner's Pokémon eat 2 more */
function ctPoffinCap(p, t){ return Math.min(6, 1 + Math.floor(((p && p.level)||1)/5)) + (t && trainerHasEdge(t,"Grace") ? 2 : 0); }
/* Style Expert's Chosen Contest Stat(s): picked on the sheet (t.styleExpert), or read off the branch
   Features that name it in their prerequisites ("Style Expert, Beauty as Chosen Stat"). */
function ctStyleStats(t){
  if(!t || !hasFeatureLoose(t, "Style Expert")) return [];
  const set = new Set((Array.isArray(t.styleExpert) ? t.styleExpert : []).map(ctCap).filter(Boolean));
  (t.features||[]).forEach(f=>{
    const fd = (D.features||[]).find(x=>x && x.name && x.name.toLowerCase()===String(f||"").toLowerCase());
    const m = fd && /\b(Beauty|Cool|Cute|Smart|Tough)\s+as\s+(?:the\s+)?Chosen\s+(?:Contest\s+)?Stat/i.exec(fd.prerequisites||"");
    if(m) set.add(ctCap(m[1]));
  });
  return [...set];
}
/* Fabulous Ball (p.273): +2 dice in the Contest Stat of the Nature's raised Stat; HP natures pick two +1s */
function ctFabulous(p){
  if(!p || !p.fabulousBall) return {};
  const n = natureByName.get(String(p.nature||"").toLowerCase());
  const up = n && Object.entries(n.statMods||{}).find(([,v])=>v>0);
  if(up && up[0]!=="hp"){ const s = CT_STATS.find(x=>CT_COMBAT[x]===up[0]); return s ? { [s]:2 } : {}; }
  const o = {};
  (Array.isArray(p.fabulousPicks) ? p.fabulousPicks : []).map(ctCap).filter(Boolean).slice(0,2).forEach(s=>o[s]=(o[s]||0)+1);
  return o;
}
function ctMonDice(p, t){
  const dice = {}, parts = {};
  let tot = null; try{ tot = pokeDerived(p).total; }catch(e){}
  const pf = ctPoffins(p), se = ctStyleStats(t), fab = ctFabulous(p);
  let left = ctPoffinCap(p, t);                         // Poffins past the cap do nothing
  CT_STATS.forEach(s=>{
    const fromStat = tot ? Math.min(3, Math.floor((tot[CT_COMBAT[s]]||0)/10)) : 0;   // +1 per 10 points, max 3 — Combat Stages never count
    const poffin = Math.min(pf[s], Math.max(0, left)); left -= poffin;
    const style = se.includes(s) ? 2 : 0, fb = fab[s]||0;
    dice[s] = fromStat + poffin + style + fb;
    parts[s] = { stat:fromStat, poffin, style, fab:fb };
  });
  return { dice, parts };
}

/* ===================================================================
   THE CONTEST ENCOUNTER (👹 Encounters → 🎀 New Contest)
   enc.kind = "contest", enc.contest = { variant, ctype, superRounds, rotation, battleCount, sig,
   expMethod, entrants:[{id, src:"sheet"|"enc", sheetId|trId, monIds:[…]}], last:<results> }.
   NPC coordinators are ordinary encounter Trainers (the Trainers card below), so they're built with
   every tool the GM already has, and can drop on the Map for a Battle Contest like any NPC.
=================================================================== */
function ctNormEnc(enc){
  if(!enc.contest || typeof enc.contest!=="object") enc.contest = {};
  const k = enc.contest;
  if(!CT_VARIANTS[k.variant]) k.variant = "standard";
  if(!CT_STATS.includes(k.ctype)) k.ctype = "Cute";
  k.superRounds = !!k.superRounds;
  k.rotation = !!k.rotation;
  k.battleCount = Math.max(3, Math.min(6, Math.round(+k.battleCount||3)));
  if(!(+k.sig > 0)) k.sig = 2;
  if(k.expMethod!=="rules") k.expMethod = "example";
  if(!Array.isArray(k.entrants)) k.entrants = [];
  k.entrants = k.entrants.filter(x=>x && typeof x==="object" && Array.isArray(x.monIds));
  k.entrants.forEach(x=>{ if(!x.id) x.id = uid(); });
  /* Battle Contest format (p.270 allows double and triple battles): "ffa" = every Trainer for
     themselves; "teams" = Trainers grouped into sides whose Appeal is pooled (x.team = "1".."4"). */
  if(k.battleFormat!=="teams") k.battleFormat = "ffa";
  k.entrants.forEach(x=>{ x.team = CT_TEAM_KEYS.includes(String(x.team)) ? String(x.team) : "1"; });
  if(!k.teamNames || typeof k.teamNames!=="object" || Array.isArray(k.teamNames)) k.teamNames = {};
  return k;
}
const CT_TEAM_KEYS = ["1","2","3","4"];
function ctIsTeam(k){ return k.variant==="battle" || !!k.rotation; }
function ctTeamLabel(names, key){ const n = String((names||{})[key]||"").trim(); return n || `Team ${key}`; }
/* which side a contestant is on — in a free-for-all every Trainer is their own side */
function ctSideOf(run, e){ return run && run.teams ? "t" + (e.team || "1") : "e" + e.id; }
function ctSideName(run, e){ return run && run.teams ? ctTeamLabel(run.teamNames, e.team || "1") : (e.trainer || "Trainer"); }
function ctNewContestEncounter(){
  const n = prompt("Contest name:", "Pokémon Contest"); if(n===null) return;
  const e = newEncounter(n || "Pokémon Contest");
  e.kind = "contest"; e.color = "#d6337a"; e.sig = 2; e.players = 1;
  ctNormEnc(e);
  encList().push(e); state.activeEncounterId = e.id; saveEnc(); renderEncounters();
  toast("🎀 Contest encounter created — add the contestants, then ▶ Start");
}
function ctEntrantRefs(enc, en){
  return (en.monIds||[]).map(mid => en.src==="sheet" ? { src:"sheet", sheetId:en.sheetId, monId:mid }
                                                      : { src:"enc", encId:enc.id, trId:en.trId, monId:mid });
}
function ctDiceLine(dice){
  const box = el("span",{class:"inline",style:"gap:4px;flex-wrap:wrap"});
  CT_STATS.forEach(s=>{ if(dice[s]) box.append(el("span",{class:"ct-chip",style:`background:${CT_COLOR[s]}`,title:`${s} Contest dice`}, `${CT_ICON[s]}${dice[s]}`)); });
  if(!box.childNodes.length) box.append(el("span",{class:"small muted"},"no Contest dice"));
  return box;
}
function contestEncounterCards(enc, root){
  const k = ctNormEnc(enc), gm = isGM();
  const live = contestRunLive();
  const save = ()=>{ saveEnc(); renderEncounters(); };
  /* — settings — */
  const sc = el("div",{class:"card ct-enc"});
  sc.append(el("h3",{}, "🎀 Contest",
    el("button",{class:"btn-secondary",style:"padding:6px 12px",onclick:ctOpenHelp},"📖 How it works"),
    el("button",{class:"btn-secondary",style:"padding:6px 12px",onclick:()=>ctOpenExp(enc)},"🧮 Contest EXP")));
  const vSel = el("select",{});
  Object.entries(CT_VARIANTS).forEach(([key,v])=>vSel.append(el("option",{value:key,selected:k.variant===key}, `${v.icon} ${v.name}`)));
  vSel.addEventListener("change",()=>{ k.variant = vSel.value; save(); });
  const tSel = el("select",{});
  CT_STATS.forEach(s=>tSel.append(el("option",{value:s,selected:k.ctype===s}, `${CT_ICON[s]} ${s}`)));
  tSel.addEventListener("change",()=>{ k.ctype = tSel.value; save(); });
  const row = el("div",{class:"ct-row",style:"margin-top:6px"});
  row.append(el("label",{class:"field",style:"max-width:220px"}, el("span",{},"Contest variant"), vSel));
  const fixedType = k.variant==="standard" || ((k.variant==="festival"||k.variant==="battle") && !k.superRounds);
  if(k.variant==="festival" || k.variant==="battle"){
    const rSel = el("select",{});
    rSel.append(el("option",{value:"fixed",selected:!k.superRounds},"One Contest Type (Standard)"),
                el("option",{value:"super",selected:k.superRounds},"Rolled every round (Super)"));
    rSel.addEventListener("change",()=>{ k.superRounds = rSel.value==="super"; save(); });
    row.append(el("label",{class:"field",style:"max-width:230px"}, el("span",{},"Round types"), rSel));
  }
  if(fixedType) row.append(el("label",{class:"field",style:"max-width:160px"}, el("span",{},"Contest Type"), tSel));
  if(k.variant==="battle"){
    const bc = el("input",{type:"number",min:3,max:6,value:k.battleCount,style:"width:70px"});
    bc.addEventListener("change",()=>{ k.battleCount = Math.max(3,Math.min(6,parseInt(bc.value)||3)); save(); });
    row.append(el("label",{class:"field",style:"max-width:170px"}, el("span",{},"Pokémon each (3–6)"), bc));
    const fSel = el("select",{});
    fSel.append(el("option",{value:"ffa",selected:k.battleFormat==="ffa"},"Every Trainer for themselves"),
                el("option",{value:"teams",selected:k.battleFormat==="teams"},"Teams (Appeal pooled per side)"));
    fSel.addEventListener("change",()=>{ k.battleFormat = fSel.value; save(); });
    row.append(el("label",{class:"field",style:"max-width:240px",
      title:"p.270: Battle Contests can be double or triple battles. Every opposing Pokémon on the field counts as adjacent."},
      el("span",{},"Format"), fSel));
  } else {
    const rot = el("input",{type:"checkbox"}); rot.checked = k.rotation;
    rot.addEventListener("change",()=>{ k.rotation = rot.checked; save(); });
    row.append(el("label",{class:"inline",style:"gap:6px;cursor:pointer",
      title:"Rotation Contest (p.269): a different Pokémon each round, each performs once; a contestant can spend at most 2 × (contestants) Contest dice in the whole contest"},
      rot, el("span",{class:"small",style:"font-weight:700"},"🔄 Rotation (a different Pokémon each round)")));
  }
  sc.append(row);
  const nEnt = k.entrants.length;
  const rounds = k.variant==="battle" ? 2*k.battleCount : nEnt;
  sc.append(el("div",{class:"small muted",style:"margin-top:6px"},
    `${CT_VARIANTS[k.variant].blurb} `,
    el("b",{}, k.variant==="battle" ? `${rounds} rounds of combat.` : `${nEnt} contestant${nEnt===1?"":"s"} → ${rounds} round${rounds===1?"":"s"} in the Performance Stage.`),
    (k.variant!=="battle" && nEnt && !CT_CHARTS[nEnt]) ? ` The book charts positions for 3–5 contestants; ${nEnt} uses a generated rotation.` : ""));
  const modeRow = el("div",{class:"ct-row",style:"margin-top:10px"});
  const on = contestModeOn();
  if(gm){
    modeRow.append(el("button",{class:"btn-secondary"+(on?" on":""),onclick:()=>contestSetMode(!on),
      title:"While Contest Mode is on, every Pokémon Move performs its Contest Effect instead of attacking"},
      on ? "🎀 Contest Mode ON" : "🎀 Contest Mode off"));
    modeRow.append(el("button",{class:"btn-primary",onclick:()=>ctStartRun(enc)},
      live && live.encId===enc.id && live.stage!=="results" ? "🎭 Open the stage" : "▶ Start this contest"));
  }
  if(live && live.encId===enc.id) modeRow.append(el("span",{class:"small",style:"font-weight:700"}, `On stage now: ${ctStatusText(live)}`));
  sc.append(modeRow);
  /* EXP settings live here so the calculator remembers them */
  const sig = el("input",{type:"number",min:0.5,step:0.5,value:k.sig,style:"width:70px"});
  sig.addEventListener("change",()=>{ k.sig = Math.max(0.5, parseFloat(sig.value)||2); saveEnc(); });
  sc.append(el("div",{class:"ct-row",style:"margin-top:8px"},
    el("label",{class:"field",style:"max-width:200px",title:"Contests use a low Significance Multiplier — the book suggests ×1.5 or ×2, more if this Contest really matters"},
      el("span",{},"EXP significance ×"), sig),
    k.last ? el("span",{class:"small muted"}, `Last result: ${(k.last.rows||[]).filter(r=>r.place===1).map(r=>r.name).join(" & ") || "?"} won (${new Date(k.last.at||Date.now()).toLocaleDateString()})`) : ""));
  root.append(sc);

  /* — contestants — */
  const cc = el("div",{class:"card"});
  const team = ctIsTeam(k);
  cc.append(el("h3",{}, `Contestants (${nEnt})`,
    el("button",{class:"linkbtn h-act",onclick:()=>ctPickPlayerMons(enc)},"+ player Pokémon"),
    el("button",{class:"linkbtn h-act",onclick:()=>ctPickNpcMons(enc)},"+ NPC Pokémon")));
  const teamsOn = k.variant==="battle" && k.battleFormat==="teams";
  cc.append(el("div",{class:"small muted",style:"margin:-4px 0 8px"},
    k.variant==="battle" ? (teamsOn
        ? `Put each Trainer on a team; a team's Appeal is added together and the best team wins. Give each Trainer ${k.battleCount} Pokémon (the first ${k.battleCount} ticked are used).`
        : `Two or more Trainers, each for themselves — the most Appeal wins. Give each one ${k.battleCount} Pokémon (the first ${k.battleCount} ticked are used).`)
    : team ? "One row per Trainer (or team) with the Pokémon they'll rotate through."
    : "One row per performing Pokémon. NPC coordinators are built in the Trainers card below — give them Pokémon there, then add them here."));
  if(!nEnt) cc.append(el("span",{class:"muted small"},"nobody yet."));
  k.entrants.forEach((en, i)=>{
    const refs = ctEntrantRefs(enc, en);
    const line = el("div",{class:"moveslot",style:"align-items:flex-start"});
    const mid = el("div",{style:"flex:1;min-width:0"});
    const tName = en.src==="sheet" ? (((ctSheetChar(en.sheetId)||{}).trainer||{}).name || (ctSheetChar(en.sheetId)||{}).name || "Player")
                                   : ((((enc.trainers||[]).find(t=>t.id===en.trId)||{}).trainer||{}).name || "NPC");
    const head = el("div",{class:"inline",style:"gap:8px;flex-wrap:wrap"}, el("b",{}, tName),
      el("span",{class:"small muted",style:"font-weight:600"}, en.src==="sheet" ? "player" : "NPC"));
    if(teamsOn){
      const ts = el("select",{style:"padding:2px 6px;width:auto;max-width:180px",title:"which team this Trainer is on"});
      CT_TEAM_KEYS.forEach(key=>ts.append(el("option",{value:key,selected:en.team===key}, ctTeamLabel(k.teamNames, key))));
      ts.addEventListener("change",()=>{ en.team = ts.value; save(); });
      head.append(ts);
    }
    mid.append(head);
    refs.forEach(ref=>{
      const R = ctResolveRef(ref), p = R.mon;
      if(!p){ mid.append(el("div",{class:"small",style:"color:var(--bad)"},"⚠ a Pokémon here can't be found (deleted or moved?)")); return; }
      const dd = ctMonDice(p, R.trainer);
      mid.append(el("div",{class:"inline",style:"gap:6px;margin-top:4px;flex-wrap:wrap"},
        monSprite(p.species, p.shiny, "s-sm", ctImgOf(p)||undefined),
        el("span",{style:"font-weight:700"}, `${p.nickname || p.species} · Lv ${p.level||1}`),
        ctDiceLine(dd.dice)));
    });
    line.append(mid, el("div",{class:"inline",style:"gap:2px"},
      encOrderBtns(k.entrants, en),
      el("button",{class:"btn-secondary",style:"padding:3px 8px",title:"remove from the contest",
        onclick:()=>{ k.entrants.splice(k.entrants.indexOf(en),1); save(); }},"✕")));
    cc.append(line);
  });
  if(teamsOn && nEnt){
    const used = [...new Set(k.entrants.map(en=>en.team))].sort();
    const names = el("div",{class:"ct-row",style:"margin-top:8px"}, el("span",{class:"small",style:"font-weight:700"},"Team names:"));
    used.forEach(key=>{ const inp = el("input",{type:"text",value:(k.teamNames||{})[key]||"",placeholder:`Team ${key}`,style:"width:150px"});
      inp.addEventListener("change",()=>{ k.teamNames[key] = inp.value.trim(); save(); }); names.append(inp); });
    cc.append(names);
    if(used.length<2) cc.append(el("div",{class:"small",style:"color:var(--bad);margin-top:6px"},"⚠ Everyone is on the same team — put the other side on a different team."));
  }
  if(k.variant==="battle" && nEnt===1) cc.append(el("div",{class:"small",style:"color:var(--bad);margin-top:6px"},"⚠ A Battle Contest needs at least two Trainers."));
  if(k.variant!=="battle" && nEnt && nEnt<2) cc.append(el("div",{class:"small",style:"color:var(--bad);margin-top:6px"},"⚠ A contest needs at least two contestants."));
  root.append(cc);
}
/* tick a sheet's Pokémon → contestants. Teams (Rotation/Battle) make one row per Trainer. */
function ctPickPlayerMons(enc){
  const k = ctNormEnc(enc), team = ctIsTeam(k);
  const sheets = ctSheetList();
  const body = el("div",{});
  if(!sheets.length){ body.append(el("div",{class:"muted"},"No player sheets found.")); }
  const picks = [];
  sheets.forEach(s=>{
    const box = el("div",{class:"ct-box"});
    box.append(el("div",{style:"font-weight:800"}, `${(s.char.trainer||{}).name || s.char.name || "Trainer"}`, s.owner ? el("span",{class:"small muted",style:"margin-left:6px"}, s.owner) : ""));
    const mons = (s.char.pokemon||[]).slice().sort((a,b)=>(b.onTeam?1:0)-(a.onTeam?1:0));
    if(!mons.length) box.append(el("div",{class:"small muted"},"no Pokémon"));
    mons.forEach(p=>{
      const cb = el("input",{type:"checkbox"});
      picks.push({ cb, sheetId:s.id, monId:p.id });
      box.append(el("label",{class:"inline",style:"gap:6px;cursor:pointer;margin:3px 0"}, cb,
        monSprite(p.species, p.shiny, "s-sm", ctImgOf(p)||undefined),
        el("span",{}, `${p.nickname || p.species} · Lv ${p.level||1}${p.onTeam?"":" (in the PC)"}`),
        ctDiceLine(ctMonDice(p, s.char.trainer).dice)));
    });
    body.append(box);
  });
  modal({ title:"🎀 Add player Pokémon", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      const on = picks.filter(x=>x.cb.checked); if(!on.length){ toast("Tick at least one Pokémon"); return; }
      ctAddPicks(k, on.map(x=>({ src:"sheet", sheetId:x.sheetId, monId:x.monId })), team);
      closeModal(); saveEnc(); renderEncounters();
    }},"Add") ]});
}
function ctPickNpcMons(enc){
  const k = ctNormEnc(enc), team = ctIsTeam(k);
  const body = el("div",{});
  if(!(enc.trainers||[]).length) body.append(el("div",{class:"muted"},"No NPC Trainers in this encounter yet — add one in the Trainers card (＋ add Trainer), give them Pokémon, then come back."));
  const picks = [];
  (enc.trainers||[]).forEach(tr=>{
    const box = el("div",{class:"ct-box"});
    box.append(el("div",{style:"font-weight:800"}, (tr.trainer && tr.trainer.name) || "NPC"));
    if(!(tr.pokemon||[]).length) box.append(el("div",{class:"small muted"},"no Pokémon"));
    (tr.pokemon||[]).forEach(p=>{
      const cb = el("input",{type:"checkbox"});
      picks.push({ cb, trId:tr.id, monId:p.id });
      box.append(el("label",{class:"inline",style:"gap:6px;cursor:pointer;margin:3px 0"}, cb,
        monSprite(p.species, p.shiny, "s-sm", ctImgOf(p)||undefined),
        el("span",{}, `${p.nickname || p.species} · Lv ${p.level||1}`), ctDiceLine(ctMonDice(p, tr.trainer).dice)));
    });
    body.append(box);
  });
  modal({ title:"🎀 Add NPC Pokémon", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      const on = picks.filter(x=>x.cb.checked); if(!on.length){ toast("Tick at least one Pokémon"); return; }
      ctAddPicks(k, on.map(x=>({ src:"enc", trId:x.trId, monId:x.monId })), team);
      closeModal(); saveEnc(); renderEncounters();
    }},"Add") ]});
}
function ctAddPicks(k, list, team){
  const owner = x => x.src==="sheet" ? "s:"+x.sheetId : "t:"+x.trId;
  const already = new Set(k.entrants.flatMap(en=>en.monIds));
  list = list.filter(x=>!already.has(x.monId));
  if(team){
    list.forEach(x=>{
      let en = k.entrants.find(e=>owner(e.src==="sheet"?{src:"sheet",sheetId:e.sheetId}:{src:"enc",trId:e.trId})===owner(x));
      // a new Battle Contest Trainer starts on the obvious team: players together, NPCs on the other side
      if(!en){ en = { id:uid(), src:x.src, sheetId:x.sheetId||null, trId:x.trId||null, monIds:[], team: x.src==="sheet" ? "1" : "2" }; k.entrants.push(en); }
      en.monIds.push(x.monId);
    });
  } else list.forEach(x=>k.entrants.push({ id:uid(), src:x.src, sheetId:x.sheetId||null, trId:x.trId||null, monIds:[x.monId] }));
}

/* ===================================================================
   THE RUN — one contest on stage
=================================================================== */
function ctBuildRun(enc){
  const k = ctNormEnc(enc), variant = k.variant;
  const superMode = variant==="super" || ((variant==="festival"||variant==="battle") && k.superRounds);
  const ents = [];
  const teams = variant==="battle" && k.battleFormat==="teams";
  k.entrants.forEach(en=>{
    const refs = ctEntrantRefs(enc, en).slice(0, variant==="battle" ? k.battleCount : 99);
    let trainerName = "";
    const mons = refs.map(ref=>{
      const R = ctResolveRef(ref), p = R.mon; if(!p) return null;
      if(!trainerName) trainerName = (R.trainer && R.trainer.name) || (R.char && R.char.name) || "";
      return Object.assign({ key:uid(), name:p.nickname || p.species, species:p.species, shiny:!!p.shiny, img:ctImgOf(p),
        level:p.level||1, dice:ctMonDice(p, R.trainer).dice, used:{}, voltage:0, appeal:0, fumble:0,
        lastMove:null, ko:false, performed:false, fashionUsed:false }, ref);
    }).filter(Boolean);
    if(!mons.length) return;
    ents.push({ id:uid(), src:en.src, sheetId:en.sheetId||null, encId:en.src==="enc"?enc.id:null, trId:en.trId||null,
      trainer: trainerName || (en.src==="sheet" ? "Player" : "NPC"), mons,
      letter:null, appeal:0, fumble:0, voltage:0, intro:null, introDice:{}, introUsed:{}, spent:0, flags:{},
      eliminated:false, activeKey:null, centerNext:false, team: teams ? (en.team || "1") : null });
  });
  return { id:uid(), encId:enc.id, name:enc.name, variant, ctype:k.ctype, superMode,
           teams, teamNames: teams ? Object.assign({}, k.teamNames) : {},
           rotation: variant!=="battle" && !!k.rotation, stage:"intro", leg:1, round:1, turn:0,
           rounds: variant==="battle" ? 2*k.battleCount : ents.length, battleCount:k.battleCount,
           roundType: superMode ? null : k.ctype, typeRolls:[], entrants:ents, log:[], moveFix:{},
           startedAt:Date.now() };
}
function ctStartRun(enc, opts){
  opts = opts || {};
  if(!isGM()){ toast("Only the GM starts a contest"); return false; }
  const c = contestData();
  if(c.run && c.run.encId===enc.id && c.run.stage!=="results"){ c.on = true; contestSave(); ctOpenStage(); return true; }
  if(c.run && c.run.stage!=="results" && !confirm(`“${c.run.name}” is still on stage. Replace it with “${enc.name}”?`)) return false;
  const k = ctNormEnc(enc);
  const run = ctBuildRun(enc);
  const sides = new Set(run.entrants.map(e=>ctSideOf(run, e))).size;
  if(run.entrants.length<2 || sides<2){
    toast(k.variant==="battle" ? (run.teams ? "A team Battle Contest needs at least two teams with Pokémon" : "A Battle Contest needs at least two Trainers with Pokémon")
                               : "Add at least two contestants first"); return false; }
  c.on = true; c.run = run;
  run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🎀 ${CT_VARIANTS[run.variant].name} “${run.name}” begins — ${run.entrants.length} contestant${run.entrants.length===1?"":"s"}${run.superMode?" · Contest Type rolled each round":` · ${run.ctype} Contest`}.` });
  contestSave(); render(); ctOpenStage();
  /* a Battle Contest IS a battle: if this started off the encounter card, flip the board's ⚔ on too */
  if(run.variant==="battle" && !opts.fromMap && mode==="cloud"){
    try{ const map = currentMapForView(); const meta = activeMapMeta();
         if(map && !meta.battleOn){ ctBypassBattle = true; Promise.resolve(toggleBattle(map)).finally(()=>{ ctBypassBattle = false; }); } }catch(e){ ctBypassBattle = false; }
  }
  toast(`🎀 ${run.name} — Introduction Stage`);
  return true;
}
function ctActive(run){ return (run.entrants||[]).filter(e=>!e.eliminated); }
function ctRoundsOf(run){ return run.variant==="battle" ? run.rounds : ctActive(run).length; }
function ctRoundType(run){ return run.superMode ? run.roundType : run.ctype; }
function ctRollRoundType(run){
  const rolls = []; let d;
  do { d = ctD6(); rolls.push(d); } while(d===6 && rolls.length < 20);
  run.roundType = CT_SUPER[d] || "Cool"; run.typeRolls = rolls;
}
function ctOrder(run){
  const act = ctActive(run), N = act.length; if(!N) return [];
  const ch = ctChart(N), r = ((run.round||1)-1) % N;
  return ch.order[r].map(L=>act.find(e=>e.letter===L)).filter(Boolean);
}
function ctStageLine(run){
  const ord = ctOrder(run), ch = ctChart(ord.length);
  return ch.stage.map(t=>ord[t-1]).filter(Boolean);
}
function ctCurrent(run){ return run.stage==="perform" && run.variant!=="battle" ? (ctOrder(run)[run.turn] || null) : null; }
function ctStatusText(run){
  if(!run) return "";
  if(run.stage==="intro") return `Introduction Stage${run.variant==="festival"?` · Contest ${run.leg}`:""}`;
  if(run.stage==="results"){
    const w = (run.entrants||[]).filter(e=>e.place===1);
    if(run.teams && w.length) return `🏆 ${ctSideName(run, w[0])}`;
    return `🏆 ${w.map(ctEntName).join(" & ") || "Results"}`; }
  const RT = ctRoundType(run);
  if(run.variant==="battle") return `Battle Contest · Round ${run.round}/${run.rounds}${RT?` · ${RT}`:""}`;
  const cur = ctCurrent(run);
  return `${run.variant==="festival"?`Contest ${run.leg} · `:""}Round ${run.round}/${ctRoundsOf(run)}${RT?` · ${RT}`:""}${cur?` · 🎤 ${ctEntName(cur)}`:""}`;
}
/* the Voltage holder: the contestant — or, in a Battle Contest, each Pokémon on its own */
function ctHolder(run, ent, mon){ return run.variant==="battle" ? mon : ent; }
function ctMonOnField(m){
  try{ const p = ctResolveRef(m).mon; return !!(p && tokenForOwner(p)); }catch(e){ return false; }
}
/* who an Effect can reach: the stage neighbours this round — in a Battle Contest every opposing
   Pokémon on the field (p.270), falling back to the one that last performed. "Opposing" is every
   other Trainer in a free-for-all, every Trainer on another team in a team Battle Contest. */
function ctOpponents(run, ent){ const mine = ctSideOf(run, ent); return run.entrants.filter(e=>ctSideOf(run, e)!==mine); }
function ctActiveMons(o){
  let on = o.mons.filter(m=>!m.ko && ctMonOnField(m));
  if(!on.length){ const a = o.mons.find(m=>m.key===o.activeKey && !m.ko); if(a) on = [a]; }
  return on;
}
function ctAdjacent(run, ent, mon){
  if(run.variant==="battle"){
    const out = [];
    ctOpponents(run, ent).forEach(o=>ctActiveMons(o).forEach(m=>out.push({ ent:o, mon:m, H:m })));
    return out;
  }
  const st = ctStageLine(run), i = st.indexOf(ent);
  return [st[i-1], st[i+1]].filter(Boolean).map(e=>({ ent:e, mon:null, H:e }));
}
function ctIsCenter(run, ent){ return run.variant==="battle" ? !!ent.centerNext : ctOrder(run)[0]===ent; }
function ctDiceLeft(ent, mon, T){
  if(!T) return 0;
  return Math.max(0, ((mon && mon.dice && mon.dice[T])||0) - ((mon && mon.used && mon.used[T])||0))
       + Math.max(0, ((ent.introDice||{})[T]||0) - ((ent.introUsed||{})[T]||0));
}
function ctSpendCap(run, ent, mon, T){
  let cap = Math.min(3, ctDiceLeft(ent, mon, T));
  if(run.rotation){ const N = run.entrants.length; cap = Math.min(cap, Math.max(0, 2*N - (ent.spent||0))); }
  return cap;
}
/* why this Move can't be performed right now ("" = it can) */
function ctMoveBlock(run, ent, mon, moveName, fx){
  if(!moveName) return "pick a Move";
  const lc = String(moveName).toLowerCase();
  if(mon && mon.banRound===run.round && (mon.banned||[]).some(n=>String(n).toLowerCase()===lc)) return "Adaptable Performance: not usable this round";
  if(run.variant!=="battle" && mon && mon.lastMove && String(mon.lastMove).toLowerCase()===lc && fx!=="Reliable")
    return "no Move twice in a row (Reliable Moves excepted)";
  return "";
}

/* ---------- Introduction Stage (p.263) ---------- */
function ctIntroOptions(run, ent){
  const R = ctResolveRef(ent.mons[0]), t = R.trainer;
  const grace = !!(t && trainerHasEdge(t, "Grace"));
  const skills = CT_SKILLS.map(([k,lbl,stat])=>{ const rank = (t && t.skills && t.skills[k]) || "Untrained"; return { k, lbl, stat, rank, n:rankDice(rank) }; });
  const bonuses = [];
  try{ if(t && t.combat && equippedList(t).some(e=>/fancy clothes/i.test(e.name))) bonuses.push({ id:"fancy", label:"👗 Fancy Clothes", n:2, pick:true }); }catch(e){}
  ent.mons.forEach(m=>{
    const pm = ctResolveRef(m).mon; if(!pm) return;
    if(/contest accessory/i.test(pm.heldItem||"")) bonuses.push({ id:"acc-"+m.key, label:`🎗 Contest Accessory (${m.name})`, n:2, pick:true });
    const uc = /Unusual coloration:\s*\+2d6[^.]*?for\s+(Cool|Tough|Beauty|Smart|Cute)/i.exec(pm.notes||"");
    if(uc) bonuses.push({ id:"color-"+m.key, label:`🧬 Unusual coloration (${m.name})`, n:2, stat:ctCap(uc[1]) });
  });
  if(t && hasFeatureLoose(t, "Juggling Show")){
    const n = Math.floor(rankNum((t.skills||{}).acrobatics || "Untrained") / 2);
    if(n>0) bonuses.push({ id:"juggle", label:"🤹 Juggling Show (½ Acrobatics)", n, pick:true });
  }
  const anyMon = fn => ent.mons.some(m=>{ const pm = ctResolveRef(m).mon; return !!(pm && fn(pm)); });
  return { t, grace, skills, bonuses,
    groomer: !!(t && trainerHasEdge(t, "Groomer")),
    ugly: anyMon(pm=>hasAbility(pm, "Ugly")),
    beautiful: anyMon(pm=>hasAbility(pm, "Beautiful") || hasAbility(pm, "Beautiful [Errata]")) };
}
function ctDefaultSkill(run, o){
  const want = ctRoundType(run) && !run.superMode ? run.ctype : null;
  const hit = want && o.skills.find(s=>s.stat===want);
  if(hit) return hit.k;
  return o.skills.slice().sort((a,b)=>b.n-a.n)[0].k;
}
function ctDoIntro(run, ent, spec){
  const o = ctIntroOptions(run, ent);
  const sk = o.skills.find(s=>s.k===spec.skill) || o.skills[0];
  const stat = (o.grace && CT_STATS.includes(spec.stat)) ? spec.stat : sk.stat;
  const n = sk.n + (spec.groomed ? 1 : 0);
  const gains = d => d>=3 && !(o.ugly && d===6);          // Ugly: 6s count as 1s in the Introduction
  const gained = {}, add = (s,k)=>{ if(k) gained[s] = (gained[s]||0) + k; };
  const rolls = ctRollN(n); add(stat, rolls.filter(gains).length);
  const bonus = (spec.bonuses||[]).filter(b=>b && b.n>0 && CT_STATS.includes(b.stat)).map(b=>{
    const r = ctRollN(b.n); add(b.stat, r.filter(gains).length); return { label:b.label, stat:b.stat, rolls:r }; });
  if(spec.beautiful) add("Beauty", 2);
  const matched = !run.superMode && !!run.ctype && sk.stat===run.ctype;
  const appeal = (matched ? 2 : 0) + (spec.contestCase ? 1 : 0);
  const total = Object.values(gained).reduce((a,b)=>a+b,0);
  ent.intro = { skill:sk.k, skillLbl:sk.lbl, rank:sk.rank, stat, rolls, bonus, gained, total, matched, appeal,
                ugly:o.ugly, groomed:!!spec.groomed, beautiful:!!spec.beautiful, contestCase:!!spec.contestCase, at:Date.now() };
  ent.introDice = gained; ent.introUsed = {};
  ent.appeal += appeal;
  run.log.push({ id:uid(), kind:"intro", at:Date.now(), eid:ent.id,
    text:`🎤 ${ent.trainer} introduces ${ctEntName(ent)} — ${sk.lbl} ${n}d6 [${rolls.join(",")}]${bonus.map(b=>` + ${b.label} [${b.rolls.join(",")}]`).join("")}`
       + ` → ${total} Contest ${total===1?"die":"dice"}${appeal?` · +${appeal} Appeal`:""}` });
}
function ctUndoIntro(run, ent){
  if(!ent.intro) return;
  ent.appeal -= ent.intro.appeal||0; ent.intro = null; ent.introDice = {}; ent.introUsed = {};
}
function ctStartPerformance(run){
  run.stage = "perform"; run.turn = 0;
  if(run.variant==="battle"){
    let r = 1; try{ const meta = activeMapMeta(); if(meta && meta.battleOn) r = meta.initRound || 1; }catch(e){}
    run.round = r;
    if(run.superMode) ctRollRoundType(run);
    run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`⚔ The battle begins — ${run.rounds} rounds. Every Move rolls Appeal too (🎀 Appeal in the Move's roll window).` });
    return;
  }
  run.round = 1;
  /* letters by total Introduction dice, highest first; +2 for rolling the matching Skill; ties = coin flip */
  const act = ctActive(run).map(e=>({ e, score:((e.intro && e.intro.total)||0) + ((e.intro && e.intro.matched) ? 2 : 0), tie:Math.random() }));
  act.sort((a,b)=>(b.score-a.score) || (a.tie-b.tie));
  act.forEach((x,i)=>{ x.e.letter = String.fromCharCode(65+i); });
  if(run.superMode) ctRollRoundType(run);
  run.log.push({ id:uid(), kind:"sys", at:Date.now(),
    text:`🎭 Performance Stage — ${act.map(x=>`${x.e.letter} ${ctEntName(x.e)} (${x.score})`).join(", ")}${run.superMode?` · Round 1 is ${run.roundType} [${run.typeRolls.join(",")}]`:""}` });
}

/* ---------- one performance (p.264-266) ---------- */
/* Everything about the dice BEFORE they're rolled. Pure: reads the run, changes nothing. */
function ctPlan(run, ent, mon, choice){
  const H = ctHolder(run, ent, mon), V = H.voltage||0;
  const adj = choice.noAdj ? [] : ctAdjacent(run, ent, mon), adjV = adj.map(a=>a.H.voltage||0);
  const RT = choice.forceType !== undefined ? choice.forceType : ctRoundType(run);
  let rel = ctRelation(choice.T, RT);
  if(choice.align){ if(rel==="oppose") rel = "ally"; else if(rel==="ally") rel = "match"; }
  const same = !!(mon.lastMove && String(mon.lastMove).toLowerCase()===String(choice.move).toLowerCase());
  const F = CT_FX[choice.fx] || { base:0 };
  const lines = [];
  let eff = F.base, cond = false;
  switch(choice.fx){
    case "Catching Up": cond = adj.length>0 && adjV.every(v=>v>V); if(cond) eff += 3; break;
    case "Good Show":   cond = adj.length>0 && adjV.every(v=>v<V); if(cond) eff += 3; break;
    case "Exhausting Act": cond = V>=2; if(cond) eff += 2; break;
    case "Reliable": cond = same; if(cond) eff += 1; break;
    case "Inversed Appeal": eff = Math.max(0, 5 - V); break;
    case "Reflective Appeal": eff = V; break;
    case "Seen Nothing Yet": eff = 2*V; break;
    case "Double Time": eff = Math.max(0, adjV.reduce((a,b)=>a+b,0) - Math.max(0, V-2)); break;
  }
  lines.push({ label:`${choice.fx}${F.x?"":` (${F.dice})`}${cond?" — condition met":""}`, n:eff });
  const getReady = H.getReadyRound===run.round && !choice.ignoreGetReady;
  if(getReady && eff>0){ lines.push({ label:"Get Ready! — the Move's own dice doubled", n:eff }); eff *= 2; }
  let total = eff;
  if(rel==="match"){ total += 1; lines.push({ label:`${choice.T} matches the ${RT} Contest`, n:1 }); }
  if(V){ total += V; lines.push({ label:`Voltage ${V} at the start of the turn`, n:V }); }
  if(choice.spend){ total += choice.spend; lines.push({ label:`${choice.spend} ${choice.T} Contest ${choice.spend===1?"die":"dice"} spent`, n:choice.spend }); }
  (choice.extras||[]).forEach(x=>{ if(x && x.n){ total += x.n; lines.push({ label:x.label, n:x.n }); } });
  let fumbleNoDice = 0;
  if(rel==="oppose"){
    if(total>0){ total -= 1; lines.push({ label:`${choice.T} is opposed to ${RT}`, n:-1 }); }
    else { fumbleNoDice = 1; lines.push({ label:`${choice.T} is opposed to ${RT} and there are no dice to lose → +1 Fumble`, n:0 }); }
  }
  total = Math.max(0, total);
  const center = choice.forceCenter !== undefined ? !!choice.forceCenter : ctIsCenter(run, ent);
  return { H, V, adj, adjV, RT, rel, same, cond, eff, total, lines, getReady, fumbleNoDice, center };
}
/* p.264: normally 1→0, 2-5→1, 6→2. At the Center of Attention: 6→3, 4-5→2, 3→1, 2→0, 1→0 and a Fumble. */
function ctScoreDie(d, center, fx){
  let a, f = 0, v = 0, adjF = 0;
  if(center){ a = d===6 ? 3 : d>=4 ? 2 : d===3 ? 1 : 0; if(d===1) f = 1; }
  else a = d===6 ? 2 : d>=2 ? 1 : 0;
  if(fx==="Safe Option"){ if(d===6) a = 1; f = 0; }
  if(fx==="Tease"){ if(d>=5) a = 1; if(d===6) adjF = 1; }
  if(fx==="Desperation"){ if(d===1) f += 1; if(d===6) a += 1; }
  if(fx==="Gamble" && d===6) v = 1;
  return { a, f, v, adjF };
}
function ctGiveFumble(run, a, n, notes){
  if(!n) return;
  if(a.H.graceRound===run.round){ notes.push(`${ctTargetName(a)} is protected by Saving Grace — no Fumble`); return; }
  a.ent.fumble += n; if(a.mon) a.mon.fumble = (a.mon.fumble||0) + n;
  notes.push(`${ctTargetName(a)} +${n} Fumble`);
}
function ctTargetName(a){ return a.mon ? a.mon.name : ctEntName(a.ent); }
function ctNudgeV(a, d, notes){
  const before = a.H.voltage||0, after = ctClampV(before + d);
  a.H.voltage = after;
  if(after!==before) notes.push(`${ctTargetName(a)} ${after>before?"+":""}${after-before} Voltage`);
  return before - after;
}
/* apply the rolled dice to the run. Returns the log entry. */
function ctApply(run, ent, mon, choice, plan, dice){
  const notes = [], fx = choice.fx, V0 = plan.V, H = plan.H;
  if(plan.getReady) delete H.getReadyRound;          // spent now — before a second Get Ready! can set a new one
  let gain = 0, fum = plan.fumbleNoDice, gv = 0, adjF = 0;
  const per = [];
  if(choice.reliablePerf){ gain = plan.total; notes.push(`Reliable Performance — 1 Appeal per die, no roll`); }
  else dice.forEach(d=>{ const s = ctScoreDie(d, plan.center, fx); gain += s.a; fum += s.f; gv += s.v; adjF += s.adjF; per.push(s); });
  let vSelf = V0;
  switch(fx){
    case "Big Show": vSelf += 3; break;
    case "Excitement": vSelf += 2; break;
    case "Steady Performance": vSelf += 1; break;
    case "Catching Up": case "Good Show": if(plan.cond) vSelf += 1; break;
    case "Reliable": if(plan.same) vSelf += 1; break;
    case "Double Time": case "Exhausting Act": vSelf -= 2; break;
    case "Get Ready": vSelf -= 2; H.getReadyRound = run.round + 1; notes.push("next round: Move dice doubled"); break;
    case "Seen Nothing Yet": vSelf = 0; break;
    case "Gamble": vSelf += gv; break;
    case "Unsettling": vSelf -= 2; plan.adj.forEach(a=>ctNudgeV(a, -1, notes)); break;
    case "Special Attention": plan.adj.forEach(a=>ctNudgeV(a, +1, notes)); break;
    case "Incentives": if(plan.rel==="match"){ vSelf += 1; plan.adj.forEach(a=>ctNudgeV(a, -1, notes)); } break;
    case "Attention Grabber": plan.adj.forEach(a=>{ const lost = Math.min(2, a.H.voltage||0); if(lost){ ctNudgeV(a, -lost, notes); vSelf += lost; } }); break;
    case "Sabotage": { const pts = gain; gain = 0; plan.adj.forEach(a=>ctGiveFumble(run, a, pts, notes)); if(!plan.adj.length) notes.push("nobody adjacent to Sabotage"); } break;
    case "Tease": if(adjF) plan.adj.forEach(a=>ctGiveFumble(run, a, adjF, notes)); break;
  }
  ent.appeal += gain; ent.fumble += fum;
  if(run.variant==="battle"){ mon.appeal = (mon.appeal||0) + gain; mon.fumble = (mon.fumble||0) + fum; }
  if(fx==="Saving Grace"){
    const lose = Math.min(ent.fumble, V0);
    ent.fumble -= lose; if(run.variant==="battle") mon.fumble = Math.max(0, (mon.fumble||0) - lose);
    if(lose<=2) vSelf += 1;
    H.graceRound = run.round;
    notes.push(`Saving Grace — ${lose} Fumble removed${lose<=2?", +1 Voltage":""}; shielded from Fumbles this round`);
  }
  const vBefore = H.voltage||0;
  H.voltage = ctClampV(vSelf);
  if(H.voltage!==vBefore) notes.unshift(`${run.variant==="battle"?mon.name:ctEntName(ent)} ${H.voltage>vBefore?"+":""}${H.voltage-vBefore} Voltage (now ${H.voltage})`);
  /* Contest dice: the Pokémon's own first, then the Trainer's from the Introduction */
  let need = choice.spend||0;
  if(need){
    const T = choice.T; mon.used = mon.used || {}; ent.introUsed = ent.introUsed || {};
    const fromMon = Math.min(need, Math.max(0, ((mon.dice||{})[T]||0) - (mon.used[T]||0)));
    mon.used[T] = (mon.used[T]||0) + fromMon; need -= fromMon;
    if(need) ent.introUsed[T] = (ent.introUsed[T]||0) + need;
    ent.spent = (ent.spent||0) + (choice.spend||0);
  }
  if(choice.align){ ent.flags = ent.flags || {}; ent.flags["align:"+choice.align] = true; notes.push(`${choice.align}: one step more aligned`); }
  if(choice.adapt){ ent.flags = ent.flags || {}; ent.flags.adapt = true; mon.banned = choice.adapt.slice(); mon.banRound = run.round + 1;
                    notes.push(`Adaptable Performance — ${choice.adapt.join(" & ")} can't be used next round`); }
  mon.lastMove = choice.move; mon.performed = true;
  if(run.variant==="battle"){ ent.activeKey = mon.key; if(plan.center) ent.centerNext = false; }
  return { id:uid(), kind:"perf", at:Date.now(), round:run.round, turn:run.turn, leg:run.leg, eid:ent.id, mkey:mon.key,
           who:mon.name, trainer:ent.trainer, move:choice.move, T:choice.T, fx, rel:plan.rel, RT:plan.RT || null,
           n:plan.total, dice:dice.slice(), center:!!plan.center, gain, fum, notes, choice };
}
function ctSnap(run){
  return JSON.stringify({ entrants:run.entrants, round:run.round, turn:run.turn, stage:run.stage, leg:run.leg,
                          roundType:run.roundType, typeRolls:run.typeRolls });
}
function ctRestore(run, snap){
  const S = JSON.parse(snap);
  run.entrants = S.entrants; run.round = S.round; run.turn = S.turn; run.stage = S.stage; run.leg = S.leg;
  run.roundType = S.roundType; run.typeRolls = S.typeRolls || [];
  delete run.endedAt;
}
/* only the last few performances keep an undo snapshot — the row stays small */
function ctTrimSnaps(run){ let kept = 0; for(let i=run.log.length-1;i>=0;i--){ const e = run.log[i]; if(e.snap){ if(kept>=3) delete e.snap; else kept++; } } }
/* opts.practice: a dry run on a copy — never advances the turn (which could "finish" the copy and
   file practice results on the encounter) */
function ctPerformCore(run, ent, mon, choice, dice, opts){
  const snap = ctSnap(run);
  const plan = ctPlan(run, ent, mon, choice);
  if(!dice) dice = choice.reliablePerf ? [] : ctRollN(plan.total);
  const entry = ctApply(run, ent, mon, choice, plan, dice);
  entry.snap = snap;
  run.log.push(entry); if(run.log.length > 120) run.log = run.log.slice(-120);
  ctTrimSnaps(run);
  if(run.variant!=="battle" && !(opts && opts.practice)) ctAdvance(run);
  return entry;
}
function ctLastPerf(run){ return run ? [...(run.log||[])].reverse().find(x=>x.kind==="perf") || null : null; }
/* Take back the latest performance (Undo), or take it back and perform it again with other dice
   (the re-roll Features). Anything logged after it — the next round's Supercontest roll, the final
   tally — goes with it; a re-roll keeps the Supercontest Type that was already rolled. */
function ctRewind(run, entryId, dice){
  const lp = ctLastPerf(run), i = run.log.findIndex(x=>x.id===entryId);
  if(i<0 || !lp || lp.id!==entryId || !run.log[i].snap) return null;
  const old = run.log[i], tail = run.log.slice(i+1);
  const post = { round:run.round, roundType:run.roundType, typeRolls:run.typeRolls };
  ctRestore(run, old.snap); run.log.splice(i);
  if(!dice) return { old };
  const e = run.entrants.find(x=>x.id===old.eid), mm = e && e.mons.find(x=>x.key===old.mkey);
  if(!e || !mm) return { old };
  const out = ctPerformCore(run, e, mm, old.choice, dice);
  if(run.superMode && run.round===post.round && post.roundType && run.roundType!==post.roundType){
    run.roundType = post.roundType; run.typeRolls = post.typeRolls;
    run.log = run.log.filter(x=>!(x.kind==="sys" && x.at>=out.at && /^🎲 Round/.test(x.text||"")));
    tail.filter(x=>x.kind==="sys" && /^🎲 Round/.test(x.text||"")).forEach(x=>run.log.push(x));
  }
  return { old, out, e, mm };
}
function ctAdvance(run){
  const N = ctActive(run).length;
  run.turn++;
  if(run.turn >= N){
    run.turn = 0; run.round++;
    if(run.round > N){ ctLegEnd(run); return; }
    if(run.superMode){ ctRollRoundType(run); run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🎲 Round ${run.round} is a ${run.roundType} round [${run.typeRolls.join(",")}]` }); }
  }
}
function ctLegEnd(run){
  const act = ctActive(run);
  if(run.variant==="festival" && act.length > 3){
    act.forEach(e=>{ e.appeal -= e.fumble; e.fumble = 0; });
    const low = Math.min(...act.map(e=>e.appeal));
    const cands = act.filter(e=>e.appeal===low), out = cands[Math.floor(Math.random()*cands.length)];
    out.eliminated = true; out.elimLeg = run.leg; out.final = out.appeal;
    run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🎪 Contest ${run.leg} is over — Fumbles come off. ${ctEntFull(out)} has the lowest Appeal (${low}) and is eliminated${cands.length>1?" (tie → coin flip)":""}. Appeal carries over.` });
    run.leg++;
    run.stage = "intro"; run.round = 1; run.turn = 0; run.typeRolls = []; run.roundType = run.superMode ? null : run.ctype;
    ctActive(run).forEach(e=>{
      e.voltage = 0; e.letter = null; e.intro = null; e.introDice = {}; e.introUsed = {}; e.flags = {}; e.spent = 0;
      delete e.getReadyRound; delete e.graceRound;
      e.mons.forEach(m=>{ m.used = {}; m.lastMove = null; m.performed = false; m.fashionUsed = false; delete m.banned; delete m.banRound; });
    });
    return;
  }
  ctFinish(run);
}
function ctFinish(run){
  run.entrants.forEach(e=>{ if(!e.eliminated) e.final = (e.appeal||0) - (e.fumble||0); });
  const alive = run.entrants.filter(e=>!e.eliminated).sort((a,b)=>b.final-a.final);
  const gone = run.entrants.filter(e=>e.eliminated).sort((a,b)=>(b.elimLeg||0)-(a.elimLeg||0));
  let place = 0, last = null;
  alive.forEach((e,i)=>{ if(last===null || e.final!==last){ place = i+1; last = e.final; } e.place = place; });
  gone.forEach((e,i)=>{ e.place = alive.length + i + 1; });
  run.stage = "results"; run.endedAt = Date.now();
  if(run.teams){
    /* a team Battle Contest is won by the side with the most Appeal between them. Each Trainer keeps
       their own score (indPlace, for bragging rights) but places where their team placed. */
    alive.forEach(e=>{ e.indPlace = e.place; });
    const byTeam = {};
    run.entrants.forEach(e=>{ const key = e.team || "1"; const t = byTeam[key] || (byTeam[key] = { key, name:ctTeamLabel(run.teamNames, key), appeal:0, fumble:0, total:0 });
      t.appeal += e.appeal||0; t.fumble += e.fumble||0; t.total += e.final||0; });
    const list = Object.values(byTeam).sort((a,b)=>b.total-a.total);
    let tp = 0, tl = null;
    list.forEach((t,i)=>{ if(tl===null || t.total!==tl){ tp = i+1; tl = t.total; } t.place = tp; });
    run.teamResults = list;
    run.entrants.forEach(e=>{ e.place = (byTeam[e.team||"1"]||{}).place || 1; });
    const win = list.filter(t=>t.place===1);
    run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🏆 ${win.map(t=>t.name).join(" & ")} win${win.length===1?"s":""} with ${win[0] ? win[0].total : 0} Appeal between them (after Fumbles) — a Ribbon each!` });
  } else {
    const win = alive.filter(e=>e.place===1);
    run.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🏆 ${win.map(ctEntFull).join(" & ")} win${win.length===1?"s":""} with ${win[0] ? win[0].final : 0} Appeal (after Fumbles) — a Ribbon!` });
  }
  if(isGM()) ctStoreResults(run);
}
/* the result is copied onto the encounter, so the EXP calculator still has it after the stage is cleared */
function ctStoreResults(run){
  const enc = ctEncById(run.encId); if(!enc) return;
  const k = ctNormEnc(enc);
  if(k.last && k.last.runId===run.id) return;
  k.last = { runId:run.id, at:run.endedAt || Date.now(), variant:run.variant, rotation:!!run.rotation, teams:!!run.teams,
    rows: run.entrants.map(e=>({ eid:e.id, src:e.src, sheetId:e.sheetId, trId:e.trId, name:ctEntName(e), trainer:e.trainer,
      team: run.teams ? ctSideName(run, e) : null,
      place:e.place||0, final:e.final||0, appeal:e.appeal||0, fumble:e.fumble||0,
      mons: e.mons.map(m=>({ monId:m.monId, name:m.name, level:m.level, performed:!!m.performed || run.variant!=="battle" && !run.rotation })) })) };
  saveEnc();
}

/* ===================================================================
   HOOKS FROM app.js
=================================================================== */
var ctBypassBattle = false;
/* openMoveRoll, first thing: in Contest Mode a Pokémon's Move is a performance. A Battle Contest
   keeps the normal roll (and adds 🎀 Appeal to it — contestBattleAppealBtn). */
function contestInterceptMove(p, m, sp, opts){
  if(!contestModeOn() || !p || !m || (opts && opts.noContest)) return false;
  const run = contestRunLive();
  if(run && run.variant==="battle" && run.stage==="perform") return false;
  if(/^struggle$/i.test(m.name||"") || /maneuver/i.test(m.class||"")){ toast("🎀 Struggle and Combat Maneuvers aren't performances — pick a real Move"); return true; }
  ctOpenAppealForMon(p, m.name);
  return true;
}
function ctFindMon(run, p){
  if(!run || !p) return null;
  for(const e of run.entrants) for(const m of e.mons) if(m.monId && m.monId===p.id) return { ent:e, mon:m };
  return null;
}
function ctOpenAppealForMon(p, moveName){
  const run = contestRunLive(), hit = ctFindMon(run, p);
  if(run && hit && run.stage==="perform" && ctCanActEnt(hit.ent)){
    if(run.variant==="battle") return ctOpenAppeal({ eid:hit.ent.id, mkey:hit.mon.key, move:moveName, lockMove:true });
    const cur = ctCurrent(run);
    if(cur===hit.ent && (!run.rotation || !hit.mon.performed)) return ctOpenAppeal({ eid:hit.ent.id, mkey:hit.mon.key, move:moveName });
  }
  let why = "Contest Mode — this is a practice Appeal (nothing is scored).";
  if(run && hit){
    if(run.stage==="intro") why = "The contest is still in its Introduction Stage — practice Appeal only.";
    else if(run.stage==="results") why = "This contest is over — practice Appeal only.";
    else if(!ctCanActEnt(hit.ent)) why = "That contestant isn't yours to perform for — practice Appeal only.";
    else if(run.rotation && hit.mon.performed) why = `${hit.mon.name} already performed in this Rotation Contest — practice Appeal only.`;
    else why = `It isn't ${ctEntName(hit.ent)}'s turn yet — practice Appeal only (${ctStatusText(run)}).`;
  } else if(run) why = `${p.nickname||p.species} isn't in “${run.name}” — practice Appeal only.`;
  ctOpenAppeal({ practice:true, p, move:moveName, why });
}
/* openMoveRoll's footer during a Battle Contest */
function contestBattleAppealBtn(p, m){
  const run = contestRunLive();
  if(!run || run.variant!=="battle" || run.stage!=="perform" || !m) return "";
  if(/^struggle$/i.test(m.name||"") || /maneuver/i.test(m.class||"")) return el("span",{class:"small muted",title:"Struggle Attacks and Combat Maneuvers aren't performance-worthy (p.270)"},"🎀 no Appeal");
  const hit = ctFindMon(run, p);
  if(!hit || hit.mon.ko || !ctCanActEnt(hit.ent)) return "";
  return el("button",{class:"btn-secondary",style:"border-color:#d6337a",title:"Battle Contest: every Move also makes an Appeal Roll",
    onclick:()=>ctOpenAppeal({ eid:hit.ent.id, mkey:hit.mon.key, move:m.name, lockMove:true })},"🎀 Appeal");
}
/* toggleBattle, first thing. true = handled here (the battle itself doesn't toggle). */
async function contestBattleHook(map){
  if(ctBypassBattle) return false;
  const c = contestPeek(); if(!c || !c.on) return false;
  const meta = activeMapMeta(), run = c.run;
  if(!meta.battleOn){
    if(run && run.stage!=="results"){
      if(run.variant==="battle") return false;          // the Battle Contest's fight starting: let it
      ctOpenStage(); toast("🎀 A contest is already on stage"); return true;
    }
    ctOpenStartPicker(map); return true;
  }
  if(run && run.variant==="battle" && run.stage!=="results"){
    if(!confirm("Turning Battle off ends the Battle Contest — tally the Appeal now?")) return true;
    contestWrite(r=>ctFinish(r));
  }
  return false;
}
function contestBattleLabel(meta){
  const c = contestPeek(); if(!c || !c.on) return null;
  const run = c.run;
  if(run && run.variant==="battle" && run.stage!=="results") return meta.battleOn ? "⚔🎀 Battle Contest on" : "⚔🎀 Start the Battle Contest";
  if(meta.battleOn) return null;
  return run && run.stage!=="results" ? "🎀 Contest on stage" : "🎀 Start a contest";
}
function contestToggleBtn(){
  const on = contestModeOn();
  return el("button",{class:"btn-secondary"+(on?" on":""),onclick:()=>contestSetMode(!on),
    title:"Contest Mode: every Pokémon Move performs its Contest Effect (Appeal) instead of its battle effect, and ⚔ Battle starts a contest"},
    on ? "🎀 Contest Mode" : "🎀 Contests");
}
function ctOpenStartPicker(map){
  const list = (encList()||[]).filter(e=>e && e.kind==="contest" && !e.archived);
  const body = el("div",{});
  body.append(el("div",{class:"small muted",style:"margin-bottom:8px"},"Contest Mode is on, so ⚔ Battle runs a contest instead. Which one?"));
  if(!list.length) body.append(el("div",{class:"muted"},"No contest encounters yet — 👹 Encounters → 🎀 New Contest."));
  list.forEach(e=>{
    const k = ctNormEnc(e);
    body.append(el("div",{class:"moveslot"},
      el("div",{style:"flex:1"}, el("div",{style:"font-weight:800"}, `${CT_VARIANTS[k.variant].icon} ${e.name}`),
        el("div",{class:"small muted"}, `${CT_VARIANTS[k.variant].name}${k.variant==="standard"||(!k.superRounds&&k.variant!=="super")?` · ${k.ctype}`:""} · ${k.entrants.length} contestant${k.entrants.length===1?"":"s"}`)),
      el("button",{class:"btn-primary",onclick:async ()=>{
        closeModal();
        if(!ctStartRun(e, { fromMap:true })) return;
        if(k.variant==="battle"){ ctBypassBattle = true; try{ await toggleBattle(map); } finally { ctBypassBattle = false; } }
      }},"▶ Start")));
  });
  modal({ title:"🎀 Start a contest", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:()=>{ closeModal(); switchTab("encounters"); }},"👹 Encounters"),
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel") ]});
}
/* applyAutoKO: a contest Pokémon just Fainted (Battle Contest, p.270) */
/* whose turn it is on the Initiative tracker — the creature that just attacked, when a hit is what
   knocked something out */
function ctTurnCreature(){
  try{
    const meta = activeMapMeta(), map = currentMapForView();
    if(!map || !meta || !meta.battleOn || !meta.initTurnId) return null;
    const tid = initEntryToken(meta.initTurnId);
    const tok = mapTokensFor(map.id).find(t=>t.id===tid);
    const L = tok && tok.link ? tokenLinked(tok) : null;
    return (L && !L.missing && L.obj) || null;
  }catch(e){ return null; }
}
function contestOnKO(owner){
  const run = contestRunLive(); if(!run || run.variant!=="battle" || run.stage!=="perform") return;
  const hit = ctFindMon(run, owner); if(!hit || hit.mon.ko) return;
  const attacker = ctTurnCreature();          // read now: the turn may move on before the deferred write
  setTimeout(()=>{ try{
    contestWrite(r=>{
      const h = ctFindMon(r, owner); if(!h || h.mon.ko) return;
      h.mon.ko = true; h.ent.centerNext = true; if(h.ent.activeKey===h.mon.key) h.ent.activeKey = null;
      /* +2 Voltage: to the Pokémon that knocked it out with an attack — the one whose turn it is, when
         it stands on another side. Anything else (Poison, Burn, Hail on the victim's own turn) gives
         it to the opposing Trainer's active Pokémon instead. */
      const a = attacker && ctFindMon(r, attacker);
      let target = null, why = "";
      if(a && !a.mon.ko && ctSideOf(r, a.ent)!==ctSideOf(r, h.ent)){ target = a.mon; why = "for the knockout"; }
      else {
        const opp = ctOpponents(r, h.ent).flatMap(o=>ctActiveMons(o));
        if(opp.length){ target = opp[0];
          why = opp.length>1 ? "(not an attack on its turn, so it went to the first opposing Pokémon on the field — move it with the GM tools if another one earned it)"
                             : "(the opposing active Pokémon — it wasn't knocked out by an attack on its turn)"; }
      }
      let note = "No opposing Pokémon on the field to take the +2 Voltage.";
      if(target){ const b = target.voltage||0; target.voltage = ctClampV(b+2); note = `${target.name} +${target.voltage-b} Voltage ${why}.`; }
      r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`💥 ${h.mon.name} is knocked out. ${note} Its replacement will be the Center of Attention on its first turn.` });
      if(h.ent.mons.every(m=>m.ko)) r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🏳 ${h.ent.trainer} has no Pokémon left standing — out of the fight (their Appeal still counts).` });
      /* it ends when only one side still has a Pokémon standing (two Trainers: when one is wiped out) */
      const standing = new Set(r.entrants.filter(e=>e.mons.some(m=>!m.ko)).map(e=>ctSideOf(r, e)));
      if(standing.size<=1){ ctFinish(r); toast("🏁 Battle Contest over — only one side has Pokémon left standing"); }
    });
  }catch(e){ console.error(e); } }, 0);
}
/* recallPokemon: −2 Voltage (a Baton Pass / U-Turn / Volt Switch switch never comes through here) */
function contestOnRecall(o){
  const run = contestRunLive(); if(!run || run.variant!=="battle" || run.stage!=="perform") return;
  const hit = ctFindMon(run, o); if(!hit) return;
  contestWrite(r=>{
    const h = ctFindMon(r, o); if(!h) return;
    const b = h.mon.voltage||0; h.mon.voltage = ctClampV(b-2);
    if(h.ent.activeKey===h.mon.key) h.ent.activeKey = null;
    r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`↩ ${h.mon.name} is recalled — ${h.mon.voltage-b} Voltage.` });
  });
}
/* advanceInitiative wrapped a round */
function contestOnRoundWrap(round){
  const run = contestRunLive(); if(!run || run.variant!=="battle" || run.stage!=="perform") return;
  contestWrite(r=>{
    r.round = round;
    if(r.round > r.rounds){ ctFinish(r); toast(`🏁 Battle Contest over after ${r.rounds} rounds — tallying the Appeal`); return; }
    if(r.superMode){ ctRollRoundType(r); r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🎲 Round ${r.round} is a ${r.roundType} round [${r.typeRolls.join(",")}]` }); }
  });
}
/* the sub-line of a Move row, in Contest Mode */
function contestMoveLine(m){
  if(!contestModeOn() || !m) return null;
  const c = ctMoveContest(m, contestRunLive());
  if(!c) return /^struggle$/i.test(m.name||"") ? "🎀 not a performance" : "🎀 no Contest data — pick a Type & Effect when it performs";
  const F = CT_FX[c.fx] || {};
  return `🎀 ${c.T} · ${c.fx} — ${F.dice||"?"}: ${F.text||""}`;
}
function contestDetailHTML(m){
  if(!m) return "";
  const on = contestModeOn();
  if(!on && !(m.contest && showContest())) return "";
  const c = ctMoveContest(m, on ? contestRunLive() : null);
  if(!c) return m.contest ? `<div class="r-meta" style="margin-top:6px">Contest: ${esc(m.contest)}</div>` : "";
  const F = CT_FX[c.fx] || {};
  return `<div class="r-meta" style="margin-top:6px"><b>Contest:</b> <span class="ct-chip" style="background:${CT_COLOR[c.T]}">${CT_ICON[c.T]} ${c.T}</span> `
       + `<b>${esc(c.fx)}</b> (${esc(F.dice||"")}) — ${esc(F.text||"")}</div>`;
}

/* ===================================================================
   THE POKÉMON SHEET: Contest Stats card (Info tab)
=================================================================== */
function contestStatsCard(p, sp){
  if(!p) return "";
  const pf = ctPoffins(p);
  const anyPoffin = CT_STATS.some(s=>pf[s]>0) || p.fabulousBall;
  if(!(showContest() || contestModeOn() || anyPoffin)) return "";
  const t = (typeof ownerTrainerOf==="function" ? ownerTrainerOf(p) : null) || (activeChar() && activeChar().trainer) || null;
  const dd = ctMonDice(p, t), cap = ctPoffinCap(p, t), eaten = CT_STATS.reduce((a,s)=>a+pf[s],0);
  const card = el("div",{class:"card"});
  card.append(el("h3",{},"🎀 Contest Stats"));
  card.append(el("div",{class:"small muted",style:"margin:-4px 0 8px"},
    `Contest dice: +1 per 10 points of the matching Stat (max 3 — Combat Stages never count), +1 per Poffin, +2 from a Style Expert's Chosen Stat. In a contest a Move may spend up to 3 dice of its own Contest Stat; spent dice are gone for that contest.`));
  const tbl = el("div",{style:"display:grid;grid-template-columns:auto repeat(5,1fr);gap:4px 8px;align-items:center;font-size:13px"});
  tbl.append(el("span",{}), ...CT_STATS.map(s=>el("span",{style:`font-weight:800;color:${CT_COLOR[s]};text-align:center`}, `${CT_ICON[s]} ${s}`)));
  const lbl = (s, title) => el("span",{class:"small muted",title:title||""}, s);
  tbl.append(lbl("from Stats", "Attack→Cool, Defense→Tough, Sp.Atk→Beauty, Sp.Def→Smart, Speed→Cute"),
    ...CT_STATS.map(s=>el("span",{style:"text-align:center"}, String(dd.parts[s].stat))));
  tbl.append(lbl("Poffins"), ...CT_STATS.map(s=>{
    const wrap = el("span",{class:"inline",style:"gap:3px;justify-content:center"});
    const set = v=>{ p.poffins = Object.assign(ctPoffins(p), { [s]:Math.max(0,v) }); save(); render(); };
    wrap.append(el("button",{class:"btn-secondary",style:"padding:0 7px",disabled:pf[s]<=0,onclick:()=>set(pf[s]-1)},"−"),
      el("b",{}, String(pf[s])),
      el("button",{class:"btn-secondary",style:"padding:0 7px",disabled:eaten>=cap && !p.unlocked,title:eaten>=cap?"Poffin limit reached":"eat a Poffin",onclick:()=>set(pf[s]+1)},"＋"));
    return wrap; }));
  const se = ctStyleStats(t), fab = ctFabulous(p);
  if(se.length) tbl.append(lbl("Style Expert"), ...CT_STATS.map(s=>el("span",{style:"text-align:center"}, se.includes(s)?"+2":"")));
  if(p.fabulousBall) tbl.append(lbl("Fabulous Ball"), ...CT_STATS.map(s=>el("span",{style:"text-align:center"}, fab[s]?`+${fab[s]}`:"")));
  tbl.append(el("b",{},"Dice"), ...CT_STATS.map(s=>el("span",{style:`text-align:center;font-weight:900;font-size:16px;color:${CT_COLOR[s]}`}, `${dd.dice[s]}d6`)));
  card.append(tbl);
  card.append(el("div",{class:"small muted",style:"margin-top:8px"},
    `Poffins eaten: ${eaten} / ${cap} (1, +1 per 5 Levels, max 6${t && trainerHasEdge(t,"Grace")?"; +2 for Grace":""}). Extras past the limit do nothing.`));
  const fb = el("input",{type:"checkbox"}); fb.checked = !!p.fabulousBall;
  fb.addEventListener("change",()=>{ p.fabulousBall = fb.checked; save(); render(); });
  const fabRow = el("label",{class:"inline",style:"gap:6px;margin-top:6px;cursor:pointer"}, fb,
    el("span",{class:"small"},"Caught in a Fabulous Ball (+2 dice in the Contest Stat of its Nature's raised Stat)"));
  card.append(fabRow);
  if(p.fabulousBall){
    const n = natureByName.get(String(p.nature||"").toLowerCase());
    const up = n && Object.entries(n.statMods||{}).find(([,v])=>v>0);
    if(up && up[0]==="hp"){
      const picks = Array.isArray(p.fabulousPicks) ? p.fabulousPicks.slice() : [];
      const row = el("div",{class:"inline",style:"gap:6px;margin-top:4px"}, el("span",{class:"small muted"},"HP Nature — pick two Stats (+1 each):"));
      [0,1].forEach(i=>{ const s = el("select",{}); s.append(el("option",{value:""},"—"));
        CT_STATS.forEach(x=>s.append(el("option",{value:x,selected:picks[i]===x},x)));
        s.addEventListener("change",()=>{ picks[i] = s.value; p.fabulousPicks = picks.filter(Boolean); save(); render(); }); row.append(s); });
      card.append(row);
    }
  }
  if(t && hasFeatureLoose(t, "Style Expert")){
    const row = el("div",{class:"inline",style:"gap:8px;margin-top:8px;flex-wrap:wrap"}, el("span",{class:"small",style:"font-weight:700"},"Trainer's Style Expert Chosen Stat(s):"));
    CT_STATS.forEach(s=>{ const cb = el("input",{type:"checkbox"}); cb.checked = ctStyleStats(t).includes(s);
      cb.addEventListener("change",()=>{ const cur = new Set((Array.isArray(t.styleExpert)?t.styleExpert:[]).map(ctCap).filter(Boolean));
        if(cb.checked) cur.add(s); else cur.delete(s); t.styleExpert = [...cur]; save(); render(); });
      row.append(el("label",{class:"inline",style:"gap:3px;cursor:pointer"}, cb, el("span",{class:"small"}, s))); });
    card.append(row);
  }
  return card;
}

/* ===================================================================
   THE DOCK + THE STAGE (everyone's screen)
=================================================================== */
var ctStageIsOpen = false, ctSeenRunId = null, ctNotified = {}, ctGmToolsOpen = false, ctIntroSpecs = {};
function ctOpenStage(){ ctStageIsOpen = true; contestRender(); }
function ctToggleStage(){ ctStageIsOpen = !ctStageIsOpen; contestRender(); }
function contestRender(){
  ctInjectCss();
  const c = contestPeek(), on = !!(c && c.on);
  const oldDock = document.getElementById("contestDock"), oldStage = document.getElementById("contestStage");
  document.body.classList.toggle("ct-docked", on);          // room under the page for the dock
  if(!on){ if(oldDock) oldDock.remove(); if(oldStage) oldStage.remove(); ctStageIsOpen = false; return; }
  const run = (c.run && typeof c.run==="object") ? c.run : null;
  if(run && run.id!==ctSeenRunId){ ctSeenRunId = run.id; ctStageIsOpen = true; }      // a new contest opens the stage once
  const dock = ctDockNode(run);
  if(oldDock) oldDock.replaceWith(dock); else document.body.append(dock);
  if(ctStageIsOpen){
    const scroll = oldStage ? oldStage.scrollTop : 0;
    const st = ctStageNode(run);
    if(oldStage) oldStage.replaceWith(st); else document.body.append(st);
    st.scrollTop = scroll;
  } else if(oldStage) oldStage.remove();
  ctNotifyTurn(run);
  if(run && run.stage==="results" && isGM()) ctStoreResults(run);
}
function ctNotifyTurn(run){
  if(!run || run.stage!=="perform" || run.variant==="battle" || isGM()) return;
  const cur = ctCurrent(run); if(!cur || !ctCanActEnt(cur)) return;
  const key = `${run.id}|${run.leg}|${run.round}|${run.turn}`;
  if(ctNotified[key]) return; ctNotified[key] = true;
  toast(`🎤 Your turn! ${ctEntName(cur)} takes the stage`);
}
function ctDockNode(run){
  const gm = isGM();
  const d = el("div",{id:"contestDock"});
  d.append(el("span",{class:"ct-tag"},"🎀 CONTEST"));
  if(!run) d.append(el("span",{class:"small"}, "Moves perform their Contest Effects"));
  else {
    d.append(el("span",{class:"small",style:"font-weight:700"}, ctStatusText(run)));
    const cur = ctCurrent(run);
    if(cur && ctCanActEnt(cur)) d.append(el("button",{class:"btn-primary",onclick:()=>ctOpenAppeal({ eid:cur.id })},"🎤 Perform"));
    if(run.stage==="intro" && !gm && ctActive(run).some(e=>!e.intro && ctCanActEnt(e)))
      d.append(el("button",{class:"btn-primary",onclick:ctOpenStage},"🎲 Introduce"));
  }
  d.append(el("button",{class:"btn-secondary",onclick:ctToggleStage}, ctStageIsOpen ? "▾ Hide stage" : "🎭 Stage"));
  if(gm) d.append(el("button",{class:"btn-secondary",title:"turn Contest Mode off",onclick:()=>contestSetMode(false)},"⏻"));
  return d;
}
function ctStageNode(run){
  const bg = el("div",{id:"contestStage",class:"ct-stage",onclick:e=>{ if(e.target===bg){ ctStageIsOpen = false; contestRender(); } }});
  const box = el("div",{class:"ct-stage-box"});
  const head = el("div",{class:"ct-stage-head"});
  const RT = run ? ctRoundType(run) : null;
  head.append(el("div",{},
    el("div",{style:"font-weight:900;font-size:16px"}, run ? `${CT_VARIANTS[run.variant].icon} ${run.name}` : "🎀 Contest Mode"),
    el("div",{class:"small muted"}, !run ? "every Pokémon Move performs its Contest Effect"
      : run.variant==="battle" && run.stage==="perform" ? `${ctStatusText(run)}${run.teams ? " · Teams" : run.entrants.length>2 ? " · Every Trainer for themselves" : ""}`
      : `${CT_VARIANTS[run.variant].name}${run.rotation?" · Rotation":""} · ${ctStatusText(run)}`)),
    el("div",{class:"inline",style:"gap:6px"},
      run && run.stage!=="intro" && RT ? ctTypeChip(RT, run.superMode ? "round" : "Contest") : "",
      el("button",{class:"btn-secondary",onclick:ctOpenHelp},"📖 Rules"),
      el("button",{class:"close",title:"hide the stage (the 🎭 button brings it back)",onclick:()=>{ ctStageIsOpen = false; contestRender(); }},"×")));
  box.append(head);
  const body = el("div",{class:"ct-stage-body"});
  try{
    if(!run) body.append(ctIdlePanel());
    else if(run.stage==="intro") body.append(ctIntroPanel(run));
    else if(run.stage==="results") body.append(ctResultsPanel(run));
    else if(run.variant==="battle") body.append(ctBattlePanel(run));
    else body.append(ctPerformPanel(run));
    if(run){ if(isGM()) body.append(ctGmTools(run)); body.append(ctLogNode(run)); }
  }catch(e){ console.error(e); body.append(el("div",{style:"color:var(--bad)"}, "⚠ The stage hit an error: " + e.message)); }
  box.append(body);
  bg.append(box);
  return bg;
}
function ctIdlePanel(){
  const box = el("div",{});
  box.append(el("div",{class:"ct-box"}, "🎀 ", el("b",{},"Contest Mode is on."),
    " Until the GM switches it off, every Move a Pokémon uses opens an Appeal — its Contest Type and Contest Effect — instead of attacking. Move rows show their Contest Effect."));
  if(isGM()){
    const list = (encList()||[]).filter(e=>e && e.kind==="contest" && !e.archived);
    box.append(el("div",{style:"font-weight:800;margin-top:8px"},"Start a contest"));
    if(!list.length) box.append(el("div",{class:"small muted"},"No contest encounters yet — 👹 Encounters → 🎀 New Contest."));
    list.forEach(e=>{ const k = ctNormEnc(e);
      box.append(el("div",{class:"moveslot"}, el("div",{style:"flex:1"}, el("b",{}, `${CT_VARIANTS[k.variant].icon} ${e.name}`),
        el("div",{class:"small muted"}, `${CT_VARIANTS[k.variant].name} · ${k.entrants.length} contestant${k.entrants.length===1?"":"s"}`)),
        el("button",{class:"btn-primary",onclick:()=>ctStartRun(e)},"▶ Start"))); });
    box.append(el("div",{class:"small muted",style:"margin-top:6px"},"…or press ⚔ Battle on the Map — in Contest Mode it starts a contest."));
  } else box.append(el("div",{class:"small muted",style:"margin-top:8px"},"Waiting for the GM to start a contest."));
  return box;
}

/* ---------- Introduction panel ---------- */
function ctIntroPanel(run){
  const box = el("div",{}), gm = isGM();
  const std = !run.superMode && run.ctype;
  box.append(el("div",{class:"small muted",style:"margin-bottom:8px"},
    `Introduction Stage${run.variant==="festival"?` (Festival — Contest ${run.leg}, ${ctActive(run).length} left)`:""}: each Trainer picks Charm, Command, Guile, Intimidate or Intuition and rolls 1d6 per Rank. `
    + `Every 3–6 is one Contest die (Cute, Cool, Smart, Tough or Beauty) their Pokémon can spend this contest.`
    + (std ? ` Using the Skill that matches this ${run.ctype} Contest gives +2 Appeal (and +2 toward going first).` : "")
    + (run.variant==="battle" ? " The dice are shared by all of that Trainer's Pokémon; Initiative isn't affected." : "")));
  ctActive(run).forEach(e=>box.append(ctIntroRow(run, e)));
  if(gm){
    const pend = ctActive(run).filter(e=>!e.intro);
    const row = el("div",{class:"ct-row",style:"margin-top:10px"});
    if(pend.some(e=>e.src!=="sheet")) row.append(el("button",{class:"btn-secondary",onclick:()=>contestWrite(r=>{
      ctActive(r).filter(e=>!e.intro && e.src!=="sheet").forEach(e=>{ const o = ctIntroOptions(r, e);
        ctDoIntro(r, e, { skill:ctDefaultSkill(r, o), groomed:o.groomer, beautiful:o.beautiful,
          bonuses:o.bonuses.map(b=>({ label:b.label, n:b.n, stat:b.stat || r.ctype || "Cute" })) }); });
    })},"🎲 Roll for every NPC"));
    row.append(el("button",{class:"btn-primary",onclick:()=>{
      if(pend.length && !confirm(`${pend.length} contestant${pend.length===1?" hasn't":"s haven't"} introduced yet — they'd start with no Introduction dice. Start anyway?`)) return;
      contestWrite(r=>ctStartPerformance(r));
    }}, run.variant==="battle" ? "▶ Start the battle" : "▶ Start the Performance Stage"));
    box.append(row);
  }
  return box;
}
function ctIntroRow(run, ent){
  const row = el("div",{class:"ct-box"});
  row.append(el("div",{class:"inline",style:"gap:8px;flex-wrap:wrap"},
    ...ent.mons.map(m=>ctMonPic(m)),
    el("div",{}, el("div",{style:"font-weight:800"}, ctEntFull(ent)),
      el("div",{class:"small muted"}, ent.mons.length>1 ? ent.mons.map(m=>m.name).join(", ") : `Lv ${ent.mons[0].level}`)),
    el("span",{style:"margin-left:auto"}, ctDiceLine(ent.mons.length===1 ? ent.mons[0].dice : {}))));
  if(ent.intro){
    const I = ent.intro;
    const dieRow = (rolls, stat) => el("span",{}, ...rolls.map(d=>{ const g = d>=3 && !(I.ugly && d===6);
      return el("span",{class:"ct-die "+(g?"g":"z"),title:g?`+1 ${stat} die`:"no die"}, String(d)); }));
    row.append(el("div",{class:"small",style:"margin-top:6px"}, `${I.skillLbl} (${I.rank}) → ${I.stat}: `, dieRow(I.rolls, I.stat)));
    (I.bonus||[]).forEach(b=>row.append(el("div",{class:"small"}, `${b.label} → ${b.stat}: `, dieRow(b.rolls, b.stat))));
    row.append(el("div",{class:"ct-row",style:"margin-top:4px"}, el("b",{},"Gained:"), ctDiceLine(I.gained),
      I.beautiful ? el("span",{class:"small muted"},"(incl. Beautiful +2 Beauty)") : "",
      I.appeal ? el("span",{class:"ct-chip",style:"background:var(--good)"}, `+${I.appeal} Appeal${I.matched?" (matching Skill)":""}${I.contestCase?" (Contest Case)":""}`) : "",
      isGM() ? el("button",{class:"linkbtn",title:"clear this Introduction so it can be rolled again",onclick:()=>contestWrite(r=>{ const e = r.entrants.find(x=>x.id===ent.id); if(e) ctUndoIntro(r, e); })},"↺ redo") : ""));
    return row;
  }
  if(!ctCanActEnt(ent)){ row.append(el("div",{class:"small muted",style:"margin-top:6px"},"⏳ waiting for their Introduction…")); return row; }
  const o = ctIntroOptions(run, ent);
  /* kept per contestant across re-renders: someone else's roll redraws the stage mid-choice */
  const sKey = `${run.id}|${run.leg}|${ent.id}`;
  const spec = ctIntroSpecs[sKey] || (ctIntroSpecs[sKey] = { skill:ctDefaultSkill(run, o), stat:null, groomed:o.groomer, beautiful:o.beautiful, contestCase:false,
                 bon:o.bonuses.map(b=>({ on:true, stat:b.stat || run.ctype || "Cute", b })), extra:[] });
  const form = el("div",{style:"margin-top:8px"});
  const draw = ()=>{
    form.innerHTML = "";
    const sk = el("select",{});
    o.skills.forEach(s=>sk.append(el("option",{value:s.k,selected:s.k===spec.skill}, `${s.lbl} — ${s.rank} (${s.n}d6) → ${s.stat}`)));
    sk.addEventListener("change",()=>{ spec.skill = sk.value; draw(); });
    const cur = o.skills.find(s=>s.k===spec.skill);
    const r1 = el("div",{class:"ct-row"}, el("label",{class:"field",style:"max-width:300px"}, el("span",{},"Skill"), sk));
    if(o.grace){
      const st = el("select",{}); CT_STATS.forEach(s=>st.append(el("option",{value:s,selected:(spec.stat||cur.stat)===s}, s)));
      st.addEventListener("change",()=>{ spec.stat = st.value; });
      r1.append(el("label",{class:"field",style:"max-width:160px",title:"Grace: any of these Skills may roll for any Contest Stat"}, el("span",{},"Grace: dice for"), st));
    }
    form.append(r1);
    const cb = (label, key, title) => { const x = el("input",{type:"checkbox"}); x.checked = !!spec[key];
      x.addEventListener("change",()=>{ spec[key] = x.checked; }); return el("label",{class:"inline",style:"gap:6px;cursor:pointer;margin:3px 0",title:title||""}, x, el("span",{class:"small"}, label)); };
    form.append(cb(`✂ Groomed today (+1d6 to the Introduction roll)${o.groomer?" — your Trainer is a Groomer":""}`, "groomed", "Groomer Edge: a groomed Pokémon gets +1d6 on the Introduction Roll for the rest of the day"));
    if(o.beautiful) form.append(cb("💎 Beautiful (Ability): +2 Beauty dice", "beautiful"));
    form.append(cb("🎁 Sent out from a Contest Case (+1 Appeal)", "contestCase"));
    if(o.ugly) form.append(el("div",{class:"small",style:"color:var(--warn)"},"Ugly (Ability): any 6 rolled in the Introduction counts as a 1."));
    spec.bon.forEach(B=>{
      const x = el("input",{type:"checkbox"}); x.checked = B.on; x.addEventListener("change",()=>{ B.on = x.checked; });
      const line = el("label",{class:"inline",style:"gap:6px;cursor:pointer;margin:3px 0"}, x, el("span",{class:"small"}, `${B.b.label}: ${B.b.n}d6 for `));
      if(B.b.pick){ const s = el("select",{}); CT_STATS.forEach(v=>s.append(el("option",{value:v,selected:B.stat===v},v))); s.addEventListener("change",()=>{ B.stat = s.value; }); line.append(s); }
      else line.append(el("b",{class:"small"}, B.stat));
      form.append(line);
    });
    spec.extra.forEach((X,i)=>{
      const n = el("input",{type:"number",min:1,max:10,value:X.n,style:"width:56px"}); n.addEventListener("change",()=>{ X.n = Math.max(1,parseInt(n.value)||1); });
      const s = el("select",{}); CT_STATS.forEach(v=>s.append(el("option",{value:v,selected:X.stat===v},v))); s.addEventListener("change",()=>{ X.stat = s.value; });
      const lb = el("input",{type:"text",value:X.label,style:"width:150px"}); lb.addEventListener("change",()=>{ X.label = lb.value || "Bonus roll"; });
      form.append(el("div",{class:"inline",style:"gap:6px;margin:3px 0"}, lb, n, el("span",{class:"small"},"d6 for"), s,
        el("button",{class:"linkbtn",onclick:()=>{ spec.extra.splice(i,1); draw(); }},"✕")));
    });
    form.append(el("div",{class:"ct-row",style:"margin-top:6px"},
      el("button",{class:"linkbtn",title:"a Held Item, Grooming or Feature the sheet doesn't know about",onclick:()=>{ spec.extra.push({ label:"Bonus roll", n:2, stat:run.ctype||"Cute" }); draw(); }},"＋ other bonus roll"),
      el("button",{class:"btn-primary",onclick:()=>contestWrite(r=>{
        const e = r.entrants.find(x=>x.id===ent.id); if(!e || e.intro) return;
        ctDoIntro(r, e, { skill:spec.skill, stat:spec.stat, groomed:spec.groomed, beautiful:spec.beautiful, contestCase:spec.contestCase,
          bonuses: spec.bon.filter(B=>B.on).map(B=>({ label:B.b.label, n:B.b.n, stat:B.stat })).concat(spec.extra.map(X=>({ label:X.label, n:X.n, stat:X.stat }))) });
      })}, `🎲 Roll ${cur.n + (spec.groomed?1:0)}d6`)));
  };
  draw();
  row.append(form);
  return row;
}

/* ---------- Performance panel (Standard / Super / Festival) ---------- */
function ctEntCard(run, e, f){
  const card = el("div",{class:"ct-card"+(f.now?" now":"")+(f.center?" center":"")+(f.adj?" adj":"")+(f.done?" done":"")});
  if(f.center) card.append(el("div",{class:"ct-spot"},"★ CENTER OF ATTENTION"));
  card.append(el("div",{class:"ct-letter"}, e.letter || "?"));
  if(f.adj) card.append(el("div",{class:"ct-adj"},"↔"));
  const showMons = run.rotation ? e.mons.filter(m=>!m.performed).slice(0,3) : e.mons;
  card.append(el("div",{style:"margin-top:8px"}, ...(showMons.length ? showMons : e.mons.slice(0,1)).map(m=>ctMonPic(m))));
  card.append(el("div",{style:"font-weight:800;line-height:1.15"}, ctEntName(e)), el("div",{class:"small muted"}, e.trainer));
  card.append(el("div",{class:"ct-row",style:"justify-content:center;margin-top:4px;gap:10px"},
    el("div",{title:"Appeal Points"}, el("div",{class:"ct-num"}, String(e.appeal)), el("div",{class:"small muted"},"Appeal")),
    el("div",{title:"Fumble Points — subtracted at the end"}, el("div",{class:"ct-num",style:"color:var(--bad)"}, String(e.fumble)), el("div",{class:"small muted"},"Fumble"))));
  card.append(el("div",{style:"margin-top:4px"}, ctVolt(e.voltage||0)));
  const left = {}; CT_STATS.forEach(s=>{ left[s] = ctDiceLeft(e, run.rotation ? null : e.mons[0], s); });
  card.append(el("div",{style:"margin-top:4px"}, ctDiceLine(left)));
  const lm = e.mons.map(m=>m.lastMove).filter(Boolean);
  if(lm.length && !run.rotation) card.append(el("div",{class:"small muted",style:"margin-top:2px"}, `last: ${e.mons[0].lastMove}`));
  if(run.rotation) card.append(el("div",{class:"small muted"}, `${e.mons.filter(m=>m.performed).length}/${e.mons.length} performed · ${e.spent||0}/${2*run.entrants.length} dice`));
  if(e.getReadyRound===run.round) card.append(el("div",{class:"small",style:"color:var(--good);font-weight:700"},"⚡ Get Ready! ×2"));
  if(e.graceRound===run.round) card.append(el("div",{class:"small",style:"color:var(--good);font-weight:700"},"🛡 Saving Grace"));
  return card;
}
function ctPerformPanel(run){
  const box = el("div",{});
  const ord = ctOrder(run), cur = ctCurrent(run);
  const adjSet = new Set(cur ? ctAdjacent(run, cur, cur.mons[0]).map(a=>a.ent) : []);
  if(run.superMode) box.append(el("div",{class:"small",style:"text-align:center"}, `🎲 Supercontest: this round's Type was rolled [${(run.typeRolls||[]).join(",")}] → `, ctTypeChip(run.roundType)));
  const line = el("div",{class:"ct-lineup"});
  ctStageLine(run).forEach(e=>{
    const ti = ord.indexOf(e);
    line.append(ctEntCard(run, e, { now:e===cur, center:ord[0]===e, adj:adjSet.has(e), done:ti<run.turn }));
  });
  box.append(el("div",{class:"small muted",style:"text-align:center"},"— the stage, left to right — the middle spot is the Center of Attention —"), line);
  box.append(el("div",{class:"small",style:"text-align:center;margin:4px 0 8px"}, "Turn order: ",
    ...ord.map((e,i)=>el("span",{style:`margin:0 4px;font-weight:${e===cur?900:600};${i<run.turn?"opacity:.55;text-decoration:line-through":""}`}, `${i+1}. ${e.letter} ${ctEntName(e)}${e===cur?" 🎤":""}`))));
  const act = el("div",{class:"ct-box",style:"text-align:center"});
  if(cur){
    act.append(el("div",{style:"font-weight:900;font-size:15px"}, `🎤 ${ctEntFull(cur)} is performing`),
      el("div",{class:"small muted"}, `${ord[0]===cur ? "★ Center of Attention: 6→3, 4-5→2, 3→1, 1→Fumble · " : "Scoring: 6→2, 2-5→1, 1→0 · "}adjacent: ${[...adjSet].map(ctEntName).join(", ") || "nobody"}`));
    if(ctCanActEnt(cur)) act.append(el("button",{class:"btn-primary",style:"margin-top:6px;padding:8px 18px",onclick:()=>ctOpenAppeal({ eid:cur.id })},"🎤 Perform a Move"));
    else act.append(el("div",{class:"small",style:"margin-top:4px"},"⏳ waiting for them to perform…"));
  }
  box.append(act);
  return box;
}

/* ---------- Battle Contest panel ---------- */
function ctBattlePanel(run){
  const box = el("div",{});
  box.append(el("div",{class:"small muted",style:"margin-bottom:6px"},
    `Fight it out on the Map as normal (Initiative decides turns). Every Move a contest Pokémon rolls has a 🎀 Appeal button in its roll window — Struggle and Combat Maneuvers don't Appeal. `
    + `All opposing Pokémon on the field count as adjacent${run.teams ? " (your own team never does)" : run.entrants.length>2 ? " — every other Trainer is opposing" : ""}. `
    + `A knockout gives +2 Voltage to the Pokémon that landed it; recalling costs 2; a replacement sent out after a knockout is the Center of Attention on its first turn. `
    + `Ends after round ${run.rounds} or when only one side has Pokémon standing — ${run.teams ? "the team with the most Appeal between them (after Fumbles) wins" : "most Appeal (after Fumbles) wins"}.`));
  if(run.teams){
    const tot = {};
    run.entrants.forEach(e=>{ const key = e.team||"1"; const t = tot[key] || (tot[key] = { name:ctTeamLabel(run.teamNames, key), net:0 }); t.net += (e.appeal||0) - (e.fumble||0); });
    box.append(el("div",{class:"ct-row",style:"justify-content:center;gap:18px;margin:4px 0 8px"},
      ...Object.values(tot).sort((a,b)=>b.net-a.net).map(t=>el("div",{style:"text-align:center"},
        el("div",{class:"ct-num"}, String(t.net)), el("div",{class:"small",style:"font-weight:800"}, t.name)))));
  }
  const sides = el("div",{class:"ct-sides"});
  const ordered = run.teams ? run.entrants.slice().sort((a,b)=>String(a.team).localeCompare(String(b.team))) : run.entrants;
  ordered.forEach(e=>{
    const s = el("div",{class:"ct-box"});
    if(run.teams) s.append(el("div",{class:"small",style:"font-weight:900;color:#d6337a;letter-spacing:.04em"}, ctSideName(run, e).toUpperCase()));
    s.append(el("div",{class:"ct-row"}, el("b",{style:"font-size:15px"}, e.trainer),
      el("span",{style:"margin-left:auto"}, el("span",{class:"ct-num"}, String(e.appeal)), el("span",{class:"small muted"}," Appeal  "),
        el("span",{class:"ct-num",style:"color:var(--bad)"}, String(e.fumble)), el("span",{class:"small muted"}," Fumble"))));
    const introLeft = {}; CT_STATS.forEach(t=>{ introLeft[t] = Math.max(0, ((e.introDice||{})[t]||0) - ((e.introUsed||{})[t]||0)); });
    s.append(el("div",{class:"small"}, "Trainer's Introduction dice: ", ctDiceLine(introLeft)));
    if(e.centerNext) s.append(el("div",{class:"small",style:"color:#b8860b;font-weight:800"},"★ the next Pokémon to act is the Center of Attention"));
    e.mons.forEach(m=>{
      const own = {}; CT_STATS.forEach(t=>{ own[t] = Math.max(0, ((m.dice||{})[t]||0) - ((m.used||{})[t]||0)); });
      s.append(el("div",{class:"moveslot",style:`align-items:center;${m.ko?"opacity:.5":""}`},
        ctMonPic(m),
        el("div",{style:"flex:1;min-width:0"},
          el("div",{style:"font-weight:800"}, `${m.name}${m.ko?" 💀":""}${e.activeKey===m.key?" ⭐":""}`),
          el("div",{class:"small muted"}, `Appeal ${m.appeal||0} · Fumble ${m.fumble||0}${m.lastMove?` · last: ${m.lastMove}`:""}`),
          ctDiceLine(own)),
        ctVolt(m.voltage||0)));
    });
    sides.append(s);
  });
  box.append(sides);
  return box;
}

/* ---------- Results ---------- */
function ctResultsPanel(run){
  const box = el("div",{});
  const medal = p => p===1?"🥇":p===2?"🥈":p===3?"🥉":`#${p}`;
  if(run.teams && Array.isArray(run.teamResults)){
    const win = run.teamResults.filter(t=>t.place===1);
    box.append(el("div",{style:"text-align:center;font-size:20px;font-weight:900;margin:6px 0"}, `🏆 ${win.map(t=>t.name).join(" & ")}`));
    box.append(el("div",{class:"small muted",style:"text-align:center;margin-bottom:8px"},"A team's score is everyone's Appeal − Fumble added together. Each Trainer on the winning team earns a Ribbon (add them to their Inventories)."));
    run.teamResults.forEach(t=>box.append(el("div",{class:"moveslot",style:"align-items:center"},
      el("div",{style:"font-size:22px;font-weight:900;width:44px;text-align:center"}, medal(t.place)),
      el("div",{style:"flex:1"}, el("div",{style:"font-weight:900"}, t.name),
        el("div",{class:"small muted"}, `${t.appeal} Appeal − ${t.fumble} Fumble · ${run.entrants.filter(e=>ctSideName(run, e)===t.name).map(e=>e.trainer).join(", ")}`)),
      el("div",{class:"ct-num"}, String(t.total)))));
    box.append(el("div",{style:"font-weight:800;margin:10px 0 2px"},"Individual scores"));
  } else {
    const rows0 = run.entrants.filter(e=>e.place===1);
    box.append(el("div",{style:"text-align:center;font-size:20px;font-weight:900;margin:6px 0"}, `🏆 ${rows0.map(ctEntFull).join(" & ")}`));
    box.append(el("div",{class:"small muted",style:"text-align:center;margin-bottom:8px"},"Final score = Appeal − Fumble. The winner earns a Ribbon (add it to their Inventory)."));
  }
  const rows = run.teams ? run.entrants.slice().sort((a,b)=>(b.final||0)-(a.final||0)) : run.entrants.slice().sort((a,b)=>(a.place||99)-(b.place||99));
  rows.forEach(e=>{
    const p = run.teams ? (e.indPlace||e.place) : e.place;
    box.append(el("div",{class:"moveslot",style:"align-items:center"},
      el("div",{style:"font-size:22px;font-weight:900;width:44px;text-align:center"}, run.teams ? `#${p}` : medal(p)),
      ...e.mons.slice(0,3).map(m=>ctMonPic(m)),
      el("div",{style:"flex:1"}, el("div",{style:"font-weight:800"}, ctEntFull(e)),
        el("div",{class:"small muted"}, e.eliminated ? `eliminated after Contest ${e.elimLeg}`
          : `${e.appeal} Appeal − ${e.fumble} Fumble${run.teams ? ` · ${ctSideName(run, e)}` : ""}`)),
      el("div",{class:"ct-num"}, String(e.final))));
  });
  if(isGM()){
    const enc = ctEncById(run.encId);
    box.append(el("div",{class:"ct-row",style:"margin-top:10px;justify-content:center"},
      enc ? el("button",{class:"btn-primary",onclick:()=>ctOpenExp(enc)},"🧮 Contest EXP") : "",
      enc ? el("button",{class:"btn-secondary",onclick:()=>{ if(confirm("Run this contest again from the Introduction Stage?")){ const c = contestData(); c.run = null; ctStartRun(enc); } }},"↺ Run it again") : "",
      el("button",{class:"btn-secondary",onclick:()=>{ const c = contestData(); c.run = null; contestSave(); }},"✓ Clear the stage")));
  }
  return box;
}

/* ---------- GM tools + log ---------- */
function ctGmTools(run){
  const d = el("details",{class:"ct-box"}); if(ctGmToolsOpen) d.open = true;
  d.addEventListener("toggle",()=>{ ctGmToolsOpen = d.open; });
  d.append(el("summary",{style:"font-weight:800;cursor:pointer"},"🛠 GM tools"));
  const W = fn => ()=>contestWrite(fn);
  const lastPerf = ctLastPerf(run);
  const top = el("div",{class:"ct-row",style:"margin:8px 0"});
  if(run.stage==="perform" && run.variant!=="battle")
    top.append(el("button",{class:"btn-secondary",onclick:W(r=>{ r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`⏭ ${ctEntName(ctCurrent(r))}'s turn skipped by the GM` }); ctAdvance(r); })},"⏭ Skip this turn"));
  if(lastPerf && lastPerf.snap) top.append(el("button",{class:"btn-secondary",onclick:W(r=>{
    if(ctRewind(r, lastPerf.id, null)) toast(`↩ ${lastPerf.who}'s ${lastPerf.move} undone`); })},`↩ Undo ${lastPerf.who}'s ${lastPerf.move}`));
  if(run.superMode && run.stage==="perform") top.append(el("button",{class:"btn-secondary",onclick:W(r=>{ ctRollRoundType(r); r.log.push({ id:uid(), kind:"sys", at:Date.now(), text:`🎲 GM re-rolled the round Type → ${r.roundType}` }); })},"🎲 Re-roll round Type"));
  if(run.stage==="perform") top.append(el("button",{class:"btn-secondary",onclick:()=>{ if(confirm("End the contest now and tally the scores?")) contestWrite(r=>ctFinish(r)); }},"🏁 End & tally now"));
  if(run.stage==="results" && run.variant==="battle") top.append(el("button",{class:"btn-secondary",title:"the tally came too early — go back to the fight",
    onclick:W(r=>{ r.stage = "perform"; delete r.teamResults; r.entrants.forEach(e=>{ delete e.place; delete e.final; delete e.indPlace; }); })},"↩ Back to the battle"));
  top.append(el("button",{class:"btn-secondary danger",onclick:()=>{ if(confirm("Cancel this contest and clear the stage? Nothing is scored.")){ const c = contestData(); c.run = null; contestSave(); } }},"✕ Cancel contest"));
  d.append(top);
  d.append(el("div",{class:"small muted"},"Hand adjustments (a Feature the sheet doesn't automate, a ruling, a mistake):"));
  const pm = (label, get, set) => el("span",{class:"inline",style:"gap:2px"}, el("span",{class:"small"}, label),
    el("button",{class:"btn-secondary",style:"padding:0 7px",onclick:()=>contestWrite(()=>set(-1))},"−"),
    el("b",{style:"min-width:18px;text-align:center"}, String(get())),
    el("button",{class:"btn-secondary",style:"padding:0 7px",onclick:()=>contestWrite(()=>set(+1))},"＋"));
  run.entrants.forEach(e=>{
    const line = el("div",{class:"ct-row",style:"padding:4px 0;border-bottom:1px dashed var(--line)"});
    line.append(el("b",{style:"min-width:120px"}, `${e.letter?e.letter+" ":""}${ctEntName(e)}`),
      pm("Appeal", ()=>e.appeal, d=>{ const x = ctLiveEnt(e.id); if(x) x.appeal += d; }),
      pm("Fumble", ()=>e.fumble, d=>{ const x = ctLiveEnt(e.id); if(x) x.fumble = Math.max(0, x.fumble + d); }));
    if(run.variant!=="battle") line.append(pm("Voltage", ()=>e.voltage||0, d=>{ const x = ctLiveEnt(e.id); if(x) x.voltage = ctClampV((x.voltage||0)+d); }));
    else e.mons.forEach(m=>{
      line.append(pm(`${m.name} V`, ()=>m.voltage||0, d=>{ const x = ctLiveEnt(e.id), mm = x && x.mons.find(y=>y.key===m.key); if(mm) mm.voltage = ctClampV((mm.voltage||0)+d); }));
      line.append(el("button",{class:"btn-secondary",style:"padding:0 7px",title:"toggle Knocked Out for the contest",
        onclick:()=>contestWrite(()=>{ const x = ctLiveEnt(e.id), mm = x && x.mons.find(y=>y.key===m.key); if(mm) mm.ko = !mm.ko; })}, m.ko?`${m.name} 💀→up`:`${m.name} 💀`));
    });
    line.append(el("button",{class:"btn-secondary",style:"padding:0 7px",title:"give back every Contest die this contestant has spent",onclick:()=>contestWrite(()=>{ const x = ctLiveEnt(e.id); if(!x) return; x.introUsed = {}; x.spent = 0; x.mons.forEach(m=>m.used = {}); })},"↺ dice"));
    if(run.variant==="battle") line.append(el("button",{class:"btn-secondary",style:"padding:0 7px",title:"the next Pokémon this side sends out is the Center of Attention",onclick:()=>contestWrite(()=>{ const x = ctLiveEnt(e.id); if(x) x.centerNext = !x.centerNext; })}, e.centerNext?"★ center: on":"★ center"));
    d.append(line);
  });
  return d;
}
function ctLiveEnt(id){ const r = contestRunLive(); return r ? r.entrants.find(x=>x.id===id) : null; }
function ctDiceFaces(entry){
  const box = el("span",{});
  (entry.dice||[]).forEach(dv=>{
    const s = ctScoreDie(dv, entry.center, entry.fx);
    box.append(el("span",{class:"ct-die "+(s.f?"b":s.a>=2?"g":s.a===0?"z":""),title:`${s.a} Appeal${s.f?`, ${s.f} Fumble`:""}`}, String(dv), el("small",{}, s.f?"F":`+${s.a}`)));
  });
  return box;
}
function ctLogNode(run){
  const box = el("div",{class:"ct-log"});
  box.append(el("div",{style:"font-weight:800;border:none"},"📜 Log"));
  [...run.log].reverse().slice(0,40).forEach(x=>{
    if(x.kind==="perf") box.append(el("div",{},
      el("b",{}, `R${x.round}${x.leg>1?` (C${x.leg})`:""} · ${x.who}`), ` — ${x.move} `, ctTypeChip(x.T), ` ${x.fx} · ${x.n}d6${x.center?" ★":""} `,
      ctDiceFaces(x), el("b",{style:"margin-left:6px"}, `+${x.gain} Appeal${x.fum?`, +${x.fum} Fumble`:""}`),
      x.notes && x.notes.length ? el("div",{class:"small muted",style:"border:none;padding:0"}, x.notes.join(" · ")) : ""));
    else box.append(el("div",{class:"small"}, x.text || ""));
  });
  return box;
}

/* ===================================================================
   THE APPEAL WINDOW — one performance. Its own overlay (not modal()), so it can sit on top of a
   Move's roll window during a Battle Contest without closing it.
=================================================================== */
function ctCloseAppeal(){ const o = document.getElementById("contestAppeal"); if(o) o.remove(); document.removeEventListener("keydown", ctAppealEsc); }
function ctAppealEsc(e){ if(e.key==="Escape") ctCloseAppeal(); }
function ctAppealShell(title){
  ctCloseAppeal();
  const bg = el("div",{id:"contestAppeal",class:"modal-bg ct-appeal",onclick:e=>{ if(e.target===bg) ctCloseAppeal(); }});
  const m = el("div",{class:"modal",style:"max-width:720px"});
  const body = el("div",{class:"modal-body",style:"max-height:76vh"}), foot = el("div",{class:"modal-foot"});
  m.append(el("div",{class:"modal-head"}, el("h3",{}, title), el("button",{class:"close",onclick:ctCloseAppeal},"×")), body, foot);
  bg.append(m); document.body.append(bg);
  document.addEventListener("keydown", ctAppealEsc);
  return { body, foot };
}
function ctMonMoves(p){
  return (p && Array.isArray(p.moves) ? p.moves : []).map(n=>moveByName.get(String(n||"").toLowerCase()) || { name:String(n||""), custom:true })
    .filter(m=>m.name && !/^struggle$/i.test(m.name));
}
function ctOpenAppeal(o){
  const practice = !!o.practice;
  let run = contestRunLive();
  let ent = null, mon = null, p = o.p || null;
  if(!practice){
    if(!run){ toast("No contest is running"); return; }
    ent = run.entrants.find(x=>x.id===o.eid); if(!ent){ toast("That contestant isn't on stage"); return; }
    if(!ctCanActEnt(ent)){ toast("That contestant isn't yours to perform for"); return; }
    if(o.mkey) mon = ent.mons.find(m=>m.key===o.mkey);
    if(!mon) mon = run.rotation ? (ent.mons.find(m=>!m.performed) || ent.mons[0]) : ent.mons[0];
    p = ctResolveRef(mon).mon;
  }
  if(!p){ toast("Can't find that Pokémon's sheet"); return; }
  const R = practice ? { trainer:(typeof ownerTrainerOf==="function" ? ownerTrainerOf(p) : null) } : ctResolveRef(mon);
  const t = R.trainer || null;
  const moves = ctMonMoves(p);
  const st = { move: o.move || (moves.find(m=>!ctMoveBlock(run||{}, ent||{}, mon, m.name, (ctMoveContest(m, run)||{}).fx))||moves[0]||{}).name || "",
               fixT:"Cute", fixFx:"Steady Performance", spend:0, align:false, adapt:false, adaptT:null, adaptFx:null,
               relPerf:false, twine:/decorative twine/i.test(p.heldItem||""), gmDice:0, override:false,
               pType: (run && ctRoundType(run)) || "Cute", pV:0, pCenter:false };
  const gm = isGM();
  const title = practice ? `🎤 Practice Appeal — ${p.nickname || p.species}` : `🎤 ${mon.name} performs${run.variant==="battle"?" (Battle Contest)":""}`;
  const { body, foot } = ctAppealShell(title);
  const byName = n => moves.find(m=>m.name===n) || moveByName.get(String(n||"").toLowerCase()) || null;
  /* the Type + Effect actually used (Adaptable Performance can take each from a different Move) */
  const contestOf = () => {
    const m = byName(st.move);
    let c = m ? ctMoveContest(m, run) : null;
    if(!c) c = { T: st.fixT, fx: st.fixFx, picked:true };
    let T = c.T, fx = c.fx;
    if(st.adapt){ const a = ctMoveContest(byName(st.adaptT), run), b = ctMoveContest(byName(st.adaptFx), run); if(a) T = a.T; if(b) fx = b.fx; }
    return { T, fx, picked: !!c.picked };
  };
  /* the simulated world a practice roll runs in — a copy, so nothing real changes */
  const practiceWorld = () => {
    if(run){ const hit = ctFindMon(run, p); if(hit){ const clone = JSON.parse(JSON.stringify(run)); const e = clone.entrants.find(x=>x.id===hit.ent.id); return { run:clone, ent:e, mon:e.mons.find(m=>m.key===hit.mon.key), real:true }; } }
    const fm = { key:"pm", monId:p.id, name:p.nickname||p.species, species:p.species, shiny:!!p.shiny, dice:ctMonDice(p, t).dice, used:{}, voltage:0, lastMove:null };
    const fe = { id:"pe", trainer:(t&&t.name)||"", mons:[fm], appeal:0, fumble:0, voltage:st.pV, introDice:{}, introUsed:{}, flags:{} };
    return { run:{ variant:"standard", superMode:false, ctype:st.pType, roundType:st.pType, round:1, turn:0, entrants:[fe], log:[], moveFix:{} }, ent:fe, mon:fm, real:false };
  };
  const extrasOf = (m) => {
    const out = [];
    if(t && hasFeatureLoose(t, "Voice Lessons") && m && /sonic/i.test(m.range||"")) out.push({ label:"Voice Lessons (Sonic Move)", n:1 });
    if(st.twine) out.push({ label:"Decorative Twine", n:2 });
    if(st.gmDice) out.push({ label:"GM adjustment", n:st.gmDice });
    return out;
  };
  const choiceOf = (W) => {
    const m = byName(st.move), c = contestOf();
    const feat = CT_ALIGN_FEATS[c.T];
    return { move: st.move, T:c.T, fx:c.fx, spend: Math.min(st.spend, ctSpendCap(W.run, W.ent, W.mon, c.T)),
             align: (st.align && feat) ? feat : null, adapt: st.adapt ? [st.adaptT, st.adaptFx].filter(Boolean) : null,
             reliablePerf: !!st.relPerf, extras: extrasOf(m),
             forceType: W.real ? undefined : st.pType, forceCenter: W.real && !practice ? undefined : (W.real ? undefined : st.pCenter),
             noAdj: !W.real };
  };
  const world = () => practice ? practiceWorld() : { run, ent, mon, real:true };
  const draw = () => {
    run = contestRunLive() || run;
    if(!practice){ ent = run.entrants.find(x=>x.id===o.eid) || ent; mon = ent.mons.find(m=>m.key===mon.key) || mon; }
    const W = world();
    body.innerHTML = ""; foot.innerHTML = "";
    if(o.why) body.append(el("div",{class:"ct-box small"}, "ℹ ", o.why));
    /* rotation: who's up */
    if(!practice && run.rotation && !o.lockMove){
      const sel = el("select",{});
      ent.mons.forEach(m=>sel.append(el("option",{value:m.key,selected:m.key===mon.key,disabled:m.performed && m.key!==mon.key}, `${m.name}${m.performed?" (already performed)":""}`)));
      sel.addEventListener("change",()=>{ ctOpenAppeal(Object.assign({}, o, { mkey:sel.value, move:null })); });
      body.append(el("label",{class:"field",style:"max-width:300px"}, el("span",{},"🔄 Rotation — who performs this round"), sel));
    }
    /* status line */
    const H = ctHolder(W.run, W.ent, W.mon);
    const adj = W.real ? ctAdjacent(W.run, W.ent, W.mon) : [];
    const centerNow = W.real && !practice ? ctIsCenter(W.run, W.ent) : (W.real ? ctIsCenter(W.run, W.ent) : st.pCenter);
    const RT = W.real ? ctRoundType(W.run) : st.pType;
    body.append(el("div",{class:"ct-row",style:"margin-bottom:6px"},
      ctMonPic(W.mon), el("b",{}, W.mon.name),
      RT ? ctTypeChip(RT, "Contest") : "",
      el("span",{class:"small"}, "Voltage "), ctVolt(H.voltage||0),
      centerNow ? el("span",{class:"ct-chip",style:"background:#b8860b"},"★ Center of Attention") : "",
      adj.length ? el("span",{class:"small muted"}, `adjacent: ${adj.map(a=>`${ctTargetName(a)} (V${a.H.voltage||0})`).join(", ")}`) : ""));
    if(practice && !W.real){
      const ts = el("select",{}); CT_STATS.forEach(s=>ts.append(el("option",{value:s,selected:st.pType===s},s)));
      ts.addEventListener("change",()=>{ st.pType = ts.value; draw(); });
      const vv = el("input",{type:"number",min:0,max:5,value:st.pV,style:"width:56px"}); vv.addEventListener("change",()=>{ st.pV = ctClampV(parseInt(vv.value)); draw(); });
      const cc = el("input",{type:"checkbox"}); cc.checked = st.pCenter; cc.addEventListener("change",()=>{ st.pCenter = cc.checked; draw(); });
      body.append(el("div",{class:"ct-row small"}, "Try it as a ", ts, " Contest · Voltage ", vv, el("label",{class:"inline",style:"gap:4px"}, cc, "Center of Attention")));
    }
    /* the Moves */
    body.append(el("div",{style:"font-weight:800;margin-top:6px"}, o.lockMove ? "The Move" : "Pick a Move"));
    const list = el("div",{});
    (o.lockMove ? moves.filter(m=>m.name===st.move).concat(byName(st.move) && !moves.some(m=>m.name===st.move) ? [byName(st.move)] : []) : moves).forEach(m=>{
      const c = ctMoveContest(m, W.run), fxN = c ? c.fx : null;
      const why = W.real && !practice ? ctMoveBlock(W.run, W.ent, W.mon, m.name, fxN) : "";
      const blocked = !!why && !(gm && st.override);
      const row = el("div",{class:"ct-move"+(st.move===m.name?" sel":"")+(blocked?" off":""),
        onclick:()=>{ if(blocked){ toast(`🎀 ${m.name}: ${why}`); return; } st.move = m.name; st.spend = 0; draw(); }});
      row.append(el("input",{type:"radio",name:"ctMove",checked:st.move===m.name,disabled:blocked}),
        el("div",{style:"flex:1"},
          el("div",{style:"font-weight:800"}, m.name, " ", c ? ctTypeChip(c.T) : el("span",{class:"small muted"},"(no Contest data)"),
            c ? el("span",{class:"small",style:"margin-left:6px;font-weight:700"}, `${c.fx} · ${(CT_FX[c.fx]||{}).dice||""}`) : "",
            c && RT ? el("span",{class:"small muted",style:"margin-left:6px"}, ctRelation(c.T, RT)==="match"?"+1d6":ctRelation(c.T, RT)==="oppose"?"−1d6":"") : ""),
          c ? el("div",{class:"small muted"}, (CT_FX[c.fx]||{}).text || "") : "",
          why ? el("div",{class:"small",style:"color:var(--bad)"}, `⛔ ${why}`) : ""));
      list.append(row);
    });
    if(!moves.length && !o.lockMove) list.append(el("div",{class:"muted small"},"This Pokémon has no Moves on its sheet."));
    body.append(list);
    if(gm && W.real && !practice && !o.lockMove){
      const ov = el("input",{type:"checkbox"}); ov.checked = st.override; ov.addEventListener("change",()=>{ st.override = ov.checked; draw(); });
      body.append(el("label",{class:"inline small",style:"gap:6px;cursor:pointer"}, ov, "GM: allow a blocked Move anyway"));
    }
    const m = byName(st.move);
    const c = contestOf();
    /* a Move with no Contest data: the table picks (remembered for this contest) */
    if(m && !ctMoveContest(m, W.run)){
      const ts = el("select",{}); CT_STATS.forEach(s=>ts.append(el("option",{value:s,selected:st.fixT===s},s)));
      ts.addEventListener("change",()=>{ st.fixT = ts.value; draw(); });
      const fs = el("select",{}); Object.keys(CT_FX).forEach(f=>fs.append(el("option",{value:f,selected:st.fixFx===f},f)));
      fs.addEventListener("change",()=>{ st.fixFx = fs.value; draw(); });
      body.append(el("div",{class:"ct-box small"}, `${m.name} has no Contest Type/Effect in the book (a newer or custom Move). Pick them — the choice is remembered for this contest: `, ts, " ", fs));
    }
    /* options */
    const opt = el("div",{class:"ct-box"});
    const cap = ctSpendCap(W.run, W.ent, W.mon, c.T);
    if(st.spend > cap) st.spend = cap;
    const sp = el("select",{}); for(let i=0;i<=cap;i++) sp.append(el("option",{value:i,selected:st.spend===i}, String(i)));
    sp.addEventListener("change",()=>{ st.spend = parseInt(sp.value)||0; draw(); });
    const left = ctDiceLeft(W.ent, W.mon, c.T);
    opt.append(el("div",{class:"ct-row"}, el("span",{class:"small",style:"font-weight:700"}, `Spend ${c.T ? `${CT_ICON[c.T]} ${c.T}` : ""} Contest dice (up to 3): `), sp,
      el("span",{class:"small muted"}, `${left} left — Pokémon ${Math.max(0, ((W.mon.dice||{})[c.T]||0) - ((W.mon.used||{})[c.T]||0))}, Introduction ${Math.max(0, ((W.ent.introDice||{})[c.T]||0) - ((W.ent.introUsed||{})[c.T]||0))}`
        + (W.run.rotation ? ` · Rotation cap ${2*W.run.entrants.length - (W.ent.spent||0)} left` : ""))));
    const tick = (label, key, title, onCh) => { const x = el("input",{type:"checkbox"}); x.checked = !!st[key];
      x.addEventListener("change",()=>{ st[key] = x.checked; if(onCh) onCh(); draw(); });
      return el("label",{class:"inline",style:"gap:6px;cursor:pointer;margin:3px 0",title:title||""}, x, el("span",{class:"small"}, label)); };
    const feat = CT_ALIGN_FEATS[c.T];
    if(feat && ctHasFeat(t, feat) && !(W.ent.flags||{})["align:"+feat])
      opt.append(tick(`✨ ${feat}: treat this ${c.T} Move as one step more aligned (once per contest)`, "align"));
    if(ctHasFeat(t, "Adaptable Performance") && !(W.ent.flags||{}).adapt && !o.lockMove){
      opt.append(tick("🔀 Adaptable Performance: Contest Type of one Move, Effect of another (once per contest; neither Move next round)", "adapt", "", ()=>{ st.adaptT = st.adaptT || st.move; st.adaptFx = st.adaptFx || st.move; }));
      if(st.adapt){
        const mk = (key, label) => { const s = el("select",{}); moves.forEach(mm=>{ const cc = ctMoveContest(mm, W.run); if(cc) s.append(el("option",{value:mm.name,selected:st[key]===mm.name}, `${mm.name} (${cc.T} · ${cc.fx})`)); });
          s.addEventListener("change",()=>{ st[key] = s.value; draw(); }); return el("label",{class:"field",style:"max-width:280px"}, el("span",{},label), s); };
        opt.append(el("div",{class:"ct-row"}, mk("adaptT","Contest Type from"), mk("adaptFx","Effect from")));
      }
    }
    if(ctHasFeat(t, "Reliable Performance")) opt.append(tick("🎯 Reliable Performance (2 AP): no roll — 1 Appeal per die", "relPerf"));
    if(st.twine || /decorative twine/i.test(p.heldItem||"")) opt.append(tick("🧵 Decorative Twine: +2d6", "twine"));
    if(t && hasFeatureLoose(t, "Voice Lessons")) opt.append(el("div",{class:"small muted"}, m && /sonic/i.test(m.range||"") ? "🎤 Voice Lessons: +1d6 (Sonic Move)" : "🎤 Voice Lessons only adds to Sonic Moves"));
    if(gm){
      const g = el("input",{type:"number",value:st.gmDice,style:"width:60px"}); g.addEventListener("change",()=>{ st.gmDice = parseInt(g.value)||0; draw(); });
      opt.append(el("div",{class:"ct-row small"}, "GM bonus/penalty dice: ", g));
    }
    body.append(opt);
    /* the dice, worked out */
    const ch = choiceOf(W);
    if(c.fx){
      const plan = ctPlan(W.run, W.ent, W.mon, ch);
      const bx = el("div",{class:"ct-box"});
      bx.append(el("div",{style:"font-weight:800"}, `${ch.reliablePerf ? "Appeal" : "Roll"} ${plan.total}${ch.reliablePerf ? " (1 per die)" : "d6"}`, " ",
        el("span",{class:"small muted"}, `${c.T} Move — ${ctRelLabel(plan.rel)}`)));
      plan.lines.forEach(l=>bx.append(el("div",{class:"small"}, `${l.n>0?"+":l.n<0?"":"  "}${l.n} · ${l.label}`)));
      bx.append(el("div",{class:"small muted",style:"margin-top:4px"}, plan.center ? "★ Center of Attention scoring: 6→3 · 4-5→2 · 3→1 · 2→0 · 1→0 and a Fumble" : "Scoring: 6→2 · 2-5→1 · 1→0"));
      body.append(bx);
    }
    foot.append(el("button",{class:"btn-secondary",onclick:ctCloseAppeal},"Cancel"),
      el("button",{class:"btn-primary",disabled:!st.move || !c.fx,onclick:()=>perform()}, practice ? "🎲 Practice roll" : "🎲 Perform"));
  };
  const perform = () => {
    if(practice){
      const W = world(), ch = choiceOf(W);
      const entry = ctPerformCore(W.run, W.ent, W.mon, ch, null, { practice:true });
      showResult(entry, W, true); return;
    }
    let result = null, err = "";
    contestWrite(r=>{
      const e = r.entrants.find(x=>x.id===ent.id), mm = e && e.mons.find(x=>x.key===mon.key);
      if(!e || !mm){ err = "That contestant left the stage"; return; }
      if(r.stage!=="perform"){ err = "The contest isn't in its Performance Stage"; return; }
      if(r.variant!=="battle" && ctCurrent(r)!==e){ err = "It isn't this contestant's turn any more"; return; }
      if(r.rotation && mm.performed){ err = `${mm.name} already performed`; return; }
      const W = { run:r, ent:e, mon:mm, real:true };
      const ch = choiceOf(W);
      const why = ctMoveBlock(r, e, mm, ch.move, ch.fx);
      if(why && !(isGM() && st.override)){ err = why; return; }
      const mv = byName(st.move);
      if(mv && !ctMoveContest(mv, r)){ r.moveFix = r.moveFix || {}; r.moveFix[mv.name] = `${st.fixT} - ${st.fixFx}`; }
      result = ctPerformCore(r, e, mm, ch, null);
    });
    if(err){ toast("🎀 " + err); draw(); return; }
    if(!result) return;
    /* AP for Reliable Performance — taken off the Trainer's sheet */
    if(st.relPerf && t){ t.usedAP = (t.usedAP||0) + 2; ctPersistRef(mon); }
    try{ logRoll({ kind:"contest", label:result.move, who:result.who,
      headline:`🎀 +${result.gain} Appeal${result.fum?` · +${result.fum} Fumble`:""}`,
      lines:[`${result.T} · ${result.fx} — ${result.n}d6 [${result.dice.join(",")}]${result.center?" ★ Center":""}`, ...(result.notes||[]).slice(0,2)] }); }catch(e){}
    const r2 = contestRunLive();
    showResult(result, { run:r2, ent:r2 && r2.entrants.find(x=>x.id===ent.id), mon:null, real:true }, false);
  };
  const showResult = (entry, W, isPractice) => {
    body.innerHTML = ""; foot.innerHTML = "";
    body.append(el("div",{style:"text-align:center"},
      el("div",{style:"font-size:13px;font-weight:700"}, `${entry.who} — ${entry.move} `, ctTypeChip(entry.T), ` ${entry.fx}${entry.center?" · ★ Center of Attention":""}`),
      el("div",{style:"margin:10px 0"}, entry.dice.length ? ctDiceFaces(entry) : el("span",{class:"small muted"},"no dice rolled")),
      el("div",{style:"font-size:28px;font-weight:900"}, `+${entry.gain} Appeal`),
      entry.fum ? el("div",{style:"font-size:16px;font-weight:800;color:var(--bad)"}, `+${entry.fum} Fumble`) : "",
      el("div",{class:"small",style:"margin-top:6px"}, (entry.notes||[]).join(" · "))));
    if(isPractice){
      body.append(el("div",{class:"small muted",style:"text-align:center;margin-top:8px"},"Practice — nothing was scored."));
      foot.append(el("button",{class:"btn-secondary",onclick:()=>draw()},"↩ Back"), el("button",{class:"btn-primary",onclick:ctCloseAppeal},"Done"));
      return;
    }
    /* re-rolls (only while this is still the latest performance) */
    const rr = el("div",{class:"ct-row",style:"justify-content:center;margin-top:10px"});
    const runNow = contestRunLive(), eNow = runNow && runNow.entrants.find(x=>x.id===entry.eid);
    const mNow = eNow && eNow.mons.find(x=>x.key===entry.mkey);
    const lp = ctLastPerf(runNow);
    const latest = !!(lp && lp.id===entry.id && lp.snap);
    const ones = entry.dice.includes(1);
    const redo = (how, flag) => {
      let out = null;
      contestWrite(r=>{
        const dice = how==="all" ? ctRollN(entry.dice.length) : entry.dice.map(d=>d===1 ? ctD6() : d);
        const R2 = ctRewind(r, entry.id, dice); if(!R2 || !R2.out) return;
        out = R2.out;
        out.notes.unshift(`${flag.label}: ${how==="all"?"re-rolled":"1s re-rolled"} (was [${entry.dice.join(",")}])`);
        flag.set(R2.e, R2.mm);
      });
      if(!out){ toast("🎀 Too late — someone has performed since"); return; }
      if(flag.ap && t){ t.usedAP = (t.usedAP||0) + flag.ap; ctPersistRef(mon); }
      if(out) showResult(out, W, false);
    };
    if(latest && eNow && mNow && !entry.choice.reliablePerf){
      if(ctHasFeat(t, "Coordinator") && !(eNow.flags||{}).coord)
        rr.append(el("button",{class:"btn-secondary",onclick:()=>redo("all", { label:"Coordinator", set:(e)=>{ e.flags = e.flags||{}; e.flags.coord = true; } })},"↻ Coordinator: re-roll this Appeal (once per contest)"));
      const fash = /\b(Beauty|Cool|Cute|Smart|Tough|Contest)\s+Fashion\b/i.exec(p.heldItem||"");
      if(fash && ones && !mNow.fashionUsed && (/contest/i.test(fash[1]) || ctCap(fash[1])===entry.T))
        rr.append(el("button",{class:"btn-secondary",onclick:()=>redo("ones", { label:p.heldItem, set:(e,mm)=>{ mm.fashionUsed = true; } })},`↻ ${p.heldItem}: re-roll the 1s (once per contest)`));
      if(ones && ctHasFeat(t, "Style Flourish") && ctStyleStats(t).includes(entry.T) && !(eNow.flags||{}).flourish)
        rr.append(el("button",{class:"btn-secondary",onclick:()=>redo("ones", { label:"Style Flourish", ap:1, set:(e)=>{ e.flags = e.flags||{}; e.flags.flourish = true; } })},"↻ Style Flourish (1 AP): re-roll the 1s"));
    }
    if(rr.childNodes.length) body.append(rr);
    foot.append(el("button",{class:"btn-primary",onclick:ctCloseAppeal},"Done"));
  };
  draw();
}

/* ===================================================================
   🧮 CONTEST EXP (p.265) — "as if they had defeated X Pokémon of their own Level, X = half the
   Pokémon they beat, rounded UP", with a low Significance (×1.5–2).
   The book's own worked example (Lv 10, 1st of 5, ×2 → 60 EXP; last place → 20) only adds up if a
   Pokémon counts ITSELF among the ones it beat — ½ of (4+1) = 3, ½ of (0+1) = 1. The literal text
   would give 40 and 0. Both are offered; the example is the default.
=================================================================== */
function ctExpX(beaten, method){ return method==="rules" ? Math.ceil(beaten/2) : Math.ceil((beaten+1)/2); }
function ctOpenExp(enc){
  const k = ctNormEnc(enc);
  const team = ctIsTeam(k) || (k.last && (k.last.variant==="battle" || k.last.rotation));
  let rows;
  if(k.last && Array.isArray(k.last.rows) && k.last.rows.length){
    rows = k.last.rows.map(r=>({ name: r.team ? `${r.name} (${r.team})` : r.name, trainer:r.trainer, src:r.src, sheetId:r.sheetId, place:r.place||1,
      mons:(r.mons||[]).filter(m=>team ? m.performed!==false : true).map(m=>({ name:m.name, level:m.level||1 })) }));
  } else {
    rows = k.entrants.map((en,i)=>{
      const refs = ctEntrantRefs(enc, en);
      const mons = refs.map(ref=>{ const p = ctResolveRef(ref).mon; return p ? { name:p.nickname||p.species, level:p.level||1 } : null; }).filter(Boolean);
      const tr = en.src==="sheet" ? (((ctSheetChar(en.sheetId)||{}).trainer||{}).name||"Player") : ((((enc.trainers||[]).find(x=>x.id===en.trId)||{}).trainer||{}).name||"NPC");
      return { name: mons.length===1 ? mons[0].name : tr, trainer:tr, src:en.src, sheetId:en.sheetId, place:i+1, mons };
    });
  }
  const body = el("div",{});
  const draw = () => {
    body.innerHTML = "";
    body.append(el("div",{class:"small muted",style:"margin-bottom:8px"},
      `Each Pokémon gets EXP as if it had defeated X Pokémon of its own Level, X = half the Pokémon it beat (rounded UP — the exception to the usual rule), × a low Significance. `
      + (team ? "Rotation & Battle Contests: the Trainer's EXP is split evenly among the Pokémon they used. " : "")
      + (k.variant==="festival" ? "Festival: worked out for the whole event. " : "")
      + (k.last ? "" : "No finished contest on file — set the places by hand.")));
    const sig = el("input",{type:"number",min:0.5,step:0.5,value:k.sig,style:"width:70px"});
    sig.addEventListener("change",()=>{ k.sig = Math.max(0.5, parseFloat(sig.value)||2); saveEnc(); draw(); });
    const meth = el("select",{});
    meth.append(el("option",{value:"example",selected:k.expMethod==="example"},"Count itself — matches the book's 60/20 example"),
                el("option",{value:"rules",selected:k.expMethod==="rules"},"Only the ones it beat — the rules text, literally"));
    meth.addEventListener("change",()=>{ k.expMethod = meth.value; saveEnc(); draw(); });
    body.append(el("div",{class:"ct-row"}, el("label",{class:"field",style:"max-width:140px"}, el("span",{},"Significance ×"), sig),
      el("label",{class:"field",style:"max-width:360px"}, el("span",{},"X counts…"), meth)));
    const pc = r => team ? Math.max(1, r.mons.length) : 1;
    const out = [];
    rows.forEach(r=>{
      const beaten = rows.filter(o=>o!==r && o.place > r.place).reduce((a,o)=>a+pc(o),0);
      const X = ctExpX(beaten, k.expMethod);
      const lvl = r.mons.length ? Math.round(r.mons.reduce((a,m)=>a+(m.level||1),0)/r.mons.length) : 1;
      const pool = Math.round(X * lvl * k.sig);
      const each = team ? Math.floor(pool / Math.max(1, r.mons.length)) : pool;
      out.push({ r, beaten, X, lvl, pool, each });
    });
    const tbl = el("div",{});
    out.sort((a,b)=>a.r.place-b.r.place).forEach(x=>{
      const pl = el("input",{type:"number",min:1,max:rows.length,value:x.r.place,style:"width:52px",title:"placing"});
      pl.addEventListener("change",()=>{ x.r.place = Math.max(1, parseInt(pl.value)||1); draw(); });
      tbl.append(el("div",{class:"moveslot",style:"align-items:center"},
        el("label",{class:"small"}, "#", pl),
        el("div",{style:"flex:1"}, el("div",{style:"font-weight:800"}, `${x.r.name}${x.r.src==="sheet"?"":" (NPC)"}`),
          el("div",{class:"small muted"}, `beat ${x.beaten} Pokémon → X = ${x.X} · Lv ${x.lvl}${team&&x.r.mons.length>1?" (avg)":""} × ${x.X} × ${k.sig}`
            + (team && x.r.mons.length>1 ? ` = ${x.pool}, split ${x.r.mons.length} ways` : ""))),
        el("div",{style:"font-weight:900;font-size:16px;white-space:nowrap"}, team && x.r.mons.length>1 ? `${x.each} each` : `${x.each} EXP`)));
    });
    body.append(tbl);
    const ex = ctExpX(4, k.expMethod) * 10 * 2, exl = ctExpX(0, k.expMethod) * 10 * 2;
    body.append(el("div",{class:"small muted",style:"margin-top:8px"}, `Check: a Lv 10 Pokémon in a 5-contestant contest at ×2 gets ${ex} EXP for 1st and ${exl} for last with this setting (the book says 60 and 20).`));
    body._out = out;
  };
  draw();
  const send = () => {
    const out = body._out || [];
    const per = {};
    out.forEach(x=>{ if(x.r.src==="sheet" && x.r.sheetId){ per[x.r.sheetId] = (per[x.r.sheetId]||0) + x.each * (team ? x.r.mons.length : 1); } });
    const ids = Object.keys(per).filter(id=>per[id]>0);
    if(!ids.length){ toast("No player sheets placed — nothing to send"); return; }
    const who = ids.map(id=>{ const c = ctSheetChar(id); return `• ${(c && (c.trainer||{}).name) || (c && c.name) || "sheet"}: ${per[id]} EXP`; }).join("\n");
    if(!confirm(`Send contest EXP into these EXP pools? Each player then spends it on the Pokémon that performed.\n\n${who}`)) return;
    if(mode==="cloud"){
      ids.forEach(id=>{ const r = cloud.byId[id]; if(r) sendEXP(per[id], [r], { quiet:true }); });
    } else {
      ids.forEach(id=>{ const c = ctSheetChar(id); if(c && c.trainer){ normTrainer(c.trainer); c.trainer.xpPool = (c.trainer.xpPool||0) + per[id]; } });
      save(); render(); toast("📤 Contest EXP added to the EXP pools");
    }
    closeModal();
  };
  modal({ title:`🧮 Contest EXP — ${enc.name}`, bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Close"),
    isGM() ? el("button",{class:"btn-primary",onclick:send},"📤 Send to the players' EXP pools") : "" ]});
}

/* ===================================================================
   📖 RULES & WHAT'S MANUAL
=================================================================== */
function ctOpenHelp(){
  const H = (t)=>el("div",{style:"font-weight:900;margin:12px 0 4px;color:#d6337a"}, t);
  const P = (t)=>el("div",{class:"small",style:"margin:3px 0"}, t);
  const body = el("div",{});
  body.append(
    H("1 · Contest Mode"),
    P("The GM switches it on (🎀 on the Map's toolbar, the contest encounter, or the dock). From then until it's switched off, every Move a Pokémon uses opens an Appeal — its Contest Type and Contest Effect — instead of attacking, and Move rows show the Contest Effect. Outside a running contest (or out of turn) the roll is a practice Appeal and scores nothing."),
    H("2 · Setting one up"),
    P("👹 Encounters → 🎀 New Contest. Pick the variant — Standard (one Contest Type), Supercontest (Type rolled every round), Festival (elimination rounds) or Battle Contest — and add contestants: player Pokémon straight off their sheets, NPC coordinators built in the Trainers card. Tick 🔄 Rotation for a Rotation Contest."),
    P("Players: put Poffins on the Pokémon's Info tab (🎀 Contest Stats). Contest dice = +1 per 10 points of the matching Stat (max 3), +1 per Poffin (1 + 1 per 5 Levels, max 6; Grace +2), +2 for a Style Expert's Chosen Stat, Fabulous Ball +2."),
    H("3 · Starting"),
    P("With Contest Mode on, the GM presses ⚔ Battle on the Map (or ▶ Start on the encounter) — it runs the contest instead of a battle. Everyone gets the 🎭 stage and the bottom dock."),
    H("4 · Introduction Stage (automated)"),
    P("Each Trainer picks Charm (Cute), Command (Cool), Guile (Smart), Intimidate (Tough) or Intuition (Beauty) and rolls 1d6 per Rank; every 3-6 is a Contest die. The matching Skill in a Standard Contest gives +2 Appeal. Offered automatically when the sheet has them: Fancy Clothes, Contest Accessory, Juggling Show, Groomer (+1d6), Unusual coloration, Beautiful (+2 Beauty), Contest Case (+1 Appeal), Grace (any Skill for any Stat), Ugly (6s count as 1s)."),
    H("5 · Performance Stage (automated)"),
    P("Letters A, B, C… go to the most Introduction dice (+2 for the matching Skill, ties by coin flip). Positions and turn order follow the book's charts for 3, 4 and 5 contestants; the middle spot each round is the Center of Attention, and Effects only reach the Pokémon next to you."),
    P("Dice for a Move = its Effect's dice, +1d6 if it matches the Contest Type (−1d6 if opposed — a Fumble if there's nothing to lose), +1d6 per Voltage at the start of the turn, + up to 3 Contest dice of the Move's own Contest Stat (spent for the rest of the contest). Scoring: 6→2, 2-5→1, 1→0; at the Center: 6→3, 4-5→2, 3→1, 2→0, 1→Fumble. No Move twice in a row (Reliable excepted). All 23 Contest Effects and Voltage (0-5) are applied for you, including to adjacent contestants."),
    P("Rotation: pick who performs each round (each Pokémon once); at most 2 × contestants dice per contestant. Supercontest: the Type is rolled at the start of each round. Festival: after each contest Fumbles come off, the lowest Appeal is eliminated and the rest go again from the Introduction until three are left."),
    P("Automated Features/items: Coordinator (re-roll one Appeal), Adaptable Performance, Reliable Performance (2 AP), Rule of Cool / Fabulous Max / Gleeful Steps / Calculated Assault / Macho Charge (one step more aligned), Style Flourish (1 AP, re-roll 1s), the Fashion held items (re-roll 1s), Voice Lessons (+1d6 Sonic), Decorative Twine (+2d6)."),
    H("6 · Battle Contest (automated)"),
    P("A normal battle on the Map. Each Move a contest Pokémon rolls gets a 🎀 Appeal button; all opposing Pokémon on the field are adjacent; Voltage is per Pokémon. A knockout gives +2 Voltage to the Pokémon whose turn it is (the attacker) — or, for a knockout that wasn't an attack, to the opposing active Pokémon — and makes the replacement the Center of Attention for its first turn; ↩ Recall costs 2 Voltage. It ends after 2 rounds per Pokémon (counted off the Map's Initiative) or when only one side has Pokémon standing."),
    P("Formats (p.270 allows double and triple battles): two Trainers, every Trainer for themselves (each one's opponents are all the others), or Teams — a team's Appeal is added together and the best team wins, and teammates are never adjacent to each other."),
    H("7 · EXP"),
    P("🧮 Contest EXP: X = half the Pokémon beaten, rounded up, × the Pokémon's Level × Significance (×1.5-2). The book's example only works if a Pokémon counts itself, so that's the default; the literal reading is one click away. Sends into the players' EXP pools."),
    H("8 · Still done by hand"),
    P("• Trainer Participant Contests (Trainers performing Moves) — run them with the GM tools' ± buttons."),
    P("• A switch caused by Baton Pass, U-Turn, Volt Switch or a Juggler Feature shouldn't cost Voltage — if the GM used ↩ Recall for it, give the 2 back with the GM tools. In a double/triple Battle Contest the +2 for a knockout goes to the first opposing Pokémon on the field; move it by hand if it was someone else."),
    P("• Grooming isn't tracked — tick “Groomed today”. Fancy Clothes and Contest Fashion: pick their Stat when asked. Flexible Preparations: edit the Poffins. Innovation / custom Moves: pick a Contest Type & Effect the first time they perform."),
    P("• Ribbons aren't added automatically — put the winner's Ribbon in their Inventory. The Beautiful Ability's Scene use and other AP costs besides Reliable Performance / Style Flourish aren't ticked off."),
    P("• Any ruling: the GM tools let you skip a turn, undo the last performance, nudge Appeal / Fumble / Voltage, refund dice, re-roll a Supercontest Type, or end and tally early."));
  modal({ title:"📖 Pokémon Contests — how this runs", bodyNode:body, footNodes:[ el("button",{class:"btn-primary",onclick:closeModal},"Got it") ]});
}

/* ---------- styles ---------- */
function ctInjectCss(){
  if(document.getElementById("contestCss")) return;
  const s = document.createElement("style"); s.id = "contestCss";
  s.textContent = `
#contestDock{position:fixed;left:50%;transform:translateX(-50%);bottom:12px;z-index:72;display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:calc(100vw - 24px);padding:6px 12px;border-radius:999px;background:var(--panel);border:2px solid #d6337a;box-shadow:0 6px 18px rgba(0,0,0,.35);font-size:12px;box-sizing:border-box}
body.ct-docked{padding-bottom:72px}
#contestDock .ct-tag{font-weight:900;color:#d6337a;letter-spacing:.05em}
#contestDock button{padding:4px 10px;font-size:12px}
.ct-stage{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.55);display:flex;align-items:flex-start;justify-content:center;padding:16px 10px 70px;overflow:auto;box-sizing:border-box}
.ct-stage-box{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);width:100%;max-width:1060px;margin:auto}
.ct-stage-head{display:flex;gap:8px;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--panel);border-radius:var(--radius) var(--radius) 0 0;z-index:2;flex-wrap:wrap}
.ct-stage-body{padding:14px}
.ct-lineup{display:flex;gap:8px;justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;margin:4px 0 6px;padding:14px 2px 4px}
.ct-lineup>:first-child{margin-left:auto} .ct-lineup>:last-child{margin-right:auto}
.ct-card{position:relative;flex:0 1 158px;min-width:100px;border:2px solid var(--line);border-radius:12px;padding:10px 6px 8px;background:var(--panel-2);text-align:center;box-sizing:border-box}
.ct-card.now{border-color:#d6337a;box-shadow:0 0 0 3px rgba(214,51,122,.28)}
.ct-card.center{background:radial-gradient(circle at 50% 0,rgba(255,200,0,.38),var(--panel-2) 72%)}
.ct-card.adj{border-style:dashed;border-color:#d6337a}
.ct-card.done{opacity:.85}
.ct-letter{position:absolute;top:6px;left:9px;font-weight:900;font-size:18px}
.ct-adj{position:absolute;top:6px;right:9px;font-weight:900;color:#d6337a}
.ct-spot{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#f5c518;color:#111;font-size:9px;font-weight:900;padding:1px 6px;border-radius:6px;white-space:nowrap}
.ct-volt{display:inline-flex;gap:2px;vertical-align:middle}
.ct-volt i{width:10px;height:13px;border-radius:2px;background:var(--line);display:inline-block}
.ct-volt i.on{background:#f5c518;box-shadow:0 0 5px #f5c518}
.ct-num{font-size:22px;font-weight:900;line-height:1}
.ct-chip{display:inline-flex;align-items:center;gap:3px;padding:1px 7px;border-radius:999px;font-size:11px;font-weight:800;color:#fff;white-space:nowrap}
.ct-die{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;border:2px solid var(--line);font-weight:900;margin:3px 3px 8px;position:relative;background:var(--panel);font-size:13px;vertical-align:middle}
.ct-die small{position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:800;color:var(--muted)}
.ct-die.g{border-color:var(--good)} .ct-die.b{border-color:var(--bad);color:var(--bad)} .ct-die.z{opacity:.55}
.ct-log{max-height:300px;overflow:auto;border-top:1px solid var(--line);margin-top:12px;padding-top:6px}
.ct-log>div{padding:5px 0;border-bottom:1px dashed var(--line);font-size:12px}
.ct-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.ct-box{border:1px solid var(--line);border-radius:10px;padding:10px;margin:8px 0;background:var(--panel-2)}
.ct-appeal{z-index:110}
.ct-move{display:flex;gap:8px;align-items:flex-start;padding:6px 8px;border:1px solid var(--line);border-radius:8px;margin:4px 0;cursor:pointer}
.ct-move.sel{border-color:#d6337a;background:rgba(214,51,122,.08)}
.ct-move.off{opacity:.5;cursor:not-allowed}
.ct-sides{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}
@media(max-width:700px){.ct-sides{grid-template-columns:1fr}.ct-spot{font-size:8px;padding:1px 4px}.ct-stage-body{padding:10px}}`;
  document.head.append(s);
}

/* app.js finished booting before this file loaded — show the dock if Contest Mode was already on */
try{ contestRender(); }catch(e){ console.error(e); }
