# Foundations

[← LEDGER](LEDGER.md) · generated from `FOUNDATIONS` in `tools/automation-audit/audit.py` — edit it there. Line numbers were right on 2026-09-15; grep the names if they have drifted.

<a id="found-01"></a>
## `found-01` — Move-CS parser coverage

**State:** ✔ done — app.js?v=545: CS_PATTERNS 4→15 shapes + csNormalize (book typos) + all-stats/gain-lose/chain forms; 73 more Moves parse, 0 regressions vs the 110 already parsed. Left for the moves batches (not sentence shapes): swaps/copies/resets (Psych Up, Heart/Guard/Power Swap, Topsy-Turvy, Haze, Clear Smog, Spectral Thief, Baton Pass), DB-by-CS (Power Trip, Stored Power, Punishment, Behemoth x2, Dynamax Cannon), chosen-stat (Spicy Extract, Torch Song, Mystical Power), hazard (Sticky Web), 'instead' alternatives (Toxic Threads 2nd sentence).

**Unlocks:** moves: Combat Stages theme (moves-* 'Combat Stages'); every Ability/Feature that says 'raise … Combat Stage'

`CS_PATTERNS` / `moveCSEffects` (~app.js:20105-20165) miss shapes like Calm Mind's "Raise the user's Special Attack 1 Combat Stage and raise the user's Special Defense 1 Combat Stage". Add the missing sentence shapes; done when the harness finds no Move whose text has a CS change and `moveCSEffects` returns []. Keep direction from the VERB, not the sign.

<a id="found-02"></a>
## `found-02` — Move effects land on the target

**State:** ✔ done — moveStatusEffects/moveStatusLive parse 186 Moves (Effect Range, always-on, even rolls, user-side, durations) through the roll's real thresholds (Serene Grace/Frostbite/Firebrand/Sheer Force); moveStatusNode = banner + Apply self / GM picker / FOE_FX statusfx; moveHitFx rides target statuses+CS into attackTargetWidget + feed atk.fx (per target, skipped on x0/down, undoable); inflictStatus = Type/Veil/Feature immunity; fxStatus routed through it; Simulator uses it. Not parsed on purpose: Disabled (needs a Move), counter effects on the attacker (Beak Blast, Baneful Bunker, Silk Trap), numbered/d6 choices (Last Respects, Encore, Fickle Beam), grapple-gated Octolock, Ghost Curse

**Unlocks:** moves: Status afflictions theme (~110), target-CS clauses, Flinch

Effect-Range statuses are only announced (`statusHitFromText` banner, ~app.js:22189 and 9257) and "The target is Confused." (always-on) is not even announced. Carry the triggered statuses + target CS entries into `attackTargetWidget` (~45638, GM) and the FOE_FX declare path (players, see project-foe-fx memory), apply via `toggleStatus` so `statusImmunityFor` + STATUS_DEFS type immunities are honoured.

<a id="found-03"></a>
## `found-03` — Status immunity registry for Abilities

