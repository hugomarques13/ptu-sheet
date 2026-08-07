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
/* Skill Categories (Core p.62) — used by the Categoric Inclination Edge's +1 bonus */
const SKILL_CATEGORY = {
  acrobatics:"Body", athletics:"Body", combat:"Body", stealth:"Body",
  perception:"Mind", generalEd:"Mind", medicineEd:"Mind", occultEd:"Mind", pokemonEd:"Mind", technologyEd:"Mind",
  intimidate:"Spirit", survival:"Spirit", guile:"Spirit", charm:"Spirit", command:"Spirit", focus:"Spirit", intuition:"Spirit",
};
/* +1 to every Skill Check in the chosen Category, if the trainer has the Edge and picked one */
function categoricBonus(t, skillKey){
  return (t.edges||[]).includes("Categoric Inclination") && t.categoricInclination
    && SKILL_CATEGORY[skillKey]===t.categoricInclination ? 1 : 0;
}

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
/* Tutor Points: a Pokémon starts with 1 upon hatching, +1 more every level evenly divisible by 5 */
function tutorPointsEarned(level){ return 1 + Math.floor(Math.max(1,level||1)/5); }

/* Status Afflictions (PTU 1.05 Core pp.245-248), corrected against the Feb 2016 Playtest Packet
   errata (p.2 "Status Conditions") where it overrides Core: Paralysis, Flinch, Infatuation, Confusion,
   Suppression, and the Vulnerable reminder note below. Everything else is unchanged Core RAW — the
   packet doesn't touch Burned/Frozen/Poisoned/Sleep/Cursed/Disabled/Enraged/Bad Sleep/Stuck/Slowed/
   Trapped/Blinded. kind drives the Capture-Rate bonus: persistent +10 each, volatile +5 each; "other"
   uses its own `cap`. */
const STATUS_DEFS = [
  {key:"burned", name:"Burned", kind:"persistent", immune:["Fire"],
   effect:"−2 Combat Stages to Defense. If it takes (or is prevented from taking, e.g. by Sleep/Flinch/Paralysis) a Standard Action, it loses a Tick of HP at the end of that turn. Fire-types are immune."},
  {key:"frozen", name:"Frozen", kind:"persistent", immune:["Ice"],
   effect:"Cannot act and gains no Evasion bonuses (always considered Vulnerable). DC 16 Save Check at end of each turn to cure (DC 11 for Fire-types; +4 in Sun, −2 in Hail). Cured if hit by a damaging Fire/Fighting/Rock/Steel attack. Ice-types immune."},
  {key:"chilled", name:"Chilled (Boss)", kind:"persistent", boss:true, immune:["Ice"],
   effect:"Boss Template's version of Frozen (Running the Game p.488) — affects every one of the Boss's turns each round instead of costing it actions. Loses half its Evasion; on a failed Save (16, DC 11 for Fire-types; checked at the end of each of its turns) it takes −10 to its next Damage Roll. Cured as normal (incl. being hit by a damaging Fire/Fighting/Rock/Steel attack), but unlike Frozen it doesn't auto-cure that way — same +4 Sun/−2 Hail Save mods apply. Ice-types immune."},
  {key:"paralysis", name:"Paralyzed", kind:"persistent", immune:["Electric"],
   effect:"(Feb 2016 errata) Initiative is halved. Save Check at the start of the user's turn, succeeding on 11+: on a success act normally; on a failure the user may only take a Standard OR Shift Action (not both) this round, is Vulnerable for 1 full round, and cannot take Attacks of Opportunity for 1 full round. Electric-types immune."},
  {key:"poisoned", name:"Poisoned", kind:"persistent", immune:["Poison","Steel"],
   effect:"−2 Combat Stages to Special Defense. If it takes (or is prevented from taking) a Standard Action, it loses a Tick of HP at end of turn. Poison & Steel-types immune."},
  {key:"badlyPoisoned", name:"Badly Poisoned", kind:"persistent", immune:["Poison","Steel"],
   effect:"As Poisoned, but instead loses 5 HP, doubling each consecutive round (10, 20, 40…)."},
  {key:"sleep", name:"Asleep", kind:"persistent",
   effect:"No Evasion bonuses (always considered Vulnerable); may only take Free/Swift Actions that cure Sleep. DC 16 Save at end of its turn to wake; also wakes on any active HP-loss attack (not passive Poison/Burn). Can't Save vs Rage/Infatuation/Confusion while asleep (but also can't hurt itself from Confusion)."},
  {key:"drowsy", name:"Drowsy (Boss)", kind:"persistent", boss:true,
   effect:"Boss Template's version of Asleep (Running the Game p.488) — affects every one of the Boss's turns each round instead of costing it actions. Loses half its Evasion; on a failed Save (16, checked at the end of each of its turns) it takes −10 to its next Damage Roll. Cured as normal, but unlike Sleep, taking damage does NOT auto-cure it."},
  {key:"confused", name:"Confused", kind:"volatile",
   effect:"(Feb 2016 errata) Cannot take Attacks of Opportunity. Whenever the user makes an Attack (even one without a roll), roll 1d2 — on a 1, after the attack resolves the user loses HP equal to half its Attack Stat (Physical Move), half its Special Attack Stat (Special Move), or two Ticks of HP (Status Move). Cured with a Save of 16+ made at end of turn."},
  {key:"cursed", name:"Cursed", kind:"volatile",
   effect:"If it takes a Standard Action, it loses two Ticks of HP at the end of that turn."},
  {key:"disabled", name:"Disabled", kind:"volatile",
   effect:"A specific Move (chosen when applied) can't be used while Disabled. May stack for different Moves."},
  {key:"enraged", name:"Enraged (Rage)", kind:"volatile",
   effect:"Must use a damaging Physical/Special Move or Struggle Attack. DC 15 Save at end of each turn to cure. Cannot choose to Take a Breather."},
  {key:"flinch", name:"Flinched", kind:"volatile",
   effect:"(Feb 2016 errata) Lowers Initiative by 5 for the rest of the Scene and the user is Vulnerable for 1 full round. Multiple instances stack (this app tracks it as a single flag — apply the −5 by hand again for a 2nd+ stack). Switching out removes the Initiative penalty."},
  {key:"infatuation", name:"Infatuated", kind:"volatile",
   effect:"(Feb 2016 errata) −5 penalty on all Damage Rolls that don't target the user's Crush; against the Crush, Attack and Special Attack are halved for the Damage Roll instead. Cured with a Save of 16+ made at end of turn."},
  {key:"badSleep", name:"Bad Sleep", kind:"volatile",
   effect:"Whenever it Saves against Sleep, it loses two Ticks of HP. Only affects Sleeping targets; cured when Sleep is cured."},
  {key:"suppressed", name:"Suppressed", kind:"volatile",
   effect:"(Feb 2016 errata) Cannot use Moves with any Frequency other than At-Will. Always lasts 1 full round."},
  {key:"stuck", name:"Stuck", kind:"other", cap:10, immune:["Ghost"],
   effect:"Cannot Shift to move and can't apply Speed Evasion. Removed by switching or as an Extended Action at end of Scene. Ghost-types immune. (+10 to Capture Rate.)"},
  {key:"slowed", name:"Slowed", kind:"other", cap:5,
   effect:"Movement halved (min 1). Removed by switching or at end of Scene. (+5 to Capture Rate.)"},
  {key:"trapped", name:"Trapped", kind:"other", cap:0, immune:["Ghost"],
   effect:"Cannot be recalled into a Poké Ball. Ghost-types immune."},
  {key:"tripped", name:"Tripped", kind:"other", cap:0,
   effect:"Must spend a Shift Action to get up before taking other actions. Always considered Vulnerable."},
  {key:"vulnerable", name:"Vulnerable", kind:"other", cap:0,
   effect:"Cannot apply Evasion of any sort against attacks. (Blinded, Sleeping, Fainted, Frozen, and Tripped targets are always considered Vulnerable too.)"},
  {key:"blinded", name:"Blinded", kind:"other", cap:0,
   effect:"−6 to Accuracy Rolls; must pass a DC 10 Acrobatics Check over Rough/Slow Terrain or become Tripped. Always considered Vulnerable."},
  {key:"petrified", name:"Petrified", kind:"other", cap:0,
   effect:"Is stone, irreversible."},
];
/* Trainings (Core p.76 "Elite Trainer" family — Agility/Brutal/Focused/Inspired Training): a Trainer
   applies one of these to a Pokémon as an Extended Action; they persist until an Extended Rest. Kept
   OUT of STATUS_DEFS on purpose — mechanically and visually distinct from Afflictions (no immunity/
   catch-rate interaction, not cured by End Day the same way), so they get their own toggle row instead
   of the round statuschip pips. Stored the same way though (p.statuses[]), so hasStatus()/toggleStatus()
   and the auto-applied effects (critThreshold's Brutal −1, tokenInitiative's Agile +4) work unchanged. */
const TRAINING_DEFS = [
  {key:"agile", name:"Agile", feature:"Agility Training",
   effect:"+1 bonus to Movement Capabilities and +4 to Initiative (the +4 Initiative is auto-applied on the Map's initiative tracker)."},
  {key:"brutal", name:"Brutal", feature:"Brutal Training",
   effect:"+1 to Critical-Hit range (auto-applied to move rolls) and +1 to Effect Range (apply by hand — the exact text varies per Move)."},
  {key:"focused", name:"Focused", feature:"Focused Training",
   effect:"+1 bonus to Accuracy Rolls (auto-applied to move rolls) and +2 to Skill Checks (apply by hand)."},
  {key:"inspired", name:"Inspired", feature:"Inspired Training",
   effect:"+1 bonus to Evasion (auto-applied to Phys/Spec/Speed Evasion) and +2 to Save Checks (apply by hand)."},
];
/* shared renderer for the Trainings toggle row — deliberately NOT .statuschip (no round pips): a
   flatter, square-cornered toggle so it reads as a different kind of thing at a glance. */
function trainingsRow(p, onToggle){
  const chips = el("div",{class:"chips training-chips"});
  TRAINING_DEFS.forEach(s=>{
    const on = hasStatus(p,s.key);
    chips.append(el("button",{class:"trainingchip"+(on?" on":""), title:s.effect,
      onclick:()=>{ toggleStatus(p,s.key); onToggle(); }}, s.name));
  });
  return chips;
}
const statusByKey = new Map(STATUS_DEFS.map(s=>[s.key, s]));
/* Move effect text almost never spells out the status ADJECTIVE ("Poisoned") — it uses a VERB
   ("Poisons the target on 18+"). Match verb roots per status, badlyPoisoned checked before
   poisoned so "badly poisons" doesn't get caught by the shorter pattern first. */
const STATUS_KEYWORDS = [
  ["badlyPoisoned", /\bbadly\s+poison(?:s|ed|ing)?\b/i],
  ["poisoned",      /\bpoison(?:s|ed|ing)?\b/i],
  ["burned",        /\bburn(?:s|ed|ing)?\b/i],
  ["frozen",        /\bfreez(?:e|es|ing)\b|\bfrozen\b/i],
  ["paralysis",     /\bparalyz(?:e|es|ed|ing)\b|\bparalysis\b/i],
  ["sleep",         /\basleep\b|\bfalls?\s+asleep\b|\bputs?\s+.{0,25}?\bto\s+sleep\b|\bsleep(?:s|ing)?\b/i],
  ["badSleep",      /\bbad\s+sleep\b/i],
  ["confused",      /\bconfus(?:e|es|ed|ing)\b/i],
  ["cursed",        /\bcurs(?:e|es|ed|ing)\b/i],
  ["disabled",      /\bdisabl(?:e|es|ed|ing)\b/i],
  ["enraged",       /\benrag(?:e|es|ed|ing)\b|\brage\b/i],
  ["flinch",        /\bflinch(?:es|ed|ing)?\b/i],
  ["infatuation",   /\binfatuat(?:e|es|ed|ing)\b/i],
  ["suppressed",    /\bsuppress(?:es|ed|ing)?\b/i],
  ["stuck",         /\bstuck\b/i],
  ["slowed",        /\bslow(?:s|ed|ing)?\b/i],
  ["trapped",       /\btrap(?:s|ped|ping)?\b/i],
  ["tripped",       /\btrip(?:s|ped|ping)?\b/i],
  ["vulnerable",    /\bvulnerable\b/i],
  ["blinded",       /\bblind(?:s|ed|ing)?\b/i],
];
/* does a triggered move-effect sentence name a known status condition? (for a big "Poisoned!"-style
   banner on the roll result) */
function statusHitFromText(text){
  const s = String(text||"");
  for(const [key,re] of STATUS_KEYWORDS) if(re.test(s)) return statusByKey.get(key);
  return null;
}
/* Combat Stages (Core p.234): only these 5 stats; +CS ×0.2 each, −CS ×0.1 each (−6…+6). */
const CS_STATS = [["atk","Attack"],["def","Defense"],["spatk","Sp.Atk"],["spdef","Sp.Def"],["spd","Speed"]];
/* Accuracy & Evasion Combat Stages (Core p.234): tracked the same way (steppers, −6…+6) but flat,
   not %-multiplied — Accuracy adds straight to Accuracy Rolls, Evasion adds straight to Physical/
   Special/Speed Evasion. Kept out of CS_STATS since they have no underlying base stat to multiply. */
const ACC_EVA_STATS = [["acc","Accuracy"],["eva","Evasion"]];
const ALL_CS_STATS = [...CS_STATS, ...ACC_EVA_STATS];
function csMult(cs){ cs = Math.max(-6, Math.min(6, cs||0)); return cs>=0 ? 1+0.2*cs : 1+0.1*cs; }
/* Status Afflictions that impose Combat Stages (Core p.245-246). Paralysis is NOT here — the Feb
   2016 errata replaced its −4 Speed CS with an Initiative-halving effect instead (see tokenInitiative). */
const CONDITION_CS = { burned:{def:-2}, poisoned:{spdef:-2}, badlyPoisoned:{spdef:-2}, blinded:{acc:-6} };
function conditionCSMods(p){
  const m = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  (p.statuses||[]).forEach(k=>{ const c=CONDITION_CS[k]; if(c) for(const s in c) m[s]+=c[s]; });
  return m;
}
/* effective Combat Stages = manual (p.cs) + condition mods, clamped −6…+6 */
function effectiveCS(p){
  const cond = conditionCSMods(p), wx = weatherCSMods(p), ab = abilityStatusCS(p), aura = auraCSMods(p), out = {};
  const eqSpd = isTrainerOwner(p) ? equipSpeedCS(p) : 0;   // Heavy Armor & co. shift the Speed default CS
  CS_STATS.forEach(([k]) => out[k] = Math.max(-6, Math.min(6, (p.cs?.[k]||0) + cond[k] + wx[k] + (ab[k]||0) + aura[k] + (k==="spd"?eqSpd:0))));
  ACC_EVA_STATS.forEach(([k]) => out[k] = Math.max(-6, Math.min(6, (p.cs?.[k]||0) + cond[k] + (ab[k]||0) + aura[k])));
  return out;
}
function hasStatus(p, key){ return Array.isArray(p.statuses) && p.statuses.includes(key); }
function toggleStatus(p, key){ p.statuses = p.statuses||[];
  const i=p.statuses.indexOf(key); if(i>=0) p.statuses.splice(i,1); else p.statuses.push(key); save(); }

/* ===================================================================
   Weather (Core p.342)
   One Weather Condition at a time, set by the GM on the battle map; new weather replaces old.
   The book gives them a 5-round duration, but per this table's ruling weather simply stays until
   the GM changes it — so nothing here counts rounds.

   What auto-applies: everything that lands on a roll or a stat — the ±5 type damage, Sand Force,
   the "cannot miss" / "AC 11" move exceptions, and the ability Combat-Stage & Evasion bonuses
   (they go through effectiveCS/pokeDerived, so CS-adjusted stats, evasion and every roll pick
   them up automatically). What does NOT auto-apply: the per-turn HP ticks — they're reported by
   weatherTickReport() and shown on the map so the GM applies them deliberately, since silently
   editing every combatant's HP each round is hard to notice and harder to undo.
   A "Tick" of HP is 1/10th of maximum (Core p.242). Sun Blanket / Desert Weather use 1/16th.
=================================================================== */
const hpTick      = max => Math.max(1, Math.floor((max||0)/10));
const hpSixteenth = max => Math.max(1, Math.floor((max||0)/16));
const normAbilityName = s => String(s||"").toLowerCase().replace(/[^a-z]/g,"");
function monHasAbility(p, name){
  const want = normAbilityName(name);
  return (p?.abilities||[]).some(a=>normAbilityName(a)===want);
}
const WEATHER_DEFS = [
  { key:"clear", name:"Clear skies", icon:"🌤", blurb:"No Weather Effect in play.", rules:[] },

  { key:"sunny", name:"Sunny", icon:"🌞",
    blurb:"Fire attacks +5 damage · Water attacks −5 damage",
    dmgByType:{ fire:+5, water:-5 },
    acOverride:{ thunder:11, hurricane:11 },
    abilityCS:{ "Thermosensitive":{ atk:2, spatk:2 }, "Chlorophyll":{ spd:4 }, "Solar Power":{ spatk:2 } },
    ticks:[
      { ability:"Dry Skin",    when:"end",   sign:-1, kind:"tick",      label:"Dry Skin — loses a Tick" },
      { ability:"Sun Blanket", when:"start", sign:+1, kind:"sixteenth", label:"Sun Blanket — gains 1/16 Max HP" },
      { ability:"Solar Power", when:"start", sign:-1, kind:"sixteenth", label:"Solar Power — loses 1/16 Max HP" },
    ],
    rules:[
      "Fire-Type Attacks gain +5 to Damage Rolls; Water-Type Attacks suffer −5.",
      "Thunder and Hurricane are AC 11 in Sun.",
      "Dry Skin: loses a Tick of HP at the end of each turn.",
      "Thermosensitive: Attack and Special Attack Combat Stages increased by +2.",
      "Chlorophyll: +4 Speed Combat Stages.",
      "Solar Power: +2 Special Attack Combat Stages, but loses 1/16th Max HP at the start of each turn.",
      "Desert Weather: resists Fire-Type Moves one step further.",
      "Sun Blanket: gains 1/16th of Max HP at the beginning of each turn.",
    ] },

  { key:"rainy", name:"Rainy", icon:"🌧",
    blurb:"Water attacks +5 damage · Fire attacks −5 damage",
    dmgByType:{ water:+5, fire:-5 },
    noMiss:["thunder","hurricane"],
    abilityCS:{ "Swift Swim":{ spd:4 } },
    ticks:[
      { ability:"Rain Dish",      when:"start", sign:+1, kind:"tick",      label:"Rain Dish — gains a Tick" },
      { ability:"Dry Skin",       when:"end",   sign:+1, kind:"tick",      label:"Dry Skin — gains a Tick" },
      { ability:"Desert Weather", when:"end",   sign:+1, kind:"sixteenth", label:"Desert Weather — gains 1/16 Max HP" },
    ],
    rules:[
      "Water-Type Attacks gain +5 to Damage Rolls; Fire-Type Attacks suffer −5.",
      "Thunder and Hurricane cannot miss in Rain.",
      "Hydration: cured of one Status Affliction at the end of each turn.",
      "Rain Dish: recovers a Tick of HP at the beginning of each turn.",
      "Swift Swim: Speed Combat Stages increased by +4.",
      "Desert Weather: gains 1/16th of Max HP at the end of each turn.",
      "Dry Skin: gains a Tick of HP at the end of each turn.",
    ] },

  { key:"sandstorm", name:"Sandstorm", icon:"🏜",
    blurb:"Non-Ground/Rock/Steel lose a Tick each turn",
    abilityCS:{ "Sand Rush":{ spd:4 } },
    abilityDmgTypes:{ "Sand Force":{ types:["ground","rock","steel"], dmg:+5 } },
    ticks:[
      { all:true, exceptTypes:["ground","rock","steel"], immuneAbilities:["Desert Weather"],
        when:"start", sign:-1, kind:"tick", label:"Sandstorm — loses a Tick" },
    ],
    rules:[
      "All non-Ground, Rock, or Steel Type Pokémon lose a Tick of HP at the beginning of their turn.",
      "Sand Force: +5 Damage Bonus to Ground, Rock and Steel-Type Moves.",
      "Sand Rush: Speed Combat Stages increased by +4.",
      "Desert Weather: immune to Sandstorm.",
    ] },

  { key:"hail", name:"Hail", icon:"❄️",
    blurb:"Non-Ice Pokémon lose a Tick each turn",
    noMiss:["blizzard"],
    abilityEvasion:{ "Snow Cloak":2 },
    halveMovementAbilities:["Thermosensitive"],
    ticks:[
      { all:true, exceptTypes:["ice"], when:"start", sign:-1, kind:"tick", label:"Hail — loses a Tick" },
      { ability:"Ice Body", when:"start", sign:+1, kind:"tick", label:"Ice Body — gains a Tick" },
    ],
    rules:[
      "All non-Ice Type Pokémon lose a Tick of HP at the beginning of their turn.",
      "Blizzard cannot miss in Hail.",
      "Ice Body: recovers a Tick of HP at the beginning of each turn.",
      "Snow Cloak: Evasion increased by +2, and adjacent allies are not damaged.",
      "Thermosensitive: Movement Capabilities reduced by half.",
    ] },
];
const WEATHER_BY_KEY = Object.fromEntries(WEATHER_DEFS.map(w=>[w.key,w]));
const weatherByKey = k => WEATHER_BY_KEY[k] || WEATHER_DEFS[0];
/* the weather in play right now — it lives on the battle map, so it only exists in a cloud
   campaign with a map; everywhere else (local sheets, offline bundle) this is Clear skies. */
function activeWeather(){
  // effectiveCS → weatherCSMods → here runs on every pokeDerived call, so bail before
  // currentMapForView/activeMapMeta (which would allocate a fresh normMapMeta on a missing row).
  if(mode!=="cloud" || !cloud.mapMeta?.data) return WEATHER_DEFS[0];
  const map = currentMapForView();
  return weatherByKey(map?.weather);
}
const weatherIsClear = w => (w||activeWeather()).key === "clear";
/* Combat-Stage bonuses a Pokémon's abilities get from the current weather (Swift Swim, Sand Rush,
   Thermosensitive) — folded into effectiveCS so every derived stat and roll sees them. */
function weatherCSMods(p){
  const out = { atk:0, def:0, spatk:0, spdef:0, spd:0 };
  const w = activeWeather(); if(!w.abilityCS) return out;
  for(const ab in w.abilityCS)
    if(monHasAbility(p, ab)) for(const k in w.abilityCS[ab]) out[k] += w.abilityCS[ab][k];
  return out;
}
/* flat Evasion bonus from a weather ability (Snow Cloak in Hail) */
function weatherEvasion(p){
  const w = activeWeather(); if(!w.abilityEvasion) return 0;
  let n = 0;
  for(const ab in w.abilityEvasion) if(monHasAbility(p, ab)) n += w.abilityEvasion[ab];
  return n;
}
/* Damage / accuracy changes this weather makes to ONE move by ONE Pokémon. Shaped like buffMods
   so openMoveRoll can display and total it the same way it does Cheers/Orders/Songs. */
function weatherRollMods(p, m, moveType){
  const w = activeWeather();
  const res = { weather:w, dmg:0, autoHit:false, acOverride:null, lines:[] };
  if(weatherIsClear(w)) return res;
  const ty = String(moveType||"").toLowerCase();
  const mn = String(m?.name||"").toLowerCase();

  const byType = w.dmgByType?.[ty];
  if(byType){ res.dmg += byType;
    res.lines.push(`${moveType}-Type attack ${byType>0?"+":"−"}${Math.abs(byType)} Damage in ${w.name}`); }

  if(w.abilityDmgTypes) for(const ab in w.abilityDmgTypes){
    const r = w.abilityDmgTypes[ab];
    if(monHasAbility(p, ab) && r.types.includes(ty)){ res.dmg += r.dmg;
      res.lines.push(`${ab} — +${r.dmg} Damage to ${r.types.map(t=>t[0].toUpperCase()+t.slice(1)).join("/")}-Type moves`); }
  }
  if((w.noMiss||[]).includes(mn)){ res.autoHit = true;
    res.lines.push(`${m.name} cannot miss in ${w.name}`); }
  if(w.acOverride && w.acOverride[mn]!=null){ res.acOverride = w.acOverride[mn];
    res.lines.push(`${m.name} is AC ${w.acOverride[mn]} in ${w.name}`); }
  return res;
}
/* Per-turn HP the current weather would move on one Pokémon — REPORTED, never auto-applied.
   Returns [{label, delta, when}] where delta is signed HP. */
function weatherTickReport(p){
  const w = activeWeather(); const out = [];
  if(weatherIsClear(w) || !w.ticks) return out;
  const maxHP = pokeDerived(p).maxHP;
  const types = (getSpecies(p.species)?.types || []).map(t=>String(t).toLowerCase());
  w.ticks.forEach(t=>{
    if(t.ability && !monHasAbility(p, t.ability)) return;
    if(t.all){
      if((t.exceptTypes||[]).some(ty=>types.includes(ty))) return;              // typed out of it
      if((t.immuneAbilities||[]).some(ab=>monHasAbility(p, ab))) return;         // ability immunity
    }
    const amt = t.kind==="sixteenth" ? hpSixteenth(maxHP) : hpTick(maxHP);
    out.push({ label:t.label, delta:t.sign*amt, when:t.when });
  });
  return out;
}
/* ===================================================================
   Terrain (Core "Field" Status moves — Electric/Grassy/Misty/Psychic Terrain)
   Unlike Weather, any number of Terrains can be active on a map AT ONCE — setting one does not
   replace another. Same ruling as Weather though: the book gives them a 5-round duration, but
   here they simply stay active until the GM turns them off (no round timer).
=================================================================== */
const TERRAIN_DEFS = [
  { key:"electric", name:"Electric Terrain", icon:"⚡",
    blurb:"Electric attacks +10 damage · grounded Pokémon immune to Sleep",
    dmgByType:{ electric:+10 },
    rules:[
      "Grounded Pokémon and Trainers touching the ground are immune to Sleep.",
      "Grounded Electric-Type Attacks gain a +10 Bonus to Damage Rolls.",
    ] },
  { key:"grassy", name:"Grassy Terrain", icon:"🌿",
    blurb:"Grass attacks +10 damage · grounded Pokémon heal 1/10 Max HP each turn",
    dmgByType:{ grass:+10 },
    ticks:[ { all:true, when:"start", sign:+1, kind:"tick", label:"Grassy Terrain — heals 1/10 Max HP" } ],
    rules:[
      "Grounded Pokémon and Trainers recover 1/10th of their Max HP at the start of every turn.",
      "Grounded Grass-Type Attacks gain a +10 Bonus to Damage Rolls.",
    ] },
  { key:"misty", name:"Misty Terrain", icon:"🌫",
    blurb:"Dragon attacks −10 damage · grounded Pokémon ignore the first turn of Status Afflictions",
    dmgByType:{ dragon:-10 },
    rules:[
      "Grounded Pokémon and Trainers ignore the first turn of all Status Afflictions.",
      "Dragon-Type Attacks targeting or originating from a grounded Pokémon/Trainer take a −10 penalty to Damage Rolls.",
    ] },
  { key:"psychic", name:"Psychic Terrain", icon:"🔮",
    blurb:"Psychic attacks +10 damage · blocks Priority/Interrupt moves from grounded, non-Flying Pokémon",
    dmgByType:{ psychic:+10 },
    rules:[
      "Non-Flying, non-Levitating Pokémon cannot declare Priority or Interrupt Moves outside their own Initiative.",
      "Damaging Psychic-Type Attacks deal an additional +10 Damage.",
    ] },
];
const TERRAIN_BY_KEY = Object.fromEntries(TERRAIN_DEFS.map(t=>[t.key,t]));
/* the Terrains in play right now (0 or more) — like activeWeather(), only meaningful in a cloud
   campaign with a map; everywhere else this is an empty list. */
function activeTerrains(){
  if(mode!=="cloud" || !cloud.mapMeta?.data) return [];
  const map = currentMapForView();
  return (map?.terrains||[]).map(k=>TERRAIN_BY_KEY[k]).filter(Boolean);
}
/* Damage changes ALL active Terrains make to ONE move by ONE Pokémon, combined — same shape as
   weatherRollMods so openMoveRoll can total/display them the same way. */
function terrainRollMods(p, m, moveType){
  const terrains = activeTerrains();
  const res = { terrains, dmg:0, lines:[] };
  const ty = String(moveType||"").toLowerCase();
  terrains.forEach(t=>{
    const byType = t.dmgByType?.[ty];
    if(byType){ res.dmg += byType;
      res.lines.push(`${moveType}-Type attack ${byType>0?"+":"−"}${Math.abs(byType)} Damage in ${t.name}`); }
  });
  return res;
}
/* Per-turn HP every active Terrain would move on one Pokémon — REPORTED, never auto-applied, same
   convention as weatherTickReport(). */
function terrainTickReport(p){
  const maxHP = pokeDerived(p).maxHP;
  const out = [];
  activeTerrains().forEach(t=>(t.ticks||[]).forEach(tk=>{
    const amt = tk.kind==="sixteenth" ? hpSixteenth(maxHP) : hpTick(maxHP);
    out.push({ label:tk.label, delta:tk.sign*amt, when:tk.when });
  }));
  return out;
}
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
   If `stoneItem` is given, consume one from the trainer's inventory. Remembers the species it
   evolved FROM in `p.evoHistory` (a stack) so a GM can undo it with unevolveTo below — this is
   the general fix for accidental evolutions, not just a Cubone/Marowak-Alolan thing: chain-based
   "previous stage" lookup is ambiguous whenever a line branches (e.g. Wurmple's Silcoon/Cascoon
   split share a stage number but aren't interchangeable), so we just record real history instead. */
function evolveTo(p, targetName, stoneItem){
  const sp = getSpecies(targetName); if(!sp) return;
  const stoneMsg = stoneItem ? `\nThis consumes one ${stoneItem.name} from your inventory.` : "";
  if(!confirm(`Evolve ${p.nickname || getSpecies(p.species)?.name || "this Pokémon"} into ${sp.name}?\nStats, moves, abilities, level and XP are kept.${stoneMsg}`)) return;
  if(stoneItem){
    const t = activeChar().trainer;
    stoneItem.qty = (parseInt(stoneItem.qty)||1) - 1;
    if(stoneItem.qty<=0){ const i=(t.inventory||[]).indexOf(stoneItem); if(i>=0) t.inventory.splice(i,1); }
  }
  if(!Array.isArray(p.evoHistory)) p.evoHistory = [];
  p.evoHistory.push(p.species);
  p.species = sp.name;
  const m = pokeDerived(p).maxHP;                         // clamp HP to the new species' max
  if(p.currentHP!=null && p.currentHP>m) p.currentHP = m;
  save(); refreshMon(p); toast(`Evolved into ${sp.name}! ✨`+(stoneItem?` (−1 ${stoneItem.name})`:""));
}
/* GM-only: undo the most recent evolveTo, e.g. to fix an accidental tap or a wrongly-chosen
   branch (Marowak vs Marowak Alolan, Vaporeon vs Jolteon, ...). Does NOT refund a consumed stone —
   the GM can just hand it back manually if that's the actual mistake being corrected. */
function unevolveTo(p){
  if(!Array.isArray(p.evoHistory) || !p.evoHistory.length) return;
  const prev = p.evoHistory[p.evoHistory.length-1];
  if(!confirm(`Un-evolve ${p.nickname || getSpecies(p.species)?.name || "this Pokémon"} back into ${prev}?\nStats, moves, abilities, level and XP are kept.`)) return;
  p.evoHistory.pop();
  p.species = prev;
  const m = pokeDerived(p).maxHP;
  if(p.currentHP!=null && p.currentHP>m) p.currentHP = m;
  save(); refreshMon(p); toast(`Un-evolved back into ${prev}.`);
}

/* ---- Mega Evolution ----------------------------------------------------------------
   A TEMPORARY in-battle transform into a "Mega <name>" species (reverts at End Scene).
   Stats, types, capabilities and size follow the Mega species automatically (everything derives
   from p.species); the Pokémon keeps its moves, level and XP and its own Ability list — the Mega's
   Ability is surfaced for reference. Unlike evolveTo this is reversible and never permanent. */
function megaFormsFor(p){
  const baseName = (p.mega ? (p.preMega||p.species) : p.species);
  const base = getSpecies(baseName); if(!base) return [];
  const bname = base.name.toLowerCase();
  const held = (p.heldItem||"").toLowerCase();
  return D.species.filter(s=>{
    const n = s.name.toLowerCase();
    if(!n.startsWith("mega ")) return false;                 // "Meganium"/"MEGAS" won't match (need the space)
    const rest = n.slice(5).replace(/\s+[xy]$/,"").trim();   // "mega charizard x" → "charizard"
    if(rest !== bname) return false;
    const stone = megaToStoneMap.get(s.name);                // only offer the button once its Mega Stone is Held Item
    return !!stone && stone.toLowerCase()===held;
  }).map(s=>s.name);
}
/* the Mega Stone(s) that would unlock Mega Evolution for this Pokémon, for the "equip X" hint
   shown when it isn't currently held (megaFormsFor above stays the actual stone-gated list). */
function megaStonesFor(p){
  const baseName = (p.mega ? (p.preMega||p.species) : p.species);
  const base = getSpecies(baseName); if(!base) return [];
  const bname = base.name.toLowerCase();
  const out = [];
  megaStoneMap.forEach((megaName, stoneName)=>{
    const rest = megaName.slice(5).replace(/\s+[xy]$/i,"").trim().toLowerCase();
    if(rest===bname) out.push(stoneName);
  });
  return out;
}
/* `rerender` defaults to the party-Pokémon path (save()+refreshMon); the Encounters tab passes
   saveEnc()+renderEncounters() so a GM can Mega Evolve a wild/enemy Pokémon the same way. */
function megaEvolve(p, targetName, rerender){
  const sp = getSpecies(targetName); if(!sp || p.mega) return;
  const baseSp = getSpecies(p.species);
  p.preMega = p.species;
  p.mega = true;
  p.species = sp.name;
  const megaAbility = megaAbilityFor(baseSp, sp.name);
  if(megaAbility && abilityByName.has(megaAbility.toLowerCase())){
    p.abilities = Array.isArray(p.abilities) ? [...p.abilities] : [];
    if(!p.abilities.some(a=>(a||"").toLowerCase()===megaAbility.toLowerCase())){
      p.abilities.push(megaAbility);
      p.megaAddedAbility = megaAbility;      // remember what we added, so revert removes only this one
    }
  }
  const m = pokeDerived(p).maxHP;
  if(p.currentHP!=null && p.currentHP>m) p.currentHP = m;
  if(rerender) rerender(); else { save(); refreshMon(p); }
  toast(`Mega Evolved into ${sp.name}! ✨`+(megaAbility?` (Mega Ability: ${megaAbility})`:""));
}
function megaRevert(p, silent, rerender){
  if(!p.mega) return;
  p.species = p.preMega || p.species;
  delete p.mega; delete p.preMega;
  if(p.megaAddedAbility){
    p.abilities = (p.abilities||[]).filter(a=>(a||"").toLowerCase()!==p.megaAddedAbility.toLowerCase());
    delete p.megaAddedAbility;
  }
  const m = pokeDerived(p).maxHP;
  if(p.currentHP!=null && p.currentHP>m) p.currentHP = m;
  if(!silent){ if(rerender) rerender(); else { save(); refreshMon(p); } toast("Reverted from Mega Evolution"); }
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
/* ---- "Mom?" homebrew Symbiant — a hidden entity gated to the GM and Lázaro ---- */
function baseName(s){ return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").trim().toLowerCase(); }
function isLazaroName(s){ return baseName(s)==="lazaro"; }   // accent-insensitive ("Lázaro"/"Lazaro")
function isLazaro(){
  if(mode!=="cloud") return true;                    // local/solo play has no roles to hide behind
  if(isLazaroName(cloud.name)) return true;          // logged in with the display name Lázaro
  return Object.values(cloud.byId||{}).some(r => ownsRow(r) &&
    (isLazaroName(r.data?.name) || isLazaroName(r.owner_name)));   // or owns the Lázaro sheet
}
function canSeeMom(){ return isGM() || isLazaro(); }
function isMomSpecies(n){ return String(n||"").trim().toLowerCase() === "mom?"; }
/* auto-distribute a "Mom?" mon's level+10 stat budget across its stats, weighted by base stats
   (Attack base 0 → gets nothing). Largest-remainder method; deterministic. Mutates p.stats. */
function autoAllocMom(p){
  const sp = getSpecies(p.species); if(!sp || !sp.autoStats) return false;
  const base = sp.baseStats || {};
  const budget = Math.max(0, (p.level||1) + 10);
  const weights = STATS.map(([k]) => Math.max(0, base[k]||0));
  const wsum = weights.reduce((a,b)=>a+b,0) || 1;
  const raw = weights.map(w => budget*w/wsum);
  const floor = raw.map(Math.floor);
  let left = budget - floor.reduce((a,b)=>a+b,0);
  const order = raw.map((v,i)=>[v-floor[i], base[STATS[i][0]]||0, i]).sort((a,b)=> b[0]-a[0] || b[1]-a[1]);
  for(let n=0;n<order.length && left>0;n++){ floor[order[n][2]]++; left--; }
  let changed=false;
  STATS.forEach(([k],i)=>{ p.stats[k]=p.stats[k]||{added:0};
    if(p.stats[k].added!==floor[i]){ p.stats[k].added=floor[i]; changed=true; } });
  // "Mom?" is pinned to exactly 1 HP: forcedStats caps max HP at 1; keep current HP there too.
  const fh = sp.forcedStats && sp.forcedStats.hp;
  if(typeof fh==="number" && p.currentHP!==fh){ p.currentHP=fh; changed=true; }
  return changed;
}
/* every item that can be held/consumed, for lookups + the Held Item picker */
const itemByName = new Map([...(D.items?.held||[]), ...(D.items?.food||[]), ...(D.items?.capabilities||[]),
  ...(D.items?.weather||[]), ...(D.items?.equipment||[]), ...(D.items?.gear||[])].map(i => [i.name.toLowerCase(), i]));

/* Mega Evolution: derive stoneName <-> "Mega X"/"Mega X Y" species pairs from the loaded item
   effect text ("Mega Evolves <target> when used...") instead of hand-listing all ~47 of them.
   One stone's effect text has a data typo ("Pidgeotto" for the Mega Pidgeot line) — patched here. */
const MEGA_STONE_TARGET_FIX = { Pidgeotto: "Pidgeot" };
const megaStoneMap = new Map();     // stoneName -> megaSpeciesName
const megaToStoneMap = new Map();   // megaSpeciesName -> stoneName
(D.items?.held||[]).forEach(it=>{
  const m = /^Mega Evolves (.+?) when used/i.exec(it.effect||""); if(!m) return;
  let target = m[1].trim(); target = MEGA_STONE_TARGET_FIX[target] || target;
  const suffix = / X$| Y$/.exec(it.name);
  const megaName = suffix ? `Mega ${target}${suffix[0]}` : `Mega ${target}`;
  if(getSpecies(megaName)){ megaStoneMap.set(it.name, megaName); megaToStoneMap.set(megaName, it.name); }
});
/* Mega Evolution ability: the Pokédex PDF carries a "Mega Evolution" blurb on each base species'
   entry ("Type: Steel Ability: Filter Stats: +3 Atk, +5 Def, +2 Sp. Def"), preserved verbatim on
   sp.megaEvolution by tools/build_data.py. Read the ability straight from that instead of
   hand-listing all ~47 — Charizard/Mewtwo pack both forms in one blurb ("X ... Ability: A ...
   Mega Evolution Y ... Ability: B ..."), split on the "Mega Evolution Y" marker for those. */
const MEGA_ABILITY_NAME_FIX = { Refrigerate: "Refridgerate" };   // one dex blurb spells it correctly; the abilities DB has the typo
function megaAbilityFor(baseSp, megaName){
  const text = baseSp?.megaEvolution; if(!text) return null;
  let seg = text;
  if(/ Y$/.test(megaName)){
    const m = /Mega Evolution\s*Y\b/.exec(text); if(!m) return null;
    seg = text.slice(m.index + m[0].length);
  } else if(/ X$/.test(megaName)){
    const m = /Mega Evolution\s*Y\b/.exec(text);
    seg = m ? text.slice(0, m.index) : text;
  }
  const m2 = /Ability:\s*([^]+?)\s*Stats:/.exec(seg); if(!m2) return null;
  const name = m2[1].trim();
  return MEGA_ABILITY_NAME_FIX[name] || name;
}

/* Capabilities that let a Pokémon change its Struggle Attack's type (PTU 1.05).
   Each also lets the attack use Sp.Atk / deal Special damage at the user's option. */
const STRUGGLE_TYPE_CAPS = { Firestarter:"Fire", Fountain:"Water", Freezer:"Ice",
  Guster:"Flying", Materializer:"Rock", Zapper:"Electric" };
const classNameSet = new Set(D.classes.map(c => c.name));

/* ===================================================================
   Swarm Template (Core p.478)
   Abstracts a large number of trivially-weak Pokémon into ONE entity with a Swarm Multiplier.
   • HP: it has Multiplier-many "HP bars". Emptying a bar drops the Multiplier by 1. Per this
     table's ruling, excess damage CARRIES into the next bar (the book doesn't say), so the whole
     thing is modelled as a single pool of Multiplier×maxHP and the bar/Multiplier are derived.
     It never takes Injuries.
   • Actions: Swarm Points per round = Multiplier. The first Standard Action each round is FREE;
     after that a Standard Action costs by Frequency — At-Will 1, EOT 2, Scene 3, Daily 4 — and the
     swarm acts again at Initiative −5 per extra act. Failing to act from a Status costs 1 point.
     It always gets at least one action.
   • Being attacked: Accuracy against it gains +Multiplier; single-target damage is resisted one
     step further; area/multi-target attacks are one step MORE effective. Those last two are step
     adjustments on the PTU effectiveness ladder, not raw multipliers — see typeMultAgainst.
=================================================================== */
const SWARM_SIZES = [
  { mult:1, label:"Less than a dozen Pokémon" },
  { mult:2, label:"15–25 Pokémon" },
  { mult:3, label:"25–40 Pokémon" },
  { mult:4, label:"40–60 Pokémon" },
  { mult:5, label:"60+ Pokémon" },
];
const SWARM_MAX_MULT = 5;
/* Standard-Action cost by Frequency (Core p.478). Keyed off freqInfo().kind. */
const SWARM_COSTS = { atwill:1, eot:2, scene:3, daily:4 };
function swarmCost(freq){
  const k = freqInfo(freq).kind;
  return SWARM_COSTS[k] ?? 1;            // static/AP/other → treat as At-Will
}
const isSwarm = p => !!(p && p.swarm && p.swarm.on);
/* normalise/repair a swarm block (called from normPokemon) */
function normSwarm(p){
  if(!p.swarm || !p.swarm.on) return p;
  const s = p.swarm;
  s.maxMult = Math.max(1, Math.min(SWARM_MAX_MULT, parseInt(s.maxMult)||1));
  if(typeof s.mult!=="number") s.mult = s.maxMult;
  s.mult = Math.max(0, Math.min(s.maxMult, s.mult));
  if(typeof s.sp!=="number") s.sp = s.mult;
  s.sp = Math.max(0, Math.min(s.maxMult, s.sp));
  s.freeUsed = !!s.freeUsed;
  return p;
}
/* total HP left across every remaining bar */
function swarmTotalHP(p){
  const max = pokeDerived(p).maxHP;
  return Math.max(0, (Math.max(1,p.swarm.mult)-1)) * max + (p.currentHP||0);
}
function swarmMaxTotalHP(p){ return pokeDerived(p).maxHP * (p.swarm.maxMult||1); }
/* write a total back as {Multiplier, HP in the current bar} — this is what makes damage cascade
   through bars, and what makes a single huge hit able to break several at once. */
function swarmSetTotalHP(p, total){
  const max = pokeDerived(p).maxHP;
  if(total<=0){ p.swarm.mult = 0; p.currentHP = 0; return; }
  const cap  = max * (p.swarm.maxMult||1);
  const t    = Math.min(total, cap);
  p.swarm.mult = Math.max(1, Math.min(p.swarm.maxMult||1, Math.ceil(t/max)));
  p.currentHP  = t - (p.swarm.mult-1)*max;
}
/* re-derive Multiplier from whatever currentHP now is (after any normal HP edit) */
function swarmNormalizeHP(p){ if(isSwarm(p)) swarmSetTotalHP(p, swarmTotalHP(p)); }
const swarmDefeated = p => isSwarm(p) && p.swarm.mult<=0;
/* how many times the swarm may act this round: 1 free + one per Swarm Point it has THIS round
   (cheapest action = 1 SP) — Swarm Points equal the CURRENT Multiplier, which shrinks as bars
   break, so a weakened swarm is correctly offered fewer repeat acts, not its starting size. */
const swarmActs = p => isSwarm(p) && p.swarm.mult>0 ? 1 + p.swarm.mult : 1;
/* start-of-round refresh — Swarm Points back to the CURRENT Multiplier, free action available */
function swarmNewRound(p){ if(!isSwarm(p)) return; p.swarm.sp = Math.max(0,p.swarm.mult); p.swarm.freeUsed = false; }
/* spend for one Standard Action; returns {ok, cost, free} */
function swarmSpend(p, freq){
  if(!isSwarm(p)) return { ok:false, cost:0, free:false };
  if(!p.swarm.freeUsed){ p.swarm.freeUsed = true; return { ok:true, cost:0, free:true }; }
  const cost = swarmCost(freq);
  if(p.swarm.sp < cost) return { ok:false, cost, free:false };
  p.swarm.sp -= cost;
  return { ok:true, cost, free:false };
}
/* step adjustment applied to damage aimed AT a swarm (Core p.478) */
const swarmDamageStep = aoe => aoe ? +1 : -1;

/* ===================================================================
   Boss Template (Running the Game p.487-488)
   One powerful enemy standing in for a whole squad's worth of actions:
   it gets one HP bar per action it has each round (a "bar" = one full
   Max HP), and — unlike Swarm — its number of actions per round never
   drops as bars break (Swarm's act count DOES shrink with its Multiplier;
   a Boss's doesn't). Injuries, Status Afflictions and EOT-frequency Moves
   all get their own boss-specific rulings, applied below/at their call sites.
=================================================================== */
const isBoss = p => !!(p && p.boss && p.boss.on);
/* Boss Template applies to encounter Pokémon AND Trainers (Running the Game doesn't restrict it to
   Pokémon) — every function below takes a generic `owner` and branches on the same `.species!==
   undefined` discriminator ownerFullHP() already uses, so one implementation covers both. */
const bossBarMax  = owner => owner.species!==undefined ? pokeDerived(owner).maxHP : trainerDerived(owner).hp;
const bossOwnerName = owner => owner.species!==undefined ? encMonName(owner) : (owner.name||"Trainer");
/* normalise/repair a boss block (called from normPokemon/normTrainer) */
function normBoss(owner){
  if(!owner.boss || !owner.boss.on) return owner;
  const b = owner.boss;
  b.actions = Math.max(1, Math.min(12, parseInt(b.actions)||1));   // = actions/round = HP bars (1:1, Core rule)
  if(typeof b.curBar!=="number") b.curBar = b.actions;
  b.curBar = Math.max(0, Math.min(b.actions, b.curBar));
  if(typeof b.baseInit!=="number") b.baseInit = 10;
  b.halfInjuryGiven = !!b.halfInjuryGiven;
  if(b.defaultCS && typeof b.defaultCS!=="object") b.defaultCS = null;
  return owner;
}
function toggleBoss(owner){
  if(isBoss(owner)){ delete owner.boss; owner.currentHP = Math.min(owner.currentHP, bossBarMax(owner)); return; }
  owner.boss = { on:true, actions:3, curBar:3, baseInit:10, halfInjuryGiven:false, defaultCS:null };
}
/* total HP left across every remaining bar — same cascade shape as swarmTotalHP */
function bossTotalHP(owner){
  const max = bossBarMax(owner);
  return Math.max(0, (Math.max(1,owner.boss.curBar)-1)) * max + (owner.currentHP||0);
}
function bossMaxTotalHP(owner){ return bossBarMax(owner) * (owner.boss.actions||1); }
/* write a total back as {bar, HP in the current bar} — lets one big hit break several bars at
   once. Also auto-flags the two automatic Boss Injury triggers: losing half its total bars (once
   per fight), and reaching its last bar (a GM heads-up, not an Injury). Massive Damage's Injury is
   handled separately in applyAutoInjury (it needs the raw hit size, not the post-cascade total). */
function bossSetTotalHP(owner, total){
  const max = bossBarMax(owner);
  const prevBar = owner.boss.curBar;
  const cap = max * (owner.boss.actions||1);
  const t = Math.max(0, Math.min(total, cap));
  if(t<=0){ owner.boss.curBar = 0; owner.currentHP = 0; }
  else { owner.boss.curBar = Math.max(1, Math.min(owner.boss.actions||1, Math.ceil(t/max))); owner.currentHP = t - (owner.boss.curBar-1)*max; }
  if(owner.boss.curBar < prevBar){
    const halfThresh = Math.floor((owner.boss.actions||1)/2);
    if(!owner.boss.halfInjuryGiven && owner.boss.curBar<=halfThresh){
      owner.boss.halfInjuryGiven = true; owner.injuries=(owner.injuries||0)+1;
      toast(`⚡ ${bossOwnerName(owner)} lost half its HP bars — +1 Injury (Core rule) · now bar ${owner.boss.curBar}/${owner.boss.actions}`);
    } else if(owner.boss.curBar<=0){
      toast(`💀 ${bossOwnerName(owner)} — final HP bar down!`);
    } else {
      toast(`⚡ ${bossOwnerName(owner)} is Staggered — bar ${owner.boss.curBar}/${owner.boss.actions}`);
    }
  }
}
const bossDefeated  = owner => isBoss(owner) && owner.boss.curBar<=0;
const bossOnLastBar = owner => isBoss(owner) && owner.boss.curBar===1;
/* Initiative Counts a Boss acts on each round (Running the Game p.487): its normal turn at base
   Initiative, then alternating turns at −5 from base until subtracting again would go below 1,
   then any turns still left to place resume climbing +5 above base. Sorted high→low for display/
   scheduling. (Book's worked example: base 20, 6 total actions → 30,25,20,15,10,5.) */
function bossInitiativeCounts(base, actions){
  base = Math.max(1, parseInt(base)||1); actions = Math.max(1, parseInt(actions)||1);
  const counts = [base]; let remaining = actions-1, down = base, up = base;
  while(remaining>0 && down-5>=1){ down-=5; counts.push(down); remaining--; }
  while(remaining>0){ up+=5; counts.push(up); remaining--; }
  return counts.sort((a,b)=>b-a);
}
/* menu of book-suggested effects for when a Boss gets Staggered (loses a bar) — GM picks by hand,
   nothing here is auto-applied (some are helpful to the players, some make the fight harder). */
const BOSS_STAGGER_EFFECTS = [
  "Becomes Vulnerable until next hit by a damaging attack",
  "Becomes Flinched and loses its next turn (not the whole round)",
  "Increase one Combat Stage by 1",
  "Regains one use of a Scene-frequency Move",
  "Cured of one Volatile Status Affliction",
];

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
function usesControl(owner, kind, name, freqRaw, rerender, persistFn, opts){
  const info = freqInfo(freqRaw);
  if(!freqTrackable(info)) return null;
  // Boss Template (Running the Game p.487): EOT Moves may be used more than once a round as long
  // as the GM spaces a turn between each use, instead of the normal single-cooldown-pip. There's no
  // per-round turn tracker for encounter Moves, so this just drops the cap and trusts the GM.
  if(opts?.bossEot && info.kind==="eot"){
    return el("span",{class:"uses", title:"Boss Template — usable more than once a round if you space a turn between each use (Running the Game p.487); space them out by hand"},
      el("span",{class:"uses-tag muted"}, "EOT · Boss: unlimited"));
  }
  const key = useKey(kind, name), max = info.max, left = usesLeft(owner, key, max);
  const setLeft = (nl,e) => { e.preventDefault(); e.stopPropagation();
    owner.uses = owner.uses || {};
    owner.uses[key] = Math.min(max, Math.max(0, max - nl));   // store consumed = max − remaining
    (persistFn||save)(); (rerender||(()=>{}))(); };
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
  c.trainer.usedAP = 0; c.trainer.tempHP = 0; c.trainer.buffs = []; resetUses(c.trainer, "scene");
  (c.pokemon||[]).forEach(p => { normPokemon(p); p.tempHP = 0; p.buffs = []; resetUses(p, "scene"); if(p.mega) megaRevert(p,true); });   // buffs are combat-duration → clear (#2); Mega reverts at End Scene
}
/* apply Extended Rest to one character object (heal HP & 1 Injury, restore AP & all uses) */
function applyEndDay(c){
  if(!c) return;
  const t = c.trainer; normTrainer(t);
  t.usedAP = 0; t.tempHP = 0; t.buffs = []; resetUses(t, "all");
  t.statuses = [];                                 // Extended Rest cures all Status afflictions (Core p.249)
  t.injuries = Math.max(0, (t.injuries||0) - 1);   // Extended Rest heals 1 Injury (Core p.249)
  t.currentHP = trainerDerived(t).hp;              // heal to remaining-injury-capped max
  (c.pokemon||[]).forEach(p => { normPokemon(p);
    if(p.mega) megaRevert(p,true);        // revert Mega before healing so max HP is the base form's
    p.tempHP = 0; p.buffs = []; resetUses(p, "all");
    p.statuses = [];                      // cure all Status afflictions on the whole party too
    p.injuries = Math.max(0, (p.injuries||0) - 1);
    p.currentHP = pokeDerived(p).maxHP;   // heal to full (already capped by remaining Injuries)
  });
}
/* the cloud rows a GM's rest affects: every PLAYER's sheet (not the GM's own characters, not the PC) */
function playerRestRows(){
  return Object.values(cloud.byId).filter(r =>
    r && r.data && r.data.trainer && !ownsRow(r) && r.owner_id !== PC_OWNER);
}
/* End of Scene (Core p.220). GM in cloud → applies to all players; otherwise the active character.
   GM path re-fetches the roster FIRST (async) — playerRestRows() reads the GM's own in-memory
   cache, and that cache can be stale (dropped realtime, backgrounded tab, long-open session). Applying
   rest effects on top of a stale copy and upserting it back used to silently revert every player's
   sheet to whatever the GM last saw — that's what wiped everyone's Level Up tracker + an avatar. */
async function endScene(){
  if(mode==="cloud" && cloud.isGM){
    await fetchRoster();
    const rows = playerRestRows();
    rows.forEach(r => applyEndScene(r.data));
    rows.forEach(r => cloudUpsert(r));
    render(); toast(`Scene ended for ${rows.length} player sheet${rows.length===1?"":"s"}`); return;
  }
  const c = activeChar(); if(!c) return;
  applyEndScene(c); save(); render(); toast("Scene ended — AP restored, Scene uses refreshed");
}
/* Extended Rest / End of Day. GM in cloud → applies to all players; otherwise the active character. */
async function endDay(){
  const gmAll = mode==="cloud" && cloud.isGM;
  const scope = gmAll ? "all players" : "this character & its party";
  if(!confirm(`End the day (Extended Rest) for ${scope}?\nRestores HP & AP, heals 1 Injury, cures all Status afflictions, and refreshes all Scene & Daily uses.`)) return;
  if(gmAll){
    await fetchRoster();   // see endScene() — must apply on top of fresh data, not a possibly-stale cache
    const rows = playerRestRows();
    rows.forEach(r => applyEndDay(r.data));
    rows.forEach(r => cloudUpsert(r));
    render(); toast(`Extended Rest for ${rows.length} player sheet${rows.length===1?"":"s"}`); return;
  }
  const c = activeChar(); if(!c) return;
  applyEndDay(c); save(); render(); toast("Extended Rest — HP & AP restored, 1 Injury healed, statuses cured, all uses refreshed");
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
    classes:[], skills, combat, edges:[], features:[], techniques:[], abilities:[],
    inventory:[], equipment:{}, gifts:[], background:"", notes:"", appearance:"",
    currentHP:null, tempHP:0, injuries:0, usedAP:0, unlocked:false, uses:{}, avatar:"", weapons:[],
    levelUp:{}, buffs:[],
  };
}
function newCharacter(name) {
  return { id: uid(), name: name || "New Trainer", trainer: newTrainer(), pokemon: [] };
}
function newPokemon(speciesName) {
  const sp = getSpecies(speciesName);
  const stats = {}; STATS.forEach(([k]) => stats[k] = { added: 0 });
  const level = 5;
  return {
    id: uid(), species: sp ? sp.name : (speciesName||""), nickname:"",
    gender:"", shiny:false, onTeam:true, level, xp:0, loyalty:0,
    nature: "Hardy", abilities:[], heldItem:"",
    stats, injuries:0, currentHP:null, tempHP:0,
    moves:[], tutorPoints: tutorPointsEarned(level), unlocked:false, notes:"",
    struggleType:null, struggleSpecial:false, uses:{}, image:"", statuses:[], buffs:[],
    cs:{atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0},
    auras: [],   // Legendary Auras are an ENCOUNTER-only concept (caught Pokémon have none); seeded in addEncounterMon
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
  if(!Array.isArray(p.auras)) p.auras = [];   // Legendary Auras (encounter-only; seeded when added to an encounter)
  if(!Array.isArray(p.buffs)) p.buffs = [];        // active Cheers / Orders / Songs (#2)
  if(!Array.isArray(p.customMoves)) p.customMoves = [];   // freeform move/action notes not in the DB
  if(!p.cs || typeof p.cs!=="object") p.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  if(typeof p.image!=="string") p.image = "";
  if(typeof p.megaImage!=="string") p.megaImage = "";
  if(!p.stats) { p.stats={}; STATS.forEach(([k])=>p.stats[k]={added:0}); }
  // keep XP consistent with a stored level so "add XP" works (only ever raises XP, never changes level)
  if(typeof p.xp!=="number") p.xp = 0;
  if(typeof p.level!=="number") p.level = 1;
  if(p.xp < xpForLevel(p.level)) p.xp = xpForLevel(p.level);
  if(typeof p.tutorPoints!=="number") p.tutorPoints = tutorPointsEarned(p.level);  // legacy objects only — never re-floors spent points
  normSwarm(p);                                    // Swarm Template block, if this is a swarm (Core p.478)
  normBoss(p);                                     // Boss Template block, if this is a boss (Running the Game p.487)
  autoAllocMom(p);                                 // "Mom?": keep auto-assigned stat points in sync with level
  return p;
}
/* migrate older Trainer objects to include HP/AP/uses tracking */
function normTrainer(t){
  if(!t) return t;
  if(typeof t.currentHP==="undefined") t.currentHP = null;
  if(typeof t.tempHP!=="number") t.tempHP = 0;
  if(typeof t.injuries!=="number") t.injuries = 0;
  if(!t.cs || typeof t.cs!=="object") t.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};   // Combat Stages
  if(!Array.isArray(t.statuses)) t.statuses = [];
  if(typeof t.usedAP!=="number") t.usedAP = 0;
  if(typeof t.xp!=="number") t.xp = 0;                            // EXP toward next level (houserule: 10 = level up)
  if(typeof t.unlocked!=="boolean") t.unlocked = false;
  if(typeof t.struggleType!=="string") t.struggleType = null;     // elemental unarmed Struggle (GM 🔓 only — trainers have no capabilities of their own)
  if(typeof t.struggleSpecial!=="boolean") t.struggleSpecial = false;
  if(typeof t.categoricInclination!=="string") t.categoricInclination = null;  // Body/Mind/Spirit choice for the Categoric Inclination Edge
  if(!Array.isArray(t.mentorSkills)) t.mentorSkills = [];        // the two Mentor Skills chosen when taking the Mentor class
  if(!t.uses || typeof t.uses!=="object") t.uses = {};
  if(typeof t.avatar!=="string") t.avatar = "";
  if(!Array.isArray(t.weapons)) t.weapons = [];
  if(!t.equipment || typeof t.equipment!=="object" || Array.isArray(t.equipment)) t.equipment = {};  // worn gear per slot
  if(!Array.isArray(t.gifts)) t.gifts = [];                        // Legendary Gifts (Blessed and the Damned)
  // migrate ranged weapons saved with the old (wrong) melee-copied stats — only when they still
  // match the old preset exactly, so hand-tuned weapons are left alone (Core p.286).
  t.weapons.forEach(w=>{
    if(w && w.category==="Long Range"  && w.dbMod===2 && w.acMod===1) w.dbMod = 1;
    if(w && w.category==="Short Range" && w.dbMod===1 && w.acMod===0) w.dbMod = 0;
    // migrate the old single weaponMove field into the new Adept/Master tiered slots
    if(w && w.weaponMove && !w.weaponMoveAdept && !w.weaponMoveMaster){
      if(WEAPON_MOVES_MASTER.includes(w.weaponMove)) w.weaponMoveMaster = w.weaponMove;
      else w.weaponMoveAdept = w.weaponMove;
      delete w.weaponMove;
    }
    if(w && typeof w.weaponMoveAdept!=="string") w.weaponMoveAdept = "";
    if(w && typeof w.weaponMoveMaster!=="string") w.weaponMoveMaster = "";
  });
  if(!t.levelUp || typeof t.levelUp!=="object") t.levelUp = {};   // per-level choice tracker
  if(!Array.isArray(t.techniques)) t.techniques = [];             // learned class Techniques
  if(!Array.isArray(t.abilities)) t.abilities = [];                // Pokémon-style Abilities some Features/classes grant (e.g. Martial Artist's Guts)
  if(!Array.isArray(t.moves)) t.moves = [];                       // combat Moves granted by Features/class
  if(!Array.isArray(t.buffs)) t.buffs = [];                       // active Cheers / Orders / Songs (#2)
  if(!Array.isArray(t.customActions)) t.customActions = [];       // freeform actions/notes not in any DB/Feature
  if(!t.msStats || typeof t.msStats!=="object") t.msStats = { atk:0, spatk:0 };  // Level-Up milestone Bonus-Stats already baked into combat.added
  syncMilestoneStats(t);                                          // reconcile assigned milestone points → Atk/SpAtk
  normBoss(t);                                                    // Boss Template block, if this Trainer is a boss (Running the Game p.487)
  return t;
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
/* run a full-section re-render (root.innerHTML="" + rebuild) without losing the page's scroll
   position — removing a control mid-event (e.g. the <select> that just fired "change") can make
   the browser drop focus to <body> and jump to the top of the page. */
function preserveScroll(fn){
  const y = window.scrollY;
  fn();
  requestAnimationFrame(()=>window.scrollTo(0, y));
}

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
const cloud = { client:null, campaign:"", userId:"", name:"", isGM:false, viewer:false,
                byId:{}, activeId:null, sub:null, lastSaveTs:0, saveTimer:null, pc:null,
                inflight:{},    // rowId → count of in-flight CAS writes (defer realtime while >0)
                opsRpc:null,    // null = untested, true = server supports field-level patches, false = fall back
                lastEvent:0,    // when we last heard ANYTHING from realtime (watchdog input)
                subStatus:"",   // last realtime subscribe status ("SUBSCRIBED" when healthy)
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
  const gift = giftStatBonus(t);                            // Legendary Gift Patron-Stat points (book p.57)
  const raw = k => t.combat[k].base + t.combat[k].added + (gift[k]||0);   // pre-Combat-Stage ("real") stat
  const cap6 = v => Math.min(6, Math.floor(v/5));
  const cs = effectiveCS(t);                               // Combat Stages (manual t.cs + conditions)
  const statB = equipStatBonus(t);                         // Focus item: +5 to a chosen stat, AFTER Combat Stages
  const eqEva = equipEvasion(t);                            // shields add flat Evasion (all three types)
  const tot = k => k==="hp" ? raw("hp") : (Math.floor(raw(k) * csMult(cs[k])) + (statB[k]||0));   // CS-adjusted (+ Focus)
  const acro = rankNum(t.skills.acrobatics), athl = rankNum(t.skills.athletics);
  const combat = rankNum(t.skills.combat);
  let power = 4;  if (athl >= 3) power++; if (combat >= 4) power++;
  let hj = 0;     if (acro >= 4) hj++; if (acro >= 6) hj++;
  const fullHP = t.level*2 + raw("hp")*3 + 10;             // undamaged maximum
  const injuries = Math.max(0, t.injuries||0);
  const hp = injuryHealCap(fullHP, injuries);              // Injuries cap max HP −10% each (Core p.249)
  return {
    hp, fullHP, injuries, cs,
    physEva: cap6(tot("def"))+cs.eva+eqEva, specEva: cap6(tot("spdef"))+cs.eva+eqEva, spdEva: cap6(tot("spd"))+cs.eva+eqEva,   // CS-adjusted evasion (+ shields)
    ap: 5 + Math.floor(t.level/5),
    power, highJump: hj, longJump: Math.floor(acro/2),
    dr: equipDR(t).dr,                                       // worn-armor Damage Reduction (also flows through buffDR on the damage input)
    overland: 3 + Math.floor((athl+acro)/2) + equipOverland(t), swim: Math.floor((3+Math.floor((athl+acro)/2))/2),
    throwing: 4 + athl,
    totals: Object.fromEntries(STATS.map(([k])=>[k, tot(k)])),        // CS-adjusted (used for attack/defense)
    realTotals: Object.fromEntries(STATS.map(([k])=>[k, raw(k)])),    // pre-CS
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
  // Huge Power / Pure Power double the user's Base Attack stat (incl. Nature, Core p.199) — applied
  // to the base so allocated points add on top and Combat Stages still multiply the result.
  if (hasAbility(p,"Huge Power") || hasAbility(p,"Pure Power")) out.atk *= 2;
  return out;
}
function pokeDerived(p) {
  const base = pokeBaseStats(p);
  const total = {}; STATS.forEach(([k]) => total[k] = base[k] + (p.stats[k]?.added||0));   // pre-CS ("real") stats
  // A handful of homebrew GM-prop species (e.g. Barrier) pin one or more stats to a fixed value —
  // irreversible, ignores level/added points/Combat Stages entirely (forced BEFORE the CS multiplier
  // below, so e.g. a forced Defense of 0 stays exactly 0 no matter what CS is applied to it).
  const forced = getSpecies(p.species)?.forcedStats;
  if(forced) STATS.forEach(([k])=>{ if(k!=="hp" && typeof forced[k]==="number") total[k]=forced[k]; });
  const cap6 = v => Math.min(6, Math.floor(v/5));
  const cs = effectiveCS(p);                              // Combat Stages (manual + conditions)
  const eff = {}; STATS.forEach(([k]) => eff[k] = k==="hp" ? total.hp : Math.floor(total[k] * csMult(cs[k])));
  const fullMaxHP = (forced && typeof forced.hp==="number") ? forced.hp : (p.level + total.hp*3 + 10);   // undamaged maximum
  const injuries = Math.max(0, p.injuries||0);
  const maxHP = injuryHealCap(fullMaxHP, injuries);      // Injuries cap max HP at −10% each (Core p.249)
  const budget = p.level + 10;
  const spent = STATS.reduce((s,[k]) => s + (p.stats[k]?.added||0), 0);
  // Snow Cloak in Hail adds flat Evasion on top of the normal ⌊stat/5⌋ (cap 6) — an ability bonus,
  // so it is added AFTER the cap rather than being squeezed under it. The Evasion Combat Stage
  // (cs.eva, Core p.234) works the same way — a flat add on top, separately capped −6…+6.
  const wEva = weatherEvasion(p);
  const inspiredEva = hasStatus(p,"inspired") ? 1 : 0;   // Inspired Training: +1 Evasion
  return {
    base, total, cs, eff, maxHP, fullMaxHP, injuries, budget, spent, remaining: budget - spent,
    physEva: cap6(eff.def)+cs.eva+wEva+inspiredEva, specEva: cap6(eff.spdef)+cs.eva+wEva+inspiredEva, spdEva: cap6(eff.spd)+cs.eva+wEva+inspiredEva,   // evasion uses CS-adjusted stats
    weatherEva: wEva,
  };
}
/* PTU 1.05 effectiveness ladder (Core p.240): net weakness/resist STEPS, not raw ×2/×0.5
   multiplication. One weakness = ×1.5 (not ×2), double = ×2, triple = ×3; one resist = ×0.5,
   double = ×0.25 (floored); any immunity = ×0. */
function ptuEffMult(steps){
  if(steps<=-2) return 0.25;
  if(steps===-1) return 0.5;
  if(steps===0)  return 1;
  if(steps===1)  return 1.5;
  if(steps===2)  return 2;
  return 3;       // 3+ steps (only reachable via ability/held type-adds)
}
/* net effectiveness multiplier of one attacking type vs a defender's type(s), PTU ladder.
   `stepAdj` shifts the result along the ladder BEFORE it becomes a multiplier — that's how the
   Swarm Template's "resisted one step further" (−1) and "one step more super-effective" (+1)
   are meant to compose with normal weaknesses, rather than multiplying the final number. */
function typeMultAgainst(atkType, defTypes, stepAdj=0){
  let steps = 0, immune = false;
  (defTypes||[]).forEach(dt => {
    const v = TYPE_CHART[atkType]?.[dt] ?? 1;   // chart only holds 2, 0.5 or 0
    if(v === 0) immune = true;
    else if(v > 1) steps++;
    else if(v < 1) steps--;
  });
  if(immune) return 0;                          // immunity is absolute — a swarm can't undo it
  return ptuEffMult(steps + stepAdj);
}
/* Defensive type-chart adjustments from a Pokémon's abilities (Core p.199). Per the always-on rule,
   ONLY Static abilities are auto-applied here — triggered/reactive ones (Lightning Rod, Storm Drain,
   Thermal Exchange, Steelworker…) stay the player's to invoke and are left as reference text.
   Returns { step:{Type:Δ}, immune:Set<Type>, wonderGuard, why:[] } — step Δ is a ladder-step shift
   (negative = more resistant), fed straight into typeMultAgainst's stepAdj. */
function defenseTypeMods(p){
  const step = {}, immune = new Set(), why = [];
  let wonderGuard = false;
  const add = (ty,d)=>{ step[ty] = (step[ty]||0) + d; };
  const A = n => hasAbility(p, n);
  // resists a Type one step further
  if(A("Thick Fat")){ add("Fire",-1); add("Ice",-1); why.push("Thick Fat: resists Fire & Ice one step further"); }
  if(A("Heatproof")){ add("Fire",-1); why.push("Heatproof: resists Fire one step further"); }
  if(A("Water Bubble")){ add("Fire",-1); why.push("Water Bubble: resists Fire one step further"); }
  if(A("Purifying Salt")){ add("Ghost",-1); why.push("Purifying Salt: resists Ghost"); }
  // resists a Type one step LESS (extra vulnerability)
  if(A("Fluffy")){ add("Fire",+1); why.push("Fluffy: weaker to Fire (also resists Melee further — not shown on the Type chart)"); }
  // outright Type immunities (the static immunity only; any on-hit heal/boost is triggered → not auto-applied)
  [["Levitate","Ground"],["Sap Sipper","Grass"],["Volt Absorb","Electric"],["Water Absorb","Water"],
   ["Flash Fire","Fire"],["Motor Drive","Electric"],["Earth Eater","Ground"],["Well-Baked Body","Fire"],
   ["Dry Skin","Water"]].forEach(([ab,ty])=>{ if(A(ab)){ immune.add(ty); why.push(`${ab}: immune to ${ty}`); } });
  // Wonder Guard: only Super-Effective damaging attacks affect the user
  if(A("Wonder Guard")){ wonderGuard = true; why.push("Wonder Guard: only Super-Effective attacks can hit"); }
  // Filter / Solid Rock: soften Super-Effective multipliers (×1.5→×1.25, ×2→×1.5). Having BOTH also
  // grants 5 flat Damage Reduction vs Super-Effective damage (their shared errata text). Prism Armor
  // is the same +5 flat DR on its own. All Static.
  let seReduce = false, seFlatDR = 0;
  const filter = A("Filter"), solidRock = A("Solid Rock");
  if(filter || solidRock){ seReduce = true;
    why.push(`${filter&&solidRock?"Filter + Solid Rock":filter?"Filter":"Solid Rock"}: Super-Effective softened (×1.5→×1.25, ×2→×1.5)`); }
  if(filter && solidRock){ seFlatDR += 5; why.push("Filter + Solid Rock: +5 DR vs Super-Effective"); }
  if(A("Prism Armor")){ seFlatDR += 5; why.push("Prism Armor: +5 DR vs Super-Effective"); }
  return { step, immune, wonderGuard, seReduce, seFlatDR, why };
}
/* Filter / Solid Rock soften a Super-Effective multiplier by one "half-step" on the PTU ladder. */
function seReducedMult(m){ return m>=2 ? 1.5 : m>1 ? 1.25 : m; }
function typeEffectiveness(defTypes, mods) {
  const res = {};
  TYPES.forEach(atk => {
    if (mods?.immune?.has(atk)) { res[atk] = 0; return; }   // ability grants full immunity
    let m = typeMultAgainst(atk, defTypes, mods?.step?.[atk] || 0);
    if (mods?.wonderGuard && m > 0 && m <= 1) m = 0;         // neutral/resisted hits can't land
    if (mods?.seReduce && m > 1) m = seReducedMult(m);        // Filter / Solid Rock soften Super-Effective
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
/* A Mega-Evolved Pokémon keeps its own uploaded photo separate from its base form's (p.megaImage
   vs p.image) — otherwise a photo taken while Mega'd would stick around after reverting, and vice
   versa, since p.species (and so the sprite lookup) toggles but a single shared field wouldn't. */
function monImage(p){ return p.mega ? (p.megaImage||"") : (p.image||""); }
function setMonImage(p, url){ if(p.mega) p.megaImage = url; else p.image = url; }
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

/* ---------- Image storage (Supabase Storage + CDN) ----------
   Images used to be embedded as base64 data-URLs inside the synced `data` JSON. That made
   map/PC/character rows huge, so every edit's realtime event came back truncated and every
   connected client re-downloaded the whole row (all its images) again — by far the biggest
   egress cost. We now upload images to a PUBLIC Storage bucket (CDN-cached, so repeat loads are
   cache hits) and keep only the short public URL in the row. Falls back to the original data-URL
   when offline / not in a campaign / if the bucket isn't set up, so nothing breaks in those cases
   and old data-URLs already in the DB keep rendering. See SETUP-CLOUD.md "Part A2" for bucket setup. */
const IMG_BUCKET = "images";
function dataURLtoBlob(dataUrl){
  const [head, b64] = String(dataUrl).split(",");
  const mime = (head.match(/data:([^;]+)/) || [,"application/octet-stream"])[1];
  const bin = atob(b64); const bytes = new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}
async function storeImg(dataUrl, subdir){
  // Only upload genuine base64 data-URLs while connected to a campaign; otherwise return the value
  // untouched (already a URL, offline/local, or a placeholder) so behaviour is unchanged there.
  if(mode!=="cloud" || !cloud.client || !cloud.campaign || !/^data:[^,]*;base64,/i.test(dataUrl||"")) return dataUrl;
  try{
    const blob = dataURLtoBlob(dataUrl);
    const ext  = ((blob.type.split("/")[1]||"png").split("+")[0]).replace(/[^a-z0-9]/gi,"") || "png";
    const path = `${cloud.campaign}/${subdir}/${uid()}.${ext}`;
    const { error } = await cloud.client.storage.from(IMG_BUCKET)
      .upload(path, blob, { contentType: blob.type, cacheControl: "31536000", upsert: true });
    if(error){ console.error("image upload failed", error); return dataUrl; }
    const { data } = cloud.client.storage.from(IMG_BUCKET).getPublicUrl(path);
    return (data && data.publicUrl) ? data.publicUrl : dataUrl;
  }catch(e){ console.error("image upload failed", e); return dataUrl; }
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
/* lock the SHEET views when viewing a cloud character you can't edit. Reference, Battle, Map and PC
   are excluded: they aren't the active character's sheet and run their own permission models — the
   Map in particular gates GM tools by isGM and each token by its own `editable` flag, so the blanket
   read-only lock (which greys out & disables every .card button) must not reach its toolbar, or a
   Viewer/co-pilot can't use ＋ Add token / ☑ All players even though those are theirs to use. */
function applyReadonlyLock(){
  const lock = mode==="cloud" && cloud.activeId && !canEditActive();
  const EXEMPT = new Set(["view-reference","view-battle","view-map"]);
  $$(".view").forEach(v => v.classList.toggle("ro", !!lock && !EXEMPT.has(v.id)));
}

/* ===================================================================
   TRAINER VIEW
=================================================================== */
let trainerTab = "sheet";
function renderTrainer(){
  const c = activeChar(), t = c.trainer, root = $("#view-trainer");
  root.innerHTML = "";
  // the Gifts sub-tab shows for the GM (to grant Gifts) or once the Trainer actually has one
  const subTabs = [["sheet","Sheet"],["features","Features & Edges"],["levelup","Level Up"],["gear","Inventory & Bio"]];
  if(giftsCanSee(t)) subTabs.push(["gifts","🎁 Gifts"]);
  if(trainerTab==="gifts" && !giftsCanSee(t)) trainerTab="sheet";   // last Gift removed → fall back
  root.append(subTabBar(subTabs, trainerTab, k=>{ trainerTab=k; renderTrainer(); }));

  if(trainerTab==="gifts"){
    root.append(giftsCard(t));
    return;
  }
  if(trainerTab==="features"){
    root.append(classesCard());
    root.append(listCard("Edges","trainer.edges", D.edges.map(x=>x.name), "edge"));
    root.append(listCard("Features","trainer.features", D.features.map(x=>x.name), "feature"));
    root.append(listCard("Abilities","trainer.abilities", D.abilities.map(x=>x.name), "ability"));
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
  const giftB = giftStatBonus(t);   // Legendary Gift Patron-Stat points fold into the combat total
  STATS.forEach(([k,lbl]) => {
    const canInc = t.unlocked || tb.remaining > 0;
    const box = el("div",{class:"stat"},
      el("div",{class:"lbl"},lbl+(giftB[k]?` +${giftB[k]}🎁`:"")),
      inputMini(`trainer.combat.${k}.base`,  t.combat[k].base,  "base"),
      statStepper(t.combat[k].added, canInc, v=>{ t.combat[k].added = v; save(); renderTrainer(); }),
      el("div",{class:"big","data-tot":k}, t.combat[k].base + t.combat[k].added + (giftB[k]||0)),
    );
    sg.append(box);
  });
  sc.append(sg);
  sc.append(el("h3",{style:"margin-top:14px"},"Derived Stats"));
  sc.append(trainerDerivedGrid(t));
  root.append(sc);

  /* combat stages */
  root.append(trainerCombatStagesCard(t));

  /* buffs & orders (Cheers / Commander Orders / Musician Songs) */
  root.append(buffsCard(t, ()=>preserveScroll(()=>{ save(); renderTrainer(); })));

  /* weapons (modify Struggle) */
  root.append(weaponsCard(t));

  /* worn equipment (armor DR, skill mods, shields, Focus… auto-applied) */
  root.append(equipmentCard(t));

  /* skills */
  const skc = el("div",{class:"card"}, el("h3",{},"Skills",
     el("span",{class:"muted small"},"tap a rank · 🎲 to roll")));
  if((t.edges||[]).includes("Categoric Inclination")){
    const ciWrap = el("div",{class:"inline small",style:"margin:-4px 0 8px;gap:8px;align-items:center"});
    ciWrap.append(el("span",{class:"muted",style:"font-weight:700"},"Categoric Inclination — +1 to:"));
    const sel = el("select",{style:"padding:4px 6px"});
    ["Body","Mind","Spirit"].forEach(c=>sel.append(el("option",{value:c,selected:t.categoricInclination===c},c)));
    sel.addEventListener("change",()=>{ t.categoricInclination=sel.value; save(); renderTrainer(); });
    ciWrap.append(sel);
    skc.append(ciWrap);
  }
  const tbl = el("table",{class:"skilltable"});
  SKILLS.forEach(([k,lbl]) => {
    const tr = el("tr",{});
    const bonus = categoricBonus(t, k) + equipSkillBonus(t, k);   // Categoric Inclination Edge + worn equipment (Sunglasses, Running Shoes…)
    tr.append(el("td",{},lbl+(bonus?` +${bonus}`:"")));
    const rb = el("td",{},rankButtons(k, t.skills[k]));
    const dice = el("td",{class:"dice","data-dice":k}, `${rankDice(t.skills[k])}d6${bonus?`+${bonus}`:""}`);
    const roll = el("td",{}, el("button",{class:"btn-secondary",style:"padding:2px 8px",title:`roll ${lbl}`,
      onclick:()=>rollSkill(lbl, rankDice(t.skills[k]), bonus)},"🎲"));
    tr.append(rb, dice, roll);
    tbl.append(tr);
  });
  skc.append(tbl);
  root.append(skc);
}

/* Auto Injuries (Core p.249-250): a Pokémon/Trainer gains an Injury from (a) Massive Damage —
   a single hit ≥50% of undamaged max HP — and (b) crossing each 50%-of-max HP marker downward
   (50%, 0%, −50%, −100%, …). Both can apply on the same hit. Verified against the rule via web
   search (2026-07-28) since the app had no auto-injury logic before. */
function ownerFullHP(owner){
  return owner.species!==undefined ? pokeDerived(owner).fullMaxHP : trainerDerived(owner).fullHP;
}
function injuriesFromHit(fullHP, oldHP, newHP, dmgAmount){
  if(!fullHP || dmgAmount<=0) return 0;
  let n = 0;
  for(let frac=0.5, i=0; frac*fullHP >= newHP && i<40; frac-=0.5, i++){
    const t = frac*fullHP;
    if(oldHP > t && newHP <= t) n++;
  }
  if(dmgAmount >= fullHP*0.5) n++;               // Massive Damage — independent of markers crossed
  return n;
}
/* Shared by every HP setter (damageHealRow, setTokenHP): applies injuriesFromHit to a damaging
   change and toasts it. Swarms never take Injuries (Core p.478), so they're excluded here rather
   than at each call site. Bosses (Running the Game p.487) follow a DIFFERENT rule than normal —
   they only take an Injury from Massive Damage (≥half their full HP in one hit), never from
   crossing the ordinary 25/50/75% HP markers — the "loses half its HP bars" Injury is handled
   separately in bossSetTotalHP (it needs the post-cascade bar count, not a single hit's size). */
function applyAutoInjury(owner, oldHP, newHP){
  if(!owner || newHP>=oldHP || isSwarm(owner)) return 0;
  const dmg = oldHP - newHP;
  if(isBoss(owner)){
    const full = ownerFullHP(owner);
    if(full && dmg >= full*0.5){
      owner.injuries = (owner.injuries||0) + 1;
      toast("+1 Injury! (Massive Damage on a Boss)");
      return 1;
    }
    return 0;
  }
  const inj = injuriesFromHit(ownerFullHP(owner), oldHP, newHP, dmg);
  if(inj > 0){
    owner.injuries = (owner.injuries||0) + inj;
    toast(`+${inj} Injur${inj===1?"y":"ies"}! (Massive Damage / HP marker crossed)`);
  }
  return inj;
}
/* Damage / Heal control: one signed input — type 20 to heal 20, −20 to take 20 damage. */
/* `owner` (optional) = the creature taking the damage; when it has active Damage-Reduction
   buffs, a negative (damage) entry is auto-reduced by the DR and any one-shot DR buff is spent. */
/* max HP for a trainer or a Pokémon owner object (hpTick — 1/10 max, min 1 — is defined up top) */
function ownerMaxHP(owner){
  if(!owner) return null;
  return ("combat" in owner) ? trainerDerived(owner).hp : pokeDerived(owner).maxHP;
}
function damageHealRow(getHP, setHP, owner){
  const wrap = el("div",{class:"dhrow"});
  const box = el("input",{type:"number",placeholder:"±HP",title:"20 heals, −20 damages",class:"dh-input"});
  const raw = el("input",{type:"checkbox"});                 // skip DR (indirect damage: poison, recoil…)
  const apply = () => {
    let n = parseInt(box.value); box.value=""; if(!n) return;
    if(n < 0 && owner && !raw.checked){
      const { dr, from } = buffDR(owner);
      if(dr > 0){
        const incoming = -n, absorbed = Math.min(incoming, dr), applied = incoming - absorbed;
        const spent = consumeDamageBuffs(owner);
        toast(`DR ${dr} absorbed ${absorbed} (${from.join(", ")}) — took ${applied}${spent?" · buff spent":""}`);
        n = -applied;
      }
    }
    const oldHP = getHP();
    if(owner) applyAutoInjury(owner, oldHP, oldHP+n);
    setHP(oldHP + n);
  };
  // ± one Tick of HP (1/10 max) — direct HP change, no DR (Ticks are fixed chunks)
  const tickApply = sign => {
    const t = hpTick(ownerMaxHP(owner)); const oldHP = getHP(); const n = sign*t;
    if(owner) applyAutoInjury(owner, oldHP, oldHP+n);
    setHP(oldHP + n);
  };
  box.addEventListener("keydown", e=>{ if(e.key==="Enter") apply(); });
  const tick = hpTick(ownerMaxHP(owner));
  wrap.append(
    el("span",{class:"small muted",style:"font-weight:700"},"Damage / Heal"),
    box,
    el("button",{class:"btn-secondary",style:"padding:6px 14px",onclick:apply},"Apply"),
    el("button",{class:"btn-secondary",style:"padding:6px 10px",title:`lose a Tick of HP (${tick} = 1/10 max)`,onclick:()=>tickApply(-1)},"−Tick"),
    el("button",{class:"btn-secondary",style:"padding:6px 10px",title:`regain a Tick of HP (${tick} = 1/10 max)`,onclick:()=>tickApply(+1)},"+Tick"),
    el("span",{class:"small muted"},"+ heals · − damages"));
  if(owner){
    const { dr } = buffDR(owner);
    if(dr > 0) wrap.append(el("label",{class:"small muted",style:"display:inline-flex;align-items:center;gap:4px;margin-left:6px",
      title:"Damage Reduction from active buffs auto-applies to damage. Tick to ignore it (indirect damage)."},
      raw, `ignore DR ${dr}`));
  }
  return wrap;
}
/* ---------- Trainer weapons (modify the Struggle Attack — Core p.286) ---------- */
const WEAPON_PRESETS = {
  "Small Melee":{dbMod:1, acMod:0, range:"Melee",        twoHanded:false},
  "Large Melee":{dbMod:2, acMod:1, range:"Melee",        twoHanded:true},
  "Short Range":{dbMod:0, acMod:0, range:"4m",           twoHanded:false},
  "Long Range": {dbMod:1, acMod:1, range:"12m (min 4m)", twoHanded:true},
  "Custom":     {dbMod:0, acMod:0, range:"Melee",        twoHanded:false},
};
/* Weapon Moves a Fine Weapon can grant (Core pp.287-291) — all already in the moves DB.
   Two tiers, gated by the trainer's Combat skill rank: an EOT-frequency Adept Technique (Combat
   Adept+) and a stronger Scene x2 Master Technique (Combat Master) — a Fine Weapon can grant BOTH
   at once. The weapon's own +DB/+AC apply to either. */
const WEAPON_MOVES_ADEPT  = ["Backswing","Bash!","Bullseye","Cheap Shot","Pierce!","Salvo","Wear Down","Wounding Strike","Double Swipe"];
const WEAPON_MOVES_MASTER = ["Bleed!","Deadly Strike","Furious Strikes","Gouge","Maul","Riposte","Slice","Sweeping Strike","Titanic Slam","Triple Threat"];
function weaponMoveRankOk(t, tier){ return !!t.unlocked || rankNum(t.skills.combat) >= (tier==="master"?6:4); }
function newWeapon(){ return { id:uid(), name:"", category:"Small Melee", type:"Normal", notes:"", weaponMoveAdept:"", weaponMoveMaster:"", equipped:false, ...WEAPON_PRESETS["Small Melee"] }; }
/* the trainer's Struggle Attack after Combat rank + the equipped weapon */
/* the trainer's Struggle Attack — unarmed by default, or modified by a given weapon */
function trainerStruggle(t, w){
  const expert = rankNum(t.skills.combat) >= 5;          // Combat Expert+ → AC 3 / DB 5
  let ac = expert ? 3 : 4, db = expert ? 5 : 4, type = t.struggleType || "Normal", range = "Melee", name = "Struggle Attack";
  let cls = (type!=="Normal" && t.struggleSpecial && trainerStruggleCanBeSpecial(t)) ? "Special" : "Physical";
  if(w){ ac += (w.acMod||0); db += (w.dbMod||0); type = w.type || type; range = w.range || range; name = w.name || "Weapon Strike"; cls = "Physical"; }
  return { name, ac, damageBase:db, type, range, cls, weapon:w };
}
/* elemental unarmed Struggle for trainers — trainers have no capabilities of their own (those are a
   Pokémon mechanic, Core p.75-ish), so this is GM-flexible via 🔓 unlock only (same "GM adjusts the
   number" pattern used for weapons/items elsewhere in this app), not tied to any specific Edge/Feature. */
function trainerStruggleTypeOptions(t){ return t?.unlocked ? TYPES.slice() : ["Normal"]; }
function trainerStruggleCanBeSpecial(t){ return !!t?.unlocked; }
function trainerStruggleControl(t, rerender, saveFn){
  saveFn = saveFn || save;
  const opts = trainerStruggleTypeOptions(t);
  const canSpec = trainerStruggleCanBeSpecial(t);
  if(opts.length <= 1 && !canSpec) return el("span",{style:"display:none"});
  const wrap = el("div",{class:"inline small",style:"margin:2px 0 8px;flex-wrap:wrap;gap:8px;align-items:center"});
  wrap.append(el("span",{class:"muted",style:"font-weight:700"},"Unarmed Struggle:"));
  const sel = el("select",{style:"padding:4px 6px"});
  opts.forEach(ty => sel.append(el("option",{value:ty,selected:(t.struggleType||"Normal")===ty}, ty)));
  sel.addEventListener("change",()=>{ t.struggleType = sel.value==="Normal"?null:sel.value; saveFn(); rerender(); });
  wrap.append(sel);
  if(canSpec){
    const lbl = el("label",{class:"muted",title:"Use Sp.Atk / deal Special damage",style:"display:inline-flex;gap:4px;align-items:center;cursor:pointer"});
    const cb = el("input",{type:"checkbox"}); cb.checked = !!t.struggleSpecial;
    cb.addEventListener("change",()=>{ t.struggleSpecial = cb.checked; saveFn(); rerender(); });
    lbl.append(cb, "Special"); wrap.append(lbl);
  }
  return wrap;
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
    );
    const r3 = el("div",{class:"fieldrow"});
    r3.append(
      field("Adept Move","",{opts:["", ...WEAPON_MOVES_ADEPT], value:w.weaponMoveAdept||"", onchange:v=>{ w.weaponMoveAdept=v; save(); renderTrainer(); }}),
      field("Master Move","",{opts:["", ...WEAPON_MOVES_MASTER], value:w.weaponMoveMaster||"", onchange:v=>{ w.weaponMoveMaster=v; save(); renderTrainer(); }}),
    );
    box.append(r1, r2, r3, field("Notes","",{value:w.notes,onchange:v=>{ w.notes=v; save(); }}));
    const ws = trainerStruggle(t, w);
    box.append(el("div",{class:"small",style:"margin-top:6px"}, el("b",{},"Attack: "),
      el("span",{html:typeBadge(ws.type)}), ` Physical · AC ${ws.ac} · DB ${ws.damageBase} (${(DB_TABLE[ws.damageBase]||"?").split("/")[0].trim()}) · ${ws.range}`));
    [["weaponMoveAdept","adept"],["weaponMoveMaster","master"]].forEach(([field_,tier])=>{
      const mn = w[field_]; if(!mn) return;
      const wm = moveByName.get(mn.toLowerCase()); if(!wm) return;
      const ok = weaponMoveRankOk(t, tier);
      box.append(el("div",{class:"small",style:`margin-top:2px;${ok?"":"opacity:.55"}`},
        el("span",{class:"muted"}, `+ ${tier==="master"?"Master":"Adept"} Technique `), mn+": ",
        `${wm.frequency||""} · ${wm.class||""} · DB ${wm.damageBase}${w.dbMod?`+${w.dbMod}`:""} · AC ${wm.ac}${w.acMod?`+${w.acMod}`:""} · ${wm.range||""}`,
        !ok?el("span",{style:"color:var(--bad)"}, ` — needs Combat ${tier==="master"?"Master":"Adept"}`):"")); });
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
  const bm = buffMods(t);                 // active Cheers / Orders / Songs (#2)
  const accCS = trainerDerived(t).cs.acc||0;   // Accuracy Combat Stage: flat add to Accuracy Rolls (Core p.234)
  /* Multi-strike Weapon Moves (Core p.242) — the keywords live in the profile's range string, e.g.
     Furious Strikes "WR, 1 Target, Five Strike" / Gouge "WR, 1 Target, Double Strike". */
  const fiveStrike = isFiveStrike(st), dblStrike = isDoubleStrike(st);
  const nAcc = dblStrike ? 2 : 1;
  let targetEva = 0;                      // target's Evasion — auto-counts the Double Strike hits
  const baseDBv = (st.damageBase||0)+(bm.db||0);
  const diceFor = db => (DB_TABLE[Math.max(0,Math.min(28,db))]||"").split("/")[0].trim();
  const diceStr = diceFor(baseDBv);
  const dm = diceStr.match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/) || [];
  const dn = dm[1]?+dm[1]:0, dfaces = dm[2]?+dm[2]:0, dflat = dm[3]?parseInt(dm[3].replace(/\s/g,"")):0;
  // Infatuation (Feb 2016 errata): −5 to Damage Rolls unless attacking your Crush, in which case Attack
  // is halved instead. Toggle only appears if this trainer is Infatuated.
  const infatuated = hasStatus(t, "infatuation");
  let crushBox = null;
  const infatMod = () => {
    if(!infatuated) return { atk, delta:0, halved:false };
    if(crushBox && crushBox.checked) return { atk: Math.floor(atk/2), delta:0, halved:true };
    return { atk, delta:-5, halved:false };
  };
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
    el("div",{style:"font-size:16px;font-weight:700"}, dblStrike ? "Accuracy: 2 × 1d20" : "Accuracy: 1d20"),
    el("div",{class:"small muted",style:"margin-top:2px"},
      `Roll ${dblStrike?"2 separate Attack Rolls — each ":"1d20 — "}hits if it's ≥ AC ${st.ac} + the target's Physical Evasion. Nat 20 auto-hits/crits, nat 1 auto-misses.`)));
  if(dn){
    const terms = [`${dn}d${dfaces}`]; if(dflat) terms.push(String(dflat)); if(atk) terms.push(String(atk));
    const why = [`${dn}d${dfaces}${dflat?`+${dflat}`:""} = Damage Base ${st.damageBase}`];
    if(atk) why.push(`${atk} = your Attack`);
    explain.append(el("div",{},
      el("div",{style:"font-size:16px;font-weight:700"}, `Damage: ${terms.join(" + ")}`),
      el("div",{class:"small muted",style:"margin-top:2px"}, why.join(" · ") + ". STAB never applies to Struggle. Target then subtracts Defense."
        + (fiveStrike ? " Five Strike multiplies this Damage Base by the rolled hit count." : "")
        + (dblStrike  ? " Double Strike doubles this Damage Base if both Attack Rolls connect." : ""))));
  }
  body.append(explain);

  /* --- multi-strike Weapon Moves: one Attack Roll per strike, counted automatically --- */
  if(fiveStrike || dblStrike){
    const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
    wc.append(el("div",{class:"small",style:"font-weight:700;margin-bottom:4px"},
      fiveStrike ? "🎯 Five Strike — 1d8 hit count" : "⚔ Double Strike — 2 separate Attack Rolls"));
    if(dblStrike){
      const row = el("div",{class:"inline",style:"gap:8px;align-items:center;flex-wrap:wrap"});
      const inp = el("input",{type:"number",min:0,value:targetEva,style:"width:90px"});
      inp.addEventListener("input",()=>{ targetEva = Math.max(0, parseInt(inp.value)||0); });
      row.append(el("span",{class:"small"},"Target's Evasion"), inp);
      wc.append(row);
    }
    wc.append(el("div",{class:"small muted",style:"margin-top:4px"},
      fiveStrike ? `Rolling 🎲 also rolls 1d8 for the hit count (1 / 2-3 / 4-6 / 7 / 8 → 1 / 2 / 3 / 4 / 5 hits); Damage Base ${baseDBv} is multiplied by it.`
                 : `Both Attack Rolls are checked against AC ${st.ac} + this Evasion when you press 🎲 (nat 20 always hits, nat 1 always misses). 1 hit → DB ${baseDBv} · both hit → DB ${baseDBv*2}.`));
    body.append(wc);
  }

  /* --- active buffs (Cheers / Orders / Songs) applied to this roll (#2) --- */
  const tbuffs = ownerBuffs(t);
  if(tbuffs.length){
    const bcard = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    bcard.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},"✨ Buffs & Orders active"));
    tbuffs.forEach(b=>{ const mt=buffModText(b.mods);
      bcard.append(el("div",{class:"small"}, `• ${b.name}` + (mt?` — ${mt}`:""), b.note?el("span",{class:"muted"},"  "+b.note):"")); });
    body.append(bcard);
  }

  /* --- Infatuation prompt (only if this trainer is Infatuated) --- */
  if(infatuated && dn){
    const card = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    const lbl = el("label",{style:"display:flex;gap:8px;align-items:flex-start;cursor:pointer"});
    crushBox = el("input",{type:"checkbox"});
    lbl.append(crushBox, el("div",{},
      el("div",{class:"small",style:"font-weight:700"}, "💕 Infatuated — attacking your Crush?"),
      el("div",{class:"small muted"},
        "Tick if this attack targets the source of the Infatuation: your Attack is halved for the Damage Roll. Otherwise it's a flat −5 to the Damage Roll.")));
    card.append(lbl); body.append(card);
  }

  /* --- results (filled on Roll) --- */
  const out = el("div",{class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"},"Press 🎲 Roll dice to simulate."));
  /* redo = {nats, forceHits} — re-resolve a Double Strike with the SAME Attack Rolls */
  const doRoll = (redo) => {
    out.innerHTML=""; out.style.borderStyle="solid";
    const accMod = (bm.acc||0) + accCS;
    const nats = redo?.nats || Array.from({length:nAcc}, ()=>1+Math.floor(Math.random()*20));
    const acc = nats[0], accTot = acc + accMod;
    const accBits = []; if(bm.acc) accBits.push(`${bm.acc>0?"+":"−"}${Math.abs(bm.acc)} buffs`); if(accCS) accBits.push(`${accCS>0?"+":"−"}${Math.abs(accCS)} Accuracy CS`);
    // Double Strike: resolve every Attack Roll against AC + Evasion and count what connects
    const strikes = dblStrike ? resolveStrikes(nats, accMod, st.ac + targetEva, 20) : null;
    const forced  = dblStrike && redo?.forceHits!=null;
    const connected = !dblStrike ? 1 : (forced ? redo.forceHits : strikes.filter(s=>s.hit).length);
    if(dblStrike){
      out.append(el("div",{style:"margin-bottom:10px"}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLLS"),
        el("div",{style:`font-size:24px;font-weight:800;color:var(--${connected?"good":"bad"})`}, `🎯 ${connected} / 2 strikes connected`),
        el("div",{class:"small muted",style:"margin-top:2px"}, `vs AC ${st.ac} + Evasion ${targetEva} = ${st.ac+targetEva} → ${strikeReadout(strikes)}`),
        accBits.length?el("div",{class:"small muted"}, `Each roll includes ${accBits.join(" ")}.`):"",
        forced?el("div",{class:"small muted"}, `Hit count manually overridden to ${connected}.`):""));
    } else {
      out.append(el("div",{style:"margin-bottom:10px"}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"),
        el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${accTot}`, el("span",{class:"muted",style:"font-size:13px;font-weight:600"}, accBits.length?`  (${acc} ${accBits.join(" ")})`:" (1d20)")),
        el("div",{class:"small muted"}, `Hits if ${accTot} ≥ AC ${st.ac} + target's Physical Evasion.${acc===20?" Natural 20 — auto-hit/crit!":acc===1?" Natural 1 — auto-miss.":""}`)));
    }
    // size the Damage Base from the strikes that landed (Core p.242)
    let db = baseDBv, strikeNote = null;
    if(dblStrike) db = baseDBv * (connected>=2 ? 2 : 1);
    if(fiveStrike){ const hi = fiveStrikeRoll(); db = Math.min(28, baseDBv*hi.hits);
      strikeNote = `🎯 Five Strike: 1d8 → ${hi.d8} = ${hi.hits} hit${hi.hits===1?"":"s"} — DB ${baseDBv} ×${hi.hits} = ${db}`; }
    else if(dblStrike && connected) strikeNote = `⚔ Double Strike: ${connected} of 2 connected — Damage Base ${db}`;
    const r = connected>0 ? rollDiceString(diceFor(db)) : null;
    /* Critical Hit (Core p.235): a natural 20 doubles the Damage Dice (not the Attack bonus).
       On a Double Strike each connecting strike crits on its own, so add one set per crit. */
    const nCrit = dblStrike ? Math.min(strikes.filter(s=>s.crit).length, connected) : (acc===20 ? 1 : 0);
    let critExtra = 0; const critWhy = [];
    for(let c=0;c<nCrit;c++){ const rc = rollDiceString(diceFor(db)); critExtra += rc.dice; critWhy.push(`+${rc.dice} crit (doubled dice)`); }
    if(dblStrike && connected===0){
      out.append(el("div",{}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"),
        el("div",{style:"font-size:20px;font-weight:800;color:var(--bad)"},"— no damage"),
        el("div",{class:"small muted",style:"margin-top:2px"},"Neither Attack Roll met AC + Evasion, so the attack misses entirely.")));
    }
    if(r){ const im = infatMod();
      const total = Math.max(0, r.total + im.atk + (bm.dmg||0) + im.delta + critExtra);
      const parts = [`${r.expr} → [${r.rolls.join(", ")}]${r.flat?` ${r.flat>0?"+":""}${r.flat}`:""} = ${r.total}`, `+ ${im.atk} Attack${im.halved?" (halved — Infatuated)":""}`];
      if(bm.dmg) parts.push(`${bm.dmg>0?"+":""}${bm.dmg} buffs`);
      if(im.delta) parts.push(`${im.delta} Infatuated`);
      if(critWhy.length) parts.push(critWhy.join(" "));
      out.append(el("div",{}, el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"),
        el("div",{style:`font-size:26px;font-weight:800;color:${nCrit?"var(--bad)":"var(--accent)"}`}, `${nCrit?"💥 CRIT! ":"💥 "}${total}`),
        strikeNote?el("div",{class:"small muted",style:"margin-top:2px"}, strikeNote):"",
        el("div",{class:"small muted",style:"margin-top:2px"}, parts.join("  ") + `. Target subtracts Defense.`)));
      if(bm.crit) out.append(el("div",{class:"small muted"}, `Crit / Effect range widened by +${bm.crit} (buffs).`));
      // GM: apply this trainer hit to a battle-map token (trainer attacks are typeless-or-typed Physical).
      const tw = attackTargetWidget({ dmg:total, type:st.type||"Typeless", physical:!/spec/i.test(st.cls||"") });
      if(tw) out.append(tw);
    }
    if(dblStrike){
      const ov = el("div",{class:"inline",style:"gap:6px;flex-wrap:wrap;margin-top:10px;align-items:center"});
      ov.append(el("span",{class:"small muted"},"Override hits:"));
      for(let k=0;k<=nAcc;k++) ov.append(el("button",{class:"btn-secondary",style:"padding:3px 10px",
        onclick:()=>doRoll({nats, forceHits:k})}, String(k)));
      ov.append(el("span",{class:"small muted"},"— keeps the Attack Rolls, re-rolls the damage dice."));
      out.append(ov);
    }
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
  acts.append(el("button",{class:"linkbtn",onclick:()=>pickImage(256, async d=>{ t.avatar=await storeImg(d,"avatar"); save(); renderTrainer(); })},
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
  syncMilestoneStats(t);   // level change may earn/remove milestone Bonus-Stats points
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

  /* injury note: max HP is capped −10% per Injury (Core p.249) */
  if(d.injuries>0) card.append(el("div",{class:"small",style:"color:var(--bad);font-weight:700;margin-bottom:6px"},
    `${d.injuries} injur${d.injuries===1?"y":"ies"} — max HP ${maxHP} (−${d.fullHP-maxHP} of full ${d.fullHP})`));

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
  card.append(damageHealRow(()=>t.currentHP, setHP, t));

  /* temp HP · Injuries */
  const row = el("div",{class:"fieldrow",style:"margin-top:12px"});
  row.append(field("Temp HP","",{type:"number",min:0,value:t.tempHP,onchange:v=>{t.tempHP=parseInt(v)||0;save();}}));
  row.append(field("Injuries","",{type:"number",min:0,max:10,value:t.injuries,
    onchange:v=>{ t.injuries=Math.max(0,Math.min(10,parseInt(v)||0)); save(); renderTrainer(); }}));
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
    "Use 🌙 End Scene / ☀ End Day at the top of the screen. End Scene restores AP & Scene uses; End Day fully heals, refreshes Daily uses, and heals 1 Injury (on you and your Pokémon)."));
  return card;
}
/* Combat Stages card for a Trainer — mirrors the Pokémon one (manual ± per combat stat). */
function trainerCombatStagesCard(t){
  normTrainer(t);
  const d = trainerDerived(t), cond = conditionCSMods(t);
  const anyManual = ALL_CS_STATS.some(([k])=>t.cs[k]);
  const card = el("div",{class:"card"}, el("h3",{},"Combat Stages",
    el("div",{class:"inline"},
      el("span",{class:"muted small"},"tap ±"),
      anyManual?el("button",{class:"linkbtn",onclick:()=>{ ALL_CS_STATS.forEach(([k])=>t.cs[k]=0); save(); renderTrainer(); }},"reset"):"")));
  const grid = el("div",{class:"statgrid"});
  CS_STATS.forEach(([k,lbl])=>{
    const manual = t.cs[k]||0, cm = cond[k]||0, effCS = d.cs[k];
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"big",style: effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}, d.totals[k]));
    box.append(csStepper(manual, v=>{ t.cs[k]=Math.max(-6,Math.min(6,v)); save(); renderTrainer(); }));
    box.append(el("div",{class:"sub"}, `${effCS>0?"+":""}${effCS} CS`));
    grid.append(box);
  });
  ACC_EVA_STATS.forEach(([k,lbl])=>{
    const manual = t.cs[k]||0, effCS = d.cs[k];
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"big",style: effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}, `${effCS>0?"+":""}${effCS}`));
    box.append(csStepper(manual, v=>{ t.cs[k]=Math.max(-6,Math.min(6,v)); save(); renderTrainer(); }));
    box.append(el("div",{class:"sub"}, k==="acc"?"to Accuracy Rolls":"to Phys/Spec/Speed Evasion"));
    grid.append(box);
  });
  card.append(grid);
  card.append(el("div",{class:"small muted",style:"margin-top:4px"},
    "Combat Stages clear at end of encounter. Accuracy/Evasion CS are flat (±1 per stage), not %."));
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
  if(d.dr) items.push(["Damage Reduction", "+"+d.dr]);   // from worn armor (Equipment card)
  items.forEach(([l,v]) => wrap.append(el("div",{class:"dv"},
    el("div",{class:"lbl"},l), el("div",{class:"val"},String(v)))));
  return wrap;
}
function recalcTrainer(){
  const t = activeChar().trainer;
  const before = JSON.stringify(t.msStats||{});
  syncMilestoneStats(t);                       // a manual Level change may earn/remove milestone points
  if(JSON.stringify(t.msStats||{})!==before) save();
  const giftB = giftStatBonus(t);
  STATS.forEach(([k]) => { const n=$(`[data-tot="${k}"]`); if(n) n.textContent = t.combat[k].base + t.combat[k].added + (giftB[k]||0); });
  SKILLS.forEach(([k]) => { const n=$(`[data-dice="${k}"]`); if(n){ const b=categoricBonus(t,k)+equipSkillBonus(t,k); n.textContent = `${rankDice(t.skills[k])}d6${b?`+${b}`:""}`; } });
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
  // Martial Artist's 6 named Martial Achievements (Wrestlemania, Heightened Intensity, …) are
  // keyed to an Ability name ("Guts Ability") rather than a Feature/class name, since the book
  // grants each one through the "Martial Achievement" Feature based on the ability chosen at
  // Martial Artist. Recognize that "<X> Ability" pattern for any class that has earned the
  // granting Feature — this is the only place the DB uses that prereq shape.
  return TECHS.filter(tq => membershipTokens(tq.prereq).some(tok =>
    tokenMatchesClass(tok, className) || featSet.has(tok) ||
    (/\bAbility$/i.test(tok) && featSet.has("Martial Achievement"))));
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

/* the even levels each milestone "Bonus Stats" choice grants one bonus point on — the player
   assigns each earned point to Attack OR Sp.Attack (L5 folds in its "+2 retroactive" as the two
   even levels 2 & 4 passed before taking it at L5). Points are hard-restricted to Atk/SpAtk. */
const LU_STAT_LEVELS = {
  m5:[2,4,6,8,10], m10:[12,14,16,18,20], m20:[22,24,26,28,30],
  m30:[32,34,36,38,40], m40:[42,44,46,48,50],
};
/* milestone Bonus-Stats points, tallied for a given level. Each "Bonus Stats" milestone is a SINGLE
   choice of Attack OR Sp.Attack (t.levelUp[`L{L}:{mk}:stat`] = "atk"|"spatk"); ALL points it earns
   (one per even level for 5 levels — L5 folds in Lv2 & Lv4 as its "+2 retroactive") go into that one
   stat. Only counts levels already reached; future-planning picks never leak into the real sheet. */
function luStatAlloc(t, level){
  const lv = level==null ? (t && t.level || 1) : level;
  const out = { atk:0, spatk:0, total:0, slots:0 };
  if(!t || !t.levelUp) return out;
  for(const L of [5,10,20,30,40]){
    if(L > lv) continue;
    const ms = LU_MILESTONES[L]; if(!ms || !ms.choice) continue;
    const mk = ms.choice.key;
    if(!String(t.levelUp[`L${L}:${mk}`]||"").startsWith("Bonus Stats")) continue;
    const earned = (LU_STAT_LEVELS[mk]||[]).filter(x=>x<=lv).length;
    out.slots += earned;
    const stat = t.levelUp[`L${L}:${mk}:stat`];   // one choice for the whole milestone
    if(stat==="atk"){ out.atk += earned; out.total += earned; }
    else if(stat==="spatk"){ out.spatk += earned; out.total += earned; }
  }
  return out;
}
/* reconcile the assigned milestone points into the trainer's real Atk/SpAtk added-stats.
   Idempotent: only applies the DELTA vs the persisted t.msStats mirror, so re-running (load, cloud
   sync, level change) never double-counts, and de-leveling auto-removes now-unearned points. */
function syncMilestoneStats(t){
  if(!t || !t.combat) return t;
  const want = luStatAlloc(t);
  const have = t.msStats || { atk:0, spatk:0 };
  ["atk","spatk"].forEach(k=>{
    const delta = (want[k]||0) - (have[k]||0);
    if(delta) t.combat[k].added = Math.max(0, (t.combat[k].added||0) + delta);
  });
  t.msStats = { atk:want.atk, spatk:want.spatk };
  return t;
}
/* the single Attack / Sp.Attack choice for a Bonus-Stats milestone — every point it earns goes here */
function luStatChoice(t, key){
  const cur = t.levelUp[key] || "";
  const mk = (val,txt)=>el("button",{class:"lu-statbtn"+(cur===val?" on":""),
    title:`Put these bonus points into ${txt}`,
    onclick:()=>{ t.levelUp[key] = (cur===val?"":val); syncMilestoneStats(t); save(); renderTrainer(); }}, txt);
  return el("div",{class:"lu-slot"},
    el("span",{class:"lu-label"}, "Bonus points go into"),
    el("div",{class:"lu-seg"}, mk("atk","Attack"), mk("spatk","Sp.Atk")));
}
/* does an Edge (by name) rank up a Skill? → reveal a "which Skill?" sub-picker */
function edgeRanksSkill(name){
  const e = (D.edges||[]).find(x=>x.name===name);
  return !!(e && /rank\s*up\s*a\s*skill/i.test(e.effect||""));
}

/* one editable choice slot: a picker button that stores its value in t.levelUp[key].
   kind "skill" picks a Skill (for tracking rank-ups); "edge"/"feature" pick from those lists. */
function luSlot(t, key, kind, label, hint){
  const isSkill = kind==="skill";
  const names = isSkill ? SKILLS.map(s=>s[1])
    : kind==="edge" ? D.edges.map(x=>x.name) : D.features.map(x=>x.name);
  const cur = t.levelUp[key] || "";
  let disp = cur || "choose…";
  if(isSkill && cur){ const sk=SKILLS.find(s=>s[1]===cur); const rk=sk?(t.skills?.[sk[0]]||""):""; disp = rk?`${cur} · ${rk}`:cur; }
  const pickTitle = isSkill ? "Which Skill did you rank up?" : kind==="edge"?"Choose an Edge":"Choose a Feature";
  const btn = el("button",{class:"btn-secondary lu-pick", title: isSkill?"Choose a Skill":"Choose from the "+(kind==="edge"?"Edges":"Features")+" list",
    onclick:()=>openPicker(pickTitle, names, v=>{
      t.levelUp[key]=v; save(); renderTrainer();
    }, isSkill?null:kind)}, disp);
  if(cur) btn.classList.add("filled");
  const row = el("div",{class:"lu-slot"},
    el("span",{class:"lu-label"}, label + (hint?" ":""), hint?el("span",{class:"muted"},`(${hint})`):""),
    btn);
  if(cur) row.append(el("button",{class:"lu-clear",title:"clear",
    onclick:()=>{ delete t.levelUp[key]; delete t.levelUp[key+":skill"]; save(); renderTrainer(); }},"×"));
  // an Edge that ranks up a Skill reveals a companion picker to record which Skill
  if(kind==="edge" && cur && edgeRanksSkill(cur)){
    const wrap = el("div",{}, row, luSlot(t, key+":skill", "skill", "↳ Skill ranked up"));
    return wrap;
  }
  return row;
}

function luMilestoneNode(t, level, ms, future){
  const box = el("div",{class:"lu-ms"},
    el("div",{class:"lu-ms-head"}, el("span",{class:"lu-ms-star"},"★"),
      el("b",{}, `Level ${level} — ${ms.title}`)),
    el("div",{class:"small muted", style:"margin:2px 0 6px"}, ms.note));
  (ms.grants||[]).forEach((g,i)=> box.append(luSlot(t, `L${level}:ms:${i}`, g.kind, g.label, g.hint)));
  if(ms.choice){
    const mk = ms.choice.key;
    const ck = `L${level}:${mk}`;
    const cur = t.levelUp[ck] || "";
    const sel = el("select",{class:"lu-select"});
    sel.append(el("option",{value:""},"— choose —"));
    ms.choice.options.forEach(o=>{ const op=el("option",{value:o}, o); sel.append(op); });
    sel.value = cur;
    sel.addEventListener("change",()=>{ t.levelUp[ck]=sel.value; syncMilestoneStats(t); save(); renderTrainer(); });
    box.append(sel);
    const extra = ms.choice.grants && ms.choice.grants[cur];
    if(extra) extra.forEach((g,i)=> box.append(luSlot(t, `L${level}:${mk}:${i}`, g.kind, g.label, g.hint)));
    // Bonus Stats → one Atk/SpAtk choice; +1 to it on each even Level for 5 levels (auto-applied).
    if(cur.startsWith("Bonus Stats")){
      const stat = t.levelUp[`L${level}:${mk}:stat`];
      const statTxt = stat==="atk"?"Attack" : stat==="spatk"?"Sp.Attack" : null;
      const all = LU_STAT_LEVELS[mk]||[];
      box.append(luStatChoice(t, `L${level}:${mk}:stat`));
      if(future){
        box.append(el("div",{class:"small muted", style:"margin-top:4px"},
          `+1 ${statTxt||"Atk/Sp.Atk"} on each even Level ${all[0]}–${all[all.length-1]} (${all.length} total) once you reach them.`));
      } else {
        const earned = all.filter(x=>x<=(t.level||1)).length;
        box.append(el("div",{class:"small muted", style:"margin-top:4px"},
          statTxt
            ? `+${earned} ${statTxt} so far (of ${all.length}) — added to your stats automatically. Even Levels: ${all.join(", ")}.`
            : `Pick Attack or Sp.Attack above — you’ll gain +1 to it on each even Level ${all[0]}–${all[all.length-1]} (${earned} earned so far).`));
      }
    }
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
  stat += luStatAlloc(t, level).slots;   // milestone Bonus-Stats points earned (Atk/SpAtk)
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
    "Record what you picked at each level — this is a personal tracker and doesn’t change your Features & Edges tab. ",
    "Milestone “Bonus Stats” points are the exception: assign each to Attack or Sp.Attack and they’re added to your Sheet-tab stats automatically."));

  /* summary tallies */
  const tot = luTotals(t, level);
  const msb = luStatAlloc(t, level);
  const addedSum = STATS.reduce((s,[k])=>s+(t.combat[k].added||0),0);
  card.append(el("div",{class:"lu-summary"},
    el("div",{class:"lu-sum"}, el("b",{}, tot.feat), el("span",{class:"muted"}," Features earned"),
      el("div",{class:"small muted"}, `you list ${t.features.length} + ${t.classes.length} classes`)),
    el("div",{class:"lu-sum"}, el("b",{}, tot.edge), el("span",{class:"muted"}," Edges earned"),
      el("div",{class:"small muted"}, `you list ${t.edges.length}`)),
    el("div",{class:"lu-sum"}, el("b",{}, tot.stat), el("span",{class:"muted"}," Stat Points"),
      el("div",{class:"small muted"}, `${addedSum} spent${msb.slots?` · ${msb.total}/${msb.slots} milestone assigned`:""}`)),
  ));

  /* per-level ledger */
  const list = el("div",{class:"lu-levels"});
  for(let L=1; L<=level; L++) list.append(luLevelBlock(t, L));
  card.append(list);

  /* future planning — visual only; picks persist but never count toward budget/tallies */
  if(level < LU_MAX_LEVEL){
    const det = el("details",{class:"lu-future"});
    det.append(el("summary",{},
      `🔮 Plan ahead — Levels ${level+1}–${LU_MAX_LEVEL}`,
      el("span",{class:"small muted",style:"margin-left:8px;font-weight:400"},"visual only · doesn’t affect your sheet")));
    const flist = el("div",{class:"lu-levels", style:"margin-top:10px"});
    for(let L=level+1; L<=LU_MAX_LEVEL; L++) flist.append(luLevelBlock(t, L, true));
    det.append(flist);
    card.append(det);
  }
  return card;
}

/* one level's ledger block (shared by the earned ledger and the future-planning list) */
function luLevelBlock(t, L, future){
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
  if(ms) block.append(luMilestoneNode(t, L, ms, future));
  return block;
}

/* ===================================================================
   TRAINER EQUIPMENT (Core pp.183-192 "Equipment") — gear worn in slots,
   with the mechanical bonuses applied AUTOMATICALLY: Damage Reduction
   (armor), Skill modifiers (Sunglasses, Running Shoes…), Evasion (shields),
   Speed Combat Stage (Heavy Armor), the Focus stat bonus, and granted
   Capabilities. One item per slot; effects flow through the same plumbing
   the buffs use (buffDR / effectiveCS / trainerDerived / the skill roll).
=================================================================== */
const EQUIP_SLOTS = ["Head","Body","Hands","Off-Hand","Feet","Accessory"];
/* Auto-applied effects keyed by lowercased item name. Fields:
     dr        flat Damage Reduction vs ALL damage → feeds buffDR → damage input
     drTyped   {Type:N} DR vs one damage type — shown as a note (the input isn't typed)
     drCrit    DR vs Critical Hits only — shown as a note
     evasion   flat bonus to Physical/Special/Speed Evasion
     speedCS   Speed Combat-Stage default shift (e.g. Heavy Armor −1)
     focus     true → +5 to a chosen stat AFTER Combat Stages (stored in item.focusStat)
     skills    {skillKey:N} flat bonus to that Skill's Checks (skillCap = book cap, display only)
     overland  bonus to Overland Speed
     capabilities  Capabilities granted (display only)
     note      extra rules text worth surfacing                                       */
const EQUIP_EFFECTS = {
  "light armor":            { dr:5 },
  "heavy armor":            { dr:10, speedCS:-1 },
  "ablative heavy armor":   { dr:20, speedCS:-1, note:"Brittle: −5 DR each damaging hit, repairs +5 DR every 5 minutes." },
  "reinforced trenchcoat":  { dr:5, skills:{stealth:4}, note:"+4 Stealth to conceal weapons; beats metal detectors." },
  "slipstream armor":       { dr:5, note:"Once per battle, a Swift Action to escape being Stuck." },
  "flame retardant armor":  { drTyped:{Fire:10} },
  "mesh shielding":         { drTyped:{Electric:5}, note:"On Augmentation Shock, roll 1d2 — on a 1, no effect." },
  "heavy armor [9-15 playtest]":   { dr:5 },
  "light armor [9-15 playtest]":   { drTyped:{Physical:5} },
  "special armor [9-15 playtest]": { drTyped:{Special:5} },
  "stealth clothes":        { skills:{stealth:4}, skillCap:4, note:"Only to remain unseen." },
  "fancy clothes":          { note:"Contest: roll 2d6 in the Introduction Stage for the assigned Contest Stat's dice." },
  "sunglasses":             { skills:{charm:1,guile:1,intimidate:1}, skillCap:3 },
  "running shoes":          { skills:{athletics:2}, skillCap:3, overland:1 },
  "helmet":                 { drCrit:15, note:"Resist Headbutt & Zen Headbutt; can't be flinched by them." },
  "mind aegis":             { skills:{focus:6}, note:"+6 Focus vs Telepathy (with Iron Mind Edge → grants Mindlock instead)." },
  "dark vision goggles":    { capabilities:["Darkvision"] },
  "x-ray goggles":          { capabilities:["X-Ray Vision"] },
  "thermal goggles":        { note:"See in the IR spectrum — spot camouflaged targets & heat sources." },
  "re-breather":            { capabilities:["Gilled (~1 hr)"], note:"Breathe underwater ~1 hour; refills in 5 minutes of open air." },
  "gas mask":               { note:"Breathe through toxins/smoke; immune to Rage Powder, Poison Gas, Poisonpowder, Sleep Powder, Smog, Smokescreen, Spore, Stun Spore, Sweet Scent." },
  "universal translator":   { note:"Understand & speak any programmed language; can be used to speak with Pokémon." },
  "snow boots":             { capabilities:["Naturewalk (Tundra)"], note:"−1 Overland on ice or deep snow." },
  "jungle boots":           { capabilities:["Naturewalk (Forest)"] },
  "flippers":               { note:"+2 Swim when fully submerged, −2 Overland." },
  "handheld propellor":     { note:"+3 Swim speed." },
  "light shield":           { evasion:2, note:"Ready (Standard): instead +4 Evasion & 10 DR until end of next turn, but Slowed. Two-handed = Small Melee Weapon." },
  "heavy shield":           { evasion:2, note:"Ready (Standard): instead +6 Evasion & 15 DR until end of next turn, but Slowed. Two-handed = Small Melee Weapon." },
  "shield [9-15 playtest]": { evasion:1, note:"Ready (Standard): instead +4 Evasion & 10 DR until end of next turn, but Slowed." },
  "focus":                  { focus:true },
  "pheromone emitter":      { note:"Swift Action: +4 to a Charm or Intimidate check vs wild Pokémon (needs a Cartridge)." },
  "sensor disruption vest": { note:"Pokébots & Eye-Augment attackers take −2 Accuracy on single-target checks vs you." },
  "gravity modulation suit":{ note:"Treat local gravity as 1 higher or lower." },
  "thermal dampening suit": { note:"Invisible to thermal imaging gear." },
};
/* mojibake cleanup for the catalog effect strings (é/apostrophes/dashes got double-encoded on import) */
function cleanupText(s){
  return String(s||"")
    .replace(/â€™/g,"'").replace(/â€˜/g,"'").replace(/â€œ/g,'"').replace(/â€/g,'"')
    .replace(/â€"/g,"—").replace(/â€“/g,"–").replace(/â€¦/g,"…")
    .replace(/Ã©/g,"é").replace(/Ã¨/g,"è").replace(/Ã¡/g,"á").replace(/Ã³/g,"ó")
    .replace(/Ã­/g,"í").replace(/Ã±/g,"ñ").replace(/Ã¼/g,"ü").replace(/�/g,"");
}
function equipEffFor(name){
  const n = String(name||"").trim().toLowerCase();
  return EQUIP_EFFECTS[n] || EQUIP_EFFECTS[normItemName(name)] || null;
}
/* the trainer's currently-worn items, as {slot, name, item, eff} (empty slots skipped) */
function equippedList(t){
  const eqp = (t && t.equipment) || {};
  return EQUIP_SLOTS.map(slot=>{
    const cur = eqp[slot];
    const name = (cur && cur.name) || (typeof cur==="string" ? cur : "");
    if(!name) return null;
    return { slot, name, item: (cur && typeof cur==="object") ? cur : { name }, eff: equipEffFor(name) };
  }).filter(Boolean);
}
/* is this owner a Trainer (has combat stats, no species) — Pokémon never carry equipment */
function isTrainerOwner(o){ return !!o && o.species===undefined && !!o.combat; }
/* --- aggregate mechanical bonuses from worn equipment (trainers only) --- */
function equipDR(t){
  let dr=0; const from=[];
  equippedList(t).forEach(({name,eff})=>{ if(eff && eff.dr){ dr+=eff.dr; from.push(name); } });
  return { dr, from };
}
function equipEvasion(t){ return equippedList(t).reduce((s,{eff})=>s+((eff&&eff.evasion)||0),0); }
function equipSpeedCS(t){ return equippedList(t).reduce((s,{eff})=>s+((eff&&eff.speedCS)||0),0); }
function equipOverland(t){ return equippedList(t).reduce((s,{eff})=>s+((eff&&eff.overland)||0),0); }
function equipSkillBonus(t, skillKey){
  return equippedList(t).reduce((s,{eff})=>s+((eff&&eff.skills&&eff.skills[skillKey])||0),0);
}
function equipStatBonus(t){
  const out={atk:0,def:0,spatk:0,spdef:0,spd:0};
  equippedList(t).forEach(({eff,item})=>{
    if(eff && eff.focus && item && item.focusStat && out[item.focusStat]!==undefined) out[item.focusStat]+=5;
  });
  return out;
}
function equipCapabilities(t){
  const caps=[]; equippedList(t).forEach(({eff})=>{ if(eff&&eff.capabilities) eff.capabilities.forEach(c=>caps.push(c)); });
  return caps;
}
/* little auto-applied badges for one equipment item's numeric effects */
function equipEffBadges(eff){
  if(!eff) return [];
  const b=[], mk=txt=>el("span",{class:"badge-auto"},txt);
  if(eff.dr) b.push(mk(`+${eff.dr} DR`));
  if(eff.drTyped) for(const k in eff.drTyped) b.push(mk(`+${eff.drTyped[k]} DR (${k})`));
  if(eff.drCrit) b.push(mk(`+${eff.drCrit} DR vs crit`));
  if(eff.evasion) b.push(mk(`+${eff.evasion} Evasion`));
  if(eff.speedCS) b.push(mk(`${eff.speedCS>0?"+":""}${eff.speedCS} Speed CS`));
  if(eff.overland) b.push(mk(`+${eff.overland} Overland`));
  if(eff.skills) for(const k in eff.skills){ const lbl=((SKILLS.find(s=>s[0]===k)||[])[1])||k; b.push(mk(`+${eff.skills[k]} ${lbl}`)); }
  if(eff.capabilities) eff.capabilities.forEach(c=>b.push(mk(c)));
  return b;
}
/* one-line summary of everything the current loadout grants */
function equipSummary(t){
  const parts=[]; const dr=equipDR(t).dr, eva=equipEvasion(t), scs=equipSpeedCS(t), ovl=equipOverland(t);
  if(dr)  parts.push(`Damage Reduction +${dr}`);
  if(eva) parts.push(`Evasion +${eva}`);
  if(scs) parts.push(`Speed CS ${scs>0?"+":""}${scs}`);
  if(ovl) parts.push(`Overland +${ovl}`);
  const fs=equipStatBonus(t); const fk=Object.keys(fs).find(k=>fs[k]);
  if(fk) parts.push(`+${fs[fk]} ${(STATS.find(s=>s[0]===fk)||[])[1]||fk}`);
  const caps=equipCapabilities(t); if(caps.length) parts.push("Capabilities: "+caps.join(", "));
  if(!parts.length) return null;
  return el("span",{}, el("b",{},"Active bonuses: "), parts.join(" · "));
}
/* which equipment slot an item can be worn in — by its catalog slot, with Fashions (the Fashionista
   Recipes Adorable/Elegant/Rad/Rough/Slick + the Contest Fashions) treated as Accessory-slot items,
   as the rules state. Returns null for anything that isn't wearable. */
function equipSlotForItem(name){
  const n = String(name||"").trim(); if(!n) return null;
  const cat = itemByName.get(n.toLowerCase());
  if(cat && EQUIP_SLOTS.includes(cat.slot)) return cat.slot;
  if(/\bfashion$/i.test(n)) return "Accessory";   // Fashionista recipes are Accessory-slot gear
  return null;
}
/* distinct item names the trainer OWNS (in t.inventory) that can be worn in `slot` — you can only
   equip what you actually carry. The item currently in the slot is kept selectable regardless. */
function equipCandidates(t, slot){
  const seen=new Set(), out=[];
  (t.inventory||[]).forEach(it=>{
    const name=((it&&it.name)||"").trim(); if(!name) return;
    if(equipSlotForItem(name)!==slot) return;
    const key=name.toLowerCase(); if(seen.has(key)) return; seen.add(key); out.push(name);
  });
  return out.sort((a,b)=>a.localeCompare(b));
}
function equipmentCard(t){
  if(!t.equipment || typeof t.equipment!=="object" || Array.isArray(t.equipment)) t.equipment = {};
  const card = el("div",{class:"card"}, el("h3",{},"Equipment",
    el("span",{class:"muted small"},"equip from your inventory — bonuses apply automatically")));
  const anyEquippable = (t.inventory||[]).some(it=>equipSlotForItem(it&&it.name));
  EQUIP_SLOTS.forEach(slot=>{
    const cur = t.equipment[slot];
    const curName = (cur && cur.name) || (typeof cur==="string" ? cur : "") || "";
    const cands = equipCandidates(t, slot);
    const row = el("div",{class:"equip-row"});
    row.append(el("div",{class:"equip-slot"}, slot));
    const cell = el("div",{style:"flex:1;min-width:0"});
    const sel = el("select",{class:"equip-sel"});
    sel.append(el("option",{value:""}, cands.length ? "— empty —" : "— nothing owned for this slot —"));
    cands.forEach(name => sel.append(el("option",{value:name, selected:name===curName}, name)));
    // keep the worn item selectable even if it's no longer carried (so it isn't silently dropped)
    if(curName && !cands.some(n=>n.toLowerCase()===curName.toLowerCase()))
      sel.append(el("option",{value:curName, selected:true}, curName+" (not in inventory)"));
    sel.value = curName;
    sel.addEventListener("change",()=>{
      t.equipment[slot] = sel.value ? { name: sel.value } : null;
      save(); preserveScroll(()=>renderTrainer());
    });
    cell.append(sel);
    if(curName){
      const eff = equipEffFor(curName);
      const cat = itemByName.get(curName.toLowerCase());
      if(eff && eff.focus){
        const fs = el("select",{class:"equip-focus"});
        fs.append(el("option",{value:""},"choose stat…"));
        [["atk","Attack"],["def","Defense"],["spatk","Sp.Atk"],["spdef","Sp.Def"],["spd","Speed"]].forEach(([k,l])=>
          fs.append(el("option",{value:k, selected:(cur&&cur.focusStat)===k}, l)));
        fs.addEventListener("change",()=>{
          t.equipment[slot] = { name:curName, focusStat: fs.value||undefined };
          save(); preserveScroll(()=>renderTrainer());
        });
        cell.append(el("div",{class:"small",style:"margin-top:4px;display:flex;align-items:center;gap:6px"},
          el("span",{class:"badge-auto"},"+5 to"), fs,
          (cur&&cur.focusStat)?el("span",{class:"muted"},"(after Combat Stages)"):el("span",{class:"muted"},"— pick a stat")));
      }
      const badges = equipEffBadges(eff);
      if(badges.length) cell.append(el("div",{style:"margin-top:4px;display:flex;gap:4px;flex-wrap:wrap"}, ...badges));
      const text = (eff && eff.note) || (cat && cat.effect);
      if(text) cell.append(el("div",{class:"muted small",style:"margin-top:3px"}, cleanupText(text).slice(0,240)));
    }
    row.append(cell);
    card.append(row);
  });
  const summary = equipSummary(t);
  if(summary) card.append(el("div",{class:"small",style:"margin-top:10px;padding-top:8px;border-top:1px solid var(--line)"}, summary));
  if(!anyEquippable) card.append(el("div",{class:"muted small",style:"margin-top:8px"},
    "You own no wearable gear yet — add armor, clothing, shields, Fashions… to your Inventory (the Inventory & Bio tab) to equip it here."));
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
  // favourites float to the top (stable otherwise, by original order)
  const items = t.inventory.map((it,i)=>({it,i})).sort((a,b)=>(b.it.fav?1:0)-(a.it.fav?1:0));
  items.forEach(({it,i}) => {
    const row = el("div",{class:"moveslot"});
    const fav = el("button",{class:"actstar"+(it.fav?" on":""),title:it.fav?"unfavourite":"favourite",
      onclick:()=>{ it.fav=!it.fav; save(); renderTrainer(); }}, it.fav?"★":"☆");
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
    row.append(fav, info, qty, del);
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
   LEGENDARY GIFTS (The Blessed and the Damned)
   GM-granted blessings from a Legendary patron. Each Gift is tied to a
   Patron, and taking it grants that Patron's Stat bonus (the [PATRON STAT]
   tag, book p.57): a single stat, a choice of two ("or"), or Any stat.
   The Gifts tab is GM-add-only and hidden from a player until they have one.
=================================================================== */
/* Patron Stat Tags — book p.57. value: a STATS key, ["a","b"] for an "or" choice,
   or "any" (player picks any stat). Each Gift grants +1 to the resolved stat. */
const PATRON_STATS = {
  "Mew":"any","Mewtwo":"spatk","Heatran":"spatk","Articuno":"spdef","Zapdos":"spatk",
  "Moltres":"spatk","Raikou":"spd","Entei":"hp","Suicune":["def","spdef"],
  "Regirock":"def","Regice":"spdef","Registeel":["def","spdef"],"Regigigas":"atk",
  "Cobalion":"def","Terrakion":"atk","Virizion":"spdef","Keldeo":"spatk",
  "Uxie":["def","spdef"],"Mesprit":["def","spdef"],"Azelf":["atk","spatk"],
  "Tornadus":"spatk","Thundurus":"spatk","Landorus":"atk",
  "Lugia":"spdef","Ho-Oh":"spdef","Latias":"spdef","Latios":"spatk",
  "Manaphy":"any","Celebi":"any","Jirachi":"any","Victini":"any","Shaymin":"any",
  "Meloetta":["atk","spatk"],"Darkrai":"spatk","Cresselia":"spdef",
  "Kyogre":"spatk","Groudon":"atk","Rayquaza":["atk","spatk"],
  "Reshiram":"spatk","Zekrom":"atk","Kyurem":"hp","Dialga":"spatk","Palkia":"spatk",
  "Giratina":"hp","Xerneas":["atk","spatk"],"Yveltal":["atk","spatk"],
  "Zygarde":"hp","Diancie":["def","spdef"],
  "Vulpoxen":"spatk",   // homebrew: the created Fire/Ghost legendary bonded to Lázaro
  "Chien-Pao":["atk","spd"],   // homebrew Pantheon entry: The Blessed and the Damned
};
const PATRON_NAMES = Object.keys(PATRON_STATS);
/* Legendary Gifts catalog (book pp.58-71), grouped. Each group lists its member Patrons (for the
   stat) and its Gifts as [tier, name, prerequisites, effect]. Tier ∈ Minor(Edge)/Major(Feature)/Pact. */
const GIFT_GROUPS = [
  { group:"Legendary Birds & Beasts", patrons:["Articuno","Zapdos","Moltres","Raikou","Entei","Suicune"], gifts:[
    ["Minor","Elemental Soul","GM Permission","Sense Pokémon of a given Type within 10m, based on your patron (Articuno→Ice, Moltres/Entei→Fire, Zapdos/Raikou→Electric, Suicune→Water)."],
    ["Major","Elemental Manipulation","Minor Gift - Elemental Soul","Gain a Capability by patron (Articuno→Freezer, Moltres/Entei→Firestarter, Zapdos/Raikou→Zapper, Suicune→Fountain)."],
    ["Major","Winter's Kiss (Articuno)","Minor Gift - Elemental Soul","You gain the Winter's Kiss Ability."],
    ["Major","Sun Blanket (Moltres)","Minor Gift - Elemental Soul","You gain the Sun Blanket Ability."],
    ["Major","Lightningrod (Zapdos)","Minor Gift - Elemental Soul","You gain the Lightningrod Ability."],
    ["Major","Flash Fire (Entei)","Minor Gift - Elemental Soul","You gain the Flash Fire Ability."],
    ["Major","Volt Absorb (Raikou)","Minor Gift - Elemental Soul","You gain the Volt Absorb Ability."],
    ["Major","Water Absorb (Suicune)","Minor Gift - Elemental Soul","You gain the Water Absorb Ability."],
  ]},
  { group:"Celebi", patrons:["Celebi"], gifts:[
    ["Minor","Catastrophe Sense","GM Permission","Intuitive sense of when natural disasters/catastrophes are likely to occur near you."],
    ["Major","Probability Control","Minor Gift - Catastrophe Sense","You gain the Probability Control Ability."],
    ["Major","Sprouter","Minor Gift - Catastrophe Sense","You gain the Sprouter Capability."],
  ]},
  { group:"The Golems (Regis)", patrons:["Regirock","Regice","Registeel","Regigigas"], gifts:[
    ["Minor","Stoic Stature","GM Permission","Subtract half your Athletics or Focus Rank from meters Push effects move you."],
    ["Major","Mark of Loyalty","Minor Gift - Stoic Stature","1 AP Free Action, target your Pokémon: treat it as one Loyalty higher for the rest of the turn."],
    ["Major","Clear Body","Major Gift - Mark of Loyalty","You gain the Clear Body Ability."],
  ]},
  { group:"Jirachi", patrons:["Jirachi"], gifts:[
    ["Minor","Watchful Sleep","GM Permission","Make Perception Checks to detect imminent dangers while sleeping."],
    ["Major","Eye of Truth","Minor Gift - Watchful Sleep","1 AP Standard Action: determine whether a professed desire is sought for altruistic reasons."],
    ["Major","Doom Desire","Major Gift - Eye of Truth","You learn the Move Doom Desire."],
  ]},
  { group:"Eon Duo (Latias/Latios)", patrons:["Latias","Latios"], gifts:[
    ["Minor","Loyal Heart","GM Permission","You are immune to Infatuation."],
    ["Major","Sight Sharing","Minor Gift - Loyal Heart, *Special","Taken alongside a partner (one via Latias, one via Latios) — you become Link Partners, share senses, and never hit each other with AoE unless you want to."],
    ["Major","Mist Ball (Latias)","Major Gift - Sight Sharing","You learn the Move Mist Ball."],
    ["Major","Luster Purge (Latios)","Major Gift - Sight Sharing","You learn the Move Luster Purge."],
  ]},
  { group:"Lake Guardians", patrons:["Azelf","Uxie","Mesprit"], gifts:[
    ["Minor","Force of Will (Azelf)","GM Permission","Reroll all 1s on Focus and Command Checks."],
    ["Major","Drain Will (Azelf)","Minor Gift - Force of Will","3 AP Standard Action: contested Focus Check; on a win the target can't take Shift/Standard Actions for 1d2 turns; either way −3 to all their rolls for the encounter."],
    ["Minor","Fount of Knowledge (Uxie)","GM Permission","Choose two Education Skills; reroll all 1s on those Checks."],
    ["Major","Shatter Memory (Uxie)","Minor Gift - Fount of Knowledge","3 AP Standard Action: disable one random Ability or two random Moves for the encounter; DC 10 Focus to recall complex memories for 15 min."],
    ["Minor","Emotion's Heart (Mesprit)","GM Permission","Reroll all 1s on Charm and Intuition Checks."],
    ["Major","Negate Emotion (Mesprit)","Minor Gift - Emotion's Heart","3 AP Standard Action: target becomes immune to Enraged/Confused/Infatuation for the encounter, but treats Intimidate/Charm/Intuition/Guile as Pathetic for 15 min."],
  ]},
  { group:"Sea Guardians (Manaphy)", patrons:["Manaphy"], gifts:[
    ["Minor","Sailors' Guardian","GM Permission","Wild Pokémon up to twice your Trainer Level won't attack a water-borne vessel you travel on."],
    ["Major","Hydration","Minor Gift - Sailors' Guardian","You gain the Hydration Ability."],
    ["Major","Heart Swap (Manaphy)","Minor Gift - Sailors' Guardian","You learn the Move Heart Swap."],
  ]},
  { group:"Shaymin", patrons:["Shaymin"], gifts:[
    ["Minor","Plant Intuition","GM Permission","Reroll all 1s on plant-related Survival Checks; auto-identify berries and apricorns on sight."],
    ["Major","Pure Breathing","Minor Gift - Plant Intuition","Immune to Rage Powder, Poison Gas, Poisonpowder, Sleep Powder, Smog, Smokescreen, Spore, Stun Spore, Sweet Scent."],
    ["Major","Sprouter","Minor Gift - Plant Intuition","You gain the Sprouter Capability."],
    ["Major","Seed Flare","Major Gift - Pure Breathing, Major Gift - Sprouter","You learn the Move Seed Flare."],
  ]},
  { group:"Swords of Justice", patrons:["Cobalion","Terrakion","Virizion","Keldeo"], gifts:[
    ["Minor","Spirit of Justice","GM Permission","Add your Spirit Modifier instead of Body for Combat Checks; +2 to Disarming or resisting Disarming."],
    ["Major","Sacred Sword","Minor Gift - Spirit of Justice","You learn the Move Sacred Sword."],
    ["Major","Courage","Minor Gift - Spirit of Justice","You gain the Courage Ability."],
  ]},
  { group:"Kami Trio", patrons:["Tornadus","Thundurus","Landorus"], gifts:[
    ["Minor","Cloud Reading","GM Permission","+3 to Survival Checks to discern upcoming weather from clouds."],
    ["Major","Levitate","Minor Gift - Cloud Reading","You gain the Levitate Ability."],
    ["Major","Therian Form","Minor Gift - Cloud Reading","Daily Free Action: keep an extra stat block (redistribute level-up / [+Any Stat] points) and swap to it for the rest of an encounter."],
  ]},
  { group:"Meloetta", patrons:["Meloetta"], gifts:[
    ["Minor","Dazzling the Stage","GM Permission","Using song/dance for Intimidate, Guile or Charm, add half your highest Rank among them to the Check."],
    ["Major","Soundproof","Minor Gift - Dazzling the Stage","You gain the Soundproof Ability."],
    ["Major","Relic Song","Major Gift - Soundproof","You learn the Move Relic Song."],
  ]},
  { group:"Diancie", patrons:["Diancie"], gifts:[
    ["Minor","Royal Privilege","GM Permission","Wear Shards as a Trainer Accessory; +2 to the Skill linked to the shard's colour (Red→Intimidate, Orange→Command, Yellow→Charm, Green→Intuition, Blue→Guile, Violet→Focus)."],
    ["Major","Magic Bounce","Minor Gift - Royal Privilege","You gain the Magic Bounce Ability."],
    ["Major","Diamond Storm","Major Gift - Magic Bounce","You learn the Move Diamond Storm."],
  ]},
  { group:"Mew", patrons:["Mew"], gifts:[
    ["Minor","Motherly Compassion","GM Permission","+3 to Intuition/Charm checks to discern emotions and comfort someone."],
    ["Major","Barrier","Minor Gift - Motherly Compassion","You learn the Move Barrier."],
    ["Major","Gentle Vibe","Minor Gift - Motherly Compassion","You gain the Gentle Vibe Ability."],
    ["Major","Mirage","Minor Gift - Motherly Compassion","Daily/25 Standard Action: create a 2m illusion (visual + auditory); DC 15 Perception to see through; sustain 10 min."],
    ["Pact","Origin Tutor","All Mew Major Gifts","Once/10 Extended Action: your Pokémon with ≥3 Tutor Points loses 3 to learn any single Move via TM/Tutoring (still paying Tutor costs). Once per Pokémon."],
  ]},
  { group:"Tower Duo (Lugia/Ho-Oh)", patrons:["Lugia","Ho-Oh"], gifts:[
    ["Minor","Tower's Rejuvenation","GM Permission","Resting recovers 1/10 max HP per half hour instead of 1/16."],
    ["Major","Tower's Blessing","Minor Gift - Tower's Rejuvenation","1 AP Free Action when you/your Pokémon use a Move with the Blessing keyword: it generates one extra use of the Blessing."],
    ["Major","Life Force","Two Major Gifts from the Tower Duo","You gain the Life Force Ability."],
    ["Major","Ashes of the Phoenix (Ho-Oh)","Minor Gift - Tower's Rejuvenation","Daily Standard Action: treat an adjacent target as if Revived (regains 25% max HP)."],
    ["Pact","Sacred Fire (Ho-Oh)","All Ho-Oh & shared Tower Duo Major Gifts","You learn the Move Sacred Fire."],
    ["Major","Storm of the Century (Lugia)","Minor Gift - Tower's Rejuvenation","Daily Standard Action: for 3 turns push all foes within 5m 1m away and they lose 1/10 max HP."],
    ["Pact","Aeroblast (Lugia)","All Lugia & shared Tower Duo Major Gifts","You learn the Move Aeroblast."],
  ]},
  { group:"Weather Trio", patrons:["Groudon","Kyogre","Rayquaza"], gifts:[
    ["Minor","Landmaster (Groudon)","GM Permission","Treat rocky/sandy Rough Terrain (or Groundshaper terrain) as Regular Terrain."],
    ["Major","Drought (Groudon)","Minor Gift - Landmaster","You gain the Drought Ability."],
    ["Major","Earthshaker (Groudon)","Minor Gift - Landmaster","You gain the Groundshaper Capability."],
    ["Major","Magma Spirit (Groudon)","Minor Gift - Landmaster","Daily Standard Action: for 3 rounds foes within 6m lose the benefits of Sunny Day."],
    ["Pact","Eruption (Groudon)","All Groudon Major Gifts","You learn the Move Eruption."],
    ["Minor","Seamaster (Kyogre)","GM Permission","Treat deep water you aren't fully submerged in as Regular Terrain."],
    ["Major","Drizzle (Kyogre)","Minor Gift - Seamaster","You gain the Drizzle Ability."],
    ["Major","Wavecrasher (Kyogre)","Minor Gift - Seamaster","You gain the Fountain Capability."],
    ["Major","Aqua Spirit (Kyogre)","Minor Gift - Seamaster","Daily Standard Action: for 3 rounds foes within 6m lose the benefits of Rain Dance."],
    ["Pact","Water Spout (Kyogre)","All Kyogre Major Gifts","You learn the Move Water Spout."],
    ["Minor","Clear Skies (Rayquaza)","GM Permission","You learn the Move Defog."],
    ["Major","Air Lock (Rayquaza)","Minor Gift - Clear Skies","You gain the Air Lock Ability."],
    ["Major","Air Adept (Rayquaza)","Minor Gift - Clear Skies","You gain the Guster Capability."],
    ["Major","Sky Spirit (Rayquaza)","Minor Gift - Clear Skies","Daily Standard Action (needs Clear weather): for 5 rounds halve foes' Sky/Levitate within 10m; allies within 10m +10 Initiative."],
    ["Pact","Hyper Beam (Rayquaza)","All Rayquaza Major Gifts","You learn the Move Hyper Beam."],
  ]},
  { group:"Creation Trio", patrons:["Dialga","Palkia","Giratina"], gifts:[
    ["Major","Realm Portal","One Creation Trio Major Gift","Daily Extended Action: open a 2-minute portal to any location you've visited within 20 miles."],
    ["Minor","Perfect Timing (Dialga)","GM Permission","You always intuitively know the time and can act as a human stopwatch."],
    ["Major","Probability Control (Dialga)","Minor Gift - Perfect Timing","You gain the Probability Control Ability."],
    ["Major","Time Stop (Dialga)","Major Gift - Realm Portal","Daily Swift Action, Interrupt: take an extra Shift and Standard Action."],
    ["Pact","Roar of Time (Dialga)","All Dialga & shared Creation Trio Major Gifts","You learn the Move Roar of Time."],
    ["Minor","Spatial Awareness (Palkia)","GM Permission","Know sizes/distances by sight to the nearest cm up to 10m."],
    ["Major","Nomad (Palkia)","Minor Gift - Spatial Awareness","You gain the Transporter Ability (grants the Move Teleport)."],
    ["Major","Space Distortion (Palkia)","Major Gift - Realm Portal","Daily Standard Action: swap the positions of up to three Pokémon/Trainers within 10m."],
    ["Pact","Spacial Rend (Palkia)","All Palkia & shared Creation Trio Major Gifts","You learn the Move Spacial Rend."],
    ["Minor","Death Sense (Giratina)","GM Permission","At a corpse, know how many hours ago it died (up to a week)."],
    ["Major","Pressure (Giratina)","Minor Gift - Death Sense","You gain the Pressure Ability."],
    ["Major","Banish (Giratina)","Major Gift - Realm Portal","Daily Standard Action: remove a target within 8m from the encounter for 1d2+1 rounds."],
    ["Pact","Shadow Force (Giratina)","All Giratina & shared Creation Trio Major Gifts","You learn the Move Shadow Force."],
  ]},
  { group:"Lunar Duo (Cresselia/Darkrai)", patrons:["Cresselia","Darkrai"], gifts:[
    ["Minor","Dream Mastery","GM Permission","Immune to Hypnosis, Nightmare, and Dream Eater."],
    ["Major","Oneiromancy","Minor Gift - Dream Mastery","You gain the Dream Reader Capability."],
    ["Major","Dream Augury","Minor Gift - Dream Mastery","2 AP Extended Action: sleep and dream of things to come (favorable via Cresselia, dangerous via Darkrai)."],
    ["Major","Dreamspinner (Cresselia)","Major Gift - Oneiromancy, Major Gift - Dream Augury","You gain the Dreamspinner Ability."],
    ["Pact","Lunar Dance (Cresselia)","Major Gift - Dreamspinner","You learn the Move Lunar Dance."],
    ["Major","Bad Dreams (Darkrai)","Major Gift - Oneiromancy, Major Gift - Dream Augury","You gain the Bad Dreams Ability."],
    ["Pact","Dark Void (Darkrai)","Major Gift - Bad Dreams","You learn the Move Dark Void."],
  ]},
  { group:"Heatran", patrons:["Heatran"], gifts:[
    ["Minor","Vulcan's Intuition","GM Permission","+3 to Perception and Survival Checks in mountainous/volcanic areas."],
    ["Major","Tremorsense","Minor Gift - Vulcan's Intuition","You gain the Tremorsense Capability."],
    ["Major","Lava-blooded","Minor Gift - Vulcan's Intuition","Immune to ambient volcanic heat; resist Fire by one step. Scene Interrupt when hit by a Fire Move: take no effect and burst 1m (targets lose 1/16 max HP)."],
    ["Major","Magma Armor","Minor Gift - Vulcan's Intuition","You gain the Magma Armor Ability."],
    ["Pact","Magma Storm","All Heatran Major Gifts","You learn the Move Magma Storm."],
  ]},
  { group:"Regigigas", patrons:["Regigigas"], gifts:[
    ["Minor","Hands of the Creator","GM Permission","+3 to Occult/Petrology Knowledge rolls to identify crafting materials or a crafted object's purpose."],
    ["Major","March of the Colossus","Minor Gift - Hands of the Creator","2 AP Standard Action: for 3 rounds halve a target's Attack & Speed, then at the end raise each by two Combat Stages."],
    ["Major","Primal Craftsmanship","Minor Gift - Hands of the Creator","You pay 20% less when crafting items."],
    ["Major","Animate","Major Gift - Primal Craftsmanship","Daily Extended Action: create a small golem (Type by material) with Stat Points equal to your Trainer Level."],
    ["Pact","Crush Grip","All Regigigas Major Gifts","You learn the Move Crush Grip."],
  ]},
  { group:"Victini", patrons:["Victini"], gifts:[
    ["Minor","Chosen of Victory","GM Permission","Spending AP to raise an Accuracy Check gives +3 instead of +1."],
    ["Major","Searing Blade","Minor Gift - Chosen of Victory","2 AP Free Action: your next weapon Struggle Attack deals +2 Damage Steps and Fire-Type damage."],
    ["Major","Blaze Armor","Minor Gift - Chosen of Victory","2 AP Free Action, Interrupt: take the next hit as if Fire-Type; a melee attacker loses 1/8 max HP as a Fire effect."],
    ["Major","Victory Star","Minor Gift - Chosen of Victory","You gain the Victory Star Ability."],
    ["Pact","V-Create","All Victini Major Gifts","You learn the Move V-Create."],
  ]},
  { group:"Tao Trio", patrons:["Reshiram","Zekrom","Kyurem"], gifts:[
    ["Major","Invert Balance","One Tao Trio Major Gift","Daily Standard Action: the area becomes Inverted for 5 rounds (weaknesses and resistances swap)."],
    ["Minor","Hero of Truth (Reshiram)","GM Permission","+3 on Intuition Checks to discern when someone is lying."],
    ["Major","White Yang (Reshiram)","Minor Gift - Hero of Truth","Daily Standard Action: allies within 5m may +2 all speeds, +1 Atk/SpAtk CS, −2 Accuracy for 3 rounds."],
    ["Major","Turboblaze (Reshiram)","Major Gift - White Yang","You gain the Turboblaze Ability."],
    ["Pact","Blue Flare (Reshiram)","All Reshiram & shared Tao Trio Major Gifts","You learn the Move Blue Flare."],
    ["Minor","Hero of Ideals (Zekrom)","GM Permission","+3 on Intuition Checks to discern someone's beliefs and ideals."],
    ["Major","Black Yin (Zekrom)","Minor Gift - Hero of Ideals","Daily Standard Action: allies within 5m may −1 speeds and +2 evasion for 3 rounds."],
    ["Major","Teravolt (Zekrom)","Major Gift - Black Yin","You gain the Teravolt Ability."],
    ["Pact","Bolt Strike (Zekrom)","All Zekrom & shared Tao Trio Major Gifts","You learn the Move Bolt Strike."],
    ["Minor","Hero of Balance (Kyurem)","GM Permission","Others take −3 to Intuition Checks to detect your lies or discern your beliefs."],
    ["Major","The Empty Tao (Kyurem)","Minor Gift - Hero of Balance","Daily Standard Action: for 3 rounds all within 5m have Combat Stages locked to zero."],
    ["Major","Winter's Kiss (Kyurem)","Major Gift - The Empty Tao","You gain the Winter's Kiss Ability."],
    ["Pact","Glaciate (Kyurem)","All Kyurem & shared Tao Trio Major Gifts","You learn the Move Glaciate."],
    ["Pact","Freeze Shock (Kyurem)","All Kyurem & shared Tao Trio Major Gifts, Minor Gift - Hero of Ideals","You learn the Move Freeze Shock."],
    ["Pact","Ice Burn (Kyurem)","All Kyurem & shared Tao Trio Major Gifts, Minor Gift - Hero of Truth","You learn the Move Ice Burn."],
  ]},
  { group:"Mortality Duo (Xerneas/Yveltal)", patrons:["Xerneas","Yveltal"], gifts:[
    ["Major","Shared Mortality","One Mortality Duo Major Gift","Daily x3 Standard Action: pool your remaining HP with an allied target's and split it as you wish."],
    ["Minor","Rejuvenating Aura (Xerneas)","GM Permission","On an Extended Rest, you and nearby Trainers/Pokémon are treated as if you spent the night at a Poké Center."],
    ["Major","Bounty of Life (Xerneas)","Minor Gift - Rejuvenating Aura","Daily Standard Action: a target is cured of all Injuries and Status Effects."],
    ["Major","Fairy Aura (Xerneas)","Major Gift - Bounty of Life","You gain the Fairy Aura Ability."],
    ["Pact","Geomancy (Xerneas)","All Xerneas Major Gifts & shared Mortality Duo Gifts","You learn the Move Geomancy."],
    ["Minor","Death Dealer (Yveltal)","GM Permission","Injuries you inflict heal only at a Poké Center, and only one per day."],
    ["Major","Touch of the Flayed One (Yveltal)","Minor Gift - Death Dealer","Daily x3 Free Action when you inflict Injuries: inflict one additional Injury."],
    ["Major","Dark Aura (Yveltal)","Major Gift - Touch of the Flayed One","You gain the Dark Aura Ability."],
    ["Pact","Oblivion Wing (Yveltal)","All Yveltal Major Gifts & shared Mortality Duo Gifts","You learn the Move Oblivion Wing."],
  ]},
  { group:"Zygarde", patrons:["Zygarde"], gifts:[
    ["Minor","World Serpent's Embrace","GM Permission","Scene Extended Action: sense whether Legendary Pokémon are in the vicinity and roughly where."],
    ["Major","He Who Cannot Be Shackled","Minor Gift - World Serpent's Embrace","Daily x3 Free Action when Trapped/Slowed/Tripped/Grappled: evade that Status/Maneuver."],
    ["Major","God Crusher","Minor Gift - World Serpent's Embrace","You gain the Godslayer Feature (or another Feature if you already have it); Godslayer's AC becomes 8 and no feedback."],
    ["Major","Aura Break","Minor Gift - World Serpent's Embrace","You gain the Aura Break Ability."],
    ["Pact","Land's Wrath","All Zygarde Major Gifts","You learn the Move Land's Wrath."],
  ]},
  { group:"Outsider — Mewtwo Symbiant", patrons:["Mewtwo"], gifts:[
    ["Minor","Twin Souls","GM Permission","Telepathically communicate with your bound Mewtwo at any distance; gain the Soulbound Edge."],
    ["Major","Expanded Horizons","Minor Gift - Twin Souls","Gain the Telepath or Telekinetic Capability (or the Godslayer Feature if you have both)."],
    ["Major","Mental Suggestion","Major Gift - Expanded Horizons","Daily Extended Action (with your Mewtwo nearby): Focus check as Telepath to instill a thought/action into a target's mind."],
    ["Pact","Psystrike","Twin Souls, Expanded Horizons, Mental Suggestion","You learn the Move Psystrike."],
  ]},
  { group:"Vulpoxen (Symbiant)", patrons:["Vulpoxen"], gifts:[
    ["Minor","Grafted Soul","GM Permission","+3 bonus to Occult Education and Medicine Education Checks concerning souls, spirits, death, and the line between the living and the dead. You can sense whether a creature within 10m has died within the last hour. (Bond deepens at Vulpoxen Lv 5.)"],
    ["Major","Ashen Séance","Minor Gift - Grafted Soul","Daily Extended Action, targeting the remains, ashes, or a treasured possession of a creature that has died: you and Vulpoxen kindle a cold flame and commune with the departed spirit, asking questions it answers truthfully to the best of what it knew in life. A spirit gone longer than a year is faint and manages only one answer. (Vulpoxen Lv 20.)"],
    ["Major","Emberwake","Minor Gift - Grafted Soul","You gain the Pyre of Grief Ability (heal a Tick of HP + a stacking-capped +5 to your next Damage Roll whenever anything faints within 5m). (Vulpoxen Lv 30 — Nightmare Aura wakes.)"],
    ["Major","Coma Light","Major Gift - Emberwake","Scene x2, Standard Action, AC 6, Range 4m 1 Target: the target falls Asleep and immediately gains Bad Sleep. (Vulpoxen Lv 50 — Death Aura opens.)"],
    ["Pact","Rekindling","All Vulpoxen Major Gifts","You learn the Move Rekindling — a Fire attack that, on a killing blow, revives a fainted ally as a Ghost-Type revenant. (Vulpoxen Lv 75 — full god.)"],
  ]},
  { group:"Chien-Pao", patrons:["Chien-Pao"], gifts:[
    ["Minor","Sense of Ruin","GM Permission","By observing a Pokémon, Trainer, structure, or object, you intuitively know its frailest points, and you can always tell when a living thing bears you or your allies genuine hostility. +3 to any Check made to break, damage, or exploit a weakness in a creature's defenses."],
    ["Major","Reviled","Minor Gift - Sense of Ruin","Whenever a foe hits you with a Move, you gain +1 Attack Combat Stage (once per round, lasting until end of Scene). You are also immune to Infatuation."],
    ["Major","Spiteful Frost","Minor Gift - Sense of Ruin","You are immune to the ambient cold of frozen and high-altitude regions, never slip on or sink into snow and ice, and gain the Freezer and Naturewalk (Tundra) Capabilities."],
    ["Major","Blade of Hate","Major Gift - Reviled","Scene x2 - Trigger: You make a Struggle Attack with an equipped weapon. Effect: That Struggle Attack deals Dark Type damage and gains +3 to its Damage Base."],
    ["Major","Sword of Ruin","Major Gift - Blade of Hate","You gain the Sword of Ruin Ability."],
    ["Pact","Ruination","All Chien-Pao Major Gifts","You learn the Move Ruination."],
  ]},
];
/* every gift as a flat list with its group, for pickers/lookups */
const GIFT_CATALOG = GIFT_GROUPS.flatMap(g => g.gifts.map(([tier,name,prereq,effect]) =>
  ({ group:g.group, patrons:g.patrons, tier, name, prereq, effect })));
function giftByName(name){ return GIFT_CATALOG.find(x=>x.name===name) || null; }
/* the specific Patron a catalog Gift is known to come from, for auto-filling the Add-Gift picker:
   most multi-patron-group Gifts name their patron right in the title, e.g. "Water Absorb (Suicune)"
   — pull that out and confirm it's actually one of the group's patrons. Failing that, a single-patron
   group is unambiguous. Gifts that are genuinely shared across a whole group (Realm Portal, Elemental
   Soul, Invert Balance…) have no parenthetical and stay unresolved — the GM picks. */
function giftPatronFor(g){
  if(!g) return "";
  const m = /\(([^)]+)\)\s*$/.exec(g.name);
  if(m && g.patrons.includes(m[1])) return m[1];
  return g.patrons.length===1 ? g.patrons[0] : "";
}
/* the Patron stat a gift grants (a STATS key), resolving "or"/"any" via the stored choice; null if none/unchosen */
function giftGrantsStat(g){
  const spec = PATRON_STATS[g && g.patron]; if(spec==null) return null;
  if(typeof spec==="string" && spec!=="any") return spec;   // fixed single stat
  return (g.statChoice && (spec==="any" || spec.includes?.(g.statChoice))) ? g.statChoice : null;  // or/any → chosen
}
/* +1 per gift to its resolved Patron stat (book p.57 [PATRON STAT] tag) */
function giftStatBonus(t){
  const out={hp:0,atk:0,def:0,spatk:0,spdef:0,spd:0};
  (t && t.gifts || []).forEach(g=>{ const k=giftGrantsStat(g); if(k && out[k]!==undefined) out[k]+=1; });
  return out;
}
/* human label for a gift's patron-stat grant, incl. an unresolved-choice prompt */
function giftStatText(g){
  const spec = PATRON_STATS[g && g.patron]; if(spec==null) return "";
  const lbl = k => (STATS.find(s=>s[0]===k)||[])[1]||k;
  if(typeof spec==="string" && spec!=="any") return `+1 ${lbl(spec)}`;
  if(g.statChoice) return `+1 ${lbl(g.statChoice)}`;
  return spec==="any" ? "+1 Any Stat (choose)" : `+1 ${spec.map(lbl).join(" or ")} (choose)`;
}
function giftsCanSee(t){ return isGM() || ((t && t.gifts || []).length > 0); }
function giftsCard(t){
  const gm = isGM();
  const card = el("div",{class:"card"}, el("h3",{},"Legendary Gifts",
    el("div",{class:"inline"}, gm
      ? el("button",{class:"linkbtn h-act", onclick:()=>openAddGift(t)}, "+ grant a Gift")
      : el("span",{class:"muted small"},"granted by your GM"))));
  card.append(el("div",{class:"muted small",style:"margin:-4px 0 8px"},
    "Blessings from a Legendary patron (The Blessed and the Damned). Each grants its Patron Stat (p.57)."));
  if(!(t.gifts||[]).length){
    card.append(el("div",{class:"muted small"}, gm
      ? "No Gifts yet — tap “+ grant a Gift” to bless this Trainer."
      : "You have no Gifts yet."));
    return card;
  }
  t.gifts.forEach((g,i)=>{
    const row = el("div",{class:"moveslot"});
    const info = el("div",{style:"flex:1;min-width:0"});
    const title = el("div",{style:"font-weight:700"}, g.name || "Gift",
      el("span",{class:"muted small",style:"font-weight:400"}, `  ·  ${g.tier||"Gift"} · ${g.patron||"?"}`));
    info.append(title);
    // Patron-stat badge + (for or/any) an inline chooser
    const spec = PATRON_STATS[g.patron];
    const statLine = el("div",{style:"margin-top:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap"});
    const resolved = giftGrantsStat(g);
    statLine.append(el("span",{class:"badge-auto"+(resolved?"":" "),style:resolved?"":"opacity:.7"}, giftStatText(g)));
    const needChoice = spec==="any" || Array.isArray(spec);
    if(needChoice){
      const opts = spec==="any" ? STATS.map(s=>s[0]) : spec;
      const sel = el("select",{class:"equip-focus"});
      sel.append(el("option",{value:""},"choose stat…"));
      opts.forEach(k=>sel.append(el("option",{value:k, selected:g.statChoice===k}, (STATS.find(s=>s[0]===k)||[])[1]||k)));
      sel.disabled = !gm && !canEditActive();   // only the GM / owner sets it
      sel.addEventListener("change",()=>{ g.statChoice = sel.value||undefined; save(); renderTrainer(); });
      statLine.append(sel);
    }
    info.append(statLine);
    if(g.effect) info.append(el("div",{class:"muted small",style:"margin-top:3px"}, g.effect));
    if(g.prereq) info.append(el("div",{class:"muted small",style:"margin-top:1px;font-style:italic"}, "Prerequisites: "+g.prereq));
    if(g.notes) info.append(el("div",{class:"small",style:"margin-top:2px"}, g.notes));
    row.append(info);
    if(gm) row.append(el("button",{class:"linkbtn danger",title:"remove this Gift",style:"align-self:flex-start",
      onclick:()=>{ if(confirm(`Remove the Gift “${g.name}”?`)){ t.gifts.splice(i,1); save(); renderTrainer(); } }}, "×"));
    card.append(row);
  });
  // summary of the stat bonuses these Gifts grant
  const gb = giftStatBonus(t); const parts = STATS.filter(([k])=>gb[k]).map(([k,l])=>`+${gb[k]} ${l}`);
  if(parts.length) card.append(el("div",{class:"small",style:"margin-top:10px;padding-top:8px;border-top:1px solid var(--line)"},
    el("b",{},"Patron Stats applied: "), parts.join(" · "), el("span",{class:"muted"}," (added to your Combat totals)")));
  return card;
}
function openAddGift(t){
  if(!isGM()){ toast("Only the GM can grant Gifts"); return; }
  const wrap = el("div",{});
  // Gift picker (grouped) + Custom
  const giftSel = el("select",{style:"width:100%"});
  giftSel.append(el("option",{value:""},"— Custom / free-form Gift —"));
  GIFT_GROUPS.forEach(grp=>{
    const og = el("optgroup",{label:grp.group});
    grp.gifts.forEach(([tier,name])=> og.append(el("option",{value:name}, `${tier} — ${name}`)));
    giftSel.append(og);
  });
  const patronSel = el("select",{style:"width:100%"});
  const fillPatrons = (preferred)=>{
    patronSel.innerHTML="";
    patronSel.append(el("option",{value:""},"— no Patron / no stat —"));
    PATRON_NAMES.forEach(p=>patronSel.append(el("option",{value:p, selected:p===preferred}, `${p}  (${giftStatText({patron:p})})`)));
  };
  fillPatrons("");
  const nameIn = el("input",{type:"text",placeholder:"Gift name",style:"width:100%"});
  const effIn  = el("textarea",{placeholder:"Effect / notes",style:"width:100%;min-height:60px"});
  const statChoiceWrap = el("div",{style:"margin-top:8px"});
  const syncStatChoice = ()=>{
    statChoiceWrap.innerHTML="";
    const spec = PATRON_STATS[patronSel.value];
    if(spec==="any" || Array.isArray(spec)){
      const opts = spec==="any" ? STATS.map(s=>s[0]) : spec;
      const sc = el("select",{id:"giftStatChoice",style:"max-width:180px"});
      sc.append(el("option",{value:""},"choose stat…"));
      opts.forEach(k=>sc.append(el("option",{value:k}, (STATS.find(s=>s[0]===k)||[])[1]||k)));
      statChoiceWrap.append(el("label",{class:"field"}, el("span",{},`Patron Stat — this Patron grants ${giftStatText({patron:patronSel.value})}`), sc));
    } else if(spec){
      statChoiceWrap.append(el("div",{class:"small muted"},`Grants ${giftStatText({patron:patronSel.value})}.`));
    }
  };
  // when a catalog Gift is picked, prefill name/effect/prereq + default the Patron to its group's
  giftSel.addEventListener("change",()=>{
    const g = giftByName(giftSel.value);
    if(g){ nameIn.value=g.name; effIn.value=g.effect + (g.prereq?`\n\nPrerequisites: ${g.prereq}`:""); fillPatrons(giftPatronFor(g)); }
    syncStatChoice();
  });
  patronSel.addEventListener("change", syncStatChoice);
  wrap.append(
    el("label",{class:"field"}, el("span",{},"Gift (from The Blessed and the Damned)"), giftSel), el("div",{style:"height:8px"}),
    el("label",{class:"field"}, el("span",{},"Name"), nameIn), el("div",{style:"height:8px"}),
    el("label",{class:"field"}, el("span",{},"Patron (grants the p.57 Stat)"), patronSel),
    statChoiceWrap, el("div",{style:"height:8px"}),
    el("label",{class:"field"}, el("span",{},"Effect"), effIn),
  );
  syncStatChoice();
  modal({title:"Grant a Legendary Gift", bodyNode:wrap, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      const name = nameIn.value.trim(); if(!name){ toast("Name the Gift"); return; }
      const cat = giftByName(giftSel.value);
      const sc = $("#giftStatChoice");
      if(!Array.isArray(t.gifts)) t.gifts = [];
      t.gifts.push({ id:uid(), name, tier:(cat&&cat.tier)||"Gift", patron:patronSel.value||"",
        statChoice: sc && sc.value || undefined, effect:effIn.value.trim(), prereq:(cat&&cat.prereq)||"" });
      save(); closeModal(); trainerTab="gifts"; renderTrainer();
      toast(`Granted “${name}”`);
    }},"Grant Gift"),
  ]});
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
  if(mode==="cloud") bar.append(el("button",{class:"btn-secondary",onclick:()=>switchTab("pc")},"🖥 PC"));
  root.append(bar);

  if(!c.pokemon.length){
    root.append(el("div",{class:"addcard", onclick:()=>addPokemon()}, "＋ Add your first Pokémon"));
    return;
  }
  // "Mom?" is a hidden Symbiant: it lives in its own section between Team and Box and never
  // counts toward the 6-slot team. Only the GM and Lázaro may see it at all.
  const moms = c.pokemon.filter(p=>isMomSpecies(p.species));
  const team = c.pokemon.filter(p=>p.onTeam && !isMomSpecies(p.species));
  const box  = c.pokemon.filter(p=>!p.onTeam && !isMomSpecies(p.species));
  // Team section (up to 6, shown at the top)
  root.append(el("div",{class:"section-head"}, `Team (${team.length}/6)`,
    el("span",{class:"muted small"}, "tap ☆ to move a Pokémon in/out")));
  const teamGrid = el("div",{class:"party"});
  team.forEach((p,i) => teamGrid.append(monCard(p, {reorder:team.length>1, first:i===0, last:i===team.length-1})));
  if(!team.length) teamGrid.append(el("div",{class:"muted small",style:"padding:8px"},"No Pokémon on the team yet."));
  root.append(teamGrid);
  // "Mom?" section (between Team and Box) — GM + Lázaro only
  if(moms.length && canSeeMom()){
    root.append(el("div",{class:"section-head",style:"margin-top:16px"}, "Mom?",
      el("span",{class:"muted small"}, "🔒 visible only to you and the GM")));
    const momGrid = el("div",{class:"party"});
    moms.forEach(p => momGrid.append(monCard(p)));
    root.append(momGrid);
  }
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
/* reorder a Pokémon within the party (team). dir = -1 up / +1 down. Swaps its slot
   with the neighbouring team member in the underlying pokemon array. */
function moveTeamMon(p, dir){
  const c = activeChar();
  const team = c.pokemon.filter(x=>x.onTeam);
  const idx = team.indexOf(p), tgt = idx + dir;
  if(tgt<0 || tgt>=team.length) return;
  const q = team[tgt];
  const i = c.pokemon.indexOf(p), j = c.pokemon.indexOf(q);
  [c.pokemon[i], c.pokemon[j]] = [c.pokemon[j], c.pokemon[i]];
  save(); renderPokemon(); render();
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
function monCard(p, opts={}){
  const sp = getSpecies(p.species);
  const d = pokeDerived(p);
  const cur = p.currentHP==null ? d.maxHP : p.currentHP;
  const pct = Math.max(0, Math.min(100, Math.round(cur/d.maxHP*100)));
  const hpColor = pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)";
  const card = el("div",{class:"pcard", onclick:()=>{ openMon=p.id; renderPokemon(); }});
  const body = el("div",{class:"pc-body"});
  body.append(monSprite(sp?.name || p.species, p.shiny, "s-sm", monImage(p)));
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
  if(opts.reorder){
    const reorder = el("div",{class:"pc-reorder"});
    reorder.append(el("button",{class:"btn-secondary",disabled:!!opts.first,title:"move up in party",
      onclick:e=>{e.stopPropagation(); moveTeamMon(p,-1);}},"▲"));
    reorder.append(el("button",{class:"btn-secondary",disabled:!!opts.last,title:"move down in party",
      onclick:e=>{e.stopPropagation(); moveTeamMon(p,1);}},"▼"));
    card.append(reorder);
  }
  if(!isMomSpecies(p.species))
    card.append(el("button",{class:"pc-star"+(p.onTeam?" on":""), title:p.onTeam?"On team — tap to send to box":"In box — tap to add to team",
      onclick:e=>{e.stopPropagation(); setTeam(p, !p.onTeam);}}, p.onTeam?"★":"☆"));
  card.append(el("button",{class:"pc-del",title:"remove",onclick:e=>{e.stopPropagation();
    if(confirm(`Remove ${p.nickname||sp?.name||"this Pokémon"}?`)){ const c=activeChar(); c.pokemon=c.pokemon.filter(x=>x.id!==p.id); save(); renderPokemon(); render(); }}},"🗑"));
  return card;
}
function addPokemon(){
  // hidden species (e.g. "Mom?") only appear in the picker for the GM and Lázaro
  const names = D.species.filter(s=>!(s.hidden && !canSeeMom())).map(s=>s.name);
  openPicker("Choose a species", names, name=>{
    const p = newPokemon(name);
    const sp = getSpecies(name);
    if(sp && sp.abilities.basic[0]){ p.abilities = [sp.abilities.basic[0]]; }
    if(isMomSpecies(name)){ p.onTeam = false; autoAllocMom(p); }   // never on the team; stats auto-filled
    // limit active team to 6; extra Pokémon go to the box
    else if(activeChar().pokemon.filter(x=>x.onTeam && !isMomSpecies(x.species)).length >= 6) p.onTeam = false;
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
  spriteBox.append(monSprite(sp?.name || p.species, p.shiny, "s-lg", monImage(p)));
  spriteBox.append(el("button",{class:"photo-btn",title:p.mega?"upload a photo for this Mega form":"upload a photo",
    onclick:()=>pickImage(240, async d=>{ setMonImage(p, await storeImg(d,"mon")); save(); refreshMon(p); })},"📷"));
  if(monImage(p)) spriteBox.append(el("button",{class:"photo-rm",title:"remove photo — use the default sprite",
    onclick:()=>{ setMonImage(p, ""); save(); refreshMon(p); }},"×"));
  hero.append(spriteBox);
  const main = el("div",{class:"mh-main"});
  main.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("div",{class:"mh-name",id:"heroName"}, p.nickname || sp?.name || "Unknown"),
    el("div",{class:"pc-lvl"}, "Lv "+p.level)));
  main.append(el("div",{class:"mh-sub", html:(p.nickname && sp?`${sp.name} · `:"")+(sp?.types||[]).map(typeBadge).join(" ")+(p.shiny?" ✨":"")}));
  main.append(el("div",{class:"small muted",style:"margin-top:2px"},
    `Evasion — Phys +${d.physEva} · Spec +${d.specEva} · Speed +${d.spdEva}`));
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
  /* Mega Evolution — temporary transform, reverts at End Scene */
  const megas = megaFormsFor(p);
  if(p.mega){
    main.append(el("div",{class:"inline",style:"margin-top:6px;gap:6px;align-items:center;flex-wrap:wrap"},
      el("span",{class:"statuschip on",style:"padding:2px 8px;font-size:11px;cursor:default"},"✨ MEGA"),
      el("button",{class:"btn-secondary",style:"padding:4px 10px",title:"revert to the base form (also happens automatically at End Scene)",
        onclick:()=>megaRevert(p)},"↩ Revert")));
  } else if(megas.length){
    const row = el("div",{class:"inline",style:"margin-top:6px;gap:6px;flex-wrap:wrap"});
    megas.forEach(nm=> row.append(el("button",{class:"btn-secondary",style:"padding:4px 10px",
      title:"Mega Evolve (needs the matching Mega Stone held; lasts until End Scene). Stats, types, Ability & size follow the Mega form; moves & level are kept.",
      onclick:()=>megaEvolve(p,nm)}, megas.length>1 ? "✨ "+nm : "✨ Mega Evolve")));
    main.append(row);
  } else {
    const stones = megaStonesFor(p);
    if(stones.length) main.append(el("div",{class:"small muted",style:"margin-top:6px"},
      `Equip ${stones.join(" or ")} to Mega Evolve.`));
  }
  hero.append(main);
  card.append(hero);
  /* damage / heal: one signed input — type 8 to heal, −10 to take damage */
  card.append(damageHealRow(()=>p.currentHP, setHP, p));
  return card;
}

/* toggle-chips for status conditions + a Catch DC (GM) button */
function statusCard(p){
  if(!Array.isArray(p.statuses)) p.statuses=[];
  const gm = isGM();
  const card = el("div",{class:"card"}, el("h3",{},"Status Conditions",
    el("div",{class:"inline"},
      p.statuses.length?el("button",{class:"linkbtn",onclick:()=>{ p.statuses=[]; save(); refreshMon(p); }},"clear"):"",
      gm?el("button",{class:"linkbtn h-act",onclick:()=>catchRateModal(p)},"🎯 Catch DC"):"")));
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
/* Trainings — a Trainer's Elite Trainer / Training Feature buffs (Agile/Brutal/Focused/Inspired),
   deliberately its own card rather than living inside Status Conditions: different source (a Trainer
   spends time training, not an in-combat affliction), different rules (no immunity, no catch-rate
   bump, doesn't clear on End Scene), and a visibly different toggle style so it doesn't get confused
   with the round statuschip pips above. */
function trainingsCard(p){
  const card = el("div",{class:"card"}, el("h3",{},"Trainings"));
  card.append(trainingsRow(p, ()=>refreshMon(p)));
  const active = TRAINING_DEFS.filter(s=>hasStatus(p,s.key));
  if(active.length){
    active.forEach(s=>{ const d=el("details",{class:"spoiler",style:"margin-top:6px"});
      d.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, s.name)));
      d.append(el("div",{class:"small",style:"margin-top:6px"}, s.effect));
      card.append(d); });
  } else {
    card.append(el("div",{class:"small muted",style:"margin-top:6px"}, "none active"));
  }
  return card;
}
/* Capture-Rate calculator popup (GM tool) */
/* info-only capture rate (no roll) — for the GM's "🎯 Catch DC" reference buttons when just
   inspecting a Pokémon. The interactive roll lives on the trainer's own ⚔ Combat tab instead
   (openThrowPokeball), not behind clicking a Pokémon. */
function catchRateModal(p){ catchDCModal(p, {showRoll:false}); }
function catchDCModal(p, opts={}){
  const showRoll = opts.showRoll !== false;
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
  wrap.append(legLabel, out);
  redraw();
  if(!showRoll){
    modal({title:`🎯 Catch DC — ${p.nickname||getSpecies(p.species)?.name||"Pokémon"}`, bodyNode:wrap,
      footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]});
    return;
  }

  /* ---- actually roll the capture (accuracy vs AC 6, then 1d100 − Trainer Level − Ball bonus) ---- */
  const roll = el("div",{style:"margin-top:16px;border-top:1px solid var(--line);padding-top:12px"});
  const defLvl = activeChar()?.trainer?.level || 1;
  const lvlIn  = el("input",{type:"number",min:1,value:defLvl,style:"width:66px",title:"the thrower's Trainer Level"});
  const ballIn = el("input",{type:"number",value:0,style:"width:66px",title:"Poké Ball / Feature bonus to the capture roll (e.g. Great Ball +10)"});
  const result = el("div",{style:"margin-top:10px"});
  const doRoll = ()=>{
    const r = captureRate(p, {legendary});
    if(!r.capturable){ result.innerHTML=""; result.append(el("div",{class:"warnbox"},"Can't be captured at 0 HP.")); return; }
    const lvl = Math.max(1, parseInt(lvlIn.value)||1), ball = parseInt(ballIn.value)||0;
    const d = pokeDerived(p);
    const acc = 1 + Math.floor(Math.random()*20);
    const ac  = 6 + d.physEva;                       // throwing a Poké Ball is an AC 6 attack vs Evasion
    const nat20 = acc===20, nat1 = acc===1;
    const hit = nat20 || (!nat1 && acc >= ac);
    const d100 = 1 + Math.floor(Math.random()*100);
    const capBonus = lvl + ball + (nat20?10:0);      // subtracted from the d100 (lower = better)
    const capRoll = d100 - capBonus;
    const caught = d100===100 ? true : (hit && capRoll <= r.rate);
    result.innerHTML="";
    const lines = [
      `🎯 Accuracy: rolled <b>${acc}</b> vs AC ${ac} (6 + ${d.physEva} Evasion) → <b>${hit?"HIT":"MISS"}</b>${nat20?" (Nat 20 — −10 to capture roll!)":nat1?" (Nat 1 — auto-miss)":""}`,
    ];
    if(hit){
      lines.push(`🎲 Capture: 1d100 = <b>${d100}</b> − ${lvl} Lv${ball?` − ${ball} ball`:""}${nat20?" − 10 nat20":""} = <b>${capRoll}</b> vs rate <b>${r.rate}</b>`);
      lines.push(caught ? `✅ <b>Caught!</b> (${d100===100?"natural 100":`${capRoll} ≤ ${r.rate}`})` : `❌ <b>Broke free.</b> (${capRoll} > ${r.rate})`);
    } else {
      lines.push("The ball missed — no capture roll. Try again!");
    }
    result.append(el("div",{class:"warnbox",style:`line-height:1.5;${caught?"background:rgba(46,160,67,.14);border-color:var(--good);color:var(--good)":""}`,html:lines.join("<br>")}));
  };
  roll.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:6px"},"🎲 Roll to Catch"),
    el("div",{class:"tk-menu-row",style:"gap:8px;align-items:center;flex-wrap:wrap"},
      el("span",{class:"small"},"Trainer Lv"), lvlIn,
      el("span",{class:"small"},"Ball bonus"), ballIn,
      el("button",{class:"btn-primary",onclick:doRoll},"Throw a Poké Ball")),
    result);
  wrap.append(roll);
  modal({title:`🎯 Catch — ${p.nickname||getSpecies(p.species)?.name||"Pokémon"}`, bodyNode:wrap,
    footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]});
}
/* "Throw a Poké Ball" as a Trainer Combat action: pick a wild Pokémon the player can currently
   see on the map, then open the real capture roll (catchDCModal) for it. Cloud-only — capture
   needs a shared wild target, which only the Map provides. */
function openThrowPokeball(t){
  if(mode!=="cloud"){ infoModal("🎯 Throw a Poké Ball", "Capturing needs the shared ⚔ Map (cloud campaign) so everyone sees the same wild Pokémon."); return; }
  const targets = visibleWildMonTokens();
  if(!targets.length){ infoModal("🎯 Throw a Poké Ball", "No wild Pokémon are currently visible to you on the map."); return; }
  const wrap = el("div",{});
  wrap.append(el("div",{class:"small muted",style:"margin-bottom:10px"},"Choose a wild Pokémon to target:"));
  const list = el("div",{class:"picklist"});
  targets.forEach(({mon})=>{
    const sp = getSpecies(mon.species);
    list.append(el("div",{class:"pickitem",style:"cursor:pointer",onclick:()=>{ closeModal(); catchDCModal(mon); }},
      monSprite(sp?.name||mon.species, mon.shiny, "s-xs"),
      el("div",{style:"flex:1;min-width:0"}, el("div",{class:"pi-title"}, encMonName(mon)), el("div",{class:"pi-sub muted"}, `Lv ${mon.level}`))));
  });
  wrap.append(list);
  modal({title:"🎯 Throw a Poké Ball — choose a target", bodyNode:wrap,
    footNodes:[el("button",{class:"btn-secondary",onclick:closeModal},"Cancel")]});
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
/* one Accuracy/Evasion Combat Stage cell — same compact layout as the stat-CS cells above, but the
   "effective" number shown is the flat CS itself (no ×0.2/×0.1 multiplier applies to these two). */
function accEvaCell(lbl, manual, effVal, onSet){
  const cell = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:66px"});
  cell.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
  cell.append(el("div",{style:`font-weight:800;${effVal>0?"color:var(--good)":effVal<0?"color:var(--bad)":""}`}, `${effVal>0?"+":""}${effVal}`));
  cell.append(csStepper(manual, onSet));
  return cell;
}
/* Combat Stages card — manual steppers per stat; conditions apply automatically on top */
function combatStagesCard(p){
  if(!p.cs) p.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  const d = pokeDerived(p), cond = conditionCSMods(p);
  const anyManual = ALL_CS_STATS.some(([k])=>p.cs[k]);
  const card = el("div",{class:"card"}, el("h3",{},"Combat Stages",
    el("div",{class:"inline"},
      el("span",{class:"muted small"},"tap ± ; conditions auto-apply"),
      anyManual?el("button",{class:"linkbtn",onclick:()=>{ ALL_CS_STATS.forEach(([k])=>p.cs[k]=0); save(); refreshMon(p); }},"reset"):"")));
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
  ACC_EVA_STATS.forEach(([k,lbl])=>{
    const manual = p.cs[k]||0, cm = cond[k]||0, effCS = d.cs[k];
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"big",style: effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}, `${effCS>0?"+":""}${effCS}`));
    box.append(csStepper(manual, v=>{ p.cs[k]=Math.max(-6,Math.min(6,v)); save(); refreshMon(p); }));
    box.append(el("div",{class:"sub"}, (k==="acc"?"to Accuracy Rolls":"to Phys/Spec/Speed Evasion") + (cm?` (${manual>=0?"+":""}${manual}${cm>=0?"+":""}${cm})`:"")));
    grid.append(box);
  });
  card.append(grid);
  const src = STATUS_DEFS.filter(s=>hasStatus(p,s.key) && CONDITION_CS[s.key]);
  if(src.length) card.append(el("div",{class:"small muted",style:"margin-top:8px"},
    "From conditions: " + src.map(s=>`${s.name} (${Object.entries(CONDITION_CS[s.key]).map(([st,v])=>`${v} ${st}`).join(", ")})`).join(" · ")));
  card.append(el("div",{class:"small muted",style:"margin-top:4px"},
    "Combat Stages clear on switch-out / end of encounter. Speed CS also shifts Movement by ½ (rounded down). Accuracy/Evasion CS are flat (±1 per stage), not %."));
  return card;
}
/* ===================================================================
   Buff engine (#2) — Cheerleader Cheers, Commander Orders, Musician Songs
   and custom buffs. Buffs live on the recipient (owner.buffs[]).
   openMoveRoll / openTrainerAttack apply the numeric ones (and can spend
   one-shots); End Scene / End Day clear them. Effects transcribed from
   PTU 1.05 Core (Cheerleader p.93, Commander Orders pp.61-62, Songs p.164).
=================================================================== */
// mods the roll understands: acc (±accuracy roll), dmg (±flat damage), crit (widen crit/effect range), db (±Damage Base)
const PTU_BUFFS = [
  // — Cheerleader Cheers (Core p.93). Each is spent for its effect → one-shot. —
  { key:"cheered",   cat:"Cheerleader", name:"Cheered",   dur:"until spent", once:true, mods:{},
    note:"Spend when making a Save Check to roll twice and take the better result." },
  { key:"excited",   cat:"Cheerleader", name:"Excited",   dur:"until spent", once:true, mods:{ dr:5 },
    note:"Spend when hit by a Damaging Attack to gain +5 Damage Reduction against it. (Auto-applied & spent when this creature takes an attack.)" },
  { key:"motivated", cat:"Cheerleader", name:"Motivated", dur:"until spent", once:true, mods:{},
    note:"Spend as a Free Action to raise a Combat Stage that is below its default by +1." },
  // — Commander Orders (Core pp.61-62). [Stratagem] persist while AP-bound; others are short-duration. —
  { key:"reckless-advance", cat:"Commander", name:"Reckless Advance", dur:"while Bound", mods:{ dmg:8 },
    note:"Melee damaging attacks only. They Trip on Accuracy 18+; you become Vulnerable after you hit." },
  { key:"strike-again",     cat:"Commander", name:"Strike Again!",    dur:"this turn",  once:true, mods:{},
    note:"Immediately take an extra Standard Action to use an At-Will attack." },
  { key:"trick-shot",       cat:"Commander", name:"Trick Shot",       dur:"while Bound", mods:{ acc:-2, crit:3 },
    note:"Ranged damaging attacks only (Moves with an AC value)." },
  { key:"long-shot",        cat:"Commander", name:"Long Shot",        dur:"until end of next turn", mods:{},
    note:"Ranged attacks' range doubled; +X damage where X = metres travelled (add by hand)." },
  { key:"capricious-whirl", cat:"Commander", name:"Capricious Whirl", dur:"while Bound", mods:{ dmg:-5 },
    note:"+3 Evasion while active." },
  { key:"dazzling-dervish", cat:"Commander", name:"Dazzling Dervish", dur:"until end of next turn", mods:{},
    note:"Adds non-stat Evasion to Movement; foes you hit or pass suffer −3 to all rolls." },
  { key:"brace-for-impact", cat:"Commander", name:"Brace for Impact", dur:"while Bound", mods:{ dr:5 },
    note:"Once/round on a self-targeting Status Move, gain 5 DR until end of next turn. (Auto-applied to incoming damage while active.)" },
  { key:"sentinel-stance",  cat:"Commander", name:"Sentinel Stance",  dur:"until end of next turn", mods:{ dr:10 },
    note:"May Intercept as a Shift; gain 10 DR against the intercepted attack. (Auto-applied to incoming damage while active.)" },
  { key:"pinpoint-strike",  cat:"Commander", name:"Pinpoint Strike",  dur:"while Bound", mods:{ acc:2, crit:2, dmg:-5 },
    note:"Damaging attacks deal 5 less, before weakness/resistance." },
  { key:"perfect-aim",      cat:"Commander", name:"Perfect Aim",      dur:"next attack", once:true, mods:{},
    note:"Next damaging attack auto-hits & ignores Defensive Abilities, but is resisted one step further." },
  // — Musician Songs (Core p.164). Ally buffs, until end of your next turn. —
  { key:"song-of-might",   cat:"Musician", name:"Song of Might",   dur:"until end of next turn", mods:{ dmg:5 },
    note:"+5 to Damage Rolls." },
  { key:"song-of-courage", cat:"Musician", name:"Song of Courage", dur:"until end of next turn", mods:{},
    note:"+2 to Skill Checks and Save Checks (not attack rolls)." },
  { key:"song-of-life",    cat:"Musician", name:"Song of Life",    dur:"until end of next turn", mods:{ dr:5 },
    note:"Gain 5 Damage Reduction. (Auto-applied to incoming damage while active.)" },
];
const buffByKey = new Map(PTU_BUFFS.map(b=>[b.key,b]));
const BUFF_CATS = ["Cheerleader","Commander","Musician"];
function ownerBuffs(owner){ return Array.isArray(owner?.buffs) ? owner.buffs : []; }
/* total numeric contribution of an owner's active buffs, for a roll */
function buffMods(owner){
  const s = { acc:0, dmg:0, crit:0, db:0, dr:0 };
  ownerBuffs(owner).forEach(b=>{ const m=b.mods||{}; s.acc+=m.acc||0; s.dmg+=m.dmg||0; s.crit+=m.crit||0; s.db+=m.db||0; s.dr+=m.dr||0; });
  return s;
}
/* Damage Reduction an owner's active buffs grant, and which buffs supply it (defender side). */
function buffDR(owner){
  let dr = 0; const from = [];
  ownerBuffs(owner).forEach(b=>{ const d=(b.mods&&b.mods.dr)||0; if(d){ dr+=d; from.push(b.name); } });
  // worn armor adds flat Damage Reduction too (permanent — never consumed like one-shot buffs)
  if(isTrainerOwner(owner)){ const e=equipDR(owner); if(e.dr){ dr+=e.dr; e.from.forEach(n=>from.push(n)); } }
  return { dr, from };
}
/* Spend the one-shot DR buffs (e.g. Excited) after they've absorbed an incoming attack.
   Returns true if anything was consumed. Caller persists via its own commit/save. */
function consumeDamageBuffs(owner){
  if(!owner) return false;
  const before = ownerBuffs(owner).length;
  owner.buffs = ownerBuffs(owner).filter(b=>!(b.once && b.mods && b.mods.dr));
  return ownerBuffs(owner).length !== before;
}
/* ---- turn-duration expiry (uses the Map initiative tracker) ----
   "until end of your next turn" / "this turn" buffs (Songs, most short Orders) should fall off
   in combat, not linger until End Scene. Songs last until the end of the CASTER's next turn, so
   each such buff records its source = whoever's turn is active when it's placed (Songs are played
   on the Musician's own turn), plus a monotonic turn sequence. advanceInitiative() expires the buff
   at the END of the source's next turn, on WHATEVER creature is carrying it. Buffs added outside
   battle (or by a source not in initiative) carry no stamp and just persist until rest. */
function isTurnDurBuff(b){ return !b.once && /(this|next)\s+turn/i.test(b.dur||""); }
function curTurnSeq(){ return battleOn() ? (activeMapMeta().initSeq||0) : null; }
function activeInitInfo(){
  if(!battleOn()) return null;
  const meta = activeMapMeta(); if(!meta.initTurnId) return null;
  // initTurnId may be a Swarm's extra-act entry ("<tokenId>#2") — buffs are stamped against the
  // TOKEN, so that every act of the same swarm counts as the same caster.
  const tid = initEntryToken(meta.initTurnId);
  const map = activeMap(); const tok = map && mapTokensFor(map.id).find(t=>t.id===tid);
  return { id: tid, name: tok ? tokenHp(tok).name : "", seq: meta.initSeq||0 };
}
function stampTurnBuff(nb){
  if(!isTurnDurBuff(nb)) return;
  const a = activeInitInfo(); if(!a) return;               // not in a tracked turn → persists to rest
  nb.turnStamp = a.seq; nb.life = 1;                        // survives until the end of the CASTER's NEXT turn
  nb.src = a.id; nb.srcName = a.name;                       // caster = whoever's turn it is now (Songs are on-turn)
}
/* Called for every combatant when a token's turn ENDS (endingId/endingSeq). A buff expires only when
   ITS source's turn ends; a buff placed during the source's current turn isn't counted yet. */
function expireTurnBuffs(owner, endingId, endingSeq){
  if(!owner || !Array.isArray(owner.buffs)) return [];
  const expired = [];
  owner.buffs = owner.buffs.filter(b=>{
    if(b.turnStamp==null || b.life==null) return true;     // not turn-tracked (added outside battle)
    if(b.src && b.src!==endingId) return true;             // not this caster's turn ending
    if(b.turnStamp===endingSeq) return true;               // placed during the source's current turn
    b.life -= 1;
    if(b.life<=0){ expired.push(b.name); return false; }
    return true;
  });
  return expired;
}
function addBuff(owner, key){
  if(!Array.isArray(owner.buffs)) owner.buffs=[];
  const b = buffByKey.get(key); if(!b) return;
  const nb = { id:uid(), key:b.key, name:b.name, cat:b.cat, dur:b.dur, note:b.note, once:!!b.once, mods:Object.assign({},b.mods) };
  stampTurnBuff(nb);
  owner.buffs.push(nb);
}
function addCustomBuff(owner, name, mods, note){
  if(!Array.isArray(owner.buffs)) owner.buffs=[];
  owner.buffs.push({ id:uid(), key:"custom", name:name||"Custom buff", cat:"Custom", dur:"—", note:note||"", once:false, mods:mods||{} });
}
function removeBuff(owner, id){ if(owner) owner.buffs = ownerBuffs(owner).filter(b=>b.id!==id); }
function buffModText(m){
  const p=[]; m=m||{};
  if(m.acc)  p.push(`${m.acc>0?"+":""}${m.acc} Acc`);
  if(m.dmg)  p.push(`${m.dmg>0?"+":""}${m.dmg} Dmg`);
  if(m.db)   p.push(`${m.db>0?"+":""}${m.db} DB`);
  if(m.crit) p.push(`+${m.crit} Crit/Effect range`);
  if(m.dr)   p.push(`${m.dr>0?"+":""}${m.dr} DR`);
  return p.join(" · ");
}
/* buff manager card. `commit` persists + re-renders the surrounding view after any change. */
function buffsCard(owner, commit){
  if(!Array.isArray(owner.buffs)) owner.buffs=[];
  const card = el("div",{class:"card"}, el("h3",{},"Buffs & Orders",
    el("span",{class:"muted small"},"Cheers · Orders · Songs")));
  if(!owner.buffs.length){
    card.append(el("div",{class:"muted small"},"No active buffs. Add a Cheer, Order, Song or custom buff below."));
  } else owner.buffs.forEach(b=>{
    const modt = buffModText(b.mods);
    const row = el("div",{class:"buff-row"});
    row.append(el("div",{style:"flex:1;min-width:0"},
      el("div",{class:"buff-name"}, b.name + (b.cat && b.cat!=="Custom" ? `  ·  ${b.cat}` : "")),
      el("div",{class:"small muted"}, [b.dur, modt, b.once?"one-shot":"",
        b.src ? `from ${b.srcName||"caster"} — ends after their next turn` : ""].filter(Boolean).join(" · ")),
      b.note ? el("div",{class:"small muted"}, b.note) : ""));
    row.append(el("button",{class:"linkbtn danger",onclick:()=>{ removeBuff(owner,b.id); commit(); }},"remove"));
    card.append(row);
  });
  const addRow = el("div",{class:"inline",style:"gap:6px;margin-top:10px;flex-wrap:wrap"});
  BUFF_CATS.forEach(cat=>{
    const sel = el("select");
    sel.append(el("option",{value:""},`+ ${cat}…`));
    PTU_BUFFS.filter(b=>b.cat===cat).forEach(b=>sel.append(el("option",{value:b.key}, b.name)));
    sel.addEventListener("change",()=>{ if(sel.value){ addBuff(owner, sel.value); commit(); } });
    addRow.append(sel);
  });
  addRow.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",onclick:()=>openCustomBuff(owner, commit)},"✎ Custom…"));
  card.append(addRow);
  card.append(el("div",{class:"small muted",style:"margin-top:6px"},
    "Attack buffs apply automatically when you roll a move; Damage Reduction auto-applies when this creature takes damage (one-shot DR like Excited is spent on the hit). In Map battle mode, “until end of next turn” buffs fall off on the ▶ next-turn advance; the rest clear on End Scene / End Day."));
  return card;
}
function openCustomBuff(owner, done){
  const name=el("input",{type:"text",placeholder:"Buff name"});
  const acc=el("input",{type:"number",value:0,style:"width:70px"});
  const dmg=el("input",{type:"number",value:0,style:"width:70px"});
  const crit=el("input",{type:"number",value:0,style:"width:70px"});
  const dr=el("input",{type:"number",value:0,style:"width:70px"});
  const note=el("input",{type:"text",placeholder:"Note (optional)"});
  const body=el("div",{},
    el("label",{class:"field"},el("span",{},"Name"),name),
    el("div",{class:"inline",style:"gap:10px;margin-top:8px;flex-wrap:wrap"},
      el("label",{class:"field",style:"max-width:120px"},el("span",{},"± Accuracy"),acc),
      el("label",{class:"field",style:"max-width:120px"},el("span",{},"± Damage"),dmg),
      el("label",{class:"field",style:"max-width:140px"},el("span",{},"+ Crit range"),crit),
      el("label",{class:"field",style:"max-width:150px"},el("span",{},"+ Damage Reduction"),dr)),
    el("label",{class:"field",style:"margin-top:8px"},el("span",{},"Note"),note));
  modal({title:"Custom buff", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      addCustomBuff(owner, name.value.trim(), { acc:+acc.value||0, dmg:+dmg.value||0, crit:+crit.value||0, dr:+dr.value||0 }, note.value.trim());
      closeModal(); if(done) done();
    }},"Add buff"),
  ]});
}

function renderMonPlay(root, p, sp){
  if(isMomSpecies(p.species)){ root.append(movesCard(p, sp)); return; }   // "Mom?": Play shows only Moves
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
  root.append(trainingsCard(p));

  /* combat stages */
  root.append(combatStagesCard(p));

  /* abilities (a Pokémon can have several) */
  root.append(abilitiesCard(p, sp));

  /* moves */
  root.append(movesCard(p, sp));
  root.append(customMovesCard(p, ()=>refreshMon(p)));

  /* type matchups */
  if(sp && sp.types?.length) root.append(matchupCard(sp.types, p));

  /* buffs & orders (Cheers / Commander Orders / Musician Songs) — kept at the bottom of the page */
  root.append(buffsCard(p, ()=>preserveScroll(()=>{ save(); refreshMon(p); })));
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
  idc.append(rotomFormControl(p, sp, ()=>{ save(); refreshMon(p); }));
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
  if(isMomSpecies(p.species)) return;   // "Mom?": Build shows only Identity

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
  const tpEarned = tutorPointsEarned(p.level);
  ec.append(el("div",{class:"inline small",style:"gap:8px;align-items:center;flex-wrap:wrap;margin-top:2px"},
    el("span",{class:"muted"}, `1 Tutor Point on hatching + 1 every 5 levels → Lv ${p.level} has earned ${tpEarned}.`),
    el("button",{class:"linkbtn",onclick:()=>{p.tutorPoints=tpEarned;save();refreshMon(p);}},"sync to earned"),
    el("button",{class:"linkbtn",onclick:()=>openTutorMovePicker(p,sp)},"🎓 learn a Tutor move (−2)")));
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
      // GM-only: undo an accidental evolution (or a wrongly-picked branch, e.g. Marowak vs
      // Marowak Alolan) — pulled from the actual evolve history, not the chain, so it's never
      // ambiguous even when a line branches.
      if(gm && Array.isArray(p.evoHistory) && p.evoHistory.length){
        const prev = p.evoHistory[p.evoHistory.length-1];
        evc.append(el("div",{class:"inline",style:"justify-content:space-between;gap:8px;margin-top:10px;padding-top:8px;border-top:1px solid var(--line);flex-wrap:wrap"},
          el("span",{class:"small muted"}, `GM: fix an accidental evolution`),
          el("button",{class:"btn-secondary",style:"padding:6px 12px",title:"Undo the most recent evolution and go back to "+prev,
            onclick:()=>unevolveTo(p)}, `↩ Un-evolve into ${prev}`)));
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
/* Held Item picker — choose from the item database (held items + berries), or clear it.
   `rerender` defaults to the party-Pokémon path (save()+refreshMon); the Encounters tab passes
   saveEnc()+renderEncounters(). */
function heldItemControl(p, rerender){
  const wrap = el("label",{class:"field"}, el("span",{},"Held Item"));
  const btn = el("button",{class:"btn-secondary",style:"text-align:left",onclick:()=>{
    const names = ["(none)", ...D.items.held.map(i=>i.name), ...D.items.food.map(i=>i.name)];
    openPicker("Held Item", names, v=>{
      p.heldItem = v==="(none)" ? "" : v;
      const req = megaToStoneMap.get(p.species);
      if(p.mega && req && req.toLowerCase()!==(p.heldItem||"").toLowerCase()){
        megaRevert(p, false, rerender);                   // stone unequipped mid-Mega Evolution — snap back
      } else if(rerender) rerender(); else { save(); refreshMon(p); }
    }, "held");
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
/* ===================================================================
   Legendary Auras (from "The Blessed and the Damned" supplement).
   Display-only: the auras and their full rules are surfaced for the GM;
   none of their effects are auto-applied (they're too situational — GM
   adjudicates). Each legendary the book covers has its Domains attributed;
   uncovered legendaries show an empty, GM-editable Auras section.
=================================================================== */
const auraKey = s => String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const AURA_DEFS = [
  ["Chaos","Whenever an opponent rolls to hit the Possessor with a Move, Struggle Attack or Feature, they roll two d20s and take the lower result. Whenever one of its Combat Stages would be lowered, or it would be inflicted with a Status Effect, as the result of a Move, Struggle Attack or Feature that hit it, roll d20; on a result of 11 or higher, the attacker is inflicted instead."],
  ["Creation","Once per turn the Possessor may do one of the following: (1) Place a Weather effect into play, always Type-Shifted to one of its Types to benefit the Possessor; (2) Change up to five adjacent meters of terrain in any manner they please (walls, difficult terrain, conjured water, etc.); (3) Create a servant to assist them in battle — a Pokemon of the same Level as the Possessor."],
  ["Creativity","The Possessor may use the Features Nuanced Performance, Reliable Performance, Bardic Flair, Power Chord, Fabulous Max, and Rule of Cool. They may target themselves with these Features, possess AP equal to 3 + (Possessor level / 5), and are considered to have 4d6 in all their Contest Stats."],
  ["Death","All who oppose the Possessor lose 1/10th their max HP per turn. If any enemy combatant reaches -100% HP, they instantly die, and may be risen by the Possessor as its own loyal servant. If an enemy strikes the Possessor, they roll d20; on a result of 5 or less they are inflicted with Heal Block."],
  ["Destruction","If the target of a Move used by the Possessor would Resist it or is Immune to it, it instead takes Neutral damage. All passive damage the Possessor deals (weather, status, spikes, etc.) is doubled, and Magic Guard, Sturdy, and other defensive Abilities are disabled."],
  ["Devourer","While the Devourer Aura is active, the Auras of all other Legendary Pokemon in the vicinity are disabled. If the Devourer Aura is disabled, they may invoke their Auras again."],
  ["Dreams","If the Possessor hits an enemy with a Move, that target instantly falls asleep, even with the Insomnia Ability. Whenever the Possessor is inflicted with a Status Effect, the attacker rolls d20; on a 10 or lower they fall asleep. If the Possessor is put to sleep, all combatants fall asleep."],
  ["Emotion","All who oppose the Possessor are immediately Confused, Enraged, and Infatuated with the Possessor. Any Status Moves the Possessor uses that target an enemy or ally instead target all enemies or all allies. Abilities that grant Immunity to Status Effects are disabled before the Possessor."],
  ["Equilibrium","All damage inflicted to the Possessor is returned to the assailant. The Possessor may use Synchronize as a Free Action any time they are inflicted with a Status Effect that would trigger Synchronize."],
  ["Fate","The Possessor gains +3 to all Attack, Skill, Feature, Status Recovery, and Opposed Rolls while the Aura is active. All who oppose them take a -3 penalty on all of those Rolls."],
  ["Glitch","Hitting the Possessor has a 50% chance of increasing your Glitch by 1. Glitch 1: all your Moves become Metronome (keeping their normal frequencies). Glitch 2: when you use Metronome you roll two Moves and the Possessor chooses which you use. Glitch 3: you roll three Moves and the Possessor picks one. The Possessor always has Glitch 3."],
  ["Heroism","The Possessor has access to all Cheerleader Features and is treated as having Master Rank Charm and Command. They may target themselves with these Features and possess AP equal to 3 + (Possessor level / 5)."],
  ["Hivemind","The Possessor may use Hidden Power of any Type of their choice as if they had the Words of Power Feature. The Possessor also copies any Features from Mystical and Elemental Connection Classes from all combatants."],
  ["Knowledge","While active, all who oppose the Possessor are Suppressed. Furthermore, all Moves they know of Scene or Daily frequency are Disabled (including Moves lowered to that frequency by Suppression). This persists as long as the Aura is active."],
  ["Law","The Possessor declares 3 rules. All enemy combatants must abide by them. Breaking a rule provokes the Possessor's wrath: they receive a free priority attack against the one who broke the rule."],
  ["Life","The Possessor may revive a knocked-out or dead ally once per turn as a Swift Action; the ally is healed as if treated at a Pokecenter and its injuries cleared. The Possessor may also use Heal Bell at EoT frequency and has access to all Medium Features based on White Magic."],
  ["Love","The Possessor may inflict one enemy with Infatuation per round (any gender, or genderless). The Possessor is immune to Infatuation. Whenever you hit the Possessor, roll d20; on a 5 or lower your attack is treated as having the Recoil keyword at 1/4th, even if you are immune to Recoil."],
  ["Loyalty","The Possessor judges the bond between enemies and their Pokemon. Any Pokemon under Loyalty 5 have all Combat Stages lowered to -3. Each time such a Pokemon is issued a command, roll d20; on a 7 or lower each of its Combat Stages is lowered by another -1."],
  ["Luck","Whenever the Possessor would roll a d20, they roll 2d20 and take the higher. They are always treated as under the Super Luck Ability, and emit pure luck — treating themselves and all allies as if holding a Luck Incense."],
  ["Matter","The Possessor may add difficult terrain and physical obstructions (walls, cliffs, pits, lava, water, etc.) to the battleground at will. They and their allies are unaffected by these obstacles. These elements persist even if the Aura is not active."],
  ["Nature","Once per round the Possessor may beckon the assistance of the wilds: a new combatant enters the battle at the Possessor's level if a Pokemon, or half their level if a Trainer. (Nature, Oceans and Sky share this effect; a Possessor with several of these Auras may summon one ally per such Aura per round.)"],
  ["Nightmare","Those who oppose the Possessor are affected by Frightened when they fall asleep. Frightened treats the afflicted as Paralyzed and Suppressed, even if they would be immune, and persists for the rest of combat (even if the Aura is disabled) and cannot be removed by conventional means. In the Dream World, all who oppose the Possessor are Frightened as soon as combat begins."],
  ["Oceans","Once per round the Possessor may beckon the assistance of the wilds: a new combatant enters the battle at the Possessor's level if a Pokemon, or half their level if a Trainer. (Nature, Oceans and Sky share this effect; a Possessor with several of these Auras may summon one ally per such Aura per round.)"],
  ["Pathogen","Whenever you hit the Possessor, roll d20; on a 5 or lower you become Infected. Infected individuals are considered Poisoned and Burned even if immune. This persists for the rest of combat (even if the Aura is disabled) and cannot be removed by conventional means."],
  ["Peace","Whenever you hit the Possessor with a Move, that Move becomes Disabled. If all a combatant's Moves are Disabled, their Attack and Special Attack are set to -6 Combat Stages. If the Aura is disabled, these effects fade."],
  ["Predator","The Possessor has access to all Taskmaster Features (including Press) and is treated as having Master Rank Intimidate and Command. They may target themselves with these Features, possess AP equal to 3 + (Possessor level / 5), and may Press themselves without receiving injuries, losing only 1/16th their max HP."],
  ["Primal Weather","When active, the Possessor sets the Weather with one of: Delta Stream (Strong Winds — Electric, Ice and Rock Moves do neutral damage to Flying Types), Desolate Land (Sunny — Water Moves cannot be used), or Primordial Sea (Rainy — Fire Moves cannot be used). Attempts to override this Weather without removing the Aura fail."],
  ["Rejuvenation","The Possessor is always considered to have the Healer and Regenerator Abilities. They may use both once per round, and may also target others with their Regenerator usage."],
  ["Rivalry","The Possessor cannot be brought below 1 HP unless their paired Rival is one of their enemies. This Aura can only be disabled by another Legendary with the Rivalry Aura (not necessarily their paired Rival)."],
  ["Ruin","The Possessor embodies the erosion of strength. All who oppose the Possessor treat their Defense as locked at -3 Combat Stages while the Aura is active, and it cannot be raised by any means. Additionally, once per round when the Possessor lands a damaging Move, the target loses a tick of Hit Points as its vitality wears away."],
  ["Sky","Once per round the Possessor may beckon the assistance of the wilds: a new combatant enters the battle at the Possessor's level if a Pokemon, or half their level if a Trainer. (Nature, Oceans and Sky share this effect; a Possessor with several of these Auras may summon one ally per such Aura per round.)"],
  ["Solitude","The Possessor covers the arena in a heavy mist that divides its enemies. They become unaware of their allies' locations and cannot hear, communicate via Aura or Telepathy, or contact them through technological or occult means. The mist remains as long as the Aura is active."],
  ["Storms","The Possessor always has Sandstorm or Hail and Sunny Day or Rain Dance active at once, always Type-Shifted to one of its Types to benefit the Possessor. These Weather conditions cannot be overwritten while the Aura is active."],
  ["Symbiotic","The Possessor extends this Aura to their Symbiant. The two are always aware of each other's location, health and mood and can always communicate telepathically. They may access each other's Moves, Features, Skills and Edges, always using the higher of the two's Skills or Stats. The Combat Stage bonuses of the Aura apply to both. This Aura cannot be disabled by normal means — undoing it requires slaying one of the pair."],
  ["Time","The Possessor may manipulate the Initiative Order in any manner they wish. Once per Scene for every enemy Trainer, they may use Freeze Time as a Free Action at the start of a Round, preventing anyone who does not possess the Time Aura from acting that Round."],
  ["Trickery","The Possessor has access to all Trickster Features and may target themselves with them, possessing AP equal to 3 + (Possessor level / 5). They gain STAB on all Dark Type Moves and the Abilities Prankster, Frisk, Infiltrator, Pickpocket, and Run Away."],
  ["War","All of the Possessor's Moves are treated as if their Frequency were increased by a PP Up. They also inflict Injuries at 25% HP Markers, and Massive Damage is treated as 25%."],
  ["Willpower","The Possessor may Petrify a target once a Round as a Swift Action. While Petrified, you are completely removed from the initiative order. Petrify cannot be avoided and can only be removed by a Possessor of the Emotion, Knowledge, Life, Rejuvenation, or Willpower Aura. Petrify persists even if the Aura is disabled."],
];
const auraByKey = new Map(AURA_DEFS.map(([n,d])=>[auraKey(n),{name:n,desc:d}]));
const AURA_NAMES = AURA_DEFS.map(([n])=>n);
const AURA_CS_BONUS = 2;         // Core rule: "+2 to each Combat Stage" per active Aura
const AURA_MAX_ACTIVE = 3;       // "at most three Auras active at any one time"
/* whether one of a Pokémon's known Auras is currently switched on (contributes its +2 CS and counts
   toward the 3-active cap). Explicit whitelist in p.auraActive, defaulting OFF for anything not set —
   see initAuraActive() for how a freshly-assigned Domain list picks its starting 3. */
function auraIsActive(p, name){ return !!(p.auraActive && p.auraActive[auraKey(name)]); }
function activeAuraCount(p){ return (p.auras||[]).filter(a=>auraIsActive(p,a)).length; }
/* first assignment of a Domain list (species default or ↺ default): activate up to the first 3 —
   most legendaries have exactly 3 Domains, so this just turns all of them on out of the box. */
function initAuraActive(p){
  p.auraActive = {};
  (p.auras||[]).slice(0,AURA_MAX_ACTIVE).forEach(n=>{ p.auraActive[auraKey(n)] = true; });
}
function toggleAuraActive(p, name, rerender){
  if(!p.auraActive) initAuraActive(p);
  const k = auraKey(name);
  if(!p.auraActive[k] && activeAuraCount(p) >= AURA_MAX_ACTIVE){
    toast(`Only ${AURA_MAX_ACTIVE} Auras can be active at once — disable another first`); return;
  }
  p.auraActive[k] = !p.auraActive[k];
  rerender();
}
/* +2 CS to every Combat Stage per active Aura (Core rule above), summed if several are active at once. */
function auraCSMods(p){
  const out = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  const n = activeAuraCount(p) * AURA_CS_BONUS;
  if(n) for(const k in out) out[k] = n;
  return out;
}
const AURA_RULES =
  "All Legendary Pokemon possess at least three Domains (Auras). General guidelines:\n"+
  "• For each active Aura, the Legendary gains +2 to each of their Combat Stages.\n"+
  "• A Legendary may have at most three Auras active at any one time, even if it possesses more.\n"+
  "• While an Aura is active, once per round per active Aura the Legendary may diminish a single Super-Effective attack to a neutral resistance.\n"+
  "• When facing another Legendary that shares an Aura, neither is affected by that shared Aura.\n"+
  "• If an active Aura is disabled and the Legendary possesses more than three, they may instantly activate a remaining one.\n"+
  "• Arceus has access to every Legendary Aura.\n"+
  "• A captured Legendary might not have access to all, if any, of its Auras.\n"+
  "• A Legendary may extend an Aura to an ally as a permanent or temporary blessing.\n"+
  "Disabling an Aura is hard — only one Aura can be disabled every two rounds (Massive Damage from a Super-Effective hit, another Aura-bearer nullifying it, the Lake Guardians At-Will, a paired rival, the Godslayer Gift…). Auras disabled this way take 24 hours to fully restore.";

/* per-legendary Domains (auras) the book attributes. Keyed by species name; regional/alt forms are
   resolved by stripping a trailing form word (see legendaryAurasFor). */
const LEGENDARY_AURAS = {
  // Legendary Birds
  "Articuno":["Oceans","War","Storms"], "Zapdos":["Oceans","War","Storms"], "Moltres":["Oceans","War","Storms"],
  // Legendary Beasts
  "Raikou":["Loyalty","Peace","Storms"], "Entei":["Loyalty","Peace","Storms"], "Suicune":["Loyalty","Peace","Storms"],
  "Celebi":["Nature","Law","Time"],
  // The Golems / Regis
  "Regirock":["Creation","Loyalty","Matter"], "Regice":["Creation","Loyalty","Matter"], "Registeel":["Creation","Loyalty","Matter"],
  "Jirachi":["Creativity","Dreams","Luck"],
  // Eon Duo
  "Latias":["Love","Heroism","Fate"], "Latios":["Love","Heroism","Fate"],
  // Lake Guardians (shared Law/Loyalty + one each)
  "Uxie":["Law","Loyalty","Knowledge"], "Mesprit":["Law","Loyalty","Emotion"], "Azelf":["Law","Loyalty","Willpower"],
  // Sea Guardians
  "Manaphy":["Oceans","Luck","Peace"], "Phione":["Oceans","Luck","Peace"],
  "Shaymin":["Nature","Rejuvenation","Trickery"],
  // Swords of Justice
  "Cobalion":["Heroism","Loyalty","Law"], "Terrakion":["Heroism","Loyalty","Law"], "Virizion":["Heroism","Loyalty","Law"], "Keldeo":["Heroism","Loyalty","Law"],
  // Kami Trio
  "Tornadus":["Rejuvenation","Sky","Storms"], "Thundurus":["Rejuvenation","Sky","Storms"], "Landorus":["Rejuvenation","Sky","Storms"],
  "Meloetta":["Creativity","Love","Peace"],
  "Diancie":["Creation","Luck","Peace"],
  // Upper Pantheon
  "Mew":["Love","Life","Creation"],
  "Ho-Oh":["Rivalry","Sky","Life"], "Lugia":["Rivalry","Oceans","Storms"],
  // Weather Trio
  "Groudon":["Creation","Matter","Primal Weather"], "Kyogre":["Creation","Matter","Primal Weather"], "Rayquaza":["Creation","Matter","Primal Weather"],
  // Creation Trio
  "Palkia":["Chaos","Creation","Matter"], "Dialga":["Creation","Law","Time"], "Giratina":["Creation","Death","Law"],
  // Lunar Duo
  "Cresselia":["Dreams","Fate","Heroism"], "Darkrai":["Dreams","Fate","Nightmare"],
  "Heatran":["Chaos","Destruction","War"],
  "Regigigas":["Creation","Life","Matter"],
  "Victini":["Fate","Heroism","War"],
  // Tao Trio
  "Reshiram":["Equilibrium","Heroism","Rivalry"], "Zekrom":["Equilibrium","Heroism","Rivalry"], "Kyurem":["Fate","Peace","Solitude"],
  // Mortality Duo
  "Xerneas":["Life","Rivalry","War"], "Yveltal":["Death","Rivalry","War"],
  "Zygarde":["Devourer","Predator","Trickery"],
  // Outsiders
  "Mewtwo":["Loyalty","Symbiotic","Chaos","Destruction","War"],   // book: (Loyalty, Symbiotic) OR (Chaos, Destruction), + War
  "Deoxys":["Life","Pathogen","Storms"],
  "Genesect":["Nature","Predator","Trickery"],                    // book says "Land" — represented as Nature
  "Missingno":["Chaos","Creation","Glitch"], "MissingNo":["Chaos","Creation","Glitch"],
  "Unown":["Hivemind","Law","Trickery"],
  "Arceus": AURA_NAMES.slice(),                                   // Arceus has access to every Aura
  // Beyond the book (GM attribution, not printed in The Blessed and the Damned)
  "Magearna":["Creation","Life","Love"],
  // Homebrew: the created Fire/Ghost legendary. Symbiotic is permanent (the bond to Lázaro);
  // Nightmare & Death wake as it levels; it also owns Emotion & Willpower to swap in.
  "Vulpoxen":["Symbiotic","Nightmare","Death","Emotion","Willpower"],
  // Homebrew Pantheon entry (The Blessed and the Damned): a mortal's tyrant-sword reforged into a
  // living blade of hatred that feeds on the hostility it provokes.
  "Chien-Pao":["Ruin","War","Storms"],
};
/* short GM notes for a few legendaries with book caveats */
const LEGENDARY_AURA_NOTES = {
  "Mewtwo":"The book gives an either/or: keep either (Loyalty, Symbiotic) OR (Chaos, Destruction), plus War. All are listed — trim to the three that fit this Mewtwo.",
  "Genesect":"The book lists a 'Land' Domain with no defined rules; it is represented here as the Nature Aura.",
  "Arceus":"Arceus has access to every Legendary Aura, but only three may be active at once.",
  "Uxie":"Lake Guardian: shares Law & Loyalty with Mesprit/Azelf; its third Domain is Knowledge.",
  "Mesprit":"Lake Guardian: shares Law & Loyalty with Uxie/Azelf; its third Domain is Emotion.",
  "Azelf":"Lake Guardian: shares Law & Loyalty with Uxie/Mesprit; its third Domain is Willpower.",
  "Magearna":"Not covered by The Blessed and the Damned (Gen 7 Mythical) — Domains attributed here: Creation (an artificial body crafted 500 years ago and given a true soul), Life (the Soul-Heart holds and returns life energy), Love (built to serve and adore its princess; its Fairy heart binds those who strike it). Treat as Lower Pantheon unless your Magearna is the original.",
  "Vulpoxen":"Homebrew. Core three: Symbiotic (permanent — the bond to Lázaro, undone only by slaying one of the pair), Nightmare (wakes ~Lv 30), and Death (opens ~Lv 50). It also owns Emotion & Willpower; only three may be active at once.",
  "Chien-Pao":"Homebrew Pantheon entry (Upper Pantheon, so it qualifies for a Pact Gift — drop to Lower Pantheon if you'd rather treat the Treasures of Ruin as regional). Domains: Ruin (new Aura, above), War, Storms.",
};
const LEGENDARY_AURA_MAP = {};
Object.entries(LEGENDARY_AURAS).forEach(([k,v])=>{ LEGENDARY_AURA_MAP[auraKey(k)] = v; });
const LEGENDARY_AURA_NOTE_MAP = {};
Object.entries(LEGENDARY_AURA_NOTES).forEach(([k,v])=>{ LEGENDARY_AURA_NOTE_MAP[auraKey(k)] = v; });
/* every legendary/mythical species (book-covered + later gens) — decides whether the Auras section
   is offered at all. Uncovered ones simply start with no auras and a GM add-picker. */
const LEGENDARY_SPECIES = new Set([
  "Articuno","Zapdos","Moltres","Mewtwo","Mew",
  "Raikou","Entei","Suicune","Lugia","Ho-Oh","Celebi",
  "Regirock","Regice","Registeel","Latias","Latios","Kyogre","Groudon","Rayquaza","Jirachi","Deoxys",
  "Uxie","Mesprit","Azelf","Dialga","Palkia","Heatran","Regigigas","Giratina","Cresselia","Phione","Manaphy","Darkrai","Shaymin","Arceus",
  "Victini","Cobalion","Terrakion","Virizion","Tornadus","Thundurus","Reshiram","Zekrom","Landorus","Kyurem","Keldeo","Meloetta","Genesect",
  "Xerneas","Yveltal","Zygarde","Diancie","Hoopa","Volcanion","Missingno","MissingNo","Unown",
  "Type: Null","Silvally","Tapu Koko","Tapu Lele","Tapu Bulu","Tapu Fini","Cosmog","Cosmoem","Solgaleo","Lunala","Necrozma",
  "Nihilego","Buzzwole","Pheromosa","Xurkitree","Celesteela","Kartana","Guzzlord","Poipole","Naganadel","Stakataka","Blacephalon",
  "Magearna","Marshadow","Zeraora","Meltan","Melmetal",
  "Zacian","Zamazenta","Eternatus","Kubfu","Urshifu","Zarude","Regieleki","Regidrago","Glastrier","Spectrier","Calyrex","Enamorus",
  "Wo-Chien","Chien-Pao","Ting-Lu","Chi-Yu","Koraidon","Miraidon","Okidogi","Munkidori","Fezandipiti","Ogerpon","Terapagos","Pecharunt",
].map(auraKey));
const FORM_SUFFIXES = new Set(["galarian","alolan","hisuian","paldean","origin","altered","therian","incarnate",
  "black","white","dawn","dusk","ultra","primal","mega","crowned","hero","ice","shadow","rider","zen",
  "sky","land","resolute","pirouette","unbound","confined","complete","10","50","therian","aria","step","blade","shield"]);
/* auras a species starts with (book attribution), tolerant of regional/alt-form naming */
function legendaryAurasFor(name){
  const toks = String(name||"").trim().split(/\s+/);
  for(let i=toks.length; i>=1; i--){
    const cand = auraKey(toks.slice(0,i).join(""));
    if(LEGENDARY_AURA_MAP[cand]) return LEGENDARY_AURA_MAP[cand].slice();
    // also allow stripping a trailing form word then matching the rest
  }
  // fall back: drop a trailing form suffix word and retry the full remainder
  if(toks.length>1 && FORM_SUFFIXES.has(toks[toks.length-1].toLowerCase())){
    const base = auraKey(toks.slice(0,-1).join(""));
    if(LEGENDARY_AURA_MAP[base]) return LEGENDARY_AURA_MAP[base].slice();
  }
  const whole = auraKey(name);
  return LEGENDARY_AURA_MAP[whole] ? LEGENDARY_AURA_MAP[whole].slice() : [];
}
function isLegendarySpeciesName(name){
  if(!name) return false;
  const toks = String(name).trim().split(/\s+/);
  if(LEGENDARY_SPECIES.has(auraKey(name))) return true;
  if(toks.length>1 && LEGENDARY_SPECIES.has(auraKey(toks.slice(0,-1).join("")))) return true;
  return legendaryAurasFor(name).length>0;
}
function auraNoteFor(name){
  const toks = String(name||"").trim().split(/\s+/);
  return LEGENDARY_AURA_NOTE_MAP[auraKey(name)]
      || (toks.length>1 ? LEGENDARY_AURA_NOTE_MAP[auraKey(toks.slice(0,-1).join(""))] : null)
      || null;
}
/* one aura as a collapsible row (name + full rules text); optional remove button for the editor.
   `p`+`rerender` (when given) add an Active/Disabled toggle that drives the +2 CS bonus. */
function auraRow(an, onRemove, p, rerender){
  const a = auraByKey.get(auraKey(an));
  const active = p ? auraIsActive(p, an) : false;
  const row = el("details",{class:"spoiler",open:active});
  const sum = el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, a?a.name:an));
  if(p && rerender) sum.append(el("button",{class:"linkbtn h-act", style:active?"color:var(--good)":"color:var(--muted)",
    title:"Toggle whether this Aura is currently active (grants +2 to every Combat Stage while active; "
         +`at most ${AURA_MAX_ACTIVE} may be active at once)`,
    onclick:e=>{ e.preventDefault(); toggleAuraActive(p, an, rerender); }}, active?"● Active":"○ Disabled"));
  if(onRemove) sum.append(el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove",
    onclick:e=>{ e.preventDefault(); onRemove(); }},"×"));
  row.append(sum);
  row.append(el("div",{class:"small",style:"margin-top:6px;white-space:pre-wrap"},
    a?a.desc:"Not a recognised Aura — GM-defined."));
  return row;
}
/* Legendary Auras card for the Pokémon Play tab (styled like the Abilities card) */
/* Legendary Auras card. `rerender` = how to persist+redraw for the context it's mounted in
   (encounter tab passes saveEnc()+renderEncounters(); defaults to the party-Pokémon path). */
function aurasCard(p, sp, rerender){
  const rr = rerender || (()=>{ save(); refreshMon(p); });
  if(!Array.isArray(p.auras)){ p.auras = legendaryAurasFor(p.species); initAuraActive(p); }
  if(!p.auraActive) initAuraActive(p);   // migrate sheets saved before Auras carried a Combat Stage
  const card = el("div",{class:"card"}, el("h3",{},
    `Legendary Auras (${activeAuraCount(p)}/${p.auras.length} active)`,
    el("div",{class:"inline"},
      el("button",{class:"linkbtn h-act",title:"reset to this species' book Domains",
        onclick:()=>{ p.auras = legendaryAurasFor(p.species); initAuraActive(p); rr(); }},"↺ default"),
      el("button",{class:"linkbtn h-act",onclick:()=>addAura(p, rr)},"+ add"))));
  const note = auraNoteFor(p.species);
  if(note) card.append(el("div",{class:"small muted",style:"margin-bottom:6px",html:"ℹ "+note}));
  // "how auras work" reference
  const rules = el("details",{class:"spoiler"});
  rules.append(el("summary",{}, el("span",{class:"muted small",style:"font-weight:700"},"How Legendary Auras work")));
  rules.append(el("div",{class:"small",style:"margin-top:6px;white-space:pre-wrap"}, AURA_RULES));
  card.append(rules);
  if(!p.auras.length) card.append(el("span",{class:"muted small"},"none — tap “+ add” to give this legendary its Domains."));
  p.auras.forEach((an,i)=>card.append(auraRow(an, ()=>{ p.auras.splice(i,1); delete p.auraActive[auraKey(an)]; rr(); }, p, rr)));
  return card;
}
function addAura(p, rerender){
  const rr = rerender || (()=>{ save(); refreshMon(p); });
  if(!Array.isArray(p.auras)) p.auras = [];
  const names = AURA_NAMES.filter(n=>!p.auras.some(a=>auraKey(a)===auraKey(n)));
  if(!names.length){ toast("This Pokémon already has every Aura"); return; }
  openPicker("Add a Legendary Aura", names, name=>{
    if(!p.auras.some(a=>auraKey(a)===auraKey(name))){ p.auras.push(name); rr(); }
  });
}
function abilitiesCard(p, sp){
  if(!Array.isArray(p.abilities)) p.abilities = [];
  const card = el("div",{class:"card"}, el("h3",{},`Abilities (${p.abilities.length})`,
    el("div",{class:"inline"}, unlockToggle(p),
      el("button",{class:"linkbtn h-act",onclick:()=>addAbility(p, sp)},"+ add"))));
  const grant = poltergeistGrant(p, sp);
  if(grant){
    const gab = abilityByName.get(grant.ability.toLowerCase());
    const grow = el("details",{class:"spoiler"});
    grow.append(el("summary",{}, el("span",{style:"color:var(--ink)"}, grant.ability),
      el("span",{class:"muted small",style:"margin-left:8px"},"from Poltergeist — this Form")));
    grow.append(el("div",{class:"small",style:"margin-top:6px", html: gab? abilityText(gab):"<span class='muted'>Not in database</span>"}));
    card.append(grow);
  }
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
  p.level = nl; autoAllocMom(p); save(); refreshMon(p);
  if(nl > was) toast(`${p.nickname||getSpecies(p.species)?.name||"Pokémon"} leveled up to ${nl}! 🎉`);
}
/* set level directly → snap XP to that level's threshold so future XP still works */
function setMonLevel(p, lvl){
  p.level = Math.max(1, Math.min(MAX_LEVEL, Math.floor(lvl)||1));
  p.xp = xpForLevel(p.level); autoAllocMom(p); save(); refreshMon(p);
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
  const auto = !!getSpecies(p.species)?.autoStats;   // "Mom?": points auto-assigned, not player-editable
  if(auto) autoAllocMom(p);
  const d = pokeDerived(p);
  const canInc = !auto && (p.unlocked || d.remaining > 0);
  const g = el("div",{class:"statgrid"});
  STATS.forEach(([k,lbl]) => {
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"sub","data-pbase":k}, `base ${d.base[k]}`));
    if(auto) box.append(el("div",{class:"stepper", title:"auto-assigned on level up — locked"},
      el("span",{class:"stepper-val",style:"opacity:.7"}, "+"+(p.stats[k].added||0))));
    else box.append(statStepper(p.stats[k].added, canInc, v=>{ p.stats[k].added = v; save(); refreshMon(p); }));
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
  const ms = luStatAlloc(t).total;                // assigned Level-Up milestone Bonus-Stats (Atk/SpAtk)
  const budget = (t.level||1) + 9 + bonus + ms;
  const spent = STATS.reduce((s,[k]) => s + (t.combat[k].added||0), 0);
  return { budget, spent, remaining: budget - spent, bonus, ms };
}
function trainerBudgetText(tb){
  const over = tb.remaining < 0;
  const parts = [];
  if(tb.bonus) parts.push(`${tb.bonus} feature tags`);
  if(tb.ms)    parts.push(`${tb.ms} milestone`);
  const bonusNote = parts.length ? ` (${(tb.budget - tb.bonus - tb.ms)}+${parts.join("+")})` : "";
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
function matchupCard(types, p){
  types = (types||[]).filter(t=>t && t!=="None");   // drop the empty second slot
  const mods = p ? defenseTypeMods(p) : null;        // Static defensive abilities (Thick Fat, Levitate…)
  const eff = typeEffectiveness(types, mods);
  const card = el("div",{class:"card"}, el("h3",{},"Type Matchups",
    el("span",{class:"muted small"}, types.join(" / "))));
  const groups = [
    ["Weak to (×1.5+)", v=>v>1, "x2"],
    ["Resists (×½−)", v=>v<1&&v>0, "x50"],
    ["Immune (×0)", v=>v===0, "x0"],
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
  if(mods && mods.why.length) card.append(el("div",{class:"small",style:"margin-top:8px;color:var(--accent);font-weight:600"},
    "⚙ Adjusted by "+mods.why.join(" · ")));
  return card;
}
/* standard PTU movement-capability meanings — these aren't separate DB entries (they're just
   numbers on the species), so hover text is hand-written instead of looked up */
const CAP_MOVE_HELP = {
  Overland: "Movement Capability — squares this Pokémon can move per Shift Action while walking or running on land.",
  Sky: "Movement Capability — squares this Pokémon can move per Shift Action while flying.",
  Swim: "Movement Capability — squares this Pokémon can move per Shift Action while swimming.",
  Levitate: "Movement Capability — squares this Pokémon can move per Shift Action while hovering just above the ground or water.",
  Burrow: "Movement Capability — squares this Pokémon can move per Shift Action while tunneling underground.",
  Jump: "High Jump / Long Jump — squares this Pokémon can jump vertically / horizontally as part of its movement.",
  Power: "Power Capability — how much this Pokémon can lift, carry and break through by brute force.",
};
/* hover/expand text for a named capability (Naturewalk, Amorphous, Levitate the ability, …) —
   these live in D.items.capabilities alongside held items/food, keyed lowercase */
function capabilityHelp(name){
  const it = itemByName.get(String(name||"").split("(")[0].trim().toLowerCase());
  return it?.effect || "";
}
function capsSkillsCard(sp){
  const card = el("div",{class:"card"}, el("h3",{},"Capabilities & Skills"));
  const cap = sp.capabilities;
  const caps = [];
  if(cap.overland) caps.push([`Overland ${cap.overland}`, CAP_MOVE_HELP.Overland]);
  if(cap.sky) caps.push([`Sky ${cap.sky}`, CAP_MOVE_HELP.Sky]);
  if(cap.swim) caps.push([`Swim ${cap.swim}`, CAP_MOVE_HELP.Swim]);
  if(cap.levitate) caps.push([`Levitate ${cap.levitate}`, CAP_MOVE_HELP.Levitate]);
  if(cap.burrow) caps.push([`Burrow ${cap.burrow}`, CAP_MOVE_HELP.Burrow]);
  caps.push([`Jump ${cap.highJump}/${cap.longJump}`, CAP_MOVE_HELP.Jump], [`Power ${cap.power}`, CAP_MOVE_HELP.Power]);
  if(cap.naturewalk?.length) caps.push([`Naturewalk (${cap.naturewalk.join(", ")})`, capabilityHelp("Naturewalk")]);
  (cap.other||[]).forEach(o=>caps.push([o, capabilityHelp(o)]));
  const chips = el("div",{class:"chips"});
  caps.forEach(([label,help])=>chips.append(el("span",{class:"chip",title:help||""},label)));
  card.append(chips);
  if(sp.skills && Object.keys(sp.skills).length){
    const sk = el("div",{class:"chips",style:"margin-top:8px"});
    SKILLS.forEach(([k,lbl])=>{ const s=sp.skills[k]; if(s){ const mod=parseInt((s.mod||"").replace(/\s/g,""))||0;
      sk.append(el("button",{class:"kv",style:"cursor:pointer;border:none",title:`roll ${lbl}`,
        onclick:()=>rollSkill(lbl, s.dice, mod)}, `🎲 ${lbl} ${s.dice}d6${s.mod&&s.mod!=="+0"?s.mod:""}`)); } });
    card.append(sk);
  }
  return card;
}
const MOVE_LIMIT = 6;
/* Guidance (Feature, prereq Mentor, Static): "Your Pokémon's base Move List limit is increased by +1." */
function effectiveMoveLimit(t){ return MOVE_LIMIT + ((t?.features||[]).includes("Guidance") ? 1 : 0); }
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
/* ---------- TM/HM eligibility ----------
   TM/HM entries look like "06 Toxic" / "A4 Strength" — strip the index prefix to get the move name.
   A Pokémon is eligible for a TM if the move is in its (or a pre-evolution's) TM/HM list. */
function tmMoveName(raw){ return String(raw||"").replace(/^[A-Z]*\d+\s+/,"").trim(); }
function speciesLearnsTM(sp, moveName){
  if(!sp) return false;
  const t = String(moveName||"").trim().toLowerCase();
  return speciesLineBackTo(sp).some(s => (s.moves?.tmhm||[]).some(x => tmMoveName(x).toLowerCase() === t));
}
/* the active character's Pokémon that can learn `moveName` from a TM/HM */
function partyEligibleForTM(moveName){
  const c = activeChar(); if(!c) return [];
  return (c.pokemon||[]).map(p=>({p, sp:getSpecies(p.species)}))
    .filter(x => speciesLearnsTM(x.sp, moveName));
}
/* teach a TM move to one Pokémon (respects the move limit unless 🔓) */
function teachTM(p, mn){
  if((p.moves||[]).some(x=>String(x).toLowerCase()===mn.toLowerCase())){ toast("Already knows "+mn); return; }
  const limit = effectiveMoveLimit(activeChar().trainer);
  if(!p.unlocked && p.moves.length>=limit){ toast(`${p.nickname||getSpecies(p.species)?.name||"It"} is at the move limit (${limit}) — free a slot or tick 🔓`); return; }
  p.moves.push(mn); save();
  toast(`${p.nickname||getSpecies(p.species)?.name||"Pokémon"} learned ${mn} ✓`);
  if(openMon===p.id) renderPokemon();
  showTMEligibility(mn);   // refresh the open modal
}
/* modal: which of my Pokémon can learn this TM move, with a Teach button */
function showTMEligibility(moveName){
  const mn = tmMoveName(moveName);
  const m = moveByName.get(mn.toLowerCase());
  const elig = partyEligibleForTM(mn);
  const wrap = el("div",{});
  wrap.append(el("div",{class:"r-meta",style:"margin-bottom:8px"},
    `Your Pokémon that can learn ${mn} via TM/HM`));
  if(m) wrap.append(el("div",{class:"small",style:"margin-bottom:12px",html:moveDetailHTML(m,mn)}));
  if(!elig.length){
    wrap.append(el("div",{class:"muted"},"None of your Pokémon can learn this TM/HM."));
  } else elig.forEach(({p,sp})=>{
    const knows = (p.moves||[]).some(x=>String(x).toLowerCase()===mn.toLowerCase());
    const row = el("div",{class:"inline",style:"gap:10px;align-items:center;margin-top:8px"});
    row.append(monSprite(sp?.name||p.species, p.shiny, "s-sm", monImage(p)));
    row.append(el("div",{style:"flex:1;min-width:0"},
      el("div",{style:"font-weight:700"}, p.nickname||sp?.name||p.species),
      el("div",{class:"small muted"}, `${sp?.name||""} · Lv ${p.level} · ${p.onTeam?"team":"box"}`)));
    if(knows) row.append(el("span",{class:"kv",style:"color:var(--good)"},"✓ knows it"));
    else if(mode!=="cloud" || canEditActive()) row.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",
      onclick:()=>teachTM(p,mn)},"Teach"));
    wrap.append(row);
  });
  modal({title:`TM/HM: ${mn}`, bodyNode:wrap, footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]});
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
/* Rotom's 6 Appliance forms (Core/Gen canon) — the DB has these as separate species entries (plus a
   pile of duplicate-name variants from the spreadsheet import, e.g. "Rotom-H"/"Rotom (H)"; these 6
   plain names are the canonical ones surfaced in the switcher). Switching is at-will, not an
   evolution — same Pokémon, keeps stats/moves/level, only species (→ typing/base stats) changes. */
const ROTOM_FORMS = ["Rotom","Rotom Heat","Rotom Wash","Rotom Frost","Rotom Fan","Rotom Mow"];
function isRotomForm(sp){ return !!sp && ROTOM_FORMS.includes(sp.name); }
function rotomFormControl(p, sp, onChanged){
  if(!isRotomForm(sp)) return el("span",{style:"display:none"});
  const wrap = el("div",{class:"inline small",style:"margin:2px 0 8px;flex-wrap:wrap;gap:8px;align-items:center"});
  wrap.append(el("span",{class:"muted",style:"font-weight:700"},"Rotom Form:"));
  const sel = el("select",{style:"padding:4px 6px"});
  ROTOM_FORMS.forEach(n=>sel.append(el("option",{value:n,selected:sp.name===n}, n)));
  sel.addEventListener("change",()=>{
    if(sel.value===sp.name) return;
    p.species = sel.value;
    if(!p.abilities || !p.abilities.length){ const nsp=getSpecies(p.species); if(nsp?.abilities?.basic?.[0]) p.abilities=[nsp.abilities.basic[0]]; }
    onChanged();
  });
  wrap.append(sel, el("span",{class:"muted small"},"switch at will — same Pokémon, keeps stats/moves/level"));
  return wrap;
}
/* Poltergeist (Ability, Static): "Rotom gains an Ability and a Move depending on what Form it has
   taken. This Move cannot be forgotten or replaced in any way." Both are derived live from the
   current species (not stored on the Pokémon) so switching Appliance form updates them for free. */
const ROTOM_POLTERGEIST = {
  "Rotom":       { ability:"Levitate",    move:"Thunder Shock" },
  "Rotom Heat":  { ability:"Levitate",    move:"Overheat" },
  "Rotom Wash":  { ability:"Aqua Boost",  move:"Hydro Pump" },
  "Rotom Frost": { ability:"Frostbite",   move:"Blizzard" },
  "Rotom Fan":   { ability:"Keen Eye",    move:"Air Slash" },
  "Rotom Mow":   { ability:"Grass Pelt",  move:"Leaf Storm" },
};
function poltergeistGrant(p, sp){
  if(!sp || !(p.abilities||[]).some(a=>(a||"").toLowerCase()==="poltergeist")) return null;
  return ROTOM_POLTERGEIST[sp.name] || null;
}
/* effective type of a move after ability overrides (e.g. Normalize → Normal) */
/* "−ate" abilities: a damaging Normal-Type Move is re-typed (Core p.199). Order matters — Normalize
   (everything becomes Normal) wins over these if a Pokémon somehow has both. */
const ATE_ABILITIES = [
  ["Aerilate","Flying"], ["Pixilate","Fairy"], ["Galvanize","Electric"],
  ["Refridgerate","Ice"], ["Refrigerate","Ice"],   // DB carries the "Refridgerate" typo; accept both
];
/* Does an "−ate" ability apply to this move? → {ability, type} or null. A move qualifies only if it's
   a damaging Normal-Type Move (Struggle counts) and the Pokémon isn't running Normalize. */
function ateInfo(p, m){
  if(hasAbility(p, "Normalize")) return null;
  const baseType = (m && m.type) || "Normal";
  const damaging = /phys|spec/i.test(m?.class||"") || m?.damageBase!=null;
  if(baseType!=="Normal" || !damaging) return null;
  for(const [ab,ty] of ATE_ABILITIES) if(hasAbility(p, ab)) return {ability:ab, type:ty};
  return null;
}
function effectiveMoveType(p, m, opts={}){
  if(hasAbility(p, "Normalize")) return "Normal";
  if(!opts.noAte){ const a = ateInfo(p, m); if(a) return a.type; }   // −ate re-types Normal moves (togglable in openMoveRoll)
  return (m && m.type) || "Normal";
}
/* Struggle as it should actually resolve: base move + chosen type/class (Normalize forces Normal) */
function struggleFor(p, sp){
  if(getSpecies(p.species)?.noStruggle) return null;   // "Mom?" has no Struggle Attack
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
  if(getSpecies(p.species)?.noStruggle) return el("span",{style:"display:none"});   // "Mom?" — no Struggle
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
  if(opts.onFav) slot.append(el("button",{class:"actstar"+(opts.faved?" on":""),style:"align-self:center;margin-right:0",
    title:opts.faved?"unpin favourite":"pin favourite",onclick:e=>{e.stopPropagation();opts.onFav();}}, opts.faved?"★":"☆"));
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
  const limit = effectiveMoveLimit(activeChar().trainer);
  const n = p.moves.length, over = n > limit;
  const atLimit = !p.unlocked && n >= limit;
  const addBtn = el("button",{class:"linkbtn h-act", disabled:atLimit,
    style: atLimit?"opacity:.4;cursor:not-allowed":"",
    onclick: atLimit? null : ()=>openMovePicker(p,sp)}, "+ add move");
  const card = el("div",{class:"card"}, el("h3",{},
    el("span",{class:over?"":"", style:over?"color:var(--bad)":""}, `Moves (${n}/${limit})`),
    el("div",{class:"inline"}, unlockToggle(p), addBtn)));
  // Struggle is always available and does not count toward the limit
  const st = struggleFor(p, sp);
  if(st){ card.append(struggleControl(p, sp)); card.append(moveSlot(p, sp, st, st.name, {tag:"default"})); }
  // Poltergeist's granted Move — fixed to the current Rotom Form, can't be forgotten/replaced/counted
  const grant = poltergeistGrant(p, sp);
  if(grant){ const gm = moveByName.get(grant.move.toLowerCase());
    if(gm) card.append(moveSlot(p, sp, gm, gm.name, {tag:"Poltergeist"})); }
  if(!p.moves.length) card.append(el("span",{class:"muted small"},"no moves selected yet"));
  // favourites (tap ☆) sort to the top; splice by the original index so removal stays correct
  const favSet = new Set(p.fav||[]);
  [...p.moves].map((mn,i)=>({mn,i}))
    .sort((a,b)=>(favSet.has(b.mn)?1:0)-(favSet.has(a.mn)?1:0))
    .forEach(({mn,i})=>{
      const m = moveByName.get(mn.toLowerCase());
      card.append(moveSlot(p, sp, m, mn, {
        faved: favSet.has(mn),
        onFav: ()=>{ p.fav = toggleSet(favSet, mn); save(); refreshMon(p); },
        onRemove: ()=>{ p.moves.splice(i,1); if(p.fav) p.fav=p.fav.filter(x=>x!==mn); save(); refreshMon(p); }
      }));
    });
  if(atLimit) card.append(el("div",{class:"small muted",style:"margin-top:6px"},
    `Move limit reached (${limit}). Tick “🔓 GM: allow any” to add more.`));
  else if(over) card.append(el("div",{class:"warnbox",style:"margin-top:6px"},
    `Over the normal ${limit}-move limit (GM override).`));
  return card;
}
/* Freeform move/action notes for anything the data pipeline couldn't scan (homebrew moves,
   GM rulings…). Doesn't count toward MOVE_LIMIT — it's notes, not a real DB move. */
function openCustomMoveEditor(p, existing, rerender){
  const nm = el("input",{type:"text",placeholder:"e.g. Homebrew Rock Throw",value:existing?.name||""});
  const eff = el("textarea",{rows:5,placeholder:"What it does — notes, rulings, anything we couldn't auto-import."});
  eff.value = existing?.effect||"";
  const body = el("div",{},
    el("label",{class:"field"}, el("span",{},"Name"), nm),
    el("label",{class:"field",style:"margin-top:8px"}, el("span",{},"Effect / notes"), eff));
  modal({title: existing?"Edit custom move":"Add a custom move", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      const name = nm.value.trim(); if(!name) return;
      if(!Array.isArray(p.customMoves)) p.customMoves=[];
      if(existing){ existing.name=name; existing.effect=eff.value.trim(); }
      else p.customMoves.push({ id:uid(), name, effect:eff.value.trim() });
      save(); closeModal(); rerender();
    }},"Save"),
  ]});
}
function customMovesCard(p, rerender){
  if(!Array.isArray(p.customMoves)) p.customMoves=[];
  const card = el("div",{class:"card"}, el("h3",{},"Custom Moves & Notes",
    el("span",{class:"muted small"},"anything we couldn't auto-scan")));
  if(!p.customMoves.length) card.append(el("div",{class:"muted small"},"None yet — add a homebrew move, item-granted attack, or any GM ruling worth remembering."));
  p.customMoves.forEach(a=>{
    const d=el("details",{class:"spoiler"});
    d.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, a.name),
      el("span",{class:"muted small",style:"margin-left:8px"}, "custom")));
    d.append(el("div",{class:"small",style:"margin-top:6px;white-space:pre-wrap"}, a.effect||"(no notes)"));
    d.append(el("div",{class:"inline",style:"margin-top:6px;gap:10px"},
      el("button",{class:"linkbtn",onclick:()=>openCustomMoveEditor(p,a,rerender)},"edit"),
      el("button",{class:"linkbtn danger",onclick:()=>{ p.customMoves=p.customMoves.filter(x=>x.id!==a.id); save(); rerender(); }},"remove")));
    card.append(d);
  });
  card.append(el("button",{class:"linkbtn h-act",style:"margin-top:6px",onclick:()=>openCustomMoveEditor(p,null,rerender)},"+ Add custom move"));
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
/* Roll a Skill check: Nd6 (+ optional flat mod), shown with each die and the total (Core p.24). */
function rollSkill(label, nDice, mod){
  nDice = Math.max(1, nDice||1); mod = mod||0;
  const rolls=[]; for(let i=0;i<nDice;i++) rolls.push(1+Math.floor(Math.random()*6));
  const sum=rolls.reduce((a,b)=>a+b,0), total=sum+mod;
  const body = el("div",{},
    el("div",{style:"font-size:30px;font-weight:800;text-align:center;margin:4px 0"}, String(total)),
    el("div",{class:"small muted",style:"text-align:center"}, `${nDice}d6${mod?(mod>0?"+"+mod:mod):""}`),
    el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px;justify-content:center;margin-top:10px"},
      ...rolls.map(r=>el("span",{class:"kv",style:"font-weight:800"}, String(r)))),
    mod?el("div",{class:"small muted",style:"text-align:center;margin-top:6px"}, `dice ${sum} + ${mod} = ${total}`):"");
  modal({title:`🎲 ${label}`, bodyNode:body, footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"OK")]});
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
/* ===================================================================
   Move effect thresholds (#4) — many moves have extra effects that only
   trigger on a high Accuracy roll ("on 15+", "16 or higher", an Effect
   Range). Pull those numbers + their sentence out of the free-text effect
   so the roll can flag when it lands. Heuristic over inconsistent text.
=================================================================== */
function effectThresholds(text){
  if(!text) return [];
  const res = [], seen = new Set();
  const push = (n, sent)=>{ n=+n; if(n>=2 && n<=20){ sent=sent.trim().replace(/\s+/g," ");
    const key = n+"|"+sent.slice(0,24); if(!seen.has(key)){ seen.add(key); res.push({ n, text:sent }); } } };
  // split into sentences/clauses so each threshold keeps its own explanation
  text.split(/(?<=[.;:])\s+|\n+/).forEach(s=>{
    let m;
    // "N+"  (space before, boundary after so damage like "2d6+8" or "+5" don't match)
    const re1 = /(?:^|[\s(])(\d{1,2})\+(?=[\s.,;:)]|$)/g;
    while(m = re1.exec(s)) push(m[1], s);
    // "N or higher/greater/more", "roll of N or higher"
    const re2 = /(?:^|[\s(])(?:roll(?:s|ed)?\s+(?:of\s+|a\s+)?)?(\d{1,2})\s+or\s+(?:higher|greater|more|better)/gi;
    while(m = re2.exec(s)) push(m[1], s);
  });
  return res.sort((a,b)=>a.n-b.n);
}
/* ---- Damage-automation helpers (Core p.199 ability texts + p.235/242) ---- */
const IRON_FIST_MOVES = new Set(["Bullet Punch","Comet Punch","Dizzy Punch","Drain Punch","Dynamic Punch",
  "Fire Punch","Meteor Mash","Shadow Punch","Ice Punch","Mach Punch","Mega Punch","Sky Uppercut",
  "Thunder Punch","Focus Punch","Hammer Arm","Power-Up Punch"].map(s=>s.toLowerCase()));
function isFiveStrike(m){ return /five\s*strike/i.test(m?.range||""); }
function isDoubleStrike(m){ return /double\s*strike/i.test(m?.range||""); }
/* Critical Hit Range (Core p.235): natural 20 always crits; some moves/abilities lower the
   threshold. Compared against the natural (un-modified) Accuracy die. */
function critThreshold(p, m){
  let t = 20;
  const own = /critical hit (?:range )?(?:is |on )?(\d{1,2})[+-]/i.exec(m?.effect || "");
  if(own) t = Math.min(t, +own[1]);
  // Super Luck: crits on 18-20; if the Move already has an extended range, widen it by 2 instead.
  if(hasAbility(p,"Super Luck")) t = own ? t - 2 : Math.min(t, 18);
  if(hasAbility(p,"Razor Edge")) t -= /tail/i.test(m?.name||"") ? 3 : 2;
  if(hasAbility(p,"Beam Cannon") && !/^melee/i.test(m?.range||"") && /1 target/i.test(m?.range||"")) t -= 3;
  if(hasAbility(p,"Gore") && /^horn attack$/i.test(m?.name||"")) t = Math.min(t, 18);
  if(hasStatus(p,"brutal")) t -= 1;   // Brutal Training: +1 Crit Range
  return Math.max(2, t);
}
/* Move-name sets for the abilities that boost a specific printed list of Moves (Core p.199). */
const RECKLESS_MOVES     = new Set(["Jump Kick","Hi Jump Kick","High Jump Kick"].map(s=>s.toLowerCase()));
const STRONG_JAW_MOVES   = new Set(["Bite","Bug Bite","Crunch","Fire Fang","Ice Fang","Thunder Fang",
  "Poison Fang","Hyper Fang","Psychic Fangs","Fishious Rend"].map(s=>s.toLowerCase()));
const MEGA_LAUNCHER_MOVES= new Set(["Aura Sphere","Dark Pulse","Dragon Pulse","Water Pulse",
  "Origin Pulse","Terrain Pulse","Heal Pulse"].map(s=>s.toLowerCase()));
/* range-token (keyword) test — PTU stores a Move's keywords inside its `range` string, e.g.
   "Melee, 1 Target, Dash, Recoil 1/3" or "Burst 1, Sonic". */
function moveHasKeyword(m, kw){ return new RegExp("(?:^|,\\s*)"+kw+"\\b","i").test(String(m?.range||"")); }
/* Damage-boosting abilities that auto-apply to a move roll — mirrors buffMods()' shape so it
   composes the same way. thresholds = effectThresholds(m.effect), needed for Sheer Force's
   "has a secondary effect" check. opts carries roll context the caller already computed:
   {stab, mtype, isPhys, isSpec}. */
function abilityDamageMods(p, m, baseDBVal, thresholds, opts={}){
  const mods = { db:0, flat:0, why:[] };
  const mname = (m.name||"").toLowerCase();
  if(hasAbility(p,"Iron Fist") && IRON_FIST_MOVES.has(mname)){
    mods.db += 2; mods.why.push("Iron Fist +2 DB"); }
  if(hasAbility(p,"Technician") && (isFiveStrike(m) || isDoubleStrike(m) || (baseDBVal!=null && baseDBVal<=6))){
    mods.db += 2; mods.why.push("Technician +2 DB"); }
  if(hasAbility(p,"Sheer Force") && thresholds.length){
    mods.db += 2; mods.why.push("Sheer Force +2 DB (secondary effect suppressed)"); }
  if(hasAbility(p,"Sheer Force [Errata]") && thresholds.length){
    mods.flat += 10; mods.why.push("Sheer Force +10 damage (secondary effect suppressed)"); }
  // Adaptability: +1 DB on Moves the user shares a Type with (i.e. STAB moves)
  if(hasAbility(p,"Adaptability") && opts.stab){
    mods.db += 1; mods.why.push("Adaptability +1 DB (STAB)"); }
  // Tough Claws: +2 DB on all Melee Moves
  if(hasAbility(p,"Tough Claws") && moveHasKeyword(m,"melee")){
    mods.db += 2; mods.why.push("Tough Claws +2 DB (Melee)"); }
  // Reckless: +2 DB on Recoil Moves and Jump Kick / Hi Jump Kick
  if(hasAbility(p,"Reckless") && (moveHasKeyword(m,"recoil") || RECKLESS_MOVES.has(mname))){
    mods.db += 2; mods.why.push("Reckless +2 DB"); }
  // Strong Jaw / Iron Fist / Mega Launcher: +2 DB on their printed Move lists
  if(hasAbility(p,"Strong Jaw") && STRONG_JAW_MOVES.has(mname)){
    mods.db += 2; mods.why.push("Strong Jaw +2 DB"); }
  if(hasAbility(p,"Mega Launcher") && MEGA_LAUNCHER_MOVES.has(mname)){
    mods.db += 2; mods.why.push("Mega Launcher +2 DB"); }
  // Punk Rock: +2 DB on Sonic Moves
  if(hasAbility(p,"Punk Rock") && moveHasKeyword(m,"sonic")){
    mods.db += 2; mods.why.push("Punk Rock +2 DB (Sonic)"); }
  // Hustle: +10 to Physical Damage Rolls (its −2 Physical Accuracy lives in abilityAccMods)
  if(hasAbility(p,"Hustle") && opts.isPhys){
    mods.flat += 10; mods.why.push("Hustle +10 damage (Physical)"); }
  // Hustle [Errata]: +10 to ALL Damage Rolls (−2 to all Accuracy)
  if(hasAbility(p,"Hustle [Errata]")){
    mods.flat += 10; mods.why.push("Hustle +10 damage"); }
  return mods;
}
/* Accuracy-modifying abilities that always apply to the user's own attack rolls (Core p.199).
   Returns {acc, why:[]} in the same shape buffMods uses, so it folds into accTot. Conditional /
   ally-targeting accuracy abilities (Victory Star, Teamwork, Frisk's adjacency…) are deliberately
   left out — they can't be auto-resolved without a target/positioning model. */
function abilityAccMods(p, m, isPhys){
  const out = { acc:0, why:[] };
  if(hasAbility(p,"Compound Eyes") || hasAbility(p,"Compoundeyes")){
    out.acc += 3; out.why.push("Compound Eyes +3"); }
  if(hasAbility(p,"Hustle") && isPhys){
    out.acc -= 2; out.why.push("Hustle −2 (Physical)"); }
  if(hasAbility(p,"Hustle [Errata]")){
    out.acc -= 2; out.why.push("Hustle −2"); }
  return out;
}
/* Combat-Stage bonuses a Pokémon's abilities grant based on its CURRENT Status Afflictions
   (Core p.199). These read p.statuses (which the sheet already tracks) so they auto-apply the
   moment the condition is toggled — folded into effectiveCS alongside condition & weather CS.
   Weather-conditional ability CS (Chlorophyll, Solar Power, Swift Swim…) live in WEATHER_DEFS. */
function abilityStatusCS(p){
  const out = { atk:0, def:0, spatk:0, spdef:0, spd:0, acc:0, eva:0 };
  const has = k => hasStatus(p, k);
  const anyStatus = ["burned","frozen","paralysis","poisoned","badlyPoisoned","sleep"].some(has);
  if(hasAbility(p,"Guts") && anyStatus) out.atk += 2;                                   // any of burn/poison/para/freeze/sleep
  if(hasAbility(p,"Toxic Boost") && (has("poisoned")||has("badlyPoisoned"))) out.atk += 2;
  if(hasAbility(p,"Flare Boost") && has("burned")) out.spatk += 2;
  if(hasAbility(p,"Marvel Scale") && (has("sleep")||has("paralysis")||has("burned")||has("frozen")||has("poisoned")||has("badlyPoisoned"))) out.def += 2;
  return out;
}
/* Five Strike (Core p.242): roll 1d8 for hit count, then the Move's Damage Base is multiplied
   by that count. Verified via web search against the PTU 1.05 core text (2026-07-28). */
function fiveStrikeRoll(){
  const d8 = 1+Math.floor(Math.random()*8);
  const hits = d8===1?1 : d8<=3?2 : d8<=6?3 : d8===7?4 : 5;
  return { d8, hits };
}
/* Double Strike / Triple Kick (Core p.242): each strike is its OWN Accuracy Roll. Given the natural
   d20s, the flat Accuracy modifiers and the target's AC + Evasion, work out which strikes connect
   (nat 1 always misses, nat 20 always hits) and which of those crit. threshold==null = can't miss. */
function resolveStrikes(nats, accMod, threshold, critT){
  return nats.map(nat=>{
    const tot = nat + accMod;
    const hit = nat!==1 && (nat===20 || threshold==null || tot >= threshold);
    return { nat, tot, hit, crit: hit && nat >= (critT||20) };
  });
}
/* one-line read-out of a resolveStrikes() result, e.g. "#1: 17 (15) ✓ hit · #2: 4 ✗ miss" */
function strikeReadout(strikes){
  return strikes.map((s,i)=>`#${i+1}: ${s.tot}${s.nat!==s.tot?` (${s.nat})`:""} ${s.crit?"💥 CRIT":s.hit?"✓ hit":"✗ miss"}`).join(" · ");
}
/* Special-case damage moves (PTU 1.05): these bypass the Damage-Base dice entirely and instead
   make the target lose an exact number of Hit Points. compute(ctx) → HP loss, where
   ctx = { level, curHP, vals:{inputKey:value}, die }. `die` (if set) is rolled with the attack. */
const SPECIAL_FIXED_DAMAGE = {
  "Seismic Toss":    {desc:"Target loses HP equal to the user's Level.",           compute:c=>c.level, ignores:"Ignores weakness, resistance & stats — no Defense is subtracted."},
  "Night Shade":     {desc:"Target loses HP equal to the user's Level.",           compute:c=>c.level, ignores:"Ignores weakness, resistance & stats — no Defense is subtracted."},
  "Dragon Rage":     {desc:"Target loses 15 HP (fixed).",                          compute:()=>15,     ignores:"Fixed loss. Special Evasion may avoid it; Mirror Coat can reflect it."},
  "Sonic Boom":      {desc:"Target loses 15 HP (fixed).",                          compute:()=>15,     ignores:"Fixed loss. Special Evasion may avoid it; Mirror Coat can reflect it."},
  "Super Fang":      {desc:"Target loses ½ of its current HP.",                     inputs:[{key:"hp",label:"Target's current HP",def:50,min:0}], compute:c=>Math.floor(c.vals.hp/2)},
  "Nature's Madness":{desc:"Target loses ½ of its current HP.",                     inputs:[{key:"hp",label:"Target's current HP",def:50,min:0}], compute:c=>Math.floor(c.vals.hp/2)},
  "Psywave":         {desc:"Roll 1d4 → ½× / 1× / 1½× / 2× the user's Level.",       die:4, compute:c=>Math.floor([0,c.level/2,c.level,c.level*1.5,c.level*2][c.die||1]), ignores:"Ignores weakness, resistance & stats (Immunity still applies)."},
  "Endeavor":        {desc:"Target loses one Tick (1/10 of its max HP) per Injury the user has.", inputs:[{key:"inj",label:"User's Injuries",def:1,min:0,max:10},{key:"tmax",label:"Target's max HP",def:50,min:1}], compute:c=>c.vals.inj*Math.ceil(c.vals.tmax/10)},
  "Final Gambit":    {desc:"User drops to 0 HP and Faints; target loses HP equal to the user's HP before fainting.", compute:c=>c.curHP, ignores:"1 damage per HP the user lost.", special:"The user is reduced to 0 HP and Faints."},
  "Counter":         {desc:"Foe loses 2× the HP the user lost from the triggering Physical attack.", inputs:[{key:"lost",label:"HP the user lost",def:0,min:0}], compute:c=>c.vals.lost*2, ignores:"Reaction · cannot miss · can't hit Fighting-immune targets."},
  "Mirror Coat":     {desc:"Foe loses 2× the HP the user lost from the triggering Special attack.",  inputs:[{key:"lost",label:"HP the user lost",def:0,min:0}], compute:c=>c.vals.lost*2, ignores:"Reaction · cannot miss · can't hit Psychic-immune targets."},
  "Comeuppance":     {desc:"Foe loses HP equal to the HP the user lost from the triggering attack.",  inputs:[{key:"lost",label:"HP the user lost",def:0,min:0}], compute:c=>c.vals.lost,   ignores:"Reaction · cannot miss · also Trips the foe."},
  "Metal Burst":     {desc:"Targets lose HP equal to all direct damage the user took this round.",    inputs:[{key:"lost",label:"Damage taken this round",def:0,min:0}], compute:c=>c.vals.lost, ignores:"Cannot miss."},
  "Bide":            {desc:"Adjacent foes lose HP equal to damage taken since Bide was declared.",    inputs:[{key:"lost",label:"Damage taken while Biding",def:0,min:0}], compute:c=>c.vals.lost, ignores:"Reaction · unleashes on your next turn."},
};
/* Moves whose Damage Base is computed dynamically, or whose attack structure changes.
   Weight-class moves (handled separately by weightMoveInfo) and Five Strike (handled by the
   existing fiveStrike path) are intentionally NOT returned here. Verified vs PTU 1.05 core. */
function specialMoveInfo(m){
  const name = String(m?.name||"");

  /* ---- multi-strike attack structure ---- */
  if(name==="Triple Kick")          return {kind:"tripleKick"};
  if(isDoubleStrike(m))             return {kind:"doubleStrike", base:m?.damageBase};

  /* ---- roll-a-die Damage Base ---- */
  if(name==="Magnitude") return {kind:"dieDB", die:6, toDB:x=>5+x, hint:"Roll 1d6 → DB = 5 + result"};
  if(name==="Present")   return {kind:"dieDB", die:6, toDB:x=>2*x, hint:"Roll 1d6 → DB = 2 × result",
                                 onOne:"On a roll of 1 the target instead gains 20 HP (no damage)."};

  /* ---- conditional Damage Base (checkbox toggles the higher DB) ---- */
  const cond = ({
    "Hex":          [7, 13, "Target has a Status Affliction (once per Scene)"],
    "Wake-Up Slap": [5, 10, "Target is Asleep (also cures its Sleep)"],
    "Assurance":    [6, 12, "Target already damaged this round (1×/Scene/target)"],
    "Payback":      [5, 10, "Target hit the user on the previous turn"],
    "Retaliate":    [7, 14, "An ally was Fainted by the target in the last 2 rounds"],
    "Avalanche":    [6, 12, "The target damaged the user this round"],
    "Revenge":      [6, 12, "The target damaged the user this round"],
  })[name];
  if(cond) return {kind:"conditionalDB", base:cond[0], altDB:cond[1], condLabel:cond[2]};

  /* ---- value-driven Damage Base (number input) ---- */
  const vDB = ({
    "Frustration":  {label:"Loyalty (0–6)",            def:0, min:0, max:6, toDB:v=>9-v,               hint:"DB = 9 − Loyalty"},
    "Return":       {label:"Loyalty (0–6)",            def:0, min:0, max:6, toDB:v=>3+v,               hint:"DB = 3 + Loyalty"},
    "Round":        {label:"Prior uses this round",    def:0, min:0,        toDB:v=>Math.min(12,6+2*v),hint:"DB = 6 +2 per prior use (max 12)"},
    "Spit Up":      {label:"Stockpile Count (1–3)",    def:1, min:1, max:3, toDB:v=>8*v,               hint:"DB = 8 × Stockpile Count"},
    "Trump Card":   {label:"Trump Count",             def:0, min:0,        toDB:v=>6+2*v,             hint:"DB = 6 +2 per Trump Count"},
    "Fury Cutter":  {label:"Consecutive hits so far",  def:0, min:0, max:3, toDB:v=>Math.min(16,4+4*v),hint:"DB 4/8/12/16 as it connects consecutively"},
    "Echoed Voice": {label:"Prior consecutive rounds", def:0, min:0, max:2, toDB:v=>4+4*v,             hint:"DB = 4 +4 per prior round (max +8)"},
    "Rollout":      {label:"Consecutive uses so far",  def:0, min:0,        toDB:v=>Math.min(15,3+4*v),hint:"DB = 3 +4 each consecutive use (max 15)"},
    "Ice Ball":     {label:"Consecutive uses so far",  def:0, min:0,        toDB:v=>Math.min(15,3+3*v),hint:"DB = 3 +3 each consecutive use (max 15)"},
    "Stored Power": {label:"Positive Combat Stages",   def:0, min:0,        toDB:v=>Math.min(20,2+2*v),hint:"DB = 2 +2 per positive CS (max 20)"},
    "Reversal":     {label:"User's Injuries",          def:0, min:0, max:10,toDB:v=>7+v,               hint:"DB = 7 +1 per Injury"},
    "Flail":        {label:"User's Injuries",          def:0, min:0, max:10,toDB:v=>7+v,               hint:"DB = 7 +1 per Injury"},
    "Wring Out":    {label:"Target's % of full HP",    def:100,min:0,max:100,toDB:v=>Math.max(1,12-Math.floor((100-v)/10)),hint:"DB 12, −1 per 10% of HP missing"},
    "Crush Grip":   {label:"Target's % of full HP",    def:100,min:0,max:100,toDB:v=>Math.max(1,12-Math.floor((100-v)/10)),hint:"DB 12, −1 per 10% of HP missing"},
    // item / berry-dependent Damage Base — the player enters the resulting DB
    "Natural Gift": {label:"Berry's Damage Base (6–8)", def:6, min:1, max:20, toDB:v=>v, hint:"DB & element come from the stored Berry (see the Berry list). Set the DB here."},
    "Fling":        {label:"Thrown item's Damage Base", def:0, min:0, max:20, toDB:v=>v, hint:"DB depends on the item flung (see the Fling chart). Set the DB here."},
  })[name];
  if(vDB) return Object.assign({kind:"valueDB"}, vDB);

  /* ---- special-case damage: exact HP loss, bypassing the DB dice ---- */
  if(SPECIAL_FIXED_DAMAGE[name])
    return Object.assign({kind:"fixedDamage", inputs:[], die:null, special:null}, SPECIAL_FIXED_DAMAGE[name]);
  if(name==="Beat Up")
    return {kind:"noteOnly", note:"Resolve as up to 3 Struggle Attacks (the user + 2 adjacent allies), each dealing Dark-Type damage. Roll Struggle separately for each participant."};

  return null;
}
function openMoveRoll(p, m, sp, opts={}){
  const d = pokeDerived(p);
  const types = sp?.types || [];
  const ate = ateInfo(p, m);            // an "−ate" ability that could re-type this Normal move
  const ateOn = ate ? !opts.ateOff : false;   // default ON (it's a Free Action the user always takes)
  const mtype = effectiveMoveType(p, m, {noAte: ate && !ateOn});
  const stab = mtype && types.includes(mtype);
  const isPhys = /phys/i.test(m.class||"");
  const isSpec = /spec/i.test(m.class||"");
  const atkStat = isPhys ? d.eff.atk : isSpec ? d.eff.spatk : 0;   // CS-adjusted Attack / Sp.Attack
  const atkLbl = isPhys ? "Attack" : isSpec ? "Sp. Attack" : null;
  const evaNote = isPhys ? "target's Physical Evasion" : isSpec ? "target's Special Evasion" : "target's Evasion";
  const defNote = isPhys ? "Defense" : isSpec ? "Special Defense" : "Defense/Sp.Def";
  // Infatuation (Feb 2016 errata): −5 to Damage Rolls vs anyone but your Crush; vs the Crush, Atk/SpAtk
  // is HALVED for the Damage Roll instead. The GM says which via an "attacking your Crush?" toggle.
  const infatuated = hasStatus(p, "infatuation");
  let crushBox = null;
  // damage-roll adjustment from Infatuation given the current "attacking your Crush?" toggle
  const infatMod = () => {
    if(!infatuated || !(isPhys||isSpec)) return { atk: atkStat||0, delta:0, halved:false };
    if(crushBox && crushBox.checked) return { atk: Math.floor((atkStat||0)/2), delta:0, halved:true };
    return { atk: atkStat||0, delta:-5, halved:false };
  };

  // weight-dependent Damage Base — the player types the needed Weight Class number here
  const wInfo = weightMoveInfo(m);
  let weightVal = wInfo ? (wInfo.kind==="diffPlus2" ? 1 : 3) : 0;
  // other special Damage-Base scaling / attack-structure moves (Magnitude, Hex, Double Strike, …)
  const sp2 = specialMoveInfo(m);
  const nAcc = sp2?.kind==="doubleStrike" ? 2 : sp2?.kind==="tripleKick" ? 3 : 1;
  let condOn = false;                                   // conditionalDB checkbox
  let val    = sp2?.kind==="valueDB" ? sp2.def : 0;     // valueDB number input
  let dieVal = null;                                    // dieDB — rolled on 🎲
  let hitsConnect = sp2?.kind==="doubleStrike" ? 2 : sp2?.kind==="tripleKick" ? 3 : 1;
  let targetEva  = 0;   // target's Evasion — lets the roll count multi-strike hits automatically
  // fixedDamage: current values of its inputs + a context for compute()
  const fdVals = {}; if(sp2?.kind==="fixedDamage") (sp2.inputs||[]).forEach(i=>{ fdVals[i.key]=i.def; });
  const fdCtx  = (die)=>({ level:p.level||1, curHP:p.currentHP??0, vals:fdVals, die });
  const fdAmount = (die)=>{ try{ return Math.max(0, Math.round(sp2.compute(fdCtx(die)))); }catch(e){ return null; } };
  function baseDB(){                      // effective (pre-STAB) Damage Base
    if(wInfo){
      if(wInfo.kind==="target2x")  return 2*Math.max(1, weightVal);
      if(wInfo.kind==="diffPlus2") return wInfo.base + 2*Math.max(0, weightVal);
    }
    if(sp2) switch(sp2.kind){
      case "conditionalDB": return condOn ? sp2.altDB : sp2.base;
      case "valueDB":       return sp2.toDB(Math.max(sp2.min??0, Math.min(sp2.max??1e9, val)));
      case "dieDB":         return dieVal!=null ? sp2.toDB(dieVal) : null;
      case "doubleStrike":  return (sp2.base??0) * (hitsConnect>=2 ? 2 : 1);
      case "tripleKick":    return ({1:1,2:3,3:6})[hitsConnect] ?? 1;
    }
    return m.damageBase;                  // generic weight moves & normal moves use the printed DB
  }
  const spPending = () => !!sp2 && sp2.kind==="dieDB" && dieVal==null;   // DB unknown until 🎲
  const bm = buffMods(p);                 // active Cheers / Orders / Songs (#2)
  const abilAcc = abilityAccMods(p, m, isPhys);   // always-on Accuracy abilities (Compound Eyes, Hustle)
  const accCS = (d.cs.acc||0) + abilAcc.acc + (hasStatus(p,"focused")?1:0);      // Accuracy CS (Core p.234) + ability Accuracy mods + Focused Training
  const wx = weatherRollMods(p, m, mtype);      // current Weather Condition (Core p.342)
  const tx = terrainRollMods(p, m, mtype);      // current Terrain(s) in play — any number can stack
  const effAC = wx.acOverride!=null ? wx.acOverride : m.ac;   // e.g. Thunder is AC 11 in Sun
  const thresholds = effectThresholds(m.effect);
  const abilMods = abilityDamageMods(p, m, baseDB(), thresholds, {stab, mtype, isPhys, isSpec});
  const fiveStrike = isFiveStrike(m);
  const critT = critThreshold(p, m);
  const finalDB = () => { const b=baseDB();
    return b!=null ? b + (stab?2:0) + (bm.db||0) + abilMods.db : null; };
  const diceStr = () => { const f=finalDB(); return f!=null ? (DB_TABLE[f]||"").split("/")[0].trim() : ""; };

  const body = el("div",{});
  body.append(el("div",{style:"margin-bottom:6px"}, el("span",{html:typeBadge(mtype)}),
    el("span",{class:"kv"}, m.class||"Status")));
  const dbChip = el("span",{class:"kv"});
  body.append(el("div",{class:"chips",style:"margin-bottom:12px"},
    el("span",{class:"kv"}, `Freq: ${m.frequency||"—"}`),
    el("span",{class:"kv"}, wx.acOverride!=null ? `AC ${effAC} (${wx.weather.name})` : `AC ${m.ac??"—"}`),
    dbChip,
    el("span",{class:"kv"}, m.range||"—")));

  /* --- "−ate" ability toggle (Aerilate / Pixilate / Galvanize / Refrigerate) --- it re-types this
     Normal move, which can gain OR lose STAB, so let the player flip it per-roll and see the effect. */
  if(ate){
    const stabWith = types.includes(ate.type), stabAs = types.includes("Normal");
    const card = el("div",{class:"card",style:`background:var(--panel);border:1px solid ${ateOn?"var(--accent)":"var(--line)"};margin:0 0 12px`});
    const lbl = el("label",{style:"display:flex;gap:8px;align-items:flex-start;cursor:pointer"});
    const cb = el("input",{type:"checkbox"}); cb.checked = ateOn;
    cb.addEventListener("change",()=>{ closeModal(); openMoveRoll(p, m, sp, Object.assign({}, opts, {ateOff: !cb.checked})); });
    lbl.append(cb, el("div",{},
      el("div",{class:"small",style:"font-weight:700"}, `⚡ ${ate.ability}: retype to ${ate.type}`),
      el("div",{class:"small muted"},
        ateOn ? `Active — this move is ${ate.type}-Type.${stabWith?" STAB applies (+2 DB).":" No STAB from this type."}`
              : `Off — this move stays Normal-Type.${stabAs?" STAB applies (+2 DB).":" No STAB."}`)));
    card.append(lbl); body.append(card);
  }

  /* --- Infatuation prompt: only for damaging attacks by an Infatuated user --- */
  if(infatuated && (isPhys || isSpec)){
    const card = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    const lbl = el("label",{style:"display:flex;gap:8px;align-items:flex-start;cursor:pointer"});
    crushBox = el("input",{type:"checkbox"});
    crushBox.addEventListener("change", renderDamage);
    lbl.append(crushBox, el("div",{},
      el("div",{class:"small",style:"font-weight:700"}, "💕 Infatuated — attacking your Crush?"),
      el("div",{class:"small muted"},
        `Tick if this attack targets the source of the Infatuation: your ${atkLbl} is halved for the Damage Roll. Otherwise it's a flat −5 to the Damage Roll.`)));
    card.append(lbl); body.append(card);
  }

  const explain = el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
  // accuracy (static) — weather can make a move auto-hit (Blizzard in Hail, Thunder/Hurricane in
  // Rain) or change its AC outright (Thunder/Hurricane in Sun).
  explain.append(el("div",{style:"margin-bottom:10px"},
    el("div",{style:"font-size:16px;font-weight:700"},
      `Accuracy: ${wx.autoHit ? "auto-hit" : m.ac!=null ? (nAcc>1?`${nAcc} × 1d20`:"1d20") : "—"}`),
    el("div",{class:"small muted",style:"margin-top:2px"},
      wx.autoHit ? `${m.name} cannot miss in ${wx.weather.name} — no Accuracy Check needed.`
      : m.ac!=null ? `${nAcc>1?`Make ${nAcc} separate Accuracy Rolls`:"Roll 1d20"} — each hits if it's ≥ AC ${effAC}${wx.acOverride!=null?` (${wx.weather.name})`:""} + ${evaNote}. Roll ${critT===20?"20":critT+"+"} auto-hits/crits, nat 1 auto-misses.`
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

  /* --- interactive control for special Damage-Base / multi-strike moves --- */
  if(sp2){
    if(sp2.kind==="conditionalDB"){
      const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
      const lbl = el("label",{style:"display:flex;gap:8px;align-items:flex-start;cursor:pointer"});
      const cb = el("input",{type:"checkbox"});
      cb.addEventListener("change",()=>{ condOn = cb.checked; renderDamage(); });
      lbl.append(cb, el("div",{},
        el("div",{class:"small",style:"font-weight:700"}, sp2.condLabel),
        el("div",{class:"small muted"}, `Tick to use DB ${sp2.altDB} instead of DB ${sp2.base}.`)));
      wc.append(lbl); body.append(wc);
    } else if(sp2.kind==="valueDB"){
      const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
      wc.append(el("div",{class:"small",style:"font-weight:700;margin-bottom:4px"},`🔢 ${sp2.label}`));
      const inp = el("input",{type:"number",min:sp2.min??0,value:val,style:"width:90px"});
      if(sp2.max!=null) inp.max = sp2.max;
      inp.addEventListener("input",()=>{
        let v = parseInt(inp.value); if(isNaN(v)) v = sp2.min??0;
        val = Math.max(sp2.min??0, Math.min(sp2.max??1e9, v)); renderDamage();
      });
      wc.append(inp, el("span",{class:"small muted",style:"margin-left:8px"}, sp2.hint));
      body.append(wc);
    } else if(sp2.kind==="dieDB"){
      body.append(el("div",{class:"warnbox",style:"margin:0 0 12px"},
        `🎲 ${sp2.hint} — rolled automatically when you press 🎲 Roll dice.${sp2.onOne?" "+sp2.onOne:""}`));
    } else if(sp2.kind==="doubleStrike" || sp2.kind==="tripleKick"){
      const nStrikes = sp2.kind==="tripleKick" ? 3 : 2;
      const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
      wc.append(el("div",{class:"small",style:"font-weight:700;margin-bottom:4px"},
        sp2.kind==="tripleKick" ? "👣 Triple Kick — 3 separate Attack Rolls" : "⚔ Double Strike — 2 separate Attack Rolls"));
      const row = el("div",{class:"inline",style:"gap:8px;align-items:center;flex-wrap:wrap"});
      const inp = el("input",{type:"number",min:0,value:targetEva,style:"width:90px"});
      inp.addEventListener("input",()=>{ targetEva = Math.max(0, parseInt(inp.value)||0); });
      row.append(el("span",{class:"small"}, `Target's ${isSpec?"Special":"Physical"} Evasion`), inp);
      wc.append(row);
      wc.append(el("div",{class:"small muted",style:"margin-top:4px"},
        `All ${nStrikes} Attack Rolls are checked against AC ${effAC??"—"} + this Evasion when you press 🎲 — the connecting hits are counted for you (nat 20 always hits, nat 1 always misses), and the Damage Base is sized from them. `
        + (sp2.kind==="tripleKick" ? "1 hit → DB 1 · 2 hits → DB 3 · 3 hits → DB 6"
                                   : `1 hit → DB ${sp2.base} · both hit → DB ${(sp2.base??0)*2} (doubled)`)));
      body.append(wc);
    } else if(sp2.kind==="fixedDamage" && (sp2.inputs||[]).length){
      const wc = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--line);margin:0 0 12px"});
      wc.append(el("div",{class:"small",style:"font-weight:700;margin-bottom:4px"},"🔢 Special damage"));
      sp2.inputs.forEach(inp=>{
        const row = el("div",{style:"display:flex;gap:8px;align-items:center;margin-top:4px"});
        const field = el("input",{type:"number",min:inp.min??0,value:fdVals[inp.key],style:"width:90px"});
        if(inp.max!=null) field.max = inp.max;
        field.addEventListener("input",()=>{
          let v = parseInt(field.value); if(isNaN(v)) v = inp.min??0;
          fdVals[inp.key] = Math.max(inp.min??0, Math.min(inp.max??1e9, v)); renderDamage();
        });
        row.append(el("span",{class:"small",style:"min-width:150px"}, inp.label), field);
        wc.append(row);
      });
      body.append(wc);
    }
  }

  function renderDamage(){
    if(sp2?.kind==="fixedDamage"){
      dbChip.textContent = "Special damage"; dbChip.style.display = "";
      dmgBox.innerHTML = "";
      const pending = sp2.die!=null;
      const amt = pending ? null : fdAmount(null);
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, pending ? "Damage: rolled on 🎲" : `Damage: ${amt} HP`),
        el("div",{class:"small muted",style:"margin-top:2px"}, sp2.desc + (sp2.ignores?` ${sp2.ignores}`:""))));
      if(sp2.special) dmgBox.append(el("div",{class:"warnbox small",style:"margin-top:6px"}, `⚠ ${sp2.special}`));
      return;
    }
    if(sp2?.kind==="noteOnly"){
      dbChip.textContent = "Special"; dbChip.style.display = "";
      dmgBox.innerHTML = "";
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, "Damage: special"),
        el("div",{class:"small muted",style:"margin-top:2px"}, sp2.note)));
      return;
    }
    if(spPending()){                       // Magnitude/Present — DB is rolled with the dice
      dbChip.textContent = sp2.hint; dbChip.style.display = "";
      dmgBox.innerHTML = "";
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, "Damage: rolled on 🎲"),
        el("div",{class:"small muted",style:"margin-top:2px"}, sp2.hint + (sp2.onOne?" · "+sp2.onOne:""))));
      return;
    }
    const fDB = finalDB(), ds = diceStr();
    const dm = ds.match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/) || [];
    const dn = dm[1]?+dm[1]:0, dfaces = dm[2]?+dm[2]:0, dflat = dm[3]?parseInt(dm[3].replace(/\s/g,"")):0;
    dbChip.textContent = fDB!=null
      ? `DB ${baseDB()}${stab?` +2 STAB`:""}${abilMods.db?` +${abilMods.db} ability`:""} → ${fDB}`
      : "No damage";
    dbChip.style.display = "";
    dmgBox.innerHTML = "";
    if(fDB!=null && dn){
      const im = infatMod();
      const terms=[`${dn}d${dfaces}`]; if(dflat) terms.push(String(dflat)); if(im.atk) terms.push(String(im.atk));
      // weather/terrain are appended with their own operator — pushing "−5" into terms would render "+ −5"
      const expr = terms.join(" + ")
        + (wx.dmg ? ` ${wx.dmg>0?"+":"−"} ${Math.abs(wx.dmg)}` : "")
        + (tx.dmg ? ` ${tx.dmg>0?"+":"−"} ${Math.abs(tx.dmg)}` : "")
        + (abilMods.flat ? ` ${abilMods.flat>0?"+":"−"} ${Math.abs(abilMods.flat)}` : "")
        + (im.delta ? ` − ${Math.abs(im.delta)}` : "");
      const why=[`${dn}d${dfaces}${dflat?`+${dflat}`:""} = Damage Base ${fDB}${stab?` (DB ${baseDB()} +2 STAB)`:""}`];
      if(im.atk) why.push(`${im.atk} = your ${atkLbl}${im.halved?" (halved — Infatuated vs Crush)":""}`);
      if(wx.dmg) why.push(`${wx.dmg>0?"+":"−"}${Math.abs(wx.dmg)} = ${wx.weather.name}`);
      if(tx.dmg) why.push(`${tx.dmg>0?"+":"−"}${Math.abs(tx.dmg)} = Terrain`);
      if(abilMods.why.length) why.push(abilMods.why.join(", "));
      if(im.delta) why.push(`${im.delta} = Infatuated (not the Crush)`);
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, `Damage: ${expr}`),
        el("div",{class:"small muted",style:"margin-top:2px"}, why.join(" · ")+`. Target then subtracts their ${defNote}.`)));
      if(fiveStrike) dmgBox.append(el("div",{class:"small muted",style:"margin-top:2px"},
        "🎯 Five Strike — rolling 1d8 for hit count when you roll dice; the Damage Base above is multiplied by hits (Technician already included)."));
      if(sp2?.kind==="doubleStrike") dmgBox.append(el("div",{class:"small muted",style:"margin-top:2px"},
        `⚔ Double Strike — shown with ${hitsConnect===2?"both Attack Rolls connecting":"1 Attack Roll connecting"}; the 🎲 roll counts how many actually hit and re-sizes the Damage Base. Each connecting strike can crit on its own.`));
      if(sp2?.kind==="tripleKick") dmgBox.append(el("div",{class:"small muted",style:"margin-top:2px"},
        `👣 Triple Kick — shown at ${hitsConnect} of 3 connecting; the 🎲 roll counts the real hits and re-sizes the Damage Base (DB 1 / 3 / 6 for 1 / 2 / 3 hits).`));
      if(critT<20) dmgBox.append(el("div",{class:"small muted",style:"margin-top:2px"},
        `Critical Hit Range: ${critT}–20 for this Pokémon/move.`));
    } else {
      dmgBox.append(el("div",{},
        el("div",{style:"font-size:16px;font-weight:700"}, "Damage: —"),
        el("div",{class:"small muted",style:"margin-top:2px"}, "Status move — deals no damage; see its effect.")));
    }
  }
  renderDamage();
  body.append(explain);

  /* --- active buffs (Cheers / Orders / Songs) applied to this roll (#2) --- */
  const buffs = ownerBuffs(p);
  if(buffs.length){
    const bcard = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    bcard.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},"✨ Buffs & Orders active"));
    buffs.forEach(b=>{ const mt=buffModText(b.mods);
      bcard.append(el("div",{class:"small"}, `• ${b.name}` + (mt?` — ${mt}`:"") + (b.note?`  `:""),
        b.note?el("span",{class:"muted"}, b.note):"")); });
    const net = [];
    if(bm.acc)  net.push(`${bm.acc>0?"+":""}${bm.acc} to Accuracy`);
    if(bm.dmg)  net.push(`${bm.dmg>0?"+":""}${bm.dmg} to Damage`);
    if(bm.db)   net.push(`${bm.db>0?"+":""}${bm.db} Damage Base`);
    if(bm.crit) net.push(`+${bm.crit} Crit/Effect range`);
    if(net.length) bcard.append(el("div",{class:"small muted",style:"margin-top:4px;font-weight:700"},"Net: "+net.join(" · ")));
    body.append(bcard);
  }

  /* --- Swarm action economy (Core p.478): the cost of THIS move comes from its Frequency, so
         rolling a move is what drives the spending. First Standard Action each round is free. --- */
  if(isSwarm(p)){
    const scard = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    const drawSwarm = ()=>{
      scard.innerHTML = "";
      const cost = swarmCost(m.frequency), free = !p.swarm.freeUsed, canPay = free || p.swarm.sp>=cost;
      scard.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},
        `🐝 Swarm ×${p.swarm.mult} — ${p.swarm.sp} Swarm Point${p.swarm.sp===1?"":"s"} left this round`));
      scard.append(el("div",{class:"small"}, free
        ? "• First Standard Action this round is FREE."
        : `• ${m.name} (${m.frequency||"At-Will"}) costs ${cost} Swarm Point${cost===1?"":"s"}.`));
      scard.append(el("button",{class:"btn-secondary",style:"margin-top:6px",disabled:!canPay,
        onclick:()=>{ const r = swarmSpend(p, m.frequency);
          if(!r.ok){ toast("Not enough Swarm Points"); return; }
          saveEnc(); toast(r.free ? "Free action used" : `−${r.cost} Swarm Point${r.cost===1?"":"s"}`);
          drawSwarm(); if(currentTab==="map") renderMap(); }},
        free ? "✓ Use the free action" : `✓ Spend ${cost}`));
      if(!canPay) scard.append(el("div",{class:"small muted",style:"margin-top:4px"},
        "Not enough points for this move — but a Swarm always gets at least one action each round."));
      scard.append(el("div",{class:"small muted",style:"margin-top:4px"},
        "At-Will 1 · EOT 2 · Scene 3 · Daily 4 — Standard Actions only. Each extra act is at Initiative −5."));
    };
    drawSwarm();
    body.append(scard);
  }

  /* --- current Weather Condition applied to this roll (Core p.342) — presented exactly like the
         buff card above so the GM can see where every modifier came from --- */
  if(!weatherIsClear(wx.weather)){
    const wcard = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    wcard.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},
      `${wx.weather.icon} Weather — ${wx.weather.name}`));
    if(wx.lines.length) wx.lines.forEach(l=>wcard.append(el("div",{class:"small"}, "• "+l)));
    else wcard.append(el("div",{class:"small muted"},"No effect on this move."));
    const wnet = [];
    if(wx.dmg) wnet.push(`${wx.dmg>0?"+":"−"}${Math.abs(wx.dmg)} to Damage`);
    if(wx.autoHit) wnet.push("cannot miss");
    if(wx.acOverride!=null) wnet.push(`AC ${wx.acOverride}`);
    if(wnet.length) wcard.append(el("div",{class:"small muted",style:"margin-top:4px;font-weight:700"},"Net: "+wnet.join(" · ")));
    const csw = weatherCSMods(p), csTxt = CS_STATS.filter(([k])=>csw[k]).map(([k,l])=>`${csw[k]>0?"+":""}${csw[k]} ${l} CS`);
    const evw = weatherEvasion(p);
    if(csTxt.length || evw) wcard.append(el("div",{class:"small muted",style:"margin-top:2px"},
      "Already included in this Pokémon's stats: " + csTxt.concat(evw?[`+${evw} Evasion`]:[]).join(" · ")));
    body.append(wcard);
  }

  /* --- active Terrain(s) applied to this roll — same presentation as the Weather card above --- */
  if(tx.terrains.length){
    const tcard = el("div",{class:"card",style:"background:var(--panel);border:1px solid var(--accent);margin:0 0 12px"});
    tcard.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},
      `🌱 Terrain — ${tx.terrains.map(t=>t.name).join(", ")}`));
    if(tx.lines.length) tx.lines.forEach(l=>tcard.append(el("div",{class:"small"}, "• "+l)));
    else tcard.append(el("div",{class:"small muted"},"No effect on this move."));
    const tnet = []; if(tx.dmg) tnet.push(`${tx.dmg>0?"+":"−"}${Math.abs(tx.dmg)} to Damage`);
    if(tnet.length) tcard.append(el("div",{class:"small muted",style:"margin-top:4px;font-weight:700"},"Net: "+tnet.join(" · ")));
    body.append(tcard);
  }

  /* --- move effect text, always shown; high-roll thresholds highlighted (#4) --- */
  if(m.effect){
    const ec = el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
    ec.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:4px"},"Effect"));
    ec.append(el("div",{class:"small",style:"white-space:pre-wrap"}, m.effect));
    if(thresholds.length) ec.append(el("div",{class:"small muted",style:"margin-top:6px"},
      "⚡ Triggers on an Accuracy roll of " + thresholds.map(t=>t.n+"+").join(" / ") + " — watch the roll below."));
    body.append(ec);
  }

  /* --- results (filled when you press Roll dice) --- */
  const out = el("div",{id:"rollOut",class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"}, "Press 🎲 Roll dice to simulate."));
  /* redo = {nats, forceHits} — re-resolves a multi-strike attack with the SAME Attack Rolls
     (used by the "override hits" buttons, so the GM can correct the auto hit count). */
  const doRoll = (redo) => {
    out.style.borderStyle="solid";
    out.innerHTML="";

    /* --- special-case damage (exact HP loss) & note-only moves --- */
    if(sp2?.kind==="noteOnly"){
      out.append(el("div",{},
        el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"RESOLUTION"),
        el("div",{style:"font-size:16px;font-weight:700"}, "Special resolution"),
        el("div",{class:"small muted",style:"margin-top:2px"}, sp2.note)));
      return;
    }
    if(sp2?.kind==="fixedDamage"){
      const accLine = el("div",{style:"margin-bottom:10px"});
      accLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"));
      if(m.ac!=null){
        const acc = 1+Math.floor(Math.random()*20), accTot = acc + (bm.acc||0) + accCS;
        accLine.append(el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${accTot}`,
          el("span",{class:"muted",style:"font-size:14px;font-weight:600"}, acc!==accTot?`  (${acc})`:"  (1d20)")));
        accLine.append(el("div",{class:"small muted"},
          `Hits if ${accTot} ≥ AC ${m.ac} + ${evaNote}.${acc===20?" Natural 20 — auto-hit!":acc===1?" Natural 1 — auto-miss.":""}`));
      } else {
        accLine.append(el("div",{style:"font-size:18px;font-weight:800;color:var(--good)"}, "🎯 Cannot miss"));
        accLine.append(el("div",{class:"small muted"}, "This move has no Accuracy Check."));
      }
      out.append(accLine);
      let die=null;
      if(sp2.die){ die = 1+Math.floor(Math.random()*sp2.die);
        out.append(el("div",{class:"small muted",style:"margin-bottom:10px"}, `Scaling: 1d${sp2.die} → ${die}.`)); }
      const amt = fdAmount(die);
      const dmgLine = el("div",{});
      dmgLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE"));
      dmgLine.append(el("div",{style:"font-size:26px;font-weight:800;color:var(--accent)"}, `💥 ${amt} HP`));
      dmgLine.append(el("div",{class:"small muted",style:"margin-top:4px"}, sp2.desc + (sp2.ignores?` ${sp2.ignores}`:"")));
      if(sp2.special) dmgLine.append(el("div",{class:"small",style:"margin-top:4px;font-weight:700;color:var(--bad)"}, `⚠ ${sp2.special}`));
      out.append(dmgLine);
      return;
    }

    // resolve a rolled Damage Base first (Magnitude / Present) so fDB is correct
    let dieNote = null;
    if(sp2?.kind==="dieDB"){ dieVal = 1+Math.floor(Math.random()*sp2.die); dieNote = `1d${sp2.die} → ${dieVal} → DB ${sp2.toDB(dieVal)}`; renderDamage(); }
    // Present: a roll of 1 heals the target 20 HP instead of dealing damage
    if(sp2?.kind==="dieDB" && sp2.onOne && dieVal===1){
      out.append(el("div",{class:"small muted",style:"margin-bottom:8px"}, `Scaling: ${dieNote}.`));
      out.append(el("div",{},
        el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"RESULT"),
        el("div",{style:"font-size:16px;font-weight:700;color:var(--good)"}, "The target gains 20 HP"),
        el("div",{class:"small muted",style:"margin-top:2px"}, sp2.onOne)));
      return;
    }
    // multi-strike: roll one d20 per attack; accs[0] drives the detailed crit/threshold read-out
    const accs = redo?.nats || Array.from({length:nAcc}, ()=>1+Math.floor(Math.random()*20));
    const acc = accs[0];
    const accMod = (bm.acc||0) + accCS;
    const accTot = acc + accMod;
    const pureAccCS = d.cs.acc||0;
    const accBits = []; if(bm.acc) accBits.push(`${bm.acc>0?"+":"−"}${Math.abs(bm.acc)} buffs`);
    if(pureAccCS) accBits.push(`${pureAccCS>0?"+":"−"}${Math.abs(pureAccCS)} Accuracy CS`);
    abilAcc.why.forEach(w=>accBits.push(w));
    if(hasStatus(p,"focused")) accBits.push("+1 Focused");
    // Critical Hit Range (Core p.235): widened by move/ability (critT) and by active buffs (bm.crit)
    const effCritT = Math.max(2, critT - (bm.crit||0));
    /* Double Strike / Triple Kick (Core p.242): resolve every Attack Roll against AC + the Evasion
       entered above, count the connecting strikes automatically, and size the Damage Base from them. */
    const multi   = nAcc > 1;
    const thresh  = (wx.autoHit || effAC==null) ? null : effAC + targetEva;
    const strikes = multi ? resolveStrikes(accs, accMod, thresh, effCritT) : null;
    const forced  = multi && redo?.forceHits!=null;
    const connected = !multi ? 1 : (forced ? redo.forceHits : strikes.filter(s=>s.hit).length);
    if(multi){ hitsConnect = Math.max(1, connected); renderDamage(); }
    const fDB = finalDB();
    // crits can't outnumber the strikes that actually landed (matters after a manual override)
    const nCrit  = multi ? Math.min(strikes.filter(s=>s.crit).length, connected)
                         : ((!wx.autoHit && acc>=effCritT) ? 1 : 0);
    const isCrit = nCrit > 0;
    const accLine = el("div",{style:fDB!=null?"margin-bottom:10px":""});
    accLine.append(el("div",{class:"lbl",style:"color:var(--muted)  ;font-weight:800"}, multi?"ACCURACY ROLLS":"ACCURACY ROLL"));
    if(wx.autoHit){
      accLine.append(el("div",{style:"font-size:24px;font-weight:800;color:var(--good)"}, "🎯 Automatic hit"));
      accLine.append(el("div",{class:"small muted"}, `${m.name} cannot miss in ${wx.weather.name} — no Accuracy Check.`));
    } else if(multi){
      accLine.append(el("div",{style:`font-size:24px;font-weight:800;color:var(--${connected?"good":"bad"})`},
        `🎯 ${connected} / ${nAcc} strike${connected===1?"":"s"} connected`));
      accLine.append(el("div",{class:"small muted",style:"margin-top:2px"},
        `vs AC ${effAC}${wx.acOverride!=null?` (${wx.weather.name})`:""} + ${evaNote} ${targetEva} = ${thresh} → ${strikeReadout(strikes)}`));
      if(accBits.length) accLine.append(el("div",{class:"small muted"}, `Each roll includes ${accBits.join(" ")}.`));
      if(forced) accLine.append(el("div",{class:"small muted"}, `Hit count manually overridden to ${connected}.`));
      if(isCrit) accLine.append(el("div",{style:"font-size:20px;font-weight:800;color:var(--bad);margin-top:2px"},
        nCrit>1?`💥 ${nCrit} CRITICAL HITS!`:"💥 CRITICAL HIT!"));
    } else {
      accLine.append(el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${accTot}`,
        el("span",{class:"muted",style:"font-size:14px;font-weight:600"}, accBits.length?`  (${acc} ${accBits.join(" ")})`:"  (1d20)")));
      if(effAC!=null) accLine.append(el("div",{class:"small muted"},
        `Hits if ${accTot} ≥ AC ${effAC}${wx.acOverride!=null?` (${wx.weather.name})`:""} + ${evaNote}.${acc===1?" Natural 1 — auto-miss.":isCrit?` Roll ${acc} ≥ crit range ${effCritT} — Critical Hit!`:""}`));
      if(isCrit) accLine.append(el("div",{style:"font-size:20px;font-weight:800;color:var(--bad);margin-top:2px"}, "💥 CRITICAL HIT!"));
    }
    out.append(accLine);
    if(dieNote) out.append(el("div",{class:"small muted",style:"margin:2px 0 10px"}, `Scaling: ${dieNote}.`));
    // extra move effects that trigger on this Accuracy roll (#4) — compared vs the natural 1d20
    const sheerForceActive = hasAbility(p,"Sheer Force") || hasAbility(p,"Sheer Force [Errata]");
    if(sheerForceActive && thresholds.length){
      out.append(el("div",{class:"small muted",style:"margin:2px 0 10px"},
        "Sheer Force suppresses this move's secondary effect (traded for the damage bonus above)."));
    } else if(thresholds.length){
      const hit = thresholds.filter(t=>acc>=t.n), miss = thresholds.filter(t=>acc<t.n);
      const tl = el("div",{style:"margin:2px 0 10px"});
      hit.forEach(t=>{
        tl.append(el("div",{class:"small",style:"color:var(--good);font-weight:700"},
          `⚡ ${acc} ≥ ${t.n} — extra effect triggers: `, el("span",{class:"muted",style:"font-weight:400"}, t.text)));
        const st = statusHitFromText(t.text);
        if(st) tl.append(el("div",{style:"font-size:26px;font-weight:800;color:var(--bad);text-align:center;margin:4px 0 8px;letter-spacing:.5px"},
          st.name+"!"));
      });
      miss.forEach(t=>tl.append(el("div",{class:"small muted"},
        `▫ ${acc} < ${t.n} — this effect doesn't trigger: ${t.text}`)));
      out.append(tl);
    }
    if(multi && connected===0){
      out.append(el("div",{},
        el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"),
        el("div",{style:"font-size:20px;font-weight:800;color:var(--bad)"},"— no damage"),
        el("div",{class:"small muted",style:"margin-top:2px"},"None of the Attack Rolls met AC + Evasion, so the Move misses entirely.")));
    }
    if(fDB!=null && !(multi && connected===0)){
      // Five Strike (Core p.242): roll 1d8 for hit count, DB is multiplied by hits before the dice lookup
      const hitsInfo = fiveStrike ? fiveStrikeRoll() : null;
      const effFDB = hitsInfo ? Math.min(28, fDB*hitsInfo.hits) : fDB;
      const ds = (DB_TABLE[effFDB]||DB_TABLE[fDB]||"").split("/")[0].trim();
      const r = rollDiceString(ds);
      const dmgLine = el("div",{});
      dmgLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"DAMAGE ROLL"));
      if(r){
        // Critical Hit (Core p.235): the Damage Dice are doubled — the stat bonus is NOT doubled.
        // On a multi-strike Move each connecting strike crits on its own, so add one set per crit.
        let critExtra = 0; const critWhy = [];
        for(let c=0;c<nCrit;c++){
          const r2 = rollDiceString(ds); critExtra += r2.dice; critWhy.push(`+${r2.dice} crit (doubled dice)`);
          if(hasAbility(p,"Sniper")){ const r3 = rollDiceString(ds); critExtra += r3.dice; critWhy.push(`+${r3.dice} Sniper`); }
          if(hasAbility(p,"Sniper [Errata]")){ const r4 = rollDiceString("3d10"); critExtra += r4.total; critWhy.push(`+${r4.total} Sniper [Errata]`); }
        }
        const im = infatMod();
        const total = Math.max(0, r.total + im.atk + (bm.dmg||0) + (wx.dmg||0) + (tx.dmg||0) + abilMods.flat + critExtra + im.delta);
        dmgLine.append(el("div",{style:`font-size:26px;font-weight:800;color:${isCrit?"var(--bad)":"var(--accent)"}`},
          `${isCrit?"💥 CRIT! ":"💥 "}${total}`));
        const parts=[`${r.expr} → [${r.rolls.join(", ")}]${r.flat?` ${r.flat>0?"+":""}${r.flat}`:""} = ${r.total}`];
        if(im.atk) parts.push(`+ ${im.atk} ${atkLbl}${im.halved?" (halved — Infatuated)":""}`);
        if(bm.dmg)  parts.push(`${bm.dmg>0?"+":""}${bm.dmg} buffs`);
        if(wx.dmg)  parts.push(`${wx.dmg>0?"+":""}${wx.dmg} ${wx.weather.name}`);
        if(tx.dmg)  parts.push(`${tx.dmg>0?"+":""}${tx.dmg} Terrain`);
        if(abilMods.flat) parts.push(`${abilMods.flat>0?"+":""}${abilMods.flat} ability`);
        if(im.delta) parts.push(`${im.delta} Infatuated`);
        if(critWhy.length) parts.push(critWhy.join(" "));
        parts.push(`= ${total}`);
        if(hitsInfo) dmgLine.append(el("div",{class:"small muted",style:"margin-top:2px"},
          `🎯 Five Strike: 1d8 → ${hitsInfo.d8} = ${hitsInfo.hits} hit${hitsInfo.hits===1?"":"s"} — DB ${fDB} ×${hitsInfo.hits} = ${effFDB}`));
        if(multi) dmgLine.append(el("div",{class:"small muted",style:"margin-top:2px"},
          `${sp2.kind==="tripleKick"?"👣 Triple Kick":"⚔ Double Strike"}: ${connected} of ${nAcc} connected — Damage Base ${baseDB()}${stab?" +2 STAB":""}${abilMods.db?` +${abilMods.db} ability`:""} = ${fDB}`));
        dmgLine.append(el("div",{class:"small muted",style:"margin-top:4px"}, parts.join("  ")));
        if(bm.crit) dmgLine.append(el("div",{class:"small muted"}, `Crit / Effect range widened by +${bm.crit} (buffs).`));
        dmgLine.append(el("div",{class:"small muted"}, `Target subtracts ${defNote} & damage reduction.`));
        // GM: drop this rolled hit straight onto a battle-map token (auto Def / type / abilities / DR).
        if(isPhys || isSpec){
          const tw = attackTargetWidget({ dmg:total, type:mtype||"Typeless", physical:isPhys });
          if(tw) dmgLine.append(tw);
        }
      }
      out.append(dmgLine);
    }
    /* GM override: keep the same Attack Rolls but force a different hit count (e.g. the target's
       real Evasion turned out different, or an ability changed what connects). Damage is re-rolled. */
    if(multi){
      const ov = el("div",{class:"inline",style:"gap:6px;flex-wrap:wrap;margin-top:10px;align-items:center"});
      ov.append(el("span",{class:"small muted"},"Override hits:"));
      for(let k=0;k<=nAcc;k++) ov.append(el("button",{class:"btn-secondary",style:"padding:3px 10px",
        onclick:()=>doRoll({nats:accs, forceHits:k})}, String(k)));
      ov.append(el("span",{class:"small muted"},"— keeps the Attack Rolls, re-rolls the damage dice."));
      out.append(ov);
    }
    // spend one-shot buffs (Cheers / Strike Again! / Perfect Aim …)
    const oneShots = ownerBuffs(p).filter(b=>b.once);
    if(oneShots.length){
      const sp = el("div",{style:"margin-top:10px"});
      sp.append(el("div",{class:"small muted",style:"font-weight:700"},"Spend a one-shot buff:"));
      const row = el("div",{class:"inline",style:"gap:6px;flex-wrap:wrap;margin-top:4px"});
      oneShots.forEach(b=>row.append(el("button",{class:"btn-secondary",style:"padding:4px 9px",
        onclick:()=>{ removeBuff(p,b.id); save(); toast(`Spent ${b.name}`); doRoll(); }}, `✓ ${b.name}`)));
      sp.append(row); out.append(sp);
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
/* spend a Tutor Point to learn a move from the species' Tutor list (Core: 1 TP per Tutor move) */
/* Tutor cost, in Tutor Points, per move taught through a Tutoring Feature (this campaign's rate). */
const TUTOR_COST = 2;
/* Tutor / Inheritance restriction (this campaign): moves taught through Tutoring Features are limited
   by the Pokémon's level —
     under Lv 20 : At-Will or EOT frequency only, max Damage Base 7
     Lv 20–29    : up to Scene frequency, max Damage Base 9
     Lv 30+      : no restriction. */
const TUTOR_FREQ_RANK = {atwill:0, eot:1, scene:2, daily:3};
function tutorMoveAllowed(moveName, level){
  if((level||1) >= 30) return true;
  const m = moveByName.get(String(moveName).toLowerCase());
  if(!m) return true;                                   // custom / not in DB → GM discretion
  const rank = TUTOR_FREQ_RANK[freqInfo(m.frequency).kind];
  const db = typeof m.damageBase==="number" ? m.damageBase : 0;
  if(level >= 20) return rank!=null && rank<=TUTOR_FREQ_RANK.scene && db<=9;   // 20–29
  return rank!=null && rank<=TUTOR_FREQ_RANK.eot && db<=7;                     // under 20
}
function openTutorMovePicker(p, sp){
  if(!p.unlocked && !sp){ toast("Unknown species — tick 🔓 to add any move"); return; }
  const limit = effectiveMoveLimit(activeChar().trainer);
  if(!p.unlocked && p.moves.length>=limit){ toast(`Move limit reached (${limit}). Tick "🔓 GM: allow any" to add more.`); return; }
  if(!p.unlocked && (p.tutorPoints||0)<TUTOR_COST){ toast(`Not enough Tutor Points — a Tutor move costs ${TUTOR_COST} (has ${p.tutorPoints||0}).`); return; }
  const cleanTutor = s => (s?.moves?.tutor||[]).map(m=>m.replace(/\s*\(N\)\s*$/i,"").trim());
  let names, title, markSet;
  if(p.unlocked){
    const learn = cleanTutor(sp);
    markSet = new Set(learn.map(x=>x.toLowerCase()));
    names = [...new Set([...learn, ...D.moves.map(m=>m.name)])];
    title = `Learn a Tutor move (🔓 any) — ${sp?sp.name+"'s Tutor list on top":"all moves"}`;
  } else {
    names = cleanTutor(sp).filter(nm => tutorMoveAllowed(nm, p.level));   // level restriction
    markSet = new Set();
    title = `Learn a Tutor move — ${sp.name} (−${TUTOR_COST} Tutor Points, ${p.tutorPoints||0} left)`;
  }
  names = [...new Set(names)].filter(nm => !p.moves.includes(nm));
  if(!names.length){ toast(p.unlocked?"No new Tutor moves available":`No eligible Tutor moves for Lv ${p.level} (Tutor restriction) — tick 🔓 to bypass.`); return; }
  openPicker(title, names, name=>{
    if(p.moves.includes(name)) return;
    if(!p.unlocked) p.tutorPoints = Math.max(0,(p.tutorPoints||0)-TUTOR_COST);
    p.moves.push(name); save(); refreshMon(p);
    toast(`Learned ${name} (Tutor)`);
  }, "move", markSet.size ? n=>markSet.has(n.toLowerCase()) : null);
}

/* Mentor class Feature (Core, Trainer Classes): Daily x3 Extended Action — target a Pokémon with a
   Tutor Point, it loses that point and learns a move from its tutor list marked (N), OR any level-up
   move at (target's level + sum of the trainer's two chosen "Mentor Skill" ranks). */
const MENTOR_SKILL_OPTIONS = [["charm","Charm"],["intimidate","Intimidate"],["intuition","Intuition"],["pokemonEd","Pokémon Ed."]];
function mentorSkillSum(t){ return (t.mentorSkills||[]).reduce((s,k)=> s + (t.skills[k] ? rankNum(t.skills[k]) : 0), 0); }
function mentorMoveOptions(sp, targetLevel){
  if(!sp) return [];
  const tutorN = (sp.moves?.tutor||[]).filter(m=>/\(N\)/i.test(m)).map(m=>m.replace(/\s*\(N\)\s*$/i,"").trim());
  const lu = speciesLevelupNames(sp, targetLevel);
  return [...new Set([...tutorN, ...lu])];
}
function openMentorPicker(t){
  const mf = D.features.find(f=>f.name==="Mentor");
  const info = freqInfo(mf?.frequency||"Daily x3 - Extended Action");
  const uKey = useKey("feature","Mentor");
  const left = usesLeft(t, uKey, info.max||3);
  if(left<=0){ toast("No Mentor uses left today"); return; }
  if((t.mentorSkills||[]).length<2){ toast("Pick your two Mentor Skills first"); return; }
  const party = (activeChar().pokemon||[]).filter(p=>p.unlocked || (p.tutorPoints||0)>0);
  if(!party.length){ toast("No Pokémon with a Tutor Point to mentor"); return; }
  const labelFor = p => `${p.nickname||getSpecies(p.species)?.name||p.species} (Lv${p.level}${p.onTeam===false?" · box":""})`;
  const byLabel = new Map(party.map(p=>[labelFor(p), p]));
  openPicker("Mentor which Pokémon?", [...byLabel.keys()], label=>{
    const p = byLabel.get(label); const sp = getSpecies(p.species);
    if(!p.unlocked && p.moves.length>=effectiveMoveLimit(t)){
      toast(`${labelFor(p)} is at its move limit (${effectiveMoveLimit(t)}). Tick "🔓 GM: allow any" to add more.`); return; }
    const cap = p.level + mentorSkillSum(t);
    const names = mentorMoveOptions(sp, cap).filter(nm=>!p.moves.includes(nm) && tutorMoveAllowed(nm, p.level));
    if(!names.length){ toast("No eligible moves to teach (level / Tutor restriction)"); return; }
    openPicker(`Teach ${labelFor(p)} a move (cap Lv ${cap})`, names, name=>{
      p.moves.push(name);
      if(!p.unlocked) p.tutorPoints = Math.max(0,(p.tutorPoints||0)-1);
      t.uses = t.uses||{}; t.uses[uKey] = Math.min(info.max||3, (t.uses[uKey]||0)+1);
      save(); renderBattle();
      toast(`🎓 ${labelFor(p)} learned ${name} (Mentor)`);
    }, "move");
  });
}
function mentorCard(t){
  if(!(t.classes||[]).includes("Mentor")) return "";
  const mf = D.features.find(f=>f.name==="Mentor");
  const info = freqInfo(mf?.frequency||"Daily x3 - Extended Action");
  const uKey = useKey("feature","Mentor");
  const card = el("div",{class:"card"}, el("h3",{},"🎓 Mentor",
    el("span",{class:"muted small"},"Extended Action — Daily x3")));
  const skWrap = el("div",{class:"inline small",style:"gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px"});
  skWrap.append(el("span",{class:"muted",style:"font-weight:700"},"Mentor Skills:"));
  MENTOR_SKILL_OPTIONS.forEach(([k,lbl])=>{
    const cb = el("input",{type:"checkbox"}); cb.checked = (t.mentorSkills||[]).includes(k);
    cb.addEventListener("change",()=>{
      const set = new Set(t.mentorSkills||[]);
      if(cb.checked){ if(set.size>=2){ cb.checked=false; toast("Choose only two Mentor Skills"); return; } set.add(k); }
      else set.delete(k);
      t.mentorSkills = [...set]; save(); renderBattle();
    });
    skWrap.append(el("label",{class:"chip",style:"display:inline-flex;gap:4px;align-items:center;cursor:pointer"}, cb, lbl));
  });
  card.append(skWrap);
  if(t.mentorSkills.length===2) card.append(el("div",{class:"small muted",style:"margin-bottom:8px"},
    `Sum of Mentor Skill ranks: +${mentorSkillSum(t)} to the level cap for taught moves.`));
  const uc = usesControl(t, "feature", "Mentor", mf?.frequency||"Daily x3 - Extended Action", renderBattle);
  card.append(el("div",{class:"inline",style:"gap:8px;align-items:center;flex-wrap:wrap"},
    el("button",{class:"btn-primary",onclick:()=>openMentorPicker(t)},"🎓 Use Mentor"),
    uc?el("span",{},uc):""));
  return card;
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
  // the trainer's own custom actions/notes, same type/fav filtering as Features
  const customRows = (isTrainer && (isTypeFilter(battleFilter) || battleFilter==="fav"))
    ? (c.trainer.customActions||[])
        .filter(a => battleFilter==="fav" ? favs.has(customFavId(a.id)) : a.type===battleFilter)
        .sort((a,b)=>a.name.localeCompare(b.name))
    : [];
  if(!list.length && !featRows.length && !customRows.length){ root.append(el("div",{class:"muted",style:"padding:10px"}, battleFilter==="fav"?"No favourites yet — tap ☆ on any action or Feature to pin it here.":"Nothing here for this actor.")); return; }
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
  if(customRows.length){
    wrap.append(el("div",{class:"section-head",style:"margin-top:14px"}, "Custom Actions"));
    customRows.forEach(a=>wrap.append(customActionRow(a, c.trainer, renderBattle)));
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
  const favSet = new Set(p.fav||[]);
  [...p.moves].sort((a,b)=>(favSet.has(b)?1:0)-(favSet.has(a)?1:0)).forEach(mn=>{
    const m=moveByName.get(mn.toLowerCase());
    card.append(moveSlot(p,sp,m,mn,{rerender:renderBattle, faved:favSet.has(mn),
      onFav:()=>{ p.fav=toggleSet(favSet,mn); save(); renderBattle(); }}));
  });
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
/* ===================================================================
   Custom Actions — freeform trainer actions/notes for anything the data
   pipeline couldn't scan (homebrew Features, GM rulings, house rules).
   Stored in t.customActions[] = {id,name,type,effect}; type is one of
   CUSTOM_ACTION_TYPES so they surface in the matching Standard/Shift/
   Swift/Free/Full battle tab exactly like BATTLE_ACTIONS/Features do.
=================================================================== */
const CUSTOM_ACTION_TYPES = [["standard","Standard"],["shift","Shift"],["swift","Swift"],["free","Free"],["full","Full"],["other","Other / passive"]];
const customFavId = id => "custom:"+id;
function openCustomActionEditor(t, existing, rerender){
  const nm = el("input",{type:"text",placeholder:"e.g. Homebrew Rock Throw",value:existing?.name||""});
  const typeSel = el("select");
  CUSTOM_ACTION_TYPES.forEach(([v,l])=>typeSel.append(el("option",{value:v,selected:existing?.type===v},l)));
  const eff = el("textarea",{rows:5,placeholder:"What it does — notes, rulings, anything we couldn't auto-import."});
  eff.value = existing?.effect||"";
  const body = el("div",{},
    el("label",{class:"field"}, el("span",{},"Name"), nm),
    el("label",{class:"field",style:"margin-top:8px"}, el("span",{},"Action type"), typeSel),
    el("label",{class:"field",style:"margin-top:8px"}, el("span",{},"Effect / notes"), eff));
  modal({title: existing?"Edit custom action":"Add a custom action", bodyNode:body, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>{
      const name = nm.value.trim(); if(!name) return;
      if(!Array.isArray(t.customActions)) t.customActions=[];
      if(existing){ existing.name=name; existing.type=typeSel.value; existing.effect=eff.value.trim(); }
      else t.customActions.push({ id:uid(), name, type:typeSel.value, effect:eff.value.trim() });
      save(); closeModal(); rerender();
    }},"Save"),
  ]});
}
function customActionRow(a, t, rerender){
  const d=el("details",{class:"spoiler"});
  const typeLbl = (CUSTOM_ACTION_TYPES.find(([v])=>v===a.type)||[,"Other"])[1];
  const favs=getFavActions(), fav=favs.has(customFavId(a.id));
  d.append(el("summary",{},
    el("button",{class:"actstar"+(fav?" on":""),title:fav?"unfavourite":"favourite",
      onclick:e=>{ e.preventDefault(); toggleFavAction(customFavId(a.id)); rerender(); }}, fav?"★":"☆"),
    el("span",{style:"font-weight:700;color:var(--ink)"}, a.name),
    el("span",{class:"muted small",style:"margin-left:8px"}, typeLbl+" · custom")));
  d.append(el("div",{class:"small",style:"margin-top:6px;white-space:pre-wrap"}, a.effect||"(no notes)"));
  d.append(el("div",{class:"inline",style:"margin-top:6px;gap:10px"},
    el("button",{class:"linkbtn",onclick:()=>openCustomActionEditor(t,a,rerender)},"edit"),
    el("button",{class:"linkbtn danger",onclick:()=>{ t.customActions=t.customActions.filter(x=>x.id!==a.id); save(); rerender(); }},"remove")));
  return d;
}
/* full manage-everything list for the Combat tab (all types, add button) */
function customActionsCard(t, rerender){
  if(!Array.isArray(t.customActions)) t.customActions=[];
  const card = el("div",{class:"card"}, el("h3",{},"Custom Actions & Notes",
    el("span",{class:"muted small"},"anything we couldn't auto-scan")));
  if(!t.customActions.length) card.append(el("div",{class:"muted small"},"None yet — add homebrew moves, GM rulings, or anything else worth tracking."));
  t.customActions.forEach(a=>card.append(customActionRow(a,t,rerender)));
  card.append(el("button",{class:"linkbtn h-act",style:"margin-top:6px",onclick:()=>openCustomActionEditor(t,null,rerender)},"+ Add custom action"));
  return card;
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
/* ===================================================================
   Item-granted attacks (#7) — capture Equipment that provides a Status
   Attack (Core pp.292-293). Curated from the rulebook and matched against
   the trainer's inventory by name (like Weapon Moves). Extend ITEM_MOVES
   with more item→action entries as they're confirmed.
=================================================================== */
const ITEM_MOVES = {
  "Hand Net":     { name:"Hand Net", ac:6, cls:"Status", range:"Melee (Reach)",
    effect:"AC6 Status Attack to net a Small Pokémon. On a hit you scoop it up and trap it; you may drag it as you move. It can still use long-range attacks or attack the net to break free. Capture Rolls against a netted Pokémon get −20." },
  "Weighted Net": { name:"Weighted Net", ac:8, cls:"Status", range:"Thrown · Standard Action",
    effect:"AC8 Status Attack (thrown). While netted the target is Slowed and cannot use Sky or Levitate Speeds; you may pull it 1 metre toward you as a Standard Action." },
  "Glue Cannon":  { name:"Glue Cannon", ac:8, cls:"Status", range:"Ranged · expends a charge",
    effect:"AC8 Status Attack; expends a charge. On a hit the target is Slowed; on a critical hit it is Stuck and Trapped instead." },
};
function normItemKey(s){ return String(s==null?"":s).toLowerCase().replace(/[^a-z0-9]/g,"").replace(/s$/,""); }
/* status attacks granted by items the trainer is carrying (matched by name) */
function inventoryItemAttacks(t){
  const out=[], seen=new Set();
  (t.inventory||[]).forEach(it=>{
    const nm = normItemKey(it && (it.name!=null ? it.name : it));
    Object.entries(ITEM_MOVES).forEach(([k,prof])=>{
      if(nm===normItemKey(k) && !seen.has(k)){ seen.add(k); out.push(prof); }
    });
  });
  return out;
}
/* roll a curated item Status Attack — accuracy only (no damage), shows its effect */
function openItemAttack(t, prof){
  const bm = buffMods(t);
  const accCS = trainerDerived(t).cs.acc||0;   // Accuracy Combat Stage: flat add to Accuracy Rolls (Core p.234)
  const body = el("div",{});
  body.append(el("div",{class:"chips",style:"margin-bottom:10px"},
    el("span",{class:"kv"},"Status"), el("span",{class:"kv"},`AC ${prof.ac}`), el("span",{class:"kv"},prof.range)));
  body.append(el("div",{class:"small",style:"margin-bottom:12px;white-space:pre-wrap"}, prof.effect));
  const out = el("div",{class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"},"Press 🎲 Roll to test the Accuracy Check."));
  const doRoll = ()=>{ out.innerHTML=""; out.style.borderStyle="solid";
    const acc = 1+Math.floor(Math.random()*20), accTot = acc + (bm.acc||0) + accCS;
    const accBits = []; if(bm.acc) accBits.push(`+${bm.acc} buffs`); if(accCS) accBits.push(`${accCS>0?"+":"−"}${Math.abs(accCS)} Accuracy CS`);
    out.append(el("div",{},
      el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"),
      el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${accTot}`,
        el("span",{class:"muted",style:"font-size:13px;font-weight:600"}, accBits.length?`  (${acc} ${accBits.join(" ")})`:" (1d20)")),
      el("div",{class:"small muted"}, `Hits if ${accTot} ≥ AC ${prof.ac} + the target's Evasion.${acc===20?" Natural 20 — auto-hit!":acc===1?" Natural 1 — auto-miss.":""}`))); };
  body.append(out);
  modal({title:prof.name, bodyNode:body, footNodes:[ el("button",{class:"btn-primary",onclick:doRoll},"🎲 Roll dice") ]});
}

function renderTrainerCombat(root, t){
  const card=el("div",{class:"card"},el("h3",{},"Struggle & Weapon Attacks"));
  card.append(trainerStruggleControl(t, renderBattle));
  // unarmed Struggle (always available)
  card.append(trainerAttackSlot(t, trainerStruggle(t), ()=>openTrainerAttack(t), {tag:"unarmed"}));
  // one attack per weapon (+ its Adept/Master Weapon Techniques, gated by Combat rank)
  (t.weapons||[]).forEach(w=>{
    card.append(trainerAttackSlot(t, trainerStruggle(t, w), ()=>openTrainerAttack(t, null, w), {tag:w.category}));
    [["weaponMoveAdept","adept","Adept Technique"],["weaponMoveMaster","master","Master Technique"]].forEach(([field_,tier,tag])=>{
      const mn = w[field_]; if(!mn || !weaponMoveRankOk(t, tier)) return;
      const wm = trainerAttackProfile(t, mn, w);
      const uc = usesControl(t, "move", wm.name, wm.frequency, renderBattle);
      card.append(trainerAttackSlot(t, wm, ()=>openTrainerAttack(t, mn, w), {tag, uc, move:true}));
    });
  });
  card.append(el("div",{class:"small muted",style:"margin-top:8px"},
    (t.weapons||[]).length ? "Each weapon (and its Weapon Move) is listed above. Add/edit weapons in Trainer → Sheet → Weapons."
                           : "Unarmed Struggle only — add weapons in Trainer → Sheet → Weapons. Action Features (Cheer, Orders…) appear under the tabs above."));
  root.append(card);
  // Throw a Poké Ball: a real action on the trainer's own sheet, targeting a wild Pokémon
  // currently visible on the shared Map — not something you trigger by clicking a Pokémon.
  const pb = el("div",{class:"card"}, el("h3",{},"Poké Balls"));
  const pbSlot = el("div",{class:"moveslot"});
  pbSlot.append(el("div",{style:"flex:1"},
    el("div",{style:"font-weight:700"}, "Throw a Poké Ball"),
    el("div",{class:"ms-info"}, "Standard Action · AC 6 · try to capture a wild Pokémon")));
  pbSlot.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",onclick:()=>openThrowPokeball(t)},"🎲 Roll"));
  pb.append(pbSlot);
  root.append(pb);
  // capture tools carried in inventory grant Status Attacks (Hand Net, Weighted Net…) (#7)
  const itemAtks = inventoryItemAttacks(t);
  if(itemAtks.length){
    const ic = el("div",{class:"card"}, el("h3",{},"Capture Tools",
      el("span",{class:"muted small"},"from your inventory")));
    itemAtks.forEach(prof=>{
      const slot = el("div",{class:"moveslot"});
      slot.append(el("div",{style:"flex:1"},
        el("div",{style:"font-weight:700"}, prof.name, el("span",{class:"muted small",style:"margin-left:6px;font-weight:600"},"item")),
        el("div",{class:"ms-info"}, `Status · AC ${prof.ac} · ${prof.range}`)));
      slot.append(el("button",{class:"btn-secondary",style:"padding:6px 10px",onclick:()=>openItemAttack(t,prof)},"🎲 Roll"));
      ic.append(slot);
    });
    root.append(ic);
  }
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
  if(!Array.isArray(t.abilities)) t.abilities=[];
  if(t.abilities.length){
    const abc=el("div",{class:"card"},el("h3",{},`Abilities (${t.abilities.length})`,
      el("span",{class:"muted small"},"passive, from Trainer → Features & Edges")));
    t.abilities.forEach(an=>{
      const ab=abilityByName.get(an.toLowerCase());
      const row=el("details",{class:"spoiler"});
      const uc=usesControl(t,"ability",an,ab?.frequency,renderBattle);
      row.append(el("summary",{},
        el("span",{style:"font-weight:700;color:var(--ink)"}, an),
        ab&&ab.frequency?el("span",{class:"muted small",style:"margin-left:8px"}, ab.frequency):"",
        uc?el("span",{style:"margin-left:8px"},uc):""));
      row.append(el("div",{class:"small",style:"margin-top:6px",html: ab?abilityText(ab):"<span class='muted'>Not in database.</span>"}));
      abc.append(row);
    });
    root.append(abc);
  }
  root.append(mentorCard(t));
  const passive=trainerFeatureObjs(t).filter(f=>!featureActionTypes(f).length);
  const pc=el("div",{class:"card"},el("h3",{},`Passive & Always-On (${passive.length})`,
    el("span",{class:"muted small"},"Static / out-of-combat")));
  if(!passive.length) pc.append(el("span",{class:"muted small"},"none — your action Features are in the tabs above, or learn Features in Trainer → Features & Edges."));
  passive.forEach(f=>pc.append(featureActionRow(f, t, renderBattle)));
  root.append(pc);
  root.append(customActionsCard(t, renderBattle));
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
function newEncounter(name){ return { id:uid(), name:name||"New Encounter", sig:1, players:3, mons:[], trainers:[], notes:"" }; }
function normEncounter(e){
  if(!e) return e;
  if(!Array.isArray(e.mons)) e.mons=[];
  if(!Array.isArray(e.trainers)) e.trainers=[];
  if(typeof e.sig!=="number") e.sig=2;
  if(typeof e.players!=="number") e.players=1;
  if(typeof e.archived!=="boolean") e.archived=false;   // hidden from the active list without deleting
  if(typeof e.notes!=="string") e.notes="";
  e.mons.forEach(normPokemon);
  e.trainers.forEach(tr=>{ if(tr.trainer) normTrainer(tr.trainer); if(!Array.isArray(tr.pokemon)) tr.pokemon=[]; tr.pokemon.forEach(normPokemon); });
  return e;
}
/* deep-clone an encounter with fresh ids throughout, so map-token links (which key on
   encId+monId/trainerId) never accidentally point a token at the wrong copy */
function duplicateEncounter(e, name){
  const c = JSON.parse(JSON.stringify(e));
  c.id = uid(); c.name = name; c.archived=false;
  c.mons.forEach(p=>p.id=uid());
  c.trainers.forEach(tr=>{ tr.id=uid(); if(tr.trainer) tr.trainer.id=uid(); tr.pokemon.forEach(p=>p.id=uid()); });
  return c;
}
/* swap an item one slot up(-1)/down(+1) within its list — used to reorder wild Pokémon,
   Trainers, and each Trainer's own party in the Encounters tab */
function encMoveItem(list, item, dir){
  const i=list.indexOf(item); if(i<0) return;
  const j=i+dir; if(j<0||j>=list.length) return;
  [list[i],list[j]]=[list[j],list[i]]; saveEnc(); renderEncounters();
}
/* ▲▼ reorder buttons shared by wild/trainer Pokémon rows and Trainer cards */
function encOrderBtns(list, item){
  const i=list.indexOf(item);
  return el("span",{class:"inline",style:"gap:2px"},
    el("button",{class:"btn-secondary",style:"padding:3px 7px",title:"move up",disabled:i<=0,
      onclick:()=>encMoveItem(list,item,-1)},"▲"),
    el("button",{class:"btn-secondary",style:"padding:3px 7px",title:"move down",disabled:i<0||i>=list.length-1,
      onclick:()=>encMoveItem(list,item,1)},"▼"));
}
/* encounters live in the cloud when connected (so map tokens can link to them), else device-local */
function encList(){ return mode==="cloud" ? ensureEnc().data.encounters : (state.encounters || (state.encounters=[])); }
function activeEncounter(){ const a=encList(); return a.find(e=>e.id===state.activeEncounterId) || a[0]; }
let encSaveTimer;
function saveEnc(){
  if(mode==="cloud"){
    const row = ensureEnc();   // conflict-safe write is debounced below (CAS by rev, not clock)
    cacheSharedRow("enc", row);   // optimistic: survives a refresh before the debounced write lands
    clearTimeout(encSaveTimer); encSaveTimer=setTimeout(()=>{ encSaveTimer=null; encUpsert(); }, 400); return; }
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

/* Keep a wild Pokémon's level-up moveset in sync with its level (mirrors the "most recent 6"
   rule addEncounterMon uses when first adding it): moves newly eligible at the new level are
   added, moves the new level no longer qualifies for are dropped. Moves NOT sourced from the
   level-up list — TM/tutor/egg moves the GM added by hand via "+ move" — are left alone, so
   nudging the level field can never silently wipe a deliberate pick. */
function syncEncMonLevelupMoves(p, sp){
  if(!sp) return;
  const allLevelup = new Set(speciesLevelupNames(sp, MAX_LEVEL));
  const kept = p.moves.filter(m=>!allLevelup.has(m));
  const current = speciesLevelupNames(sp, p.level).slice(-6);
  p.moves = [...current, ...kept];
}
function addEncounterMon(enc, into){
  // "Mega X" DB entries are stat/type stubs for the temporary Mega Evolve transform (megaEvolve) —
  // they carry no moves or abilities of their own, so adding one directly would spawn a mon that
  // can't act. Add the base species instead, then use the ✨ Mega Evolve button on its card.
  const names = D.species.filter(s=>!/^mega\s/i.test(s.name)).map(s=>s.name);
  openPicker("Add a Pokémon", names, name=>{
    const p=newPokemon(name); const sp=getSpecies(name);
    p.level=5; p.xp=xpForLevel(5);
    if(sp){ p.moves = speciesLevelupNames(sp, p.level).slice(-6);           // pre-load level-up moves
            if(sp.abilities?.basic?.length) p.abilities=[sp.abilities.basic[0]]; }
    p.auras = legendaryAurasFor(name); initAuraActive(p);                   // legendaries get their book Domains
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

/* Signature Technique (Trainer Classes Feature, Elite Trainer + Expert Command): spend 2 Tutor
   Points on a Pokemon to mark one of its Moves as its Signature Technique and apply one
   modification. Each modification requires the Trainer to know a specific Training Feature
   (Agility/Brutal/Focused/Inspired Training) and only applies to a matching Move category —
   Cone/Line/Burst/Blast ("aoe") vs Single Target ("single") Moves are targeting-based; Damaging
   vs Status ("damaging"/"status") are class-based; a Move can be eligible under both axes at once. */
const SIG_TECH_MODS = [
  { name:"Scattershot", feature:"Agility Training", category:"aoe",
    effect:"Instead of the Move's normal range, it has a range of 4m, 3 Targets." },
  { name:"Shock and Awe", feature:"Inspired Training", category:"aoe",
    effect:"Foes targeted take −2 to Save Checks and −1 Evasion until the end of the user's next turn (hit or miss)." },
  { name:"Vicious Storm", feature:"Brutal Training", category:"aoe",
    effect:"The Move gains the Smite keyword. Damaging Moves only." },
  { name:"Guarding Strike", feature:"Inspired Training", category:"single",
    effect:"If this Move hits, the user gains +5 Damage Reduction against that target until the end of their next turn." },
  { name:"Unbalancing Blow", feature:"Brutal Training", category:"single",
    effect:"Hit or miss, the target becomes Vulnerable until next hit by a Damaging Attack or 1 full round passes." },
  { name:"Reliable Attack", feature:"Focused Training", category:"single",
    effect:"If the Move misses, its Frequency isn't spent and the user may immediately Struggle as a Free Action. Not for Smite Moves." },
  { name:"Alternative Energy", feature:"Focused Training", category:"damaging",
    effect:"Switch the Move's Class from Physical to Special or vice versa." },
  { name:"Bloodied Speed", feature:"Agility Training", category:"damaging",
    effect:"This Move may be used as Priority (Advanced) if the user has less than half its max HP." },
  { name:"Double Down", feature:"Brutal Training", category:"damaging",
    effect:"The Move gains Double Strike (effects/ranges trigger once). Only for DB≤4 Moves w/o variable or special-case damage." },
  { name:"Burst of Motivation", feature:"Inspired Training", category:"status",
    effect:"After resolving, the user may raise any negative-CS Stats by up to +2 CS (not above 0 total)." },
  { name:"Supreme Concentration", feature:"Focused Training", category:"status",
    effect:"May be used even if Paralyzed, Flinched, Enraged, or failing a Confusion Save." },
  { name:"Double Curse", feature:"Agility Training", category:"status",
    effect:"The user may target an additional foe. Only for 1-Target Moves." },
];
function sigTechCategoryMatch(cat, m){
  const aoe = moveHasKeyword(m,"cone")||moveHasKeyword(m,"line")||moveHasKeyword(m,"burst")||moveHasKeyword(m,"blast");
  if(cat==="aoe") return aoe;
  if(cat==="single") return !aoe;
  if(cat==="damaging") return (m.class||"")!=="Status";
  if(cat==="status") return (m.class||"")==="Status";
  return false;
}
function sigTechEligibleMods(trainer, m){
  const feats = new Set((trainer && trainer.features) || []);
  return SIG_TECH_MODS.filter(x => feats.has(x.feature) && sigTechCategoryMatch(x.category, m));
}
function clearSigTechnique(p){
  if(!p.sigTechnique) return;
  p.tutorPoints = (p.tutorPoints||0) + 1;
  const was = p.sigTechnique.move;
  p.sigTechnique = null;
  saveEnc(); renderEncounters();
  toast(`${was} is no longer a Signature Technique (+1 Tutor Point refunded)`);
}
function openSigTechPicker(trainer, p, m, mn){
  const eligible = sigTechEligibleMods(trainer, m);
  if(!eligible.length){ toast("No Signature Technique modification fits — the Trainer needs a matching Training Feature (Agility/Brutal/Focused/Inspired) for this Move's category."); return; }
  const already = p.sigTechnique && p.sigTechnique.move===mn;
  if(!already && (p.tutorPoints||0) < 2){ toast(`Signature Technique costs 2 Tutor Points (has ${p.tutorPoints||0}).`); return; }
  const names = eligible.map(x=>x.name);
  openPicker(`Signature Technique for ${mn}`, names, name=>{
    const mod = eligible.find(x=>x.name===name);
    if(p.sigTechnique && p.sigTechnique.move!==mn) p.tutorPoints = (p.tutorPoints||0) + 1;   // switching moves refunds the old one
    if(!already) p.tutorPoints = Math.max(0,(p.tutorPoints||0)-2);
    p.sigTechnique = { move: mn, mod: mod.name };
    saveEnc(); renderEncounters();
    toast(`${mn} is now ${p.species}'s Signature Technique (${mod.name})`);
  });
}
function encounterMoveRow(p, sp, m, mn, favSet, onFav, isStruggle, trainer){
  const row=el("div",{class:"inline",style:"gap:6px;align-items:center;margin-top:5px;justify-content:space-between"});
  const left=el("div",{class:"inline",style:"gap:6px;align-items:center;min-width:0;flex:1"});
  if(isStruggle) left.append(el("span",{class:"muted small",title:"always available"},"⚔"));
  else { const isF=favSet.has(mn); left.append(el("button",{class:"actstar"+(isF?" on":""),
    title:isF?"unpin favourite":"pin favourite",onclick:onFav}, isF?"★":"☆")); }
  left.append(el("span",{style:"font-weight:700;white-space:nowrap"}, m?m.name:mn), m?el("span",{html:typeBadge(effectiveMoveType(p,m))}):"");
  if(m) left.append(el("span",{class:"small muted",style:"min-width:0;overflow:hidden;text-overflow:ellipsis"}, moveLineShort(m)));
  const isSig = p.sigTechnique && p.sigTechnique.move===mn;
  if(isSig) left.append(el("span",{class:"kv",title:`Signature Technique: ${p.sigTechnique.mod}`},"🏆 "+p.sigTechnique.mod));
  row.append(left);
  const acts=el("div",{class:"inline",style:"gap:6px"});
  if(m && !isStruggle){ const uc = usesControl(p, "move", m.name, m.frequency, renderEncounters, saveEnc, {bossEot:isBoss(p)}); if(uc) acts.append(uc); }
  if(m) acts.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"move details",
    onclick:()=>modal({title:m.name, bodyNode:el("div",{class:"small",html:moveDetailHTML(m,m.name)}),
      footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]})},"ℹ"));
  if(m) acts.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"roll this move",onclick:()=>openMoveRoll(p,m,sp)},"🎲"));
  const hasSigFeature = !!(trainer && trainer.features && trainer.features.includes("Signature Technique"));
  if(m && !isStruggle && trainer && (hasSigFeature || isSig)) acts.append(el("button",{class:"btn-secondary"+(isSig?" on":""),style:"padding:5px 10px",
    title:isSig?"forget this Signature Technique (+1 Tutor Point)":"make this the Pokémon's Signature Technique (needs 2 Tutor Points + a matching Training Feature)",
    onclick:()=> isSig ? clearSigTechnique(p) : openSigTechPicker(trainer,p,m,mn)},"🏆"));
  if(!isStruggle) acts.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted)",title:"remove move",
    onclick:()=>{ const i=p.moves.indexOf(mn); if(i>=0){ p.moves.splice(i,1); saveEnc(); renderEncounters(); } }},"×"));
  row.append(acts);
  return row;
}
function encounterAbilityRow(p, an){
  const ab=abilityByName.get((an||"").toLowerCase());
  const row=el("details",{class:"spoiler",style:"margin-top:5px"});
  row.dataset.key = "ability:"+p.id+":"+an;
  const uc = usesControl(p, "ability", an, ab?.frequency, renderEncounters, saveEnc, {bossEot:isBoss(p)});
  row.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"}, an||"—"),
    ab&&ab.frequency?el("span",{class:"muted small",style:"margin-left:8px"}, ab.frequency):"",
    uc?el("span",{style:"margin-left:8px"},uc):"",
    el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove ability",
      onclick:e=>{ e.preventDefault(); const i=p.abilities.indexOf(an); if(i>=0){ p.abilities.splice(i,1); saveEnc(); renderEncounters(); } }},"×")));
  row.append(el("div",{class:"small",style:"margin-top:6px",html: ab?abilityText(ab):"<span class='muted'>Not in database</span>"}));
  return row;
}
/* one expandable Class/Feature/Edge/Ability row on an encounter trainer card.
   `t`+`ownerKey` let Feature uses (e.g. Scene-frequency Cheers/Orders) track & show a pip tracker. */
function encTrainerRefRow(t, ownerKey, name, kind, onRemove){
  const row=el("details",{class:"spoiler",style:"margin-top:5px"});
  const freq=refFrequency(kind, name);
  row.dataset.key = kind+":"+ownerKey+":"+name;
  const uc = kind==="feature" ? usesControl(t, "feature", name, freq, renderEncounters, saveEnc) : null;
  row.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"}, name),
    freq?el("span",{class:"muted small",style:"margin-left:8px"}, freq):"",
    uc?el("span",{style:"margin-left:8px"},uc):"",
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
/* roll a Pokémon's random identity: nature, gender, shiny (1d100, Shiny on a 1 — 1 in 100, houserule override of Core p.212's 1-or-100), stats */
function encRandomize(p){
  p.nature = D.natures[Math.floor(Math.random()*D.natures.length)].name;
  p.gender = ENC_GENDERS[Math.floor(Math.random()*ENC_GENDERS.length)];
  const roll = 1 + Math.floor(Math.random()*100);
  p.shiny = (roll===1);
  encSpreadStats(p);
}
/* send an encounter Pokémon to the shared PC (i.e. it's been caught) and remove it from the field */
async function sendEncMonToPC(enc, p, list){
  if(mode!=="cloud"){ toast("Join the campaign (☁ cloud) to send Pokémon to the shared PC"); return; }
  ensurePCRow();
  const m = normPokemon(JSON.parse(JSON.stringify(p)));
  m.id = uid(); m.onTeam = false; m.currentHP = null; delete m.encFav;
  delete m.swarm;   // "catching" a Swarm means pulling ONE individual out of it — not boxing the horde
  m._pcFrom = "Encounter"+(enc.name?": "+enc.name:""); m._pcAt = Date.now();
  cloud.pc.data.pokemon.push(m);
  const i = list.indexOf(p); if(i>=0) list.splice(i,1);   // caught → leaves the encounter
  removeEncMonTokens(p.id);                                // and clear its token off any battle map
  saveEnc(); toast(`Caught ${encMonName(p)} → sent to the PC ✓`); renderEncounters();
  if(!await pcUpsert()) toast("⚠ PC sync issue — it'll reconcile on the next change");
}
/* remove any battle-map token(s) linked to an encounter Pokémon (it left the field / was caught) */
function removeEncMonTokens(monId){
  const byMap = cloud.mapTokens?.data?.byMap; if(!byMap) return;
  let changed=false;
  for(const mid of Object.keys(byMap)){
    const before = byMap[mid].length;
    byMap[mid] = byMap[mid].filter(t=>!(t.link && t.link.kind==="enc" && t.link.monId===monId));
    if(byMap[mid].length!==before) changed=true;
  }
  if(changed) mapTokensSave();   // optimistic serialized sync; realtime removes it for everyone
}
/* turn the Swarm Template on/off for an encounter Pokémon. Turning it on refills to full bars so
   the GM doesn't start a horde already wounded; turning it off collapses back to one normal bar. */
function toggleSwarm(p){
  if(isSwarm(p)){ delete p.swarm; p.currentHP = Math.min(p.currentHP, pokeDerived(p).maxHP); return; }
  p.swarm = { on:true, maxMult:2, mult:2, sp:2, freeUsed:false };
  normSwarm(p);
  p.currentHP = pokeDerived(p).maxHP;
}
/* Swarm control block on the encounter card: size/Multiplier, the HP bars, and the Swarm Point
   tracker with the book's per-Frequency costs. */
function swarmCard(p){
  const s = p.swarm, d = pokeDerived(p), barMax = d.maxHP;
  const wrap = el("div",{class:"card",style:"background:var(--panel-2);margin:8px 0 0;border:1px solid var(--accent)"});
  wrap.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:6px"},
    `🐝 Swarm Template — ×${s.mult}`, el("span",{class:"muted",style:"font-weight:600"}, "  (Core p.478)")));

  // size / multiplier
  const sizeSel = el("select");
  SWARM_SIZES.forEach(z=>sizeSel.append(el("option",{value:z.mult,selected:z.mult===s.maxMult}, `×${z.mult} — ${z.label}`)));
  sizeSel.addEventListener("change", ()=>{
    s.maxMult = parseInt(sizeSel.value)||1;
    s.mult = s.maxMult; s.sp = s.maxMult; s.freeUsed = false;
    p.currentHP = pokeDerived(p).maxHP;                    // resize = a fresh swarm
    normSwarm(p); saveEnc(); renderEncounters();
  });
  wrap.append(el("label",{class:"field",style:"max-width:280px"}, el("span",{},"Swarm size"), sizeSel));

  // HP bars
  const bars = el("div",{class:"inline",style:"gap:4px;margin-top:8px;flex-wrap:wrap"});
  for(let i=s.maxMult; i>=1; i--){
    const full = i < s.mult, cur = i === s.mult;
    const pct = cur ? Math.max(0, Math.min(100, Math.round(p.currentHP/barMax*100))) : (full?100:0);
    bars.append(el("div",{style:"flex:1;min-width:52px"},
      el("div",{class:"hpbar",style:"height:9px"}, el("i",{style:`width:${pct}%;background:${cur?"var(--accent)":full?"var(--good)":"transparent"}`}))));
  }
  wrap.append(el("div",{class:"small muted",style:"margin-top:6px;font-weight:700"},
    `HP bars — ${s.mult} of ${s.maxMult} left · ${swarmTotalHP(p)} / ${swarmMaxTotalHP(p)} total`), bars);
  if(swarmDefeated(p)) wrap.append(el("div",{class:"warnbox",style:"margin-top:8px"},"💀 The swarm is broken — every bar is gone."));

  // Swarm Points
  const spRow = el("div",{class:"inline",style:"gap:6px;margin-top:10px;align-items:center;flex-wrap:wrap"});
  spRow.append(el("span",{class:"small",style:"font-weight:700"}, `⚡ Swarm Points: ${s.sp} / ${s.mult}`));
  const bump = n => { s.sp = Math.max(0, Math.min(s.maxMult, s.sp+n)); saveEnc(); renderEncounters(); };
  spRow.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"spend a point by hand",onclick:()=>bump(-1)},"−1"),
               el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"give a point back",onclick:()=>bump(+1)},"+1"),
               el("button",{class:"btn-secondary",style:"padding:3px 9px",
                 title:"new round — points back to the current Multiplier and the free Standard Action re-armed",
                 onclick:()=>{ swarmNewRound(p); saveEnc(); renderEncounters(); }},"↺ Round"));
  spRow.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",
    title:"it couldn't act (Sleep, etc.) — Core p.478: lose 1 Swarm Point instead",
    onclick:()=>{ s.sp=Math.max(0,s.sp-1); saveEnc(); renderEncounters(); toast("😴 Couldn't act — −1 Swarm Point"); }},"😴 Can't act"));
  wrap.append(spRow);
  wrap.append(el("div",{class:"small muted",style:"margin-top:4px"},
    (s.freeUsed ? "Free Standard Action: used this round." : "Free Standard Action: available.")
    + " Costs — At-Will 1 · EOT 2 · Scene 3 · Daily 4. Rolling one of its moves spends automatically."));
  wrap.append(el("div",{class:"small muted",style:"margin-top:4px"},
    `Attacks against it: +${s.mult} Accuracy · single-target damage resisted one step further · area attacks one step more effective. It takes no Injuries.`));
  return wrap;
}

/* Boss Template card (Running the Game p.487-488) — mirrors swarmCard's shape: size control up
   top, HP bars, then the mechanics unique to this template. */
/* Boss Template card — works for both encounter Pokémon and Trainers (owner-generic, see the
   bossBarMax/bossOwnerName discriminators above). */
function bossCard(owner){
  const b = owner.boss, barMax = bossBarMax(owner), isMon = owner.species!==undefined;
  const wrap = el("div",{class:"card",style:"background:var(--panel-2);margin:8px 0 0;border:1px solid var(--accent)"});
  wrap.append(el("div",{class:"small",style:"font-weight:800;margin-bottom:6px"},
    `👑 Boss Template`, el("span",{class:"muted",style:"font-weight:600"}, "  (Running the Game p.487)")));

  // actions/round (= HP bars, 1:1) + base Initiative — resizing is a fresh boss (full heal, all bars back)
  const actIn = el("input",{type:"number",min:1,max:12,value:b.actions,style:"width:64px"});
  actIn.addEventListener("change", ()=>{
    b.actions = Math.max(1,Math.min(12,parseInt(actIn.value)||1));
    b.curBar = b.actions; b.halfInjuryGiven=false;
    owner.currentHP = bossBarMax(owner);
    normBoss(owner); saveEnc(); renderEncounters();
  });
  const initIn = el("input",{type:"number",min:1,value:b.baseInit,style:"width:64px"});
  initIn.addEventListener("change", ()=>{ b.baseInit=Math.max(1,parseInt(initIn.value)||1); saveEnc(); renderEncounters(); });
  const row1 = el("div",{class:"fieldrow"});
  row1.append(
    el("label",{class:"field",style:"max-width:200px"}, el("span",{},"Actions/round (= HP bars)"), actIn),
    el("label",{class:"field",style:"max-width:160px"}, el("span",{},"Base Initiative"), initIn));
  wrap.append(row1);

  const counts = bossInitiativeCounts(b.baseInit, b.actions);
  wrap.append(el("div",{class:"small muted",style:"margin-top:2px"},
    "Acts on Initiative: ", el("b",{}, counts.join(", ")),
    " — space its turns through the round (Running the Game p.487)."));

  // HP bars
  const bars = el("div",{class:"inline",style:"gap:4px;margin-top:8px;flex-wrap:wrap"});
  for(let i=b.actions; i>=1; i--){
    const full = i < b.curBar, cur = i === b.curBar;
    const pct = cur ? Math.max(0, Math.min(100, Math.round(owner.currentHP/barMax*100))) : (full?100:0);
    bars.append(el("div",{style:"flex:1;min-width:52px"},
      el("div",{class:"hpbar",style:"height:9px"}, el("i",{style:`width:${pct}%;background:${cur?"var(--accent)":full?"var(--good)":"transparent"}`}))));
  }
  wrap.append(el("div",{class:"small muted",style:"margin-top:6px;font-weight:700"},
    `HP bars — ${b.curBar} of ${b.actions} left · ${bossTotalHP(owner)} / ${bossMaxTotalHP(owner)} total`), bars);
  if(bossDefeated(owner)) wrap.append(el("div",{class:"warnbox",style:"margin-top:8px"},"💀 Every Hit Point bar is gone."));
  else if(bossOnLastBar(owner)) wrap.append(el("div",{class:"warnbox",style:"margin-top:8px"},
    "⚠ Last Hit Point bar — consider a special last-stand effect (Enrage to +6 Attack CS, unlock a signature attack, clear its negative Combat Stages/Statuses…)."));

  wrap.append(el("div",{class:"small muted",style:"margin-top:8px;font-weight:700"},"When Staggered (loses a bar), consider one or more of:"));
  const sugg = el("div",{class:"chips",style:"margin-top:2px"});
  BOSS_STAGGER_EFFECTS.forEach(t=>sugg.append(el("span",{class:"chip"},t)));
  wrap.append(sugg);

  // Injuries — Bosses only take them from Massive Damage (auto), losing half their bars (auto,
  // flagged once by bossSetTotalHP), or an explicit effect (manual button, for that last case)
  const injRow = el("div",{class:"inline",style:"gap:6px;margin-top:10px;align-items:center"});
  injRow.append(el("span",{class:"small",style:"font-weight:700"},"Injuries"),
    el("button",{class:"btn-secondary",style:"padding:2px 9px",
      onclick:()=>{ owner.injuries=Math.max(0,(owner.injuries||0)-1); owner.currentHP=Math.min(owner.currentHP,bossBarMax(owner)); saveEnc(); renderEncounters(); }},"−"),
    el("span",{style:"font-weight:800;min-width:16px;text-align:center"}, String(owner.injuries||0)),
    el("button",{class:"btn-secondary",style:"padding:2px 9px",title:"for an explicit effect (e.g. Cruelty) that mandates an Injury — Massive Damage and half-bars-lost are already automatic",
      onclick:()=>{ owner.injuries=(owner.injuries||0)+1; owner.currentHP=Math.min(owner.currentHP,bossBarMax(owner)); saveEnc(); renderEncounters(); }},"+"));
  wrap.append(injRow);
  wrap.append(el("div",{class:"small muted",style:"margin-top:2px"},
    "Bosses skip normal Injury rules — only Massive Damage (auto), losing half its HP bars (auto, once), or an explicit effect (use + above) give it one."));

  wrap.append(el("div",{class:"small muted",style:"margin-top:8px"},
    "EOT-frequency Moves show as unlimited below (usable more than once a round if you space a turn between each use) and Scene ×2 Moves may be used back-to-back — the normal Move list already reflects both. "+
    "Status ticks (Burn/Poison/Sandstorm…) and action-denial (Confuse/Paralyze) should only apply once per round, not per turn — assign them to one Initiative Count and leave the rest alone."
    + (isMon ? " Sleep/Frozen are Drowsy/Chilled instead (Status Conditions below) and Disable only locks one Move; Flinch never costs more than one turn a round."
             : " Disable only locks one Move; Flinch never costs more than one turn a round.")));
  return wrap;
}

/* compact combat-stage steppers for an encounter Pokémon (±6 per stat; feeds pokeDerived) */
function encCombatStages(p){
  if(!p.cs) p.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  const d = pokeDerived(p);
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  const any = ALL_CS_STATS.some(([k])=>p.cs[k]);
  det.dataset.key = "cs:"+p.id;
  det.append(el("summary",{}, el("span",{style:"font-weight:700"},"Combat Stages"),
    any?el("span",{class:"muted small",style:"margin-left:8px"},"active"):""));
  const grid = el("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin-top:8px"});
  CS_STATS.forEach(([k,lbl])=>{
    const cell = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:66px"});
    cell.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
    cell.append(el("div",{style:`font-weight:800;${d.cs[k]>0?"color:var(--good)":d.cs[k]<0?"color:var(--bad)":""}`}, String(d.eff[k])));
    cell.append(csStepper(p.cs[k]||0, v=>{ p.cs[k]=Math.max(-6,Math.min(6,v)); saveEnc(); renderEncounters(); }));
    grid.append(cell);
  });
  ACC_EVA_STATS.forEach(([k,lbl])=> grid.append(accEvaCell(lbl, p.cs[k]||0, d.cs[k],
    v=>{ p.cs[k]=Math.max(-6,Math.min(6,v)); saveEnc(); renderEncounters(); })));
  det.append(grid);
  // Especially powerful Boss Pokémon can have some Combat Stages set above zero as their Default
  // (Running the Game p.487) — "reset" then returns to THAT saved default instead of flat zero.
  if(any) det.append(el("button",{class:"linkbtn",style:"margin-top:6px",
    onclick:()=>{ const def = (isBoss(p) && p.boss.defaultCS) || {};
      ALL_CS_STATS.forEach(([k])=>p.cs[k]=def[k]||0); saveEnc(); renderEncounters(); }},"reset combat stages"));
  if(isBoss(p)) det.append(el("button",{class:"linkbtn",style:"margin-top:6px;margin-left:8px",
    title:"save the Combat Stages set right now as this Boss's Default (what 'reset' returns to)",
    onclick:()=>{ p.boss.defaultCS={...p.cs}; saveEnc(); renderEncounters(); toast("📌 Saved as this Boss's default Combat Stages"); }},"📌 set as Boss default"));
  return det;
}
/* Manual stat distribution for an encounter Pokémon — GM spreads the Level+10 added points by hand
   instead of the random roll (#24). Feeds pokeDerived via p.stats[k].added. */
/* shared 🔓 unlock checkbox for encounter stat spreads — GM override to add points past the
   normal budget (abilities/Features/homebrew sometimes demand more than the book budget allows) */
function encUnlockToggle(obj){
  const wrap = el("label",{class:"small",title:"GM: allow adding stat points past the normal budget",
    style:"display:inline-flex;gap:5px;align-items:center;cursor:pointer;font-weight:700;color:var(--muted)"});
  const cb = el("input",{type:"checkbox"}); cb.checked = !!obj.unlocked;
  cb.addEventListener("change",()=>{ obj.unlocked=cb.checked; saveEnc(); renderEncounters(); });
  wrap.append(cb, "🔓 unlock");
  return wrap;
}
function encStatSpread(p){
  const budget = (p.level||1) + 10;
  const keys = STATS;
  keys.forEach(([k])=>{ if(!p.stats[k]) p.stats[k]={added:0}; });
  const spent = keys.reduce((s,[k])=> s + (p.stats[k]?.added||0), 0);
  const remaining = budget - spent;
  const canInc = p.unlocked || remaining > 0;
  const forced = getSpecies(p.species)?.forcedStats;
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "stats:"+p.id;
  det.append(el("summary",{}, el("span",{style:"font-weight:700"},"Distribute stats"),
    el("span",{class:"muted small",style:"margin-left:8px"}, `${remaining} of ${budget} left`)));
  const grid = el("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin-top:8px"});
  keys.forEach(([k,lbl])=>{
    const added = p.stats[k]?.added||0;
    const isForced = forced && typeof forced[k]==="number";
    const cell = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:66px"});
    cell.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
    if(isForced){
      cell.append(el("div",{class:"stepper-val",title:"forced by this species — added points here have no effect"}, `${forced[k]} (forced)`));
    } else {
      const step = el("div",{class:"stepper"});
      step.append(
        el("button",{title:"lower",disabled:added<=0,onclick:()=>{ p.stats[k].added=Math.max(0,added-1); p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); }},"−"),
        el("span",{class:"stepper-val"}, String(added)),
        el("button",{title:canInc?"add a point":"no points left (tick 🔓 to override)",disabled:!canInc,onclick:()=>{ p.stats[k].added=added+1; p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); }},"+"));
      cell.append(step);
    }
    grid.append(cell);
  });
  det.append(grid);
  det.append(el("div",{class:"inline",style:"gap:10px;margin-top:6px;align-items:center"},
    el("button",{class:"linkbtn",
      onclick:()=>{ encSpreadStats(p); p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); }},"🎲 randomise"),
    encUnlockToggle(p)));
  return det;
}
/* Manual stat-point distribution for an encounter Trainer — mirrors encStatSpread(p) but spends the
   Trainer's Level+9(+bonuses) budget (trainerStatBudget) across t.combat[k].added. */
function encTrainerStatSpread(t, key){
  normTrainer(t);
  const tb = trainerStatBudget(t);
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "stats:"+key;
  det.append(el("summary",{}, el("span",{style:"font-weight:700"},"Distribute stats"),
    el("span",{class:"muted small",style:"margin-left:8px"}, `${tb.remaining} of ${tb.budget} left`)));
  const grid = el("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin-top:8px"});
  const canInc = t.unlocked || tb.remaining > 0;
  STATS.forEach(([k,lbl])=>{
    const added = t.combat[k].added||0;
    const cell = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:66px"});
    cell.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
    const step = el("div",{class:"stepper"});
    step.append(
      el("button",{title:"lower",disabled:added<=0,onclick:()=>{ t.combat[k].added=Math.max(0,added-1); saveEnc(); renderEncounters(); }},"−"),
      el("span",{class:"stepper-val"}, String(added)),
      el("button",{title:canInc?"add a point":"no points left (tick 🔓 to override)",disabled:!canInc,onclick:()=>{ t.combat[k].added=added+1; saveEnc(); renderEncounters(); }},"+"));
    cell.append(step);
    cell.append(el("div",{class:"small muted"}, String(t.combat[k].base+added)));
    grid.append(cell);
  });
  det.append(grid);
  det.append(el("div",{style:"margin-top:6px"}, encUnlockToggle(t)));
  return det;
}
/* Weapons editor for an encounter Trainer — mirrors weaponsCard(t) but persists via saveEnc(). */
function encWeaponsCard(t, key){
  if(!Array.isArray(t.weapons)) t.weapons=[];
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "weapons:"+key;
  det.append(el("summary",{}, el("span",{style:"font-weight:700"},`Weapons (${t.weapons.length})`),
    el("button",{class:"linkbtn",style:"margin-left:8px",onclick:e=>{ e.preventDefault(); t.weapons.push(newWeapon()); saveEnc(); renderEncounters(); }},"+ add")));
  const body = el("div",{style:"margin-top:8px"});
  if(!t.weapons.length) body.append(el("span",{class:"muted small"},"none — unarmed Struggle is Normal, Physical, AC 4, DB 4 (AC 3 / DB 5 at Combat Expert+)."));
  t.weapons.forEach((w,i)=>{
    const box = el("div",{style:"border:1px solid var(--line);border-radius:var(--radius-sm);padding:8px 10px;margin-top:8px"});
    box.append(el("div",{class:"inline",style:"gap:10px;justify-content:space-between"},
      el("span",{style:"font-weight:700"}, w.name || `Weapon ${i+1}`),
      el("button",{class:"linkbtn danger",title:"remove",onclick:()=>{ t.weapons.splice(i,1); saveEnc(); renderEncounters(); }},"× remove")));
    const r1 = el("div",{class:"fieldrow"});
    r1.append(
      field("Name","",{value:w.name,onchange:v=>{ w.name=v; saveEnc(); renderEncounters(); }}),
      field("Category","",{opts:Object.keys(WEAPON_PRESETS),value:w.category,onchange:v=>{ w.category=v; Object.assign(w, WEAPON_PRESETS[v]); saveEnc(); renderEncounters(); }}),
      field("Type","",{opts:TYPES,value:w.type,onchange:v=>{ w.type=v; saveEnc(); renderEncounters(); }}),
    );
    const r2 = el("div",{class:"fieldrow"});
    r2.append(
      field("+ Damage Base","",{type:"number",value:w.dbMod,onchange:v=>{ w.dbMod=parseInt(v)||0; saveEnc(); renderEncounters(); }}),
      field("+ AC (harder)","",{type:"number",value:w.acMod,onchange:v=>{ w.acMod=parseInt(v)||0; saveEnc(); renderEncounters(); }}),
      field("Range","",{value:w.range,onchange:v=>{ w.range=v; saveEnc(); renderEncounters(); }}),
    );
    const r3 = el("div",{class:"fieldrow"});
    r3.append(
      field("Adept Move","",{opts:["", ...WEAPON_MOVES_ADEPT], value:w.weaponMoveAdept||"", onchange:v=>{ w.weaponMoveAdept=v; saveEnc(); renderEncounters(); }}),
      field("Master Move","",{opts:["", ...WEAPON_MOVES_MASTER], value:w.weaponMoveMaster||"", onchange:v=>{ w.weaponMoveMaster=v; saveEnc(); renderEncounters(); }}),
    );
    box.append(r1, r2, r3, field("Notes","",{value:w.notes,onchange:v=>{ w.notes=v; saveEnc(); }}));
    body.append(box);
  });
  det.append(body);
  return det;
}
/* Combat Stages control for an encounter Trainer (mirrors encCombatStages, uses trainerDerived) */
function encTrainerCombatStages(t, key){
  normTrainer(t);
  const d = trainerDerived(t);
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "cs:"+key;
  const any = ALL_CS_STATS.some(([k])=>t.cs[k]);
  det.append(el("summary",{}, el("span",{style:"font-weight:700"},"Combat Stages"),
    any?el("span",{class:"muted small",style:"margin-left:8px"},"active"):""));
  const grid = el("div",{style:"display:flex;flex-wrap:wrap;gap:8px;margin-top:8px"});
  CS_STATS.forEach(([k,lbl])=>{
    const cell = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:66px"});
    cell.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
    cell.append(el("div",{style:`font-weight:800;${d.cs[k]>0?"color:var(--good)":d.cs[k]<0?"color:var(--bad)":""}`}, String(d.totals[k])));
    cell.append(csStepper(t.cs[k]||0, v=>{ t.cs[k]=Math.max(-6,Math.min(6,v)); saveEnc(); renderEncounters(); }));
    grid.append(cell);
  });
  ACC_EVA_STATS.forEach(([k,lbl])=> grid.append(accEvaCell(lbl, t.cs[k]||0, d.cs[k],
    v=>{ t.cs[k]=Math.max(-6,Math.min(6,v)); saveEnc(); renderEncounters(); })));
  det.append(grid);
  if(any) det.append(el("button",{class:"linkbtn",style:"margin-top:6px",
    onclick:()=>{ const def = (isBoss(t) && t.boss.defaultCS) || {};
      ALL_CS_STATS.forEach(([k])=>t.cs[k]=def[k]||0); saveEnc(); renderEncounters(); }},"reset combat stages"));
  if(isBoss(t)) det.append(el("button",{class:"linkbtn",style:"margin-top:6px;margin-left:8px",
    title:"save the Combat Stages set right now as this Boss's Default (what 'reset' returns to)",
    onclick:()=>{ t.boss.defaultCS={...t.cs}; saveEnc(); renderEncounters(); toast("📌 Saved as this Boss's default Combat Stages"); }},"📌 set as Boss default"));
  return det;
}
/* compact, expandable status-condition toggles for an encounter Pokémon */
function encStatusControl(p){
  if(!Array.isArray(p.statuses)) p.statuses=[];
  const sp=getSpecies(p.species);
  const active=STATUS_DEFS.filter(s=>hasStatus(p,s.key));
  const det=el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "status:"+p.id;
  det.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"},"Status Conditions"),
    el("span",{class:"muted small",style:"margin-left:8px"}, active.length?active.map(s=>s.name).join(", "):"none"),
    active.length?el("button",{class:"linkbtn",style:"float:right",onclick:e=>{ e.preventDefault(); p.statuses=[]; saveEnc(); renderEncounters(); }},"clear"):""));
  const body=el("div",{style:"margin-top:6px"});
  // Boss Template (Running the Game p.488): Sleep/Frozen are replaced by Drowsy/Chilled — swap
  // which pair of chips shows rather than offering all four (a Boss never actually gets normal Sleep).
  const boss = isBoss(p);
  [["persistent","Persistent · +10 catch"],["volatile","Volatile · +5"],["other","Other"]].forEach(([kind,label])=>{
    const chips=el("div",{class:"chips"});
    STATUS_DEFS.filter(s=>s.kind===kind).filter(s=>{
      if(s.key==="sleep"||s.key==="frozen") return !boss;
      if(s.boss) return boss;
      return true;
    }).forEach(s=>{
      const on=hasStatus(p,s.key), immune=s.immune && sp?.types?.some(t=>s.immune.includes(t));
      chips.append(el("button",{class:"statuschip"+(on?" on":""), title:(immune?`${sp.name} is immune. `:"")+s.effect,
        onclick:()=>{ p.statuses=p.statuses||[]; const i=p.statuses.indexOf(s.key); if(i>=0)p.statuses.splice(i,1); else p.statuses.push(s.key); saveEnc(); renderEncounters(); }}, s.name+(immune?" ⃠":"")));
    });
    body.append(el("div",{class:"small muted",style:"font-weight:700;margin:4px 0 2px"},label), chips);
  });
  det.append(body);
  return det;
}
/* Trainings (Agile/Brutal/Focused/Inspired) — encounter-card counterpart to trainingsCard, same
   distinct non-statuschip toggle row, collapsed into its own <details> to match encStatusControl. */
function encTrainingControl(p){
  const active = TRAINING_DEFS.filter(s=>hasStatus(p,s.key));
  const det = el("details",{class:"spoiler",style:"margin-top:8px"});
  det.dataset.key = "training:"+p.id;
  det.append(el("summary",{},
    el("span",{style:"font-weight:700;color:var(--ink)"},"Trainings"),
    el("span",{class:"muted small",style:"margin-left:8px"}, active.length?active.map(s=>s.name).join(", "):"none")));
  const body = el("div",{style:"margin-top:6px"});
  body.append(trainingsRow(p, ()=>{ saveEnc(); renderEncounters(); }));
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
function encounterMonCard(enc, p, list, trainer){
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
    row.append(monSprite(p.species,p.shiny,"s-sm",monImage(p)||undefined));
    row.append(el("span",{style:"font-weight:800;white-space:nowrap"}, (fainted?"💀 ":"")+encMonName(p)));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `Lv ${p.level}`));
    row.append(el("div",{class:"hpbar",style:"flex:1;min-width:70px"}, el("i",{style:`width:${pct}%;background:${hpColor}`})));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `${p.currentHP}/${maxHP}`));
    row.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"expand",onclick:()=>encMonToggleMin(p)},"▸"));
    row.append(encOrderBtns(list,p));
    row.append(encMonRemoveBtn(p,list));
    mini.append(row);
    return mini;
  }
  const card=el("div",{style:`border:1px solid ${fainted?"var(--bad)":"var(--line)"};border-radius:var(--radius-sm);padding:10px;margin-top:8px;background:var(--panel-2);${fainted?"opacity:.7;":""}`});
  const head=el("div",{class:"inline",style:"gap:10px;align-items:flex-start"});
  // sprite with a 📷 overlay (same affordance as the Pokémon sheet) — this is the map token's picture
  const spriteBox=el("div",{class:"sprite-box sb-sm",style:"flex:0 0 auto"});
  spriteBox.append(monSprite(p.species,p.shiny,"s-sm",monImage(p)||undefined));
  spriteBox.append(el("button",{class:"photo-btn",title:"picture used for this creature's map token",
    onclick:()=>pickImage(256, async url=>{ setMonImage(p, await storeImg(url,"mon")); saveEnc(); renderEncounters(); })},"📷"));
  if(monImage(p)) spriteBox.append(el("button",{class:"photo-rm",title:"remove picture — use the default sprite",
    onclick:()=>{ setMonImage(p, ""); saveEnc(); renderEncounters(); }},"×"));
  head.append(spriteBox);
  const nw=el("div",{style:"flex:1;min-width:0"});
  nw.append(el("div",{style:"font-weight:800"}, (fainted?"💀 ":"")+encMonName(p), " ", el("span",{html:(sp?.types||[]).map(typeBadge).join(" ")})));
  const lvIn=el("input",{type:"number",min:1,max:100,value:p.level,style:"width:60px",title:"level"});
  lvIn.addEventListener("change",()=>{ const l=Math.max(1,Math.min(100,parseInt(lvIn.value)||1)); p.level=l; p.xp=xpForLevel(l); encSpreadStats(p); p.currentHP=pokeDerived(p).maxHP; syncEncMonLevelupMoves(p,sp); saveEnc(); renderEncounters(); });
  nw.append(el("div",{class:"small muted",style:"margin-top:3px;display:flex;gap:6px;align-items:center;flex-wrap:wrap"},
    "Lv", lvIn, `· ${p.nature||"—"} · ${p.gender||"—"}${p.shiny?" · ✨Shiny":""}`));
  nw.append(rotomFormControl(p, sp, ()=>{ saveEnc(); renderEncounters(); }));
  nw.append(el("div",{class:"small muted",style:"margin-top:2px"}, `Atk ${d.eff.atk} · SpA ${d.eff.spatk} · Def ${d.eff.def} · SpD ${d.eff.spdef} · Spd ${d.eff.spd}`));
  nw.append(el("div",{class:"small muted",style:"margin-top:2px"}, `Evasion — Phys +${d.physEva} · Spec +${d.specEva} · Speed +${d.spdEva}`));
  head.append(nw);
  head.append(el("button",{class:"btn-secondary",style:"padding:3px 9px;align-self:flex-start",title:"minimize",onclick:()=>encMonToggleMin(p)},"▾"));
  head.append(encOrderBtns(list,p));
  head.append(encMonRemoveBtn(p,list));
  card.append(head);
  // Mega Evolution — same mechanic as party Pokémon (Held Item must be the matching Mega Stone),
  // but the GM controls it here instead of a player. Lets you add a wild/enemy Pokémon as its
  // normal species (so it gets real moves/abilities from the DB — the "Mega X" species entries
  // are stat-only stubs with none of their own) and then Mega Evolve it for the encounter.
  {
    const rr = ()=>{ saveEnc(); renderEncounters(); };
    const megas = megaFormsFor(p);
    const megaRow = el("div",{class:"inline",style:"margin-top:8px;gap:6px;align-items:center;flex-wrap:wrap"});
    megaRow.append(heldItemControl(p, rr));
    if(p.mega){
      megaRow.append(el("span",{class:"statuschip on",style:"padding:2px 8px;font-size:11px;cursor:default"},"✨ MEGA"),
        el("button",{class:"btn-secondary",style:"padding:4px 10px",title:"revert to the base form",
          onclick:()=>megaRevert(p,false,rr)},"↩ Revert"));
    } else if(megas.length){
      megas.forEach(nm=> megaRow.append(el("button",{class:"btn-secondary",style:"padding:4px 10px",
        title:"Mega Evolve (needs the matching Mega Stone held). Stats, types, Ability & size follow the Mega form; moves & level are kept.",
        onclick:()=>megaEvolve(p,nm,rr)}, megas.length>1 ? "✨ "+nm : "✨ Mega Evolve")));
    } else {
      const stones = megaStonesFor(p);
      if(stones.length) megaRow.append(el("span",{class:"small muted"}, `Equip ${stones.join(" or ")} to Mega Evolve.`));
    }
    card.append(megaRow);
  }
  // HP tracker
  // A Swarm's/Boss's HP is one pool over several bars — write through the cascade so a big hit can
  // break more than one bar and drop the Multiplier/current-bar accordingly (Core p.478, Running
  // the Game p.487). Swarm and Boss are mutually exclusive (guarded on their toggle buttons below).
  const setHP = v => {
    if(isSwarm(p)) swarmSetTotalHP(p, Math.max(0,(p.swarm.mult||1)-1)*maxHP + v);
    else if(isBoss(p)) bossSetTotalHP(p, Math.max(0,(p.boss.curBar||1)-1)*maxHP + v);
    else p.currentHP = Math.max(-99, Math.min(maxHP, v));
    saveEnc(); renderEncounters();
  };
  card.append(el("div",{class:"inline",style:"gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap"},
    el("span",{class:"small muted",style:"font-weight:700;white-space:nowrap"},
      isSwarm(p) ? `HP ${p.currentHP}/${maxHP} · bar ${p.swarm.mult}/${p.swarm.maxMult}`
      : isBoss(p) ? `HP ${p.currentHP}/${maxHP} · bar ${p.boss.curBar}/${p.boss.actions}`
      : `HP ${p.currentHP}/${maxHP}`),
    el("div",{class:"hpbar",style:"flex:1;min-width:120px"}, el("i",{style:`width:${pct}%;background:${hpColor}`})),
    el("button",{class:"linkbtn",style:"padding:2px 6px",title:"full heal",
      onclick:()=>{ if(isSwarm(p)) swarmSetTotalHP(p, swarmMaxTotalHP(p));
        else if(isBoss(p)) bossSetTotalHP(p, bossMaxTotalHP(p));
        else p.currentHP=maxHP;
        saveEnc(); renderEncounters(); }},"MAX")));
  card.append(damageHealRow(()=>p.currentHP, setHP, p));
  if(isSwarm(p)) card.append(swarmCard(p));
  else if(isBoss(p)) card.append(bossCard(p));
  // GM actions: reroll identity, toggle shiny, Catch DC, send to PC (caught)
  const actRow=el("div",{class:"inline",style:"gap:6px;margin-top:8px;flex-wrap:wrap"});
  actRow.append(
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"re-roll nature, gender, shiny & stat spread",
      onclick:()=>{ encRandomize(p); p.currentHP=pokeDerived(p).maxHP; saveEnc(); renderEncounters(); }},"🎲 Reroll"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"toggle shiny",
      onclick:()=>{ p.shiny=!p.shiny; saveEnc(); renderEncounters(); }}, p.shiny?"✨ Shiny":"Shiny?"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"capture DC",onclick:()=>catchRateModal(p)},"🎯 Catch DC"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"send to the shared PC (caught)",onclick:()=>sendEncMonToPC(enc,p,list)},"🎣 To PC"),
    el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"EXP for defeating just this Pokémon",onclick:()=>openMonExpCalc(p)},"🧮 EXP"),
    el("button",{class:"btn-secondary"+(isSwarm(p)?" on":""),style:"padding:5px 10px",
      title:isBoss(p)?"disable Boss Template first":"Swarm Template (Core p.478) — abstract a horde into one entity with HP bars and Swarm Points",
      onclick:()=>{ if(isBoss(p)){ toast("Disable Boss Template first"); return; } toggleSwarm(p); saveEnc(); renderEncounters(); }},
      isSwarm(p)?`🐝 Swarm ×${p.swarm.mult}`:"🐝 Swarm"),
    el("button",{class:"btn-secondary"+(isBoss(p)?" on":""),style:"padding:5px 10px",
      title:isSwarm(p)?"disable Swarm Template first":"Boss Template (Running the Game p.487) — a single powerful enemy with several HP bars and actions per round",
      onclick:()=>{ if(isSwarm(p)){ toast("Disable Swarm Template first"); return; } toggleBoss(p); saveEnc(); renderEncounters(); }},
      isBoss(p)?`👑 Boss ×${p.boss.actions}`:"👑 Boss"));
  card.append(actRow);
  card.append(encStatSpread(p));
  card.append(encCombatStages(p));
  card.append(encStatusControl(p));
  card.append(encTrainingControl(p));
  // moves — favourites first, each rollable
  const favSet=new Set(p.encFav||[]);
  const mw=el("div",{style:"margin-top:8px"});
  mw.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("span",{class:"small muted",style:"font-weight:700"},"Actions — tap 🎲 to roll"),
    el("button",{class:"linkbtn",onclick:()=>addEncMove(p,sp)},"+ move")));
  mw.append(struggleControl(p, sp, ()=>{ saveEnc(); renderEncounters(); }));
  const st=struggleFor(p,sp); if(st) mw.append(encounterMoveRow(p,sp,st,st.name,favSet,null,true));
  const grant = poltergeistGrant(p, sp);
  if(grant){ const gm=moveByName.get(grant.move.toLowerCase());
    if(gm) mw.append(encounterMoveRow(p,sp,gm,gm.name,favSet,null,true)); }
  const ordered=[...p.moves].sort((a,b)=>(favSet.has(b)?1:0)-(favSet.has(a)?1:0));
  ordered.forEach(mn=>{ const m=moveByName.get(mn.toLowerCase());
    mw.append(encounterMoveRow(p,sp,m,mn,favSet,()=>{ p.encFav=toggleSet(favSet,mn); saveEnc(); renderEncounters(); },false,trainer)); });
  card.append(mw);
  // abilities — addable, each expandable to explain what it does
  const aw=el("div",{style:"margin-top:8px"});
  aw.append(el("div",{class:"inline",style:"justify-content:space-between"},
    el("span",{class:"small muted",style:"font-weight:700"},`Abilities (${p.abilities.length})`),
    el("button",{class:"linkbtn",onclick:()=>addEncAbility(p,sp)},"+ ability")));
  if(grant){ const gab=abilityByName.get(grant.ability.toLowerCase());
    const grow=el("details",{class:"spoiler",style:"margin-top:5px"});
    grow.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, grant.ability),
      el("span",{class:"muted small",style:"margin-left:8px"},"from Poltergeist — this Form")));
    grow.append(el("div",{class:"small",style:"margin-top:6px",html: gab?abilityText(gab):"<span class='muted'>Not in database</span>"}));
    aw.append(grow); }
  if(!p.abilities.length) aw.append(el("span",{class:"muted small"},"none — tap + ability"));
  p.abilities.forEach(an=> aw.append(encounterAbilityRow(p,an)));
  card.append(aw);
  // legendary Auras — only for legendaries (or if this enemy already has some)
  if(isLegendarySpeciesName(p.species) || (p.auras||[]).length)
    card.append(aurasCard(p, sp, ()=>{ saveEnc(); renderEncounters(); }));
  // capabilities — read-only (derived from species), hover a chip to see what it does
  if(sp) card.append(encounterCapsRow(sp));
  // Buffs & Orders — same shared card as the Sheet/Map token menu, so a GM can grant a wild
  // Pokémon a standing effect (e.g. a custom "+15 Damage Reduction" prop/hazard) without needing
  // to open the Map first — damageHealRow already auto-applies any active DR buff on this card.
  card.append(buffsCard(p, ()=>{ saveEnc(); renderEncounters(); }));
  return card;
}
/* movement + special Capabilities chip row for an encounter Pokémon — hover each chip for its
   rules text (movement caps get hand-written help; named ones look up D.items.capabilities) */
function encounterCapsRow(sp){
  const cap = sp.capabilities||{};
  const entries = [];
  if(cap.overland) entries.push([`Overland ${cap.overland}`, CAP_MOVE_HELP.Overland]);
  if(cap.sky) entries.push([`Sky ${cap.sky}`, CAP_MOVE_HELP.Sky]);
  if(cap.swim) entries.push([`Swim ${cap.swim}`, CAP_MOVE_HELP.Swim]);
  if(cap.levitate) entries.push([`Levitate ${cap.levitate}`, CAP_MOVE_HELP.Levitate]);
  if(cap.burrow) entries.push([`Burrow ${cap.burrow}`, CAP_MOVE_HELP.Burrow]);
  entries.push([`Jump ${cap.highJump ?? 0}/${cap.longJump ?? 0}`, CAP_MOVE_HELP.Jump], [`Power ${cap.power ?? 0}`, CAP_MOVE_HELP.Power]);
  if(cap.naturewalk?.length) entries.push([`Naturewalk (${cap.naturewalk.join(", ")})`, capabilityHelp("Naturewalk")]);
  (cap.other||[]).forEach(o=>entries.push([o, capabilityHelp(o)]));
  const wrap=el("div",{style:"margin-top:8px"});
  wrap.append(el("span",{class:"small muted",style:"font-weight:700"},"Capabilities"));
  const chips=el("div",{class:"chips",style:"margin-top:4px"});
  entries.forEach(([label,help])=>chips.append(el("span",{class:"chip",title:help||""},label)));
  wrap.append(chips);
  return wrap;
}
function encTrainerToggleMin(tr){ tr.min=!tr.min; saveEnc(); renderEncounters(); }
function encounterTrainerCard(enc, tr){
  const t=tr.trainer; normTrainer(t);
  const td0=trainerDerived(t), maxHP0=td0.hp; if(t.currentHP==null) t.currentHP=maxHP0;
  const fainted0 = t.currentHP<=0;
  // ---- Collapsed (minimized) view: avatar · name · level · mini HP bar, expand + reorder + remove ----
  if(tr.min){
    const pct0=Math.max(0,Math.min(100,Math.round(t.currentHP/maxHP0*100)));
    const mini=el("div",{style:`border:1px solid var(--accent);border-radius:var(--radius-sm);padding:6px 10px;margin-top:8px;background:var(--panel-2);${fainted0?"opacity:.5;":""}`});
    const row=el("div",{class:"inline",style:"gap:8px;align-items:center"});
    row.append(el("img",{src:t.avatar||TRAINER_PLACEHOLDER,alt:"",
      style:"width:24px;height:24px;border-radius:50%;object-fit:cover;border:1px solid var(--line);background:var(--panel)"}));
    row.append(el("span",{style:"font-weight:800;white-space:nowrap"}, (fainted0?"💀 ":"")+(t.name||"Trainer")));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `Lv ${t.level}`));
    row.append(el("div",{class:"hpbar",style:"flex:1;min-width:70px"}, el("i",{style:`width:${pct0}%;background:${pct0>50?"var(--good)":pct0>25?"var(--warn)":"var(--bad)"}`})));
    row.append(el("span",{class:"small muted",style:"white-space:nowrap"}, `${t.currentHP}/${maxHP0}`+(isBoss(t)?` · bar ${t.boss.curBar}/${t.boss.actions}`:"")));
    row.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"expand",onclick:()=>encTrainerToggleMin(tr)},"▸"));
    row.append(encOrderBtns(enc.trainers,tr));
    row.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted);font-size:18px;line-height:1",title:"remove trainer",
      onclick:()=>{ enc.trainers=enc.trainers.filter(x=>x.id!==tr.id); saveEnc(); renderEncounters(); }},"×"));
    mini.append(row);
    return mini;
  }
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
      onclick:()=>pickImage(256, async d=>{ t.avatar=await storeImg(d,"avatar"); saveEnc(); renderEncounters(); })}, t.avatar?"📷 Change":"📷 Image"));
  if(t.avatar) info.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"remove image — use the default icon",
    onclick:()=>{ t.avatar=""; saveEnc(); renderEncounters(); }},"×"));
  head.append(info);
  const actions=el("div",{class:"inline",style:"gap:6px;align-items:center"});
  actions.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",title:"minimize",onclick:()=>encTrainerToggleMin(tr)},"▾"));
  actions.append(encOrderBtns(enc.trainers,tr));
  actions.append(el("button",{class:"btn-secondary"+(isBoss(t)?" on":""),style:"padding:3px 9px",
    title:"Boss Template (Running the Game p.487) — several HP bars and actions per round",
    onclick:()=>{ toggleBoss(t); saveEnc(); renderEncounters(); }}, isBoss(t)?`👑 Boss ×${t.boss.actions}`:"👑 Boss"));
  actions.append(el("button",{class:"x",style:"cursor:pointer;color:var(--muted);font-size:18px;line-height:1",title:"remove trainer",
    onclick:()=>{ enc.trainers=enc.trainers.filter(x=>x.id!==tr.id); saveEnc(); renderEncounters(); }},"×"));
  head.append(actions);
  card.append(head);
  // trainer HP + Struggle roll
  const td=trainerDerived(t), maxHP=td.hp; if(t.currentHP==null) t.currentHP=maxHP;
  card.append(el("div",{class:"small muted",style:"margin-top:4px"},
    `Evasion — Phys +${td.physEva} · Spec +${td.specEva} · Speed +${td.spdEva}`));
  if(td.injuries>0) card.append(el("div",{class:"small",style:"color:var(--bad);font-weight:700;margin-top:2px"},
    `${td.injuries} injur${td.injuries===1?"y":"ies"} — max HP ${maxHP} (−${td.fullHP-maxHP})`));
  // A Boss Trainer's HP is one pool over several bars — same cascade as Boss/Swarm Pokémon, so a
  // big hit can break more than one bar and drop the current bar accordingly (Running the Game p.487).
  const setHP=v=>{
    if(isBoss(t)) bossSetTotalHP(t, Math.max(0,(t.boss.curBar||1)-1)*maxHP + v);
    else t.currentHP=Math.max(-99,Math.min(maxHP,v));
    saveEnc(); renderEncounters();
  };
  const pct=Math.max(0,Math.min(100,Math.round(t.currentHP/maxHP*100)));
  card.append(el("div",{class:"inline",style:"gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap"},
    el("span",{class:"small muted",style:"font-weight:700;white-space:nowrap"},
      isBoss(t) ? `HP ${t.currentHP}/${maxHP} · bar ${t.boss.curBar}/${t.boss.actions}` : `HP ${t.currentHP}/${maxHP}`),
    el("div",{class:"hpbar",style:"flex:1;min-width:120px"}, el("i",{style:`width:${pct}%;background:${pct>50?"var(--good)":pct>25?"var(--warn)":"var(--bad)"}`})),
    el("button",{class:"linkbtn",style:"padding:2px 6px",title:"full heal",
      onclick:()=>{ if(isBoss(t)) bossSetTotalHP(t, bossMaxTotalHP(t)); else t.currentHP=maxHP; saveEnc(); renderEncounters(); }},"MAX")));
  card.append(damageHealRow(()=>t.currentHP, setHP, t));
  if(isBoss(t)) card.append(bossCard(t));
  // Injuries (cap max HP) + Combat Stages
  const injRow=el("div",{class:"inline",style:"gap:6px;margin-top:6px;align-items:center"});
  injRow.append(el("span",{class:"small muted",style:"font-weight:700"},"Injuries"),
    el("button",{class:"btn-secondary",style:"padding:2px 9px",onclick:()=>{ t.injuries=Math.max(0,(t.injuries||0)-1); if(t.currentHP>trainerDerived(t).hp) t.currentHP=trainerDerived(t).hp; saveEnc(); renderEncounters(); }},"−"),
    el("span",{style:"font-weight:800;min-width:16px;text-align:center"}, String(t.injuries||0)),
    el("button",{class:"btn-secondary",style:"padding:2px 9px",onclick:()=>{ t.injuries=Math.min(10,(t.injuries||0)+1); if(t.currentHP>trainerDerived(t).hp) t.currentHP=trainerDerived(t).hp; saveEnc(); renderEncounters(); }},"+"));
  card.append(injRow);
  card.append(encTrainerCombatStages(t, tr.id));
  card.append(encTrainerStatSpread(t, tr.id));
  card.append(encWeaponsCard(t, tr.id));
  // Attacks: unarmed Struggle + one slot per weapon (+ its Weapon Move) — reuses the Sheet's slots
  const atkWrap=el("div",{style:"margin-top:8px"});
  atkWrap.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:2px"},"⚔ Attacks"));
  atkWrap.append(trainerStruggleControl(t, renderEncounters, saveEnc));
  atkWrap.append(trainerAttackSlot(t, trainerStruggle(t), ()=>openTrainerAttack(t), {tag:"unarmed"}));
  (t.weapons||[]).forEach(w=>{
    atkWrap.append(trainerAttackSlot(t, trainerStruggle(t,w), ()=>openTrainerAttack(t,null,w), {tag:w.category}));
    if(w.notes) atkWrap.append(el("div",{class:"small muted",style:"margin:-2px 0 4px 6px"}, "↳ "+w.notes));
    // Encounter Trainers don't get an editable Combat skill rank in this tab (Skills below are
    // read-only chips), so gating a Weapon Move behind weaponMoveRankOk here would make it
    // impossible for the GM to ever see a move they deliberately picked — show it unconditionally;
    // the rank check still applies on the player Sheet/Battle tab where Skills ARE editable.
    [["weaponMoveAdept","adept","Adept Technique"],["weaponMoveMaster","master","Master Technique"]].forEach(([field_,tier,tag])=>{
      const mn = w[field_]; if(!mn) return;
      const wm = trainerAttackProfile(t,mn,w);
      const uc = usesControl(t, "move", wm.name, wm.frequency, renderEncounters, saveEnc, {bossEot:isBoss(t)});
      atkWrap.append(trainerAttackSlot(t, wm, ()=>openTrainerAttack(t,mn,w), {tag, move:true, uc}));
      if(!weaponMoveRankOk(t, tier)) atkWrap.append(el("div",{class:"small muted",style:"margin:-2px 0 4px 6px"},
        `↳ book requires ${tier==="master"?"Master":"Adept"} Combat — GM call`));
    });
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
    const uc = m ? usesControl(t, "move", prof.name, prof.frequency, renderEncounters, saveEnc, {bossEot:isBoss(t)}) : null;
    const slot = trainerAttackSlot(t, prof, ()=> m?openTrainerAttack(t,mn):toast("Not in the move database"), {move:!!m, uc});
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
    list.forEach(n=> build.append(encTrainerRefRow(t, tr.id, n, kind,
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
  tr.pokemon.forEach(p=> card.append(encounterMonCard(enc, p, tr.pokemon, t)));
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
/* EXP for defeating ONE wild Pokémon, rather than a whole encounter (Core p.460: a Pokémon's
   Base Experience Value is simply its level). Separate from openExpCalc — that one totals every
   combatant and persists the encounter's own significance/player count; this is a throwaway
   per-kill payout, so its inputs start from these defaults every time and are never saved. */
const MON_EXP_SIG = 1, MON_EXP_PLAYERS = 3;
function openMonExpCalc(p){
  const base = p.level||0;
  const body = el("div",{});
  body.append(el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"},
    el("div",{class:"inline",style:"justify-content:space-between;gap:8px"},
      el("span",{}, encMonName(p)), el("span",{class:"muted small"}, `Lv ${base}`)),
    el("div",{class:"inline",style:"justify-content:space-between;gap:8px;border-top:1px solid var(--line);margin-top:6px;padding-top:6px;font-weight:800"},
      el("span",{},"Base Experience Value"), el("span",{}, String(base)))));
  const sigIn = el("input",{type:"number",min:0,step:0.5,value:MON_EXP_SIG});
  const plIn  = el("input",{type:"number",min:1,value:MON_EXP_PLAYERS});
  const lbl = (txt,node,hint)=>el("label",{class:"field"}, el("span",{},txt), node,
    hint?el("span",{class:"small muted",style:"font-weight:400"},hint):"");
  const out = el("div",{class:"card",style:"margin:0"});
  const recalc = ()=>{
    const sig = Math.max(0, parseFloat(sigIn.value)||0), pl = Math.max(1, parseInt(plIn.value)||1);
    const total = Math.round(base*sig), per = Math.round(total/pl);
    out.innerHTML = "";
    out.append(
      el("div",{style:"font-size:15px"}, `${base} Base × ${sig} modifier = `, el("b",{},String(total)), " total XP"),
      el("div",{style:"font-size:22px;font-weight:800;margin-top:6px;color:var(--accent)"}, `${per} XP per player`),
      el("div",{class:"small muted",style:"margin-top:4px"},
        `${total} ÷ ${pl} player${pl===1?"":"s"}. Each player then splits their share among the Pokémon they used (Core p.460).`));
  };
  sigIn.addEventListener("input",recalc); plIn.addEventListener("input",recalc);
  body.append(el("div",{class:"fieldrow"},
    lbl("Modifier ×",sigIn,"1–1.5 minor · 2–3 average · 4–5 major"),
    lbl("Players sharing XP",plIn,"count Players, not Pokémon")), out);
  recalc();
  modal({title:`🧮 EXP — ${encMonName(p)}`, bodyNode:body});
}
let encShowArchived=false;   // device-level toggle for the Encounters archive view
function renderEncounters(){
  const root=$("#view-encounters");
  // renderEncounters() does a full teardown/rebuild on every edit (stat/CS steppers, use-pips…),
  // so <details data-key> spoilers would otherwise snap shut after one click — remember which were
  // open and re-open the matching ones once the fresh DOM is built.
  const openKeys = new Set([...root.querySelectorAll("details[data-key][open]")].map(d=>d.dataset.key));
  root.innerHTML="";
  const arr=encList();
  const bar=el("div",{class:"card"});
  const top=el("div",{class:"inline",style:"gap:8px;flex-wrap:wrap;justify-content:space-between"});
  const leftc=el("div",{class:"inline",style:"gap:6px;flex-wrap:wrap"});
  const sel=el("select",{title:"Active encounter"});
  const visible = arr.filter(e=> encShowArchived || !e.archived);
  const archivedCount = arr.filter(e=> e.archived).length;
  if(!visible.length) sel.append(el("option",{value:""},"— no encounters —"));
  let cur=activeEncounter();
  if(cur && cur.archived && !encShowArchived) cur = visible[0] || null;   // active one is hidden → fall to first visible
  visible.forEach(e=> sel.append(el("option",{value:e.id, selected:e.id===cur?.id}, (e.archived?"📦 ":"")+(e.name||"(unnamed)"))));
  sel.addEventListener("change",()=>{ state.activeEncounterId=sel.value; saveEnc(); renderEncounters(); });
  leftc.append(sel);
  leftc.append(el("button",{class:"btn ghost",onclick:()=>{ const n=prompt("Encounter name:","New Encounter"); if(n===null)return; const e=newEncounter(n||"New Encounter"); arr.push(e); state.activeEncounterId=e.id; saveEnc(); renderEncounters(); }},"＋ New"));
  if(cur){
    leftc.append(el("button",{class:"btn ghost",title:"rename",onclick:()=>{ const n=prompt("Rename encounter:",cur.name); if(n===null)return; cur.name=n; saveEnc(); renderEncounters(); }},"✎"));
    leftc.append(el("button",{class:"btn ghost",title:"duplicate this encounter",onclick:()=>{
      const n=prompt("New encounter name:", cur.name+" copy"); if(n===null)return;
      const c=duplicateEncounter(cur, n||cur.name+" copy"); arr.push(c); state.activeEncounterId=c.id; saveEnc(); renderEncounters();
    }},"⧉ Duplicate"));
    leftc.append(el("button",{class:"btn ghost",title:cur.archived?"unarchive — bring back to the active list":"archive — hide from the active list without deleting it",
      onclick:()=>{ cur.archived=!cur.archived; if(cur.archived && !encShowArchived) state.activeEncounterId = arr.filter(e=>!e.archived)[0]?.id || null; saveEnc(); renderEncounters(); }},
      cur.archived?"📤 Unarchive":"📦 Archive"));
    leftc.append(el("button",{class:"btn ghost danger",title:"delete",onclick:()=>{ if(!confirm(`Delete encounter "${cur.name}"?`))return; const i=arr.findIndex(x=>x.id===cur.id); if(i>=0)arr.splice(i,1); state.activeEncounterId=arr[0]?.id||null; saveEnc(); renderEncounters(); }},"🗑"));
  }
  if(archivedCount) leftc.append(el("button",{class:"btn ghost"+(encShowArchived?" on":""),title:"show or hide archived encounters",
    onclick:()=>{ encShowArchived=!encShowArchived; renderEncounters(); }}, encShowArchived?"Hide archived":`📦 Archived (${archivedCount})`));
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
  const notesArea=el("textarea",{placeholder:"GM notes — read-outs, tactics, what happens on a wipe…",
    style:"width:100%;margin-top:8px;min-height:60px;resize:vertical"}); notesArea.value=cur.notes||"";
  notesArea.addEventListener("input",()=>{ cur.notes=notesArea.value; saveEnc(); });
  setc.append(el("div",{class:"small muted",style:"font-weight:700;margin-top:10px"},"Notes"), notesArea);
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
  if(openKeys.size) root.querySelectorAll("details[data-key]").forEach(d=>{ if(openKeys.has(d.dataset.key)) d.open=true; });
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
  [["species","Pokédex"],["move","Moves"],["keyword","Keywords"],["ability","Abilities"],["item","Items"],
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
  else if(refSub==="keyword"){
    const seen=new Set();   // several terms are spelling variants of one definition — show each rule once
    rows = Object.entries(KEYWORD_DEFS)
      .filter(([term,def])=>{ if(seen.has(def)) return false; seen.add(def); return match(term)||match(def); })
      .sort((a,b)=>a[0].localeCompare(b[0]))
      .map(([term,def])=>refGeneric(term.charAt(0).toUpperCase()+term.slice(1), "Move Keyword", def));
  }
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
const escAttr = s => esc(s).replace(/"/g,"&quot;");

/* ===================================================================
   Keyword-hover explainer — Core p.238-241 "Move Keywords" plus a few
   common Range-field labels (Field/Weather/Hazard/…). Vocabulary drawn
   from the actual tokens used in data/moves.json's `range` field, not
   guessed. Hover shows the native title tooltip; tap/click shows a toast
   (mobile has no hover) via the delegated listener below.
=================================================================== */
const KEYWORD_DEFS = {
  "push":"On a hit, the target is pushed 2 meters directly away from the user (unless it resists the push).",
  "trip":"On a hit, the target may be knocked down (Tripped) — see its own effect text for the exact trigger.",
  "smite":"If this move Misses, it still deals damage as if resisted one further step, with no secondary effects.",
  "recoil":"The user loses HP equal to the given fraction of the damage they just dealt.",
  "dash":"Cannot be used while the user is Stuck.",
  "groundsource":"Accuracy isn't reduced by Rough Terrain, and it ignores Blocking Terrain.",
  "interrupt":"Can be used out of turn to interrupt another action, at the cost of the user's own next action.",
  "reaction":"Usable on someone else's turn in response to a trigger, outside the user's own normal action economy.",
  "trigger":"Can only be used when its specific triggering condition (see its own effect text) is met.",
  "priority":"Acts before the normal turn order regardless of Speed — a \"(Limited)\" tag means only in the specific circumstances noted in its effect text.",
  "sonic":"A sound-based effect — blocked by Sonic-immunity abilities (e.g. Soundproof) and similar effects.",
  "powder":"A powder-based effect — Grass-types and powder-immune abilities (e.g. Overcoat) are unaffected.",
  "social":"Used outside of combat (social scenes / Contests), not a combat attack.",
  "friendly":"Can be used on an ally without it counting as a hostile act (won't trigger Retaliation-style effects).",
  "versatile":"The user chooses whether it counts as a Physical or Special move each time it's used.",
  "slice":"A cutting attack — interacts with Slice-boosting effects (e.g. some weapons/abilities).",
  "fling":"A thrown attack that uses a held item as ammunition.",
  "pass":"Used to hand off an effect or the turn to an ally — see its own effect text.",
  "pledge":"Combines with an ally's other Pledge move used that round for a combined effect.",
  "set-up":"Must be Set Up before it can be used — see its own effect text for the setup step.",
  "set up":"Must be Set Up before it can be used — see its own effect text for the setup step.",
  "shield":"Grants a defensive shielding effect — see its own effect text.",
  "reckless":"Carries an extra risk/drawback to the user — see its own effect text.",
  "field":"Affects the whole battlefield rather than a single target.",
  "weather":"Changes the current Weather Condition.",
  "hazard":"Sets a persistent hazard on the field (like a trap) rather than hitting a target directly.",
  "aura":"Creates a lingering aura/zone effect around its point of origin.",
  "environ":"Alters the terrain/environment itself.",
  "blessing":"Grants a team-wide Blessing effect — see its own effect text.",
  "berry":"Interacts with (usually consumes) a held Berry.",
  "coat":"Coats a weapon or body part with an effect that carries into follow-up attacks.",
  "illusion":"Creates a disguise or illusory effect.",
  "execute":"A finishing move meant for use against fainted or helpless targets.",
  "exhaust":"Using it exhausts the user in some way — see its own effect text for the cost.",
  "hp loss":"Costs the user HP just to use, beyond any Recoil from landing the hit.",
  "free action":"Costs a Free Action to use (Core p.223), separate from its listed Frequency.",
  "swift action":"Costs a Swift Action to use.",
  "full action":"Costs a Full Action to use.",
  "wr":"Weapon Range — its range matches whatever ranged weapon the user is currently wielding.",
  "double strike":"Hits with two separate Accuracy Rolls; if both hit, the Damage Base is doubled.",
  "doublestrike":"Hits with two separate Accuracy Rolls; if both hit, the Damage Base is doubled.",
  "five strike":"Hits 1-5 times: roll 1d8 for the hit count, then multiply the Damage Base by that count.",
  "healing":"Restores HP instead of (or as well as) dealing damage.",
};
const KEYWORD_TERMS = Object.keys(KEYWORD_DEFS).sort((a,b)=>b.length-a.length);   // longest first
/* wrap recognized keywords in an already-esc()'d HTML string with a hint span. Only call on text
   that has already been through esc() — this inserts markup, so calling it before esc() would get
   its own tags escaped right back out. */
function annotateKeywords(html){
  if(!html) return html;
  let out = html;
  KEYWORD_TERMS.forEach(term=>{
    const re = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})\\b`, "gi");
    out = out.replace(re, m=>`<span class="kw-hint" data-kw="${term}" title="${escAttr(KEYWORD_DEFS[term])}">${m}</span>`);
  });
  return out;
}
document.addEventListener("click", e=>{
  const kw = e.target.closest?.(".kw-hint");
  if(kw) toast(KEYWORD_DEFS[kw.dataset.kw] || "");
  const tm = e.target.closest?.(".tm-chip,[data-tmmove]");
  if(tm && tm.dataset.tmmove) showTMEligibility(tm.dataset.tmmove);
});

/* ===================================================================
   Detail popups
=================================================================== */
function refDetailHTML(kind, name){
  if(kind==="move"){ return moveDetailHTML(moveByName.get(name.toLowerCase()), name); }
  if(kind==="ability"){ const a=abilityByName.get(name.toLowerCase()); return a?abilityText(a):"<span class='muted'>Not in database.</span>"; }
  if(kind==="class"){ const c=D.classes.find(x=>x.name===name);
    return c?`${c.mechanic?`<div class="r-meta"><b>${esc(c.mechanic)}</b></div>`:""}<div class="r-body">${annotateKeywords(esc(c.effect||""))}</div>`:"<span class='muted'>—</span>"; }
  if(kind==="edge"){ const e=D.edges.find(x=>x.name===name);
    return e?`${e.prerequisites?`<div class="r-meta">Prereq: ${esc(e.prerequisites)}</div>`:""}<div class="r-body">${annotateKeywords(esc(e.effect||""))}</div>`:"<span class='muted'>—</span>"; }
  if(kind==="feature"){ const f=D.features.find(x=>x.name===name);
    return f?`<div class="r-meta">${esc(f.category||"")}${f.frequency?" · "+esc(f.frequency):""}</div>${f.prerequisites?`<div class="r-meta">Prereq: ${esc(f.prerequisites)}</div>`:""}<div class="r-body">${annotateKeywords(esc(f.effect||""))}</div>`:"<span class='muted'>—</span>"; }
  return "<span class='muted'>—</span>";
}
function openRefDetail(kind, name){
  if(kind==="species") return speciesModal(getSpecies(name));
  infoModal(name, refDetailHTML(kind, name));
}
/* Abilities the sheet mechanically auto-applies (into stat/CS/damage/accuracy/type calculations) →
   name (lowercased) : short note shown as a ⚙ badge so players know it's handled for them.
   Keep this in sync with pokeBaseStats, effectiveCS/abilityStatusCS, WEATHER_DEFS.abilityCS,
   effectiveMoveType, critThreshold, abilityDamageMods and abilityAccMods. */
const AUTOMATED_ABILITIES = {
  "huge power":"Base Attack doubled in this Pokémon's stats.",
  "pure power":"Base Attack doubled in this Pokémon's stats.",
  "adaptability":"+1 Damage Base on STAB moves in move rolls.",
  "technician":"+2 Damage Base on DB≤6 / Double- & Five-Strike moves.",
  "iron fist":"+2 Damage Base on its punching moves.",
  "tough claws":"+2 Damage Base on Melee moves.",
  "reckless":"+2 Damage Base on Recoil moves & Jump Kicks.",
  "strong jaw":"+2 Damage Base on its biting moves.",
  "mega launcher":"+2 Damage Base on Aura Sphere / the Pulse moves.",
  "punk rock":"+2 Damage Base on Sonic moves.",
  "sheer force":"+2 Damage Base when a move's secondary effect is suppressed.",
  "sheer force [errata]":"+10 damage when a move's secondary effect is suppressed.",
  "hustle":"+10 Physical damage, −2 Physical Accuracy in move rolls.",
  "hustle [errata]":"+10 damage, −2 Accuracy in move rolls.",
  "compound eyes":"+3 Accuracy in move rolls.",
  "super luck":"Critical Hits on 18–20.",
  "normalize":"All moves treated as Normal-Type.",
  "aerilate":"Normal damaging moves can be retyped to Flying (toggle in the move roll — affects STAB).",
  "pixilate":"Normal damaging moves can be retyped to Fairy (toggle in the move roll — affects STAB).",
  "galvanize":"Normal damaging moves can be retyped to Electric (toggle in the move roll — affects STAB).",
  "refridgerate":"Normal damaging moves can be retyped to Ice (toggle in the move roll — affects STAB).",
  "refrigerate":"Normal damaging moves can be retyped to Ice (toggle in the move roll — affects STAB).",
  "guts":"+2 Attack Combat Stages while suffering a Status.",
  "toxic boost":"+2 Attack Combat Stages while Poisoned.",
  "flare boost":"+2 Sp. Attack Combat Stages while Burned.",
  "marvel scale":"+2 Defense Combat Stages while suffering a Status.",
  "chlorophyll":"+4 Speed Combat Stages while Sunny.",
  "solar power":"+2 Sp. Attack Combat Stages while Sunny (loses 1/16 HP/turn).",
  "swift swim":"+4 Speed Combat Stages while Rainy.",
  "sand rush":"+4 Speed Combat Stages in a Sandstorm.",
  "sand force":"+5 damage to Ground/Rock/Steel moves in a Sandstorm.",
  "snow cloak":"+2 Evasion while Hailing.",
  "thermosensitive":"±2 Atk & Sp.Atk Combat Stages from the weather.",
  // defensive Type resistances / immunities (Static) — applied to the Type Matchups chart & the map damage tool
  "thick fat":"Resists Fire & Ice one step further in the Type chart.",
  "heatproof":"Resists Fire one step further in the Type chart.",
  "water bubble":"Resists Fire one step further in the Type chart.",
  "fluffy":"Weaker to Fire in the Type chart (Melee resistance not shown).",
  "purifying salt":"Resists Ghost in the Type chart.",
  "levitate":"Immune to Ground in the Type chart.",
  "sap sipper":"Immune to Grass in the Type chart.",
  "volt absorb":"Immune to Electric in the Type chart.",
  "water absorb":"Immune to Water in the Type chart.",
  "flash fire":"Immune to Fire in the Type chart.",
  "motor drive":"Immune to Electric in the Type chart.",
  "earth eater":"Immune to Ground in the Type chart.",
  "well-baked body":"Immune to Fire in the Type chart.",
  "dry skin":"Immune to Water in the Type chart.",
  "wonder guard":"Only Super-Effective attacks can hit (Type chart & map damage).",
  "filter":"Softens Super-Effective damage (×1.5→×1.25, ×2→×1.5) in the Type chart & map damage.",
  "solid rock":"Softens Super-Effective damage (×1.5→×1.25, ×2→×1.5); +5 DR vs Super-Effective if paired with Filter.",
  "prism armor":"+5 Damage Reduction vs Super-Effective damage in the map damage tool.",
};
function abilityAutoNote(name){ return AUTOMATED_ABILITIES[String(name||"").toLowerCase()] || null; }
function abilityText(a){
  const auto = abilityAutoNote(a.name);
  return `<div class="r-meta">${esc(a.frequency||"")}${a.keywords?" · "+esc(a.keywords):""}</div>
    ${auto?`<div class="r-body" style="color:var(--accent);font-weight:600">⚙ Auto-applied: ${esc(auto)}</div>`:""}
    ${a.trigger?`<div class="r-body"><b>Trigger:</b> ${annotateKeywords(esc(a.trigger))}</div>`:""}
    <div class="r-body">${annotateKeywords(esc(a.effect||""))}</div>`;
}
function moveDetailHTML(m, name){
  if(!m) return "Not in database.";
  const kv = (l,v)=> v!=null&&v!==""?`<span class="kv">${l}: ${annotateKeywords(esc(v))}</span>`:"";
  return `<div style="margin-bottom:6px">${typeBadge(m.type||"Normal")} <span class="kv">${esc(m.class||"")}</span></div>
    ${kv("Frequency",m.frequency)}${kv("AC",m.ac)}${m.damageBase?`<span class="kv">DB ${m.damageBase} (${DB_TABLE[m.damageBase]||"?"})</span>`:""}${kv("Range",m.range)}
    <div class="r-body" style="margin-top:8px">${annotateKeywords(esc(m.effect||""))}</div>
    ${(m.contest && showContest())?`<div class="r-meta" style="margin-top:6px">Contest: ${esc(m.contest)}</div>`:""}
    <div style="margin-top:8px"><span class="tm-chip" data-tmmove="${escAttr(m.name)}" title="See which of your Pokémon can learn this via TM/HM">🔍 Which of my Pokémon can learn this? (TM/HM)</span></div>`;
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
    if(s.moves.tmhm?.length){
      // each TM/HM is clickable → shows which of your Pokémon can learn it
      html += `<details class="spoiler" open><summary>TM/HM Moves (${s.moves.tmhm.length}) <span class="small muted">— tap one to see who can learn it</span></summary><div class="r-body">${
        s.moves.tmhm.map(raw=>`<span class="tm-chip" data-tmmove="${escAttr(tmMoveName(raw))}" title="See which of your Pokémon can learn ${escAttr(tmMoveName(raw))}">${esc(raw)}</span>`).join(" ")
      }</div></details>`;
    }
    [["Egg",s.moves.egg],["Tutor",s.moves.tutor]].forEach(([l,arr])=>{ if(arr?.length) html+=`<details class="spoiler"><summary>${l} Moves (${arr.length})</summary><div class="r-body">${arr.map(esc).join(", ")}</div></details>`; });
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
      const mine = ownsRow(r);
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
$("#btnRefresh").addEventListener("click", forceRefresh);

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
/* Ownership is by DISPLAY NAME (+ campaign), not the device-random owner_id — so the same person
   on a second device (phone) with the same name can see & edit their own sheet. (Trusted group;
   names aren't secret, which matches the campaign's threat model.) */
function normName(s){ return (s||"").trim().toLowerCase(); }
function ownsRow(row){ return !!row && normName(row.owner_name)===normName(cloud.name) && normName(cloud.name)!==""; }
function canEdit(row){ return !!row && (cloud.isGM || ownsRow(row)); }
function canEditActive(){ return canEdit(cloud.byId[cloud.activeId]); }
/* the Viewer is a co-pilot/assistant device: it can add ANY player's token, select the whole party,
   move them, and edit every player's HP — but gets no GM-only tools (enemies, weather, map editing).
   Enabled by the explicit "Join as Viewer" checkbox (cloud.viewer); the legacy magic display-name
   "viewer" still works so old sessions keep behaving. Never a Viewer while holding the GM code. */
function isMapHpViewer(){ return !cloud.isGM && (cloud.viewer===true || (cloud.name||"").trim().toLowerCase()==="viewer"); }
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
  try {
    // no-store + Cache-Control:no-cache on every request: a plain fetch() to the REST API can be
    // served stale by the browser's HTTP cache or an edge cache (Supabase sits behind Cloudflare) —
    // the exact same class of bug sw.js already works around for index.html (see its big comment).
    // For a GET this means casUpsert's "someone moved the row, refetch + merge" step, and any of the
    // periodic fetchEnc/fetchPC/fetchMap resyncs, can read a REV THAT'S ALREADY STALE — so the CAS
    // write keeps failing against a target that never matches, the retry loop exhausts (the "Save
    // kept conflicting" toast) even with a single solo editor, and a reconnect/refresh re-adopts that
    // same stale snapshot, which is what showed up as encounter edits repeatedly reverting.
    const noCacheFetch = (input, init) => {
      // spreading a Headers instance (what supabase-js passes) drops its entries silently —
      // {...headers} only copies OWN ENUMERABLE PROPS, which a Headers object has none of. Use the
      // Headers constructor to merge instead, or the apikey/Authorization headers vanish.
      const headers = new Headers(init && init.headers);
      headers.set("Cache-Control", "no-cache");
      return fetch(input, { ...init, cache: "no-store", headers });
    };
    cloud.client = supabase.createClient(CLOUD_CFG.url, CLOUD_CFG.anonKey, { global: { fetch: noCacheFetch } });
  }
  catch(e){ console.error("Supabase init failed", e); return; }
  cloud.userId = myUserId();
  try{
    const s = JSON.parse(localStorage.getItem("ptu_cloud_session")||"null");
    if(s && s.campaign && s.name) cloudConnect(s.campaign, s.name, s.gm||"", true, !!s.viewer);
  }catch(e){}
}
function injectCloudButton(){
  if($("#btnCloud")) return;
  $(".top-actions").prepend(el("button",{id:"btnCloud",class:"btn ghost",title:"Cloud campaign sync",onclick:openCloudPanel},"☁ Cloud"));
}
function updateCloudButton(){
  const b=$("#btnCloud"); if(!b) return;
  b.textContent = mode==="cloud" ? `☁ ${cloud.name}${cloud.isGM?" (GM)":isMapHpViewer()?" (Viewer)":""}` : "☁ Cloud";
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
const SHEET_COLS = "id,campaign,owner_id,owner_name,name,data,rev,updated_at";

/* ───────────────────────── conflict-safe cloud writes ─────────────────────────
   Every sheet is one JSON blob in one row, and two people (a player + the GM) can
   hold and edit the same row at once. The old model was "last write by client clock
   wins the WHOLE blob", which silently discarded the other editor's changes and — with
   skewed machine clocks — reverted edits non-deterministically. The new model:

   • The server owns an integer `rev` (bumped by a trigger on every write) and the
     `updated_at` timestamp. Clients never decide ordering by their own clock.
   • Writes are compare-and-swap: "update this row ONLY IF it's still at the rev I based
     my edit on". If someone else wrote in between, the write is REJECTED, we re-fetch the
     fresh copy, MERGE our change onto it field-by-field (never clobbering), and retry.
   That makes lost updates impossible and removes all dependence on clock accuracy. */
function isObj(v){ return v && typeof v==="object" && !Array.isArray(v); }
function deepClone(v){ return v==null ? v : JSON.parse(JSON.stringify(v)); }
function deepEqual(a,b){
  if(a===b) return true;
  if(typeof a!==typeof b) return false;
  if(a===null||b===null) return a===b;
  if(Array.isArray(a)||Array.isArray(b)){
    if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length) return false;
    for(let i=0;i<a.length;i++) if(!deepEqual(a[i],b[i])) return false;
    return true;
  }
  if(typeof a==="object"){
    const ka=Object.keys(a), kb=Object.keys(b);
    if(ka.length!==kb.length) return false;
    for(const k of ka){ if(!Object.prototype.hasOwnProperty.call(b,k)) return false; if(!deepEqual(a[k],b[k])) return false; }
    return true;
  }
  return false;
}
/* 3-way field-level merge. base = last common ancestor (what the server held when I last
   synced), mine = my copy, theirs = the fresh server copy. `tie` = "mine"|"theirs" — who
   wins when the SAME scalar/leaf was changed on both sides (we pass "mine" for the GM,
   "theirs" for a player, so the GM wins ties). Objects merge key-by-key, arrays of {id}
   objects (party, tokens, encounters…) merge by id, other arrays are leaves. Deletions the
   other side didn't also edit are honored, so nothing gets resurrected. */
function merge3(base, mine, theirs, tie){
  if(deepEqual(mine, theirs)) return mine;
  if(deepEqual(base, mine)) return theirs;     // I didn't touch it → take theirs
  if(deepEqual(base, theirs)) return mine;     // they didn't touch it → take mine
  if(Array.isArray(mine) && Array.isArray(theirs)) return mergeArray(base, mine, theirs, tie);
  if(isObj(mine) && isObj(theirs)){
    const out = {}, bObj = isObj(base) ? base : {};
    const keys = new Set([...Object.keys(mine), ...Object.keys(theirs), ...Object.keys(bObj)]);
    for(const k of keys){
      const inM = Object.prototype.hasOwnProperty.call(mine, k);
      const inT = Object.prototype.hasOwnProperty.call(theirs, k);
      const inB = Object.prototype.hasOwnProperty.call(bObj, k);
      const b = bObj[k];
      if(inM && inT){ out[k] = merge3(b, mine[k], theirs[k], tie); }
      else if(inM && !inT){ if(inB && deepEqual(b, mine[k])){ /* they deleted, I didn't change → drop */ } else out[k] = mine[k]; }
      else if(!inM && inT){ if(inB && deepEqual(b, theirs[k])){ /* I deleted, they didn't change → drop */ } else out[k] = theirs[k]; }
    }
    return out;
  }
  return tie==="mine" ? mine : theirs;         // scalar leaf / type mismatch changed on both sides
}
function mergeArray(base, mine, theirs, tie){
  const idOk = a => Array.isArray(a) && a.length>0 && a.every(x => x && typeof x==="object" && !Array.isArray(x) && "id" in x);
  const byId = (idOk(mine)||idOk(theirs)) && (mine.length===0||idOk(mine)) && (theirs.length===0||idOk(theirs));
  if(!byId) return tie==="mine" ? mine : theirs;   // leaf array (e.g. a list of move names)
  const bBase = new Map((Array.isArray(base)?base:[]).filter(x=>x&&typeof x==="object"&&"id"in x).map(x=>[x.id,x]));
  const bMine = new Map(mine.map(x=>[x.id,x])), bThe = new Map(theirs.map(x=>[x.id,x]));
  const order = [], seen = new Set();
  for(const x of mine){ if(!seen.has(x.id)){ order.push(x.id); seen.add(x.id); } }
  for(const x of theirs){ if(!seen.has(x.id)){ order.push(x.id); seen.add(x.id); } }
  const out = [];
  for(const id of order){
    const inM=bMine.has(id), inT=bThe.has(id), inB=bBase.has(id);
    if(inM && inT) out.push(merge3(bBase.get(id), bMine.get(id), bThe.get(id), tie));
    else if(inM && !inT){ if(inB && deepEqual(bBase.get(id), bMine.get(id))){ /* they removed → drop */ } else out.push(bMine.get(id)); }
    else if(!inM && inT){ if(inB && deepEqual(bBase.get(id), bThe.get(id))){ /* I removed → drop */ } else out.push(bThe.get(id)); }
  }
  return out;
}
/* ─────────────────── compartmentalized (field-level) writes ───────────────────
   A whole sheet is one JSON blob, but a single edit almost never touches more than a
   handful of fields. Uploading the WHOLE blob for "I spent 200 money" means:
     • every save races every other save of that row (a player's money vs the GM's level
       edit vs someone dragging a token) and has to be reconciled after the fact,
     • the payload is huge (avatars/sprites are inline data-URLs), so writes are slow and
       realtime broadcasts blow past Supabase's ~1 MB limit and get truncated.
   Instead we send only what CHANGED: `diffOps(base, cur)` walks our last-synced baseline
   against the live object and emits a list of ops, each with a PATH into the JSON:

     {p:["trainer","money"], v:1200}                  set a field
     {p:["pokemon",{id:"m3"},"currentHP"], v:14}      set a field of the party member id m3
     {p:["pokemon",{id:"m3"}], d:1}                   delete that party member
     {p:["fog","map1"], a:["3,4","3,5"]}              append to an array

   The server applies those ops onto whatever the row holds RIGHT NOW, inside one atomic
   UPDATE (see ptu_apply_ops in db/patch-ops.sql). So two people editing different fields
   of the same sheet — or dragging two different tokens — simply both land, with no
   conflict, no retry and no merge needed. Only the same FIELD edited at the same instant
   is last-writer-wins, which is the smallest possible unit of conflict.
   `{id:…}` path segments are resolved server-side against the CURRENT array, so an op
   never targets a stale index if someone added/removed an entry in the meantime.

   If the database hasn't had the one-time function added yet (or an edit is so large that
   sending the blob is cheaper), we transparently fall back to the whole-blob CAS path below,
   so the app keeps working exactly as before. */
const OPS_MAX = 80;          // beyond this many ops the whole-blob write is cheaper/safer
function isIdArray(a){ return Array.isArray(a) && a.every(x => x && typeof x==="object" && !Array.isArray(x) && "id" in x); }
/* is `base` an exact prefix of `cur`? (things were only appended — fog cells, log lines…) */
function appendedOnly(base, cur){
  if(!Array.isArray(base) || !Array.isArray(cur) || cur.length <= base.length) return false;
  for(let i=0;i<base.length;i++) if(!deepEqual(base[i], cur[i])) return false;
  return true;
}
function diffOps(base, cur, path, out){
  path = path || []; out = out || [];
  if(out.length > OPS_MAX) return out;                       // caller falls back to a blob write
  if(deepEqual(base, cur)) return out;
  if(cur === undefined){ out.push({ p:path, d:1 }); return out; }
  if(isObj(base) && isObj(cur)){
    for(const k of Object.keys(cur)){
      if(cur[k] === undefined) continue;                     // JSON drops these anyway
      if(!Object.prototype.hasOwnProperty.call(base, k)) out.push({ p:[...path,k], v:cur[k] });
      else diffOps(base[k], cur[k], [...path,k], out);
      if(out.length > OPS_MAX) return out;
    }
    for(const k of Object.keys(base)) if(!Object.prototype.hasOwnProperty.call(cur, k)) out.push({ p:[...path,k], d:1 });
    return out;
  }
  if(Array.isArray(base) && Array.isArray(cur)){
    if(isIdArray(base) && isIdArray(cur)){
      const bIds = base.map(x=>x.id), cIds = cur.map(x=>x.id);
      const bSet = new Set(bIds), cSet = new Set(cIds);
      const kept = cIds.filter(id=>bSet.has(id));
      // the surviving entries must still be in the same relative order, and everything new must
      // sit at the end — otherwise the order itself changed and we just replace the array.
      const orderOk = deepEqual(kept, bIds.filter(id=>cSet.has(id))) &&
                      cIds.slice(0, kept.length).every((id,i)=>id===kept[i]);
      if(!orderOk){ out.push({ p:path, v:cur }); return out; }
      const bMap = new Map(base.map(x=>[x.id,x]));
      for(const id of bIds) if(!cSet.has(id)) out.push({ p:[...path,{id}], d:1 });
      for(const x of cur){
        if(!bSet.has(x.id)) continue;
        diffOps(bMap.get(x.id), x, [...path,{id:x.id}], out);
        if(out.length > OPS_MAX) return out;
      }
      const added = cur.slice(kept.length);
      if(added.length) out.push({ p:path, a:added });
      return out;
    }
    if(appendedOnly(base, cur)){ out.push({ p:path, a:cur.slice(base.length) }); return out; }
    out.push({ p:path, v:cur });                             // leaf array (move names, terrains…)
    return out;
  }
  out.push({ p:path, v:cur });                               // scalar / type change
  return out;
}
/* Apply ops locally the same way the server will — used to keep a row's baseline in step and
   (in tests) to prove diff+apply round-trips. Mirrors ptu_apply_ops's semantics exactly. */
function applyOps(target, ops){
  (ops||[]).forEach(op=>{
    let node = target;
    for(let i=0;i<op.p.length-1;i++){
      const seg = op.p[i];
      if(seg && typeof seg==="object"){
        if(!Array.isArray(node)) return;
        node = node.find(x=>x && x.id===seg.id);
        if(!node) return;
      } else {
        if(node[seg] == null || typeof node[seg]!=="object"){ if(op.d) return; node[seg] = {}; }
        node = node[seg];
      }
    }
    const last = op.p[op.p.length-1];
    if(last && typeof last==="object"){
      if(!Array.isArray(node)) return;
      const idx = node.findIndex(x=>x && x.id===last.id);
      if(idx<0) return;
      if(op.d) node.splice(idx,1); else if("v" in op) node[idx] = op.v;
      return;
    }
    if(op.d) delete node[last];
    else if(op.a){ if(!Array.isArray(node[last])) node[last] = []; node[last].push(...op.a); }
    else node[last] = op.v;
  });
  return target;
}
/* Send a row's pending changes as field-level ops. Returns true (saved), false (failed) or
   "fallback" when the caller should use the whole-blob CAS write instead. */
let opsRpcFails = 0;
async function opsUpsert(row){
  if(cloud.opsRpc === false) return "fallback";
  if(row._rev == null || row._base == null) return "fallback";      // never synced → plain insert
  const snap = deepClone(row.data);
  const ops = diffOps(row._base, snap);
  if(!ops.length){ row._base = snap; return true; }                 // nothing actually changed
  if(ops.length > OPS_MAX) return "fallback";
  const meta = { campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name, name:row.name };
  cloud.inflight[row.id] = (cloud.inflight[row.id]||0) + 1;
  cloud.lastSaveTs = Date.now();
  try{
    const { data, error } = await cloud.client.rpc("ptu_apply_ops", { p_id:row.id, p_meta:meta, p_ops:ops });
    if(error){
      // function not installed yet (PGRST202 / 404) → stop trying and use the blob path for good
      if(error.code==="PGRST202" || /Could not find the function|does not exist/i.test(error.message||"")){
        cloud.opsRpc = false;
        console.warn("[ptu] field-level sync unavailable — run db/patch-ops.sql on Supabase for conflict-free edits");
        // tell the GM once (only they can run it); players don't need to know
        if(cloud.isGM && !sessionStorage.getItem("ptu_ops_notice")){
          try{ sessionStorage.setItem("ptu_ops_notice","1"); }catch(e){}
          toast("ℹ Sync is in compatibility mode — run db/patch-ops.sql on Supabase for per-field edits");
        }
        return "fallback";
      }
      console.error(error);
      // A function that's installed but unhappy would otherwise cost every save a failed RPC on top
      // of the real write — after a few in a row, stop asking and just use the blob path.
      if(++opsRpcFails >= 3) cloud.opsRpc = false;
      return "fallback";                                            // transient → let CAS have a go
    }
    if(!data || data.missing){ row._rev = null; return "fallback"; } // row is gone → re-insert it
    opsRpcFails = 0;
    cloud.opsRpc = true;
    row._rev = data.rev; row.updated_at = data.updated_at;
    // our ops applied to our baseline IS the state the server now holds for the fields we touched;
    // anything someone else changed meanwhile arrives via realtime (which merges) — see adoptRemote.
    row._base = snap;
    return true;
  } finally {
    cloud.inflight[row.id]--; if(cloud.inflight[row.id]<=0) delete cloud.inflight[row.id];
  }
}
/* The one write entry point: try the compartmentalized patch, fall back to whole-blob CAS. */
async function syncUpsert(row, mergeFn){
  const r = await opsUpsert(row);
  if(r !== "fallback") return r;
  return casUpsert(row, mergeFn);
}

/* Compare-and-swap upsert of a single row. row carries `_rev` (server rev our edit is based
   on; null/undefined = never synced → insert) and `_base` (server data at that rev, for the
   3-way merge). Callers already wrap this in a per-row serialize() chain so writes to one row
   never race each other; here we also mark cloud.inflight so realtime defers to our pending
   write. Returns true on success. `mergeFn` defaults to the field-level merge3. */
async function casUpsert(row, mergeFn){
  mergeFn = mergeFn || merge3;
  const id = row.id;
  cloud.inflight[id] = (cloud.inflight[id]||0) + 1;
  cloud.lastSaveTs = Date.now();
  try{
    for(let attempt=0; attempt<8; attempt++){
      const meta = { id, campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name, name:row.name };
      const payloadData = deepClone(row.data);                 // exactly what the server will hold on success
      if(row._rev==null){
        const { data:ins, error } = await cloud.client.from("sheets").insert({ ...meta, data:payloadData }).select(SHEET_COLS);
        if(!error && ins && ins.length){ row._rev=ins[0].rev; row.updated_at=ins[0].updated_at; row._base=payloadData; return true; }
        // error (usually a duplicate id from a race) → fall through to fetch + merge + retry
      } else {
        const { data:upd, error } = await cloud.client.from("sheets").update({ ...meta, data:payloadData })
          .eq("id", id).eq("rev", row._rev).select(SHEET_COLS);
        if(error){ console.error(error); toast("⚠ Cloud save failed"); return false; }
        if(upd && upd.length){ row._rev=upd[0].rev; row.updated_at=upd[0].updated_at; row._base=payloadData; return true; }
        // 0 rows → the row moved past our rev (someone else wrote) → reconcile
      }
      const { data:cur, error:fe } = await cloud.client.from("sheets").select(SHEET_COLS).eq("id", id).limit(1);
      if(fe){ console.error(fe); toast("⚠ Cloud save failed"); return false; }
      if(!cur || !cur.length){ row._rev = null; continue; }     // vanished → retry as an insert
      const server = cur[0];
      // No known common ancestor (_base lost/never set — a first-write race, a cache-recovered row) →
      // pass a null base so merge3 UNIONS both sides instead of letting "mine" wholesale-overwrite
      // "theirs". Union may resurrect a row the other side deleted, but that's strictly safer than
      // silently dropping their entire concurrent edit (which is what base=server.data did here).
      const base = (row._base!=null) ? row._base : null;
      const tie  = cloud.isGM ? "mine" : "theirs";              // GM wins ties
      row.data  = mergeFn(base, row.data, server.data, tie);
      row._base = deepClone(server.data);                       // common ancestor for a possible next retry
      row._rev  = server.rev;
    }
    toast("⚠ Save kept conflicting — will retry on next change");
    return false;
  } finally {
    cloud.inflight[id]--; if(cloud.inflight[id]<=0) delete cloud.inflight[id];
  }
}
/* mark a freshly-fetched server row as our new synced baseline */
function adoptRev(row){ if(row){ row._rev = row.rev; row._base = deepClone(row.data); } return row; }

/* Take a server copy of a row we already hold, WITHOUT ever losing an un-flushed local edit.
   The old code simply IGNORED the incoming row whenever `data` had diverged from `_base`
   ("I still owe the server a write"), both here and in onRealtime. That looks safe but is the
   single biggest cause of "I have to reload the page for it to work": if that write never lands
   (a dropped connection, an exhausted retry, a value the server normalises differently) the row
   stays diverged FOREVER and every later update from everyone else is silently dropped for the
   rest of the session. Now we 3-way merge instead: their change lands, our unsaved change is kept
   on top, and `_dirty` tells the caller to re-push what's still ours.

   It also MUTATES the row object in place rather than replacing it in cloud.byId — debounced
   saves, drag handlers and open modals all captured the old object, and swapping it out from
   under them meant the next save wrote a stale copy (another "it didn't take, do it again"). */
function adoptRemote(cur, incoming, normFn){
  const theirs = normFn ? normFn(incoming.data) : incoming.data;
  if(!cur) return adoptRev({ ...incoming, data: theirs });
  const diverged = cur._base != null && !deepEqual(cur.data, cur._base);
  cur.data  = diverged ? merge3(cur._base, cur.data, theirs, cloud.isGM ? "mine" : "theirs") : theirs;
  cur._base = deepClone(theirs);
  cur._rev  = incoming.rev;
  cur.rev   = incoming.rev;
  if(incoming.updated_at != null) cur.updated_at = incoming.updated_at;
  ["campaign","owner_id","owner_name","name"].forEach(k=>{ if(incoming[k]!=null) cur[k]=incoming[k]; });
  cur._dirty = diverged && !deepEqual(cur.data, cur._base);   // we still hold something unsaved
  return cur;
}

async function fetchRoster(){
  const { data, error } = await cloud.client.from("sheets").select(SHEET_COLS).eq("campaign", cloud.campaign);
  if(error) throw error;
  const seen = new Set();
  (data||[]).forEach(r => {
    if(r.owner_id===PC_OWNER){ cloud.pc = mergeShared(cloud.pc, r, pcData); repushIfDirty(cloud.pc, pcUpsert); return; }
    if(r.owner_id===MAP_OWNER || r.owner_id===ENC_OWNER) return;                        // shared rows aren't characters
    seen.add(r.id);
    const cur = cloud.byId[r.id];
    if(cur && cloud.inflight[r.id]) return;              // our write is mid-commit → it's authoritative
    const row = adoptRemote(cur, r, d => migrateChar(d, r.id));
    cloud.byId[r.id] = row;
    if(canEdit(row)) repushIfDirty(row, ()=>cloudSaveRow(row));   // re-push the edit the server never got
    else row._dirty = false;
  });
  // rows that vanished server-side (deleted elsewhere) go away here, as before — but never one
  // we're actively writing, which would resurrect-then-drop a sheet someone just created.
  Object.keys(cloud.byId).forEach(id=>{ if(!seen.has(id) && !cloud.inflight[id]) delete cloud.byId[id]; });
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
    // Only recover a genuinely-unsynced edit: the cached copy was based on the SAME server rev
    // we just fetched (rev matches) yet its data differs → our last write never reached the server.
    // Push it back through CAS, which will merge (never clobber) if the server has since moved on.
    if(cr._rev!=null && cr._rev===db._rev && !deepEqual(cr.data, db.data)){
      db.data = migrateChar(cr.data, cr.id);
      dispatchRowSave(db);   // fire-and-forget, conflict-safe
    }
  });
}
/* Same "edits revert after refresh" safety net as recoverUnsavedFromCache above, but for the four
   SHARED reserved rows (PC / map meta / map tokens / encounters). These were never cached at all,
   so an exhausted CAS retry (casUpsert gives up after 8 attempts and just toasts "kept conflicting
   — will retry on next change", but nothing actually retries until the user edits again) or a
   refresh mid-debounce silently discarded the edit with no way back — unlike character sheets,
   which recoverUnsavedFromCache already protects. Cached one JSON blob per kind (not reused from
   the per-character cache, whose format is a byId array). */
function sharedCacheKey(kind){ return "ptu_cloud_cache_shared_"+kind+"_"+cloud.campaign; }
function cacheSharedRow(kind, row){
  if(!row) return;
  try{ const { _base, ...rest } = row; localStorage.setItem(sharedCacheKey(kind), JSON.stringify(rest)); }catch(e){}
}
/* On (re)connect, compare the cached copy against the row we just fetched: if the cache was based
   on the SAME server rev (so it was never superseded by our own later successful write) yet its
   data differs from what's now live, our last write to it never actually reached the server —
   restore it and push it back through CAS (which merges, never clobbers, if the server has since
   moved on). */
function recoverUnsyncedShared(kind, getRow, upsertFn){
  let cached; try{ cached = JSON.parse(localStorage.getItem(sharedCacheKey(kind))||"null"); }catch(e){ return; }
  const cur = getRow();
  if(!cached || !cur) return;
  if(cached._rev!=null && cached._rev===cur._rev && !deepEqual(cached.data, cur.data)){
    cur.data = cached.data;
    upsertFn();   // fire-and-forget, conflict-safe
  }
}
/* A merge kept a local edit the server never received → schedule its (debounced) write again.
   Without this, an edit that merged cleanly would sit in memory unsaved until the user happened
   to touch the same row again. */
function repushIfDirty(row, saveFn){ if(row && row._dirty){ row._dirty=false; try{ saveFn(); }catch(e){ console.error(e); } } }
/* the shared PC storage (visible to every member, so it's fetched separately from the roster) */
function pcData(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "pc";
  data.pokemon = Array.isArray(data.pokemon) ? data.pokemon : [];
  data.pokemon.forEach(normPokemon);
  return data;
}
/* Reconcile a shared reserved-row (map/PC/enc) refetch against what we already hold, so a full
   SELECT (fired by scheduleSharedRefetch whenever an oversized realtime payload is truncated —
   common, since these rows carry image data-URLs) can NEVER revert an optimistic local edit whose
   serialized write hasn't reached the server yet. Same last-write-wins-by-timestamp rule onRealtime
   uses: the server row is taken only if it's at least as new as ours; otherwise keep local. A row
   missing from the fetch keeps local too (a transient partial result must not wipe the board). */
function mergeShared(local, fetched, normFn){
  if(!fetched) return local || null;
  // A write to this row is mid-commit → its result (not this pre-commit fetch) is authoritative. Also
  // covers the case where _base was lost (null), which would otherwise skip the unsynced-edit guard
  // in adoptRemote and silently adopt a stale server copy over an un-flushed local edit.
  if(local && cloud.inflight[fetched.id]) return local;
  // Unsynced local edits are MERGED on top of the server copy (not used to ignore it) — see
  // adoptRemote; the caller re-pushes anything still ours when `_dirty` comes back true.
  return adoptRemote(local, fetched, normFn);
}
async function fetchPC(){
  const { data, error } = await cloud.client.from("sheets").select(SHEET_COLS).eq("id", pcId()).limit(1);
  if(error){ console.error(error); return; }   // keep local on a fetch error, don't wipe it
  cloud.pc = mergeShared(cloud.pc, data && data[0], pcData);
  repushIfDirty(cloud.pc, pcUpsert);
}
function ensurePCRow(){
  if(!cloud.pc) cloud.pc = { id:pcId(), campaign:cloud.campaign, owner_id:PC_OWNER, owner_name:"PC",
                            name:"PC Storage", data:{ kind:"pc", pokemon:[] } };
  return cloud.pc;
}
function pcUpsert(){
  const row = ensurePCRow();
  row.owner_name = "PC"; row.name = "PC Storage";
  cacheSharedRow("pc", row);   // optimistic: survives a refresh/crash before the write below lands
  return serialize(pcChain, ()=> syncUpsert(row).then(ok=>{ cacheSharedRow("pc", row); return ok; }));
}

/* ---- shared battle map: reserved rows (meta + tokens), same pattern as the PC ---- */
function normMapMeta(data){
  data = (data && typeof data==="object") ? data : {};
  data.kind = "mapmeta";
  data.maps = Array.isArray(data.maps) ? data.maps : [];
  data.maps.forEach(m => {
    if(typeof m.gridSize!=="number" || m.gridSize<8) m.gridSize = 32;
    if(typeof m.gridOn!=="boolean") m.gridOn = true;
    if(typeof m.name!=="string") m.name = "Map";
    if(typeof m.archived!=="boolean") m.archived = false;
    // migrate single bg → layered images[] (w/h 0 → resolved to natural size on first GM view)
    if(!Array.isArray(m.images)) m.images = (typeof m.bg==="string" && m.bg) ? [{id:uid(),src:m.bg,x:0,y:0,w:0,h:0}] : [];
    delete m.bg;
    m.images.forEach(im=>{ ["x","y","w","h"].forEach(k=>{ if(typeof im[k]!=="number") im[k]=0; }); if(!im.id) im.id=uid(); });
    if(typeof m.fogOn!=="boolean") m.fogOn = false;
    if(typeof m.fogRadius!=="number" || m.fogRadius<1) m.fogRadius = 3;
    if(typeof m.weather!=="string" || !WEATHER_BY_KEY[m.weather]) m.weather = "clear";   // Core p.342
    if(!Array.isArray(m.terrains)) m.terrains = [];
    m.terrains = m.terrains.filter(k=>TERRAIN_BY_KEY[k]);
  });
  // playerMapId = the map players see (seed from the old shared activeMapId for back-compat)
  const firstLive = data.maps.find(m=>!m.archived) || data.maps[0] || null;
  if(!data.playerMapId || !data.maps.find(m=>m.id===data.playerMapId) || data.maps.find(m=>m.id===data.playerMapId)?.archived)
    data.playerMapId = data.maps.find(m=>m.id===data.activeMapId && !m.archived) ? data.activeMapId : (firstLive?.id || null);
  if(!data.activeMapId || !data.maps.find(m=>m.id===data.activeMapId) || data.maps.find(m=>m.id===data.activeMapId)?.archived)
    data.activeMapId = firstLive?.id || null;
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
  if(error){ console.error(error); return; }   // keep local on a fetch error, don't wipe the board
  const meta = (data||[]).find(r=>r.id===mapMetaId());
  const toks = (data||[]).find(r=>r.id===mapTokensId());
  cloud.mapMeta   = mergeShared(cloud.mapMeta, meta, normMapMeta);
  cloud.mapTokens = mergeShared(cloud.mapTokens, toks, normMapTokens);
  repushIfDirty(cloud.mapMeta,   mapMetaSave);
  repushIfDirty(cloud.mapTokens, mapTokensSave);
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
/* One-time cleanup: existing maps store their backgrounds as base64 data-URLs in the meta row,
   which is exactly what makes that row oversized and re-downloaded on every sync. On connect the
   GM lifts any such background into Storage and rewrites it to a URL, then saves once (field-level
   patch → only the small URL is sent). After this the meta row is small, realtime stops
   truncating, and the re-download storm ends. GM-only; no-ops if there's nothing left to migrate. */
async function migrateMapBgsToStorage(){
  if(!cloud.isGM || !cloud.client || !cloud.mapMeta?.data?.maps?.length) return;
  let changed = false;
  for(const m of cloud.mapMeta.data.maps){
    if(!Array.isArray(m.images)) continue;
    for(const im of m.images){
      if(typeof im.src==="string" && /^data:[^,]*;base64,/i.test(im.src)){
        const url = await storeImg(im.src, "map");
        if(url && url!==im.src){ im.src = url; changed = true; }
      }
    }
  }
  if(changed){ mapMetaSave(); toast("Map images moved to fast storage ✓"); }
}
async function mapMetaUpsert(){
  const row = ensureMapMeta();
  row.owner_name = "Map"; row.name = "Battle Map";
  const ok = await syncUpsert(row);                     // field-level patch (falls back to CAS)
  cacheSharedRow("mapmeta", row);
  return ok;
}
async function mapTokensUpsert(){
  const row = ensureMapTokens();
  row.owner_name = "Map"; row.name = "Map Tokens";
  const ok = await syncUpsert(row);                     // per-token fields patch independently
  cacheSharedRow("maptokens", row);
  return ok;
}
/* Debounced, coalescing save of the shared map-tokens row. HP ticks and drag commits arrive in
   bursts and each awaited a full upload before the UI updated — that was the "HP updates ~10s
   later" lag (#5). Callers now mutate the local model + re-render OPTIMISTICALLY, then call this;
   the network write catches up in the background and realtime syncs peers.
   Stamps updated_at IMMEDIATELY (like cloudSaveRow), not just when the debounced upsert finally
   fires. Without this, `cloud.mapTokens.updated_at` stays STALE for the whole debounce window, so
   a realtime echo of an unrelated, already-superseded earlier write can look "newer" than that
   stale stamp, pass onRealtime's staleness guard, and wholesale-REPLACE `cloud.mapTokens` — wiping
   out the pending local edit (HP/status/CS/moved token) before it's ever saved. That's what showed
   up as edits silently reverting under any burst of rapid map activity, not just literal double-clicks. */
/* A debounce alone only coalesces clicks that land within ONE window. A click burst spanning
   MORE than 300-350ms (extremely normal for "mashing the button") fires several SEPARATE debounce
   cycles, each dispatching its OWN independent upsert() call. A plain upsert has no server-side
   ordering guard (no WHERE updated_at < …), so if request #1 (dispatched first, older data) happens
   to complete slower than request #2 (dispatched later, newer data) — completely ordinary network
   jitter — the server just applies whichever one it received last, silently reverting the row to
   the OLDER state even though every client sent things in the right order. This is what kept
   causing the initiative "rollback" after the updated_at-stamping fix (which only protects against
   a REALTIME ECHO being misread locally; it does nothing once two writes are actually racing over
   the network to the same row). Fix: chain every write for a given row onto the PREVIOUS one's
   promise, so a new upsert is never even dispatched until the last one for that row has resolved —
   requests hit the server strictly one at a time, in true order, so out-of-order arrival is
   impossible. `serialize(state, fn)` is the shared helper for both map rows below. */
function serialize(state, fn){ return state.chain = state.chain.then(fn, fn); }
/* Per-row write chains for the non-map rows (character sheets, PC, encounters), so bursts of
   debounced writes to the SAME row reach Supabase strictly one at a time, in order — the same
   protection the map rows already have (see the serialize comment above). Without it a later,
   newer write can overtake an earlier one on the network and the server ends up holding the OLDER
   value ("edits revert"). Character rows keyed by id; PC/enc each get one shared chain. */
const rowChains = {};
function rowChain(id){ return rowChains[id] || (rowChains[id] = { chain: Promise.resolve() }); }
const encChain = { chain: Promise.resolve() };
const pcChain  = { chain: Promise.resolve() };
/* Debounced, coalescing save of the shared map-tokens row. HP ticks and drag commits arrive in
   bursts and each awaited a full upload before the UI updated — that was the "HP updates ~10s
   later" lag (#5). Callers now mutate the local model + re-render OPTIMISTICALLY, then call this;
   the network write catches up in the background and realtime syncs peers.
   Stamps updated_at IMMEDIATELY (like cloudSaveRow), not just when the debounced upsert finally
   fires. Without this, `cloud.mapTokens.updated_at` stays STALE for the whole debounce window, so
   a realtime echo of an unrelated, already-superseded earlier write can look "newer" than that
   stale stamp, pass onRealtime's staleness guard, and wholesale-REPLACE `cloud.mapTokens` — wiping
   out the pending local edit (HP/status/CS/moved token) before it's ever saved. That's what showed
   up as edits silently reverting under any burst of rapid map activity, not just literal double-clicks. */
let mapTokensTimer;
const mapTokensChain = { chain: Promise.resolve() };
function mapTokensSave(){
  const row = ensureMapTokens();   // conflict-safe write is debounced below; tokens merge by id on any conflict
  cacheSharedRow("maptokens", row);   // optimistic: survives a refresh before the debounced write lands
  clearTimeout(mapTokensTimer);
  mapTokensTimer = setTimeout(()=>{ mapTokensTimer=null; serialize(mapTokensChain, mapTokensUpsert); }, 350);
}
/* Debounced, coalescing save of the map META row. The ▶ next-turn button mutates it (initTurnId/
   initSeq/round) and used to fire one un-awaited upsert PER click — rapid clicks launched several
   concurrent writes of the same row that could commit OUT OF ORDER, leaving the shared row (and peers)
   on an earlier turn than the local screen. Coalescing to one write of the final state removes that race
   WITHIN one debounce window. Also stamps updated_at IMMEDIATELY (see mapTokensSave above), and — for
   click bursts that span MULTIPLE debounce windows — serializes onto `mapMetaChain` (see the comment
   above `serialize`) so consecutive writes can never land at the server out of order. */
let mapMetaTimer;
const mapMetaChain = { chain: Promise.resolve() };
function mapMetaSave(){
  const row = ensureMapMeta();   // conflict-safe write is debounced below (CAS by server rev)
  cacheSharedRow("mapmeta", row);   // optimistic: survives a refresh before the debounced write lands
  clearTimeout(mapMetaTimer);
  mapMetaTimer = setTimeout(()=>{ mapMetaTimer=null; serialize(mapMetaChain, mapMetaUpsert); }, 300);
}
/* Debounced upsert of a specific character row, keyed per-row, so rapid map-token HP edits to a
   real sheet coalesce into ONE write instead of one blocking upload per tick. Stamps updated_at +
   lastWrite immediately (like cloudSave) so a stale echo of our own write can't revert us. */
/* Conflict-safe dispatch of a character row: ordered per-row (so bursts can't race each other)
   and routed through CAS (so a concurrent editor's change is merged, never clobbered). Shared by
   cloudSave, cloudSaveRow, cloudUpsert, cloudNewCharacter and cache recovery. */
function dispatchRowSave(row){
  row.name = row.data?.name || row.name || "";
  cacheCloud();
  return serialize(rowChain(row.id), ()=> syncUpsert(row).then(ok=>{ cacheCloud(); return ok; }));
}
const rowSaveTimers = {};
function cloudSaveRow(row){
  if(!row) return;
  row.name = row.data?.name || "";
  cacheCloud();                                // optimistic local cache; the write is debounced below
  clearTimeout(rowSaveTimers[row.id]);
  rowSaveTimers[row.id] = setTimeout(()=>{ delete rowSaveTimers[row.id]; dispatchRowSave(row); }, 350);
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
  if(error){ console.error(error); return "error"; }   // keep local on a fetch error
  cloud.enc = mergeShared(cloud.enc, data && data[0], normEnc);
  repushIfDirty(cloud.enc, saveEnc);
  return (data && data[0]) ? "ok" : "absent";           // "absent" only when the query SUCCEEDED with no row
}
/* First-time-only: copy this GM device's pre-cloud encounters into a BRAND-NEW cloud row.
   INSERT-ONLY (never a CAS/merge) so it can NEVER overwrite an existing row. Reseeding a stale
   device-local snapshot over a populated row — which the old connect-time seed did whenever a
   transient fetch returned empty — is exactly what silently wiped hours of encounter work. If the
   row already exists the insert fails on the primary key and we simply re-fetch the real data. */
async function seedEncountersIfAbsent(){
  if(!(state.encounters?.length)) return;
  const row = ensureEnc();
  row.data = normEnc({ encounters: JSON.parse(JSON.stringify(state.encounters)) });
  const meta = { id:row.id, campaign:cloud.campaign, owner_id:ENC_OWNER, owner_name:"Encounters", name:"Encounters" };
  const { data:ins, error } = await cloud.client.from("sheets").insert({ ...meta, data:row.data }).select(SHEET_COLS);
  if(!error && ins && ins.length){ cloud.enc = adoptRev({ ...ins[0], data: normEnc(ins[0].data) }); }
  else { await fetchEnc(); }   // row already existed (or a transient error) → keep the real cloud data
}
function ensureEnc(){
  if(!cloud.enc) cloud.enc = { id:encRowId(), campaign:cloud.campaign, owner_id:ENC_OWNER,
    owner_name:"Encounters", name:"Encounters", data:normEnc(null) };
  return cloud.enc;
}
function encUpsert(){
  const row = ensureEnc();
  row.owner_name = "Encounters"; row.name = "Encounters";
  return serialize(encChain, ()=> syncUpsert(row).then(ok=>{ cacheSharedRow("enc", row); return ok; }));   // conflict-safe (encounters merge by id)
}
async function cloudConnect(campaign, name, gmCode, silent, viewer){
  campaign = (campaign||"").trim().toLowerCase(); name = (name||"").trim();
  if(!campaign || !name){ toast("Enter a campaign code and your name"); return; }
  cloud.campaign = campaign; cloud.name = name;
  cloud.isGM = !!(CLOUD_CFG.gmCode && gmCode && gmCode===CLOUD_CFG.gmCode);
  cloud.viewer = !cloud.isGM && !!viewer;   // co-pilot mode (can't be a Viewer AND the GM)
  if(gmCode && CLOUD_CFG.gmCode && !cloud.isGM && !silent){ toast("Wrong GM code — joining as player"); }
  localStorage.setItem("ptu_cloud_session", JSON.stringify({campaign, name, gm: cloud.isGM?gmCode:"", viewer: cloud.viewer}));
  try{
    await fetchRoster();
    await fetchPC();
    recoverUnsyncedShared("pc", ()=>cloud.pc, pcUpsert);
    await fetchMap();
    recoverUnsyncedShared("mapmeta", ()=>cloud.mapMeta, ()=>serialize(mapMetaChain, mapMetaUpsert));
    recoverUnsyncedShared("maptokens", ()=>cloud.mapTokens, ()=>serialize(mapTokensChain, mapTokensUpsert));
    const encStatus = await fetchEnc();
    recoverUnsyncedShared("enc", ()=>cloud.enc, encUpsert);
    // One-time seed of a GM's pre-cloud device encounters — ONLY when the cloud row genuinely does
    // NOT exist (query succeeded with no row) AND we've never seeded this campaign before. Never on
    // a fetch error or transient-empty result. Insert-only + this guard together stop a stale device
    // snapshot from clobbering real cloud work on a random refresh (the "hours of work reverted" bug).
    const encSeedKey = "ptu_enc_seeded_" + cloud.campaign;
    if(cloud.isGM && encStatus==="absent" && !localStorage.getItem(encSeedKey)){
      await seedEncountersIfAbsent();
    }
    if(cloud.isGM && encStatus!=="error") localStorage.setItem(encSeedKey, "1");   // don't seed again
    subscribeRealtime();
    mode = "cloud"; openMon = null;
    const mine = Object.values(cloud.byId).find(r=>ownsRow(r));
    cloud.activeId = mine ? mine.id : (Object.keys(cloud.byId)[0] || null);
    updateCloudButton(); closeModal(); render();
    migrateMapBgsToStorage();   // fire-and-forget: lift any legacy base64 map backgrounds into Storage
    if(!silent) toast(`Connected to “${campaign}”${cloud.isGM?" as GM":""} ✓`);
  }catch(e){
    console.error(e); mode="local";
    // the `rev` column powers conflict-safe sync; if the one-time DB update wasn't applied, say so clearly
    if(e && (e.code==="42703" || /column .*rev.* does not exist/i.test(e.message||""))){
      toast("⚠ Database needs the one-time sync update — see SETUP-CLOUD.md (add the rev column + trigger)");
    } else {
      toast("⚠ Couldn't connect — check config/network");
    }
  }
}
function cloudDisconnect(){
  if(cloud.sub){ try{ cloud.client.removeChannel(cloud.sub); }catch(e){} cloud.sub=null; }
  mode="local"; localStorage.removeItem("ptu_cloud_session");
  cloud.isGM=false; cloud.viewer=false;
  cloud.pc=null; cloud.mapMeta=null; cloud.mapTokens=null; cloud.enc=null;
  openMon=null; updateCloudButton(); closeModal(); render();
  toast("Switched to this device");
}
function subscribeRealtime(){
  if(cloud.sub){ try{ cloud.client.removeChannel(cloud.sub); }catch(e){} }
  cloud.subStatus = "CONNECTING"; cloud.lastEvent = Date.now();
  cloud.sub = cloud.client.channel("sheets-"+cloud.campaign)
    .on("postgres_changes",
        { event:"*", schema:"public", table:"sheets", filter:`campaign=eq.${cloud.campaign}` },
        onRealtime)
    // Track the socket's health. A websocket that quietly died (sleeping laptop, phone switching
    // from wifi to data, a proxy dropping an idle connection) used to leave the tab looking connected
    // while receiving nothing — every change made by anyone else was invisible until a manual reload.
    // syncWatchdog() below re-subscribes and re-fetches when this stops saying SUBSCRIBED.
    .subscribe(status=>{ cloud.subStatus = status; if(status==="SUBSCRIBED") cloud.lastEvent = Date.now(); });
}
/* Supabase Realtime replaces the record with an empty object for rows over its
   max_record_bytes limit (~1 MB) — our map/PC rows carry background images & sprites as
   data-URLs and routinely blow past it. When that happens the event still fires but with
   no usable `data` (and sometimes no id), so instead of trusting the truncated payload we
   re-fetch the affected row over a normal SELECT (not size-limited) and re-render. */
function payloadHasData(p){ return !!(p && p.data && typeof p.data==="object" && Object.keys(p.data).length); }

/* ── re-render as soon as the screen is free ────────────────────────────────────
   Every live-update path used to check "is the user typing / dragging?" and, if so, just
   DROP the re-render. The data was merged in but the screen kept showing the old value
   until something else happened to trigger a render — that's the "I had to click it again
   / reload before it showed up". Now the render is QUEUED and replayed the moment the UI
   is idle (blur, drag released), so nothing is silently swallowed. */
let uiRefreshTimer = null;
const uiRefreshWanted = new Set();
function uiBusy(){
  if(typeof mapDragging!=="undefined" && mapDragging) return true;
  const t = document.activeElement?.tagName;
  return t==="INPUT" || t==="TEXTAREA" || t==="SELECT";
}
function flushUiRefresh(){
  if(uiRefreshTimer){ clearInterval(uiRefreshTimer); uiRefreshTimer=null; }
  const kinds = [...uiRefreshWanted]; uiRefreshWanted.clear();
  if(!kinds.length) return;
  if(kinds.includes("all")){ softRender(); return; }
  if(kinds.includes("map") && currentTab==="map") renderMap();
  if(kinds.includes("pc")  && currentTab==="pc")  renderPC();
  if(kinds.includes("enc") && (currentTab==="encounters" || currentTab==="map")) render();
}
function refreshUI(kind){
  uiRefreshWanted.add(kind);
  if(!uiBusy()){ flushUiRefresh(); return; }
  if(!uiRefreshTimer) uiRefreshTimer = setInterval(()=>{ if(!uiBusy()) flushUiRefresh(); }, 400);
}

const sharedRefetchTimers = {};
function scheduleSharedRefetch(kind){
  clearTimeout(sharedRefetchTimers[kind]);
  sharedRefetchTimers[kind] = setTimeout(async ()=>{
    if(kind==="pc")   await fetchPC();
    if(kind==="map")  await fetchMap();
    if(kind==="enc")  await fetchEnc();
    if(kind==="roster") await fetchRoster();
    if(kind==="pc") refreshUI("pc");
    else if(kind==="map") refreshUI("map");
    else if(kind==="enc") refreshUI("enc");
    else refreshUI("all");
  }, 140);
}
function onRealtime(payload){
  cloud.lastEvent = Date.now();          // watchdog: proof the websocket is still alive
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
  // A shared reserved row (PC / map meta / map tokens / encounters) is visible to everyone, so it's
  // handled before the per-player visibility filter. `staleShared` drops our own echo and any
  // out-of-order older rev (the server rev decides, never the clock), and defers while our own write
  // to that row is in flight — that write reconciles against the same change anyway.
  // NOTE: holding an unsaved local edit is NOT a reason to ignore the event any more; adoptRemote
  // merges their change under ours and `_dirty` re-pushes what's still ours. Ignoring it was how a
  // client could go permanently deaf to everyone else after one write that never landed.
  const staleShared = (cur, id) => {
    if(cloud.inflight[id]) return true;                        // our write is in flight → it will reconcile
    const inc = payload.new?.rev;
    if(cur && cur._rev!=null && typeof inc==="number" && inc <= cur._rev) return true;   // our own echo / older rev
    return false;
  };
  // the shared PC is visible to everyone — handle it before the per-player visibility filter
  if(evtOwner===PC_OWNER || evtId===pcId()){
    if(type==="DELETE"){ cloud.pc = null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("pc"); return; }
    else {
      if(staleShared(cloud.pc, pcId())) return;
      cloud.pc = adoptRemote(cloud.pc, payload.new, pcData);
      repushIfDirty(cloud.pc, pcUpsert);
    }
    refreshUI("pc");                    // queued if someone's typing in the PC filter
    return;
  }
  // the shared battle map is visible to everyone — handle it before the per-player filter
  if(evtOwner===MAP_OWNER || evtId===mapMetaId() || evtId===mapTokensId()){
    const isMeta = evtId===mapMetaId();
    if(type==="DELETE"){ if(isMeta) cloud.mapMeta=null; else cloud.mapTokens=null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("map"); return; }
    else {
      const cur = isMeta ? cloud.mapMeta : cloud.mapTokens;
      if(staleShared(cur, isMeta?mapMetaId():mapTokensId())) return;
      // Two people dragging at once: their token's x/y merges in, ours stays ours (merge by id),
      // and the field-level write means the server never even saw a conflict to begin with.
      if(isMeta){ cloud.mapMeta   = adoptRemote(cloud.mapMeta,   payload.new, normMapMeta);   repushIfDirty(cloud.mapMeta,   mapMetaSave); }
      else      { cloud.mapTokens = adoptRemote(cloud.mapTokens, payload.new, normMapTokens); repushIfDirty(cloud.mapTokens, mapTokensSave); }
    }
    refreshUI("map");                   // queued until the drag/typing finishes
    return;
  }
  // shared encounters (GM prep) — visible to everyone so map tokens can resolve their enemy link
  if(evtOwner===ENC_OWNER || evtId===encRowId()){
    if(type==="DELETE"){ cloud.enc=null; }
    else if(!payloadHasData(payload.new)){ scheduleSharedRefetch("enc"); return; }
    else {
      if(staleShared(cloud.enc, encRowId())) return;
      cloud.enc = adoptRemote(cloud.enc, payload.new, normEnc);
      repushIfDirty(cloud.enc, saveEnc);
    }
    refreshUI("enc");
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
  const cur = cloud.byId[row.id], incRev = row.rev;
  if(cur){
    // OUR OWN ECHO or an out-of-order OLDER rev → ignore (the server rev, not the clock, decides).
    if(cur._rev!=null && typeof incRev==="number" && incRev <= cur._rev){ refreshCharSelect(); return; }
    // A write of ours is mid-flight → let it finish; it reconciles against this same change.
    if(cloud.inflight[row.id]){ refreshCharSelect(); return; }
  }
  // Adopt the remote row, MERGING it under any edit we haven't managed to save yet (see adoptRemote)
  // — so the GM changing your level while you're editing your money keeps both, and neither side has
  // to be ignored. The re-render is queued if you're mid-typing so it can't steal the caret, but it
  // is no longer thrown away.
  const merged = adoptRemote(cur, row, d => migrateChar(d, row.id));
  cloud.byId[row.id] = merged;
  if(canEdit(merged)) repushIfDirty(merged, ()=>cloudSaveRow(merged));
  else merged._dirty = false;
  cacheCloud();
  refreshCharSelect();
  refreshUI("all");
}
function softRender(){ updateCloudButton(); render(); }
function cacheCloud(){
  // strip the 3-way-merge baseline (_base) from the cache — it duplicates data and can be large
  // (avatars/sprites), risking the localStorage quota. _rev is kept so recovery can detect an
  // unsynced edit on reconnect.
  try{
    const slim = Object.values(cloud.byId).map(r=>{ const { _base, ...rest } = r; return rest; });
    localStorage.setItem("ptu_cloud_cache_"+cloud.campaign, JSON.stringify(slim));
  }catch(e){}
}
function cloudSave(){
  const row = cloud.byId[cloud.activeId]; if(!row || !canEdit(row)) return;
  row.name = row.data?.name || "";
  cacheCloud();                                // optimistic local cache; the actual write is debounced
  clearTimeout(cloud.saveTimer);
  cloud.saveTimer = setTimeout(()=>{
    cloud.saveTimer = null;                    // clear the "pending" flag so remote edits can apply again
    dispatchRowSave(row);                      // ordered per-row + conflict-safe (CAS + merge)
  }, 500);
}
/* Upsert a row via a keepalive fetch — unlike a normal fetch, the browser lets this complete even
   as the page is being unloaded/backgrounded (exactly when mobile kills the tab). Made conditional
   on our known rev: a last-ditch close-flush that lost the race is dropped rather than clobbering a
   newer edit someone else made while we were away. */
function restUpsertKeepalive(row){
  if(!(CLOUD_CFG.url && CLOUD_CFG.anonKey) || !row) return;
  const base = CLOUD_CFG.url.replace(/\/+$/,"") + "/rest/v1/sheets";
  const headers = { apikey:CLOUD_CFG.anonKey, Authorization:"Bearer "+CLOUD_CFG.anonKey,
    "Content-Type":"application/json", Prefer:"return=minimal" };
  const body = { campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name,
    name:row.name, data:row.data };
  try{
    if(row._rev!=null){
      // conditional update: only if the server is still at the rev our edit is based on
      fetch(base + "?id=eq." + encodeURIComponent(row.id) + "&rev=eq." + row._rev,
        { method:"PATCH", keepalive:true, headers, body: JSON.stringify(body) }).catch(()=>{});
    } else {
      // brand-new row that never synced → insert
      fetch(base, { method:"POST", keepalive:true,
        headers:{ ...headers, Prefer:"resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ id:row.id, ...body }) }).catch(()=>{});
    }
  }catch(e){}
}
/* Flush pending debounced cloud writes NOW (page is hiding/closing). The save debounce otherwise
   loses the last edit when a mobile tab is refreshed or backgrounded mid-window. */
function flushCloudSaves(){
  if(mode!=="cloud") return;
  if(cloud.saveTimer){
    clearTimeout(cloud.saveTimer); cloud.saveTimer=null;
    const row = cloud.byId[cloud.activeId];
    if(row && canEdit(row)){ row.name=row.data?.name||""; cacheCloud(); restUpsertKeepalive(row); }
  }
  if(encSaveTimer && cloud.isGM){ clearTimeout(encSaveTimer); encSaveTimer=null; restUpsertKeepalive(ensureEnc()); }
  if(mapTokensTimer){ clearTimeout(mapTokensTimer); mapTokensTimer=null; restUpsertKeepalive(ensureMapTokens()); }
  if(mapMetaTimer){ clearTimeout(mapMetaTimer); mapMetaTimer=null; restUpsertKeepalive(ensureMapMeta()); }
  for(const id in rowSaveTimers){
    clearTimeout(rowSaveTimers[id]); delete rowSaveTimers[id];
    const r = cloud.byId[id]; if(r) restUpsertKeepalive(r);
  }
}
/* Flush every pending debounced cloud write NOW and AWAIT them. Used on tab-resume BEFORE we refetch,
   so a resync can never re-read the server and revert an edit that was still sitting in a debounce
   timer — the "added a trainer, tabbed out and back in, it vanished, reload brought it back" bug.
   Unlike flushCloudSaves (keepalive, fire-and-forget, for page death), these go through the normal
   awaitable CAS path so cloud.enc/mapTokens/… end up with their new _rev/_base before we fetch. */
async function flushPendingCloudWrites(){
  if(mode!=="cloud" || !cloud.client) return;
  const ps = [];
  if(cloud.saveTimer){ clearTimeout(cloud.saveTimer); cloud.saveTimer=null;
    const row = cloud.byId[cloud.activeId]; if(row && canEdit(row)) ps.push(dispatchRowSave(row)); }
  for(const id of Object.keys(rowSaveTimers)){ clearTimeout(rowSaveTimers[id]); delete rowSaveTimers[id];
    const r = cloud.byId[id]; if(r && canEdit(r)) ps.push(dispatchRowSave(r)); }
  if(encSaveTimer){ clearTimeout(encSaveTimer); encSaveTimer=null; ps.push(encUpsert()); }
  if(mapTokensTimer){ clearTimeout(mapTokensTimer); mapTokensTimer=null; ps.push(serialize(mapTokensChain, mapTokensUpsert)); }
  if(mapMetaTimer){ clearTimeout(mapMetaTimer); mapMetaTimer=null; ps.push(serialize(mapMetaChain, mapMetaUpsert)); }
  try{ await Promise.all(ps); }catch(e){ console.error(e); }
}
function cloudNewCharacter(name){
  const c = newCharacter(name);
  const row = { id:c.id, campaign:cloud.campaign, owner_id:cloud.userId, owner_name:cloud.name,
                name:c.name, data:c, _rev:null };            // _rev null → casUpsert inserts it
  cloud.byId[c.id] = row; cloud.activeId = c.id; openMon=null;
  switchTab("trainer");                        // optimistic: the new sheet opens instantly
  dispatchRowSave(row);                        // insert in the background, ordered/serialized per row
}
function cloudDeleteCharacter(id){
  delete cloud.byId[id];
  cloud.activeId = Object.keys(cloud.byId)[0] || null; openMon=null;
  render();                                    // optimistic: it disappears immediately
  serialize(rowChain(id), async ()=>{          // ordered behind any pending save of this row
    const { error } = await cloud.client.from("sheets").delete().eq("id", id);
    if(error){ console.error(error); toast("⚠ Delete failed"); }
  });
}
/* the GM's own character row */
function myRow(){ return Object.values(cloud.byId).find(r=>ownsRow(r)); }
/* immediate upsert of a specific row (used for one-off GM writes to any sheet), conflict-safe */
function cloudUpsert(row){
  row.name = row.data?.name || "";
  cacheCloud();
  return serialize(rowChain(row.id), ()=> syncUpsert(row).then(ok=>{ cacheCloud(); return ok; }));
}
/* GM: drop a Pokémon into another player's party and push it to the cloud */
function sendPokemonToRow(targetId, mon){
  if(mode!=="cloud" || !cloud.isGM){ toast("GM cloud only"); return false; }
  const row = cloud.byId[targetId]; if(!row){ toast("Player not found"); return false; }
  const m = normPokemon({ ...mon, id: uid() });
  m.currentHP = null;                                   // arrives at full HP
  row.data.pokemon = row.data.pokemon || [];
  if(row.data.pokemon.filter(p=>p.onTeam).length >= 6) m.onTeam = false;  // party full → box
  row.data.pokemon.push(m);
  toast(`Sent ${m.nickname||getSpecies(m.species)?.name||"Pokémon"} to ${row.owner_name||row.data?.name||"player"} ✓`);
  if(targetId===cloud.activeId) render();               // optimistic: lands instantly, uploads behind it
  cloudUpsert(row).then(ok=>{ if(!ok) toast("⚠ Sync issue — it'll reconcile on the next change"); });
  return true;
}
/* GM: move a Pokémon — send a copy to the target and remove it from the source sheet */
function transferPokemon(sourceRow, targetId, mon){
  if(sourceRow && sourceRow.id===targetId){ toast("It's already on that sheet"); return false; }
  const ok = sendPokemonToRow(targetId, JSON.parse(JSON.stringify(mon)));
  if(ok && sourceRow){
    const arr = sourceRow.data.pokemon || [];
    const idx = arr.findIndex(x=>x.id===mon.id);
    if(idx>=0){ arr.splice(idx,1); cloudUpsert(sourceRow); }   // background, serialized per row
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
    list.append(el("div",{class:"refitem",style:"cursor:pointer",onclick:()=>{
      const ok = transferPokemon(sourceRow, r.id, p);
      closeModal();                                   // closes instantly; the upload runs behind it
      if(ok){ openMon=null; render(); }
    }},
      el("div",{class:"r-title"}, r.data?.name||"(unnamed)"),
      el("div",{class:"r-meta"}, `${r.owner_name||"?"}${ownsRow(r)?" (you)":""} · ${(r.data?.pokemon?.length)||0} Pokémon`)));
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
    `${r.data?.name||"(unnamed)"} — ${r.owner_name||"?"}${ownsRow(r)?" (you)":""}`)));
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
        onclick:()=>{ const ok=transferPokemon(mineRow, targetId, p); closeModal(); if(ok) render(); }},
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
      sendPokemonToRow(targetId, mon);
      closeModal();
    }},"Send Pokémon"),
  ]});
}
/* ===================================================================
   Shared PC — deposit/withdraw Pokémon to a campaign-wide storage box
=================================================================== */
/* my own sheets that can deposit — for the GM this includes their NPC trainers */
function pcMyRows(){ return Object.values(cloud.byId).filter(r=>ownsRow(r)); }
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
/* Multi-token selection, for dragging several tokens as one group ("move all the players at
   once"). Per-viewer, not synced to peers, scoped to one map — dragging always resolves the
   selection against the CURRENT map.id, so switching maps can't accidentally drag stale tokens. */
let mapSelect = { on:false, mapId:null, ids:new Set() };
function mapSelectActive(map){ return mapSelect.on && mapSelect.mapId===map.id; }
function toggleMapSelect(map){
  mapSelect = mapSelectActive(map) ? { on:false, mapId:map.id, ids:new Set() }
                                    : { on:true,  mapId:map.id, ids:new Set() };
  renderMap();
}
function clearMapSelect(map){ mapSelect.ids.clear(); renderMap(); }
/* bulk GM actions over every currently-selected token (mapSelect.ids is already restricted to
   editable tokens — see selectMapTokens/the tap-to-select handler in renderTokenNode). Each is one
   toggle button rather than separate on/off buttons: if EVERY selected token is already in the
   target state, it flips them all to the opposite; otherwise (mixed or none) it moves them all to
   the "on" state first — same tri-state-checkbox convention as most bulk-select UIs. */
function selectedTokens(map){ return mapTokensFor(map.id).filter(t=>mapSelect.ids.has(t.id)); }
function bulkToggleHidden(map){
  const sel = selectedTokens(map); if(!sel.length) return;
  const hide = !sel.every(t=>t.gmHidden);
  sel.forEach(t=>t.gmHidden=hide);
  mapTokensSave(); renderMap();
  toast(`${hide?"🙈 Hid":"👁 Unhid"} ${sel.length} token${sel.length===1?"":"s"}`);
}
function bulkToggleInInit(map){
  const sel = selectedTokens(map); if(!sel.length) return;
  const addIn = !sel.every(t=>tokenInInit(t));
  sel.forEach(t=>t.inInit=addIn);
  mapTokensSave(); renderMap();
  toast(`${addIn?"⚔ Added":"Removed"} ${sel.length} token${sel.length===1?"":"s"} ${addIn?"to":"from"} initiative`);
}
/* select every token this viewer is allowed to move, restricted to a kind filter */
function selectMapTokens(map, kinds, label){
  const ids = mapTokensFor(map.id).filter(t=>{ const info=tokenHp(t); return info.editable && kinds.has(info.kind); }).map(t=>t.id);
  mapSelect = { on:true, mapId:map.id, ids:new Set(ids) };
  renderMap();
  toast(ids.length ? `${ids.length} ${label} selected` : `No ${label} on this map`);
}
const PLAYER_TOKEN_KINDS = new Set(["trainer","pokemon"]);
function mapSelectBar(map){
  const n = mapSelect.ids.size;
  const row = el("div",{class:"map-select-bar"});
  row.append(el("span",{class:"map-select-count"}, n ? `☑ ${n} selected` : "Tap tokens below to select them"));
  if(n){
    row.append(el("span",{class:"muted small"},"drag any highlighted token to move the group together"));
    const sel = selectedTokens(map);
    const allHidden = sel.every(t=>t.gmHidden), allIn = sel.every(t=>tokenInInit(t));
    row.append(
      el("button",{class:"btn-secondary",title:"toggle whether the selected tokens are hidden from players",
        onclick:()=>bulkToggleHidden(map)}, allHidden?"👁 Unhide":"🙈 Hide"),
      el("button",{class:"btn-secondary",title:"toggle whether the selected tokens are in the initiative order",
        onclick:()=>bulkToggleInInit(map)}, allIn?"✕ Remove from initiative":"⚔ Add to initiative"));
    row.append(el("button",{class:"btn-secondary",onclick:()=>clearMapSelect(map)},"✕ Clear"));
  }
  row.append(el("button",{class:"btn-secondary",onclick:()=>toggleMapSelect(map)},"Done"));
  return row;
}
let mapImgEdit = false;                       // GM image-edit mode (move/resize scenery)

function activeMapMeta(){ return cloud.mapMeta?.data ? cloud.mapMeta.data : normMapMeta(null); }
function activeMap(){ const meta=activeMapMeta(); return meta.maps.find(m=>m.id===meta.activeMapId) || meta.maps[0] || null; }
/* the map to render: GM sees whatever they're privately viewing; players see only the pushed map */
function currentMapForView(){
  const meta = activeMapMeta();
  if(cloud.isGM) return meta.maps.find(m=>m.id===mapGmView) || meta.maps.find(m=>m.id===meta.playerMapId) || meta.maps.find(m=>!m.archived) || null;
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
/* stable identity for whatever a token points at, so "is this creature already on the map?" is one
   comparison instead of four link-shape special cases. Standalone/custom tokens have no link and so
   no key — they're never deduplicated (you can drop as many generic markers as you like). */
function tokenLinkKey(link){
  if(!link) return "";
  switch(link.kind){
    case "trainer":    return `trainer:${link.sheetId}`;
    case "pokemon":    return `pokemon:${link.sheetId}:${link.monId}`;
    case "enc":        return `enc:${link.encId}:${link.monId}`;
    case "enctrainer": return `enctrainer:${link.encId}:${link.trainerId}`;
    default:           return "";
  }
}
/* keys of everything already placed on a given map — used to hide those entries from "Add a token" */
function placedLinkKeys(mapId){
  return new Set(mapTokensFor(mapId).map(t=>tokenLinkKey(t.link)).filter(Boolean));
}
/* the array a wild/encounter Pokémon actually lives in — the encounter's own wild list, or one of
   its trainers' parties — so token-side actions can remove it exactly the way the Encounters tab does */
function encMonList(enc, mon){
  if(!enc || !mon) return null;
  if((enc.mons||[]).includes(mon)) return enc.mons;
  for(const tr of (enc.trainers||[])) if((tr.pokemon||[]).includes(mon)) return tr.pokemon;
  return null;
}
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
/* wild (encounter-linked) Pokémon tokens on the map this player can currently see — same
   visibility rule renderMap uses for tokens (fog of war, gmHidden), reused so "Throw a Poké Ball"
   from the Trainer Combat tab can only target something the player could actually see & aim at. */
function visibleWildMonTokens(){
  const map = currentMapForView(); if(!map) return [];
  const fog = fogSet(map.id);
  return mapTokensFor(map.id)
    .filter(t=>{
      if(t.link?.kind!=="enc" || t.gmHidden) return false;
      if(cloud.isGM || !map.fogOn) return true;
      return fog.has(Math.round(t.x)+","+Math.round(t.y));
    })
    .map(t=>({ token:t, mon:tokenLinked(t)?.obj }))
    .filter(x=>x.mon);
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
    // cur/max here are the CURRENT BAR only (Core p.478 abstracts a Swarm into one entity with
    // several HP bars) — the ×Multiplier is folded into the name so it's visible everywhere this
    // struct feeds: the token label, the initiative list, the token-menu title.
    const swarmTag = isSwarm(L.obj) ? ` ×${L.obj.swarm.mult}` : "";
    return { cur, max, editable:cloud.isGM, name:encMonName(L.obj)+swarmTag,          // only the GM edits enemies
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
/* Status conditions (Burned, Paralyzed, …) are visible in an actual battle even when a creature's
   exact HP isn't — unlike tokenHpVisible, this doesn't gate on GM/kind, only on the token actually
   pointing to something real. Fixes enemy statuses being invisible to players (HANDOFF-2026-07-25). */
function tokenStatusVisible(info){ return !info.unlinked; }
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
/* ---- initiative: Speed stat + an editable per-token bonus (amulets, effects…) ---- */
function tokenSpeed(token){
  const L = token.link ? tokenLinked(token) : null;
  if(L && L.obj){
    if(L.kind==="trainer"||L.kind==="enctrainer") return trainerDerived(L.obj).totals.spd||0;
    return pokeDerived(L.obj).eff.spd||0;
  }
  return token.spd||0;
}
/* Feb 2016 errata: Paralysis halves Initiative (not a Speed CS — see CONDITION_CS), Flinch is a flat
   −5 Initiative for the rest of the Scene. Both read off the linked trainer/Pokémon's statuses. */
function tokenInitiative(token){
  let v = tokenSpeed(token) + (token.initBonus||0);
  const L = token.link ? tokenLinked(token) : null, obj = L && L.obj;
  if(obj){
    if(hasStatus(obj,"paralysis")) v = Math.floor(v/2);
    if(hasStatus(obj,"flinch")) v -= 5;
    if(hasStatus(obj,"agile")) v += 4;   // Agility Training: +4 Initiative
  }
  return v;
}
function tokenInInit(token){
  const info=tokenHp(token); if(info.unlinked) return false;
  const ally = info.kind==="trainer"||info.kind==="pokemon";
  return ally ? token.inInit!==false : !!token.inInit;   // players auto-join; enemies opt-in via the token menu
}
/* An initiative ENTRY id is normally just the token id, but a Swarm gets several entries in one
   round (Core p.478: it acts again at Initiative −5 each time), so its extra acts are suffixed
   "<tokenId>#<n>". Anything that needs the real token must strip the suffix — meta.initTurnId
   holds an ENTRY id, not a token id. */
const initEntryToken = id => String(id||"").split("#")[0];
function initiativeList(map){
  const rows = [];
  mapTokensFor(map.id).filter(tokenInInit).forEach(t=>{
    const info = tokenHp(t), base = tokenInitiative(t);
    const L = t.link ? tokenLinked(t) : null;
    const mon = (L && !L.missing && L.kind==="enc") ? L.obj : null;
    // Boss Template applies to encounter Trainers too, not just wild Pokémon — enctrainer counts here too.
    const bossOwner = (L && !L.missing && (L.kind==="enc"||L.kind==="enctrainer")) ? L.obj : null;
    // A swarm still standing gets 1 free act + one per Swarm Point it could possibly spend. The
    // COUNT is deliberately derived from maxMult (a per-round constant) rather than the points it
    // has left right now — a list that reshuffled every time the GM spent a point would move
    // meta.initTurnId out from under itself, which is exactly the class of bug that produced the
    // old turn-rollback problems.
    // A living Boss gets one turn per action/HP bar too, but scheduled at bossInitiativeCounts(base,
    // actions) — its OWN alternating ±5 schedule (Running the Game p.487) rather than swarm's flat
    // "−5 per extra act" — and unlike Swarm, the count never shrinks as it loses bars.
    if(bossOwner && isBoss(bossOwner) && !bossDefeated(bossOwner)){
      const counts = bossInitiativeCounts(base, bossOwner.boss.actions);
      counts.forEach((initVal,n)=> rows.push({ id: n===0 ? t.id : `${t.id}#${n}`, token:t, info, init:initVal, act:n, acts:counts.length, swarmMon:null }));
    } else {
      const acts = (mon && isSwarm(mon) && mon.swarm.mult>0) ? swarmActs(mon) : 1;
      for(let n=0; n<acts; n++)
        // swarmMon = the Pokémon object (so its .swarm block is e.swarmMon.swarm, not a confusing e.swarm.swarm)
        rows.push({ id: n===0 ? t.id : `${t.id}#${n}`, token:t, info, init: base - 5*n, act:n, acts, swarmMon: acts>1?mon:null });
    }
  });
  return rows.sort((a,b)=> b.init-a.init || tokenSpeed(b.token)-tokenSpeed(a.token)
                        || (a.info.name||"").localeCompare(b.info.name||"") || a.act-b.act);
}
function advanceInitiative(map, meta, dir){
  const list = initiativeList(map); if(!list.length) return;
  const endingId = initEntryToken(meta.initTurnId), endingSeq = meta.initSeq||0;
  let idx = list.findIndex(e=>e.id===meta.initTurnId);
  idx = idx<0 ? 0 : idx+dir;
  let wrapped=false;
  if(idx>=list.length){ idx=0; wrapped=true; }        // stepped past the last combatant → a new round begins
  else if(idx<0){ idx=list.length-1; }                // stepping back before the first (not a round change)
  meta.initTurnId = list[idx].id;
  if(wrapped){ meta.initRound=(meta.initRound||1)+1; resetMapMovement(map); refreshSwarmRounds(map); }   // round ends → reset movement (like ↺ New round)
  // A forward step ends the previous combatant's turn → expire the buffs THEY cast (on any creature,
  // e.g. a Musician's Songs on allies), at the end of their next turn. Stepping back = correction, no expiry.
  let expired = [];
  if(dir>0){
    meta.initSeq = endingSeq + 1;
    const seen = new Set();
    mapTokensFor(map.id).forEach(tok=>{
      const L = tok.link ? tokenLinked(tok) : null; const owner = L && L.obj;
      if(!owner || seen.has(owner)) return; seen.add(owner);       // one creature may back several tokens
      const gone = expireTurnBuffs(owner, endingId, endingSeq);
      if(gone.length){ expired = expired.concat(gone); commitTokenBuffs(tok); }
    });
  }
  // Optimistic: repaint the board NOW so the turn advances instantly, then sync in the background
  // (awaiting the Supabase round-trips first is what made "Next turn" feel laggy). Realtime echoes
  // are dropped by the mapMeta/mapTokens updated_at guards, so the background writes are safe.
  renderMap();
  mapMetaSave();                                    // coalesced — rapid clicks write once, in order
  if(expired.length) toast(`⌛ Buff expired: ${expired.join(", ")}`);
  if(wrapped){ mapTokensSave(); toast(`↺ Round ${meta.initRound} — movement reset`); }
}
/* GM taps a name in the initiative list to jump straight to their turn — a manual correction like
   stepping backward (dir<0 in advanceInitiative): no buff-expiry side effects, no round change. */
function setInitiativeTurn(map, meta, tokenId){
  if(!cloud.isGM || meta.initTurnId===tokenId) return;
  meta.initTurnId = tokenId;
  renderMap();
  mapMetaSave();
}
/* 🔁 Reset rounds: back to round 1, turn order restarts from the top, movement counters clear —
   without kicking anyone out of initiative (unlike turning Battle mode off/on). */
function resetRounds(map, meta){
  meta.initRound = 1;
  meta.initSeq = 0;
  const list = initiativeList(map);
  meta.initTurnId = list[0]?.id || null;
  resetMapMovement(map);
  refreshSwarmRounds(map);
  renderMap();
  mapMetaSave();
  mapTokensSave();
  toast("🔁 Rounds reset");
}
/* small floating initiative widget: draggable by its header, position + collapsed state remembered
   per-device (it's a display preference, not shared game state) */
function loadInitPos(){ try{ return JSON.parse(localStorage.getItem("ptu_init_pos")||"null"); }catch(e){ return null; } }
function saveInitPos(p){ try{ localStorage.setItem("ptu_init_pos", JSON.stringify(p)); }catch(e){} }
let initCollapsed = localStorage.getItem("ptu_init_collapsed")==="1";
function initMiniBtn(label, title, fn){
  return el("button",{title, onclick:e=>{ e.stopPropagation(); fn(e); },
    style:"background:var(--panel);border:1px solid var(--line);border-radius:5px;color:var(--ink);cursor:pointer;font-size:11px;line-height:1;padding:2px 6px;touch-action:manipulation"}, label);
}
function initiativePanel(map, meta){
  const list = initiativeList(map).filter(e=> cloud.isGM || !e.token.gmHidden);   // players never see hidden tokens
  const box = el("div",{class:"init-float"});
  box.style.cssText = "position:fixed;z-index:60;width:196px;max-height:72vh;display:flex;flex-direction:column;"+
    "background:var(--panel);border:1px solid var(--line);border-radius:10px;box-shadow:0 6px 22px rgba(0,0,0,.35);overflow:hidden";
  const pos = loadInitPos();
  if(pos){ box.style.left=pos.left+"px"; box.style.top=pos.top+"px"; }
  else { box.style.right="14px"; box.style.top="108px"; }
  // header = drag handle + controls
  const header = el("div",{style:"display:flex;align-items:center;gap:5px;padding:5px 7px;cursor:move;"+
    "background:var(--panel-2);border-bottom:1px solid var(--line);user-select:none;touch-action:none"});
  header.append(el("span",{style:"font-weight:800;font-size:12px;white-space:nowrap"}, "⚔ Init"));
  header.append(el("span",{class:"muted",style:"font-size:10px;white-space:nowrap"}, `R${meta.initRound||1}`));
  header.append(el("span",{style:"flex:1"}));
  if(cloud.isGM && list.length){
    header.append(initMiniBtn("▶","next turn",()=>advanceInitiative(map,meta,1)));
    header.append(initMiniBtn("🔁","reset rounds — back to round 1, movement cleared, order kept",()=>resetRounds(map,meta)));
  }
  header.append(initMiniBtn(initCollapsed?"▸":"▾", initCollapsed?"expand":"collapse",
    ()=>{ initCollapsed=!initCollapsed; localStorage.setItem("ptu_init_collapsed", initCollapsed?"1":"0"); renderMap(); }));
  box.append(header);
  attachInitDrag(header, box);
  if(initCollapsed) return box;
  const body = el("div",{style:"overflow-y:auto;padding:3px"});
  if(!list.length){ body.append(el("div",{class:"muted",style:"font-size:11px;padding:6px;line-height:1.35"},
    cloud.isGM ? "Players auto-join. Tap an enemy token → “⚔ In initiative”." : "No initiative yet.")); box.append(body); return box; }
  // This auto-pick is a RENDER-time side effect on shared state (meta.initTurnId), and renderMap()
  // fires often for reasons unrelated to initiative (HP ticks, realtime echoes, drags). If it ever
  // triggers on a transient/incomplete token list, it used to silently overwrite initTurnId locally
  // with NO save — so the next real "next turn" click computed its step from a value the server never
  // saw, producing an apparent skip/jump that got WORSE the faster (the more often re-renders raced)
  // you clicked. Persisting it here keeps every render's decision authoritative and shared.
  if(!meta.initTurnId || !list.find(e=>e.id===meta.initTurnId)){
    meta.initTurnId = list[0].id;
    if(cloud.isGM) mapMetaSave();
  }
  list.forEach((e,i)=>{
    const cur = e.id===meta.initTurnId;
    const enemy = e.info.kind==="enc"||e.info.kind==="enctrainer";
    const name = (!cloud.isGM && e.token.gmHidden) ? "Hidden" : e.info.name;
    const row = el("div",{style:`display:flex;gap:5px;align-items:center;padding:3px 5px;border-radius:5px;font-size:11px;${cur?"background:rgba(224,82,79,.16)":""}${cloud.isGM?";cursor:pointer":""}`,
      title: cloud.isGM ? "tap to make it their turn" : ""});
    if(cloud.isGM) row.addEventListener("click", ev=>{
      if(ev.target.closest("input,span[title='remove from initiative']")) return;
      setInitiativeTurn(map, meta, e.id);
    });
    row.append(el("span",{style:"width:12px;text-align:right;font-weight:800;color:var(--muted)"}, String(i+1)));
    // a Swarm's repeat acts are labelled "· act 2/4" and dimmed once it can't pay for any more
    const broke = e.swarmMon && e.act>0 && e.swarmMon.swarm.sp<=0;
    const label = name + (e.acts>1 ? ` · act ${e.act+1}/${e.acts}` : "");
    row.append(el("span",{style:`flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:${cur?800:600};${enemy?"color:#e0524f":""}${broke?";opacity:.45":""}`,
      title: e.acts>1 ? (e.swarmMon
        ? `${name} — Swarm act ${e.act+1} of ${e.acts}${e.act>0?" (Initiative −"+(5*e.act)+")":" (free Standard Action)"}`
        : `${name} — Boss Template act ${e.act+1} of ${e.acts} (Initiative ${e.init})`) : name},
      (cur?"▶ ":"")+label));
    row.append(el("span",{class:"muted",style:"font-size:10px",title:"Speed + bonus"}, String(e.init)));
    if(cloud.isGM){
      // the bonus/remove controls belong to the TOKEN, so only the swarm's first entry shows them
      if(e.act===0){
        const b=el("input",{type:"number",value:e.token.initBonus||0,title:"initiative bonus (e.g. Julie's amulet)",style:"width:32px;font-size:10px;padding:1px 2px"});
        b.addEventListener("change",async()=>{ e.token.initBonus=parseInt(b.value)||0; mapTokensSave(); renderMap(); });
        row.append(b);
        if(enemy||!e.token.link) row.append(el("span",{style:"cursor:pointer;color:var(--muted);font-size:13px;line-height:1",title:"remove from initiative",
          onclick:async()=>{ e.token.inInit=false; mapTokensSave(); renderMap(); }},"×"));
      } else if(e.swarmMon){
        row.append(el("span",{class:"muted",style:"font-size:10px",title:"Swarm Points left this round"}, `${e.swarmMon.swarm.sp}⚡`));
      }
    }
    body.append(row);
  });
  box.append(body);
  return box;
}
function attachInitDrag(handle, box){
  handle.addEventListener("pointerdown", ev=>{
    if(ev.target.closest("button,input")) return;
    ev.preventDefault(); ev.stopPropagation();
    const r = box.getBoundingClientRect();
    const offX = ev.clientX - r.left, offY = ev.clientY - r.top;
    box.style.left = r.left+"px"; box.style.top = r.top+"px"; box.style.right = "auto";   // switch to left/top
    try{ handle.setPointerCapture(ev.pointerId); }catch(e){}
    const move = e=>{
      const left = Math.max(0, Math.min(window.innerWidth  - r.width, e.clientX-offX));
      const top  = Math.max(0, Math.min(window.innerHeight - 36,      e.clientY-offY));
      box.style.left = left+"px"; box.style.top = top+"px";
    };
    const up = ()=>{
      handle.removeEventListener("pointermove",move); handle.removeEventListener("pointerup",up);
      try{ handle.releasePointerCapture(ev.pointerId); }catch(e){}
      saveInitPos({ left:parseInt(box.style.left)||0, top:parseInt(box.style.top)||0 });
    };
    handle.addEventListener("pointermove",move); handle.addEventListener("pointerup",up);
  });
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
    parts += `<path id="${id}" d="${d}" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-opacity="0.72"/>`;
    parts += `<text font-size="${fontSize}" fill="${color}" font-weight="700" style="paint-order:stroke;stroke:#0a0c10;stroke-width:2px"><textPath href="#${id}" startOffset="4%" text-anchor="start">${xmlEscape(s.name)}</textPath></text>`;
  });
  // fixed square SVG sized to its own content; centering is handled purely by CSS on the
  // .tk-status-ring wrapper (flex centering) rather than manual left/top offsets here, so the
  // ring can never drift off-center regardless of border-box/border-width quirks on the token.
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;overflow:visible;pointer-events:none">${parts}</svg>`;
}
/* Surgically update one token's HP bar + number on the board, WITHOUT a full renderMap. This keeps
   HP edits instant even while the token menu (a modal) is open — the old `if(!$(".modal")) renderMap()`
   guard meant the board never repainted until the menu closed. Returns false if the node isn't mounted. */
function updateTokenHpDom(token){
  const node = document.querySelector(`#view-map .map-token[data-tid="${token.id}"]`);
  if(!node) return false;
  const info = tokenHp(token);
  if(!(info.unlinked || tokenHpVisible(info))) return true;
  const pct = Math.max(0, Math.min(100, Math.round(info.cur/info.max*100)));
  const bar = node.querySelector(".tk-hp");
  if(bar){ bar.style.width = pct+"%"; bar.className = "tk-hp"+(pct<=25?" low":pct<=50?" mid":""); }
  const num = node.querySelector(".tk-hpnum");
  if(num) num.textContent = info.unlinked ? "⚠ unlinked" : `${info.cur}/${info.max}`;
  return true;
}
/* repaint the token now: full renderMap when nothing's overlaid, else a fast surgical bar update
   (so a change made in the token menu shows on the board immediately). */
function paintTokenHP(token, encTab){
  if($(".modal")) updateTokenHpDom(token);
  else if(encTab) render();                       // enc path also refreshes the Encounters tab
  else renderMap();
}
async function setTokenHP(token, val){
  const info = tokenHp(token);
  if(!info.editable){ toast("Read-only"); return; }
  if(!token.link){
    token.hp = Math.max(-99, Math.min(token.maxHp||1, val|0));
    paintTokenHP(token); mapTokensSave(); return;   // optimistic: paint now, write catches up
  }
  const { row, obj, kind } = info; if(!obj){ toast("Can't edit that token"); return; }
  if(kind==="enc" || kind==="enctrainer"){       // live-linked enemy → write to the encounter itself
    // A Swarm's HP is ONE pool spread over Multiplier-many bars: `val` is the new value of the
    // visible (current) bar, so fold it back into the total and let swarmSetTotalHP re-derive the
    // Multiplier. That's what lets one big hit break several bars at once (excess carries over).
    if(kind==="enc" && isSwarm(obj)){
      const barMax = pokeDerived(obj).maxHP;
      swarmSetTotalHP(obj, Math.max(0, (obj.swarm.mult||1)-1)*barMax + (val|0));
      paintTokenHP(token, true); saveEnc(); return;
    }
    const encMax = kind==="enctrainer" ? trainerDerived(obj).hp : pokeDerived(obj).maxHP;
    const oldHP = obj.currentHP||0, newHP = Math.max(-99, Math.min(encMax, val|0));
    applyAutoInjury(obj, oldHP, newHP);            // map-side HP edits get the same auto-injury check
    obj.currentHP = newHP;
    paintTokenHP(token, true);
    saveEnc(); return;                            // debounced cloud write
  }
  if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; }
  const max = kind==="trainer" ? trainerDerived(obj).hp : pokeDerived(obj).maxHP;
  const oldHP = obj.currentHP||0, newHP = Math.max(-99, Math.min(max, val|0));
  applyAutoInjury(obj, oldHP, newHP);
  obj.currentHP = newHP;
  paintTokenHP(token);
  cloudSaveRow(row);                              // debounced write of the real sheet; realtime syncs the owner
}
/* the live list of status-effect keys currently on a token's underlying trainer/Pokémon/enemy/standalone data */
function tokenStatusKeys(token){
  if(!token.link) return Array.isArray(token.statuses) ? token.statuses : [];
  const L = tokenLinked(token);
  return (L && L.obj && Array.isArray(L.obj.statuses)) ? L.obj.statuses : [];
}
/* Surgically rebuild one token's status-ring SVG on the board, WITHOUT a full renderMap — same
   reasoning as updateTokenHpDom (#6/#HP-lag): the old `if(!$(".modal")) renderMap()` guard meant
   clearing a status from the token menu (itself a modal) never showed on the board until some
   unrelated re-render happened. boxPx is read straight off the node's own inline width, which
   mapTokenNode already set to the unscaled size*gridSize px (the stage's zoom is a CSS transform
   on an ancestor, so the node's own style width stays the logical, unscaled value). */
function updateTokenStatusDom(token){
  const node = document.querySelector(`#view-map .map-token[data-tid="${token.id}"]`);
  if(!node) return false;
  const info = tokenHp(token);
  const old = node.querySelector(".tk-status-ring");
  if(!tokenStatusVisible(info)){ if(old) old.remove(); return true; }
  const boxPx = parseFloat(node.style.width) || 48;
  const keys = tokenStatusKeys(token).filter(k=>statusByKey.has(k));
  const ringHtml = tokenStatusRingSVG(keys, boxPx, token.id);
  if(old) old.remove();
  if(ringHtml) node.append(el("div",{class:"tk-status-ring", html:ringHtml}));
  return true;
}
function paintTokenStatus(token, encTab){
  if($(".modal")) updateTokenStatusDom(token);
  else if(encTab) render();
  else renderMap();
}
/* write a new full set of status keys back to whichever place the token's data actually lives */
async function setTokenStatuses(token, keys){
  const info = tokenHp(token);
  if(!info.editable){ toast("Read-only"); return; }
  if(!token.link){
    token.statuses = keys;
    paintTokenStatus(token); mapTokensSave(); return;
  }
  const { row, obj, kind } = info; if(!obj){ toast("Can't edit that token"); return; }
  obj.statuses = keys;
  if(kind==="enc" || kind==="enctrainer"){       // live-linked enemy → write to the encounter itself
    paintTokenStatus(token, true); saveEnc(); return;
  }
  if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; }
  paintTokenStatus(token);
  cloudSaveRow(row);
}
/* Combat Stages for a token's linked creature (Pokémon or Trainer, sheet- or encounter-linked) */
function tokenCS(token){
  const L = token.link ? tokenLinked(token) : null;
  return (L && L.obj && L.obj.cs) ? L.obj.cs : null;
}
async function setTokenCS(token, stat, val){
  const info = tokenHp(token);
  if(!info.editable){ toast("Read-only"); return; }
  const { row, obj, kind } = info; if(!obj){ toast("This token has no combat stats"); return; }
  if(!obj.cs) obj.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
  obj.cs[stat] = Math.max(-6, Math.min(6, val|0));
  // CS has no per-token visual (it only affects derived speed/initiative order + rolls), so unlike
  // HP/statuses there's nothing to surgically patch — always repaint. This is safe even with the
  // token menu open: modal() always tears down and rebuilds #modalRoot independently of #view-map,
  // so a renderMap() here can't disturb it. The old `if(!$(".modal"))` guard just left the board
  // (and initiative order) stale until some unrelated re-render happened to run.
  if(kind==="enc" || kind==="enctrainer"){ render(); saveEnc(); return; }
  if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; }
  renderMap(); cloudSaveRow(row);
}
/* persist a linked creature's buffs after an add/remove from the map token menu (#2) */
async function commitTokenBuffs(token){
  const info = tokenHp(token);
  const { row, obj, kind } = info; if(!obj) return;
  if(kind==="enc" || kind==="enctrainer"){ saveEnc(); return; }
  if(row){ if(!canEditPlayerHP(row)){ toast("Can't edit that sheet"); return; } cloudSaveRow(row); }
  else save();
}
function canRemoveToken(token){
  if(cloud.isGM) return true;
  return !!token.link && canEdit(cloud.byId[token.link.sheetId]);
}
async function removeToken(token, map){
  const arr = cloud.mapTokens?.data?.byMap?.[map.id]; if(!arr) return;
  const i = arr.findIndex(t=>t.id===token.id); if(i>=0) arr.splice(i,1);
  mapTokensSave(); renderMap();
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
/* Pokémon token footprint from species Size category (Core): Small/Medium = 1×1, Large = 2×2,
   Huge = 3×3, Gigantic = 4×4. Trainers, enemy trainers, and custom tokens have no Size category
   and stay 1×1. */
const SIZE_TOKEN_SQUARES = { Small:1, Medium:1, Large:2, Huge:3, Gigantic:4 };
function autoTokenSize(link){
  if(!link) return 1;
  let mon = null;
  if(link.kind==="pokemon") mon = (cloud.byId[link.sheetId]?.data?.pokemon||[]).find(p=>p.id===link.monId);
  else if(link.kind==="enc") mon = encMonById(link.encId, link.monId);
  const sp = mon && getSpecies(mon.species);
  return SIZE_TOKEN_SQUARES[sp?.size] || 1;
}
/* Bulk "↺ Resize to species" (map toolbar, GM-only): size is only computed automatically at the
   moment a token is ADDED (`addToken` below) and otherwise sits static on the token — so a token
   placed before this feature existed, or a Pokémon that's evolved into a different Size category
   since, silently stays at its old footprint forever. This recomputes every token on the current
   map in one pass (a no-op for trainers/custom tokens, which autoTokenSize already returns 1 for). */
function resizeTokensToSpecies(map){
  const toks = mapTokensFor(map.id);
  let changed = 0;
  toks.forEach(t=>{ const want = autoTokenSize(t.link); if(t.size!==want){ t.size=want; changed++; } });
  if(changed){ mapTokensSave(); renderMap(); toast(`Resized ${changed} token${changed===1?"":"s"} to match species size`); }
  else toast("Every token already matches its species size");
}
async function addToken(map, partial){
  ensureMapTokens();
  const byMap = cloud.mapTokens.data.byMap;
  const arr = byMap[map.id] || (byMap[map.id]=[]);
  const size = partial.size!=null ? partial.size : autoTokenSize(partial.link);
  const pos = mapViewCenterCell(map, size);
  const tok = Object.assign({ id:uid() }, partial, { size, x:pos.x, y:pos.y });
  arr.push(tok);
  if(map.fogOn) revealAroundTokens(map);      // a freshly-placed player token reveals its surroundings
  mapTokensSave(); renderMap();
}

/* ---- fog of war: auto-reveal a radius around player-character tokens; revealed stays revealed ---- */
function tokenReveals(token){
  if(typeof token.reveal==="boolean") return token.reveal;   // GM per-token override
  return !!token.link && !ENEMY_LINKS.has(token.link.kind);  // player characters reveal; enemies/custom don't
}
/* reveal a CIRCULAR disc of cells (Euclidean radius) around a cell. No x/y>=0 guard: the board can
   extend up/left of the canonical origin now (see mapStageSize), so a token near that edge needs its
   reveal circle to cover negative cells too, not get silently clipped to its lower-right quadrant. */
function revealDisc(set, cx, cy, r){
  const rr = (r+0.35)*(r+0.35), ri = Math.ceil(r);   // +0.35 rounds the edge out to a fuller circle
  for(let dx=-ri; dx<=ri; dx++) for(let dy=-ri; dy<=ri; dy++)
    if(dx*dx+dy*dy <= rr) set.add((cx+dx)+","+(cy+dy));
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
  mapMetaSave();
  if(map.fogOn) mapTokensSave();      // persist the initial reveal
  renderMap();
}
async function setFogRadius(map, v){
  map.fogRadius = Math.max(1, Math.min(20, parseInt(v)||3));
  if(map.fogOn){ revealAroundTokens(map); mapTokensSave(); }
  mapMetaSave(); renderMap();
}
async function resetFog(map){
  if(!confirm("Re-hide the whole map? Explored areas will be covered again.")) return;
  if(cloud.mapTokens?.data?.fog) cloud.mapTokens.data.fog[map.id] = [];
  if(map.fogOn) revealAroundTokens(map);      // keep current token surroundings visible
  mapTokensSave(); renderMap();
}
/* draw fog onto a canvas sized to the stage; players see opaque cover, the GM sees a dim overlay.
   originX/Y (from mapStageSize) shift the logical (possibly-negative, e.g. up/left of the canonical
   board) fog cell grid into DOM space — without this, fog only ever covered cells 0..cols/0..rows,
   leaving any area a background image had been dragged into above/left of the old origin unfogged. */
function drawFog(cv, map, stageW, stageH, originX=0, originY=0){
  const px = map.gridSize; cv.width = Math.ceil(stageW); cv.height = Math.ceil(stageH);
  const ctx = cv.getContext("2d"); ctx.clearRect(0,0,cv.width,cv.height);
  ctx.fillStyle = cloud.isGM ? "rgba(8,10,14,0.5)" : "#0a0c10";
  const set = fogSet(map.id);
  const minCellX = -Math.round(originX/px), minCellY = -Math.round(originY/px);
  const cols = Math.ceil(stageW/px), rows = Math.ceil(stageH/px);
  for(let x=0;x<cols;x++) for(let y=0;y<rows;y++){
    const cx=minCellX+x, cy=minCellY+y;
    if(!set.has(cx+","+cy)) ctx.fillRect(x*px, y*px, px, px);
  }
}

/* ===================================================================
   Attack ranges / Area-of-Effect overlay (#1)
   Paint a move's affected cells from a token — Line / Cone / Burst / Blast.
   Local to this viewer (not synced); a GM/planning aid over the map grid.
=================================================================== */
let mapAoE = null;   // { tokenId, shape, size, dir } while a range is being shown
const AOE_DIRS = { N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };
/* parse a move's `range` text into a paintable AoE, e.g. "Cone, 2" / "Line 6" / "Burst 1" /
   "Close Blast 2" / "Ranged Blast, 3". Returns {shape,size} or null (single-target / melee / self). */
function parseAoE(range){
  if(!range) return null;
  const r = String(range).toLowerCase();
  const grab = kw => { const m = r.match(new RegExp(kw+"[^0-9]*([0-9]+)")); return m ? +m[1] : null; };
  for(const [kw,shape] of [["cone","cone"],["line","line"],["blast","blast"],["burst","burst"]]){
    if(r.includes(kw)) return { shape, size: grab(kw) || 1 };
  }
  return null;
}
/* PTU's diagonal movement alternates 1m/2m costs per step — so a diagonal Line/Cone of size X
   reaches fewer tiles than X (Line 4 diagonally = 3 tiles: 1+2+1=4). Matches the rulebook's own
   "Line 4, used diagonally" diagram exactly. */
function diagonalTilesForRange(size){
  let cost=0, steps=0, next=1;
  while(cost+next<=size){ cost+=next; steps++; next = next===1?2:1; }
  return steps;
}
/* top-left origin of a size×size block placed touching the user's footprint, facing (ux,uy)/(dx,dy).
   A purely diagonal facing uses exact integer corner arithmetic — the continuous offset-then-round
   version below has a rounding edge case on ODD sizes that lets the block overlap the user's own
   row/column instead of touching only at the corner (caught by cross-checking Close Blast 3 against
   the rulebook's Close Blast diagram, which never overlaps the origin square). Cardinal facings keep
   the original continuous placement — it centers the block on the token's width, which has no clean
   integer answer anyway when size and token width differ in parity, and isn't what was reported broken. */
function blockOrigin(tx, ty, s, ux, uy, dx, dy, size){
  if(dx!==0 && dy!==0) return { x0: dx>0 ? tx+s : tx-size, y0: dy>0 ? ty+s : ty-size };
  const ocx = tx+s/2, ocy = ty+s/2;
  const cx = ocx + ux*(s/2+size/2), cy = ocy + uy*(s/2+size/2);
  return { x0: Math.round(cx-size/2), y0: Math.round(cy-size/2) };
}
/* the set of "x,y" cells a shape covers, measured from `token`'s footprint & facing `dir` */
function aoeCells(map, token, shape, size, dir){
  const set = new Set();
  const s = token.size||1, span = s-1;
  const tx = Math.round(token.x), ty = Math.round(token.y);
  size = Math.max(1, size||1);
  // no x/y>=0 guard: a token facing up/left near the board's (now possibly negative) edge should still
  // get its full AoE shape painted, not one silently clipped to the lower-right quadrant.
  const add = (x,y)=>set.add(x+","+y);
  if(shape==="burst"){                                  // square radius around the user (Chebyshev)
    for(let x=tx-size; x<=tx+span+size; x++) for(let y=ty-size; y<=ty+span+size; y++) add(x,y);
    return set;
  }
  const d = AOE_DIRS[dir] || AOE_DIRS.E, len = Math.hypot(d[0],d[1]);
  const ux = d[0]/len, uy = d[1]/len;                   // unit facing
  const diag = Math.abs(d[0])===1 && Math.abs(d[1])===1;   // facing NE/SE/SW/NW
  // first cell just outside the token's footprint in the facing direction (shared by line/cone)
  let px = tx + (d[0]>0 ? s : d[0]<0 ? -1 : Math.floor(span/2));
  let py = ty + (d[1]>0 ? s : d[1]<0 ? -1 : Math.floor(span/2));
  if(shape==="line"){
    // Core, Move Keywords "Line X": "When used diagonally, apply the same rules as for diagonal
    // movement" — PTU's diagonal movement alternates 1m/2m per step, so a diagonal Line reaches
    // FEWER tiles than X (Line 4 diagonally only reaches 3 tiles: 1+2+1=4, verified against the
    // rulebook's own diagram). Straight (cardinal) lines are unaffected: 1 tile = 1 meter.
    const steps = diag ? diagonalTilesForRange(size) : size;
    for(let k=0;k<steps;k++){ add(px,py); px += d[0]; py += d[1]; }
    return set;
  }
  if(shape==="cone"){
    if(diag){
      // Core's own diagram for "Cone X used diagonally" draws a solid X-by-X block touching the
      // user only at the corner — the same placement as Close Blast X — not a rotated triangle
      // (a 3-wide corridor doesn't tile along a 45° diagonal on a square grid).
      const {x0,y0} = blockOrigin(tx, ty, s, ux, uy, d[0], d[1], size);
      for(let x=x0; x<x0+size; x++) for(let y=y0; y<y0+size; y++) add(x,y);
      return set;
    }
    // Core, Move Keywords "Cone X": "hits all legal targets in the square immediately in front of
    // the user and in 3m wide rows extending from that square up to X meters away" — a FIXED
    // 3-wide corridor beyond the single lead square, not a continuously widening triangle
    // (verified against the rulebook's own Cone diagram, which stays exactly 3 wide at range 2+).
    const horiz = d[1]===0;
    for(let r=1; r<=size; r++){
      const fx = horiz ? px + d[0]*(r-1) : px;
      const fy = horiz ? py : py + d[1]*(r-1);
      if(r===1) add(fx,fy);
      else if(horiz){ add(fx,fy-1); add(fx,fy); add(fx,fy+1); }
      else { add(fx-1,fy); add(fx,fy); add(fx+1,fy); }
    }
    return set;
  }
  if(shape==="blast"){                                  // size×size square placed adjacent in `dir`
    const {x0,y0} = blockOrigin(tx, ty, s, ux, uy, d[0], d[1], size);
    for(let x=x0; x<x0+size; x++) for(let y=y0; y<y0+size; y++) add(x,y);
    return set;
  }
  return set;
}
function drawAoE(cv, map, stageW, stageH, originX=0, originY=0){
  const px = map.gridSize; cv.width = Math.ceil(stageW); cv.height = Math.ceil(stageH);
  const ctx = cv.getContext("2d"); ctx.clearRect(0,0,cv.width,cv.height);
  if(!mapAoE) return;
  const token = mapTokensFor(map.id).find(t=>t.id===mapAoE.tokenId); if(!token) return;
  const cells = aoeCells(map, token, mapAoE.shape, mapAoE.size, mapAoE.dir);
  ctx.fillStyle = "rgba(245,166,35,0.32)"; ctx.strokeStyle = "rgba(245,166,35,0.9)";
  ctx.lineWidth = Math.max(1, px*0.05);
  cells.forEach(k=>{ const [x,y]=k.split(",").map(Number);
    ctx.fillRect(x*px+originX, y*px+originY, px, px); ctx.strokeRect(x*px+originX+0.5, y*px+originY+0.5, px-1, px-1); });
}
function startAoE(token, shape, size){ mapAoE = { tokenId:token.id, shape, size:size||1, dir:"E" }; renderMap(); }
function clearAoE(){ mapAoE = null; renderMap(); }
/* Apply a buff (Cheer/Order/Song/custom) to every linked token whose cell falls inside the
   currently-painted AoE (older handoff #1: "combine the buff engine with the map AoE shapes"). */
function tokensInAoE(map){
  if(!mapAoE) return [];
  const origin = mapTokensFor(map.id).find(t=>t.id===mapAoE.tokenId); if(!origin) return [];
  const cells = aoeCells(map, origin, mapAoE.shape, mapAoE.size, mapAoE.dir);
  return mapTokensFor(map.id).filter(t=>cells.has(Math.round(t.x)+","+Math.round(t.y)));
}
async function applyAreaBuff(map, buffKey){
  // A buff should only land on the caster's OWN side — a player's Cheer/Song shouldn't also buff
  // an enemy caught in the blast, and an enemy buff shouldn't land on the party. Side = whether the
  // token's link kind is in ENEMY_LINKS (same check tokenReveals uses); a standalone/unlinked
  // origin (no link at all) is treated as the player side, same as tokenReveals' own convention.
  const origin = mapTokensFor(map.id).find(t=>t.id===mapAoE?.tokenId);
  const originIsEnemy = !!origin?.link && ENEMY_LINKS.has(origin.link.kind);
  const targets = tokensInAoE(map).filter(t=> (!!t.link && ENEMY_LINKS.has(t.link.kind)) === originIsEnemy);
  let n = 0;
  for(const t of targets){
    const L = t.link ? tokenLinked(t) : null; if(!L || L.missing || !L.obj) continue;
    addBuff(L.obj, buffKey);
    await commitTokenBuffs(t);
    n++;
  }
  toast(n ? `Applied to ${n} ${originIsEnemy?"enemy":"ally"} token${n===1?"":"s"} in the area`
          : `No linked ${originIsEnemy?"enemy":"ally"} tokens in the area`);
}
/* redraw only the overlay canvas (keeps input focus while tweaking size/direction) */
function refreshAoE(){
  const map = currentMapForView(); if(!map) return;
  const cv = document.querySelector("#view-map .map-aoe"); if(!cv) return;
  const { w, h, originX, originY } = mapStageSize(map); drawAoE(cv, map, w, h, originX, originY);
}
/* floating on-map controls to adjust the shown range (shape / size / facing / clear) */
function aoeControlPanel(map){
  const token = mapTokensFor(map.id).find(t=>t.id===mapAoE.tokenId);
  const p = el("div",{class:"aoe-panel"});
  p.append(el("div",{class:"aoe-title"}, "🎯 Range" + (token ? ` — ${tokenHp(token).name}` : "")));
  const shapeSel = el("select");
  [["burst","Burst"],["cone","Cone"],["line","Line"],["blast","Blast"]].forEach(([v,l])=>
    shapeSel.append(el("option",{value:v,selected:v===mapAoE.shape},l)));
  shapeSel.addEventListener("change",()=>{ mapAoE.shape=shapeSel.value; renderMap(); });   // toggles the d-pad
  const sizeIn = el("input",{type:"number",min:1,max:20,value:mapAoE.size,style:"width:52px"});
  sizeIn.addEventListener("input",()=>{ mapAoE.size=Math.max(1,parseInt(sizeIn.value)||1); refreshAoE(); });
  p.append(el("div",{class:"aoe-row"}, shapeSel, sizeIn, el("span",{class:"small muted"},"cells")));
  if(mapAoE.shape!=="burst"){
    const pad = el("div",{class:"aoe-dpad"});
    [["NW","↖"],["N","↑"],["NE","↗"],["W","←"],["·",""],["E","→"],["SW","↙"],["S","↓"],["SE","↘"]].forEach(([dir,glyph])=>{
      if(dir==="·"){ pad.append(el("div",{})); return; }
      const b = el("button",{class:"aoe-dir"+(mapAoE.dir===dir?" on":""),
        onclick:()=>{ mapAoE.dir=dir; pad.querySelectorAll(".aoe-dir").forEach(x=>x.classList.remove("on")); b.classList.add("on"); refreshAoE(); }}, glyph);
      pad.append(b);
    });
    p.append(pad);
  }
  const buffSel = el("select",{style:"flex:1;min-width:0"});
  PTU_BUFFS.forEach(b=>buffSel.append(el("option",{value:b.key},`${b.name} · ${b.cat}`)));
  p.append(el("div",{class:"aoe-row",style:"margin-top:6px"}, buffSel,
    el("button",{class:"btn-secondary",title:"Push this buff onto every linked token inside the shaded area",
      onclick:()=>applyAreaBuff(map, buffSel.value)},"✨ Buff area")));
  p.append(el("button",{class:"btn-secondary",style:"margin-top:6px;width:100%",onclick:clearAoE},"✕ Clear range"));
  return p;
}

/* ---- battle mode: track how far each token has moved this round (diagonals cost 2) ---- */
function battleOn(){ return !!activeMapMeta().battleOn; }
/* the movement types a token actually has, as [key,label,metres] (land/sky/swim/burrow/levitate) */
function tokenMoveModes(token){
  if(!token.link) return [];
  const L = tokenLinked(token); if(!L || !L.obj) return [];
  if(L.kind==="trainer" || L.kind==="enctrainer"){
    const d = trainerDerived(L.obj);
    return [["overland","Land",d.overland],["swim","Swim",d.swim]].filter(m=>m[2]);
  }
  const c = getSpecies(L.obj.species)?.capabilities || {};
  return [["overland","Land",c.overland],["sky","Sky",c.sky],["swim","Swim",c.swim],["burrow","Burrow",c.burrow],
    ["levitate","Levitate",c.levitate]].filter(m=>m[2]);
}
function tokenMoveMode(token){
  const modes = tokenMoveModes(token); if(!modes.length) return null;
  return modes.find(m=>m[0]===token.moveMode) || modes[0];   // chosen mode, else first available (usually Land)
}
/* a linked token's movement (metres) for the CHOSEN mode; null for standalone/unknown */
function tokenMoveSpeed(token){
  const m = tokenMoveMode(token); return m ? (m[2]||null) : null;
}
/* Manhattan tile cost between two cells (no diagonal movement → a diagonal step costs 2) */
function tileCost(ax, ay, bx, by){ return Math.abs(Math.round(ax)-Math.round(bx)) + Math.abs(Math.round(ay)-Math.round(by)); }
function resetMapMovement(map){
  ensureMapTokens();
  mapTokensFor(map.id).forEach(t=>{ t.moved=0; delete t.path; });
}
/* Turn-duration buffs ("this turn" / "until end of next turn" — Songs, most short Orders) only
   expire via advanceInitiative while a fight is running (Core p.234-ish "duration" — expireTurnBuffs
   above). If Battle mode is turned off before their expiry turn comes around (fight ends abruptly,
   GM forgets to run it out), they'd otherwise linger until the next End Scene. Sweep every token on
   the map and drop any still-stamped buffs once the fight that was tracking them is over. */
async function expireBattleBuffs(map){
  for(const t of mapTokensFor(map.id)){
    const L = t.link ? tokenLinked(t) : null; if(!L || L.missing || !L.obj) continue;
    const owner = L.obj; if(!Array.isArray(owner.buffs) || !owner.buffs.length) continue;
    const before = owner.buffs.length;
    owner.buffs = owner.buffs.filter(b=>b.turnStamp==null);
    if(owner.buffs.length !== before) await commitTokenBuffs(t);
  }
}
async function toggleBattle(map){
  const meta = activeMapMeta(); meta.battleOn = !meta.battleOn;
  if(meta.battleOn){
    resetMapMovement(map);                            // start combat with fresh movement counters
    // Fresh fight: round/turn order restart, and enemies (wild Pokémon/NPC trainers/standalone
    // tokens) drop back out of initiative — they opt in per-encounter via the token menu, so a
    // previous fight's monsters shouldn't linger into a new one. Allies auto-rejoin as usual.
    meta.initRound = 1; meta.initSeq = 0; meta.initTurnId = null;
    mapTokensFor(map.id).forEach(t=>{ const k=tokenHp(t).kind; if(k!=="trainer" && k!=="pokemon") t.inInit = false; });
  } else {
    await expireBattleBuffs(map);
  }
  mapMetaSave();
  if(meta.battleOn) mapTokensSave();
  renderMap();
  toast(meta.battleOn ? "⚔ Battle mode on — tracking movement" : "Battle mode off");
}
async function newRound(map){
  resetMapMovement(map); refreshSwarmRounds(map); mapTokensSave(); renderMap();
  toast("↺ New round — movement reset");
}
/* Swarm Points refresh once per ROUND (Core p.478 "each turn" = each time the swarm comes up in
   the order), so every round boundary — ▶ wrapping, ↺ New round, 🔁 Reset rounds — refills them
   and re-arms the free first Standard Action. */
function refreshSwarmRounds(map){
  let touched = false;
  mapTokensFor(map.id).forEach(t=>{
    const L = t.link ? tokenLinked(t) : null;
    const mon = (L && !L.missing && L.kind==="enc") ? L.obj : null;
    if(mon && isSwarm(mon)){ swarmNewRound(mon); touched = true; }
  });
  if(touched) saveEnc();
}
async function resetTokenMovement(token, map){
  token.moved = 0; delete token.path;
  mapTokensSave(); renderMap();
}

/* ---- push-to-players: choose which map everyone sees ---- */
async function pushMapToPlayers(map){
  const meta = activeMapMeta();
  meta.playerMapId = map.id;
  mapMetaSave(); renderMap();
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
          const w = probe.naturalWidth||map.gridSize*10, h = probe.naturalHeight||map.gridSize*10;
          const src = await storeImg(out, "map");   // upload to Storage; keeps the row tiny (URL, not 6 MB of base64)
          map.images.push({ id:uid(), src, x:0, y:0, w, h });
          mapMetaSave(); renderMap(); toast("Image added ✓");
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
  mapMetaSave(); renderMap();
}
async function deleteMapImage(map, img){
  const i = map.images.indexOf(img); if(i<0) return;
  map.images.splice(i,1); mapMetaSave(); renderMap();
}

/* one token element */
function mapTokenNode(token, map, originX=0, originY=0){
  const info = tokenHp(token);
  const px = map.gridSize, size = token.size||1, boxPx = size*px;
  const factionColor = tokenFactionColor(info);
  const selected = mapSelectActive(map) && mapSelect.ids.has(token.id);
  const isTurn = battleOn() && initEntryToken(activeMapMeta().initTurnId) === token.id;
  // A trainer (the "player" figure) always stacks above Pokémon tokens — even their own party.
  const isTrainerTok = info.kind==="trainer" || info.kind==="enctrainer";
  const playerSide = info.kind==="trainer" || info.kind==="pokemon";
  const node = el("div",{class:"map-token"+(info.unlinked?" unlinked":"")+(info.editable?" editable":"")+(token.gmHidden?" gm-hidden":"")+(selected?" selected":"")+(isTurn?" current-turn":"")+(playerSide?" player-side":""),
    style:`left:${token.x*px+originX}px;top:${token.y*px+originY}px;width:${boxPx}px;height:${boxPx}px;z-index:${isTrainerTok?2:1}`
      +(token.gmHidden?";opacity:0.55;outline:2px dashed #f5a623;outline-offset:2px":"")
      +(factionColor?`;border-color:${factionColor}`:"")});
  node.dataset.tid = token.id;
  info.sprite.classList.add("tk-img");
  node.append(info.sprite);
  if(selected) node.append(el("div",{class:"tk-selected"},"✓"));
  const hpVisible = info.unlinked || tokenHpVisible(info);   // "unlinked" warning always shows; real HP is gated
  if(hpVisible){
    const pct = Math.max(0, Math.min(100, Math.round(info.cur/info.max*100)));
    node.append(el("div",{class:"tk-hpwrap"},
      el("div",{class:"tk-hp"+(pct<=25?" low":pct<=50?" mid":""), style:`width:${pct}%`})));
  }
  node.append(el("div",{class:"tk-name"}, (token.gmHidden?"🙈 ":"") + info.name + (info.unlinked?" ⚠":"")));
  // Player-side tokens rely on the HP bar alone (no numeric readout); enemies/standalone still show it.
  if(hpVisible && !playerSide) node.append(el("div",{class:"tk-hpnum"}, info.unlinked?"⚠ unlinked":`${info.cur}/${info.max}`));
  if(tokenStatusVisible(info)){
    const keys = tokenStatusKeys(token).filter(k=>statusByKey.has(k));
    const ringHtml = tokenStatusRingSVG(keys, boxPx, token.id);
    if(ringHtml) node.append(el("div",{class:"tk-status-ring", html:ringHtml}));
  }
  if(battleOn() && token.moved){                              // movement used this round vs chosen-mode speed
    const spd = tokenMoveSpeed(token), mode = tokenMoveMode(token);
    const icon = mode ? ({overland:"",sky:" 🕊",swim:" 🌊",burrow:" ⛏",levitate:" ✨"}[mode[0]]||"") : "";
    node.append(el("div",{class:"tk-moved"+(spd && token.moved>spd?" over":"")}, `${token.moved}${spd?("/"+spd):""}m${icon}`));
  }
  return node;
}
/* drag-to-move (grid-snap + meter readout) or tap-to-open-menu.
   In select mode, dragging a token that's part of the current selection moves the WHOLE selected
   group together (each token keeps its own relative offset and its own per-token battle-movement
   tally); dragging a token that's NOT selected still just moves that one token, same as always.
   Tapping (no drag) toggles that token's membership in the selection instead of opening its menu. */
function attachTokenDrag(node, token, map, originX=0, originY=0){
  node.addEventListener("pointerdown", ev=>{
    if(ev.button!=null && ev.button>0) return;
    ev.stopPropagation();                                   // don't pan the board
    const info = tokenHp(token);
    const selecting = mapSelectActive(map);
    const grouped = selecting && mapSelect.ids.has(token.id) && mapSelect.ids.size>1;
    const px = map.gridSize, scale = mapView.scale;
    const startX = ev.clientX, startY = ev.clientY;
    let moved = false, badge = null;
    const trackMove = battleOn() && map.gridOn;               // accumulate every tile entered, diagonals cost 2
    const liveFog = !!map.fogOn;
    const stageSize = mapStageSize(map);                      // origin needed regardless of fog, for DOM<->cell math
    const fogCanvas = liveFog ? document.querySelector("#view-map .map-fog") : null;
    // one drag-context per token being moved (just `token` unless dragging a multi-selected group)
    const group = grouped ? mapTokensFor(map.id).filter(t=>mapSelect.ids.has(t.id) && tokenHp(t).editable) : [token];
    const ctx = group.map(t=>({
      t, n: t===token ? node : document.querySelector(`#view-map .map-token[data-tid="${t.id}"]`),
      baseX0:t.x*px+originX, baseY0:t.y*px+originY, pathX:t.x, pathY:t.y, segMoved:0,
      alreadyMoved:t.moved||0, moveSpeed:trackMove?tokenMoveSpeed(t):null,
      lastRevealX:null, lastRevealY:null,
    })).filter(c=>c.n);
    const anchor = ctx.find(c=>c.t===token) || ctx[0];
    try{ node.setPointerCapture(ev.pointerId); }catch(e){}
    const applyDelta = (dxPx, dyPx, commit)=>{
      let anyRevealed = false;
      ctx.forEach(c=>{
        // no lower bound: a token can follow a background image up/left of the canonical origin
        // (same reasoning as attachImageDrag) — logical cell coords (c.t.x/y) can go negative.
        let nx = c.baseX0+dxPx, ny = c.baseY0+dyPx;
        if(map.gridOn){ nx = Math.round(nx/px)*px; ny = Math.round(ny/px)*px; }   // snap to cells live
        c.n.style.left = nx+"px"; c.n.style.top = ny+"px";
        const cx = Math.round((nx-originX)/px), cy = Math.round((ny-originY)/px);
        if(map.gridOn && (cx!==c.pathX || cy!==c.pathY)){ c.segMoved += tileCost(c.pathX,c.pathY,cx,cy); c.pathX=cx; c.pathY=cy; }
        if(commit){
          if(map.gridOn){ c.t.x=c.pathX; c.t.y=c.pathY; } else { c.t.x=(nx-originX)/px; c.t.y=(ny-originY)/px; }
          if(trackMove) c.t.moved = c.alreadyMoved + c.segMoved;
        }
        if(liveFog && tokenReveals(c.t) && (cx!==c.lastRevealX || cy!==c.lastRevealY)){
          c.lastRevealX=cx; c.lastRevealY=cy; revealAtCell(map, cx, cy, (c.t.size||1)-1); anyRevealed=true;
        }
      });
      if(anyRevealed && fogCanvas) drawFog(fogCanvas, map, stageSize.w, stageSize.h, stageSize.originX, stageSize.originY);
    };
    const move = e=>{
      if(Math.abs(e.clientX-startX)>4 || Math.abs(e.clientY-startY)>4) moved = true;
      if(!moved || !info.editable) return;
      mapDragging = true;
      applyDelta((e.clientX-startX)/scale, (e.clientY-startY)/scale, false);
      if(map.gridOn){
        if(!badge){ badge = el("div",{class:"tk-move"}); node.append(badge); }
        const n = ctx.length>1 ? `${ctx.length} tokens · ` : "";
        if(trackMove){
          const total = anchor.alreadyMoved+anchor.segMoved;
          badge.textContent = `${n}${anchor.segMoved}m · round ${total}${anchor.moveSpeed?("/"+anchor.moveSpeed):""}m`;
          badge.classList.toggle("over", !!anchor.moveSpeed && total>anchor.moveSpeed);
        } else badge.textContent = `${n}${anchor.segMoved}m`;
      }
    };
    const up = async e=>{
      try{ node.releasePointerCapture(ev.pointerId); }catch(err){}
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      if(badge) badge.remove();
      if(!moved){
        mapDragging=false;
        if(selecting && info.editable){ mapSelect.ids.has(token.id)?mapSelect.ids.delete(token.id):mapSelect.ids.add(token.id); renderMap(); }
        else openTokenMenu(token, map);
        return;
      }
      if(!info.editable){ mapDragging=false; return; }
      applyDelta((e.clientX-startX)/scale, (e.clientY-startY)/scale, true);
      if(map.fogOn) revealAroundTokens(map);                                        // moving reveals new ground
      mapDragging = false;
      mapTokensSave(); renderMap();
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
  });
}
/* image-edit mode: drag to move, corner handle to resize (both grid-snap when the grid is on) */
function attachImageDrag(node, img, map, overlay, originX=0, originY=0){
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
      // no lower bound on x/y: images can sit up/left of the stage's nominal origin (pan the
      // camera to reach them) — every fresh image starts at exactly (0,0), so clamping to 0 here
      // meant the very first drag upward or leftward was silently a no-op. img.x/y stay the
      // LOGICAL (origin-less) position that's saved; originX/Y only shift the DOM style below.
      else { img.x=snap(x0+dx); img.y=snap(y0+dy); }
      node.style.left=(img.x+originX)+"px"; node.style.top=(img.y+originY)+"px"; node.style.width=img.w+"px"; node.style.height=img.h+"px";
      if(overlay){ overlay.style.left=(img.x+originX)+"px"; overlay.style.top=(img.y+originY)+"px"; overlay.style.width=img.w+"px"; overlay.style.height=img.h+"px"; }
    };
    const up = async ()=>{
      try{ node.releasePointerCapture(ev.pointerId); }catch(e){}
      node.removeEventListener("pointermove",move); node.removeEventListener("pointerup",up);
      mapDragging=false; if(moved){ mapMetaSave(); renderMap(); }
    };
    node.addEventListener("pointermove",move); node.addEventListener("pointerup",up);
  };
  // .map-img-handle (resize) and .map-img-ctrls (layer/delete buttons) must not start a drag —
  // without this, pressing any of those buttons captured the pointer for the image drag first,
  // which unreliably swallowed the click (the trash button "didn't seem to work").
  node.addEventListener("pointerdown", ev=>{ if(ev.target.closest(".map-img-handle,.map-img-ctrls")) return; startDrag(ev,"move"); });
}
/* ---- shared "apply an attack to a map token" damage math (Core damage steps) ----
   Runs the full sequence a single-target hit goes through: subtract the target's Defense/Sp.Def,
   apply type effectiveness (including the defender's Static defensive abilities — Thick Fat,
   Levitate, Wonder Guard, Filter, …) and any Swarm/manual effectiveness nudge, then Damage
   Reduction (active DR buffs + flat DR vs Super-Effective). Used by BOTH the token menu's manual
   "Apply an attack" box and the roll-result "Apply to target" picker, so the two never diverge. */
function tokenDamageBreakdown(token, { dmg, type, physical, extraStep=0, aoe=false }){
  const def = tokenDefenseStat(token, !!physical);
  const swarmTgt = (()=>{ const LL = token.link ? tokenLinked(token) : null;
    return (LL && !LL.missing && LL.kind==="enc" && isSwarm(LL.obj)) ? LL.obj : null; })();
  const swarmStep = swarmTgt ? swarmDamageStep(aoe) : 0;
  const stepAdj = swarmStep + extraStep;                    // Swarm + the GM's manual effectiveness nudge
  const typeless = !type || type==="Typeless";
  const owner = token.link ? (tokenLinked(token)||{}).obj : null;
  const defMods = owner ? defenseTypeMods(owner) : null;
  let mult;
  if(typeless) mult = 1;
  else if(defMods && defMods.immune.has(type)) mult = 0;
  else {
    mult = typeMultAgainst(type, tokenDefTypes(token), stepAdj + (defMods?.step?.[type] || 0));
    if(defMods?.wonderGuard && mult > 0 && mult <= 1) mult = 0;
    if(defMods?.seReduce && mult > 1) mult = seReducedMult(mult);   // Filter / Solid Rock
  }
  const afterDef  = Math.max(0, dmg - def);
  const afterMult = Math.floor(afterDef * mult);
  const { dr, from } = owner ? buffDR(owner) : { dr:0, from:[] };
  const seDR  = (defMods?.seFlatDR && mult > 1) ? defMods.seFlatDR : 0;
  const final = Math.max(0, afterMult - dr - seDR);
  return { def, physical:!!physical, typeless, mult, afterDef, afterMult, dr, from, seDR, final,
           owner, defMods, swarmTgt, swarmStep, extraStep };
}
/* Apply a computed breakdown to the token: subtract its HP and spend any one-shot DR buff that
   absorbed the hit (Excited, Intercept…). Returns the HP value BEFORE the hit. */
async function applyTokenDamage(token, br){
  const before = tokenHp(token).cur;
  await setTokenHP(token, before - br.final);
  if(br.dr > 0 && br.owner && consumeDamageBuffs(br.owner)) await commitTokenBuffs(token);
  return before;
}
/* one-line "N − Def = …, Type eff = …, − DR → final. HP a → b" breakdown, shared by both callers */
function damageResultHTML(dmg, typeName, br, before){
  const eff = br.typeless ? "typeless (no effectiveness)" : br.mult===0 ? "immune ×0"
    : br.mult>1 ? `super-effective ×${br.mult}` : br.mult<1 ? `resisted ×${br.mult}` : "neutral ×1";
  let drTxt = "";
  if(br.dr  > 0) drTxt  = ` − ${br.dr} DR (${br.from.join(", ")})`;
  if(br.seDR > 0) drTxt += ` − ${br.seDR} DR (vs Super-Effective)`;
  const swarmTxt = (br.swarmTgt && !br.typeless) ? ` (${br.swarmStep>0?"area, +1 step":"single-target, −1 step"} vs Swarm)` : "";
  const stepTxt  = (br.extraStep && !br.typeless) ? ` (manual ${br.extraStep>0?"+":""}${br.extraStep} step)` : "";
  const abilTxt  = (br.defMods && br.defMods.why.length && !br.typeless) ? `<br><span style="color:var(--accent)">⚙ ${br.defMods.why.join(" · ")}</span>` : "";
  return `${dmg} − ${br.def} ${br.physical?"Def":"SpDef"} = ${br.afterDef}, ${typeName} ${eff}${swarmTxt}${stepTxt} = ${br.afterMult}${drTxt} → <b>${br.final}</b> damage.<br>HP ${before} → <b>${before - br.final}</b>.${abilTxt}`;
}
/* GM tool surfaced on a rolled attack's result: pick a token on the battle map and drop the rolled
   damage on it, running the same full damage math as the token menu (type, phys/spec, abilities, DR).
   Returns a DOM node, or null when it doesn't apply (not the GM, not in cloud, no editable tokens on
   the current map). `dmg` = the rolled total, `type` = the move's effective Type, `physical` picks
   Def vs Sp.Def. */
function attackTargetWidget({ dmg, type, physical }){
  if(mode!=="cloud" || !cloud.isGM) return null;
  const map = currentMapForView() || activeMap(); if(!map) return null;
  const tokens = mapTokensFor(map.id).filter(t=>{ const i=tokenHp(t); return i.editable && !i.unlinked; });
  if(!tokens.length) return null;
  const typeName = type || "Typeless";
  const wrap = el("div",{style:"margin-top:12px;border-top:1px dashed var(--line);padding-top:10px"});
  wrap.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800;margin-bottom:6px"},
    "🎯 APPLY THIS HIT TO TARGET(S)"));
  wrap.append(el("div",{class:"small muted",style:"margin-bottom:6px"},
    `Applies the rolled ${dmg} as a ${typeName} ${physical?"Physical":"Special"} hit to each checked target — subtracts their ${physical?"Defense":"Sp.Def"}, type effectiveness, defensive abilities & DR automatically.`));

  // one persistent checkbox per token; split into Players / Enemies tabs (players first). The
  // checkboxes survive tab switches, so an area attack can hit tokens across both factions.
  const label = t=>{ const i=tokenHp(t); return `${i.name} — ${i.cur}/${i.max} HP`; };
  const items = tokens.map(t=>{
    const kind = tokenHp(t).kind;
    const faction = (kind==="trainer"||kind==="pokemon") ? "players" : "enemies";
    const cb = el("input",{type:"checkbox"});
    const txt = el("span",{class:"small"}, label(t));
    const row = el("label",{class:"inline",style:"display:flex;gap:8px;align-items:center;padding:2px 0;cursor:pointer"}, cb, txt);
    return { t, cb, txt, row, faction };
  });
  let tab = items.some(i=>i.faction==="players") ? "players" : "enemies";
  const tabsBar = el("div",{class:"subtabs",style:"margin-bottom:6px"});
  const bP = el("button",{class:"subtab",onclick:()=>{ tab="players"; draw(); }});
  const bE = el("button",{class:"subtab",onclick:()=>{ tab="enemies"; draw(); }});
  tabsBar.append(bP, bE);
  const list = el("div",{style:"max-height:160px;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:6px 8px;margin-bottom:6px"});
  const allCb = el("input",{type:"checkbox"});
  allCb.addEventListener("change",()=>{ items.filter(i=>i.faction===tab).forEach(i=>{ i.cb.checked = allCb.checked; }); });
  const allWrap = el("label",{class:"inline",style:"display:flex;gap:8px;align-items:center;margin-bottom:8px;cursor:pointer"},
    allCb, el("span",{class:"small muted"},"select all in this tab"));
  function draw(){
    const nP = items.filter(i=>i.faction==="players").length, nE = items.length - nP;
    bP.textContent = `🧑 Players (${nP})`; bE.textContent = `👹 Enemies (${nE})`;
    bP.classList.toggle("on", tab==="players"); bE.classList.toggle("on", tab==="enemies");
    items.forEach(i=>{ i.txt.textContent = label(i.t); });     // keep HP labels fresh
    list.innerHTML = "";
    const rows = items.filter(i=>i.faction===tab);
    if(!rows.length) list.append(el("div",{class:"small muted"},
      tab==="players" ? "No player tokens on this map." : "No enemy tokens on this map."));
    rows.forEach(i=>list.append(i.row));
    allCb.checked = rows.length>0 && rows.every(i=>i.cb.checked);
  }
  wrap.append(tabsBar, list, allWrap);

  // effectiveness nudge (applies to every selected target) + area flag (matters only vs a Swarm)
  let manualStep = 0;
  const stepLbl = el("span",{class:"small",style:"min-width:140px;text-align:center;font-weight:700"});
  const drawStep = ()=>{ stepLbl.textContent = manualStep===0 ? "no adjustment"
    : manualStep>0 ? `+${manualStep} step — more effective` : `${manualStep} step — more resisted`; };
  drawStep();
  const aoeCb = el("input",{type:"checkbox"});
  wrap.append(el("div",{class:"tk-menu-row",style:"gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:4px"},
    el("span",{class:"small muted"},"Effectiveness:"),
    el("button",{class:"btn-secondary",style:"padding:2px 12px",title:"one step more resisted",
      onclick:()=>{ manualStep=Math.max(-4,manualStep-1); drawStep(); }},"−"),
    stepLbl,
    el("button",{class:"btn-secondary",style:"padding:2px 12px",title:"one step more effective",
      onclick:()=>{ manualStep=Math.min(4,manualStep+1); drawStep(); }},"+")));
  wrap.append(el("label",{class:"inline",style:"display:flex;gap:8px;align-items:center;margin-bottom:6px;cursor:pointer"},
    aoeCb, el("span",{class:"small muted"},"Area / multi-target attack (a Swarm takes area hits one step more effective)")));

  const out = el("div",{class:"small",style:"margin-top:8px"});
  const apply = async ()=>{
    const chosen = items.filter(i=>i.cb.checked);
    if(!chosen.length){ out.textContent = "Tick at least one target (in either tab)."; return; }
    out.innerHTML = "";
    for(const it of chosen){
      const br = tokenDamageBreakdown(it.t, { dmg, type:typeName, physical, extraStep:manualStep, aoe:aoeCb.checked });
      const before = await applyTokenDamage(it.t, br);
      it.cb.checked = false;                                    // clear so a second Apply doesn't double-hit
      const line = el("div",{style:"margin:4px 0;padding-bottom:4px;border-bottom:1px dotted var(--line)"});
      line.append(el("div",{style:"font-weight:700"}, tokenHp(it.t).name),
        el("div",{html: damageResultHTML(dmg, typeName, br, before)}));
      out.append(line);
    }
    draw();                                                     // refresh HP labels + select-all state
  };
  wrap.append(el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px;align-items:center"},
    el("button",{class:"btn-primary",onclick:apply},"💥 Apply to selected")), out);
  draw();
  return wrap;
}
/* re-render the token menu after an in-place mutation (buffs, CS, movement mode…) without losing
   the modal's scroll position — openTokenMenu's modal() call tears down & rebuilds .modal-body
   from scratch, which reset scroll to the top on every small change ("sends me to the start of
   the page"). Capture/restore scrollTop across the rebuild instead. */
function reopenTokenMenu(token, map){
  const prevBody = document.querySelector("#modalRoot .modal-body");
  const st = prevBody ? prevBody.scrollTop : 0;
  openTokenMenu(token, map);
  const newBody = document.querySelector("#modalRoot .modal-body");
  if(newBody) newBody.scrollTop = st;
}
function openTokenMenu(token, map){
  const info = tokenHp(token);
  const wrap = el("div",{});
  if(info.unlinked){
    wrap.append(el("div",{class:"r-body"},"⚠ The sheet or Pokémon this token pointed to no longer exists."));
  } else if(!tokenHpVisible(info)){
    wrap.append(el("div",{class:"r-body"},"🔒 You can't see this token's HP."));
    // Status conditions ARE visible on an enemy even when its exact HP isn't (Core play: you can
    // see a foe is Burned/Paralyzed) — a read-only chip list of only the currently-active statuses.
    const active = STATUS_DEFS.filter(s=>tokenStatusKeys(token).includes(s.key));
    const sw = el("div",{style:"margin-top:10px"},
      el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"Status effects"));
    if(active.length){
      const chips = el("div",{class:"chips"});
      active.forEach(s=>chips.append(el("span",{class:"statuschip on",title:s.effect}, s.name)));
      sw.append(chips);
    } else sw.append(el("div",{class:"small muted"},"None active."));
    wrap.append(sw);
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
    const tick = hpTick(info.max);   // 1 Tick = 1/10 max HP
    wrap.append(readout,
      el("div",{class:"tk-menu-row"}, mk(-5,"−5"), mk(-1,"−1"), mk(+1,"+1"), mk(+5,"+5")),
      el("div",{class:"tk-menu-row"},
        el("button",{class:"btn-secondary",disabled:!info.editable,title:`lose a Tick of HP (${tick} = 1/10 max)`,
          onclick:async()=>{ await setTokenHP(token, tokenHp(token).cur-tick); draw(); }},"−Tick"),
        el("button",{class:"btn-secondary",disabled:!info.editable,title:`regain a Tick of HP (${tick} = 1/10 max)`,
          onclick:async()=>{ await setTokenHP(token, tokenHp(token).cur+tick); draw(); }},"+Tick"),
        setInp, setBtn));
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
      const typeSel = el("select");
      typeSel.append(el("option",{value:"Typeless"},"⚡ Typeless"));
      TYPES.forEach(ty=>typeSel.append(el("option",{value:ty},ty)));
      const clsSel = el("select"); clsSel.append(el("option",{value:"phys"},"Physical"), el("option",{value:"spec"},"Special"));
      const out = el("div",{class:"small",style:"margin-top:6px"});
      // Swarm defence (Core p.478): single-target damage is resisted one step further, area /
      // multi-target attacks are one step MORE effective — so the GM has to say which this was.
      const swarmTgt = (()=>{ const LL = token.link ? tokenLinked(token) : null;
        return (LL && !LL.missing && LL.kind==="enc" && isSwarm(LL.obj)) ? LL.obj : null; })();
      const aoeBox = el("input",{type:"checkbox"});
      if(swarmTgt){
        atk.append(el("div",{class:"small muted",style:"margin-bottom:4px"},
          `🐝 Swarm ×${swarmTgt.swarm.mult} — Accuracy rolls against it get +${swarmTgt.swarm.mult}.`));
        atk.append(el("label",{class:"inline",style:"gap:6px;display:flex;align-items:center;margin-bottom:6px"},
          aoeBox, el("span",{class:"small"},"Area / multi-target attack (one step more effective)")));
      }
      // Manual effectiveness nudge — for abilities/effects too specific to auto-detect (Bulletproof
      // "resist ranged one step further", Tinted Lens, a move that resolves "one step further", …).
      // Shifts this attack ± steps on the PTU effectiveness ladder when the GM applies it.
      let manualStep = 0;
      const stepLbl = el("span",{class:"small",style:"min-width:150px;text-align:center;font-weight:700"});
      const drawStep = ()=>{ stepLbl.textContent = manualStep===0 ? "no adjustment"
        : manualStep>0 ? `+${manualStep} step — more effective` : `${manualStep} step — more resisted`; };
      drawStep();
      atk.append(el("div",{class:"tk-menu-row",style:"gap:6px;align-items:center;margin-bottom:2px"},
        el("span",{class:"small muted"},"Effectiveness:"),
        el("button",{class:"btn-secondary",style:"padding:2px 12px",title:"one step more resisted",
          onclick:()=>{ manualStep=Math.max(-4,manualStep-1); drawStep(); }},"−"),
        stepLbl,
        el("button",{class:"btn-secondary",style:"padding:2px 12px",title:"one step more effective",
          onclick:()=>{ manualStep=Math.min(4,manualStep+1); drawStep(); }},"+")));
      atk.append(el("div",{class:"small muted",style:"margin-bottom:6px"},
        "Use for abilities the sheet can't auto-apply — e.g. Bulletproof (−1 vs ranged), Tinted Lens, or “resisted one step further” move text."));
      const apply = async ()=>{
        const dmg = parseInt(dmgIn.value);
        if(isNaN(dmg)){ out.textContent = "Enter a damage number."; return; }
        // full Core damage steps (Def → type effectiveness incl. abilities → DR) — shared with the
        // roll-result "Apply to target" picker so the two paths stay identical.
        const br = tokenDamageBreakdown(token, { dmg, type:typeSel.value, physical:clsSel.value==="phys",
          extraStep:manualStep, aoe:aoeBox.checked });
        const before = await applyTokenDamage(token, br); draw();
        out.innerHTML = damageResultHTML(dmg, typeSel.value, br, before);
      };
      atk.append(el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px;align-items:center"},
        dmgIn, typeSel, clsSel, el("button",{class:"btn-primary",onclick:apply},"Apply")), out);
      wrap.append(atk);
    }

    // ---- Combat Stages: raise/lower this creature's CS right from the map (#19) ----
    const L = token.link ? tokenLinked(token) : null;
    if(L && L.obj && (L.kind==="pokemon"||L.kind==="enc"||L.kind==="trainer"||L.kind==="enctrainer")){
      const isT = L.kind==="trainer"||L.kind==="enctrainer";
      if(!L.obj.cs) L.obj.cs = {atk:0,def:0,spatk:0,spdef:0,spd:0,acc:0,eva:0};
      const der = isT ? trainerDerived(L.obj) : pokeDerived(L.obj);
      const csw = el("div",{style:"margin-top:16px"});
      csw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"Combat Stages"));
      const g = el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:8px"});
      CS_STATS.forEach(([k,lbl])=>{
        const effCS = der.cs[k], val = isT ? der.totals[k] : der.eff[k];
        const c = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:60px"});
        c.append(el("div",{class:"small muted",style:"font-weight:700"},lbl));
        c.append(el("div",{style:`font-weight:800;${effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}`}, String(val)));
        if(info.editable) c.append(csStepper(L.obj.cs[k]||0, async v=>{ await setTokenCS(token,k,v); reopenTokenMenu(token,map); }));
        else c.append(el("div",{class:"small muted"}, `${effCS>0?"+":""}${effCS}`));
        g.append(c);
      });
      ACC_EVA_STATS.forEach(([k,lbl])=>{
        const effCS = der.cs[k];
        if(info.editable) g.append(accEvaCell(lbl, L.obj.cs[k]||0, effCS, async v=>{ await setTokenCS(token,k,v); reopenTokenMenu(token,map); }));
        else {
          const c = el("div",{style:"display:flex;flex-direction:column;align-items:center;gap:2px;min-width:60px"});
          c.append(el("div",{class:"small muted",style:"font-weight:700"},lbl),
            el("div",{style:`font-weight:800;${effCS>0?"color:var(--good)":effCS<0?"color:var(--bad)":""}`}, `${effCS>0?"+":""}${effCS}`));
          g.append(c);
        }
      });
      csw.append(g);
      wrap.append(csw);
    }

    // ---- Actions: roll this creature's moves/attacks straight from its token (#2) ----
    if(L && L.obj){
      const aw = el("div",{style:"margin-top:16px"});
      aw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"⚔ Actions — tap to roll"));
      const row = el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px"});
      const btn = (label,fn)=>row.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",onclick:fn}, "🎲 "+label));
      if(L.kind==="trainer"||L.kind==="enctrainer"){
        const t=L.obj;
        btn("Struggle", ()=>openTrainerAttack(t));
        (t.weapons||[]).forEach(w=> btn(w.name||w.category, ()=>openTrainerAttack(t,null,w)));
        (t.encMoves||[]).concat(t.moves||[]).forEach(mn=>{ if(moveByName.get((mn||"").toLowerCase())) btn(mn, ()=>openTrainerAttack(t,mn)); });
      } else {
        const p=L.obj, sp=getSpecies(p.species);
        const st=struggleFor(p,sp); if(st) btn(st.name, ()=>openMoveRoll(p,st,sp));
        (p.moves||[]).forEach(mn=>{ const m=moveByName.get((mn||"").toLowerCase()); if(m) btn(mn, ()=>openMoveRoll(p,m,sp)); });
      }
      aw.append(row);
      wrap.append(aw);
    }

    // ---- Abilities: show what this Pokémon's abilities do, right from its token ----
    if(L && L.obj && (L.kind==="pokemon"||L.kind==="enc")){
      const p = L.obj;
      const sp = getSpecies(p.species);
      const grant = poltergeistGrant(p, sp);
      if((p.abilities||[]).length || grant){
        const abw = el("div",{style:"margin-top:16px"});
        abw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"Abilities"));
        p.abilities.forEach(an=>{
          const ab = abilityByName.get((an||"").toLowerCase());
          const row = el("details",{class:"spoiler"});
          row.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, an),
            ab&&ab.frequency?el("span",{class:"muted small",style:"margin-left:8px"}, ab.frequency):""));
          row.append(el("div",{class:"small",style:"margin-top:6px",html: ab?abilityText(ab):"<span class='muted'>Not in database.</span>"}));
          abw.append(row);
        });
        if(grant){
          const gab = abilityByName.get(grant.ability.toLowerCase());
          const grow = el("details",{class:"spoiler"});
          grow.append(el("summary",{}, el("span",{style:"font-weight:700;color:var(--ink)"}, grant.ability),
            el("span",{class:"muted small",style:"margin-left:8px"},"from Poltergeist")));
          grow.append(el("div",{class:"small",style:"margin-top:6px",html: gab?abilityText(gab):"<span class='muted'>Not in database.</span>"}));
          abw.append(grow);
        }
        wrap.append(abw);
      }
    }

    // ---- Legendary Auras: list an encounter creature's Domains right from its token ----
    if(L && L.obj && L.kind==="enc"){
      const p = L.obj;
      if((p.auras||[]).length){
        const auw = el("div",{style:"margin-top:16px"});
        auw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"✨ Legendary Auras"));
        const note = auraNoteFor(p.species);
        if(note) auw.append(el("div",{class:"small muted",style:"margin-bottom:4px",html:"ℹ "+note}));
        p.auras.forEach(an=>auw.append(auraRow(an, null, info.editable?p:null,
          info.editable?(()=>{ saveEnc(); reopenTokenMenu(token,map); }):null)));
        wrap.append(auw);
      }
    }

    // ---- Buffs & Orders: add/remove Cheers/Orders/Songs on the linked creature (#2) ----
    if(L && L.obj && info.editable){
      if(!Array.isArray(L.obj.buffs)) L.obj.buffs = [];
      wrap.append(buffsCard(L.obj, async()=>{ await commitTokenBuffs(token); reopenTokenMenu(token, map); }));
    } else if(L && L.obj && ownerBuffs(L.obj).length){
      const bl = el("div",{style:"margin-top:16px"});
      bl.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"✨ Active buffs"));
      ownerBuffs(L.obj).forEach(b=>bl.append(el("div",{class:"small"}, `• ${b.name}` + (buffModText(b.mods)?` — ${buffModText(b.mods)}`:""))));
      wrap.append(bl);
    }

    // ---- Attack ranges: paint a move's AoE (line/cone/burst/blast) on the map (#1) ----
    if(L && L.obj){
      const mv = [];
      if(L.kind==="trainer"||L.kind==="enctrainer")
        (L.obj.encMoves||[]).concat(L.obj.moves||[]).forEach(mn=>{ const m=moveByName.get((mn||"").toLowerCase()); if(m) mv.push(m); });
      else
        (L.obj.moves||[]).forEach(mn=>{ const m=moveByName.get((mn||"").toLowerCase()); if(m) mv.push(m); });
      const aoeMoves = mv.filter(m=>parseAoE(m.range));
      const rw = el("div",{style:"margin-top:16px"});
      rw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"🎯 Attack ranges — paint on map"));
      const rrow = el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px"});
      aoeMoves.forEach(m=>{ const a=parseAoE(m.range);
        rrow.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",title:m.range,
          onclick:()=>{ startAoE(token, a.shape, a.size); closeModal(); }}, `${m.name} · ${a.shape} ${a.size}`)); });
      rrow.append(el("button",{class:"btn-secondary",style:"padding:5px 10px",
        title:"draw a shape freely, not tied to any move — pick its type, size & facing from the panel that appears on the map",
        onclick:()=>{ startAoE(token, "burst", 1); closeModal(); }}, "✎ Manual shape…"));
      rw.append(rrow);
      rw.append(el("div",{class:"small muted",style:"margin-top:6px"},
        "Opens a panel on the map — turn it with the ↖↑↗ arrows (Burst has no facing), resize with the number box, or ✕ Clear range to remove it."));
      if(!aoeMoves.length) rw.append(el("div",{class:"small muted"},"None of this creature's moves are area moves — use ✎ Manual shape to draw one."));
      wrap.append(rw);
    }

    // ---- GM tools for a wild (encounter-linked) Pokémon: capture DC, "caught" → shared PC, and
    // the per-kill EXP payout — the same three the Encounters tab card offers, reachable straight
    // from the board. Deliberately NOT shown on player-linked Pokémon: Catch DC is meaningless on
    // a trainer's own mon, and "To PC" there would be a different (and destructive) action.
    if(cloud.isGM && L && L.obj && L.kind==="enc"){
      const enc = encList().find(e=>e.id===token.link.encId) || null;
      const srcList = encMonList(enc, L.obj);
      const gw = el("div",{style:"margin-top:16px"});
      gw.append(el("div",{class:"small muted",style:"font-weight:700;margin-bottom:4px"},"👹 GM — wild Pokémon"));
      gw.append(el("div",{class:"tk-menu-row",style:"flex-wrap:wrap;gap:6px"},
        el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"capture DC",
          onclick:()=>catchRateModal(L.obj)},"🎯 Catch DC"),
        el("button",{class:"btn-secondary",style:"padding:5px 10px",title:"EXP for defeating just this Pokémon",
          onclick:()=>openMonExpCalc(L.obj)},"🧮 EXP"),
        el("button",{class:"btn-secondary",style:"padding:5px 10px",disabled:!srcList,
          title: srcList ? "caught — send to the shared PC and take it off the map"
                         : "this Pokémon is no longer part of its encounter",
          onclick:async()=>{ closeModal(); await sendEncMonToPC(enc, L.obj, srcList); renderMap(); }},"🎣 To PC")));
      wrap.append(gw);
    }

    // Throwing a Poké Ball is now a Trainer ⚔ Combat action (openThrowPokeball), not a button on
    // the wild Pokémon's own token — see renderTrainerCombat's "Capture" card.

    // ---- Movement type toggle, available on any token click (not just battle mode) (#7) ----
    if(info.editable && !battleOn()){
      const modes = tokenMoveModes(token);
      if(modes.length>1){
        const cur = (tokenMoveMode(token)||modes[0])[0];
        const chips = el("div",{class:"tk-menu-row",style:"margin-top:6px;flex-wrap:wrap;gap:6px"});
        modes.forEach(([k,lbl,m])=>{
          chips.append(el("button",{class:"btn-secondary"+(k===cur?" on":""),style:"padding:4px 9px",
            title:`use ${lbl} speed (${m} m)`,
            onclick:async()=>{ token.moveMode=k; mapTokensSave(); renderMap(); reopenTokenMenu(token,map); }},
            `${({overland:"🚶",sky:"🕊",swim:"🌊",burrow:"⛏",levitate:"✨"}[k]||"")} ${lbl} ${m}`));
        });
        wrap.append(el("div",{class:"small muted",style:"margin-top:12px;font-weight:700"},"Movement type"), chips);
      }
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
    // movement type toggle (Land / Sky / Swim / Burrow) — changes which speed the round tracks against
    const modes = tokenMoveModes(token);
    if(info.editable && modes.length>1){
      const cur = (tokenMoveMode(token)||modes[0])[0];
      const chips = el("div",{class:"tk-menu-row",style:"margin-top:6px;flex-wrap:wrap;gap:6px"});
      modes.forEach(([k,lbl,m])=>{
        const on = k===cur;
        chips.append(el("button",{class:"btn-secondary"+(on?" on":""),style:"padding:4px 9px",
          title:`move using ${lbl} speed (${m} m)`,
          onclick:async()=>{ token.moveMode=k; mapTokensSave(); renderMap(); reopenTokenMenu(token,map); }},
          `${({overland:"🚶",sky:"🕊",swim:"🌊",burrow:"⛏",levitate:"✨"}[k]||"")} ${lbl} ${m}`));
      });
      wrap.append(el("div",{class:"small muted",style:"margin-top:8px;font-weight:700"},"Movement type"), chips);
    }
  }
  const foot = [];
  if(canRemoveToken(token)){
    if(cloud.isGM){
      const szSel = el("select");
      [1,2,3,4].forEach(s=>szSel.append(el("option",{value:s,selected:s===(token.size||1)}, `${s}×${s}`)));
      szSel.addEventListener("change", async()=>{ token.size=parseInt(szSel.value)||1; if(map.fogOn) revealAroundTokens(map); mapTokensSave(); renderMap(); });
      const szRow = el("div",{class:"inline",style:"gap:6px;align-items:flex-end"},
        el("label",{class:"field",style:"max-width:150px"}, el("span",{},"Token size"), szSel));
      if(token.link && (token.link.kind==="pokemon" || token.link.kind==="enc"))
        szRow.append(el("button",{class:"btn-secondary",style:"padding:8px 10px",title:"recalculate from the Pokémon's Size category (e.g. after it evolves)",
          onclick:async()=>{ token.size=autoTokenSize(token.link); szSel.value=token.size; if(map.fogOn) revealAroundTokens(map); mapTokensSave(); renderMap(); reopenTokenMenu(token,map); }},"↺ Auto"));
      wrap.append(el("div",{style:"margin-top:12px"},szRow));
      const rv = el("input",{type:"checkbox"}); rv.checked = tokenReveals(token);
      rv.addEventListener("change", async()=>{ token.reveal = rv.checked; if(map.fogOn) revealAroundTokens(map); mapTokensSave(); renderMap(); });
      wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
        rv, el("span",{class:"small"},"👁 This token reveals fog of war")));
      const hd = el("input",{type:"checkbox"}); hd.checked = !!token.gmHidden;
      hd.addEventListener("change", async()=>{ token.gmHidden = hd.checked; mapTokensSave(); renderMap(); toast(token.gmHidden?"🙈 Hidden from players":"👁 Visible to players"); });
      wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
        hd, el("span",{class:"small"},"🙈 Hide this token from players")));
      if(battleOn()){
        const info2=tokenHp(token), ally=info2.kind==="trainer"||info2.kind==="pokemon";
        const ii=el("input",{type:"checkbox"}); ii.checked = ally ? token.inInit!==false : !!token.inInit;
        ii.addEventListener("change", async()=>{ token.inInit=ii.checked; mapTokensSave(); renderMap(); });
        wrap.append(el("label",{class:"inline",style:"margin-top:10px;gap:6px;display:flex;align-items:center"},
          ii, el("span",{class:"small"},"⚔ In initiative order")));
        const ib=el("input",{type:"number",value:token.initBonus||0,style:"width:64px"});
        ib.addEventListener("change", async()=>{ token.initBonus=parseInt(ib.value)||0; mapTokensSave(); renderMap(); });
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
  const sheetRows = (cloud.isGM || isMapHpViewer()) ? Object.values(cloud.byId)
                               : Object.values(cloud.byId).filter(r=>ownsRow(r));
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
/* Enemies grouped by encounter (mirrors playerTokenGroups) so the Add-token list is separated
   per encounter instead of one flat list. */
function enemyTokenGroups(){
  return encList().filter(enc=>!enc.archived).map(enc=>{
    const rows = [];
    (enc.mons||[]).forEach(p=> rows.push({ label:encMonName(p), sub:`Lv ${p.level}`,
      make:()=>({ link:{ kind:"enc", encId:enc.id, monId:p.id } }) }));
    (enc.trainers||[]).forEach(tr=>{
      rows.push({ label:(tr.trainer?.name||"Trainer"), sub:`Trainer · Lv ${tr.trainer?.level||1}`,
        make:()=>({ link:{ kind:"enctrainer", encId:enc.id, trainerId:tr.id } }) });
      (tr.pokemon||[]).forEach(p=> rows.push({ label:encMonName(p), sub:`Lv ${p.level} · ${tr.trainer?.name||"trainer"}'s`,
        make:()=>({ link:{ kind:"enc", encId:enc.id, monId:p.id } }) }));
    });
    return { id:enc.id, name:enc.name||"Encounter", rows };
  }).filter(g=>g.rows.length);
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
  const expanded_ = new Set();                       // trainer/encounter group ids explicitly opened (all start closed)
  const add = make => async ()=>{ closeModal(); await addToken(map, make()); };

  const draw = ()=>{
    const q = search.value.trim().toLowerCase(); list.innerHTML="";
    // anything already standing on this map is dropped from the list — re-adding it would just
    // stack a duplicate token on the same creature, which is never what you want.
    const placed = placedLinkKeys(map.id);
    const isPlaced = mk => placed.has(tokenLinkKey(mk().link));
    if(tab==="players"){
      const match = s => !q || (s||"").toLowerCase().includes(q);
      let shown = 0, hidden = 0;
      playerTokenGroups().forEach(g=>{
        const trainerPlaced = isPlaced(g.trainerMake);
        const avail = g.mons.filter(m=>!isPlaced(m.make));
        hidden += (g.mons.length - avail.length) + (trainerPlaced?1:0);
        if(trainerPlaced && !avail.length) return;         // whole sheet is already on the board
        const trainerHit = match(g.trainerName) || match(g.owner);
        const mons = avail.filter(m=>trainerHit || match(m.label) || match(m.sub));
        if(!trainerHit && !mons.length) return;
        shown++;
        const expanded = q ? true : expanded_.has(g.id);
        const head = el("div",{class:"pickitem pick-group",style:"cursor:pointer",
          onclick:()=>{ expanded_.has(g.id) ? expanded_.delete(g.id) : expanded_.add(g.id); draw(); }},
          el("span",{class:"pick-caret"}, expanded?"▾":"▸"),
          el("div",{style:"flex:1;min-width:0"},
            el("div",{class:"pi-title"}, g.trainerName + ((cloud.isGM||isMapHpViewer()) && g.owner ? `  ·  ${g.owner}` : "")),
            el("div",{class:"pi-sub muted"}, `${avail.length} of ${g.mons.length} in party not on the map`)),
          trainerPlaced
            ? el("span",{class:"small muted",style:"padding:4px 10px;white-space:nowrap"},"on map")
            : el("button",{class:"btn-secondary",style:"padding:4px 10px",title:"add the trainer as a token",
                onclick:e=>{ e.stopPropagation(); add(g.trainerMake)(); }},"＋ Trainer"));
        list.append(head);
        if(expanded){
          if(!mons.length) list.append(el("div",{class:"pickitem pick-mon muted"},
            g.mons.length ? "Every party Pokémon is already on the map." : "No party Pokémon."));
          mons.forEach(m=>list.append(el("div",{class:"pickitem pick-mon",style:"cursor:pointer",onclick:add(m.make)},
            el("div",{style:"flex:1;min-width:0"}, el("div",{class:"pi-title"},m.label), el("div",{class:"pi-sub muted"},m.sub)))));
        }
      });
      if(!shown) list.append(el("div",{class:"pickitem muted"},
        q ? "No matches." : hidden ? "Everyone is already on the map." : "No character sheets yet."));
      return;
    }
    // enemies — grouped by encounter (collapsible), + custom-token entry
    list.append(el("div",{class:"pickitem",style:"font-weight:700",onclick:()=>{ closeModal(); openCustomToken(map); }},
      el("div",{class:"pi-title"},"✎ Custom token…"), el("div",{class:"pi-sub muted"},"Name it, set HP, optional image")));
    const match = s => !q || (s||"").toLowerCase().includes(q);
    let shownE = 0, hiddenE = 0;
    enemyTokenGroups().forEach(g=>{
      const avail = g.rows.filter(r=>!isPlaced(r.make));      // already-placed enemies drop out too
      hiddenE += g.rows.length - avail.length;
      if(!avail.length) return;                                // whole encounter is on the board
      const encHit = match(g.name);
      const rows = avail.filter(r=>encHit || match(r.label) || match(r.sub));
      if(!encHit && !rows.length) return;
      shownE++;
      const expanded = q ? true : expanded_.has("enc:"+g.id);
      const head = el("div",{class:"pickitem pick-group",style:"cursor:pointer",
        onclick:()=>{ const key="enc:"+g.id; expanded_.has(key)?expanded_.delete(key):expanded_.add(key); draw(); }},
        el("span",{class:"pick-caret"}, expanded?"▾":"▸"),
        el("div",{style:"flex:1;min-width:0"},
          el("div",{class:"pi-title"}, "👹 "+g.name),
          el("div",{class:"pi-sub muted"}, `${avail.length} of ${g.rows.length} token${g.rows.length===1?"":"s"} not on the map`)),
        el("button",{class:"btn-secondary",style:"padding:4px 10px",title:"add every token in this encounter that isn't already on the map",
          onclick:async e=>{ e.stopPropagation(); closeModal(); for(const r of avail) await addToken(map, r.make()); }},"＋ All"));
      list.append(head);
      if(expanded) rows.forEach(r=>list.append(el("div",{class:"pickitem pick-mon",onclick:add(r.make)},
        el("div",{style:"flex:1;min-width:0"}, el("div",{class:"pi-title"},r.label), el("div",{class:"pi-sub muted"},r.sub||"")))));
    });
    if(!shownE) list.append(el("div",{class:"pickitem muted"},
      q ? "No matches." : hiddenE ? "Every enemy is already on the map." : "No encounters yet — build one in the 👹 Encounters tab."));
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
  const imgBtn = el("button",{class:"btn-secondary",onclick:()=>pickImage(240, async d=>{ img=await storeImg(d,"rival"); imgBtn.textContent="✓ image set"; })},"📷 Image (optional)");
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
  const m = { id:uid(), name:name||"Map", images:[], gridSize:32, gridOn:true, fogOn:false, fogRadius:3, archived:false };
  cloud.mapMeta.data.maps.push(m); cloud.mapMeta.data.activeMapId = m.id; mapGmView = m.id;
  mapView = { scale:1, panX:0, panY:0 };
  mapMetaSave(); renderMap();
}
async function renameMap(map){ const n=prompt("Rename map:", map.name); if(n===null) return; map.name=n||map.name; mapMetaSave(); renderMap(); }
/* archiving hides a map from the live list/tokens+fog stay intact, unlike delete which is permanent */
async function archiveMap(map){
  const meta = cloud.mapMeta.data;
  map.archived = true;
  const fallback = meta.maps.find(m=>!m.archived)?.id || null;
  if(meta.activeMapId===map.id) meta.activeMapId = fallback;
  if(meta.playerMapId===map.id) meta.playerMapId = fallback;
  if(mapGmView===map.id) mapGmView = fallback;
  mapMetaSave(); renderMap();
}
async function unarchiveMap(map){
  map.archived = false;
  mapMetaSave(); renderMap();
}
async function deleteMap(map){
  if(!confirm(`Permanently delete map “${map.name}” and its tokens? This can't be undone.`)) return;
  const meta = cloud.mapMeta.data;
  meta.maps = meta.maps.filter(m=>m.id!==map.id);
  if(cloud.mapTokens?.data?.byMap) delete cloud.mapTokens.data.byMap[map.id];
  if(cloud.mapTokens?.data?.fog)   delete cloud.mapTokens.data.fog[map.id];
  const fallback = meta.maps.find(m=>!m.archived)?.id || null;
  meta.activeMapId = fallback;
  if(meta.playerMapId===map.id) meta.playerMapId = fallback;
  if(mapGmView===map.id) mapGmView = fallback;
  mapMetaSave(); mapTokensSave(); renderMap();
}
function openArchivedMaps(){
  const meta = activeMapMeta();
  const wrap = el("div",{});
  const draw = () => {
    wrap.innerHTML = "";
    const archived = meta.maps.filter(m=>m.archived);
    if(!archived.length){ wrap.append(el("div",{class:"r-body"},"No archived maps.")); return; }
    archived.forEach(m=>{
      const row = el("div",{class:"inline", style:"justify-content:space-between;padding:6px 0"});
      const restore = el("button",{class:"btn-secondary",onclick:async()=>{ await unarchiveMap(m); draw(); }},"↺ Restore");
      const del = el("button",{class:"btn-secondary danger",onclick:async()=>{ await deleteMap(m); draw(); }},"🗑 Delete forever");
      row.append(el("div",{},m.name), el("div",{class:"inline"}, restore, del));
      wrap.append(row);
    });
  };
  draw();
  modal({title:"Archived maps", bodyNode:wrap, footNodes:[el("button",{class:"btn-primary",onclick:closeModal},"Close")]});
}
/* Map backgrounds are stored exactly as uploaded — no downscaling, no re-encoding — so pixel-art/
   tile maps stay lossless at full resolution. (User call: never compress, even at the cost of a
   bigger synced row / slower sync for large uploads.) Still validated as a real image first. */
function fileToDataURL(f){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(f); }); }
function prepMapBg(dataUrl, cb){
  const img = new Image();
  img.onload = ()=> cb(dataUrl);
  img.onerror = ()=>toast("⚠ Could not read that image");
  img.src = dataUrl;
}
async function toggleGrid(map){ map.gridOn=!map.gridOn; mapMetaSave(); renderMap(); }
async function clearMapTokens(map){ if(!confirm("Remove ALL tokens from this map?")) return;
  if(cloud.mapTokens?.data?.byMap) cloud.mapTokens.data.byMap[map.id]=[];
  if(mapSelectActive(map)) mapSelect.ids.clear();
  mapTokensSave(); renderMap(); }

function applyMapCamera(stage){ stage.style.transformOrigin="0 0";
  stage.style.transform = `translate(${mapView.panX}px,${mapView.panY}px) scale(${mapView.scale})`; }
const MAP_ZOOM_MIN = 0.2, MAP_ZOOM_MAX = 4;
function attachPanZoom(viewport, stage){
  let zoomTimer = null;
  // The scaled stage is a cached GPU layer rasterized at the zoom it was BUILT at, so zooming
  // just stretches that stale bitmap (blurry/pixelated) until a full re-render rebuilds the
  // layer — which is why moving a token "fixed" it. Rebuild once the gesture settles.
  const settle = ()=>{
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(()=>{ if(currentTab==="map" && !mapDragging) renderMap(); }, 200);
  };
  const clampScale = s => Math.max(MAP_ZOOM_MIN, Math.min(MAP_ZOOM_MAX, s));
  const vpXY = e=>{ const r=viewport.getBoundingClientRect(); return {x:e.clientX-r.left, y:e.clientY-r.top}; };
  // scale about a viewport point, keeping whatever is under it pinned there
  const zoomAt = (cx, cy, want)=>{
    const old = mapView.scale, next = clampScale(want);
    if(next===old) return;
    mapView.panX = cx - (cx-mapView.panX)*(next/old);
    mapView.panY = cy - (cy-mapView.panY)*(next/old);
    mapView.scale = next; applyMapCamera(stage);
  };
  viewport.addEventListener("wheel", e=>{
    e.preventDefault();
    const p = vpXY(e);
    zoomAt(p.x, p.y, mapView.scale*(e.deltaY<0?1.1:0.9));
    settle();
  }, { passive:false });

  /* Pointer bookkeeping shared by one-finger pan and two-finger pinch-zoom. `.map-viewport` sets
     touch-action:none (so the browser never steals the gesture), which also means there is NO
     native pinch — without the pinch branch below, phones/tablets can pan but cannot zoom at all. */
  const pts = new Map();     // active pointerId → {x,y} in viewport coords
  let pan = null;            // {sx,sy,px0,py0} while one-finger/mouse panning
  let pinch = null;          // {dist0,scale0,ax,ay} while two-finger pinching
  const twoPts = ()=>{ const a=[...pts.values()]; return [a[0],a[1]]; };
  const beginPan = p => { pan = {sx:p.x, sy:p.y, px0:mapView.panX, py0:mapView.panY}; };
  const beginPinch = ()=>{
    const [a,b] = twoPts();
    const cx=(a.x+b.x)/2, cy=(a.y+b.y)/2;
    pan = null;
    pinch = { dist0: Math.hypot(a.x-b.x, a.y-b.y) || 1, scale0: mapView.scale,
      // stage-space point under the starting midpoint — held under the midpoint for the whole
      // gesture, so the pinch scales AND drags together the way a native map gesture does
      ax: (cx - mapView.panX)/mapView.scale, ay: (cy - mapView.panY)/mapView.scale };
  };
  viewport.addEventListener("pointerdown", ev=>{
    // tokens handle their own drag; the floating AoE range panel is a child of viewport too —
    // without this it soaked up pointerdown as a map-pan (setPointerCapture on viewport), which
    // hijacked clicks on its facing d-pad / clear button so the panel looked broken/stuck.
    // .map-img-ctrls (⬆/⬇/🗑 in image-edit mode) had the SAME bug: attachImageDrag deliberately
    // ignores them so they don't start an image drag, but it returns without stopPropagation, so
    // the press still bubbled here and the viewport captured the pointer — retargeting pointerup
    // away from the button, so its click never fired ("the trash button does nothing"). The resize
    // handle and the image body were unaffected only because both stopPropagation themselves.
    if(ev.target.closest(".map-token") || ev.target.closest(".aoe-panel") ||
       ev.target.closest(".map-img-ctrls")) return;
    pts.set(ev.pointerId, vpXY(ev));
    try{ viewport.setPointerCapture(ev.pointerId); }catch(e){}
    if(pts.size===2) beginPinch();
    else if(pts.size===1) beginPan(vpXY(ev));
  });
  viewport.addEventListener("pointermove", ev=>{
    if(!pts.has(ev.pointerId)) return;
    pts.set(ev.pointerId, vpXY(ev));
    if(pinch && pts.size>=2){
      const [a,b] = twoPts();
      const dist = Math.hypot(a.x-b.x, a.y-b.y) || 1;
      const next = clampScale(pinch.scale0 * (dist/pinch.dist0));
      const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
      mapView.scale = next;
      mapView.panX = mx - pinch.ax*next;      // pin the anchor under the moving midpoint
      mapView.panY = my - pinch.ay*next;
      applyMapCamera(stage);
    } else if(pan && pts.size===1){
      const p = vpXY(ev);
      mapView.panX = pan.px0 + (p.x-pan.sx);
      mapView.panY = pan.py0 + (p.y-pan.sy);
      applyMapCamera(stage);
    }
  });
  const endPointer = ev=>{
    if(!pts.delete(ev.pointerId)) return;
    try{ viewport.releasePointerCapture(ev.pointerId); }catch(e){}
    if(pinch){ pinch = null; settle(); }        // re-rasterize at the zoom it settled on
    // lifting one finger of a pinch should keep panning smoothly from where the other one is,
    // not jump — so re-anchor the pan to the surviving pointer instead of ending the gesture.
    if(pts.size===1) beginPan([...pts.values()][0]);
    else if(pts.size===0) pan = null;
  };
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
}

/* stage dimensions = bounding box of all images, with a default floor */
/* The board's canonical grid/token space is anchored at logical (0,0); background images can now sit
   up/left of that (negative im.x/im.y — see attachImageDrag). originX/originY is how far the DOM stage
   must be padded on the top/left so nothing ever needs a negative CSS position, snapped to whole grid
   cells so the grid pattern and token cell math (which stay in logical, origin-less coordinates) keep
   lining up. Every renderer that places something in DOM space — images, tokens, grid, fog, AoE — has
   to add this before it's a screen coordinate. */
function mapStageSize(map){
  const px = map.gridSize;
  let w = 30*px, h = 20*px, minX = 0, minY = 0;
  (map.images||[]).forEach(im=>{
    if(im.w) w=Math.max(w, im.x+im.w); if(im.h) h=Math.max(h, im.y+im.h);
    minX = Math.min(minX, im.x); minY = Math.min(minY, im.y);
  });
  const originX = Math.ceil(-minX/px)*px, originY = Math.ceil(-minY/px)*px;
  return { w: w+originX, h: h+originY, originX, originY };
}
/* backgrounds already re-rendered once post-decode this session (bug #6, keyed by image id) */
const decodedBgIds = new Set();
/* one-time fixup: a migrated legacy background has w/h 0 — resolve to its natural size. Runs for
   EVERYONE now (bug #6): a player used to keep the 30×20 fallback stage size until first paint,
   drawing the background at the wrong size/scale until a token moved. The GM also persists the
   resolved sizes to cloud so the fixup only ever happens once; players just correct their own view. */
function resolveImageSizes(map){
  const pending = (map.images||[]).filter(im=>!im.w || !im.h);
  if(!pending.length) return;
  let left = pending.length;
  const done = async ()=>{ if(--left) return;
    if(cloud.isGM) mapMetaSave();
    if(currentTab==="map" && !mapDragging) renderMap(); };
  pending.forEach(im=>{ const p=new Image();
    p.onload =()=>{ im.w=p.naturalWidth||map.gridSize*10; im.h=p.naturalHeight||map.gridSize*10; done(); };
    p.onerror=()=>{ im.w=im.w||map.gridSize*10; im.h=im.h||map.gridSize*10; done(); };
    p.src=im.src; });
}

/* Weather is per-map and shared with everyone through the map meta row (GM-only control, like the
   grid and fog). There is deliberately no round timer — this table rules that weather stays until
   the GM changes it, rather than the book's 5 rounds. */
function setMapWeather(map, key){
  map.weather = WEATHER_BY_KEY[key] ? key : "clear";
  mapMetaSave(); renderMap();
  const w = weatherByKey(map.weather);
  toast(weatherIsClear(w) ? "🌤 Weather cleared" : `${w.icon} ${w.name} — weather set`);
}
/* Only one Terrain can be active at a time — same "single select, replaces whatever's active"
   shape as Weather (Terrains that stack aren't a book rule; multiple Terrains would just fight
   over which one applies). Weather and Terrain stay independent of each other though: setting
   one never clears the other. map.terrains is kept as an array (0 or 1 entries) so the rest of
   the Terrain plumbing — activeTerrains/terrainRollMods/terrainPanel — doesn't need to change. */
function setMapTerrain(map, key){
  const def = TERRAIN_BY_KEY[key];
  map.terrains = def ? [key] : [];
  mapMetaSave(); renderMap();
  toast(def ? `${def.icon} ${def.name} — terrain set` : "🌱 Terrain cleared");
}
/* Panel under the map toolbar: the active condition's full rules, plus the per-turn HP ticks it
   would move on every Pokémon on the board. Ticks are LISTED rather than auto-applied, so the GM
   applies them deliberately; each row carries a button that does the arithmetic on one tap. */
function weatherPanel(map){
  const w = weatherByKey(map?.weather);
  if(!map || weatherIsClear(w)) return null;
  const card = el("details",{class:"card map-weather"});
  card.append(el("summary",{},
    el("span",{style:"font-weight:800"}, `${w.icon} ${w.name}`),
    el("span",{class:"muted small",style:"margin-left:8px"}, w.blurb)));
  const body = el("div",{style:"margin-top:8px"});
  w.rules.forEach(r=>body.append(el("div",{class:"small"}, "• "+r)));

  const rows = [];
  mapTokensFor(map.id).forEach(t=>{
    const L = t.link ? tokenLinked(t) : null;
    const mon = (L && !L.missing && (L.kind==="pokemon" || L.kind==="enc")) ? L.obj : null;
    if(!mon) return;
    const rep = weatherTickReport(mon);
    if(rep.length) rows.push({ token:t, rep, name:tokenHp(t).name });
  });
  if(rows.length){
    body.append(el("div",{class:"small muted",style:"font-weight:700;margin:10px 0 4px"},
      "Per-turn HP — not applied automatically; tap a value when that creature's turn comes up"));
    rows.forEach(r=>{
      const net = r.rep.reduce((s,x)=>s+x.delta, 0);
      const line = el("div",{class:"inline",style:"gap:8px;justify-content:space-between;flex-wrap:wrap;margin-top:4px"});
      line.append(el("span",{class:"small"}, `${r.name} — `,
        el("span",{class:"muted"}, r.rep.map(x=>`${x.label} (${x.delta>0?"+":""}${x.delta} HP, ${x.when} of turn)`).join(" · "))));
      if(net && tokenHp(r.token).editable)
        line.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",
          title:`apply ${net>0?"+":""}${net} HP to ${r.name}`,
          onclick:async()=>{ await setTokenHP(r.token, tokenHp(r.token).cur + net); renderMap(); }},
          `${net>0?"+":""}${net} HP`));
      body.append(line);
    });
  } else {
    body.append(el("div",{class:"small muted",style:"margin-top:10px"},
      "No Pokémon on this map take per-turn HP changes from this weather."));
  }
  card.append(body);
  return card;
}
/* Panel under the map toolbar for active Terrains — same idea as weatherPanel, but plural: any
   number of Terrains can be listed at once, each with its own rules. */
function terrainPanel(map){
  const terrains = (map?.terrains||[]).map(k=>TERRAIN_BY_KEY[k]).filter(Boolean);
  if(!map || !terrains.length) return null;
  const card = el("details",{class:"card map-weather"});
  card.append(el("summary",{},
    el("span",{style:"font-weight:800"}, terrains.map(t=>`${t.icon} ${t.name}`).join(" · ")),
    el("span",{class:"muted small",style:"margin-left:8px"}, terrains.map(t=>t.blurb).join(" · "))));
  const body = el("div",{style:"margin-top:8px"});
  terrains.forEach(t=>{
    body.append(el("div",{class:"small",style:"font-weight:700;margin-top:6px"}, `${t.icon} ${t.name}`));
    t.rules.forEach(r=>body.append(el("div",{class:"small"}, "• "+r)));
  });
  const rows = [];
  mapTokensFor(map.id).forEach(tok=>{
    const L = tok.link ? tokenLinked(tok) : null;
    const mon = (L && !L.missing && (L.kind==="pokemon" || L.kind==="enc")) ? L.obj : null;
    if(!mon) return;
    const rep = terrainTickReport(mon);
    if(rep.length) rows.push({ token:tok, rep, name:tokenHp(tok).name });
  });
  if(rows.length){
    body.append(el("div",{class:"small muted",style:"font-weight:700;margin:10px 0 4px"},
      "Per-turn HP — not applied automatically; tap a value when that creature's turn comes up"));
    rows.forEach(r=>{
      const net = r.rep.reduce((s,x)=>s+x.delta, 0);
      const line = el("div",{class:"inline",style:"gap:8px;justify-content:space-between;flex-wrap:wrap;margin-top:4px"});
      line.append(el("span",{class:"small"}, `${r.name} — `,
        el("span",{class:"muted"}, r.rep.map(x=>`${x.label} (${x.delta>0?"+":""}${x.delta} HP, ${x.when} of turn)`).join(" · "))));
      if(net && tokenHp(r.token).editable)
        line.append(el("button",{class:"btn-secondary",style:"padding:3px 9px",
          title:`apply ${net>0?"+":""}${net} HP to ${r.name}`,
          onclick:async()=>{ await setTokenHP(r.token, tokenHp(r.token).cur + net); renderMap(); }},
          `${net>0?"+":""}${net} HP`));
      body.append(line);
    });
  } else {
    body.append(el("div",{class:"small muted",style:"margin-top:10px"},
      "No Pokémon on this map take per-turn HP changes from these Terrains."));
  }
  card.append(body);
  return card;
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
    const liveMaps = meta.maps.filter(m=>!m.archived);
    const archivedMaps = meta.maps.filter(m=>m.archived);
    if(liveMaps.length){
      const sel = el("select");
      liveMaps.forEach(m=>sel.append(el("option",{value:m.id,selected:m.id===mapGmView},
        m.name + (m.id===meta.playerMapId ? " 👁" : ""))));
      sel.addEventListener("change", ()=>{ mapGmView=sel.value; mapView={scale:1,panX:0,panY:0}; renderMap(); });
      bar.append(el("label",{class:"field",style:"max-width:190px"}, el("span",{},"Viewing (private)"), sel));
    }
    bar.append(el("button",{class:"btn-secondary",onclick:newMap},"＋ New map"));
    if(archivedMaps.length) bar.append(el("button",{class:"btn-secondary",onclick:openArchivedMaps},
      `🗄 Archived (${archivedMaps.length})`));
    if(map){
      const shown = map.id===meta.playerMapId;
      bar.append(el("button",{class:"btn-primary"+(shown?" on":""),onclick:()=>pushMapToPlayers(map),
        title:"Make this the map players see"}, shown?"👁 Players see this":"👁 Show to players"));
      bar.append(
        el("button",{class:"btn-secondary",onclick:()=>renameMap(map)},"✎ Rename"),
        el("button",{class:"btn-secondary",onclick:()=>archiveMap(map),
          title:"Hide this map from the live list without deleting its tokens/fog"}, "🗄 Archive"),
      );
      // — Scene group: images, grid —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary",onclick:()=>addMapImage(map)},"＋ Add image"),
        el("button",{class:"btn-secondary"+(mapImgEdit?" on":""),onclick:()=>{ mapImgEdit=!mapImgEdit; renderMap(); },
          title:"Move/resize/layer the map images"}, mapImgEdit?"🖼 Editing images":"🖼 Edit images"),
        el("button",{class:"btn-secondary"+(map.gridOn?" on":""),onclick:()=>toggleGrid(map)}, map.gridOn?"▦ Grid on":"▦ Grid off"),
      );
      const gs = el("input",{type:"number",min:12,max:200,value:map.gridSize,style:"width:64px",title:"grid cell size (px)"});
      gs.addEventListener("change", async()=>{ map.gridSize=Math.max(12,Math.min(200,parseInt(gs.value)||32)); mapMetaSave(); renderMap(); });
      bar.append(el("label",{class:"field",style:"max-width:120px"}, el("span",{},"Cell px"), gs));
      // — Play group: tokens, fog —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-primary",onclick:()=>openAddToken(map)},"＋ Add token"),
        el("button",{class:"btn-secondary",onclick:()=>clearMapTokens(map)},"Clear tokens"),
        el("button",{class:"btn-secondary",onclick:()=>resizeTokensToSpecies(map),
          title:"Recompute every token's footprint from its species (Small/Medium=1×1, Large=2×2, Huge=3×3, "
               +"Gigantic=4×4) — fixes tokens that were placed before this existed, or that evolved since"},
          "↺ Resize to species"),
        el("button",{class:"btn-secondary"+(map.fogOn?" on":""),onclick:()=>toggleFog(map),
          title:"Auto-reveals around player tokens; explored areas stay revealed"}, map.fogOn?"🌫 Fog on":"🌫 Fog off"),
      );
      if(map.fogOn){
        const fr = el("input",{type:"number",min:1,max:20,value:map.fogRadius,style:"width:56px",title:"reveal radius (cells)"});
        fr.addEventListener("change", ()=>setFogRadius(map, fr.value));
        bar.append(el("label",{class:"field",style:"max-width:110px"}, el("span",{},"Fog radius"), fr),
          el("button",{class:"btn-secondary",onclick:()=>resetFog(map)},"Reset fog"));
      }
      // — Select group: multi-token select, so several tokens can be dragged as one group —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary"+(mapSelectActive(map)?" on":""),onclick:()=>toggleMapSelect(map),
          title:"Tap tokens to select several, then drag any of them to move the group together"},
          mapSelectActive(map)?`✓ Selecting (${mapSelect.ids.size})`:"☑ Select tokens"),
        el("button",{class:"btn-secondary",onclick:()=>selectMapTokens(map, PLAYER_TOKEN_KINDS, "player tokens"),
          title:"Select every trainer/Pokémon token on this map, to move the whole party at once"},"☑ All players"),
      );
      // — Battle group: track movement per token —
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary"+(meta.battleOn?" on":""),onclick:()=>toggleBattle(map),
          title:"Track how far each token moves per round (diagonals cost 2)"}, meta.battleOn?"⚔ Battle on":"⚔ Battle off"));
      if(meta.battleOn) bar.append(el("button",{class:"btn-secondary",onclick:()=>newRound(map),title:"Reset every token's movement for a new round"},"↺ New round"));
      // — Weather group: one Weather Condition at a time, shared with every player (Core p.342) —
      const wsel = el("select",{title:"Weather Condition (Core p.342) — replaces any weather already in play"});
      WEATHER_DEFS.forEach(w=>wsel.append(el("option",{value:w.key,selected:w.key===(map.weather||"clear")},
        `${w.icon} ${w.name}`)));
      wsel.addEventListener("change", ()=>setMapWeather(map, wsel.value));
      bar.append(el("span",{class:"map-sep"}),
        el("label",{class:"field",style:"max-width:190px"}, el("span",{},"Weather"), wsel));
      // — Terrain group: like Weather, only one Terrain can be active at a time (they cancel
      //   each other out) — Weather and Terrain are independent, so both selects sit side by side —
      const curTerrain = (map.terrains||[])[0] || "";
      const tsel = el("select",{title:"Terrain (Core p.343) — replaces any Terrain already in play; independent of Weather"});
      tsel.append(el("option",{value:"",selected:!curTerrain},"— No Terrain —"));
      TERRAIN_DEFS.forEach(t=>tsel.append(el("option",{value:t.key,selected:t.key===curTerrain,title:t.blurb},
        `${t.icon} ${t.name}`)));
      tsel.addEventListener("change", ()=>setMapTerrain(map, tsel.value));
      bar.append(el("span",{class:"map-sep"}),
        el("label",{class:"field",style:"max-width:190px"}, el("span",{},"Terrain"), tsel));
    }
  } else {
    bar.append(el("div",{class:"map-mapname"}, map ? `🗺 ${map.name}` : "🗺 Battle map"));
    if(meta.battleOn) bar.append(el("span",{class:"battle-badge"},"⚔ Battle"));
    // players can't change the weather/terrain, but they must be able to see what's in play
    const pw = weatherByKey(map?.weather);
    if(map && !weatherIsClear(pw)) bar.append(el("span",{class:"battle-badge"}, `${pw.icon} ${pw.name}`));
    (map?.terrains||[]).map(k=>TERRAIN_BY_KEY[k]).filter(Boolean).forEach(t=>
      bar.append(el("span",{class:"battle-badge"}, `${t.icon} ${t.name}`)));
    const viewer = isMapHpViewer();
    if(map && viewer){
      // "Viewer" (a co-pilot/spectator device) can add ANY player's token and select the whole
      // party at once, but gets no GM-only scenery/weather/encounter tools.
      bar.append(el("button",{class:"btn-primary",onclick:()=>openAddToken(map)},"＋ Add token"));
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary"+(mapSelectActive(map)?" on":""),onclick:()=>toggleMapSelect(map),
          title:"Tap tokens to select several, then drag any of them to move the group together"},
          mapSelectActive(map)?`✓ Selecting (${mapSelect.ids.size})`:"☑ Select tokens"),
        el("button",{class:"btn-secondary",onclick:()=>selectMapTokens(map, PLAYER_TOKEN_KINDS, "player tokens"),
          title:"Select every trainer/Pokémon token on this map, to move the whole party at once"},"☑ All players"));
    } else if(map && Object.values(cloud.byId).some(r=>ownsRow(r))){
      bar.append(el("button",{class:"btn-primary",onclick:()=>openAddToken(map)},"＋ Add my token"));
      // Select buttons always show for a player who owns a sheet — they used to be hidden until an
      // editable token already existed on the map, which is exactly when a player wants to grab & place them.
      bar.append(el("span",{class:"map-sep"}),
        el("button",{class:"btn-secondary"+(mapSelectActive(map)?" on":""),onclick:()=>toggleMapSelect(map),
          title:"Tap your tokens to select several, then drag any of them to move together"},
          mapSelectActive(map)?`✓ Selecting (${mapSelect.ids.size})`:"☑ Select tokens"),
        el("button",{class:"btn-secondary",onclick:()=>selectMapTokens(map, PLAYER_TOKEN_KINDS, "of your tokens")},"☑ My tokens"));
    }
  }
  root.append(bar);
  if(map && mapSelectActive(map)) root.append(mapSelectBar(map));

  if(!map){
    root.append(el("div",{class:"card muted"}, cloud.isGM
      ? "No maps yet — tap “＋ New map”, then “＋ Add image” and drop some tokens."
      : "The GM hasn't shared a map yet."));
    return;
  }
  resolveImageSizes(map);   // resolve any migrated-bg natural sizes (no-op once done)
  const wpanel = weatherPanel(map); if(wpanel) root.append(wpanel);
  const tpanel = terrainPanel(map); if(tpanel) root.append(tpanel);
  if(meta.battleOn) root.append(initiativePanel(map, meta));

  const { w:stageW, h:stageH, originX, originY } = mapStageSize(map);
  const viewport = el("div",{class:"map-viewport"});
  const stage = el("div",{class:"map-stage",style:`width:${stageW}px;height:${stageH}px`});

  // layered images (back → front)
  if(!map.images.length) stage.append(el("div",{class:"map-nobg",style:`width:${stageW}px;height:${stageH}px`}));
  const editOverlays = [];   // controls/handle for each image, appended AFTER every image wrap (see below)
  map.images.forEach((im,imIdx)=>{
    const node = el("img",{class:"map-img"+(mapImgEdit?" editing":""),src:im.src,draggable:false,alt:"",decoding:"sync",
      style:`left:${im.x+originX}px;top:${im.y+originY}px;`+(im.w?`width:${im.w}px;`:"")+(im.h?`height:${im.h}px;`:"")});
    // The scaled stage is a GPU layer rasterized at build time; if a background isn't decoded yet it
    // composites a blurry raster until the next full re-render (moving a token "fixed" it — bug #6).
    // Re-render ONCE per background after it decodes, keyed by id so cached data-URLs can't loop.
    if(im.id && !decodedBgIds.has(im.id) && node.decode){
      const mark = ()=>decodedBgIds.add(im.id);
      node.decode().then(()=>{ mark(); if(currentTab==="map" && !mapDragging && !mapImgEdit) renderMap(); }).catch(mark);
    }
    if(mapImgEdit){
      const wrap = el("div",{class:"map-img-wrap editing",style:`left:${im.x+originX}px;top:${im.y+originY}px;width:${im.w||stageW}px;height:${im.h||stageH}px`});
      node.style.left="0px"; node.style.top="0px"; node.style.width="100%"; node.style.height="100%";
      wrap.append(node);
      stage.append(wrap);
      // Controls/handle are a SEPARATE overlay, collected here and appended after the whole loop so
      // every image's buttons always sit above every image's body — otherwise, once an image wasn't
      // topmost, a front (usually full-size) image above it would visually and physically cover its
      // "bring forward" button, making it impossible to ever bring it back up.
      const overlay = el("div",{class:"map-img-overlay",style:`left:${im.x+originX}px;top:${im.y+originY}px;width:${im.w||stageW}px;height:${im.h||stageH}px`});
      // Freshly-added images all start at the same x/y (0,0), so several images' control rows can sit
      // on the exact same pixels — stagger by layer index so an image directly under another still has
      // its own reachable spot (not just "in front of every wrap", but "not on top of another's buttons").
      overlay.append(el("div",{class:"map-img-ctrls",style:`top:${6+imIdx*34}px`},
        el("button",{title:"bring forward",onclick:e=>{e.stopPropagation();moveMapImageLayer(map,im,1);}},"⬆"),
        el("button",{title:"send back",onclick:e=>{e.stopPropagation();moveMapImageLayer(map,im,-1);}},"⬇"),
        el("button",{title:"delete",class:"danger",onclick:e=>{e.stopPropagation();if(confirm("Remove this image?"))deleteMapImage(map,im);}},"🗑")));
      overlay.append(el("div",{class:"map-img-handle",title:"drag to resize"}));
      const handle = overlay.querySelector(".map-img-handle");
      attachImageDrag(wrap, im, map, overlay, originX, originY);
      // resize handle uses the same drag machinery in resize mode
      handle.addEventListener("pointerdown", ev=>{ ev.stopPropagation();
        const px=map.gridSize, snap=v=>map.gridOn?Math.round(v/px)*px:v, scale=mapView.scale;
        const sx=ev.clientX, sy=ev.clientY, w0=im.w, h0=im.h; let moved=false;
        try{ handle.setPointerCapture(ev.pointerId); }catch(e){}
        const mv=e=>{ moved=true; mapDragging=true; im.w=Math.max(px,snap(w0+(e.clientX-sx)/scale)); im.h=Math.max(px,snap(h0+(e.clientY-sy)/scale));
          wrap.style.width=im.w+"px"; wrap.style.height=im.h+"px";
          overlay.style.width=im.w+"px"; overlay.style.height=im.h+"px"; };
        const up=async()=>{ try{handle.releasePointerCapture(ev.pointerId);}catch(e){} handle.removeEventListener("pointermove",mv); handle.removeEventListener("pointerup",up);
          mapDragging=false; if(moved){ mapMetaSave(); renderMap(); } };
        handle.addEventListener("pointermove",mv); handle.addEventListener("pointerup",up); });
      editOverlays.push(overlay);
    } else {
      stage.append(node);
    }
  });
  editOverlays.forEach(o=>stage.append(o));

  if(map.gridOn) stage.append(el("div",{class:"map-grid",style:`width:${stageW}px;height:${stageH}px;background-size:${map.gridSize}px ${map.gridSize}px`}));

  // tokens + fog, with role-dependent stacking. In image-edit mode tokens are inert.
  const fog = fogSet(map.id);
  const mkToken = t => { const node=mapTokenNode(t,map,originX,originY); if(!mapImgEdit) attachTokenDrag(node,t,map,originX,originY); else node.style.pointerEvents="none"; return node; };
  const visibleToken = t => {
    if(t.gmHidden) return false;                                    // GM has hidden this token from players entirely
    if(cloud.isGM || !map.fogOn) return true;
    if(t.link && ownsRow(cloud.byId[t.link.sheetId])) return true;   // always see your own
    return fog.has(Math.round(t.x)+","+Math.round(t.y));
  };
  const drawFogInto = () => { if(!map.fogOn) return null; const cv=el("canvas",{class:"map-fog"}); drawFog(cv,map,stageW,stageH,originX,originY); return cv; };

  if(cloud.isGM){
    const f = drawFogInto(); if(f) stage.append(f);                 // GM: dim fog under tokens
    mapTokensFor(map.id).forEach(t=>stage.append(mkToken(t)));
  } else {
    mapTokensFor(map.id).forEach(t=>{ if(visibleToken(t)) stage.append(mkToken(t)); });
    const f = drawFogInto(); if(f) stage.append(f);                 // players: opaque fog over hidden tokens
  }

  // attack-range / AoE overlay (#1) — above tokens, with floating controls
  if(mapAoE && mapTokensFor(map.id).some(t=>t.id===mapAoE.tokenId)){
    const acv = el("canvas",{class:"map-aoe"}); drawAoE(acv, map, stageW, stageH, originX, originY); stage.append(acv);
  } else if(mapAoE){ mapAoE = null; }                               // token gone / different map

  applyMapCamera(stage);
  if(mapAoE) viewport.append(aoeControlPanel(map));
  viewport.append(stage);
  attachPanZoom(viewport, stage);
  root.append(viewport);
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
    wrap.append(el("div",{class:"r-body"}, `Connected to “${cloud.campaign}” as ${cloud.name}${cloud.isGM?" — GM, can edit all sheets":isMapHpViewer()?" — Viewer (co-pilot): can move every player's tokens & edit their HP on the map":" — you can edit your own sheets"}.`));
    if(cloud.isGM) wrap.append(el("div",{style:"margin-top:10px"},
      el("button",{class:"btn-primary",onclick:()=>openSendPokemon()},"🎁 Send a Pokémon to a player…")));
    const roster = el("div",{class:"reflist",style:"margin-top:10px"});
    Object.values(cloud.byId).sort((a,b)=>(a.owner_name||"").localeCompare(b.owner_name||"")).forEach(r=>{
      const item = el("div",{class:"refitem",style:"cursor:pointer;display:flex;gap:8px;align-items:center",
        onclick:()=>{ cloud.activeId=r.id; openMon=null; closeModal(); switchTab("trainer"); }},
        el("div",{style:"flex:1;min-width:0"},
          el("div",{class:"r-title"}, r.data?.name||"(unnamed)"),
          el("div",{class:"r-meta"}, `${r.owner_name||"?"}${ownsRow(r)?" (you)":""} · ${(r.data?.pokemon?.length)||0} Pokémon`)));
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
  const fViewer = el("input",{type:"checkbox"}); fViewer.checked = !!last.viewer;
  // toggling GM off/on shouldn't leave a stale Viewer tick that then gets ignored — keep them exclusive
  fGm.addEventListener("input", ()=>{ if(fGm.value.trim()) fViewer.checked=false; });
  fViewer.addEventListener("change", ()=>{ if(fViewer.checked) fGm.value=""; });
  wrap.append(
    el("label",{class:"field"},el("span",{},"Campaign code"),fCampaign), el("div",{style:"height:8px"}),
    el("label",{class:"field"},el("span",{},"Your display name"),fName), el("div",{style:"height:8px"}),
    el("label",{class:"field"},el("span",{},"GM code (optional)"),fGm),
    el("label",{class:"inline small",style:"margin-top:10px;gap:8px;align-items:flex-start;cursor:pointer"}, fViewer,
      el("span",{}, el("b",{},"Join as Viewer"), el("span",{class:"muted"}," — co-pilot mode: add & move every player's tokens and edit their HP on the map, but no enemy/weather/map-editing tools."))),
    el("div",{class:"r-meta",style:"margin-top:8px"},"Everyone uses the same campaign code. Players edit their own sheets; the GM code unlocks editing everyone's."),
  );
  modal({title:"Join a cloud campaign", bodyNode:wrap, footNodes:[
    el("button",{class:"btn-secondary",onclick:closeModal},"Cancel"),
    el("button",{class:"btn-primary",onclick:()=>cloudConnect(fCampaign.value,fName.value,fGm.value,false,fViewer.checked)},"Connect"),
  ]});
}

/* ===================================================================
   boot
=================================================================== */
applyTheme();
render();
initCloud();

/* Resync from the server whenever a cloud tab is resumed. A tab left open (desktop idle overnight,
   mobile PWA backgrounded, phone locked) can miss realtime events — Supabase's websocket doesn't
   reliably survive a long background suspension — so its in-memory cloud.byId silently goes stale.
   Any save fired from that tab (even an unrelated HP tick) re-uploads the WHOLE stale character with
   a brand-new timestamp, clobbering everyone's edits made in the meantime (this is what wiped the
   Level Up trackers). Refetching on resume shrinks that staleness window down to "since I last looked
   at this tab" instead of "since I last touched it", for every tab — GM and players alike. Safe to
   call anytime: fetchRoster()'s recoverUnsavedFromCache() still protects a genuinely-unsaved local edit. */
async function resyncCloud(){
  if(mode!=="cloud" || !cloud.client) return;
  try{
    await flushPendingCloudWrites();   // commit any debounced edit BEFORE refetching, so the resync can't revert it
    await fetchRoster(); await fetchPC(); await fetchMap(); await fetchEnc();
    const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if(!typing) softRender();
  } catch(e){ console.error(e); }
}
document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="visible") resyncCloud(); });
window.addEventListener("pageshow", resyncCloud);   // bfcache restores don't fire visibilitychange
window.addEventListener("online", resyncCloud);     // back from a tunnel / dropped wifi

/* ─────────────────────────── sync watchdog ───────────────────────────
   Everything above is event-driven, and every event source can fail quietly: a websocket dies
   without an error, a debounced save is lost when a request fails, a write gives up after its
   retries. Each of those leaves the tab looking fine while it is actually out of step — which is
   what "I have to do it twice / reload the page" felt like. This is the backstop: once every 15s,
   while the tab is actually on screen,
     1. anything we edited but never got saved is pushed again, and
     2. a realtime subscription that isn't SUBSCRIBED (or has heard nothing for 2 minutes) is
        rebuilt and followed by a full re-fetch.
   Both are no-ops in the normal case, so this costs nothing when things are working. */
/* Something we changed that the server demonstrably doesn't have yet. Checked with the real diff,
   not just deepEqual: a JS-only difference (a key holding `undefined`, which JSON drops) would
   otherwise look "diverged" forever and be re-pushed on every tick. */
function rowNeedsPush(row){
  if(!row || row._base==null || cloud.inflight[row.id]) return false;
  if(deepEqual(row.data, row._base)) return false;          // cheap pre-filter
  return diffOps(row._base, row.data).length > 0;
}
function flushDivergedRows(){
  for(const id of Object.keys(cloud.byId)){
    const row = cloud.byId[id];
    if(rowSaveTimers[id] || (id===cloud.activeId && cloud.saveTimer)) continue;   // a save is already queued
    if(rowNeedsPush(row) && canEdit(row)) dispatchRowSave(row);
  }
  if(!encSaveTimer   && rowNeedsPush(cloud.enc))       encUpsert();
  if(!mapTokensTimer && rowNeedsPush(cloud.mapTokens)) serialize(mapTokensChain, mapTokensUpsert);
  if(!mapMetaTimer   && rowNeedsPush(cloud.mapMeta))   mapMetaSave();
  if(rowNeedsPush(cloud.pc)) pcUpsert();
}
let watchdogBusy = false;
async function syncWatchdog(){
  if(mode!=="cloud" || !cloud.client || document.visibilityState!=="visible" || watchdogBusy) return;
  watchdogBusy = true;
  try{
    flushDivergedRows();
    if(cloud.subStatus!=="SUBSCRIBED"){
      subscribeRealtime();          // rebuild the dead channel…
      await resyncCloud();          // …and catch up on whatever it missed while it was down
    } else if(Date.now() - (cloud.lastEvent||0) > 120000){
      // Healthy-looking socket that has been silent for two minutes: usually just a quiet table,
      // occasionally a connection that only LOOKS joined. One cheap catch-up read settles it
      // without tearing down a working subscription.
      cloud.lastEvent = Date.now();
      await resyncCloud();
    }
  } catch(e){ console.error(e); }
  finally { watchdogBusy = false; }
}
setInterval(syncWatchdog, 15000);

/* Persist pending cloud edits before the page goes away. visibilitychange→hidden is the one
   event mobile browsers reliably fire before killing a backgrounded/refreshed tab; pagehide
   covers desktop close/navigate. Both flush the debounced save via a keepalive request. */
document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="hidden") flushCloudSaves(); });
window.addEventListener("pagehide", flushCloudSaves);

/* Manual "make sure I'm on the latest version" button (⚙-bar 🔄). Belt-and-suspenders on top of the
   auto-update logic below: unregisters the service worker + wipes its caches (so a stale sw.js can't
   keep answering from an old cache) then reloads with a cache-busting query param, which also forces
   the browser's own HTTP cache to be bypassed. This is the "hard refresh" the sw.js comments describe
   as awkward-to-impossible on mobile, made into one tap. */
async function forceRefresh(){
  try{
    if("serviceWorker" in navigator){
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister()));
    }
    if("caches" in window){
      const keys = await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }
  }catch(e){}
  const url = new URL(location.href);
  url.searchParams.set("_r", Date.now());
  location.replace(url.toString());
}
/* Register the service worker when hosted (ignored on file://).
   updateViaCache:"none" — GitHub Pages serves sw.js with Cache-Control: max-age=600 too, so without
   this the browser can check for a new worker against its own HTTP cache and conclude "unchanged"
   even after a deploy. This forces the update check to actually hit the network.
   We also re-check on resume: a mobile PWA is usually RESUMED from the background rather than
   reloaded, so without an explicit update() it can sit on an old worker for days. */
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  const hadController = !!navigator.serviceWorker.controller;   // false on the very first install
  let swReloading = false;
  navigator.serviceWorker.register("sw.js", { updateViaCache:"none" }).then(reg=>{
    const check = ()=>{ try{ reg.update(); }catch(e){} };
    check();
    document.addEventListener("visibilitychange", ()=>{ if(document.visibilityState==="visible") check(); });
    window.addEventListener("pageshow", check);   // bfcache restores don't fire visibilitychange
  }).catch(()=>{});
  /* A NEW worker took over (new deploy). We deliberately do NOT force-reload here anymore: on a phone,
     every lock/unlock fires visibilitychange→check()→reg.update(), and while actively developing this
     app that often finds a newer worker — which used to reload the tab out from under the player every
     single time they unlocked their phone, mid-battle. Just nudge them; the existing manual 🔄 Force
     refresh button (top bar) or their next natural reload picks up the new version. Skipped on first
     install — there was no previous version to replace. */
  navigator.serviceWorker.addEventListener("controllerchange", ()=>{
    if(!hadController || swReloading) return;
    swReloading = true;
    toast("Update available — tap 🔄 to refresh");
  });
}