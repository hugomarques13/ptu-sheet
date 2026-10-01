# edges — automation ledger

[← LEDGER](../LEDGER.md)

<a id="edges-01"></a>
## `edges-01` — Skills & checks, Type changes & immunities, Action economy & AP, Healing, drain, recoil & HP, Movement, push & switching, Ability / item / stat swaps, Stats & level

P1 · 0 open of 24 · ✔ done

- ✅ **Adept Skills** — `auto` · P1 (enc, player:Handels, player:Lysgd, player:Lázaro) · themes: skill
  - _Skill Edges · Prereq: Level 2_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - You Rank Up a Skill from Novice to Adept. You may take this Edge multiple times.

- ✅ **Basic Skills** — `auto` · P1 (enc, player:Handels, player:Hugo, player:Lysgd) · themes: skill
  - _Skill Edges_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - You Rank Up a Skill from Pathetic to Untrained, or Untrained to Novice. You may take this Edge multiple times.

- ✅ **Expert Skills** — `auto` · P1 (enc, player:Handels, player:Lysgd, player:Lázaro) · themes: skill
  - _Skill Edges · Prereq: Level 6_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - You Rank Up a Skill from Adept to Expert. You may take this Edge multiple times.

- ⚪ **Mystic Senses** — `manual` · P2 (enc) · themes: skill, social
  - _Other Edges · Prereq: Novice Intuition_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use Intuition instead of Charm to improve the disposition of Wild Pokemon. You may not take Mystic Senses if you have the Elemental Connection Edge, and you may not take Elemental Connection if you have Mystic Senses.

- ✅ **Skill Enhancement** — `auto` · P2 (enc) · themes: skill
  - _Skill Edges_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - Choose two different Skills. You gain a +2 bonus to each of those skills. Skill Enhancement may be taken multiple times, but the bonus may be applied only once to a particular skill.

- ⚪ **Train the Reserves** — `manual` · P2 (enc) · themes: skill, stat
  - _Pokémon Training Edges · Prereq: Novice Command_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may apply Experience Training to a number of Pokemon equal to twice your Command Rank, instead of equal to your Command Rank.
    Note: Beast Master or Groomer do not change the Skill that this Edge uses.

- ⚪ **Beast Master** — `manual` · P3 · themes: skill, stat, social
  - _Pokémon Training Edges · Prereq: Novice Intimidate_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use Intimidate instead of Command to make Pokemon at 0 or 1 Loyalty obey your commands.  You may also use Intimidate instead of Command to determine the limits and Bonus Experience from Training.

- ⚪ **Breeder** — `manual` · P3 · themes: skill
  - _Pokémon Training Edges · Prereq: Novice Pokemon Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - If you are able to give two Pokemon that are compatible for breeding at least 4 hours of time alone, you may make a Pokemon Education Check with a DC of 12. If you succeed, the Pokemon are guaranteed to produce an egg if you give them an additional 4 hours.

- ⚪ **Groomer** — `manual` · P3 · themes: skill, stat, social
  - _Pokémon Training Edges · Prereq: Novice Pokemon Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You know how to effectively groom your Pokemon with access to a Groomer's Kit. You may groom up to 6 Pokemon in one hour. Grooming Pokemon may count as an hour of Training, and you may apply Experience Training, teach Poke-Edges, and apply any Features that could be applied during Training. If you apply Experience Training from Grooming, use your General Education or Pokemon Education Rank to determine Bonus Experience gained during Training. A Pokemon that has been Groomed also gains a +1d6 Bonus to the Introduction Roll of a Contest for the rest of the day.

- ⚪ **Paleontologist** — `manual` · P3 · themes: skill
  - _Pokémon Training Edges · Prereq: Novice Pokemon Education or Novice Survival_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You can identify fossils with a DC 10 Pokemon Education or Survival Check. You know how to operate Reanimation Machines and can use them to revive Fossils. See the "Pokemon Fossils" section (page 216) for more information.

