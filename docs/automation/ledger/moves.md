# moves — automation ledger

[← LEDGER](../LEDGER.md)

<a id="moves-01"></a>
## `moves-01` — Status afflictions (1/3)

P1 · 25 open of 25 · open

- 🟢 **Confuse Ray** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status · engine: status-fx, status-always
  - _Ghost Status · DB — · AC 2 · Scene x2 · 6, 1 Target_
  - The target is Confused.

- 🟢 **Hypnosis** — `likely` · P1 (enc, player:Lázaro) · themes: status · engine: status-fx, status-always
  - _Psychic Status · DB — · AC 6 · Scene x2 · 4, 1 Target_
  - The target falls Asleep.

- 🟢 **Lovely Kiss** — `likely` · P1 (player:Lysgd) · themes: status · engine: status-fx, status-always
  - _Normal Status · DB — · AC 6 · Scene x2 · 6, 1 Target, Social_
  - The target fall Asleep.

- 🟡 **Rapid Spin** — `partial` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status, cure · code: CS_PATTERNS:20500
  - _Normal Physical · DB 2 · AC 2 · At-Will · Melee, 1 Target, Spirit Surge_
  - Rapid Spin destroys all Hazards within 5 meters, removes Leech Seeds, and removes the user's Trapped or Stuck status.

- 🟢 **Smog** — `likely` · P1 (enc, pc, player:Handels) · themes: status · engine: status-fx
  - _Poison Special · DB 3 · AC 7 · At-Will · Line 2_
  - Smog Poisons all legal targets on an Even-Numbered Roll.

- 🟡 **String Shot** — `partial` · P1 (enc, pc, player:Lysgd) · themes: status · engine: cs
  - _Bug Status · DB — · AC 3 · At-Will · Cone 2_
  - Lower the Speed of all legal targets by -1 CS. If this lowers their Speed CS to -6, or if their Speed CS was already at -6, they are instead Stuck. *Grants Threaded

- 🟢 **Stun Spore** — `likely` · P1 (enc, pc, player:Handels) · themes: status · engine: status-fx, status-always, powder · code: SEED_BAG_MOVES:29606
  - _Grass Status · DB — · AC 6 · Scene x2 · 6, 1 Target, Powder_
  - The target is Paralyzed.

- 🟢 **Supersonic** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status, damage · engine: status-fx, status-always
  - _Normal Status · DB — · AC 6 · Scene x2 · 4, 1 Target, Sonic_
  - The target becomes Confused. On miss, the target suffers a -2 penalty to Accuracy Rolls for one full round.

- 🟢 **Sweet Kiss** — `likely` · P1 (player:Lysgd) · themes: status, damage · engine: status-fx, status-always · code: itemFreqForKey:4729, featureActionTypes:23390
  - _Fairy Status · DB — · AC 6 · Scene x2 · 6, 1 Target, Social_
  - The target is Confused. On miss, the target suffers a -2 penalty to Accuracy Rolls for one full round.

- 🟢 **Taunt** — `likely` · P1 (enc, pc, player:Lysgd) · themes: status · engine: status-fx, status-always · code: TERRAIN_DEFS:1390
  - _Dark Status · DB — · AC 3 · EOT · 6, 1 Target, Social_
  - The target becomes Enraged.

- 🟡 **Thunder Wave** — `partial` · P1 (enc, pc, player:Handels) · themes: typing · engine: status-fx, status-always
  - _Electric Status · DB — · AC — · Scene x2 · 6, 1 Target_
  - Thunder Wave cannot miss. Thunder Wave Paralyzes the target. Pokemon immune to Electric Attacks are immune to Thunder Wave's effects.

- 🟢 **Torment** — `likely` · P1 (enc, pc, player:Lysgd) · themes: status · engine: status-fx, status-always
  - _Dark Status · DB — · AC 2 · Scene x2 · 10, 1 Target, Social_
  - The target becomes Suppressed.

- 🔴 **Uproar** — `todo` · P1 (enc, pc, player:Handels) · themes: status, cure
  - _Normal Special · DB 5 · AC 2 · EOT · Burst 1, Spirit Surge, Sonic_
  - All Pokemon and Trainers within 5 meters of the user are cured of Sleep.

- 🟢 **Will-O-Wisp** — `likely` · P1 (enc, player:Handels, player:Lázaro) · themes: status · engine: status-fx, status-always
  - _Fire Status · DB — · AC 5 · EOT · 6, 1 Target_
  - The target is Burned.

- 🟢 **Anchor Shot** — `likely` · P2 (enc) · themes: status · engine: status-fx, status-always
  - _Steel Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - The Target is Trapped for 2 rounds. Anchor Shot may only be used from the user's Anchor Token.

- 🟢 **Attract** — `likely` · P2 (pc) · themes: status · engine: status-fx, status-always
  - _Normal Status · DB — · AC 2 · Scene x2 · 3, 1 Target, Social_
  - Attract Infatuates the target if its gender is the opposite of the user's. Attract fails when used by or against Genderless targets.

- 🔴 **Baton Pass** — `todo` · P2 (enc, pc) · themes: status, cs
  - _Normal Status · DB — · AC — · At-Will · Self_
  - The user is replaced with another Pokemon from their trainer's roster. All Combat Stage, Coats, and [Stratagems] on Baton Pass' user are transferred to the replacement. Baton Pass may be used to switch even if the user is Trapped.

- 🟢 **Dynamic Punch** — `likely` · P2 (enc) · themes: status, damage · engine: status-fx, status-always · code: IRON_FIST_MOVES:20729
  - _Fighting Physical · DB 10 · AC 9 · At-Will · Melee, 1 Target_
  - Dynamic Punch Confuses the target. Dynamic Punch ignores the target's Evasion if they are Flanked.

- 🔴 **Encore** — `todo` · P2 (enc, pc) · themes: status
  - _Normal Status · DB — · AC 2 · Scene x2 · 4, 1 Target, Social_
  - Roll 1d6. On a result of 1 or 2, the target becomes Confused; on a result of 3 or 4 the target becomes Suppressed; on a result of 5 or 6 the target becomes Enraged.

- 🟡 **Freeze-Dry** — `partial` · P2 (enc) · themes: status, typing · engine: target-rules · code: logRoll:40662, moveDefPierce:43003
  - _Ice Special · DB 7 · AC 2 · EOT · 6, 1 Target_
  - When calculating Weakness and Resistance for Freeze-Dry, Water-Typed targets calculate damage as if Water was weak to Ice.

- 🟡 **Frost Breath** — `partial` · P2 (enc) · themes: status · engine: always-crit
  - _Ice Special · DB 6 · AC 3 · EOT · 4, 1 Target_
  - If Frost Breath hits, it is a Critical Hit. *Grants: Freezer

- 🟢 **Glare** — `likely` · P2 (enc) · themes: status · engine: status-fx, status-always
  - _Normal Status · DB — · AC 2 · Scene x2 · 4, 1 Target, Social_
  - Glare Paralyzes the target.

- 🟢 **Grass Whistle** — `likely` · P2 (pc) · themes: status · engine: status-fx, status-always
  - _Grass Status · DB — · AC 6 · Scene x2 · 6, 1 Target, Sonic_
  - The target falls Asleep.

- 🔴 **Hidden Power** — `todo` · P2 (enc, pc) · themes: status, typing
  - _Normal Special · DB 6 · AC 2 · EOT · Burst 1_
  - When a Pokemon first obtains the Move Hidden Power, roll 1d20. Hidden Power's Elemental Type will be changed from Normal to Bug on a result of 1; Dark on 2; Dragon on 3; Electric on 4; Fairy on 5; Fighting on 6; Fire on 7; Flying on 8; Ghost on 9; Grass on 10; Ground on 11; Ice on 12; Normal on 13; Poison on 14; Psychic on 15; Rock on 16; Steel on 17; Water on 18; and on 19 or 20, reroll until you roll another number. This effect is permanent - if Hidden Power is forgotten and relearned, the chosen Type remains the same.

- 🟢 **Mean Look** — `likely` · P2 (enc) · themes: status · engine: status-fx, status-always
  - _Normal Status · DB — · AC — · Scene · 6, 1 Target, Social_
  - The Target becomes Trapped and Slowed for the remainder of the encounter.

<a id="moves-04"></a>
## `moves-04` — Combat Stages (1/3)

P1 · 9 open of 25 · open

- ✅ **Bulldoze** — `auto` · P1 (enc, pc, player:Handels) · themes: cs, skill · engine: cs · code: CS_PATTERNS:20510
  - _Ground Physical · DB 6 · AC 2 · EOT · Burst 1_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All Legal Targets are lowered 1 Speed Combat Stage.

- 🔴 **Clear Smog** — `todo` · P1 (player:Lázaro) · themes: cs
  - _Poison Special · DB 5 · AC — · Scene x2 · 6, 1 Target_
  - The target's Combat Stages are reset to their defaults, and all Coats on the target are destroyed. Clear Smog cannot miss.

- ✅ **Flame Charge** — `auto` · P1 (enc, pc, player:Lázaro) · themes: cs, skill · engine: cs
  - _Fire Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Speed 1 Combat Stage.

- 🔴 **Gyro Ball** — `todo` · P1 (enc, player:Lysgd) · themes: cs
  - _Steel Physical · DB 6 · AC 2 · Scene x2 · 6, 1 Target_
  - The target reveals their Speed Stat (including Combat Stages). If it is higher than the user's (including Combat Stages), subtract the user's Speed Stat from the target's and apply the difference as Bonus Damage.

- ✅ **Icy Wind** — `auto` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: cs, skill · engine: cs
  - _Ice Special · DB 6 · AC 3 · EOT · Cone 2_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All Legal Targets have their Speed lowered 1 Combat Stage.

- 🔴 **Power Trip** — `todo` · P1 (player:Lázaro) · themes: cs
  - _Dark Physical · DB 2 · AC 2 · EOT · Melee, 1 Target_
  - This Move gains +2 to its Damage Base for every positive Combat Stage held by the user, to a maximum of DB20.

- ✅ **Rock Smash** — `auto` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: cs, skill · engine: cs, range · code: EDGE_FX:117
  - _Fighting Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Rock Smash lowers the target's Defense 1 Combat Stage on 17+.

- ✅ **Rototiller** — `auto` · P1 (enc, player:Handels) · themes: cs, skill · engine: cs · code: CS_PATTERNS:20527
  - _Ground Status · DB — · AC — · Scene · Burst 2_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All Grass-type Pokemon in the area raise their Attack and Special Attack 1 Combat Stage.

- ✅ **Agility** — `auto` · P2 (enc, pc) · themes: cs, skill · engine: cs · code: EDGE_FX:116, CS_PATTERNS:20490, addEncTrainerMove:32755, openSigTechPicker:32871
  - _Psychic Status · DB — · AC — · EOT · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Speed 2 Combat Stages.

- ✅ **Amnesia** — `auto` · P2 (pc) · themes: cs, skill · engine: cs
  - _Psychic Status · DB — · AC — · EOT · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Special Defense 2 Combat Stages.

- ✅ **Aromatic Mist** — `auto` · P2 (pc, player:Hugo) · themes: cs · engine: cs
  - _Fairy Status · DB — · AC — · EOT · Burst 1_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the Special Defense of all allied legal targets by +1 CS.

- ✅ **Calm Mind** — `auto` · P2 (enc) · themes: cs, skill · engine: cs
  - _Psychic Status · DB — · AC — · EOT · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Special Attack 1 Combat Stage and raise the user's Special Defense 1 Combat Stage.

- ✅ **Chilling Water** — `auto` · P2 (enc) · themes: cs, skill · engine: cs
  - _Water Special · DB 5 · AC 2 · At-Will · 5, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The target cannot make Attacks of Opportunity for 1 full round and their Attack is lowered by -1 Combat Stage.

- 🟡 **Chip Away** — `partial` · P2 (enc) · themes: cs · engine: def-pierce · code: MOVE_DEF_PIERCE:42983
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - Ignore any Armor, Damage Reduction, or changes in the target's Defense or Special Defense (such as from Combat Stages) when calculating damage.

- ✅ **Earth Power** — `auto` · P2 (enc) · themes: cs, skill · engine: cs, range
  - _Ground Special · DB 9 · AC 2 · EOT · 6, 1 Target, Groundsource_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Earth Power lowers the Special Defense of all Legal Targets 1 Combat Stage on 16+.

- 🔴 **Electro Ball** — `todo` · P2 (enc, pc) · themes: cs
  - _Electric Special · DB 6 · AC 2 · Scene x2 · 10, 1 Target_
  - When determining the damage dealt by Electro Ball, the user adds its Speed Stat (including CS) in addition to their Special Attack Stat. The target in turn subtracts both its Speed and Special Defense Stats from the damage dealt before applying Type Effectiveness.

- ✅ **Energy Ball** — `auto` · P2 (enc) · themes: cs, skill · engine: cs, range
  - _Grass Special · DB 9 · AC 2 · EOT · 8, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Energy Ball lowers the foe's Special Defense 1 Combat Stage on 17+.

- ✅ **Fleur Cannon** — `auto` · P2 (enc) · themes: cs, damage, skill · engine: cs
  - _Fairy Special · DB 13 · AC 4 · Scene · Line 9, Smite_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Lower the user's Special Attack 2 Combat Stages after damage.

- 🔴 **Haze** — `todo` · P2 (enc, pc) · themes: cs
  - _Ice Status · DB — · AC — · Scene x2 · Field_
  - The Combat Stages of the user and all Pokemon and Trainers in the encounter are set to their default state (usually 0).

- 🔴 **Heart Swap** — `todo` · P2 (enc) · themes: cs
  - _Psychic Status · DB — · AC — · Daily · 10, 2 Targets_
  - The targets trade Combat Stage values for each stat.

- ✅ **Meditate** — `auto` · P2 (pc) · themes: cs, skill · engine: cs
  - _Psychic Status · DB — · AC — · At-Will · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Attack 1 Combat Stage.

- 🟡 **Mist** — `partial` · P2 (enc, pc) · themes: cs · engine: blessing · code: blessingIcon:40704
  - _Ice Status · DB — · AC — · Scene x2 · Blessing_
  - Any user affected by Mist may activate it when having Combat Stages lowered by any effect; if they do, those Combat Stages are instead not lowered. Mist may be activated 3 times and then disappears.

- ✅ **Mud Shot** — `auto` · P2 (enc, pc) · themes: cs, skill · engine: cs
  - _Ground Special · DB 6 · AC 3 · At-Will · 3, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The target's Speed is lowed by -1 Combat Stage.

- ✅ **Overheat** — `auto` · P2 (enc) · themes: cs, damage, skill · engine: cs · code: ROTOM_POLTERGEIST:19847, RECKLESS_ERRATA_MOVES:20845
  - _Fire Special · DB 13 · AC 4 · Scene · 8, Ranged Blast 3, Smite_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Lower the user's Special Attack 2 Combat Stages after damage.

- 🔴 **Psych Up** — `todo` · P2 (pc) · themes: cs
  - _Normal Status · DB — · AC — · Scene · 6, 1 Target_
  - The user's Combat Stages are changed to match the target's Combat Stages. Psych Up cannot miss.

<a id="moves-07"></a>
## `moves-07` — Movement, push & switching (1/3)

P1 · 25 open of 25 · open

- 🟡 **Defense Curl** — `partial` · P1 (enc, pc, player:Lysgd) · themes: position, multiturn, status, typing · engine: cs
  - _Normal Status · DB — · AC — · At-Will · Self_
  - The user becomes Curled Up. While Curled Up, the user becomes immune to Critical Hits and gains 10 Damage Reduction. However, while Curled Up, the user is Slowed and their Accuracy is lowered by -4. The user may stop being Curled Up as a Swift Action. If the user has Rollout or Ice Ball in their Move List, they do not become Slowed while Curled Up. Furthermore, when using the Moves Rollout or Ice Ball while Curled Up, the user gains a +10 bonus to the damage rolls of those Moves and does not suffer Accuracy Penalties from being Curled Up.
    September Playtest: The user's Defense is raised 1 Combat Stage and they become Curled Up until the end of the Scene or they are Recalled or Take a Breathe …

- 🟡 **Fake Out** — `partial` · P1 (pc, player:Handels, player:Lázaro) · themes: position, interrupt · engine: status-fx, status-always
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - You may only use Fake Out with Priority upon joining an encounter; if you do, Fake Out Flinches the target. Switching out resets the requirement of joining an encounter.

- 🔴 **Hyper Voice** — `todo` · P1 (player:Handels) · themes: position
  - _Normal Special · DB 9 · AC 2 · Scene x2 · Close Blast 3, Sonic, Smite_
  - All legal targets are pushed back to the squares immediately outside the blast, away from the user.

- 🟡 **Psychic** — `partial` · P1 (enc, player:Lázaro) · themes: position · engine: cs, range · code: TYPES:204, TERRAIN_DEFS:1373, monStabTypes:2067, TYPE_MOD_MOVES:2169, TERRAIN_SETTER_ABILITIES:3004, Z_CRYSTALS:3426, TYPE_PLATE_ITEMS:3496, typeBoosterIndex:3509
  - _Psychic Special · DB 9 · AC 2 · EOT · 5, 1 Target, Push_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: position
  - The target is Pushed 1 meter in any direction. Psychic lowers the target's Special Defense 1 Combat Stage on 17+.  Grants Telekinetic.

- 🟡 **Pursuit** — `partial` · P1 (enc, pc, player:Lázaro) · themes: position, interrupt · engine: special:conditionalDB
  - _Dark Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target_
  - If the foe is fleeing or being switched out, Pursuit may be used as an Interrupt, targeting the triggering foe. When used as an Interrupt, Pursuit grants the user a +5 bonus to all Movement Speeds, and has a Damage Base of 8 (2d8+10/19).

- 🔴 **Tackle** — `todo` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: position
  - _Normal Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash, Push_
  - The target is Pushed 2 Meters.

- 🔴 **Teleport** — `todo` · P1 (enc, player:Lázaro) · themes: position
  - _Psychic Status · DB — · AC — · Scene · Self, Interrupt_
  - The user Teleports up to X meters, where X is its Teleporter Capability. Any Move that targeted Teleport's user continue through the desired target's space if the Move allows for it as if the user hadn't been there; single target moves simply miss. *Grants Teleporter 4

- 🔴 **Ally Switch** — `todo` · P2 (enc) · themes: position, interrupt
  - _Psychic Status · DB — · AC — · Scene · 6, 1 Target, Interrupt_
  - Ally Switch may be declared during a foe's turn as an Interrupt. The user chooses one willing ally within 6 meters; the target and the user switch places. If the ally was a target of a Move, the user is now the target; If the user was a target of a Move, the ally is now the target.

- 🟡 **Circle Throw** — `partial` · P2 (enc) · themes: position · engine: range, range-status, status-fx, weight
  - _Fighting Physical · DB 6 · AC 4 · At-Will · Melee, 1 Target, Push_
  - The target is Pushed 6 meters minus their Weight Class. The target is also Tripped on 15+.

- 🔴 **Dig** — `todo` · P2 (enc) · themes: position, multiturn
  - _Ground Physical · DB 8 · AC 2 · EOT · Burst 1, Set-Up, Full Action, Groundsource_
  - Set-Up Effect: The user shifts 25 meters underground and their turn ends. Resolution Effect: The user may shift horizontally using their burrow or overland speed, and then shifts 25 meters straight up. Upon reaching the surface, the user attacks with Dig, creating a Burst 1. *Grants: Burrow +3

- 🟡 **Dragon Rush** — `partial` · P2 (enc) · themes: position · engine: range, range-status, range-flinch, status-fx
  - _Dragon Physical · DB 10 · AC 4 · Scene x2 · Melee, 1 Target, Dash, Push, Smite_
  - The target is Pushed 3 Meters. Dragon Rush Flinches the target on 17+.

- 🟡 **Dragon Tail** — `partial` · P2 (enc) · themes: position · engine: range, range-status, status-fx, weight
  - _Dragon Physical · DB 6 · AC 3 · At-Will · Melee, 1 Target, Push_
  - The target is Pushed 6 meters minus their Weight Class. The target is also Tripped on 15+.

- 🟡 **First Impression** — `partial` · P2 (enc) · themes: position, interrupt · engine: status-fx, status-always
  - _Bug Physical · DB 9 · AC 2 · EOT · Melee, 1 Target, Priority_
  - You may only use First Impression with Priority upon joining an encounter; if you do, First Impression Flinches the target. Switching out resets the requirement of joining an encounter. .

- 🔴 **Flip Turn** — `todo` · P2 (enc) · themes: position, status, capture
  - _Water Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - If Flip Turn successfully hits its target, the user deals damage and then immediately is returned to its Poke Ball in the same turn. A New Pokemon may immediately be sent out. Using Flip Turn lets a Trapped user be recalled.

- 🔴 **Head Smash** — `todo` · P2 (enc) · themes: position
  - _Rock Physical · DB 15 · AC 5 · Scene · Melee, 1 Target, Dash, Push, Recoil 1/3_
  - The target is pushed 2 meters.

- 🔴 **Heal Block** — `todo` · P2 (enc) · themes: position, multiturn
  - _Psychic Status · DB — · AC 2 · EOT · 6, 1 Target_
  - Until the end of the encounter, the target may not gain HP or Temporary HP from any source. This effect ends if the target is switched out or Takes a Breather.

- 🟡 **High Jump Kick** — `partial` · P2 (enc) · themes: position, heal · code: RECKLESS_MOVES:20839, RECKLESS_ERRATA_MOVES:20844
  - _Fighting Physical · DB 13 · AC 3 · EOT · Melee, Dash, 1 Target_
  - If High Jump Kick misses, the user loses Hit Points equal to 1/4th of their Max Hit Points. A failure to hit due to a Move with the Shield keyword does not count as a miss. This cannot be used if Gravity is in effect.

- 🟡 **Hydro Pump** — `partial` · P2 (enc) · themes: position · code: ROTOM_POLTERGEIST:19848
  - _Water Special · DB 11 · AC 4 · Scene x2 · 6, 1 Target, Push_
  - The target is pushed away from the user 3 meters.

- 🔴 **Lunge** — `todo` · P2 (enc) · themes: position
  - _Bug Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - Lunge may be used as a Free Action at the end of a Sprint Maneuver taken as a Standard Action, as long as the user Shifted at least 3 meters in a straight line towards the target. When used this way, Lunge's target receives a -5 penalty to damage rolls for 1 round.

- 🔴 **Mega Kick** — `todo` · P2 (enc) · themes: position
  - _Normal Physical · DB 12 · AC 6 · Scene x2 · Melee, 1 Target, Dash, Push, Smite_
  - The target is Pushed 2 meters.

- 🔴 **Megahorn** — `todo` · P2 (enc) · themes: position
  - _Bug Physical · DB 12 · AC 5 · Scene x2 · Melee, 1 Target, Push_
  - The target is Pushed 1 meter.

- 🔴 **Phantom Force** — `todo` · P2 (enc) · themes: position, interrupt, multiturn, swap
  - _Ghost Physical · DB 9 · AC 2 · Scene x2 · Melee, 1 Target, Set-Up_
  - Set-Up Effect: The user is removed from the field, and their turn ends. Resolution Effect: Phantom Force's user appears adjacent to any legal target on the field, ignoring Movement Capabilities, and then uses Phantom Force's attack. Phantom Force cannot be avoided by Moves with the Shield Keyword, the Dodge Ability, or similar effects, and Intercepts may not be attempted in response.

- 🟡 **Pounce** — `partial` · P2 (enc, pc) · themes: position · engine: status-fx, status-always
  - _Bug Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - After dealing damage, the target is Slowed for 1 round. A target may only be Slowed by this Move once per Scene. Special: Grants Overland and Long Jump +1

- 🔴 **Roar** — `todo` · P2 (enc, pc) · themes: position, capture
  - _Normal Status · DB — · AC 2 · Scene · Burst 1, Sonic, Social_
  - When declaring Roar, the user does nothing. At the end of the round, the user Shifts and uses Roar. Targets hit by Roar immediately Shift away from the user using their highest useable movement capability, towards their Trainer if possible. If the target is an owned Pokemon and ends this shift within 6 meters of their Poke Ball, they are immediately recalled to their Poke Ball. If that Trainer sends out a replacement, they do not lose their Command action.

- 🔴 **Role Play** — `todo` · P2 (enc) · themes: position, swap
  - _Psychic Status · DB — · AC — · Daily · Melee, 1 Target_
  - The user gains one of the target's Abilities, chosen at random, for the remainder of the encounter. This effect ends if the user Faints or is switched out. Role Play cannot miss.

<a id="moves-10"></a>
## `moves-10` — Healing, drain, recoil & HP (1/3)

P1 · 25 open of 25 · open

- 🟡 **Counter** — `partial` · P1 (enc, player:Lázaro) · themes: heal, interrupt, status, typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21142
  - _Fighting Physical · DB — · AC — · Scene x2 · Melee, 1 Target, Reaction, Trigger_
  - Counter may be used as a Reaction when the user is hit by a damaging Physical Attack. Resolve the Triggering Attack, with Counter's user resisting the attack one step further. After the attack is resolved, if Counter's user was not Fainted, the triggering foe then loses Hit Points equal to twice the amount of Hit Points lost by the user from the triggering attack. Note that Counter is Physical, and while it cannot miss, it cannot hit targets immune to Fighting-Type Moves.

- 🟡 **Curse** — `partial` · P1 (enc, pc, player:Lázaro) · themes: heal, interrupt, status · engine: cs · code: openHexStudies:25979, hexCard:26005
  - _Ghost Status · DB — · AC — · See Text · Self_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: heal, interrupt, status
  - If the user is not a Ghost Type, Curse has a Frequency of EOT, and when used the user lowers its Speed by -1 Combat Stage, but raises Attack and Defense by +1 Combat Stage each. If the user is a Ghost Type, Curse has a Frequency of Scene, and when used the user loses 1/3 of their Max Hit Points and a target Pokemon or Trainer within 8 meters of the user becomes Cursed. This Hit Point loss cannot be prevented in any way.

- 🔴 **Dream Eater** — `todo` · P1 (enc, player:Lázaro) · themes: heal
  - _Psychic Special · DB 10 · AC 2 · EOT · Melee, 1 Target_
  - Dream Eater can only target Sleeping Pokemon or Trainers. After the target takes damage, the user gains Hit Points equal to half of the damage they dealt to the target. Dream Eater does not wake up sleeping targets.

- 🔴 **Flame Burst** — `todo` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: heal
  - _Fire Special · DB 7 · AC 2 · At-Will · 6, 1 Target_
  - Any Trainers or Pokemon cardinally adjacent to the target lose 5 Hit Points

- 🟡 **Heal Pulse** — `partial` · P1 (player:Lázaro) · themes: heal · code: MEGA_LAUNCHER_MOVES:20850, openTokenMenu:46615
  - _Psychic Status · DB — · AC — · Daily x2 · 6, 1 Target, Aura, Healing_
  - Restores 50% of the target's max Hit Points. Heal Pulse's user may not target itself with Heal Pulse.

- 🔴 **Incinerate** — `todo` · P1 (enc, pc, player:Lázaro) · themes: heal, swap
  - _Fire Special · DB 6 · AC 2 · At-Will · Line 3_
  - If a target is holding a Held Item or Main or Off-Hand item, they must either drop it immediately or lose a Tick of Hit Points. This may only cause a target to lose at most one Tick of Hit Points, no matter how many items they were holding

- 🔴 **Recover** — `todo` · P1 (enc, player:Lysgd) · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Self, Healing_
  - The user regains HP equal to half of its full HP.

- 🟡 **Roost** — `partial` · P1 (enc, player:Handels, player:Lysgd) · themes: heal, multiturn · engine: typemod
  - _Flying Status · DB — · AC — · Daily x2 · Self_
  - The user regains HP equal to half of its full HP. If the user is a Flying Type, it loses the Flying Type until the start of their next turn.

- 🔴 **Wish** — `todo` · P1 (enc, player:Lázaro) · themes: heal, multiturn
  - _Normal Status · DB — · AC — · Daily x2 · 15, 1 Target, Healing_
  - At the end of the user's next turn, the target regains HP equal to half of its full HP. If the user targets itself and is replaced in battle, the replacement is healed by half of its own HP.

- 🟡 **Bind** — `partial` · P2 (enc, pc) · themes: heal · code: freqInfo:4649, trainerVitalsCard:9902, booksCard:12433, isMetronomeMove:21517
  - _Normal Static · DB — · AC — · Static · --_
  - The user gains a +1 Bonus to Accuracy Rolls made to initiate Grapple Maneuvers, and +2 to Skill Checks made to initiate Grapple Maneuvers or gain Dominance. Whenever the user gains Dominance in a Grapple, the target of the Grapple loses a Tick of Hit Points.

- 🟡 **Brine** — `partial` · P2 (enc) · themes: heal · engine: special:conditionalDB
  - _Water Special · DB 7 · AC 2 · Scene x2 · 6,  1 Target_
  - If the target's Hit Points are under 50%, Brine's Damage Base is increased to Damage Base 13 (4d10+10 / 35).

- 🟡 **Clamp** — `partial` · P2 (enc) · themes: heal · code: isMetronomeMove:21517
  - _Water Static · DB — · AC — · Static · --_
  - The user gains a +1 Bonus to Accuracy Rolls made to initiate Grapple Maneuvers, and +2 to Skill Checks made to initiate Grapple Maneuvers or gain Dominance. Whenever the user gains Dominance in a Grapple, the target of the Grapple loses a Tick of Hit Points.

- 🟡 **Healing Wish** — `partial` · P2 (enc) · themes: heal, cure, capture · code: SACRIFICE_HEAL_MOVES:5219
  - _Psychic Status · DB — · AC — · Daily · 6, 1 Target, Healing_
  - The user immediately Faints, lowering its HP to 0. The user takes no Injuries from HP Markers when using Healing Wish. The target is immediately cured of up to 3 injuries, healed to their Maximum Hit Points, and has the Frequency of all Moves restored. Healing Wish may target a Pokemon in a Poke Ball. Healing Wish does not restore the Frequency of Healing Wish or Lunar Dance. Injuries healed through Healing Wish count toward the total number of Injuries that can be healed each day, and this healing is limited by the same.

- 🟡 **Nature's Madness** — `partial` · P2 (enc) · themes: heal · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21138
  - _Fairy Special · DB — · AC 4 · Scene · 4, 1 Target, HP Loss_
  - The target loses half of their current Hit Points.

- 🔴 **Pain Split** — `todo` · P2 (enc) · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · 4, 1 Target_
  - The user and the target both lose 1/2 of their current Hit Points. Add the amount of Hit Points the user and the target lost together, and divide the value by 2. Both the target and the user gain Hit Points equal to this value. Do not add Injuries from Pain Split from Hit Point Markers until the full effect of the Move has been resolved. Pain Split never causes Massive Damage. Hit Point loss from Pain Split cannot be prevented in any way.

- 🔴 **Slack Off** — `todo` · P2 (enc, pc) · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Self, Healing_
  - The user regains HP equal to half of its full HP.

- 🔴 **Swallow** — `todo` · P2 (enc, pc) · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Self_
  - If the user's Stockpiled count is 1, they are healed 25% of their full Hit Point value; if their Stockpiled count is 2, they are healed half of their full Hit Point value; if their Stockpiled count is 3, they are healed back to full Hit Points. After using Swallow, the user's Stockpiled count is set to 0. If the user has no Stockpiled count, Swallow does nothing.

- 🟡 **Wrap** — `partial` · P2 (enc, pc) · themes: heal · code: isMetronomeMove:21517, renderBattle:23308, openChefCook:29199, encTrainerSkills:33572, renderMap:48352
  - _Normal Static · DB — · AC — · Static · --_
  - The user gains a +1 Bonus to Accuracy Rolls made to initiate Grapple Maneuvers, and +2 to Skill Checks made to initiate Grapple Maneuvers or gain Dominance. Whenever the user gains Dominance in a Grapple, the target of the Grapple loses a Tick of Hit Points.

- 🟡 **Axe Kick** — `partial` · P3 · themes: heal · engine: range, range-status, status-fx
  - _Fighting Physical · DB 12 · AC 3 · EOT · Melee, 1 Target, Dash, Reckless_
  - Confuses the target on 15+. If this Move misses, the user loses Hit Points equal to 1/4th of their Max Hit Points. A failure to hit due to a Move with the Shield keyword does not count as a miss. This Move cannot be used if Gravity is in effect.

- 🔴 **Bane** — `todo` · P3 · themes: heal
  - _Normal Special · DB 4 · AC 2 · Scene x2 · WR, 1 Target_
  - The target loses a Tick of Hit Points at the start of their next three turns and suffers a -2 penalty to all Save Checks on those turns.

- 🟡 **Bleed!** — `partial` · P3 · themes: heal · code: LIVING_WEAPON_FORMS:7553
  - _Normal Physical · DB 9 · AC 2 · Scene x2 · WR, 1 Target_
  - The target loses a Tick of Hit Points at the start of their next three turns.

- 🔴 **Chloroblast** — `todo` · P3 · themes: heal
  - _Grass Special · DB 12 · AC 3 · Daily · Line 8, Smite, Spirit Surge_
  - The user's Hit Points are reduced by 50% of their full Hit Point value. This Hit Point loss cannot be prevented or reduced in any way.

- 🟡 **Clangorous Soul** — `partial` · P3 · themes: heal · engine: cs
  - _Dragon Status · DB — · AC — · Scene · Self_
  - The user loses 1/3rd of their Max Hit Points and has each of its stats raised by +1 Combat Stage.

- 🟡 **Comeuppance** — `partial` · P3 · themes: heal, interrupt, status, typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21144
  - _Dark Physical · DB — · AC — · Scene · Any, 1 Target, Reaction, Trigger_
  - This Move may be used as a Reaction when the user is hit by a damaging attack. Resolve the triggering attack, with the user resisting the attack one step further. After the attack is resolved, if the user was not Fainted, the triggering foe then loses Hit Points equal to the amount of Hit Points lost by the user from the triggering attack. The triggering foe then becomes Tripped and you may choose 2 allies. The chosen allies may Disengage 2 meters towards the triggering foe as a Free Action.

- 🟡 **Crush Grip** — `partial` · P3 · themes: heal · engine: special:valueDB · code: specialMoveInfo:21318
  - _Normal Physical · DB 12 · AC 2 · Scene · Melee, 1 Target_
  - For every 10% the target is below their full Hit Points, Crush Grip's Damage Base is reduced by 1.

<a id="moves-13"></a>
## `moves-13` — Set-Up, charge & multi-turn (1/2)

P1 · 25 open of 25 · open

- 🔴 **Copycat** — `todo` · P1 (enc, pc, player:Lázaro) · themes: multiturn, control
  - _Normal Status · DB — · AC — · Scene x2 · 4, 1 Target_
  - Use the Move the target has used on their last turn. You may choose new targets for the Move. Copycat cannot miss.

- 🟡 **Rage** — `partial` · P1 (enc, pc, player:Handels, player:Hugo) · themes: multiturn · engine: cs, status-fx, status-always, status-self · code: STATUS_DEFS:343, weaponizeRange:7657, buffDR:16189
  - _Normal Physical · DB 2 · AC 2 · At-Will · Melee, 1 Target, Spirit Surge_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: multiturn, status
  - The user becomes Enraged. Until the end of the user's next turn, if the user is Enraged, the user gains +1 Attack Combat Stage whenever they are damaged by an Damaging Move or Attack.

- 🟡 **Sand Attack** — `partial` · P1 (enc, pc, player:Lázaro) · themes: multiturn · engine: status-fx, status-always
  - _Ground Status · DB — · AC 2 · EOT · 2, 1 Target_
  - The target is Blinded until the end of their next turn.

