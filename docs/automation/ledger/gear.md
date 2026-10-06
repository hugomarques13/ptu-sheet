# gear — automation ledger

[← LEDGER](../LEDGER.md)

<a id="gear-01"></a>
## `gear-01` — Pokémon Item (1/3)

P1 · 3 open of 30 · open

- ✅ **Big Root** — `auto` · P1 (player:Lázaro) · themes: heal, swap
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - HP stealing moves restore double HP. Cannot be used by Trainers.

- ✅ **Contest Accessory** — `auto` · P1 (player:Lysgd) · themes: social
  - _Pokémon Item · $$1500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user rolls +2d6 during the Introduction Stage of a Contest. Cannot be used by Trainers.

- ✅ **Full Incense** — `auto` · P1 (player:Handels) · themes: swap
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder gains the Stall ability. Cannot be used by Trainers.

- ✅ **King's Rock** — `auto` · P1 (player:Lázaro) · themes: swap, status
  - _Pokémon Item · $$2500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Attacks cause Flinch on a roll of 19+. This does not stack with any abilities, moves, or effects that extend flinch rate. Head Item for Trainers. Evolves Poliwhirl, Slowpoke.

- ✅ **Lax Incense** — `auto` · P1 (player:Lysgd) · themes: stat
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - +1 to all Stat Evasions. Cannot be used by Trainers.

- ✅ **Razor Claw** — `auto` · P1 (player:Lysgd) · themes: damage
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder’s damaging attacks have their Critical Hit Range extended by +1. Evolves Sneasel.

- ✅ **Rock Gem** — `auto` · P1 (player:Lázaro) · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Rock-Type attack. Off-hand or Accessory Slot Item for Trainers.

- 🟡 **Ability Shield** — `partial` · P3 · themes: swap
  - _Pokémon Item · $$1500_
  - note: no engine yet for these four held Abilities-of-items (Ability protection, once-per-Scene damage-effect immunity, Booster weather, non-Melee Melee)
  - The user's Abilities cannot be altered by effects from other Pokémon or Trainers. Off-hand Item for Trainers.

- ✅ **Beauty Fashion** — `auto` · P3 · themes: action, social
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once per Contest the holder may re-roll any 1's made when using a Beauty Move. Cannot be used by Trainers.

- 🟡 **Booster Energy** — `partial` · P3 · themes: weather, position, swap, status, action
  - _Pokémon Item · $$7500_
  - note: no engine yet for these four held Abilities-of-items (Ability protection, once-per-Scene damage-effect immunity, Booster weather, non-Melee Melee)
  - Once per Scene, the user may activate Abilities and Moves dependent on a single Weather or Terrain effect of their choice as though that effect was active. This effect lasts until the user is Fainted or switches out. Off-hand Item for Trainers.

- ✅ **Bright Powder** — `auto` · P3 · themes: damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - +2 to Speed Evasion. Cannot be used by Trainers.

- ✅ **Bug Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Bug Moves. Accessory Item for Trainers.

- ✅ **Bug Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Bug-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Choice Band** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Attack Stat is +2 Combat Stages. However, the holder is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Choice Item (Def)** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Defense Stat is +2 Combat Stages. However, the holder is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Choice Item (SDef)** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Special Defense Stat is +2 Combat Stages. However, the holder is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Choice Items** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Choice Items are tied to a Specific Stat. While worn, the default state of the Stat is +2 Combat Stages instead of 0. However, the user is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Choice Scarf** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Speed Stat is +2 Combat Stages. However, the holder is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Choice Specs** — `auto` · P3 · themes: multiturn, swap, status, cure, cs, skill, stat
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Special Attack Stat is +2 Combat Stages. However, the holder is Suppressed and cannot be cured until the end of Combat, even if the item is removed. Cannot be used by Trainers.

- ✅ **Clear Amulet** — `auto` · P3 · themes: swap, cs, skill · code: csLowerBlock:3378
  - _Pokémon Item · $$2500_
  - note: csLowerBlock refuses foe-caused Combat Stage drops for a holder (v597)
  - The user's Combat Stages may not be lowered by the effect of foes' Features, Abilities, or Moves. Status Afflictions may still alter their Combat Stages. Accessory Item for Trainers.

- ✅ **Contest Fashion** — `auto` · P3 · themes: action, stat, social
  - _Pokémon Item · $$1000_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - These Items have a chosen Contest Stat; Beauty, Cool, Cute, Smart, or Tough. When held, once per Contest, the holder may re-roll any 1s made when using a Move of the chosen Type. Cannot be used by Trainers.

- ✅ **Cool Fashion** — `auto` · P3 · themes: action, social
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once per Contest the holder may re-roll any 1's made when using a Cool Move. Cannot be used by Trainers.

- 🟡 **Covert Cloak** — `partial` · P3 · themes: heal, interrupt, swap, typing, damage, action, skill
  - _Pokémon Item · $$5000_
  - note: no engine yet for these four held Abilities-of-items (Ability protection, once-per-Scene damage-effect immunity, Booster weather, non-Melee Melee)
  - Once per Scene, when the user is hit by a damaging Move, they may become immune to all of its effects except Damage and direct Hit Point Loss. Additionally while holding this Item, the user gains a +2 bonus to Stealth checks made to remain unseen, up to a maximum bonus of +4. Accessory Item for Trainers.

- ✅ **Cute Fashion** — `auto` · P3 · themes: action, social
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once per Contest the holder may re-roll any 1's made when using a Cute Move. Cannot be used by Trainers.

- ✅ **Dark Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Dark Moves. Accessory Item for Trainers.

- ✅ **Dark Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Dark-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Dragon Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Dragon Moves. Accessory Item for Trainers.

- ✅ **Dragon Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Dragon-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Electric Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Electric Moves. Accessory Item for Trainers.

- ✅ **Electric Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Electric-Type attack. Off-hand or Accessory Slot Item for Trainers.

<a id="gear-04"></a>
## `gear-04` — Food (1/2)

P1 · 0 open of 30 · ✔ done

- ✅ **Aspear Berry** — `auto` · P1 (player:Lysgd) · themes: status, cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Freeze, Tough Poffin Ingredient. Tier 1

- ✅ **Dry Wafer** — `auto` · P1 (player:Lázaro) · themes: status, damage
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff when making a Special attack to deal +5 additional Damage. If the user prefers Dry Food, it deals +10 additional Damage instead. If the user dislikes Dry Food, they become Enraged.

- ✅ **Leppa Berry** — `auto` · P1 (player:Lysgd) · themes: heal
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Restores a Scene Move. Tier 3.

- ✅ **Pecha Berry** — `auto` · P1 (player:Lázaro) · themes: status, cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Poison, Cute Poffin Ingredient. Tier 1.

- ✅ **Pomeg Berry** — `auto` · P1 (player:Lázaro) · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers HP stat by 1 with trainer permission. Tier 3.

- ✅ **Super Soda Pop** — `auto` · P1 (player:Lysgd) · themes: heal
  - _Food · $$125_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 30 Hit Points

- ✅ **Sweet Confection** — `auto` · P1 (player:Lázaro) · themes: multiturn, status, damage
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff to gain +4 Evasion until the end of their next turn. If the user prefers Sweet Food, they gain +4 Accuracy as well. If the user dislikes Sweet Food, they become Enraged.

- ✅ **Apicot Berry** — `auto` · P3 · themes: cs
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Special Defense CS. Tier 2.

- ✅ **Babiri Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Steel-type move. Tier 3.

- ✅ **Baby Food** — `auto` · P3 · themes: swap, stat
  - _Food · $--_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - A nutritious food that causes young Pokémon to grow quickly. When consumed, increases Experience Gain of Pokémon at level 15 or lower by 20% for the rest of the day.

- ✅ **Bitter Treat** — `auto` · P3 · themes: interrupt, status, damage
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff when being hit by a Special Attack to increase their Damage Reduction by +5 against that attack. If the user prefers Bitter Food, they gain +10 Damage Reduction instead. If the user dislikes Bitter Food, they become Enraged.

- ✅ **Black Sludge** — `auto` · P3 · themes: heal, swap, status
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Poison-Type Pokémon may consume the Black Sludge as a Snack Item; when the Digestion Buff is traded in, they recover 1/8th of their Max Hit Points at the beginning of each turn for the rest of the encounter.

- ✅ **Candy Bar** — `auto` · P3 · themes: heal
  - _Food · $$75_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Snack. Grants a Digestion Buff that heals 5 Hit Points.

- ✅ **Charti Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Rock-type move. Tier 3.

- ✅ **Cheri Berry** — `auto` · P3 · themes: cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Paralysis, Cool Poffin Ingredient. Tier 1.

- ✅ **Chesto Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Sleep, Beauty Poffin Ingredient. Tier 1.

- ✅ **Chople Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Fighting-type move. Tier 3.

- ✅ **Coba Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Flying-type move. Tier 3.

- ✅ **Colbur Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Dark-type move. Tier 3.

- ✅ **Cornn Berry** — `auto` · P3 · themes: control, status, cure
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Disabled condition. Tier 2.

- ✅ **Custap Berry** — `auto` · P3 · themes: interrupt
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Grants the Priority keyword to any Move. May only be used at 25% HP or lower. Tier 3.

- ✅ **Enigma Berry** — `auto` · P3 · themes: interrupt, typing
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - User gains Temporary HP equal to 1/6th of their Max HP when hit by a Super Effective Move. Tier 2.

- ✅ **Enriched Water** — `auto` · P3 · themes: heal
  - _Food · $$75_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 20 Hit Points

- ✅ **Ganlon Berry** — `auto` · P3 · themes: cs
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Defense CS. Tier 2.

- ✅ **Grepa Berry** — `auto` · P3 · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers Special Defense stat by 1 with trainer permission. Tier 3.

- ✅ **Haban Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Dragon-type move. Tier 3.

- ✅ **Hearty Meal** — `auto` · P3 · themes: multiturn, swap, action
  - _Food · $--_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - When consumed, that Trainer gains +2 to their Max AP until the end of their next extended rest. A Trainer may only be under the effect of one Hearty Meal at a time. Hearty Meals not consumed within 20 minutes of being created lose all flavor and all effect.

- ✅ **Hondew Berry** — `auto` · P3 · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers Special Attack stat by 1 with trainer permission. Tier 3.

- ✅ **Jaboca Berry** — `auto` · P3 · themes: damage
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Foe dealing Physical Damage to the user loses 1/8 of their Maximum HP. Tier 2.

- ✅ **Kasib Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Ghost-type move. Tier 3.

<a id="gear-06"></a>
## `gear-06` — Poké Ball

P1 · 1 open of 29 · open

- ⚪ **Basic Ball** — `manual` · P1 (player:Handels, player:Lysgd, player:Lázaro) · themes: capture
  - _Poké Ball · Slot +0 · $$250_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - Basic Poké Ball; often called just a “Poké Ball”.

- ⚪ **Cherish Ball** — `manual` · P1 (player:Lázaro) · themes: capture
  - _Poké Ball · Slot -5.0 · $$800_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - A decorative Poké Ball often given out during special events.

- ✅ **Fast Ball** — `auto` · P1 (player:Handels) · themes: position · code: ballModifier:17156
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the target has a Movement Capability above 7.

- ⚪ **Luxury Ball** — `manual` · P1 (player:Lázaro) · themes: social
  - _Poké Ball · Slot -5.0 · $$800_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - A caught Pokémon is easily pleased and starts with a raised happiness.

- ⚪ **Bait Attachment** — `manual` · P3 · themes: capture
  - _Poké Ball · Slot -- · $$300_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - These attachments afix a piece of bait to the triggering device of a Poké Ball. When the bait is taken, the attachment automatically triggers a capture attempt along with any effect that would be caused by a Poké Ball Cases.

- ⚪ **Bounce Case** — `manual` · P3 · themes: interrupt, capture
  - _Poké Ball · Slot -- · $$800_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A Poké Ball in a Bounce Case may bounce once when thrown or launched, up to a distance of 3 meters. This can be used to extend the effective range of a Poké Ball, hit around obstacles, or trigger effects such as the Capture Specialist’s Curve Ball on an additional target.

- ⚪ **Camera Kit** — `manual` · P3 · themes: skill, capture
  - _Poké Ball · Slot -- · $$1200_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A small camera, microphone, and speaker set affixed to the outside of a Poké Ball or Case. These allow a Trainer to remotely release and command their Pokémon or attempt to capture a Pokémon.

- ⚪ **Contest Case** — `manual` · P3 · themes: social
  - _Poké Ball · Slot -- · $$400_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - Whenever a Pokémon is released from a Contest Case into a Contest, they gain 1 Appeal Point during the introduction stage.

- ⚪ **Devil Case** — `manual` · P3 · themes: heal, status, capture
  - _Poké Ball · Slot -- · $$3000_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - These dangerous and often illegal cases remove the failsafe on Poké Balls that prevents them from catching Pokémon that are at 0 Hit Points or less. It allows Poké Balls to catch Fainted Pokémon as normal, but automatically inflicts 2 Injuries when hitting a Pokémon - whether the Capture is successful or not.

- ⚪ **Fabulous Ball** — `manual` · P3 · themes: damage, stat, social
  - _Poké Ball · Slot -5.0 · $--_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - The captured Pokémon gains +2 dice in the Contest Stat that corresponds to the Stat boosted by their Nature. If the Stat boosted is HP, choose any two Contest Stats except the one corresponding to the lowered Stat and raise them by 1 die each. As a reminder, Beauty=SpAtk, Cool=Attack, Cute=Speed, Smart=SpDef, Tough=Def.

- ⚪ **Flash Case** — `manual` · P3 · themes: control, capture
  - _Poké Ball · Slot -- · $$800_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - When a Poké Ball with a Flash Case is thrown, it uses the Move Flash originating from the spot where it landed.

- ⚪ **Friend Ball** — `manual` · P3 · themes: social
  - _Poké Ball · Slot -5.0 · $$800_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - A caught Pokémon will start with +1 Loyalty.

- ✅ **Hail Ball** — `auto` · P3 · themes: weather · code: BALL_WEATHER:17136
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the weather is hailing when used.

- ⚪ **Heal Ball** — `manual` · P3 · themes: heal, capture
  - _Poké Ball · Slot -5.0 · $$800_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - A caught Pokémon will heal to Max HP immediately upon capture.

- ⚪ **Learning Ball** — `manual` · P3 · themes: stat
  - _Poké Ball · Slot -5.0 · $--_
  - note: a post-capture effect (Loyalty, happiness, healing, a Move) applied when the Pokémon is added to the roster
  - The captured Pokémon immediately learns their next level-up Move, as long as it is within 8 levels of their current level.

- ✅ **Level Ball** — `auto` · P3 · themes: stat · code: ballModifier:17153
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the target is under half the level your active Pokémon is.

- ⚪ **Lock Case** — `manual` · P3 · themes: capture
  - _Poké Ball · Slot -10.0 · $$400_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A Lock Case grants a -10 Capture modifier to any Poké Ball. It also stops Pokémon from exiting Poké Balls unless explicitly released by their owners.

- ⚪ **Medicine Case** — `manual` · P3 · themes: position, heal, swap, status, action, capture
  - _Poké Ball · Slot -- · $$400_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A Medicine Case may be filled with an Antidote, Paralyze Heal, Burn Heal, Ice Heal, or Full Heal. This consumes the used item. When a Pokémon is recalled into a Poké Ball with a filled Medicine Case, the item is automatically used on the Pokémon. Filling a Medicine Case is an Standard Action. Medicine Cases may be refilled multiple times but may only have one sort of consumable in them at a time.

- ✅ **Mold Ball** — `auto` · P3 · themes: status · code: BALL_TYPE_PAIRS:17135
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the target is Poison or Fighting type.

- ✅ **Nest Ball** — `auto` · P3 · themes: stat · code: ballModifier:17154
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the target is under level 10.

- ⚪ **Poké Ball Tracking Chip** — `manual` · P3 · themes: capture
  - _Poké Ball · Slot -- · $$200_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A chip embedded in the inner workings of the Poké Ball that emits a signal allowing the Ball’s owner to remotely track the location of the Ball. Depending on the setting, these may be built in by default.