- ⚪ **PokePsychologist** — `manual` · P3 · themes: skill, social
  - _Other Edges · Prereq: Novice Pokemon Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use your Pokemon Education Skill instead of Charm, Guile, Intimidate, or Intuition when making general Skill checks to interact with Pokemon or to raise or lower disposition.

- ⚪ **Pokebot Training** — `manual` · P3 · themes: skill
  - _Do Porygon Dream of Mareep · Prereq: Novice Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may control a Pokebot with Complexity up to your Technology Rank by using a Pokemon turn.

- ⚪ **PokéPsychologist** — `manual` · P3 · themes: skill, social
  - _Other Edges · Prereq: Novice Pokemon Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use your Pokemon Education Skill instead of Charm, Guile, Intimidate, or Intuition when making general Skill checks to interact with Pokemon or to raise or lower disposition.

- ⚪ **Pokébot Training** — `manual` · P3 · themes: skill
  - _Do Porygon Dream of Mareep · Prereq: Novice Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may control a Pokebot with Complexity up to your Technology Rank by using a Pokemon turn.

- ⚪ **Tag Scribe** — `manual` · P3 · themes: skill
  - _Crafting Edges · Prereq: Novice Occult Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You create a Cleanse Tag. This may be used a number of times each day equal to half your Occult Education Rank.

- ⚪ **Elemental Connection** — `manual` · P1 (enc, player:Lysgd, player:Lázaro) · themes: typing, skill
  - _Other Edges_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Choose an Elemental Type. You gain a +2 bonus to Charm, Command, Guile, Intimidate, and Intuition Checks targeting Pokemon of that Type. You may not take Elemental Connection if you have the Mystic Senses Edge, and you may not take Mystic Senses if you have Elemental Connection.

- ⚪ **Gem Lore** — `manual` · P3 · themes: action
  - _Crafting Edges · Prereq: Novice Occult Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - As an Extended Action, you may turn a Shard into a Gem of one of its associated Types. Additionally, you can turn 4 Red Shards into a Fire Stone; 4 Blue Shards into a Water Stone; 4 Yellow Shards into a Thunder Stone; 4 Orange Shards into a Shiny Stone; 4 Green Shards into a Leaf Stone; or 4 Violet Shards into a Dusk Stone. You can also destroy any of these six Stones to gain 4 Shards of the corresponding color.

- ⚪ **Quick Case** — `manual` · P3 · themes: action, capture
  - _Do Porygon Dream of Mareep · Prereq: Novice Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may remove a Case from a Poke Ball as a Swift Action. You may apply a Case to a Poke Ball as a Shift Action. (Normally these would be Shift and Standard Actions respectively.)

- ⚪ **Emergency Repairs** — `manual` · P3 · themes: heal, damage, action, skill
  - _Do Porygon Dream of Mareep · Prereq: Novice Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may repair vehicles as a standard action by making a Technology Education roll. You pay the amount of your roll and repair that much Hit Point damage to the vehicle. If the vehicle has any Breaches you may Patch one of them. Patched Breaches no longer count towards Breach Security but still count toward Breach Capacity.

- ⚪ **Field Clinic [9-15 Playtest]** — `manual` · P3 · themes: heal, action
  - _Here Thar Be Playtests · Prereq: Adept Medicine Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Whenever your party Sets Up Camp, you may spend $200 worth of Medical Scrap to set up a Field Clinic. While using the Field Clinic, all members gain the following benefits;
    »» You may spend $300 of Medical Scrap to create and apply a Bandage or use a First Aid Kit
    »» If you have the Nurse Feature, you may spend $300 to activate it without Draining AP.
    »» Potions, Super Potions, Hyper Potions, Full Restores, Revives, Energy Powders, and Energy Roots used in this area heal their target an additional 5 Hit Points.

- ⚪ **Slippery** — `manual` · P3 · themes: position, swap, skill
  - _Combat Edges · Prereq: Novice Stealth_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use your Stealth Skill when defending in Opposed Grapple, Push, or Trip checks. When Grappling, if you win an Opposed Check when using Stealth, you must choose to end the Grapple (you cannot choose to gain Dominance).