- 🟡 **Sing** — `partial` · P1 (enc, pc, player:Handels) · themes: multiturn · engine: status-fx, status-always
  - _Normal Status · DB — · AC 10 · Scene · Burst 2, Friendly, Sonic_
  - All legal Targets fall Asleep. On a miss, Sing instead causes targets to become Slowed and suffer a -2 penalty to their Evasion until the end of the user's next turn.

- 🟡 **Sky Attack** — `partial` · P1 (player:Lázaro) · themes: multiturn · engine: range, range-status, range-flinch, status-fx
  - _Flying Physical · DB 14 · AC 4 · Scene x2 · Melee, Pass, Set-Up, Full Action_
  - Set-Up Effect: The user is moved up 25 meters into the air. Resolution Effect: The user may shift until they are next to a legal target in the encounter. They may then shift again and pass through legal targets to attack with Sky Attack. Sky Attack Flinches a target on 17+.

- 🔴 **Smokescreen** — `todo` · P1 (enc, pc, player:Lysgd) · themes: multiturn
  - _Normal Status · DB — · AC — · EOT · 5, Ranged Blast 3_
  - Smokescreen creates a blast of Smoke that covers the target area; the Smoke persists until the end of the encounter, or until Defog or Whirlwind are used. All targets attacking from or into the Smoke receive a -3 penalty to Accuracy.

- 🟡 **Bitter Malice** — `partial` · P2 (enc) · themes: multiturn · engine: range, range-status, status-fx, special:conditionalDB
  - _Ghost Special · DB 6 · AC 2 · At-Will · 6, 1 Target_
  - : Legal targets hit by Bitter Malice are Stuck and Trapped until the end of their next turn on a 19+. 
    
    Once a Scene, if Bitter Malice's target has a Status Condition, you may have Bitter Malice's Damage Base be 12 instead (3d12+10 / 30).

- 🟡 **Block** — `partial` · P2 (enc) · themes: multiturn · engine: status-fx, status-always · code: lowerCS:3033, classesCard:10463, openPokeEdgePicker:17536
  - _Normal Status · DB — · AC 2 · At-Will · Melee, 1 Target_
  - The target is Stuck and Trapped until the beginning of your next turn.

- 🟡 **Charge** — `partial` · P2 (enc, pc) · themes: multiturn · engine: cs
  - _Electric Status · DB — · AC — · EOT · Self_
  - If the user performs an Electric Attack on its next turn, add its Damage Dice Roll an extra time to the damage. Raise the user's Special Defense by +1 CS.

- 🟡 **Charge Beam** — `partial` · P2 (enc, pc) · themes: multiturn · engine: cs, range
  - _Electric Special · DB 5 · AC 4 · At-Will · 6, 1 Target_
  - If Charge Beam successfully hits a target, roll 1d20. On a roll of 7+, the user's Special Attack is raised by +1 Combat Stage.

- 🟡 **Conversion** — `partial` · P2 (enc) · themes: multiturn · engine: conversion · code: conversionKind:2533
  - _Normal Status · DB — · AC — · At-Will · Self_
  - The user becomes the elemental Type of their choice as long as they have a Move that is the same elemental Type until the end of the encounter. Replace all other Types.

- 🔴 **Doom Desire** — `todo` · P2 (enc) · themes: multiturn
  - _Steel Special · DB 14 · AC — · Scene x2 · 10, 1 Target_
  - Doom Desire does nothing on the turn it is used. At the end of the user's next turn, Doom Desire hits, even if the user if no longer on the field. Doom Desire cannot miss.

- 🔴 **Future Sight** — `todo` · P2 (enc) · themes: multiturn
  - _Psychic Special · DB 12 · AC — · Scene x2 · 10, 1 Target_
  - Future Sight does nothing on the turn it is used. At the end of the user's next turn, Future Sight hits, even if the user is no longer on the field. Future Sight cannot miss.

- 🔴 **Mirror Move** — `todo` · P2 (enc, pc) · themes: multiturn, control
  - _Flying Status · DB — · AC — · Scene x2 · 6, 1 Target, Illusion_
  - Use the Move the target has used on their last turn. You may choose new targets for the Move. Mirror Move cannot miss.

- 🟡 **Razor Wind** — `partial` · P2 (enc) · themes: multiturn · engine: range, range-crit
  - _Normal Special · DB 8 · AC 2 · EOT · 10, 3 Targets, Set-Up_
  - Set-Up Effect: The user may not shift this round. The user whips up a whirlwind around themselves, granting +2 Evasion until the end of their next turn and destroying any Smokescreen or Hazards on any squares it is standing on and in all squares adjacent to it. Resolution Effect: The user attacks with Razor Wind. Razor Wind is a Critical Hit on 18+.

- 🟡 **Retaliate** — `partial` · P2 (enc) · themes: multiturn, status · engine: special:conditionalDB
  - _Normal Physical · DB 7 · AC 2 · Scene x2 · Melee, 1 Target_
  - Retaliate's DB is doubled to DB 14 (4d10+15 / 40) if an ally has been Fainted by a Damaging Move used by the Target in the last 2 rounds of Combat.

- 🟡 **Safeguard** — `partial` · P2 (enc, pc) · themes: multiturn · engine: blessing · code: SAGE_BLESSINGS:32031, blessingIcon:40704
  - _Normal Status · DB — · AC — · Scene · Blessing_
  - Blessing - Any user affected by Safeguard may activate it when receiving a Status Affliction to ignore the effects of that Status Affliction on their next turn. Safeguard may be activated 3 times, and then disappears.

- 🟡 **Sky Drop** — `partial` · P2 (enc) · themes: multiturn, status · engine: special:conditionalDB
  - _Flying Physical · DB 6 · AC 3 · Scene x2 · Melee, 1 Target, Set-Up_
  - Set-Up Effect: Make Sky Drop's Accuracy Check. If the user hits, the user and target are moved 25 meters into the air. The target forfeits their next turn and cannot Shift or take actions until Sky Drop is resolved. Resolution Effect: Shift while in the air and lower both the user and the target heights back to the ground. Then apply Sky Drop's damage. If the target has a Sky or Levitate Speed, Sky Drop fails to deal damage. If the user is Fainted after the Set-Up but before the Resolution, the target falls to the ground and takes damage as if Sky Drop had a Damage Base of 3 (1d6+5/8) unless they have a Sky or Levitate Speed, in which case they take no damage.

- 🟡 **Yawn** — `partial` · P2 (enc, pc) · themes: multiturn · engine: status-fx, status-always
  - _Normal Status · DB — · AC — · Scene x2 · 2, 1 Target, Social_
  - The target falls Asleep at the end of its next turn. Yawn cannot miss.

- 🟡 **Blood Moon** — `partial` · P3 · themes: multiturn · engine: status-fx, status-always, status-self
  - _Normal Special · DB 14 · AC 2 · Scene x2 · Line 4, Smite, Reckless_
  - After dealing damage, the user becomes Slowed and Vulnerable until the end of their next turn.

- 🟡 **Burn Up** — `partial` · P3 · themes: multiturn · engine: typemod
  - _Fire Special · DB 13 · AC 2 · Daily x2 · Burst 1, Smite_
  - Until the end of the encounter, the user loses its Fire-Type (pure Fire-Types become Normal-Type).

- 🟡 **Conversion2** — `partial` · P3 · themes: multiturn · engine: conversion · code: conversionKind:2533
  - _Normal Status · DB — · AC — · At-Will · Self_
  - The user becomes the elemental Type of their choice as long as the Type resists the elemental Type of the Move it last took damage from until the end of the encounter. Replace all other Types.

- 🟡 **Core Enforcer** — `partial` · P3 · themes: multiturn, control, swap, status · code: MEGA_MOVE_SWAPS:1825
  - _Dragon Special · DB 10 · AC 2 · Daily x2 · 6, Ranged Blast 3, Spirit Surge_
  - Each Target has its Ability disabled until the end of the encounter. If a target has more than one Ability, you choose one of them to disable.

- 🔴 **Destiny Bond** — `todo` · P3 · themes: multiturn
  - _Ghost Status · DB — · AC — · EOT · Burst 10, Friendly_
  - All enemy targets in the burst become Bound to the user until the end of your next turn. If a Bound target causes the user to Faint through a Damaging Attack, the Bound target immediately faints after their attack is resolved.

- 🟡 **Dive** — `partial` · P3 · themes: multiturn · code: researcherCard:30857
  - _Water Physical · DB 8 · AC 2 · Scene x2 · Burst 1, Set Up, Full Action_
  - Set-Up Effect: The user moves underwater and its turn ends. The user must be in water at least 10 meters deep to use Dive. While underwater, the user may not be targeted by Moves. Resolution Effect: The user may shift horizontally using their underwater speed, and then may shift straight up until reaching a target. The user then attacks with Dive, creating a Burst 1. *Grants Swim +3

<a id="moves-15"></a>
## `moves-15` — Weather & Terrain (1/2)

P1 · 25 open of 25 · open

- 🟡 **Acid Armor** — `partial` · P1 (player:Lázaro) · themes: weather, multiturn, status, typing · engine: cs
  - _Poison Status · DB — · AC — · Scene · Self, Set-Up_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: weather, multiturn, status, typing
  - Set-Up Effect: The user becomes Liquefied. While Liquefied, the user is Slowed and cannot take Standard Actions except to Resolve the effect of Acid Armor, the user's Movement is never obstructed by rough or slow terrain, and the user can shift even through the smallest openings. Furthermore, while Liquefied, the user is completely immune to all Physical damage and becomes completely invisible if fully submerged in any liquid. Resolution Effect: The user gains +1 Defense CS, then stops being liquified.

- 🟡 **Camouflage** — `partial` · P1 (pc, player:Lysgd) · themes: weather, status · code: ENDABLE_TYPE_SHIFTS:2480, isCamouflage:2602, camouflageCard:2612
  - _Normal Status · DB — · AC — · EOT · Self_
  - The user changes their Type to match the field. Pick one type from the following table. If two or more rows are relevant (such as because of Weather), pick one:
    -Beach: Ground or Water
    -Cave: Rock or Dark
    -Desert: Ground or Rock
    -Forest: Grass
    -Fresh Water / Ocean: Water
    -Grassland: Normal or Grass
    -Marsh: Water or Poison
    -Mountain: Rock or Ground
    -Rainforest: Grass or Poison
    -Taiga: Ice or Grass
    -Tundra: Ice
    -Urban: Normal or Steel
    -Sunny: Fire
    -Rainy: Water
    -Hailing: Ice
    -Sandstorming: Rock
    Your GM may provide additional options should they choose (for instance, an Ethereal Forest may provide Psychic and Fairy options.) *Grants Blender

- 🔴 **Moonlight** — `todo` · P1 (player:Handels) · themes: weather, heal
  - _Fairy Status · DB — · AC — · Daily x2 · Self, Healing_
  - The user regains HP equal to half of its full HP. If it is Sunny, the user gains 2/3 of its full HP. If it is Rainy, Sand Storming, or Hailing, the user gains 1/4 of its full HP.

- 🟡 **Powder Snow** — `partial` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: weather · engine: range, range-status, status-fx
  - _Ice Special · DB 4 · AC 2 · At-Will · Line 4_
  - Powder Snow Freezes all Legal Targets on 19+. *Grants: Freezer

- 🟡 **Sandstorm** — `partial` · P1 (player:Lázaro) · themes: weather, heal, typing · code: WEATHER_DEFS:1211, CAMOUFLAGE_FIELDS:2600, WEATHER_SETTER_ABILITIES:2999, MOVE_CONDITIONS:21250, extremeWeatherFx:30347, WEATHER_SYSTEM_MOVES:30415
  - _Rock Status · DB — · AC — · Daily x2 · Field, Weather_
  - The weather changes to a Sandstorm for 5 rounds. While it is Sandstorming, all non-Ground, Rock, or Steel Type Pokemon lose a Tick of Hit Points at the beginning of their turn.

- 🔴 **Barrier** — `todo` · P2 (enc, pc) · themes: weather, barrier, heal, multiturn
  - _Psychic Status · DB — · AC — · Scene x2 · Hazard_
  - The user creates a Barrier of psychic energy. The user places up to 4 segments of Barrier; each segment must be continuous with another segment, and at least one must be adjacent to the user. These barriers count as blocking terrain and last until the end of the encounter or until they are destroyed. Each Barrier segment is 2 meters tall, 1 meter wide, and 2 centimeters thick. Each segment has 20 Hit Points, 15 Damage Reduction, and takes damage as if it was Psychic Typed.

- 🟡 **Blizzard** — `partial` · P2 (enc) · themes: weather · engine: range, range-status, status-fx · code: WEATHER_DEFS:1231, ROTOM_POLTERGEIST:19849
  - _Ice Special · DB 11 · AC 7 · Scene x2 · 4, Ranged Blast 2, Smite_
  - Blizzard Freezes all legal target on 15+. If the target is in Hailing Weather, Blizzard cannot miss.

- 🟡 **Growth** — `partial` · P2 (enc, pc) · themes: weather · engine: cs
  - _Normal Status · DB — · AC — · EOT · Self_
  - Raise the user's Attack and Special Attack by +1 CS each. If it is Sunny, double the amount of Combat Stages gained. *Grants Inflatable

- 🟡 **Hurricane** — `partial` · P2 (enc) · themes: weather · engine: range, range-status, status-fx · code: WEATHER_DEFS:1194
  - _Flying Special · DB 11 · AC 7 · Scene x2 · Burst 1, Smite_
  - Hurricane Confuses its target on 15+. If the target is in Sunny Weather, Hurricane's Accuracy Check is 11. If the target is in Rainy Weather, Hurricane cannot miss. If the target is airborne as a result of Bounce, Fly, or Sky Drop, Hurricane cannot miss.

- 🔴 **Morning Sun** — `todo` · P2 (enc) · themes: weather, heal
  - _Normal Status · DB — · AC — · Daily x2 · Self_
  - The user regains Hit Points equal to half of its full Hit Point value. If it is Sunny, the user gains 2/3 of its full Hit Point value. If it is Rainy, Sand Storming or Hailing the user gains 1/4 of their full Hit Point value.

- 🟡 **Rain Dance** — `partial` · P2 (enc, pc) · themes: weather, typing · code: WEATHER_SYSTEM_MOVES:30415
  - _Water Status · DB — · AC — · Daily x2 · Field, Weather_
  - The weather becomes Rainy for 5 rounds. While Rainy, Water-Type Attacks gain a +5 bonus to Damage Rolls, and Fire-Type Attacks suffer a -5 Damage penalty.

- 🟡 **Spikes** — `partial` · P2 (pc) · themes: weather, hazard, multiturn, status · code: HAZARDS:44803
  - _Ground Status · DB — · AC — · At-Will · 6, Hazard_
  - Set 8 square meters of Spikes within the range such that all 8 meters are adjacent with at least one other space of Spikes. Spikes cause terrain to count as Slow Terrain, and a grounded foe that runs into the hazards will lose 1/10th of their full HP and become Slowed until the end of their next turn.

- 🟡 **Sticky Web** — `partial` · P2 (enc) · themes: weather, hazard, multiturn, status, cs · code: HAZARDS:44805
  - _Bug Status · DB — · AC — · EOT · 6, Hazard_
  - Set 8 square meters of Sticky Web hazards within your range such that all 8 meters are adjacent with at least one other space of Sticky Web. Sticky Web causes Terrain to become Slow Terrain, and a grounded foe that runs into the hazard has its Speed lowered by -1 CS and becomes Slowed until the end of their next turn. Flying-type Pokemon and Pokemon and Trainers with Levitate are not affected by Sticky Web. Bug-type Pokemon may move over Sticky Web harmlessly, destroying theHazards as they do so. *Grants Threaded

- 🔴 **Synthesis** — `todo` · P2 (pc) · themes: weather, heal
  - _Grass Status · DB — · AC — · Daily x2 · Self, Healing_
  - The user regains Hit Points equal to half of its full Hit Point value. If it is Sunny, the user gains 2/3 of its full Hit Point value. If it is Rainy, Sand Storming, or Hailing, the user gains 1/4 of its full Hit Point value.

- 🟡 **Thunder** — `partial` · P2 (enc) · themes: weather · engine: range, range-status, status-fx · code: WEATHER_DEFS:1194, openMoveRoll:22095
  - _Electric Special · DB 11 · AC 7 · Scene x2 · 12, 1 Target, Smite_
  - Thunder Paralyzes the target on 15+. If the target is in Sunny Weather, Thunder's Accuracy Check is 11. If the target is in Rainy Weather, Thunder cannot miss. If the target is airborne as a result of Bounce, Fly, or Sky Drop, Thunder cannot miss.

- 🟡 **Toxic Spikes** — `partial` · P2 (enc, pc) · themes: weather, hazard, multiturn, status · code: HAZARDS:44804
  - _Poison Status · DB — · AC — · EOT · 6, Hazard_
  - Set 8 square meters of Toxic Spikes within the range such that all 8 meters are adjacent with at least one other space of Toxic Spikes. Toxic Spikes cause Terrain to become Slow Terrain, and a grounded foe that runs into the hazard becomes Poisoned and Slowed until the end of their next turn. If there are 2 layers of Toxic Spikes on the same space, it Badly Poisons the foes instead. Poison-Type Pokemon may move over Toxic Spikes harmlessly, destroying the Hazards as they do so.

- 🟡 **Trailblaze** — `partial` · P2 (enc, pc) · themes: weather · engine: cs
  - _Grass Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash, Full Action_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: weather
  - The user Shifts before or after attacking, ignoring Slow Terrain. If the user did not move through Slow Terrain during this Shift, raise the user's Speed 1 Combat Stage.

- 🟡 **Weather Ball** — `partial` · P2 (enc) · themes: weather · engine: special:conditionalDB
  - _Normal Special · DB 5 · AC 2 · EOT · 8, 1 Target_
  - If it is Sunny, Weather Ball is Fire-Type. If it is Rainy, Weather Ball is Water-Type. If it is Hailing, Weather Ball is Ice-Type. If it is Sandstorming, Weather Ball is Rock-Type. When a weather effect is on the field, Weather Ball has a Damage Base of 10 (3d8+10 / 24). If there are multiple Weather Effects on the field, choose one type for Weather Ball to be that corresponds with an existing Weather Effect.

- 🟡 **Zap Cannon** — `partial` · P2 (enc) · themes: weather · engine: status-fx, status-always
  - _Electric Special · DB 12 · AC 9 · At-Will · 12, 1 Target_
  - Zap Cannon Paralyzes the target. Zap Cannon ignores the target's Evasion if their are no other combatants or Rough or Blocking Terrain within 2 meters of the target.

- 🟡 **Aurora Veil** — `partial` · P3 · themes: weather, typing · engine: blessing
  - _Ice Status · DB — · AC — · Scene · Blessing_
  - Blessing - Any user affected by Aurora Veil may activate it when receiving Damage to resist the Damage one step. Aurora Veil may be activated 2 times, and then disappears. Special: Auora Veil can only be used when the user is in Hailing Weather. The Blessings persist even after Hailing Weather has ended, however.

- 🔴 **Chilly Reception** — `todo` · P3 · themes: weather, position, status
  - _Ice Status · DB — · AC — · Scene · Field_
  - The weather changes to Snowy for 5 rounds and the user may immediately be recalled in the same turn. A new Pokemon may immediately be sent out. Using this Move lets a Trapped user be recalled. If the user is not recalled, their movement this turn does not provoke Attacks of Opportunity instead.

- 🟡 **Collision Course** — `partial` · P3 · themes: weather, typing · engine: target-rules
  - _Fighting Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - Create Slow Terrain in all squares the user Shifted through during Pass, and in a Burst 1 around the user after finishing movement. The user may ignore this Slow Terrain. Whenever this Move deals Super-Effective Damage to a target, that target treats your Damage Roll as if it was increased by +10.

- 🔴 **Defog** — `todo` · P3 · themes: weather
  - _Flying Status · DB — · AC — · Daily x2 · Field, Weather_
  - The Weather becomes Clear, and all Blessings, Coats, and Hazards are destroyed. Clear Weather is the default weather, conferring no bonuses or penalties of any sort.

- 🔴 **Electro Shot** — `todo` · P3 · themes: weather
  - _Electric Special · DB 13 · AC 4 · Scene · Line 4, Full Action, Smite_
  - For 1 round, any ally that enters a square adjacent to the user, or starts movement there, may Disengage into any square of the Area of Effect of this Move without expending Movement, and then continue their Shift. If the user is in Rainy Weather, this Move is a Standard Action. 31

- 🔴 **Expanding Force** — `todo` · P3 · themes: weather, interrupt, multiturn
  - _Psychic Special · DB 8 · AC 2 · EOT · Burst 1, Spirit Surge_
  - After Expanding Force is resolved, you may create Psychic Terrain in a Blast 7, centered on the user, that lasts for 5 turns. Any creatures in those spaces are affected as if by the Field Move Psychic Terrain, rather than any other Field Move. This Effect may trigger only once per Scene.

<a id="moves-17"></a>
## `moves-17` — Ability / item / stat swaps (1/2)

P1 · 25 open of 25 · open

- 🔴 **Foresight** — `todo` · P1 (enc, pc, player:Handels) · themes: swap
  - _Normal Status · DB — · AC — · Scene x2 · Self, Swift Action_
  - Foresight may be activated as a Swift Action on the user's turn. For the rest of the turn, the user's Normal-Type and Fighting-Type Moves can hit and affect Ghost-Type targets, and the user can see through the Illusion Ability, Moves with the Illusion keyword, and effects created by the Illusionist Capability, ignoring all effects from those.

- 🔴 **Pluck** — `todo` · P1 (enc, player:Handels) · themes: swap
  - _Flying Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Pluck takes the target's Held Item or Accessory Slot Item and attaches it to Pluck's user, if the user is not holding anything.

- 🟡 **Fling** — `partial` · P2 (enc) · themes: swap · engine: special:valueDB · code: specialMoveInfo:21328
  - _Dark Physical · DB — · AC 2 · Scene x2 · 6, 1 Target, Fling_
  - The user throws a held item, determining the effect of Fling.

- 🔴 **Gravity** — `todo` · P2 (enc) · themes: swap, typing
  - _Psychic Status · DB — · AC — · Daily x2 · Field_
  - For 5 rounds, the area is considered Warped. While Warped, Moves that involve the user being airborne may not be used. Pokemon cannot use Sky or Levitate Capabilities to end their turn at an altitude higher than 1 meter. Flying-Types and Pokemon with the Ability Levitate are no longer immune to Ground-Type Moves. All Accuracy Rolls receive a +2 Bonus.

- 🔴 **Magnet Rise** — `todo` · P2 (enc) · themes: swap
  - _Electric Status · DB — · AC — · Daily x2 · Self, Swift Action_
  - The user gains the Levitate Ability for 5 turns. Magnet Rise may be activated as a Swift Action if the user is otherwise given an action that consumes a Command.

- 🟡 **Memento** — `partial` · P2 (enc, pc) · themes: swap, status · engine: cs · code: CS_CHAIN_RE:20555
  - _Dark Status · DB — · AC — · Scene · 8, 1 Target, Trigger, Free Action_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap, status
  - Memento may be used as a Free Action that does not consume a Command action when the user becomes Fainted. Lower each of the target's stats by -2 CS.

- 🔴 **Odor Sleuth** — `todo` · P2 (enc, pc) · themes: swap
  - _Normal Status · DB — · AC — · Scene x2 · Self, Swift Action_
  - Odor Sleuth may be activated as a Swift Action on the user's turn. For the rest of the turn, the user's Normal-Type and Fighting-Type Moves can hit and affect Ghost-Type targets, and the user can see through the Illusion Ability, Moves with the Illusion keyword, and effects created by the Illusionist Capability, ignoring all effects from those.

- 🔴 **Simple Beam** — `todo` · P2 (enc) · themes: swap
  - _Normal Status · DB — · AC 2 · Scene · 6, 1 Target_
  - You choose one of the target's Abilities. Simple Beam changes that Ability to Simple for the remainder of the encounter.

- 🟡 **Switcheroo** — `partial` · P2 (pc) · themes: swap · code: analyticContext:21047
  - _Dark Status · DB — · AC 2 · At-Will · Melee, 1 Target_
  - The user and the target exchange held items.

- 🟡 **Techno Blast** — `partial` · P2 (enc) · themes: swap · engine: picks-type
  - _Normal Special · DB 12 · AC 2 · Scene · 6, Ranged Blast 2_
  - Techno Blast's Type can be any Type while holding the appropriate Drive item or Plate item.

- 🔴 **Thief** — `todo` · P2 (enc, pc) · themes: swap
  - _Dark Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Thief takes the target's held item and attaches it to Thief's user if the user is not holding anything.

- 🔴 **Trick** — `todo` · P2 (enc) · themes: swap
  - _Psychic Status · DB — · AC 2 · Scene · 5, 2 Targets_
  - Both targets must be hit for Trick to succeed. The user may target itself or willing allies with Trick; you do not need to roll for Accuracy Check in these cases. Both targets lose their Held Item and gain the other target's Held Item. If a target has no Held Item, they still can gain the other target's Held Item.

- 🟡 **Worry Seed** — `partial` · P2 (enc) · themes: swap · code: SEED_BAG_MOVES:29607
  - _Grass Status · DB — · AC 2 · Scene · 8, 1 Target_
  - You choose one of the target's Abilities. Worry Seed changes that Ability to Insomnia for the remainder of the encounter.

- 🟡 **Acrobatics** — `partial` · P3 · themes: swap · engine: special:conditionalDB · code: trainerDerivedGrid:9981, FLIP_OUT_MOVES:23822, flipOutBox:23918, CAPTURE_SKILLS:25479
  - _Flying Physical · DB 6 · AC 2 · EOT · Melee, Dash, 1 Target_
  - If the user is not holding an item, Acrobatics instead has a Damage Base of 11 (3d10+10/27)

- 🔴 **Bestow** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC — · At-Will · Melee, 1 Target_
  - The user gives its held item to the target, unless the target is already holding an item. Using Bestow is a Swift Action.

- 🔴 **Blind** — `todo` · P3 · themes: swap, status
  - _None Status · DB — · AC 2 · Standard · Melee, 1 Target_
  - You and the target make Opposed Stealth Checks. If you win, the target is Blinded for one full round.

- 🔴 **Corrosive Gas** — `todo` · P3 · themes: swap, status, typing
  - _Poison Status · DB — · AC 2 · EOT · Burst 1_
  - Targets hit have their current Held Item(s) unable to be used for the remainder of the Scene. In addition, Steel-Type targets hit lose their immunity to Poison until they Faint or Take A Breather; Poison instead counts as neutral against Steel.

- 🔴 **Court Change** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC — · Daily · Field_
  - All Blessings and Hazards swap which side that they belong to.

- 🔴 **Covet** — `todo` · P3 · themes: swap
  - _Normal Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Covet takes the target's Held Item or Accessory Slot Item and attaches it to Covet's user, if the user is not holding anything.

- 🟡 **Disarm** — `partial` · P3 · themes: swap · code: BATTLE_ACTIONS:23169
  - _None Status · DB — · AC 6 · Standard · Melee, 1 Target_
  - You and the target each make opposed Combat or Stealth Checks. If you win, the target's Held Item (Main Hand or Off-Hand for humans) falls to the ground.

- 🔴 **Doodle** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC — · Scene · 6, 1 Target_
  - The user gains 1 Ability of their choice from the target, and may also grant that Ability to an ally within range, both for the remainder of the encounter. This Move cannot miss.

- 🔴 **Entrainment** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC 2 · Scene · 4, 1 Target_
  - The target gains one of the user's Abilities for 3 turns.

- 🟡 **Gear Up** — `partial` · P3 · themes: swap · engine: cs
  - _Steel Status · DB — · AC — · Scene x2 · Burst 4_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap
  - All targets with the Plus or Minus Abilities receive +1 Attack and Special Attack Combat Stages.

- 🔴 **Magic Room** — `todo` · P3 · themes: swap
  - _Psychic Status · DB — · AC — · Daily x2 · Field_
  - The area becomes Useless for 5 rounds. While Useless, Pokemon may not benefit from the effects of any Held Items, and Trainers cannot benefit from any Accessory-Slot equipment. This does not affect consumable or activated items, only Items with Static effects or Triggers.

- 🟡 **Magnetic Flux** — `partial` · P3 · themes: swap · engine: cs
  - _Electric Status · DB — · AC — · Scene · Burst 4_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap
  - Raise the Defense and Special Defense of all legal targets with the Minus or Plus Abilities by +1 CS.

<a id="moves-19"></a>
## `moves-19` — Interrupts, reactions & priority

P1 · 32 open of 32 · open

- 🟡 **Bide** — `partial` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: interrupt, status · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21146
  - _Normal Physical · DB — · AC — · Scene · Burst 1, Friendly_
  - The user may use Bide as a Reaction Move upon being Hit by a Damaging Move. During their next available turn, the user may Shift and then use Bide, causing all Adjacent foes to lose X HP, where X is the amount of Damage taken since declaring use of Bide (Loss of life through effects such as Poison is not 'Damage').

- 🔴 **Double Team** — `todo` · P1 (enc, pc, player:Lázaro) · themes: interrupt
  - _Normal Status · DB — · AC — · Scene · Self, Illusion, Coat_
  - The user gains 3 activations of Double Team. The user may either activate Double Team when being targeted by an attack to increase their Evasion by +2 against that attack or when making an attack to increase their Accuracy by +2 for that attack.

- 🔴 **Protect** — `todo` · P1 (enc, pc, player:Lázaro) · themes: interrupt
  - _Normal Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - If the user is hit by a Move, the user may use Protect. The user is instead not hit by the Move. The user does not take any damage nor is affected by any of the Move's effects.

- 🟡 **Assurance** — `partial` · P2 (enc) · themes: interrupt · engine: special:conditionalDB
  - _Dark Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - If Assurance's target has already been damaged by a Move on the same round Assurance is being used, Assurance has a Damage Base of 12 (3d12+10 / 30) instead. This effect may trigger only once per Scene per Target.

- 🟡 **Beat Up** — `partial` · P2 (enc) · themes: interrupt · engine: special:noteOnly · code: specialMoveInfo:21340
  - _Dark Physical · DB — · AC — · EOT · Melee, 1 Target_
  - The user and up to two allies adjacent to the target may each make a Struggle Attack against the target. These Struggle Attacks hit for Dark-Type Damage instead of their usual Type. Beat Up may trigger Pack Hunt only once, no matter the number of attacks.

- 🔴 **Crafty Shield** — `todo` · P2 (enc) · themes: interrupt
  - _Fairy Status · DB — · AC — · Scene · Burst 2, Trigger, Interrupt, Shield_
  - If the user or an Ally within 2 meters of Crafty Shield's user is hit by a Status Move, you may use Crafty Shield as an Interrupt. All targets in Crafty Shield's area-of-effect including the user, are instead not hit by the triggering Move and do not suffer any of its effects.

- 🔴 **Kinesis** — `todo` · P2 (enc) · themes: interrupt
  - _Psychic Status · DB — · AC — · Scene · 6, 1 Target, Trigger, Interrupt_
  - If the user or an Ally within 6 meters is about to be hit by an attack, the user may use Kinesis as an interrupt. The triggering Accuracy Roll receives a -4 penalty. This may cause Moves to miss.

- 🟡 **Lucky Chant** — `partial` · P2 (enc) · themes: interrupt · engine: blessing · code: SAGE_BLESSINGS:32032, blessingIcon:40704
  - _Normal Status · DB — · AC — · Scene · Blessing_
  - Any user affected by Lucky Chant may activate it when receiving a Critical Hit to cause the attack to instead deal damage as if it was not a Critical Hit. Lucky Chant may be activated 3 times and then disappears.

- 🔴 **Me First** — `todo` · P2 (enc) · themes: interrupt
  - _Normal Status · DB — · AC — · Scene · Self, Trigger, Interrupt_
  - If an opponent declares a Damaging Attack against the user, and Me First's user has a higher Speed stat then the target, the user may use Me First as an Interrupt. The User will then use the same Move the triggering foe was about to use on that foe.

- 🔴 **Snatch** — `todo` · P2 (enc) · themes: interrupt
  - _Dark Status · DB — · AC — · Scene x2 · 6, 1 Target, Trigger, Interrupt_
  - If the target uses a Self-Targeting Move, you may use Snatch as an Interrupt. You gain the benefits of the Self-Targeting Move instead of the target.

- 🔴 **Sucker Punch** — `todo` · P2 (enc) · themes: interrupt
  - _Dark Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target, Trigger, Interrupt_
  - If an adjacent foe targets the user with a Damaging Attack, Sucker Punch may be used as an Interrupt Move against the triggering foe.

- 🔴 **Vital Throw** — `todo` · P2 (enc) · themes: interrupt
  - _Fighting Physical · DB 7 · AC — · EOT · Melee, 1 Target, Push, Reaction_
  - If the user is targeted by a Melee attack and has not yet taken a turn this round, the user may declare Vital Throw. After the triggering attack is resolved, the user may use Vital Throw against the triggering foe as a Reaction. Vital Throw cannot miss.

- 🔴 **Wide Guard** — `todo` · P2 (enc) · themes: interrupt
  - _Rock Status · DB — · AC — · Scene · Burst 1, Interrupt, Shield, Trigger_
  - If an Ally adjacent to Wide Guard's user is hit by a Move, you may use Wide Guard as an Interrupt. All targets adjacent to Wide Guard's user, including the user, are instead not hit by the triggering Move and do not suffer any of its effects.

- 🔴 **Alluring Voice** — `todo` · P3 · themes: interrupt, multiturn, status, cs
  - _Fairy Special · DB 8 · AC 2 · EOT · Burst 1, Sonic, Spirit Surge_
  - After this Move has resolved, the user may choose to Confuse foes within 5m that have had any CS raised since the beginning of that foe's last turn. This Effect may trigger only once per Scene.

- 🔴 **Burning Jealousy** — `todo` · P3 · themes: interrupt, multiturn, status, cs
  - _Fire Special · DB 7 · AC 2 · EOT · Burst 1, Spirit Surge_
  - After Burning Jealousy has resolved, the user may choose to Burn foes within 5m that have had any CS raised since the beginning of that foe's last turn. This Effect may trigger only once per Scene.

- 🔴 **Fire Pledge** — `todo` · P3 · themes: interrupt
  - _Fire Special · DB 8 · AC 2 · Scene · 6, 1 Target, Pledge_
  - If an ally uses Grass Pledge or Water Pledge, you may use Fire Pledge as Priority (Advanced) immediately after their turn to target the same foe. If used in conjunction with Grass Pledge, Fire Hazards are created in a Brust 1 around the target. If used in conjucntion with Water Pledge, a Rainbow is created that lasts for 5 rouns. Counsult the Pledge keyword for additional details.

- 🟡 **Grass Pledge** — `partial` · P3 · themes: interrupt, status · engine: cs
  - _Grass Special · DB 8 · AC 2 · Scene · 6, 1 Target, Pledge_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: interrupt, status
  - If an ally uses Fire Pledge or Water Pledge, you may use Grass Pledge as Priority (Advanced) immediately after their turn to target the same foe. If used in conjunction with Fire Pledge, Fire Hazards are created in a Burst 1 around the target. If used in conjunction with Water Pledge, the target and all foes adjacent to the the target are slowed and have their Speed reduced by 2 Combat Stages. Consult the Pledge keyword for additional details.

- 🔴 **Grudge** — `todo` · P3 · themes: interrupt, status
  - _Ghost Status · DB — · AC — · Daily · 6, 1 Target, Interrupt_
  - You may use Grudge as an Interrupt when a Damaging Attack causes the user to faint. Grudge is activated as a Free Action (does not take up a Command.) The attack is resolved as usual, and the user Faints. The attacker that caused the user to Faint becomes Suppressed for the remainder of the encounter; switching and Taking a Breather does not end Suppression when used this way.