- 🟡 **Power Ball** — `partial` · P3 · themes: capture, stat · code: ballModifier:17154
  - _Poké Ball · Slot +0 · $--_
  - note: ballModifier gives the -20; the 1d4 levels gained on capture are by hand
  - -20 Modifier if the target is under level 10.  Target gains 1d4 levels upon capture.

- ✅ **Rain Ball** — `auto` · P3 · themes: weather · code: BALL_WEATHER:17136
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the weather is rainy when used.

- ✅ **Sand Ball** — `auto` · P3 · themes: weather · code: BALL_WEATHER:17136
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the weather is a sandstorm when used.

- ⚪ **Spray Case** — `manual` · P3 · themes: swap, capture
  - _Poké Ball · Slot -- · $$800_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - A Spray Case may be filled with a Pester Ball or Repel of any variety. This consumes the used item. Upon hitting a target, the Spray Case is emptied, spraying the item it was filled with onto its target, automatically hitting. This can occur when attempting to catch Pokémon (the effect is resolved before the capture roll), or when releasing a Pokémon from its Poké Ball (the effect is resolved before the Pokémon within is released). Spray Cases may be refilled numerous times, but may only have one sort of consumable in them at a time.

- ⚪ **Storage Case** — `manual` · P3 · themes: capture
  - _Poké Ball · Slot -- · $$15000_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - These extremely useful cases are capable of “Capturing” non-living matter. Once applied to a Poké Ball, Storage Cases cannot be removed. The object or objects in question must be smaller than 2 meters in any dimension. A single Storage Case can capture several discrete objects, but they must all be supported by a single surface; a 2x2 meter rug or mat is often used for this purpose. Capture Rolls against inanimate objects automatically succeed. Poké Balls with Storage Cases count towards the total number of Pokémon that the trainer can carry. Storage Cases are often illegal due to their uses in smuggling and theft.

- ✅ **Sun Ball** — `auto` · P3 · themes: weather · code: BALL_WEATHER:17136
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - -20 Modifier if the weather is sunny when used.

- ✅ **Ultra Ball** — `auto` · P3 · themes: capture · code: BALL_FLAT:17133
  - _Poké Ball · Slot -15.0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal
  - The best generic Poké Ball.

- ⚪ **Zap Case** — `manual` · P3 · themes: damage, skill, capture
  - _Poké Ball · Slot -- · $$1500_
  - note: a Poké Ball attachment with a table effect (range, remote, capture of objects) — the Map has no ball-flight model
  - Whenever a Poké Ball with a Zap Case hits a target it deals damage as if using a Struggle Attack. This Damage is Electric-Typed. If the Ball is already used as a Struggle Attack (such as with Curve Ball), then the Zap Case changes the damage to Electric-Type and adds bonus damage equal to twice the user’s Technology Education skill. When attempting to catch Pokémon, damage is resolved before the capture roll. This can also be used when releasing a Pokémon (damage is resolved before the Pokémon is released).

<a id="gear-07"></a>
## `gear-07` — Key Item

P1 · 0 open of 17 · ✔ done

- ⚪ **Basic Rope** — `manual` · P1 (player:Lázaro) · themes: heal, damage
  - _Key Item · $$100_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Basic Fiber Rope. Has a tensile strength of 35 kg or 77 lbs. It has 5 Hit Points.
    
    Rope can only be damaged by Fire-Type attacks, attacks made with sharp objects(knives, swords, sharp teeth), and moves like Scratch, Slash, Leaf Blade, Razor Leaf, etc. The Move Cut ignores all Damage Reduction against Rope. Rope can be bought in any length of 25 ft up to 300.

- ⚪ **First Aid Kit** — `manual` · P1 (player:Lázaro) · themes: heal, status, cure, action, skill · code: FIRST_AID_KIT:30656, firstAidKitRow:30760
  - _Key Item · $$500_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Required to use the First Aid Expertise Feature. By Draining 1 AP, any Trainer can make a Medicine Education Check on a target as an Extended Action. The target gains Hit Points equal to the result, and is cured of Burn, Poison, and Paralysis.

- ⚪ **Poké Ball Technical Manual [5-15 Playtest]** — `manual` · P1 (player:Lázaro) · themes: damage, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Your all-in-one guide to balls.
    
    Rank 1 - Novice Technology Education: Your material costs for crafting Poke Balls of any variety are reduced by 10%.
    Rank 2 - Expert Technology Education: Poke Balls you craft gain a +2 Bonus to Accuracy Rolls.

- ⚪ **Sturdy Rope** — `manual` · P1 (player:Lázaro) · themes: heal, damage
  - _Key Item · $$400_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Sturdy Rope with a tensile strength of 225 kg or roughly 500lbs. 30 Hit Points and 20 Damage Reduction.
    
    Rope can only be damaged by Fire-Type attacks, attacks made with sharp objects(knives, swords, sharp teeth), and moves like Scratch, Slash, Leaf Blade, Razor Leaf, etc. The Move Cut ignores all Damage Reduction against Rope. Rope can be bought in any length of 25 ft up to 300.

- ⚪ **Tinfoil Gospel: Your Primer on Thwarting the Conspiracies of the New World Order [5-15 Playtest]** — `manual` · P1 (player:Lázaro) · themes: typing, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - An even more questionable tome, filled with laughable conspiracy theories. Its mental exercises are strangely effective, however.
    
    Rank 1 - Novice Occult Education: You gain the Iron Mind Edge and the Skill Stunt - Focus (resisting Telepathy).
    Rank 2 - Expert Occult Education: Your Aura becomes muddled and difficult to read. Pokémon and Trainers with the Aura Reader Capability cannot discern the tint of your Aura and must succeed on an opposed Intuition or Focus Check vs your Occult Education or Focus in order to read the hue of your Aura. Upon failure, they may not attempt to read your Aura again for the remainder of the Scene.

- ⚪ **Type Study Manual [5-15 Playtest]** — `manual` · P1 (player:Lysgd) · themes: skill, capture, stat
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - These Books focus on one particular Pokemon Type.
    
    Rank 1 - Novice Pokémon Education: You gain a -5 Bonus on Capture Checks against the studied Type.
    Rank 2 - Expert Pokémon Education: When you apply Experience Training, you may choose to give one of your Pokémon of the studied Type +10 Bonus Experience. The same Pokémon cannot be chosen two days in a row.

- ⚪ **A Field Guide to Fungi [5-15 Playtest]** — `manual` · P3 · themes: heal, swap, status, cs, action, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - This book tells you which mushrooms are good to eat and which ones will give you a bad trip.
    
    Rank 1 - Novice Survival: You automatically identify all Tiny Mushrooms, Big Mushrooms, and Balm Mushrooms you pick. Whenever you or your Pokémon consume one of those Mushrooms, they ignore the negative effect of the Mushroom (Hit Point loss, Poison, Combat Stage loss).
    Rank 2 - Adept Survival: You can create the Hearty Meal Chef Recipe as an Extended Action but only by using Mushrooms as ingredients.

- ✅ **Bait** — `auto` · P3 · themes: action, skill
  - _Key Item · $$250_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Bait is a tasty, strong-smelling morsel of food designed to attract Pokémon. It may be used in two ways; to lure Pokémon, or to distract Pokémon.
    
    To lure Pokémon, set the bait on a route. Every 15 minutes thereafter, roll 1d20 until you roll 15 or higher. If you roll 3 times without success, the bait loses its potency and fails. If you succeed however, a random Pokémon will appear. Bait is often used for Fishing in this way.
    To distract Pokémon, throw it at a Wild Pokémon as a Standard Action. The target must then make a Focus Roll with a DC of 12. If they fail, the Pokémon gives up its next Standard Action to eat the food.

- ⚪ **Combat Medic's Primer [9-15 Playtest]** — `manual` · P3 · themes: heal, interrupt, swap, status, action, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Rank 1 – Novice Medicine Education: After taking a Sprint Maneuver, you may apply a Restorative Item on an adjacent target as a Swift Action.
    Rank 2 – Expert Medicine Education: Once per Scene as a Standard Action, you may target an adjacent ally. The target may immediately Take a Breather as a Full-Action Interrupt if they wish. They do not Shift and do not become Tripped as part of this action. If the target is Confused or Enraged, you must make a Medicine Education Check with a DC of 12 for them to be able to Take a Breather.

- ⚪ **Dowsing for Dummies [5-15 Playtest]** — `manual` · P3 · themes: skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A favorite of rock collectors everywhere, this book teaches the user how to attune their dowsing rods.
    
    Rank 1 - Novice Occult Education: Roll +1d6 when searching for Shards.
    Rank 2 - Adept Occult Education: When you begin searching for Shards, you may choose to expend an additional activation of Dowsing for the day. If you do, choose a Shard Color; all the Shards you find during this search will be of the chosen Color.

- ⚪ **First Aid Manual [5-15 Playtest]** — `manual` · P3 · themes: action, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A training manual given to all EMTs.
    
    Rank 1 - Novice Medicine Education: You gain a +10 Bonus to Medicine Education Checks made to use a First Aid Kit.
    Rank 2 - Expert Medicine Education: You may use the First Aid Expertise Feature once per day.

- ⚪ **How Berries?? [5-15 Playtest]** — `manual` · P3 · themes: action, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A beginner’s guide to the proper care of berry plants.
    
    Rank 1 - Adept General Education: Once per day when making a Yield Roll, add +1 to the result.
    Rank 2 - Expert General Education: You may create Mulch from Food Scrap.

- ⚪ **Saddle** — `manual` · P3 · themes: interrupt, skill
  - _Key Item · $$2000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Saddles help Trainers ride Pokémon. They are created with a specific Pokémon species in mind, and only Pokémon with that body type can wear the saddle. A common Saddle type fits Ponyta, Rapidash, Blitzle, and Zebstrika, for example. Saddles grant a +3 bonus to all Skill Checks made to mount Pokémon, or to remain on the Saddle when hit by an attack.

- ✅ **Super Bait** — `auto` · P3 · themes: action, skill
  - _Key Item · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Super Bait is a tasty, strong-smelling morsel of food designed to attract Pokémon. It may be used in two ways; to lure Pokémon, or to distract Pokémon.
    
    To lure Pokémon, set the super bait on a route. Every 15 minutes thereafter, roll 1d20+Intuition Rank until you roll 15 or higher. If you roll 3 times without success, the super bait loses its potency and fails. If you succeed however, a random Pokémon will appear. Super bait is often used for Fishing in this way.
    To distract Pokémon, throw it at a Wild Pokémon as a Standard Action. The target must then make a Focus Roll with a DC of 12. If they fail, the Pokémon gives up its next Standard Action to eat the food.

- ⚪ **Travel Guide [5-15 Playtest]** — `manual` · P3 · themes: weather, damage, skill
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A Travel Guide covers a specific location, such as a mountain or a pair of routes in the wilderness. Travel Guides are usually written for the more popular destinations in a region, but they might not necessarily exist for more obscure and out of the way locations.
    
    Rank 1 - Novice Survival: You gain the following Skill Stunts while traveling in the studied location: Survival (Foraging) and Survival (Navigation).
    Rank 2 - Expert Survival: You and your Pokémon do not take damage from naturally occurring Weather effects in the studied location.

- ⚪ **Utility Rope** — `manual` · P3 · themes: heal, damage
  - _Key Item · $$200_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Braided Utility Rope. Has a tensile strength of 80 kg or 176 lbs. It has 20 Hit Points and 10 Damage Reduction.
    
    Rope can only be damaged by Fire-Type attacks, attacks made with sharp objects(knives, swords, sharp teeth), and moves like Scratch, Slash, Leaf Blade, Razor Leaf, etc. The Move Cut ignores all Damage Reduction against Rope. Rope can be bought in any length of 25 ft up to 300.

- ✅ **Vile Bait** — `auto` · P3 · themes: status, action, skill
  - _Key Item · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Vile Bait is a strong-smelling morsel of food designed to attract Pokémon. Pokémon that eat it are poisoned.
    
    To lure Pokémon, set the vile bait on a route. Every 15 minutes thereafter, roll 1d20 until you roll 15 or higher. If you roll 3 times without success, the vile bait loses its potency and fails. If you succeed however, a random Pokémon will appear. Vile bait is often used for Fishing in this way.
    To distract Pokémon, throw it at a Wild Pokémon as a Standard Action. The target must then make a Focus Roll with a DC of 12. If they fail, the Pokémon gives up its next Standard Action to eat the food.

<a id="gear-08"></a>
## `gear-08` — Med Kit

P1 · 0 open of 17 · ✔ done

- ✅ **Antidote** — `auto` · P1 (player:Handels, player:Lázaro) · themes: status, cure
  - _Med Kit · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures Poison

- ✅ **Burn Heal** — `auto` · P1 (player:Handels) · themes: status, cure
  - _Med Kit · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures Burns

- ✅ **Paralyze Heal** — `auto` · P1 (player:Handels, player:Lázaro) · themes: cure
  - _Med Kit · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures Paralysis

- ✅ **Revival Herb** — `auto` · P1 (player:Lázaro) · themes: heal · code: CAP_PRODUCERS:25678
  - _Med Kit · $$350_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Revives Pokémon and sets to 50% Hit Points - Repulsive

- ⚪ **Anti-Radiation Pills** — `manual` · P3 · themes: hazard, interrupt, status, typing
  - _Med Kit · $$400_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - An advanced version of the real life potassium iodide pills. These not only protect the thyroid but instead guard against all forms of radiation poisoning, granting the user Hazard Immunity for radioactive environments only for 24 hours.

- ⚪ **Berserker Bolus** — `manual` · P3 · themes: status, typing, damage, skill
  - _Med Kit · $$500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - A combat drug used by street gangs. Immediately inflicts 1 injury on the user upon taking it, but for the duration of the Scene, the user is immune to Flinch effects, gains a +2 bonus to Save Rolls, and adds 5 to all Damage Rolls. However, they are Enraged and may not make Save Rolls to end the effect until all combat ceases for at least a few minutes.

- ✅ **Heal Powder** — `auto` · P3 · themes: cure
  - _Med Kit · $$350_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cure all Persistent Status Afflictions – Repulsive

- ✅ **Ice Heal** — `auto` · P3 · themes: status, cure
  - _Med Kit · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures Freezing

- ⚪ **Locus Lozenge** — `manual` · P3 · themes: skill
  - _Med Kit · $$500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - A drug to help the user focus on a single task. The user gains a +3 bonus to Focus and Intuition checks for the next hour but suffers a -4 penalty to Perception checks to notice outside events.

- ⚪ **Prescient Powder** — `manual` · P3 · themes: heal
  - _Med Kit · $$2500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - An illegal and dangerous substance produced by desert-dwelling Steelix. Taking the drug inflicts 3 injuries on the user and allows them to use either a Scry or Augury once. The user also gains the Psychic Navigator Edge for two hours. Habitual use of the drug can lead to addiction and health problems.

- ⚪ **Puissance Pellet** — `manual` · P3 · themes: heal, multiturn, cs, skill
  - _Med Kit · $$450_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - This painkiller and adrenaline injection lets the user temporarily ignore their debilitating injuries. A user with 5 or more injuries does not suffer Hit Point loss equal to their number of injuries when taking Standard Actions. If you are using the optional rule to decrease combat stages for each Injury, the user ignores these combat stage losses. This effect lasts for 5 turns, and at the end of the effect, the user automatically takes another injury.

- ⚪ **Rambo Roids** — `manual` · P3 · themes: skill
  - _Med Kit · $$750_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - The user treats their Power Capability as increased by 2 for the next hour. However, each time they lift an object or perform a feat of strength beyond their normal means, they must make an Athletics check with a DC of 12. If they fail, they take an Injury immediately. Each such feat of strength induces a cumulative -1 penalty to these Athletics checks.

