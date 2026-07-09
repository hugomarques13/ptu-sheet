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

/* fast lookups */
const speciesByName  = new Map(D.species.map(s => [s.name.toLowerCase(), s]));
const moveByName     = new Map(D.moves.map(m => [m.name.toLowerCase(), m]));
const abilityByName  = new Map(D.abilities.map(a => [a.name.toLowerCase(), a]));
const natureByName   = new Map(D.natures.map(n => [n.name.toLowerCase(), n]));
const getSpecies = n => n && speciesByName.get(String(n).toLowerCase());

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
    classes:[], skills, combat, edges:[], features:[],
    inventory:[], background:"", notes:"", appearance:"",
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
  if(!p.stats) { p.stats={}; STATS.forEach(([k])=>p.stats[k]={added:0}); }
  return p;
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw); if (s.characters?.length){
      s.characters.forEach(c => (c.pokemon||[]).forEach(normPokemon));
      return s;
    } }
  } catch(e){}
  const c = newCharacter("My Trainer");
  return { version:1, activeId:c.id, characters:[c], theme:null };
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
                byId:{}, activeId:null, sub:null, lastSaveTs:0, saveTimer:null };

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
  const total = {}; STATS.forEach(([k]) => total[k] = base[k] + (p.stats[k]?.added||0));
  const cap6 = v => Math.min(6, Math.floor(v/5));
  const maxHP = p.level + total.hp*3 + 10;
  const budget = p.level + 10;
  const spent = STATS.reduce((s,[k]) => s + (p.stats[k]?.added||0), 0);
  return {
    base, total, maxHP, budget, spent, remaining: budget - spent,
    physEva: cap6(total.def), specEva: cap6(total.spdef), spdEva: cap6(total.spd),
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
function typeBadge(t){ return `<span class="type type-${t}">${t}</span>`; }

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
function monSprite(speciesName, shiny, sizeCls="s-sm"){
  const img = el("img",{class:`sprite ${sizeCls}`, alt:speciesName||"", loading:"lazy",
    src: speciesName ? spriteUrl(speciesName, shiny) : POKEBALL_SVG});
  img.addEventListener("error", function(){ this.onerror=null; this.src=POKEBALL_SVG; this.classList.add("fallback"); });
  return img;
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
  input.addEventListener(opts||type==="select" ? "change" : "input", e => {
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
  refreshCharSelect();
  const ac = activeChar();
  $("#partyCount").textContent = (ac?.pokemon?.length) || "";
  renderCloudBanner();
  if (currentTab==="trainer")   renderTrainer();
  if (currentTab==="pokemon")   renderPokemon();
  if (currentTab==="battle")    renderBattle();
  if (currentTab==="reference") renderReference();
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
    [["sheet","Sheet"],["features","Features & Edges"],["gear","Inventory & Bio"]],
    trainerTab, k=>{ trainerTab=k; renderTrainer(); }));

  if(trainerTab==="features"){
    root.append(listCard("Classes","trainer.classes", D.classes.map(x=>x.name), "class"));
    root.append(listCard("Edges","trainer.edges", D.edges.map(x=>x.name), "edge"));
    root.append(listCard("Features","trainer.features", D.features.map(x=>x.name), "feature"));
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
    field("Level","trainer.level",{type:"number",min:1,onchange:recalcTrainer}),
    field("Experience","trainer.xp",{type:"number",min:0}),
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
  idc.append(row1,row2);
  root.append(idc);

  /* combat stats + derived */
  const sc = el("div",{class:"card"}, el("h3",{},"Combat Stats"));
  const sg = el("div",{class:"statgrid"});
  STATS.forEach(([k,lbl]) => {
    const box = el("div",{class:"stat"},
      el("div",{class:"lbl"},lbl),
      inputMini(`trainer.combat.${k}.base`,  t.combat[k].base,  "base"),
      inputMini(`trainer.combat.${k}.added`, t.combat[k].added, "+add"),
      el("div",{class:"big","data-tot":k}, t.combat[k].base + t.combat[k].added),
    );
    sg.append(box);
  });
  sc.append(sg);
  sc.append(el("h3",{style:"margin-top:14px"},"Derived Stats"));
  sc.append(trainerDerivedGrid(t));
  root.append(sc);

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

/* generic list backed by a reference name-list; each entry expands to its rules text */
function listCard(title, path, allNames, refKind){
  const arr = getByPath(path) || [];
  const card = el("div",{class:"card"}, el("h3",{},title,
    el("button",{class:"linkbtn h-act", onclick:()=>openPicker(title, allNames, name=>{
      const a = getByPath(path);
      if(!a.includes(name)){ a.push(name); save(); render(); }
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

function inventoryCard(t){
  const card = el("div",{class:"card"}, el("h3",{},"Inventory",
    el("button",{class:"linkbtn h-act", onclick:()=>{ t.inventory.push({name:"",qty:1,notes:""}); save(); renderTrainer(); }}, "+ item")));
  if(!t.inventory.length) card.append(el("span",{class:"muted small"},"empty"));
  t.inventory.forEach((it,i) => {
    const row = el("div",{class:"moveslot"});
    const name = el("input",{type:"text",placeholder:"Item",style:"flex:1"}); name.value=it.name;
    name.addEventListener("input",()=>{it.name=name.value;save();});
    const allItems = [...D.items.held, ...D.items.food].map(x=>x.name);
    name.setAttribute("list","itemlist");
    const qty = el("input",{type:"number",min:0,style:"width:64px",title:"qty"}); qty.value=it.qty;
    qty.addEventListener("input",()=>{it.qty=parseInt(qty.value)||0;save();});
    const del = el("button",{class:"linkbtn",title:"remove",onclick:()=>{t.inventory.splice(i,1);save();renderTrainer();}},"×");
    row.append(name, qty, del);
    card.append(row);
  });
  // datalist for item suggestions
  if(!$("#itemlist")){
    const dl = el("datalist",{id:"itemlist"});
    [...D.items.held, ...D.items.food].forEach(x=>dl.append(el("option",{value:x.name})));
    document.body.append(dl);
  }
  return card;
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
  body.append(monSprite(sp?.name || p.species, p.shiny, "s-sm"));
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
  const card = el("div",{class:"card"});
  const hero = el("div",{class:"monhero"});
  hero.append(monSprite(sp?.name || p.species, p.shiny, "s-lg"));
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
  hero.append(main);
  card.append(hero);
  /* damage / heal box: type a number (e.g. -10 = take 10 damage, +8 = heal 8) */
  const dmg = el("div",{class:"hpctl",style:"margin-top:10px"});
  const box = el("input",{type:"number",placeholder:"±HP",title:"e.g. -10 to take damage, 8 to heal",style:"width:90px"});
  const apply = dir => { const n=Math.abs(parseInt(box.value)||0); if(!n) return;
    setHP(p.currentHP + dir*n); box.value=""; box.focus(); };
  box.addEventListener("keydown",e=>{ if(e.key==="Enter"){ const n=parseInt(box.value)||0; setHP(p.currentHP+n); box.value=""; } });
  dmg.append(
    el("span",{class:"small muted",style:"font-weight:700"},"Damage / Heal:"),
    box,
    el("button",{class:"",title:"take damage",onclick:()=>apply(-1)},"− Damage"),
    el("button",{class:"",title:"heal",onclick:()=>apply(1)},"+ Heal"));
  card.append(dmg);
  return card;
}

function renderMonPlay(root, p, sp){
  /* abilities (a Pokémon can have several) */
  root.append(abilitiesCard(p, sp));

  /* moves */
  root.append(movesCard(p, sp));

  /* type matchups */
  if(sp && sp.types?.length) root.append(matchupCard(sp.types));

  /* quick stat readout */
  const d = pokeDerived(p);
  const qc = el("div",{class:"card"}, el("h3",{},"Stats at a glance"));
  const g = el("div",{class:"statgrid"});
  STATS.forEach(([k,l])=>g.append(el("div",{class:"stat"},
    el("div",{class:"lbl"},l), el("div",{class:"big"}, d.total[k]))));
  qc.append(g);
  const dv = el("div",{class:"derived",style:"margin-top:10px"});
  [["Max HP",d.maxHP],["Phys. Eva","+"+d.physEva],["Spec. Eva","+"+d.specEva],["Speed Eva","+"+d.spdEva]]
    .forEach(([l,v])=>dv.append(el("div",{class:"dv"}, el("div",{class:"lbl"},l), el("div",{class:"val"},String(v)))));
  qc.append(dv);
  root.append(qc);
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
    field("Level","",{type:"number",min:1,value:p.level,onchange:v=>{p.level=parseInt(v)||1;save();refreshMon(p);}}),
    field("Nature","",{opts:D.natures.map(n=>n.name), value:p.nature, onchange:v=>{p.nature=v;save();refreshMon(p);}}),
  );
  idc.append(r1);
  if(nat) idc.append(el("div",{class:"small muted",style:"margin:6px 0"},
    `Nature ${nat.name}: ${natSummary(nat)} · likes ${nat.likedFlavor}, dislikes ${nat.dislikedFlavor}`));
  const r2 = el("div",{class:"fieldrow"});
  r2.append(
    field("Gender","",{opts:["","Male","Female","Genderless"],value:p.gender,onchange:v=>{p.gender=v;save();}}),
    field("Shiny","",{type:"checkbox",value:p.shiny,onchange:v=>{p.shiny=v;save();refreshMon(p);}}),
    field("Experience","",{type:"number",min:0,value:p.xp,onchange:v=>{p.xp=parseInt(v)||0;save();}}),
    field("Loyalty","",{type:"number",min:0,value:p.loyalty,onchange:v=>{p.loyalty=parseInt(v)||0;save();}}),
    field("Held Item","",{value:p.heldItem,onchange:v=>{p.heldItem=v;save();}}),
  );
  idc.append(r2);
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
    field("Injuries","",{type:"number",min:0,value:p.injuries,onchange:v=>{p.injuries=parseInt(v)||0;save();}}),
    field("Temp HP","",{type:"number",min:0,value:p.tempHP,onchange:v=>{p.tempHP=parseInt(v)||0;save();}}),
    field("Tutor Points","",{type:"number",min:0,value:p.tutorPoints,onchange:v=>{p.tutorPoints=parseInt(v)||0;save();}}),
  );
  ec.append(r3);
  root.append(ec);

  /* evolution */
  if(sp && sp.evolution?.length>1){
    const evc = el("div",{class:"card"}, el("h3",{},"Evolution"));
    evc.append(el("div",{class:"r-body",html: sp.evolution.map(e=>`${e.stage}. ${esc(e.name)}${e.min?` (Lv ${e.min})`:""}`).join("  →  ")}));
    root.append(evc);
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
    row.append(el("summary",{},
      el("span",{style:"color:var(--ink)"}, an || "—"),
      el("button",{class:"x",style:"float:right;cursor:pointer;color:var(--muted)",title:"remove",
        onclick:e=>{e.preventDefault(); p.abilities.splice(i,1); save(); refreshMon(p);}},"×")));
    row.append(el("div",{class:"small",style:"margin-top:6px", html: ab? abilityText(ab):"<span class='muted'>Not in database</span>"}));
    card.append(row);
  });
  return card;
}
function addAbility(p, sp){
  const speciesAbil = sp ? allAbilityNames(sp) : [];
  const speciesSet = new Set(speciesAbil.map(x=>x.toLowerCase()));
  let names, title;
  if(p.unlocked){
    names = [...new Set([...speciesAbil, ...D.abilities.map(a=>a.name)])];
    title = "Add ability (🔓 any)"+(sp?` — ${sp.name}'s options on top`:"");
  } else {
    if(!sp){ toast("Unknown species — tick 🔓 to add any ability"); return; }
    names = speciesAbil;
    title = `Add ability — ${sp.name}'s options`;
  }
  names = names.filter(n=>!p.abilities.includes(n));
  if(!names.length){ toast(p.unlocked?"No more abilities to add":"No more of this species' abilities to add"); return; }
  openPicker(title, names, name=>{
    if(!p.abilities.includes(name)){ p.abilities.push(name); save(); refreshMon(p); }
  }, "ability", n=>speciesSet.has(n.toLowerCase()));
}
function refreshMon(p){ const root=$("#view-pokemon"); root.innerHTML=""; renderMonEditor(root,p);
  $("#partyCount").textContent=activeChar().pokemon.length||""; }

function monStatGrid(p){
  const d = pokeDerived(p);
  const g = el("div",{class:"statgrid"});
  STATS.forEach(([k,lbl]) => {
    const box = el("div",{class:"stat"});
    box.append(el("div",{class:"lbl"},lbl));
    box.append(el("div",{class:"sub","data-pbase":k}, `base ${d.base[k]}`));
    const add = el("input",{type:"number",min:0,title:"added points"}); add.value = p.stats[k].added;
    add.addEventListener("input",()=>{ p.stats[k].added = parseInt(add.value)||0; save(); updateMonComputed(p); });
    box.append(add);
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
  const eff = typeEffectiveness(types);
  const card = el("div",{class:"card"}, el("h3",{},"Type Matchups",
    el("span",{class:"muted small"}, types.map(t=>t).join(" / "))));
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
      m?el("span",{html:typeBadge(m.type||"Normal")}):"",
      opts.tag?el("span",{class:"muted small",style:"margin-left:6px;font-weight:600"},opts.tag):""),
    el("div",{class:"ms-info"}, m? moveLineShort(m) : "custom / not in database"));
  slot.append(info);
  const acts = el("div",{class:"inline"});
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
  const st = struggleMove(p);
  if(st) card.append(moveSlot(p, sp, st, st.name, {tag:"default"}));
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
function openMoveRoll(p, m, sp){
  const d = pokeDerived(p);
  const types = sp?.types || [];
  const stab = m.type && types.includes(m.type);
  const isPhys = /phys/i.test(m.class||"");
  const isSpec = /spec/i.test(m.class||"");
  const atkStat = isPhys ? d.total.atk : isSpec ? d.total.spatk : 0;
  const atkLbl = isPhys ? "Attack" : isSpec ? "Sp. Attack" : null;
  const evaNote = isPhys ? "target's Physical Evasion" : isSpec ? "target's Special Evasion" : "target's Evasion";
  const finalDB = m.damageBase != null ? m.damageBase + (stab?2:0) : null;
  const diceStr = finalDB!=null ? (DB_TABLE[finalDB]||"").split("/")[0].trim() : "";
  const defNote = isPhys ? "Defense" : isSpec ? "Special Defense" : "Defense/Sp.Def";

  const body = el("div",{});
  body.append(el("div",{style:"margin-bottom:6px"}, el("span",{html:typeBadge(m.type||"Normal")}),
    el("span",{class:"kv"}, m.class||"Status")));
  body.append(el("div",{class:"chips",style:"margin-bottom:12px"},
    el("span",{class:"kv"}, `Freq: ${m.frequency||"—"}`),
    el("span",{class:"kv"}, `AC ${m.ac??"—"}`),
    finalDB!=null?el("span",{class:"kv"}, `DB ${m.damageBase}${stab?" +2 STAB → "+finalDB:""}`):"",
    el("span",{class:"kv"}, m.range||"—")));

  /* --- explanation: compact formula line, with the "why" small underneath --- */
  const dm = diceStr.match(/(\d+)d(\d+)\s*([+-]\s*\d+)?/) || [];
  const dn = dm[1] ? +dm[1] : 0, dfaces = dm[2] ? +dm[2] : 0, dflat = dm[3] ? parseInt(dm[3].replace(/\s/g,"")) : 0;

  const explain = el("div",{class:"card",style:"background:var(--panel-2);margin:0 0 12px"});
  // accuracy
  explain.append(el("div",{style:"margin-bottom:10px"},
    el("div",{style:"font-size:16px;font-weight:700"}, `Accuracy: ${m.ac!=null ? "1d20" : "—"}`),
    el("div",{class:"small muted",style:"margin-top:2px"},
      m.ac!=null ? `Roll 1d20 — hits if it's ≥ AC ${m.ac} + ${evaNote}. Nat 20 auto-hits/crits, nat 1 auto-misses.`
                 : "This move has no Accuracy Check.")));
  // damage
  if(finalDB!=null && dn){
    const terms = [`${dn}d${dfaces}`];
    if(dflat) terms.push(String(dflat));
    if(atkStat) terms.push(String(atkStat));
    const why = [];
    why.push(`${dn}d${dfaces}${dflat?`+${dflat}`:""} = Damage Base ${finalDB}${stab?` (DB ${m.damageBase} +2 STAB)`:""}`);
    if(atkStat) why.push(`${atkStat} = your ${atkLbl}`);
    explain.append(el("div",{},
      el("div",{style:"font-size:16px;font-weight:700"}, `Damage: ${terms.join(" + ")}`),
      el("div",{class:"small muted",style:"margin-top:2px"}, why.join(" · ") + `. Target then subtracts their ${defNote}.`)));
  } else {
    explain.append(el("div",{},
      el("div",{style:"font-size:16px;font-weight:700"}, "Damage: —"),
      el("div",{class:"small muted",style:"margin-top:2px"}, "Status move — deals no damage; see its effect.")));
  }
  body.append(explain);

  /* --- results (filled when you press Roll dice) --- */
  const out = el("div",{id:"rollOut",class:"card",style:"background:var(--panel);border:1px dashed var(--line);margin:0"});
  out.append(el("div",{class:"muted small"}, "Press 🎲 Roll dice to simulate."));
  const doRoll = () => {
    out.style.borderStyle="solid";
    out.innerHTML="";
    const acc = 1+Math.floor(Math.random()*20);
    const accLine = el("div",{style:finalDB!=null?"margin-bottom:10px":""});
    accLine.append(el("div",{class:"lbl",style:"color:var(--muted);font-weight:800"},"ACCURACY ROLL"));
    accLine.append(el("div",{style:"font-size:24px;font-weight:800"}, `🎯 ${acc}`,
      el("span",{class:"muted",style:"font-size:14px;font-weight:600"}, "  (1d20)")));
    if(m.ac!=null) accLine.append(el("div",{class:"small muted"},
      `Hits if ${acc} ≥ AC ${m.ac} + ${evaNote}.${acc===20?" Natural 20 — auto-hit/crit!":acc===1?" Natural 1 — auto-miss.":""}`));
    out.append(accLine);
    if(finalDB!=null){
      const r = rollDiceString(diceStr);
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
  {id:"manipulate", name:"Manipulate", type:"Standard", cls:"Status", ac:2, range:"6, 1 target", who:"Trainers only",
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
  {id:"use-item", name:"Use an Item", type:"Standard",
   effect:"Retrieve and use an item (Potion, X-Item, etc.) on a target."},
  {id:"throw-ball", name:"Throw a Poké Ball", type:"Standard",
   effect:"Throw a Poké Ball to try to capture a wild Pokémon."},
  {id:"recall-self", name:"Recall for Switch", type:"Standard",
   effect:"A Pokémon may recall itself into its Poké Ball so its Trainer can switch in another."},
  {id:"pokedex", name:"Identify (Pokédex)", type:"Standard",
   effect:"Use the Pokédex to identify a Pokémon and read its data."},
  {id:"draw-weapon", name:"Draw / Switch Weapon", type:"Standard",
   effect:"Draw a weapon, or switch from one weapon to another."},
  {id:"improvised", name:"Improvised Attack", type:"Standard",
   effect:"Attack using the environment or an object (throw a rock, topple a tree…). The GM adjudicates — usually a reduced AC and Damage Base, and Normal-type unless there's a strong reason otherwise."},
  // ----- Shift -----
  {id:"move", name:"Move / Shift", type:"Shift", common:true,
   effect:"Move up to your Speed using a Movement Capability (Overland, Swim, Sky, Burrow, Levitate). This is the usual use of your Shift Action."},
  {id:"disengage", name:"Disengage", type:"Shift", common:true,
   effect:"Shift 1 meter without provoking an Attack of Opportunity."},
  {id:"switch-pokemon", name:"Send Out / Return Pokémon", type:"Shift",
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

let battleMonId=null, battleFilter="moves";
function renderBattle(){
  const root=$("#view-battle"); root.innerHTML="";
  const c=activeChar();
  const team=(c?.pokemon||[]);
  if(!battleMonId || !team.find(p=>p.id===battleMonId)) battleMonId=(team.find(p=>p.onTeam)||team[0])?.id||null;
  // acting-as selector
  const sc=el("div",{class:"card"},el("h3",{},"Battle — acting as"));
  if(team.length){
    const sel=el("select");
    team.forEach(p=>{ const sp=getSpecies(p.species); sel.append(el("option",{value:p.id,selected:p.id===battleMonId}, `${p.nickname||sp?.name||"?"} · Lv ${p.level}`)); });
    sel.addEventListener("change",()=>{ battleMonId=sel.value; renderBattle(); });
    sc.append(sel);
  } else sc.append(el("div",{class:"muted small"},"No Pokémon yet — generic actions are shown below. Add one in the Pokémon tab to roll its moves here."));
  root.append(sc);

  root.append(subTabBar([["moves","⚔ Moves"],["fav","★ Fav"],["standard","Standard"],["shift","Shift"],["swift","Swift"],["free","Free"],["full","Full"]],
    battleFilter, k=>{ battleFilter=k; renderBattle(); }));

  const p=team.find(x=>x.id===battleMonId), sp=p&&getSpecies(p.species);
  if(battleFilter==="moves"){
    const card=el("div",{class:"card"},el("h3",{},"Your Moves — tap to roll"));
    if(!p){ card.append(el("span",{class:"muted small"},"No Pokémon selected.")); root.append(card); return; }
    const st=struggleMove(p); if(st) card.append(moveSlot(p,sp,st,st.name,{tag:"default"}));
    if(!p.moves.length) card.append(el("span",{class:"muted small"},"No moves yet — add some in the Pokémon → Play tab."));
    p.moves.forEach(mn=>{ const m=moveByName.get(mn.toLowerCase()); card.append(moveSlot(p,sp,m,mn,{})); });
    root.append(card);
    root.append(el("div",{class:"small muted",style:"padding:0 4px"},"Other action types are in the tabs above — Standard, Shift, Swift, Free, Full."));
    return;
  }
  const favs=getFavActions();
  let list=BATTLE_ACTIONS.filter(a => battleFilter==="fav" ? favs.has(a.id) : a.type.toLowerCase()===battleFilter);
  list.sort((a,b)=> (favs.has(b.id)-favs.has(a.id)) || ((b.common?1:0)-(a.common?1:0)) || a.name.localeCompare(b.name));
  if(!list.length){ root.append(el("div",{class:"muted",style:"padding:10px"}, battleFilter==="fav"?"No favourites yet — tap ☆ on any action to pin it here.":"Nothing here.")); return; }
  const wrap=el("div",{}); list.forEach(a=>wrap.append(battleActionRow(a,favs))); root.append(wrap);
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
    ${m.contest?`<div class="r-meta" style="margin-top:6px">Contest: ${esc(m.contest)}</div>`:""}`;
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

/* searchable single-select picker. onPick(name). markFn optional to flag priority items */
function openPicker(title, names, onPick, refKind, markFn){
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
      const textCol = el("div",{style:"flex:1;min-width:0"},
        el("div",{class:"pi-title"}, n + (marked?"  ★":"")),
        refKind==="move"? pickMoveSub(n) : refKind==="species"? pickSpeciesSub(n) : "");
      const item = refKind==="species"
        ? el("div",{class:"pickitem",style:"display:flex;gap:10px;align-items:center"}, monSprite(n,false,"s-xs"), textCol)
        : el("div",{class:"pickitem"}, textCol);
      item.addEventListener("click",()=>{ onPick(n); closeModal(); });
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
async function fetchRoster(){
  const { data, error } = await cloud.client.from("sheets").select("*").eq("campaign", cloud.campaign);
  if(error) throw error;
  cloud.byId = {};
  (data||[]).forEach(r => { r.data = migrateChar(r.data, r.id); cloud.byId[r.id] = r; });
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
function onRealtime(payload){
  const type = payload.eventType || payload.type;
  if(type==="DELETE"){
    const id = payload.old?.id; if(!id) return;
    delete cloud.byId[id];
    if(cloud.activeId===id) cloud.activeId = Object.keys(cloud.byId)[0] || null;
    softRender(); return;
  }
  const row = payload.new; if(!row) return;
  row.data = migrateChar(row.data, row.id);
  const echo = row.id===cloud.activeId && (Date.now()-cloud.lastSaveTs < 2500);
  cloud.byId[row.id] = row;
  if(echo){ refreshCharSelect(); return; }
  const typing = ["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
  if(row.id===cloud.activeId && typing){ refreshCharSelect(); return; }  // don't yank focus
  softRender();
}
function softRender(){ updateCloudButton(); render(); }
function cacheCloud(){ try{ localStorage.setItem("ptu_cloud_cache_"+cloud.campaign, JSON.stringify(Object.values(cloud.byId))); }catch(e){} }
function cloudSave(){
  const row = cloud.byId[cloud.activeId]; if(!row || !canEdit(row)) return;
  row.updated_at = new Date().toISOString();
  row.name = row.data?.name || "";
  cacheCloud();
  clearTimeout(cloud.saveTimer);
  cloud.saveTimer = setTimeout(async ()=>{
    cloud.lastSaveTs = Date.now();
    const { error } = await cloud.client.from("sheets").upsert({
      id:row.id, campaign:cloud.campaign, owner_id:row.owner_id, owner_name:row.owner_name,
      name:row.name, data:row.data, updated_at:row.updated_at,
    });
    if(error){ console.error(error); toast("⚠ Cloud save failed"); }
  }, 500);
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
    const roster = el("div",{class:"reflist",style:"margin-top:10px"});
    Object.values(cloud.byId).sort((a,b)=>(a.owner_name||"").localeCompare(b.owner_name||"")).forEach(r=>{
      roster.append(el("div",{class:"refitem",style:"cursor:pointer",onclick:()=>{ cloud.activeId=r.id; openMon=null; closeModal(); switchTab("trainer"); }},
        el("div",{class:"r-title"}, r.data?.name||"(unnamed)"),
        el("div",{class:"r-meta"}, `${r.owner_name||"?"}${r.owner_id===cloud.userId?" (you)":""} · ${(r.data?.pokemon?.length)||0} Pokémon`)));
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

/* register service worker when hosted (ignored on file://) */
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}