- 🔴 **Instruct** — `todo` · P3 · themes: interrupt, multiturn, control
  - _Psychic Status · DB — · AC — · Scene x2 · Melee, 1 Target_
  - The target immediately reuses the attack it performed last, ignoring frequency, as a Free Action. They may choose new targets for the copied attack. Instruct may not be used if the Target's last Move was a Set-Up Move, a Trigger Move, or Instruct, or if the Target is currently affected by Exhaust.

- 🟡 **Order Up** — `partial` · P3 · themes: interrupt, swap, cs · engine: versatile · code: commanderOrderUp:8708, openTrainerAttack:9065, openMoveRoll:21953
  - _Dragon Versatile · DB 8 · AC 2 · EOT · Melee, 1 Target, Versatile, Spirit Surge_
  - If the user, target, an Attached Commander or a pokemon Grappled by the user has a Food Buff, you may consume one of those Buffs (ignoring its normal trigger condition), gain its effects, and this attack is one step more effective. The target cannot activate Food Buffs in response to this Move. If a Tatsugiri is Attached to the user and this Move hits, the user gains +1 Combat Stage depending on that Tatsugiri's Form: Curly Form raises Attack, Droopy Form raises Defense, and Stretchy Form raises Speed.

- 🟡 **Psychic Terrain** — `partial` · P3 · themes: interrupt · code: weatherTickReport:1345, TERRAIN_DEFS:1373
  - _Psychic Status · DB — · AC — · Daily x2 · Field_
  - The Field becomes Weird for five rounds. While the Field is Weird, non-Flying and non- Levitating Pokemon cannot declare Priority or Interrupt Moves outside their own Initiatives. Damaging Psychic-Type attacks deal an additional 10 damage.

- 🔴 **Quick Guard** — `todo` · P3 · themes: interrupt
  - _Fighting Status · DB — · AC — · Scene · Melee, Interrupt, Shield, Trigger_
  - If the user or an adjacent ally is targeted by a Priority or Interrupt Attack, Quick Guard may be declared as an Interrupt, causing the triggering attack to have no effect.

- 🔴 **Riposte** — `todo` · P3 · themes: interrupt
  - _Normal Physical · DB 12 · AC 2 · Scene x2 · WR, 1 Target, Reaction, Trigger_
  - Trigger: Your Target misses you with a melee Attack.
    Limitations: Melee or Short-Ranged Weapons Only

- 🔴 **Shell Trap** — `todo` · P3 · themes: interrupt
  - _Fire Special · DB 15 · AC 2 · Scene · Melee, 1 Target, Interrupt, Trigger_
  - If the user is hit by a Melee attack, they may use Shell Trap as an Interrupt.

- 🔴 **Sketch** — `todo` · P3 · themes: interrupt, control
  - _Normal Status · DB — · AC — · Daily · 15, 1 Target_
  - Sketch cannot miss. Once Sketch has been used, remove Sketch from the user's Move list. The last Move that the target used is added to the user's Move list permanently. Sketch may not be Interrupted or Intercepted.

- 🟡 **Sky Uppercut** — `partial` · P3 · themes: interrupt, multiturn · code: IRON_FIST_MOVES:20730
  - _Fighting Physical · DB 9 · AC 4 · At-Will · Melee, 1 Target, Interrupt_
  - Sky Uppercut may be used as an Interrupt when against a target initiating Bounce, Fly, or Sky Drop. If Sky Uppercut successfully hits its target, the Triggering Move fails (though the target may take their next turn normally.)

- 🟡 **Snipe Shot** — `partial` · P3 · themes: interrupt, swap · engine: range, range-crit
  - _Water Special · DB 8 · AC 2 · EOT · 8, 1 Target_
  - Snipe Shot is a Critical Hit on 18+. This Move may not be Intercepted, nor may any Abilities, Moves, or Features be activated to change this Move's target. Any of those existing effects (such as Follow Me) fail.

- 🔴 **Sparkling Aria** — `todo` · P3 · themes: interrupt, status, cure
  - _Water Special · DB 9 · AC 2 · EOT · Melee, 2 Targets_
  - When you hit a target with Sparkling Aria, the user may choose to deal no damage and instead cures that target of Burn, Confusion, Infatuation, Rage, or Provocation.

- 🔴 **Sucker Punch [SM]** — `todo` · P3 · themes: interrupt
  - _Dark Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target, Trigger, Interrupt_
  - If an adjacent foe targets the user with a Damaging Attack, Sucker Punch may be used as an Interrupt Move against the triggering foe.

- 🔴 **Thunderclap** — `todo` · P3 · themes: interrupt
  - _Electric Special · DB 7 · AC 2 · At-Will · 3, 1 Target_
  - If a foe within Range uses a damaging Move, or leaves Range, the user may use this Move as an Interrupt against that foe. If they do, the target receives a -10 damage penalty to its next Move, or the triggering one, if any. Fairy Moves

- 🟡 **Upper Hand** — `partial` · P3 · themes: interrupt · engine: status-fx, status-always
  - _Fighting Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target_
  - If an adjacent foe declares Priority or an Interrupt, this Move may be used as an Interrupt against the triggering foe. If used this way, this Move Flinches the target. If the triggering Interrupt was itself triggered by the user's Standard Action, that Action is relinquished, in favor of giving up the Action on the following round, to use this Move.

- 🟡 **Water Pledge** — `partial` · P3 · themes: interrupt, multiturn, status · engine: cs
  - _Water Special · DB 8 · AC 2 · Scene x2 · 6, 1 Target, Pledge_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: interrupt, multiturn, status
  - If an ally uses Fire Pledge or Grass Pledge, you may use Water Pledge as Priority (Advanced) immediately after their turn to target the same foe. If used in conjunction with Fire Pledge, a Rainbow is created that lasts for 5 rounds. If used in conjunction with Grass Pledge, the target and all foes adjacent to the target are slowed and have their Speed reduced by 2 Combat Stages. Consult the Pledge keyword for additional details.

<a id="moves-20"></a>
## `moves-20` — Coats, barriers & Blessings

P1 · 19 open of 19 · open

- 🟡 **Dragon Rage** — `partial` · P1 (enc, player:Lázaro) · themes: barrier · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21135
  - _Dragon Special · DB — · AC 2 · At-Will · 4, 1 Target_
  - Dragon Rage causes the target to lose 15 HP. Dragon Rage is Special and interacts with other moves and effects as such (Special Evasion may be applied to avoid it, Mirror Coat can reflect it, etc.).

- 🔴 **Mud Sport** — `todo` · P1 (enc, pc, player:Handels) · themes: barrier, typing
  - _Ground Status · DB — · AC — · EOT · Burst 2_
  - All targets in the burst, including the user, gain a Coat which grants them 1 Step of Resistance to Electric Type Moves. After a target has been hit by a damaging Electric Type Move, the coat is removed.

- 🔴 **Water Sport** — `todo` · P1 (enc, pc, player:Lázaro) · themes: barrier, typing
  - _Water Status · DB — · AC — · EOT · Burst 2, Coat_
  - All targets in the burst, including the user, gain a Coat which grants them 1 Step of Resistance to Fire Type Moves. After a target has been hit by a damaging Fire Type Move, the coat is removed. *Grants Fountain

- 🔴 **Aqua Ring** — `todo` · P2 (enc, pc) · themes: barrier, heal
  - _Water Status · DB — · AC — · Scene · Self, Coat_
  - Aqua Ring covers the user in a Coat that heals the user at the beginning of their turn. The user is healed a Tick of Hit Points each turn.

- 🔴 **Brick Break** — `todo` · P2 (enc) · themes: barrier
  - _Fighting Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - Light Screen and Reflect may not be activated in response to Brick Break.

- 🔴 **Ingrain** — `todo` · P2 (enc, pc) · themes: barrier, position
  - _Grass Status · DB — · AC — · Scene · Self, Coat_
  - Ingrain applies a Coat to the user, which has the following effect; the user cannot be pushed or pulled, and cannot be switched out. At the beginning of each of the user's turn, the user gains HP equal to 1/10th of its max HP.

- 🔴 **Magic Coat** — `todo` · P2 (enc) · themes: barrier, interrupt
  - _Psychic Status · DB — · AC — · Daily · 4, Interrupt, Trigger_
  - If the user is about to get a hit by a Move that does not have a Damage Dice Roll, they may use Magic Coat as an Interrupt. The Interrupted Move's user is treated as if they were the target of their own Move, with the user of Magic Coat as the user.

- 🟡 **Metronome** — `partial` · P2 (enc) · themes: barrier, interrupt, control, status · code: openTrainerAttack:8827, isMetronomeMove:21514, openMetronome:21578
  - _Normal Status · DB — · AC — · Scene x2 · Self_
  - Metronome randomly uses any other Move except for After You, Assist, Bestow, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Endure, Feint, Focus Punch, Follow Me, Helping Hand, King's Shield, Metronome, Me First, Mimic, Mirror Coat, Mirror Move, Protect, Quash, Quick Guard, Rage Powder, Sketch, Sleep Talk, Snatch, Snore, Spiky Shield, Switcheroo, Thief, Transform, Trick, and Wide Guard. The GM helps to pick the random Move.

- 🔴 **Psyshock** — `todo` · P2 (enc) · themes: barrier
  - _Psychic Special · DB 8 · AC 2 · At-Will · 4, 1 Target_
  - When calculating damage, the target subtracts their Defense from Psyshock's damage instead of their Special Defense. Psyshock is still otherwise Special (Special Evasion is used to avoid it, Mirror Coat can reflect it, etc.)

- 🔴 **Psystrike** — `todo` · P2 (enc) · themes: barrier
  - _Psychic Special · DB 10 · AC 2 · EOT · 4, 1 Target_
  - When calculating damage, the target subtracts their Defense from Psystrike's damage instead of their Special Defense. Psystrike is still otherwise Special (Special Evasion is used to avoid it, Mirror Coat can reflect it, etc.)

- 🟡 **Sonic Boom** — `partial` · P2 (pc) · themes: barrier · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21136
  - _Normal Special · DB — · AC 6 · EOT · 8, 1 Target_
  - Sonicboom causes the target to lose 15 HP. Sonicboom is Special and interacts with other moves and effects as such (Special Evasion may be applied to avoid it, Mirror Coat can reflect it, etc.)

- 🔴 **Substitute** — `todo` · P2 (enc) · themes: barrier, heal, typing
  - _Normal Status · DB — · AC — · Scene · Self, Illusion, Coat_
  - The user loses 1/4 of their maximum Hit Points. This Hit Point loss cannot be prevented in any way. The user creates an Illusory Substitute Coat, which has Hit Points equal to 1/4th of the user's full Hit Points +1. If the user would be hit by a Move or attack, instead the Substitute gets hit. Apply weakness, resistance and stats to the Substitute. The Substitute is immune to Status Afflictions and Status Moves. Moves with the Social or Sonic keywords completely ignore and bypass the Substitute. Once the Substitute has been destroyed, the user may be hit as normal. Substitute cannot be used if the user has less than 1/4 of their full Hit Points.

- 🟡 **Mirror Coat** — `partial` · P3 · themes: barrier, heal, interrupt, status, typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21143
  - _Psychic Status · DB — · AC — · Scene x2 · Any, 1 Target, Reaction_
  - Mirror Coat may be used as a Reaction when the user is hit by a damaging Special Attack. Resolve the Triggering Attack, with Mirror Coat's user resisting the attack one step further. After the attack is resolved, if Mirror Coat's user was not Fainted, the triggering foe then loses Hit Points equal to twice the amount of Hit Points lost by the user from the triggering attack. Note that Mirror Coat is Special, and while it cannot miss, it cannot hit targets immune to Psychic-Type Moves.

- 🟡 **Mist Ball** — `partial` · P3 · themes: barrier · engine: cs
  - _Psychic Special · DB 7 · AC 2 · Scene x2 · 12, 1 Target_
  - Mist Ball lowers the target's Special Attack by 1 Combat Stage on an Even-Numbered Roll.

- 🟡 **Powder** — `partial` · P3 · themes: barrier · engine: powder · code: powderImmuneNote:32232
  - _Bug Status · DB — · AC — · Scene x2 · 6, 1 Target, Interrupt, Powder_
  - The target is dusted with a Coat of flammable powder. If the affected target uses a damaging Fire-Type attack, the attack is negated and instead creates a Blast 3 centered on itself as the powder explodes, and the Coat is removed. All legal targets within the Blast take damage equal to what the user of the Fire-Type attack would roll for the damage of their attack. This damage is Typeless or Fire-Type, whichever would be more effective.

- 🟡 **Psychic Fangs** — `partial` · P3 · themes: barrier · code: STRONG_JAW_MOVES:20848
  - _Psychic Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - Light Screen, Reflect and Aurora Veil cannot be declared in response to Psychic Fangs.

- 🟡 **Reflect Type** — `partial` · P3 · themes: barrier, typing · code: reflectTypeCard:2789
  - _Normal Status · DB — · AC 2 · Scene · Melee, 1 Target_
  - Reflect Type changes one of the user's Types into one Type of your choice that the target has for the rest of the scene.

- 🔴 **Secret Sword** — `todo` · P3 · themes: barrier
  - _Fighting Special · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - When calculating damage, the target subtracts their Defense from Secret Sword's damage instead of their Special Defense. Psyshock is still otherwise Special (Special Evasion is used to avoid it, Mirror Coat can reflect it, etc.)

- 🟡 **Tar Shot** — `partial` · P3 · themes: barrier, status · engine: cs
  - _Rock Status · DB — · AC 2 · Scene · Cone 2_
  - The target gains a Coat that is automatically expended upon being hit with a Fire Type attack in order to make them one step more vulnerable to that attack. In addition, the target's Speed is lowered by 1 CS.

<a id="moves-21"></a>
## `moves-21` — Type changes & immunities, Move control & copying, Curing, Hazards & field markers

P1 · 21 open of 21 · open

- 🟡 **Night Shade** — `partial` · P1 (enc, pc, player:Handels) · themes: typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21134
  - _Ghost Special · DB — · AC 2 · Scene x2 · 8, 1 Target_
  - The target loses HP equal to the level of Night Shade's user. Do not apply weakness or resistance. Do not apply stats.

- 🟡 **Psywave** — `partial` · P1 (enc, pc, player:Lysgd) · themes: typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21139
  - _Psychic Special · DB — · AC 5 · Scene · 6, 1 Target_
  - Roll 1d4; on 1 the target loses HP equal to half the user's Level; on 2 the target loses HP equal to the user's Level; on 3 the target loses HP equal to 1.5x the user's level; on 4 the target loses HP equal to the user's Level doubled. Do not apply weakness or resistance, and do not apply Stats. Do apply Immunity.

- 🟡 **Seismic Toss** — `partial` · P1 (enc, player:Lázaro) · themes: typing · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21133
  - _Fighting Physical · DB — · AC 2 · Scene x2 · Melee, 1 Target_
  - The target loses HP equal to the level of Seismic Toss's user. Do not apply weakness or resistance. Do not apply stats.

- 🟡 **Leech Seed** — `partial` · P2 (enc) · themes: typing, capture · code: SEED_BAG_MOVES:29607
  - _Grass Status · DB — · AC 4 · Daily x2 · 6, 1 Target_
  - At the beginning of each of the target's turns, Leech Seed's target loses 1/10th of their full HP. Leech Seed's user then gains HP equal to the amount the target lost. Leech Seed lasts until the target faints or is returned to a Poke Ball. Grass Types and targets immune to Grass Attacks are immune to Leech Seed

- 🟡 **Light Screen** — `partial` · P2 (enc) · themes: typing · engine: blessing · code: SAGE_BLESSINGS:32030, blessingIcon:40704
  - _Psychic Status · DB — · AC — · Scene · Blessing_
  - Blessing - Any user affected by Light Screen may activate it when receiving Special Damage to resist the Damage one step. Light Screen may be activated 2 times, and then disappears.

- 🟡 **Reflect** — `partial` · P2 (enc, pc) · themes: typing · engine: blessing · code: reflectTypeCard:2807, SAGE_BLESSINGS:32029, blessingIcon:40704
  - _Psychic Status · DB — · AC — · Scene · Blessing_
  - Blessing - Any user affected by Reflect may activate it when receiving Physical Damage to resist the Damage one step. Reflect may be activated 2 times, and then disappears.

- 🔴 **Smack Down** — `todo` · P2 (enc, pc) · themes: typing
  - _Rock Physical · DB 5 · AC 2 · Scene x2 · 8, 1 Target_
  - The target is knocked down to ground level, and loses all Sky or Levitate Speeds for 3 turns. During this time, they may be hit by Ground-Type Moves even if normally immune.

- 🟡 **Withdraw** — `partial` · P2 (enc, pc) · themes: typing · engine: cs
  - _Water Status · DB — · AC — · At-Will · Self_
  - The user becomes Withdrawn. While Withdrawn, the user becomes immune to Critical Hits and gain 15 Damage Reduction. However, while Withdrawn, the user cannot Shift, and may only use self-targeting Moves. The user may stop being Withdrawn as a Shift Action.
    September Playtest: The user's Defense is raised 1 Combat Stage.

- 🟡 **Electro Drift** — `partial` · P3 · themes: typing · engine: target-rules
  - _Electric Special · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - After dealing damage, the user may Disengage 4 meters in a straight line. Whenever this Move deals Super-Effective Damage to a target, that target treats your Damage Roll as if it was increased by +10.

- 🔴 **Plasma Fists** — `todo` · P3 · themes: typing
  - _Electric Physical · DB 10 · AC 5 · Scene · Melee, 1 Target, Smite_
  - The Target's next damaging Normal Type Move instead becomes Electric Type.

- 🟡 **Tera Blast** — `partial` · P3 · themes: typing · engine: versatile · code: teraMoveType:19888
  - _Normal Versatile · DB 8 · AC 2 · EOT · 8, 1 Target, Versatile_
  - If the user is Terastalized, this move's Type becomes the user's Tera Type. 40

- 🔴 **Spite** — `todo` · P1 (enc, pc, player:Lázaro) · themes: control, status
  - _Ghost Status · DB — · AC — · Scene · 1 Target, Trigger_
  - Spite may be used as a Free Action that does not take up a Command whenever the user is hit by a Move. That Move becomes Disabled for the attacker.

- 🔴 **Disable** — `todo` · P2 (enc, pc) · themes: control, status
  - _Normal Status · DB — · AC — · Scene · 1 Target, Trigger_
  - Disable may be used as a Free Action that does not take up a Command whenever the user is hit by a Move. That Move becomes Disabled for the attacker.

- 🔴 **Imprison** — `todo` · P2 (enc) · themes: control
  - _Psychic Status · DB — · AC — · Scene x2 · 10, 1 Target_
  - The target is Locked for the rest of the Scene. A Locked target may not use any Moves the user knows. Imprison cannot miss.

- 🟡 **Mimic** — `partial` · P2 (enc, pc) · themes: control · code: typeModsControl:2693
  - _Normal Status · DB — · AC — · Scene · 6, 1 Target_
  - Choose a Move that the target has used during the encounter. For the remainder of the encounter, that Move replaces Mimic on the user's Move List. Mimic cannot miss.

- 🔴 **Eerie Spell** — `todo` · P3 · themes: control
  - _Psychic Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - The user may choose to Disable the target's last Move used. This effect may only be activated once per Scene.

- 🔴 **Heal Bell** — `todo` · P2 (enc) · themes: cure
  - _Normal Status · DB — · AC — · Scene · Burst 3, Sonic, Healing_
  - All targets are cured of any Persistent Status ailments.

- 🔴 **Aromatherapy** — `todo` · P3 · themes: cure
  - _Grass Status · DB — · AC — · Scene · Burst 1, Healing_
  - All allies in the burst are cured of one status condition of their choice.

- 🔴 **Psycho Shift** — `todo` · P3 · themes: cure
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The user is cured of a Status ailment and the target is given that Status ailment. Psycho Shift cannot miss. Psycho Shift can only be used if the user has a Status ailment and the target does not have the status ailment that is being transferred.

- 🟡 **Take Heart** — `partial` · P3 · themes: cure · engine: cs · code: CS_ALL_TARGET_RE:20557
  - _Psychic Status · DB — · AC — · Daily x2 · Self_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: cure
  - The user gains +1 CS in all its stats and cures all of its Status conditions.

- 🟡 **Stealth Rock** — `partial` · P2 (enc) · themes: hazard, heal, swap, typing, capture · code: HAZARDS:44796
  - _Rock Status · DB — · AC — · Scene · Field, Hazard_
  - Set 4 square meters of Stealth Rock hazards within 6 meters. If a foe moves within 2 meters of a space occupied by Rocks, move at most one Rock to the offender, then destroy the Rock. When that happens, the Stealth Rock causes a foe to lose a Tick of Hit Points. Stealth Rock is considered to be dealing damage; Apply Weakness and Resistance. Do not apply stats. A Pokemon who has been hit by a Stealth Rock Hazard cannot get hit by another in the same encounter until it is returned to a Poke Ball and then sent back out. *Grants Materializer

<a id="moves-02"></a>
## `moves-02` — Status afflictions (2/3)

P2 · 25 open of 25 · open

- 🟢 **Nuzzle** — `likely` · P2 (enc, pc) · themes: status · engine: status-fx, status-always
  - _Electric Physical · DB 2 · AC 2 · Scene · Melee, 1 Target_
  - Nuzzle Paralyzes the target.

- 🟢 **Outrage** — `likely` · P2 (enc) · themes: status, damage · engine: status-fx, status-always, status-self · code: RECKLESS_ERRATA_MOVES:20845, simStrike:37277
  - _Dragon Physical · DB 12 · AC 3 · Scene x2 · Melee, All Adjacent Foes, Smite_
  - Outrage makes the user becomes Enraged and Confused after damage is dealt.

- 🟢 **Poison Gas** — `likely` · P2 (enc, pc) · themes: status · engine: status-fx, status-always
  - _Poison Status · DB — · AC 6 · Scene · Burst 1 or Cone 2_
  - Poison Gas Poisons all legal targets.

- 🟢 **Poison Powder** — `likely` · P2 (enc, pc) · themes: status · engine: status-fx, status-always, powder · code: SEED_BAG_MOVES:29606
  - _Poison Status · DB — · AC 6 · EOT · 4, 1 Target, Powder_
  - The target is Poisoned.

- 🟡 **Sheer Cold** — `partial` · P2 (enc) · themes: status · engine: ohko
  - _Ice Status · DB — · AC — · Daily · 4, 1 Target, Execute_
  - Roll 1d100. This roll may not be modified in any way. If you roll X or lower, the target Faints. X is equal to 30 + The User's Level - The Target's Level. *Grants: Freezer

- 🟢 **Sleep Powder** — `likely` · P2 (enc, pc) · themes: status · engine: status-fx, status-always, powder · code: SEED_BAG_MOVES:29606
  - _Grass Status · DB — · AC 6 · Scene x2 · 4, 1 Target, Powder_
  - The target falls Asleep.

- 🟢 **Spider Web** — `likely` · P2 (enc) · themes: status · engine: status-fx, status-always
  - _Bug Status · DB — · AC — · Scene x2 · 5, 1 Target_
  - Spider Web cannot miss. The target is Stuck and Trapped. If the target is freed of the Stuck condition, it is freed of Trapped as well. *Grants Threaded

- 🟢 **Swagger** — `likely` · P2 (enc, pc) · themes: status, cs · engine: cs, status-fx, status-always · code: addMoveKey:4212
  - _Normal Status · DB — · AC 4 · EOT · 6, 1 Target, Social_
  - Raise the target's Attack by +2 CS. The target is Confused.

- 🟢 **Thrash** — `likely` · P2 (enc) · themes: status, damage · engine: status-fx, status-always, status-self · code: RECKLESS_ERRATA_MOVES:20846
  - _Normal Physical · DB 12 · AC 3 · Scene x2 · Melee, all adjacent foes, Smite_
  - After damage is dealt, the user becomes Enraged and Confused.

- 🟡 **Venom Drench** — `partial` · P2 (enc) · themes: status · engine: cs
  - _Poison Status · DB — · AC — · EOT · Cone 2_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: status
  - All Poisoned targets have their Attack, Special Attack, and Speed lowered by -1 CS. Venom Drench cannot miss.

- 🟡 **Venoshock** — `partial` · P2 (enc) · themes: status · engine: special:conditionalDB
  - _Poison Special · DB 7 · AC 2 · Scene x2 · 6, 1 Target_
  - If the target is Poisoned, Venoshock has a Damage Base of 13 (4d10+10 / 35) instead.

- 🟢 **Arcane Storm** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Normal Special · DB 6 · AC 2 · Scene x2 · WR, Blast 3_
  - All targets of Arcane Storm are Slowed and Vulnerable for 1 Full Round.
    Limitation: Ranged Weapons only

- 🔴 **Artillerolives** — `todo` · P3 · themes: status
  - _Grass Special · DB 5 · AC 3 · EOT · 4, 2 Targets; or 4, 1 Target (see text)_
  - Once per Scene, you may create Slick Hazards in two Blasts 3, anywhere within range. If used on only 1 target, this Move gains the Double Strike keyword, and if Slick Hazards are created, you may create them in a single Blast 5, centered on the target. Special: The user may ignore Slick Hazards and does not have to stop shifting or become Vulnerable from them.

- 🟢 **Astral Barrage** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Ghost Special · DB 12 · AC 2 · Daily · 8, Ranged Blast 2, Smite Friendly_
  - Legal targets hit by Astral Barrage are Slowed for one full round.

- 🟡 **Aurora Beam** — `partial` · P3 · themes: status · engine: cs, range
  - _Ice Special · DB 7 · AC 2 · At-Will · 6, 1 Target_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: status
  - Aurora Beam lowers the target's Attack 1 Combat Stage on 18+. *Grants: Freezer

- 🔴 **Baneful Bunker** — `todo` · P3 · themes: status
  - _Poison Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - If the user is hit by an attack, the user may use Baneful Bunker. The user is instead not hit by the Move. You do not take any damage nor are you affected by any of the Move's effects. In addition, if the triggering attack was Melee ranged, the attacker is Poisoned.

- 🔴 **Beak Blast** — `todo` · P3 · themes: status
  - _Flying Physical · DB 10 · AC 2 · Scene x2 · 6, 1 Target, Priority_
  - Beak Blast must be declared at the start of the round. If the user is hit by a Melee attack this round, the triggering attacker is Burned. At the end of the round, the user Shifts and attacks with Beak Blast.

- 🟡 **Bon Mot** — `partial` · P3 · themes: status · code: MANIPULATE_EFFECTS:25149
  - _None Status · DB — · AC 2 · Standard · 6, 1 Target_
  - Make a Guile Check, opposed by the target's Guile or Focus. If you win, the target is Enraged and cannot spend AP for one full round. The target does not gain a Save Check against this effect.

- 🔴 **Burning Bulwark** — `todo` · P3 · themes: status
  - _Fire Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - If the user is hit by an attack, the user may use this Move. The user is instead not hit by the attack. You do not take any damage nor are you affected by any of the attack's effects. In addition, if the triggering attack was Melee ranged, the attacker is Burned.

- 🟢 **Dark Void** — `likely` · P3 · themes: status, action · engine: status-fx, status-always
  - _Dark Status · DB — · AC 4 · EOT · Melee, 1 Target_
  - The target falls Asleep. Once per Scene, Dark Void may be used as if its range were "Burst 5, Friendly" instead.

- 🟢 **Dark Void [SM]** — `likely` · P3 · themes: status, action · engine: status-fx, status-always
  - _Dark Status · DB — · AC 10 · EOT · Melee, 1 Target_
  - The target falls Asleep. Once per Scene, Dark Void may be used as if its range were "Burst 5, Friendly" instead.

- 🟡 **Dirty Trick** — `partial` · P3 · themes: status · code: BATTLE_ACTIONS:23165
  - _None Status · DB — · AC 2 · Standard · Melee, 1 Target_
  - You may perform any of the following Dirty Tricks: Hinder, Blind, or Low Blow. You may use each trick only once each Scene per target. Input each Dirty Trick for details.

- 🟡 **Electric Terrain** — `partial` · P3 · themes: status, typing · code: TERRAIN_DEFS:1351
  - _Electric Status · DB — · AC — · Daily x2 · Field_
  - The field becomes Electrified for 5 rounds. While the field is Electrified, Pokemon and Trainers touching the ground are immune to Sleep, and Electric-Type attacks used by Pokemon and Trainers touching the ground gain a +10 Bonus to Damage Rolls.

- 🟢 **Fairy Lock** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Fairy Status · DB — · AC — · Scene · Burst 3, Friendly_
  - All legal targets become Trapped and Slowed while the user remains in the encounter. If the user is switched or knocked out, this effect ends.

- 🟢 **Flatter** — `likely` · P3 · themes: status, cs · engine: cs, status-fx, status-always
  - _Dark Status · DB — · AC 2 · At-Will · 6, 1 Target, Social_
  - Raise the target's Special Attack by +1 CS. Flatter Confuses the target.

<a id="moves-05"></a>
## `moves-05` — Combat Stages (2/3)

P2 · 8 open of 25 · open

- 🟡 **Punishment** — `partial` · P2 (enc) · themes: cs · engine: special:valueDB · code: specialMoveInfo:21320
  - _Dark Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - Punishment's Damage Base is raised by +1 for each Combat Stage the target has, to a maximum of DB 12.

- 🔴 **Spectral Thief** — `todo` · P2 (enc) · themes: cs
  - _Ghost Physical · DB 9 · AC 2 · Scene · Melee, 1 Target_
  - Before rolling damage, transfer all Combat Stages on the target to the user.

- ✅ **Spirit Break** — `auto` · P2 (enc) · themes: cs, stat · engine: cs
  - _Fairy Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The target's Special Attack stat is lowered 1 CS.

- 🟡 **Stored Power** — `partial` · P2 (pc) · themes: cs · engine: special:valueDB · code: specialMoveInfo:21314
  - _Psychic Special · DB 2 · AC 2 · EOT · 10, 1 Target_
  - For every Combat Stage the user has above 0, add +2 to Stored Power's Damage Base, up to a maximum of Damage Base 20.

- 🔴 **Topsy-Turvy** — `todo` · P2 (enc) · themes: cs
  - _Dark Status · DB — · AC 4 · EOT · 6, 1 Target_
  - The target's Combat Stages are inverted; +1 Stage becomes -1 Stage, -3 Stages becomes +3 Stages, etc.

- ✅ **Aqua Step** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Water Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Spirit Surge_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Speed 1 Combat Stage.

- ✅ **Armor Cannon** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Fire Special · DB 12 · AC 2 · Scene · Line 4, Reckless_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user's Defense and Special Defense are each lowered by -1 Combat Stage.

- ✅ **Aura Wheel** — `auto` · P3 · themes: cs · engine: cs
  - _Electric Physical · DB 11 · AC 2 · Scene x2 · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user's Speed is increased 1 CS. 
    Special: If the user is in Hangry Mode, Aura Wheel is Dark-Typed.

- 🔴 **Behemoth Bash** — `todo` · P3 · themes: cs
  - _Steel Physical · DB 10 · AC 2 · Scene x2 · Melee, 1 Target_
  - The DB of Behemoth Bash increases by +2 for each positive CS the target has, to a maximum of DB 20.

- 🔴 **Behemoth Blade** — `todo` · P3 · themes: cs
  - _Steel Physical · DB 10 · AC 2 · Scene x2 · Melee, 1 Target_
  - The DB of Behemoth Blade increases by +2 for each positive CS the target has, to a maximum of DB 20.

- ✅ **Belly Drum** — `auto` · P3 · themes: cs · engine: cs · code: CS_PATTERNS:20534
  - _Normal Status · DB — · AC — · Scene · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user gains +6 Attack CS and loses HP equal to 1/2 of their Max HP.

- ✅ **Brutal Beatdown** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Dark Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Reckless_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user's Defense and Special Defense are each lowered by -1 Combat Stage.

- ✅ **Coaching** — `auto` · P3 · themes: cs · engine: cs
  - _Fighting Status · DB — · AC — · EOT · Burst 1_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user and any allies in the Burst have their Attack and Defense raised by 1 CS.

- ✅ **Cosmic Power** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Psychic Status · DB — · AC — · EOT · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Defense 1 Combat Stage and raise the user's Special Defense 1 Combat Stage.

- ✅ **Cotton Guard** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Grass Status · DB — · AC — · Scene · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the user's Defense 3 Combat Stages.

- ✅ **Cotton Spore** — `auto` · P3 · themes: cs, skill · engine: cs, powder · code: SEED_BAG_MOVES:29607
  - _Grass Status · DB — · AC 2 · EOT · Burst 1, Powder_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All legal targets have their Speed lowered 2 Combat Stages.

- 🟡 **Darkest Lariat** — `partial` · P3 · themes: cs · engine: def-pierce · code: MOVE_DEF_PIERCE:42984
  - _Dark Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - This Move ignores the target's positive Defense Combat Stages and all Damage Reduction.

- ✅ **Decorate** — `auto` · P3 · themes: cs · engine: cs · code: CS_PATTERNS:20530
  - _Fairy Status · DB — · AC — · Scene · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The target gains +2 CS in both Attack and Special Attack.

- ✅ **Dragon Ascent** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Flying Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user's Defense and Special Defense are each lowered by -1 Combat Stage.

- 🔴 **Dynamax Cannon** — `todo` · P3 · themes: cs
  - _Dragon Special · DB 10 · AC 2 · Scene x2 · 6, 1 Target_
  - The DB of Dynamax Cannon increases by +2 for each positive CS the target has, to a maximum of DB 20.

- ✅ **Energy Sphere** — `auto` · P3 · themes: cs, skill · engine: cs, range
  - _Normal Special · DB 4 · AC 3 · EOT · Burst 1_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - You gain +1 Special Defense Combat Stage on 19+.

- ✅ **Feather Dance** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Flying Status · DB — · AC 2 · EOT · Burst 1, Friendly_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All legal targets have their Attack lowered 2 Combat Stages.

- ✅ **Fey Wild** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Fairy Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Reckless_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user's Defense and Special Defense are each lowered by -1 Combat Stage.

- ✅ **Flower Shield** — `auto` · P3 · themes: cs · engine: cs
  - _Fairy Status · DB — · AC — · Scene · Burst 2_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Raise the Defense of all Grass-Type legal targets by +2 CS.

- ✅ **Gear Up [SS]** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Steel Status · DB — · AC — · Scene x2 · Burst 4_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All targets that are Steel-Typed receive +1 Attack and Special Attack Combat Stages

<a id="moves-08"></a>
## `moves-08` — Movement, push & switching (2/3)

P2 · 25 open of 25 · open

- 🟡 **Skitter Smack** — `partial` · P2 (enc) · themes: position · engine: cs
  - _Bug Physical · DB 7 · AC 2 · EOT · Melee, 1 Target, Dash, Full Action_
  - The user Shifts up to its Overland Capability, ignoring Attacks of Opportunity, before attacking with Skitter Smack. On a hit, the target's Special Attack is lowered 1 CS.

- 🔴 **Slam** — `todo` · P2 (enc, pc) · themes: position
  - _Normal Physical · DB 8 · AC 6 · At-Will · Melee, 1 Target, Dash_
  - Slam may be used as a Free Action at the end of a Sprint Maneuver taken as a Standard Action, as long as the user Shifted at least 3 meters in a straight line towards the target. When used this way, Slam gains the Smite keyword.

- 🟡 **Splash** — `partial` · P2 (enc, pc) · themes: position, multiturn · code: FLIP_OUT_MOVES:23822, flipOutSplash:23843, flipOutBox:23894
  - _Normal Status · DB — · AC — · At-Will · Self_
  - Shift Action - The user may make a single Jump, adding +1 to their Long Jump and High Jump values, and gains +2 Evasion until the end of their next turn. *Grants +1 Long Jump

