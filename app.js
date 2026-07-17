/* ===================================================================
   PTU Sheet — Pokémon Tabletop United 1.05 character sheet helper
   Data: window.PTU_DATA (species, moves, abilities, natures, items,
   classes, features, edges, pokeEdges)
=================================================================== */
"use strict";
const D = window.PTU_DATA || {};
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- reference constants ---------- */
const RANKS = ["Pathetic", "Untrained", "Novice", "Adept", "Expert", "Master"];
const rankNum  = r => Math.max(1, RANKS.indexOf(r) + 1);          // Pathetic=1 … Master=6
const rankDice = r => rankNum(r);                                 // #d6

const SKILLS = [
  ["acrobatics","Acrobatics"], ["athletics","Athletics"], ["combat","Combat"],
  ["stealth","Stealth"], ["perception","Perception"], ["intimidate","Intimidate"],
  ["survival","Survival"], ["generalEd","General Ed."], ["medicineEd","Medicine Ed."],
  ["occultEd","Occult Ed."], ["pokemonEd","Pokémon Ed."], ["technologyEd","Technology Ed."],
  ["guile","Guile"], ["charm","Charm"], ["command","Command"],
  ["focus","Focus"], ["intuition","Intuition"],
];
const STATS = [["hp","HP"],["atk","Attack"],["def","Defense"],
  ["spatk","Sp.Atk"],["spdef","Sp.Def"],["spd","Speed"]];

const TYPES = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison",
  "Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];

/* canonical type-effectiveness (attacker → {defender: multiplier}) */
const TYPE_CHART = {
  Normal:{Rock:.5,Ghost:0,Steel:.5},
  Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},
  Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},
  Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},
  Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},
  Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},
  Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},
  Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},
  Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},
  Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},
  Psychic:{Fighting:2,Poison:2,Psychic:.5,Dark:0,Steel:.5},
  Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},
  Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},
  Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},
  Dragon:{Dragon:2,Steel:.5,Fairy:0},
  Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},
  Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},
  Fairy:{Fire:.5,Fighting:2,Poison:.5,Dragon:2,Dark:2,Steel:.5},
};

/* Damage Base → dice / average (PTU 1.05) */
const DB_TABLE = {
  1:"1d6+1 / 4", 2:"1d6+3 / 6", 3:"1d6+5 / 8", 4:"1d8+6 / 10", 5:"1d8+8 / 12",
  6:"2d6+8 / 15", 7:"2d6+10 / 17", 8:"2d8+10 / 19", 9:"2d10+10 / 21", 10:"3d8+10 / 23",
  11:"3d10+10 / 26", 12:"4d8+10 / 28", 13:"4d10+10 / 32", 14:"5d10+10 / 37", 15:"6d10+10 / 43",
  16:"6d10+15 / 48", 17:"7d10+15 / 53", 18:"8d10+15 / 59", 19:"8d10+20 / 64", 20:"9d10+20 / 69",
  21:"10d10+20 / 75", 22:"11d10+25 / 85", 23:"12d10+25 / 91", 24:"12d10+30 / 96",
  25:"13d10+30 / 101", 26:"14d10+30 / 107", 27:"15d10+35 / 117", 28:"16d10+40 / 128",
};

/* Pokémon Experience Chart (PTU 1.05 Core p.203) — total Exp Needed to BE each level.
   Index = level (1..100); index 0 is a placeholder. */
const LEVEL_XP = [0,
  0,10,20,30,40,50,60,70,80,90,
  110,135,160,190,220,250,285,320,360,400,
  460,530,600,670,745,820,900,990,1075,1165,
  1260,1355,1455,1555,1660,1770,1880,1995,2110,2230,
  2355,2480,2610,2740,2875,3015,3155,3300,3445,3645,
  3850,4060,4270,4485,4705,4930,5160,5390,5625,5865,
  6110,6360,6610,6865,7125,7390,7660,7925,8205,8485,
  8770,9060,9350,9645,9945,10250,10560,10870,11185,11505,
  11910,12320,12735,13155,13580,14010,14445,14885,15330,15780,
  16235,16695,17160,17630,18105,18585,19070,19560,20055,20555];
const MAX_LEVEL = 100;
function levelForXP(xp){ xp = Math.max(0, xp||0); let lvl = 1;
  for(let L=2; L<=MAX_LEVEL; L++){ if(xp >= LEVEL_XP[L]) lvl = L; else break; } return lvl; }
function xpForLevel(level){ return LEVEL_XP[Math.max(1, Math.min(MAX_LEVEL, level||1))]; }
function xpToNext(xp){ const lvl = levelForXP(xp); return lvl>=MAX_LEVEL ? 0 : LEVEL_XP[lvl+1] - Math.max(0,xp||0); }

/* Status Afflictions (PTU 1.05 Core pp.245-248). kind drives the Capture-Rate bonus:
   persistent +10 each, volatile +5 each; "other" uses its own `cap`. */
const STATUS_DEFS = [
  {key:"burned", name:"Burned", kind:"persistent", immune:["Fire"],
   effect:"−2 Combat Stages to Defense. If it takes (or is prevented from taking, e.g. by Sleep/Flinch/Paralysis) a Standard Action, it loses a Tick of HP at the end of that turn. Fire-types are immune."},
  {key:"frozen", name:"Frozen", kind:"persistent", immune:["Ice"],
   effect:"Cannot act and gains no Evasion bonuses. DC 16 Save Check at end of each turn to cure (DC 11 for Fire-types; +4 in Sun, −2 in Hail). Cured if hit by a damaging Fire/Fighting/Rock/Steel attack. Ice-types immune."},
  {key:"paralysis", name:"Paralyzed", kind:"persistent", immune:["Electric"],
   effect:"−4 Combat Stages to Speed. At the start of each turn make a DC 5 Save; on a failure it cannot take Standard, Shift, or Swift Actions. Electric-types immune."},
  {key:"poisoned", name:"Poisoned", kind:"persistent", immune:["Poison","Steel"],
   effect:"−2 Combat Stages to Special Defense. If it takes (or is prevented from taking) a Standard Action, it loses a Tick of HP at end of turn. Poison & Steel-types immune."},
  {key:"badlyPoisoned", name:"Badly Poisoned", kind:"persistent", immune:["Poison","Steel"],
   effect:"As Poisoned, but instead loses 5 HP, doubling each consecutive round (10, 20, 40…)."},
  {key:"sleep", name:"Asleep", kind:"persistent",
   effect:"No Evasion bonuses; may only take Free/Swift Actions that cure Sleep. DC 16 Save at end of its turn to wake; also wakes on any active HP-loss attack (not passive Poison/Burn). Can't Save vs Rage/Infatuation/Confusion while asleep (but also can't hurt itself from Confusion)."},
  {key:"confused", name:"Confused", kind:"volatile",
   effect:"Save at start of turn — 1–8: hit self with a Typeless Physical Struggle (auto-hits, resisted one step) and do nothing else; 9–15: act normally; 16+: cured."},
  {key:"cursed", name:"Cursed", kind:"volatile",
   effect:"If it takes a Standard Action, it loses two Ticks of HP at the end of that turn."},
  {key:"disabled", name:"Disabled", kind:"volatile",
   effect:"A specific Move (chosen when applied) can't be used while Disabled. May stack for different Moves."},
  {key:"enraged", name:"Enraged (Rage)", kind:"volatile",
   effect:"Must use a damaging Physical/Special Move or Struggle Attack. DC 15 Save at end of each turn to cure. Cannot choose to Take a Breather."},
  {key:"flinch", name:"Flinched", kind:"volatile",
   effect:"Cannot take actions during its next turn this round. Does not carry to the next round."},
  {key:"infatuation", name:"Infatuated", kind:"volatile",
   effect:"Save at start of turn — 1–10: can't target the source with Moves/Attacks (else act normally); 11–18: act freely; 19+: cured."},
  {key:"badSleep", name:"Bad Sleep", kind:"volatile",
   effect:"Whenever it Saves against Sleep, it loses two Ticks of HP. Only affects Sleeping targets; cured when Sleep is cured."},
  {key:"suppressed", name:"Suppressed", kind:"volatile",
   effect:"Can't benefit from PP Ups; Move frequencies drop a step — At-Will→EOT, and EOT & Scene x2→Scene."},
  {key:"stuck", name:"Stuck", kind:"other", cap:10, immune:["Ghost"],
   effect:"Cannot Shift to move and can't apply Speed Evasion. Removed by switching or as an Extended Action at end of Scene. Ghost-types immune. (+10 to Capture Rate.)"},
  {key:"slowed", name:"Slowed", kind:"other", cap:5,
   effect:"Movement halved (min 1). Removed by switching or at end of Scene. (+5 to Capture Rate.)"},
  {key:"trapped", name:"Trapped", kind:"other", cap:0, immune:["Ghost"],
   effect:"Cannot be recalled into a Poké Ball. Ghost-types immune."},
  {key:"tripped", name:"Tripped", kind:"other", cap:0,
   effect:"Must spend a Shift Action to get up before taking other actions."},
  {key:"vulnerable", name:"Vulnerable", kind:"other", cap:0,
   effect:"Cannot apply Evasion of any sort against attacks."},
  {key:"blinded", name:"Blinded", kind:"other", cap:0,
   effect:"−6 to Accuracy Rolls; must pass a DC 10 Acrobatics Check over Rough/Slow Terrain or become Tripped."},
];
const statusByKey = new Map(STATUS_DEFS.map(s=>[s.key, s]));
/* Combat Stages (Core p.234): only these 5 stats; +CS ×0.2 each, −CS ×0.1 each (−6…+6). */
const CS_STATS = [["atk","Attack"],["def","Defense"],["spatk","Sp.Atk"],["spdef","Sp.Def"],["spd","Speed"]];
function csMult(cs){ cs = Math.max(-6, Math.min(6, cs||0)); return cs>=0 ? 1+0.2*cs : 1+0.1*cs; }
/* Status Afflictions that impose Combat Stages (Core p.245-246) */
const CONDITION_CS = { burned:{def:-2}, paralysis:{spd:-4}, poisoned:{spdef:-2}, badlyPoisoned:{spdef:-2} };
function conditionCSMods(p){
  const m = {atk:0,def:0,spatk:0,spdef:0,spd:0};
  (p.statuses||[]).forEach(k=>{ const c=CONDITION_CS[k]; if(c) for(const s in c) m[s]+=c[s]; });
  return m;
}
/* effective Combat Stages = manual (p.cs) + condition mods, clamped −6…+6 */
function effectiveCS(p){
  const cond = conditionCSMods(p), out = {};
  CS_STATS.forEach(([k]) => out[k] = Math.max(-6, Math.min(6, (p.cs?.[k]||0) + cond[k])));
  return out;
}
function hasStatus(p, key){ return Array.isArray(p.statuses) && p.statuses.includes(key); }
function toggleStatus(p, key){ p.statuses = p.statuses||[];
  const i=p.statuses.indexOf(key); if(i>=0) p.statuses.splice(i,1); else p.statuses.push(key); save(); }
/* how many evolution stages a species still has ahead of it (depth, so branches don't double-count) */
function evolutionsRemaining(p){
  const sp=getSpecies(p.species); if(!sp?.evolution?.length) return 0;
  const mine=sp.evolution.find(e=>e.name.toLowerCase()===sp.name.toLowerCase());
  if(!mine) return 0;
  const maxStage=Math.max(...sp.evolution.map(e=>e.stage));
  return Math.max(0, maxStage - mine.stage);
}
/* An evolution entry's `name` bakes in the method ("Vaporeon Water Stone", "Raichu Thunderstone").
   Split it into the real species (matched against the Dex) and the leftover method text. */
function parseEvoEntry(entryName){
  const words = String(entryName||"").trim().split(/\s+/);
  for(let take=words.length; take>=1; take--){
    const cand = words.slice(0,take).join(" ");
    if(getSpecies(cand)) return { species: getSpecies(cand).name, method: words.slice(take).join(" ") };
  }
  return { species: entryName, method: "" };
}
/* the immediate next-stage evolution option(s) for a Pokémon, with level/method requirements */
function nextEvolutions(p){
  const sp = getSpecies(p.species); if(!sp?.evolution?.length) return [];
  const mine = sp.evolution.find(e=>e.name.toLowerCase()===sp.name.toLowerCase());
  if(!mine) return [];
  return sp.evolution.filter(e=>e.stage===mine.stage+1).map(e=>{
    const parsed = parseEvoEntry(e.name);
    return { target: parsed.species, method: parsed.method, min: e.min, gm: !!e.gm };
  }).filter(e=>getSpecies(e.target));
}
/* normalise an item/stone name for loose matching ("Water Stone" ↔ "waterstone") */
function normItemName(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]/g,""); }
/* is an evolution method a stone? which inventory item (if any) satisfies it? */
function evoStoneName(method){ return (method && /stone/i.test(method)) ? method.trim() : null; }
function findInventoryStone(t, method){
  const key = normItemName(method); if(!key) return null;
  return (t?.inventory||[]).find(it => normItemName(it.name)===key) || null;
}
/* Evolve a Pokémon into a target species, keeping its stats, moves, abilities, level and XP.
   If `stoneItem` is given, consume one from the trainer's inventory. */
function evolveTo(p, targetName, stoneItem){
  const sp = getSpecies(targetName); if(!sp) return;
  const stoneMsg = stoneItem ? `\nThis consumes one ${stoneItem.name} from your inventory.` : "";
  if(!confirm(`Evolve ${p.nickname || getSpecies(p.species)?.name || "this Pokémon"} into ${sp.name}?\nStats, moves, abilities, level and XP are kept.${stoneMsg}`)) return;
  if(stoneItem){
    const t = activeChar().trainer;
    stoneItem.qty = (parseInt(stoneItem.qty)||1) - 1;
    if(stoneItem.qty<=0){ const i=(t.inventory||[]).indexOf(stoneItem); if(i>=0) t.inventory.splice(i,1); }
  }
  p.species = sp.name;
  const m = pokeDerived(p).maxHP;                         // clamp HP to the new species' max
  if(p.currentHP!=null && p.currentHP>m) p.currentHP = m;
  save(); refreshMon(p); toast(`Evolved into ${sp.name}! ✨`+(stoneItem?` (−1 ${stoneItem.name})`:""));
}
/* PTU 1.05 Capture Rate (Core p.214). Returns {capturable, rate, breakdown:[[label,delta]]}. */
function captureRate(p, opts={}){
  const d = pokeDerived(p);
  const hp = p.currentHP==null ? d.maxHP : p.currentHP;
  if(hp<=0) return { capturable:false };
  const bd=[["Base",100]]; let rate=100;
  const lvlMod = -(p.level*2); rate+=lvlMod; bd.push([`Level ${p.level} × 2`, lvlMod]);
  const pct = d.maxHP>0 ? hp/d.maxHP*100 : 0;
  let hpMod, band;
  if(hp===1){ hpMod=30; band="1 HP"; }
  else if(pct<=25){ hpMod=15; band="≤25%"; }
  else if(pct<=50){ hpMod=0; band="≤50%"; }
  else if(pct<=75){ hpMod=-15; band="≤75%"; }
  else { hpMod=-30; band=">75%"; }
  rate+=hpMod; bd.push([`HP ${Math.round(pct)}% (${band})`, hpMod]);
  const evo = evolutionsRemaining(p), evoMod = evo>=2?10:evo===1?0:-10;
  rate+=evoMod; bd.push([`${evo} evolution${evo===1?"":"s"} remaining`, evoMod]);
  if(p.shiny){ rate-=10; bd.push(["Shiny",-10]); }
  if(opts.legendary){ rate-=30; bd.push(["Legendary",-30]); }
  const active = STATUS_DEFS.filter(s=>hasStatus(p,s.key));
  const persist = active.filter(s=>s.kind==="persistent"), volat = active.filter(s=>s.kind==="volatile");
  if(persist.length){ const v=persist.length*10; rate+=v; bd.push([`Persistent: ${persist.map(s=>s.name).join(", ")}`, v]); }
  if(volat.length){ const v=volat.length*5; rate+=v; bd.push([`Volatile: ${volat.map(s=>s.name).join(", ")}`, v]); }
  active.filter(s=>s.kind==="other"&&s.cap).forEach(s=>{ rate+=s.cap; bd.push([s.name, s.cap]); });
  if(p.injuries>0){ const v=p.injuries*5; rate+=v; bd.push([`${p.injuries} Injur${p.injuries===1?"y":"ies"}`, v]); }
  return { capturable:true, rate, breakdown:bd };
}

/* fast lookups */
const speciesByName  = new Map(D.species.map(s => [s.name.toLowerCase(), s]));
const moveByName     = new Map(D.moves.map(m => [m.name.toLowerCase(), m]));
const abilityByName  = new Map(D.abilities.map(a => [a.name.toLowerCase(), a]));
const natureByName   = new Map(D.natures.map(n => [n.name.toLowerCase(), n]));
const getSpecies = n => n && speciesByName.get(String(n).toLowerCase());
/* every item that can be held/consumed, for lookups + the Held Item picker */
const itemByName = new Map([...(D.items?.held||[]), ...(D.items?.food||[]), ...(D.items?.capabilities||[]),
  ...(D.items?.weather||[]), ...(D.items?.equipment||[]), ...(D.items?.gear||[])].map(i => [i.name.toLowerCase(), i]));

/* Capabilities that let a Pokémon change its Struggle Attack's type (PTU 1.05).
   Each also lets the attack use Sp.Atk / deal Special damage at the user's option. */
const STRUGGLE_TYPE_CAPS = { Firestarter:"Fire", Fountain:"Water", Freezer:"Ice",
  Guster:"Flying", Materializer:"Rock", Zapper:"Electric" };
const classNameSet = new Set(D.classes.map(c => c.name));

/* ===================================================================
   Frequency & use-tracking (Scene / Daily limited uses)
   Moves, Abilities and Features carry a `frequency`; Scene/Daily ones
   have finite uses that refresh on End Scene / End Day.
=================================================================== */
// Parse a frequency string → {kind, max}. Features store "<usage> - <action>".
function freqInfo(freqRaw){
  const usage = String(freqRaw||"").split(" - ")[0].trim();
  const u = usage.toLowerCase();
  if(!u) return {kind:"other", max:0};
  if(u.startsWith("static")) return {kind:"static", max:0};
  if(u.startsWith("at-will")||u.startsWith("at will")) return {kind:"atwill", max:0};
  if(u.startsWith("eot")) return {kind:"eot", max:1};   // Every Other Turn — a single cooldown pip
  let m = usage.match(/^scene(?:\s*x\s*(\d+))?/i);
  if(m) return {kind:"scene", max: m[1] ? +m[1] : 1};
  m = usage.match(/^daily(?:\s*x\s*(\d+))?/i);
  if(m) return {kind:"daily", max: m[1] ? +m[1] : 1};
  if(/\bap\b|bind|drain/.test(u)) return {kind:"ap", max:0};
  return {kind:"other", max:0};
}
const freqTrackable = info => info.kind==="scene" || info.kind==="daily" || info.kind==="eot";
function useKey(kind, name){ return kind + ":" + String(name).toLowerCase(); }
function splitKey(key){ const i=key.indexOf(":"); return [key.slice(0,i), key.slice(i+1)]; }
function usesLeft(owner, key, max){ return Math.max(0, max - ((owner.uses && owner.uses[key]) || 0)); }
/* use tracker as filled/empty pip boxes (one per use); returns null if unlimited frequency.
   Tap a filled box to spend that use; tap an empty box to restore up to it. */
function usesControl(owner, kind, name, freqRaw, rerender){
  const info = freqInfo(freqRaw);
  if(!freqTrackable(info)) return null;
  const key = useKey(kind, name), max = info.max, left = usesLeft(owner, key, max);
  const setLeft = (nl,e) => { e.preventDefault(); e.stopPropagation();
    owner.uses = owner.uses || {};
    owner.uses[key] = Math.min(max, Math.max(0, max - nl));   // store consumed = max − remaining
    save(); (rerender||(()=>{}))(); };
  const label = info.kind==="scene" ? "Per Scene" : info.kind==="daily" ? "Per Day" : "Every Other Turn";
  const tag   = info.kind==="scene" ? "scene"     : info.kind==="daily" ? "day"     : "EOT";
  const tip   = info.kind==="eot" ? "Every Other Turn — tap when used (refreshes each Scene)"
                                  : `${label} — ${left}/${max} uses left (tap the boxes)`;
  const wrap = el("span",{class:"uses"+(left<=0?" spent":""), title:tip,
    // when this widget lives inside a <summary>, keep taps on it from toggling the spoiler
    onclick:e=>{ e.preventDefault(); e.stopPropagation(); }});
  for(let i=0;i<max;i++){
    const filled = i < left;                                  // leftmost boxes = remaining uses
    wrap.append(el("button",{class:"pip"+(filled?" on":""),
      title:filled?"spend this use":"restore this use",
      onclick:e=>setLeft(filled ? i : i+1, e)}));            // tap-to-set level
  }
  wrap.append(el("span",{class:"uses-tag muted"}, tag));
  return wrap;
}
/* look up the frequency of a stored use-key's item */
function itemFreqForKey(key){
  const [kind, name] = splitKey(key);
  if(kind==="move")    return moveByName.get(name)?.frequency;
  if(kind==="ability") return abilityByName.get(name)?.frequency;
  if(kind==="feature"){ const f=D.features.find(x=>x.name.toLowerCase()===name); return f?.frequency; }
  return null;
}
/* frequency of a named Move/Ability/Feature, for at-a-glance labels (classes/edges have none) */
function refFrequency(kind, name){
  const n=(name||"").toLowerCase();
  if(kind==="move")    return moveByName.get(n)?.frequency;
  if(kind==="ability") return abilityByName.get(n)?.frequency;
  if(kind==="feature") return D.features.find(x=>x.name.toLowerCase()===n)?.frequency;
  return null;
}
/* reset an owner's uses: mode "scene" clears Scene- and EOT-freq keys; "all" clears everything */
function resetUses(owner, mode){
  if(!owner || !owner.uses) return;
  if(mode==="all"){ owner.uses = {}; return; }
  const kinds = mode==="scene" ? ["scene","eot"] : [mode];   // EOT cooldowns also clear at end of Scene
  Object.keys(owner.uses).forEach(key => {
    if(kinds.includes(freqInfo(itemFreqForKey(key)).kind)) delete owner.uses[key];
  });
}
/* HP a combatant can be healed up to, capped by Injuries (each Injury = −10% of Max) */
function injuryHealCap(maxHP, injuries){
  return Math.floor(maxHP * (10 - Math.min(10, injuries||0)) / 10);
}
/* apply End of Scene to one character object (AP restored, Temp HP lost, Scene/EOT uses refreshed) */
function applyEndScene(c){
  if(!c) return;
  normTrainer(c.trainer);
  c.trainer.usedAP = 0; c.trainer.tempHP = 0; resetUses(c.trainer, "scene");
  (c.pokemon||[]).forEach(p => { normPokemon(p); p.tempHP = 0; resetUses(p, "scene"); });
}
/* apply Extended Rest to one character object (heal HP & 1 Injury, restore AP & all uses) */
function applyEndDay(c){
  if(!c) return;
  const t = c.trainer; normTrainer(t);
  t.usedAP = 0; t.tempHP = 0; resetUses(t, "all");
  t.currentHP = trainerDerived(t).hp;   // Trainers heal fully (no Injuries in this game)
  (c.pokemon||[]).forEach(p => { normPokemon(p);
    p.tempHP = 0; resetUses(p, "all");
    p.injuries = Math.max(0, (p.injuries||0) - 1);
    p.currentHP = pokeDerived(p).maxHP;   // heal to full (already capped by remaining Injuries)
  });
}
/* the cloud rows a GM's rest affects: every PLAYER's sheet (not the GM's own characters, not the PC) */
function playerRestRows(){
  return Object.values(cloud.byId).filter(r =>
    r && r.data && r.data.trainer && r.owner_id !== cloud.userId && r.owner_id !== PC_OWNER);
}
/* End of Scene (Core p.220). GM in cloud → applies to all players; otherwise the active character. */
function endScene(){
  if(mode==="cloud" && cloud.isGM){
    const rows = playerRestRows();
    rows.forEach(r => applyEndScene(r.data));
    rows.forEach(r => cloudUpsert(r));
    render(); toast(`Scene ended for ${rows.length} player sheet${rows.length===1?"":"s"}`); return;
  }
  const c = activeChar(); if(!c) return;
  applyEndScene(c); save(); render(); toast("Scene ended — AP restored, Scene uses refreshed");
}
/* Extended Rest / End of Day. GM in cloud → applies to all players; otherwise the active character. */
function endDay(){
  const gmAll = mode==="cloud" && cloud.isGM;
  const scope = gmAll ? "all players" : "this character & its party";
  if(!confirm(`End the day (Extended Rest) for ${scope}?\nRestores HP & AP, heals 1 Injury, and refreshes all Scene & Daily uses.`)) return;
  if(gmAll){
    const rows = playerRestRows();
    rows.forEach(r => applyEndDay(r.data));
    rows.forEach(r => cloudUpsert(r));
    render(); toast(`Extended Rest for ${rows.length} player sheet${rows.length===1?"":"s"}`); return;
  }
  const c = activeChar(); if(!c) return;
  applyEndDay(c); save(); render(); toast("Extended Rest — HP & AP restored, 1 Injury healed, all uses refreshed");
}

/* ===================================================================
   State
=================================================================== */
const KEY = "ptu_sheet_v1";
let state = load();

function newTrainer() {
  const skills = {};
  SKILLS.forEach(([k]) => skills[k] = "Untrained");
  const combat = {};
  STATS.forEach(([k]) => combat[k] = { base: k === "hp" ? 10 : 5, added: 0 });
  return {
    name:"", age:"", gender:"", heightTxt:"", weightTxt:"", size:"Medium", weightClass:3,
    level:1, xp:0, money:0,
    classes:[], skills, combat, edges:[], features:[], techniques:[],
    inventory:[], background:"", notes:"", appearance:"",
    currentHP:null, tempHP:0, injuries:0, usedAP:0, unlocked:false, uses:{}, avatar:"", weapons:[],
    levelUp:{},
  };
}
function newCharacter(name) {
  return { id: uid(), name: name || "New Trainer", trainer: newTrainer(), pokemon: [] };
}
function newPokemon(speciesName) {
  const sp = getSpecies(speciesName);
  const stats = {}; STATS.forEach(([k]) => stats[k] = { added: 0 });
  return {
    id: uid(), species: sp ? sp.name : (speciesName||""), nickname:"",
    gender:"", shiny:false, onTeam:true, level:5, xp:0, loyalty:0,
    nature: "Hardy", abilities:[], heldItem:"",
    stats, injuries:0, currentHP:null, tempHP:0,
    moves:[], tutorPoints:0, unlocked:false, notes:"",
    struggleType:null, struggleSpecial:false, uses:{}, image:"", statuses:[],
    cs:{atk:0,def:0,spatk:0,spdef:0,spd:0},
  };
}
/* normalise older Pokémon objects (single ability -> abilities[], add onTeam) */
function normPokemon(p){
  if(!p) return p;
  if(!Array.isArray(p.abilities)){
    p.abilities = p.ability ? [p.ability] : [];
  }
  delete p.ability;
  if(typeof p.onTeam !== "boolean") p.onTeam = true;
  if(typeof p.unlocked !== "boolean") p.unlocked = false;
  if(!("struggleType" in p)) p.struggleType = null;
  if(typeof p.struggleSpecial !== "boolean") p.struggleSpecial = false;
  if(!p.uses || typeof p.uses!=="object") p.uses = {};
  if(!Array.isArray(p.statuses)) p.statuses = [];
  if(!p.cs || typeof p.cs!=="object") p.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0};
  if(typeof p.image!=="string") p.image = "";
  if(!p.stats) { p.stats={}; STATS.forEach(([k])=>p.stats[k]={added:0}); }
  // keep XP consistent with a stored level so "add XP" works (only ever raises XP, never changes level)
  if(typeof p.xp!=="number") p.xp = 0;
  if(typeof p.level!=="number") p.level = 1;
  if(p.xp < xpForLevel(p.level)) p.xp = xpForLevel(p.level);
  return p;
}
/* migrate older Trainer objects to include HP/AP/uses tracking */
function normTrainer(t){
  if(!t) return t;
  if(typeof t.currentHP==="undefined") t.currentHP = null;
  if(typeof t.tempHP!=="number") t.tempHP = 0;
  if(typeof t.injuries!=="number") t.injuries = 0;
  if(typeof t.usedAP!=="number") t.usedAP = 0;
  if(typeof t.xp!=="number") t.xp = 0;                            // EXP toward next level (houserule: 10 = level up)
  if(typeof t.unlocked!=="boolean") t.unlocked = false;
  if(!t.uses || typeof t.uses!=="object") t.uses = {};
  if(typeof t.avatar!=="string") t.avatar = "";
  if(!Array.isArray(t.weapons)) t.weapons = [];
  if(!t.levelUp || typeof t.levelUp!=="object") t.levelUp = {};   // per-level choice tracker
  if(!Array.isArray(t.techniques)) t.techniques = [];             // learned class Techniques
  if(!Array.isArray(t.moves)) t.moves = [];                       // combat Moves granted by Features/class
  return t;
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw); if (s.characters?.length){
      s.characters.forEach(c => { normTrainer(c.trainer); (c.pokemon||[]).forEach(normPokemon); });
      if(!Array.isArray(s.encounters)) s.encounters = [];   // GM-only encounter builder (device-local)
      (s.encounters||[]).forEach(normEncounter);
      return s;
    } }
  } catch(e){}
  const c = newCharacter("My Trainer");
  return { version:1, activeId:c.id, characters:[c], theme:null, encounters:[] };
}
let saveTimer;
function save() {
  if (mode === "cloud") return cloudSave();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch(e){ toast("⚠ Could not save (storage full?)"); }
  }, 250);
}
function activeChar(){
  if (mode === "cloud") return cloud.byId[cloud.activeId]?.data || EMPTY_CHAR;
  return state.characters.find(c => c.id === state.activeId) || state.characters[0];
}
/* placeholder so renders never crash when a cloud campaign has no characters yet */
const EMPTY_CHAR = { id:"none", name:"", trainer:newTrainer(), pokemon:[] };

/* cloud-sync state (see Cloud module near the end) */
const CLOUD_CFG = window.PTU_CLOUD || {};
let mode = "local";                 // "local" | "cloud"
const cloud = { client:null, campaign:"", userId:"", name:"", isGM:false,
                byId:{}, activeId:null, sub:null, lastSaveTs:0, saveTimer:null, pc:null,
                lastWrite:{},   // rowId → updated_at of our last upsert (per-row echo suppression)
                mapMeta:null, mapTokens:null, mapSaveTs:0, enc:null, encSaveTs:0, encTimer:null };
/* shared PC storage lives in a reserved sheets row owned by this sentinel, visible to everyone */
const PC_OWNER = "__pc__";
const pcId = () => "pc_" + cloud.campaign;
/* shared battle map (Owlbear-style): two reserved rows owned by this sentinel, visible to everyone.
   meta row = maps + backgrounds + grid (changes rarely); tokens row = positions + HP (changes often) */
const MAP_OWNER = "__map__";
const mapMetaId   = () => "mapmeta_"   + cloud.campaign;
const mapTokensId = () => "maptokens_" + cloud.campaign;
/* GM encounter prep, synced so map tokens can live-link to encounter monsters */
const ENC_OWNER = "__enc__";
const encRowId  = () => "enc_" + cloud.campaign;

/* nested get/set by "a.b.c" path on the active character */
function setPath(obj, path, val) {
  const ks = path.split("."); let o = obj;
  for (let i=0;i<ks.length-1;i++) o = o[ks[i]];
  o[ks[ks.length-1]] = val;
}

/* ===================================================================
   PTU calculations
=================================================================== */
function trainerDerived(t) {
  const tot = k => t.combat[k].base + t.combat[k].added;
  const cap6 = v => Math.min(6, Math.floor(v/5));
  const acro = rankNum(t.skills.acrobatics), athl = rankNum(t.skills.athletics);
  const combat = rankNum(t.skills.combat);
  let power = 4;  if (athl >= 3) power++; if (combat >= 4) power++;
  let hj = 0;     if (acro >= 4) hj++; if (acro >= 6) hj++;
  return {
    hp: t.level*2 + tot("hp")*3 + 10,
    physEva: cap6(tot("def")), specEva: cap6(tot("spdef")), spdEva: cap6(tot("spd")),
    ap: 5 + Math.floor(t.level/5),
    power, highJump: hj, longJump: Math.floor(acro/2),
    overland: 3 + Math.floor((athl+acro)/2), swim: Math.floor((3+Math.floor((athl+acro)/2))/2),
    throwing: 4 + athl,
    totals: Object.fromEntries(STATS.map(([k])=>[k, tot(k)])),
  };
}

function pokeBaseStats(p) {
  const sp = getSpecies(p.species);
  const nat = natureByName.get((p.nature||"").toLowerCase());
  const out = {};
  STATS.forEach(([k]) => {
    let base = sp?.baseStats?.[k] ?? 0;
    if (nat) base += (nat.statMods[k] || 0);
    out[k] = Math.max(k === "hp" ? 1 : 1, base);   // stats floor at 1
  });
  return out;
}
function pokeDerived(p) {
  const base = pokeBaseStats(p);
  const total = {}; STATS.forEach(([k]) => total[k] = base[k] + (p.stats[k]?.added||0));   // pre-CS ("real") stats
  const cap6 = v => Math.min(6, Math.floor(v/5));
  const cs = effectiveCS(p);                              // Combat Stages (manual + conditions)
  const eff = {}; STATS.forEach(([k]) => eff[k] = k==="hp" ? total.hp : Math.floor(total[k] * csMult(cs[k])));
  const fullMaxHP = p.level + total.hp*3 + 10;          // undamaged maximum
  const injuries = Math.max(0, p.injuries||0);
  const maxHP = injuryHealCap(fullMaxHP, injuries);      // Injuries cap max HP at −10% each (Core p.249)
  const budget = p.level + 10;
  const spent = STATS.reduce((s,[k]) => s + (p.stats[k]?.added||0), 0);
  return {
    base, total, cs, eff, maxHP, fullMaxHP, injuries, budget, spent, remaining: budget - spent,
    physEva: cap6(eff.def), specEva: cap6(eff.spdef), spdEva: cap6(eff.spd),   // evasion uses CS-adjusted stats
  };
}
function typeEffectiveness(defTypes) {
  const res = {};
  TYPES.forEach(atk => {
    let m = 1; defTypes.forEach(dt => { m *= (TYPE_CHART[atk]?.[dt] ?? 1); });
    if (m !== 1) res[atk] = m;
  });
  return res;   // {atkType: multiplier}
}

/* ===================================================================
   Small DOM helpers
=================================================================== */
function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, "");
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  kids.flat().forEach(c => n.append(c?.nodeType ? c : document.createTextNode(c ?? "")));
  return n;
}
function typeBadge(t){ return (!t||t==="None")?"":`<span class="type type-${t}">${t}</span>`; }

/* ---------- Pokémon sprites (hotlinked, same source as the sheet) ---------- */
const POKEBALL_SVG = "data:image/svg+xml,"+encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='44' fill='none' stroke='%23888' stroke-width='5'/><line x1='6' y1='50' x2='38' y2='50' stroke='%23888' stroke-width='5'/><line x1='62' y1='50' x2='94' y2='50' stroke='%23888' stroke-width='5'/><circle cx='50' cy='50' r='13' fill='none' stroke='%23888' stroke-width='5'/></svg>");
function slugify(name){
  return String(name||"").toLowerCase()
    .replace(/♀/g,"-f").replace(/♂/g,"-m")
    .replace(/[’'.:]/g,"")
    .replace(/[\s_]+/g,"-")
    .replace(/[^a-z0-9-]/g,"");
}
function spriteUrl(name, shiny){
  const slug = slugify(name);
  return shiny ? `https://img.pokemondb.net/sprites/black-white/shiny/${slug}.png`
               : `https://img.pokemondb.net/artwork/${slug}.jpg`;
}
function monSprite(speciesName, shiny, sizeCls="s-sm", override){
  const img = el("img",{class:`sprite ${sizeCls}`, alt:speciesName||"", loading:"lazy",
    src: override || (speciesName ? spriteUrl(speciesName, shiny) : POKEBALL_SVG)});
  img.addEventListener("error", function(){ this.onerror=null; this.src=POKEBALL_SVG; this.classList.add("fallback"); });
  return img;
}
const TRAINER_PLACEHOLDER = "data:image/svg+xml,"+encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='none'/><circle cx='50' cy='38' r='20' fill='%23888'/><path d='M16 92c0-19 15-30 34-30s34 11 34 30z' fill='%23888'/></svg>");
/* Pick a local image file, downscale it to maxDim px, and hand back a compact JPEG data URL. */
function pickImage(maxDim, onData){
  const inp = el("input",{type:"file",accept:"image/*",style:"display:none"});
  inp.addEventListener("change",()=>{
    const f = inp.files && inp.files[0];
    if(!f){ inp.remove(); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width*scale)), h = Math.max(1, Math.round(img.height*scale));
        const cv = el("canvas"); cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        let out; try{ out = cv.toDataURL("image/jpeg", 0.82); }catch(e){ out = reader.result; }
        onData(out); inp.remove();
      };
      img.onerror = () => { toast("⚠ Could not read that image"); inp.remove(); };
      img.src = reader.result;
    };
    reader.readAsDataURL(f);
  });
  document.body.append(inp); inp.click();
}

/* ---------- reusable sub-tab bar ---------- */
function subTabBar(tabs, active, onPick){
  const bar = el("div",{class:"subtabs"});
  tabs.forEach(([key,label]) => bar.append(
    el("button",{class:"subtab"+(key===active?" on":""), onclick:()=>onPick(key)}, label)));
  return bar;
}
function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove("show"), 1900);
}

/* field factory: label + input bound to a path on active character */
function field(label, path, {type="text", opts=null, step, min, onchange, value, placeholder}={}) {
  const cur = value !== undefined ? value : getByPath(path);
  let input;
  if (opts) {
    input = el("select");
    opts.forEach(o => {
      const [val,txt] = Array.isArray(o) ? o : [o,o];
      input.append(el("option", { value: val, selected: String(cur)===String(val) }, txt));
    });
  } else if (type === "textarea") {
    input = el("textarea", { placeholder: placeholder||"" }); input.value = cur ?? "";
  } else {
    input = el("input", { type, placeholder: placeholder||"" });
    if (step!=null) input.step = step; if (min!=null) input.min = min;
    input.value = cur ?? "";
  }
  // Fire on "change" (blur / commit) — never on each keystroke — so a handler that
  // re-renders can't recreate the input mid-typing and steal focus. Checkboxes/selects
  // already emit "change" on toggle/select, so this is correct for every input type.
  input.addEventListener("change", e => {
    let v = input.value;
    if (type === "number") v = v === "" ? 0 : parseFloat(v);
    if (type === "checkbox") v = input.checked;
    if (path) setPath(activeChar(), path, v);
    save();
    onchange && onchange(v);
  });
  return el("label", { class:"field" }, el("span",{}, label), input);
}
function getByPath(path){ if(!path) return ""; return path.split(".").reduce((o,k)=>o?.[k], activeChar()); }

/* ===================================================================
   Router / tabs
=================================================================== */
let currentTab = "trainer";
function switchTab(name){
  currentTab = name;
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab===name));
  $$(".view").forEach(v => v.classList.remove("active"));
  $(`#view-${name}`).classList.add("active");
  render();
}
$$(".tab").forEach(t => t.addEventListener("click", ()=>switchTab(t.dataset.tab)));

function render(){
  document.body.classList.toggle("map-mode", currentTab==="map");   // full-screen board layout
  // the PC tab exists only during cloud play; bounce off it if we drop to local
  const pcBtn = $("#tabPC"); if(pcBtn) pcBtn.hidden = (mode!=="cloud");
  if(currentTab==="pc" && mode!=="cloud"){ switchTab("pokemon"); return; }
  // the Map tab is shared cloud play, like the PC
  const mapBtn = $("#tabMap"); if(mapBtn) mapBtn.hidden = (mode!=="cloud");
  if(currentTab==="map" && mode!=="cloud"){ switchTab("pokemon"); return; }
  // the Encounters tab is GM-only
  const encBtn = $("#tabEncounters"); if(encBtn) encBtn.hidden = !isGM();
  if(currentTab==="encounters" && !isGM()){ switchTab("trainer"); return; }
  refreshCharSelect();
  const ac = activeChar();
  $("#partyCount").textContent = (ac?.pokemon?.length) || "";
  renderCloudBanner();
  if (currentTab==="trainer")    renderTrainer();
  if (currentTab==="pokemon")    renderPokemon();
  if (currentTab==="pc")         renderPC();
  if (currentTab==="map")        renderMap();
  if (currentTab==="battle")     renderBattle();
  if (currentTab==="encounters") renderEncounters();
  if (currentTab==="reference")  renderReference();
  applyReadonlyLock();
}
/* lock the sheet views when viewing a cloud character you can't edit */
function applyReadonlyLock(){
  const lock = mode==="cloud" && cloud.activeId && !canEditActive();
  $$(".view").forEach(v => v.classList.toggle("ro", !!lock && v.id!=="view-reference" && v.id!=="view-battle"));
}

/* ===================================================================
   TRAINER VIEW
=================================================================== */
let trainerTab = "sheet";
function renderTrainer(){
  const c = activeChar(), t = c.trainer, root = $("#view-trainer");
  root.innerHTML = "";
  root.append(subTabBar(
    [["sheet","Sheet"],["features","Features & Edges"],["levelup","Level Up"],["gear","Inventory & Bio"]],
    trainerTab, k=>{ trainerTab=k; renderTrainer(); }));

  if(trainerTab==="features"){
    root.append(classesCard());
    root.append(listCard("Edges","trainer.edges", D.edges.map(x=>x.name), "edge"));
    root.append(listCard("Features","trainer.features", D.features.map(x=>x.name), "feature"));
    return;
  }
  if(trainerTab==="levelup"){
    root.append(levelUpCard(t));
    return;
  }
  if(trainerTab==="gear"){
    root.append(inventoryCard(t));
    const nc = el("div",{class:"card"}, el("h3",{},"Background & Notes"));
    nc.append(field("Appearance","trainer.appearance",{type:"textarea"}));
    nc.append(el("div",{style:"height:8px"}));
    nc.append(field("Background","trainer.background",{type:"textarea"}));
    nc.append(el("div",{style:"height:8px"}));
    nc.append(field("Notes","trainer.notes",{type:"textarea"}));
    root.append(nc);
    return;
  }

  /* ---- sheet tab ---- */
  /* identity */
  const idc = el("div",{class:"card"}, el("h3",{},"Trainer"));
  const row1 = el("div",{class:"fieldrow"});
  row1.append(
    field("Name","trainer.name"),
    field("Level","trainer.level",{type:"number",min:1,max:50,onchange:recalcTrainer}),
    field("Money ($)","trainer.money",{type:"number",min:0}),
  );
  const row2 = el("div",{class:"fieldrow"});
  row2.append(
    field("Age","trainer.age"),
    field("Gender","trainer.gender"),
    field("Height","trainer.heightTxt",{placeholder:"5'6\""}),
    field("Weight","trainer.weightTxt",{placeholder:"lbs"}),
    field("Size","trainer.size",{opts:["Small","Medium","Large","Huge","Gigantic"]}),
    field("Weight Class","trainer.weightClass",{type:"number",min:1}),
  );
  idc.append(el("div",{class:"idrow"}, trainerAvatar(t), el("div",{style:"flex:1;min-width:220px"}, row1, row2)));
  root.append(idc);

  /* EXP tracker (houserule: 10 EXP = level up) */
  root.append(trainerXpCard(t));

  /* HP / AP tracker + rest buttons */
  root.append(trainerVitalsCard(t));

  /* combat stats + derived */
  const tb = trainerStatBudget(t);
  const sc = el("div",{class:"card"}, el("h3",{},"Combat Stats",
    el("div",{class:"inline"}, trainerBudgetText(tb), trainerUnlockToggle(t))));
  const sg = el("div",{class:"statgrid"});
  STATS.forEach(([k,lbl]) => {
    const canInc = t.unlocked || tb.remaining > 0;
    const box = el("div",{class:"stat"},
      el("div",{class:"lbl"},lbl),
      inputMini(`trainer.combat.${k}.base`,  t.combat[k].base,  "base"),
      statStepper(t.combat[k].added, canInc, v=>{ t.combat[k].added = v; save(); renderTrainer(); }),
      el("div",{class:"big","data-tot":k}, t.combat[k].base + t.combat[k].added),
    );
    sg.append(box);
  });
  sc.append(sg);
  sc.append(el("h3",{style:"margin-top:14px"},"Derived Stats"));
  sc.append(trainerDerivedGrid(t));
  root.append(sc);

  /* weapons (modify Struggle) */
  root.append(weaponsCard(t));

  /* skills */
  const skc = el("div",{class:"card"}, el("h3",{},"Skills",
     el("span",{class:"muted small"},"tap a rank")));
  const tbl = el("table",{class:"skilltable"});
  SKILLS.forEach(([k,lbl]) => {
    const tr = el("tr",{});
    tr.append(el("td",{},lbl));
    const rb = el("td",{},rankButtons(k, t.skills[k]));
    const dice = el("td",{class:"dice","data-dice":k}, `${rankDice(t.skills[k])}d6`);
    tr.append(rb, dice);
    tbl.append(tr);
  });
  skc.append(tbl);
  root.append(skc);
}

/* Damage / Heal control: one signed input — type 20 to heal 20, −20 to take 20 damage. */
function damageHealRow(getHP, setHP){
  const wrap = el("div",{class:"dhrow"});
  const box = el("input",{type:"number",placeholder:"±HP",title:"20 heals, −20 damages",class:"dh-input"});
  const apply = () => { const n = parseInt(box.value); box.value=""; if(n) setHP(getHP() + n); };
  box.addEventListener("keydown", e=>{ if(e.key==="Enter") apply(); });
  wrap.append(
    el("span",{class:"small muted",style:"font-weight:700"},"Damage / Heal"),
    box,
    el("button",{class:"btn-secondary",style:"padding:6px 14px",onclick:apply},"Apply"),
    el("span",{class:"small muted"},"+ heals · − damages"));
  return wrap;
}
/* ---------- Trainer weapons (modify the Struggle Attack — Core p.286) ---------- */
const WEAPON_PRESETS = {
  "Small Melee":{dbMod:1, acMod:0, range:"Melee",        twoHanded:false},
  "Large Melee":{dbMod:2, acMod:1, range:"Melee",        twoHanded:true},
  "Short Range":{dbMod:1, acMod:0, range:"4m",           twoHanded:false},
  "Long Range": {dbMod:2, acMod:1, range:"12m (min 4m)", twoHanded:true},
  "Custom":     {dbMod:0, acMod:0, range:"Melee",        twoHanded:false},
};
/* Weapon Moves a Fine Weapon can grant (Core pp.287-291) — all already in the moves DB.
   The weapon's own +DB/+AC apply to these too. Optional: a GM/player may also type a custom move. */
const WEAPON_MOVES = ["Backswing","Bullseye","Cheap Shot","Wear Down","Wounding Strike","Deadly Strike",
  "Furious Strikes","Gouge","Maul","Riposte","Slice","Titanic Slam","Double Swipe","Triple Threat"];
function newWeapon(){ return { id:uid(), name:"", category:"Small Melee", type:"Normal", notes:"", weaponMove:"", equipped:false, ...WEAPON_PRESETS["Small Melee"] }; }
/* the trainer's Struggle Attack after Combat rank + the equipped weapon */
/* the trainer's Struggle Attack — unarmed by default, or modified by a given weapon */
function trainerStruggle(t, w){
  const expert = rankNum(t.skills.combat) >= 5;          // Combat Expert+ → AC 3 / DB 5
  let ac = expert ? 3 : 4, db = expert ? 5 : 4, type = "Normal", range = "Melee", name = "Struggle Attack";
  if(w){ ac += (w.acMod||0); db += (w.dbMod||0); type = w.type || type; range = w.range || range; name = w.name || "Weapon Strike"; }
  return { name, ac, damageBase:db, type, range, cls:"Physical", weapon:w };
}
function weaponsCard(t){
  if(!Array.isArray(t.weapons)) t.weapons = [];
  const card = el("div",{class:"card"}, el("h3",{},"Weapons",
    el("span",{class:"muted small"},"each becomes its own attack in Battle"),
    el("button",{class:"linkbtn h-act", onclick:()=>{ t.weapons.push(newWeapon()); save(); renderTrainer(); }},"+ add")));
  if(!t.weapons.length){
    card.append(el("span",{class:"muted small"},"none — unarmed Struggle is Normal, Physical, AC 4, DB 4 (AC 3 / DB 5 at Combat Expert+)."));
    return card;
  }
  t.weapons.forEach((w,i)=>{
    const box = el("div",{style:"border:1px solid var(--line);border-radius:var(--radius-sm);padding:8px 10px;margin-top:8px"});
    box.append(el("div",{class:"inline",style:"gap:10px;justify-content:space-between"},
      el("span",{style:"font-weight:700"}, w.name || `Weapon ${i+1}`),
      el("button",{class:"linkbtn danger",title:"remove",onclick:()=>{ t.weapons.splice(i,1); save(); renderTrainer(); }},"× remove")));
    const r1 = el("div",{class:"fieldrow"});
    r1.append(
      field("Name","",{value:w.name,onchange:v=>{ w.name=v; save(); renderTrainer(); }}),
      field("Category","",{opts:Object.keys(WEAPON_PRESETS),value:w.category,onchange:v=>{ w.category=v; Object.assign(w, WEAPON_PRESETS[v]); save(); renderTrainer(); }}),
      field("Type","",{opts:TYPES,value:w.type,onchange:v=>{ w.type=v; save(); renderTrainer(); }}),
    );
    const r2 = el("div",{class:"fieldrow"});
    r2.append(
      field("+ Damage Base","",{type:"number",value:w.dbMod,onchange:v=>{ w.dbMod=parseInt(v)||0; save(); renderTrainer(); }}),
      field("+ AC (harder)","",{type:"number",value:w.acMod,onchange:v=>{ w.acMod=parseInt(v)||0; save(); renderTrainer(); }}),
      field("Range","",{value:w.range,onchange:v=>{ w.range=v; save(); renderTrainer(); }}),
      field("Weapon Move","",{opts:["", ...WEAPON_MOVES], value:w.weaponMove||"", onchange:v=>{ w.weaponMove=v; save(); renderTrainer(); }}),
    );
    box.append(r1, r2, field("Notes","",{value:w.notes,onchange:v=>{ w.notes=v; save(); }}));
    const ws = trainerStruggle(t, w);
    box.append(el("div",{class:"small",style:"margin-top:6px"}, el("b",{},"Attack: "),
      el("span",{html:typeBadge(ws.type)}), ` Physical · AC ${ws.ac} · DB ${ws.damageBase} (${(DB_TABLE[ws.damageBase]||"?").split("/")[0].trim()}) · ${ws.range}`));
    if(w.weaponMove){ const wm=moveByName.get(w.weaponMove.toLowerCase());
      if(wm) box.append(el("div",{class:"small muted",style:"margin-top:2px"},
        `+ Weapon Move ${w.weaponMove}: ${wm.frequency||""} · ${wm.class||""} · DB ${wm.damageBase}${w.dbMod?`+${w.dbMod}`:""} · AC ${wm.ac}${w.acMod?`+${w.acMod}`:""} · ${wm.range||""}`)); }
    card.append(box);
  });
  return card;
}
/* the trainer's attack profile: base Struggle for a weapon, or that weapon's granted Weapon Move */
function trainerAttackProfile(t, weaponMoveName, w){
  if(weaponMoveName){
    const m = moveByName.get(weaponMoveName.toLowerCase());
    if(m) return { name:m.name, type:(w&&w.type&&w.type!=="Normal")?w.type:(m.type||"Normal"),
      damageBase:(m.damageBase||0)+(w?w.dbMod:0), ac:(m.ac!=null?m.ac:4)+(w?w.acMod:0),
      range:m.range||"Melee", cls:m.class||"Physical", frequency:m.frequency, effect:m.effect, weapon:w, move:m };
  }
  return trainerStruggle(t, w);
}
/* Roll the trainer's Struggle or Weapon Move (adds Attack; STAB never applies to Struggle) */
function openTrainerAttack(t, weaponMoveName, w){
  const st = trainerAttackProfile(t, weaponMoveName, w);
  const atk = t.combat.atk.base + t.combat.atk.added;
  const diceStr = (DB_TABLE[st.damageBase]||"").split("/")[0].trim();
  const dm = diceStr.match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/) || [];
  const dn = dm[1]?+dm[1]:0, dfaces = dm[2]?+dm[2]:0, dflat = dm[3]?parseInt(dm[3].replace(/\s/g,"")):0;
  const body = el("div",{});
  body.append(el("div",{class:"chips",style:"margin-bottom:10px"},
    el("span",{html:typeBadge(st.type)}), el("span",{class:"kv"},st.cls||"Physical"),
    el("span",{class:"kv"},`AC ${st.ac}`), el("span",{class:"kv"},`DB ${st.damageBase}`), el("span",{class:"kv"},st.range),
    st.frequency?el("span",{class:"kv"},st.frequency):""));
  if(st.weapon) body.append(el("div",{class:"small muted",style:"margin-bottom:8px"},
    `Weapon: ${st.weapon.name||"(unnamed)"} — ${st.weapon.category}${st.weapon.notes?` · ${st.weapon.notes}`:""}`));
  if(st.effect) body.append(el("div",{class:"small",style:"margin-bottom:8px"}, st.effect));

  /* --- rolling guide: how accuracy & damage are worked out (shown before you roll) --- */
  const explain = el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
  explain.append(el("div",{style:"margin-bottom:10px"},
    el("div",{style:"font-size:16px;font-weight:700"}, "Accuracy: 1d20"),
    el("div",{class:"small muted",style:"margin-top:2px"},
      `Roll 1d20 — hits if it's ≥ AC ${st.ac} + the target's Physical Evasion. Nat 20 auto-hits/crits, nat 1 auto-misses.`)));
  if(dn){
    const terms = [`${dn}d${dfaces}`]; if(dflat) terms.push(String(dflat)); if(atk) terms.push(String(atk));
    const why = [`${dn}d${dfaces}${dflat?`+${dflat}`:""} = Damage Base ${st.damageBase}`];
    if(atk) why.push(`${atk} = your Attack`);
    explain.append(el("div",{},
      el("div",{style:"font-size:16px;font-weight:700"}, `Damage: ${terms.join(" + ")}`),
      el("div",{class:"small muted",style:"margin-top:2px"}, why.join(" · ") + ". STAB never applies to Struggle. Target then subtracts Defense.")));
  }
  body.append(explain);

  /* --- results (filled on Roll) --- */
  const out = el("div",{class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"},"Press 🎲 Roll dice to simulate."));
  const doRoll = () => {
    out.innerHTML=""; out.style.borderStyle="solid";
    const acc = 1+Math.floor(Math.random()*20);
    out.append(el("div",{style:"margin-bottom:10px"}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"),
      el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${acc}`, el("span",{class:"muted",style:"font-size:13px;font-weight:600"}," (1d20)")),
      el("div",{class:"small muted"}, `Hits if ${acc} ≥ AC ${st.ac} + target's Physical Evasion.${acc===20?" Natural 20 — auto-hit/crit!":acc===1?" Natural 1 — auto-miss.":""}`)));
    const r = rollDiceString(diceStr);
    if(r){ const total = r.total + atk;
      out.append(el("div",{}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"),
        el("div",{style:"font-size:26px;font-weight:800;color:var(--accent)"}, `💥 ${total}`),
        el("div",{class:"small muted",style:"margin-top:2px"}, `${r.expr} → [${r.rolls.join(", ")}]${r.flat?` ${r.flat>0?"+":""}${r.flat}`:""} = ${r.total}  + ${atk} Attack. Target subtracts Defense.`))); }
  };
  body.append(out);
  modal({title:st.name, bodyNode:body, footNodes:[
    st.move? el("button",{class:"btn-secondary",onclick:()=>openRefDetail("move",st.name)},"Full text") : "",
    el("button",{class:"btn-primary",onclick:doRoll},"🎲 Roll dice"),
  ]});
}
/* Trainer portrait — upload / replace / remove a photo (stored as a compact data URL) */
function trainerAvatar(t){
  const wrap = el("div",{class:"avatar-wrap"});
  wrap.append(el("img",{class:"avatar", alt:"Trainer portrait", src: t.avatar || TRAINER_PLACEHOLDER}));
  const acts = el("div",{class:"avatar-acts"});
  acts.append(el("button",{class:"linkbtn",onclick:()=>pickImage(256, d=>{ t.avatar=d; save(); renderTrainer(); })},
    t.avatar ? "📷 Change" : "📷 Photo"));
  if(t.avatar) acts.append(el("button",{class:"linkbtn",onclick:()=>{ t.avatar=""; save(); renderTrainer(); }},"remove"));
  wrap.append(acts);
  return wrap;
}
/* Trainer EXP (houserule): 10 EXP = one level. t.level stays authoritative; t.xp is 0..9 progress toward it. */
const TRAINER_XP_PER_LEVEL = 10;
const TRAINER_MAX_LEVEL = 50;
function addTrainerXP(t, n){
  if(typeof t.xp!=="number") t.xp = 0;
  t.xp += n;
  let leveled = 0;
  while(t.xp >= TRAINER_XP_PER_LEVEL && t.level < TRAINER_MAX_LEVEL){ t.xp -= TRAINER_XP_PER_LEVEL; t.level++; leveled++; }
  while(t.xp < 0 && t.level > 1){ t.xp += TRAINER_XP_PER_LEVEL; t.level--; }              // allow taking EXP back
  if(t.xp < 0) t.xp = 0;
  if(t.level >= TRAINER_MAX_LEVEL){ t.level = TRAINER_MAX_LEVEL; t.xp = Math.min(t.xp, TRAINER_XP_PER_LEVEL); }
  save();
  if(leveled > 0) toast(`⭐ Level up! ${t.name||"Trainer"} is now Lv ${t.level}`);
  renderTrainer();
}
function trainerXpCard(t){
  if(typeof t.xp!=="number") t.xp = 0;
  const per = TRAINER_XP_PER_LEVEL, cur = Math.max(0, Math.min(per, t.xp));
  const pct = Math.round(cur/per*100);
  const card = el("div",{class:"card"}, el("h3",{},"Experience",
    el("span",{class:"muted small"}, `${per} EXP = 1 level`)));
  card.append(el("div",{class:"inline",style:"gap:10px;align-items:center;flex-wrap:wrap"},
    el("span",{class:"small",style:"font-weight:700;white-space:nowrap"}, `Lv ${t.level} · ${cur}/${per} EXP`),
    el("div",{class:"hpbar",style:"flex:1;min-width:140px"}, el("i",{style:`width:${pct}%;background:var(--accent)`})),
    el("span",{class:"small muted",style:"white-space:nowrap"}, t.level>=TRAINER_MAX_LEVEL ? "max level" : `${per-cur} to Lv ${t.level+1}`)));
  const inp = el("input",{type:"number",min:1,value:1,style:"width:70px",title:"amount of EXP"});
  const apply = sign => { const n=Math.abs(parseInt(inp.value)||0); if(n) addTrainerXP(t, sign*n); };
  card.append(el("div",{class:"inline",style:"gap:6px;margin-top:8px;flex-wrap:wrap;align-items:center"},
    el("span",{class:"small muted"},"Award:"), inp,
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"grant EXP (auto levels up at 10)",onclick:()=>apply(1)},"＋ EXP"),
    el("button",{class:"btn ghost",style:"padding:5px 10px",title:"take EXP back",onclick:()=>apply(-1)},"－ EXP")));
  return card;
}
/* Trainer HP + AP tracker with Damage/Heal box and End Scene / End Day (rest) buttons */
function trainerVitalsCard(t){
  normTrainer(t);
  const d = trainerDerived(t);
  const maxHP = d.hp, maxAP = d.ap;
  if(t.currentHP==null) t.currentHP = maxHP;
  const card = el("div",{class:"card"}, el("h3",{},"Hit Points, AP & Rest"));

  /* HP row */
  const setHP = v => { t.currentHP = Math.max(-99, Math.min(maxHP, v)); save(); renderTrainer(); };
  const hp = el("div",{class:"hpctl"});
  const cur = el("input",{type:"number",title:"current HP"}); cur.value = t.currentHP;
  cur.addEventListener("change",()=>setHP(parseInt(cur.value)||0));
  hp.append(el("button",{onclick:()=>setHP(t.currentHP-5)},"−5"),
            el("button",{onclick:()=>setHP(t.currentHP-1)},"−"), cur,
            el("span",{class:"muted",style:"font-weight:800"},`/ ${maxHP}`),
            el("button",{onclick:()=>setHP(t.currentHP+1)},"+"),
            el("button",{onclick:()=>setHP(t.currentHP+5)},"+5"),
            el("button",{title:"full heal",onclick:()=>setHP(maxHP)},"MAX"));
  card.append(hp);
  const pct = Math.max(0,Math.min(100,Math.round(t.currentHP/maxHP*100)));
  card.append(el("div",{class:"hpbar",style:"margin-top:6px"},
    el("i",{style:`width:${pct}%;background:${pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"}`})));

  /* damage / heal: type a signed number — positive heals, negative damages */
  card.append(damageHealRow(()=>t.currentHP, setHP));

  /* temp HP · AP (Trainers don't take Injuries in this game) */
  const row = el("div",{class:"fieldrow",style:"margin-top:12px"});
  row.append(field("Temp HP","",{type:"number",min:0,value:t.tempHP,onchange:v=>{t.tempHP=parseInt(v)||0;save();}}));
  card.append(row);
  const setAP = u => { t.usedAP = Math.max(0, Math.min(maxAP, u)); save(); renderTrainer(); };
  const apRow = el("div",{class:"hpctl",style:"margin-top:10px;align-items:center"});
  const apIn = el("input",{type:"number",min:0,max:maxAP,title:"AP spent"}); apIn.value = t.usedAP;
  apIn.addEventListener("change",()=>setAP(parseInt(apIn.value)||0));
  apRow.append(el("span",{class:"small muted",style:"font-weight:700"},"Action Points — spent:"),
    el("button",{onclick:()=>setAP(t.usedAP-1)},"−"), apIn,
    el("button",{onclick:()=>setAP(t.usedAP+1)},"+"),
    el("span",{class:"muted",style:"font-weight:800"},`/ ${maxAP}`),
    el("span",{class:"small muted"},`· ${maxAP-t.usedAP} AP left`));
  card.append(apRow);

  /* End Scene / End Day now live in the persistent top bar (🌙 / ☀), not here */
  card.append(el("div",{class:"small muted",style:"margin-top:6px"},
    "Use 🌙 End Scene / ☀ End Day at the top of the screen. End Scene restores AP & Scene uses; End Day fully heals, refreshes Daily uses, and heals 1 Injury on your Pokémon."));
  return card;
}

function inputMini(path, val, cls){
  const i = el("input",{type:"number",class:cls}); i.value = val;
  i.addEventListener("input", ()=>{
    setPath(activeChar(), path, i.value===""?0:parseFloat(i.value));
    save(); recalcTrainer();
  });
  return i;
}
function trainerDerivedGrid(t){
  const d = trainerDerived(t);
  const wrap = el("div",{class:"derived",id:"trainerDerived"});
  const items = [
    ["Hit Points", d.hp], ["Action Points", d.ap],
    ["Phys. Evasion", "+"+d.physEva], ["Spec. Evasion", "+"+d.specEva],
    ["Speed Evasion", "+"+d.spdEva], ["Power", d.power],
    ["High Jump", d.highJump], ["Long Jump", d.longJump],
    ["Overland", d.overland], ["Swim", d.swim], ["Throwing Range", d.throwing],
  ];
  items.forEach(([l,v]) => wrap.append(el("div",{class:"dv"},
    el("div",{class:"lbl"},l), el("div",{class:"val"},String(v)))));
  return wrap;
}
function recalcTrainer(){
  const t = activeChar().trainer;
  STATS.forEach(([k]) => { const n=$(`[data-tot="${k}"]`); if(n) n.textContent = t.combat[k].base + t.combat[k].added; });
  SKILLS.forEach(([k]) => { const n=$(`[data-dice="${k}"]`); if(n) n.textContent = `${rankDice(t.skills[k])}d6`; });
  const g = $("#trainerDerived"); if (g) g.replaceWith(trainerDerivedGrid(t));
}
function rankButtons(skillKey, cur){
  const wrap = el("div",{class:"rankbtns"});
  RANKS.forEach((r,i) => {
    const b = el("button",{title:r, class: r===cur?"on":""}, r[0]);
    b.addEventListener("click", ()=>{
      activeChar().trainer.skills[skillKey] = r; save();
      $$("button",wrap).forEach((x,j)=>x.classList.toggle("on", RANKS[j]===r));
      recalcTrainer();
    });
    wrap.append(b);
  });
  return wrap;
}

/* ---------- classes → learnable features (prerequisite-aware) ---------- */
/* used by prereqStatus (AND semantics) — split only on real separators, NOT "OR",
   so alternative branches stay lenient and never cause a false "unmet". */
function prereqTokens(str){ return String(str||"").split(/,|;|\band\b/i).map(s=>s.trim()).filter(Boolean); }
/* used only to decide which Class a Feature belongs to — split aggressively (incl. OR / newlines)
   so a Feature reachable through any branch is still grouped under its class. */
function membershipTokens(str){ return String(str||"").split(/,|;|\band\b|\bor\b|\n|\//i).map(s=>s.trim()).filter(Boolean); }
const featureByName = new Map(D.features.map(f=>[f.name, f]));
/* The class DB (from the Fancy sheet's class tab) sometimes names a class by a fragment/label while
   Feature prerequisites use the book's canonical name (e.g. class row "Capture Skills" whose mechanic
   is "Capture Specialist", which is what its Features reference). Build, for every class the user can
   take, the set of strings a Feature might use to point at it: its name, its mechanic, and the names/
   mechanics of any sibling rows sharing that mechanic. */
const classAliasSet = (() => {
  const byMech = {};
  D.classes.forEach(c => { if(c.mechanic){ (byMech[c.mechanic] = byMech[c.mechanic] || []).push(c); } });
  const map = {};
  D.classes.forEach(c => {
    const s = new Set([c.name]);
    if(c.mechanic){ s.add(c.mechanic); (byMech[c.mechanic]||[]).forEach(o=>{ s.add(o.name); if(o.mechanic) s.add(o.mechanic); }); }
    map[c.name] = s;
  });
  return map;
})();
/* does a prereq token point at `className` (via any of its aliases)? handles "N <alias> Features" too. */
function tokenMatchesClass(tok, className){
  const aliases = classAliasSet[className] || new Set([className]);
  if(aliases.has(tok)) return true;
  const m = tok.match(/^\d+\s+(.+?)\s+Features?$/i);
  return !!(m && aliases.has(m[1]));
}
/* every canonical class name a bare reference (name or mechanic) could mean — used to resolve
   a prereq like "3 Capture Specialist Features" back to whatever class row the user actually took. */
function classNamesForRef(ref){
  const out = D.classes.filter(c => (classAliasSet[c.name]||new Set()).has(ref)).map(c=>c.name);
  return out.length ? out : [ref];
}
/* Tokenise every Feature's prerequisites once, and record which classes each Feature belongs to
   DIRECTLY (its prereqs name the class or one of its aliases). */
const _featTokens = new Map(D.features.map(f => [f.name, membershipTokens(f.prerequisites)]));
const _directClassesOf = new Map(D.features.map(f => [f.name, new Set()]));
D.classes.forEach(c => {
  D.features.forEach(f => {
    if(_featTokens.get(f.name).some(tok => tokenMatchesClass(tok, c.name))) _directClassesOf.get(f.name).add(c.name);
  });
});
/* every Feature that belongs to a Class — directly, OR transitively through a chain of Features
   that themselves belong ONLY to this class line (e.g. Capture Specialist → Advanced Capture
   Techniques → Captured Momentum). Features already anchored to another class are NOT absorbed,
   so e.g. Trickster Features never leak into Type Ace. Memoised. */
const _classFeatCache = {};
function featuresForClass(className){
  if(_classFeatCache[className]) return _classFeatCache[className];
  const belongs = new Set();
  // direct membership via token match (works even for canonical class names with no class row of their own,
  // e.g. "Capture Specialist" whose only class row is the alias "Capture Skills")
  D.features.forEach(f => { if(_featTokens.get(f.name).some(tok => tokenMatchesClass(tok, className))) belongs.add(f.name); });
  let changed = true;
  while(changed){
    changed = false;
    D.features.forEach(f => {
      if(belongs.has(f.name)) return;
      if(_directClassesOf.get(f.name).size > 0) return;                 // anchored elsewhere — don't absorb
      if(_featTokens.get(f.name).some(tok => belongs.has(tok))){ belongs.add(f.name); changed = true; }
    });
  }
  const arr = D.features.filter(f => belongs.has(f.name));
  _classFeatCache[className] = arr;
  return arr;
}
const _classFeatNameCache = {};
function classFeatNameSet(className){
  return _classFeatNameCache[className] || (_classFeatNameCache[className] = new Set(featuresForClass(className).map(f=>f.name)));
}
function featureBelongsToClass(featureName, className){ return classFeatNameSet(className).has(featureName); }
/* how many of a Class's Features a Trainer counts toward "N ClassName Features" prereqs.
   Resolves the referenced name through class aliases (so "N Capture Specialist Features" counts the
   "Capture Skills" class the user actually took), and counts the class-defining Feature itself (PTU 1.05). */
function classFeatureCount(t, ref){
  const targets = classNamesForRef(ref);
  const featNames = new Set(), taken = new Set();
  targets.forEach(cn => {
    classFeatNameSet(cn).forEach(fn => featNames.add(fn));
    if((t.classes||[]).includes(cn)) taken.add(cn);
  });
  let n = (t.features||[]).filter(fn => featNames.has(fn)).length;
  n += taken.size;                       // each matching class the user took grants its class Feature
  return n;
}
/* ---------- class Techniques (Capture Techniques, Signature Techniques, terrain talents, …) ----------
   Parsed from the sheet's "Techniques" section; each {name, prereq (parent class/feature), frequency, effect}. */
const TECHS = Array.isArray(D.techniques) ? D.techniques : [];
const techByName = new Map(TECHS.map(x => [x.name, x]));
/* Techniques belonging to a class: their prereq names the class (alias) or a Feature of the class. */
function techniquesForClass(className){
  const featSet = classFeatNameSet(className);
  return TECHS.filter(tq => membershipTokens(tq.prereq).some(tok => tokenMatchesClass(tok, className) || featSet.has(tok)));
}
function techniqueDetailHTML(name){
  const tq = techByName.get(name); if(!tq) return "<span class='muted'>—</span>";
  return `<div class="r-meta">${esc(tq.frequency||"")}${tq.prereq?" · Prereq: "+esc(tq.prereq):""}</div><div class="r-body">${esc(tq.effect||"")}</div>`;
}
/* check a feature's prerequisites against a trainer; returns {met, unmet:[reasons]} */
function prereqStatus(t, feature){
  const unmet = [];
  prereqTokens(feature.prerequisites).forEach(tok => {
    let m = tok.match(/^(\d+)\s+(.+?)\s+Features?$/i);          // "5 Taskmaster Features"
    if(m){ const need=+m[1], cls=m[2];
      const have = classFeatureCount(t, cls);
      if(have<need) unmet.push(`${need} ${cls} Features (have ${have})`);
      return; }
    m = tok.match(/^(Pathetic|Untrained|Novice|Adept|Expert|Master)\s+(.+)$/i);  // "Adept Intimidate"
    if(m){ const sk = SKILLS.find(s=>s[1].toLowerCase()===m[2].trim().toLowerCase() || s[0].toLowerCase()===m[2].trim().toLowerCase());
      if(sk){ if(rankNum(t.skills[sk[0]]) < rankNum(m[1])) unmet.push(tok); return; } }
    // satisfied if the trainer took this as a Class — directly, or under an aliased class-row name
    if((t.classes||[]).includes(tok)) return;
    if(classNamesForRef(tok).some(cn => (t.classes||[]).includes(cn))) return;
    if(classNameSet.has(tok)){ if(!t.classes.includes(tok)) unmet.push(tok); return; }   // a class
    if(D.features.some(f=>f.name===tok)){ if(!t.features.includes(tok)) unmet.push(tok); return; } // another feature
    /* anything else (narrative / stat prereqs) is left for the player to judge */
  });
  return { met: unmet.length===0, unmet };
}
function trainerUnlockToggle(t){
  const wrap = el("label",{class:"small",title:"GM: ignore feature prerequisites",
    style:"display:inline-flex;gap:5px;align-items:center;cursor:pointer;font-weight:700;color:var(--muted)"});
  const cb = el("input",{type:"checkbox"}); cb.checked = !!t.unlocked;
  cb.addEventListener("change",()=>{ t.unlocked=cb.checked; save(); render(); });
  wrap.append(cb, "🔓 GM: ignore prereqs");
  return wrap;
}
function openClassFeaturePicker(t, className){
  const learnable = featuresForClass(className).filter(f=>!t.features.includes(f.name)).map(f=>f.name);
  if(!learnable.length){ toast("No more features from this class"); return; }
  const lockFn = t.unlocked ? null : name => {
    const f = D.features.find(x=>x.name===name); if(!f) return null;
    const st = prereqStatus(t, f); return st.met ? null : ("Needs "+st.unmet.join(", "));
  };
  openPicker(`Learn a ${className} Feature${t.unlocked?" (🔓)":""}`, learnable, name=>{
    if(!t.features.includes(name)){ t.features.push(name); autoGrantFeatureMoves(t, name); save(); render(); toast(`Learned ${name} ✓`); }
  }, "feature", null, lockFn);
}
function openTechniquePicker(t, className){
  const all = techniquesForClass(className);
  const learnable = all.filter(tq => !t.techniques.includes(tq.name)).map(tq => tq.name);
  if(!learnable.length){ toast(all.length ? "All techniques learned" : "No techniques for this class"); return; }
  openPicker(`Learn a ${className} Technique`, learnable, name=>{
    if(!t.techniques.includes(name)){ t.techniques.push(name); save(); render(); toast(`Learned ${name} ✓`); }
  }, "technique");
}
/* one learned Technique listed under its class — expandable description + remove */
function classTechniqueRow(t, techName){
  const row = el("details",{class:"spoiler",style:"margin-top:6px"});
  const tq = techByName.get(techName);
  const meta = tq ? tq.frequency : "";
  row.append(el("summary",{},
    el("span",{style:"color:var(--ink);font-weight:700"}, techName),
    meta ? el("span",{class:"muted small",style:"margin-left:8px"}, meta) : "",
    el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"forget this technique",
      onclick:e=>{ e.preventDefault(); const i=t.techniques.indexOf(techName); if(i>=0){ t.techniques.splice(i,1); save(); render(); toast(`Forgot ${techName}`); } }},"×")));
  row.append(el("div",{class:"small",style:"margin-top:6px",html: techniqueDetailHTML(techName)}));
  return row;
}
/* one learned Feature listed under its class — expandable description + remove */
function classFeatureRow(t, featName){
  const row = el("details",{class:"spoiler",style:"margin-top:6px"});
  const f = featureByName.get(featName);
  const meta = f ? [f.frequency, f.category].filter(Boolean).join(" · ") : "";
  row.append(el("summary",{},
    el("span",{style:"color:var(--ink);font-weight:700"}, featName),
    meta ? el("span",{class:"muted small",style:"margin-left:8px"}, meta) : "",
    el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"unlearn this feature",
      onclick:e=>{ e.preventDefault(); const i=t.features.indexOf(featName); if(i>=0){ t.features.splice(i,1); save(); render(); toast(`Unlearned ${featName}`); } }},"×")));
  row.append(el("div",{class:"small",style:"margin-top:6px",html: refDetailHTML("feature",featName)}));
  return row;
}
/* Classes card — each class shows its signature Feature, the Features you've picked from it,
   a “Learn a Feature” menu (incl. special sub-features like Capture Techniques), and its rules. */
function classesCard(){
  const t = activeChar().trainer;
  const arr = t.classes;
  const card = el("div",{class:"card"}, el("h3",{},"Classes",
    el("div",{class:"inline"}, trainerUnlockToggle(t),
      el("button",{class:"linkbtn h-act", onclick:()=>openPicker("Add Class", D.classes.map(c=>c.name), name=>{
        if(!arr.includes(name)){ arr.push(name); save(); render(); }
      }, "class")}, "+ add"))));
  if(!arr.length){ card.append(el("span",{class:"muted small"},"none yet — tap “+ add” to take a Class, then learn its Features here")); return card; }
  arr.forEach((name,idx) => {
    const feats = featuresForClass(name);
    const total = feats.length;
    const picked = feats.filter(f => t.features.includes(f.name)).map(f=>f.name);
    const techs = techniquesForClass(name);
    const pickedTechs = techs.filter(tq => t.techniques.includes(tq.name)).map(tq=>tq.name);
    const sig = featureByName.get(name);   // the class-defining Feature (same name), if any
    // block per class: a header row (name + Learn button + remove) over its features and rules
    const block = el("div",{style:"border:1px solid var(--line);border-radius:var(--radius-sm);padding:8px 10px;margin-top:8px"});
    const head = el("div",{class:"inline",style:"justify-content:space-between;gap:8px"});
    head.append(el("span",{style:"font-weight:700"}, name,
      total? el("span",{class:"muted small",style:"margin-left:8px"}, `· ${picked.length}/${total} features`):""));
    const acts = el("div",{class:"inline"});
    // always offer the Learn menu when the class has any Features — locked ones show what they need
    if(total) acts.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",
      onclick:()=>openClassFeaturePicker(t,name)}, "＋ Learn Feature"));
    acts.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted);font-size:18px;line-height:1",title:"remove class",
      onclick:()=>{ arr.splice(idx,1); save(); render(); }},"×"));
    head.append(acts);
    block.append(head);
    // signature (class-defining) Feature description
    if(sig){
      const sd = el("details",{class:"spoiler",style:"margin-top:6px"});
      sd.append(el("summary",{}, el("span",{style:"color:var(--accent);font-weight:700"},"★ "+name+" (class Feature)")));
      sd.append(el("div",{class:"small",style:"margin-top:6px",html: refDetailHTML("feature",name)}));
      block.append(sd);
    }
    // features you've picked from this class
    if(picked.length){
      block.append(el("div",{class:"small muted",style:"margin-top:8px;font-weight:700"},`Your ${name} Features`));
      picked.forEach(fn => block.append(classFeatureRow(t, fn)));
    } else if(total){
      block.append(el("div",{class:"small muted",style:"margin-top:6px"},"No Features picked from this class yet — tap “＋ Learn Feature”."));
    } else {
      block.append(el("div",{class:"small muted",style:"margin-top:4px"},"No class-specific Features for this one in the database."));
    }
    // Techniques (Capture Techniques, terrain talents, …) — special sub-abilities with their own menu
    if(techs.length){
      const th = el("div",{class:"inline",style:"justify-content:space-between;gap:8px;margin-top:10px"});
      th.append(el("span",{class:"small muted",style:"font-weight:700"}, `${name} Techniques (${pickedTechs.length}/${techs.length})`));
      th.append(el("button",{class:"btn-secondary",style:"padding:4px 9px",
        onclick:()=>openTechniquePicker(t,name)}, "＋ Learn Technique"));
      block.append(th);
      pickedTechs.forEach(tn => block.append(classTechniqueRow(t, tn)));
    }
    // class rules blurb
    const sp = el("details",{style:"margin-top:6px"});
    sp.append(el("summary",{style:"cursor:pointer;color:var(--muted);font-weight:700;font-size:12px"},"class rules"));
    sp.append(el("div",{class:"small",style:"margin-top:6px",html: refDetailHTML("class",name)}));
    block.append(sp);
    card.append(block);
  });
  return card;
}

/* generic list backed by a reference name-list; each entry expands to its rules text */
function listCard(title, path, allNames, refKind){
  const arr = getByPath(path) || [];
  const card = el("div",{class:"card"}, el("h3",{},title,
    el("button",{class:"linkbtn h-act", onclick:()=>openPicker(title, allNames, name=>{
      const a = getByPath(path);
      if(!a.includes(name)){ a.push(name); if(refKind==="feature") autoGrantFeatureMoves(activeChar().trainer, name); save(); render(); }
    }, refKind)}, "+ add")));
  if(!arr.length){ card.append(el("span",{class:"muted small"},"none yet — tap “+ add”")); return card; }
  arr.forEach((name,idx) => {
    const row = el("details",{class:"spoiler"});
    row.append(el("summary",{},
      el("span",{style:"color:var(--ink)"}, name),
      el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove",
        onclick:e=>{ e.preventDefault(); arr.splice(idx,1); save(); render(); }},"×")));
    row.append(el("div",{class:"small",style:"margin-top:6px", html: refDetailHTML(refKind, name)}));
    card.append(row);
  });
  return card;
}

/* ===================================================================
   Level-Up tracker (PTU 1.05 Trainer advancement, Core pp.18-19)
   A per-level ledger of what a Trainer gains and what they picked.
=================================================================== */
const LU_MAX_LEVEL = 50;
/* milestone "extra benefits" at certain levels */
const LU_MILESTONES = {
  2:  { title:"Adept Skills", note:"You may now Rank Up Skills to Adept.",
        grants:[{kind:"edge", label:"Skill Edge", hint:"not for an Adept rank-up"}] },
  5:  { title:"Amateur Trainer", note:"Choose one bonus below.",
        choice:{ key:"m5", options:[
          "Bonus Stats — +1 Atk/SpAtk on each even Level 6-10 (+2 retroactive)",
          "One General Feature"],
        grants:{ "One General Feature":[{kind:"feature", label:"General Feature"}] } } },
  6:  { title:"Expert Skills", note:"You may now Rank Up Skills to Expert.",
        grants:[{kind:"edge", label:"Skill Edge", hint:"not for an Expert rank-up"}] },
  10: { title:"Capable Trainer", note:"Choose one bonus below.",
        choice:{ key:"m10", options:[
          "Bonus Stats — +1 Atk/SpAtk on each even Level 12-20",
          "Two Edges"],
        grants:{ "Two Edges":[{kind:"edge", label:"Edge"},{kind:"edge", label:"Edge"}] } } },
  12: { title:"Master Skills", note:"You may now Rank Up Skills to Master.",
        grants:[{kind:"edge", label:"Skill Edge", hint:"not for a Master rank-up"}] },
  20: { title:"Veteran Trainer", note:"Choose one bonus below.",
        choice:{ key:"m20", options:[
          "Bonus Stats — +1 Atk/SpAtk on each even Level 22-30",
          "Two Edges"],
        grants:{ "Two Edges":[{kind:"edge", label:"Edge"},{kind:"edge", label:"Edge"}] } } },
  30: { title:"Elite Trainer", note:"Choose one bonus below.",
        choice:{ key:"m30", options:[
          "Bonus Stats — +1 Atk/SpAtk on each even Level 32-40",
          "Two Edges", "One General Feature"],
        grants:{ "Two Edges":[{kind:"edge", label:"Edge"},{kind:"edge", label:"Edge"}],
                 "One General Feature":[{kind:"feature", label:"General Feature"}] } } },
  40: { title:"Champion", note:"Choose one bonus below.",
        choice:{ key:"m40", options:[
          "Bonus Stats — +1 Atk/SpAtk on each even Level 42-50",
          "Two Edges", "One General Feature"],
        grants:{ "Two Edges":[{kind:"edge", label:"Edge"},{kind:"edge", label:"Edge"}],
                 "One General Feature":[{kind:"feature", label:"General Feature"}] } } },
};

/* one editable choice slot: a picker button that stores its value in t.levelUp[key] */
function luSlot(t, key, kind, label, hint){
  const names = kind==="edge" ? D.edges.map(x=>x.name) : D.features.map(x=>x.name);
  const cur = t.levelUp[key] || "";
  const btn = el("button",{class:"btn-secondary lu-pick", title:"Choose from the "+(kind==="edge"?"Edges":"Features")+" list",
    onclick:()=>openPicker(kind==="edge"?"Choose an Edge":"Choose a Feature", names, v=>{
      t.levelUp[key]=v; save(); renderTrainer();
    }, kind)}, cur || "choose…");
  if(cur) btn.classList.add("filled");
  const row = el("div",{class:"lu-slot"},
    el("span",{class:"lu-label"}, label + (hint?" ":""), hint?el("span",{class:"muted"},`(${hint})`):""),
    btn);
  if(cur) row.append(el("button",{class:"lu-clear",title:"clear",
    onclick:()=>{ delete t.levelUp[key]; save(); renderTrainer(); }},"×"));
  return row;
}

function luMilestoneNode(t, level, ms){
  const box = el("div",{class:"lu-ms"},
    el("div",{class:"lu-ms-head"}, el("span",{class:"lu-ms-star"},"★"),
      el("b",{}, `Level ${level} — ${ms.title}`)),
    el("div",{class:"small muted", style:"margin:2px 0 6px"}, ms.note));
  (ms.grants||[]).forEach((g,i)=> box.append(luSlot(t, `L${level}:ms:${i}`, g.kind, g.label, g.hint)));
  if(ms.choice){
    const ck = `L${level}:${ms.choice.key}`;
    const cur = t.levelUp[ck] || "";
    const sel = el("select",{class:"lu-select"});
    sel.append(el("option",{value:""},"— choose —"));
    ms.choice.options.forEach(o=>{ const op=el("option",{value:o}, o); sel.append(op); });
    sel.value = cur;
    sel.addEventListener("change",()=>{ t.levelUp[ck]=sel.value; save(); renderTrainer(); });
    box.append(sel);
    const extra = ms.choice.grants && ms.choice.grants[cur];
    if(extra) extra.forEach((g,i)=> box.append(luSlot(t, `L${level}:${ms.choice.key}:${i}`, g.kind, g.label, g.hint)));
  }
  return box;
}

/* running tally of Features / Edges / Stat Points earned by a given level (uses recorded milestone choices) */
function luTotals(t, level){
  let feat = 4 + 1;   // creation: 4 Features + 1 free Training Feature
  let edge = 4;       // creation: 4 Edges
  let stat = 10;      // creation: assign 10 Stat Points
  for(let L=2; L<=level; L++){
    stat += 1;                       // +1 Stat Point every level
    if(L % 2) feat++; else edge++;   // odd → Feature, even → Edge
    if(L===2 || L===6 || L===12) edge++;                 // skill-edge milestones
    const ms = LU_MILESTONES[L];
    if(ms && ms.choice){
      const pick = t.levelUp[`L${L}:${ms.choice.key}`] || "";
      if(pick.startsWith("Two Edges")) edge += 2;
      else if(pick.startsWith("One General Feature")) feat += 1;
    }
  }
  return { feat, edge, stat };
}

function levelUpCard(t){
  if(!t.levelUp || typeof t.levelUp!=="object") t.levelUp = {};   // cloud/import data may skip normTrainer
  const level = Math.max(1, Math.min(LU_MAX_LEVEL, t.level||1));
  const card = el("div",{class:"card lu-card"});
  card.append(el("h3",{}, "Level Up",
    el("span",{class:"pill", style:"margin-left:8px"}, `Level ${level}`)));
  card.append(el("div",{class:"small muted", style:"margin:-4px 0 10px"},
    "PTU 1.05 Trainer advancement. Every level grants a Stat Point; odd levels a Feature, even levels an Edge. ",
    "Record what you picked at each level — this is a personal tracker and doesn’t change your Features & Edges tab."));

  /* summary tallies */
  const tot = luTotals(t, level);
  const addedSum = STATS.reduce((s,[k])=>s+(t.combat[k].added||0),0);
  card.append(el("div",{class:"lu-summary"},
    el("div",{class:"lu-sum"}, el("b",{}, tot.feat), el("span",{class:"muted"}," Features earned"),
      el("div",{class:"small muted"}, `you list ${t.features.length} + ${t.classes.length} classes`)),
    el("div",{class:"lu-sum"}, el("b",{}, tot.edge), el("span",{class:"muted"}," Edges earned"),
      el("div",{class:"small muted"}, `you list ${t.edges.length}`)),
    el("div",{class:"lu-sum"}, el("b",{}, tot.stat), el("span",{class:"muted"}," Stat Points"),
      el("div",{class:"small muted"}, `${addedSum} spent · milestone Atk/SpAtk extra`)),
  ));

  /* per-level ledger */
  const list = el("div",{class:"lu-levels"});
  for(let L=1; L<=level; L++){
    const block = el("div",{class:"lu-level"});
    const head = el("div",{class:"lu-lvl-head"}, el("span",{class:"lu-lvl-num"}, L));
    if(L===1) head.append(el("span",{}, "Character Creation"));
    else head.append(el("span",{class:"muted small"}, "+1 Stat Point"));
    block.append(head);

    if(L===1){
      block.append(el("div",{class:"small muted", style:"margin:2px 0 6px"},
        "Skill Background (3 Pathetic / 1 Novice / 1 Adept) and 10 assigned Stat Points — see the Sheet tab."));
      block.append(el("div",{class:"lu-grp-label"},"Features (4) + free Training Feature"));
      for(let i=0;i<4;i++) block.append(luSlot(t, `L1:feat:${i}`, "feature", `Feature ${i+1}`));
      block.append(luSlot(t, `L1:training`, "feature", "Training Feature", "no prerequisites"));
      block.append(el("div",{class:"lu-grp-label"},"Edges (4)"));
      for(let i=0;i<4;i++) block.append(luSlot(t, `L1:edge:${i}`, "edge", `Edge ${i+1}`));
    } else if(L % 2){
      block.append(luSlot(t, `L${L}:feat`, "feature", "Feature"));
    } else {
      block.append(luSlot(t, `L${L}:edge`, "edge", "Edge"));
    }
    const ms = LU_MILESTONES[L];
    if(ms) block.append(luMilestoneNode(t, L, ms));
    list.append(block);
  }
  card.append(list);
  return card;
}

/* every catalog item a Trainer can carry (gear/equipment/key items/med kit/balls + held + berries) */
function catalogItems(){
  return [
    ...(D.items.gear||[]),
    ...D.items.held.map(x=>({...x,cat:"Held Item"})),
    ...D.items.food.map(x=>({...x,cat:"Food"})),
  ];
}
function inventoryCard(t){
  const card = el("div",{class:"card"}, el("h3",{},"Inventory & Equipment",
    el("div",{class:"inline"},
      el("button",{class:"linkbtn h-act", onclick:()=>openInventoryPicker(t)}, "+ from catalog"),
      el("button",{class:"linkbtn h-act", onclick:()=>{ t.inventory.push({name:"",qty:1,notes:""}); save(); renderTrainer(); }}, "+ custom"))));
  if(!t.inventory.length) card.append(el("span",{class:"muted small"},"empty — add gear, equipment, Poké Balls, potions… from the catalog"));
  t.inventory.forEach((it,i) => {
    const row = el("div",{class:"moveslot"});
    const info = el("div",{style:"flex:1;min-width:0"});
    const name = el("input",{type:"text",placeholder:"Item",style:"width:100%",list:"itemlist"}); name.value=it.name;
    name.addEventListener("input",()=>{ it.name=name.value; save(); });
    info.append(name);
    const cat = itemByName.get((it.name||"").toLowerCase());
    if(cat) info.append(el("div",{class:"small muted",style:"margin-top:2px"},
      [cat.cat, cat.slot, cat.cost, cat.effect].filter(Boolean).join(" · ").slice(0,140)));
    const qty = el("input",{type:"number",min:0,style:"width:56px",title:"qty"}); qty.value=it.qty;
    qty.addEventListener("input",()=>{ it.qty=parseInt(qty.value)||0; save(); });
    const del = el("button",{class:"linkbtn",title:"remove",onclick:()=>{ t.inventory.splice(i,1); save(); renderTrainer(); }},"×");
    row.append(info, qty, del);
    card.append(row);
  });
  if(!$("#itemlist")){
    const dl = el("datalist",{id:"itemlist"});
    catalogItems().forEach(x=>dl.append(el("option",{value:x.name})));
    document.body.append(dl);
  }
  return card;
}
function openInventoryPicker(t){
  const list = catalogItems();
  const names = list.map(x=>x.name);
  openPicker("Add from catalog", names, name=>{
    const ex = t.inventory.find(it=>it.name.toLowerCase()===name.toLowerCase());
    if(ex){ ex.qty=(parseInt(ex.qty)||0)+1; } else { t.inventory.push({name, qty:1, notes:""}); }
    save(); renderTrainer();
  }, "held");
}

/* ===================================================================
   POKÉMON VIEW
=================================================================== */
let openMon = null;   // id of pokemon being edited, or null = party list
function renderPokemon(){
  const root = $("#view-pokemon"); root.innerHTML="";
  const c = activeChar();
  if (openMon){ const p = c.pokemon.find(x=>x.id===openMon); if(p){ renderMonEditor(root,p); return; } openMon=null; }

  const bar = el("div",{class:"inline",style:"margin-bottom:12px"});
  bar.append(el("button",{class:"btn-primary",onclick:()=>addPokemon()},"＋ Add Pokémon"));
  bar.append(el("button",{class:"btn-secondary",onclick:()=>importPokemon()},"⭱ Import Pokémon"));
  if(mode==="cloud") bar.append(el("button",{class:"btn-secondary",onclick:()=>switchTab("pc")},"🖥 PC"));
  root.append(bar);

  if(!c.pokemon.length){
    root.append(el("div",{class:"addcard", onclick:()=>addPokemon()}, "＋ Add your first Pokémon"));
    return;
  }
  const team = c.pokemon.filter(p=>p.onTeam);
  const box  = c.pokemon.filter(p=>!p.onTeam);
  // Team section (up to 6, shown at the top)
  root.append(el("div",{class:"section-head"}, `Team (${team.length}/6)`,
    el("span",{class:"muted small"}, "tap ☆ to move a Pokémon in/out")));
  const teamGrid = el("div",{class:"party"});
  team.forEach(p => teamGrid.append(monCard(p)));
  if(!team.length) teamGrid.append(el("div",{class:"muted small",style:"padding:8px"},"No Pokémon on the team yet."));
  root.append(teamGrid);
  // Box section (the rest)
  if(box.length){
    root.append(el("div",{class:"section-head",style:"margin-top:16px"}, `Box (${box.length})`));
    const boxGrid = el("div",{class:"party"});
    box.forEach(p => boxGrid.append(monCard(p)));
    root.append(boxGrid);
  }
}
function setTeam(p, on){
  const c = activeChar();
  if(on && c.pokemon.filter(x=>x.onTeam).length>=6){ toast("Team is full (6). Remove one first."); return; }
  p.onTeam = on; save(); renderPokemon();
}
function exportPokemon(p){
  const sp = getSpecies(p.species);
  const payload = { _ptu:"pokemon", version:1, pokemon: {...p} };
  const fn = (p.nickname || sp?.name || p.species || "pokemon").replace(/[^\w-]+/g,"_");
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
  const a = el("a",{href:URL.createObjectURL(blob), download:`${fn}.ptumon.json`});
  document.body.append(a); a.click(); a.remove();
  toast("Exported "+(p.nickname||sp?.name||"Pokémon")+" ✓");
}
function importPokemon(){
  const inp = el("input",{type:"file",accept:"application/json",hidden:true});
  document.body.append(inp);
  inp.addEventListener("change",()=>{
    const f = inp.files[0]; if(!f){ inp.remove(); return; }
    const r = new FileReader();
    r.onload = () => {
      try{
        const data = JSON.parse(r.result);
        const mon = data.pokemon || (data._ptu==="pokemon" ? data : data);
        if(!mon || (!mon.species && !mon.nickname)) throw 0;
        const clone = normPokemon({...newPokemon(mon.species), ...mon, id: uid()}); // fresh id, keep fields
        STATS.forEach(([k])=>{ if(!clone.stats?.[k]) { clone.stats = clone.stats||{}; clone.stats[k]={added:0}; } });
        activeChar().pokemon.push(clone); save(); openMon=clone.id; renderPokemon(); render();
        toast("Imported "+(clone.nickname||clone.species||"Pokémon")+" ✓");
      }catch(e){ toast("⚠ Not a valid Pokémon file"); }
      inp.remove();
    };
    r.readAsText(f);
  });
  inp.click();
}
function monCard(p){
  const sp = getSpecies(p.species);
  const d = pokeDerived(p);
  const cur = p.currentHP==null ? d.maxHP : p.currentHP;
  const pct = Math.max(0, Math.min(100, Math.round(cur/d.maxHP*100)));
  const hpColor = pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)";
  const card = el("div",{class:"pcard", onclick:()=>{ openMon=p.id; renderPokemon(); }});
  const body = el("div",{class:"pc-body"});
  body.append(monSprite(sp?.name || p.species, p.shiny, "s-sm", p.image));
  const main = el("div",{class:"pc-main"});
  main.append(el("div",{class:"pc-top"},
    el("div",{},
      el("div",{class:"pc-name"}, p.nickname || sp?.name || "?"),
      el("div",{class:"pc-species", html:(p.nickname && sp ? sp.name+" · " : "")+(sp?.types||[]).map(typeBadge).join(" ")})),
    el("div",{class:"pc-lvl"}, "Lv "+p.level)));
  main.append(el("div",{class:"small muted",style:"margin-top:6px"},
    `HP ${cur} / ${d.maxHP}${p.injuries?` · ${p.injuries} injuries`:""}`));
  main.append(el("div",{class:"hpbar"}, el("i",{style:`width:${pct}%;background:${hpColor}`})));
  body.append(main);
  card.append(body);
  card.append(el("button",{class:"pc-star"+(p.onTeam?" on":""), title:p.onTeam?"On team — tap to send to box":"In box — tap to add to team",
    onclick:e=>{e.stopPropagation(); setTeam(p, !p.onTeam);}}, p.onTeam?"★":"☆"));
  card.append(el("button",{class:"pc-del",title:"export this Pokémon",style:"right:40px",
    onclick:e=>{e.stopPropagation(); exportPokemon(p);}},"⭳"));
  card.append(el("button",{class:"pc-del",title:"remove",onclick:e=>{e.stopPropagation();
    if(confirm(`Remove ${p.nickname||sp?.name||"this Pokémon"}?`)){ const c=activeChar(); c.pokemon=c.pokemon.filter(x=>x.id!==p.id); save(); renderPokemon(); render(); }}},"🗑"));
  return card;
}
function addPokemon(){
  openPicker("Choose a species", D.species.map(s=>s.name), name=>{
    const p = newPokemon(name);
    const sp = getSpecies(name);
    if(sp && sp.abilities.basic[0]){ p.abilities = [sp.abilities.basic[0]]; }
    // limit active team to 6; extra Pokémon go to the box
    if(activeChar().pokemon.filter(x=>x.onTeam).length >= 6) p.onTeam = false;
    activeChar().pokemon.push(p); save(); openMon=p.id; renderPokemon(); render();
  }, "species");
}

let monTab = "play";
function renderMonEditor(root, p){
  const sp = getSpecies(p.species);

  /* top row */
  const head = el("div",{class:"inline",style:"margin-bottom:10px"});
  head.append(el("button",{class:"btn-secondary",onclick:()=>{openMon=null;renderPokemon();}},"← Party"));
  head.append(el("div",{class:"spacer"}));
  if(mode==="cloud" && cloud.isGM)
    head.append(el("button",{class:"btn-secondary",title:"GM: send a copy of this Pokémon to a player",onclick:()=>openSendThisPokemon(p)},"🎁 Send"));
  if(mode==="cloud" && canEditActive())
    head.append(el("button",{class:"btn-secondary",title:"Send this Pokémon to the shared PC",
      onclick:()=>depositToPC(cloud.byId[cloud.activeId], p)},"🖥 To PC"));
  head.append(el("button",{class:"linkbtn",onclick:()=>exportPokemon(p)},"⭳ Export"));
  if(sp) head.append(el("button",{class:"linkbtn",onclick:()=>openRefDetail("species",sp.name)},"Dex entry"));
  root.append(head);

  /* persistent hero: sprite + identity + HP (most-used info up top) */
  root.append(heroCard(p, sp));

  /* sub-tabs */
  root.append(subTabBar([["play","Play"],["build","Build"],["info","Info"]],
    monTab, k=>{ monTab=k; refreshMon(p); }));

  if(monTab==="play")  return renderMonPlay(root, p, sp);
  if(monTab==="build") return renderMonBuild(root, p, sp);
  return renderMonInfo(root, p, sp);
}

function heroCard(p, sp){
  const d = pokeDerived(p);
  if(p.currentHP==null) p.currentHP = d.maxHP;
  else if(p.currentHP > d.maxHP) p.currentHP = d.maxHP;   // Injuries lowered the max — clamp down
  const card = el("div",{class:"card"});
  const hero = el("div",{class:"monhero"});
  const spriteBox = el("div",{class:"sprite-box"});
  spriteBox.append(monSprite(sp?.name || p.species, p.shiny, "s-lg", p.image));
  spriteBox.append(el("button",{class:"photo-btn",title:"upload a photo",
    onclick:()=>pickImage(240, d=>{ p.image=d; save(); refreshMon(p); })},"📷"));
  if(p.image) spriteBox.append(el("button",{class:"photo-rm",title:"remove photo — use the default sprite",
    onclick:()=>{ p.image=""; save(); refreshMon(p); }},"×"));
  hero.append(spriteBox);
  const main = el("div",{class:"mh-main"});
  main.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("div",{class:"mh-name",id:"heroName"}, p.nickname || sp?.name || "Unknown"),
    el("div",{class:"pc-lvl"}, "Lv "+p.level)));
  main.append(el("div",{class:"mh-sub", html:(p.nickname && sp?`${sp.name} · `:"")+(sp?.types||[]).map(typeBadge).join(" ")+(p.shiny?" ✨":"")}));
  /* compact HP control */
  const hp = el("div",{class:"hpctl hero-hp"});
  const cur = el("input",{type:"number",id:"hpCur"}); cur.value = p.currentHP;
  const setHP = v => { const max = pokeDerived(p).maxHP; p.currentHP = Math.max(-99, Math.min(max, v));
    cur.value=p.currentHP; save(); const ro=$("#hpReadout"); if(ro) ro.textContent = `/ ${max}`;
    const bar=$("#heroHpBar"); if(bar){ const pct=Math.max(0,Math.min(100,Math.round(p.currentHP/max*100)));
      bar.style.width=pct+"%"; bar.style.background=pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"; } };
  hp.append(el("button",{onclick:()=>setHP(p.currentHP-5)},"−5"),
            el("button",{onclick:()=>setHP(p.currentHP-1)},"−"), cur,
            el("span",{id:"hpReadout",class:"muted",style:"font-weight:800"},`/ ${d.maxHP}`),
            el("button",{onclick:()=>setHP(p.currentHP+1)},"+"),
            el("button",{onclick:()=>setHP(p.currentHP+5)},"+5"),
            el("button",{onclick:()=>setHP(pokeDerived(p).maxHP),title:"full heal"},"MAX"));
  main.append(hp);
  const pct = Math.max(0,Math.min(100,Math.round(p.currentHP/d.maxHP*100)));
  main.append(el("div",{class:"hpbar",style:"margin-top:6px"},
    el("i",{id:"heroHpBar",style:`width:${pct}%;background:${pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"}`})));
  if(d.injuries>0) main.append(el("div",{class:"small",style:"margin-top:4px;color:var(--bad);font-weight:700"},
    `${d.injuries} ${d.injuries===1?"injury":"injuries"} — max HP ${d.maxHP} (−${d.fullMaxHP-d.maxHP} of ${d.fullMaxHP})`));
  if(p.statuses?.length){
    const sc = el("div",{class:"chips",style:"margin-top:6px"});
    p.statuses.forEach(k=>{ const s=statusByKey.get(k); if(s) sc.append(el("span",{class:"statuschip on",style:"cursor:default;padding:2px 8px;font-size:11px"}, s.name)); });
    main.append(sc);
  }
  hero.append(main);
  card.append(hero);
  /* damage / heal: one signed input — type 8 to heal, −10 to take damage */
  card.append(damageHealRow(()=>p.currentHP, setHP));
  return card;
}

/* toggle-chips for status conditions + a Catch DC (GM) button */
function statusCard(p){
  if(!Array.isArray(p.statuses)) p.statuses=[];
  const gm = isGM();
  const card = el("div",{class:"card"}, el("h3",{},"Status Conditions",
    el("div",{class:"inline"},
      p.statuses.length?el("button",{class:"linkbtn",onclick:()=>{ p.statuses=[]; save(); refreshMon(p); }},"clear"):"",
      gm?el("button",{class:"linkbtn h-act",onclick:()=>catchDCModal(p)},"🎯 Catch DC"):"")));
  const sp = getSpecies(p.species);
  const groups = gm
    ? [["persistent","Persistent · +10 catch each"],["volatile","Volatile · +5 each"],["other","Other"]]
    : [["persistent","Persistent"],["volatile","Volatile"],["other","Other"]];
  groups.forEach(([kind,label])=>{
    card.append(el("div",{class:"small muted",style:"margin:8px 0 4px;font-weight:700"}, label));
    const chips = el("div",{class:"chips"});
    STATUS_DEFS.filter(s=>s.kind===kind).forEach(s=>{
      const on = hasStatus(p,s.key);
      const immune = s.immune && sp?.types?.some(t=>s.immune.includes(t));
      const chip = el("button",{class:"statuschip"+(on?" on":""), title: (immune?`${sp.name} is immune. `:"")+s.effect,
        onclick:()=>{ toggleStatus(p,s.key); refreshMon(p); }}, s.name + (immune?" ⃠":""));
      chips.append(chip);
    });
    card.append(chips);
  });
  const active = STATUS_DEFS.filter(s=>hasStatus(p,s.key));
  if(active.length){
    card.append(el("div",{class:"small muted",style:"margin-top:12px;font-weight:700"}, `Active effects (${active.length})`));
    active.forEach(s=>{ const d=el("details",{class:"spoiler"});
      d.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, s.name),
        el("span",{class:"muted small",style:"margin-left:8px"}, s.kind)));
      d.append(el("div",{class:"small",style:"margin-top:6px"}, s.effect));
      card.append(d); });
  }
  return card;
}
/* Capture-Rate calculator popup (GM tool) */
function catchDCModal(p){
  const wrap = el("div",{});
  let legendary = false;
  const out = el("div",{});
  const redraw = () => {
    out.innerHTML="";
    const r = captureRate(p, {legendary});
    if(!r.capturable){ out.append(el("div",{class:"warnbox"},"At 0 HP or lower — can't be captured (Poké Balls won't energize it).")); return; }
    out.append(el("div",{style:"font-size:13px;font-weight:800;letter-spacing:.5px;color:var(--muted)"},"CAPTURE RATE"));
    out.append(el("div",{style:"font-size:44px;font-weight:800;color:var(--accent);line-height:1;margin:2px 0 8px"}, String(r.rate)));
    out.append(el("div",{class:"small muted",style:"margin-bottom:12px"},
      `The catcher throws a Poké Ball (AC 6), then rolls 1d100 and subtracts their Trainer Level (and any Ball / Feature bonuses). If the result is ≤ ${r.rate}, it's caught. A natural 100 always catches; rolling a Nat 20 to hit with the ball subtracts 10 from the capture roll.`));
    const tbl = el("div",{style:"display:flex;flex-direction:column;gap:3px"});
    r.breakdown.forEach(([lbl,val])=> tbl.append(el("div",{class:"inline",style:"justify-content:space-between;border-bottom:1px solid var(--line);padding:3px 0"},
      el("span",{class:"small"}, lbl),
      el("span",{class:"small",style:`font-weight:800;color:${val<0?"var(--bad)":val>0?"var(--good)":"var(--muted)"}`}, (val>0?"+":"")+val))));
    out.append(tbl);
  };
  const legLabel = el("label",{class:"inline",style:"gap:8px;cursor:pointer;margin-bottom:12px;font-weight:700"});
  const cb = el("input",{type:"checkbox"}); cb.addEventListener("change",()=>{ legendary=cb.checked; redraw(); });
  legLabel.append(cb, el("span",{},"Legendary Pokémon (−30)"));
  wrap.append(legLabel, out); redraw();
  modal({title:`🎯 Catch DC — ${p.nickname||getSpecies(p.species)?.name||"Pokémon"}`, bodyNode:wrap,
    footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]});
}
/* − value + stepper for a Combat Stage (−6…+6, both directions) */
function csStepper(cur, onSet){
  const wrap = el("div",{class:"stepper"});
  wrap.append(
    el("button",{title:"lower",disabled:cur<=-6,onclick:()=>onSet(cur-1)},"−"),
    el("span",{class:"stepper-val"}, (cur>0?"+":"")+cur),
    el("button",{title:"raise",disabled:cur>=6,onclick:()=>onSet(cur+1)},"+"));
  return wrap;
}
/* Combat Stages card — manual steppers per stat; conditions apply automatically on top */
function combatStagesCard(p){
  if(!p.cs) p.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0};
  const d = pokeDerived(p), cond = conditionCSMods(p);
  const anyManual = CS_STATS.some(([k])=>p.cs[k]);
  const card = el("div",{class:"card"}, el("h3",{},"Combat Stages",
    el("div",{class:"inline"},
      el("span",{class:"muted small"},"tap ± ; conditions auto-apply"),
      anyManual?el("button",{class:"linkbtn",onclick:()=>{ CS_STATS.forEach(([k])=>p.cs[k]=0); save(); refreshMon(p); }},"reset"):"")));
  const grid = el("div",{class:"statgrid"});
  CS_STATS.forEach(([k,lbl])=>{
    const manual = p.cs[k]||0, cm = cond[k]||0, effCS = d.cs[k];
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"big",style: effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}, d.eff[k]));
    box.append(csStepper(manual, v=>{ p.cs[k]=Math.max(-6,Math.min(6,v)); save(); refreshMon(p); }));
    box.append(el("div",{class:"sub"}, `${effCS>0?"+":""}${effCS} CS` + (cm?` (${manual>=0?"+":""}${manual}${cm>=0?"+":""}${cm})`:"")));
    grid.append(box);
  });
  card.append(grid);
  const src = STATUS_DEFS.filter(s=>hasStatus(p,s.key) && CONDITION_CS[s.key]);
  if(src.length) card.append(el("div",{class:"small muted",style:"margin-top:8px"},
    "From conditions: " + src.map(s=>`${s.name} (${Object.entries(CONDITION_CS[s.key]).map(([st,v])=>`${v} ${st}`).join(", ")})`).join(" · ")));
  card.append(el("div",{class:"small muted",style:"margin-top:4px"},
    "Combat Stages clear on switch-out / end of encounter. Speed CS also shifts Movement by ½ (rounded down)."));
  return card;
}
function renderMonPlay(root, p, sp){
  /* quick stat readout — first on the page (shows Combat-Stage-adjusted values) */
  const d = pokeDerived(p);
  const qc = el("div",{class:"card"}, el("h3",{},"Stats at a glance",
    el("span",{class:"muted small"}, Object.values(d.cs).some(v=>v)?"Combat Stages applied":"")));
  const g = el("div",{class:"statgrid"});
  STATS.forEach(([k,l])=>{
    const csv = d.cs[k]||0, changed = k!=="hp" && d.eff[k]!==d.total[k];
    g.append(el("div",{class:"stat"},
      el("div",{class:"lbl"},l),
      el("div",{class:"big",style:changed?(d.eff[k]>d.total[k]?"color:var(--good)":"color:var(--bad)"):""}, d.eff[k]),
      csv?el("div",{class:"sub"}, `${csv>0?"+":""}${csv} CS · was ${d.total[k]}`):""));
  });
  qc.append(g);
  const dv = el("div",{class:"derived",style:"margin-top:10px"});
  [["Max HP",d.maxHP],["Phys. Eva","+"+d.physEva],["Spec. Eva","+"+d.specEva],["Speed Eva","+"+d.spdEva]]
    .forEach(([l,v])=>dv.append(el("div",{class:"dv"}, el("div",{class:"lbl"},l), el("div",{class:"val"},String(v)))));
  qc.append(dv);
  root.append(qc);

  /* status conditions + Catch DC */
  root.append(statusCard(p));

  /* combat stages */
  root.append(combatStagesCard(p));

  /* abilities (a Pokémon can have several) */
  root.append(abilitiesCard(p, sp));

  /* moves */
  root.append(movesCard(p, sp));

  /* type matchups */
  if(sp && sp.types?.length) root.append(matchupCard(sp.types));
}

function renderMonBuild(root, p, sp){
  const nat = natureByName.get((p.nature||"").toLowerCase());
  const idc = el("div",{class:"card"}, el("h3",{},"Identity"));
  const r1 = el("div",{class:"fieldrow"});
  const spWrap = el("label",{class:"field"}, el("span",{},"Species"),
    el("button",{class:"btn-secondary",style:"text-align:left",onclick:()=>openPicker("Change species",D.species.map(s=>s.name),v=>changeSpecies(p,v),"species")}, sp?sp.name:"choose…"));
  r1.append(
    field("Nickname","",{value:p.nickname,onchange:v=>{p.nickname=v;save();
      const hn=$("#heroName"); if(hn) hn.textContent = v || sp?.name || "Unknown"; }}),
    spWrap,
    field("Level","",{type:"number",min:1,max:MAX_LEVEL,value:p.level,onchange:v=>setMonLevel(p, parseInt(v)||1)}),
    field("Nature","",{opts:D.natures.map(n=>n.name), value:p.nature, onchange:v=>{p.nature=v;save();refreshMon(p);}}),
  );
  idc.append(r1);
  idc.append(xpRow(p));
  if(nat) idc.append(el("div",{class:"small muted",style:"margin:6px 0"},
    `Nature ${nat.name}: ${natSummary(nat)} · likes ${nat.likedFlavor}, dislikes ${nat.dislikedFlavor}`));
  const r2 = el("div",{class:"fieldrow"});
  r2.append(
    field("Gender","",{opts:["","Male","Female","Genderless"],value:p.gender,onchange:v=>{p.gender=v;save();}}),
    field("Shiny","",{type:"checkbox",value:p.shiny,onchange:v=>{p.shiny=v;save();refreshMon(p);}}),
    field("Total XP","",{type:"number",min:0,value:p.xp,onchange:v=>setMonXP(p, parseInt(v)||0)}),
    field("Loyalty","",{type:"number",min:0,value:p.loyalty,onchange:v=>{p.loyalty=parseInt(v)||0;save();}}),
    heldItemControl(p),
  );
  idc.append(r2);
  const heldEff = itemByName.get((p.heldItem||"").toLowerCase());
  if(heldEff) idc.append(el("div",{class:"small muted",style:"margin:6px 0"}, el("b",{},heldEff.name+": "), heldEff.effect||""));
  root.append(idc);

  /* stat allocation */
  const d = pokeDerived(p);
  const sc = el("div",{class:"card"});
  sc.append(el("h3",{},"Stat Allocation", ptBudgetText(d)));
  sc.append(monStatGrid(p));
  sc.append(el("div",{class:"derived",id:"monDerived",style:"margin-top:12px"}));
  fillMonDerived(p);
  root.append(sc);

  /* injuries / temp / tutor */
  const ec = el("div",{class:"card"}, el("h3",{},"Condition"));
  const r3 = el("div",{class:"fieldrow"});
  r3.append(
    field("Injuries","",{type:"number",min:0,value:p.injuries,onchange:v=>{ p.injuries=Math.max(0,parseInt(v)||0);
      const m=pokeDerived(p).maxHP; if(p.currentHP!=null && p.currentHP>m) p.currentHP=m; save(); refreshMon(p); }}),
    field("Temp HP","",{type:"number",min:0,value:p.tempHP,onchange:v=>{p.tempHP=parseInt(v)||0;save();}}),
    field("Tutor Points","",{type:"number",min:0,value:p.tutorPoints,onchange:v=>{p.tutorPoints=parseInt(v)||0;save();}}),
  );
  ec.append(r3);
  root.append(ec);

  /* evolution — GM-only ("hidden") stages are concealed from players */
  if(sp && sp.evolution?.length>1){
    const gm = isGM();
    const t = activeChar().trainer;
    const chain = sp.evolution.filter(e=> gm || !e.gm);              // hide GM-only stages from players
    const nexts = nextEvolutions(p).filter(n=> gm || !n.gm);
    if(chain.length>1 || nexts.length){
      const evc = el("div",{class:"card"}, el("h3",{},"Evolution"));
      evc.append(el("div",{class:"r-body",html: chain.map(e=>`${e.stage}. ${esc(e.name)}${e.min?` (Lv ${e.min})`:""}${e.gm?" 🔒":""}`).join("  →  ")}));
      if(nexts.length){
        nexts.forEach(n => {
          const stone = evoStoneName(n.method);
          const stoneItem = stone ? findInventoryStone(t, stone) : null;
          let ready, reqTxt, hint="";
          if(stone){                                                  // stone evolution — needs it in the bag
            ready = !!stoneItem; reqTxt = `with a ${stone}`;
            hint = stoneItem ? ` — have ${stoneItem.name} ×${stoneItem.qty||1}` : ` — need a ${stone} in your inventory`;
          } else if(n.min!=null){                                     // level evolution
            ready = p.level >= n.min; reqTxt = `at Lv ${n.min}`;
            if(!ready) hint = ` — reach Lv ${n.min}`;
          } else { ready = true; reqTxt = n.method ? `via ${n.method}` : "special"; }
          const rowE = el("div",{class:"inline",style:"justify-content:space-between;gap:8px;margin-top:8px;flex-wrap:wrap"});
          rowE.append(el("span",{class:"small"}, `→ Evolves into `, el("b",{}, n.target), ` ${reqTxt}`,
            n.gm?el("span",{class:"muted",title:"GM-only hidden evolution"}," 🔒 GM"):"",
            hint?el("span",{class:"muted"}, hint):""));
          const btn = el("button",{class:ready?"btn-primary":"btn-secondary",style:"padding:6px 12px",
            disabled: !ready,
            onclick: ready ? ()=>evolveTo(p, n.target, stoneItem) : null},
            ready ? `✨ Evolve into ${n.target}` : (stone ? `Need ${stone}` : `Lv ${n.min} to evolve`));
          rowE.append(btn);
          evc.append(rowE);
        });
      } else {
        evc.append(el("div",{class:"small muted",style:"margin-top:6px"},"Final stage — no further evolutions."));
      }
      root.append(evc);
    }
  }
}

function renderMonInfo(root, p, sp){
  if(sp) root.append(capsSkillsCard(sp));
  const nc = el("div",{class:"card"}, el("h3",{},"Notes"));
  nc.append(field("Notes","",{type:"textarea",value:p.notes,onchange:v=>{p.notes=v;save();}}));
  root.append(nc);
}
function natSummary(n){
  const up = Object.entries(n.statMods).filter(([,v])=>v>0).map(([k,v])=>`+${v} ${statLbl(k)}`);
  const dn = Object.entries(n.statMods).filter(([,v])=>v<0).map(([k,v])=>`${v} ${statLbl(k)}`);
  return [...up,...dn].join(", ") || "neutral";
}
const statLbl = k => (STATS.find(s=>s[0]===k)||[,k])[1];

function changeSpecies(p, name){
  const sp = getSpecies(name); if(!sp) return;
  p.species = sp.name;
  if(!p.abilities || !p.abilities.length){ p.abilities = sp.abilities.basic[0] ? [sp.abilities.basic[0]] : []; }
  save(); refreshMon(p);
}
function allAbilityNames(sp){ return [...sp.abilities.basic,...sp.abilities.advanced,...sp.abilities.high]; }
/* Held Item picker — choose from the item database (held items + berries), or clear it */
function heldItemControl(p){
  const wrap = el("label",{class:"field"}, el("span",{},"Held Item"));
  const btn = el("button",{class:"btn-secondary",style:"text-align:left",onclick:()=>{
    const names = ["(none)", ...D.items.held.map(i=>i.name), ...D.items.food.map(i=>i.name)];
    openPicker("Held Item", names, v=>{ p.heldItem = v==="(none)" ? "" : v; save(); refreshMon(p); }, "held");
  }}, p.heldItem || "choose…");
  wrap.append(btn);
  return wrap;
}
function pickHeldSub(name){ const it = itemByName.get((name||"").toLowerCase());
  return it && it.effect ? el("div",{class:"pi-sub"}, String(it.effect).slice(0,90)) : ""; }
/* abilities a Pokémon may actually obtain at a given level (PTU 1.05 Core p.199):
   born with Basic; Advanced unlock at Lv 20; High at Lv 40. */
function abilitiesAtLevel(sp, level){
  const out = [...sp.abilities.basic];
  if(level>=20) out.push(...sp.abilities.advanced);
  if(level>=40) out.push(...sp.abilities.high);
  return out;
}

/* abilities card — a Pokémon can hold several; each expandable with its effect */
function abilitiesCard(p, sp){
  if(!Array.isArray(p.abilities)) p.abilities = [];
  const card = el("div",{class:"card"}, el("h3",{},`Abilities (${p.abilities.length})`,
    el("div",{class:"inline"}, unlockToggle(p),
      el("button",{class:"linkbtn h-act",onclick:()=>addAbility(p, sp)},"+ add"))));
  if(!p.abilities.length) card.append(el("span",{class:"muted small"},"none yet — tap “+ add”"));
  p.abilities.forEach((an,i)=>{
    const ab = abilityByName.get((an||"").toLowerCase());
    const row = el("details",{class:"spoiler"});
    const uc = ab && usesControl(p, "ability", an, ab.frequency, ()=>refreshMon(p));
    row.append(el("summary",{},
      el("span",{style:"color:var(--ink)"}, an || "—"),
      uc ? el("span",{style:"margin-left:8px"}, uc) : "",
      el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove",
        onclick:e=>{e.preventDefault(); p.abilities.splice(i,1); save(); refreshMon(p);}},"×")));
    row.append(el("div",{class:"small",style:"margin-top:6px", html: ab? abilityText(ab):"<span class='muted'>Not in database</span>"}));
    card.append(row);
  });
  return card;
}
function addAbility(p, sp){
  const speciesAbil = sp ? allAbilityNames(sp) : [];       // every species ability (any tier)
  const speciesSet = new Set(speciesAbil.map(x=>x.toLowerCase()));
  let names, title;
  if(p.unlocked){
    names = [...new Set([...speciesAbil, ...D.abilities.map(a=>a.name)])];
    title = "Add ability (🔓 any)"+(sp?` — ${sp.name}'s options on top`:"");
  } else {
    if(!sp){ toast("Unknown species — tick 🔓 to add any ability"); return; }
    names = abilitiesAtLevel(sp, p.level);                 // only tiers obtainable at this level
    title = `Add ability — ${sp.name} (Lv ${p.level})`;
  }
  names = names.filter(n=>!p.abilities.includes(n));
  if(!names.length){
    // distinguish "none left" from "higher tiers are still locked by level"
    const lockedHigher = !p.unlocked && sp && allAbilityNames(sp).some(n=>!p.abilities.includes(n));
    toast(lockedHigher ? "No more at this level — Advanced unlock at Lv 20, High at Lv 40 (or tick 🔓)"
                       : p.unlocked ? "No more abilities to add" : "No more of this species' abilities to add");
    return;
  }
  openPicker(title, names, name=>{
    if(!p.abilities.includes(name)){ p.abilities.push(name); save(); refreshMon(p); }
  }, "ability", n=>speciesSet.has(n.toLowerCase()));
}
function refreshMon(p){ const root=$("#view-pokemon"); root.innerHTML=""; renderMonEditor(root,p);
  $("#partyCount").textContent=activeChar().pokemon.length||""; }
/* set total XP → auto-level to the matching threshold (announces level-ups) */
function setMonXP(p, xp){
  p.xp = Math.max(0, Math.floor(xp)||0);
  const nl = levelForXP(p.xp), was = p.level;
  p.level = nl; save(); refreshMon(p);
  if(nl > was) toast(`${p.nickname||getSpecies(p.species)?.name||"Pokémon"} leveled up to ${nl}! 🎉`);
}
/* set level directly → snap XP to that level's threshold so future XP still works */
function setMonLevel(p, lvl){
  p.level = Math.max(1, Math.min(MAX_LEVEL, Math.floor(lvl)||1));
  p.xp = xpForLevel(p.level); save(); refreshMon(p);
}
/* XP progress + quick "+ Add XP" (adding XP auto-levels the Pokémon) */
function xpRow(p){
  const wrap = el("div",{style:"margin:8px 0"});
  const atMax = p.level >= MAX_LEVEL;
  const curMin = xpForLevel(p.level), nextMin = atMax ? curMin : xpForLevel(p.level+1);
  const toNext = xpToNext(p.xp);
  const span = nextMin - curMin, into = p.xp - curMin;
  const pct = atMax ? 100 : Math.max(0, Math.min(100, Math.round(into/Math.max(1,span)*100)));
  const addBox = el("input",{type:"number",placeholder:"+ XP",style:"width:84px"});
  const addXP = () => { const n=parseInt(addBox.value)||0; addBox.value=""; if(n) setMonXP(p, p.xp + n); };
  addBox.addEventListener("keydown",e=>{ if(e.key==="Enter") addXP(); });
  wrap.append(el("div",{class:"inline small",style:"gap:8px;flex-wrap:wrap;align-items:center"},
    el("span",{class:"muted",style:"font-weight:700"},
      atMax ? `Lv 100 (max) · ${p.xp} XP` : `Lv ${p.level} · ${toNext} XP to Lv ${p.level+1} (at ${nextMin})`),
    el("div",{class:"spacer"}),
    addBox,
    el("button",{class:"btn-secondary",style:"padding:5px 12px",onclick:addXP},"+ Add XP")));
  wrap.append(el("div",{class:"hpbar",style:"margin-top:6px"},
    el("i",{style:`width:${pct}%;background:var(--accent)`})));
  return wrap;
}

function monStatGrid(p){
  const d = pokeDerived(p);
  const canInc = p.unlocked || d.remaining > 0;
  const g = el("div",{class:"statgrid"});
  STATS.forEach(([k,lbl]) => {
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"sub","data-pbase":k}, `base ${d.base[k]}`));
    box.append(statStepper(p.stats[k].added, canInc, v=>{ p.stats[k].added = v; save(); refreshMon(p); }));
    box.append(el("div",{class:"big","data-ptot":k}, d.total[k]));
    g.append(box);
  });
  return g;
}
function ptBudgetText(d){
  const over = d.remaining < 0;
  return el("span",{id:"ptBudget", class: over?"warnbox":"muted"},
    `${d.spent}/${d.budget} points used${over?` (${-d.remaining} over!)`:d.remaining>0?` · ${d.remaining} left`:""}`);
}
/* − value + stepper for a stat's "added" points; + is disabled when no budget left (unless GM-unlocked) */
function statStepper(cur, canInc, onSet){
  const wrap = el("div",{class:"stepper"});
  wrap.append(
    el("button",{title:"remove a point",disabled:cur<=0,onclick:()=>onSet(cur-1)},"−"),
    el("span",{class:"stepper-val"}, String(cur)),
    el("button",{title:canInc?"add a point":"no points left (tick 🔓 to override)",disabled:!canInc,onclick:()=>onSet(cur+1)},"+"));
  return wrap;
}
/* Trainer distributable Stat Points (Core p.20 progression): baseline = Level + 9. */
/* bonus Stat Points a Trainer's Features/Classes grant via [+Stat] tags (Core: each tag = +1 point,
   spent on that Stat — [+Any] / [+Attack or Special Attack] are player's choice). */
function trainerStatTagBonus(t){
  let n = 0;
  trainerFeatureObjs(t).forEach(f => {
    n += ((f && f.tags || "").match(/\[\+[^\]]*\]/g) || []).length;
  });
  return n;
}
function trainerStatBudget(t){
  const bonus = trainerStatTagBonus(t);           // Features with [+Stat] tags add to the pool
  const budget = (t.level||1) + 9 + bonus;
  const spent = STATS.reduce((s,[k]) => s + (t.combat[k].added||0), 0);
  return { budget, spent, remaining: budget - spent, bonus };
}
function trainerBudgetText(tb){
  const over = tb.remaining < 0;
  const bonusNote = tb.bonus ? ` (${(tb.budget - tb.bonus)}+${tb.bonus} feature tags)` : "";
  return el("span",{class: over?"warnbox":"muted", style:"font-size:12px"},
    `${tb.spent}/${tb.budget} pts${bonusNote}${over?` (${-tb.remaining} over!)`:tb.remaining>0?` · ${tb.remaining} left`:""}`);
}
function fillMonDerived(p){
  const d = pokeDerived(p);
  const g = $("#monDerived"); if(!g) return; g.innerHTML="";
  [["Max HP",d.maxHP],["Phys. Eva","+"+d.physEva],["Spec. Eva","+"+d.specEva],["Speed Eva","+"+d.spdEva]]
    .forEach(([l,v])=>g.append(el("div",{class:"dv"}, el("div",{class:"lbl"},l), el("div",{class:"val"},String(v)))));
}
/* keep every live-computed display in sync after a stat/level/nature change */
function updateMonComputed(p){
  const d = pokeDerived(p);
  STATS.forEach(([k]) => {
    const tot = $(`[data-ptot="${k}"]`); if(tot) tot.textContent = d.total[k];
    const base = $(`[data-pbase="${k}"]`); if(base) base.textContent = `base ${d.base[k]}`;
  });
  const bud = $("#ptBudget"); if(bud) bud.replaceWith(ptBudgetText(d));
  fillMonDerived(p);
  // HP tracker: clamp current HP to new max and refresh readout + hero bar
  if(p.currentHP==null || p.currentHP>d.maxHP) p.currentHP = d.maxHP;
  const ro = $("#hpReadout"); if(ro) ro.textContent = `/ ${d.maxHP}`;
  const cur = $("#hpCur"); if(cur) cur.value = p.currentHP;
  const bar = $("#heroHpBar"); if(bar){ const pct=Math.max(0,Math.min(100,Math.round(p.currentHP/d.maxHP*100)));
    bar.style.width=pct+"%"; bar.style.background=pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"; }
}
function matchupCard(types){
  types = (types||[]).filter(t=>t && t!=="None");   // drop the empty second slot
  const eff = typeEffectiveness(types);
  const card = el("div",{class:"card"}, el("h3",{},"Type Matchups",
    el("span",{class:"muted small"}, types.join(" / "))));
  const groups = [
    ["Weak to (x2+)", v=>v>1, "x2"],
    ["Resists (x½-)", v=>v<1&&v>0, "x50"],
    ["Immune (x0)", v=>v===0, "x0"],
  ];
  groups.forEach(([label,test,cls])=>{
    const ents = Object.entries(eff).filter(([,v])=>test(v));
    if(!ents.length) return;
    const line = el("div",{class:"eff-line",style:"margin-bottom:6px"});
    line.append(el("span",{class:"small muted",style:"width:110px;display:inline-block"},label));
    ents.sort((a,b)=>b[1]-a[1]).forEach(([t,v])=>{
      const c = v===0?"x0":v>=4?"x4":v>1?"x2":v<=.25?"x25":"x50";
      line.append(el("span",{class:`type type-${t}`,title:`x${v}`}, `${t} ×${v}`));
    });
    card.append(line);
  });
  return card;
}
function capsSkillsCard(sp){
  const card = el("div",{class:"card"}, el("h3",{},"Capabilities & Skills"));
  const cap = sp.capabilities;
  const caps = [];
  if(cap.overland) caps.push(`Overland ${cap.overland}`);
  if(cap.sky) caps.push(`Sky ${cap.sky}`);
  if(cap.swim) caps.push(`Swim ${cap.swim}`);
  if(cap.levitate) caps.push(`Levitate ${cap.levitate}`);
  if(cap.burrow) caps.push(`Burrow ${cap.burrow}`);
  caps.push(`Jump ${cap.highJump}/${cap.longJump}`, `Power ${cap.power}`);
  if(cap.naturewalk?.length) caps.push(`Naturewalk (${cap.naturewalk.join(", ")})`);
  (cap.other||[]).forEach(o=>caps.push(o));
  const chips = el("div",{class:"chips"});
  caps.forEach(c=>chips.append(el("span",{class:"chip"},c)));
  card.append(chips);
  if(sp.skills && Object.keys(sp.skills).length){
    const sk = el("div",{class:"chips",style:"margin-top:8px"});
    SKILLS.forEach(([k,lbl])=>{ const s=sp.skills[k]; if(s) sk.append(el("span",{class:"kv"}, `${lbl} ${s.dice}d6${s.mod&&s.mod!=="+0"?s.mod:""}`)); });
    card.append(sk);
  }
  return card;
}
const MOVE_LIMIT = 6;
/* the species plus its pre-evolutions (evolved Pokémon inherit earlier stages' moves) */
function speciesLineBackTo(sp){
  const line = [sp];
  if(sp.evolution?.length){
    const mine = sp.evolution.find(e=>e.name.toLowerCase()===sp.name.toLowerCase())?.stage;
    if(mine){
      sp.evolution.forEach(e=>{ if(e.stage < mine){ const s=getSpecies(e.name); if(s) line.push(s); } });
    }
  }
  return line;
}
/* moves learned from levelling up to the Pokémon's current level (default legal list), incl. pre-evos */
function speciesLevelupNames(sp, level){
  if(!sp) return [];
  const set = new Set();
  speciesLineBackTo(sp).forEach(s => s.moves.levelup.forEach(m=>{ if(m.level<=level) set.add(m.name); }));
  return [...set];
}
/* full learnset (level-up any level + egg + tutor + TM/HM, incl. pre-evos) — prioritised under GM unlock */
function speciesFullLearnset(sp){
  if(!sp) return [];
  const set = new Set();
  speciesLineBackTo(sp).forEach(s => {
    s.moves.levelup.forEach(m=>set.add(m.name));
    s.moves.egg.forEach(m=>set.add(m));
    s.moves.tutor.forEach(m=>set.add(m.replace(/\s*\(N\)\s*$/i,"").trim()));
    s.moves.tmhm.forEach(m=>set.add(m.replace(/^[A-Z]*\d+\s+/,"").trim()));
  });
  return [...set].filter(Boolean);
}
/* Struggle (auto-upgrades to Struggle+ for Combat Expert+ species) */
function struggleMove(p){
  const sp = getSpecies(p.species);
  const combatDice = sp?.skills?.combat?.dice || 0;
  return moveByName.get(combatDice >= 5 ? "struggle+" : "struggle") || moveByName.get("struggle");
}
/* ---------- ability / capability type effects ---------- */
function hasAbility(p, name){ return (p.abilities||[]).some(a => String(a).toLowerCase() === name.toLowerCase()); }
function monCaps(sp){ return (sp?.capabilities?.other || []).map(o => String(o).split("(")[0].trim()); }
/* which types this Pokémon's Struggle may be: Normal + any granted by capabilities (all 18 if 🔓) */
function struggleTypeOptions(p, sp){
  if(p?.unlocked) return TYPES.slice();
  const set = new Set(["Normal"]);
  monCaps(sp).forEach(c => { if(STRUGGLE_TYPE_CAPS[c]) set.add(STRUGGLE_TYPE_CAPS[c]); });
  return [...set];
}
/* a capability lets the elemental Struggle also be Special (Sp.Atk) at the user's option */
function struggleCanBeSpecial(p, sp){
  return !!(p?.unlocked) || monCaps(sp).some(c => STRUGGLE_TYPE_CAPS[c]);
}
/* effective type of a move after ability overrides (e.g. Normalize → Normal) */
function effectiveMoveType(p, m){
  if(hasAbility(p, "Normalize")) return "Normal";
  return (m && m.type) || "Normal";
}
/* Struggle as it should actually resolve: base move + chosen type/class (Normalize forces Normal) */
function struggleFor(p, sp){
  const base = struggleMove(p); if(!base) return null;
  sp = sp || getSpecies(p.species);
  const m = Object.assign({}, base);
  let t = p.struggleType || "Normal";
  if(!struggleTypeOptions(p, sp).includes(t)) t = "Normal";
  if(hasAbility(p, "Normalize")) t = "Normal";
  m.type = t;
  if(t !== "Normal" && p.struggleSpecial && struggleCanBeSpecial(p, sp)) m.class = "Special";
  return m;
}
/* the Struggle type / Physical-Special picker (shown when the Pokémon has options) */
function struggleControl(p, sp, rerender){
  rerender = rerender || (()=>refreshMon(p));
  const opts = struggleTypeOptions(p, sp);
  const canSpec = struggleCanBeSpecial(p, sp);
  if(opts.length <= 1 && !canSpec) return el("span",{style:"display:none"});
  const wrap = el("div",{class:"inline small",style:"margin:2px 0 8px;flex-wrap:wrap;gap:8px;align-items:center"});
  wrap.append(el("span",{class:"muted",style:"font-weight:700"},"Struggle:"));
  const sel = el("select",{style:"padding:4px 6px"});
  opts.forEach(t => sel.append(el("option",{value:t,selected:(p.struggleType||"Normal")===t}, t)));
  sel.addEventListener("change",()=>{ p.struggleType = sel.value==="Normal"?null:sel.value; save(); rerender(); });
  wrap.append(sel);
  if(canSpec){
    const lbl = el("label",{class:"muted",title:"Use Sp.Atk / deal Special damage",style:"display:inline-flex;gap:4px;align-items:center;cursor:pointer"});
    const cb = el("input",{type:"checkbox"}); cb.checked = !!p.struggleSpecial;
    cb.addEventListener("change",()=>{ p.struggleSpecial = cb.checked; save(); rerender(); });
    lbl.append(cb, "Special"); wrap.append(lbl);
  }
  return wrap;
}
function unlockToggle(p){
  const wrap = el("label",{class:"small",title:"GM: allow moves/abilities outside this Pokémon's normal learnset",
    style:"display:inline-flex;gap:5px;align-items:center;cursor:pointer;font-weight:700;color:var(--muted)"});
  const cb = el("input",{type:"checkbox"}); cb.checked = !!p.unlocked;
  cb.addEventListener("change",()=>{ p.unlocked=cb.checked; save(); refreshMon(p); });
  wrap.append(cb, "🔓 GM: allow any");
  return wrap;
}
function moveSlot(p, sp, m, mn, opts={}){
  const slot = el("div",{class:"moveslot"});
  const info = el("div",{style: m?"cursor:pointer;flex:1":"flex:1", onclick: m? ()=>openMoveRoll(p,m,sp) : null},
    el("div",{style:"font-weight:700"}, m?`${m.name} `:mn,
      m?el("span",{html:typeBadge(effectiveMoveType(p,m))}):"",
      opts.tag?el("span",{class:"muted small",style:"margin-left:6px;font-weight:600"},opts.tag):""),
    el("div",{class:"ms-info"}, m? moveLineShort(m) : "custom / not in database"));
  slot.append(info);
  const acts = el("div",{class:"inline"});
  // Scene/Daily use tracker (Struggle & At-Will moves show nothing)
  if(m && !opts.tag){ const uc = usesControl(p, "move", m.name, m.frequency, opts.rerender||(()=>refreshMon(p))); if(uc) acts.append(uc); }
  if(m) acts.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",title:"roll this move",onclick:()=>openMoveRoll(p,m,sp)},"🎲 Roll"));
  if(m) acts.append(el("button",{class:"linkbtn",onclick:()=>openRefDetail("move",m.name)},"info"));
  if(opts.onRemove) acts.append(el("button",{class:"linkbtn",title:"remove",onclick:opts.onRemove},"×"));
  slot.append(acts);
  return slot;
}
function movesCard(p, sp){
  const n = p.moves.length, over = n > MOVE_LIMIT;
  const atLimit = !p.unlocked && n >= MOVE_LIMIT;
  const addBtn = el("button",{class:"linkbtn h-act", disabled:atLimit,
    style: atLimit?"opacity:.4;cursor:not-allowed":"",
    onclick: atLimit? null : ()=>openMovePicker(p,sp)}, "+ add move");
  const card = el("div",{class:"card"}, el("h3",{},
    el("span",{class:over?"":"", style:over?"color:var(--bad)":""}, `Moves (${n}/${MOVE_LIMIT})`),
    el("div",{class:"inline"}, unlockToggle(p), addBtn)));
  // Struggle is always available and does not count toward the limit
  const st = struggleFor(p, sp);
  if(st){ card.append(struggleControl(p, sp)); card.append(moveSlot(p, sp, st, st.name, {tag:"default"})); }
  if(!p.moves.length) card.append(el("span",{class:"muted small"},"no moves selected yet"));
  p.moves.forEach((mn,i)=>{
    const m = moveByName.get(mn.toLowerCase());
    card.append(moveSlot(p, sp, m, mn, {onRemove:()=>{p.moves.splice(i,1);save();refreshMon(p);}}));
  });
  if(atLimit) card.append(el("div",{class:"small muted",style:"margin-top:6px"},
    `Move limit reached (${MOVE_LIMIT}). Tick “🔓 GM: allow any” to add more.`));
  else if(over) card.append(el("div",{class:"warnbox",style:"margin-top:6px"},
    `Over the normal ${MOVE_LIMIT}-move limit (GM override).`));
  return card;
}

/* ---------- dice ---------- */
function rollDiceString(str){
  // parse "2d10+10" (ignores the "/ avg" part). returns {rolls, flat, total, expr}
  const m = String(str||"").match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/i);
  if(!m) return null;
  const n=+m[1], faces=+m[2], flat=m[3]?parseInt(m[3].replace(/\s/g,"")):0;
  const rolls=[]; for(let i=0;i<n;i++) rolls.push(1+Math.floor(Math.random()*faces));
  const sum=rolls.reduce((a,b)=>a+b,0);
  return {rolls, faces, flat, dice:sum, total:sum+flat, expr:`${n}d${faces}${flat?(flat>0?"+"+flat:flat):""}`};
}
/* Detect moves whose Damage Base depends on Weight Class (Low Kick, Grass Knot, Heavy Slam, Heat Crash…).
   Returns {kind, base, label} or null. */
function weightMoveInfo(m){
  const eff = String(m?.effect||""), rng = String(m?.range||"");
  if(/twice the target'?s weight class/i.test(eff))
    return { kind:"target2x", base:0, label:"Target's Weight Class", hint:"DB = 2 × the target's Weight Class" };
  if(/each weight class the user is above the target/i.test(eff))
    return { kind:"diffPlus2", base:m?.damageBase||0, label:"Weight Classes you exceed the target by",
             hint:`DB ${m?.damageBase||0} +2 per Weight Class you outweigh the target` };
  if(/weight class/i.test(rng) || /weight class/i.test(eff))
    return { kind:"generic", base:m?.damageBase??null, label:"Weight Class", hint:"This move's damage depends on Weight Class — see its full text" };
  return null;
}
function openMoveRoll(p, m, sp){
  const d = pokeDerived(p);
  const types = sp?.types || [];
  const mtype = effectiveMoveType(p, m);
  const stab = mtype && types.includes(mtype);
  const isPhys = /phys/i.test(m.class||"");
  const isSpec = /spec/i.test(m.class||"");
  const atkStat = isPhys ? d.eff.atk : isSpec ? d.eff.spatk : 0;   // CS-adjusted Attack / Sp.Attack
  const atkLbl = isPhys ? "Attack" : isSpec ? "Sp. Attack" : null;
  const evaNote = isPhys ? "target's Physical Evasion" : isSpec ? "target's Special Evasion" : "target's Evasion";
  const defNote = isPhys ? "Defense" : isSpec ? "Special Defense" : "Defense/Sp.Def";

  // weight-dependent Damage Base — the player types the needed Weight Class number here
  const wInfo = weightMoveInfo(m);
  let weightVal = wInfo ? (wInfo.kind==="diffPlus2" ? 1 : 3) : 0;
  function baseDB(){                      // effective (pre-STAB) Damage Base
    if(wInfo){
      if(wInfo.kind==="target2x")  return 2*Math.max(1, weightVal);
      if(wInfo.kind==="diffPlus2") return wInfo.base + 2*Math.max(0, weightVal);
    }
    return m.damageBase;                  // generic weight moves & normal moves use the printed DB
  }
  const finalDB = () => { const b=baseDB(); return b!=null ? b + (stab?2:0) : null; };
  const diceStr = () => { const f=finalDB(); return f!=null ? (DB_TABLE[f]||"").split("/")[0].trim() : ""; };

  const body = el("div",{});
  body.append(el("div",{style:"margin-bottom:6px"}, el("span",{html:typeBadge(mtype)}),
    el("span",{class:"kv"}, m.class||"Status")));
  const dbChip = el("span",{class:"kv"});
  body.append(el("div",{class:"chips",style:"margin-bottom:12px"},
    el("span",{class:"kv"}, `Freq: ${m.frequency||"—"}`),
    el("span",{class:"kv"}, `AC ${m.ac??"—"}`),
    dbChip,
    el("span",{class:"kv"}, m.range||"—")));

  const explain = el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
  // accuracy (static)
  explain.append(el("div",{style:"margin-bottom:10px"},
    el("div",{style:"font-size:16px;font-weight:700"}, `Accuracy: ${m.ac!=null ? "1d20" : "—"}`),
    el("div",{class:"small muted",style:"margin-top:2px"},
      m.ac!=null ? `Roll 1d20 — hits if it's ≥ AC ${m.ac} + ${evaNote}. Nat 20 auto-hits/crits, nat 1 auto-misses.`
                 : "This move has no Accuracy Check.")));
  const dmgBox = el("div",{});            // rebuilt whenever the Weight Class changes
  explain.append(dmgBox);

  /* --- weight-class input (only for weight-dependent moves) --- */
  if(wInfo && wInfo.kind!=="generic"){
    const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
    wc.append(el("div",{class:"small",style:"font-weight:700;margin-bottom:4px"},`⚖ ${wInfo.label}`));
    const inp = el("input",{type:"number",min:0,value:weightVal,style:"width:90px"});
    inp.addEventListener("input",()=>{ weightVal = Math.max(0, parseInt(inp.value)||0); renderDamage(); });
    wc.append(inp, el("span",{class:"small muted",style:"margin-left:8px"}, wInfo.hint));
    wc.append(el("div",{class:"small muted",style:"margin-top:4px"},"Weight Classes: 1 (≤10 kg) · 2 · 3 · 4 · 5 · 6 (≥400 kg). See a Pokémon's Info tab for its Weight Class."));
    body.append(wc);
  } else if(wInfo){
    body.append(el("div",{class:"warnbox",style:"margin:0 0 12px"}, wInfo.hint));
  }

  function renderDamage(){
    const fDB = finalDB(), ds = diceStr();
    const dm = ds.match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/) || [];
    const dn = dm[1]?+dm[1]:0, dfaces = dm[2]?+dm[2]:0, dflat = dm[3]?parseInt(dm[3].replace(/\s/g,"")):0;
    dbChip.textContent = fDB!=null ? `DB ${baseDB()}${stab?` +2 STAB → ${fDB}`:""}` : "No damage";
    dbChip.style.display = "";
    dmgBox.innerHTML = "";
    if(fDB!=null && dn){
      const terms=[`${dn}d${dfaces}`]; if(dflat) terms.push(String(dflat)); if(atkStat) terms.push(String(atkStat));
      const why=[`${dn}d${dfaces}${dflat?`+${dflat}`:""} = Damage Base ${fDB}${stab?` (DB ${baseDB()} +2 STAB)`:""}`];
      if(atkStat) why.push(`${atkStat} = your ${atkLbl}`);
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, `Damage: ${terms.join(" + ")}`),
        el("div",{class:"small muted",style:"margin-top:2px"}, why.join(" · ")+`. Target then subtracts their ${defNote}.`)));
    } else {
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, "Damage: —"),
        el("div",{class:"small muted",style:"margin-top:2px"}, "Status move — deals no damage; see its effect.")));
    }
  }
  renderDamage();
  body.append(explain);

  /* --- results (filled when you press Roll dice) --- */
  const out = el("div",{id:"rollOut",class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"}, "Press 🎲 Roll dice to simulate."));
  const doRoll = () => {
    const fDB = finalDB();
    out.style.borderStyle="solid";
    out.innerHTML="";
    const acc = 1+Math.floor(Math.random()*20);
    const accLine = el("div",{style:fDB!=null?"margin-bottom:10px":""});
    accLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"));
    accLine.append(el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${acc}`,
      el("span",{class:"muted",style:"font-size:14px;font-weight:600"}, "  (1d20)")));
    if(m.ac!=null) accLine.append(el("div",{class:"small muted"},
      `Hits if ${acc} ≥ AC ${m.ac} + ${evaNote}.${acc===20?" Natural 20 — auto-hit/crit!":acc===1?" Natural 1 — auto-miss.":""}`));
    out.append(accLine);
    if(fDB!=null){
      const r = rollDiceString(diceStr());
      const dmgLine = el("div",{});
      dmgLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"));
      if(r){
        const total = r.total + (atkStat||0);
        dmgLine.append(el("div",{style:"font-size:26px;font-weight:800;color:var(--accent)"}, `💥 ${total}`));
        const parts=[`${r.expr} → [${r.rolls.join(", ")}]${r.flat?` ${r.flat>0?"+":""}${r.flat}`:""} = ${r.total}`];
        if(atkStat) parts.push(`+ ${atkStat} ${atkLbl} = ${total}`);
        dmgLine.append(el("div",{class:"small muted",style:"margin-top:4px"}, parts.join("  ")));
        dmgLine.append(el("div",{class:"small muted"}, `Target subtracts ${defNote} & damage reduction.`));
      }
      out.append(dmgLine);
    }
  };
  body.append(out);

  modal({title:`${m.name}`, bodyNode:body, footNodes:[
    m.effect? el("button",{class:"btn-secondary",onclick:()=>openRefDetail("move",m.name)},"Full text") : "",
    el("button",{class:"btn-primary",onclick:doRoll},"🎲 Roll dice"),
  ]});
}
function moveLineShort(m){
  const bits=[];
  if(m.frequency) bits.push(m.frequency);
  if(m.class) bits.push(m.class);
  if(m.damageBase) bits.push(`DB${m.damageBase}`);
  if(m.ac!=null) bits.push(`AC ${m.ac}`);
  if(m.range) bits.push(m.range);
  return bits.join(" · ");
}
function openMovePicker(p, sp){
  if(!p.unlocked && !sp){ toast("Unknown species — tick 🔓 to add any move"); return; }
  let names, title, markSet;
  if(p.unlocked){
    // GM override: any move; species' full learnset prioritised on top
    const learn = speciesFullLearnset(sp);
    markSet = new Set(learn.map(x=>x.toLowerCase()));
    names = [...new Set([...learn, ...D.moves.map(m=>m.name)])];
    title = `Add move (🔓 any) — ${sp?sp.name+"'s learnset on top":"all moves"}`;
  } else {
    names = speciesLevelupNames(sp, p.level);   // only moves learned by levelling to here
    markSet = new Set(names.map(x=>x.toLowerCase()));
    title = `Add move — ${sp.name}, learned by Lv ${p.level}`;
  }
  names = names.filter(nm => !p.moves.includes(nm));
  if(!names.length){ toast(p.unlocked?"No more moves to add":"No new level-up moves yet — tick 🔓 for egg/TM/tutor or higher-level moves"); return; }
  openPicker(title, names, name=>{
    if(!p.moves.includes(name)){ p.moves.push(name); save(); refreshMon(p); }
  }, "move", n=>markSet.has(n.toLowerCase()));
}

/* ===================================================================
   BATTLE VIEW  — what you can do on your turn (actions & maneuvers)
=================================================================== */
const BATTLE_ACTIONS = [
  // ----- Standard -----
  {id:"use-move", name:"Use a Move", type:"Standard", common:true,
   effect:"Attack with one of your moves. Roll 1d20 for accuracy — you hit if it meets or exceeds the move's AC + the target's Evasion. Then roll the move's damage and add your Attack (Physical) or Sp. Attack (Special); +2 Damage Base for STAB. Use the ⚔ Moves tab to roll yours."},
  {id:"struggle", name:"Struggle Attack", type:"Standard", cls:"Physical", ac:4, common:true,
   effect:"Every Pokémon can always attack with Struggle, even with no moves left. Normal-type, Physical, AC 4, Damage Base 4. Becomes Struggle+ (DB 5, AC 3) if your Combat skill is Expert or higher."},
  {id:"dirty-trick", name:"Dirty Trick", type:"Standard", cls:"Status", ac:2, range:"Melee, 1 target", common:true,
   effect:"Pick one cheap trick (each usable once per Scene per target):\n• Hinder — opposed Athletics; target is Slowed and takes −2 to all Skill Checks for one round.\n• Blind — opposed Stealth; target is Blinded for one round.\n• Low Blow — opposed Acrobatics; target is Vulnerable and its Initiative is set to 0 until the end of your next turn."},
  {id:"manipulate", name:"Manipulate", type:"Standard", cls:"Status", ac:2, range:"6, 1 target", who:"Trainers only", actor:"trainer",
   effect:"Trainers only. Pick one (once per Scene per target):\n• Bon Mot — Guile vs Guile/Focus; target is Enraged and can't spend AP for one round.\n• Flirt — Charm vs Charm/Focus; target is Infatuated with you for one round.\n• Terrorize — Intimidate vs Intimidate/Focus; target loses all Temp HP and can only use At-Will moves for one round."},
  {id:"disarm", name:"Disarm", type:"Standard", cls:"Status", ac:6, range:"Melee, 1 target",
   effect:"Opposed Combat or Stealth check. If you win, the target's held item (Main or Off-Hand for humans) falls to the ground."},
  {id:"push", name:"Push", type:"Standard", cls:"Status", ac:4, range:"Melee, 1 target",
   effect:"Opposed Combat or Athletics. If you win, push the target 1m directly away. If you have movement left you may follow and push again, repeatedly. Only works on targets no heavier than your Heavy Lifting rating."},
  {id:"trip", name:"Trip", type:"Standard", cls:"Status", ac:6, range:"Melee, 1 target",
   effect:"Opposed Combat or Acrobatics. If you win, the target is knocked over and Tripped."},
  {id:"grapple", name:"Grapple", type:"Standard", cls:"Status", ac:4, range:"Melee, 1 target",
   effect:"Opposed Combat or Athletics. If you win, both of you become Grappled and you gain Dominance. While Grappled a target is Vulnerable, cannot Shift, and takes −6 to hit anyone outside the grapple. Contesting/using the grapple is a Full Action."},
  {id:"sprint", name:"Sprint", type:"Standard", cls:"Status", range:"Self",
   effect:"Increase your Movement Speeds by 50% for the rest of your turn."},
  {id:"use-item", name:"Use an Item", type:"Standard", actor:"trainer",
   effect:"Retrieve and use an item (Potion, X-Item, etc.) on a target."},
  {id:"throw-ball", name:"Throw a Poké Ball", type:"Standard", actor:"trainer",
   effect:"Throw a Poké Ball to try to capture a wild Pokémon."},
  {id:"recall-self", name:"Recall for Switch", type:"Standard", actor:"pokemon",
   effect:"A Pokémon may recall itself into its Poké Ball so its Trainer can switch in another."},
  {id:"pokedex", name:"Identify (Pokédex)", type:"Standard", actor:"trainer",
   effect:"Use the Pokédex to identify a Pokémon and read its data."},
  {id:"draw-weapon", name:"Draw / Switch Weapon", type:"Standard", actor:"trainer",
   effect:"Draw a weapon, or switch from one weapon to another."},
  {id:"improvised", name:"Improvised Attack", type:"Standard",
   effect:"Attack using the environment or an object (throw a rock, topple a tree…). The GM adjudicates — usually a reduced AC and Damage Base, and Normal-type unless there's a strong reason otherwise."},
  // ----- Shift -----
  {id:"move", name:"Move / Shift", type:"Shift", common:true,
   effect:"Move up to your Speed using a Movement Capability (Overland, Swim, Sky, Burrow, Levitate). This is the usual use of your Shift Action."},
  {id:"disengage", name:"Disengage", type:"Shift", common:true,
   effect:"Shift 1 meter without provoking an Attack of Opportunity."},
  {id:"switch-pokemon", name:"Send Out / Return Pokémon", type:"Shift", actor:"trainer",
   effect:"Trainer: return a Pokémon and/or send one out — including returning a Fainted Pokémon and sending a replacement."},
  {id:"stand-up", name:"Stand Up", type:"Shift",
   effect:"Get up after being Tripped or knocked over. Note: standing up can provoke an Attack of Opportunity from adjacent foes."},
  {id:"drop-item", name:"Drop / Hand Item", type:"Shift",
   effect:"Drop most held items, or hand a small item to an adjacent ally as part of your Shift."},
  // ----- Swift -----
  {id:"swift-feature", name:"Swift Feature / Order", type:"Swift", common:true,
   effect:"You get exactly one Swift Action per round, on your turn. Many Features and Trainer Orders are Swift Actions."},
  {id:"give-standard-swift", name:"Trade Standard → Swift", type:"Swift",
   effect:"You may give up your Standard Action to take an additional Swift Action."},
  {id:"sustain", name:"Sustain a Move", type:"Swift",
   effect:"Some moves must be Sustained each round (usually a Swift Action) to keep their effect going."},
  // ----- Free -----
  {id:"attack-opportunity", name:"Attack of Opportunity", type:"Free", common:true, cls:"Interrupt",
   effect:"Once per round, make a Struggle Attack against an adjacent foe that provokes you. Triggers include: they Shift out of a square adjacent to you; stand up; make a ranged attack not aimed at someone adjacent to them; use a Standard Action to pick up/retrieve an item; or use Push/Grapple/Disarm/Trip/Dirty Trick on someone other than you. Can't be made while Sleeping, Flinched, or Paralyzed."},
  {id:"free-feature", name:"Free Features & Triggers", type:"Free", common:true,
   effect:"Activate Free-Action features and triggered effects — as many as you like, though each Trigger only fires once per trigger."},
  {id:"speak", name:"Speak", type:"Free",
   effect:"Talk, shout a warning or command, taunt — brief speech is a Free Action."},
  {id:"hold-action", name:"Hold / Delay Action", type:"Free",
   effect:"Once per round you may hold your action until a chosen lower Initiative count."},
  {id:"priority-keyword", name:"Priority & Interrupt (keywords)", type:"Free",
   effect:"Priority: declared between turns to act immediately, taking your whole turn (counts as your turn). Priority (Limited): only the priority action now, rest of turn on your Initiative. Interrupt: used mid-someone-else's turn for just that one action."},
  // ----- Full -----
  {id:"take-breather", name:"Take a Breather", type:"Full", common:true,
   effect:"Move as far from enemies as possible using your best Movement, then: cure all Volatile Status plus Slow and Stuck, reset Combat Stages to default, and lose all Temp HP. You become Tripped and Vulnerable until the end of your next turn. (Still must pass Save Checks to choose to do this.)"},
  {id:"coup-de-grace", name:"Coup de Grâce", type:"Full",
   effect:"Against a Fainted or completely helpless target, make any attack you could as a Standard Action (only targeting them). If it hits it's automatically a Critical Hit dealing +5 bonus damage — multiplied by the crit, so usually +10 (Snipers +15) — ignoring crit immunity."},
  {id:"intercept-melee", name:"Intercept (Melee)", type:"Full", cls:"Interrupt",
   effect:"When an ally within your movement range is hit by an adjacent foe, make an Acrobatics or Athletics check (DC = 3× the meters to reach them). On success, push the ally 1m, take their space and take the hit instead. Pokémon need Loyalty 3+ (own Trainer only; Loyalty 6 for any ally)."},
  {id:"intercept-ranged", name:"Intercept (Ranged)", type:"Full", cls:"Interrupt",
   effect:"When a ranged attack passes within your movement range, pick a square between attacker and target, make an Acrobatics/Athletics check and Shift toward it. On success you take the attack instead. Same Loyalty rules as Intercept (Melee)."},
];
function getFavActions(){ try{ return new Set(JSON.parse(localStorage.getItem("ptu_fav_actions")||"[]")); }catch(e){ return new Set(); } }
function toggleFavAction(id){ const s=getFavActions(); s.has(id)?s.delete(id):s.add(id); localStorage.setItem("ptu_fav_actions", JSON.stringify([...s])); }
const featFavId = name => "feat:"+name;   // Features share the favourites store, keyed by name

let battleActor="trainer", battleFilter="moves";
function renderBattle(){
  const root=$("#view-battle"); root.innerHTML="";
  const c=activeChar();
  const team=(c?.pokemon||[]);
  // resolve actor: "trainer" or a Pokémon id
  if(battleActor!=="trainer" && !team.find(p=>p.id===battleActor)) battleActor="trainer";
  const isTrainer = battleActor==="trainer";

  // whose-turn selector (Trainer + each Pokémon act on separate turns)
  const sc=el("div",{class:"card"},el("h3",{},"Battle — whose turn?"));
  const sel=el("select");
  sel.append(el("option",{value:"trainer",selected:isTrainer}, `🧑 ${c?.trainer?.name||c?.name||"Trainer"} — Trainer`));
  team.forEach(p=>{ const sp=getSpecies(p.species); sel.append(el("option",{value:p.id,selected:p.id===battleActor}, `🔴 ${p.nickname||sp?.name||"?"} · Lv ${p.level}`)); });
  sel.addEventListener("change",()=>{ battleActor=sel.value; if(battleFilter!=="fav"&&!isTypeFilter(battleFilter)) battleFilter="moves"; renderBattle(); });
  sc.append(sel);
  sc.append(el("div",{class:"muted small",style:"margin-top:6px"},
    isTrainer ? "Trainers and Pokémon take separate turns. These are the Trainer's actions."
              : "This Pokémon's turn — it can't use Trainer-only maneuvers (Poké Balls, Manipulate, items…)."));
  root.append(sc);

  const firstLabel = isTrainer ? "⚔ Combat" : "⚔ Moves";
  root.append(subTabBar([["moves",firstLabel],["fav","★ Fav"],["standard","Standard"],["shift","Shift"],["swift","Swift"],["free","Free"],["full","Full"]],
    battleFilter, k=>{ battleFilter=k; renderBattle(); }));

  if(battleFilter==="moves"){
    return isTrainer ? renderTrainerCombat(root, c.trainer) : renderPokemonMoves(root, team);
  }

  // maneuver lists, filtered to what this actor may do
  const favs=getFavActions();
  const okActor = a => { const act=a.actor||"both"; return act==="both" || act===(isTrainer?"trainer":"pokemon"); };
  let list=BATTLE_ACTIONS.filter(a => (battleFilter==="fav" ? favs.has(a.id) : a.type.toLowerCase()===battleFilter) && okActor(a));
  list.sort((a,b)=> (favs.has(b.id)-favs.has(a.id)) || ((b.common?1:0)-(a.common?1:0)) || a.name.localeCompare(b.name));
  // the trainer's own action Features: on a type tab, those firing on this action type; on ★ Fav, any favourited one
  const featRows = (isTrainer && (isTypeFilter(battleFilter) || battleFilter==="fav"))
    ? trainerFeatureObjs(c.trainer)
        .filter(f => battleFilter==="fav" ? favs.has(featFavId(f.name)) : featureActionTypes(f).includes(battleFilter))
        .sort((a,b)=>a.name.localeCompare(b.name))
    : [];
  const favFeat = featRows.filter(f=>favs.has(featFavId(f.name)));   // pinned Features float above regular actions
  const restFeat = featRows.filter(f=>!favs.has(featFavId(f.name)));
  if(!list.length && !featRows.length){ root.append(el("div",{class:"muted",style:"padding:10px"}, battleFilter==="fav"?"No favourites yet — tap ☆ on any action or Feature to pin it here.":"Nothing here for this actor.")); return; }
  const wrap=el("div",{});
  if(favFeat.length){
    wrap.append(el("div",{class:"section-head"}, "★ Favourite Features"));
    favFeat.forEach(f=>wrap.append(featureActionRow(f, c.trainer, renderBattle)));
  }
  list.forEach(a=>wrap.append(battleActionRow(a,favs)));
  if(restFeat.length){
    wrap.append(el("div",{class:"section-head",style:"margin-top:14px"}, "From your Features"));
    restFeat.forEach(f=>wrap.append(featureActionRow(f, c.trainer, renderBattle)));
  }
  root.append(wrap);
}
function isTypeFilter(k){ return ["standard","shift","swift","free","full"].includes(k); }
/* Pokémon turn: moves (tap to roll) + Struggle + its abilities as reference */
function renderPokemonMoves(root, team){
  const p=team.find(x=>x.id===battleActor), sp=p&&getSpecies(p.species);
  const card=el("div",{class:"card"},el("h3",{},"Moves — tap to roll"));
  if(!p){ card.append(el("span",{class:"muted small"},"No Pokémon selected.")); root.append(card); return; }
  card.append(struggleControl(p, sp, renderBattle));
  const st=struggleFor(p,sp); if(st) card.append(moveSlot(p,sp,st,st.name,{tag:"default"}));
  if(!p.moves.length) card.append(el("span",{class:"muted small"},"No moves yet — add some in the Pokémon → Play tab."));
  p.moves.forEach(mn=>{ const m=moveByName.get(mn.toLowerCase()); card.append(moveSlot(p,sp,m,mn,{rerender:renderBattle})); });
  root.append(card);
  if(p.abilities?.length){
    const ac=el("div",{class:"card"},el("h3",{},`Abilities (${p.abilities.length})`,
      el("span",{class:"muted small"},"passive / triggered")));
    p.abilities.forEach(an=>{ const ab=abilityByName.get((an||"").toLowerCase());
      const uc = ab && usesControl(p, "ability", an, ab.frequency, renderBattle);
      const d=el("details",{class:"spoiler"});
      d.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, an||"—"),
        uc ? el("span",{style:"margin-left:8px"}, uc) : ""));
      d.append(el("div",{class:"small",style:"margin-top:6px",html: ab?abilityText(ab):"<span class='muted'>Not in database</span>"}));
      ac.append(d); });
    root.append(ac);
  }
  root.append(el("div",{class:"small muted",style:"padding:0 4px"},"Other action types are in the tabs above — Standard, Shift, Swift, Free, Full."));
}
/* A Feature's frequency encodes its action type after the "-" (e.g. "1 AP - Free Action",
   "Bind 2 AP - Standard Action"). Returns the battle-tab keys it belongs to ([] = passive). */
function featureActionTypes(f){
  const after = String(f?.frequency||"").split(" - ").slice(1).join(" - ");
  const t=[];
  if(/Standard Action/i.test(after)) t.push("standard");
  if(/Shift Action/i.test(after))    t.push("shift");
  if(/Swift Action/i.test(after))    t.push("swift");
  if(/Free Action/i.test(after))     t.push("free");
  if(/Full Action/i.test(after))     t.push("full");
  return t;
}
/* the trainer's Features that grant actions: learned Features + the class-defining Features of
   any Class they've taken (e.g. taking "Cheerleader" grants its Free-Action Cheer). */
function trainerFeatureObjs(t){
  const names=[...new Set([...(t.classes||[]), ...(t.features||[])])];
  return names.map(n=>D.features.find(f=>f.name===n)).filter(Boolean);
}
/* Detect the Move(s) a Feature grants: only look when the text actually talks about gaining a
   Move, then match any known move name appearing in it. Conservative on purpose — the manual
   "＋ move" list on the Combat tab is the fallback when a feature's wording is too loose. */
const GRANT_RE=/\b(gain|gains|learn|learns|know|knows|grant|grants)\b/i;
function featureGrantsMoveNames(effect){
  if(!effect || !GRANT_RE.test(effect)) return [];
  // "choose 2 from the list" features grant a player CHOICE, not a fixed move — don't auto-pick
  // one for them; only their unambiguous "X as a Move" grants (if any) should auto-add.
  const isChoice=/\b(from the list|list below|choose|pick (one|two|three|a move))\b/i.test(effect);
  const found=[];
  for(const m of D.moves){
    const nm=m.name; if(!nm || nm.length<4 || /^struggle$/i.test(nm)) continue;
    // case-SENSITIVE whole-word match: an actual grant writes the Move name Title-Case, while
    // prose words that happen to be move names ("this round", "charge in", "a curse") are lowercase.
    const re=new RegExp("\\b"+nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","g");
    let mt; while((mt=re.exec(effect))){
      const before=effect.slice(Math.max(0,mt.index-16), mt.index);
      const after=effect.slice(mt.index+nm.length, mt.index+nm.length+30);
      // accept only the shapes a real grant takes: "the Move X" / "Moves: X" (not on choice
      // features), or "X as a/an/the … Move/Attack" — excludes "gains a Curse Token", "Round", etc.
      if((!isChoice && /\bMoves?\b[\s:]*$/.test(before)) || /^\s*as (a|an|the)\b[^.]{0,18}\b(Move|Attack)\b/i.test(after)){ found.push(nm); break; }
    }
  }
  const uniq=[...new Set(found)];
  return uniq.length<=3 ? uniq : [];   // long lists = "choose/teach a move" menus, not fixed grants
}
/* When a Feature that teaches a Move is learned, add that Move to the trainer's sheet. */
function autoGrantFeatureMoves(t, featureName){
  if(!t) return;
  const f=D.features.find(x=>x.name===featureName); if(!f) return;
  if(!Array.isArray(t.moves)) t.moves=[];
  const added=[];
  featureGrantsMoveNames(f.effect||"").forEach(nm=>{ if(!t.moves.includes(nm)){ t.moves.push(nm); added.push(nm); } });
  if(added.length) toast(`＋ Move${added.length>1?"s":""} from ${featureName}: ${added.join(", ")}`);
}
function featureActionRow(f, owner, rerender){
  const d=el("details",{class:"spoiler"});
  const meta=[f.frequency,f.category].filter(Boolean).join(" · ");
  const uc = owner && usesControl(owner, "feature", f.name, f.frequency, rerender||(()=>{}));
  const favs=getFavActions(), fav=favs.has(featFavId(f.name));
  d.append(el("summary",{},
    el("button",{class:"actstar"+(fav?" on":""),title:fav?"unfavourite":"favourite",
      onclick:e=>{ e.preventDefault(); toggleFavAction(featFavId(f.name)); (rerender||renderBattle)(); }}, fav?"★":"☆"),
    el("span",{style:"font-weight:700;color:var(--ink)"}, f.name),
    meta?el("span",{class:"muted small",style:"margin-left:8px"}, meta):"",
    uc ? el("span",{style:"margin-left:8px"}, uc) : ""));
  d.append(el("div",{class:"small",style:"margin-top:6px",html: refDetailHTML("feature",f.name)}));
  return d;
}
/* Trainer turn: how they attack + their passive/always-on Features (action Features live in the tabs) */
/* one rollable attack row in the trainer's Combat tab */
function trainerAttackSlot(t, profile, rollFn, opts={}){
  const slot = el("div",{class:"moveslot"});
  slot.append(el("div",{style:"flex:1"},
    el("div",{style:"font-weight:700"}, profile.name+" ", el("span",{html:typeBadge(profile.type)}),
      opts.tag?el("span",{class:"muted small",style:"margin-left:6px;font-weight:600"}, opts.tag):""),
    el("div",{class:"ms-info"}, `${profile.frequency?profile.frequency+" · ":""}${profile.cls||"Physical"} · AC ${profile.ac} · DB ${profile.damageBase} · ${profile.range} · +Attack`)));
  const acts = el("div",{class:"inline"});
  if(opts.uc) acts.append(opts.uc);
  acts.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",onclick:rollFn},"🎲 Roll"));
  if(opts.move) acts.append(el("button",{class:"linkbtn",onclick:()=>openRefDetail("move",profile.name)},"info"));
  slot.append(acts);
  return slot;
}
function addTrainerMove(t){
  if(!Array.isArray(t.moves)) t.moves=[];
  const names=D.moves.map(m=>m.name).filter(n=>!t.moves.includes(n));
  openPicker("Add a Move", names, name=>{ t.moves.push(name); save(); renderBattle(); }, "move");
}
function renderTrainerCombat(root, t){
  const card=el("div",{class:"card"},el("h3",{},"Struggle & Weapon Attacks"));
  // unarmed Struggle (always available)
  card.append(trainerAttackSlot(t, trainerStruggle(t), ()=>openTrainerAttack(t), {tag:"unarmed"}));
  // one attack per weapon (+ its Weapon Move, if any)
  (t.weapons||[]).forEach(w=>{
    card.append(trainerAttackSlot(t, trainerStruggle(t, w), ()=>openTrainerAttack(t, null, w), {tag:w.category}));
    if(w.weaponMove){
      const wm = trainerAttackProfile(t, w.weaponMove, w);
      const uc = usesControl(t, "move", wm.name, wm.frequency, renderBattle);
      card.append(trainerAttackSlot(t, wm, ()=>openTrainerAttack(t, w.weaponMove, w), {tag:"weapon move", uc, move:true}));
    }
  });
  card.append(el("div",{class:"small muted",style:"margin-top:8px"},
    (t.weapons||[]).length ? "Each weapon (and its Weapon Move) is listed above. Add/edit weapons in Trainer → Sheet → Weapons."
                           : "Unarmed Struggle only — add weapons in Trainer → Sheet → Weapons. Action Features (Cheer, Orders…) appear under the tabs above."));
  root.append(card);
  // Moves granted by Features/class — rollable (adds Attack, no STAB), like weapon moves
  if(!Array.isArray(t.moves)) t.moves=[];
  const mvCard=el("div",{class:"card"});
  mvCard.append(el("div",{class:"inline",style:"justify-content:space-between;align-items:center"},
    el("h3",{style:"margin:0"}, `Moves (${t.moves.length})`),
    el("button",{class:"linkbtn",onclick:()=>addTrainerMove(t)},"＋ move")));
  if(!t.moves.length) mvCard.append(el("span",{class:"small muted"},
    "none — Moves taught by your Features appear here automatically; or tap ＋ move."));
  t.moves.forEach(mn=>{
    const m=moveByName.get(mn.toLowerCase());
    const prof = m ? trainerAttackProfile(t, mn) : {name:mn+" (not in DB)",type:"Normal",cls:"?",ac:"—",damageBase:"—",range:"—"};
    const uc = m ? usesControl(t,"move",prof.name,prof.frequency,renderBattle) : null;
    const slot = trainerAttackSlot(t, prof, ()=>openTrainerAttack(t, m?mn:null), {tag:"feature move", uc, move:!!m});
    slot.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted);align-self:center;margin-left:4px",title:"remove this move",
      onclick:()=>{ const i=t.moves.indexOf(mn); if(i>=0){ t.moves.splice(i,1); save(); renderBattle(); } }},"×"));
    mvCard.append(slot);
  });
  root.append(mvCard);
  const passive=trainerFeatureObjs(t).filter(f=>!featureActionTypes(f).length);
  const pc=el("div",{class:"card"},el("h3",{},`Passive & Always-On (${passive.length})`,
    el("span",{class:"muted small"},"Static / out-of-combat")));
  if(!passive.length) pc.append(el("span",{class:"muted small"},"none — your action Features are in the tabs above, or learn Features in Trainer → Features & Edges."));
  passive.forEach(f=>pc.append(featureActionRow(f, t, renderBattle)));
  root.append(pc);
}
function battleActionRow(a, favs){
  const fav=favs.has(a.id);
  const d=el("details",{class:"spoiler"});
  const meta=[a.type]; if(a.ac!=null)meta.push("AC "+a.ac); if(a.cls)meta.push(a.cls); if(a.range)meta.push(a.range); if(a.who)meta.push(a.who);
  d.append(el("summary",{},
    el("button",{class:"actstar"+(fav?" on":""),title:fav?"unfavourite":"favourite",
      onclick:e=>{ e.preventDefault(); toggleFavAction(a.id); renderBattle(); }}, fav?"★":"☆"),
    el("span",{style:"font-weight:700;color:var(--ink)"}, a.name),
    el("span",{class:"muted small",style:"margin-left:8px"}, meta.join(" · "))));
  d.append(el("div",{class:"small",style:"margin-top:6px;white-space:pre-line"}, a.effect));
  return d;
}

/* ===================================================================
   ENCOUNTERS  (GM-only) — build combat encounters of NPC Trainers & wild
   Pokémon, roll their actions at a glance, and award XP by the book (Core p.460).
   Stored device-locally in state.encounters (never synced — GM prep).
=================================================================== */
function newEncounter(name){ return { id:uid(), name:name||"New Encounter", sig:1, players:3, mons:[], trainers:[] }; }
function normEncounter(e){
  if(!e) return e;
  if(!Array.isArray(e.mons)) e.mons=[];
  if(!Array.isArray(e.trainers)) e.trainers=[];
  if(typeof e.sig!=="number") e.sig=2;
  if(typeof e.players!=="number") e.players=1;
  e.mons.forEach(normPokemon);
  e.trainers.forEach(tr=>{ if(tr.trainer) normTrainer(tr.trainer); if(!Array.isArray(tr.pokemon)) tr.pokemon=[]; tr.pokemon.forEach(normPokemon); });
  return e;
}
/* encounters live in the cloud when connected (so map tokens can link to them), else device-local */
function encList(){ return mode==="cloud" ? ensureEnc().data.encounters : (state.encounters || (state.encounters=[])); }
function activeEncounter(){ const a=encList(); return a.find(e=>e.id===state.activeEncounterId) || a[0]; }
let encSaveTimer;
function saveEnc(){
  if(mode==="cloud"){ clearTimeout(encSaveTimer); encSaveTimer=setTimeout(()=>{ encUpsert(); }, 400); return; }
  try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){ toast("⚠ Could not save encounter"); }
}
function toggleSet(set, v){ set.has(v)?set.delete(v):set.add(v); return [...set]; }
/* Base Experience Value: sum of enemy levels; Trainers count double (Core p.460) */
function encounterBaseXP(enc){
  let base=0;
  (enc.mons||[]).forEach(p=> base += (p.level||0));
  (enc.trainers||[]).forEach(tr=>{ base += (tr.trainer?.level||0)*2; (tr.pokemon||[]).forEach(p=> base += (p.level||0)); });
  return base;
}
const encMonName = p => p.nickname || getSpecies(p.species)?.name || p.species || "Pokémon";

function addEncounterMon(enc, into){
  openPicker("Add a Pokémon", D.species.map(s=>s.name), name=>{
    const p=newPokemon(name); const sp=getSpecies(name);
    p.level=5; p.xp=xpForLevel(5);
    if(sp){ p.moves = speciesLevelupNames(sp, p.level).slice(-6);           // pre-load level-up moves
            if(sp.abilities?.basic?.length) p.abilities=[sp.abilities.basic[0]]; }
    encRandomize(p);                                                        // random nature/gender/shiny/stats
    (into||enc.mons).push(p); saveEnc(); renderEncounters();
  }, "species");
}
function addEncounterTrainer(enc){
  const n=prompt("Trainer name:","Trainer"); if(n===null) return;
  const t=newTrainer(); t.name=n||"Trainer"; t.level=1;
  enc.trainers.push({ id:uid(), trainer:t, pokemon:[] }); saveEnc(); renderEncounters();
}
function addEncMove(p, sp){
  const names = (sp ? speciesFullLearnset(sp) : D.moves.map(m=>m.name)).filter(n=>!p.moves.includes(n));
  openPicker("Add a move", [...new Set(names)], name=>{ p.moves.push(name); saveEnc(); renderEncounters(); }, "move");
}
/* encounter Trainers can carry their own combat Moves (granted by Features/class) — rollable like Pokémon moves */
function addEncTrainerMove(t){
  if(!Array.isArray(t.encMoves)) t.encMoves=[];
  const names = D.moves.map(m=>m.name).filter(n=>!t.encMoves.includes(n));
  openPicker("Add a Trainer move", names, name=>{ t.encMoves.push(name); saveEnc(); renderEncounters(); }, "move");
}

function encounterMoveRow(p, sp, m, mn, favSet, onFav, isStruggle){
  const row=el("div",{class:"inline",style:"gap:6px;align-items:center;margin-top:5px;justify-content:space-between"});
  const left=el("div",{class:"inline",style:"gap:6px;align-items:center;min-width:0;flex:1"});
  if(isStruggle) left.append(el("span",{class:"muted small",title:"always available"},"⚔"));
  else { const isF=favSet.has(mn); left.append(el("button",{class:"actstar"+(isF?" on":""),
    title:isF?"unpin favourite":"pin favourite",onclick:onFav}, isF?"★":"☆")); }
  left.append(el("span",{style:"font-weight:700;white-space:nowrap"}, m?m.name:mn), m?el("span",{html:typeBadge(effectiveMoveType(p,m))}):"");
  if(m) left.append(el("span",{class:"small muted",style:"min-width:0;overflow:hidden;text-overflow:ellipsis"}, moveLineShort(m)));
  row.append(left);
  const acts=el("div",{class:"inline",style:"gap:6px"});
  if(m) acts.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"roll this move",onclick:()=>openMoveRoll(p,m,sp)},"🎲"));
  if(!isStruggle) acts.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted)",title:"remove move",
    onclick:()=>{ const i=p.moves.indexOf(mn); if(i>=0){ p.moves.splice(i,1); saveEnc(); renderEncounters(); } }},"×"));
  row.append(acts);
  return row;
}
function encounterAbilityRow(p, an){
  const ab=abilityByName.get((an||"").toLowerCase());
  const row=el("details",{class:"spoiler",style:"margin-top:5px"});
  row.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"}, an||"—"),
    ab&&ab.frequency?el("span",{class:"muted small",style:"margin-left:8px"}, ab.frequency):"",
    el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove ability",
      onclick:e=>{ e.preventDefault(); const i=p.abilities.indexOf(an); if(i>=0){ p.abilities.splice(i,1); saveEnc(); renderEncounters(); } }},"×")));
  row.append(el("div",{class:"small",style:"margin-top:6px",html: ab?abilityText(ab):"<span class='muted'>Not in database</span>"}));
  return row;
}
/* one expandable Class/Feature/Edge/Ability row on an encounter trainer card */
function encTrainerRefRow(name, kind, onRemove){
  const row=el("details",{class:"spoiler",style:"margin-top:5px"});
  const freq=refFrequency(kind, name);
  row.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"}, name),
    freq?el("span",{class:"muted small",style:"margin-left:8px"}, freq):"",
    el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove",
      onclick:e=>{ e.preventDefault(); onRemove(); }},"×")));
  row.append(el("div",{class:"small",style:"margin-top:6px",html: refDetailHTML(kind, name)}));
  return row;
}
/* GM encounter context: add ANY ability (this species' options floated to the top) */
function addEncAbility(p, sp){
  const speciesAbil = sp ? allAbilityNames(sp) : [];
  const speciesSet = new Set(speciesAbil.map(x=>x.toLowerCase()));
  const names = [...new Set([...speciesAbil, ...D.abilities.map(a=>a.name)])].filter(n=>!p.abilities.includes(n));
  if(!names.length){ toast("No more abilities to add"); return; }
  openPicker("Add ability"+(sp?` — ${sp.name}'s on top`:""), names, name=>{
    if(!p.abilities.includes(name)){ p.abilities.push(name); saveEnc(); renderEncounters(); }
  }, "ability", n=>speciesSet.has(n.toLowerCase()));
}
/* randomly spread a Pokémon's added stat points (Level + 10) across the six stats */
function encSpreadStats(p){
  const budget = (p.level||1) + 10;
  const keys = STATS.map(s=>s[0]);
  keys.forEach(k=> p.stats[k] = {added:0});
  for(let i=0;i<budget;i++){ p.stats[keys[Math.floor(Math.random()*keys.length)]].added++; }
}
const ENC_GENDERS = ["Male","Female"];
/* roll a Pokémon's random identity: nature, gender, shiny (Core p.212: 1d100, Shiny on a 1 or 100), stats */
function encRandomize(p){
  p.nature = D.natures[Math.floor(Math.random()*D.natures.length)].name;
  p.gender = ENC_GENDERS[Math.floor(Math.random()*ENC_GENDERS.length)];
  const roll = 1 + Math.floor(Math.random()*100);
  p.shiny = (roll===1 || roll===100);
  encSpreadStats(p);
}
/* send an encounter Pokémon to the shared PC (i.e. it's been caught) and remove it from the field */
async function sendEncMonToPC(enc, p, list){
  if(mode!=="cloud"){ toast("Join the campaign (☁ cloud) to send Pokémon to the shared PC"); return; }
  ensurePCRow();
  const m = normPokemon(JSON.parse(JSON.stringify(p)));
  m.id = uid(); m.onTeam = false; m.currentHP = null; delete m.encFav;
  m._pcFrom = "Encounter"+(enc.name?": "+enc.name:""); m._pcAt = Date.now();
  cloud.pc.data.pokemon.push(m);
  const i = list.indexOf(p); if(i>=0) list.splice(i,1);   // caught → leaves the encounter
  saveEnc(); toast(`Caught ${encMonName(p)} → sent to the PC ✓`); renderEncounters();
  if(!await pcUpsert()) toast("⚠ PC sync issue — it'll reconcile on the next change");
}
/* compact, expandable status-condition toggles for an encounter Pokémon */
function encStatusControl(p){
  if(!Array.isArray(p.statuses)) p.statuses=[];
  const sp=getSpecies(p.species);
  const active=STATUS_DEFS.filter(s=>hasStatus(p,s.key));
  const det=el("details",{class:"spoiler",style:"margin-top:8px"});
  det.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"},"Status Conditions"),
    el("span",{class:"muted small",style:"margin-left:8px"}, active.length?active.map(s=>s.name).join(", "):"none"),
    active.length?el("button",{class:"linkbtn",style:"float:right",onclick:e=>{ e.preventDefault(); p.statuses=[]; saveEnc(); renderEncounters(); }},"clear"):""));
  const body=el("div",{style:"margin-top:6px"});
  [["persistent","Persistent · +10 catch"],["volatile","Volatile · +5"],["other","Other"]].forEach(([kind,label])=>{
    const chips=el("div",{class:"chips"});
    STATUS_DEFS.filter(s=>s.kind===kind).forEach(s=>{
      const on=hasStatus(p,s.key), immune=s.immune && sp?.types?.some(t=>s.immune.includes(t));
      chips.append(el("button",{class:"statuschip"+(on?" on":""), title:(immune?`${sp.name} is immune. `:"")+s.effect,
        onclick:()=>{ p.statuses=p.statuses||[]; const i=p.statuses.indexOf(s.key); if(i>=0)p.statuses.splice(i,1); else p.statuses.push(s.key); saveEnc(); renderEncounters(); }}, s.name+(immune?" ⃠":"")));
    });
    body.append(el("div",{class:"small muted",style:"font-weight:700;margin:4px 0 2px"},label), chips);
  });
  det.append(body);
  return det;
}
/* minimize/expand a single encounter Pokémon (focus the active one, tuck away fainted ones) */
function encMonToggleMin(p){ p.encMin=!p.encMin; saveEnc(); renderEncounters(); }
/* collapse every fainted (HP ≤ 0) Pokémon in a list at once */
function encCollapseFainted(list){ let n=0; (list||[]).forEach(p=>{ if((p.currentHP??1)<=0 && !p.encMin){ p.encMin=true; n++; } }); if(n){ saveEnc(); renderEncounters(); } else toast("No fainted Pokémon to collapse"); }
/* a small ▾ minimize + × remove control shared by the collapsed & expanded views */
function encMonRemoveBtn(p,list){ return el("button",{class:"x",style:"cursor:pointer;color:var(--muted);font-size:18px;line-height:1",title:"remove",
  onclick:()=>{ const i=list.indexOf(p); if(i>=0){ list.splice(i,1); saveEnc(); renderEncounters(); } }},"×"); }
function encounterMonCard(enc, p, list){
  normPokemon(p);
  const sp=getSpecies(p.species), d=pokeDerived(p), maxHP=d.maxHP;
  if(p.currentHP==null) p.currentHP=maxHP;
  const fainted = p.currentHP<=0;
  const pct=Math.max(0,Math.min(100,Math.round(p.currentHP/maxHP*100)));
  const hpColor = pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)";
  // ---- Collapsed (minimized) view: sprite · name · level · mini HP bar, expand + remove ----
  if(p.encMin){
    const mini=el("div",{style:`border:1px solid var(--line);border-radius:var(--radius-sm);padding:6px 10px;margin-top:8px;background:var(--panel-2);${fainted?"opacity:.5;":""}`});
    const row=el("div",{class:"inline",style:"gap:8px;align-items:center"});
    row.append(monSprite(p.species,p.shiny,"s-sm",p.image||undefined));
    row.append(el("span",{style:"font-weight:800;white-space:nowrap"}, (fainted?"💀 ":"")+encMonName(p)));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `Lv ${p.level}`));
    row.append(el("div",{class:"hpbar",style:"flex:1;min-width:70px"}, el("i",{style:`width:${pct}%;background:${hpColor}`})));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `${p.currentHP}/${maxHP}`));
    row.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"expand",onclick:()=>encMonToggleMin(p)},"▸"));
    row.append(encMonRemoveBtn(p,list));
    mini.append(row);
    return mini;
  }
  const card=el("div",{style:`border:1px solid ${fainted?"var(--bad)":"var(--line)"};border-radius:var(--radius-sm);padding:10px;margin-top:8px;background:var(--panel-2);${fainted?"opacity:.7;":""}`});
  const head=el("div",{class:"inline",style:"gap:10px;align-items:flex-start"});
  // sprite with a 📷 overlay (same affordance as the Pokémon sheet) — this is the map token's picture
  const spriteBox=el("div",{class:"sprite-box sb-sm",style:"flex:0 0 auto"});
  spriteBox.append(monSprite(p.species,p.shiny,"s-sm",p.image||undefined));
  spriteBox.append(el("button",{class:"photo-btn",title:"picture used for this creature's map token",
    onclick:()=>pickImage(256, url=>{ p.image=url; saveEnc(); renderEncounters(); })},"📷"));
  if(p.image) spriteBox.append(el("button",{class:"photo-rm",title:"remove picture — use the default sprite",
    onclick:()=>{ p.image=""; saveEnc(); renderEncounters(); }},"×"));
  head.append(spriteBox);
  const nw=el("div",{style:"flex:1;min-width:0"});
  nw.append(el("div",{style:"font-weight:800"}, (fainted?"💀 ":"")+encMonName(p), " ", el("span",{html:(sp?.types||[]).map(typeBadge).join(" ")})));
  const lvIn=el("input",{type:"number",min:1,max:100,value:p.level,style:"width:60px",title:"level"});
  lvIn.addEventListener("change",()=>{ const l=Math.max(1,Math.min(100,parseInt(lvIn.value)||1)); p.level=l; p.xp=xpForLevel(l); encSpreadStats(p); p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); });
  nw.append(el("div",{class:"small muted",style:"margin-top:3px;display:flex;gap:6px;align-items:center;flex-wrap:wrap"},
    "Lv", lvIn, `· ${p.nature||"—"} · ${p.gender||"—"}${p.shiny?" · ✨Shiny":""}`));
  nw.append(el("div",{class:"small muted",style:"margin-top:2px"}, `Atk ${d.eff.atk} · SpA ${d.eff.spatk} · Def ${d.eff.def} · SpD ${d.eff.spdef} · Spd ${d.eff.spd}`));
  nw.append(el("div",{class:"small muted",style:"margin-top:2px"}, `Evasion — Phys +${d.physEva} · Spec +${d.specEva} · Speed +${d.spdEva}`));
  head.append(nw);
  head.append(el("button",{class:"btn-secondary",style:"padding:3px 9px;align-self:flex-start",title:"minimize",onclick:()=>encMonToggleMin(p)},"▾"));
  head.append(encMonRemoveBtn(p,list));
  card.append(head);
  // HP tracker
  const setHP=v=>{ p.currentHP=Math.max(-99,Math.min(maxHP,v)); saveEnc(); renderEncounters(); };
  card.append(el("div",{class:"inline",style:"gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap"},
    el("span",{class:"small muted",style:"font-weight:700;white-space:nowrap"}, `HP ${p.currentHP}/${maxHP}`),
    el("div",{class:"hpbar",style:"flex:1;min-width:120px"}, el("i",{style:`width:${pct}%;background:${hpColor}`})),
    el("button",{class:"linkbtn",style:"padding:2px 6px",title:"full heal",onclick:()=>setHP(maxHP)},"MAX")));
  card.append(damageHealRow(()=>p.currentHP, setHP));
  // GM actions: reroll identity, toggle shiny, Catch DC, send to PC (caught)
  const actRow=el("div",{class:"inline",style:"gap:6px;margin-top:8px;flex-wrap:wrap"});
  actRow.append(
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"re-roll nature, gender, shiny & stat spread",
      onclick:()=>{ encRandomize(p); p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); }},"🎲 Reroll"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"toggle shiny",
      onclick:()=>{ p.shiny=!p.shiny; saveEnc(); renderEncounters(); }}, p.shiny?"✨ Shiny":"Shiny?"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"capture DC",onclick:()=>catchDCModal(p)},"🎯 Catch DC"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"send to the shared PC (caught)",onclick:()=>sendEncMonToPC(enc,p,list)},"🎣 To PC"));
  card.append(actRow);
  card.append(encStatusControl(p));
  // moves — favourites first, each rollable
  const favSet=new Set(p.encFav||[]);
  const mw=el("div",{style:"margin-top:8px"});
  mw.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("span",{class:"small muted",style:"font-weight:700"},"Actions — tap 🎲 to roll"),
    el("button",{class:"linkbtn",onclick:()=>addEncMove(p,sp)},"+ move")));
  const st=struggleFor(p,sp); if(st) mw.append(encounterMoveRow(p,sp,st,st.name,favSet,null,true));
  const ordered=[...p.moves].sort((a,b)=>(favSet.has(b)?1:0)-(favSet.has(a)?1:0));
  ordered.forEach(mn=>{ const m=moveByName.get(mn.toLowerCase());
    mw.append(encounterMoveRow(p,sp,m,mn,favSet,()=>{ p.encFav=toggleSet(favSet,mn); saveEnc(); renderEncounters(); })); });
  card.append(mw);
  // abilities — addable, each expandable to explain what it does
  const aw=el("div",{style:"margin-top:8px"});
  aw.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("span",{class:"small muted",style:"font-weight:700"},`Abilities (${p.abilities.length})`),
    el("button",{class:"linkbtn",onclick:()=>addEncAbility(p,sp)},"+ ability")));
  if(!p.abilities.length) aw.append(el("span",{class:"muted small"},"none — tap + ability"));
  p.abilities.forEach(an=> aw.append(encounterAbilityRow(p,an)));
  card.append(aw);
  return card;
}
function encounterTrainerCard(enc, tr){
  const t=tr.trainer; normTrainer(t);
  const card=el("div",{style:"border:1px solid var(--accent);border-radius:var(--radius-sm);padding:10px;margin-top:8px"});
  const head=el("div",{class:"inline",style:"gap:8px;justify-content:space-between;flex-wrap:wrap"});
  const info=el("div",{class:"inline",style:"gap:8px;align-items:center;flex-wrap:wrap"});
  const nameIn=el("input",{value:t.name||"",placeholder:"Trainer name",style:"font-weight:800;width:150px"});
  nameIn.addEventListener("change",()=>{ t.name=nameIn.value; saveEnc(); renderEncounters(); });
  const lvIn=el("input",{type:"number",min:1,max:100,value:t.level,style:"width:58px",title:"trainer level"});
  lvIn.addEventListener("change",()=>{ t.level=Math.max(1,parseInt(lvIn.value)||1); saveEnc(); });
  const av = el("img",{src:t.avatar||TRAINER_PLACEHOLDER,alt:"",
    style:"width:32px;height:32px;border-radius:50%;object-fit:cover;border:1px solid var(--line);background:var(--panel-2)"});
  info.append(av, nameIn, el("span",{class:"small muted"},"Lv"), lvIn,
    el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"picture used for this trainer's map token",
      onclick:()=>pickImage(256, d=>{ t.avatar=d; saveEnc(); renderEncounters(); })}, t.avatar?"📷 Change":"📷 Image"));
  if(t.avatar) info.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"remove image — use the default icon",
    onclick:()=>{ t.avatar=""; saveEnc(); renderEncounters(); }},"×"));
  head.append(info);
  head.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted);font-size:18px;line-height:1",title:"remove trainer",
    onclick:()=>{ enc.trainers=enc.trainers.filter(x=>x.id!==tr.id); saveEnc(); renderEncounters(); }},"×"));
  card.append(head);
  // trainer HP + Struggle roll
  const td=trainerDerived(t), maxHP=td.hp; if(t.currentHP==null) t.currentHP=maxHP;
  card.append(el("div",{class:"small muted",style:"margin-top:4px"},
    `Evasion — Phys +${td.physEva} · Spec +${td.specEva} · Speed +${td.spdEva}`));
  const setHP=v=>{ t.currentHP=Math.max(-99,Math.min(maxHP,v)); saveEnc(); renderEncounters(); };
  const pct=Math.max(0,Math.min(100,Math.round(t.currentHP/maxHP*100)));
  card.append(el("div",{class:"inline",style:"gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap"},
    el("span",{class:"small muted",style:"font-weight:700;white-space:nowrap"}, `HP ${t.currentHP}/${maxHP}`),
    el("div",{class:"hpbar",style:"flex:1;min-width:120px"}, el("i",{style:`width:${pct}%;background:${pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"}`}))));
  card.append(damageHealRow(()=>t.currentHP, setHP));
  // Attacks: unarmed Struggle + one slot per weapon (+ its Weapon Move) — reuses the Sheet's slots
  const atkWrap=el("div",{style:"margin-top:8px"});
  atkWrap.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:2px"},"⚔ Attacks"));
  atkWrap.append(trainerAttackSlot(t, trainerStruggle(t), ()=>openTrainerAttack(t), {tag:"unarmed"}));
  (t.weapons||[]).forEach(w=>{
    atkWrap.append(trainerAttackSlot(t, trainerStruggle(t,w), ()=>openTrainerAttack(t,null,w), {tag:w.category}));
    if(w.notes) atkWrap.append(el("div",{class:"small muted",style:"margin:-2px 0 4px 6px"}, "↳ "+w.notes));
    if(w.weaponMove){ const wm=trainerAttackProfile(t,w.weaponMove,w);
      atkWrap.append(trainerAttackSlot(t, wm, ()=>openTrainerAttack(t,w.weaponMove,w), {tag:"weapon move", move:true})); }
  });
  card.append(atkWrap);
  // Trainer Moves — combat Moves granted by their Features/class, each rollable (adds Attack)
  if(!Array.isArray(t.encMoves)) t.encMoves=[];
  const tmw=el("div",{style:"margin-top:8px"});
  tmw.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("span",{class:"small muted",style:"font-weight:700"},`Trainer Moves (${t.encMoves.length})`),
    el("button",{class:"linkbtn",onclick:()=>addEncTrainerMove(t)},"+ move")));
  if(!t.encMoves.length) tmw.append(el("span",{class:"muted small"},"none — Moves from their Features/class; tap + move"));
  t.encMoves.forEach(mn=>{
    const m=moveByName.get(mn.toLowerCase());
    const prof = m ? trainerAttackProfile(t, mn) : {name:mn+" (not in DB)",type:"Normal",cls:"?",ac:"—",damageBase:"—",range:"—"};
    const slot = trainerAttackSlot(t, prof, ()=> m?openTrainerAttack(t,mn):toast("Not in the move database"), {move:!!m});
    const acts = slot.querySelector(".inline");
    if(acts) acts.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted)",title:"remove move",
      onclick:()=>{ t.encMoves=t.encMoves.filter(x=>x!==mn); saveEnc(); renderEncounters(); }},"×"));
    tmw.append(slot);
  });
  card.append(tmw);
  // Classes, Features, Edges & Abilities — what the trainer actually IS. Without this the
  // card showed only stats/moves, so an imported NPC's whole build was invisible to the GM.
  // Trainer abilities (granted by class Features — Martial Artist's Guts, Sage's Probability
  // Control) have no home on the trainer model, so they live in t.encAbilities, lazily inited
  // here like t.encMoves so cloud player sheets never gain the field.
  if(!Array.isArray(t.encAbilities)) t.encAbilities=[];
  const build=el("div",{style:"margin-top:8px"});
  [["classes","Classes","class",   ()=>D.classes.map(c=>c.name)],
   ["features","Features","feature",()=>D.features.map(f=>f.name)],
   ["edges","Edges","edge",        ()=>D.edges.map(e=>e.name)],
   ["encAbilities","Abilities","ability",()=>D.abilities.map(a=>a.name)],
  ].forEach(([field,label,kind,opts])=>{
    if(!Array.isArray(t[field])) t[field]=[];
    const list=t[field];
    build.append(el("div",{class:"inline",style:"justify-content:space-between;margin-top:6px"},
      el("span",{class:"small muted",style:"font-weight:700"},`${label} (${list.length})`),
      el("button",{class:"linkbtn",onclick:()=>openPicker(`Add a ${label.replace(/e?s$/,"")}`,
        opts().filter(n=>!list.includes(n)),
        name=>{ list.push(name); saveEnc(); renderEncounters(); }, kind)},"+ add")));
    if(!list.length){ build.append(el("span",{class:"muted small"},"none")); return; }
    list.forEach(n=> build.append(encTrainerRefRow(n, kind,
      ()=>{ t[field]=list.filter(x=>x!==n); saveEnc(); renderEncounters(); })));
  });
  card.append(build);
  // Skills — trained ones with their dice, for quick GM checks
  const trained=SKILLS.filter(([k])=> (t.skills?.[k]||"Untrained")!=="Untrained");
  if(trained.length){
    const chips=el("div",{class:"chips",style:"margin-top:4px"});
    trained.forEach(([k,l])=> chips.append(el("span",{class:"kv",title:t.skills[k]}, `${l} ${rankDice(t.skills[k])}d6`)));
    card.append(el("div",{class:"small muted",style:"font-weight:700;margin-top:8px"},"Skills"), chips);
  }
  // trainer's Pokémon
  const tmonFainted=tr.pokemon.some(p=>(p.currentHP??1)<=0 && !p.encMin);
  card.append(el("div",{class:"inline",style:"justify-content:space-between;margin-top:10px;gap:8px;flex-wrap:wrap"},
    el("span",{class:"small muted",style:"font-weight:700"},`${t.name||"Trainer"}'s Pokémon (${tr.pokemon.length})`),
    el("div",{class:"inline",style:"gap:8px"},
      tmonFainted?el("button",{class:"linkbtn",title:"minimize all fainted",onclick:()=>encCollapseFainted(tr.pokemon)},"▾ fainted"):"",
      el("button",{class:"linkbtn",onclick:()=>addEncounterMon(enc, tr.pokemon)},"+ add Pokémon"))));
  tr.pokemon.forEach(p=> card.append(encounterMonCard(enc, p, tr.pokemon)));
  return card;
}
function openExpCalc(enc){
  const body=el("div",{});
  const rows=[];
  (enc.mons||[]).forEach(p=> rows.push([encMonName(p)+" · wild", `Lv ${p.level}`, p.level]));
  (enc.trainers||[]).forEach(tr=>{
    rows.push([(tr.trainer?.name||"Trainer")+" · Trainer", `Lv ${tr.trainer?.level} × 2`, (tr.trainer?.level||0)*2]);
    (tr.pokemon||[]).forEach(p=> rows.push(["↳ "+encMonName(p), `Lv ${p.level}`, p.level]));
  });
  const base=encounterBaseXP(enc);
  const tbl=el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
  if(!rows.length) tbl.append(el("span",{class:"muted"},"No combatants yet — add some enemies first."));
  rows.forEach(r=> tbl.append(el("div",{class:"inline",style:"justify-content:space-between;gap:8px"},
    el("span",{}, r[0]), el("span",{class:"muted small"}, `${r[1]} = ${r[2]}`))));
  tbl.append(el("div",{class:"inline",style:"justify-content:space-between;gap:8px;border-top:1px solid var(--line);margin-top:6px;padding-top:6px;font-weight:800"},
    el("span",{},"Base Experience Value"), el("span",{}, String(base))));
  body.append(tbl);
  const sigIn=el("input",{type:"number",min:1,step:0.5,value:enc.sig});
  const plIn =el("input",{type:"number",min:1,value:enc.players});
  const lbl=(txt,node,hint)=>el("label",{class:"field"}, el("span",{}, txt), node, hint?el("span",{class:"small muted",style:"font-weight:400"},hint):"");
  const inRow=el("div",{class:"fieldrow"});
  inRow.append(lbl("Significance ×",sigIn,"1–1.5 minor · 2–3 average · 4–5 major"), lbl("Players sharing XP",plIn,"count Players, not Pokémon"));
  const out=el("div",{class:"card",style:"margin:0"});
  const recalc=()=>{
    const sig=Math.max(0,parseFloat(sigIn.value)||0), pl=Math.max(1,parseInt(plIn.value)||1);
    enc.sig=sig; enc.players=pl; saveEnc();
    const total=Math.round(base*sig), per=Math.round(total/pl);
    out.innerHTML="";
    out.append(
      el("div",{style:"font-size:15px"}, `${base} Base × ${sig} significance = `, el("b",{}, String(total)), " total XP"),
      el("div",{style:"font-size:22px;font-weight:800;margin-top:6px;color:var(--accent)"}, `${per} XP per player`),
      el("div",{class:"small muted",style:"margin-top:4px"}, `${total} ÷ ${pl} player${pl===1?"":"s"}. Each player then splits their share among the Pokémon they used (Core p.460).`));
  };
  sigIn.addEventListener("input",recalc); plIn.addEventListener("input",recalc);
  body.append(inRow, out); recalc();
  modal({title:`🧮 EXP — ${enc.name}`, bodyNode:body});
}
function renderEncounters(){
  const root=$("#view-encounters"); root.innerHTML="";
  const arr=encList();
  const bar=el("div",{class:"card"});
  const top=el("div",{class:"inline",style:"gap:8px;flex-wrap:wrap;justify-content:space-between"});
  const leftc=el("div",{class:"inline",style:"gap:6px;flex-wrap:wrap"});
  const sel=el("select",{title:"Active encounter"});
  if(!arr.length) sel.append(el("option",{value:""},"— no encounters —"));
  const cur=activeEncounter();
  arr.forEach(e=> sel.append(el("option",{value:e.id, selected:e.id===cur?.id}, e.name||"(unnamed)")));
  sel.addEventListener("change",()=>{ state.activeEncounterId=sel.value; saveEnc(); renderEncounters(); });
  leftc.append(sel);
  leftc.append(el("button",{class:"btn ghost",onclick:()=>{ const n=prompt("Encounter name:","New Encounter"); if(n===null)return; const e=newEncounter(n||"New Encounter"); arr.push(e); state.activeEncounterId=e.id; saveEnc(); renderEncounters(); }},"＋ New"));
  if(cur){
    leftc.append(el("button",{class:"btn ghost",title:"rename",onclick:()=>{ const n=prompt("Rename encounter:",cur.name); if(n===null)return; cur.name=n; saveEnc(); renderEncounters(); }},"✎"));
    leftc.append(el("button",{class:"btn ghost danger",title:"delete",onclick:()=>{ if(!confirm(`Delete encounter "${cur.name}"?`))return; const i=arr.findIndex(x=>x.id===cur.id); if(i>=0)arr.splice(i,1); state.activeEncounterId=arr[0]?.id||null; saveEnc(); renderEncounters(); }},"🗑"));
  }
  // port encounters saved on THIS device (pre-cloud) up into the campaign cloud
  if(mode==="cloud" && cloud.isGM && (state.encounters?.length)){
    const have = new Set(arr.map(e=>e.id));
    const pending = state.encounters.filter(e=>e && !have.has(e.id));
    if(pending.length) leftc.append(el("button",{class:"btn ghost",title:"copy encounters saved on this device into the campaign cloud",
      onclick:()=>{ pending.forEach(e=>{ const c=JSON.parse(JSON.stringify(e)); normEncounter(c); arr.push(c); });
        if(!state.activeEncounterId) state.activeEncounterId=arr[0]?.id||null; saveEnc();
        toast(`Imported ${pending.length} device encounter${pending.length>1?"s":""} to the cloud ✓`); renderEncounters(); }},
      `⬆ Import ${pending.length} from device`));
  }
  top.append(leftc, el("span",{class:"small muted"}, mode==="cloud"?"GM only · synced to the campaign":"GM only · saved on this device"));
  bar.append(top); root.append(bar);
  if(!cur){ root.append(el("div",{class:"card"}, el("span",{class:"muted"},"No encounter yet — tap ＋ New to build one, then add Trainers and wild Pokémon."))); return; }
  // settings + EXP
  const setc=el("div",{class:"card"});
  setc.append(el("h3",{}, cur.name,
    el("button",{class:"btn-primary",style:"padding:6px 12px",onclick:()=>openExpCalc(cur)},"🧮 Calculate EXP")));
  setc.append(el("div",{class:"small muted",style:"margin-top:4px"}, `Base XP so far: `, el("b",{}, String(encounterBaseXP(cur))), ` (sum of enemy levels; Trainers count double). Significance ×${cur.sig}, ${cur.players} player${cur.players===1?"":"s"} — edit in Calculate EXP.`));
  root.append(setc);
  // wild Pokémon
  const wildFainted=cur.mons.some(p=>(p.currentHP??1)<=0 && !p.encMin);
  const mc=el("div",{class:"card"}, el("h3",{},`Wild Pokémon (${cur.mons.length})`,
    wildFainted?el("button",{class:"linkbtn h-act",title:"minimize all fainted",onclick:()=>encCollapseFainted(cur.mons)},"▾ fainted"):"",
    el("button",{class:"linkbtn h-act",onclick:()=>addEncounterMon(cur)},"+ add Pokémon")));
  if(!cur.mons.length) mc.append(el("span",{class:"muted small"},"none — add a wild Pokémon; it comes pre-loaded with level-up moves."));
  cur.mons.forEach(p=> mc.append(encounterMonCard(cur, p, cur.mons)));
  root.append(mc);
  // trainers
  const tc=el("div",{class:"card"}, el("h3",{},`Trainers (${cur.trainers.length})`,
    el("button",{class:"linkbtn h-act",onclick:()=>addEncounterTrainer(cur)},"+ add Trainer")));
  if(!cur.trainers.length) tc.append(el("span",{class:"muted small"},"none — add a Trainer NPC and give them Pokémon."));
  cur.trainers.forEach(tr=> tc.append(encounterTrainerCard(cur, tr)));
  root.append(tc);
}

/* ===================================================================
   REFERENCE VIEW  (Dex / Moves / Abilities / Items browsers)
=================================================================== */
let refSub = "species", refQuery = "";
function renderReference(){
  const root = $("#view-reference"); root.innerHTML="";
  const bar = el("div",{class:"searchbar"});
  const inp = el("input",{type:"search",placeholder:"Search…"}); inp.value=refQuery;
  inp.addEventListener("input",()=>{ refQuery=inp.value; drawRefList(); });
  bar.append(inp);
  const sub = el("div",{class:"refsub"});
  [["species","Pokédex"],["move","Moves"],["ability","Abilities"],["item","Items"],
   ["feature","Features"],["edge","Edges"],["nature","Natures"]].forEach(([k,l])=>{
    sub.append(el("button",{class:refSub===k?"on":"",onclick:()=>{refSub=k;drawRefList();$$(".refsub button").forEach(b=>b.classList.toggle("on",b.textContent===l));}},l));
  });
  bar.append(sub);
  root.append(bar);
  root.append(el("div",{class:"reflist",id:"refList"}));
  drawRefList();
}
function drawRefList(){
  const list = $("#refList"); if(!list) return; list.innerHTML="";
  const q = refQuery.trim().toLowerCase();
  let rows = [];
  const match = s => !q || String(s).toLowerCase().includes(q);
  if(refSub==="species") rows = D.species.filter(s=>match(s.name)||s.types?.some(match)).slice(0,300).map(s=>refSpecies(s));
  else if(refSub==="move") rows = D.moves.filter(m=>match(m.name)||match(m.type)).slice(0,300).map(m=>refMove(m));
  else if(refSub==="ability") rows = D.abilities.filter(a=>match(a.name)||match(a.effect)).slice(0,300).map(a=>refAbility(a));
  else if(refSub==="item") rows = allItems().filter(i=>match(i.name)||match(i.effect)).slice(0,300).map(i=>refGeneric(i.name,i.cat,i.effect));
  else if(refSub==="feature") rows = D.features.filter(f=>match(f.name)||match(f.category)).slice(0,300).map(f=>refGeneric(f.name,`${f.category||""} · ${f.frequency||""}`,f.effect,f.prerequisites));
  else if(refSub==="edge") rows = D.edges.filter(e=>match(e.name)).slice(0,300).map(e=>refGeneric(e.name,e.category,e.effect,e.prerequisites));
  else if(refSub==="nature") rows = D.natures.filter(n=>match(n.name)).map(n=>refGeneric(n.name,natSummary(n),`Likes ${n.likedFlavor}, dislikes ${n.dislikedFlavor}`));
  if(!rows.length) list.append(el("div",{class:"muted"},"no matches"));
  rows.forEach(r=>list.append(r));
}
function allItems(){
  return [
    ...D.items.held.map(x=>({...x,cat:"Held Item"})),
    ...D.items.food.map(x=>({...x,cat:"Food / Buff"})),
    ...D.items.capabilities.map(x=>({...x,cat:"Capability"})),
    ...D.items.weather.map(x=>({...x,cat:"Weather"})),
  ];
}
function refSpecies(s){
  const it = el("div",{class:"refitem",style:"display:flex;gap:10px;align-items:center",onclick:()=>openRefDetail("species",s.name)});
  it.append(monSprite(s.name,false,"s-sm"));
  it.append(el("div",{style:"flex:1;min-width:0",html:
    `<div class="r-title">#${s.order} ${esc(s.name)} ${(s.types||[]).map(typeBadge).join(" ")}</div>
     <div class="r-meta">HP ${s.baseStats.hp} · Atk ${s.baseStats.atk} · Def ${s.baseStats.def} · SpA ${s.baseStats.spatk} · SpD ${s.baseStats.spdef} · Spe ${s.baseStats.spd}</div>`}));
  return it;
}
function refMove(m){
  const it = el("div",{class:"refitem",onclick:()=>openRefDetail("move",m.name)});
  it.innerHTML = `<div class="r-title">${m.name} ${typeBadge(m.type||"Normal")}</div>
    <div class="r-meta">${moveLineShort(m)}</div>`;
  return it;
}
function refAbility(a){
  const it = el("div",{class:"refitem"});
  it.innerHTML = `<div class="r-title">${a.name}</div><div class="r-meta">${a.frequency||""}${a.keywords?" · "+a.keywords:""}</div>
    <div class="r-body">${esc(a.effect||"")}</div>`;
  return it;
}
function refGeneric(name, meta, body, prereq){
  const it = el("div",{class:"refitem"});
  it.innerHTML = `<div class="r-title">${esc(name)}</div>${meta?`<div class="r-meta">${esc(meta)}</div>`:""}
    ${prereq?`<div class="r-meta">Prereq: ${esc(prereq)}</div>`:""}${body?`<div class="r-body">${esc(body)}</div>`:""}`;
  return it;
}
const esc = s => String(s??"").replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

/* ===================================================================
   Detail popups
=================================================================== */
function refDetailHTML(kind, name){
  if(kind==="move"){ return moveDetailHTML(moveByName.get(name.toLowerCase()), name); }
  if(kind==="ability"){ const a=abilityByName.get(name.toLowerCase()); return a?abilityText(a):"<span class='muted'>Not in database.</span>"; }
  if(kind==="class"){ const c=D.classes.find(x=>x.name===name);
    return c?`${c.mechanic?`<div class="r-meta"><b>${esc(c.mechanic)}</b></div>`:""}<div class="r-body">${esc(c.effect||"")}</div>`:"<span class='muted'>—</span>"; }
  if(kind==="edge"){ const e=D.edges.find(x=>x.name===name);
    return e?`${e.prerequisites?`<div class="r-meta">Prereq: ${esc(e.prerequisites)}</div>`:""}<div class="r-body">${esc(e.effect||"")}</div>`:"<span class='muted'>—</span>"; }
  if(kind==="feature"){ const f=D.features.find(x=>x.name===name);
    return f?`<div class="r-meta">${esc(f.category||"")}${f.frequency?" · "+esc(f.frequency):""}</div>${f.prerequisites?`<div class="r-meta">Prereq: ${esc(f.prerequisites)}</div>`:""}<div class="r-body">${esc(f.effect||"")}</div>`:"<span class='muted'>—</span>"; }
  return "<span class='muted'>—</span>";
}
function openRefDetail(kind, name){
  if(kind==="species") return speciesModal(getSpecies(name));
  infoModal(name, refDetailHTML(kind, name));
}
function abilityText(a){
  return `<div class="r-meta">${esc(a.frequency||"")}${a.keywords?" · "+esc(a.keywords):""}</div>
    ${a.trigger?`<div class="r-body"><b>Trigger:</b> ${esc(a.trigger)}</div>`:""}
    <div class="r-body">${esc(a.effect||"")}</div>`;
}
function moveDetailHTML(m, name){
  if(!m) return "Not in database.";
  const kv = (l,v)=> v!=null&&v!==""?`<span class="kv">${l}: ${esc(v)}</span>`:"";
  return `<div style="margin-bottom:6px">${typeBadge(m.type||"Normal")} <span class="kv">${esc(m.class||"")}</span></div>
    ${kv("Frequency",m.frequency)}${kv("AC",m.ac)}${m.damageBase?`<span class="kv">DB ${m.damageBase} (${DB_TABLE[m.damageBase]||"?"})</span>`:""}${kv("Range",m.range)}
    <div class="r-body" style="margin-top:8px">${esc(m.effect||"")}</div>
    ${(m.contest && showContest())?`<div class="r-meta" style="margin-top:6px">Contest: ${esc(m.contest)}</div>`:""}`;
}
/* device-level display prefs */
function showContest(){ return localStorage.getItem("ptu_show_contest")==="1"; }
/* GM-only tools show when connected as a cloud GM, or when local "GM mode" is enabled */
function isGM(){ return mode==="cloud" ? !!cloud.isGM : localStorage.getItem("ptu_gm_mode")==="1"; }
function openSettings(){
  const wrap = el("div",{});
  const mk = (label, key, hint) => {
    const row = el("label",{class:"inline",style:"gap:10px;align-items:flex-start;padding:8px 0;cursor:pointer"});
    const cb = el("input",{type:"checkbox"}); cb.checked = localStorage.getItem(key)==="1";
    cb.addEventListener("change",()=>{ localStorage.setItem(key, cb.checked?"1":"0"); render();
      if($("#view-reference")?.classList.contains("active")) renderReference(); });
    row.append(cb, el("div",{}, el("div",{style:"font-weight:700"},label),
      hint?el("div",{class:"small muted"},hint):""));
    return row;
  };
  wrap.append(mk("GM mode", "ptu_gm_mode",
    "Show GM-only tools on this device (Catch DC, catch-rate notes). In a cloud campaign this follows your GM code automatically."));
  wrap.append(mk("Show Contest stats", "ptu_show_contest",
    "Display each move's Contest type/effect in its details (Cool, Tough, etc.). Off by default."));
  modal({title:"⚙ Settings", bodyNode:wrap, footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Done")]});
}
function speciesModal(s){
  if(!s) return;
  const bs=s.baseStats;
  let html = `<div style="display:flex;gap:12px;align-items:center;margin-bottom:10px">
      <img class="sprite s-lg" loading="lazy" src="${spriteUrl(s.name,false)}" alt="${esc(s.name)}" onerror="this.onerror=null;this.src='${POKEBALL_SVG}';this.classList.add('fallback')">
      <div><div style="margin-bottom:6px">${(s.types||[]).map(typeBadge).join(" ")}</div>
      <span class="kv">${esc(s.size||"")}</span> <span class="kv">WC ${s.weightClass??"?"}</span>
      ${s.height?`<div class="r-meta" style="margin-top:4px">${esc(s.height)}</div>`:""}</div>
    </div>
    <div class="statgrid" style="margin-bottom:10px">
      ${STATS.map(([k,l])=>`<div class="stat"><div class="lbl">${l}</div><div class="big">${bs[k]??"?"}</div></div>`).join("")}
    </div>`;
  const caps=[]; const c=s.capabilities||{};
  if(c.overland)caps.push(`Overland ${c.overland}`); if(c.sky)caps.push(`Sky ${c.sky}`); if(c.swim)caps.push(`Swim ${c.swim}`);
  if(c.levitate)caps.push(`Levitate ${c.levitate}`); if(c.burrow)caps.push(`Burrow ${c.burrow}`);
  caps.push(`Jump ${c.highJump}/${c.longJump}`,`Power ${c.power}`);
  if(c.naturewalk?.length)caps.push(`Naturewalk (${c.naturewalk.join(", ")})`);
  (c.other||[]).forEach(o=>caps.push(o));
  html += `<div class="chips" style="margin-bottom:10px">${caps.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>`;
  html += `<div class="r-meta">Abilities</div><div class="chips" style="margin-bottom:10px">
    ${s.abilities.basic.map(a=>`<span class="chip">${esc(a)} <span class="small muted">basic</span></span>`).join("")}
    ${s.abilities.advanced.map(a=>`<span class="chip">${esc(a)} <span class="small muted">adv</span></span>`).join("")}
    ${s.abilities.high.map(a=>`<span class="chip">${esc(a)} <span class="small muted">high</span></span>`).join("")}</div>`;
  if(s.evolution?.length>1) html += `<div class="r-meta">Evolution</div><div class="r-body" style="margin-bottom:10px">${s.evolution.map(e=>`${e.stage}. ${esc(e.name)}${e.min?` (Lv ${e.min})`:""}`).join("  →  ")}</div>`;
  // move lists
  if(s.moves){
    if(s.moves.levelup.length){
      html += `<details class="spoiler" open><summary>Level-Up Moves (${s.moves.levelup.length})</summary>
        <table class="movetable" style="margin-top:6px"><tr><th>Lv</th><th>Move</th><th>Type</th></tr>
        ${s.moves.levelup.map(m=>`<tr><td>${m.level}</td><td>${esc(m.name)}</td><td>${typeBadge(m.type)}</td></tr>`).join("")}</table></details>`;
    }
    const others=[["TM/HM",s.moves.tmhm],["Egg",s.moves.egg],["Tutor",s.moves.tutor]];
    others.forEach(([l,arr])=>{ if(arr?.length) html+=`<details class="spoiler"><summary>${l} Moves (${arr.length})</summary><div class="r-body">${arr.map(esc).join(", ")}</div></details>`; });
  }
  const meta=[]; if(s.diet)meta.push("Diet: "+s.diet); if(s.habitat)meta.push("Habitat: "+s.habitat); if(s.gender)meta.push(s.gender); if(s.eggGroups?.length)meta.push("Egg: "+s.eggGroups.join("/"));
  if(meta.length) html+=`<div class="r-meta" style="margin-top:8px">${esc(meta.join(" · "))}</div>`;
  infoModal(`#${s.order} ${s.name}`, html);
}

/* ===================================================================
   Modal + picker
=================================================================== */
function modal({title, bodyHTML, bodyNode, footNodes}){
  closeModal();
  const bg = el("div",{class:"modal-bg",onclick:e=>{if(e.target===bg)closeModal();}});
  const m = el("div",{class:"modal"});
  m.append(el("div",{class:"modal-head"}, el("h3",{},title), el("button",{class:"close",onclick:closeModal},"×")));
  const body = el("div",{class:"modal-body"});
  if(bodyNode) body.append(bodyNode); else body.innerHTML = bodyHTML||"";
  m.append(body);
  if(footNodes) m.append(el("div",{class:"modal-foot"}, ...footNodes));
  bg.append(m); $("#modalRoot").append(bg);
  document.addEventListener("keydown",escClose);
  return {bg,m,body};
}
function escClose(e){ if(e.key==="Escape") closeModal(); }
function closeModal(){ $("#modalRoot").innerHTML=""; document.removeEventListener("keydown",escClose); }
function infoModal(title, html){ modal({title, bodyHTML:html, footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]}); }

/* searchable single-select picker. onPick(name). markFn flags priority items with ★.
   lockFn(name) may return a reason string to show the item as locked & unpickable. */
function openPicker(title, names, onPick, refKind, markFn, lockFn){
  const wrap = el("div",{});
  const search = el("input",{type:"search",placeholder:"Type to filter…",style:"margin-bottom:10px"});
  const list = el("div",{class:"picklist"});
  const draw = () => {
    const q = search.value.trim().toLowerCase(); list.innerHTML="";
    let arr = names;
    if(markFn) arr = [...names].sort((a,b)=>(markFn(b)?1:0)-(markFn(a)?1:0));
    const filtered = arr.filter(n=>!q||n.toLowerCase().includes(q)).slice(0,200);
    filtered.forEach(n=>{
      const marked = markFn && markFn(n);
      const lock = lockFn && lockFn(n);
      const textCol = el("div",{style:"flex:1;min-width:0"},
        el("div",{class:"pi-title"}, n + (marked?"  ★":"") + (lock?"  🔒":"")),
        refKind==="move"? pickMoveSub(n) : refKind==="species"? pickSpeciesSub(n)
          : refKind==="feature"? pickFeatureSub(n) : refKind==="held"? pickHeldSub(n)
          : refKind==="technique"? pickTechniqueSub(n) : refKind==="ability"? pickAbilitySub(n) : "",
        lock? el("div",{class:"pi-sub",style:"color:var(--bad)"}, lock) : "");
      const item = refKind==="species"
        ? el("div",{class:"pickitem",style:"display:flex;gap:10px;align-items:center"}, monSprite(n,false,"s-xs"), textCol)
        : el("div",{class:"pickitem"}, textCol);
      if(lock){ item.style.opacity=".55"; item.style.cursor="not-allowed";
        item.addEventListener("click",()=>toast(lock)); }
      else item.addEventListener("click",()=>{ onPick(n); closeModal(); });
      list.append(item);
    });
    if(!filtered.length) list.append(el("div",{class:"pickitem muted"},"no matches"));
  };
  search.addEventListener("input",draw);
  wrap.append(search,list);
  modal({title, bodyNode:wrap});
  draw(); setTimeout(()=>search.focus(),50);
}
function pickMoveSub(name){ const m=moveByName.get(name.toLowerCase()); return m?el("div",{class:"pi-sub"}, `${m.type||""} · ${moveLineShort(m)}`):el("div",{class:"pi-sub muted"},"not in DB"); }
function pickSpeciesSub(name){ const s=getSpecies(name); return s?el("div",{class:"pi-sub",html:(s.types||[]).map(typeBadge).join(" ")}):""; }
function pickFeatureSub(name){ const f=D.features.find(x=>x.name===name); if(!f) return "";
  const meta=[f.frequency, f.prerequisites?("Prereq: "+f.prerequisites):""].filter(Boolean).join(" · ");
  return meta?el("div",{class:"pi-sub"}, meta):""; }
function pickTechniqueSub(name){ const tq=techByName.get(name); if(!tq) return "";
  const meta=[tq.frequency, tq.prereq?("Prereq: "+tq.prereq):""].filter(Boolean).join(" · ");
  return meta?el("div",{class:"pi-sub"}, meta):""; }
function pickAbilitySub(name){ const a=abilityByName.get((name||"").toLowerCase()); if(!a) return "";
  const meta=[a.frequency, a.effect].filter(Boolean).join(" · ");
  return meta?el("div",{class:"pi-sub"}, String(meta).slice(0,130)):""; }

/* ===================================================================
   Character management + top bar
=================================================================== */
function refreshCharSelect(){
  const sel = $("#charSelect"); sel.innerHTML="";
  if(mode==="cloud"){
    const rows = Object.values(cloud.byId).sort((a,b)=>(a.owner_name||"").localeCompare(b.owner_name||"")||(a.name||"").localeCompare(b.name||""));
    if(!rows.length){ sel.append(el("option",{value:""}, "— no characters yet —")); return; }
    rows.forEach(r => {
      const mine = r.owner_id===cloud.userId;
      const label = `${r.data?.name||"(unnamed)"} — ${r.owner_name||"?"}${mine?" (you)":""}`;
      sel.append(el("option",{value:r.id,selected:r.id===cloud.activeId}, label));
    });
    return;
  }
  state.characters.forEach(c => sel.append(el("option",{value:c.id,selected:c.id===state.activeId}, c.name || "(unnamed)")));
}
$("#charSelect").addEventListener("change", e=>{
  if(mode==="cloud"){ cloud.activeId = e.target.value; } else { state.activeId = e.target.value; }
  openMon=null; render();
});
$("#btnNew").addEventListener("click", ()=>{
  const name = prompt("New character name:", "New Trainer"); if(name===null) return;
  if(mode==="cloud") return cloudNewCharacter(name||"New Trainer");
  const c = newCharacter(name||"New Trainer"); state.characters.push(c); state.activeId=c.id; save(); switchTab("trainer");
});
$("#btnRename").addEventListener("click", ()=>{
  const c=activeChar(); if(!c) return;
  if(mode==="cloud" && !canEditActive()){ toast("Read-only — GM only"); return; }
  const n=prompt("Rename character:", c.name); if(n===null)return; c.name=n; save(); render();
});
$("#btnDelete").addEventListener("click", ()=>{
  if(mode==="cloud"){
    const r = cloud.byId[cloud.activeId]; if(!r){ return; }
    if(!canEditActive()){ toast("Read-only — GM only"); return; }
    if(!confirm(`Delete "${r.data?.name}" from the campaign? This cannot be undone.`)) return;
    return cloudDeleteCharacter(r.id);
  }
  if(state.characters.length<=1){ toast("Can't delete your only character"); return; }
  const c=activeChar(); if(!confirm(`Delete "${c.name}" and its Pokémon? This cannot be undone.`)) return;
  state.characters = state.characters.filter(x=>x.id!==c.id); state.activeId = state.characters[0].id; save(); render();
});
$("#btnExport").addEventListener("click", ()=>{
  const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
  const a = el("a",{href:URL.createObjectURL(blob), download:`ptu-sheets-${new Date().toISOString().slice(0,10)}.json`});
  document.body.append(a); a.click(); a.remove(); toast("Exported ✓");
});
$("#btnImport").addEventListener("click", ()=>$("#fileImport").click());
$("#fileImport").addEventListener("change", e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const data = JSON.parse(r.result);
      if(!data.characters?.length) throw 0;
      if(confirm("Import will REPLACE your current data. Continue? (Export first if unsure.)")){
        state = data; if(!state.activeId) state.activeId=state.characters[0].id; save(); openMon=null; switchTab("trainer"); toast("Imported ✓");
      }
    }catch(err){ toast("⚠ Invalid file"); }
    e.target.value="";
  };
  r.readAsText(f);
});

/* theme — stored device-level so it works in local and cloud modes */
function applyTheme(){
  const t = localStorage.getItem("ptu_theme") || state.theme;
  if(t) document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
$("#btnTheme").addEventListener("click", ()=>{
  const cur = document.documentElement.getAttribute("data-theme");
  const dark = cur ? cur==="dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  const next = dark ? "light" : "dark";
  localStorage.setItem("ptu_theme", next); state.theme = next; applyTheme();
});
$("#btnSettings").addEventListener("click", openSettings);

/* persistent Rest bar (always visible, any tab) */
function canRest(){
  if(mode==="cloud" && cloud.activeId && !canEditActive()){ toast("Read-only — GM only"); return false; }
  return true;
}
$("#btnEndScene").addEventListener("click", ()=>{ if(canRest()) endScene(); });
$("#btnEndDay").addEventListener("click",   ()=>{ if(canRest()) endDay(); });

/* ===================================================================
   Cloud sync (Supabase) — progressive enhancement.
   Active only when the Supabase SDK is loaded AND config.js is filled in.
=================================================================== */
function cloudConfigured(){ return !!(window.supabase && CLOUD_CFG.url && CLOUD_CFG.anonKey); }
function myUserId(){
  let id = localStorage.getItem("ptu_userid");
  if(!id){ id = "u_"+uid(); localStorage.setItem("ptu_userid", id); }
  return id;
}
function canEdit(row){ return !!row && (cloud.isGM || row.owner_id===cloud.userId); }
function canEditActive(){ return canEdit(cloud.byId[cloud.activeId]); }
/* a player connected as "Viewer" can edit HP for every player's trainer/Pokémon token on the
   map (handy for a co-pilot / assistant tracking the party's health), but nothing else GM-only. */
function isMapHpViewer(){ return !cloud.isGM && (cloud.name||"").trim().toLowerCase()==="viewer"; }
function canEditPlayerHP(row){ return canEdit(row) || isMapHpViewer(); }

function initCloud(_tries){
  // No cloud config at all → nothing to do (stays local-only).
  if(!(CLOUD_CFG.url && CLOUD_CFG.anonKey)) return;
  // The Supabase SDK loads async and may not be here yet — wait for it, but never block the app.
  if(!window.supabase){
    const t = _tries||0;
    if(t > 100) return;            // ~10s; give up (offline / CDN blocked) and stay local
    return void setTimeout(()=>initCloud(t+1), 100);
  }
  injectCloudButton();
  try { cloud.client = supabase.createClient(CLOUD_CFG.url, CLOUD_CFG.anonKey); }
  catch(e){ console.error("Supabase init failed", e); return; }
  cloud.userId = myUserId();
  try{
    const s = JSON.parse(localStorage.getItem("ptu_cloud_session")||"null");
    if(s && s.campaign && s.name) cloudConnect(s.campaign, s.name, s.gm||"", true);
  }catch(e){}
}
function injectCloudButton(){
  if($("#btnCloud")) return;
  $(".top-actions").prepend(el("button",{id:"btnCloud",class:"btn ghost",title:"Cloud campaign sync",onclick:openCloudPanel},"☁ Cloud"));
}
function updateCloudButton(){
  const b=$("#btnCloud"); if(!b) return;
  b.textContent = mode==="cloud" ? `☁ ${cloud.name}${cloud.isGM?" (GM)":""}` : "☁ Cloud";
  b.classList.toggle("on-cloud", mode==="cloud");
}
function migrateChar(data, id){
  if(!data || typeof data!=="object") data = newCharacter("Recovered");
  data.trainer = data.trainer || newTrainer();
  data.pokemon = Array.isArray(data.pokemon) ? data.pokemon : [];
  data.pokemon.forEach(normPokemon);
  data.id = data.id || id;
  return data;
}
/* explicit columns, not "*" — supabase-js can transiently return 0 rows for just-inserted
   rows under a "*" select, which would blank the roster right after someone joins/creates. */
const SHEET_COLS = "id,campaign,owner_id,owner_name,name,data,updated_at";
async function fetchRoster(){
  const { data, error } = await cloud.client.from("sheets").select(SHEET_COLS).eq("campaign", cloud.campaign);
  if(error) throw error;
  cloud.byId = {};
  (data||[]).forEach(r => {
    if(r.owner_id===PC_OWNER){ cloud.pc = { ...r, data: pcData(r.data) }; return; }   // PC isn't a character
    if(r.owner_id===MAP_OWNER) return;                                                // map rows aren't characters
    r.data = migrateChar(r.data, r.id); cloud.byId[r.id] = r;
  });
  recoverUnsavedFromCache();
}
/* Safety net for the "edits revert after refresh" bug: if a debounced/keepalive save still
   never landed, the local cache holds a NEWER copy than the DB. On (re)connect, restore any
   editable row whose cached copy is strictly newer and re-push it. Compares client-set
   updated_at, so a genuinely-newer DB row (edited elsewhere) always wins. */
function recoverUnsavedFromCache(){
  let cached; try{ cached = JSON.parse(localStorage.getItem("ptu_cloud_cache_"+cloud.campaign)||"[]"); }catch(e){ return; }
  if(!Array.isArray(cached)) return;
  const SENTINELS = [PC_OWNER, MAP_OWNER, ENC_OWNER];
  cached.forEach(cr=>{
    if(!cr || !cr.id || SENTINELS.includes(cr.owner_id)) return;
    const db = cloud.byId[cr.id];
    if(!db || !canEdit(db)) return;
    if(cr.updated_at && (!db.updated_at || cr.updated_at > db.updated_at)){
      cr.data = migrateChar(cr.data, cr.id);
      cloud.byId[cr.id] = cr;
      cloudUpsert(cr);   // fire-and-forget: push the recovered copy back to the cloud
    }
  });
}
/* the shared PC storage (visible to every member, so it's fetched separately from the roster) */
function pcData(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "pc";
  data.pokemon = Array.isArray(data.pokemon) ? data.pokemon : [];
  data.pokemon.forEach(normPokemon);
  return data;
}
async function fetchPC(){
  const { data, error } = await cloud.client.from("sheets").select(SHEET_COLS).eq("id", pcId()).limit(1);
  if(error){ console.error(error); return; }
  cloud.pc = (data && data[0]) ? { ...data[0], data: pcData(data[0].data) } : null;
}
function ensurePCRow(){
  if(!cloud.pc) cloud.pc = { id:pcId(), campaign:cloud.campaign, owner_id:PC_OWNER, owner_name:"PC",
                            name:"PC Storage", data:{ kind:"pc", pokemon:[] } };
  return cloud.pc;
}
async function pcUpsert(){
  const row = ensurePCRow();
  cloud.lastSaveTs = Date.now();
  const { error } = await cloud.client.from("sheets").upsert({
    id:row.id, campaign:cloud.campaign, owner_id:PC_OWNER, owner_name:"PC",
    name:"PC Storage", data:row.data, updated_at:new Date().toISOString() });
  if(error){ console.error(error); toast("⚠ PC save failed"); return false; }
  return true;
}

/* ---- shared battle map: reserved rows (meta + tokens), same pattern as the PC ---- */
function normMapMeta(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "mapmeta";
  data.maps = Array.isArray(data.maps) ? data.maps : [];
  data.maps.forEach(m => {
    if(typeof m.gridSize!=="number" || m.gridSize<8) m.gridSize = 48;
    if(typeof m.gridOn!=="boolean") m.gridOn = true;
    if(typeof m.name!=="string") m.name = "Map";
    // migrate single bg → layered images[] (w/h 0 → resolved to natural size on first GM view)
    if(!Array.isArray(m.images)) m.images = (typeof m.bg==="string" && m.bg) ? [{id:uid(),src:m.bg,x:0,y:0,w:0,h:0}] : [];
    delete m.bg;
    m.images.forEach(im=>{ ["x","y","w","h"].forEach(k=>{ if(typeof im[k]!=="number") im[k]=0; }); if(!im.id) im.id=uid(); });
    if(typeof m.fogOn!=="boolean") m.fogOn = false;
    if(typeof m.fogRadius!=="number" || m.fogRadius<1) m.fogRadius = 3;
  });
  // playerMapId = the map players see (seed from the old shared activeMapId for back-compat)
  if(!data.playerMapId || !data.maps.find(m=>m.id===data.playerMapId))
    data.playerMapId = data.maps.find(m=>m.id===data.activeMapId) ? data.activeMapId : (data.maps[0]?.id || null);
  if(!data.activeMapId || !data.maps.find(m=>m.id===data.activeMapId))
    data.activeMapId = data.maps[0]?.id || null;
  return data;
}
function normMapTokens(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "maptokens";
  data.byMap = (data.byMap && typeof data.byMap==="object") ? data.byMap : {};
  for(const k of Object.keys(data.byMap)) if(!Array.isArray(data.byMap[k])) data.byMap[k] = [];
  data.fog = (data.fog && typeof data.fog==="object") ? data.fog : {};   // { mapId: ["x,y",…] revealed }
  for(const k of Object.keys(data.fog)) if(!Array.isArray(data.fog[k])) data.fog[k] = [];
  return data;
}
async function fetchMap(){
  // explicit columns (not "*") — PostgREST/supabase-js can transiently drop just-inserted
  // rows under "*", and a GM's freshly-created map is loaded by players seconds later.
  const { data, error } = await cloud.client.from("sheets")
    .select(SHEET_COLS)
    .in("id", [mapMetaId(), mapTokensId()]);
  if(error){ console.error(error); cloud.mapMeta=null; cloud.mapTokens=null; return; }
  const meta = (data||[]).find(r=>r.id===mapMetaId());
  const toks = (data||[]).find(r=>r.id===mapTokensId());
  cloud.mapMeta   = meta ? { ...meta, data: normMapMeta(meta.data) } : null;
  cloud.mapTokens = toks ? { ...toks, data: normMapTokens(toks.data) } : null;
}
function ensureMapMeta(){
  if(!cloud.mapMeta) cloud.mapMeta = { id:mapMetaId(), campaign:cloud.campaign, owner_id:MAP_OWNER,
    owner_name:"Map", name:"Battle Map", data:normMapMeta(null) };
  return cloud.mapMeta;
}
function ensureMapTokens(){
  if(!cloud.mapTokens) cloud.mapTokens = { id:mapTokensId(), campaign:cloud.campaign, owner_id:MAP_OWNER,
    owner_name:"Map", name:"Map Tokens", data:normMapTokens(null) };
  return cloud.mapTokens;
}
async function mapMetaUpsert(){
  const row = ensureMapMeta();
  cloud.mapSaveTs = Date.now();
  row.updated_at = new Date().toISOString();            // stamp locally so realtime can drop stale echoes
  const { error } = await cloud.client.from("sheets").upsert({
    id:row.id, campaign:cloud.campaign, owner_id:MAP_OWNER, owner_name:"Map",
    name:"Battle Map", data:row.data, updated_at:row.updated_at });
  if(error){ console.error(error); toast("⚠ Map save failed"); return false; }
  return true;
}
async function mapTokensUpsert(){
  const row = ensureMapTokens();
  cloud.mapSaveTs = Date.now();
  row.updated_at = new Date().toISOString();
  const { error } = await cloud.client.from("sheets").upsert({
    id:row.id, campaign:cloud.campaign, owner_id:MAP_OWNER, owner_name:"Map",
    name:"Map Tokens", data:row.data, updated_at:row.updated_at });
  if(error){ console.error(error); toast("⚠ Map save failed"); return false; }
  return true;
}

/* ---- cloud encounters (GM prep), same reserved-row pattern ---- */
function normEnc(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "enc";
  data.encounters = Array.isArray(data.encounters) ? data.encounters : [];
  data.encounters.forEach(normEncounter);
  return data;
}
async function fetchEnc(){
  const { data, error } = await cloud.client.from("sheets").select(SHEET_COLS).eq("id", encRowId()).limit(1);
  if(error){ console.error(error); return; }
  cloud.enc = (data && data[0]) ? { ...data[0], data: normEnc(data[0].data) } : null;
}
function ensureEnc(){
  if(!cloud.enc) cloud.enc = { id:encRowId(), campaign:cloud.campaign, owner_id:ENC_OWNER,
    owner_name:"Encounters", name:"Encounters", data:normEnc(null) };
  return cloud.enc;
}
async function encUpsert(){
  const row = ensureEnc();
  cloud.encSaveTs = Date.now();
  row.updated_at = new Date().toISOString();
  const { error } = await cloud.client.from("sheets").upsert({
    id:row.id, campaign:cloud.campaign, owner_id:ENC_OWNER, owner_name:"Encounters",
    name:"Encounters", data:row.data, updated_at:row.updated_at });
  if(error){ console.error(error); toast("⚠ Encounter save failed"); return false; }
  return true;
}
async function cloudConnect(campaign, name, gmCode, silent){
  campaign = (campaign||"").trim().toLowerCase(); name = (name||"").trim();
  if(!campaign || !name){ toast("Enter a campaign code and your name"); return; }
  cloud.campaign = campaign; cloud.name = name;
  cloud.isGM = !!(CLOUD_CFG.gmCode && gmCode && gmCode===CLOUD_CFG.gmCode);
  if(gmCode && CLOUD_CFG.gmCode && !cloud.isGM && !silent){ toast("Wrong GM code — joining as player"); }
  localStorage.setItem("ptu_cloud_session", JSON.stringify({campaign, name, gm: cloud.isGM?gmCode:""}));
  try{
    await fetchRoster();
    await fetchPC();
    await fetchMap();
    await fetchEnc();
    // one-time seed: push the GM's existing device-local encounters into the empty cloud row
    if(cloud.isGM && !(cloud.enc?.data?.encounters?.length) && (state.encounters?.length)){
      ensureEnc().data.encounters = JSON.parse(JSON.stringify(state.encounters));
      await encUpsert();
    }
    subscribeRealtime();
    mode = "cloud"; openMon = null;
    const mine = Object.values(cloud.byId).find(r=>r.owner_id===cloud.userId);
    cloud.activeId = mine ? mine.id : (Object.keys(cloud.byId)[0] || null);
    updateCloudButton(); closeModal(); render();
    if(!silent) toast(`Connected to “${campaign}”${cloud.isGM?" as GM":""} ✓`);
  }catch(e){ console.error(e); mode="local"; toast("⚠ Couldn't connect — check config/network"); }
}
function cloudDisconnect(){
  if(cloud.sub){ try{ cloud.client.removeChannel(cloud.sub); }catch(e){} cloud.sub=null; }
  mode="local"; localStorage.removeItem("ptu_cloud_session");
  cloud.pc=null; cloud.mapMeta=null; cloud.mapTokens=null; cloud.enc=null;
  openMon=null; updateCloudButton(); closeModal(); render();
  toast("Switched to this device");
}
function subscribeRealtime(){
  if(cloud.sub){ try{ cloud.client.removeChannel(cloud.sub); }catch(e){} }
  cloud.sub = cloud.client.channel("sheets-"+cloud.campaign)
    .on("postgres_changes",
        { event:"*", schema:"public", table:"sheets", filter:`campaign=eq.${cloud.campaign}` },
        onRealtime)
    .subscribe();
}
/* Supabase Realtime replaces the record with an empty object for rows over its
   max_record_bytes limit (~1 MB) — our map/PC rows carry background images & sprites as
   data-URLs and routinely blow past it. When that happens the event still fires but with
   no usable `data` (and sometimes no id), so instead of trusting the truncated payload we
   re-fetch the affected row over a normal SELECT (not size-limited) and re-render. */
function payloadHasData(p){ return !!(p && p.data && typeof p.data==="object" && Object.keys(p.data).length); }
const sharedRefetchTimers = {};
function scheduleSharedRefetch(kind){
  clearTimeout(sharedRefetchTimers[kind]);
  sharedRefetchTimers[kind] = setTimeout(async ()=>{
    if(kind==="pc")   await fetchPC();
    if(kind==="map")  await fetchMap();
    if(kind==="enc")  await fetchEnc();
    if(kind==="roster") await fetchRoster();
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if(typing) return;
    if(kind==="pc"){ if(currentTab==="pc") renderPC(); }
    else if(kind==="map"){ if(currentTab==="map" && !mapDragging) renderMap(); }
    else if(kind==="enc"){ if((currentTab==="encounters"||currentTab==="map") && !mapDragging) render(); }
    else softRender();
  }, 140);
}
function onRealtime(payload){
  const type = payload.eventType || payload.type;
  const evtId = payload.new?.id ?? payload.old?.id;
  const evtOwner = payload.new?.owner_id ?? payload.old?.owner_id;
  // Fully-truncated oversized event (no id to route on) → we can't tell what changed, so
  // reconcile everything via fresh SELECTs rather than dropping the update on the floor.
  if(!evtId && type!=="DELETE"){
    scheduleSharedRefetch("map"); scheduleSharedRefetch("pc");
    scheduleSharedRefetch("enc"); scheduleSharedRefetch("roster");
    return;
  }
  // the shared PC is visible to everyone — handle it before the per-player visibility filter
  if(evtOwner===PC_OWNER || evtId===pcId()){
    if(type==="DELETE"){ cloud.pc = null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("pc"); return; }
    else cloud.pc = { ...payload.new, data: pcData(payload.new.data) };
    // live-refresh the PC tab, but don't yank focus while someone is typing in a filter
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if(currentTab==="pc" && !typing) renderPC();
    return;
  }
  // the shared battle map is visible to everyone — handle it before the per-player filter
  if(evtOwner===MAP_OWNER || evtId===mapMetaId() || evtId===mapTokensId()){
    const isMeta = evtId===mapMetaId();
    if(type==="DELETE"){ if(isMeta) cloud.mapMeta=null; else cloud.mapTokens=null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("map"); return; }
    else {
      const cur = isMeta ? cloud.mapMeta : cloud.mapTokens;
      // ignore stale/echoed rows: an out-of-order echo of our own earlier write must not
      // revert a token we just added or an HP we just changed (rapid map edits are common).
      if(cur && cur.updated_at && payload.new.updated_at && payload.new.updated_at <= cur.updated_at) return;
      if(isMeta) cloud.mapMeta   = { ...payload.new, data: normMapMeta(payload.new.data) };
      else       cloud.mapTokens = { ...payload.new, data: normMapTokens(payload.new.data) };
    }
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if(currentTab==="map" && !mapDragging && !typing) renderMap();
    return;
  }
  // shared encounters (GM prep) — visible to everyone so map tokens can resolve their enemy link
  if(evtOwner===ENC_OWNER || evtId===encRowId()){
    if(type==="DELETE"){ cloud.enc=null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("enc"); return; }
    else {
      if(cloud.enc?.updated_at && payload.new.updated_at && payload.new.updated_at <= cloud.enc.updated_at) return;
      cloud.enc = { ...payload.new, data: normEnc(payload.new.data) };
    }
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if((currentTab==="encounters" || currentTab==="map") && !mapDragging && !typing) render();
    return;
  }
  if(type==="DELETE"){
    const id = payload.old?.id; if(!id) return;
    delete cloud.byId[id];
    if(cloud.activeId===id) cloud.activeId = Object.keys(cloud.byId)[0] || null;
    softRender(); return;
  }
  const row = payload.new; if(!row) return;
  // truncated oversized character row (big sheet w/ avatar/sprite data-URLs) → re-fetch, don't
  // overwrite the good local copy with an empty "Recovered" character.
  if(!payloadHasData(row)){ scheduleSharedRefetch("roster"); return; }
  const cur = cloud.byId[row.id], ts = row.updated_at;
  // (1) OUR OWN ECHO: we wrote this exact version (or older). Never let a returning echo revert a
  //     newer local edit — this is what made two editors of one sheet ping-pong.
  if(cloud.lastWrite[row.id] && ts && ts <= cloud.lastWrite[row.id]){ refreshCharSelect(); return; }
  // (2) STALE REMOTE: older than what we already hold → ignore, so the other editor's late-arriving
  //     old snapshot can't clobber the current value (last-write-wins by timestamp, not by arrival).
  if(cur && cur.updated_at && ts && ts < cur.updated_at) return;
  // (3) WE'RE MID-EDIT on this very sheet → keep our in-progress copy on screen (don't yank the
  //     value out from under the cursor); our pending save carries a newer timestamp and will win.
  const isActive = row.id===cloud.activeId;
  const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
  if(isActive && (cloud.saveTimer || typing)){ refreshCharSelect(); return; }
  row.data = migrateChar(row.data, row.id);
  cloud.byId[row.id] = row;
  softRender();
}
function softRender(){ updateCloudButton(); render(); }
function cacheCloud(){ try{ localStorage.setItem("ptu_cloud_cache_"+cloud.campaign, JSON.stringify(Object.values(cloud.byId))); }catch(e){} }
function cloudSave(){
  const row = cloud.byId[cloud.activeId]; if(!row || !canEdit(row)) return;
  row.updated_at = new Date().toISOString();
  row.name = row.data?.name || "";
  cloud.lastWrite[row.id] = row.updated_at;   // remember our own write so its echo is ignored
  cacheCloud();
  clearTimeout(cloud.saveTimer);
  cloud.saveTimer = setTimeout(async ()=>{
    cloud.saveTimer = null;                    // clear the "pending" flag so remote edits can apply again
    cloud.lastSaveTs = Date.now();
    const { error } = await cloud.client.from("sheets").upsert({
      id:row.id, campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name,
      name:row.name, data:row.data, updated_at:row.updated_at,
    });
    if(error){ console.error(error); toast("⚠ Cloud save failed"); }
  }, 500);
}
/* Upsert a row via a keepalive fetch — unlike a normal fetch, the browser lets this complete
   even as the page is being unloaded/backgrounded, which is exactly when mobile kills the tab. */
function restUpsertKeepalive(row){
  if(!(CLOUD_CFG.url && CLOUD_CFG.anonKey) || !row) return;
  try{
    fetch(CLOUD_CFG.url.replace(/\/+$/,"") + "/rest/v1/sheets", {
      method:"POST", keepalive:true,
      headers:{ apikey:CLOUD_CFG.anonKey, Authorization:"Bearer "+CLOUD_CFG.anonKey,
        "Content-Type":"application/json", Prefer:"resolution=merge-duplicates" },
      body: JSON.stringify({ id:row.id, campaign:cloud.campaign, owner_id:row.owner_id,
        owner_name:row.owner_name, name:row.name, data:row.data, updated_at:row.updated_at }),
    }).catch(()=>{});
  }catch(e){}
}
/* Flush pending debounced cloud writes NOW (page is hiding/closing). The 500 ms save debounce
   otherwise loses the last edit when a mobile tab is refreshed or backgrounded mid-window —
   the reason edits "revert to an older state" after a refresh. */
function flushCloudSaves(){
  if(mode!=="cloud") return;
  if(cloud.saveTimer){
    clearTimeout(cloud.saveTimer); cloud.saveTimer=null;
    const row = cloud.byId[cloud.activeId];
    if(row && canEdit(row)){ row.updated_at=new Date().toISOString(); row.name=row.data?.name||"";
      cloud.lastWrite[row.id]=row.updated_at; cloud.lastSaveTs=Date.now(); cacheCloud(); restUpsertKeepalive(row); }
  }
  if(encSaveTimer && cloud.isGM){
    clearTimeout(encSaveTimer); encSaveTimer=null;
    const enc = ensureEnc(); enc.updated_at=new Date().toISOString();
    cloud.encSaveTs=Date.now(); restUpsertKeepalive(enc);
  }
}
async function cloudNewCharacter(name){
  const c = newCharacter(name);
  const row = { id:c.id, campaign:cloud.campaign, owner_id:cloud.userId, owner_name:cloud.name,
                name:c.name, data:c, updated_at:new Date().toISOString() };
  cloud.byId[c.id] = row; cloud.activeId = c.id; openMon=null;
  cloud.lastSaveTs = Date.now();
  const { error } = await cloud.client.from("sheets").insert({
    id:row.id, campaign:row.campaign, owner_id:row.owner_id, owner_name:row.owner_name, name:row.name, data:row.data });
  if(error){ console.error(error); toast("⚠ Could not create character"); }
  switchTab("trainer");
}
async function cloudDeleteCharacter(id){
  delete cloud.byId[id];
  cloud.activeId = Object.keys(cloud.byId)[0] || null; openMon=null;
  const { error } = await cloud.client.from("sheets").delete().eq("id", id);
  if(error){ console.error(error); toast("⚠ Delete failed"); }
  render();
}
/* the GM's own character row */
function myRow(){ return Object.values(cloud.byId).find(r=>r.owner_id===cloud.userId); }
/* immediate upsert of a specific row (used for one-off GM writes to any sheet) */
async function cloudUpsert(row){
  row.updated_at = new Date().toISOString();
  row.name = row.data?.name || "";
  cloud.lastWrite[row.id] = row.updated_at;   // suppress our own realtime echo of this write
  cacheCloud(); cloud.lastSaveTs = Date.now();
  const { error } = await cloud.client.from("sheets").upsert({
    id:row.id, campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name,
    name:row.name, data:row.data, updated_at:row.updated_at });
  if(error){ console.error(error); toast("⚠ Cloud save failed"); return false; }
  return true;
}
/* GM: drop a Pokémon into another player's party and push it to the cloud */
async function sendPokemonToRow(targetId, mon){
  if(mode!=="cloud" || !cloud.isGM){ toast("GM cloud only"); return false; }
  const row = cloud.byId[targetId]; if(!row){ toast("Player not found"); return false; }
  const m = normPokemon({ ...mon, id: uid() });
  m.currentHP = null;                                   // arrives at full HP
  row.data.pokemon = row.data.pokemon || [];
  if(row.data.pokemon.filter(p=>p.onTeam).length >= 6) m.onTeam = false;  // party full → box
  row.data.pokemon.push(m);
  const ok = await cloudUpsert(row);
  if(ok) toast(`Sent ${m.nickname||getSpecies(m.species)?.name||"Pokémon"} to ${row.owner_name||row.data?.name||"player"} ✓`);
  if(targetId===cloud.activeId) render();
  return ok;
}
/* GM: move a Pokémon — send a copy to the target and remove it from the source sheet */
async function transferPokemon(sourceRow, targetId, mon){
  if(sourceRow && sourceRow.id===targetId){ toast("It's already on that sheet"); return false; }
  const ok = await sendPokemonToRow(targetId, JSON.parse(JSON.stringify(mon)));
  if(ok && sourceRow){
    const arr = sourceRow.data.pokemon || [];
    const idx = arr.findIndex(x=>x.id===mon.id);
    if(idx>=0){ arr.splice(idx,1); await cloudUpsert(sourceRow); }
  }
  return ok;
}
/* GM: send THIS Pokémon to a player — it moves off the current sheet */
function openSendThisPokemon(p){
  if(mode!=="cloud" || !cloud.isGM){ toast("Join a campaign as GM to send Pokémon"); return; }
  const rows = Object.values(cloud.byId);
  if(!rows.length){ toast("No characters in the campaign yet"); return; }
  const sp = getSpecies(p.species);
  const sourceRow = cloud.byId[cloud.activeId];
  const wrap = el("div",{});
  wrap.append(el("div",{class:"r-body",style:"margin-bottom:10px"},
    `Move ${p.nickname||sp?.name||"this Pokémon"} (Lv ${p.level}) to which player? It will be removed from this sheet.`));
  const list = el("div",{class:"reflist"});
  rows.sort((a,b)=>(a.owner_name||"").localeCompare(b.owner_name||"")).forEach(r=>{
    if(r.id===cloud.activeId) return;   // no point sending to the sheet it's already on
    list.append(el("div",{class:"refitem",style:"cursor:pointer",onclick:async()=>{
      const ok = await transferPokemon(sourceRow, r.id, p);
      closeModal();
      if(ok){ openMon=null; render(); }
    }},
      el("div",{class:"r-title"}, r.data?.name||"(unnamed)"),
      el("div",{class:"r-meta"}, `${r.owner_name||"?"}${r.owner_id===cloud.userId?" (you)":""} · ${(r.data?.pokemon?.length)||0} Pokémon`)));
  });
  if(!list.children.length) list.append(el("div",{class:"muted"},"No other players to send to yet."));
  wrap.append(list);
  modal({title:`🎁 Send ${p.nickname||sp?.name||"Pokémon"}`, bodyNode:wrap,
    footNodes:[el("button",{class:"btn-secondary",onclick:closeModal},"Cancel")]});
}
/* GM tool: pick a target player + a species (or copy one of your own), then send */
function openSendPokemon(presetId){
  if(mode!=="cloud" || !cloud.isGM){ toast("Join a campaign as GM to send Pokémon"); return; }
  const rows = Object.values(cloud.byId);
  if(!rows.length){ toast("No players in the campaign yet"); return; }
  let targetId = presetId || cloud.activeId || rows[0].id;
  if(!cloud.byId[targetId]) targetId = rows[0].id;
  let speciesName = "";
  const wrap = el("div",{});
  const sel = el("select");
  rows.forEach(r => sel.append(el("option",{value:r.id,selected:r.id===targetId},
    `${r.data?.name||"(unnamed)"} — ${r.owner_name||"?"}${r.owner_id===cloud.userId?" (you)":""}`)));
  sel.addEventListener("change",()=>targetId=sel.value);
  wrap.append(el("label",{class:"field"}, el("span",{},"Send to player"), sel));

  const spBtn = el("button",{class:"btn-secondary",style:"text-align:left;width:100%",
    onclick:()=>openPicker("Choose species", D.species.map(s=>s.name), v=>{ speciesName=v; spBtn.textContent=v; }, "species")}, "choose…");
  wrap.append(el("label",{class:"field",style:"margin-top:8px"}, el("span",{},"New Pokémon — species"), spBtn));
  const lvl = el("input",{type:"number",min:1,max:100}); lvl.value=5;
  const nick = el("input",{type:"text",placeholder:"(optional)"});
  wrap.append(el("div",{class:"fieldrow",style:"margin-top:8px"},
    el("label",{class:"field"}, el("span",{},"Level"), lvl),
    el("label",{class:"field"}, el("span",{},"Nickname"), nick)));

  const mineRow = myRow();
  const mine = (mineRow?.data?.pokemon) || [];
  if(mine.length){
    wrap.append(el("div",{class:"r-meta",style:"margin-top:14px"}, "…or send one of your Pokémon (moves it off your sheet):"));
    const list = el("div",{class:"reflist",style:"margin-top:6px"});
    mine.forEach(p=>{ const sp=getSpecies(p.species);
      list.append(el("div",{class:"refitem",style:"cursor:pointer",
        onclick:async()=>{ const ok=await transferPokemon(mineRow, targetId, p); closeModal(); if(ok) render(); }},
        el("div",{class:"r-title"}, `Send ${p.nickname||sp?.name||"?"} · Lv ${p.level}`)));
    });
    wrap.append(list);
  }
  modal({title:"🎁 Send a Pokémon", bodyNode:wrap, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:async()=>{
      if(!speciesName){ toast("Pick a species (or tap one of your Pokémon to copy)"); return; }
      const mon = newPokemon(speciesName);
      mon.level = Math.max(1, Math.min(MAX_LEVEL, parseInt(lvl.value)||5));
      mon.xp = xpForLevel(mon.level);
      if(nick.value.trim()) mon.nickname = nick.value.trim();
      await sendPokemonToRow(targetId, mon);
      closeModal();
    }},"Send Pokémon"),
  ]});
}
/* ===================================================================
   Shared PC — deposit/withdraw Pokémon to a campaign-wide storage box
=================================================================== */
/* my own sheets that can deposit — for the GM this includes their NPC trainers */
function pcMyRows(){ return Object.values(cloud.byId).filter(r=>r.owner_id===cloud.userId); }
/* characters a withdraw can go to — players: their own; GM: any character in the campaign */
function pcTargetRows(){ return cloud.isGM ? Object.values(cloud.byId) : pcMyRows(); }
function pcDefaultTargetId(){
  const active = cloud.byId[cloud.activeId];
  if(active && canEdit(active)) return active.id;      // whatever you're viewing (own sheet, or GM anywhere)
  return pcTargetRows()[0]?.id || null;
}

async function depositToPC(sourceRow, mon){
  if(mode!=="cloud" || !sourceRow || !canEdit(sourceRow)){ toast("Can't deposit that one"); return; }
  ensurePCRow();
  const m = normPokemon(JSON.parse(JSON.stringify(mon)));
  m.id = uid(); m.onTeam = false; m._pcFrom = sourceRow.data?.name || sourceRow.owner_name || ""; m._pcAt = Date.now();
  cloud.pc.data.pokemon.push(m);
  const arr = sourceRow.data.pokemon || [];
  const idx = arr.findIndex(x=>x.id===mon.id);
  if(idx>=0) arr.splice(idx,1);
  openMon = null;                 // close the open Pokémon editor
  toast(`Deposited ${mon.nickname||getSpecies(mon.species)?.name||"Pokémon"} to the PC ✓`);
  render();                       // instant UI update; upload in the background
  const okPC = await pcUpsert();
  const okSrc = await cloudUpsert(sourceRow);
  if(!(okPC && okSrc)) toast("⚠ PC sync issue — it'll reconcile on the next change");
}
async function withdrawFromPC(mon, targetId){
  const target = (targetId && cloud.byId[targetId]) || cloud.byId[pcDefaultTargetId()];
  if(!target){ toast("Pick a character to withdraw to (top of the PC tab)"); return; }
  if(!canEdit(target)){ toast("You can't add Pokémon to that character"); return; }
  ensurePCRow();
  const idx = cloud.pc.data.pokemon.findIndex(x=>x.id===mon.id);
  if(idx<0){ toast("Someone already took that one"); render(); return; }
  const m = normPokemon(JSON.parse(JSON.stringify(mon)));
  m.id = uid(); m.currentHP = null; delete m._pcFrom; delete m._pcAt;
  target.data.pokemon = target.data.pokemon || [];
  m.onTeam = target.data.pokemon.filter(p=>p.onTeam).length < 6;   // to party if there's room, else its box
  target.data.pokemon.push(m);
  cloud.pc.data.pokemon.splice(idx,1);
  toast(`Withdrew ${m.nickname||getSpecies(m.species)?.name||"Pokémon"} to ${target.data?.name||"your party"} ✓`);
  render();                       // instant
  const okPC = await pcUpsert();
  const okT = await cloudUpsert(target);
  if(!(okPC && okT)) toast("⚠ PC sync issue — it'll reconcile on the next change");
}

/* ---- PC tab (its own view, with filtering) ---- */
let pcFilter = { q:"", type:"", sort:"new" };
let pcTargetId = null;
function pcMonMeta(m){
  const sp=getSpecies(m.species);
  const types=(sp?.types||[]).filter(t=>t&&t!=="None").map(typeBadge).join(" ");
  return types + (m._pcFrom?` <span class="muted">· from ${esc(m._pcFrom)}</span>`:"");
}
function pcMonNode(m, actionBtn){
  const sp=getSpecies(m.species);
  return el("div",{class:"refitem",style:"display:flex;gap:8px;align-items:center"},
    monSprite(sp?.name||m.species, m.shiny, "s-xs"),
    el("div",{style:"flex:1;min-width:0"},
      el("div",{class:"r-title"}, `${m.nickname||sp?.name||m.species} `, el("span",{class:"muted small"},`Lv ${m.level}`)),
      el("div",{class:"r-meta",html: pcMonMeta(m)})),
    actionBtn);
}
function renderPC(){
  const root = $("#view-pc"); root.innerHTML="";
  if(!cloudConfigured() || mode!=="cloud"){
    root.append(el("div",{class:"card"}, el("h3",{},"🖥 PC — shared storage"),
      el("div",{class:"r-body"}, "The PC is part of cloud play. Tap ", el("b",{},"☁ Cloud"),
        " to join your campaign, then come back to this tab.")));
    return;
  }
  const pc = cloud.pc?.data?.pokemon || [];
  const targets = pcTargetRows();
  if(!pcTargetId || !targets.find(r=>r.id===pcTargetId)) pcTargetId = pcDefaultTargetId();

  // header + withdraw-to selector
  const head = el("div",{class:"card"}, el("h3",{},"🖥 PC — shared storage",
    el("span",{class:"pill",style:"margin-left:8px"}, pc.length)));
  if(targets.length){
    const tsel = el("select");
    targets.forEach(r=>tsel.append(el("option",{value:r.id,selected:r.id===pcTargetId},
      `${r.data?.name||"(unnamed)"}${cloud.isGM?` — ${r.owner_name||"?"}`:""}`)));
    tsel.addEventListener("change",()=>{ pcTargetId=tsel.value; });
    head.append(el("label",{class:"field",style:"margin-top:8px;max-width:340px"},
      el("span",{},"Withdraw to"), tsel));
  } else {
    head.append(el("div",{class:"muted small",style:"margin-top:8px"},
      "You have no character yet — tap ＋ New (top bar) to create one, then withdraw."));
  }
  root.append(head);

  // filters
  const fcard = el("div",{class:"card"});
  const frow = el("div",{class:"inline",style:"flex-wrap:wrap;gap:8px"});
  const q = el("input",{type:"search",placeholder:"Search name / species…",style:"flex:1;min-width:150px"}); q.value=pcFilter.q;
  const tf = el("select"); tf.append(el("option",{value:""},"All types"));
  TYPES.forEach(t=>tf.append(el("option",{value:t,selected:t===pcFilter.type}, t)));
  const sf = el("select");
  [["new","Newest first"],["level_desc","Level ↓"],["level_asc","Level ↑"],["name","Name A–Z"],["species","Species A–Z"]]
    .forEach(([v,l])=>sf.append(el("option",{value:v,selected:v===pcFilter.sort}, l)));
  const listWrap = el("div",{style:"margin-top:10px"});
  const draw = ()=>{
    listWrap.innerHTML="";
    let arr = pc.slice();
    const qq=pcFilter.q.trim().toLowerCase();
    if(qq) arr=arr.filter(m=>{ const sp=getSpecies(m.species);
      return (m.nickname||"").toLowerCase().includes(qq) || (sp?.name||m.species||"").toLowerCase().includes(qq); });
    if(pcFilter.type) arr=arr.filter(m=>(getSpecies(m.species)?.types||[]).includes(pcFilter.type));
    const cmp={ new:(a,b)=>(b._pcAt||0)-(a._pcAt||0), level_desc:(a,b)=>b.level-a.level, level_asc:(a,b)=>a.level-b.level,
      name:(a,b)=>String(a.nickname||getSpecies(a.species)?.name||a.species).localeCompare(String(b.nickname||getSpecies(b.species)?.name||b.species)),
      species:(a,b)=>String(getSpecies(a.species)?.name||a.species).localeCompare(String(getSpecies(b.species)?.name||b.species)) }[pcFilter.sort];
    arr.sort(cmp||(()=>0));
    listWrap.append(el("div",{class:"r-meta",style:"margin-bottom:6px"}, `${arr.length}${arr.length!==pc.length?` of ${pc.length}`:""} Pokémon`));
    if(!arr.length){ listWrap.append(el("div",{class:"muted",style:"padding:8px"},
      pc.length?"No matches — adjust the filters.":"The PC is empty. Open a Pokémon and tap 🖥 To PC to store it here.")); return; }
    const list=el("div",{class:"reflist"});
    arr.forEach(m=>list.append(pcMonNode(m,
      el("button",{class:"btn-secondary",style:"padding:6px 10px",disabled:!targets.length,
        title:"Withdraw to the selected character",onclick:()=>withdrawFromPC(m, pcTargetId)},"Withdraw ▸"))));
    listWrap.append(list);
  };
  q.addEventListener("input",()=>{ pcFilter.q=q.value; draw(); });
  tf.addEventListener("change",()=>{ pcFilter.type=tf.value; draw(); });
  sf.addEventListener("change",()=>{ pcFilter.sort=sf.value; draw(); });
  frow.append(q, tf, sf); fcard.append(frow, listWrap); draw();
  root.append(fcard);

  // quick deposit from my own sheets
  const mine = pcMyRows();
  const dcard = el("div",{class:"card"}, el("h3",{}, cloud.isGM?"Deposit from your trainers (incl. NPCs)":"Deposit your Pokémon"));
  const dep = el("div",{class:"reflist"}); let any=false;
  mine.forEach(r=>(r.data.pokemon||[]).forEach(m=>{ any=true;
    const node = pcMonNode(m, el("button",{class:"btn-secondary",style:"padding:6px 10px",onclick:()=>depositToPC(r,m)},"◂ Deposit"));
    if(cloud.isGM && mine.length>1) node.querySelector(".r-meta").append(el("span",{class:"muted"},` · ${r.data?.name||""}`));
    dep.append(node);
  }));
  if(!any) dep.append(el("div",{class:"muted",style:"padding:8px"},
    "No Pokémon on your own sheets. Tip: open any Pokémon and tap “🖥 To PC” to send it in."));
  dcard.append(dep);
  root.append(dcard);
}

/* ===================================================================
   Shared battle map (Owlbear-style VTT) — cloud-only.
   Maps + backgrounds + grid live in the meta row; token positions + HP
   in the tokens row. A token can LINK to a real sheet (party Pokémon /
   trainer) so HP edits write straight to that sheet and sync to the owner,
   or be STANDALONE (encounter monster / custom) with its own HP.
=================================================================== */
let mapView = { scale:1, panX:0, panY:0 };   // each viewer's own camera (not synced)
let mapDragging = false;                      // suppresses realtime re-render mid-drag
let mapGmView = null;                         // map id the GM is privately viewing (not synced)
let mapImgEdit = false;                       // GM image-edit mode (move/resize scenery)

function activeMapMeta(){ return cloud.mapMeta?.data ? cloud.mapMeta.data : normMapMeta(null); }
function activeMap(){ const meta=activeMapMeta(); return meta.maps.find(m=>m.id===meta.activeMapId) || meta.maps[0] || null; }
/* the map to render: GM sees whatever they're privately viewing; players see only the pushed map */
function currentMapForView(){
  const meta = activeMapMeta();
  if(cloud.isGM) return meta.maps.find(m=>m.id===mapGmView) || meta.maps.find(m=>m.id===meta.playerMapId) || meta.maps[0] || null;
  return meta.maps.find(m=>m.id===meta.playerMapId) || null;
}
function mapTokensFor(mapId){ return (cloud.mapTokens?.data?.byMap?.[mapId]) || []; }
/* revealed fog cells for a map, as a live Set of "x,y" keys */
function fogSet(mapId){ return new Set((cloud.mapTokens?.data?.fog?.[mapId]) || []); }

/* find an encounter monster (in mons or a trainer's party) by id, across the cloud/local list */
function encMonById(encId, monId){
  const enc = encList().find(e=>e.id===encId); if(!enc) return null;
  let mon = (enc.mons||[]).find(p=>p.id===monId);
  if(!mon) for(const tr of (enc.trainers||[])){ mon = (tr.pokemon||[]).find(p=>p.id===monId); if(mon) break; }
  return mon || null;
}
/* find an encounter's NPC trainer by id */
function encTrainerById(encId, trainerId){
  const enc = encList().find(e=>e.id===encId); if(!enc) return null;
  return (enc.trainers||[]).find(tr=>tr.id===trainerId)?.trainer || null;
}
/* link kinds that represent enemies (they never reveal fog and only the GM edits them) */
const ENEMY_LINKS = new Set(["enc","enctrainer"]);
/* resolve a linked token to its live source object (sheet Pokémon/trainer, or encounter monster/trainer) */
function tokenLinked(token){
  if(!token.link) return null;
  if(token.link.kind==="enc"){
    const mon = encMonById(token.link.encId, token.link.monId);
    return { enc:true, obj:mon, kind:"enc", missing:!mon };
  }
  if(token.link.kind==="enctrainer"){
    const t = encTrainerById(token.link.encId, token.link.trainerId);
    return { enc:true, obj:t, kind:"enctrainer", missing:!t };
  }
  const row = cloud.byId[token.link.sheetId];
  if(!row) return { row:null, obj:null, kind:token.link.kind, missing:true };
  if(token.link.kind==="trainer") return { row, obj:row.data?.trainer||null, kind:"trainer", missing:!row.data?.trainer };
  const mon = (row.data?.pokemon||[]).find(p=>p.id===token.link.monId);
  return { row, obj:mon||null, kind:"pokemon", missing:!mon };
}
const TRAINER_TOKEN = (t)=>el("img",{class:"sprite s-sm",src:(t&&t.avatar)||TRAINER_PLACEHOLDER,alt:"trainer",loading:"lazy"});
/* a linked Pokémon's token uses the picture uploaded on its sheet, falling back to the dex artwork */
function pokeTokenSprite(mon){
  if(mon.image) return el("img",{class:"sprite s-sm",src:mon.image,alt:mon.nickname||"",loading:"lazy"});
  const sp = getSpecies(mon.species);
  return monSprite(sp?.name||mon.species, mon.shiny, "s-sm");
}
function standaloneSprite(token){
  if(token.img) return el("img",{class:"sprite s-sm",src:token.img,alt:token.label||"",loading:"lazy"});
  if(token.species) return monSprite(token.species, token.shiny, "s-sm");
  return el("img",{class:"sprite s-sm",src:POKEBALL_SVG,alt:token.label||""});
}
/* everything the board needs about a token, computed live from its source */
function tokenHp(token){
  if(!token.link){
    const max = Math.max(1, token.maxHp||1); let cur = token.hp; if(cur==null) cur=max;
    return { cur, max, editable:cloud.isGM, name:token.label||"Token", sprite:standaloneSprite(token), unlinked:false, kind:"standalone" };
  }
  const L = tokenLinked(token);
  if(!L || !L.obj){
    return { cur:0, max:1, editable:false, name:token.link.kind==="trainer"?"Trainer":"Pokémon",
             sprite:el("img",{class:"sprite s-sm",src:POKEBALL_SVG}), unlinked:true };
  }
  if(L.kind==="enc"){ const max=Math.max(1,pokeDerived(L.obj).maxHP); let cur=L.obj.currentHP; if(cur==null)cur=max;
    return { cur, max, editable:cloud.isGM, name:encMonName(L.obj),          // only the GM edits enemies
             sprite:pokeTokenSprite(L.obj), unlinked:false, obj:L.obj, kind:"enc" }; }
  if(L.kind==="enctrainer"){ const max=Math.max(1,trainerDerived(L.obj).hp); let cur=L.obj.currentHP; if(cur==null)cur=max;
    return { cur, max, editable:cloud.isGM, name:L.obj.name||"Trainer",
             sprite:TRAINER_TOKEN(L.obj), unlinked:false, obj:L.obj, kind:"enctrainer" }; }
  if(L.kind==="trainer"){ const max=Math.max(1,trainerDerived(L.obj).hp); let cur=L.obj.currentHP; if(cur==null)cur=max;
    return { cur, max, editable:canEditPlayerHP(L.row), name:L.obj.name||L.row.data?.name||"Trainer",
             sprite:TRAINER_TOKEN(L.obj), unlinked:false, row:L.row, obj:L.obj, kind:"trainer" }; }
  const sp=getSpecies(L.obj.species); const max=Math.max(1,pokeDerived(L.obj).maxHP); let cur=L.obj.currentHP; if(cur==null)cur=max;
  return { cur, max, editable:canEditPlayerHP(L.row), name:L.obj.nickname||sp?.name||L.obj.species||"Pokémon",
           sprite:pokeTokenSprite(L.obj), unlinked:false, row:L.row, obj:L.obj, kind:"pokemon" };
}
/* players may only see HP for PC trainers/Pokémon; the GM sees everything (incl. enemies & standalone tokens) */
function tokenHpVisible(info){
  return cloud.isGM || info.kind==="trainer" || info.kind==="pokemon";
}
/* ---- quick-attack helper: defender = the clicked token ---- */
function tokenDefTypes(token){
  const L = token.link ? tokenLinked(token) : null;
  if(L && L.obj){
    if(L.kind==="trainer"||L.kind==="enctrainer") return [];        // trainers are typeless
    return getSpecies(L.obj.species)?.types || [];
  }
  return token.species ? (getSpecies(token.species)?.types || []) : [];
}
function tokenDefenseStat(token, physical){
  const L = token.link ? tokenLinked(token) : null;
  if(L && L.obj){
    if(L.kind==="trainer"||L.kind==="enctrainer"){ const d=trainerDerived(L.obj); return physical?d.totals.def:d.totals.spdef; }
    const d=pokeDerived(L.obj); return physical?d.eff.def:d.eff.spdef;
  }
  return 0;   // standalone token has no defense data
}
function typeMultAgainst(atkType, defTypes){
  let m=1; (defTypes||[]).forEach(dt=>{ m *= (TYPE_CHART[atkType]?.[dt] ?? 1); }); return m;
}
/* ---- initiative: Speed stat + an editable per-token bonus (amulets, effects…) ---- */
function tokenSpeed(token){
  const L = token.link ? tokenLinked(token) : null;
  if(L && L.obj){
    if(L.kind==="trainer"||L.kind==="enctrainer") return trainerDerived(L.obj).totals.spd||0;
    return pokeDerived(L.obj).eff.spd||0;
  }
  return token.spd||0;
}
function tokenInitiative(token){ return tokenSpeed(token) + (token.initBonus||0); }
function tokenInInit(token){
  const info=tokenHp(token); if(info.unlinked) return false;
  const ally = info.kind==="trainer"||info.kind==="pokemon";
  return ally ? token.inInit!==false : !!token.inInit;   // players auto-join; enemies opt-in via the token menu
}
function initiativeList(map){
  return mapTokensFor(map.id).filter(tokenInInit)
    .map(t=>({ token:t, info:tokenHp(t), init:tokenInitiative(t) }))
    .sort((a,b)=> b.init-a.init || tokenSpeed(b.token)-tokenSpeed(a.token) || (a.info.name||"").localeCompare(b.info.name||""));
}
async function advanceInitiative(map, meta, dir){
  const list = initiativeList(map); if(!list.length) return;
  let idx = list.findIndex(e=>e.token.id===meta.initTurnId);
  idx = idx<0 ? 0 : idx+dir;
  let wrapped=false;
  if(idx>=list.length){ idx=0; wrapped=true; }
  if(idx<0) idx=list.length-1;
  meta.initTurnId = list[idx].token.id;
  if(wrapped){ meta.initRound=(meta.initRound||1)+1; resetMapMovement(map); await mapTokensUpsert(); }  // new round resets movement
  await mapMetaUpsert(); renderMap();
}
function initiativePanel(map, meta){
  const card = el("div",{class:"card"});
  const head = el("div",{class:"inline",style:"justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"});
  head.append(el("h3",{style:"margin:0"}, "⚔ Initiative ", el("span",{class:"muted small"}, `· Round ${meta.initRound||1}`)));
  const list = initiativeList(map).filter(e=> cloud.isGM || !e.token.gmHidden);   // players never see hidden tokens
  if(cloud.isGM && list.length) head.append(el("button",{class:"btn-primary",onclick:()=>advanceInitiative(map,meta,1)},"▶ Next turn"));
  card.append(head);
  if(!list.length){ card.append(el("div",{class:"muted small",style:"margin-top:6px"},
    cloud.isGM ? "No combatants yet — player tokens join automatically; tap an enemy token → “⚔ In initiative”."
               : "The GM hasn't started initiative yet.")); return card; }
  if(!meta.initTurnId || !list.find(e=>e.token.id===meta.initTurnId)) meta.initTurnId = list[0].token.id;
  const ol = el("div",{style:"margin-top:8px;display:flex;flex-direction:column;gap:3px"});
  list.forEach((e,i)=>{
    const cur = e.token.id===meta.initTurnId;
    const enemy = e.info.kind==="enc"||e.info.kind==="enctrainer";
    const name = (!cloud.isGM && e.token.gmHidden) ? "Hidden" : e.info.name;
    const row = el("div",{style:`display:flex;gap:8px;align-items:center;padding:4px 6px;border-radius:6px;${cur?"background:rgba(224,82,79,.16);outline:1px solid var(--accent)":""}`});
    row.append(el("span",{style:"width:16px;text-align:right;font-weight:800;color:var(--muted)"}, String(i+1)));
    row.append(el("span",{style:`flex:1;min-width:0;font-weight:${cur?800:600};${enemy?"color:#e0524f":""}`}, (cur?"▶ ":"")+name));
    row.append(el("span",{class:"small muted",title:"Speed + bonus"}, "init "+e.init));
    if(cloud.isGM){
      const b=el("input",{type:"number",value:e.token.initBonus||0,title:"initiative bonus (e.g. Julie's amulet)",style:"width:52px"});
      b.addEventListener("change",async()=>{ e.token.initBonus=parseInt(b.value)||0; await mapTokensUpsert(); renderMap(); });
      row.append(b);
      if(enemy||!e.token.link) row.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted)",title:"remove from initiative",
        onclick:async()=>{ e.token.inInit=false; await mapTokensUpsert(); renderMap(); }},"×"));
    }
    ol.append(row);
  });
  card.append(ol);
  return card;
}
/* faction ring around a token: green for PCs & their Pokémon, red for enemies, none for standalone/unlinked */
function tokenFactionColor(info){
  if(info.unlinked) return null;
  if(info.kind==="trainer" || info.kind==="pokemon") return "#3ecf5f";
  if(info.kind==="enc" || info.kind==="enctrainer") return "#e0524f";
  return null;
}
const STATUS_RING_DEFAULT_COLOR = "#e0524f";
const STATUS_RING_COLORS = {
  burned:        "#e07a1f",  // orange
  frozen:        "#8fd6f0",  // light blue
  paralysis:     "#e8d92a",  // yellow
  poisoned:      "#a259d9",  // purple
  badlyPoisoned: "#5c1f80",  // dark purple
  sleep:         "#f2f2f2",  // white
};
function xmlEscape(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function polarPt(cx,cy,r,angleDeg){ const a=(angleDeg-90)*Math.PI/180; return [(cx+r*Math.cos(a)).toFixed(2), (cy+r*Math.sin(a)).toFixed(2)]; }
/* builds one full concentric ring per active status (innermost = first status), each with its name curving around it */
function tokenStatusRingSVG(keys, boxPx, uid){
  const defs = keys.map(k=>statusByKey.get(k)).filter(Boolean);
  if(!defs.length) return "";
  const strokeW = Math.max(2, Math.round(boxPx*0.05)), fontSize = Math.max(6, Math.round(boxPx*0.11));
  const ringGap = Math.max(strokeW*2.4, Math.round(boxPx*0.16));      // spacing between concentric rings
  const baseR = boxPx/2 + Math.max(strokeW*1.5, Math.round(boxPx*0.12)); // innermost ring, just outside the token
  const outerR = baseR + (defs.length-1)*ringGap;
  const pad = Math.ceil(outerR - boxPx/2 + strokeW*1.5 + fontSize*0.6);
  const size = boxPx + pad*2, cx = size/2, cy = size/2;
  let parts = "";
  defs.forEach((s,i)=>{
    const r = baseR + i*ringGap;
    const color = STATUS_RING_COLORS[s.key] || STATUS_RING_DEFAULT_COLOR;
    const id = `tkring_${uid}_${i}`;
    // full circle drawn as two semicircle arcs, doubling as the path the label text curves along
    const d = `M ${cx} ${(cy-r).toFixed(2)} A ${r} ${r} 0 1 1 ${cx} ${(cy+r).toFixed(2)} A ${r} ${r} 0 1 1 ${cx} ${(cy-r).toFixed(2)}`;
    parts += `<path id="${id}" d="${d}" fill="none" stroke="${color}" stroke-width="${strokeW}"/>`;
    parts += `<text font-size="${fontSize}" fill="${color}" font-weight="700" style="paint-order:stroke;stroke:#0a0c10;stroke-width:2px"><textPath href="#${id}" startOffset="4%" text-anchor="start">${xmlEscape(s.name)}</textPath></text>`;
  });
  // fixed square SVG sized to its own content; centering is handled purely by CSS on the
  // .tk-status-ring wrapper (flex centering) rather than manual left/top offsets here, so the
  // ring can never drift off-center regardless of border-box/border-width quirks on the token.
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;overflow:visible;pointer-events:none">${parts}</svg>`;
}
async function setTokenHP(token, val){
  const info = tokenHp(token);
  if(!info.editable){ toast("Read-only"); return; }
  if(!token.link){
    token.hp = Math.max(-99, Math.min(token.maxHp||1, val|0));
    await mapTokensUpsert(); if(!$(".modal")) renderMap(); return;
  }
  const { row, obj, kind } = info; if(!obj){ toast("Can't edit that token"); return; }
  if(kind==="enc" || kind==="enctrainer"){       // live-linked enemy → write to the encounter itself
    const encMax = kind==="enctrainer" ? trainerDerived(obj).hp : pokeDerived(obj).maxHP;
    obj.currentHP = Math.max(-99, Math.min(encMax, val|0));
    await encUpsert(); if(!$(".modal")) render();  // render() refreshes both the map and the Encounters tab
    return;
  }
  if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; }
  const max = kind==="trainer" ? trainerDerived(obj).hp : pokeDerived(obj).maxHP;
  obj.currentHP = Math.max(-99, Math.min(max, val|0));
  await cloudUpsert(row);                       // writes the real sheet; realtime syncs the owner
  if(!$(".modal")) renderMap();
}
/* the live list of status-effect keys currently on a token's underlying trainer/Pokémon/enemy/standalone data */
function tokenStatusKeys(token){
  if(!token.link) return Array.isArray(token.statuses) ? token.statuses : [];
  const L = tokenLinked(token);
  return (L && L.obj && Array.isArray(L.obj.statuses)) ? L.obj.statuses : [];
}
/* write a new full set of status keys back to whichever place the token's data actually lives */
async function setTokenStatuses(token, keys){
  const info = tokenHp(token);
  if(!info.editable){ toast("Read-only"); return; }
  if(!token.link){
    token.statuses = keys;
    await mapTokensUpsert(); if(!$(".modal")) renderMap(); return;
  }
  const { row, obj, kind } = info; if(!obj){ toast("Can't edit that token"); return; }
  obj.statuses = keys;
  if(kind==="enc" || kind==="enctrainer"){       // live-linked enemy → write to the encounter itself
    await encUpsert(); if(!$(".modal")) render(); return;
  }
  if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; }
  await cloudUpsert(row);
  if(!$(".modal")) renderMap();
}
function canRemoveToken(token){
  if(cloud.isGM) return true;
  return !!token.link && canEdit(cloud.byId[token.link.sheetId]);
}
async function removeToken(token, map){
  const arr = cloud.mapTokens?.data?.byMap?.[map.id]; if(!arr) return;
  const i = arr.findIndex(t=>t.id===token.id); if(i>=0) arr.splice(i,1);
  await mapTokensUpsert(); renderMap();
}
/* the cell at the centre of what the viewer is currently looking at (for placing new tokens there) */
function mapViewCenterCell(map, size){
  const vp = document.querySelector("#view-map .map-viewport");
  const n = (cloud.mapTokens?.data?.byMap?.[map.id]||[]).length;
  if(!vp) return { x:(n%8)+1, y:Math.floor(n/8)+1 };          // fallback before the board is drawn
  const r = vp.getBoundingClientRect(), px = map.gridSize, sz = size||1;
  const cbx = (r.width/2  - mapView.panX)/mapView.scale;      // viewport centre → stage base coords
  const cby = (r.height/2 - mapView.panY)/mapView.scale;
  return { x: Math.max(0, Math.round(cbx/px - sz/2)), y: Math.max(0, Math.round(cby/px - sz/2)) };
}
async function addToken(map, partial){
  ensureMapTokens();
  const byMap = cloud.mapTokens.data.byMap;
  const arr = byMap[map.id] || (byMap[map.id]=[]);
  const pos = mapViewCenterCell(map, partial.size||1);
  const tok = Object.assign({ id:uid(), size:1 }, partial, { x:pos.x, y:pos.y });
  arr.push(tok);
  if(map.fogOn) revealAroundTokens(map);      // a freshly-placed player token reveals its surroundings
  await mapTokensUpsert(); renderMap();
}

/* ---- fog of war: auto-reveal a radius around player-character tokens; revealed stays revealed ---- */
function tokenReveals(token){
  if(typeof token.reveal==="boolean") return token.reveal;   // GM per-token override
  return !!token.link && !ENEMY_LINKS.has(token.link.kind);  // player characters reveal; enemies/custom don't
}
/* reveal a CIRCULAR disc of cells (Euclidean radius) around a cell */
function revealDisc(set, cx, cy, r){
  const rr = (r+0.35)*(r+0.35), ri = Math.ceil(r);   // +0.35 rounds the edge out to a fuller circle
  for(let dx=-ri; dx<=ri; dx++) for(let dy=-ri; dy<=ri; dy++)
    if(dx*dx+dy*dy <= rr){ const x=cx+dx, y=cy+dy; if(x>=0 && y>=0) set.add(x+","+y); }
}
/* reveal discs around every cell of a token's footprint */
function revealFootprint(set, cx, cy, span, r){
  for(let fx=cx; fx<=cx+span; fx++) for(let fy=cy; fy<=cy+span; fy++) revealDisc(set, fx, fy, r);
}
function mapFogData(){ ensureMapTokens(); return cloud.mapTokens.data.fog || (cloud.mapTokens.data.fog={}); }
function revealAroundTokens(map){
  const fogData = mapFogData();
  const set = new Set(fogData[map.id] || []);
  const r = Math.max(1, map.fogRadius||3);
  mapTokensFor(map.id).forEach(t=>{ if(tokenReveals(t)) revealFootprint(set, Math.round(t.x), Math.round(t.y), (t.size||1)-1, r); });
  fogData[map.id] = [...set];
}
/* live reveal around a specific cell (used while dragging a token, before it's committed) */
function revealAtCell(map, cx, cy, span){
  const fogData = mapFogData();
  const set = new Set(fogData[map.id] || []);
  revealFootprint(set, cx, cy, span, Math.max(1, map.fogRadius||3));
  fogData[map.id] = [...set];
}
async function toggleFog(map){
  map.fogOn = !map.fogOn;
  if(map.fogOn) revealAroundTokens(map);
  await mapMetaUpsert();
  if(map.fogOn) await mapTokensUpsert();      // persist the initial reveal
  renderMap();
}
async function setFogRadius(map, v){
  map.fogRadius = Math.max(1, Math.min(20, parseInt(v)||3));
  if(map.fogOn){ revealAroundTokens(map); await mapTokensUpsert(); }
  await mapMetaUpsert(); renderMap();
}
async function resetFog(map){
  if(!confirm("Re-hide the whole map? Explored areas will be covered again.")) return;
  if(cloud.mapTokens?.data?.fog) cloud.mapTokens.data.fog[map.id] = [];
  if(map.fogOn) revealAroundTokens(map);      // keep current token surroundings visible
  await mapTokensUpsert(); renderMap();
}
/* draw fog onto a canvas sized to the stage; players see opaque cover, the GM sees a dim overlay */
function drawFog(cv, map, stageW, stageH){
  const px = map.gridSize; cv.width = Math.ceil(stageW); cv.height = Math.ceil(stageH);
  const ctx = cv.getContext("2d"); ctx.clearRect(0,0,cv.width,cv.height);
  ctx.fillStyle = cloud.isGM ? "rgba(8,10,14,0.5)" : "#0a0c10";
  const set = fogSet(map.id);
  const cols = Math.ceil(stageW/px), rows = Math.ceil(stageH/px);
  for(let x=0;x<cols;x++) for(let y=0;y<rows;y++) if(!set.has(x+","+y)) ctx.fillRect(x*px, y*px, px, px);
}

/* ---- battle mode: track how far each token has moved this round (diagonals cost 2) ---- */
function battleOn(){ return !!activeMapMeta().battleOn; }
/* a linked token's Overland movement (from its sheet, in metres); null for standalone/unknown */
function tokenMoveSpeed(token){
  if(!token.link) return null;
  const L = tokenLinked(token); if(!L || !L.obj) return null;
  if(L.kind==="trainer" || L.kind==="enctrainer") return trainerDerived(L.obj).overland || null;
  return getSpecies(L.obj.species)?.capabilities?.overland || null;   // sheet or encounter Pokémon
}
/* Manhattan tile cost between two cells (no diagonal movement → a diagonal step costs 2) */
function tileCost(ax, ay, bx, by){ return Math.abs(Math.round(ax)-Math.round(bx)) + Math.abs(Math.round(ay)-Math.round(by)); }
function resetMapMovement(map){
  ensureMapTokens();
  mapTokensFor(map.id).forEach(t=>{ t.moved=0; delete t.path; });
}
async function toggleBattle(map){
  const meta = activeMapMeta(); meta.battleOn = !meta.battleOn;
  if(meta.battleOn) resetMapMovement(map);            // start combat with fresh movement counters
  await mapMetaUpsert();
  if(meta.battleOn) await mapTokensUpsert();
  renderMap();
  toast(meta.battleOn ? "⚔ Battle mode on — tracking movement" : "Battle mode off");
}
async function newRound(map){
  resetMapMovement(map); await mapTokensUpsert(); renderMap(); toast("↺ New round — movement reset");
}
async function resetTokenMovement(token, map){
  token.moved = 0; delete token.path;
  await mapTokensUpsert(); renderMap();
}

/* ---- push-to-players: choose which map everyone sees ---- */
async function pushMapToPlayers(map){
  const meta = activeMapMeta();
  meta.playerMapId = map.id;
  await mapMetaUpsert(); renderMap();
  toast(`Players now see “${map.name}” 👁`);
}

/* ---- multiple background images per map (movable / resizable / layered) ---- */
function addMapImage(map){
  const inp = el("input",{type:"file",accept:"image/*",style:"display:none"});
  inp.addEventListener("change", async ()=>{
    const f = inp.files && inp.files[0]; if(!f){ inp.remove(); return; }
    try{ const dataUrl = await fileToDataURL(f);
      prepMapBg(dataUrl, out=>{
        const probe = new Image();
        probe.onload = async ()=>{
          map.images.push({ id:uid(), src:out, x:0, y:0, w:probe.naturalWidth||map.gridSize*10, h:probe.naturalHeight||map.gridSize*10 });
          await mapMetaUpsert(); renderMap(); toast("Image added ✓");
        };
        probe.onerror = ()=>toast("⚠ Could not read that image");
        probe.src = out;
      });
    }catch(e){ toast("⚠ Could not read that image"); }
    inp.remove();
  });
  document.body.append(inp); inp.click();
}
async function moveMapImageLayer(map, img, dir){
  const i = map.images.indexOf(img); if(i<0) return;
  const j = i + dir; if(j<0 || j>=map.images.length) return;
  map.images.splice(i,1); map.images.splice(j,0,img);
  await mapMetaUpsert(); renderMap();
}
async function deleteMapImage(map, img){
  const i = map.images.indexOf(img); if(i<0) return;
  map.images.splice(i,1); await mapMetaUpsert(); renderMap();
}

/* one token element */
function mapTokenNode(token, map){
  const info = tokenHp(token);
  const px = map.gridSize, size = token.size||1, boxPx = size*px;
  const factionColor = tokenFactionColor(info);
  const node = el("div",{class:"map-token"+(info.unlinked?" unlinked":"")+(info.editable?" editable":"")+(token.gmHidden?" gm-hidden":""),
    style:`left:${token.x*px}px;top:${token.y*px}px;width:${boxPx}px;height:${boxPx}px`
      +(token.gmHidden?";opacity:0.55;outline:2px dashed #f5a623;outline-offset:2px":"")
      +(factionColor?`;border-color:${factionColor}`:"")});
  node.dataset.tid = token.id;
  info.sprite.classList.add("tk-img");
  node.append(info.sprite);
  const hpVisible = info.unlinked || tokenHpVisible(info);   // "unlinked" warning always shows; real HP is gated
  if(hpVisible){
    const pct = Math.max(0, Math.min(100, Math.round(info.cur/info.max*100)));
    node.append(el("div",{class:"tk-hpwrap"},
      el("div",{class:"tk-hp"+(pct<=25?" low":pct<=50?" mid":""), style:`width:${pct}%`})));
  }
  node.append(el("div",{class:"tk-name"}, (token.gmHidden?"🙈 ":"") + info.name + (info.unlinked?" ⚠":"")));
  if(hpVisible) node.append(el("div",{class:"tk-hpnum"}, info.unlinked?"⚠ unlinked":`${info.cur}/${info.max}`));
  if(hpVisible && !info.unlinked){
    const keys = tokenStatusKeys(token).filter(k=>statusByKey.has(k));
    const ringHtml = tokenStatusRingSVG(keys, boxPx, token.id);
    if(ringHtml) node.append(el("div",{class:"tk-status-ring", html:ringHtml}));
  }
  if(battleOn() && token.moved){                              // movement used this round vs Overland speed
    const spd = tokenMoveSpeed(token);
    node.append(el("div",{class:"tk-moved"+(spd && token.moved>spd?" over":"")}, `${token.moved}${spd?("/"+spd):""}m`));
  }
  return node;
}
/* drag-to-move (grid-snap + meter readout) or tap-to-open-menu */
function attachTokenDrag(node, token, map){
  node.addEventListener("pointerdown", ev=>{
    if(ev.button!=null && ev.button>0) return;
    ev.stopPropagation();                                   // don't pan the board
    const info = tokenHp(token);
    const px = map.gridSize, scale = mapView.scale;
    const startX = ev.clientX, startY = ev.clientY;
    const baseX0 = token.x*px, baseY0 = token.y*px;
    let moved = false, badge = null;
    // for live fog reveal while dragging
    const liveFog = map.fogOn && tokenReveals(token);
    const stageSize = liveFog ? mapStageSize(map) : null;
    const fogCanvas = liveFog ? document.querySelector("#view-map .map-fog") : null;
    let lastRevealX = null, lastRevealY = null;
    // battle mode: accumulate the FULL path travelled this drag (every tile entered), diagonals cost 2
    const trackMove = battleOn() && map.gridOn;
    const moveSpeed = trackMove ? tokenMoveSpeed(token) : null;
    const alreadyMoved = token.moved || 0;
    let segMoved = 0, pathX = token.x, pathY = token.y;
    try{ node.setPointerCapture(ev.pointerId); }catch(e){}
    const move = e=>{
      if(Math.abs(e.clientX-startX)>4 || Math.abs(e.clientY-startY)>4) moved = true;
      if(!moved || !info.editable) return;
      mapDragging = true;
      let nx = Math.max(0, baseX0+(e.clientX-startX)/scale), ny = Math.max(0, baseY0+(e.clientY-startY)/scale);
      if(map.gridOn){ nx = Math.round(nx/px)*px; ny = Math.round(ny/px)*px; }   // snap to cells live
      node.style.left = nx+"px"; node.style.top = ny+"px";
      const cx = Math.round(nx/px), cy = Math.round(ny/px);
      if(map.gridOn){                                                            // accumulate every tile entered (diagonals cost 2)
        if(cx!==pathX || cy!==pathY){ segMoved += tileCost(pathX,pathY,cx,cy); pathX=cx; pathY=cy; }
        if(!badge){ badge = el("div",{class:"tk-move"}); node.append(badge); }
        if(trackMove){
          const total = alreadyMoved+segMoved;
          badge.textContent = `${segMoved}m · round ${total}${moveSpeed?("/"+moveSpeed):""}m`;
          badge.classList.toggle("over", !!moveSpeed && total>moveSpeed);
        } else badge.textContent = `${segMoved}m`;
      }
      if(liveFog){                                                              // reveal live as it moves
        if(cx!==lastRevealX || cy!==lastRevealY){
          lastRevealX = cx; lastRevealY = cy;
          revealAtCell(map, cx, cy, (token.size||1)-1);
          if(fogCanvas) drawFog(fogCanvas, map, stageSize.w, stageSize.h);
        }
      }
    };
    const up = async e=>{
      try{ node.releasePointerCapture(ev.pointerId); }catch(err){}
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      if(badge) badge.remove();
      if(!moved){ mapDragging=false; openTokenMenu(token, map); return; }
      if(!info.editable){ mapDragging=false; return; }
      const nx = Math.max(0, baseX0+(e.clientX-startX)/scale), ny = Math.max(0, baseY0+(e.clientY-startY)/scale);
      if(map.gridOn){
        const cx = Math.round(nx/px), cy = Math.round(ny/px);
        if(cx!==pathX || cy!==pathY){ segMoved += tileCost(pathX,pathY,cx,cy); pathX=cx; pathY=cy; }  // count the final tile(s)
        token.x = cx; token.y = cy;
      } else { token.x = nx/px; token.y = ny/px; }                                   // free placement
      if(trackMove) token.moved = alreadyMoved + segMoved;                           // add this drag's path to the round total
      if(map.fogOn) revealAroundTokens(map);                                        // moving reveals new ground
      mapDragging = false;
      await mapTokensUpsert(); renderMap();
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
  });
}
/* image-edit mode: drag to move, corner handle to resize (both grid-snap when the grid is on) */
function attachImageDrag(node, img, map){
  const px = map.gridSize, snap = v => map.gridOn ? Math.round(v/px)*px : v;
  const startDrag = (ev, mode)=>{
    if(ev.button!=null && ev.button>0) return;
    ev.stopPropagation();
    const scale = mapView.scale, sx=ev.clientX, sy=ev.clientY;
    const x0=img.x, y0=img.y, w0=img.w, h0=img.h;
    let moved=false;
    try{ node.setPointerCapture(ev.pointerId); }catch(e){}
    const move = e=>{
      if(Math.abs(e.clientX-sx)>3 || Math.abs(e.clientY-sy)>3) moved=true; if(!moved) return;
      mapDragging = true;
      const dx=(e.clientX-sx)/scale, dy=(e.clientY-sy)/scale;
      if(mode==="resize"){ img.w=Math.max(px, snap(w0+dx)); img.h=Math.max(px, snap(h0+dy)); }
      else { img.x=Math.max(0, snap(x0+dx)); img.y=Math.max(0, snap(y0+dy)); }
      node.style.left=img.x+"px"; node.style.top=img.y+"px"; node.style.width=img.w+"px"; node.style.height=img.h+"px";
    };
    const up = async ()=>{
      try{ node.releasePointerCapture(ev.pointerId); }catch(e){}
      node.removeEventListener("pointermove",move); node.removeEventListener("pointerup",up);
      mapDragging=false; if(moved){ await mapMetaUpsert(); renderMap(); }
    };
    node.addEventListener("pointermove",move); node.addEventListener("pointerup",up);
  };
  node.addEventListener("pointerdown", ev=>{ if(ev.target.closest(".map-img-handle")) return; startDrag(ev,"move"); });
}
function openTokenMenu(token, map){
  const info = tokenHp(token);
  const wrap = el("div",{});
  if(info.unlinked){
    wrap.append(el("div",{class:"r-body"},"⚠ The sheet or Pokémon this token pointed to no longer exists."));
  } else if(!tokenHpVisible(info)){
    wrap.append(el("div",{class:"r-body"},"🔒 You can't see this token's HP."));
  } else {
    const readout = el("div",{class:"tk-menu-hp"});
    const draw = ()=>{ const i=tokenHp(token); const p=Math.max(0,Math.min(100,Math.round(i.cur/i.max*100)));
      readout.innerHTML = `<b>${i.cur}</b> / ${i.max} HP &nbsp;<span class="muted small">${p}%</span>`; };
    draw();
    const mk = (d,l)=>el("button",{class:"btn-secondary",disabled:!info.editable,
      onclick:async()=>{ await setTokenHP(token, tokenHp(token).cur+d); draw(); }}, l);
    const setInp = el("input",{type:"number",style:"width:80px"});
    const setBtn = el("button",{class:"btn-secondary",disabled:!info.editable,
      onclick:async()=>{ const v=parseInt(setInp.value); if(!isNaN(v)){ await setTokenHP(token,v); draw(); setInp.value=""; } }},"Set");
    wrap.append(readout,
      el("div",{class:"tk-menu-row"}, mk(-5,"−5"), mk(-1,"−1"), mk(+1,"+1"), mk(+5,"+5")),
      el("div",{class:"tk-menu-row"}, setInp, setBtn));
    if(token.link) wrap.append(el("div",{class:"muted small",style:"margin-top:6px"},
      token.link.kind==="enc" ? "Linked to the encounter — HP syncs with the Encounters tab."
                              : "Linked to a sheet — HP changes sync to that character."));
    if(!info.editable) wrap.append(el("div",{class:"muted small",style:"margin-top:6px"},"Read-only — you can't edit this token."));

    const statusWrap = el("div",{style:"margin-top:14px"});
    const drawStatuses = ()=>{
      statusWrap.innerHTML = "";
      statusWrap.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"Status effects"));
      const active = tokenStatusKeys(token);
      [["persistent","Persistent"],["volatile","Volatile"],["other","Other"]].forEach(([kind,label])=>{
        const defs = STATUS_DEFS.filter(s=>s.kind===kind); if(!defs.length) return;
        statusWrap.append(el("div",{class:"small muted",style:"margin:6px 0 3px"}, label));
        const chips = el("div",{class:"chips"});
        defs.forEach(s=>{
          const on = active.includes(s.key);
          chips.append(el("button",{class:"statuschip"+(on?" on":""), disabled:!info.editable, title:s.effect,
            onclick: async()=>{
              const cur = tokenStatusKeys(token).slice();
              const i = cur.indexOf(s.key); if(i>=0) cur.splice(i,1); else cur.push(s.key);
              await setTokenStatuses(token, cur); drawStatuses();
            }}, s.name));
        });
        statusWrap.append(chips);
      });
    };
    drawStatuses();
    wrap.append(statusWrap);

    // Quick-attack: GM enters the incoming damage/type/class; we subtract this token's Defense,
    // apply type effectiveness, and take it off its HP (Core damage steps).
    if(info.editable){
      const atk = el("div",{style:"margin-top:16px"});
      atk.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"⚔ Apply an attack to this token"));
      const dmgIn = el("input",{type:"number",placeholder:"Damage",style:"width:88px"});
      const typeSel = el("select"); TYPES.forEach(ty=>typeSel.append(el("option",{value:ty},ty)));
      const clsSel = el("select"); clsSel.append(el("option",{value:"phys"},"Physical"), el("option",{value:"spec"},"Special"));
      const out = el("div",{class:"small",style:"margin-top:6px"});
      const apply = async ()=>{
        const dmg = parseInt(dmgIn.value);
        if(isNaN(dmg)){ out.textContent = "Enter a damage number."; return; }
        const physical = clsSel.value==="phys";
        const def = tokenDefenseStat(token, physical);
        const types = tokenDefTypes(token);
        const mult = typeMultAgainst(typeSel.value, types);
        const afterDef = Math.max(0, dmg - def);
        const final = Math.floor(afterDef * mult);
        const before = tokenHp(token).cur;
        await setTokenHP(token, before - final); draw();
        const eff = mult===0 ? "immune ×0" : mult>1 ? `super-effective ×${mult}` : mult<1 ? `resisted ×${mult}` : "neutral ×1";
        out.innerHTML = `${dmg} − ${def} ${physical?"Def":"SpDef"} = ${afterDef}, ${typeSel.value} ${eff} → <b>${final}</b> damage.<br>HP ${before} → <b>${before-final}</b>.`;
      };
      atk.append(el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px;align-items:center"},
        dmgIn, typeSel, clsSel, el("button",{class:"btn-primary",onclick:apply},"Apply")), out);
      wrap.append(atk);
    }
  }
  if(battleOn()){
    const used = token.moved||0, spd = tokenMoveSpeed(token), over = spd && used>spd;
    const row = el("div",{class:"tk-menu-row",style:"margin-top:12px;align-items:center"},
      el("div",{class:"small"+(over?" over":""),style:"font-weight:800"},
        `⚔ Moved this round: ${used}${spd?(" / "+spd):""}m`+(over?" — over speed!":"")));
    if(info.editable) row.append(el("button",{class:"btn-secondary",style:"margin-left:auto",
      onclick:async()=>{ await resetTokenMovement(token,map); closeModal(); }},"↺ Reset"));
    wrap.append(row);
  }
  const foot = [];
  if(canRemoveToken(token)){
    if(cloud.isGM){
      const szSel = el("select");
      [1,2,3,4].forEach(s=>szSel.append(el("option",{value:s,selected:s===(token.size||1)}, `${s}×${s}`)));
      szSel.addEventListener("change", async()=>{ token.size=parseInt(szSel.value)||1; if(map.fogOn) revealAroundTokens(map); await mapTokensUpsert(); renderMap(); });
      wrap.append(el("label",{class:"field",style:"margin-top:12px;max-width:150px"}, el("span",{},"Token size"), szSel));
      const rv = el("input",{type:"checkbox"}); rv.checked = tokenReveals(token);
      rv.addEventListener("change", async()=>{ token.reveal = rv.checked; if(map.fogOn) revealAroundTokens(map); await mapTokensUpsert(); renderMap(); });
      wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
        rv, el("span",{class:"small"},"👁 This token reveals fog of war")));
      const hd = el("input",{type:"checkbox"}); hd.checked = !!token.gmHidden;
      hd.addEventListener("change", async()=>{ token.gmHidden = hd.checked; await mapTokensUpsert(); renderMap(); toast(token.gmHidden?"🙈 Hidden from players":"👁 Visible to players"); });
      wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
        hd, el("span",{class:"small"},"🙈 Hide this token from players")));
      if(battleOn()){
        const info2=tokenHp(token), ally=info2.kind==="trainer"||info2.kind==="pokemon";
        const ii=el("input",{type:"checkbox"}); ii.checked = ally ? token.inInit!==false : !!token.inInit;
        ii.addEventListener("change", async()=>{ token.inInit=ii.checked; await mapTokensUpsert(); renderMap(); });
        wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
          ii, el("span",{class:"small"},"⚔ In initiative order")));
        const ib=el("input",{type:"number",value:token.initBonus||0,style:"width:64px"});
        ib.addEventListener("change", async()=>{ token.initBonus=parseInt(ib.value)||0; await mapTokensUpsert(); renderMap(); });
        wrap.append(el("label",{class:"field",style:"margin-top:8px;max-width:160px"}, el("span",{},"Initiative bonus"), ib));
      }
    }
    foot.push(el("button",{class:"btn-secondary danger",onclick:async()=>{ await removeToken(token,map); closeModal(); }},"🗑 Remove"));
  }
  foot.push(el("button",{class:"btn-primary",onclick:closeModal},"Done"));
  modal({title:info.name||"Token", bodyNode:wrap, footNodes:foot});
}

/* "Players" tab grouped by trainer: each character sheet → the trainer + their PARTY Pokémon */
function playerTokenGroups(){
  const sheetRows = cloud.isGM ? Object.values(cloud.byId)
                               : Object.values(cloud.byId).filter(r=>r.owner_id===cloud.userId);
  return sheetRows.map(r=>({
    id: r.id,
    owner: r.owner_name || "",
    trainerName: r.data?.trainer?.name || r.data?.name || "Trainer",
    trainerMake: ()=>({ link:{ sheetId:r.id, kind:"trainer" } }),
    mons: (r.data?.pokemon||[]).filter(p=>p.onTeam!==false).map(p=>({   // party only
      label: p.nickname||getSpecies(p.species)?.name||p.species||"Pokémon",
      sub: `Lv ${p.level}`,
      make: ()=>({ link:{ sheetId:r.id, kind:"pokemon", monId:p.id } }),
    })),
  }));
}
/* rows for the "Enemies" tab: standalone tokens from encounters (GM only) */
function enemyTokenRows(){
  const rows = [];
  encList().forEach(enc=>{                         // cloud encounters when connected, else local
    const push = p=>rows.push({ label:encMonName(p), sub:`Encounter: ${enc.name} · Lv ${p.level}`,
      make:()=>({ link:{ kind:"enc", encId:enc.id, monId:p.id } }) });   // live-linked to the encounter monster
    (enc.mons||[]).forEach(push);
    (enc.trainers||[]).forEach(tr=>{
      rows.push({ label:(tr.trainer?.name||"Trainer"), sub:`Encounter: ${enc.name} · Trainer Lv ${tr.trainer?.level||1}`,
        make:()=>({ link:{ kind:"enctrainer", encId:enc.id, trainerId:tr.id } }) });
      (tr.pokemon||[]).forEach(push);
    });
  });
  return rows;
}
/* pick something to drop on the map — split into Players / Enemies tabs */
function openAddToken(map){
  const wrap = el("div",{});
  let tab = "players";
  const tabsBar = el("div",{class:"subtabs"});
  const bPlayers = el("button",{class:"subtab on",onclick:()=>setTab("players")},"🧑 Players");
  const bEnemies = el("button",{class:"subtab",onclick:()=>setTab("enemies")},"👹 Enemies");
  tabsBar.append(bPlayers);
  if(cloud.isGM) tabsBar.append(bEnemies);
  const search = el("input",{type:"search",placeholder:"Filter…",style:"margin-bottom:10px"});
  const list = el("div",{class:"picklist"});
  const collapsed = new Set();                       // trainer sheet ids whose party is hidden
  const add = make => async ()=>{ closeModal(); await addToken(map, make()); };

  const draw = ()=>{
    const q = search.value.trim().toLowerCase(); list.innerHTML="";
    if(tab==="players"){
      const match = s => !q || (s||"").toLowerCase().includes(q);
      let shown = 0;
      playerTokenGroups().forEach(g=>{
        const trainerHit = match(g.trainerName) || match(g.owner);
        const mons = g.mons.filter(m=>trainerHit || match(m.label) || match(m.sub));
        if(!trainerHit && !mons.length) return;
        shown++;
        const expanded = q ? true : !collapsed.has(g.id);
        const head = el("div",{class:"pickitem pick-group",style:"cursor:pointer",
          onclick:()=>{ collapsed.has(g.id) ? collapsed.delete(g.id) : collapsed.add(g.id); draw(); }},
          el("span",{class:"pick-caret"}, expanded?"▾":"▸"),
          el("div",{style:"flex:1;min-width:0"},
            el("div",{class:"pi-title"}, g.trainerName + (cloud.isGM && g.owner ? `  ·  ${g.owner}` : "")),
            el("div",{class:"pi-sub muted"}, `${g.mons.length} in party`)),
          el("button",{class:"btn-secondary",style:"padding:4px 10px",title:"add the trainer as a token",
            onclick:e=>{ e.stopPropagation(); add(g.trainerMake)(); }},"＋ Trainer"));
        list.append(head);
        if(expanded){
          if(!mons.length) list.append(el("div",{class:"pickitem pick-mon muted"},"No party Pokémon."));
          mons.forEach(m=>list.append(el("div",{class:"pickitem pick-mon",style:"cursor:pointer",onclick:add(m.make)},
            el("div",{style:"flex:1;min-width:0"}, el("div",{class:"pi-title"},m.label), el("div",{class:"pi-sub muted"},m.sub)))));
        }
      });
      if(!shown) list.append(el("div",{class:"pickitem muted"}, q?"No matches.":"No character sheets yet."));
      return;
    }
    // enemies — flat list + custom-token entry
    list.append(el("div",{class:"pickitem",style:"font-weight:700",onclick:()=>{ closeModal(); openCustomToken(map); }},
      el("div",{class:"pi-title"},"✎ Custom token…"), el("div",{class:"pi-sub muted"},"Name it, set HP, optional image")));
    enemyTokenRows().filter(r=>!q||r.label.toLowerCase().includes(q)||(r.sub||"").toLowerCase().includes(q)).slice(0,250)
      .forEach(r=>list.append(el("div",{class:"pickitem",onclick:add(r.make)},
        el("div",{style:"flex:1;min-width:0"}, el("div",{class:"pi-title"},r.label), el("div",{class:"pi-sub muted"},r.sub||"")))));
  };
  const setTab = t => { tab=t; bPlayers.classList.toggle("on",t==="players"); bEnemies.classList.toggle("on",t==="enemies"); draw(); };
  search.addEventListener("input", draw); draw();
  wrap.append(tabsBar, search, list);
  modal({title:"Add a token", bodyNode:wrap, footNodes:[el("button",{class:"btn-secondary",onclick:closeModal},"Done")]});
  setTimeout(()=>search.focus(),50);
}
function openCustomToken(map){
  const nm = el("input",{type:"text",placeholder:"e.g. Boss, Trap, NPC"});
  const hp = el("input",{type:"number",value:50});
  let img = "";
  const imgBtn = el("button",{class:"btn-secondary",onclick:()=>pickImage(240, d=>{ img=d; imgBtn.textContent="✓ image set"; })},"📷 Image (optional)");
  const wrap = el("div",{},
    el("label",{class:"field"}, el("span",{},"Name"), nm), el("div",{style:"height:8px"}),
    el("label",{class:"field"}, el("span",{},"Max HP"), hp), el("div",{style:"height:8px"}), imgBtn);
  modal({title:"Custom token", bodyNode:wrap, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:async()=>{ const h=Math.max(1,parseInt(hp.value)||1);
      await addToken(map,{ label:nm.value.trim()||"Token", img, hp:h, maxHp:h }); closeModal(); }},"Add"),
  ]});
}

/* ---- map management (GM) ---- */
async function newMap(){
  const name = prompt("Map name:", "Map "+((cloud.mapMeta?.data?.maps?.length||0)+1)); if(name===null) return;
  ensureMapMeta();
  const m = { id:uid(), name:name||"Map", images:[], gridSize:48, gridOn:true, fogOn:false, fogRadius:3 };
  cloud.mapMeta.data.maps.push(m); cloud.mapMeta.data.activeMapId = m.id; mapGmView = m.id;
  mapView = { scale:1, panX:0, panY:0 };
  await mapMetaUpsert(); renderMap();
}
async function renameMap(map){ const n=prompt("Rename map:", map.name); if(n===null) return; map.name=n||map.name; await mapMetaUpsert(); renderMap(); }
async function deleteMap(map){
  if(!confirm(`Delete map “${map.name}” and its tokens?`)) return;
  const meta = cloud.mapMeta.data;
  meta.maps = meta.maps.filter(m=>m.id!==map.id);
  if(cloud.mapTokens?.data?.byMap) delete cloud.mapTokens.data.byMap[map.id];
  if(cloud.mapTokens?.data?.fog)   delete cloud.mapTokens.data.fog[map.id];
  const fallback = meta.maps[0]?.id || null;
  meta.activeMapId = fallback;
  if(meta.playerMapId===map.id) meta.playerMapId = fallback;
  if(mapGmView===map.id) mapGmView = fallback;
  await mapMetaUpsert(); await mapTokensUpsert(); renderMap();
}
/* Map backgrounds are often pixel-art/tile maps — keep them LOSSLESS (PNG) at full resolution
   instead of re-encoding to JPEG (which smears sharp tile edges). Only downscale genuinely huge
   images, and only fall back to JPEG if the data URL would be too big to sync comfortably. */
const MAP_BG_MAXDIM   = 4096;
const MAP_BG_MAXBYTES = 6 * 1024 * 1024;   // ~6 MB data-URL budget for the synced meta row
function fileToDataURL(f){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(f); }); }
function prepMapBg(dataUrl, cb){
  const img = new Image();
  img.onload = ()=>{
    const isPng = /^data:image\/png/i.test(dataUrl);
    const long  = Math.max(img.width, img.height);
    let out = dataUrl;                                   // small enough → keep the original bytes (lossless)
    if(long > MAP_BG_MAXDIM){
      const s = MAP_BG_MAXDIM/long, w = Math.round(img.width*s), h = Math.round(img.height*s);
      const cv = el("canvas"); cv.width=w; cv.height=h; cv.getContext("2d").drawImage(img,0,0,w,h);
      try{ out = isPng ? cv.toDataURL("image/png") : cv.toDataURL("image/jpeg",0.92); }catch(e){ out=dataUrl; }
    }
    if(out.length > MAP_BG_MAXBYTES){                    // still too heavy → shrink to a JPEG so sync stays sane
      const s = Math.min(1, MAP_BG_MAXDIM/long), w = Math.round(img.width*s), h = Math.round(img.height*s);
      const cv = el("canvas"); cv.width=w; cv.height=h; cv.getContext("2d").drawImage(img,0,0,w,h);
      try{ out = cv.toDataURL("image/jpeg",0.9); }catch(e){}
      toast("Large map — stored slightly compressed to keep sync fast");
    }
    cb(out);
  };
  img.onerror = ()=>toast("⚠ Could not read that image");
  img.src = dataUrl;
}
async function toggleGrid(map){ map.gridOn=!map.gridOn; await mapMetaUpsert(); renderMap(); }
async function clearMapTokens(map){ if(!confirm("Remove ALL tokens from this map?")) return;
  if(cloud.mapTokens?.data?.byMap) cloud.mapTokens.data.byMap[map.id]=[]; await mapTokensUpsert(); renderMap(); }

function applyMapCamera(stage){ stage.style.transformOrigin="0 0";
  stage.style.transform = `translate(${mapView.panX}px,${mapView.panY}px) scale(${mapView.scale})`; }
function attachPanZoom(viewport, stage){
  let zoomTimer = null;
  viewport.addEventListener("wheel", e=>{
    e.preventDefault();
    const rect = viewport.getBoundingClientRect();
    const cx = e.clientX-rect.left, cy = e.clientY-rect.top;
    const old = mapView.scale;
    const next = Math.max(0.2, Math.min(4, old*(e.deltaY<0?1.1:0.9)));
    // keep the point under the cursor fixed while zooming
    mapView.panX = cx - (cx-mapView.panX)*(next/old);
    mapView.panY = cy - (cy-mapView.panY)*(next/old);
    mapView.scale = next; applyMapCamera(stage);
    // The scaled stage is a cached GPU layer rasterized at the zoom it was BUILT at, so
    // wheel-zoom just stretches that stale bitmap (blurry/pixelated) until a full re-render
    // rebuilds the layer — which is why moving a token "fixed" it. Rebuild once zoom settles.
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(()=>{ if(currentTab==="map" && !mapDragging) renderMap(); }, 200);
  }, { passive:false });
  viewport.addEventListener("pointerdown", ev=>{
    if(ev.target.closest(".map-token")) return;            // tokens handle their own drag
    const sx=ev.clientX, sy=ev.clientY, px0=mapView.panX, py0=mapView.panY;
    try{ viewport.setPointerCapture(ev.pointerId); }catch(e){}
    const move = e=>{ mapView.panX=px0+(e.clientX-sx); mapView.panY=py0+(e.clientY-sy); applyMapCamera(stage); };
    const up = ()=>{ viewport.removeEventListener("pointermove",move); viewport.removeEventListener("pointerup",up); };
    viewport.addEventListener("pointermove",move); viewport.addEventListener("pointerup",up);
  });
}

/* stage dimensions = bounding box of all images, with a default floor */
function mapStageSize(map){
  let w = 30*map.gridSize, h = 20*map.gridSize;
  (map.images||[]).forEach(im=>{ if(im.w) w=Math.max(w, im.x+im.w); if(im.h) h=Math.max(h, im.y+im.h); });
  return { w, h };
}
/* one-time fixup: a migrated legacy background has w/h 0 — resolve to natural size (GM only) */
function resolveImageSizes(map){
  const pending = (map.images||[]).filter(im=>!im.w || !im.h);
  if(!pending.length || !cloud.isGM) return;
  let left = pending.length;
  pending.forEach(im=>{ const p=new Image(); p.onload=async()=>{ im.w=p.naturalWidth||map.gridSize*10; im.h=p.naturalHeight||map.gridSize*10;
    if(--left===0){ await mapMetaUpsert(); renderMap(); } }; p.onerror=()=>{ im.w=im.w||map.gridSize*10; im.h=im.h||map.gridSize*10; if(--left===0) renderMap(); }; p.src=im.src; });
}

function renderMap(){
  const root = $("#view-map"); root.innerHTML="";
  if(!cloudConfigured() || mode!=="cloud"){
    root.append(el("div",{class:"card"}, el("h3",{},"🗺 Map — shared battle map"),
      el("div",{class:"r-body"}, "The battle map is part of cloud play. Tap ", el("b",{},"☁ Cloud"),
        " to join your campaign, then come back to this tab.")));
    return;
  }
  const meta = activeMapMeta();
  const map  = currentMapForView();
  if(cloud.isGM && map) mapGmView = map.id;

  const bar = el("div",{class:"map-toolbar card"});
  if(cloud.isGM){
    // — Maps group: private browsing + push to players —
    if(meta.maps.length){
      const sel = el("select");
      meta.maps.forEach(m=>sel.append(el("option",{value:m.id,selected:m.id===mapGmView},
        m.name + (m.id===meta.playerMapId ? " 👁" : ""))));
      sel.addEventListener("change", ()=>{ mapGmView=sel.value; mapView={scale:1,panX:0,panY:0}; renderMap(); });
      bar.append(el("label",{class:"field",style:"max-width:190px"}, el("span",{},"Viewing (private)"), sel));
    }
    bar.append(el("button",{class:"btn-secondary",onclick:newMap},"＋ New map"));
    if(map){
      const shown = map.id===meta.playerMapId;
      bar.append(el("button",{class:"btn-primary"+(shown?" on":""),onclick:()=>pushMapToPlayers(map),
        title:"Make this the map players see"}, shown?"👁 Players see this":"👁 Show to players"));
      bar.append(
        el("button",{class:"btn-secondary",onclick:()=>renameMap(map)},"✎ Rename"),
        el("button",{class:"btn-secondary danger",onclick:()=>deleteMap(map)},"🗑 Delete"),
      );
      // — Scene group: images, grid —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary",onclick:()=>addMapImage(map)},"＋ Add image"),
        el("button",{class:"btn-secondary"+(mapImgEdit?" on":""),onclick:()=>{ mapImgEdit=!mapImgEdit; renderMap(); },
          title:"Move/resize/layer the map images"}, mapImgEdit?"🖼 Editing images":"🖼 Edit images"),
        el("button",{class:"btn-secondary"+(map.gridOn?" on":""),onclick:()=>toggleGrid(map)}, map.gridOn?"▦ Grid on":"▦ Grid off"),
      );
      const gs = el("input",{type:"number",min:12,max:200,value:map.gridSize,style:"width:64px",title:"grid cell size (px)"});
      gs.addEventListener("change", async()=>{ map.gridSize=Math.max(12,Math.min(200,parseInt(gs.value)||48)); await mapMetaUpsert(); renderMap(); });
      bar.append(el("label",{class:"field",style:"max-width:120px"}, el("span",{},"Cell px"), gs));
      // — Play group: tokens, fog —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-primary",onclick:()=>openAddToken(map)},"＋ Add token"),
        el("button",{class:"btn-secondary",onclick:()=>clearMapTokens(map)},"Clear tokens"),
        el("button",{class:"btn-secondary"+(map.fogOn?" on":""),onclick:()=>toggleFog(map),
          title:"Auto-reveals around player tokens; explored areas stay revealed"}, map.fogOn?"🌫 Fog on":"🌫 Fog off"),
      );
      if(map.fogOn){
        const fr = el("input",{type:"number",min:1,max:20,value:map.fogRadius,style:"width:56px",title:"reveal radius (cells)"});
        fr.addEventListener("change", ()=>setFogRadius(map, fr.value));
        bar.append(el("label",{class:"field",style:"max-width:110px"}, el("span",{},"Fog radius"), fr),
          el("button",{class:"btn-secondary",onclick:()=>resetFog(map)},"Reset fog"));
      }
      // — Battle group: track movement per token —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary"+(meta.battleOn?" on":""),onclick:()=>toggleBattle(map),
          title:"Track how far each token moves per round (diagonals cost 2)"}, meta.battleOn?"⚔ Battle on":"⚔ Battle off"));
      if(meta.battleOn) bar.append(el("button",{class:"btn-secondary",onclick:()=>newRound(map),title:"Reset every token's movement for a new round"},"↺ New round"));
    }
  } else {
    bar.append(el("div",{class:"map-mapname"}, map ? `🗺 ${map.name}` : "🗺 Battle map"));
    if(meta.battleOn) bar.append(el("span",{class:"battle-badge"},"⚔ Battle"));
    if(map && Object.values(cloud.byId).some(r=>r.owner_id===cloud.userId))
      bar.append(el("button",{class:"btn-primary",onclick:()=>openAddToken(map)},"＋ Add my token"));
  }
  root.append(bar);

  if(!map){
    root.append(el("div",{class:"card muted"}, cloud.isGM
      ? "No maps yet — tap “＋ New map”, then “＋ Add image” and drop some tokens."
      : "The GM hasn't shared a map yet."));
    return;
  }
  resolveImageSizes(map);   // resolve any migrated-bg natural sizes (no-op once done)
  if(meta.battleOn) root.append(initiativePanel(map, meta));

  const { w:stageW, h:stageH } = mapStageSize(map);
  const viewport = el("div",{class:"map-viewport"});
  const stage = el("div",{class:"map-stage",style:`width:${stageW}px;height:${stageH}px`});

  // layered images (back → front)
  if(!map.images.length) stage.append(el("div",{class:"map-nobg",style:`width:${stageW}px;height:${stageH}px`}));
  map.images.forEach(im=>{
    const node = el("img",{class:"map-img"+(mapImgEdit?" editing":""),src:im.src,draggable:false,alt:"",
      style:`left:${im.x}px;top:${im.y}px;`+(im.w?`width:${im.w}px;`:"")+(im.h?`height:${im.h}px;`:"")});
    if(mapImgEdit){
      const wrap = el("div",{class:"map-img-wrap editing",style:`left:${im.x}px;top:${im.y}px;width:${im.w||stageW}px;height:${im.h||stageH}px`});
      node.style.left="0px"; node.style.top="0px"; node.style.width="100%"; node.style.height="100%";
      wrap.append(node);
      wrap.append(el("div",{class:"map-img-ctrls"},
        el("button",{title:"bring forward",onclick:e=>{e.stopPropagation();moveMapImageLayer(map,im,1);}},"⬆"),
        el("button",{title:"send back",onclick:e=>{e.stopPropagation();moveMapImageLayer(map,im,-1);}},"⬇"),
        el("button",{title:"delete",class:"danger",onclick:e=>{e.stopPropagation();if(confirm("Remove this image?"))deleteMapImage(map,im);}},"🗑")));
      wrap.append(el("div",{class:"map-img-handle",title:"drag to resize"}));
      const handle = wrap.querySelector(".map-img-handle");
      attachImageDrag(wrap, im, map);
      // resize handle uses the same drag machinery in resize mode
      handle.addEventListener("pointerdown", ev=>{ ev.stopPropagation();
        const px=map.gridSize, snap=v=>map.gridOn?Math.round(v/px)*px:v, scale=mapView.scale;
        const sx=ev.clientX, sy=ev.clientY, w0=im.w, h0=im.h; let moved=false;
        try{ handle.setPointerCapture(ev.pointerId); }catch(e){}
        const mv=e=>{ moved=true; mapDragging=true; im.w=Math.max(px,snap(w0+(e.clientX-sx)/scale)); im.h=Math.max(px,snap(h0+(e.clientY-sy)/scale));
          wrap.style.width=im.w+"px"; wrap.style.height=im.h+"px"; };
        const up=async()=>{ try{handle.releasePointerCapture(ev.pointerId);}catch(e){} handle.removeEventListener("pointermove",mv); handle.removeEventListener("pointerup",up);
          mapDragging=false; if(moved){ await mapMetaUpsert(); renderMap(); } };
        handle.addEventListener("pointermove",mv); handle.addEventListener("pointerup",up); });
      stage.append(wrap);
    } else {
      stage.append(node);
    }
  });

  if(map.gridOn) stage.append(el("div",{class:"map-grid",style:`width:${stageW}px;height:${stageH}px;background-size:${map.gridSize}px ${map.gridSize}px`}));

  // tokens + fog, with role-dependent stacking. In image-edit mode tokens are inert.
  const fog = fogSet(map.id);
  const mkToken = t => { const node=mapTokenNode(t,map); if(!mapImgEdit) attachTokenDrag(node,t,map); else node.style.pointerEvents="none"; return node; };
  const visibleToken = t => {
    if(t.gmHidden) return false;                                    // GM has hidden this token from players entirely
    if(cloud.isGM || !map.fogOn) return true;
    if(t.link && cloud.byId[t.link.sheetId]?.owner_id===cloud.userId) return true;   // always see your own
    return fog.has(Math.round(t.x)+","+Math.round(t.y));
  };
  const drawFogInto = () => { if(!map.fogOn) return null; const cv=el("canvas",{class:"map-fog"}); drawFog(cv,map,stageW,stageH); return cv; };

  if(cloud.isGM){
    const f = drawFogInto(); if(f) stage.append(f);                 // GM: dim fog under tokens
    mapTokensFor(map.id).forEach(t=>stage.append(mkToken(t)));
  } else {
    mapTokensFor(map.id).forEach(t=>{ if(visibleToken(t)) stage.append(mkToken(t)); });
    const f = drawFogInto(); if(f) stage.append(f);                 // players: opaque fog over hidden tokens
  }

  applyMapCamera(stage);
  viewport.append(stage);
  attachPanZoom(viewport, stage);
  root.append(viewport);
  root.append(el("div",{class:"muted small",style:"margin-top:6px"},
    mapImgEdit ? "Image-edit mode: drag images to move, corner handle to resize, ⬆⬇ to layer. Turn it off to move tokens."
      : "Drag tokens to move (snaps to grid, shows metres). Tap a token to edit HP. Scroll to zoom · drag empty space to pan."));
}

function renderCloudBanner(){
  const ex=$("#cloudBanner"); if(ex) ex.remove();
  if(mode!=="cloud") return;
  let msg=null, extra="";
  if(!cloud.activeId) msg="No characters in this campaign yet — tap ＋ New to create yours.";
  else if(!canEditActive()){
    extra=" ro";
    msg=`Viewing ${cloud.byId[cloud.activeId]?.owner_name||"another player"}'s sheet — read-only.` +
        (CLOUD_CFG.gmCode ? " Enter the GM code (☁ Cloud) to edit." : "");
  }
  if(!msg) return;
  $("main").prepend(el("div",{id:"cloudBanner",class:"cloudbar"+extra}, msg));
}
function openCloudPanel(){
  if(!cloudConfigured())
    return infoModal("Cloud not set up", `<div class="r-body">This copy isn't configured for online sync. The GM needs to fill in <b>config.js</b> with Supabase details and host the app (see <b>SETUP-CLOUD.md</b>). The offline version still works on this device.</div>`);
  const wrap = el("div",{});
  if(mode==="cloud"){
    wrap.append(el("div",{class:"r-body"}, `Connected to “${cloud.campaign}” as ${cloud.name}${cloud.isGM?" — GM, can edit all sheets":" — you can edit your own sheets"}.`));
    if(cloud.isGM) wrap.append(el("div",{style:"margin-top:10px"},
      el("button",{class:"btn-primary",onclick:()=>openSendPokemon()},"🎁 Send a Pokémon to a player…")));
    const roster = el("div",{class:"reflist",style:"margin-top:10px"});
    Object.values(cloud.byId).sort((a,b)=>(a.owner_name||"").localeCompare(b.owner_name||"")).forEach(r=>{
      const item = el("div",{class:"refitem",style:"cursor:pointer;display:flex;gap:8px;align-items:center",
        onclick:()=>{ cloud.activeId=r.id; openMon=null; closeModal(); switchTab("trainer"); }},
        el("div",{style:"flex:1;min-width:0"},
          el("div",{class:"r-title"}, r.data?.name||"(unnamed)"),
          el("div",{class:"r-meta"}, `${r.owner_name||"?"}${r.owner_id===cloud.userId?" (you)":""} · ${(r.data?.pokemon?.length)||0} Pokémon`)));
      if(cloud.isGM) item.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",title:"send a Pokémon to this player",
        onclick:e=>{ e.stopPropagation(); openSendPokemon(r.id); }},"🎁 Send"));
      roster.append(item);
    });
    if(!Object.keys(cloud.byId).length) roster.append(el("div",{class:"muted"},"No characters yet."));
    wrap.append(el("div",{class:"r-meta",style:"margin-top:10px"},"Campaign roster (tap to open):"), roster);
    return modal({title:"Cloud campaign", bodyNode:wrap, footNodes:[
      el("button",{class:"btn-secondary",onclick:cloudDisconnect},"Leave / use this device"),
      el("button",{class:"btn-primary",onclick:closeModal},"Done"),
    ]});
  }
  const last = JSON.parse(localStorage.getItem("ptu_cloud_session")||"{}");
  const fCampaign = el("input",{type:"text",placeholder:"e.g. hugos-quest"}); fCampaign.value=last.campaign||"";
  const fName = el("input",{type:"text",placeholder:"Your name"}); fName.value=last.name||"";
  const fGm = el("input",{type:"password",placeholder:"Leave blank if you're a player"});
  wrap.append(
    el("label",{class:"field"},el("span",{},"Campaign code"),fCampaign), el("div",{style:"height:8px"}),
    el("label",{class:"field"},el("span",{},"Your display name"),fName), el("div",{style:"height:8px"}),
    el("label",{class:"field"},el("span",{},"GM code (optional)"),fGm),
    el("div",{class:"r-meta",style:"margin-top:8px"},"Everyone uses the same campaign code. Players edit their own sheets; the GM code unlocks editing everyone's."),
  );
  modal({title:"Join a cloud campaign", bodyNode:wrap, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>cloudConnect(fCampaign.value,fName.value,fGm.value)},"Connect"),
  ]});
}

/* ===================================================================
   boot
=================================================================== */
applyTheme();
render();
initCloud();

/* Persist pending cloud edits before the page goes away. visibilitychange→hidden is the one
   event mobile browsers reliably fire before killing a backgrounded/refreshed tab; pagehide
   covers desktop close/navigate. Both flush the debounced save via a keepalive request. */
document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="hidden") flushCloudSaves(); });
window.addEventListener("pagehide", flushCloudSaves);

/* register service worker when hosted (ignored on file://) */
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}