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
    gender:"", shiny:false, level:5, xp:0, loyalty:0,
    nature: "Hardy", ability:"", heldItem:"",
    stats, injuries:0, currentHP:null, tempHP:0,
    moves:[], tutorPoints:0, notes:"",
  };
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw); if (s.characters?.length) return s; }
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
  if (currentTab==="reference") renderReference();
  applyReadonlyLock();
}
/* lock the sheet views when viewing a cloud character you can't edit */
function applyReadonlyLock(){
  const lock = mode==="cloud" && cloud.activeId && !canEditActive();
  $$(".view").forEach(v => v.classList.toggle("ro", !!lock && v.id!=="view-reference"));
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

/* generic chip list backed by a reference name-list, with a searchable picker */
function listCard(title, path, allNames, refKind){
  const arr = getByPath(path) || [];
  const card = el("div",{class:"card"}, el("h3",{},title,
    el("button",{class:"linkbtn h-act", onclick:()=>openPicker(title, allNames, name=>{
      const a = getByPath(path);
      if(!a.includes(name)){ a.push(name); save(); render(); }
    }, refKind)}, "+ add")));
  const chips = el("div",{class:"chips"});
  if(!arr.length) chips.append(el("span",{class:"muted small"},"none yet"));
  arr.forEach((name,idx) => {
    chips.append(el("span",{class:"chip"},
      el("span",{class:"linkbtn",style:"color:inherit;text-decoration:none",
        onclick:()=>openRefDetail(refKind, name)}, name),
      el("span",{class:"x", title:"remove", onclick:()=>{ arr.splice(idx,1); save(); render(); }}, "×")));
  });
  card.append(chips);
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
  const party = el("div",{class:"party"});
  c.pokemon.forEach(p => party.append(monCard(p)));
  if(!c.pokemon.length) party.append(el("div",{class:"addcard", onclick:()=>addPokemon()}, "＋ Add your first Pokémon"));
  root.append(party);
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
        const clone = {...newPokemon(mon.species), ...mon, id: uid()}; // fresh id, keep fields
        // ensure stats structure
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
    if(sp){ p.ability = sp.abilities.basic[0] || ""; }
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
    el("div",{class:"mh-name"}, p.nickname || sp?.name || "Unknown"),
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
  return card;
}

function renderMonPlay(root, p, sp){
  /* ability */
  const abc = el("div",{class:"card"}, el("h3",{},"Ability"));
  if(sp){
    const opts = [["","— choose —"]]
      .concat(sp.abilities.basic.map(a=>[a,`${a} (Basic)`]))
      .concat(sp.abilities.advanced.map(a=>[a,`${a} (Advanced)`]))
      .concat(sp.abilities.high.map(a=>[a,`${a} (High)`]));
    const sel = el("select");
    opts.forEach(([v,txt])=>sel.append(el("option",{value:v,selected:p.ability===v},txt)));
    const abd = el("div",{id:"abDetail",class:"small",style:"margin-top:8px"});
    const showAb = () => { const ab=abilityByName.get((p.ability||"").toLowerCase()); abd.innerHTML = ab?abilityText(ab):""; };
    sel.addEventListener("change",()=>{p.ability=sel.value;save();showAb();});
    abc.append(sel, abd); showAb();
  } else abc.append(field("Ability","",{value:p.ability,onchange:v=>{p.ability=v;save();}}));
  root.append(abc);

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
    field("Nickname","",{value:p.nickname,onchange:v=>{p.nickname=v;save();refreshMon(p);}}),
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
  if(!p.ability || !allAbilityNames(sp).includes(p.ability)) p.ability = sp.abilities.basic[0]||"";
  save(); refreshMon(p);
}
function allAbilityNames(sp){ return [...sp.abilities.basic,...sp.abilities.advanced,...sp.abilities.high]; }
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
function movesCard(p, sp){
  const card = el("div",{class:"card"}, el("h3",{},`Moves (${p.moves.length})`,
    el("button",{class:"linkbtn h-act",onclick:()=>openMovePicker(p,sp)},"+ add move")));
  if(!p.moves.length) card.append(el("span",{class:"muted small"},"no moves selected"));
  p.moves.forEach((mn,i)=>{
    const m = moveByName.get(mn.toLowerCase());
    const slot = el("div",{class:"moveslot"});
    const info = el("div",{},
      el("div",{style:"font-weight:700"}, m?`${m.name} `:mn, m?el("span",{html:typeBadge(m.type||"Normal")}):""),
      el("div",{class:"ms-info"}, m? moveLineShort(m) : "custom / not in database"));
    slot.append(info);
    const acts = el("div",{class:"inline"});
    if(m) acts.append(el("button",{class:"linkbtn",onclick:()=>openRefDetail("move",m.name)},"info"));
    acts.append(el("button",{class:"linkbtn",title:"remove",onclick:()=>{p.moves.splice(i,1);save();refreshMon(p);}},"×"));
    slot.append(acts);
    card.append(slot);
  });
  return card;
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
  // gather move name pool: species natural moves first, then all
  let pool = [];
  if(sp){
    const nm = new Set();
    sp.moves.levelup.forEach(m=>nm.add(m.name));
    sp.moves.egg.forEach(m=>nm.add(m));
    sp.moves.tutor.forEach(m=>nm.add(m.replace(/\s*\(N\)/,"")));
    sp.moves.tmhm.forEach(m=>nm.add(m.replace(/^\w+\s*/,"").replace(/^\d+\s*/,"")));
    pool = [...nm];
  }
  const allMoveNames = D.moves.map(m=>m.name);
  // build combined, species pool marked
  const speciesSet = new Set(pool.map(x=>x.toLowerCase()));
  const names = [...new Set([...pool, ...allMoveNames])];
  openPicker(`Add move${sp?" — "+sp.name+"'s list on top":""}`, names, name=>{
    if(!p.moves.includes(name)){ p.moves.push(name); save(); refreshMon(p); }
  }, "move", n=>speciesSet.has(n.toLowerCase()));
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
function openRefDetail(kind, name){
  if(kind==="species") return speciesModal(getSpecies(name));
  if(kind==="move")    return infoModal(name, moveDetailHTML(moveByName.get(name.toLowerCase()), name));
  if(kind==="ability") { const a=abilityByName.get(name.toLowerCase()); return infoModal(name, a?abilityText(a):"Not in database."); }
  if(kind==="class")   { const c=D.classes.find(x=>x.name===name); return infoModal(name, c?`<b>${esc(c.mechanic||"")}</b><div class="r-body">${esc(c.effect||"")}</div>`:"—"); }
  if(kind==="edge")    { const e=D.edges.find(x=>x.name===name); return infoModal(name, e?`${e.prerequisites?`<div class="r-meta">Prereq: ${esc(e.prerequisites)}</div>`:""}<div class="r-body">${esc(e.effect||"")}</div>`:"—"); }
  if(kind==="feature") { const f=D.features.find(x=>x.name===name); return infoModal(name, f?`<div class="r-meta">${esc(f.category||"")} · ${esc(f.frequency||"")}</div>${f.prerequisites?`<div class="r-meta">Prereq: ${esc(f.prerequisites)}</div>`:""}<div class="r-body">${esc(f.effect||"")}</div>`:"—"); }
  infoModal(name, "—");
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

function initCloud(){
  if(!cloudConfigured()) return;
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