- ⚪ **Traveler** — `manual` · P3 · themes: position, skill
  - _Other Edges · Prereq: Novice Survival_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may use Survival instead of Athletics and Acrobatics to determine your Power Capability, High Jump, and Long Jump values. Determine your Overland Movement by substituting your Survival Rank for the lower of your Athletics or Acrobatics Rank.

- ⚪ **Grace** — `manual` · P3 · themes: swap, damage, stat, social
  - _Pokémon Training Edges · Prereq: Novice Charm, Command, Guile, Intimidate, or Intuition_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Your Pokemon may consume and benefit from 2 more Poffins each. If this Pokemon is traded to a Trainer without the Grace feature, these extra dice from additional Poffins are not lost, but a Trainer without Grace may not benefit from more than 6 Dice gained from Poffins. You may always use any of the Skills that are prerequisites for Grace in the Introduction Stage of a Contest to roll for Contest Stat Dice of any kind.

- ⚪ **Trainer of Champions** — `manual` · P3 · themes: stat
  - _Pokémon Training Edges · Prereq: Expert Command_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Whenever you apply Experience Training to a Pokemon, they gain an additional +5 Experience.

<a id="verify-edges-01"></a>
## `verify-edges-01` — Verify edges the scan thinks are handled

P9 · 0 open of 40 · ✔ done

- ⚪ **Basic Balls** — `manual` · P1 (player:Lázaro) · themes: capture · code: POKEBALL_RECIPES:34655
  - _Crafting Edges · Prereq: Novice Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may craft Basic Balls for $100 and Great Balls for $175. Requires access to a Poke Ball Tool Box.

- ⚪ **Basic Cooking** — `manual` · P1 (player:Handels) · themes: other · code: CHEF_RECIPES:32902
  - _Crafting Edges · Prereq: Novice Intuition_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may create "Candy Bars" or "Baby Food" with cooking ingredients costing $50. You may fluff the food in any reasonable manner you like.

- ✅ **Charmer** — `auto` · P1 (enc, player:Handels, player:Lysgd) · themes: other · code: EDGE_FX:119
  - _Combat Edges · Prereq: Novice Charm_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Baby-Doll Eyes.

- ✅ **Demoralize** — `auto` · P1 (enc, player:Lysgd) · themes: status, damage · code: openTrainerAttack:10254, FEATURE_GIFTS:11853
  - _Combat Edges · Prereq: Adept Intimidate_
  - note: EDGE_FX row (verified in the running app, v597)
  - Whenever you land a Critical Hit on a foe, that foe becomes Vulnerable. Status-Class Moves with an Accuracy Roll can "Crit" for the purposes of activating this effect on a natural roll of 19 or higher, and any effects that expand your Critical-Hit Range also expand this range.

- ✅ **Flustering Charisma** — `auto` · P1 (player:Lysgd) · themes: interrupt · code: EDGE_FX:131
  - _Combat Edges · Prereq: Adept Charm or Guile_
  - note: EDGE_FX row (verified in the running app, v597)
  - When you hit with a Move with the Social keyword, the target takes a -2 penalty to Save Checks against Volatile Status Afflictions for 1 full round.

- ✅ **Intimidating Presence** — `auto` · P1 (enc, player:Handels) · themes: other · code: EDGE_FX:121
  - _Combat Edges · Prereq: Novice Intimidate_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Leer.

- ✅ **Master Skills** — `auto` · P1 (enc, player:Handels, player:Lysgd, player:Lázaro) · themes: skill · code: VIRTUOSO_EDGE:36
  - _Skill Edges · Prereq: Level 12_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - You Rank Up a Skill from Expert to Master. You may take this Edge multiple times.

- ✅ **Medic Training** — `auto` · P1 (enc, player:Lysgd, player:Lázaro) · themes: heal, multiturn · code: EDGE_FX:143, FEATURE_GIFTS:11856, openApplyRestorative:29480
  - _Other Edges · Prereq: Novice Medicine Education_
  - note: EDGE_FX row (verified in the running app, v597)
  - When you use Restorative Items on others, they do not forfeit their next turn.