- 🟡 **Transform** — `partial` · P2 (enc) · themes: position, heal, multiturn, control, swap, status · code: openMoveRoll:22033, FEATURE_MODES:23475, attachPanZoom:47853
  - _Normal Status · DB — · AC — · At-Will · 10, 1 Target_
  - The user targets a Pokemon within 10 meters and assumes the form of the target. It gains all of the target's Moves, Abilities, and Capabilities; and copies its weight and height. Transform lasts until the user is switched out, Fainted, or until the end of the encounter. The user may choose to end the Transformation on its turn as a free action, regaining its previous Move List. The user's Stats do not change from using Transform. Transform cannot miss.

- 🔴 **Volt Switch** — `todo` · P2 (enc) · themes: position, status, capture
  - _Electric Special · DB 7 · AC 2 · At-Will · 5, 1 Target_
  - If Volt Switch successfully hits its target, the user deals damage and then immediately is returned to its Poke Ball in the same turn. A New Pokemon may immediately be sent out. Using Volt Switch lets a Trapped user be recalled

- 🟡 **Whirlwind** — `partial` · P2 (enc, pc) · themes: position · engine: weight
  - _Normal Status · DB — · AC 2 · Scene x2 · Line 6_
  - All targets are pushed X meters, where X is 8 minus their weight class. If the Line targets into a Smokescreen, the smoke is dispersed. All hazards in the Whirlwind are destroyed.

- 🟡 **Attack of Opportunity** — `partial` · P3 · themes: position, interrupt, swap, status · code: BATTLE_ACTIONS:23210
  - _None -- · DB — · AC — · Free · --_
  - You may make a Struggle Attack against the triggering foe as an Interrupt. You may use Attack of Opportunity only once per round. Attacks of Opportunity cannot be made by Sleeping, Flinched, or Paralyzed targets. Attacks of Opportunity can be triggered in multiple ways:
    »» An adjacent foe uses a Push, Grapple, Disarm, Trip, or Dirty Trick Maneuver that does not target you.
    »» An adjacent foe stands up.
    »» An adjacent foe uses a Ranged Attack that does not target someone adjacent to it.
    »» An adjacent foe uses a Standard Action to pick up or retrieve an item.
    »» An adjacent foe Shifts out of a Square adjacent to you.

- 🟡 **Bounce** — `partial` · P3 · themes: position · engine: range, range-status, status-fx, status-always · code: FLIP_OUT_MOVES:23822
  - _Flying Physical · DB 9 · AC 4 · Scene x2 · Melee, 1 Target, Dash, Full Action_
  - The user first Shifts, gaining a +1 Bonus to Movement Speed and to their Jump Capabilities. After the user Shifts, they may attack with Bounce. The target becomes Vulnerable, and is Paralyzed on 16+. Grants High Jump +1

- 🔴 **Brave Bird** — `todo` · P3 · themes: position
  - _Flying Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Push, Recoil 1/3_
  - The target is pushed back 2 meters.

- 🔴 **Clayball** — `todo` · P3 · themes: position
  - _Ground Physical · DB 4 · AC 2 · At-Will · 4, 1 Target, Dash, Push_
  - The user may push the target up to 2 meters away.

- 🔴 **Cone of Force** — `todo` · P3 · themes: position
  - _Normal Special · DB 6 · AC 2 · Scene x2 · Cone 2, Push_
  - Cone of Force Pushes all targets 2 meters, and lowers their Evasion by -2 for 1 full round..
    Limitation: Melee Weapons Only

- 🟡 **Disengage** — `partial` · P3 · themes: position · code: BATTLE_ACTIONS:23194
  - _None -- · DB — · AC — · Shift · --_
  - You may Shift 1 Meter. Shifting this way does not provoke an Attack of Opportunity.

- 🔴 **Flash Step** — `todo` · P3 · themes: position
  - _Psychic Physical · DB 6 · AC — · EOT · Melee, 1 Target_
  - This Move cannot miss. Before attacking, the user may Teleport 4 into a square adjacent to a foe as a Shift Action.

- 🔴 **Fly** — `todo` · P3 · themes: position, multiturn
  - _Flying Physical · DB 8 · AC 3 · At-Will · Melee, Dash, Set-Up_
  - Set-Up Effect: The user is moved up 25 meters into the air. Resolution Effect: The user may shift twice while in the air, using their overland or sky speed, and then comes down next to a legal target, and attacks with Fly. *Grants: Sky +3

- 🔴 **Follow Me** — `todo` · P3 · themes: position, multiturn, status
  - _Normal Status · DB — · AC — · Scene · Burst 5, Social_
  - Until the end of the user's next turn, all Foes must target the user when using a Move that targets their opponents. This effect ends if the user is Fainted or Switched out.

- 🟡 **Grapple** — `partial` · P3 · themes: position, status · engine: weight · code: BATTLE_ACTIONS:23175
  - _None Status · DB — · AC 4 · Standard · Melee, 1 Target_
  - You and the target each make opposed Combat or Athletics Checks. If you win, you and the target each become Grappled, and you gain Dominance in the Grapple.
    
    Pokemon and Trainers that are Grappled
    »» Are Vulnerable
    »» Cannot take Shift Actions, or any actions that would cause them to Shift.
    »» Gain a -6 penalty to Accuracy Rolls if targeting anyone outside of the Grapple.
    »» Additionally, Grapple has other effects on whether the target has or doesn't have Dominance.
    
    If a target begins their turn as a part of a Grapple but with no Dominance, they may choose to contest the Grapple as a Full Action. If they do, all participants make opposed Combat or Athletics Check. Whoever wins then may choo …

- 🔴 **Head Charge** — `todo` · P3 · themes: position
  - _Normal Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Push, Recoil 1/3_
  - The target is Pushed back 2 meters.

- 🟡 **Headlong Rush** — `partial` · P3 · themes: position · engine: cs, status-fx, status-always
  - _Ground Physical · DB 10 · AC 2 · Scene · Melee, 1 Target, Smite, Reckless_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: position
  - The user's Defense and Special Defense are each lowered by -1 Combat Stage.
    
    Headlong Rush may be used as a Free Action at the end of a Sprint Maneuver taken as a Standard Action, as long as the user Shifted at least 3 meters in a straight line towards the target. When used this way, Headlong Rush Trips the target on a hit.

- 🔴 **High Horsepower** — `todo` · P3 · themes: position
  - _Ground Physical · DB 10 · AC 3 · Scene x2 · Melee, 1 Target_
  - High Horsepower may be used as a Free Action at the end of a Sprint Maneuver taken as a Standard Action, as long as the user Shifted at least 3 meters in a straight line towards the target. When used this way, High Horsepower gains Smite.

- 🔴 **Hyperspace Hole** — `todo` · P3 · themes: position
  - _Psychic Special · DB 10 · AC 2 · Daily · Melee, 3 Targets_
  - Make and resolve of Hyperspace Hole's attacks separately. In between each attack, the user may Shift using their Teleporter capability, ending the Shift next to a legal target. Interrupts may not be triggered against Hyperspace Hole..

- 🔴 **Icebreaker** — `todo` · P3 · themes: position, interrupt
  - _Ice Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Recoil 1/3_
  - You may use this Move as if it had the Priority and Pass keywords in the first round after joining an encounter. Switching out resets this requirement. 38

- 🟡 **Intercept Melee** — `partial` · P3 · themes: position, interrupt, status · engine: range
  - _None Status · DB — · AC — · Full Action, Interrupt · --_
  - Trigger: An ally within Movement range is hit by an adjacent foe.
    Effect: You must make an Acrobatics or Athletics Check, with a DC equal to three times the number of meters they have to move to reach the triggering Ally; If you succeed, you Push the triggering Ally 1 Meter away from you, and Shift to occupy their space, and are hit by the triggering attack. On Failure to make the Check, the user still Shifts a number of meters equal a third of their check result.
    
    Note: If the target that was Intercepted was hit by an Area of Effect Move, and the 1 meter push does not remove them from the Area of Effect, the Intercept has no effect since they are still in the area of the attack - it would c …

- 🟡 **Intercept Ranged** — `partial` · P3 · themes: position, interrupt, status · engine: range
  - _None Status · DB — · AC — · Full Action, Interrupt · --_
  - Trigger: A Ranged X-Target attack passes within your Movement Range.
    Effect: Select a Square within your Movement Range that lies directly between the source of the attack and the target of the attack. Make an Acrobatics or Athletics Check; you may Shift a number of Meters equal to half the result towards the chosen square. If you succeed, you take the attack instead of its intended target. If you fail, you still Shift a number of Meters equal to half the result.
    
    Special: Pokemon must have a Loyalty of 3 or greater to make Intercept Melee and Intercept range Maneuvers and may only Intercept attacks against their Trainer. At Loyalty 6, Pokemon may Intercept for any Ally.
    
    Additional Rules
    »» …

- 🟡 **Jump Kick** — `partial` · P3 · themes: position, heal · code: RECKLESS_MOVES:20839, RECKLESS_ERRATA_MOVES:20844
  - _Fighting Physical · DB 10 · AC 3 · At-Will · Melee, Dash, 1 Target_
  - If Jump Kick misses, the user loses Hit Points equal to 1/4th of their Max Hit Points. A failure to hit due to a Move with the Shield keyword does not count as a miss. This cannot be used if Gravity is in effect.

- 🔴 **Last Resort** — `todo` · P3 · themes: position
  - _Normal Physical · DB 14 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - Last Resort can only be used after the user has performed 5 other different Moves in its Move List during a single fight, without being switched out.

<a id="moves-03"></a>
## `moves-03` — Status afflictions (3/3)

P3 · 28 open of 28 · open

- 🟡 **Flirt** — `partial` · P3 · themes: status · code: MANIPULATE_EFFECTS:25151
  - _None Status · DB — · AC 2 · Standard · 6, 1 Target_
  - Make a Charm Check, opposed by the target's Charm or Focus. If you win, the target is Infatuated with you for one full round. The target automatically fails their Save Check.

- 🟡 **Glaciate** — `partial` · P3 · themes: status, cs, skill · engine: cs, status-fx
  - _Ice Special · DB 7 · AC 3 · EOT · Burst 2_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: status
  - All Legal Targets have their Speed lowered 1 Combat Stage. On an Even-Numbered Roll, all Legal Targets on the ground are Slowed.

- 🔴 **Glaive Rush** — `todo` · P3 · themes: status
  - _Dragon Physical · DB 12 · AC 2 · Scene x2 · Melee, Pass, Smite, Reckless_
  - On hit, you may choose to become Vulnerable for 1 full round. If you do, this attack is one step more effective. Additionally, the next successful damaging attack against you while Vulnerable this way is automatically a Critical Hit.

- 🔴 **Hinder** — `todo` · P3 · themes: status
  - _None Status · DB — · AC 2 · Standard · Melee, 1 Target_
  - You and the target make Opposed Athletics Checks. If you win, the target is Slowed and takes a -2 penalty to all Skill Checks for one full round.

- 🟢 **Maul** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Normal Physical · DB 5 · AC 2 · Scene x2 · 1 Target, Melee_
  - The target is Flinched.
    Limitation: Melee Weapons Only

- 🟡 **Mortal Spin** — `partial` · P3 · themes: cure · engine: status-fx, status-always
  - _Poison Special · DB 5 · AC 2 · Scene · Burst 1, Spirit Surge_
  - This Move destroys all Hazards within a Burst 5 that were placed by foes, removes Leech Seeds, and removes the user's Trapped or Stuck conditions. All targets that are hit are Poisoned.

- 🟢 **Nightmare** — `likely` · P3 · themes: status · engine: status-fx, status-always · code: AURA_DEFS:18248, LEGENDARY_AURAS:18396
  - _Ghost Status · DB — · AC 2 · Scene x2 · Melee, 1 Target_
  - Nightmare can only hit Legal Targets that are Asleep. The target gains Bad Sleep.

- 🟡 **Octolock** — `partial` · P3 · themes: status · engine: cs
  - _Fighting Status · DB — · AC 2 · Scene · Melee, 1 Target_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: status
  - The user initiates a Grapple Maneuver with the target, which automatically hits. If successful, until the user no longer has Dominance in the grapple, the target is Trapped and loses 1 CS in Defense and Special Defense at the end of each of their turns.

- 🟢 **Petal Dance** — `likely` · P3 · themes: status, damage · engine: status-fx, status-always, status-self · code: RECKLESS_ERRATA_MOVES:20845
  - _Grass Special · DB 12 · AC 3 · Scene x2 · Melee, All Adjacent Foes, Smite_
  - After damage is dealt, the user becomes Enraged and Confused.

- 🟡 **Rapid Spin [SS]** — `partial` · P3 · themes: status, cure · engine: cs · code: CS_PATTERNS:20500
  - _Normal Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Spirit Surge_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: status, cure
  - Rapid Spin destroys all Hazards within 5 meters, removes Leech Seeds, and removes the user's Trapped or Stuck status. If Rapid Spin hits, the user's speed raises 1 CS.

- 🔴 **Refresh** — `todo` · P3 · themes: status, cure
  - _Normal Status · DB — · AC — · Scene x2 · Self_
  - The user is cured of all Poison, Burns, and Paralysis.

- 🔴 **Revival Blessing** — `todo` · P3 · themes: status, capture
  - _Normal Status · DB — · AC — · Daily · None_
  - An ally that Fainted this Scene may use a Move as a Free Action as if they were not Fainted, originating from a square adjacent to the user. The chosen ally may be a Pokemon in a Poke Ball.

- 🟢 **Sacred Fire** — `likely` · P3 · themes: status · engine: status-fx
  - _Fire Physical · DB 10 · AC 3 · EOT · 6, 1 Target_
  - Sacred Fire Burns the target on Even-Numbered Rolls.

- 🔴 **Sleep Talk** — `todo` · P3 · themes: status
  - _Normal Status · DB — · AC — · Scene · Self_
  - Select another of the user's Moves at random; this turn, the user may Shift and use that Move despite being Asleep. Sleep Talk can be only be used by Sleeping targets.

- 🟡 **Smelling Salts** — `partial` · P3 · themes: status, cure · engine: special:conditionalDB
  - _Normal Physical · DB 7 · AC 2 · Scene x2 · Melee, 1 Target_
  - If the target is Paralyzed, Smelling Salt's Damage Base is doubled to 14 (4d10+15 / 40), and cures the target of Paralysis.

- 🟢 **Snap Trap** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Grass Physical · DB 4 · AC 2 · Scene x2 · Melee, 1 Target_
  - The target is trapped in a Vortex. The DC to escape the Vortex is increased by 3.

- 🟢 **Spirit Shackle** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Ghost Physical · DB 8 · AC 2 · EOT · 8, 1 Target_
  - The Target is Trapped for 2 rounds.

- 🟢 **Spore** — `likely` · P3 · themes: status · engine: status-fx, status-always, powder · code: SEED_BAG_MOVES:29607
  - _Grass Status · DB — · AC — · Scene · 4, 1 Target, Powder_
  - The target falls Asleep.

- 🟢 **Swagger [SM]** — `likely` · P3 · themes: status, cs · engine: cs, status-fx, status-always
  - _Normal Status · DB — · AC 5 · EOT · 6, 1 Target, Social_
  - Raise the target's Attack by +2 CS. The target is Confused.

- 🟢 **Syrup Bomb** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Grass Special · DB 6 · AC 5 · At-Will · 6, 1 Target, Smite_
  - The target and all foes adjacent to them are Slowed for 1 full Round. If an affected foe was already Slowed or Stuck, it becomes Stuck instead.

- 🟢 **Teeter Dance** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Normal Status · DB — · AC 2 · Scene · Burst 1_
  - All legal targets are Confused.

- 🟢 **Thousand Waves** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Ground Physical · DB 9 · AC 2 · Scene · Burst 1, Groundsource_
  - Legal Targets are Trapped for 2 Turns.

- 🟢 **Thunder Cage** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Electric Special · DB 8 · AC 4 · Daily x2 · 8, Ranged Blast 2, Spirit Surge_
  - The targets are trapped in a Vortex. The DC to escape the Vortex is increased by 3.

- 🟡 **Thunder Wave [SM]** — `partial` · P3 · themes: typing · engine: status-fx, status-always
  - _Electric Status · DB — · AC 4 · Scene x2 · 6, 1 Target_
  - Thunder Wave Paralyzes the target. Pokemon immune to Electric Attacks are immune to Thunder Wave's effects.

- 🟢 **Titanic Slam** — `likely` · P3 · themes: status · engine: status-fx
  - _Normal Physical · DB 11 · AC 3 · Scene x2 · 1 Target, Melee_
  - On Even-Numbered Rolls, the target is Slowed for one full round.
    Limitation: Melee Weapons Only

- 🟢 **Toxic** — `likely` · P3 · themes: status · engine: status-fx, status-always
  - _Poison Status · DB — · AC 4 · Scene x2 · 4, 1 Target_
  - The target is Badly Poisoned. If the user is Poison Type, Toxic cannot miss.

- 🟡 **Trip** — `partial` · P3 · themes: status · code: BATTLE_ACTIONS:23173
  - _None Status · DB — · AC 6 · Standard · Melee, 1 Target_
  - You and the target each make opposed Combat or Acrobatics Checks. If you win, the target is knocked over and Tripped.

- 🟡 **Wake-Up Slap** — `partial` · P3 · themes: status, cure · engine: special:conditionalDB
  - _Fighting Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target_
  - If the target is Asleep, Wake-Up Slap has a Damage Base of 10 (3d8+10 / 24) instead, and cures the target of Sleep.

<a id="moves-06"></a>
## `moves-06` — Combat Stages (3/3)

P3 · 7 open of 19 · open

- ✅ **Glint** — `auto` · P3 · themes: cs, skill · engine: cs · code: CS_PATTERNS:20501
  - _Steel Special · DB 5 · AC 2 · At-Will · 5, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The target cannot make Attacks of Opportunity for 1 full round and their Attack is lowered by -1 Combat Stage.

- 🔴 **Guard Swap** — `todo` · P3 · themes: cs
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The user and the target trade Combat Stage values for the Defense Stat, and then for the Special Defense Stat.

- ✅ **Hammer Arm** — `auto` · P3 · themes: cs · engine: cs · code: CS_PATTERNS:20522, IRON_FIST_MOVES:20731, RECKLESS_ERRATA_MOVES:20845
  - _Fighting Physical · DB 10 · AC 3 · EOT · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user lowers their Speed by -1 CS.

- ✅ **Howl [SS]** — `auto` · P3 · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · EOT · Burst 1_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user and all allies in the Burst have their Attack CS raised by 1.

- ✅ **King's Shield** — `auto` · P3 · themes: cs, damage · engine: cs
  - _Steel Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - If the user is hit by an attack, the user may use King's Shield. The user is instead not hit by the Move. You do not take any damage nor are you affected by any of the Move's effects. In addition, if the triggering attack was Melee ranged, the attacker's Attack is lowered by -2 CS.

- ✅ **Leaf Storm** — `auto` · P3 · themes: cs, damage, skill · engine: cs · code: ROTOM_POLTERGEIST:19851, RECKLESS_ERRATA_MOVES:20845
  - _Grass Special · DB 13 · AC 4 · Scene · 8, Ranged Blast 3, Smite_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Lower the user's Special Attack 2 Combat Stages after damage.

- 🔴 **Magnetic Flux [SS]** — `todo` · P3 · themes: cs
  - _Electric Status · DB — · AC — · Scene x2 · Burst 4_
  - Choose +1 or -1. All targets that are Electric-Type or have the Magnetic Capability receive that many Defense and Special Defense Combat Stages.

- 🔴 **Mystical Power** — `todo` · P3 · themes: cs
  - _Psychic Special · DB 7 · AC 4 · Scene x2 · 6, 2 Targets, Spirit Surge_
  - The user receives +1 Combat Stage in their highest non-HP stat.

- 🟡 **Nihil Light** — `partial` · P3 · themes: cs · engine: def-pierce, target-rules · code: MEGA_MOVE_SWAPS:1825, MOVE_DEF_PIERCE:42988
  - _Dragon Special · DB 20 · AC 2 · Daily · Close Blast 3, Smite_
  - Nihil Light ignores the targets' Combat Stage changes to Defense and Special Defense, in both directions. Fairy-Type targets are not immune to it: they take it as a neutral hit, and a dual-Type target with Fairy counts only its OTHER Type for effectiveness.
    Nihil Light is exclusive to Mega Zygarde. A Complete Forme Zygarde that knows Core Enforcer has that Move replaced by Nihil Light for as long as it stays Mega Evolved.

- ✅ **Noble Roar** — `auto` · P3 · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · EOT · Burst 1, Sonic, Friendly, Social_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - Noble Roar lowers all legal targets' Attack and Special Attack by +1 CS.

- ✅ **Obstruct** — `auto` · P3 · themes: cs, damage, skill · engine: cs
  - _Dark Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - If the user is hit by a Move, the user may use Obstruct. The user is instead not hit by the Move. You do not take any damage nor are you affected by any of the Move's effects. In addition, if the triggering attack was Melee ranged, the attacker's Defense is lowered by 2 Combat Stages.

- 🔴 **Power Swap** — `todo` · P3 · themes: cs
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The user and the target trade Combat Stage values for the Attack Stat, and then for the Special Attack Stat.

- ✅ **Resonance Beam** — `auto` · P3 · themes: cs, skill · engine: cs, range
  - _Normal Special · DB 4 · AC 3 · EOT · Line 4_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All targets have their Special Defense lowered by 1 Combat Stage on 20+. This Effect Range is extended by +1 for each foe targeted by this Move.

- ✅ **Seed Flare** — `auto` · P3 · themes: cs, skill · engine: cs
  - _Grass Special · DB 12 · AC 5 · Scene · 6, Ranged Blast 3_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All Legal Targets have their Special Defense lowered 1 Combat Stage.

- ✅ **Shelter** — `auto` · P3 · themes: cs, damage · engine: cs
  - _Steel Status · DB — · AC — · Scene · Self_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - The user gains +1 CS in Defense and Special Defense, and +2 Evasion.

- 🔴 **Spicy Extract** — `todo` · P3 · themes: cs
  - _Grass Status · DB — · AC — · Scene x2 · Self or 4, 1 Target_
  - Choose either Attack or Special Attack. Raise the chosen Stat of the user or an ally within range by +3 Combat Stages. You cannot make the same choice twice in the same Scene.

- ✅ **Tearful Look** — `auto` · P3 · themes: cs · engine: cs · code: CS_PATTERNS:20535
  - _Normal Status · DB — · AC 2 · EOT · Burst 1, Social, Friendly_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All legal targets lose -1 Attack and Special Attack CS each.

- ✅ **Thunderous Kick** — `auto` · P3 · themes: cs, action, skill · engine: cs
  - _Fighting Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - note: found-01: Combat Stage clause parsed by moveCSEffects; ⬆ Apply on the roll
  - All legal targets hit lose 1 Defense Combat Stage. Once per Scene, Thunderous Kick may instead be used as an Electric-Type Move.

- 🔴 **Torch Song** — `todo` · P3 · themes: cs
  - _Fire Special · DB 8 · AC 2 · EOT · 5, 1 Target, Sonic_
  - Raise the Special Attack of either the user or an ally within 3 meters by +1 Combat Stage.

<a id="moves-09"></a>
## `moves-09` — Movement, push & switching (3/3)

P3 · 19 open of 19 · open

- 🔴 **Mudslide** — `todo` · P3 · themes: position
  - _Ground Special · DB 8 · AC 4 · Scene x2 · 6, Ranged Blast 3, Groundsource, Push_
  - Choose a direction. All legal targets are Pushed 2 meters in that direction. Ice Moves

- 🟡 **No Retreat** — `partial` · P3 · themes: position, multiturn, status · engine: cs · code: CS_ALL_TARGET_RE:20557
  - _Fighting Status · DB — · AC — · Scene · Self_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: position, multiturn, status
  - The user gains +1 CS in each stat. In addition, the user may not be recalled or switched out until the end of the Scene, and counts as Slowed for the purposes of any movement that would end further away from the nearest enemy than the user started.

- 🟡 **Parting Shot** — `partial` · P3 · themes: position, status · engine: cs
  - _Dark Status · DB — · AC 2 · At-Will · 6, 1 Target, Social_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: position, status
  - If Parting Shot successfully hits, the target's Attack and Special Attack stats are lowered by one CS and the user is immediately recalled in the same turn. A new Pokemon may immediately be sent out. using Parting Shot lets a Trapped user be recalled.

- 🔴 **Power Shift** — `todo` · P3 · themes: position, status
  - _Normal Status · DB — · AC — · Scene · Self_
  - The user's Attack stat and Defense stat are switched and the user's Special Attack stat and Special Defense stat are switched. These changes last for the remainder of the scene, or until the user is switched out or Fainted.

- 🔴 **Power Trick** — `todo` · P3 · themes: position, status
  - _Psychic Status · DB — · AC — · Scene · Self_
  - The user's Attack stat and Defense stat are switched for the remainder of the encounter, or until the user is switched out or Fainted.

- 🔴 **Psy Kick** — `todo` · P3 · themes: position
  - _Psychic Physical · DB 4 · AC 2 · At-Will · 4, 1 Target, Dash, Push_
  - The user may push the target up to 2 meters.

- 🔴 **Psychic Noise** — `todo` · P3 · themes: position, heal
  - _Psychic Special · DB 8 · AC 2 · Scene x2 · Burst 1, Sonic_
  - Choose a legal target. The chosen target may not gain Hit Points or Temporary Hit Points from any source, until it is switched out. This counts as a Volatile Affliction.

- 🟡 **Push** — `partial` · P3 · themes: position · code: openTrainerAttack:9154, BATTLE_ACTIONS:23171, enemyTokenRows:47286
  - _None Status · DB — · AC 4 · Standard · Melee, 1 Target_
  - You and the target each make opposed Combat or Athletics Checks. If you win, the target is Pushed back 1 Meter directly away from you. If you have Movement remaining this round, you may then Move into the newly occupied Space, and Push the target again. This continues until you choose to stop, or have no Movement remaining for the round. Push may only be used against a target whose weight is no heavier than your Heavy Lifting rating.

- 🟡 **Rage Powder** — `partial` · P3 · themes: position · engine: status-fx, status-always
  - _Bug Status · DB — · AC — · Scene x2 · Burst 1 or Line 6; Powder_
  - All legal targets hit by Rage Powder are Enraged. While enraged, they must shift to target the user when using a Move or Attack if the user is within reach. If the user is Fainted or Switched out, all legal targets hit by Rage Powder are no longer Enraged.

- 🟡 **Ruination** — `partial` · P3 · themes: position · engine: status-fx, status-always
  - _Dark Status · DB — · AC 4 · Scene x2 · 4, 1 Target_
  - The target becomes Cursed and Vulnerable until it is switched out.

- 🔴 **Shadow Force** — `todo` · P3 · themes: position, interrupt, multiturn, swap
  - _Ghost Physical · DB 12 · AC 2 · Daily x3 · Melee, 1 Target, Set-Up_
  - Set-Up Effect: The user is removed from the field, and their turn ends. Resolution Effect: Shadow Force's user appears adjacent to any legal target on the field, ignoring Movement Capabilities, and then uses Shadow Force's attack. Shadow Force cannot be avoided by Moves with the Shield Keyword, the Dodge Ability, or similar effects, and Intercepts may not be attempted in response.

- 🔴 **Skill Swap** — `todo` · P3 · themes: position, swap, status
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The user loses one of their Abilities, selected by the user, and gains one the target's Abilities, selected at random, for the remainder of encounter. The target loses the copied Ability, and gains the user's lost Ability. This effect ends if either the target or the user is Switched out or Fainted, but only for that Pokemon or Trainer.

- 🟡 **Skull Bash** — `partial` · P3 · themes: position, multiturn · engine: cs
  - _Normal Physical · DB 13 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Push, Set-Up_
  - Set-Up Effect: Raise the user's Defense by +1 CS. Resolution Effect: The user may attack with Skull Bash. The target is pushed 3 meters.

- 🟡 **Spin Out** — `partial` · P3 · themes: position · engine: cs
  - _Steel Physical · DB 10 · AC 2 · EOT · Burst 1_
  - This Move may be used as a Free Action at the end of a Sprint Maneuver taken as a Standard Action, as long as the user Shifted at least 3 meters in a straight line and ended in range of a target. When used this way, this Move gains the Smite keyword, and lowers the user's Speed by -2 Combat Stages.

- 🔴 **Strength** — `todo` · P3 · themes: position
  - _Normal Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Push_
  - You may immediately initiate a Push Maneuver as a Free Action. The Maneuver automatically hits, but you must still make the Opposed Roll. *Grants +1 Power

- 🔴 **Tackle [SM]** — `todo` · P3 · themes: position
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Dash, Push_
  - The target is Pushed 2 Meters.

- 🟡 **Telekinesis** — `partial` · P3 · themes: position, swap, status · engine: range
  - _Psychic Status · DB — · AC — · Scene x2 · 4, 1 Target_
  - The target becomes Lifted. While Lifted, they gain the Levitate Ability, are Slowed, and lose all Movement Capabilities except for the Levitate 4 granted by Levitate (reduced to 2 by the Slow condition). While Lifted, the user may not apply any Evasion bonuses to determine whether they are hit by Moves or not. The Lifted target may use a Shift Action to roll 1d20; on a result of 16+, they stop being Lifted. *Grants Telekinetic

- 🔴 **U-Turn** — `todo` · P3 · themes: position, status, capture
  - _Bug Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - The user deals damage and then is immediately recalled to its Poke Ball in the same turn. A New Pokemon may immediately be sent out. Using U-Turn lets a Trapped user be recalled.

- 🟡 **Wicked Blow** — `partial` · P3 · themes: position · engine: range, range-status, status-fx, weight, always-crit
  - _Dark Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Push_
  - If Wicked Blow hits, it is a Critical Hit. The target is Pushed 6 meters minus their Weight Class. On a roll of 15+, the target is also Tripped.

<a id="moves-11"></a>
## `moves-11` — Healing, drain, recoil & HP (2/3)

P3 · 25 open of 25 · open

- 🟡 **Endeavor** — `partial` · P3 · themes: heal · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21140
  - _Normal Physical · DB — · AC 2 · Scene · Melee, 1 Target, Dash_
  - The target loses a Tick of Hit Points for each Injury the user has.

- 🔴 **Fillet Away** — `todo` · P3 · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Self_
  - The next successful damaging Psychic attack made by the user is automatically a Critical Hit. The user may sacrifice three Ticks of Hit Points. If they do so, choose one: » Fillet Away becomes a Swift Action. » An adjacent Ally gains 3 Ticks of Temporary Hit Points. 39

- 🟡 **Final Gambit** — `partial` · P3 · themes: heal · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21141
  - _Fighting Special · DB — · AC 2 · Scene · Melee, 1 Target_
  - Final Gambit lowers the user to 0 Hit Points and causes them to Faint. Final Gambit then deals 1 point of damage to the target for every Hit Point lost by the user. Final Gambit does not cause items to activate.

- 🟡 **Focus Punch** — `partial` · P3 · themes: heal, interrupt · code: IRON_FIST_MOVES:20731
  - _Fighting Physical · DB 15 · AC 2 · Scene x2 · Melee, 1 Target, Priority (Limited), Aura_
  - Use of Focus Punch must be declared as a Priority (Limited) action at the beginning of the round. Nothing happens at this time. At the end of the round, if the target hasn't been hit by an attack dealing damage equal to at least 25% of the user's Maximum Hit Points, the user may Shift and use Focus Punch. Focus Punch's Frequency is not expended if it is negated by an attack.

- 🟡 **Grassy Terrain** — `partial` · P3 · themes: heal · code: TERRAIN_DEFS:1358
  - _Grass Status · DB — · AC — · Daily x2 · Field_
  - The area becomes Grassy for 5 rounds. While Grassy, all Pokemon and Trainers standing on the ground recover 1/10th of their maximum Hit Points at the start of every turn, and Grass-Type attacks performed by grounded Pokemon and Trainers gain a +10 bonus to Damage Rolls.

- 🟡 **Hard Press** — `partial` · P3 · themes: heal · engine: special:conditionalDB
  - _Steel Physical · DB 6 · AC 2 · Scene x2 · Melee, 1 Target_
  - If the target's Hit Points are above 50%, this Move's Damage Base is doubled to Damage Base 12 (3d12+10 / 30).

- 🔴 **Heal Order** — `todo` · P3 · themes: heal
  - _Bug Status · DB — · AC — · Daily x2 · Self_
  - The user regains HP equal to half of its full HP.

- 🔴 **Hold Hands** — `todo` · P3 · themes: heal
  - _Normal Status · DB — · AC — · Scene x2 · Melee, 1 Target_
  - Both the user and the target become Cheered. They may give up the Cheered condition when making a Save Check to roll twice and take the best result.
    September Playtest: The target and the user each gain three Ticks of Temporary Hit Points, and a +2 Bonus to Save Checks for 1 full round.

- 🔴 **Jungle Healing** — `todo` · P3 · themes: heal, cure
  - _Grass Status · DB — · AC — · Daily x2 · Burst 1_
  - The user and any allies in the burst regain Hit Points equal to 1/4 of their Maximum Hit Point Value, and are cured of any Persistent or Volatile Status Conditions.

- 🔴 **Life Dew** — `todo` · P3 · themes: heal
  - _Water Status · DB — · AC — · Daily x2 · Burst 1, Healing_
  - The user and all allies in the burst regain Hit Points equal to 1/4 of their Maximum Hit Points.

- 🔴 **Lunar Blessing** — `todo` · P3 · themes: heal, cure
  - _Psychic Status · DB — · AC — · Daily · Self_
  - The user regains hit points equal to 50% of its Hit Point total, cures all of its Status conditions, and gains +2 Evasion.

- 🟡 **Lunar Dance** — `partial` · P3 · themes: heal, cure, capture · code: SACRIFICE_HEAL_MOVES:5219
  - _Psychic Status · DB — · AC — · Daily · 8.0_
  - The user immediately Faints, lowering its Hit Points to 0. The user takes no Injuries from Hit Point Markers when using Lunar Dance. The target is immediately cured of up to 3 injuries, healed to their Maximum Hit Points, and has the Frequency of all Moves restored. Lunar Dance may target a Pokemon in a Poke Ball. Lunar Dance does not restore the Frequency of Healing Wish or Lunar Dance. Injuries healed through Lunar Dance count toward the total number of Injuries that can be healed each day, and this healing is limited by the same.

- 🟡 **Malignant Chain** — `partial` · P3 · themes: heal · engine: status-fx, status-always
  - _Poison Special · DB 10 · AC 2 · Scene x2 · 6, 1 Target_
  - The target is Poisoned. Then, choose an ally. That ally and the target become Linked to each other. Whenever the Linked ally takes damage, the Linked foe loses a Tick of Hit Points. This effect ends when the user is Fainted or the Scene ends.

- 🔴 **Milk Drink** — `todo` · P3 · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Melee, 1 Target_
  - The target regains HP equal to half of its full HP. The user may target themselves with Milk Drink.

- 🔴 **Mind Blown** — `todo` · P3 · themes: heal
  - _Fire Special · DB 15 · AC 2 · Daily · 6, Ranged Blast 3, Smite_
  - The user's Hit Points are reduced by 50% of their full Hit Point Value. This hit point loss cannot be prevented or reduced in any way.

- 🟡 **Occult Razor** — `partial` · P3 · themes: heal · engine: status-fx, status-always
  - _Psychic Physical · DB 11 · AC 5 · Scene · Melee, 1 Target, Slice_
  - This Move automatically Critically Hits targets at or below half of their Max Hit Points. After dealing damage, the target becomes Suppressed for 1 full round.

