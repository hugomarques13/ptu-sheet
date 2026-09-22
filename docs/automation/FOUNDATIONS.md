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

**State:** open

**Unlocks:** moves: Weather & Terrain theme; Trick Room / Gravity / Wonder Room / Magic Room if they get a field state

Copy the `WEATHER_SETTER_ABILITIES` → `setMapWeather` / `toggleMapTerrain` button (~app.js:2845, 47450) onto the Move roll for Sunny Day, Rain Dance, Sandstorm, Hail/Snowscape, the four Terrain Moves; decide whether rooms get a map-meta flag.

<a id="found-06"></a>
## `found-06` — Hazard-setting Moves

**State:** open

**Unlocks:** moves: Hazards & field markers theme (Spikes, Toxic Spikes, Stealth Rock, Sticky Web, …)

Reuse `dropStealthRockBy(token,map)` / `HAZARDS` (~app.js:44305) so the roll places the markers; hazard effects on entering squares may already exist — check `openHazardMenu` first.

<a id="found-07"></a>
## `found-07` — Push / pull / shift / swap tokens on the Map

**State:** open

**Unlocks:** moves: Movement, push & switching theme (~70); Push Maneuver Features (Attack Mastery …); Abilities like Suction Cups

One `forcedMove(token, dir, metres, {ignoreStuck})` on the Map with a target + direction picker from the roll; respect Stuck/Slowed/Heavy/Suction Cups, stop at walls/tokens. Players declare via FOE_FX.

<a id="found-08"></a>
## `found-08` — Timed & multi-turn effects

**State:** open

**Unlocks:** moves: Set-Up, charge & multi-turn theme; 'until the end of your next turn' clauses everywhere

Buffs already expire on turns (`isTurnDurBuff` / `expireTurnBuffs` ~app.js:16047, `setInitiativeTurn` ~42743, `tickTypeModTurns` ~1984). Generalise into a per-creature pending-effect list: Set-Up → Resolution next turn, Recharge/Exhaust, charge turns (Solar Beam, Sky Attack), Semi-invulnerable (Dig/Fly/Shadow Force).

<a id="found-09"></a>
## `found-09` — Ability trigger hooks

**State:** open

**Unlocks:** abilities: Interrupts, reactions & priority theme; switch-in / turn-start / on-hit / on-KO Abilities

One `ABILITY_HOOKS` dispatch called from the turn engine (`applyTurnStartRegen` ~42659), the apply-hit pipeline (`attackTargetWidget`), switch-in and KO. Migrate the ad-hoc ones (Speed Boost, Moody, Regenerator …) so new rows are data, not code.

<a id="found-10"></a>
## `found-10` — Coats, screens & protection as buffs

**State:** open

**Unlocks:** moves: Coats, barriers & Blessings theme (Light Screen, Reflect, Safeguard, Mist, Aqua Ring, Protect family)

Model them as PTU_BUFFS entries (~app.js:15828) with DR / immunity / regen mods read by `buffDR` and `defenseTypeMods`; Protect family = a one-shot 'next attack misses' charge like `consumeDamageBuffs`.

<a id="found-11"></a>
## `found-11` — Move-lock statuses (Disable, Encore, Taunt, Torment, Imprison)

**State:** open

**Unlocks:** moves: Move control & copying theme; Cursed Body, Mummy-style Abilities

Store the locked Move on the creature, grey it out in ⚔ Battle move lists and refuse the roll; clear with `clearSceneStatuses`.

<a id="found-12"></a>
## `found-12` — Parameterised Feature families

**State:** open

**Unlocks:** features: Stat Ace ([Stat] Link / Embodiment / Mastery / Stratagem ×5), Type Ace per-type chains, Style Expert per-Contest-stat Features

These are the same Feature five or eighteen times with one word changed. Implement each family ONCE keyed by the varying word (see `STAT_ACE_FEATURES` ~app.js:540 and `TYPE_ACE_BRANCH` ~27617 for the existing pattern).