- ✅ **Smooth** — `auto` · P1 (enc, player:Lysgd) · themes: status, damage · code: EDGE_FX:129
  - _Combat Edges · Prereq: Expert Charm or Focus_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain +4 Evasion against Moves with the Social keyword, and gain a +2 Bonus on Save Checks against Rage and Infatuation.

- ✅ **Acrobat** — `auto` · P2 (enc) · themes: position · code: EDGE_FX:136
  - _Other Edges · Prereq: Novice Acrobatics_
  - note: EDGE_FX row (verified in the running app, v597)
  - Increase your Jump and Long Jump Capabilities by +1 each.

- ✅ **Athletic Initiative** — `auto` · P2 (enc) · themes: other · code: EDGE_FX:116
  - _Combat Edges · Prereq: Adept Athletics_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Agility.

- ⚪ **Bad Mood** — `manual` · P2 (enc) · themes: damage · code: badMoodCrit:8543
  - _Combat Edges · Prereq: Expert Intimidate_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Your Critical Hit Range is increased by +1 if you are suffering from a Persistent Status Affliction. Your Critical Hit Range is increased by +1 if you are suffering from a Volatile Status Affliction. These stack with each other, giving a total of +2 to Critical Hit Range if you are suffering from both a Persistant and a Volatile Status Affliction.

- ✅ **Basic Martial Arts** — `auto` · P2 (enc) · themes: other · code: EDGE_FX:117
  - _Combat Edges · Prereq: Novice Combat_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Rock Smash.

- ✅ **Basic Psionics** — `auto` · P2 (enc) · themes: status · code: EDGE_FX:118
  - _Combat Edges · Prereq: Elemental Connection (Psychic)_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Confusion.

- ⚪ **Categoric Inclination** — `manual` · P2 (enc) · themes: skill · code: categoricBonus:89, renderTrainer:7790
  - _Skill Edges_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Choose Body, Mind, or Spirit. You gain a +1 Bonus to all Skill Checks of that Category.

- ✅ **Confidence Artist** — `auto` · P2 (enc) · themes: other · code: EDGE_FX:120
  - _Combat Edges · Prereq: Novice Guile_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Confide.

- ✅ **Expert Manipulator** — `auto` · P2 (enc) · themes: action · code: EDGE_FX:132
  - _Combat Edges · Prereq: Adept Guile_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain a +2 Opposed Checks with all Manipulate Maneuvers. The "Once per Scene per Foe" Limitation of each Manipulate Maneuver is expended only upon succesfully affecting a foe with that Manipulate Maneuver.

- ✅ **Expert Trickster** — `auto` · P2 (enc) · themes: action · code: EDGE_FX:133
  - _Combat Edges · Prereq: Adept Stealth_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain a +2 Opposed Checks with all Dirty Trick Maneuvers. The "Once per Scene per Foe" Limitation of each Dirty Trick Maneuver is expended only upon successfully affecting a foe with that Dirty Trick Maneuver.

- ✅ **Kip Up** — `auto` · P2 (enc) · themes: status, action · code: EDGE_FX:127
  - _Combat Edges · Prereq: Expert Acrobatics_
  - note: EDGE_FX row (verified in the running app, v597)
  - You may stand up from being Tripped as a Swift Action.

- ✅ **Leader** — `auto` · P2 (enc) · themes: other · code: EDGE_FX:122
  - _Combat Edges · Prereq: Adept Command_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move After You.

- ✅ **Nimble Movement** — `auto` · P2 (enc) · themes: position · code: EDGE_FX:128
  - _Combat Edges · Prereq: Adept Acrobatics or Stealth_
  - note: EDGE_FX row (verified in the running app, v597)
  - Whenever you Disengage, you Shift 2 meters instead of 1.