- 🔴 **Perish Song** — `todo` · P3 · themes: heal, capture
  - _Normal Status · DB — · AC — · Daily · Burst 15, Sonic_
  - Perish Song cannot miss. All targets, including the user, receive a Perish Count of 3. At the beginning of each of the target's turns, their Perish count is lowered by 1. Once a Perish Count reaches 0, set the Pokemon's Hit Points to 0. A Perish Count disappears if a target returns to their Poke Ball, Takes a Breather, or is knocked out. Perish Song never causes Massive Damage.

- 🔴 **Pollen Puff** — `todo` · P3 · themes: heal
  - _Bug Special · DB 9 · AC 2 · EOT · 6, 1 Target_
  - Once per Scene, Pollen Puff may instead be used on an ally; when used this way, the target recovers 1/2 of their maximum Hit Points and the Move has the Healing keyword.

- 🟡 **Poltergeist** — `partial` · P3 · themes: heal, swap · code: derivedMonMoves:19793, poltergeistGrant:19854
  - _Ghost Physical · DB 11 · AC 4 · Scene · 8, Ranged Blast 3, Smite_
  - If a target is holding a Held Item or Main or OffHand item, they must either drop it immediately or lose a Tick of Hit Points. This may only cause a target to lose at most one Tick of Hit Points, no matter how many items they were holding. On each of the target's subsequent turns, if it is still holding the item(s) in question it loses a Tick of Hit Points.

- 🔴 **Purify** — `todo` · P3 · themes: heal, cure
  - _Poison Status · DB — · AC — · Scene · Melee, 1 Target_
  - The target is cured of all Permanent and Volatile Statuses. For every status removed, the user recovers a Tick of Hit Points.

- 🟡 **Rending Spell** — `partial` · P3 · themes: heal · engine: range
  - _Normal Special · DB 3 · AC 2 · EOT · WR, 1 Target_
  - The target loses a Tick of Hit Points on 16+.

- 🟡 **Rest** — `partial` · P3 · themes: heal, cure · engine: status-fx, status-always, status-self · code: trainerXpCard:9805, cardApply:14940, cardFxText:15040, moveCSEffects:20612, restUpsertKeepalive:41085
  - _Psychic Status · DB — · AC — · Scene · Self, Healing_
  - The user is set to their full Hit Point value. The user is cured of any Status ailments. Then, the user falls Asleep. The user cannot make Sleep Checks at the beginning of their turn. They are cured of the Sleep at the end of their turn in 2 rounds.

- 🔴 **Salt Cure** — `todo` · P3 · themes: heal, cure
  - _Rock Physical · DB 4 · AC 2 · EOT · 4, 1 Target_
  - The target becomes Lightly Salted as a Volatile Affliction. While Lightly Salted, they lose 1 Tick of HP at the beginning of each of their turns. Water and Steel-Type Pokemon hit by Salt Cure lose 2 Ticks of HP instead.

- 🔴 **Soft-Boiled** — `todo` · P3 · themes: heal
  - _Normal Status · DB — · AC — · Daily x2 · Melee, 1 Target_
  - The target regains Hit Points equal to half of its full Hit Points. The user may target themselves with Soft-Boiled.

- 🔴 **Spiky Shield** — `todo` · P3 · themes: heal
  - _Grass Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - If the user is hit by an attack, the user may use Spiky Shield. The user is instead not hit by the Move. You do not take any damage nor are you affected by any of the Move's effects. In addition, if the triggering attack was Melee-ranged, the attacker loses Hit Points equal to 1/10th of their Max Hit Points.

<a id="moves-12"></a>
## `moves-12` — Healing, drain, recoil & HP (3/3)

P3 · 8 open of 8 · open

- 🔴 **Steel Beam** — `todo` · P3 · themes: heal
  - _Steel Special · DB 14 · AC 3 · Daily · Cone 3, Smite_
  - The user's Hit Points are reduced by 50% of their full Hit Point value. This Hit Point loss cannot be prevented or reduced in any way.

- 🔴 **Strength Sap** — `todo` · P3 · themes: heal, cs
  - _Grass Status · DB — · AC 2 · Daily x2 · Melee, 1 Target_
  - The user gains Hit Points equal to the higher of the target's Attack or Special Attack; the target then loses -1 CS in that Stat.

- 🔴 **Supercell Slam** — `todo` · P3 · themes: heal
  - _Electric Physical · DB 10 · AC 3 · At-Will · Melee, Dash, Pass_
  - If this Move misses, the user loses Hit Points equal to 1/4th of their Max Hit Points. A failure to hit due to a Move with the Shield keyword does not count as a miss. This Move cannot be used if Gravity is in effect.

- 🟡 **Terrorize** — `partial` · P3 · themes: heal · code: FOE_FX:24818, MANIPULATE_EFFECTS:25153
  - _None Status · DB — · AC 2 · Standard · 6, 1 Target_
  - Make an Intimidate Check, opposed by the target's Intimidate or Focus. If you win, the target loses all Temporary Hit Points and can only use At-Will Frequency Moves for one full round.

- 🟡 **Toxic Threads** — `partial` · P3 · themes: heal · engine: cs, status-fx, status-always · code: CS_PATTERNS:20534
  - _Poison Status · DB — · AC 2 · Scene x2 · 6, 1 Target_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: heal, status
  - The target is Poisoned and receives -1 Speed Combat Stage. If the target is already Poisoned, they instead lose a Tick of Hit Points and receive -2 Speed Combat Stages.

- 🟡 **Wither** — `partial` · P3 · themes: heal · engine: range, range-status, status-fx
  - _Dark Special · DB 11 · AC 7 · Scene x2 · 6, 1 Target, Smite, Spirit Surge_
  - Suppresses all legal targets on 15+. Any foes adjacent to the target lose 10 Hit Points.

- 🟡 **Wounding Strike** — `partial` · P3 · themes: heal · code: LIVING_WEAPON_FORMS:7547
  - _Normal Physical · DB 6 · AC 2 · EOT · WR, 1 Target_
  - The target loses a Tick of Hit Points.

- 🟡 **Zantetsuken** — `partial` · P3 · themes: heal · engine: status-fx, status-always
  - _Steel Physical · DB 11 · AC 5 · Scene · Melee, 1 Target_
  - This Move automatically Critically Hits targets at or below half of their Max Hit Points. After dealing damage, the target becomes Vulnerable for one full round. 44

<a id="moves-14"></a>
## `moves-14` — Set-Up, charge & multi-turn (2/2)

P3 · 23 open of 23 · open

- 🟡 **Double Shock** — `partial` · P3 · themes: multiturn · engine: typemod · code: isCombatDurBuff:44436
  - _Electric Physical · DB 12 · AC 2 · Daily x2 · Close Blast 2, Smite, Spirit Surge_
  - If the user is an Electric Type, they lose the Electric Type until the start of their next turn.

- 🔴 **Electrify** — `todo` · P3 · themes: multiturn
  - _Electric Status · DB — · AC — · EOT · 6, 1 Target._
  - Until the end of the user's next turn, the target's damaging Water-Type attacks and Melee attacks of any Type deal Electric-Type Damage instead of their usual Type.

- 🔴 **Fickle Beam** — `todo` · P3 · themes: multiturn, status, typing
  - _Dragon Special · DB 12 · AC 5 · Scene · Line 3_
  - Roll Accuracy for this Move 3 times. For each target, if one of these rolls succeeds, this Move hits that target. For each successful roll after the first, choose one of the following additional effects: » That target is Slowed for 1 full round. » That target is Suppressed. If one or more of the rolls crit, this Move is a Critical Hit. This Move is 1 step more effective against targets that have hit the user for Super Effective damage since the beginning of their last turn.

- 🟡 **Freeze Shock** — `partial` · P3 · themes: multiturn · engine: range, range-status, status-fx
  - _Ice Physical · DB 14 · AC 4 · Scene · 10, 1 Target, Set-Up, Full Action_
  - Set-Up Effect: The user may shift, then ends their turn. Resolution Effect: The user attacks with Freeze Shock. Freeze Shock paralyzes on 15+.

- 🟡 **Fusion Bolt** — `partial` · P3 · themes: multiturn · engine: special:conditionalDB
  - _Electric Physical · DB 10 · AC 2 · Scene x2 · 8, 1 Target, Smite_
  - Fusion Bolt has its Damage Base increased by +3 if Fusion Flare was used this round or last round by any participant of the encounter.

- 🟡 **Fusion Flare** — `partial` · P3 · themes: multiturn · engine: special:conditionalDB
  - _Fire Special · DB 10 · AC 2 · Scene x2 · 8, 1 Target, Smite_
  - If Fusion Bolt was used this round or last round by any participant of the encounter, Fusion Flare has its Damage Base increased by +3.

- 🔴 **Gastro Acid** — `todo` · P3 · themes: multiturn, control, swap, status
  - _Poison Status · DB — · AC 2 · Scene · 4. 1 Target_
  - The target's Ability is disabled until the end of the encounter. If the target has more than one ability, you choose one of them to disable.

- 🟡 **Gigaton Hammer** — `partial` · P3 · themes: multiturn · engine: status-fx, status-always, status-self
  - _Steel Physical · DB 16 · AC 2 · Scene x2 · Melee, 1 Target, Smite, Reckless_
  - After dealing damage, the user becomes Slowed and Vulnerable until the end of their next turn.

- 🟡 **Glacial Lance** — `partial` · P3 · themes: multiturn · engine: status-fx, status-always
  - _Ice Physical · DB 13 · AC 2 · Daily · Line 8, Smite_
  - Legal targets hit by Glacial Lance are Stuck and Trapped until the end of their next turn.

- 🔴 **Guard Split** — `todo` · P3 · themes: multiturn
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The target loses 5 Defense and 5 Special Defense. If they do, the user gains 5 Damage Reduction. These effects last until the end of the Scene.

- 🟡 **Ice Burn** — `partial` · P3 · themes: multiturn · engine: range, range-status, status-fx
  - _Ice Special · DB 14 · AC 4 · Scene · 10, 1 Target, Set-Up, Full Action_
  - Set-Up Effect: The user may shift, then ends their turn. Resolution Effect: The user attacks with Ice Burn. Ice Burn Burns on 15+.

- 🔴 **Lash Out** — `todo` · P3 · themes: multiturn, cs
  - _Dark Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - If the user has lost CS from a source other than itself since the end of its last turn, Lash Out is instead DB 15 (4d10 + 20 / 45). Any given foe may be the target of this increased damage only once per Scene.

- 🔴 **Low Blow** — `todo` · P3 · themes: multiturn, status
  - _None Status · DB — · AC 2 · Standard · Melee, 1 Target_
  - You and the target make Opposed Acrobatics Checks. If you win, the target is Vulnerable and has their Initiative set to 0 until the end of your next turn.

- 🟡 **Meteor Beam** — `partial` · P3 · themes: multiturn · engine: cs
  - _Rock Special · DB 12 · AC 4 · Scene x2 · Cone 3, Smite_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: multiturn
  - Set-Up Effect: The user's Special Attack is raised by by +1 Combat Stage. 
    Resolution Effect: The user attacks with Meteor Beam.

- 🔴 **Mind Reader** — `todo` · P3 · themes: multiturn
  - _Normal Status · DB — · AC — · Scene · 6, 1 Target_
  - The target becomes Read to the user until the end of the user's next turn. The user may end this effect when making an Attack on the user, causing that attack to automatically hit; OR when the Read target uses an Attack against the user, causing that attack to automatically miss. If the user has the Telepathy Capability, the user automatically succeeds on a mindreading attempt against the target, and may listen to the target's surface thoughts as long as they remain Read. Mind Reader automatically misses against targets with the Mindlock Capability.

- 🔴 **Population Bomb** — `todo` · P3 · themes: multiturn, status, typing
  - _Normal Physical · DB 8 · AC 5 · Scene x2 · 4, 1 Target, Smite, Slice_
  - Roll Accuracy for this Move 3 times. If one of these rolls succeeds, this Move hits. For each successful roll after the first, choose one of the following additional effects: » The target is Vulnerable until the end of their next turn. » The target's Moves are resisted 1 step further until the end of their next turn. » This Move's damage cannot be resisted. If one or more of the rolls crit, this Move is a Critical Hit, and you may choose an additional effect.

- 🔴 **Power Split** — `todo` · P3 · themes: multiturn
  - _Psychic Status · DB — · AC — · Scene · Melee, 1 Target_
  - The target has their Attack and Special Attack lowered by 5. If they do, the user gains a +5 bonus to Damage Rolls. These effects last until the end of the scene.

- 🟡 **Redline** — `partial` · P3 · themes: multiturn, cs · engine: versatile
  - _Dragon Versatile · DB 8 · AC 2 · EOT · Melee, 1 Target, Dash, Versatile_
  - The target may not make Attacks of Opportunity until the end of the Round. If the target has any positive Combat Stages, it loses them, and this Move is 1 step more Effective. After attacking, the user may Move up to their remaining Movement as a Free Action. Electric Moves

- 🟡 **Silk Trap** — `partial` · P3 · themes: multiturn, status · engine: cs
  - _Bug Status · DB — · AC — · Scene · Self, Interrupt, Shield, Trigger_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: multiturn, status
  - If the user is hit by a Move, the user may use this Move. The user is instead not hit by the triggering Move. You do not take any damage nor are you affected by any of the Move's effects. In addition, if the triggering Move was Melee ranged, the attacker's Speed is lowered by -2 Combat Stages and they are Slowed until the end of the user's next turn. If the target already has negative Speed Combat Stages, the target is Stuck and Trapped instead of Slowed.

- 🟡 **Spotlight** — `partial` · P3 · themes: multiturn · engine: status-fx, status-always
  - _Normal Status · DB — · AC — · Daily · 6, 1 Target, Priority_
  - Until the end of the user's next turn, the target is Blinded and Vulnerable.

- 🔴 **Take Aim** — `todo` · P3 · themes: multiturn
  - _Normal Status · DB — · AC — · EOT · Self_
  - Raise the user's Accuracy by +1. If the user performs an Weapon Move on their next turn that deals damage, add its Damage Dice Roll an extra time to the damage.

- 🔴 **Throat Chop** — `todo` · P3 · themes: multiturn
  - _Dark Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - The target cannot use Moves with the Sonic keyword for the next two turns.

- 🟡 **Victory Dance** — `partial` · P3 · themes: multiturn · engine: cs
  - _Fighting Status · DB — · AC — · EOT · Self_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: multiturn
  - If the user performs a Fighting Move on their next turn that deals damage, add its Damage Dice Roll an extra time to the damage. Raise the user's Defense 1 Combat Stage.

<a id="moves-16"></a>
## `moves-16` — Weather & Terrain (2/2)

P3 · 20 open of 20 · open

- 🔴 **Floral Healing** — `todo` · P3 · themes: weather, heal
  - _Fairy Status · DB — · AC — · Daily x2 · Melee, 1 Target, Healing_
  - The target recovers 1/2 their maximum Hit Points. If the Field is Grassy Terrain, the target instead recovers 2/3 their maximum Hit Points.

- 🟡 **Geomancy** — `partial` · P3 · themes: weather, multiturn · engine: cs
  - _Fairy Status · DB — · AC — · Scene · Self, Set Up_
  - Set-Up Effect: The user may not shift this round. The user may create as many squares of Rough Terrain as it wants within a Burst 3 as plants burst through the ground, regardless of the surface material. Resolution Effect: Geomancy raises the user's Special Attack, Special Defense, and Speed by +2 CS.

- 🔴 **Grassy Glide** — `todo` · P3 · themes: weather, interrupt, multiturn
  - _Grass Physical · DB 7 · AC 2 · EOT · Melee, Pass, Spirit Surge_
  - If the user is on Grassy Terrain, Grassy Glide may be used with Priority. After Grassy Glide has been resolved, the user may choose to create Grassy Terrain in the spaces Passed over (including those it started and ended in), that lasts for 5 turns. Any creatures in those spaces are affected as if by the Field Move Grassy Terrain, rather than any other Field Move.

- 🟡 **Hail** — `partial` · P3 · themes: weather, heal, typing · code: WEATHER_DEFS:1229, CAMOUFLAGE_FIELDS:2599, WEATHER_SETTER_ABILITIES:3000, MOVE_CONDITIONS:21250, FEATURE_MODES:23510, extremeWeatherFx:30346, WEATHER_SYSTEM_MOVES:30415
  - _Ice Status · DB — · AC — · Daily x2 · Field, Weather_
  - The weather changes to Hail for 5 rounds. While it is Hailing, all non-Ice Type Pokemon lose a Tick of Hit Points at the beginning of their turn.

- 🟡 **Hydro Steam** — `partial` · P3 · themes: weather, barrier · engine: special:conditionalDB
  - _Water Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - This Move does not deal reduced damage in Sunny Weather. It instead deals +10 damage in Sunny Weather. NOTE: If you are using the Weathers from Domovoi's Rework, the [Sun Shining] Blessing may not be activated against this Move.

- 🟡 **Ice Spinner** — `partial` · P3 · themes: weather · engine: range, range-status, status-fx
  - _Ice Physical · DB 8 · AC 2 · Scene x2 · Burst 1_
  - All targets are Tripped on a roll of 18+. If the user moves through an area of Terrain, or a Field-range Terrain is active, those effects immediately end.

- 🟡 **Inferno** — `partial` · P3 · themes: weather · engine: status-fx, status-always
  - _Fire Special · DB 10 · AC 9 · At-Will · 6, 1 Target_
  - Inferno Burns the target. Inferno ignores the target's Evasion if there are no other combatants or Rough or Blocking Terrain within 2 meters of the target.

- 🔴 **Misty Explosion** — `todo` · P3 · themes: weather, heal, multiturn
  - _Fairy Special · DB 10 · AC 2 · Daily · Burst 3, Friendly, Smite_
  - The user's Hit Points are set to -50% of their full Hit Point value. This Hit Point loss cannot be prevented or reduced in any way. After Misty Explosion  is resolved, create Misty Terrain in a Blast 7, centered on the user, that lasts for 5 turns. Any creatures in those spaces are affected as if by the Field Move Misty Terrain, rather than any other Field Move.

- 🟡 **Psyblade** — `partial` · P3 · themes: weather · engine: special:conditionalDB
  - _Psychic Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Slice_
  - This Move deals +10 damage if the user or target are in Electric Terrain.

- 🔴 **Rising Voltage** — `todo` · P3 · themes: weather, interrupt, multiturn
  - _Electric Special · DB 7 · AC 2 · Scene x2 · Burst 2, Groundsource, Spirit Surge_
  - After Rising Voltage is resolved, you may create Electric Terrain in a Blast 7, centered on the user, that lasts for 5 turns. Any creatures in those spaces are affected as if by the Field Move Electric Terrain, rather than any other Field Move. This Effect may trigger only once per Scene.

- 🔴 **Shed Tail** — `todo` · P3 · themes: weather, position, heal, status
  - _Normal Status · DB — · AC — · Scene · Self, Coat, Illusion, Interrupt, Shield, Trigger_
  - If the user is hit by a Move while above 1/4th Hit Points, after being told how much damage it would deal, they may use this Move. The user is instead not hit by the triggering Move, and does not take any damage, nor are they affected by any of the Move's effects. Instead, they lose 1/4th of their maximum Hit Points. This Hit Point loss cannot be prevented in any way. The user may then Disengage up to their full Movement as a Free Action, or be switched out, even if they are Trapped. They leave behind a Tail Token on any one square they occupied. The Tail Token counts as Rough Terrain for foes, and if an ally Shifts over it, they may remove it from the field to gain the same amount of Tempor …

- 🔴 **Shore Up** — `todo` · P3 · themes: weather, heal
  - _Ground Status · DB — · AC — · Daily x2 · Self_
  - The user regains Hit Points equal to half of its full Hit Point value. If it is Sand Storming, the user gains 2/3 of its full Hit Point value. If it is Sunny, Rainy, or Hailing, the user gains 1/4 of its full Hit Point value.

- 🔴 **Snowscape** — `todo` · P3 · themes: weather, typing
  - _Ice Status · DB — · AC — · Daily x2 · Field, Weather_
  - The weather changes to Snowy for 5 rounds. While it is Snowing, all Ice-Type Pokemon gain 5 Damage Reduction, or +2 to any existing Damage Reduction.

- 🟡 **Solar Beam** — `partial` · P3 · themes: weather, multiturn · engine: special:conditionalDB · code: addSpeciesKey:4171
  - _Grass Special · DB 12 · AC 2 · Scene x2 · Line 6, Set-Up_
  - Set-Up Effect: If the weather is not Sunny, the user's turn ends. If the weather is Sunny, immediately proceed to the Resolution Effect instead and this Move loses the Set-Up keyword. Resolution Effect: The user attacks with Solar Beam. If the weather is Rainy, Sandstorming, or Hailing, Solar Beam's Damage Base is lowered to 6 (2d6+8 / 15).

- 🟡 **Solar Blade** — `partial` · P3 · themes: weather, multiturn · engine: cs, special:conditionalDB · code: SPECIAL_FIXED_DAMAGE:21161, openMoveRoll:22719
  - _Grass Physical · DB 13 · AC 2 · Scene x2 · Melee, 1 Target, Set-Up_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: weather, multiturn
  - Set-Up Effect: If the weather is not Sunny, the user's gains +1 Attack CS and +1 Special Defense CS. If it is Sunny, immediately Resolve. Resolution Effect: Attack with Solar Blade. Half damage in Sandstorm, Hail, or Rain.

- 🟡 **Steel Roller** — `partial` · P3 · themes: weather · engine: range, range-status, status-fx
  - _Steel Physical · DB 13 · AC 2 · Daily · Melee, Pass, Dash, Smite, Spirit Surge_
  - Legal targets hit by Steel Roller are Tripped on a roll of 15+. Any Hazards in spaces Passed through or adjacent to those spaces are removed (they are removed before they can affect the user). If the user moves through an area of Terrain, or a Field-range Terrain is active, those effects immediately end.

- 🟡 **Sugar Rush** — `partial` · P3 · themes: weather · engine: cs
  - _Fairy Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash, Full Action_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: weather
  - The user Shifts before or after attacking, ignoring Slow Terrain. If the user did not move through Slow Terrain during this Shift, raise the user's Speed 1 Combat Stage.

- 🟡 **Sunny Day** — `partial` · P3 · themes: weather, typing · code: WEATHER_SYSTEM_MOVES:30415
  - _Fire Status · DB — · AC — · Daily x2 · Field, Weather_
  - The weather becomes Sunny for 5 rounds. While Sunny, Fire-Type Attacks gain a +5 bonus to Damage Rolls, and Water-Type Attacks suffer a -5 Damage penalty.

- 🟡 **Terrain Pulse** — `partial` · P3 · themes: weather · engine: special:conditionalDB · code: MEGA_LAUNCHER_MOVES:20850
  - _Normal Special · DB 5 · AC 2 · EOT · Close Blast 3_
  - If the user is under the effects of a Terrain, Terrain Pulse has a Damage Base of 10 (3d8+10 / 24). In addition, Terrain Pulse becomes the Type that corresponds with the Move that creates that Terrain. (For example, if in Misty Terrain, it would become Fairy Type.) If the user is under the effects of multiple Terrains, choose one to affect this Move.

- 🟡 **Tidy Up** — `partial` · P3 · themes: weather, status · engine: cs
  - _Normal Status · DB — · AC — · Scene · Self_
  - Choose Slow or Rough Terrain. The chosen Terrain, any Terrain Effects of your choice caused by Moves, and all Hazards are removed from the squares within a Burst 4. Then, the user's Attack and Speed are raised by +1 Combat Stage. Poison Moves

<a id="moves-18"></a>
## `moves-18` — Ability / item / stat swaps (2/2)

P3 · 16 open of 16 · open

- 🟡 **Magnetic Flux [SM]** — `partial` · P3 · themes: swap · engine: cs
  - _Electric Status · DB — · AC — · Scene x2 · Burst 4_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap
  - Raise the Defense and Special Defense of all legal targets with the Minus or Plus Abilities by +1 CS.

- 🔴 **Miracle Eye** — `todo` · P3 · themes: swap
  - _Psychic Status · DB — · AC — · Scene x2 · Self, Swift Action_
  - Miracle Eye may be activated as a Swift Action on the user's turn. For the rest of the turn, the user's Psychic-Type Moves can hit and affect Dark-Type targets, and the user can see through the Illusion Ability, Moves with the Illusion keyword, and effects created by the Illusionist Capability, ignoring all effects from those.

- 🔴 **Moongeist Beam** — `todo` · P3 · themes: swap
  - _Ghost Special · DB 10 · AC 2 · Scene x2 · Line 6_
  - This Move ignores any Abilities that would cause it to fail or miss; those Abilities cannot be activated in response to Moongeist Beam (ex: Dodge, Wonder Guard)

- 🔴 **Multi-Attack** — `todo` · P3 · themes: swap
  - _Normal Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - Multi-Attack's Type is determined by the Memory Disc, Plate, or Drive Item held.

- 🔴 **Multi-Attack [SS]** — `todo` · P3 · themes: swap
  - _Normal Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target_
  - Multi-Attack's Type is determined by the Memory Disc, Plate, or Drive Item held.

- 🔴 **Photon Geyser** — `todo` · P3 · themes: swap
  - _Psychic Special · DB 10 · AC 2 · Scene · Burst 2_
  - This attack uses the highest of the user's Attack or Special Attack Stat, though it remains a Special Move. This Move ignores any Abilities that would cause it to fail or miss, such as Dodge or Wonder Guard; those Abilities cannot be activated in response to Photon Geyser.

- 🔴 **Recycle** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC — · Scene · Self_
  - The effect of a consumable item used earlier in the encounter is used again as if it had not been destroyed. The item is still gone.

- 🟡 **Shadow Bone** — `partial` · P3 · themes: swap · engine: cs, range
  - _Ghost Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - Lower the target's Defense by -1 CS on a 17+. Counts as a Bone Move for Cubone/Marowak's Abilities, etc.

- 🟡 **Stuff Cheeks** — `partial` · P3 · themes: swap · engine: cs · code: CS_PATTERNS:20504
  - _Normal Status · DB — · AC — · Scene · Self_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap
  - The user immediately consumes one of its Food Buffs, regardless of any conditions that need to be met, gaining its benefit if applicable. If a Buff is consumed, the user's Defense CS is raised by 2.

- 🔴 **Sunsteel Strike** — `todo` · P3 · themes: swap
  - _Steel Physical · DB 10 · AC 2 · Scene x2 · Close Blast 2_
  - This Move ignores any Abilities that would cause it to fail or miss; those Abilities cannot be activated in response to Sunsteel Strike (ex: Dodge, Wonder Guard)

- 🔴 **Teatime** — `todo` · P3 · themes: swap
  - _Normal Status · DB — · AC — · Scene · Field, Social_
  - All participants in the battle may choose to immediately consume one of their Food Buffs, regardless of if the conditions to do so are met.

- 🟡 **Tera Starstorm** — `partial` · P3 · themes: swap, typing · engine: target-rules · code: teraMoveType:19893
  - _Normal Special · DB 12 · AC 2 · Scene · 6, Ranged Blast 3, Smite_
  - Place a Star Shard in any square of the Area of Effect. Any ally entering that square, or starting their turn on it, may consume the Shard to gain a +10 Damage Bonus on their next successful damaging attack. If a target has changed Forme, this attack is one step more effective against that target. This may not cause the Effectiveness to be raised above Doubly Super Effective. Note: Changing Forme includes any effect that switches Base Stat Sets, such as the Abilities like Stance Change or Schooling; Mega Evolution; Dynamax; Terastilization; or being in any Altered, Origin, or Primal Forme; even if they started the encounter that way.

- 🟡 **Thousand Arrows** — `partial` · P3 · themes: swap, typing · engine: target-rules
  - _Ground Physical · DB 9 · AC 2 · Scene · 6, 1 Target_
  - When calculating Weakness and Resistance for Thousand Arrows, Flying-Typed targets calculate damage as if Ground was neutral to Ice. Thousand Arrows ignores the Levitate Ability, The target is knocked down to ground level, and loses all Sky or Levitate Speeds for 3 turns. During this time, they may be hit by Ground-Type Moves even if normally immune.

- 🟡 **Triple Arrows** — `partial` · P3 · themes: swap · engine: cs, range, range-crit
  - _Fighting Physical · DB 5 · AC 2 · EOT · 4, 1 Target_
  - note: found-01: CS clause now parsed (⬆ Apply); still open: swap
  - Targets hit by Triple Arrows lose 1 CS in both  Defense and Special Defense. 
    
    After attacking with Triple Arrows, hit or miss, the user may Disengage 2m and attack a different target with Triple Arrows. This effect may be repeated a second time, targeting a creature that has not been targeted by either prior attack. Before making each attack roll, the user can elect to give up triggering allremaining additional shifts and attacks. Triple Arrowsgains +1 Accuracy and +1 DB for each attack that is given up. Triple Arrows always benefits from the Technician Ability.
    
    Once Daily, after all attacks with Triple Arrows have been resolved, the user becomes Pumped. While Pumped, the user's Critical R …

- 🔴 **Triple Axel** — `todo` · P3 · themes: swap
  - _Ice Physical · DB 6 · AC 4 · EOT · Melee, 1 Target_
  - After attacking with Triple Axel, hit or miss, the user may Disengage 2m and attack a different target with Triple Axel. This effect may be repeated a second time, targeting a creature that has not been targeted by either prior attack. Before making each attack roll, the user can elect to give up triggering all remaining additional shifts and attacks. Triple Axel gains +1 Accuracy and +1 DB for each attack that is given up. Triple Axel always benefits from the Technician Ability.

- 🔴 **Triple Kick [LA]** — `todo` · P3 · themes: swap
  - _Fighting Physical · DB 4 · AC 3 · At-Will · Melee, 1 Target_
  - After attacking with Triple Kick, hit or miss, the user may Disengage 2m and attack a different target with Triple Kick. This effect may be repeated a second time, targeting a creature that has not been targeted by either prior attack. Before making each attack roll, the user can elect to give up triggering all remaining additional shifts and attacks. Triple Kick gains +1 Accuracy and +2 DB for each attack that is given up. Triple Kick always benefits from the Technician Ability.

<a id="verify-moves-01"></a>
## `verify-moves-01` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Absorb** — `likely` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: damage
  - _Grass Special · DB 2 · AC 2 · At-Will · 4, 1 Target_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Acid Spray** — `likely` · P1 (pc, player:Lázaro) · themes: cs · engine: cs
  - _Poison Special · DB 4 · AC 2 · EOT · 4, 1 Target_
  - Acid Spray lowers the target's Special Defense by -2 CS.

- 🟢 **Air Cutter** — `likely` · P1 (enc, player:Handels, player:Lázaro) · themes: damage · engine: range, range-crit
  - _Flying Special · DB 6 · AC 2 · At-Will · Cone 2_
  - Air Cutter is a Critical Hit on 18+.

- 🟢 **Air Slash** — `likely` · P1 (player:Lysgd) · themes: status · engine: range, range-status, range-flinch, status-fx · code: ROTOM_POLTERGEIST:19850
  - _Flying Special · DB 8 · AC 3 · EOT · 6, 1 Target_
  - Air Slash Flinches the target on 15+.

- 🟢 **Astonish** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status, action · engine: range, range-status, range-flinch, status-fx · code: EDGE_FX:123
  - _Ghost Physical · DB 3 · AC 2 · At-Will · Melee, 1 Target_
  - Astonish Flinches the target on 15+. Once per Scene, if the target is unaware of the user's presence, Astonish automatically Flinches.

- 🟢 **Baby-Doll Eyes** — `likely` · P1 (enc, pc, player:Lysgd, player:Lázaro) · themes: cs · engine: cs · code: EDGE_FX:119
  - _Fairy Status · DB — · AC 2 · EOT · 4, 1 Target, Priority, Social_
  - Lower the target's Attack by -1 CS.

- 🟢 **Bite** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status · engine: range, range-status, range-flinch, status-fx · code: STRONG_JAW_MOVES:20847
  - _Dark Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Bite Flinches the target on 15+.

- 🟢 **Bone Club** — `likely` · P1 (player:Handels) · themes: status · engine: range, range-status, range-flinch, status-fx · code: BONE_WIELDER_MOVES:21052
  - _Ground Physical · DB 7 · AC 5 · At-Will · Melee, 1 Target_
  - Bone Club Flinches the target on 18+.

- 🟢 **Bonemerang** — `likely` · P1 (player:Handels) · themes: plain · engine: special:doubleStrike, double-strike · code: BONE_WIELDER_MOVES:21052
  - _Ground Physical · DB 5 · AC 3 · EOT · 6, 1 Target, Doublestrike_
  - --

- 🟢 **Bubble** — `likely` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: cs · engine: cs, range
  - _Water Special · DB 4 · AC 2 · At-Will · Burst 1_
  - Bubble lowers the target's Speed by -1 CS on 16+..

- 🟢 **Bubblebeam** — `likely` · P1 (enc, pc, player:Lysgd) · themes: cs · engine: cs, range · code: addSpeciesKey:4170
  - _Water Special · DB 8 · AC 2 · At-Will · 4, 1 Target_
  - Bubblebeam lowers the target's Speed by -1 CS on 18+.

- 🟢 **Comet Punch** — `likely` · P1 (enc, player:Handels) · themes: plain · engine: five-strike · code: IRON_FIST_MOVES:20729
  - _Normal Physical · DB 2 · AC 4 · At-Will · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Dark Pulse** — `likely` · P1 (enc, player:Lysgd) · themes: status · engine: range, range-status, range-flinch, status-fx · code: MEGA_LAUNCHER_MOVES:20849
  - _Dark Special · DB 8 · AC 2 · EOT · 8, 1 Target, Aura_
  - Dark Pulse Flinches the target on 17+.

- 🟢 **Double Hit** — `likely` · P1 (player:Handels) · themes: plain · engine: special:doubleStrike, double-strike
  - _Normal Physical · DB 4 · AC 3 · EOT · Melee, 1 Target, Double Strike_
  - --

- 🟢 **Double Kick** — `likely` · P1 (enc, player:Handels) · themes: plain · engine: special:doubleStrike, double-strike
  - _Fighting Physical · DB 3 · AC 3 · At-Will · Melee, 1 Target, Double Strike_
  - --

- 🟢 **Double Slap** — `likely` · P1 (pc, player:Lázaro) · themes: plain · engine: five-strike
  - _Normal Physical · DB 2 · AC 4 · At-Will · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Dragon Breath** — `likely` · P1 (player:Lázaro) · themes: status · engine: range, range-status, status-fx
  - _Dragon Special · DB 6 · AC 2 · EOT · 6, 1 Target_
  - Dragon Breath Paralyzes the target on 15+.

- 🟢 **Dragon Pulse** — `likely` · P1 (player:Handels) · themes: plain · code: MEGA_LAUNCHER_MOVES:20849
  - _Dragon Special · DB 9 · AC 2 · EOT · 8, 1 Target, Aura_
  - --

- 🟢 **Draining Kiss** — `likely` · P1 (player:Lysgd, player:Lázaro) · themes: damage
  - _Fairy Special · DB 5 · AC 2 · EOT · Melee, 1 Target_
  - The user gains HP equal to half of the damage the user dealt to the target.

- 🟢 **Dual Chop** — `likely` · P1 (enc, player:Lázaro) · themes: plain · engine: special:doubleStrike, double-strike
  - _Dragon Physical · DB 5 · AC 3 · EOT · Melee, 1 Target, Doublestrike_
  - --

- 🟢 **Echoed Voice** — `likely` · P1 (enc, pc, player:Handels) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21311
  - _Normal Special · DB 4 · AC 2 · EOT · 3, 1 Target, Sonic_
  - If Echoed Voice was used by any Pokemon or Trainer in the Encounter on the previous round, increase its Damage Base by +4. If Echoed Voice was used by any Pokemon or Trainers during both the previous two rounds, increase its Damage Base by +8.