**State:** ✔ done — app.js?v=548: STATUS_IMMUNE_ABILITIES (20 printings, exact-name like STATUS_VEILS, errata fallback) inside statusImmunityFor (trainer-only bail dropped; Features still Trainer-only); statusBlockFor(o,key,opts) adds TERRAIN_STATUS_IMMUNITY (Electric: Sleep, Rugged: Confused/Enraged/Infatuated — only surely-grounded creatures with a token); opts.mold (attacker Mold Breaker) skips Veils + Defensive rows, Neutralizing Gas skips Defensive rows; Vortex riders checked one by one (Ghost not Trapped). Routed through the funnel: Prime Fury, syncHeldStatuses (Flame/Toxic Orb), Big Mushroom, food inflict + disliked Taste, sweepMapAuras (Pressure's Suppressed), simInflict. statusChipImmunity marks ⃠ + reason on sheet / Encounter / Map chips; toggleStatus refuses Ability immunities like Feature ones. Hand chips on Encounter/Map stay the GM's (marked, not refused).

**Unlocks:** abilities: Status afflictions / Type changes & immunities themes (Insomnia, Limber, Water Veil, Own Tempo, Oblivious, Immunity, Magma Armor, Vital Spirit, Leaf Guard, Comatose, Pastel Veil, Sweet Veil …)

`FEATURE_STATUS_IMMUNITY` / `statusImmunityFor` (~app.js:731) only know Trainer Features and bail on non-trainers; `STATUS_VEILS` (~35869) is a separate path. Make one `STATUS_IMMUNE_ABILITIES` registry (with weather/terrain conditions) that every status push consults — find the ~20 push sites with `grep -n "statuses.push\|statuses = \["`. found-02 already built the funnel: `inflictStatus` → `statusBlockFor` (STATUS_DEFS Type immunity + Veils + `statusImmunityFor`) is what every Move/FOE_FX application uses — extend `statusImmunityFor` (drop its trainer-only bail) and route the remaining push sites through `inflictStatus`.

<a id="found-04"></a>
## `found-04` — HP effects of Moves (drain, recoil, self-heal, sacrifice)

**State:** ✔ done — app.js?v=553: moveHPEffects parses drain / Recoil keyword / self-heal / cost / miss-cost / target heal / sacrifice off the rules text — 59 Moves, 70 clauses. moveHPNode = the 🩸 Hit Points card on both roll modals (Pokémon + Trainer), appended after the damage roll. Every press goes through ownerHPChange = damageHealRow's pipeline (Temp HP soak, Injuries, KO/Death, Shields Down, Schooling, Usurper mirror); 'cannot be prevented in any way' passes raw so Temp HP doesn't soak it. Drain/Recoil are a fraction of the damage ACTUALLY dealt: the box is pre-filled with the rolled total and attackTargetWidget's new onDealt callback replaces it with the real post-defence figure. Big Root doubles a drain; Rock Head / Magic Guard zero the Recoil. The weather family (Synthesis, Moonlight, Morning Sun, Shore Up) offers only the fraction the sky in play calls for (ownerWeather). Conditional clauses keep their condition as a label rather than being dropped (Curse's Ghost half, Swallow's three Stockpile payouts, Floral Healing on Grassy Terrain). Ally heals use allyTargets + branchTargetDialog; Healing Wish / Lunar Dance open openSacrificeHeal. NOT parsed on purpose: a Tick of HP (Aqua Ring, Salt Cure — the ±Tick buttons already do it), 'equal to the amount the target lost' (Leech Seed) and 'the higher of the target's Attack' (Strength Sap), which need a number no sentence carries.

**Unlocks:** moves: Healing, drain, recoil & HP theme (~75); Abilities/Features that heal on a trigger

After the damage roll, offer one-press buttons: drain (half of the damage actually dealt, after the target's defences — take it from `attackTargetWidget`'s result), recoil (⅓ / ¼ of dealt), self-heal (½ max via `HP_FRACTIONS`, weather-adjusted Synthesis family), Healing Wish (`SACRIFICE_HEAL_MOVES`). Route through the same HP pipeline as `damageHealRow` (Temp HP, Injuries, KO).

<a id="found-05"></a>
## `found-05` — Field-setting Moves (weather, terrain, rooms)

**State:** ✔ done — app.js?v=554: FIELD_SETTER_MOVES (22 Moves) + moveFieldEffects/moveFieldNode = the 'The field' card on both roll modals; GM's press flips the Map's own switch (setMapWeather/setMapTerrain/toggleMapRoom), a player's announces it. New Snowy weather (typeDR -> weatherDR, folded into buffDR). The four Rooms are a real map-meta state (map.rooms, ROOM_DEFS, stackable GM toggles + roomPanel + player badges): Trick Room reverses initiativeList, Gravity grounds everyone (surelyGrounded) + gives Ground-Type Moves Thousand Arrows' rule (moveTargetRules) + a flat +2 Accuracy, Wonder Room swaps eff.def/eff.spdef in pokeDerived, Magic Room empties heldFxList.

**Unlocks:** moves: Weather & Terrain theme; Trick Room / Gravity / Wonder Room / Magic Room if they get a field state

Copy the `WEATHER_SETTER_ABILITIES` → `setMapWeather` / `toggleMapTerrain` button (~app.js:2845, 47450) onto the Move roll for Sunny Day, Rain Dance, Sandstorm, Hail/Snowscape, the four Terrain Moves; decide whether rooms get a map-meta flag.

<a id="found-06"></a>
## `found-06` — Hazard-setting Moves

**State:** ✔ done — app.js?v=555: dropHazardsAt / hazardsNear / clearHazardsNear / hazardEntryApply + HAZARD_SETTER_MOVES (17 Moves) and the hazard card on both roll modals; HAZARDS rows carry printed rules + on-entry effects; Slick Hazard and Barrier segment added; openHazardMenu gained the walked-into-it applier

**Unlocks:** moves: Hazards & field markers theme (Spikes, Toxic Spikes, Stealth Rock, Sticky Web, …)

Reuse `dropStealthRockBy(token,map)` / `HAZARDS` (~app.js:44305) so the roll places the markers; hazard effects on entering squares may already exist — check `openHazardMenu` first.

<a id="found-07"></a>
## `found-07` — Push / pull / shift / swap tokens on the Map

**State:** ✔ done — app.js?v=578: forcedMove(map,token,dir,metres) walks a token square by square (diagonals 1/2/1/2), stops at Blocking Terrain, walls, arena edge, creatures and reports why; pushImmunityFor (Suction Cups, Sumo Stance, Guard Dog, Ingrain); weightClassOf (+Heavy Metal/Sumo Stance); movePushEffects parses 22 Moves (X m, minus Weight Class, any/chosen direction, may push up to, Blast edge, Beckon/Roar shifts); movePushNode = the Forced movement card on both roll modals (GM moves the token, player announces). Not done: Ability pushes (Bully, Gore, Poison Puppeteer, Lingering Aroma, Magnet Pull), Push Maneuver Features, Stuck/Trapped interplay, Sky Drop/Teleport

**Unlocks:** moves: Movement, push & switching theme (~70); Push Maneuver Features (Attack Mastery …); Abilities like Suction Cups

One `forcedMove(token, dir, metres, {ignoreStuck})` on the Map with a target + direction picker from the roll; respect Stuck/Slowed/Heavy/Suction Cups, stop at walls/tokens. Players declare via FOE_FX.

<a id="found-08"></a>
## `found-08` — Timed & multi-turn effects

**State:** ✔ done — app.js?v=579: o.pending list ticked by the Map's ▶ (tickPendingTurns beside tickTypeModTurns): setup Moves (parsed 'Set-Up Effect … Resolution Effect', 16 Moves) come due at the START of the owner's next turn, delayed hits (Future Sight, Doom Desire, Wish) at the END; moveTimedNode card on both roll modals, pendingControl rows + ⏳ chips (teraTag), semi-invulnerable label (Dig/Fly/Dive/Shadow/Phantom Force/Sky Attack/Sky Drop), Solar Beam/Blade skip when Sunny, manual ▶ Due now off-board, cleared by endSceneTypeState. Not done: Recharge/Exhaust (no such Moves in data), 'until end of next turn' clauses outside statuses/buffs, semi-invulnerability blocking targeting, Sky Drop's carried target, Acid Armor Liquefied state

**Unlocks:** moves: Set-Up, charge & multi-turn theme; 'until the end of your next turn' clauses everywhere

Buffs already expire on turns (`isTurnDurBuff` / `expireTurnBuffs` ~app.js:16047, `setInitiativeTurn` ~42743, `tickTypeModTurns` ~1984). Generalise into a per-creature pending-effect list: Set-Up → Resolution next turn, Recharge/Exhaust, charge turns (Solar Beam, Sky Attack), Semi-invulnerable (Dig/Fly/Shadow Force).

<a id="found-09"></a>
## `found-09` — Ability trigger hooks

**State:** ✔ done — app.js?v=580: ABILITY_TURN_HOOKS registry + fireAbilityHooks/runAbilityTurnHooks called by the Map's ▶ (turnEnd for the creature that just finished, turnStart for the one starting). Rows: Speed Boost, Deep Sleep, Hydration, Truant, Bad Dreams, Hunger Switch (announce). Regenerator/Moody/Leftovers stay on their existing paths. Not done: switch-in / on-hit / on-KO points (add fireAbilityHooks call sites at recall/attackTargetWidget/applyAutoKO), Poison Heal (needs its Daily activation), reaction/Interrupt Abilities

**Unlocks:** abilities: Interrupts, reactions & priority theme; switch-in / turn-start / on-hit / on-KO Abilities

One `ABILITY_HOOKS` dispatch called from the turn engine (`applyTurnStartRegen` ~42659), the apply-hit pipeline (`attackTargetWidget`), switch-in and KO. Migrate the ad-hoc ones (Speed Boost, Moody, Regenerator …) so new rows are data, not code.

<a id="found-10"></a>
## `found-10` — Coats, screens & protection as buffs

**State:** ✔ done — app.js?v=581: o.coats state (MOVE_COATS, 17 Moves) — resist/vuln Type steps folded into defenseTypeMods and spent by the first hit of that Type; heal coats (Aqua Ring, Ingrain) tick at turn start via fireAbilityHooks; Substitute pool absorbs hits; Endure; Shields (Protect, Detect, Obstruct, Spiky Shield, King's Shield, Baneful Bunker, Burning Bulwark, Silk Trap, Mat Block, Wide Guard) void the next 💥 Apply hit + name the riposte; applyTokenDamage→coatsOnHit, undo snapshots coats, moveCoatNode card, ⏳/🧥 rows, foeFxDialog fx 'coat'. Blessings stay the shared table counters (not coats). Not done: Double Team activations, Magic Coat, Powder, Quick/Crafty Shield (priority/Status-only triggers), Shed Tail, riposte auto-apply (needs the attacker), Blessing effects on damage

**Unlocks:** moves: Coats, barriers & Blessings theme (Light Screen, Reflect, Safeguard, Mist, Aqua Ring, Protect family)

Model them as PTU_BUFFS entries (~app.js:15828) with DR / immunity / regen mods read by `buffDR` and `defenseTypeMods`; Protect family = a one-shot 'next attack misses' charge like `consumeDamageBuffs`.

<a id="found-11"></a>
## `found-11` — Move-lock statuses (Disable, Encore, Taunt, Torment, Imprison)

**State:** ✔ done — app.js?v=582: o.locks (MOVE_LOCKS) — Disable/Spite/Eerie Spell name a Move, Throat Chop = no Sonic Moves for 2 turns (counted down on ▶), Imprison captures the caster's known Moves, Embargo empties heldFxList, Heal Block zeroes ownerHeal/ownerHPChange gains; openMoveRoll refuses (GM 🔓 waives), move list shows 🔒 Locked, 🔒 chips + ✖ rows, moveLockNode + FOE_FX.lock, cleared by endSceneTypeState. Taunt/Torment/Encore/Confuse Ray were already statuses (found-02). Not done: Heal Block ending on Take a Breather/switch-out, Cursed Body / Mummy-style Ability triggers, Temp HP from non-heal sources, Trainer-side move locks

**Unlocks:** moves: Move control & copying theme; Cursed Body, Mummy-style Abilities

Store the locked Move on the creature, grey it out in ⚔ Battle move lists and refuse the roll; clear with `clearSceneStatuses`.

<a id="found-12"></a>
## `found-12` — Parameterised Feature families

**State:** ✔ done — app.js?v=583: STAT_FAMILY table + statFamilyStats/statFamilyRow on the Ace Trainer card — [Stat] Link (+1 CS if at default or lower, 1 AP), [Stat] Embodiment (one of two Abilities for the Scene via embodyAbility/clearEmbodiment, replaced by the next, removed on rest), Defense Mastery (+5 DR buff), six Stratagem stances in FEATURE_MODES (Bind 2 AP): statStratagemBonus folds Attack crit range (melee) and Special Attack Effect Range (ranged) into the roll, +CS max 3; Defense/SpDef Save bonuses and Speed Movement are shown on the card. Type Ace per-type chains were already done (TYPE_ACE_BRANCH); Style Expert (one Feature) left. Not done: Speed Stratagem Movement on the Map budget, Attack/SpAtk/SpDef/Speed Mastery effects (printed), Save-check auto bonus

**Unlocks:** features: Stat Ace ([Stat] Link / Embodiment / Mastery / Stratagem ×5), Type Ace per-type chains, Style Expert per-Contest-stat Features

These are the same Feature five or eighteen times with one word changed. Implement each family ONCE keyed by the varying word (see `STAT_ACE_FEATURES` ~app.js:540 and `TYPE_ACE_BRANCH` ~27617 for the existing pattern).