- ✅ **Stamina** — `auto` · P2 (enc) · themes: heal, damage, skill · code: EDGE_FX:130, ABILITY_REACTIONS:23315
  - _Combat Edges · Prereq: Expert Athletics or Combat_
  - note: EDGE_FX row (verified in the running app, v597)
  - Whenever you Take a Breather or take Massive Damage or a Critical Hit, you gain Temporary Hit Points equal to your Athletics or Combat Rank after the triggering action has resolved.

- ✅ **Swimmer** — `auto` · P2 (enc) · themes: position, skill · code: EDGE_FX:138
  - _Other Edges · Prereq: Novice Athletics or Survival_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain a +2 bonus to your Swim Speed. You may spend X minutes underwater before you begin to suffocate, where X is the higher of your Athletics or Survival Ranks.

- ✅ **Virtuoso** — `auto` · P2 (enc, player:Hugo) · themes: skill · code: rankAllowed:46, renderTrainer:7806, skillDiceHTML:10793, prereqStatus:11065
  - _Skill Edges · Prereq: A skill at Master rank, Level 20_
  - note: Skill ranks come from the Level-Up ledger (luLedger) — the Skill ladder is derived, not hand-set
  - Choose a Skill at Master Rank. Consider that Skill to be effectively "Rank 8" for any Features or effects that depend on Skill Rank. Virtuoso may be taken multiple times, but you must choose a different Skill each time.

- ✅ **Wallrunner** — `auto` · P2 (enc) · themes: skill · code: EDGE_FX:145
  - _Other Edges · Prereq: Expert Acrobatics_
  - note: EDGE_FX row (verified in the running app, v597)
  - You may run on vertical surfaces both vertically and horizontally for up to your Acrobatics Rank in meters before jumping off.

- ✅ **Weapon of Choice** — `auto` · P2 (enc) · themes: typing, action · code: EDGE_FX:134
  - _Combat Edges · Prereq: A feature with the [Weapon] tag_
  - note: EDGE_FX row (verified in the running app, v597)
  - Choose a specific weapon type. You gain a +2 Bonus on Opposed Rolls to prevent being disarmed while wielding weapons of your chosen type. If you would be disarmed anyway, you may pay 1 AP to prevent yourself from being Disarmed.

- ✅ **Work Up** — `auto` · P2 (enc) · themes: other · code: EDGE_FX:125
  - _Combat Edges · Prereq: Adept Focus_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Work Up.

- ⚪ **Apricorn Balls** — `manual` · P3 · themes: action, capture · code: POKEBALL_RECIPES:34648, pokeBallBenchCard:34688
  - _Crafting Edges · Prereq: Novice Survival or Adept Technology Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - As an Extended Action, you may craft Apricorns into their corresponding Poke Ball. Use of this Feature requires access to a Poke Ball Tool Box.

- ✅ **Art of Stealth** — `auto` · P3 · themes: swap, skill · code: EDGE_FX:139
  - _Other Edges · Prereq: Expert Stealth_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain the Stealth Capability.

- ✅ **Defensive Hacking** — `auto` · P3 · themes: damage, skill · code: EDGE_FX:150
  - _Do Porygon Dream of Mareep · Prereq: Adept Technology Education, Novice Focus, Datajack Augmentation_
  - note: EDGE_FX row (verified in the running app, v597)
  - You may add your Focus Ranks as additional Damage Reduction while in digital battles. You may apply this Damage Reduction to Technology Education attacks.

- ✅ **Dynamism** — `auto` · P3 · themes: skill · code: categoricBonus:103, EDGE_FX:126
  - _Combat Edges · Prereq: Novice Guile_
  - note: EDGE_FX row (verified in the running app, v597)
  - Your initiative is increased by your Guile Rank.