- ⚪ **Shock Syringe** — `manual` · P3 · themes: status, damage, skill
  - _Med Kit · $$500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - This drug enhances the sensitivity of the user’s nerves, enhancing their perception and making it incredibly useful for scouts and recon missions. However, the enhanced sense of touch greatly lowers the user’s pain tolerance. The user gains a +3 bonus to Perception, Focus, and Guile and a +1 bonus to Accuracy. However, each time the user takes an Injury, they are Flinched. The effects of Shock Syringe last for an hour.

- ⚪ **Soldier Pill** — `manual` · P3 · themes: status
  - _Med Kit · $$750_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - A potentially dangerous stimulant that provides the user enough energy to go 24 hours without sleep. Upon taking the pill twice in a 48 hour period, the user begins to take 1 injury every 2 hours until they choose to go to sleep. The user of a Soldier Pill gets a +3 bonus to rolls to wake up from Sleep.

- ⚪ **Spritz Spray** — `manual` · P3 · themes: damage, skill
  - _Med Kit · $$250_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - A drug that improves reflexes at the cost of mental focus. The user of Spritz gains +5 initiative and +1 Evasion for the next 5 rounds of combat but suffers a -3 penalty to Perception and Focus checks for the next hour.

- ✅ **Stat Suppressants** — `auto` · P3 · themes: stat
  - _Med Kit · $$500_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - These medicines have an identical effect to the Suppressant Berries – they lower one of the user’s Base Stats by 1 point and only function if the Trainer of the Pokémon wants them to.

- ⚪ **White Light** — `manual` · P3 · themes: skill
  - _Med Kit · $$800_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - So named for the soft white glow the liquid gives off, White Light is a crude “truth serum”. It is slow-acting, taking upwards of an hour to take full effect on a victim. The victim becomes more suggestible and gullible. All of their Guile, Intuition, and Focus Checks made during an interrogation are subject to a -5 penalty.

<a id="gear-02"></a>
## `gear-02` — Pokémon Item (2/3)

P3 · 0 open of 30 · ✔ done

- ✅ **Expert Belt** — `auto` · P3 · themes: swap, typing, damage
  - _Pokémon Item · $$3500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Whenever the holder deals Super Effective Damage, they deal an additional 5 damage (this damage is not multiplied). Accessory Item for Trainers.

- ✅ **Fairy Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Fairy Moves. Accessory Item for Trainers.

- ✅ **Fairy Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Fairy-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Fighting Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Fighting Moves. Accessory Item for Trainers.

- ✅ **Fighting Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Fighting-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Fire Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Fire Moves. Accessory Item for Trainers.

- ✅ **Flame Orb** — `auto` · P3 · themes: swap, status, action
  - _Pokémon Item · $$3800_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Induces burn on holder. Off-Hand Item for Trainers. Standard Action to drop.

- ✅ **Flying Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Flying Moves. Accessory Item for Trainers.

- ✅ **Flying Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Flying-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Ghost Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Ghost Moves. Accessory Item for Trainers.

- ✅ **Ghost Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Ghost-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Grass Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Grass Moves. Accessory Item for Trainers.

- ✅ **Grass Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Grass-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Ground Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Ground Moves. Accessory Item for Trainers.

- ✅ **Ground Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Ground-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Ice Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Ice Moves. Accessory Item for Trainers.

- ✅ **Ice Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Ice-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Iron Ball** — `auto` · P3 · themes: swap, typing, action
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The Holder’s Speed is halved, and any immunity to Ground Type is lost. Hand Item for Trainers. Standard Action to drop.

- ✅ **Lagging Item (Atk)** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder's Attack Stat is set to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Lagging Item (Def)** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder's Defense Stat is set to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Lagging Item (SAtk)** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder's Special Attack Stat is set to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Lagging Item (SDef)** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder's Special Defense Stat is set to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Lagging Items** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The Lagging Items are tied to a specific Stat. When held, they set that Stat to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Lagging Tail** — `auto` · P3 · themes: cs, action, skill, stat
  - _Pokémon Item · $$900_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder's Speed Stat is set to -4 Combat Stages. Cannot be used by Trainers. Standard Action to drop.

- ✅ **Luck Incense** — `auto` · P3 · themes: damage
  - _Pokémon Item · $$1800_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants +1 Bonus to all Accuracy Rolls. A roll of 1 always misses. Cannot be used by Trainers.

- ✅ **Mega Stone** — `auto` · P3 · themes: swap
  - _Pokémon Item · $--_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - An item that allows a Pokémon to Mega Evolve when used in conjunction with a Mega Ring. Each Mega Stone is specific to one species and Mega Evolved form.

- ✅ **Metal Powder** — `auto` · P3 · themes: cs, skill
  - _Pokémon Item · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - When held by an untransformed Ditto, increases both Defense and Special Defense by +2 Combat Stages. Cannot be used by Trainers.

- ✅ **Normal Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Normal Moves. Accessory Item for Trainers.

- ✅ **Normal Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Normal-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Poison Brace** — `auto` · P3 · themes: swap, status, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Poison Moves. Accessory Item for Trainers.

<a id="gear-03"></a>
## `gear-03` — Pokémon Item (3/3)

P3 · 1 open of 18 · open

- ✅ **Poison Gem** — `auto` · P3 · themes: swap, status, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Poison-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Psychic Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Psychic Moves. Accessory Item for Trainers.

- ✅ **Psychic Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Psychic-Type attack. Off-hand or Accessory Slot Item for Trainers.

- 🟡 **Punching Glove** — `partial` · P3 · themes: interrupt, swap, damage
  - _Pokémon Item · $$4000_
  - note: no engine yet for these four held Abilities-of-items (Ability protection, once-per-Scene damage-effect immunity, Booster weather, non-Melee Melee)
  - The user's melee moves do not count as Melee moves for the purpose of effects that would trigger upon being hit by a melee attack. Additionally, the user gets a +5 bonus to Damage Rolls of punching moves. Off-hand Item for trainers.

- ✅ **Rare Leek** — `auto` · P3 · themes: damage
  - _Pokémon Item · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - When held by a Farfetch’d, this rare Leek increase the holder’s critical range by 2. Rare Leeks are Wielded. Cannot be used by Trainers.

- ✅ **Razor Fang** — `auto` · P3 · themes: swap
  - _Pokémon Item · $$3000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder’s damaging attacks cause an Injury on a roll of 19+. Accessory Item for Trainers. Evolves Gligar.

- ✅ **Rock Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Rock Moves. Accessory Item for Trainers.

- ✅ **Smart Fashion** — `auto` · P3 · themes: action, social
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once per Contest the holder may re-roll any 1's made when using a Smart Move. Cannot be used by Trainers.

- ✅ **Stat Boosters** — `auto` · P3 · themes: swap, cs, damage, skill, stat
  - _Pokémon Item · $$4000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - These items have a chosen Stat, either Attack, Defense, Special Attack, Special Defense, Speed, Evasion, or Accuracy. These items cause the default Stage of their linked Stat to be +1 Combat Stage instead of 0, or simply +1 for Accuracy and Evasion. Accessory Item for Trainers.

- ✅ **Steel Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Steel Moves. Accessory Item for Trainers.

- ✅ **Steel Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Steel-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Tough Fashion** — `auto` · P3 · themes: action, social
  - _Pokémon Item · $$1000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once per Contest the holder may re-roll any 1's made when using a Tough Move. Cannot be used by Trainers.

- ✅ **Toxic Orb** — `auto` · P3 · themes: swap, status, action
  - _Pokémon Item · $$4800_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Induces Poison on holder. Off-Hand Item for Trainers. Standard Action to drop.

- ✅ **Type Boosters** — `auto` · P3 · themes: swap, status, damage, skill
  - _Pokémon Item · $$1800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - These items come in a variety of each of the Elemental Types, and grant a +5 Damage Bonus to all direct-damage Moves of that specific Type used by the holder. Each is listed under the name it carries in the games: Silk Scarf (Normal), Charcoal (Fire), Mystic Water (Water), Magnet (Electric), Miracle Seed (Grass), Never-Melt Ice (Ice), Black Belt (Fighting), Poison Barb (Poison), Soft Sand (Ground), Sharp Beak (Flying), Twisted Spoon (Psychic), Silver Powder (Bug), Hard Stone (Rock), Spell Tag (Ghost), Dragon Fang (Dragon), Black Glasses (Dark), Iron Charm (Steel), Fairy Feather (Fairy). Accessory Item for Trainers.

- ✅ **Type Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - These items come in a variety of each of the Elemental Types, and grant the holder 15 Damage Reduction against that specific Type. Accessory Item for Trainers.

- ✅ **Type Plates** — `auto` · P3 · themes: swap
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - These Rare items come in a variety of each of the Elemental Types, and act as both a Type Booster and a Type Brace. Accessory Slot Item for Trainers.

- ✅ **Water Brace** — `auto` · P3 · themes: swap, damage
  - _Pokémon Item · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder 15 Damage Reduction against all direct-damage Water Moves. Accessory Item for Trainers.

- ✅ **Water Gem** — `auto` · P3 · themes: swap, damage, action
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Water-Type attack. Off-hand or Accessory Slot Item for Trainers.

<a id="gear-05"></a>
## `gear-05` — Food (2/2)

P3 · 0 open of 37 · ✔ done

- ✅ **Kebia Berry** — `auto` · P3 · themes: status, typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Poison-type move. Tier 3.

- ✅ **Kee Berry** — `auto` · P3 · themes: interrupt, cs, action
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Defense CS. Activates as a Free Action when hit by a Physical Move. Tier 3.

- ✅ **Kelpsy Berry** — `auto` · P3 · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers Attack stat by 1 with trainer permission. Tier 3.

- ✅ **Lansat Berry** — `auto` · P3 · themes: damage
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Increases Critical Range by +1 for the remainder of the encounter. Tier 2.

- ✅ **Liechi Berry** — `auto` · P3 · themes: cs
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Attack CS. Tier 2.

- ✅ **Magost Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Enraged condition. Tier 2.

- ✅ **Maranga Berry** — `auto` · P3 · themes: interrupt, cs, action
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Special Defense CS. Activates as a Free Action when hit by a Special Move. Tier 3.

- ✅ **Mental Herb** — `auto` · P3 · themes: cure
  - _Food · $$300_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures all Volatile Status Effects.

- ✅ **Micle Berry** — `auto` · P3 · themes: damage
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Increases Accuracy by +1. Tier 2.

- ✅ **Mirror Herb** — `auto` · P3 · themes: cs, skill
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - (Mirror Herbs are a type of Herb and thus a Food Buff, and grow the same as a Tier 2 Berry.) When another Pokémon or Trainer gains positive Combat Stages, the user may trade in this Food Buff to also gain those Combat Stages.

- ✅ **MooMoo Milk** — `auto` · P3 · themes: heal · code: CAP_PRODUCERS:25676
  - _Food · $$500_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 80 Hit Points

- ✅ **Nomel Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Infatuated condition. Tier 2.

- ✅ **Occa Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Fire-type move. Tier 3.

- ✅ **Passho Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Water-type move. Tier 3.

- ✅ **Payapa Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Psychic-type move. Tier 3.

- ✅ **Persim Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Confusion. Tier 1.

- ✅ **Petaya Berry** — `auto` · P3 · themes: cs
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Special Attack CS. Tier 2.

- ✅ **Power Herb** — `auto` · P3 · themes: multiturn
  - _Food · $$300_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Eliminates the Set-Up turn of Moves with the Set-Up Keyword.

- ✅ **Qualot Berry** — `auto` · P3 · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers Defense stat by 1 with trainer permission. Tier 3.

- ✅ **Rabuta Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Suppressed condition. Tier 2.

- ✅ **Rawst Berry** — `auto` · P3 · themes: status, cure
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures Burn, Smart Poffin Ingredient. Tier 1.

- ✅ **Red Apricorn** — `auto` · P3 · themes: stat
  - _Food · $--_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Used to make Level Balls.

- ✅ **Rindo Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Grass-type move. Tier 3.

- ✅ **Rowap Berry** — `auto` · P3 · themes: damage
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Foe dealing Special Damage to the user loses 1/8 of their Maximum HP. Tier 2.

- ✅ **Salac Berry** — `auto` · P3 · themes: cs
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +1 Speed CS. Tier 2.

- ✅ **Salty Surprise** — `auto` · P3 · themes: heal, interrupt, status
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff when being hit by an attack to gain 5 Temporary Hit Points. If the user likes Salty Flavors, they gain 10 Temporary Hit Points Instead. If the user dislikes Salty Food, they become Enraged.

- ✅ **Shuca Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Ground-type move. Tier 3.

- ✅ **Shuckle's Berry Juice** — `auto` · P3 · themes: heal
  - _Food · $--_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Heals 30 Hit Points

- ✅ **Sour Candy** — `auto` · P3 · themes: interrupt, status, damage
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff when being hit by a Physical Attack to increase their Damage Reduction by +5 against that attack. If the user prefers Sour Food, they gain +10 Damage Reduction instead. If the user dislikes Sour Food, they become Enraged.

- ✅ **Sparkling Lemonade** — `auto` · P3 · themes: heal
  - _Food · $$250_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 50 Hit Points

- ✅ **Spicy Wrap** — `auto` · P3 · themes: status, damage
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The user may trade in this Snack’s Digestion Buff when making a Physical attack to deal +5 additional Damage. If the user prefers Spicy Food, it deals +10 additional Damage instead. If the user dislikes Spicy Food, they become Enraged.

- ✅ **Starf Berry** — `auto` · P3 · themes: cs, stat
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - +2 CS to a random Stat. May be used only at 25% HP or lower. Tier 2.

- ✅ **Tamato Berry** — `auto` · P3 · themes: stat
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Lowers Speed stat by 1 with trainer permission. Tier 3.

- ✅ **Tanga Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Bug-type move. Tier 3.

- ✅ **Wacan Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Electric-type move. Tier 3.

- ✅ **White Herb** — `auto` · P3 · themes: cs, skill
  - _Food · $$300_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Any negative Combat Stages are set to 0.

- ✅ **Yache Berry** — `auto` · P3 · themes: typing
  - _Food · $$500_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Weakens foe’s super effective Ice-type move. Tier 3.

<a id="gear-09"></a>
## `gear-09` — Equipment

P3 · 0 open of 31 · ✔ done

- ⚪ **Bean Cap [5-15 Playtest]** — `manual` · P3 · themes: heal, status, damage, skill
  - _Equipment · Slot Consumable · $$50_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - AC: (6 minus Tech Edu Rank, Min 2)
    Range: 10 meters
    Effect: The target takes 20 Physical, Normal-Type Damage. On 18+, the target is Tripped and loses a Tick of Hit Points.

- ⚪ **Caltrops** — `manual` · P3 · themes: hazard, control, swap, action
  - _Equipment · Slot Consumable · $$500_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Lets the user use the move Spikes as a Standard Action.  The item is then consumed.

- ⚪ **Cap Cannon [5-15 Playtest]** — `manual` · P3 · themes: action
  - _Equipment · Slot Hands · $$5000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - Capsule Cannons - or Cap Cannons for short - are two-handed pieces of Equipment which can be loaded with different types of Capsules (Caps) and fired. They can be fired as a Standard Action, and the range and effect of the Cannon depends on the Cap used. A Cap Cannon may have up to five Caps loaded in it at once, and they do not have to be fired in any particular order. You may load up to two Caps into a Cannon as a Standard Action. There are three types of Caps: Bean Caps, Glue Caps, and Net Caps. In addition to Caps, Capsule Cannons can also be loaded with Smoke Bombs, Pester Balls, and Poke Balls. When fired this way, these items behave normally but have a Range of 10 meters.

- ⚪ **Capture Styler** — `manual` · P3 · themes: skill, capture, social
  - _Equipment · Slot Hands · $$7500_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - A Capture Styler is a Main-Hand specialized piece of equipment used by some certified Pokémon Rangers in a region. It emits a string of energy that is used in a similar fashion to a lasso but is too weak to physically restrain a target. Instead, the energy has a calming effect on Pokémon. Trainers using a Capture Styler may use Survival in place of Charm when raising the Disposition of Pokémon. 
    
    Acquiring a Capture Styler is easy for those who become certified Pokémon Rangers; most qualified Rangers receive one as part of the job. They are not for sale to the general public, and it’s easy to assume that someone who has a Capture Styler is a Ranger.