- 🟢 **Ember** — `likely` · P1 (enc, pc, player:Lysgd) · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - Ember Burns the target on 18+. *Grants: Firestarter

- 🟢 **Esper Wing** — `likely` · P1 (player:Lysgd) · themes: damage · engine: range, range-crit
  - _Psychic Special · DB 8 · AC 4 · Scene x2 · Melee, Pass, Priority_
  - Esper Wing is a Critical Hit on an 18+.

- 🟢 **Fire Fang** — `likely` · P1 (enc, player:Lysgd) · themes: status, damage, skill · engine: rand-status · code: STRONG_JAW_MOVES:20847
  - _Fire Physical · DB 7 · AC 3 · At-Will · Melee, 1 Target_
  - Fire Fang Burns or Flinches on 18-19 during Accuracy Check; flip a coin to determine whether the foe becomes Burned or Flinched. On 20 during Accuracy Check, the foe is both Burned and Flinched.

- 🟢 **Flail** — `likely` · P1 (enc, pc, player:Handels, player:Hugo) · themes: damage, stat · engine: special:valueDB · code: weaponizeRange:7657, openTrainerAttack:9106, specialMoveInfo:21316, moveLineShort:22834
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - For each Injury the user has, Flail's Damage Base is increased by +1.

- 🟢 **Flame Wheel** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: status · engine: range, range-status, status-fx
  - _Fire Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - Flame Wheel Burns the target on 19+.

- 🟢 **Flamethrower** — `likely` · P1 (enc, player:Lysgd) · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 9 · AC 2 · EOT · 4, 1 Target_
  - Flamethrower Burns the target on 19+.

- 🟢 **Focus Energy** — `likely` · P1 (enc, pc, player:Lázaro) · themes: damage · engine: range, range-crit
  - _Normal Status · DB — · AC — · At-Will · Self_
  - The user becomes Pumped. While Pumped, the user's Critical Range is extended by 2, or 18+ if the Critical Range is not otherwise extended. Being switched will cause this effect to end.

- 🟢 **Fury Attack** — `likely` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: plain · engine: five-strike
  - _Normal Physical · DB 2 · AC 4 · At-Will · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Fury Cutter** — `likely` · P1 (enc, pc, player:Lysgd, player:Lázaro) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21305
  - _Bug Physical · DB 4 · AC 3 · At-Will · Melee, 1 Target_
  - If Fury Cutter is used successfully and consecutively on the same target, the Damage Base is increased by +4; the first hit has a DB of 4; the second hit a DB of 8, the third hit a DB of 12, and the fourth and all further hits have a DB of 16. If Fury Cutter misses or fails to damage its target, its Damage Base resets.

- 🟢 **Fury Swipes** — `likely` · P1 (enc, pc, player:Lázaro) · themes: plain · engine: five-strike
  - _Normal Physical · DB 3 · AC 5 · EOT · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Growl** — `likely` · P1 (enc, pc, player:Handels) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · At-Will · Burst 1, Friendly, Sonic, Social_
  - Lower the Attack of all legal targets by -1 CS.

- 🟢 **Gust** — `likely` · P1 (pc, player:Handels, player:Lysgd) · themes: damage, stat · engine: special:conditionalDB
  - _Flying Special · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - If the target is airborne as a result of Bounce, Fly, or Sky Drop, Gust can hit them, ignoring Range and has a Damage Base of 8 instead. *Grants: Guster

- 🟢 **Harden** — `likely` · P1 (enc, pc, player:Lysgd) · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · At-Will · Self_
  - Raise the user's Defense by +1 CS.

- 🟢 **Headbutt** — `likely` · P1 (enc, pc, player:Lysgd) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - Headbutt Flinches the target on 15+.

- 🟢 **Hex** — `likely` · P1 (enc, player:Handels, player:Lysgd, player:Lázaro) · themes: damage, stat · engine: special:conditionalDB · code: openTrainerAttack:8938
  - _Ghost Special · DB 7 · AC 2 · EOT · 6, 1 Target_
  - Once a Scene, if Hex's target has a Status Affliction, you may have Hex's Damage Base be 13 instead (4d10+10 / 35)

- 🟢 **Hone Claws** — `likely` · P1 (enc, pc, player:Lázaro) · themes: cs, damage · engine: cs
  - _Dark Status · DB — · AC — · At-Will · Self_
  - Raise the user's Attack by +1 CS and Accuracy by +1.

- 🟢 **Ice Ball** — `likely` · P1 (enc, player:Lysgd) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21313
  - _Ice Physical · DB 3 · AC 4 · At-Will · Melee, 1 Target_
  - The user continues to use Ice Ball on each of its turns until they miss any target with Ice Ball or are not able to hit any target with Ice Ball during their turn. Each successive use of Ice Ball increases Ice Ball's Damage Base by +3 to a maximum of DB 15.

- 🟢 **Ice Beam** — `likely` · P1 (enc, player:Lysgd) · themes: status · engine: range, range-status, status-fx
  - _Ice Special · DB 9 · AC 2 · EOT · 4, 1 Target_
  - Ice Beam Freezes on 19+.

- 🟢 **Karate Chop** — `likely` · P1 (enc, player:Lázaro) · themes: damage · engine: range, range-crit
  - _Fighting Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target_
  - Karate Chop is a Critical Hit on 17+.

- 🟢 **Leech Life** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: damage
  - _Bug Physical · DB 2 · AC 2 · At-Will · Melee, 1 Target_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Leer** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: cs · engine: cs · code: EDGE_FX:121
  - _Normal Status · DB — · AC 2 · At-Will · Cone 2, Friendly, Social_
  - All legal targets have their Defense lowered by -1 CS.

- 🟢 **Lick** — `likely` · P1 (enc, pc, player:Lázaro) · themes: status · engine: range, range-status, status-fx
  - _Ghost Physical · DB 3 · AC 2 · At-Will · Melee, 1 Target_
  - Lick Paralyzes the target on 15+.

- 🟢 **Low Kick** — `likely` · P1 (enc, pc, player:Lázaro) · themes: damage, stat · engine: weight
  - _Fighting Physical · DB — · AC 2 · EOT · Melee, 1 Target, Weight Class_
  - Low Kick's Damage Base is equal to twice the target's Weight Class.

- 🟢 **Low Sweep** — `likely` · P1 (enc, player:Lázaro) · themes: cs · engine: cs
  - _Fighting Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - Lower the target's Speed by -1 CS.

- 🟢 **Mega Drain** — `likely` · P1 (enc, pc, player:Handels) · themes: damage
  - _Grass Special · DB 4 · AC 2 · At-Will · 6, 1 Target_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Metal Claw** — `likely` · P1 (enc, pc, player:Lysgd, player:Lázaro) · themes: cs · engine: cs, range
  - _Steel Physical · DB 5 · AC 3 · At-Will · Melee, 1 Target, Spirit Surge_
  - Raise the user's Attack by +1 CS on 18+.

- 🟢 **Metal Sound** — `likely` · P1 (enc, player:Handels, player:Lázaro) · themes: cs · engine: cs
  - _Steel Status · DB — · AC 4 · EOT · Burst 2, Friendly, Sonic_
  - All Legal Targets have their Special Defense lowered by -2 CS.

- 🟢 **Moonblast** — `likely` · P1 (enc, player:Hugo, player:Lázaro) · themes: cs · engine: cs, range
  - _Fairy Special · DB 10 · AC 2 · EOT · 6, 1 Target_
  - Moonblast lowers the target's Special Attack by -1 CS on 15+.

- 🟢 **Mud-Slap** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: damage · engine: cs
  - _Ground Special · DB 2 · AC 2 · At-Will · 3, 1 Target_
  - The target's Accuracy is lowered by -1.

<a id="verify-moves-02"></a>
## `verify-moves-02` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Mystical Fire** — `likely` · P1 (player:Lysgd, player:Lázaro) · themes: cs, skill · engine: cs
  - _Fire Special · DB 7 · AC 2 · EOT · 6, 1 Target_
  - Mystical Fire lowers the target's Special Attack by 1 Combat Stage.

- 🟢 **Nasty Plot** — `likely` · P1 (enc, player:Lysgd) · themes: cs · engine: cs
  - _Dark Status · DB — · AC — · EOT · Self_
  - Raise the user's Special Attack by +2 CS.

- 🟢 **Ominous Wind** — `likely` · P1 (enc, player:Handels, player:Lázaro) · themes: cs, stat · engine: cs, range
  - _Ghost Special · DB 6 · AC 2 · EOT · 6, 1 Target, Spirit Surge_
  - The user has each of its stats raised by +1 CS on a 19+.

- 🟢 **Play Nice** — `likely` · P1 (pc, player:Handels) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · At-Will · 6, 1 Target, Social_
  - Play Nice lowers the target's Attack by -1 CS.

- 🟢 **Poison Sting** — `likely` · P1 (enc, pc, player:Lysgd) · themes: status · engine: range, range-status, status-fx
  - _Poison Physical · DB 2 · AC 2 · At-Will · 6, 1 Target_
  - Poison Sting Poisons the target on 17+.

- 🟢 **Revenge** — `likely` · P1 (enc, pc, player:Lázaro) · themes: damage, stat · engine: special:conditionalDB
  - _Fighting Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - When declaring Revenge, the user does nothing and may not Shift. At the end of the round, the user may Shift and use Revenge. If the target damaged the user this round, Revenge has a Damage Base of 12 (4d10+15 / 40).

- 🟢 **Rock Slide** — `likely` · P1 (enc, player:Lysgd) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Rock Physical · DB 8 · AC 4 · Scene x2 · 6, Ranged Blast 3_
  - Rock Slide Flinches all legal targets on 17+.

- 🟢 **Rollout** — `likely` · P1 (enc, pc, player:Lysgd) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21312, openMoveRoll:22474
  - _Rock Physical · DB 3 · AC 4 · At-Will · Melee, Pass_
  - The user continues to use Rollout on each of its turns until they miss any target with Rollout, or are not able to hit any target with Rollout during their turn. Each successive use of Rollout increases Rollout's Damage Base by +4 to a maximum of DB 15.

- 🟢 **Screech** — `likely` · P1 (enc, pc, player:Handels) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 4 · EOT · Burst 2, Friendly, Sonic_
  - Lower the Defense of all legal targets by -2 CS.

- 🟢 **Shadow Punch** — `likely` · P1 (enc, player:Lysgd) · themes: plain · code: IRON_FIST_MOVES:20730
  - _Ghost Physical · DB 6 · AC — · EOT · 6, 1 Target_
  - Shadow Punch cannot miss.

- 🟢 **Slash** — `likely` · P1 (enc, player:Lysgd, player:Lázaro) · themes: damage · engine: range, range-crit
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, Pass_
  - Slash is a Critical Hit on 18+.

- 🟢 **Spook** — `likely` · P1 (player:Handels) · themes: cs, skill · engine: cs, range
  - _Ghost Special · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - Lower the target's Special Defense by -1 Combat Stage on 18+. Grass Moves

- 🟢 **Stomp** — `likely` · P1 (enc, pc, player:Handels) · themes: status, damage · engine: range, range-status, range-flinch, status-fx
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - Stomp Flinches the target on 15+. If the target is at least one size category smaller than the user, Stomp deals an additional 10 damage.

- 🟢 **Sweet Scent** — `likely` · P1 (enc, pc, player:Lysgd) · themes: damage
  - _Normal Status · DB — · AC 2 · Scene · Burst 2, Friendly_
  - Targets hit by Sweet Scent gain a -2 Penalty to Evasion. (Total Evasion may not be lowered to a negative value.) *Grants Alluring

- 🟢 **Swift** — `likely` · P1 (enc, pc, player:Lysgd) · themes: plain · code: capabilityFreq:11689, BATTLE_ACTIONS:23203, renderBattle:23258, isTypeFilter:23310, featureActionTypes:23368, CUSTOM_ACTION_TYPES:24497, openArcticZeal:28019
  - _Normal Special · DB 6 · AC — · EOT · 8, Ranged Blast 2, Friendly_
  - Swift cannot Miss.

- 🟢 **Swords Dance** — `likely` · P1 (enc, player:Lázaro) · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · EOT · Self_
  - Raise the user's Attack by +2 CS.

- 🟢 **Tail Whip** — `likely` · P1 (enc, pc, player:Handels) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · At-Will · Burst 1, Friendly_
  - All legal targets have their Defense lowered by -1 CS.

- 🟢 **Twister** — `likely` · P1 (enc, player:Lysgd) · themes: status, damage, stat · engine: range, range-status, range-flinch, status-fx
  - _Dragon Special · DB 4 · AC 2 · At-Will · 6, Ranged Blast 3_
  - Twister Flinches the target on 18+. Small or Medium targets in the central square of the blast are not hit. Any Pokemon Airborne as a result of Bounce, Fly, or Sky Drop above the Blast are hit, ignoring range, and Twister has a Damage Base of 8 against those targets instead.

- 🟢 **Water Pulse** — `likely` · P1 (enc, pc, player:Lázaro) · themes: status · engine: range, range-status, status-fx · code: MEGA_LAUNCHER_MOVES:20849
  - _Water Special · DB 6 · AC 2 · At-Will · 8, 1 Target, Aura_
  - Water Pulse Confuses the target on 17+.

- 🟢 **Acid** — `likely` · P2 (enc, pc) · themes: cs, skill · engine: cs, range
  - _Poison Special · DB 4 · AC 2 · At-Will · Cone 2_
  - Acid lowers the target's Special Defense by -1 Combat Stage on 18+.

- 🟢 **Acupressure** — `likely` · P2 (pc) · themes: cs, damage · engine: cs
  - _Normal Status · DB — · AC 2 · EOT · Melee, 1 Target or Self_
  - Roll 1d6. On a result of 1, raise the target's Attack by +2 CS. On a result of 2, raise the target's Defense by +2 CS. On a result of 3, raise the target's Special Attack by +2 CS. On a result of 4, raise the target's Special Defense by +2 CS. On a result of 5, raise the target's Speed by +2 CS. On a result of 6, raise the target's Accuracy by +2.

- 🟢 **Aerial Ace** — `likely` · P2 (enc, pc) · themes: plain · code: FLIP_OUT_MOVES:23822, flipOutBox:23880
  - _Flying Physical · DB 6 · AC — · EOT · Melee, 1 Target_
  - Aerial Ace cannot miss.

- 🟢 **After You** — `likely` · P2 (enc, pc) · themes: action · code: EDGE_FX:122
  - _Normal Status · DB — · AC — · Scene x2 · 6, 1 Target_
  - After You is a Swift Action. The target takes their turn for the round immediately after the user finishes their turn, ignoring Initiative. After You may only affect a target that has not yet acted that round and can only affect willing targets.

- 🟢 **Ancient Power** — `likely` · P2 (enc) · themes: cs, stat · engine: cs, range · code: researchTeachMove:29835, openAncientHeritage:30485
  - _Rock Special · DB 6 · AC 2 · EOT · 6, 1 Target, Spirit Surge_
  - The user has each of its stats raised by +1 CS on 19+.

- 🟢 **Arm Thrust** — `likely` · P2 (enc) · themes: plain · engine: five-strike
  - _Fighting Physical · DB 2 · AC 4 · EOT · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Attack Order** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Bug Physical · DB 9 · AC 2 · EOT · 6, 1 Target_
  - Attack Order is a Critical Hit on 18+.

- 🟢 **Aura Sphere** — `likely` · P2 (enc) · themes: plain · code: MEGA_LAUNCHER_MOVES:20849
  - _Fighting Special · DB 8 · AC — · EOT · 8, 1 Target, Aura_
  - Aura Sphere cannot miss.

- 🟢 **Avalanche** — `likely` · P2 (enc, pc) · themes: damage, stat · engine: special:conditionalDB
  - _Ice Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - When declaring Avalanche, the user does nothing and may not Shift. At the end of the round, the user may Shift and use Avalanche. If the target damaged the user this round, Avalanche has a Damage Base of 12 (4d10+15 / 40).

- 🟢 **Barrage** — `likely` · P2 (enc) · themes: plain · engine: five-strike
  - _Normal Physical · DB 2 · AC 4 · At-Will · 6, 1 Target, Five Strike_
  - --

- 🟢 **Body Slam** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Normal Physical · DB 9 · AC 2 · Scene x2 · Melee, 1 Target_
  - Body Slam Paralyzes the target on 15+.

- 🟢 **Bolt Beak** — `likely` · P2 (enc) · themes: damage · engine: special:conditionalDB · code: openMoveRoll:22718
  - _Electric Physical · DB 9 · AC 2 · Scene x2 · Melee, 1 Target_
  - Against targets with a lower initiative that have not yet acted this round, Bolt Beak deals +10 damage.

- 🟢 **Bone Rush** — `likely` · P2 (enc) · themes: plain · engine: five-strike · code: BONE_WIELDER_MOVES:21052
  - _Ground Physical · DB 3 · AC 4 · EOT · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Breaking Swipe** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Dragon Physical · DB 6 · AC 2 · EOT · Close Blast 2_
  - The target's Attack is lowered 1 CS.

- 🟢 **Bug Bite** — `likely` · P2 (enc, pc) · themes: plain · code: STRONG_JAW_MOVES:20847
  - _Bug Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - If the target has a stored Digestion/Food Buff or has traded in a Digestion/Food Buff this Scene, the user may gain the effects of the Digestion/Food Buff. This does no count towards the Usual limit on the user's Digestion/Food Buffs.

- 🟢 **Bullet Seed** — `likely` · P2 (enc) · themes: plain · engine: five-strike
  - _Grass Physical · DB 3 · AC 4 · EOT · 6, 1 Target, Five Strike_
  - --

- 🟢 **Charm** — `likely` · P2 (enc) · themes: cs · engine: cs · code: openAddGift:14355, MENTOR_SKILL_OPTIONS:22936, featureActionTypes:23399, openPowerChord:25052, MANIPULATE_EFFECTS:25151
  - _Fairy Status · DB — · AC 2 · EOT · 6, 1 Target, Social_
  - Lower the target's Attack by -2 CS.

- 🟢 **Chatter** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Flying Special · DB 7 · AC 2 · At-Will · 4, 1 Target, Sonic_
  - Chatter confuses all targets on 16+.

- 🟢 **Close Combat** — `likely` · P2 (enc) · themes: cs, damage · engine: cs · code: RECKLESS_ERRATA_MOVES:20844
  - _Fighting Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash_
  - Lower the user's Defense and Special Defense by -1 CS each after damage.

- 🟢 **Confide** — `likely` · P2 (enc, pc) · themes: cs · engine: cs · code: EDGE_FX:120
  - _Normal Status · DB — · AC 2 · At-Will · 4, 1 Target, Social_
  - Lower the target's Special Attack by -1 CS.

- 🟢 **Confusion** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, status-fx · code: EDGE_FX:118, TERRAIN_DEFS:1390
  - _Psychic Special · DB 5 · AC 2 · At-Will · 6, 1 Target_
  - Confusion Confuses the target on 19+.

- 🟢 **Constrict** — `likely` · P2 (enc, pc) · themes: cs, action · engine: cs
  - _Normal Physical · DB 1 · AC 2 · At-Will · Melee, 1 Target_
  - Lower the target's Speed by -1 CS. Constrict may be used as a Swift Action against targets the user is Grappling and automatically hits when performed this way.

- 🟢 **Crabhammer** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Water Physical · DB 10 · AC 4 · EOT · Melee, 1 Target_
  - Crabhammer is a Critical Hit on 18+.

- 🟢 **Crunch** — `likely` · P2 (enc) · themes: cs · engine: cs, range · code: STRONG_JAW_MOVES:20847
  - _Dark Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - Crunch lowers the target's Defense by -1 CS on 17+.

- 🟢 **Crush** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Fairy Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target_
  - The target becomes Infatuated with the user on 17+.

- 🟢 **Defend Order** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Bug Status · DB — · AC — · EOT · Self_
  - Raise the user's Defense and Special Defense by +1 CS each.

- 🟢 **Detect** — `likely` · P2 (enc, pc) · themes: damage
  - _Fighting Status · DB — · AC — · Scene · Self, Trigger, Interrupt, Shield_
  - If the user is hit by a Move, the user may use Detect. The user is instead not hit by the Move. You do not take any damage nor are you affected by anty of the Move's effects

- 🟢 **Diamond Storm** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Rock Physical · DB 10 · AC 3 · Scene · Close Blast 3, Friendly, Smite_
  - Diamond Storm raises the User's Defense by +1 CS on an Even-Numbered Roll.

- 🟢 **Discharge** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Electric Special · DB 8 · AC 2 · EOT · All Cardinally Adjacent Targets_
  - Discharge Paralyzes all legal targets on 15+.

- 🟢 **Double-Edge** — `likely` · P2 (enc) · themes: plain · code: featureGrantsMoveNames:24303
  - _Normal Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Recoil 1/3_
  - --

- 🟢 **Dragon Dance** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Dragon Status · DB — · AC — · EOT · Self_
  - Raise the user's Attack and Speed by +1 CS.

<a id="verify-moves-03"></a>
## `verify-moves-03` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Drain Punch** — `likely` · P2 (enc) · themes: damage · code: IRON_FIST_MOVES:20729
  - _Fighting Physical · DB 8 · AC 2 · Scene x2 · Melee, 1 Target, Aura_
  - After the target takes damage, the user gains HP equal to half of the damage it dealt to the target.

- 🟢 **Drill Run** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Ground Physical · DB 8 · AC 3 · At-Will · Melee, 1 Target_
  - Drill Run is a Critical Hit on 18+.

- 🟢 **Dual Wingbeat** — `likely` · P2 (enc) · themes: plain · engine: special:doubleStrike, double-strike
  - _Flying Physical · DB 4 · AC 2 · EOT · Melee, 1 Target, Double Strike_
  - --

- 🟢 **Eerie Impulse** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Electric Status · DB — · AC 2 · EOT · 6, 1 Target_
  - Lower the target's Special Attack by -2 CS. *Grants Glow.

- 🟢 **Electroweb** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Electric Special · DB 6 · AC 3 · EOT · 4, Ranged Blast 2_
  - Lower the Speed of all legal targets by -1 CS.

- 🟢 **Endure** — `likely` · P2 (enc, pc) · themes: action
  - _Normal Status · DB — · AC — · Daily · Self, Reaction, Trigger_
  - If the user is hit by a damaging Move, you may use Endure as a Free Action. If the Move would bring Endure's user down to 0 HP or less, Endure's user instead is set to 1 HP.

- 🟢 **Explosion** — `likely` · P2 (enc) · themes: social
  - _Normal Physical · DB 25 · AC 2 · Daily · Burst 2_
  - The user's HP is set to -50% of their full HP. This HP loss cannot be prevented or reduced in any way. The user's loyalty toward its trainer may be lowered.

- 🟢 **Extrasensory** — `likely` · P2 (enc) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Psychic Special · DB 8 · AC 2 · EOT · 5, 1 Target_
  - Extrasensory Flinches the target on 19+.

- 🟢 **Facade** — `likely` · P2 (enc) · themes: damage, stat · engine: special:conditionalDB · code: SPECIAL_FIXED_DAMAGE:21167
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - If the user is afflicted with a Persistent Status Affliction, Facade's Damage Base is doubled to DB 14 (4d10+15 / 40).

- 🟢 **Fake Tears** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Dark Status · DB — · AC 2 · EOT · 8, 1 Target, Social_
  - Lower the target's Special Defense by -2 CS.

- 🟢 **False Swipe** — `likely` · P2 (enc) · themes: damage
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, Pass_
  - False Swipe's damage cannot bring a target lower than 1 HP.

- 🟢 **Feint** — `likely` · P2 (enc, pc) · themes: action
  - _Normal Status · DB — · AC — · Scene · Trigger_
  - If a foe uses a Move with the Shield Keyword in response to one of your actions, you may activate Feint to cause the triggering Move to Fail. Feint is activated as a Free Action.

- 🟢 **Fire Punch** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx · code: IRON_FIST_MOVES:20730
  - _Fire Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - Fire Punch Burns the target on 19+.

- 🟢 **Flare Blitz** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Fire Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Recoil 1/3_
  - Flare Blitz Burns the target on 19+.

- 🟢 **Flash** — `likely` · P2 (enc) · themes: damage · engine: cs · code: playEvolutionFX:1729
  - _Normal Status · DB — · AC 2 · EOT · Cone 2_
  - Lower the Accuracy of all legal targets by -1. *Grants Glow

- 🟢 **Flash Cannon** — `likely` · P2 (enc) · themes: cs · engine: cs, range
  - _Steel Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - Flash Cannon lowers the target's Special Defense by -1 CS on 17+.

- 🟢 **Flying Press** — `likely` · P2 (enc) · themes: damage
  - _Fighting Physical · DB 8 · AC 3 · EOT · Melee, Dash, 1 Target_
  - Flying Press may deal Flying Type damage if the user wishes. NOTE: If Flying Press is Move Sync'd, it only changes the Fighting Type portion of the Move. You can still only choose between that Type and Flying Type; you cannot shift Flying Press to change the Flying part to another Type.

- 🟢 **Focus Blast** — `likely` · P2 (enc) · themes: cs, skill · engine: cs, range
  - _Fighting Special · DB 12 · AC 7 · Scene x2 · 6, 1 Target, Smite, Aura_
  - Focus Blast lowers the target's Special Defense by -1 CS on 18+.

- 🟢 **Force Palm** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Fighting Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Force Palm Paralyzes the target on 18+.

- 🟢 **Foul Play** — `likely` · P2 (enc) · themes: damage, stat
  - _Dark Physical · DB 10 · AC 2 · Scene x2 · Melee, 1 Target_
  - The target reveals its Attack stat. When calculating damage, add the target's Attack stat instead of the user's Attack stat.

- 🟢 **Giga Drain** — `likely` · P2 (enc) · themes: damage
  - _Grass Special · DB 8 · AC 2 · Scene x2 · 6, 1 Target_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Guillotine** — `likely` · P2 (enc) · themes: stat · engine: ohko
  - _Normal Status · DB — · AC — · Daily · Melee, 1 Target, Execute_
  - Roll 1d100. This roll may not be modified in any way. If you roll X or lower, the target Faints. X is equal to 30 + The User's Level - The Target's Level.

- 🟢 **Helping Hand** — `likely` · P2 (enc, pc) · themes: damage
  - _Normal Status · DB — · AC — · EOT · 4, 1 Target, Priority_
  - Helping Hand grants the target +2 on its next Accuracy Roll this round, and +10 to its next Damage Roll this round.

- 🟢 **Horn Leech** — `likely` · P2 (enc) · themes: damage
  - _Grass Physical · DB 8 · AC 2 · Scene x2 · Melee, 1 Target, Dash_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Howl** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · At-Will · Self_
  - Raise the user's Attack by +1 CS.

- 🟢 **Hyper Fang** — `likely` · P2 (enc) · themes: status · engine: range, range-status, range-flinch, status-fx · code: STRONG_JAW_MOVES:20848
  - _Normal Physical · DB 8 · AC 4 · At-Will · Melee, 1 Target_
  - Hyper Fang Flinches the target on 19+.

- 🟢 **Ice Fang** — `likely` · P2 (enc) · themes: status, damage, skill · engine: rand-status · code: STRONG_JAW_MOVES:20847
  - _Ice Physical · DB 7 · AC 3 · At-Will · Melee, 1 Target_
  - Ice Fang Freezes or Flinches on 18-19 during Accuracy Check; flip a coin to determine whether the foe becomes Frozen or Flinched. On 20 during Accuracy Check, the foe is both Frozen and Flinched.

- 🟢 **Ice Punch** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx · code: IRON_FIST_MOVES:20730
  - _Ice Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - Ice Punch Freezes the target on 19+.

- 🟢 **Icicle Spear** — `likely` · P2 (enc, pc) · themes: plain · engine: five-strike
  - _Ice Physical · DB 3 · AC 4 · EOT · 6, 1 Target, Five Strike_
  - --

- 🟢 **Iron Defense** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Steel Status · DB — · AC — · EOT · Self_
  - Raise the user's Defense by +2 CS.

- 🟢 **Iron Head** — `likely` · P2 (enc) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Steel Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Dash_
  - Iron Head Flinches the target on 15+.

- 🟢 **Iron Tail** — `likely` · P2 (enc) · themes: cs · engine: cs, range
  - _Steel Physical · DB 10 · AC 6 · Scene x2 · Melee, 1 Target, Smite_
  - Iron Tail lowers the target's Defense by -1 CS on 19+.

- 🟢 **Laser Focus** — `likely` · P2 (enc) · themes: damage
  - _Normal Status · DB — · AC — · Scene x2 · Self_
  - The next succesful damaging attack made by the user is automatically a Critical Hit.

- 🟢 **Lava Plume** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 8 · AC 2 · EOT · Burst 1_
  - Lava Plume burns all targets on 16+.

- 🟢 **Lock-On** — `likely` · P2 (enc, pc) · themes: damage, skill
  - _Normal Status · DB — · AC — · At-Will · 10, 1 Target_
  - The target is Locked-On. The next Move that the user uses against the Target that requires an Accuracy Check cannot miss. Lock-On's effect, on both the User and Target, can be passed by Baton Pass.

- 🟢 **Magnitude** — `likely` · P2 (enc, pc) · themes: damage, stat · engine: special:dieDB · code: specialMoveInfo:21287
  - _Ground Physical · DB — · AC 2 · EOT · Burst 2, Groundsource_
  - When you use Magnitude, roll 1d6. Magnitude's Damage Base is equal to 5+X, where X is the value of the d6. Magnitude can hit targets that are underground, including those using the Move Dig. *Grants: Groundshaper

- 🟢 **Minimize** — `likely` · P2 (enc) · themes: damage · code: encounterMonCard:33811, encounterTrainerCard:34068
  - _Normal Status · DB — · AC — · Scene · Self_
  - The user gains +4 Evasion, and the user's size is lowered to Small for the remainder of the encounter. *Grants Shrinkable

- 🟢 **Mirror Shot** — `likely` · P2 (enc) · themes: damage · engine: cs, range
  - _Steel Special · DB 7 · AC 5 · EOT · 6, Ranged Blast 2_
  - All Legal Targets have their Accuracy lowered by -2 on 16+.

- 🟢 **Mud Bomb** — `likely` · P2 (enc, pc) · themes: damage · engine: cs, range
  - _Ground Special · DB 7 · AC 4 · At-Will · 6, 1 Target_
  - The target's Accuracy is lowered by -1 on 16+.

- 🟢 **Natural Gift** — `likely` · P2 (enc, pc) · themes: damage · engine: special:valueDB · code: specialMoveInfo:21327
  - _Normal Special · DB — · AC 2 · Scene · 6, 1 Target, Berry_
  - Refer to the Move Keywords Berry list. Natural Gift deals damage according to the Berry list and Natural Gift's Type is also defined there. The Berry's Digestion/Food Buff is nullified and is not used.

- 🟢 **Needle Arm** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Grass Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - Needle Arm Flinches the target on 15+.

- 🟢 **Night Daze** — `likely` · P2 (enc) · themes: damage · engine: range
  - _Dark Special · DB 9 · AC 3 · EOT · 4, 1 Target_
  - Night Daze lowers the target's Accuracy by -1 on 13+.

- 🟢 **Night Slash** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Dark Physical · DB 7 · AC 2 · EOT · Melee, Pass_
  - Night Slash is a Critical Hit on 18+.

- 🟢 **Payback** — `likely` · P2 (enc) · themes: damage, stat · engine: special:conditionalDB
  - _Dark Physical · DB 5 · AC 2 · EOT · Melee, 1 Target_
  - If the target hit the user with a Damaging Move on the previous turn, Payback has a Damage Base of 10 (3d8+10 / 24) instead.

- 🟢 **Pierce!** — `likely` · P2 (enc) · themes: damage · engine: target-rules
  - _Normal Physical · DB 7 · AC 2 · EOT · WR, 1 Target_
  - Pierce deals an additional +10 damage against targets with Damage Reduction.

- 🟢 **Pin Missile** — `likely` · P2 (enc, pc) · themes: plain · engine: five-strike
  - _Bug Physical · DB 3 · AC 4 · EOT · 6, 1 Target, Five Strike_
  - --

- 🟢 **Poison Fang** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, status-fx · code: STRONG_JAW_MOVES:20848
  - _Poison Physical · DB 5 · AC 2 · EOT · Melee, 1 Target_
  - Poison Fang Badly Poisons the target on 17+.

- 🟢 **Poison Jab** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Poison Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - Poison Jab Poisons the target on 15+.

- 🟢 **Poison Tail** — `likely` · P2 (enc, pc) · themes: status, damage · engine: range, range-status, range-crit, status-fx
  - _Poison Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target_
  - Poison Tail is a Critical Hit on 18+ and Poisons the target on 19+.

- 🟢 **Power-Up Punch** — `likely` · P2 (enc) · themes: cs, skill · engine: cs · code: IRON_FIST_MOVES:20731
  - _Fighting Physical · DB 4 · AC 2 · EOT · Melee, 1 Target_
  - If Power-Up Punch successfully hits a target, the user's Attack is raised by +1 Combat Stage

<a id="verify-moves-04"></a>
## `verify-moves-04` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Present** — `likely` · P2 (enc) · themes: damage · engine: special:dieDB · code: specialMoveInfo:21288
  - _Normal Physical · DB — · AC 3 · EOT · 4, 1 Target_
  - Roll 1d6; Present has a DB equal to twice the result. On a result of 1, instead of taking damage the target gains 20 HP.

- 🟢 **Psybeam** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, status-fx
  - _Psychic Special · DB 7 · AC 2 · At-Will · 6, 1 Target_
  - Psybeam Confuses the target on 19+.

- 🟢 **Rage Fist** — `likely` · P2 (enc) · themes: damage, stat · engine: special:conditionalDB · code: openTrainerAttack:8947, openMoveRoll:21685
  - _Ghost Physical · DB 5 · AC 2 · Scene x2 · Melee, 1 Target_
  - If the user has at least 1 Injury when using this Move, its Damage Base gets doubled to DB 10 (3d8+10 / 24). Additionally, if the user is under 50% Max HP, this Move instead becomes DB 12 (3d12+10 / 30) and cannot miss.

- 🟢 **Raging Bull** — `likely` · P2 (enc) · themes: action
  - _Fighting Physical · DB 9 · AC 2 · Scene x2 · Melee, Pass_
  - As a Free Action, the user may change this Move's Type to any Type that the user possesses. Blessings may not be activated in response to this Move.

- 🟢 **Razor Leaf** — `likely` · P2 (enc, pc) · themes: damage · engine: range, range-crit
  - _Grass Physical · DB 6 · AC 4 · At-Will · Cone 2_
  - Razor Leaf is a Critical Hit on 18+.

- 🟢 **Razor Shell** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Water Physical · DB 8 · AC 3 · EOT · Melee, 1 Target, Dash_
  - Razor Shell lowers the target's Defense by -1 CS on an Even-Numbered Roll.

- 🟢 **Return** — `likely` · P2 (enc) · themes: damage, social · engine: special:valueDB · code: specialMoveInfo:21301
  - _Normal Physical · DB — · AC 2 · At-Will · Melee, 1 Target_
  - Return's DB is equal to 3 plus the user's Loyalty Value.

- 🟢 **Rock Polish** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Rock Status · DB — · AC — · EOT · Self_
  - Raise the user's Speed by +2 CS.

- 🟢 **Rock Tomb** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Rock Physical · DB 6 · AC 5 · At-Will · 6, 1 Target_
  - Rock Tomb lowers the target's Speed by -1 CS. *Grants Materializer