- ⚪ **Field Clinic** — `manual` · P3 · themes: heal, action · code: FEATURE_GIFTS:11856, openApplyRestorative:29418
  - _Other Edges · Prereq: Adept Medicine Education_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Whenever your party Sets Up Camp, you may spend $200 worth of Medical Scrap to set up a Field Clinic. While using the Field Clinic, all members gain the following benefits: You may spend $300 of Medical Scrap to create and apply a Bandage or use a First Aid Kit. If you have the Nurse Feature, you may spend $300 to activate it without Draining AP. Potions, Super Potions, Hyper Potions, Full Restores, Revives, Energy Powders, and Energy Roots used in this area heal their target an additional 5 Hit Points. (Setting Up Camp is just as it sounds; any time you prepare a safe area to rest as an Extended Action, that counts for the purposes of Field Clinic.) [Sept 2015 Playtest]

- ✅ **Glitched Existence** — `auto` · P3 · themes: skill · code: EDGE_FX:151
  - _Do Porygon Dream of Mareep · Prereq: Exposure to Glitch Phenomena, GM Permission_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain +2 to all Skill rolls to deal with Glitch phenomena.

- ✅ **Gravity Training** — `auto` · P3 · themes: other · code: EDGE_FX:148
  - _Do Porygon Dream of Mareep · Prereq: Novice Athletics or Focus_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain the Gravitic Tolerance capability at a value of 1-3 or 2-4.

- ⚪ **Green Thumb** — `manual` · P3 · themes: other · code: GARDEN_TIERS:34997, gardenCanGrow:35044, openGardenPlant:35510, gardenCanSee:35550
  - _Crafting Edges · Prereq: Novice General Education or Novice Survival_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You know how to grow Apricorns and Tier 1 Berries using a Portable Grower or Fertilized Soil.

- ✅ **Instinctive Aptitude** — `auto` · P3 · themes: damage, action, skill · code: EDGE_FX:141, trainerVitalsCard:10668
  - _Other Edges · Prereq: Adept Intuition_
  - note: EDGE_FX row (verified in the running app, v597)
  - Whenever you spend AP to raise your roll on an Accuracy Roll or Skill Check, you get a +2 bonus instead of +1. This cannot be used on Rolls made by your Pokemon.

- ✅ **Instruction** — `auto` · P3 · themes: skill · code: EDGE_FX:142
  - _Other Edges · Prereq: Novice General Education_
  - note: EDGE_FX row (verified in the running app, v597)
  - Whenever you aid an ally in an Assisted Skill Check using an Education Skill you have at Novice Rank or higher, add your full Rank value as a bonus to their roll instead of half.

- ✅ **Mounted Prowess** — `auto` · P3 · themes: skill · code: EDGE_FX:144
  - _Other Edges · Prereq: Novice Acrobatics or Athletics_
  - note: EDGE_FX row (verified in the running app, v597)
  - You automatically succeed at Acrobatics and Athletics Checks made to mount a Pokemon, and you gain a +3 Bonus to all Acrobatics and Athletics Checks made to remain Mounted.

- ⚪ **Poke Ball Repair** — `manual` · P3 · themes: skill, capture · code: pokeBallBenchCard:34694
  - _Crafting Edges · Prereq: Basic Balls or Apricorn Balls_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may attempt to fix any Poke Ball that has failed to capture a Pokemon and broke. Make a Technology Check with a DC of 15. If you succeed, the Poke Ball is fixed and is treated as if it had not broken. If you fail, the ball is permanently broken. Requires access to a Poke Ball Tool Box.

- ⚪ **Poké Ball Repair** — `manual` · P3 · themes: skill, capture · code: pokeBallBenchCard:34694
  - _Crafting Edges · Prereq: Basic Balls or Apricorn Balls_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You may attempt to fix any Poke Ball that has failed to capture a Pokemon and broke. Make a Technology Check with a DC of 15. If you succeed, the Poke Ball is fixed and is treated as if it had not broken. If you fail, the ball is permanently broken. Requires access to a Poke Ball Tool Box.

<a id="verify-edges-02"></a>
## `verify-edges-02` — Verify edges the scan thinks are handled

P9 · 0 open of 9 · ✔ done

- ✅ **Power Boost** — `auto` · P3 · themes: other · code: EDGE_FX:137
  - _Other Edges · Prereq: Expert Athletics_
  - note: EDGE_FX row (verified in the running app, v597)
  - Increase your Power Capability by +2.