- ⚪ **Cleanse Tag** — `manual` · P3 · themes: control, status, damage, action, skill
  - _Equipment · Slot Consumable · $$500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Small strips of paper with a prayer/incantation written on them. When created, the creator makes an Occult Ed Roll; this is the Cleanse Tag’s Power Value. When glued, taped, or nailed to a surface, they stop Pokémon or Trainers within 30m of the tag from Phasing through that surface unless they make a Focus check with a result exceeding the Tag’s Power Value. On a success, the tag is destroyed; on failure, the tag holds, and the encroacher cannot try again for at least an hour.
    
    Tags may be stuck onto a weapon or appendage to let a Normal or Fighting-Type Attack hit a Ghost-Type Pokémon for neutral Damage; Tag is destroyed once damage is dealt.
    
    Novice Occult Ed: Can burn tag as a Standard A …

- ⚪ **Dream Mist** — `manual` · P3 · themes: barrier, status, damage, action · code: CAP_PRODUCERS:25677
  - _Equipment · Slot Consumable · $$500_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Dream Mist may be used as an AC 6 Melee Status Attack, performed as a Standard Action. If it hits, the target falls Asleep. Dream Mist is collected from Pokémon with the eponymous Capability using a Collection Jar.

- ⚪ **EMP Grenade** — `manual` · P3 · themes: control, status, damage, skill, capture
  - _Equipment · Slot Consumable · $$800_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Throwing an EMP Grenade is an AC 5 Ranged Blast 3 attack that can be made at a target within your Poké Ball throwing range. All legal targets with Augmentations immediately suffer the effects of Augmentation Shock. EMP Grenades flinch targets with Augmentations on a roll of 18+ on Accuracy Check. EMP Grenades disable Pokébots for 1d2 turns.

- ⚪ **Flashbang** — `manual` · P3 · themes: control, status, damage, skill, capture
  - _Equipment · Slot Consumable · $$250_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Throwing a Flashbang uses the Move Flash originating from the point where you threw the Flashbang, up to your maximum Poké Ball throwing range. When used in this way, Flash flinches all legal targets on 19-20 on Accuracy Check.

- ⚪ **Glue Cannon Charge Packet** — `manual` · P3 · themes: multiturn
  - _Equipment · Slot Consumable · $$100_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - A charge packet for Glue Cannons.

- ⚪ **Glue Cap [5-15 Playtest]** — `manual` · P3 · themes: status, damage, skill
  - _Equipment · Slot Consumable · $$100_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - AC: (8 minus Tech Edu Rank, Min 2)
    Range: 8 meters
    Effect: Cause the target to become Slowed, and their Initiative is lowered by 5. On 18+, the target is also Stuck and Trapped.

- ⚪ **Hazmat Suit** — `manual` · P3 · themes: hazard, status, typing
  - _Equipment · Slot Body + Head · $$3500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Acts as a Gas Mask but also grants the Hazard Immunity capability and immunity to non-damaging Poison Type Moves.

- ⚪ **Inferno Cannon** — `manual` · P3 · themes: control
  - _Equipment · Slot Hands · $$1000_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Uses the Move Inferno once.

- ⚪ **Magic Flute** — `manual` · P3 · themes: cure, action
  - _Equipment · Slot Item · $$4000_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Magic Flutes are rare artifacts made only by skilled crafters with occult knowledge. They are not usually found in stores. When a Flute is crafted, it is tied to a particular Status Condition. Once per day, the Flute may be played as a Standard Action. All Pokémon and Trainers within 20 meters of the Flute are cured of that Status. These rare artifacts cannot be found in most ordinary stores but may cost upwards of $4000 from an appropriate occult vendor.

