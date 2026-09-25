/* Automation audit — engine tags.
   Runs INSIDE the app page (it calls the app's own parsers), so it sees exactly what the generic
   engines recognise without re-implementing a single regex. Load it from the console or the preview:

     (0,eval)(await (await fetch("tools/automation-audit/engine-tags.js?"+Date.now())).text());
     copy(JSON.stringify(auditEngineTags()))          // DevTools; or read window.__auditTags

   Output: { moves:{name:[tag…]}, abilities:{…}, features:{…} }. tools/automation-audit/audit.py
   reads it from docs/automation/engine-tags.json. Tags only say "an engine picked something up",
   never "fully automated" — the ledger decides that together with the static name scan. */
function auditEngineTags(){
  const safe = (f, d) => { try { return f(); } catch(e){ return d; } };
  const out = { moves:{}, abilities:{}, features:{} };

  /* ---------------- Moves ---------------- */
  for(const m of D.moves){
    if(!m || !m.name || m.name === "Name") continue;
    const tags = [];
    const cs = safe(()=>moveCSEffects(m), null);
    if(cs && (cs.length || (cs.self && cs.self.length) || (cs.target && cs.target.length))) tags.push("cs");
    const thr = safe(()=>effectThresholds(m.effect), []);
    if(thr.length){
      tags.push("range");
      if(thr.some(t => safe(()=>statusHitFromText(t.text), null))) tags.push("range-status");
      if(thr.some(t => /critical/i.test(t.text))) tags.push("range-crit");
      if(thr.some(t => /flinch/i.test(t.text))) tags.push("range-flinch");
    }
    if(safe(()=>moveRandomStatus(m), null)) tags.push("rand-status");
    // found-02: Afflictions parsed out of the text and applied to the target / user (moveStatusEffects)
    const ms = safe(()=>moveStatusEffects(m), []);
    if(ms.length){
      tags.push("status-fx");
      if(ms.some(e => e.range == null && !e.even)) tags.push("status-always");
      if(ms.some(e => e.who === "user")) tags.push("status-self");
    }
    // found-04: drain / Recoil / self-heal / HP cost clauses (moveHPEffects -> the HP card)
    const hp = safe(()=>moveHPEffects(m), []);
    if(hp && hp.length) tags.push("hp-fx");
    // found-05: this Move sets or clears the Weather, the Terrain or one of the Rooms
    if(safe(()=>moveFieldEffects(m), null)) tags.push("field-fx");
    if(safe(()=>moveHazardEffects(m), null)) tags.push("hazard-fx");
    if(safe(()=>isOHKOMove(m), false)) tags.push("ohko");
    const sp = safe(()=>specialMoveInfo(m, null), null);
    if(sp && sp.kind) tags.push("special:"+sp.kind);
    if(safe(()=>weightMoveInfo(m), null)) tags.push("weight");
    if(safe(()=>typeModMove(m), null)) tags.push("typemod");
    if(safe(()=>conversionKind(m), null)) tags.push("conversion");
    if(safe(()=>movePicksOwnType(m), false)) tags.push("picks-type");
    if(safe(()=>fieldMoveType(m), null)) tags.push("field-type");
    if(safe(()=>isFiveStrike(m), false)) tags.push("five-strike");
    if(safe(()=>isDoubleStrike(m), false)) tags.push("double-strike");
    if(safe(()=>alwaysCrits(m), false)) tags.push("always-crit");
    if(safe(()=>moveDefPierce(m), null)) tags.push("def-pierce");
    const tr = safe(()=>moveTargetRules(m, null), null);
    if(tr && (Array.isArray(tr) ? tr.length : Object.keys(tr).length)) tags.push("target-rules");
    if(safe(()=>isBlessingMove(m), false)) tags.push("blessing");
    if(safe(()=>isVersatileMove(m), false)) tags.push("versatile");
    if(safe(()=>powderImmuneNote(m), null)) tags.push("powder");
    if(typeof ITEM_MOVES === "object" && ITEM_MOVES[m.name]) tags.push("item-move");
    out.moves[m.name] = tags;
  }

  /* ---------------- Abilities ---------------- */
  for(const a of D.abilities){
    if(!a || !a.name) continue;
    const tags = [];
    if(safe(()=>abilityAutoNote(a.name), null)) tags.push("auto-note");
    const rm = safe(()=>abilityRiderMoves(a), null);
    if(rm && (rm.size || rm.length)) tags.push("move-rider");
    const k = a.name.toLowerCase();
    if(typeof ABILITY_REMEMBER === "object" && ABILITY_REMEMBER[k]) tags.push(ABILITY_REMEMBER[k][1] ? "remember-auto" : "remember-only");
    out.abilities[a.name] = tags;
  }

  /* ---------------- Features ---------------- */
  const riders = new Set(safe(()=>featureRiders(), []).map(r => featKey(r.feat)));
  const groups = new Set(safe(()=>groupRiders(), []).map(r => featKey(r.feat || r.name || "")));
  const modes  = new Set((typeof FEATURE_MODES !== "undefined" ? FEATURE_MODES : []).map(x => featKey(x.feat || x.name || x.key || "")));
  for(const f of D.features){
    if(!f || !f.name) continue;
    const tags = [], k = featKey(f.name);
    if(riders.has(k)) tags.push("move-rider");
    if(groups.has(k)) tags.push("group-rider");
    if(modes.has(k)) tags.push("mode");
    if(safe(()=>featureActionTypes(f), []).length) tags.push("action-surfaced");
    if(safe(()=>featureGrantsFeatureNames(f), []).length) tags.push("grants-feature");
    if(safe(()=>featureStatTags(f), []).length) tags.push("stat-tag");
    if(safe(()=>featureAutoNote(f.name), null)) tags.push("auto-note");
    if(typeof FEATURE_REMEMBER === "object" && FEATURE_REMEMBER[k]) tags.push("remember-only");
    out.features[f.name] = tags;
  }
  /* which Trainer Class each Feature belongs to, by the app's own (alias-aware, transitive) grouping —
     the ledger batches Features class by class, since a class is what one card automates */
  out.featureClass = {};
  for(const c of (D.classes || [])){
    for(const f of safe(()=>featuresForClass(c.name), [])){
      const n = typeof f === "string" ? f : f && f.name;
      if(n) (out.featureClass[n] = out.featureClass[n] || []).includes(c.name) || out.featureClass[n].push(c.name);
    }
  }
  /* catalogs that live in app.js rather than data/*.json — exported with their text so audit.py can
     scan them like any other category */
  const gift = (x, kind, extra) => ({ name:x.name, kind, freq:x.freq || "", prereq:x.prereq || "",
    effect:[x.effect || "", x.note || "", extra || ""].filter(Boolean).join("\n"),
    action: !!safe(()=>giftActionDef(x), null) });
  out.catalogs = { gifts: [
    ...GIFT_CATALOG.map(g => gift(g, "gift:"+g.tier+" · "+g.group)),
    ...GENERAL_GIFTS.map(g => gift(g, "general gift")),
    ...MESSIAH_FEATURES.map(g => gift(g, "messiah")),
    ...SIGNER_FEATURES.map(g => gift(g, "signer")),
    ...USURPER_FEATURES.map(g => gift(g, "usurper")),
    ...BRANDS.map(g => gift(g, "brand")),
    ...BLESSINGS.map(b => ({ name:b.name, kind:"blessing", freq:"", prereq:b.prereq || "", action:false,
      effect:`Messiah (${b.messiah?.freq||""}): ${b.messiah?.text||""}\nSigner (${b.signer?.freq||""}): ${b.signer?.text||""}` })),
  ]};
  window.__auditTags = out;
  return out;
}