- ✅ **Psychic Navigator** — `auto` · P3 · themes: other · code: EDGE_FX:147
  - _Do Porygon Dream of Mareep · Prereq: Elemental Connection (Psychic)_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain the Psychic Navigator Capability.

- ✅ **Scholar** — `auto` · P3 · themes: skill · code: EDGE_FX:140
  - _Other Edges · Prereq: Expert General Education_
  - note: EDGE_FX row (verified in the running app, v597)
  - You gain a +1 Bonus to Skill Checks with General Education, Medicine Education, Occult Education, Pokemon Education, Technology Education, and Survival.

- ✅ **Shock Resistance** — `auto` · P3 · themes: damage · code: EDGE_FX:149
  - _Do Porygon Dream of Mareep · Prereq: Novice Technology Education_
  - note: EDGE_FX row (verified in the running app, v597)
  - You don't suffer Augmentation Shock from Electric Type damage unless it is Massive Damage.

- ⚪ **Skill Stunt** — `manual` · P3 · themes: damage, skill · code: categoricBonus:110, openDowsing:33863
  - _Skill Edges · Prereq: A skill at Novice rank or higher_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - Choose a Skill you have at Novice Rank or higher. Choose a specific use of that Skill; when rolling that skill under those circumstances, you may choose to roll one less dice, and instead add +6 to the result. You may take this Edge multiple times, choosing a different circumstance each time.

- ✅ **Sneak's Tricks** — `auto` · P3 · themes: other · code: EDGE_FX:123
  - _Combat Edges · Prereq: Adept Stealth_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Astonish.

- ✅ **Survival Drive** — `auto` · P3 · themes: other · code: EDGE_FX:124
  - _Combat Edges · Prereq: Adept Survival_
  - note: EDGE_FX row (verified in the running app, v597)
  - You learn the move Bulk Up.

- ✅ **Throwing Masteries** — `auto` · P3 · themes: other · code: EDGE_FX:115, techBodyDR:210
  - _Combat Edges · Prereq: Adept Acrobatics_
  - note: EDGE_FX row (verified in the running app, v597)
  - Increase the Throwing Range of your Poke Balls, Ranged Weapons, and other small items by +2.

- ⚪ **Touched** — `manual` · P3 · themes: other · code: refreshSwarmRounds:48928
  - _The Blessed and the Damned · Prereq: GM Permission_
  - note: a prerequisite, crafting/recipe unlock or roleplay Edge — the recipe and skill checks live in their own cards (Kitchen, Crafting bench, Garden), nothing per-hit to compute
  - You have been blessed by a Legendary and gain their Minor Gift. This Legendary is considered one of your Patrons. You may take Touched multiple times, each time for a different Patron.

## Not in any batch

Confirmed, flavour-only or skipped. Spot-check the ⚪ manual ones — they are a heuristic guess that the text has no mechanics.

- ⚪ **Dream Architect** — `manual` · P3 · themes: other
  - _Do Porygon Dream of Mareep · Prereq: Adept Intuition, Pokemon Education, or Technology Education_
  - You know how to operate Dream Machines and can use them to study and influence a Pokemon's dreams.

- ⚪ **Iron Mind** — `manual` · P2 (enc) · themes: other
  - _Other Edges · Prereq: Novice Focus_
  - You become aware of all attempts to read your mind with Telepathy, whether the attempt is successful or not.

- ⚪ **Repel Crafter** — `manual` · P3 · themes: other
  - _Crafting Edges · Prereq: Novice Medicine or Technology Education_
  - Create a Repel for $100 or a Super Repel for $150. Requires access to a Chemistry Set.

- ⚪ **Soulbound** — `manual` · P3 · themes: other
  - _The Blessed and the Damned · Prereq: Touched_
  - Whenever your Patron feels strong emotions (positive or negative) or pain, those sensations will be shared with you, no matter the distance between you. You may take Soulbound multiple times, each time for a different instance of Touched.