- ⚪ **Net Cap [5-15 Playtest]** — `manual` · P3 · themes: status, damage, action, skill, capture
  - _Equipment · Slot Consumable · $$200_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - AC: (10 minus Tech Edu Rank)
    Range: 6 Meters
    Effect: Targets hit by a Net Cap gain all the effects below while the net remains on them. Targets may attempt to remove the Net as a Standard Action; if they do, they make a Save Check with a DC of 15, adding their Power Capability as a bonus to their Roll. Targets may automatically remove the Net as an Extended Action.
    
    » If the target is a Wild Pokémon, Capture Rate is increased by +20
    » If the target is Large Size or smaller, they take a -3 penalty to Accuracy Rolls
    » If the target is Medium Size or smaller, they are Slowed and Vulnerable
    » Sky and Levitate Speeds cannot be used; the target is forced to lower themselves to the ground (without …

- ⚪ **Pester Ball: Burn** — `manual` · P3 · themes: status, typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Inflicts Burn on the target. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Pester Ball: Confusion** — `manual` · P3 · themes: status, typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Inflicts Confusion on the target. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Pester Ball: Paralysis** — `manual` · P3 · themes: typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Inflicts Paralysis on the target. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Pester Ball: Poison** — `manual` · P3 · themes: status, typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Inflicts Poison on the target. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Pester Ball: Rage** — `manual` · P3 · themes: typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Inflicts Rage on the target. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Pester Ball: Sleep** — `manual` · P3 · themes: status, typing
  - _Equipment · Slot Consumable · $$350_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Causes the target to fall asleep. After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ✅ **Pester Balls** — `auto` · P3 · themes: interrupt, status, typing
  - _Equipment · Slot Consumable · $$350_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Pester Balls are small balls full of chemicals that come in six varieties, each of which inflicts a different Status Affliction when they hit a target. The Status Afflictions they can cause are: Rage, Confusion, Burn, Poison, Paralysis, and Sleep.
    
    After being hit by any Pester Ball, a target becomes immune to the effects of further Pester Balls for 1 hour. Throwing and hitting with Pester Balls is the same as with Poké Balls.

- ⚪ **Poké Ball Cannon** — `manual` · P3 · themes: damage, action, capture
  - _Equipment · Slot Main + Off Hand · $$4500_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Increases Poké Ball and Pester Ball accuracy by +1 and range to 15 meters. Balls deal 2d6 unreducible damage upon hitting a target. Balls take a Shift Action to ready in the Poké Ball Cannon.

- ⚪ **Scrubbing Spray** — `manual` · P3 · themes: skill
  - _Equipment · Slot Off-Hand · $$3500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Sprays a chemical agent over an area that destroys most forensic evidence, such as trace biomatter. Perception checks to track someone or to search for forensic evidence take a -6 penalty. Requires a Scrub Cartridge to use. Comes with 1 Cartridge. More can be bought for 300 apiece.

- ⚪ **Snag Machine** — `manual` · P3 · themes: swap, action, capture
  - _Equipment · Slot Accessory · $$30000_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Snag Machines are extremely illegal machines that allow trainers to steal another Trainer’s Pokémon. They come in both large, immovable varieties and smaller portable varieties. The Portable Variety is an Accessory-Slot Item. Inserting a Poké Ball into a Large Snag Machine turns it into a Snag Ball permanently, but Large Snag Machines may only turn 5 Poké Balls into Snag Balls per day. Inserting a Poké Ball into a Portable Snag Machine, which is a Swift Action, turns it into a Snag Ball after one round, but only for that round. Snag Balls have the same properties as the Poké Ball type they were before being inserted into the machine, but receive a -2 penalty on all Poké Ball attack rolls, an …

- ⚪ **Sonic Filter** — `manual` · P3 · themes: damage
  - _Equipment · Slot Accessory · $$2500_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Creates a portable field of directed white noise with a 2 meter radius when activated. Anyone within can hold a conversation normally, but anyone outside the field just hears static coming from the direction of the wearer. Moves with the Sonic Keyword aimed at a target within the field require 2 more on Accuracy Roll to hit.

- ⚪ **Spacesuit** — `manual` · P3 · themes: hazard, typing
  - _Equipment · Slot Body + Head · $$8000_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Grants Vacuum Immunity and Free Floating 4. Weighs 200 pounds and is thus difficult for most Trainers to use in normal gravity. A Robotic Age upgraded version costing an extra $2000 confers Hazard Immunity too and weighs only 100 pounds instead.

- ⚪ **Sting Grenade** — `manual` · P3 · themes: multiturn, damage, capture
  - _Equipment · Slot Consumable · $$250_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Throwing a Sting Grenade is an AC 4 Ranged Blast 3 attack that can be made at a target within your Poké Ball throwing range. Upon connecting, the Sting Grenade releases dozens of hard rubber balls around it, causing pain to the targets but no damage. Those targets take a -3 penalty to all rolls and to their evasion until the start of your next turn.

- ⚪ **Toxic Caltrops** — `manual` · P3 · themes: hazard, control, swap, action
  - _Equipment · Slot Consumable · $$500_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Lets the user use the move Toxic Spikes as a Standard Action.  The item is then consumed.

- ⚪ **Weighted Nets** — `manual` · P3 · themes: position, heal, status, damage, action, capture
  - _Equipment · Slot Hands · $Varies_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Weighted Nets are foldable nets used for trapping Pokémon. These two-handed nets, when Equipped, can be thrown at a target as a Standard Action, as a Status Attack with an AC of 8. While a Pokémon is netted, you may pull on the rope attached to the Net to pull the Pokémon 1 Meter towards you as a Standard Action. Pokémon hit by a weighted net become Slowed as long as the net remains and cannot use Sky or Levitate Speeds except to safely lower themselves back to the ground. A Pokémon may attack the Net to attempt to break free. Capture Rolls against Pokémon in a net receive a -20 bonus.
    
    Weighted Nets with 50 Hit Points cost $500; 80 Hit Points cost $850; and 150 Hit Points cost $1200.

- ⚪ **Wonder Launcher** — `manual` · P3 · themes: heal, swap, action, skill, stat
  - _Equipment · Slot Hands · $$10000_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - This strange and complicated two-handed machine can only be used by those that have an Expert-Level Medicine or Technology Education Skill. The wielder can spend 1 AP to activate it, and apply an X-Item at a Pokémon within 8 meters. X Items applied through the Wonder Launcher do not cause the target to forfeit any actions. Items combined by a Researcher may be used in the Wonder Launcher, and do not cause the target to forfeit any actions even if they are also a Restorative.

- ⚪ **Zap Blaster** — `manual` · P3 · themes: control
  - _Equipment · Slot Hands · $$1000_
  - note: a thrown or fired consumable weapon resolved as an attack at the table — no projectile/area model on the Map beyond the Hazard and Move cards
  - Uses the Move Zap Cannon once.

<a id="verify-gear-01"></a>
## `verify-gear-01` — Verify gear the scan thinks are handled

P9 · 0 open of 59 · ✔ done

- ✅ **Adorable Fashion** — `auto` · P1 (player:Handels) · themes: swap, damage, action · code: GEAR_ACTIONS:13008
  - _Pokémon Item · $$500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder may activate this item once a Scene as a Free Action to gain +2 Evasion for one full round.

- ✅ **Captain's Hat** — `auto` · P1 (player:Lázaro) · themes: skill, social · code: EQUIP_EFFECTS:12687
  - _Equipment · Slot Head · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - A naval officer's cap, worn by someone used to being obeyed. The user gains a +2 bonus to Intimidate Checks while it is worn.

- ✅ **Energy Root** — `auto` · P1 (player:Handels) · themes: heal · code: FIELD_CLINIC_ITEMS:30348, STAY_WITH_US_ITEMS:30350
  - _Med Kit · $$500_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 70 Hit Points - Repulsive

- ✅ **Full Heal** — `auto` · P1 (player:Lysgd, player:Lázaro) · themes: cure · code: trainerVitalsCard:10963, heroCard:16832, encounterMonCard:39248, encounterTrainerCard:39499
  - _Med Kit · $$450_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Cures all Persistent Status Afflictions

- ✅ **Full Restore** — `auto` · P1 (player:Handels, player:Lázaro) · themes: heal, cure · code: FIELD_CLINIC_ITEMS:30347
  - _Med Kit · $$1450_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals a Pokémon for 80 Hit Points and cures any Status Afflictions

- ✅ **Great Ball** — `auto` · P1 (player:Lázaro) · themes: capture · code: BALL_FLAT:17133, itemDescNode:40494
  - _Poké Ball · Slot -10.0 · $$400_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - A better Poké Ball with no special effects.

- ✅ **Hand Net** — `auto` · P1 (player:Handels) · themes: heal, swap, capture · code: ITEM_MOVES:29230
  - _Equipment · Slot Hands · $Varies_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - A long net, usually on the end of a long stick, these pieces of two-handed Equipment are usually used for bug catching or fishing. As an AC6 Status Attack, you may attempt to net a Small Pokémon using this item. If you hit, you manage to scoop up the Pokémon, trapping them. You may move with the Pokémon, dragging them with you. Pokémon may still attack from the Hand Net using long-range attacks, or try to attack the net itself, potentially breaking it and freeing themselves. Capture Rolls against Pokémon in a net receive a -20 bonus.
    
    Hand Nets with 50 Hit Points cost $100; 100 Hit Points cost $600; and 200 Hit Points cost $1500. Nets aren’t broken until all of their Hit Points are depleted.

- ✅ **Heart Booster** — `auto` · P1 (player:Handels, player:Lysgd) · themes: other · code: VITAMIN_DEFS:19079
  - _Med Kit · $$9800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - The Pokémon gains 2 Tutor Points. Use only one per Pokémon.

- ✅ **Hyper Potion** — `auto` · P1 (player:Handels, player:Lysgd, player:Lázaro) · themes: heal · code: FIELD_CLINIC_ITEMS:30347, STAY_WITH_US_ITEMS:30350
  - _Med Kit · $$800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 70 Hit Points

- ✅ **Iron** — `auto` · P1 (player:Lázaro) · themes: stat · code: ballAssistNode:17177, VITAMIN_DEFS:19075, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s Defense Base Stat 1.

- ✅ **Leftovers** — `auto` · P1 (player:Lysgd, player:Lázaro) · themes: heal · code: eatSnack:18068, chefDumplingIngredients:33954
  - _Food · $$350_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Snack. When their Digestion Buff is traded in, the user recovers 1/16th of their max Hit Points at the beginning of each turn for the rest of the encounter.

- ✅ **Light Armor** — `auto` · P1 (player:Lysgd) · themes: damage · code: EQUIP_EFFECTS:12671
  - _Equipment · Slot Body · $$8000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Grants +5 Damage Reduction against Physical Damage.

- ✅ **Mega Ring** — `auto` · P1 (player:Handels, player:Lysgd, player:Lázaro) · themes: other · code: MEGA_RING_NAME:2150, MEGA_RING_ITEMS:2151
  - _Equipment · Slot Accessory · $--_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Mega Rings are extraordinarily rare accessories that allow a Trainer’s Pokémon to Mega Evolve when used in conjunction with a Mega Stone. They cannot be bought in stores anywhere and must usually be earned through a trial of sorts, governed by a Gym Leader or other influential Pokémon Trainer. They can take the form of a bracelet, a necklace, or an actual ring.

- ✅ **Pokédex** — `auto` · P1 (player:Handels, player:Lysgd, player:Lázaro) · themes: action, stat · code: BATTLE_ACTIONS:27734, renderReference:43340
  - _Key Item · $$12000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - A hand-held computer with an advanced camera and image recognition software given to trainers at the start of their journey.  A trainer can use a Standard Action to identify a Pokémon within 10m using the Pokédex's scanner.  Doing so reveals the average height/weight of the species, height/weight of the target, moves that the Species learns through Level Up, and some brief facts about the species' behavior.
    
    Pokédexes may also function as smartphones, and in most circumstances they should be made available for free to starting characters.

- ✅ **Potion** — `auto` · P1 (player:Lysgd, player:Lázaro) · themes: heal · code: invCategory:13671, restorativeDef:30328, FIELD_CLINIC_ITEMS:30347, STAY_WITH_US_ITEMS:30350
  - _Med Kit · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 20 Hit Points

- ✅ **Protein** — `auto` · P1 (player:Lázaro) · themes: stat · code: VITAMIN_DEFS:19074, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s Attack Base Stat 1.

- ✅ **Revive** — `auto` · P1 (player:Handels, player:Lysgd, player:Lázaro) · themes: heal, status · code: invCategory:13671, FIELD_CLINIC_ITEMS:30348, openApplyRestorative:30485
  - _Med Kit · $$300_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Revives fainted Pokémon and sets to 20 Hit Points

- ✅ **Running Shoes** — `auto` · P1 (player:Lysgd) · themes: position, skill · code: EQUIP_EFFECTS:12689
  - _Equipment · Slot Feet · $$2000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Running Shoes grant a +2 bonus to Athletics Checks, to a maximum total modifier of +3, and increase your Overland Speed by +1.

- ✅ **Shell Bell** — `auto` · P1 (player:Lázaro) · themes: heal, swap · code: EQUIP_EFFECTS:12709, GEAR_ACTIONS:13097
  - _Pokémon Item · $$5200_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Whenever the user damages a foe, they gain a Tick of Temporary Hit Points. Accessory Item for Trainers.

- ✅ **Slick Fashion** — `auto` · P1 (player:Lysgd) · themes: swap, action · code: GEAR_ACTIONS:13049
  - _Pokémon Item · $$500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder may activate this item once a Scene as a Free Action when provoking an Attack of Opportunity to instead not provoke one.

- ✅ **Sunglasses** — `auto` · P1 (player:Lázaro) · themes: skill · code: EQUIP_EFFECTS:12684
  - _Equipment · Slot Head · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - +1 to Charm, Guile, and Intimidate Checks, to a maximum total modifier of +3.

- ✅ **Super Potion** — `auto` · P1 (player:Lázaro) · themes: heal · code: FIELD_CLINIC_ITEMS:30347, STAY_WITH_US_ITEMS:30350
  - _Med Kit · $$380_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 35 Hit Points

- ⚪ **Water Stone** — `manual` · P1 (player:Handels, player:Lysgd) · themes: other · code: nextEvolutions:1834
  - _Pokémon Item · $$3000_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - Evolves Poliwhirl, Shellder, Staryu, Eevee, Lombre, Panpour

- ✅ **Winter Cloak** — `auto` · P1 (player:Lázaro) · themes: weather, swap, damage · code: WEATHER_DEFS:1489
  - _Pokémon Item · $$1500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user does not take damage from Hail. Accessory Item for Trainers.

- ✅ **X Attack** — `auto` · P1 (player:Lázaro) · themes: cs, skill · code: X_ITEMS:34861
  - _Med Kit · $$350_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases the Pokémon’s Attack by two Combat Stages

- ✅ **X Defend** — `auto` · P1 (player:Handels, player:Lázaro) · themes: cs, skill · code: X_ITEMS:34861
  - _Med Kit · $$350_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases the Pokémon’s Defense by two Combat Stages

- ✅ **X Sp. Def.** — `auto` · P1 (player:Handels) · themes: cs, skill · code: X_ITEMS:34861
  - _Med Kit · $$350_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases the Pokémon’s Special Defense by two Combat Stages

- ✅ **X Special** — `auto` · P1 (player:Lysgd) · themes: cs, skill · code: X_ITEMS:34861
  - _Med Kit · $$350_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases the Pokémon’s Special Attack by two Combat Stages

- ✅ **Ablative Heavy Armor** — `auto` · P3 · themes: cs, damage, skill · code: EQUIP_EFFECTS:12674
  - _Equipment · Slot Body · $$14500_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - A weighty but brittle armor that is self-repairing. Grants 20 Damage Reduction, but each damaging attack removes 5 Damage Reduction from the armor. Every five minutes, the armor repairs 5 Damage Reduction. The user’s Speed Combat Stage defaults to -1.

- ✅ **Accuracy Booster** — `auto` · P3 · themes: swap, damage · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder +1 Accuracy. Accessory Item for Trainers.

- ✅ **Attack Booster** — `auto` · P3 · themes: swap, cs, skill, stat · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Attack Stat is +1 Combat Stage. Accessory Item for Trainers.

- ✅ **Attack Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19082
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers Attack stat by 1 if trainer allows it.

- ✅ **Balm Mushroom** — `auto` · P3 · themes: status, cure, cs, skill, stat · code: GEAR_ACTIONS:12993, tradeInDigestion:18126, CAP_PRODUCERS:25679
  - _Food · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user is cured of Burn, Paralysis, or Poison. If they are, they lose 1 Combat Stage in a random Stat.

- ✅ **Bandages** — `auto` · P3 · themes: heal · code: resetInjuryDay:5695, INJURY_SOURCES:5900, BANDAGE_ITEMS:6420
  - _Med Kit · $$300_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Bandages are applied as Extended Actions on Pokémon or Trainers. Bandages last for 6 hours; while applied, they double the Natural Healing Rate of Pokémon or Trainers, meaning a Pokémon or Trainer will heal 1/8th of their Hit Points per half hour. Bandages also immediately heal one Injury if they remain in place for their full duration.
    
    If a Pokémon is damaged or loses Hit Points in any way, the Bandages immediately stop working.

- ✅ **Big Mushroom** — `auto` · P3 · themes: status, cs, skill, stat · code: GEAR_ACTIONS:12979, CAP_PRODUCERS:25679
  - _Food · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user becomes Poisoned; if they do, they gain +1 Combat Stage in two random Stats.

- ✅ **Black Belt** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4217
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Fighting Moves used by the holder. Accessory Item for Trainers.

- ✅ **Black Glasses** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4220
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Dark Moves used by the holder. Accessory Item for Trainers.

- ✅ **Calcium** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19076, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s Special Attack Base Stat 1.

- ✅ **Carbos** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19078, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s Speed Base Stat 1.

- ✅ **Charcoal** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4215
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Grants a +5 Damage Bonus to all direct-damage Fire Moves used by the holder. Accessory Item for Trainers.

- ✅ **Chemistry Set** — `auto` · P3 · themes: other · code: openPlayingGod:35151, researcherCard:35639
  - _Key Item · $$1000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Used to create Repels, Potions, and other objects.

- ✅ **Dark Vision Goggles** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12692
  - _Equipment · Slot Head · $$1000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - These Goggles simply grant the Darkvision Capability while worn.

- ✅ **Defense Booster** — `auto` · P3 · themes: swap, cs, skill, stat · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Defense Stat is +1 Combat Stage. Accessory Item for Trainers.

- ✅ **Defense Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19083
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers Defense stat by 1 if trainer allows it.

- ✅ **Dire Hit** — `auto` · P3 · themes: damage · code: X_ITEMS:34861
  - _Med Kit · $$600_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases Critical Hit Range of all moves by +2.

- ✅ **Dowsing Rod** — `auto` · P3 · themes: skill · code: canDowse:34958, openDowsing:34968
  - _Key Item · $$2000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Dowsing Rods have been attuned to the energy resonance given off by Shards and may be used while in any route, cave, or outside area. They may be activated by spending 10 minutes searching an area, and may be activated a number of times per day equal to half of the trainer’s Occult Education Rank.
    
    Roll 1d6 per Occult Ed Rank. If the area being searched is a beach, cave, desert, or any other sandy/rocky area, roll +1d6. If you have Skill Stunt (Dowsing), roll an additional 1d6. For each die that results in 4 or higher, you find 1 Shard of a random color: Red, Orange, Yellow, Green, Blue, or Violet. You may reroll any die that result in 6, gaining that shard and potentially more.

- ✅ **Draco Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4223
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Dragon Type Booster and a Dragon Brace. Accessory Slot Item for Trainers.

- ✅ **Dragon Fang** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4219
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Dragon Moves used by the holder. Accessory Item for Trainers.

- ✅ **Dread Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4223
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Dark Type Booster and a Dark Brace. Accessory Slot Item for Trainers.

- ✅ **Earth Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4223
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Ground Type Booster and a Ground Brace. Accessory Slot Item for Trainers.

- ✅ **Elegant Fashion** — `auto` · P3 · themes: swap, cs, action, skill · code: GEAR_ACTIONS:13035
  - _Pokémon Item · $$500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder may activate this item once a Scene as a Free Action when losing Combat Stages from a foe’s effect to instead not lose those Combat Stages.

- ✅ **Energy Powder** — `auto` · P3 · themes: heal · code: FIELD_CLINIC_ITEMS:30348, STAY_WITH_US_ITEMS:30350
  - _Med Kit · $$150_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Heals 25 Hit Points - Repulsive

- ✅ **Evasion Booster** — `auto` · P3 · themes: swap, damage · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Grants the holder +1 Evasion. Accessory Item for Trainers.

- ✅ **Everstone** — `auto` · P3 · themes: other · code: HELD_FX:4403
  - _Pokémon Item · $$1500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Evolution is prevented for the holder. Cannot be used by Trainers.

- ✅ **Eviolite** — `auto` · P3 · themes: cs, skill, stat · code: HELD_FX:4373, heldCSMods:4485
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Only affects not-fully-evolved Pokémon of a single family, decided when the Eviolite is made. Grants a +5 Bonus to two different Stats, after Combat Stages, decided when the Eviolite is made. Prevents Pokémon from evolving when held. Cannot be used by Trainers.

- ✅ **Fairy Feather** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4220
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Fairy Moves used by the holder. Accessory Item for Trainers.

- ✅ **Fancy Clothes** — `auto` · P3 · themes: damage, stat, social · code: EQUIP_EFFECTS:12683
  - _Equipment · Slot Body · $$5000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Each set of Fancy Clothes is assigned a Contest Stat – either Beauty, Cool, Cute, Smart, or Tough. Trainers wearing these clothes may roll 2d6 during the Introduction Stage of a Contest to try to generate Contest Stat Dice for the assigned Stat.

- ✅ **Fire Gem** — `auto` · P3 · themes: swap, damage, action · code: zMoveName:4162
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - Can be consumed as a Free Action to give a +3 DB bonus to one Fire-Type attack. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Fist Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4224
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Fighting Type Booster and a Fighting Brace. Accessory Slot Item for Trainers.

<a id="verify-gear-02"></a>
## `verify-gear-02` — Verify gear the scan thinks are handled

P9 · 0 open of 59 · ✔ done

- ✅ **Flame Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4224
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Fire Type Booster and a Fire Brace. Accessory Slot Item for Trainers.

- ✅ **Flame Retardant Armor** — `auto` · P3 · themes: damage · code: EQUIP_EFFECTS:12677
  - _Equipment · Slot Body · $$5000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - You gain 10 Damage Reduction against Fire Type damage.

- ✅ **Flippers** — `auto` · P3 · themes: position · code: EQUIP_EFFECTS:12700
  - _Equipment · Slot Feet · $$2000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Flippers grant a +2 bonus to your Swim speed when fully submerged, and decrease your Overland speed by the same amount.

- ✅ **Focus** — `auto` · P3 · themes: cs, skill, stat · code: illusionMarkCap:4665, LAST_CHANCE_ABILITIES:4752, MELEE_SKILL_SUBS:8376, EQUIP_EFFECTS:12707, GIFTSAPPER_SKILLS:15112, POKE_EDGE_DEFS:18874, SKILL_WORDS:21622, openPowerChord:29765
  - _Equipment · Slot Accessory · $$6000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - A Focus grants +5 Bonus to a Stat, chosen when crafted. This Bonus is applied AFTER Combat Stages. Focuses are often Accessory-Slot Items, but may be crafted as Head-Slot, Hand or Off-Hand Slot Items as well; a Trainer may only benefit from one Focus at a time, regardless of the Equipment Slot. Focuses are not usually found in stores, but may sometimes be found for $6000 at your GM’s discretion.

- ✅ **Focus Band** — `auto` · P3 · themes: heal, swap · code: GEAR_ACTIONS:13056
  - _Pokémon Item · $$4700_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Whenever the user faints, roll 1d20. Once a Scene on a result of 16+, the holder does not faint, and is left with 1 Hit Point. Accessory Item for Trainers.

- ✅ **Focus Sash** — `auto` · P3 · themes: heal, swap, damage, skill · code: GEAR_ACTIONS:12955
  - _Pokémon Item · $$4700_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Once a Scene, if damage from a Move would take Focus Sash’s holder’s Hit Points from Max to 0 or less, Focus Sash’s holder instead has 1 Hit Point remaining. Accessory Item for Trainers.

- ✅ **Gas Mask** — `auto` · P3 · themes: status, typing · code: EQUIP_EFFECTS:12696
  - _Equipment · Slot Head · $$1500_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Gas Masks are invaluable equipment when trying to breathe in toxic environments or heavy smoke. They not only let you breathe through environmental toxins or smoke, but you become immune to the Moves Rage Powder, Poison Gas, Poisonpowder, Sleep Powder, Smog, Smokescreen, Spore, Stun Spore, and Sweet Scent.

- ⚪ **Gimmighoul Coin** — `manual` · P3 · themes: other · code: EVO_ITEM_COSTS:1847
  - _Key Item · $Varies_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - A small, ancient coin of unknown minting, hoarded by Gimmighoul in chests and in ruins. The coins are worthless as currency — no shop will take them — but a Gimmighoul that is given 999 of them at once will evolve into Gholdengo, absorbing every coin in the process.

- ✅ **Glue Cannon** — `auto` · P3 · themes: multiturn, status, damage · code: ITEM_MOVES:29234
  - _Equipment · Slot Hands · $$3000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Glue Cannons are exactly what you expect; This two-handed Equipment piece is a hand-held cannon that launches globs of glue. Attacking with a Glue Cannon expends a charge, which must be purchased. The attack is an AC8 Status Attack. If it hits, the target is Slowed. On a critical hit, the target is instead Stuck and Trapped. The Glue Cannon and three charge packets cost $3000, and additional charge packets costs $100.

- ✅ **Go-Goggles** — `auto` · P3 · themes: weather, swap, damage · code: WEATHER_DEFS:1472
  - _Pokémon Item · $$1500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user does not take damage from Sandstorm. Head Item for Trainers.

- ✅ **Gravity Modulation Suit** — `auto` · P3 · themes: action · code: EQUIP_EFFECTS:12712
  - _Equipment · Slot Body · $$4000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - You may treat the local gravity as if it were 1 lower or 1 higher. Changing the setting on the suit is an At-Will Extended Action requiring time for the suit to adjust to the new settings.

- ✅ **Guard Spec** — `auto` · P3 · themes: cs, damage, skill · code: X_ITEMS:34861
  - _Med Kit · $$700_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Prevents reduction of Combat Stages or Accuracy on the Pokémon for 5 Turns

- ✅ **HP Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19081
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers HP stat by 1 if trainer allows it.

- ✅ **HP Up** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19073, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s HP Base Stat 1.

- ✅ **Handheld Propellor** — `auto` · P3 · themes: position · code: EQUIP_EFFECTS:12701
  - _Equipment · Slot Off-Hand · $$3500_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases Swim speed by +3.

- ✅ **Hard Stone** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4219
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Rock Moves used by the holder. Accessory Item for Trainers.

- ✅ **Heavy Armor** — `auto` · P3 · themes: damage · code: luLevelBlock:12648, EQUIP_EFFECTS:12673
  - _Equipment · Slot Body · $$12000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Grants +5 Damage Reduction against all Damage.

- ⚪ **Heavy Armor [9-15 Playtest]** — `manual` · P3 · themes: damage · code: EQUIP_EFFECTS:12679
  - _Equipment · Slot Body · $$12000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - +5 Damage Reduction against all Damage.

- ✅ **Helmet** — `auto` · P3 · themes: status, typing, damage · code: EQUIP_EFFECTS:12690
  - _Equipment · Slot Head · $$2250_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user gains 15 Damage Reduction against Critical Hits. The user resists the Moves Headbutt and Zen Headbutt and can’t be flinched by these Moves.

- ✅ **Honey** — `auto` · P3 · themes: heal · code: eatSnack:18060, CAP_PRODUCERS:25675
  - _Food · $$100_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Snack. Grants a Digestion Buff that heals 5 Hit Points. May be used as Bait

- ✅ **Icicle Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4224
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both an Ice Type Booster and an Ice Brace. Accessory Slot Item for Trainers.

- ✅ **Insect Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4225
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Bug Type Booster and a Bug Brace. Accessory Slot Item for Trainers.

- ✅ **Iron Charm** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4220
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Steel Moves used by the holder. Accessory Item for Trainers.

- ✅ **Iron Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4225
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Steel Type Booster and a Steel Brace. Accessory Slot Item for Trainers.

- ✅ **Jungle Boots** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12699
  - _Equipment · Slot Feet · $$1500_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Jungle Boots grant you the Naturewalk (Forest) capability

- ✅ **Life Orb** — `auto` · P3 · themes: heal, swap, damage · code: GEAR_ACTIONS:13071
  - _Pokémon Item · $$3700_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Whenever the holder deals direct damage, increase the damage by +5, and then the holder loses Hit Points equal to 1/16th of their Max Hit Points. Off-Hand Item for Trainers.

- ⚪ **Light Armor [9-15 Playtest]** — `manual` · P3 · themes: damage · code: EQUIP_EFFECTS:12680
  - _Equipment · Slot Body · $$8000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - +5 Damage Reduction against Physical Damage.

- ✅ **Lum Berry** — `auto` · P3 · themes: cure · code: snackByKey:17899
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Cures any single status ailment. Tier 2.

- ✅ **Magnet** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4216
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Grants a +5 Damage Bonus to all direct-damage Electric Moves used by the holder. Accessory Item for Trainers.

- ✅ **Meadow Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4225
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Grass Type Booster and a Grass Brace. Accessory Slot Item for Trainers.

- ✅ **Mesh Shielding** — `auto` · P3 · themes: damage · code: EQUIP_EFFECTS:12678
  - _Equipment · Slot Body · $$8000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - An advanced anti-conductive fabric woven into a stiff jacket designed to shield sensitive electronics from damage and electrical shock. You gain 5 Damage Reduction against Electric Type damage. Whenever you would suffer Augmentation Shock, roll 1d2. On a 1, you suffer no ill effects.

- ✅ **Mind Aegis** — `auto` · P3 · themes: typing, skill · code: EQUIP_EFFECTS:12691
  - _Equipment · Slot Head · $$4000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Grants a +6 bonus to Focus checks to resist Telepathy. If the wearer has the Iron Mind Edge, Mind Aegis grants the Mindlock capability instead.

- ✅ **Mind Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4226
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Psychic Type Booster and a Psychic Brace. Accessory Slot Item for Trainers.

- ✅ **Miracle Seed** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4216
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Grass Moves used by the holder. Accessory Item for Trainers.

- ✅ **Mulch** — `auto` · P3 · themes: other · code: GARDEN_MULCH:36123, gardenPlantRow:36819
  - _Key Item · $$200_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Mulch may be used to temporarily increase soil Quality; it may be applied to a Plant to increase the Soil Quality of a plant by +1 for the following day. This cannot make a Soil Quality go above +2.

- ✅ **Mystic Water** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4215
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Water Moves used by the holder. Accessory Item for Trainers.

- ✅ **Never-Melt Ice** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4216, TYPE_PLATE_ITEMS:4230
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Grants a +5 Damage Bonus to all direct-damage Ice Moves used by the holder. Accessory Item for Trainers.

- ✅ **Normal Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4228
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Normal Type Booster and a Normal Brace. Accessory Slot Item for Trainers.

- ✅ **Oran Berry** — `auto` · P3 · themes: heal · code: gardenGrowers:36174
  - _Food · $$150_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Restores 5 Hit Points. Tier 1.

- ✅ **PP Up** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19080, moveFreqWhy:19146, moveLineShort:27381
  - _Med Kit · $$9800_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise one of the user’s Move’s Frequency one level. Use only one per Pokémon.

- ✅ **Pheromone Emitter** — `auto` · P3 · themes: action, skill · code: EQUIP_EFFECTS:12710
  - _Equipment · Slot Accessory · $$2000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Emits pheromones as a Swift Action that give a +4 bonus to a Charm or Intimidate check against wild Pokémon. Requires a Pheromone Cartridge to use. Comes with 1 Cartridge. More can be bought for 250 apiece.

- ✅ **Pink Pearl** — `auto` · P3 · themes: stat · code: typeBoosterIndex:4239
  - _Pokémon Item · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as a Psychic Type Booster. If held by a Spoink, it also acts as a Special Attack Stat Booster.

- ✅ **Pixie Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4226
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Fairy Type Booster and a Fairy Brace. Accessory Slot Item for Trainers.

- ✅ **Poison Barb** — `auto` · P3 · themes: swap, status, damage · code: TYPE_BOOSTER_ITEMS:4217
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Poison Moves used by the holder. Accessory Item for Trainers.

- ✅ **Poké Ball Tool Box** — `auto` · P3 · themes: other · code: POKEBALL_TOOL:35735
  - _Key Item · $$500_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - These tool boxes let those with the know-how craft and repair Poké Balls.

- ✅ **Portable Grower** — `auto` · P3 · themes: weather, interrupt · code: gardenGrowers:36173, gardenSoil:36253
  - _Key Item · $$2000_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Portable Growers can be used to grow berries and herbs. Portable Growers protect the plants within them from external weather, and never need to be fertilized. Each Grower holds one plant.

- ✅ **Poultices** — `auto` · P3 · themes: heal, social · code: INJURY_SOURCES:5903, BANDAGE_ITEMS:6420
  - _Med Kit · $$225_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Poultices are applied as Extended Actions on Pokémon or Trainers. Poultices last for 6 hours; while applied, they double the Natural Healing Rate of Pokémon or Trainers, meaning a Pokémon or Trainer will heal 1/8th of their Hit Points per half hour. Poultices also immediately heal one Injury if they remain in place for their full duration.
    
    If a Pokémon is damaged or loses Hit Points in any way, the Poulticess immediately stop working.  Poultices are itchy and irritating to the skin and may cause loyalty loss.

- ✅ **Quick Claw** — `auto` · P3 · themes: swap · code: heldCritBonus:4514
  - _Pokémon Item · $$4200_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user adds +10 to their Initiative. Accessory Item for Trainers.

- ✅ **Rad Fashion** — `auto` · P3 · themes: swap, action, skill · code: GEAR_ACTIONS:13042
  - _Pokémon Item · $$500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder may activate this item once a Scene as a Free Action to gain a +4 bonus to a single Save Check.

- ⚪ **Rare Candy** — `manual` · P3 · themes: stat · code: VITAMIN_DEFS:19087
  - _Med Kit · $$9800_
  - note: a drug, ritual or plot item with hours-long or table-narrated effects
  - These very rare treats are created from Shuckles that have held a Berry for a long time. When ingested by a Pokémon, the eater gains enough experience to reach its next Level. Pokémon may benefit from up to five Rare Candies in their lifetime.

- ✅ **Re-Breather** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12695
  - _Equipment · Slot Head · $$4000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - This small partial face mask allows Trainers and Pokémon to breathe underwater as if they had the Gilled Capability for up to an hour. The Re-Breather is refilled automatically in 5 minutes while in open air.

- ✅ **Reinforced Trenchcoat** — `auto` · P3 · themes: swap, damage, skill · code: EQUIP_EFFECTS:12675
  - _Equipment · Slot Body · $$10000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - A stylish utility version of Light Armor. Grants 5 Damage Reduction and provides a +4 bonus to Stealth checks to conceal weapons and prevents their detection by metal detectors.

- ✅ **Rough Fashion** — `auto` · P3 · themes: swap, action · code: GEAR_ACTIONS:13024
  - _Pokémon Item · $$500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder may activate this item once a Scene as a Free Action to cause a foe within 5 meters to take a -2 penalty to all rolls for one full round.

- ✅ **S Attack Booster** — `auto` · P3 · themes: swap, cs, skill, stat · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Special Attack Stat is +1 Combat Stage. Accessory Item for Trainers.

- ✅ **S Defense Booster** — `auto` · P3 · themes: swap, cs, skill, stat · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Special Defense Stat is +1 Combat Stage. Accessory Item for Trainers.

- ✅ **Safety Goggles** — `auto` · P3 · themes: swap, typing · code: powderImmuneWhy:37104
  - _Pokémon Item · $$1500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The holder is immune to Moves with the Powder Keyword. Accessory or Head Item for Trainers.

- ✅ **Sensor Disruption Vest** — `auto` · P3 · themes: damage · code: EQUIP_EFFECTS:12711
  - _Equipment · Slot Body · $$2000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - The specially designed material of this vest wreaks havoc with the sensors used on most Pokébot models and Eye Augmentations. Pokébots and any Trainers or Pokémon with an Eye Augmentation suffer a -2 penalty to their single target Accuracy Checks made against the wearer.

- ✅ **Sharp Beak** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4218
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Flying Moves used by the holder. Accessory Item for Trainers.

- ⚪ **Shield [9-15 Playtest]** — `manual` · P3 · themes: multiturn, swap, status, damage, action · code: EQUIP_EFFECTS:12706
  - _Equipment · Slot Off-Hand · $$3000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A Shield is an Off-Hand defensive item held in one hand or braced to an arm. Shields grant +1 Evasion. They may be readied as a Standard Action to instead grant +4 Evasion and 10 Damage Reduction until the end of your next turn, but also cause you to become Slowed for that duration. If used Two-Handed, shields can also function as a Small Melee Weapon.

<a id="verify-gear-03"></a>
## `verify-gear-03` — Verify gear the scan thinks are handled

P9 · 0 open of 35 · ✔ done

- ✅ **Shock Collar** — `auto` · P3 · themes: heal · code: GEAR_ACTIONS:13080
  - _Pokémon Item · $$3500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Comes with a remote activator, which when pressed, causes the Pokémon or Trainer wearing the shock collar to lose Hit Points equal to 1/6th of their Max Hit Points. This may be used to activate the “Press” Feature. Collars that work on Ground Type Pokémon are available for an additional $500.

- ✅ **Silk Scarf** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4215
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Normal Moves used by the holder. Accessory Item for Trainers.

- ✅ **Silver Powder** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4218
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Bug Moves used by the holder. Accessory Item for Trainers.

- ✅ **Sitrus Berry** — `auto` · P3 · themes: heal · code: inventoryRow:13739, snackByKey:17899, openFoodPicker:18383
  - _Food · $$250_
  - note: snackDef / Food engine (berries, Digestion Buffs) already implements it (verified in the running app)
  - Restores 15 Hit Points. Tier 2.

- ✅ **Sky Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4226
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Flying Type Booster and a Flying Brace. Accessory Slot Item for Trainers.

- ✅ **Slipstream Armor** — `auto` · P3 · themes: status, damage, action · code: EQUIP_EFFECTS:12676
  - _Equipment · Slot Body · $$10000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - A flexible and smooth light armor that can momentarily become nearly frictionless. Grants 5 Damage Reduction. Once a battle, the wearer may use a Swift Action to escape from being Stuck.

- ✅ **Snow Boots** — `auto` · P3 · themes: weather, position · code: EQUIP_EFFECTS:12698
  - _Equipment · Slot Feet · $$1500_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Snow Boots grant you the Naturewalk (Tundra) capability, but lower your Overland Speed by -1 while on ice or deep snow.

- ✅ **Soft Sand** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4217
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Ground Moves used by the holder. Accessory Item for Trainers.

- ✅ **Soothing Flute** — `auto` · P3 · themes: status, cure, damage, action, skill · code: itemFreqForKey:5610, defenseTypeMods:7448, EQUIP_EFFECTS:12715, hasSoothingFlute:13219, openSoothingFlute:13230, soothingFluteActionRow:13277
  - _Equipment · Slot Accessory · $$3000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - 1/Scene, as a Standard Action, play the Soothing Flute. This cures Enraged on all who hear it, and grants up to your Occult Education Rank allies affected by the Flute +5 Damage Reduction against Ghost-Type Attacks for the rest of the Scene.

- ⚪ **Special Armor [9-15 Playtest]** — `manual` · P3 · themes: damage · code: EQUIP_EFFECTS:12681
  - _Equipment · Slot Body · $$8000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - +5 Damage Reduction against Special Damage.

- ✅ **Special Attack Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19084
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers Special Attack stat by 1 if trainer allows it.

- ✅ **Special Defense Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19085
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers Special Defense stat by 1 if trainer allows it.

- ✅ **Speed Booster** — `auto` · P3 · themes: swap, cs, skill, stat · code: STAT_BOOSTER_ITEMS:34919
  - _Pokémon Item · $$4000_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The default state of the holder's Speed Stat is +1 Combat Stage. Accessory Item for Trainers.

- ✅ **Speed Suppressant** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19086
  - _Med Kit · $$500_
  - note: Vitamins / Suppressants card and the snack engine implement it
  - Lowers Speed stat by 1 if trainer allows it.

- ✅ **Spell Tag** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4219
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Ghost Moves used by the holder. Accessory Item for Trainers.

- ✅ **Splash Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4227
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Water Type Booster and a Water Brace. Accessory Slot Item for Trainers.

- ✅ **Spooky Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4227
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Ghost Type Booster and a Ghost Brace. Accessory Slot Item for Trainers.

- ✅ **Stealth Clothes** — `auto` · P3 · themes: swap, skill · code: EQUIP_EFFECTS:12682
  - _Equipment · Slot Body · $$2000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Whether it’s a dark cloak and hood, a ninja suit, or spy gear, these clothes help you blend in. This body-slot equipment raises your modifier to Stealth Checks made to remain unseen by +4, to a maximum total modifier of +4.

- ✅ **Stone Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4227
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Rock Type Booster and a Rock Brace. Accessory Slot Item for Trainers.

- ⚪ **Study Manual [5-15 Playtest]** — `manual` · P3 · themes: skill · code: isBookName:13348
  - _Key Item · $$1000_
  - note: equipment/book used through Skill Checks and Extended Actions at the table (Books have their own card)
  - A Study Manual is always assigned to a single Skill and covers a specific narrow field that can be taken as a Skill Stunt.
    
    Rank 1 - Novice General Education: You gain a Skill Stunt in the associated Skill of the Study Manual covering the narrow field specified by the Study Manual.
    Rank 2 - Expert General Education: You gain a general +2 Bonus to the associated Skill. This Bonus does not stack with other bonuses from Books or Equipment to the same Skill.

- ✅ **Surfboard** — `auto` · P3 · themes: position · code: EQUIP_EFFECTS:12702
  - _Equipment · Slot Feet · $$3500_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - A Surfboard grants a +3 bonus to your Swim Speed.

- ✅ **Tera Orb** — `auto` · P3 · themes: swap, typing, damage, action · code: TERA_ORB_NAME:2351, EQUIP_EFFECTS:12714
  - _Equipment · Slot Off-Hand · $$5000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Off-Hand or Accessory Slot Item for Trainers. A Trainer in possession of a Tera Orb may, as a Daily Frequency Swift Action, Terastalize one of their Pokemon. A Terastalized Pokemon loses its regular Types and becomes its Tera Type. It keeps STAB from its original Typing and gains no STAB on its Tera Type; instead, all of its Moves of the Tera Type gain a +10 Damage Bonus, and it may activate Abilities (such as Accelerate) as if it gained STAB on that Type. Moves that would change a Pokemon's Type, or give it an additional one, have no effect while it is Terastalized. A Pokemon remains Terastalized until it Faints or the Scene ends. (Paldea Dex Appendix II - OPTIONAL: Terastalization. Unoffic …

- ✅ **Thermal Dampening Suit** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12713
  - _Equipment · Slot Body · $$2000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - The user is invisible to thermal imaging gear.

- ✅ **Thermal Goggles** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12694
  - _Equipment · Slot Head · $$1000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Allows you to see in the IR spectrum, enabling you to easily pick out a person or Pokémon in camouflage or to identify sources of heat.

- ✅ **Thick Club** — `auto` · P3 · themes: swap · code: holdsThickClub:25290, abilityAccMods:25329
  - _Pokémon Item · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - When held by a Cubone or Marowak, this rare, dense bone grants the Pure Power Ability. Thick Clubs are Wielded. Cannot be used by Trainers.

- ✅ **Tiny Mushroom** — `auto` · P3 · themes: cs, skill, stat · code: GEAR_ACTIONS:12967, CAP_PRODUCERS:25679
  - _Food · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - The user loses 5 HP, and gains +1 Combat Stage in a random Stat.

- ✅ **Toxic Plate** — `auto` · P3 · themes: swap, status · code: TYPE_PLATE_ITEMS:4228
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both a Poison Type Booster and a Poison Brace. Accessory Slot Item for Trainers.

- ✅ **Twisted Spoon** — `auto` · P3 · themes: swap, damage · code: TYPE_BOOSTER_ITEMS:4218
  - _Pokémon Item · Slot Accessory · $$1800_
  - note: TYPE_BOOSTER_ITEMS / heldTypeBoost: +5 on that Type, always on (verified in the running app)
  - Grants a +5 Damage Bonus to all direct-damage Psychic Moves used by the holder. Accessory Item for Trainers.

- ✅ **Type Gem** — `auto` · P3 · themes: swap, damage, action, stat · code: zMoveName:4162
  - _Pokémon Item · $--_
  - note: Gems / Braces / Boosters / Lagging / Choice / Mega Stones are implemented (heldTypeBoost, heldDefenseMods, HELD_FX)
  - These items come in a variety of each of the Elemental Types, and are consumed as a Free Action to give a +3 Damage Base bonus to one attack of their Type. Off-hand or Accessory Slot Item for Trainers.

- ✅ **Universal Translator** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12697
  - _Equipment · Slot Head · $$10000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - You understand any spoken language recognized by the Universal Translator and can speak into it and have your words translated immediately. Usually programmed with all of the major human languages. Can be used to speak with Pokémon.

- ✅ **X Accuracy** — `auto` · P3 · themes: damage · code: X_ITEMS:34861
  - _Med Kit · $$600_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases Accuracy by +2

- ✅ **X Speed** — `auto` · P3 · themes: cs, skill · code: X_ITEMS:34861
  - _Med Kit · $$350_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Increases the Pokémon’s Speed by two Combat Stages

- ✅ **X-Ray Goggles** — `auto` · P3 · themes: other · code: EQUIP_EFFECTS:12693
  - _Equipment · Slot Head · $$8000_
  - note: EQUIP_EFFECTS / X_ITEMS row (verified in the running app)
  - Grants the user the X-Ray Vision Capability.

- ✅ **Zap Plate** — `auto` · P3 · themes: swap · code: TYPE_PLATE_ITEMS:4228
  - _Pokémon Item · Slot Accessory · $--_
  - note: HELD_FX / EQUIP_EFFECTS / GEAR_ACTIONS / heldDefenseMods already implement it (verified in the running app, v595)
  - Acts as both an Electric Type Booster and an Electric Brace. Accessory Slot Item for Trainers.

- ✅ **Zinc** — `auto` · P3 · themes: stat · code: VITAMIN_DEFS:19077, STAT_VITAMIN:35094
  - _Med Kit · $$4900_
  - note: engine references it in several places (restoratives, Vitamins/Suppressants, snacks, Type Boosters, crafting, Books) — verified by code read
  - Raise the user’s Special Defense Base Stat 1.

<a id="late-verify-gear-01"></a>
## `late-verify-gear-01` — Verify gear the scan thinks are handled

P9 · 0 open of 18 · ✔ done

- ✅ **Love Ball** — `auto` · P1 (player:Lázaro) · themes: other · code: ballModifier:17167
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -30 Modifier if the user has an active Pokémon that is of the same evolutionary line as the target, and the opposite gender. Does not work with genderless Pokémon.

- ✅ **Quick Ball** — `auto` · P1 (player:Lázaro) · themes: other · code: ballModifier:17162
  - _Poké Ball · Slot -20.0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - +5 to Modifier after 1 round of the encounter, +10 to Modifier after round 2, +20 to modifier after round 3.

- ✅ **Timer Ball** — `auto` · P1 (player:Lysgd) · themes: other · code: ballModifier:17161
  - _Poké Ball · Slot +5 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -5 to the Modifier after every round since the beginning of the encounter, until the Modifier is -20.

- ✅ **Air Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17135
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Flying or Ice type.

- ✅ **Dive Ball** — `auto` · P3 · themes: other · code: ballModifier:17164
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target was found underwater or underground.

- ✅ **Dusk Ball** — `auto` · P3 · themes: other · code: ballModifier:17165
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if it is dark, or if there is very little light out, when used.

- ✅ **Earth Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17134
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Grass or Ground type.

- ✅ **Gossamer Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17135
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Normal or Fairy type.

- ✅ **Haunt Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17134
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Dark or Ghost type.

- ✅ **Heat Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17135
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Electric or Fire type.

- ✅ **Heavy Ball** — `auto` · P3 · themes: other · code: ballModifier:17155
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -5 Modifier for each Weight Class the target is above 1.

- ✅ **Lure Ball** — `auto` · P3 · themes: other · code: ballModifier:17163
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target was baited into the encounter with food.

- ✅ **Master Ball** — `auto` · P3 · themes: other · code: BALL_FLAT:17133, ballModifier:17143
  - _Poké Ball · Slot -100.0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - Incredibly Rare. Worth at least $300,000. Sold nowhere.

- ✅ **Moon Ball** — `auto` · P3 · themes: other · code: ballModifier:17168
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target evolves with an Evolution Stone.

- ✅ **Mystic Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17135
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Dragon or Psychic type.

- ✅ **Net Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17134
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Water or Bug type.

- ✅ **Repeat Ball** — `auto` · P3 · themes: other · code: ballModifier:17166
  - _Poké Ball · Slot +0 · $$800_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if you already own a Pokémon of the target’s species.

- ✅ **Solid Ball** — `auto` · P3 · themes: other · code: BALL_TYPE_PAIRS:17134
  - _Poké Ball · Slot +0 · $--_
  - note: v597 ballModifier fills the Capture Roll bonus in the throw modal (target facts typed into the assistant)
  - -20 Modifier if the target is Rock or Steel type.

<a id="late-verify-gear-01"></a>
## `late-verify-gear-01` — Verify gear the scan thinks are handled

P9 · 4 open of 4 · open

- 🟢 **Egg Warmer** — `likely` · P1 (player:Handels) · themes: interrupt · code: CAP_PRODUCERS:25681
  - _Key Item · $$2500_
  - Egg Warmers are insulated cases that carry up to four Pokémon Eggs and protect them from harm. They also cause Pokémon to hatch twice as fast; each day spent in an Egg Warmer counts as 2 days for the purposes of Hatch Rate.

- 🟢 **Heart Scale** — `likely` · P3 · themes: other · code: CAP_PRODUCERS:25674
  - _Med Kit · $--_
  - Can be used to make Heart Boosters.

- 🟢 **Shield** — `likely` · P3 · themes: multiturn, swap, status, damage, action · code: FORME_SPECIES_WORDS:2606, ABILITY_ACTION_ROWS:3815, EQUIP_EFFECTS:12670, FORM_SUFFIXES:19920, pendingControl:23035, MOVE_COATS:23277, coatsOnHit:23328, moveCoatNode:23388
  - _Equipment · Slot Off-Hand · $$3000_
  - A Shield is an Off-Hand defensive item held in one hand or braced to an arm. Shields grant +1 Evasion. They may be readied as a Standard Action to instead grant +4 Evasion and 10 Damage Reduction until the end of your next turn, but also cause you to become Slowed for that duration. If used Two-Handed, shields can also function as a Small Melee Weapon.

- 🟢 **Special Armor** — `likely` · P3 · themes: damage · code: EQUIP_EFFECTS:12670
  - _Equipment · Slot Body · $$8000_
  - Grants +5 Damage Reduction against Special Damage.

## Not in any batch

Confirmed, flavour-only or skipped. Spot-check the ⚪ manual ones — they are a heuristic guess that the text has no mechanics.

- ⚪ **Abomasite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Abomasnow when used in conjuction with a Mega Ring.

- ⚪ **Absolite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Absol when used in conjuction with a Mega Ring.

- ⚪ **Aerodactylite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Aerodactyl when used in conjuction with a Mega Ring.

- ⚪ **Aggronite** — `manual` · P1 (player:Lysgd) · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Aggron when used in conjuction with a Mega Ring.

- ⚪ **Aguav Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Bitter Treat, Smart Poffin Ingredient. Tier 2.

- ⚪ **Alakazite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Alakazam when used in conjuction with a Mega Ring.

- ⚪ **Altarianite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Altaria when used in conjuction with a Mega Ring.

- ⚪ **Ampharosite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Ampharos when used in conjuction with a Mega Ring.

- ⚪ **Anomaly Detector** — `manual` · P3 · themes: other
  - _Equipment · Slot Item · $$2150_
  - When pointed at a person, Pokémon, or object, this handheld device can determine whether or not it belongs to this timeline or parallel universe. It gives no indication to the nature of the home universe, however.

- ⚪ **Audinite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Audino when used in conjuction with a Mega Ring.

- ⚪ **Banettite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Banette when used in conjuction with a Mega Ring.

- ⚪ **Beauty Poffin** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - Raises Beauty Contest Stat by +1 Contest Die.  Made with Chesto, Wiki, Bluk, Spelon and Pamtre Berries.

- ⚪ **Beedrillite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Beedrill when used in conjuction with a Mega Ring.

- ⚪ **Belue Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Cool or Tough Poffin Ingredient. Tier 2.

- ⚪ **Black Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Heavy Balls.

- ⚪ **Blastoisinite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Blastoise when used in conjuction with a Mega Ring.

- ⚪ **Blazikenite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Blaziken when used in conjuction with a Mega Ring.

- ⚪ **Blue Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Lure Balls.

- ⚪ **Blue Shard** — `manual` · P3 · themes: other
  - _Key Item · $--_
  - Associated with Water, Ice, & Flying.  With Gem Lore, 4 can be combined into a Water Stone.

- ⚪ **Bluk Berry** — `manual` · P3 · themes: other
  - _Food · $$150_
  - Beauty Poffin Ingredient. Tier 1.

- ⚪ **Cameruptite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Camerupt when used in conjuction with a Mega Ring.

- ⚪ **Charizardite X** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Charizard when used in conjuction with a Mega Ring.

- ⚪ **Charizardite Y** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Charizard when used in conjuction with a Mega Ring.

- ⚪ **Chilan Berry** — `manual` · P3 · themes: other
  - _Food · $$500_
  - Weakens foe’s Normal-type move. Tier 3.

- ⚪ **Collection Jar** — `manual` · P3 · themes: swap
  - _Key Item · $$100_
  - A simple sealable glass jar. Useful when collecting Items from Pokémon, such as Honey from Pokémon with the Honey Gather Ability, or MooMoo Milk from Pokémon with the Milk Collection Ability. Available almost everywhere.

- ⚪ **Cooking Set** — `manual` · P3 · themes: other
  - _Key Item · $$1000_
  - Used by Chefs to create Snacks and Refreshments.

- ⚪ **Cool Poffin** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - Raises Cool Contest Stat by +1 Contest Die.  Made with Cheri, Figy, Razz, Spelon and Belue Berries.

- ⚪ **Cute Poffin** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - Raises Cute Contest Stat by +1 Contest Die.  Made with Pecha, Mago, Nanab, Pamtre, and Watmel Berries.

- ⚪ **DIY Engineering [5-15 Playtest]** — `manual` · P3 · themes: swap, skill
  - _Key Item · $$1000_
  - Duct tape not included.
    
    Rank 1 - Novice Technology Education: Your material costs for crafting items crafted from Mechanical Scrap are reduced by 10%.
    Rank 2 - Expert Technology Education: Whenever you Scrap an Item you created, you gain Scrap worth 75% of its monetary cost instead of only 50%.

- ⚪ **Dawn Stone** — `manual` · P1 (player:Handels, player:Lázaro) · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Eevee, Male Kirlia, Female Snorunt

- ⚪ **Deepseascale** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Clamperl

- ⚪ **Deepseatooth** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Clamperl

- ⚪ **Diancite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Diancie when used in conjuction with a Mega Ring.

- ⚪ **Dimensional Field Analyzer** — `manual` · P3 · themes: other
  - _Equipment · Slot Item · $$5000_
  - A handheld device the size of a Geiger counter for campaigns featuring time travel or interdimensional travel of some other sort. This device can be calibrated to recognize a ‘home’ universe or timeline and can measure the amount of difference between a parallel universe and that home universe.

- ⚪ **Dragon Scale** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Seadra

- ⚪ **Dubious Disk** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Porygon2

- ⚪ **Durin Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Smart or Tough Poffin Ingredient. Tier 2.

- ⚪ **Dusk Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Eevee, Murkrow, Misdreavus, Lampent, Doublade

- ⚪ **Electirizer** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Electabuzz

- ⚪ **Extendable Grabby Arm** — `manual` · P3 · themes: other
  - _Equipment · Slot Main Hand · $$750_
  - A dexterous and flexible arm with a hand at the end. Can be used to grab and manipulate objects from 3 meters away.

- ⚪ **Figy Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Spicy Treat, Cool Poffin Ingredient. Tier 2.

- ⚪ **Fire Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Vulpix, Growlithe, Eevee, Pansear

- ⚪ **Fishing 101 [5-15 Playtest]** — `manual` · P3 · themes: status, cs, skill, capture, stat
  - _Key Item · $$1000_
  - A good way to waste an afternoon sitting at the side of a boat.
    
    Rank 1 - Novice Survival: You gain the Snare Capture Technique, but it only applies to Pokémon you have fished up.
    Rank 2 - Adept Survival: Whenever you fish up a Pokémon, choose two Combat Stats. That Pokémon becomes Flinched and loses 1 Combat Stage in each of the chosen Stats.

- ⚪ **Fishing Lure** — `manual` · P3 · themes: other
  - _Key Item · $$1500_
  - Instead of Bait, some trainers may opt to use a Fishing Lure when attempting to Fish. Fishing Lures work just like Bait, but can be used multiple times. If the line snaps or the fish gets away, they may take your lure with them, however.

- ⚪ **Fishing Rod** — `manual` · P3 · themes: other
  - _Equipment · Slot Hands · $Varies_
  - Fishing Rods are used to Fish. They are two-handed items. They come in three varieties; Old Rods, Good Rods, and Super Rods.

- ⚪ **Flashlight** — `manual` · P1 (player:Lysgd) · themes: other
  - _Key Item · $$200_
  - For, you know, seeing. In the dark. Yes.

- ⚪ **Galladite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Gallade when used in conjuction with a Mega Ring.

- ⚪ **Garchompite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Garchomp when used in conjuction with a Mega Ring.

- ⚪ **Gardevoirite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Gardevoir when used in conjuction with a Mega Ring.

- ⚪ **Gengarite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Gengar when used in conjuction with a Mega Ring.

- ⚪ **Glalitite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Glalie when used in conjuction with a Mega Ring.

- ⚪ **Glitch Detection Crystal** — `manual` · P3 · themes: other
  - _Equipment · Slot Accessory · $$800_
  - A crystal necklace which begins to display pixelated effects and static when near Glitch phenomena. Pixellation and static effects intensify proportionally to proximity to the phenomena.

- ⚪ **Good Rod** — `manual` · P3 · themes: other
  - _Equipment · Slot Hands · $$5000_
  - A better fishing rod.

- ⚪ **Green Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Friend Balls.

- ⚪ **Green Shard** — `manual` · P3 · themes: other
  - _Key Item · $--_
  - Associated with Bug, Grass, & Ground.  With Gem Lore, 4 can be combined into a Leaf Stone.

- ⚪ **Groomer's Kit** — `manual` · P3 · themes: other
  - _Key Item · $$500_
  - Used by Trainers with the Groomer Edge to clean their Pokémon.

- ⚪ **Gyaradosite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Gyarados when used in conjuction with a Mega Ring.

- ⚪ **Heracronite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Heracross when used in conjuction with a Mega Ring.

- ⚪ **Houndoominite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Houndoom when used in conjuction with a Mega Ring.

- ⚪ **How To Avoid Being Spooked [5-15 Playtest]** — `manual` · P3 · themes: status, typing, skill
  - _Key Item · $$1000_
  - A questionable old tome filled with Ghost-related esoterica.
    
    Rank 1 - Adept Occult Education: While holding a Cleanse Tag in your Main or Off-Hand Equipment Slot, you can see Pokémon and Trainers using the Invisibility Capability.
    Rank 2 - Expert Occult Education: While holding a Cleanse Tag in your Main or Off-Hand Equipment Slot, you are immune to the Cursed Status Affliction.

- ⚪ **Iapapa Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Sour Treat, Tough Poffin Ingredient. Tier 2.

- ⚪ **Ice Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Alolan Vulpix, Alolan Sandshrew, Galarian Darumaka, Eevee

- ⚪ **Kangaskhanite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Kangaskhan when used in conjuction with a Mega Ring.

- ⚪ **Latiasite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Latias when used in conjuction with a Mega Ring.

- ⚪ **Latiosite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Latios when used in conjuction with a Mega Ring.

- ⚪ **Leaf Stone** — `manual` · P1 (player:Handels) · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Gloom, Weepinbell, Exeggcute, Eevee, Nuzleaf, Pansage

- ⚪ **Lifting Frame** — `manual` · P3 · themes: other
  - _Equipment · Slot Main + Off Hand · $$3000_
  - A mechanized frame worn over each arm with motorized muscles. Grants +2 to Power Capability. The frames are too unwieldy to use other equipment such as weapons while wearing them.

- ⚪ **Lighter** — `manual` · P3 · themes: other
  - _Key Item · $$150_
  - For creating flames in a hurry.

- ⚪ **Loaded Dice** — `manual` · P3 · themes: other
  - _Pokémon Item · $$7777_
  - Whenever the user uses a Five-Strike Move, when determining how many times the Move hits, roll the d8 twice and take the better result. Cannot be used by Trainers.

- ⚪ **Lopunnite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Lopunny when used in conjuction with a Mega Ring.

- ⚪ **Lucarionite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Lucario when used in conjuction with a Mega Ring.

- ⚪ **Magmarizer** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Magmar

- ⚪ **Mago Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Sweet Treat, Cute Poffin Ingredient. Tier 2.

- ⚪ **Manectite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Manectric when used in conjuction with a Mega Ring.

- ⚪ **Mawilite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Mawile when used in conjuction with a Mega Ring.

- ⚪ **Max Repel** — `manual` · P1 (player:Handels) · themes: stat
  - _Key Item · $$400_
  - Lasts 5 hours; causes Pokémon of level 35 or lower to flee.

- ⚪ **Medichamite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Medicham when used in conjuction with a Mega Ring.

- ⚪ **Metagrossite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Metagross when used in conjuction with a Mega Ring.

- ⚪ **Metal Coat** — `manual` · P1 (player:Lysgd) · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Onix, Scyther

- ⚪ **Mewtwonite X** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Mewtwo when used in conjuction with a Mega Ring.

- ⚪ **Mewtwonite Y** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Mewtwo when used in conjuction with a Mega Ring.

- ⚪ **Moon Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Nidorina, Nidorino, Clefairy, Jigglypuff, Eevee, Skitty, Munna

- ⚪ **Nanab Berry** — `manual` · P3 · themes: other
  - _Food · $$150_
  - Cute Poffin Ingredient. Tier 1.

- ⚪ **Old Rod** — `manual` · P3 · themes: other
  - _Equipment · Slot Hands · $$1000_
  - A basic fishing rod.

- ⚪ **Orange Shard** — `manual` · P3 · themes: other
  - _Key Item · $--_
  - Associated with Normal, Fighting, & Dragon.  With Gem Lore, 4 can be combined into a Shiny Stone.

- ⚪ **Oval Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Happiny

- ⚪ **Oxygenation Vial** — `manual` · P3 · themes: other
  - _Med Kit · $$500_
  - These vials contain a solution of oxygen-encasing lipids that are injected directly into the bloodstream. One injection is enough to allow the user to go without breathing for up to thirty minutes. Subsequent injections extend the effect, but each one after the first in a 24 hour period causes the user to take one injury as their body suffers complications from the imbalance caused by the solution. These are often carried as a last resort device for astronauts and deep sea divers, as well as used by EMTs to stabilize patients.

- ⚪ **Pamtre Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Cute or Beauty Poffin Ingredient. Tier 2.

- ⚪ **Park Ball** — `manual` · P1 (player:Handels) · themes: other
  - _Poké Ball · Slot -15.0 · $$800_
  - Used during Safari hunts.

- ⚪ **Pheromone Cartridge** — `manual` · P3 · themes: other
  - _Equipment · Slot Consumable · $$250_
  - A cartridge for the Pheromone Emitter.

- ⚪ **Pidgeotite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Pidgeotto when used in conjuction with a Mega Ring.

- ⚪ **Pinap Berry** — `manual` · P3 · themes: other
  - _Food · $$150_
  - Tough Poffin Ingredient. Tier 1.

- ⚪ **Pink Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Love Balls.

- ⚪ **Pinsirite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Pinsir when used in conjuction with a Mega Ring.

- ⚪ **Poffin Mixer** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - A Poffin Mixer can be used by any Trainer to create Poffins. You simply insert cooking ingredients worth $500, and at least one of the listed berries. You create two Poffins that raises the Contest Stat most represented by the berries used by +1 Contest Die. Some Berries can raise multiple Contest Stats; you choose which to raise when using these Berries to make Poffins. Poffins can be purchased for $500 in bakeries.
    
    Cheri, Figy, Razz, Spelon and Belue Berries raise Cool; Chesto, Wiki, Bluk, Spelon and Pamtre Berries raise Beauty; Pecha, Mago, Nanab, Pamtre, and Watmel Berries raise Cute; Rawst, Aguav, Wepear, Watmel, and Durin Berries raise Smart; Aspear, Iapapa, Pinap, Durin, and Belue Be …

- ⚪ **Poké Ball Alarm** — `manual` · P3 · themes: other
  - _Poké Ball · Slot -- · $$1000_
  - A belt with six slots for Poké Balls. Poké Balls affixed to the belt are locked in place with a number pad password to unlock them. Tampering with the belt triggers the password prompt, and failure to input the correct password within a minute triggers a loud alarm system.

- ⚪ **Pokémon Daycare Licensing Guide [5-15 Playtest]** — `manual` · P3 · themes: skill, stat
  - _Key Item · $$1000_
  - This book teaches advanced Pokémon Breeding techniques.
    
    Rank 1 - Adept Pokémon Education: When Breeding Pokémon of this Book’s Egg Group, you may choose which parent’s species the Egg is of.
    Rank 2 - Master Pokémon Education: When hatching Eggs of Pokémon of this Book’s Egg Group, the hatched Pokémon learns their first Inheritance Move at Level 10 instead of Level 20.

- ⚪ **Pokéradar** — `manual` · P3 · themes: other
  - _Equipment · Slot Off-Hand · $$5000_
  - Contrary to its name, this handheld device actually detects both human and Pokémon lifesigns in a 20 meter radius and can display their relative location to you on a screen. No information is given about specific species.

- ⚪ **Premier Ball** — `manual` · P1 (player:Lázaro) · themes: other
  - _Poké Ball · Slot +0 · $$800_
  - Given as promotional balls during sales.

- ⚪ **Protector** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Rhydon

- ⚪ **Razz Berry** — `manual` · P3 · themes: other
  - _Food · $$150_
  - Cool Poffin Ingredient. Tier 1.

- ⚪ **Reanimation Machine** — `manual` · P3 · themes: other
  - _Key Item · $Varies_
  - Can be used to revive Fossils. Reanimation Machines also come in a smaller but more expensive Portable variety. Prices are up to GM discretion, often upwards of $10,000. See the Pokémon Fossils section for more details (page 216).

- ⚪ **Reaper Cloth** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Dusclops

- ⚪ **Red Shard** — `manual` · P3 · themes: other
  - _Key Item · $--_
  - Associated with Fire, Fairy, & Psychic.  With Gem Lore, 4 can be combined into a Fire Stone.

- ⚪ **Repel** — `manual` · P3 · themes: stat
  - _Key Item · $$200_
  - Lasts 1 hour; causes Pokémon of level 15 or lower to flee.

- ⚪ **Roseli Berry** — `manual` · P3 · themes: other
  - _Food · $$500_
  - Weakens foe’s supereffective Fairy-type move. Tier 3.

- ⚪ **Sablenite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Sableye when used in conjuction with a Mega Ring.

- ⚪ **Sachet** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Spritzee

- ⚪ **Safari Ball** — `manual` · P1 (player:Lázaro) · themes: other
  - _Poké Ball · Slot +0 · $$800_
  - Used during Safari hunts.

- ⚪ **Salamencite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Salamence when used in conjuction with a Mega Ring.

- ⚪ **Sceptilite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Sceptile when used in conjuction with a Mega Ring.

- ⚪ **Scizorite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Scizor when used in conjuction with a Mega Ring.

- ⚪ **Scrub Cartridge** — `manual` · P3 · themes: other
  - _Equipment · Slot Consumable · $$300_
  - A cartridge for Scrubbing Spray.

- ⚪ **Sharpedonite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Sharpedo when used in conjuction with a Mega Ring.

- ⚪ **Shiny Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Eevee, Togetic, Roselia, Minccino, Floette

- ⚪ **Sleeping Bag** — `manual` · P1 (player:Handels, player:Lysgd) · themes: other
  - _Key Item · $$1000_
  - A standard sleeping bag.  Holds one person.

- ⚪ **Sleeping Bag (Double)** — `manual` · P3 · themes: other
  - _Key Item · $$1800_
  - A standard sleeping bag.  Holds two people.

- ⚪ **Slowbronite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Slowbro when used in conjuction with a Mega Ring.

- ⚪ **Smart Poffin** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - Raises Smart Contest Stat by +1 Contest Die.  Made with Rawst, Aguav, Wepear, Watmel, and Durin Berries.

- ⚪ **Smoke Ball** — `manual` · P3 · themes: other
  - _Equipment · Slot Consumable · $$500_
  - When used, a Smoke Ball creates a 3 meter blast that fills the area with smoke, as if the move Smokescreen had been used. Smoke Balls can only be found in specialty shops.

- ⚪ **Spelon Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Cool or Beauty Poffin Ingredient. Tier 2.

- ⚪ **Sport Ball** — `manual` · P1 (player:Lázaro) · themes: other
  - _Poké Ball · Slot +0 · $$800_
  - Used during Safari hunts.

- ⚪ **Steelixite** — `manual` · P1 (player:Handels) · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Steelix when used in conjuction with a Mega Ring.

- ⚪ **Sun Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Gloom, Sunkern, Cottonee, Petilil, Helioptile

- ⚪ **Super Repel** — `manual` · P3 · themes: stat
  - _Key Item · $$300_
  - Lasts 2 hours; causes Pokémon of level 25 or lower to flee.

- ⚪ **Super Rod** — `manual` · P3 · themes: other
  - _Equipment · Slot Hands · $$15000_
  - The best fishing rod.

- ⚪ **Swampertite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Swampert when used in conjuction with a Mega Ring.

- ⚪ **Tent** — `manual` · P3 · themes: interrupt
  - _Key Item · $400/m^3_
  - Standard outdoor tents. Provide protection from the elements of nature. A small one person tent would be about 1m x 1.5m x 1.5m, or 2.25 cubic meters– meaning 900 in price.

- ⚪ **The Anarchist Cookbook [5-15 Playtest]** — `manual` · P3 · themes: heal, multiturn, status, action, skill
  - _Key Item · $$1000_
  - The simple act of owning this book isn’t illegal, but carrying out its suggestions might be.
    
    Rank 1 - Novice Technology Education: Whenever you apply a Repel to a target, they become Blinded until the end of their next turn. This may only affect a target once per Scene.
    Rank 2 - Expert Technology Education: Whenever you hit a target with a Repel or Pester Ball, they lose Hit Points equal to your Technology Education Rank.

- ⚪ **The Joy of Cooking [5-15 Playtest]** — `manual` · P3 · themes: heal, skill
  - _Key Item · $$1000_
  - A cookbook for novice and experienced chefs alike.
    
    Rank 1 - Novice General Education: Your material costs for crafting Food Items of any variety are reduced by 10%.
    Rank 2 - Expert General Education: Meal and Refreshment Items you create cause whoever eats them to gain a Tick of Hit Points.

- ⚪ **Thunder Stone** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Pikachu, Eevee, Eelektrik

- ⚪ **Tough Poffin** — `manual` · P3 · themes: stat, social
  - _Key Item · $$500_
  - Raises Tough Contest Stat by +1 Contest Die.  Made with Aspear, Iapapa, Pinap, Durin, and Belue Berries.

- ⚪ **Traditional Medicine Reference [5-15 Playtest]** — `manual` · P3 · themes: heal, cs, skill
  - _Key Item · $$1000_
  - A volume dedicated to properly preparing herbal medications. See PTU May 2015 Playtest Packet - Miscellaneous Errata for Herbal Restorative errata.
    
    Rank 1 - Adept Medicine Education: Targets you administer Herbal Restoratives to do not lose Combat Stages no matter how many Herbal Restoratives they’ve had in the same day.
    Rank 2 - Expert Medicine Education: Whenever you administer an Herbal Restorative to a target, they may choose to gain the Food Buff associated with Herbal Restoratives, regardless of how many Herbal Restoratives they’ve used this day.

- ⚪ **Treecko Gear** — `manual` · P3 · themes: other
  - _Equipment · Slot Main + Off Hand, Feet · $$3500_
  - Grants the Wallclimber capability.

- ⚪ **Tyranitarite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Tyranitar when used in conjuction with a Mega Ring.

- ⚪ **Up-Grade** — `manual` · P1 (player:Lázaro) · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Porygon

- ⚪ **Venusaurite** — `manual` · P3 · themes: other
  - _Pokémon Item · $--_
  - Mega Evolves Venusaur when used in conjuction with a Mega Ring.

- ⚪ **Violet Shard** — `manual` · P3 · themes: status
  - _Key Item · $--_
  - Associated with Poison, Dark, & Ghost.  With Gem Lore, 4 can be combined into a Dusk Stone.

- ⚪ **Water Filter** — `manual` · P3 · themes: other
  - _Key Item · $$500_
  - Can ensure that river or pond water is clean to drink after being filtered.

- ⚪ **Waterproof Flashlight** — `manual` · P3 · themes: other
  - _Key Item · $$600_
  - For, you know, seeing. In the dark. Yes.  Waterproof.

- ⚪ **Waterproof Lighter** — `manual` · P3 · themes: other
  - _Key Item · $$1000_
  - For creating flames in a hurry.  Waterproof.

- ⚪ **Watmel Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Cute or Smart Poffin Ingredient. Tier 2.

- ⚪ **Wepear Berry** — `manual` · P3 · themes: other
  - _Food · $$150_
  - Smart Poffin Ingredient. Tier 1.

- ⚪ **Whipped Dream** — `manual` · P3 · themes: other
  - _Pokémon Item · $$3000_
  - Evolves Swirlix

- ⚪ **White Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Fast Balls.

- ⚪ **Wiki Berry** — `manual` · P3 · themes: other
  - _Food · $$250_
  - Dry Treat, Beauty Poffin Ingredient. Tier 2.

- ⚪ **Yellow Apricorn** — `manual` · P3 · themes: other
  - _Food · $--_
  - Used to make Moon Balls.

- ⚪ **Yellow Shard** — `manual` · P3 · themes: other
  - _Key Item · $--_
  - Associated with Electric, Rock, & Steel.  With Gem Lore, 4 can be combined into a Thunder Stone.