- 🟢 **Round** — `likely` · P2 (enc, pc) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21302, featureGrantsMoveNames:24293, mapTokensSave:40474, wallsOverlay:43923, isCombatDurBuff:44428, attachTokenDrag:45723
  - _Normal Special · DB — · AC 2 · EOT · Burst 1, Sonic_
  - Round's Damage Base is equal to 6, plus +2 more for each use of Round by any Trainer or Pokemon this round, up to a maximum of DB 12 (3d12+10 / 30).

- 🟢 **Scary Face** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · EOT · 4, 1 Target, Social_
  - Lower the target's Speed by -2 CS.

- 🟢 **Self-Destruct** — `likely` · P2 (enc) · themes: social
  - _Normal Physical · DB 20 · AC 2 · Daily · Burst 3_
  - The user's HP is set to -50% of its full HP. This HP loss may not be prevented or reduced in any way. The user's loyalty may be lowered.

- 🟢 **Shadow Ball** — `likely` · P2 (enc) · themes: cs · engine: cs, range
  - _Ghost Special · DB 8 · AC 2 · EOT · 8, 1 Target_
  - Shadow Ball lowers the target's Special Defense by -1 CS on 17+.

- 🟢 **Shadow Claw** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Ghost Physical · DB 7 · AC 2 · EOT · Melee, Pass_
  - Shadow Claw is a Critical Hit on 18+.

- 🟢 **Sharpen** — `likely` · P2 (pc) · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · At-Will · Self_
  - Raise the user's Attack by +1 CS.

- 🟢 **Shell Smash** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Normal Status · DB — · AC — · Scene · Self_
  - Raise the user's Attack, Special Attack, and Speed by +2 CS each. Lower the user's Defense and Special Defense by -1 CS each.

- 🟢 **Signal Beam** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Bug Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - Signal Beam Confuses the target on 19+.

- 🟢 **Sludge** — `likely` · P2 (pc) · themes: status · engine: range, range-status, status-fx
  - _Poison Special · DB 7 · AC 2 · EOT · 6, 1 Target_
  - Sludge Poisons the target on 15+.

- 🟢 **Sludge Bomb** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Poison Special · DB 9 · AC 2 · EOT · 8, 1 Target_
  - Sludge Bomb Poisons the target on 15+.

- 🟢 **Snarl** — `likely` · P2 (enc) · themes: cs · engine: cs
  - _Dark Special · DB 6 · AC 3 · EOT · Cone 2, Sonic_
  - Lower the Special Attack of all legal targets by -1 CS.

- 🟢 **Spark** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, status-fx
  - _Electric Physical · DB 6 · AC 2 · EOT · Melee, 1 Target, Dash_
  - Spark Paralyzes the target on 15+.

- 🟢 **Spit Up** — `likely` · P2 (enc, pc) · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21303
  - _Normal Special · DB — · AC 2 · Scene · 4, 1 Target_
  - For each Stockpiled Count the user has, Spit Up's Damage Base is increased by +8. If the user has no Stockpiled count, Spit Up cannot be used.

- 🟢 **Steam Eruption** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Water Special · DB 11 · AC 3 · Scene · Close Blast 3, Smite_
  - Steam Eruption Burns all legal targets on a 15+.

- 🟢 **Steamroller** — `likely` · P2 (enc) · themes: status, damage · engine: range, range-status, range-flinch, status-fx, special:conditionalDB
  - _Bug Physical · DB 7 · AC 2 · EOT · Melee, Pass_
  - Steamroller Flinches the target on 15+. If the target is Small, Steamroller deals an additional +5 Damage.

- 🟢 **Stockpile** — `likely` · P2 (enc, pc) · themes: cs, skill · engine: cs
  - _Normal Status · DB — · AC — · EOT · Self_
  - The user adds 1 to their Stockpiled count to a maximum of 3. For each number a Stockpiled count is above 0, raise the user's Defense and Special Defense by +1 CS each. If a Stockpiled count is set to 0, any Combat Stages gained from the Stockpiled count are removed.

- 🟢 **Stone Axe** — `likely` · P2 (enc) · themes: damage, action · engine: range, range-crit
  - _Rock Physical · DB 7 · AC 4 · EOT · Melee, 1 Target_
  - Stone Axe is a critical hit on an 18+. Once per scene, on a hit, the target may be put in a Vortex.

- 🟢 **Stone Edge** — `likely` · P2 (enc) · themes: damage · engine: range, range-crit
  - _Rock Physical · DB 10 · AC 5 · EOT · 8, 1 Target_
  - Stone Edge is a Critical Hit on 17+.

- 🟢 **Storm Throw** — `likely` · P2 (enc) · themes: damage · engine: always-crit
  - _Fighting Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - If Storm Throw hits, it is a Critical Hit.

- 🟢 **Struggle Bug** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Bug Special · DB 5 · AC 2 · At-Will · Cone 2_
  - Lower the Special Attack of all legal targets by -1 CS.

- 🟢 **Super Fang** — `likely` · P2 (enc) · themes: plain · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21137
  - _Normal Physical · DB — · AC 4 · Scene · Melee, 1 Target_
  - The target loses 1/2 of its current HP.

- 🟢 **Superpower** — `likely` · P2 (enc) · themes: cs, skill · engine: cs · code: RECKLESS_ERRATA_MOVES:20846
  - _Fighting Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash_
  - Superpower lowers the user's Attack and Defense by 1 Combat Stage each.

- 🟢 **Surf** — `likely` · P2 (enc, pc) · themes: action · code: researchTeachMove:29835
  - _Water Special · DB 9 · AC 2 · EOT · Line 6_
  - As a Shift Action, the user may Move to any open square in Surf 's area of effect without provoking any Attacks of Opportunity.

- 🟢 **Take Down** — `likely` · P2 (enc, pc) · themes: action
  - _Normal Physical · DB 9 · AC 5 · EOT · Melee, 1 Target, Dash, Recoil 1/3_
  - You may perform a Trip Maneuver against the target as a Free Action.

- 🟢 **Thunder Fang** — `likely` · P2 (enc) · themes: status · engine: rand-status · code: STRONG_JAW_MOVES:20847
  - _Electric Physical · DB 7 · AC 3 · At-Will · Melee, 1 Target_
  - Thunder Fang Paralyzes or Flinches on 18-19; flip a coin to determine whether the foe becomes Paralyzed or Flinched. On 20, the foe is both Paralyzed and Flinched.

- 🟢 **Thunder Punch** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx · code: IRON_FIST_MOVES:20731
  - _Electric Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - Thunder Punch Paralyzes the target on 19+.

- 🟢 **Thunder Shock** — `likely` · P2 (enc, pc) · themes: status · engine: range, range-status, status-fx · code: ROTOM_POLTERGEIST:19846
  - _Electric Special · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - Thunder Shock Paralyzes the target on 17+. *Grants Zapper

- 🟢 **Thunderbolt** — `likely` · P2 (enc) · themes: status · engine: range, range-status, status-fx
  - _Electric Special · DB 9 · AC 2 · EOT · 4, 1 Target_
  - Thunderbolt Paralyzes the target on 19+.

- 🟢 **Tickle** — `likely` · P2 (enc, pc) · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · EOT · Melee, 1 Target_
  - Lower the target's Attack and Defense by -1 CS each.

- 🟢 **Tri Attack** — `likely` · P2 (enc) · themes: status · engine: range, rand-status
  - _Normal Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - Tri Attack gives the target a Status ailment on 17+. If this effect is triggered, roll 1d3; on 1 the target is Paralyzed; on 2 the target is Burned; on 3 the target is Frozen.

- 🟢 **Trick-or-Treat** — `likely` · P2 (enc) · themes: plain · engine: typemod
  - _Ghost Status · DB — · AC 2 · Daily · 6, 1 Target_
  - The target gains the Ghost Type in addition to its other Types for 5 turns.

- 🟢 **Waterfall** — `likely` · P2 (enc) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Water Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - Waterfall Flinches the target on 17+.

- 🟢 **Work Up** — `likely` · P2 (enc, pc) · themes: cs · engine: cs · code: EDGE_FX:125
  - _Normal Status · DB — · AC — · EOT · Self_
  - Raise the user's Attack and Special Attack by +1 CS each.

- 🟢 **Zen Headbutt** — `likely` · P2 (enc) · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Psychic Physical · DB 8 · AC 4 · EOT · Melee, 1 Target, Dash_
  - Zen Headbutt Flinches the target on 15+.

- 🟢 **Aeroblast** — `likely` · P3 · themes: damage
  - _Flying Special · DB 10 · AC 3 · Daily · Line 6_
  - Aeroblast is a Critical Hit on an Even-Numbered Roll.

- 🟢 **Apple Acid** — `likely` · P3 · themes: cs · engine: cs
  - _Grass Special · DB 8 · AC 2 · EOT · Cone 2_
  - The target's Special Defense is lowered by 1 CS.

- 🟢 **Aqua Cutter** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Water Physical · DB 7 · AC 2 · EOT · 6, 1 Target, Slice_
  - This Move is a Critical Hit on 18+.

- 🟢 **Arcane Fury** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Normal Special · DB 3 · AC 3 · EOT · Cone 2_
  - Arcane Fury's Targets become Vulnerable on 19+.

- 🟢 **Autotomize** — `likely` · P3 · themes: cs, skill · engine: cs, weight
  - _Steel Status · DB — · AC — · EOT · Self_
  - For the remainder of the Encounter, the user's Weight Class is one value lower, to a minimum of 1. If the user can, the user's Speed is raised by +2 Combat Stages.

- 🟢 **Barb Barrage** — `likely` · P3 · themes: status · engine: range, range-status, status-fx, five-strike
  - _Poison Physical · DB 2 · AC 2 · EOT · 6, 1 Target, Five Strike_
  - The target is Poisoned on a 17+. Once a Scene, if Barb Barrage's target has a Status Condition, you may choose to not roll for Five Strike. Instead, treat Barb Barrage as though it automatically rolled an 8 for Five Strike.

- 🟢 **Bash!** — `likely` · P3 · themes: plain · engine: range
  - _Normal Physical · DB 7 · AC 2 · EOT · WR, 1 Target_
  - Bash! lowers the target's Initiative to 0 for 1 full round on 15+.

<a id="verify-moves-05"></a>
## `verify-moves-05` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Beckon** — `likely` · P3 · themes: status, action · engine: range, range-status, status-fx
  - _Ghost Special · DB 12 · AC 2 · Scene x2 · 7, 1 Target, Sonic_
  - The target immediately Shifts towards the user, forfeiting their next Shift Action. This movement does not provoke Attacks of Opportunity. On 17+, the target additionally is Infatuated with the user and Trapped.

- 🟢 **Bitter Blade** — `likely` · P3 · themes: damage
  - _Fire Physical · DB 9 · AC 2 · Scene x2 · Melee, 1 Target, Slice_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Blaze Kick** — `likely` · P3 · themes: status, damage · engine: range, range-status, range-crit, status-fx
  - _Fire Physical · DB 9 · AC 4 · EOT · Melee, 1 Target_
  - Blaze Kick Burns the target on 19+ and is a Critical Hit on 18+.

- 🟢 **Blazing Torque** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - Burns all legal targets on 15+.

- 🟢 **Bleakwind Storm** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Flying Special · DB 10 · AC 5 · Scene · 6, Ranged Blast 3, Smite_
  - The target is Flinched on a 15+ and Frozen on a 19+.

- 🟢 **Blue Flare** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 13 · AC 5 · Scene x2 · 10, 1 Target, Smite_
  - Blue Flare Burns the target on 17+.

- 🟢 **Body Press** — `likely` · P3 · themes: damage, stat
  - _Fighting Physical · DB 8 · AC 2 · Scene x2 · Melee, 1 Target_
  - The user's Defense Stat is added to the damage roll instead of the Attack Stat.

- 🟢 **Bolt Strike** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Electric Physical · DB 13 · AC 5 · Scene x2 · 10, 1 Target, Smite_
  - Bolt Strike Paralyzes the target on 17+.

- 🟢 **Bug Buzz** — `likely` · P3 · themes: cs · engine: cs, range
  - _Bug Special · DB 9 · AC 2 · Scene x2 · Cone 2 or Close Blast 2; Sonic, Smite_
  - Bug Buzz lowers the Special Defense of all legal targets by -1 CS on 19+.

- 🟢 **Bulk Up** — `likely` · P3 · themes: cs · engine: cs · code: EDGE_FX:124
  - _Fighting Status · DB — · AC — · EOT · Self_
  - Raise the user's Attack and Defense by +1 CS each.

- 🟢 **Bullet Punch** — `likely` · P3 · themes: plain · code: IRON_FIST_MOVES:20729
  - _Steel Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- 🟢 **Bullseye** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Normal Physical · DB 6 · AC 2 · EOT · WR, 1 Target_
  - Bullseye is a Critical Hit on 16+.
    Limitation: Ranged Weapons Only

- 🟢 **Butterfly Knife** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21319
  - _Fairy Physical · DB 4 · AC 3 · At-Will · Melee, 1 Target, Dash, Slice_
  - If this Move is used successfully and consecutively on the same target, the Damage Base is increased by +4 to a maximum of 16. For example, the first hit would have a DB of 4; the second hit a DB of 8; the third hit a DB of 12; the fourth and further hits a DB of 16. If this Move misses or fails to damage its target, its Damage Base resets.

- 🟢 **Captivate** — `likely` · P3 · themes: cs · engine: cs
  - _Normal Status · DB — · AC 2 · EOT · Cone 2, Friendly, Social_
  - Captivate lowers the target's Special Attack by -2 CS. Captivate may not affect something that is the same gender as the user or something that is genderless.

- 🟢 **Ceaseless Edge** — `likely` · P3 · themes: damage · engine: range, range-crit, status-fx, status-always
  - _Dark Physical · DB 7 · AC 4 · Scene x2 · Melee, 1 Target_
  - The target is put in a Vortex. Ceaseless Edge is a Critical Hit on a 19+.

- 🟢 **Clanging Scales** — `likely` · P3 · themes: cs, damage, stat · engine: cs
  - _Dragon Special · DB 11 · AC 2 · Scene x2 · 6, 1 Target or Burst 1, Sonic_
  - The user adds half their Defense Stat to Clanging Scale's Damage Roll. After the Move is resolved, the user's Defense is lowered by 1 CS.

- 🟢 **Coil** — `likely` · P3 · themes: cs, damage · engine: cs
  - _Poison Status · DB — · AC — · Scene x2 · Self_
  - Raise the user's Attack and Defense by +1 CS, and the user gains +1 Accuracy.

- 🟢 **Combat Torque** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fighting Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - Paralyzes all legal targets on 15+.

- 🟢 **Cross Chop** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Fighting Physical · DB 10 · AC 4 · Scene x2 · Melee, 1 Target_
  - Cross Chop is a Critical Hit on 16+.

- 🟢 **Cross Poison** — `likely` · P3 · themes: status, damage · engine: range, range-status, range-crit, status-fx
  - _Poison Physical · DB 7 · AC 2 · EOT · Melee, Pass_
  - Cross Poison is a Critical Hit on 18+ and Poisons the target on 19+.

- 🟢 **Crush Claw** — `likely` · P3 · themes: cs · engine: cs
  - _Normal Physical · DB 7 · AC 3 · EOT · Melee, 1 Target, Dash_
  - Crush Claw lowers the target's Defense by -1 CS on Even-Numbered Rolls.

- 🟢 **Cut** — `likely` · P3 · themes: damage · engine: def-pierce · code: openEncDifficulty:34677, MOVE_DEF_PIERCE:42985
  - _Normal Physical · DB 5 · AC 3 · At-Will · Melee, Pass_
  - Cut ignores up to 5 Damage Reduction (Defenses are not Damage Reduction.)

- 🟢 **Deadly Strike** — `likely` · P3 · themes: damage · engine: always-crit
  - _Normal Physical · DB 6 · AC 2 · Scene x2 · WR, 1 Target_
  - If Deadly Strike Hits, it is a Critical Hit.
    Limitation: Not usable by Large Melee Weapons.

- 🟢 **Dire Claw** — `likely` · P3 · themes: status, damage · engine: range, range-crit, rand-status
  - _Poison Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - Dire Claw is a Critical Hit on a 19+. Dire Claw gives the target a Status ailment on a 15+. If this is triggered, roll 1d3; on 1 the target is Poisoned; on 2 the target is Paralyzed; on 3 the target is Flinched.

- 🟢 **Disorient** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Dark Special · DB 5 · AC 2 · At-Will · 6, 1 Target_
  - Confuses the target on 19+.

- 🟢 **Dizzy Punch** — `likely` · P3 · themes: status · engine: range, range-status, status-fx · code: IRON_FIST_MOVES:20729
  - _Normal Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target_
  - Dizzy Punch Confuses the target on 17+.

- 🟢 **Double Iron Bash** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx, special:doubleStrike, double-strike
  - _Steel Physical · DB 6 · AC 2 · Scene x2 · Melee, 1 Target, Double Strike_
  - Double Iron Bash Flinches the targets on 15+.

- 🟢 **Double Swipe** — `likely` · P3 · themes: plain · engine: special:doubleStrike, double-strike · code: LIVING_WEAPON_FORMS:7550
  - _Normal Physical · DB 4 · AC 2 · EOT · WR, 2 Targets; or WR, 1 Target, Double Strike_
  - --

- 🟢 **Draco Meteor** — `likely` · P3 · themes: cs, damage · engine: cs · code: RECKLESS_ERRATA_MOVES:20845
  - _Dragon Special · DB 13 · AC 4 · Scene · 8, Ranged Blast 3, Smite_
  - Lower the user's Special Attack by -2 CS after damage.

- 🟢 **Dragon Cheer** — `likely` · P3 · themes: barrier, damage · engine: blessing
  - _Dragon Status · DB — · AC — · Scene · Blessing_
  - Blessing - Any user affected by this Blessing may activate it when making a successful attack to turn the attack into a Critical Hit against one legal target of their choice. The Blessing may be activated 2 times, then disappears. The first time a Scene a Dragon-Type Pokemon activates this Blessing, that activation does not count towards this limit.

- 🟢 **Dragon Darts** — `likely` · P3 · themes: plain · engine: special:doubleStrike, double-strike
  - _Dragon Physical · DB 5 · AC 2 · EOT · 6, 1 Target, Double Strike; or 6, 2 Targets_
  - --

- 🟢 **Dragon Energy** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21325
  - _Dragon Special · DB 15 · AC 2 · Daily x2 · Cone 3 or Line 8_
  - For each 10% of HP the user is missing, Dragon Energy's Damage Base is reduced by 1.

- 🟢 **Drum Beating** — `likely` · P3 · themes: cs · engine: cs
  - _Grass Physical · DB 8 · AC 2 · EOT · 4, 1 Target_
  - The target's Speed is lowered by 1 CS.

- 🟢 **Energy Blast** — `likely` · P3 · themes: plain · engine: range
  - _Normal Special · DB 4 · AC 3 · EOT · WR, Blast 2_
  - You gain +1 Special Attack on 19+.

- 🟢 **Eruption** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21323
  - _Fire Special · DB 15 · AC 4 · Daily · Burst 1*_
  - For each 10% of HP the user is missing, Eruption's Damage Base is reduced by 1. Eruption creates a 1 meter burst, but also affects an area 10 meters tall straight up.

- 🟢 **Façade** — `likely` · P3 · themes: damage, stat · engine: special:conditionalDB · code: SPECIAL_FIXED_DAMAGE:21167
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - If the user is afflicted with a Persistent Status Affliction, Façade's Damage Base is doubled to DB 14 (4d10+15 / 40).

- 🟢 **Fell Stinger** — `likely` · P3 · themes: cs · engine: cs
  - _Bug Physical · DB 3 · AC 2 · At-Will · Melee, 1 Target_
  - If the user successfully knocks out the target with Fell Stinger, raise the user's Attack by +2 CS.

- 🟢 **Fell Stinger [SM]** — `likely` · P3 · themes: cs · engine: cs
  - _Bug Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target_
  - If the user successfully knocks out the target with Fell Stinger, raise the user's Attack by +2 CS.

- 🟢 **Fiery Dance** — `likely` · P3 · themes: cs, skill · engine: cs
  - _Fire Special · DB 8 · AC 2 · EOT · 4, 1 Target_
  - If Fiery Dance successfully hits a foe, it raises the user's Special Attack by 1 Combat Stage on Even-Numbered Rolls.

- 🟢 **Fiery Wrath** — `likely` · P3 · themes: status, action · engine: range, range-status, range-flinch, status-fx
  - _Dark Special · DB 9 · AC 2 · EOT · 6, 1 Target_
  - : Fiery Wrath Flinches the target on a 17+. Once per Scene, Fiery Wrath may instead be used as a Fire-Type Move.

- 🟢 **Fire Blast** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 11 · AC 4 · Scene x2 · 6, 1 Target, Smite_
  - Fire Blast burns the target on 19+.

- 🟢 **Fire Lash** — `likely` · P3 · themes: cs · engine: cs
  - _Fire Physical · DB 8 · AC 2 · EOT · 2, 1 Target_
  - The target's Defense is lowered by -1 CS.

- 🟢 **Fishious Rend** — `likely` · P3 · themes: damage · engine: special:conditionalDB · code: STRONG_JAW_MOVES:20848
  - _Water Physical · DB 9 · AC 2 · Scene x2 · Melee, 1 Target_
  - Against targets with a lower initiative that have not yet acted this round, Fishious Rend deals +10 damage.

- 🟢 **Fissure** — `likely` · P3 · themes: stat · engine: ohko
  - _Ground Status · DB — · AC — · Daily · 5, 1 Target, Execute, Groundsource_
  - Roll 1d100. This roll may not be modified in any way. If you roll X or lower, the target Faints. X is equal to 30 + The User's Level - The Target's Level. *Grants: Groundshaper

- 🟢 **Flower Trick** — `likely` · P3 · themes: damage · engine: always-crit · code: openMoveRoll:22611
  - _Grass Physical · DB 7 · AC — · Scene x2 · 4, 1 Target_
  - This Move cannot miss. If this Move hits, it is a Critical Hit.

- 🟢 **Flying Press [SM]** — `likely` · P3 · themes: damage
  - _Fighting Physical · DB 10 · AC 3 · EOT · Melee, Dash, 1 Target_
  - Flying Press may deal Flying Type damage if the user wishes. NOTE: If Flying Press is Move Sync'd, it only changes the Fighting Type portion of the Move. You can still only choose between that Type and Flying Type; you cannot shift Flying Press to change the Flying part to another Type.

- 🟢 **Forest's Curse** — `likely` · P3 · themes: plain · engine: typemod
  - _Grass Status · DB — · AC 2 · Daily · 6, 1 Target_
  - The target gains the Grass Type in addition to its other Types for 5 turns.

- 🟢 **Freezing Glare** — `likely` · P3 · themes: status, action · engine: range, range-status, status-fx
  - _Psychic Special · DB 9 · AC 2 · EOT · 6, 1 Target_
  - Freezing Glare Freezes the target on a 19+. Once per Scene, Freezing Glare may instead be used as an Ice-Type Move.

- 🟢 **Frustration** — `likely` · P3 · themes: damage, stat, social · engine: special:valueDB · code: specialMoveInfo:21300
  - _Normal Physical · DB — · AC 2 · At-Will · Melee, 1 Target_
  - Frustration's Damage Base is equal to 9 minus the user's Loyalty Value. Using Frustration may make your Pokemon dislike you.

- 🟢 **Furious Strikes** — `likely` · P3 · themes: damage · engine: five-strike
  - _Normal Physical · DB 3 · AC 2 · Scene x2 · WR, 1 Target, Five Strike_
  - For each hit rolled on your Five Strike roll, the target of the attack has their Evasion reduced by 1 for one full round.
    Limitation: Melee or Short Ranged Weapons Only

<a id="verify-moves-06"></a>
## `verify-moves-06` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Gear Grind** — `likely` · P3 · themes: plain · engine: special:doubleStrike, double-strike
  - _Steel Physical · DB 5 · AC 3 · EOT · Melee, 1 Target, Double Strike_
  - --

- 🟢 **Gouge** — `likely` · P3 · themes: plain · engine: special:doubleStrike, double-strike
  - _Normal Physical · DB 5 · AC 2 · Scene x2 · WR, 1 Target, Double Strike_
  - If both hits of Gouge successfully hit the target, the target gains an Injury.
    Limitation: Small Melee and Short Ranged Weapons Only

- 🟢 **Grass Knot** — `likely` · P3 · themes: damage, stat · engine: weight
  - _Grass Special · DB — · AC 2 · EOT · 5, 1 Target, Weight Class_
  - Grass Knot's Damage Base is equal to twice the target's Weight Class.

- 🟢 **Grav Apple** — `likely` · P3 · themes: cs · engine: cs
  - _Grass Physical · DB 8 · AC 2 · EOT · 6, 1 Target_
  - The target's Defense is lowered by 1 CS.

- 🟢 **Gunk Shot** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Poison Physical · DB 12 · AC 5 · Daily x2 · 6, 1 Target, Smite_
  - Gunk Shot Poisons the target on 15+.

- 🟢 **Heart Stamp** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Psychic Physical · DB 6 · AC 2 · EOT · Melee, 1 Target_
  - Heart Stamp Flinches the target on 15+.

- 🟢 **Heat Crash** — `likely` · P3 · themes: damage, stat · engine: weight
  - _Fire Physical · DB 4 · AC 2 · EOT · Melee, 1 Target, Dash_
  - For each weight class the user is above the target, increase Heavy Crash's damage base by +2.

- 🟢 **Heat Wave** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 10 · AC 4 · Scene x2 · Close Blast 3, Smite_
  - Heat Wave Burns all Legal Targets on 18+.

- 🟢 **Heavy Slam** — `likely` · P3 · themes: damage, stat · engine: weight
  - _Steel Physical · DB 4 · AC 2 · EOT · Melee, 1 Target_
  - For each weight class the user is above the target, increase Heavy Slam's Damage Base by +2.

- 🟢 **Horn Drill** — `likely` · P3 · themes: stat · engine: ohko
  - _Normal Status · DB — · AC — · Daily · Melee, 1 Target, Execute_
  - Roll 1d100. This roll may not be modified in any way. If you roll X or lower, the target Faints. X is equal to 30 + The User's Level - The Target's Level.

- 🟢 **Hyperspace Fury** — `likely` · P3 · themes: cs, skill · engine: cs
  - _Dark Physical · DB 10 · AC 2 · Daily · Burst 2_
  - Interrupts may not be triggered against Hyperspace Fury. The user's Defense is lowered by -1 Combat Stage.

- 🟢 **Ice Hammer** — `likely` · P3 · themes: cs · engine: cs
  - _Ice Physical · DB 10 · AC 4 · EOT · Melee, 1 Target_
  - Lower the user's Speed by -1 CS.

- 🟢 **Icicle Crash** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Ice Physical · DB 8 · AC 4 · EOT · 6, 1 Target_
  - Icicle Crash Flinches the target on 15+.

- 🟢 **Infernal Parade** — `likely` · P3 · themes: status, damage, stat · engine: range, range-status, status-fx, special:conditionalDB
  - _Ghost Special · DB 6 · AC 2 · EOT · 8, Ranged Blast 2_
  - Legal targets hit by Infernal Parade are Burned on a 17+. 
    
    Once a Scene, if at least one of Infernal Parade's targets has a Status Condition, you may have Infernal Parade's Damage Base be 12 instead (3d12+10 / 30).

- 🟢 **Ivy Cudgel** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Grass Physical · DB 10 · AC 2 · EOT · Melee, 1 Target_
  - Ivy Cudgel may be any Type the user currently possesses. Ivy Cudgel is a critical hit on a roll of 18+. 36

- 🟢 **Jaw Lock** — `likely` · P3 · themes: action
  - _Dark Physical · DB 8 · AC 2 · Scene x2 · Melee, 1 Target_
  - You may perform a Grapple Maneuver against the target as a Free Action.

- 🟢 **Judgement** — `likely` · P3 · themes: plain · engine: picks-type
  - _Normal Special · DB 10 · AC 2 · Daily · 6, Ranged Blast 3, Smite_
  - Judgment's Type can be whatever Elemental Type the user wants it to be.

- 🟢 **Last Respects** — `likely` · P3 · themes: status, damage, action · engine: range, range-status, range-flinch
  - _Ghost Physical · DB 10 · AC 2 · EOT · 4, 1 Target_
  - This Move gains additional Effects depending on the number of allies that have Fainted this Scene. These Effects are cumulative. 1: The target is Flinched on 15+. 2: The target is Cursed on 17+. 3: This Move gains Smite. Once per Scene, this Move may Deal damage of a Type of any of the Fainted allies instead of Ghost. This does not affect whether this Move gains STAB or not. 35

- 🟢 **Leaf Blade** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Grass Physical · DB 9 · AC 2 · EOT · Melee, Pass_
  - Leaf Blade is a Critical Hit on 18+.

- 🟢 **Leaf Tornado** — `likely` · P3 · themes: damage · engine: cs, range
  - _Grass Special · DB 7 · AC 4 · EOT · 6, Ranged Blast 3_
  - Small or Medium targets in the central square of the blast are not hit. On 15+, all legal targets have their Accuracy lowered by -1.

- 🟢 **Leech Life [SM]** — `likely` · P3 · themes: damage
  - _Bug Physical · DB 8 · AC 2 · Scene x2 · Melee, 1 Target_
  - After the target takes damage, the user gains HP equal to half of the damage they dealt to the target.

- 🟢 **Liquidation** — `likely` · P3 · themes: cs · engine: cs, range
  - _Water Physical · DB 9 · AC 2 · EOT · Melee, 1 Target_
  - The target's Defense is lowered by -1 CS on 17+.

- 🟢 **Lumina Crash** — `likely` · P3 · themes: cs, skill · engine: cs
  - _Psychic Special · DB 8 · AC 2 · EOT · 6, 1 Target_
  - The target's Special Defense is lowered by -2 Combat Stages.

- 🟢 **Luster Purge** — `likely` · P3 · themes: cs · engine: cs
  - _Psychic Special · DB 7 · AC 2 · Scene x2 · 8, 1 Target_
  - Luster Purge lowers the target's Special Defense by -1 CS on an Even-Numbered Roll.

- 🟢 **Mach Punch** — `likely` · P3 · themes: plain · code: IRON_FIST_MOVES:20730
  - _Fighting Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- 🟢 **Magic Powder** — `likely` · P3 · themes: plain · engine: typemod
  - _Psychic Status · DB — · AC 2 · Daily · 5, 1 Target_
  - The target gains the Psychic Type in addition to its other Types for 5 turns.

- 🟢 **Magical Torque** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fairy Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - Confuses all legal targets on 15+.

- 🟢 **Make It Rain** — `likely` · P3 · themes: cs, action, skill, stat · engine: cs
  - _Steel Special · DB 12 · AC 2 · Scene · Cone 3_
  - The user's Special Attack is lowered by -1 Combat Stage. Once per Day, this Move scatters metal coins equal in value to 1d8 times the user's Level. If it is a trainer battle, the winner gets to pick up the coins.

- 🟢 **Maneuver** — `likely` · P3 · themes: plain · code: openEnchantingGaze:25190
  - _None Category · DB — · AC — · Action · Range_
  - Effects

- 🟢 **Manipulate** — `likely` · P3 · themes: plain · code: BATTLE_ACTIONS:23167
  - _None Status · DB — · AC 2 · Standard · 6, 1 Target_
  - You may perform any of the following Manipulations: Bon Mot, Flirt, or Terrorize. You may use each Manipulation only once each Scene per target. Manipulate can only be performed by Trainers. Input each Manipulation for details.

- 🟢 **Mat Block** — `likely` · P3 · themes: damage
  - _Fighting Status · DB — · AC — · Scene · Self, Trigger, Interrupt, Shield_
  - If the user or an adjacent ally is hit by a damagin attack, the user may use Mat Block. The attack instead does not hit any targets, and it deals no damage and has no effects. You may only use Mat Block during the first round of an encounter

- 🟢 **Matcha Gotcha** — `likely` · P3 · themes: status, damage · engine: range, range-status, status-fx
  - _Grass Special · DB 8 · AC 4 · Scene x2 · Cone 2_
  - After the targets take damage, choose one of the targets, the user gains HP equal to half of the damage they dealt to that target. Matcha Gotcha Burns all Legal Targets on 17+.

- 🟢 **Mega Punch** — `likely` · P3 · themes: plain · code: IRON_FIST_MOVES:20730
  - _Normal Physical · DB 8 · AC 4 · At-Will · Melee, 1 Target_
  - --

- 🟢 **Metal Burst** — `likely` · P3 · themes: damage · engine: special:fixedDamage · code: SPECIAL_FIXED_DAMAGE:21145
  - _Steel Physical · DB — · AC — · Scene · Burst 1_
  - Metal Burst causes all legal targets in the burst to lose HP equal to the total amount of direct Damage the user has taken since the beginning of this Round. Metal Burst cannot miss.

- 🟢 **Meteor Mash** — `likely` · P3 · themes: cs · engine: cs, range · code: IRON_FIST_MOVES:20730
  - _Steel Physical · DB 9 · AC 4 · EOT · Melee, 1 Target, Dash, Spirit Surge_
  - Raise the user's Attack by +1 CS on 15+.

- 🟢 **Mighty Cleave** — `likely` · P3 · themes: damage
  - _Rock Physical · DB 10 · AC 2 · EOT · Melee, 1 Target, Spirit Surge, Slice_
  - The user gains +10 Damage Reduction for 1 full round. Interrupts may not be activated in response to this Move. Steel Moves

- 🟢 **Misty Terrain** — `likely` · P3 · themes: damage · code: TERRAIN_DEFS:1366
  - _Fairy Status · DB — · AC — · Daily x2 · Field_
  - The area becomes Misty for 5 turns, While Misty, all Pokemon and Traners standing on the ground ignore the first turn of all Status Afflictions, and Dragon-type attacks targeting or origination from a grounded Pokemon or Trainer take a -10 Penalty to Damage Rolls.

- 🟢 **Mould** — `likely` · P3 · themes: damage, stat · engine: special:conditionalDB
  - _Grass Special · DB 7 · AC 2 · EOT · 6, 1 Target_
  - Once a Scene, if the target has a Status Affliction, you may have this Move's Damage Base be 13 instead (4d10+10 / 35).

- 🟢 **Mountain Gale** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Ice Physical · DB 10 · AC 5 · EOT · 5, 1 Target_
  - The target is Flinched on a 15+.

- 🟢 **Muddy Water** — `likely` · P3 · themes: damage, action · engine: range
  - _Water Special · DB 9 · AC 5 · EOT · Close Blast 2_
  - As a Shift Action, the user may Move to any open square in Muddy Water's area of effect without provoking any Attacks of Opportunity. On 16+, the Accuracy of all targets is lowered by 1.

- 🟢 **Noxious Torque** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Poison Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - Poisons all targets on 15+.

- 🟢 **Oblivion Wing** — `likely` · P3 · themes: damage
  - _Flying Special · DB 8 · AC 2 · Daily · Melee, 1 Target_
  - The user gains HP equal to Oblivion Wing's Damage Roll.

- 🟢 **Octazooka** — `likely` · P3 · themes: damage
  - _Water Special · DB 7 · AC 3 · At-Will · 6,  1 Target_
  - Octazooka lowers the target's Accuracy by -1 on an Even-Numbered Roll.

- 🟢 **Origin Pulse** — `likely` · P3 · themes: plain · code: MEGA_LAUNCHER_MOVES:20850
  - _Water Special · DB 12 · AC 5 · Scene x2 · Close Blast 3, Smite_
  - --

- 🟢 **Parabolic Charge** — `likely` · P3 · themes: damage
  - _Electric Special · DB 5 · AC 4 · Scene · Cone 2_
  - The user gains HP equal to half of the total damage the user dealt to all legal targets.

- 🟢 **Parabolic Charge [SM]** — `likely` · P3 · themes: damage
  - _Electric Special · DB 7 · AC 2 · Scene · Cone 2_
  - The user gains HP equal to half of the total damage the user dealt to all legal targets.

- 🟢 **Pay Day** — `likely` · P3 · themes: stat
  - _Normal Physical · DB 4 · AC 2 · Daily · Cone 2_
  - Pay Day scatters metal coins equal in value to 1d8 times the user's level. If it is a trainer battle, the winner of the battle gets to pick up the coins.

- 🟢 **Play Rough** — `likely` · P3 · themes: cs · engine: cs, range
  - _Fairy Physical · DB 9 · AC 4 · EOT · Melee, 1 Target_
  - Play Rough lowers the target's Attack by -1 CS on 17+.

- 🟢 **Psycho Boost** — `likely` · P3 · themes: cs, damage, skill · engine: cs · code: RECKLESS_ERRATA_MOVES:20845
  - _Psychic Special · DB 14 · AC 4 · Scene · 8, Ranged Blast 3, Smite_
  - Lower the user's Special Attack by -2 Combat Stages after damage is resolved.

- 🟢 **Psycho Cut** — `likely` · P3 · themes: damage · engine: range, range-crit
  - _Psychic Physical · DB 7 · AC 2 · EOT · 6, 1 Target_
  - Psycho Cut is a Critical Hit on 18+.

<a id="verify-moves-07"></a>
## `verify-moves-07` — Verify moves the scan thinks are handled

P9 · 50 open of 50 · open

- 🟢 **Pyro Ball** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Physical · DB 12 · AC 4 · Scene x2 · 6, 1 Target, Smite_
  - The target is Burned on 19+.

- 🟢 **Quiver Dance** — `likely` · P3 · themes: cs · engine: cs
  - _Bug Status · DB — · AC — · Scene x2 · Self_
  - Raise the user's Special Attack, Special Defense, and Speed by +1 CS each.

- 🟢 **Raging Fury** — `likely` · P3 · themes: status · engine: range, range-status, status-fx, status-always, status-self
  - _Fire Special · DB 9 · AC 2 · Scene x2 · Burst 1, Spirit Surge_
  - The user becomes Enraged. Legal targets become Enraged on a 16+.

- 🟢 **Relic Song** — `likely` · P3 · themes: status, action, stat · engine: range, range-status, status-fx
  - _Normal Special · DB 8 · AC 2 · Scene · Burst 3, Friendly, Sonic_
  - All legal targets fall Asleep on 16+. As long as Meloetta knows Relic Song, it may change between Aria Form and Step Form as a Swift Action when using Relic Song or as a Standard Action otherwise. Both Aria and Step Form must be statted with the same HP Stat.

- 🟢 **Revelation Dance** — `likely` · P3 · themes: damage
  - _Normal Special · DB 9 · AC 2 · EOT · 6, 1 Target_
  - Revelation Dance is the same Type as the user's primary Type (aka the first one in its Pokedex listing). Revelation Dance deals +5 Bonus Damage for every other Dance Move used by the user this round, to a maximum of +15.

- 🟢 **Reversal** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21315
  - _Fighting Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - For each Injury the user has, Reversal's Damage Base is increased by +1.

- 🟢 **Rock Blast** — `likely` · P3 · themes: plain · engine: five-strike
  - _Rock Physical · DB 3 · AC 5 · EOT · 6, 1 Target, Five Strike_
  - *Grants Materializer

- 🟢 **Rock Climb** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Normal Physical · DB 8 · AC 5 · At-Will · Melee, 1 Target, Dash_
  - Rock Climb Confuses the target on 17+.

- 🟢 **Rolling Kick** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Fighting Physical · DB 6 · AC 4 · At-Will · Melee, 1 Target_
  - Rolling Kick Flinches the target on 15+.

- 🟢 **Sandstorm Sear** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Ground Special · DB 10 · AC 5 · Scene · 6, Ranged Blast 3, Smite_
  - The target is Burned on a 15+

- 🟢 **Scald** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Water Special · DB 8 · AC 2 · Scene x2 · 5, 1 Target_
  - Scald Burns the target on 15+.

- 🟢 **Scale Shot** — `likely` · P3 · themes: cs · engine: cs, five-strike
  - _Dragon Physical · DB 3 · AC 4 · EOT · 6, 1 Target, Five Strike_
  - The user's Speed is raised 1 CS, and the user's Defense is lowered 1 CS.

- 🟢 **Scorching Sands** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Ground Special · DB 7 · AC 2 · Scene x2 · 5, 1 Target_
  - Scorching Sands Burns the target on 15+.

- 🟢 **Searing Shot** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fire Special · DB 10 · AC 2 · EOT · Burst 1_
  - Searing Shot Burns all targets on 15+.

- 🟢 **Secret Force** — `likely` · P3 · themes: damage
  - _Normal Special · DB 4 · AC 4 · EOT · Melee, 1 Target, Smite_
  - When calculating damage, the target subtracts their Defense from Secret Force's damage instead of their Special Defense. Secret Force is still otherwise Special.
    Limitation: Melee Weapons Only

- 🟢 **Secret Power** — `likely` · P3 · themes: plain · engine: range
  - _Normal Special · DB 7 · AC 2 · At-Will · 4, 1 Target, Environ_
  - Secret Power's effect depends on Environ. Secret Power's effect activates on 17+.

- 🟢 **Shell Side Arm** — `likely` · P3 · themes: status, stat · engine: range, range-status, status-fx
  - _Poison Special · DB 9 · AC 2 · EOT · 6, 1 Target_
  - This attack uses the highest of the user's Attack or Special Attack Stat, though this does not change the Class of the Move. In addition, if the target's Defense is lower than its Special Defense, this attack targets Defense, becoming a Physical Move. The target is poisoned on a 17+.

- 🟢 **Shift Gear** — `likely` · P3 · themes: cs · engine: cs
  - _Steel Status · DB — · AC — · Scene x2 · Self_
  - Raise the user's Attack by +1 CS and Speed by +2 CS.

- 🟢 **Silver Wind** — `likely` · P3 · themes: cs, stat · engine: cs, range
  - _Bug Special · DB 6 · AC 2 · At-Will · 6, 1 Target, Spirit Surge_
  - Silver Wind raises each of the user's stats by +1 CS on 19+.

- 🟢 **Sludge Wave** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Poison Special · DB 10 · AC 2 · Scene x2 · Burst 1 or Close Blast 2_
  - Sludge Wave Poisons all legal targets on 19+.

- 🟢 **Snore** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Normal Special · DB 5 · AC 2 · EOT · Burst 1, Sonic_
  - Snore Flinches all legal targets on 15+. Snore may only be used by Sleeping users.

- 🟢 **Soak** — `likely` · P3 · themes: plain · engine: typemod
  - _Water Status · DB — · AC 2 · Daily · 5, 1 Target_
  - The target gains the Water type in addition to its other Types for 5 turns.

- 🟢 **Spacial Rend** — `likely` · P3 · themes: damage
  - _Dragon Special · DB 10 · AC 3 · Daily x2 · 10, 1 Target_
  - Spacial Rend is a Critical Hit on Even-Numbered Rolls.

- 🟢 **Spike Cannon** — `likely` · P3 · themes: plain · engine: five-strike
  - _Normal Physical · DB 3 · AC 4 · EOT · 6, 1 Target, Five Strike_
  - --

- 🟢 **Spirit Lance** — `likely` · P3 · themes: damage
  - _Normal Special · DB 6 · AC 2 · Scene x2 · Line 6_
  - Spirit Lance deals +3 damage to all targets for each target beyond the first that it successfully hits.

- 🟢 **Springtide Storm** — `likely` · P3 · themes: cs, stat · engine: cs, range
  - _Fairy Special · DB 10 · AC 5 · Scene · 6, Ranged Blast 3, Smite_
  - If the user is not in Therian Forme, the user has each of its stats raised by +1 CS on a 16+. If the user is in Therian Form, the target has each of its stats lowered by -1 CS on a 16+.

- 🟢 **Sprint** — `likely` · P3 · themes: plain · code: typeAbilityRow:3277, ABILITY_CAP_GRANTS:19199, BATTLE_ACTIONS:23177
  - _None Status · DB — · AC — · Standard · Self_
  - Increase your Movement Speeds by 50% for the rest of your turn.

- 🟢 **Steel Wing** — `likely` · P3 · themes: cs · engine: cs, range
  - _Steel Physical · DB 7 · AC 3 · At-Will · Melee, Pass, Spirit Surge_
  - Steel Wing raises the user's Defense by +1 CS on 15+.

- 🟢 **Strange Steam** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Fairy Special · DB 9 · AC 3 · Scene x2 · Burst 1_
  - The target is confused on 17+.

- 🟢 **Struggle** — `likely` · P3 · themes: plain · code: addSpeciesKey:4176, bossOnLastBar:4583, defenseTypeMods:6411, struggleMove:19464, BATTLE_ACTIONS:23163, simAttacks:36957, tokenDamageBreakdown:45851, openTokenMenu:46896
  - _Normal Physical · DB 4 · AC 4 · At-Will · Melee, 1 Target_
  - --

- 🟢 **Struggle+** — `likely` · P3 · themes: plain · code: addSpeciesKey:4176, struggleMove:19464
  - _Normal Physical · DB 5 · AC 3 · At-Will · Melee, 1 Target_
  - --

- 🟢 **Submission** — `likely` · P3 · themes: status, damage · engine: range, range-status, status-fx
  - _Fighting Physical · DB 8 · AC 6 · At-Will · Melee, 1 Target, Recoil 1/3_
  - On an accuracy roll of 15+, the target is Tripped.

- 🟢 **Surging Strikes** — `likely` · P3 · themes: damage · engine: special:valueDB, always-crit · code: specialMoveInfo:21310
  - _Water Physical · DB 3 · AC 2 · EOT · Melee, 1 Target_
  - If Surging Strikes hits, it is a Critical Hit. After attacking with Surging Strikes, hit or miss, the user may Shift 2m, ignoring Attacks of Opportunity from their target. It may then make an additional attack with this Move on a different target. This effect may be repeated a second time, the third attack targeting a creature that has not yet been targeted by either prior attack. Before making each attack roll, the user can elect to give up triggering all remaining additional shifts and attacks. Surging Strikes gains +3 DB for each attack that is given up.

- 🟢 **Sweeping Strike** — `likely` · P3 · themes: action
  - _Normal Physical · DB 9 · AC 3 · Scene x2 · WR, 1 Target_
  - You may attempt a Trip Maneuver against the target as a free action.
    Limitation: Short-Range Weapons or Weapons with the Reach Quality Only

- 🟢 **Tail Glow** — `likely` · P3 · themes: cs · engine: cs
  - _Bug Status · DB — · AC — · Scene · Self_
  - Raise the user's Special Attack by +3 CS. *Grants Glow

- 🟢 **Tail Slap** — `likely` · P3 · themes: plain · engine: five-strike
  - _Normal Physical · DB 3 · AC 4 · EOT · Melee, 1 Target, Five Strike_
  - --

- 🟢 **Tailwind** — `likely` · P3 · themes: plain · engine: blessing
  - _Flying Status · DB — · AC — · Scene · Blessing_
  - For the remainder of the encounter, all allied trainers and Pokemon gain +5 to their Initiative. Multiple instances of Tailwind cannot stack. *Grants: Guster

- 🟢 **Temper Flare** — `likely` · P3 · themes: damage
  - _Fire Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - If the user's last attack failed or missed, this Move is DB 15 (4d10+10 / 45) instead.

- 🟢 **Triple Dive** — `likely` · P3 · themes: damage, skill
  - _Water Physical · DB 6 · AC 3 · EOT · Melee, 1 Target_
  - After attacking, hit or miss, the user may Disengage 2 meters and attack a different target with this Move. This effect may be repeated a second time, targeting a creature that has not been targeted by either prior attack. Before making each Accuracy Check, the user can elect to give up triggering all remaining additional Shifts and attacks. This Move gains +5 to its damage roll for each attack that is given up. 45

- 🟢 **Triple Kick** — `likely` · P3 · themes: damage · engine: special:tripleKick · code: specialMoveInfo:21283
  - _Fighting Physical · DB — · AC 3 · At-Will · Melee, 1 Target_
  - Make three attacks with Triple Kick. If you hit once, Triple Kick has a DB of 1. If you hit two times, Triple Kick has a DB of 3. If you hit three times, Triple Kick has a DB of 6.

- 🟢 **Trop Kick** — `likely` · P3 · themes: damage
  - _Grass Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - The target receives a -5 penalty to damage rolls for 1 round.

- 🟢 **Trump Card** — `likely` · P3 · themes: damage · engine: special:valueDB · code: specialMoveInfo:21304
  - _Normal Special · DB 6 · AC 2 · EOT · 6, 1 Target_
  - Whenever the user uses Trump Card, the user gains a Trump Count after the attack is resolved. Trump Card's DB is increased by +2 for each Trump Count.

- 🟢 **Twineedle** — `likely` · P3 · themes: status · engine: range, range-status, status-fx, special:doubleStrike, double-strike
  - _Bug Physical · DB 3 · AC 3 · At-Will · Melee, 1 Target, Doublestrike_
  - Twineedle Poisons the target on 18+.

- 🟢 **V-Create** — `likely` · P3 · themes: cs · engine: cs · code: RECKLESS_ERRATA_MOVES:20846
  - _Fire Physical · DB 18 · AC 5 · Daily · Melee, 1 Target, Smite_
  - Lowers the user's Defense, Special Defense, and Speed by -1 CS each.

- 🟢 **Volt Tackle** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Electric Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Recoil 1/3_
  - Volt Tackle Paralyzes the target on 19+.

- 🟢 **Water Shuriken** — `likely` · P3 · themes: plain · engine: five-strike
  - _Water Physical · DB 2 · AC 2 · EOT · 6, 1 Target, Five Strike, Priority_
  - --

- 🟢 **Water Shuriken [SM]** — `likely` · P3 · themes: plain · engine: five-strike
  - _Water Special · DB 2 · AC 2 · EOT · 6, 1 Target, Five Strike, Priority_
  - --

- 🟢 **Water Spout** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21324
  - _Water Special · DB 15 · AC 4 · Daily · Burst 1*_
  - For each 10% of HP the user is missing, Water Spout's Damage Base is reduced by -1. Water Spout creates a 1 meter burst, but also affects an area 10 meters tall straight up.

- 🟢 **Wave Dash** — `likely` · P3 · themes: action
  - _Water Physical · DB 5 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - The user may make the Disengage Maneuver as a Free Action either right before or after using this Move.

- 🟢 **Wear Down** — `likely` · P3 · themes: cs, skill · engine: cs
  - _Normal Physical · DB 5 · AC 2 · EOT · WR, 1 Target_
  - Wear Down lowers the target's Defense by 1 Combat Stage on Even-Numbered Rolls.

<a id="verify-moves-08"></a>
## `verify-moves-08` — Verify moves the scan thinks are handled

P9 · 4 open of 4 · open

- 🟢 **Wicked Torque** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Dark Physical · DB 10 · AC 2 · Scene x2 · Melee, Dash, Pass_
  - All legal targets fall Asleep on 18+.

- 🟢 **Wildbolt Storm** — `likely` · P3 · themes: status · engine: range, range-status, status-fx
  - _Electric Special · DB 10 · AC 5 · Scene · 6, Ranged Blast 3, Smite_
  - The Target is Paralyzed on a 15+

- 🟢 **Wring Out** — `likely` · P3 · themes: damage, stat · engine: special:valueDB · code: specialMoveInfo:21317
  - _Normal Special · DB 12 · AC 2 · Scene x2 · Melee, 1 Target_
  - For every 10% the target is below their full HP, Wring Out's Damage Base is reduced by -1.

- 🟢 **Zing Zap** — `likely` · P3 · themes: status · engine: range, range-status, range-flinch, status-fx
  - _Electric Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - Zing Zap Flinches the target on 15+.

<a id="late-verify-moves-01"></a>
## `late-verify-moves-01` — Verify moves the scan thinks are handled

P9 · 7 open of 7 · open

- 🟢 **Fire Spin** — `likely` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: plain · engine: status-fx, status-always
  - _Fire Special · DB 4 · AC 4 · Scene x2 · 3, 1 Target_
  - The target is put in a Vortex. *Grants: Firestarter

- 🟢 **Sand Tomb** — `likely` · P1 (enc, player:Lázaro) · themes: plain · engine: status-fx, status-always
  - _Ground Physical · DB 4 · AC 4 · Scene x2 · 5, 1 Target_
  - The target is put in a Vortex.

- 🟢 **Infestation** — `likely` · P2 (enc, pc) · themes: plain · engine: status-fx, status-always
  - _Bug Special · DB 4 · AC 4 · Scene x2 · 3, 1 Target_
  - The target is put in a Vortex.

- 🟢 **Magma Storm** — `likely` · P2 (enc) · themes: plain · engine: status-fx, status-always
  - _Fire Special · DB 10 · AC 6 · Scene · 6, 1 Target_
  - The target is put in a Vortex; this effect occurs even if Magma Storm misses its target.

- 🟢 **Whirlpool** — `likely` · P2 (enc, pc) · themes: plain · engine: status-fx, status-always
  - _Water Special · DB 4 · AC 4 · Scene x2 · 3, 1 Target_
  - The target is put in a Vortex.

- 🟢 **Energy Vortex** — `likely` · P3 · themes: plain · engine: status-fx, status-always
  - _Normal Special · DB 2 · AC 4 · Scene x2 · WR, 1 Target_
  - The target is put in a Vortex.

- 🟢 **Roar of Time** — `likely` · P3 · themes: plain · engine: status-fx, status-always
  - _Dragon Special · DB 15 · AC 4 · Daily x2 · Burst 8, Smite, Exhaust_
  - Roar of Time Slows all legal targets, even if the attack misses.

## Not in any batch

Confirmed, flavour-only or skipped. Spot-check the ⚪ manual ones — they are a heuristic guess that the text has no mechanics.

- ✅ **Accelerock** — `auto` · P3 · themes: plain
  - _Rock Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- ✅ **Aqua Jet** — `auto` · P1 (enc, pc, player:Handels) · themes: plain
  - _Water Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- ✅ **Aqua Tail** — `auto` · P2 (enc) · themes: plain
  - _Water Physical · DB 9 · AC 4 · EOT · Melee, Pass_
  - --

- ✅ **Assist** — `auto` · P3 · themes: plain
  - _Normal Status · DB — · AC — · Scene x2 · Self_
  - Randomly select another Pokemon on the user's roster and then randomly select a Move that Pokemon knows. Assist's user uses that Move immediately.

- ✅ **Backswing** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 7 · AC 2 · EOT · Melee, 2 Targets_
  - Limitation: Large Melee Weapons Only

- ✅ **Belch** — `auto` · P3 · themes: plain
  - _Poison Special · DB 12 · AC 4 · Scene x2 · Cone 2_
  - Belch cannot be used if the user has not traded in a Digestion/Food Buff during this Scene.

- ✅ **Blast Burn** — `auto` · P3 · themes: plain
  - _Fire Special · DB 15 · AC 4 · Daily x2 · Close Blast 3, Smite, Exhaust_
  - --

- ✅ **Boomburst** — `auto` · P2 (enc) · themes: plain
  - _Normal Special · DB 14 · AC 2 · Scene · Burst 1, Sonic_
  - --

- ✅ **Branch Poke** — `auto` · P2 (pc) · themes: plain
  - _Grass Physical · DB 4 · AC 2 · At-Will · 2, 1 Target_
  - --

- ✅ **Brutal Swing** — `auto` · P2 (enc) · themes: plain
  - _Dark Physical · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Cheap Shot** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 5 · AC 2 · EOT · WR, 1 Target_
  - Cheap Shot cannot miss.
    Limitation: Small Melee and Short Ranged Weapons Only

- ✅ **Dazzling Gleam** — `auto` · P1 (enc, player:Lysgd) · themes: plain
  - _Fairy Special · DB 8 · AC 2 · EOT · Cone 2_
  - --

- ✅ **Disarming Voice** — `auto` · P1 (enc, pc, player:Lysgd) · themes: plain
  - _Fairy Special · DB 4 · AC — · At-Will · Burst 1_
  - Disarming Voice cannot miss.

- ✅ **Draco Jet** — `auto` · P3 · themes: plain
  - _Dragon Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - None

- ✅ **Dragon Claw** — `auto` · P2 (enc) · themes: plain
  - _Dragon Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target_
  - --

- ✅ **Dragon Hammer** — `auto` · P3 · themes: plain
  - _Dragon Physical · DB 9 · AC 2 · EOT · Melee, 1 Target or Line 3_
  - --

- ✅ **Drill Peck** — `auto` · P3 · themes: plain
  - _Flying Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - --

- ✅ **EW Adept** — `auto` · P3 · themes: plain
  - _-- -- · DB — · AC — · -- · --_
  - --

- ✅ **EW Expert** — `auto` · P3 · themes: plain
  - _-- -- · DB — · AC — · -- · --_
  - --

- ✅ **Earthquake** — `auto` · P2 (enc) · themes: plain
  - _Ground Physical · DB 10 · AC 2 · Scene · Burst 3, Groundsource_
  - Earthquake can hit targets that are underground, including those using the Move Dig. *Grants Groundshaper

- ✅ **Egg Bomb** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 10 · AC 6 · Scene x2 · 5, Blast 2_
  - --

- ✅ **Embargo** — `auto` · P3 · themes: plain
  - _Dark Status · DB — · AC 2 · At-Will · 6, 1 Target_
  - The target cannot use or benefit from held items for the remainder of the encounter. Embargo may only affect one target at a time; if Embargo is used on a new target, the previous target is freed from the effect.

- ✅ **Eternabeam** — `auto` · P3 · themes: plain
  - _Dragon Special · DB 16 · AC 4 · Scene · Line 6, Smite, Exhaust_
  - --

- ✅ **Extreme Speed** — `auto` · P1 (enc, player:Lysgd) · themes: plain
  - _Normal Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Dash, Priority_
  - --

- ✅ **Fairy Wind** — `auto` · P2 (enc) · themes: plain
  - _Fairy Special · DB 4 · AC 2 · At-Will · 6, 1 Target_
  - --

- ✅ **False Surrender** — `auto` · P3 · themes: plain
  - _Dark Physical · DB 8 · AC — · EOT · Melee, 1 Target_
  - False Surrender cannot Miss.

- ✅ **Feint Attack** — `auto` · P1 (enc, pc, player:Lysgd) · themes: plain
  - _Dark Physical · DB 6 · AC — · EOT · Melee, 1 Target_
  - Feint Attack Cannot Miss.

- ✅ **Frenzy Plant** — `auto` · P2 (enc) · themes: plain
  - _Grass Special · DB 15 · AC 4 · Daily x2 · 3, 5 Targets, Smite, Exhaust_
  - --

- ✅ **Giga Impact** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 15 · AC 4 · Daily x2 · Melee, 1 Target, Dash, Exhaust, Smite_
  - --

- ✅ **Hidden Power Bug** — `auto` · P3 · themes: plain
  - _Bug Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Dark** — `auto` · P3 · themes: plain
  - _Dark Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Dragon** — `auto` · P3 · themes: plain
  - _Dragon Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Electric** — `auto` · P3 · themes: plain
  - _Electric Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Fairy** — `auto` · P3 · themes: plain
  - _Fairy Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Fighting** — `auto` · P3 · themes: plain
  - _Fighting Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Fire** — `auto` · P3 · themes: plain
  - _Fire Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Flying** — `auto` · P3 · themes: plain
  - _Flying Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Ghost** — `auto` · P3 · themes: plain
  - _Ghost Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Grass** — `auto` · P3 · themes: plain
  - _Grass Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Ground** — `auto` · P3 · themes: plain
  - _Ground Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Ice** — `auto` · P3 · themes: plain
  - _Ice Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Poison** — `auto` · P3 · themes: plain
  - _Poison Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Psychic** — `auto` · P3 · themes: plain
  - _Psychic Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Rock** — `auto` · P3 · themes: plain
  - _Rock Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Steel** — `auto` · P3 · themes: plain
  - _Steel Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Hidden Power Water** — `auto` · P3 · themes: plain
  - _Water Special · DB 6 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Horn Attack** — `auto` · P2 (enc, pc) · themes: plain
  - _Normal Physical · DB 7 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - --

- ✅ **Hydro Cannon** — `auto` · P3 · themes: plain
  - _Water Special · DB 15 · AC 4 · Daily x2 · Line 9, Smite, Exhaust_
  - --

- ✅ **Hyper Beam** — `auto` · P2 (enc) · themes: plain
  - _Normal Special · DB 15 · AC 4 · Daily x2 · 10, 1 Target, Exhaust, Smite_
  - --

- ✅ **Hyper Drill** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 10 · AC 2 · Scene · Melee, Pass, Smite_
  - Blessings or Moves with the Shield keyword may not be activated in response to this Move.

- ✅ **Ice Shard** — `auto` · P1 (enc, pc, player:Handels) · themes: plain
  - _Ice Physical · DB 4 · AC 2 · At-Will · 4, 1 Target, Priority_
  - --

- ✅ **Ion Deluge** — `auto` · P3 · themes: plain
  - _Electric Status · DB — · AC — · Scene · 5, Ranged Blast 3, Interrupt_
  - An ion cloud is dispersed in the targeted area. All Normal-Type Moves targeting into or originating from the area become Electric-Type Moves.

- ✅ **Jet Punch** — `auto` · P3 · themes: plain
  - _Water Physical · DB 6 · AC 2 · EOT · Melee, 1 Target, Dash, Priority_
  - None

- ✅ **Knock Off** — `auto` · P2 (enc, pc) · themes: plain
  - _Dark Physical · DB 7 · AC 2 · Scene · Melee, 1 Target_
  - Choose one of the target's Held Items or Accessory Slot Items. It is knocked to the ground.

- ✅ **Kowtow Cleave** — `auto` · P3 · themes: plain
  - _Dark Physical · DB 9 · AC — · EOT · Melee, 1 Target, Slice_
  - This Move cannot miss.

- ✅ **Land's Wrath** — `auto` · P3 · themes: plain
  - _Ground Physical · DB 9 · AC 2 · Scene x2 · Burst 5, Friendly, Groundsource_
  - *Grants: Groundshaper

- ✅ **Leafage** — `auto` · P1 (pc, player:Handels) · themes: plain
  - _Grass Physical · DB 4 · AC 2 · At-Will · 6, 1 Target_
  - --

- ✅ **Light of Ruin** — `auto` · P3 · themes: plain
  - _Fairy Special · DB 14 · AC 4 · Scene · 8, Ranged Blast 3, Smite, Recoil 1/2_
  - --

- ✅ **MH Adept** — `auto` · P3 · themes: plain
  - _-- -- · DB — · AC — · -- · --_
  - --

- ✅ **MH Expert** — `auto` · P3 · themes: plain
  - _-- -- · DB — · AC — · -- · --_
  - --

- ✅ **Magic Burst** — `auto` · P3 · themes: plain
  - _Normal Special · DB 6 · AC 2 · Scene x2 · Burst 1, Friendly_
  - Foes hit by Magic Burst can't make Attacks of Opportunity for 1 full round.
    Limitation: Melee Weapons Only

- ✅ **Magical Leaf** — `auto` · P2 (enc, pc) · themes: plain
  - _Grass Special · DB 6 · AC — · EOT · 8, 1 Target_
  - Magical Leaf cannot miss.

- ✅ **Magnet Bomb** — `auto` · P1 (player:Lázaro) · themes: plain
  - _Steel Physical · DB 6 · AC — · EOT · 8, 1 Target_
  - Magnet Bomb cannot miss. *Grants Magnetic

- ✅ **Meteor Assault** — `auto` · P2 (enc) · themes: plain
  - _Fighting Physical · DB 15 · AC 2 · Daily x2 · Burst 1, Smite, Exhaust_
  - --

- ✅ **Nature Power** — `auto` · P3 · themes: plain
  - _Normal Status · DB — · AC — · EOT · See Effect_
  - Nature Power uses a Move defined by the Environ keyword.

- ✅ **OH Adept** — `auto` · P3 · themes: plain
  - _-- -- · DB — · AC — · -- · --_
  - --

- ✅ **Overdrive** — `auto` · P3 · themes: plain
  - _Electric Special · DB 8 · AC 2 · EOT · Cone 2, Sonic_
  - --

- ✅ **Peck** — `auto` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: plain
  - _Flying Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target_
  - --

- ✅ **Petal Blizzard** — `auto` · P3 · themes: plain
  - _Grass Physical · DB 9 · AC 2 · EOT · Burst 1_
  - --

- ✅ **Pound** — `auto` · P1 (enc, pc, player:Lysgd) · themes: plain
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target_
  - --

- ✅ **Power Gem** — `auto` · P1 (enc, player:Lysgd) · themes: plain
  - _Rock Special · DB 8 · AC 2 · At-Will · 6, 1 Target_
  - --

- ✅ **Power Whip** — `auto` · P3 · themes: plain
  - _Grass Physical · DB 12 · AC 5 · Scene x2 · 8, 1 Target, Smite_
  - *Grants: Threaded

- ✅ **Precipice Blades** — `auto` · P3 · themes: plain
  - _Ground Physical · DB 12 · AC 5 · Scene x2 · Burst 1, Smite_
  - --

- ✅ **Prismatic Laser** — `auto` · P3 · themes: plain
  - _Psychic Special · DB 16 · AC 4 · Daily x2 · Line 8, Smite, Exhaust_
  - --

- ✅ **Psyshield Bash** — `auto` · P3 · themes: plain
  - _Psychic Physical · DB 7 · AC 4 · EOT · Melee, 1 Target_
  - The user gains +5 DR for one full round.

- ✅ **Quash** — `auto` · P2 (pc) · themes: plain
  - _Dark Status · DB — · AC 2 · At-Will · 10, 1 Target, Social_
  - Change the target's Initiative to 0 for the remainder of the round.

- ✅ **Quick Attack** — `auto` · P1 (enc, pc, player:Lysgd) · themes: plain
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- ✅ **Rock Throw** — `auto` · P1 (enc, pc, player:Handels) · themes: plain
  - _Rock Physical · DB 5 · AC 4 · At-Will · 6, 1 Target_
  - --

- ✅ **Rock Wrecker** — `auto` · P3 · themes: plain
  - _Rock Physical · DB 15 · AC 4 · Daily x2 · Melee, 1 Target, Dash, Exhaust, Smite_
  - *Grants Materializer

- ✅ **Sacred Sword** — `auto` · P3 · themes: plain
  - _Fighting Physical · DB 8 · AC — · EOT · Melee, 1 Target_
  - Sacred Sword cannot miss.

- ✅ **Salvo** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 6 · AC 2 · EOT · WR, Blast 2_
  - Limitation: Ranged Weapons Only

- ✅ **Scratch** — `auto` · P1 (enc, pc, player:Lázaro) · themes: plain
  - _Normal Physical · DB 4 · AC 2 · At-Will · Melee, Pass_
  - --

- ✅ **Seed Bomb** — `auto` · P2 (enc) · themes: plain
  - _Grass Physical · DB 8 · AC 2 · At-Will · 8, 1 Target_
  - --

- ✅ **Shadow Sneak** — `auto` · P1 (enc, pc, player:Lázaro) · themes: plain
  - _Ghost Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - --

- ✅ **Shock Wave** — `auto` · P2 (enc) · themes: plain
  - _Electric Special · DB 6 · AC — · At-Will · 6, 1 Target_
  - Shock Wave cannot miss. *Grants Zapper

- ✅ **Slice** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 10 · AC 2 · Scene x2 · Melee, Pass_
  - Limitation: Melee Weapons Only

- ✅ **Smart Strike** — `auto` · P3 · themes: plain
  - _Steel Physical · DB 7 · AC 2 · EOT · Melee, 1 Target_
  - Smart Strike cannot miss.

- ✅ **Speed Swap** — `auto` · P3 · themes: plain
  - _Psychic Status · DB — · AC 2 · Scene · Melee, 1 Target_
  - The user and the target trade Initiative values.

- ✅ **Stomping Tantrum** — `auto` · P3 · themes: plain
  - _Ground Physical · DB 8 · AC 2 · EOT · Melee, 1 Target_
  - If the user's last attack failed or missed, Stomping Tantrum is DB15 instead.

- ✅ **Surge** — `auto` · P3 · themes: plain
  - _Electric Physical · DB 4 · AC 2 · At-Will · Melee, 1 Target, Priority_
  - The target cannot make Attacks of Opportunity for 1 full round.

- ✅ **Synchronoise** — `auto` · P3 · themes: plain
  - _Psychic Special · DB 12 · AC 2 · Scene x2 · Burst 3_
  - Synchronoise can only hit targets that share a type with Synchronoise's user.

- ✅ **Tachyon Cutter** — `auto` · P3 · themes: plain
  - _Steel Special · DB 5 · AC 2 · EOT · 6, 2 Targets, Slice_
  - If the targets are not adjacent to each other, this Move cannot miss.

- ✅ **Trick Room** — `auto` · P3 · themes: plain
  - _Psychic Status · DB — · AC — · Daily x2 · Field_
  - Starting at the beginning of the next round, for 5 rounds, the area is considered Rewinding. While Rewinding, Initiative is reversed, and participants instead go from lowest Initiative to highest.

- ✅ **Triple Threat** — `auto` · P3 · themes: plain
  - _Normal Physical · DB 7 · AC 2 · Scene x2 · WR, 3 Targets_
  - Limitation: Large Melee Weapons and Long-Range Weapons Only

- ✅ **Twin Beam** — `auto` · P3 · themes: plain
  - _Psychic Special · DB 4 · AC 2 · EOT · 6, 2 Targets; or 6, 1 Target (see text)_
  - If used on only 1 target, this Move gains the Double Strike keyword. 42

- ✅ **Vacuum Wave** — `auto` · P2 (enc) · themes: plain
  - _Fighting Special · DB 4 · AC 2 · At-Will · 4, 1 Target, Priority, Aura_
  - --

- ✅ **Vicegrip** — `auto` · P2 (enc, pc) · themes: plain
  - _Normal Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - --

- ✅ **Vine Whip** — `auto` · P2 (enc, pc) · themes: plain
  - _Grass Physical · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - *Grants: Threaded

- ✅ **Water Gun** — `auto` · P1 (enc, pc, player:Handels, player:Lázaro) · themes: plain
  - _Water Special · DB 4 · AC 2 · At-Will · 4, 1 Target_
  - *Grants Fountain

- ✅ **Wave Crash** — `auto` · P3 · themes: plain
  - _Water Physical · DB 8 · AC 2 · EOT · Melee, 1 Target, Priority, Recoil 1/4_
  - --

- ✅ **Wild Charge** — `auto` · P3 · themes: plain
  - _Electric Physical · DB 9 · AC 2 · At-Will · Melee, 1 Target, Dash, Recoil 1/4_
  - --

- ✅ **Wing Attack** — `auto` · P1 (enc, pc, player:Lysgd) · themes: plain
  - _Flying Physical · DB 6 · AC 2 · At-Will · Melee, 1 Target_
  - --

- ✅ **Wonder Room** — `auto` · P3 · themes: plain
  - _Psychic Status · DB — · AC — · Daily x2 · Field_
  - For 5 rounds, the area is considered Wondered. While Wondered, each individual Pokemon's Defense and Special Defense are switched.

- ✅ **Wood Hammer** — `auto` · P3 · themes: plain
  - _Grass Physical · DB 12 · AC 2 · Scene x2 · Melee, 1 Target, Dash, Recoil 1/3_
  - --

- ✅ **X-Scissor** — `auto` · P2 (enc) · themes: plain
  - _Bug Physical · DB 8 · AC 2 · At-Will · Melee, 1 Target, Dash_
  - --

