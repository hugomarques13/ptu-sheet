# abilities — automation ledger

[← LEDGER](../LEDGER.md)

<a id="abilities-01"></a>
## `abilities-01` — Interrupts, reactions & priority (1/5)

P1 · 4 open of 20 · open

- ✅ **Cute Charm** — `auto` · P1 (player:Lysgd) · themes: interrupt, status · code: ABILITY_REACTIONS:25037, GAUNTLETS:39784
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: A foe of the opposite gender attacks the user with a Melee Attack
    The foe becomes Infatuated.

- ✅ **Cute Tears** — `auto` · P1 (player:Handels) · themes: interrupt, cs, skill, stat · code: ABILITY_REACTIONS:25041, GAUNTLETS:40195
  - _Scene - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Damaging Move.
    The attacking foe loses 2 Combat Stages in the Attack Stat used by the triggering Move.

- ✅ **Flame Body** — `auto` · P1 (enc, pc, player:Lysgd) · themes: interrupt, status · code: ABILITY_REACTIONS:25032, GAUNTLETS:40033
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack
    The attacking foe becomes Burned.

- ✅ **Gooey** — `auto` · P1 (enc, player:Lázaro) · themes: interrupt, cs, skill · code: ABILITY_REACTIONS:25039
  - _At Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack.
    The triggering attacker has their Speed lowered by 1 Combat Stage.

- ✅ **Moxie** — `auto` · P1 (enc, player:Lázaro) · themes: interrupt, cs, action, skill · code: ABILITY_REACTIONS:25068, GAUNTLETS:40020
  - _Static_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Whenever the user's Move causes a target to faint, it may raise its Attack Combat Stage by +1. You may only trigger Moxie once per Move, even if the Move causes multiple targets to faint.

- ✅ **Steadfast** — `auto` · P1 (enc, player:Lázaro) · themes: interrupt, status, cs, skill · code: onStatusGained:1053, GAUNTLETS:39828, abilityInitiative:52115
  - _At-Will - Free Action_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - Trigger: The user is Flinched
    The user's Speed is raised by +1 Combat Stage.

- ✅ **Synchronize** — `auto` · P1 (pc, player:Hugo, player:Lázaro) · themes: interrupt, status · code: onStatusGained:1057, GAUNTLETS:40174, attackTargetWidget:57725
  - _Scene -  Free Action_
  - note: v645: the 💥 Apply picker knows attacker and victim - a ⚡ Synchronize button gives the attacker the same persistent Status the Move just landed (Scene use spent)
  - Trigger: The user is Paralyzed, Frozen, Burned, Poisoned, or put to Sleep.
    The foe which caused the Status Condition is given the same Status they inflicted.

- ✅ **Anger Point** — `auto` · P2 (enc) · themes: interrupt, status, cs, damage, skill · code: ABILITY_REACTIONS:25067
  - _At-Will - Free Action_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - When the Pokemon receives a Critical Hit, they become Enraged and gain +6 Attack Combat Stages.

- ✅ **Beast Boost** — `auto` · P2 (enc) · themes: interrupt, cs, skill, stat · code: ABILITY_REACTIONS:25069
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user's Damaging Attack causes an opponent to Faint
    The user receives +1 Combat Stage in their highest non-HP stat.

- ⛔ **Gale Wings** — `skip` · P2 (enc) · themes: interrupt
  - _Static_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may use Flying-Type Moves as if they have the Priority keyword.

- 🟡 **Good As Gold** — `partial` · P2 (enc) · themes: interrupt, status, typing · code: ABILITY_ACTION_ROWS:3710
  - _At-Will - Swift Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: The user attacks a foe
    For one full round, if the triggering foe uses an Attack that doesn't target the user, that foe becomes Slowed for one full round. If the foe then is adjacent to the user, they instead become Stuck. Bonus: The user is immune to Status Moves used by foes. Defensive.

- 🟡 **Klutz [SwSh]** — `partial` · P2 (pc) · themes: interrupt, action · code: ABILITY_ACTION_ROWS:3735
  - _Scene - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: The user hits with a Melee Attack
    Choose one of the target's Held Items or Accessory Slot Items. It is knocked to the ground.
    Bonus: The Pokemon ignores the effects of all held Items in its possession. The user may drop Held Items At-Will as a Free Action during their turn, even if they have Status Afflictions that prevent them from taking actions.

- 🟡 **Mummy** — `partial` · P2 (enc) · themes: interrupt, multiturn, swap · code: ABILITY_ACTION_ROWS:3717
  - _Daily - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: The user is hit by a Melee Attack
    Replace all of the Attacker's Abilities with Mummy until the end of the encounter.

- ✅ **Parry** — `auto` · P2 (enc) · themes: interrupt · code: ABILITY_SHIELDS:24482
  - _Scene -  Free Action_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - Trigger: The user is hit by a Melee Attack
    The attack instead misses. Defensive.

- ✅ **Poison Point** — `auto` · P2 (enc, pc) · themes: interrupt, status · code: ABILITY_REACTIONS:25033, GAUNTLETS:39800
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Move
    The attacking foe is Poisoned.

- ⛔ **Prankster** — `skip` · P2 (enc) · themes: interrupt
  - _Static_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may use Status Moves as Priority (Advanced).

- ✅ **Rattled [Errata]** — `auto` · P2 (enc) · themes: interrupt, cs, action, skill
  - _At-Will - Free Action · 2-16 Errata_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Bug, Dark, or Ghost Type Move
    The user's Speed is raised by +1 Combat Stage, and may immediately Disengage as a Free Action.

- 🟡 **Spray Down** — `partial` · P2 (enc) · themes: interrupt, typing, stat · code: ABILITY_ACTION_ROWS:3720
  - _Scene - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: The user hits an airborne target with a ranged 1-target attack.
    The triggering attack's target is knocked down to ground level, and loses all Sky or Levitate Speeds for 3 turns. During this time, they may be hit by Ground-Type Moves even if normally immune.

- ✅ **Steadfast [Errata]** — `auto` · P2 (enc, player:Hugo) · themes: interrupt, status, cs, skill · code: onStatusGained:1053, abilityInitiative:52115
  - _At-Will - Free Action · 2-16 Errata_
  - note: v645 abilityInitiative: +5 Initiative; the +1 Speed on Flinch was already automatic
  - Trigger: The user would be Flinched
    The user's Speed is raised by +1 Combat Stage.
    Bonus: The user's Initiative is increased by +5.

- ✅ **Vanguard** — `auto` · P2 (pc) · themes: interrupt, damage · code: STAT_FAMILY:24751, abilityDamageMods:26471, openMoveRoll:27625, GAUNTLETS:40183
  - _Static_
  - note: v619: analyticContext.notActed → Vanguard card on the roll modal (+5 damage vs opponents still to act); tickable
  - The user gains a +5 Bonus to all Damage Rolls against targets with an initiative lower than itself that have not yet acted that round (having Ante'd up your Action via an Interrupt or similar on a previous round does not count as having acted that round).

<a id="abilities-06"></a>
## `abilities-06` — Healing, drain, recoil & HP (1/3)

P1 · 6 open of 20 · open

- ✅ **Hospitality** — `auto` · P1 (player:Handels) · themes: heal, interrupt, swap · code: ABILITY_ACTION_ROWS:3715
  - _Scene x2 - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); applied for you
  - Trigger: The user uses a Move
    The triggering Move may gain the Friendly Keyword. After resolving, choose an ally that is adjacent to any target of the triggering move. The chosen Ally gains 2 ticks of temporary Hit Points. You may expend both uses of this Ability at once to choose an additional Ally.

- ✅ **Rough Skin** — `auto` · P1 (player:Lázaro) · themes: heal, interrupt · code: ABILITY_REACTIONS:25042, GAUNTLETS:39827
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a damaging Melee Attack
    The attacker loses a tick of Hit Points.

- ✅ **Sturdy [Errata]** — `auto` · P1 (pc, player:Lysgd) · themes: heal, typing, damage · code: tokenDamageBreakdown:56652
  - _Static · 2-16 Errata_
  - note: v644 tokenDamageBreakdown: 50% Max HP cap per source + Execute-keyword immunity (Defensive, off under Mold Breaker)
  - The user is immune to Moves with the Execute Keyword. If a single source of Damage or Hit Point Loss would cause the user to lose more than X Hit Points, the damage or Hit Point loss is instead reduced to X. X is equal to 50% of their Max Hit Points. Defensive.

- ✅ **Abominable [Errata]** — `auto` · P2 (enc) · themes: heal, stat · code: pokeBaseStats:7149, hpRecoilImmunity:23354
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user's Base HP is increased by +5. Additionally, the user ignores the Recoil Keyword when attacking.

- ✅ **Aftermath** — `auto` · P2 (enc) · themes: heal · code: ABILITY_ACTION_ROWS:3779, ABILITY_REACTIONS:25063
  - _Scene -  Free Action_
  - note: v645 ABILITY_REACTIONS faintself row: a quarter of Max HP to everything within 1 m; Damp within 10 m stops it
  - When the user is reduced to 0 HP or less, they create a Burst 1. Everything in the Burst loses ¼ of its Max Hit Points.

- 🟡 **Comatose** — `partial` · P2 (enc) · themes: heal, status · code: ABILITY_ACTION_ROWS:3694
  - _At-Will - Shift Action_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user falls Asleep, and regains a Tick of Hit Points.Bonus: The user may act normally while Asleep and ignores all other penalties from being Asleep. While Asleep, the user does not make Save Checks to wake up, and wakes up from being hit only if they want to.

- ✅ **Defeatist** — `auto` · P2 (enc) · themes: heal, cs, skill · code: abilityDamageMods:26344, abilityStatusCS:26612
  - _Static_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Whenever the user is brought below 50% of their max Hit Points, the user's Attack and Special Attack are lowered by 1 Combat Stage each, and the user's Speed is increased by +2 Combat Stages. If the user is healed above 50% max Hit Points, these changes are reverted.

- 🟡 **Innards Out** — `partial` · P2 (enc, pc) · themes: heal, interrupt, typing · code: ABILITY_REACTIONS:25061
  - _Scene x2 - Free Action_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user is hit by a damaging attack
    The user resists the triggering attack one step further. After the attack is resolved, a foe within 2 meters loses Hit Points equal to twice the amount of Hit Points lost by the user from the triggering attack, even if the triggering attack caused the user to Faint.

- ✅ **Iron Barbs** — `auto` · P2 (enc) · themes: heal, interrupt · code: ABILITY_REACTIONS:25043
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a damaging Melee Attack
    The attacker loses Hit Points equal to Tick of Hit Points.

- 🟡 **Pack Hunt** — `partial` · P2 (enc) · themes: heal, interrupt, damage · code: ABILITY_ACTION_ROWS:3778, STAT_TRAINING_MOVES:25747
  - _At Will - Free Action_
  - note: v617 verify sweep: found unhandled, added STATIC_ABILITY_EVASION / ABILITY_ACTION_ROWS / MOVE_FX_ROWS
  - Trigger: An adjacent foe is damaged by an ally's Melee attack.
    The user may make a Physical Attack with an AC of 5 against the triggering foe. If the attack hits, the foe loses a Tick of Hit Points.

- ✅ **Soul Heart** — `auto` · P2 (enc) · themes: heal, cs, skill · code: ABILITY_ACTION_ROWS:3728
  - _Scene x2 - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); applied for you
  - Whenever a combatant faints, the user receives +2 Special Attack Combat Stages and gains a tick of Temporary Hit Points.

- ✅ **Truant** — `auto` · P2 (enc) · themes: heal, multiturn, cure, action · engine: remember-only · code: ABILITY_TURN_HOOKS:24337
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - At the beginning of each of its turns, the user must roll 1d20. On a roll of 7 or lower, the target refuses to act; they heal a Tick of Hit Points, and do not get a Standard Action that turn. Turns in which the user refuses to act count towards turns used up by Interrupts or the Exhausted Condition, and the user may make Rolls to cure themselves from Status Effects with a +3 Bonus that turn.

- 🟡 **Abominable** — `partial` · P3 · themes: heal, damage · code: pokeBaseStats:7149, hpRecoilImmunity:23354
  - _Static_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user ignores the Recoil Keyword when attacking, and does not gain injuries from Massive Damage.

- ✅ **Aftermath [Errata]** — `auto` · P3 · themes: heal, interrupt, status · code: ABILITY_REACTIONS:25063
  - _Scene - Free Action · 2-16 Errata_
  - note: v645: Damp within 10 m now stops it too
  - Trigger: The user becomes Fainted
    The user creates a Burst 1. Everything in the Burstloses three Ticks of Hit Points.

- ✅ **Bad Dreams** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3665, ABILITY_TURN_HOOKS:24343
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - At the beginning of the user's turn, all Sleeping Pokemon or Trainers in a Burst 5 lose a Tick of Hit Points.

- ✅ **Bad Dreams [Errata]** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3665
  - _At-Will - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - All Sleeping targets within 5 meters lose a Tick of Hit Points. If at least one target lost Hit Points this way, the user gains a tick of Temporary Hit Points.

- ✅ **Blessed Touch** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3535
  - _Daily x2 - Standard Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - An adjacent Pokemon or Trainer gains Hit Points equal to 1/4th of its maximum Hit Points.

- 🟡 **Box Step** — `partial` · P3 · themes: heal, interrupt, multiturn, cs, damage, skill · code: ABILITY_ACTION_ROWS:3768
  - _At-Will - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user makes a damaging attack while at positive Speed Combat Stages
    After the move resolves, set Speed Combat Stages to default. For each Combat Stage lost this way, one target of the triggering attack loses a tick of HP, and the user gains +1 Evasion until the end of their next turn. 10 Unofficial Homebrew

- ✅ **Cherry Power** — `auto` · P3 · themes: heal, cure · code: ABILITY_ACTION_ROWS:3696
  - _Daily - Swift Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - The user gains 15 Temporary Hit Points, and is cured of all Persistent Status Afflictions.

- 🟡 **Courage** — `partial` · P3 · themes: heal, damage · code: abilityDamageMods:26405
  - _Static_
  - note: +5 damage at or under 1/3 HP applied; the +5 DR half is not
  - While at or under 1/3rd of its Max Hit Point value, the user gains a +5 Damage Bonus to all Damage Rolls, and 5 Damage Reduction. Defensive.

<a id="abilities-09"></a>
## `abilities-09` — Ability / item / stat swaps (1/2)

P1 · 2 open of 20 · open

- ⚪ **Frisk** — `manual` · P1 (pc, player:Handels) · themes: swap, stat · code: TECH_FX:192, errataAbilityMap:5113
  - _Scene - Free Action_
  - note: reveals information to the player — nothing to compute
  - Target: An Adjacent Pokemon
    The target reveals their Type, Ability, Nature, Level, and name of any Held Items they are currently holding, if any.

- ✅ **Defiant** — `auto` · P2 (enc, pc) · themes: swap, cs, skill · code: ABILITY_ACTION_ROWS:3774, STAT_FAMILY:24743, applyCSFx:25983
  - _Static_
  - note: v647 applyCSFx opts.foe: a foe-caused CS drop raises Attack +2 (button kept for other sources)
  - Whenever the user has its Combat Stages lowered, by something other than its own Moves or Abilities, the user's Attack is raised 2 Combat Stages.

- ✅ **Unburden** — `auto` · P2 (pc) · themes: swap, cs, skill · code: abilityStatusCS:26625
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - If the user is not holding a Held Item, their Speed is increased by +2 Combat Stages.

- ⚪ **Aura Break** — `manual` · P3 · themes: swap, cs, damage, skill
  - _Static_
  - note: Negates OTHER creatures' Ability bonuses - needs a cross-creature Ability suppression layer the sheet doesn't have
  - Foes may not benefit from Abilities that increase the Combat Stages or damage dealt by themselvs or their allies.

- ⚪ **Aura Break [Errata]** — `manual` · P3 · themes: swap, damage, stat
  - _Scene - Swift Action · 2-16 Errata_
  - note: Reveal an Ability and invert its Damage Bonuses into Penalties - GM-adjudicated
  - Target: A foe within 6 meters
    The foe reveals its abilities. Pick one ability; any Damage Bonuses (either Damage Base increases or Damage Roll bonuses) granted by the ability instead become Damage Penalties of the same value.

- ⚪ **Color Theory** — `manual` · P3 · themes: swap, stat
  - _Static_
  - note: reveals information to the player — nothing to compute
  - Upon gaining this ability at Birth, the user rolls 1d12 to determine the color of their tail secretions. 1 = Red; 2 = Red-Orange; 3 = Orange; 4 = Yellow- Orange; 5 = Yellow; 6 = Yellow-Green; 7 = Green; 8 = Blue-Green; 9 = Blue; 10 = Blue-Violet; 11 = Violet; 12 = Red-Violet.
    
    Red is tied to Attack, Orange is tied to Defense, Yellow is tied to Special Attack, Green is tied to Special Defense, Blue is tied to Speed, Violet is tied to HP. Users with a "Pure" Color (Red, Orange, Yellow, etc) gain a +6 Bonus to the Base Stat tied to their color. Users with a "Mixed" Color (Red-Orange, Yellow-Orange, etc) gain a +3 Bonus to each Stat tied to the color.

- ✅ **Competitive** — `auto` · P3 · themes: swap, cs, skill · code: ABILITY_ACTION_ROWS:3776, STAT_FAMILY:24747, applyCSFx:25983, GAUNTLETS:40006
  - _Static_
  - note: v647 applyCSFx opts.foe: a foe-caused CS drop raises Sp.Attack +2
  - Whenever the user has its Combat Stages lowered, by something other than its own Moves or Abilities, the user's Special Attack is raised 2 Combat Stages.

- 🟡 **Cud Chew** — `partial` · P3 · themes: swap · code: ABILITY_ACTION_ROWS:3769
  - _Scene - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The effect of a consumable item used by the user earlier in the encounter is used again as if it had not been destroyed. The item is still gone.

- ✅ **Damp** — `auto` · P3 · themes: swap · code: dampBlockers:25247, abilityDamageMods:26395
  - _Static_
  - note: v644: dampBlockers() reads the Map - Explosion / Self-Destruct warn and refuse to set the HP when a Damp holder is within 10 m
  - The Moves Self-Destruct and Explosion may not be used when a Pokemon with Damp is within 10-meters of Self-Destruct or Explosion's user. The Ability Aftermath may not be activated when a Pokemon with Damp is within 10-meters of the Pokemon attempting to activate Aftermath.

- 🟡 **Damp [Errata]** — `partial` · P3 · themes: swap, damage · code: abilityDamageMods:26395
  - _Static · 2-16 Errata_
  - note: v644: Explosion / Self-Destruct refusal + the +1d10 Water Bonus are automatic; Aftermath failing near it is not wired
  - Whenever anyone within 10 meters would use the Moves Self-Destruct or Explosion or activate the Aftermath Ability, those effects fail and instead do nothing.
    Bonus: The user gains a +1d10 Bonus to Damage Rolls with Water-Typed Moves.

- ⚪ **Delivery Bird** — `manual` · P3 · themes: swap
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - The user may hold two Held Items at once. Whenever an Ability or Move affects the user's Held Items, you may choose which one is affected.

- ⚪ **Designer** — `manual` · P3 · themes: swap, typing
  - _At-Wiil - Extended Action · 2-16 Errata_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - The user is adept at crafting clothes for itself out of common leaves. When activating this ability to create a leaf suit, the user may choose two Types; the user resists the chosen types one step further while wearing that suit. The user may only have one leaf suit at a time, and creating a new suit destroys the old one.

- ⚪ **Embody Aspect** — `manual` · P3 · themes: swap
  - _At-Will - Extended Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - The user may change between its four different Formes by changing masks, changing its Types and granting an Ability. Innate. Mask Type Ability Teal Grass Defiant Wellspring Grass/Water Water Absorb Hearthflame Grass/Fire Mold Breaker Cornerstone Grass/Rock Full Guard

- ⚪ **Fabulous Trim** — `manual` · P3 · themes: swap, action, skill
  - _Static_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Furfrou's Ability depends on its current hairstyle. A Furfrou's hairstyle can be changed as an Extended Action at an appropriate hair parlor.
    
    Star Trim: Celebrate
    Diamond Trim: Defiant
    Heart Trim: Cute Tears
    Pharaoh Trim: Sand Veil
    Kabuki Trim: Inner Focus
    La Reine Trim: Intimidate
    Matron Trim: Friend Guard
    Dandy Trim: Moxie
    Debutante Trim: Confidence

- ⚪ **Family Unit** — `manual` · P3 · themes: swap
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - The user has two tokens instead of one, which may share a square, and do so when sent out. When the user Shifts, both tokens may move independently and do not need to remain adjacent. The user cannot be hit by a Move twice due to both tokens being targeted. The two tokens and their allies may treat each other as different Pokemon for the purposes of positioning effects such as flanking, Moves like Beat Up, or Abilities such as Friend Guard and Pack Hunt. Bonus: The user may make two Attacks of Opportunity per round instead of one.

- ⚪ **Fashion Designer** — `manual` · P3 · themes: swap, social
  - _Daily - Extended Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - The user knows how to make useful accessories from mere common leaves. The user may craft one of the consumable Held Items below by activating this ability.
    Lucky Leaf - Grass Type Booster for one encounter.
    Tasty Reeds - Bug Type Booster for one encounter.
    Dew Cup - Same Effect as an Occa Berry.
    Thorn Mantle - Same Effect as a Coba Berry.
    Chewy Cluster - Same Effect as Leftovers.
    Decorative Twine - Roll +2d6 on any Move during a Contest.

- ⚪ **Flower Power** — `manual` · P3 · themes: swap, damage, action, skill
  - _At Will - Extended Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Target: A Grass Type Pokemon.
    The target gains Flower Power for the rest of the day. While the target has Flower Power, they gain a +1 bonus to Skill Checks. A Pokemon with Flower Power may choose to expend their Flower Power when making an Accuracy Roll with a Grass-Type Move or when making a Save Check to gain a +2 Bonus to that roll. This Ability may target a specific target only once per day.

- ⚪ **Frisk [Feb Errata]** — `manual` · P3 · themes: swap, stat · code: errataAbilityMap:5113
  - _At-Will - Swift Action · 2-16 Errata_
  - note: reveals information to the player — nothing to compute
  - Target: An Adjacent Pokemon
    The target reveals their Type, Ability, Nature, Level, and name of any Held Items they are currently holding, if any.

- ⚪ **Handyman** — `manual` · P3 · themes: swap · code: TECH_FX:190
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - The user may hold two Held Items at once. Whenever an Ability or Move affects the user's Held Items, you may choose which one is affected.

- ⚪ **Honey Paws [Errata]** — `manual` · P3 · themes: swap
  - _Static · 2-16 Errata_
  - note: Honey as a free Food Buff - no Honey item in the food registry
  - The user may consume Honey to gain a Food Buff as if they had consumed Leftovers. This Food Buff does not count against their normal limit.

<a id="abilities-11"></a>
## `abilities-11` — Movement, push & switching (1/2)

P1 · 15 open of 20 · open

- 🟡 **Bodyguard** — `partial` · P1 (enc, player:Lázaro) · themes: position, interrupt, swap, typing, damage · code: ABILITY_ACTION_ROWS:3737
  - _Scene -  Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: A cardinally adjacent Ally is hit by an attack
    The user and the target switch places, and the user becomes the target of the attack instead, taking damage from the attack as if resisted one step further. If switching places would not move the triggering Ally out of the area-of-effect of a Burst, Blast, Cone, or Line, this Ability does not prevent the ally from being hit. Defensive.

- 🟡 **Emergency Exit** — `partial` · P2 (enc) · themes: position, heal, interrupt, status, typing, action · engine: remember-only · code: STATUS_IMMUNE_ABILITIES:907
  - _Scene - Free Action_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Trapped Bonus); left: the recall below half HP (ABILITY_REMEMBER reminder only)
  - When the user's Hit Points drop below half their maximum, their trainer may immediately recall the user and send out another Pokemon as a Free Action. If the user hasn't taken their turn yet, their replacement may act this round. [Defensive]Bonus: The user is immune to Trapped.

- 🟢 **Rally** — `likely` · P2 (enc) · themes: position, status · code: ABILITY_ACTION_ROWS:3531
  - _Scene - Swift Action_
  - All allies within 10 meters may immediately shift 1 Meter in any direction they wish. Rally does not work on sleeping, flinched, stuck, fainted, or otherwise incapacitated allies. Rally does not work on the user.

- 🟢 **Shackle** — `likely` · P2 (enc) · themes: position, multiturn · code: ABILITY_ACTION_ROWS:3652, GAUNTLETS:39787
  - _Scene -  Free Action_
  - Shackle creates a Burst 3. All foes in the burst have their movement capabilities halved until the end of their next turn.

- 🟡 **Shackle [Errata]** — `partial` · P2 (enc) · themes: position, multiturn · code: ABILITY_ACTION_ROWS:3652
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Shackle creates a Burst 3. All foes in the burst have their movement capabilities halved until the end of their next turn.

- 🟡 **Spinning Dance** — `partial` · P2 (pc) · themes: position, interrupt, status, damage · code: ABILITY_ACTION_ROWS:3730, GAUNTLETS:40015
  - _At-Will - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Trigger: The user is targeted by an attack, but is missed
    If not Fainted, Paralyzed, or Asleep, the user gains +1 Evasion and may immediately Shift 1 meter.

- 🟢 **Suction Cups** — `likely` · P2 (enc) · themes: position, typing · code: PUSH_IMMUNE_ABILITIES:23876
  - _Static_
  - The user is immune to Push effects, and the effects of Roar. Defensive.

- 🟡 **Arena Trap [Errata]** — `partial` · P3 · themes: position, status, action, capture · code: ABILITY_ACTION_ROWS:3637
  - _Scene - Free Action · 2-16 Errata_
  - note: v644: press puts Slowed + Trapped on the foes the GM ticks; the Flying / Levitate / Sky / Burrow exemption is read at the table
  - Target: Pokemon or Trainers
    Once Arena Trap is activated, all foes within 5 meters of the user are considered Slowed and Trapped. This does not affect targets of the Flying Type, or with a Levitate, Sky, or Burrow Speed of 4 or higher. The user may end the effect as a Free Action, and the effect ends if the user is Fainted or returned to a Poke Ball.

- 🟡 **Bodyguard [Errata]** — `partial` · P3 · themes: position, interrupt, swap, typing, damage
  - _Scene x2 - Free Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: An adjacent Ally is hit by an attack
    The user and the triggering Ally switch places, and the user becomes the target of the triggering attack instead, taking damage from the attack as if resisted one step further. If switching places would not move the triggering Ally out of the area-of-effect of a Burst, Blast, Cone, or Line, this Ability does not prevent the ally from being hit. Defensive.

- ✅ **Bully** — `auto` · P3 · themes: position, interrupt, status, typing, damage · code: ABILITY_REACTIONS:25057, GAUNTLETS:39804
  - _Scene -  Free Action_
  - note: v625: ABILITY_REACTIONS deal row (melee + Super-Effective): Injury + Tripped, push 2 m said out loud
  - Trigger: The user hits the target for Super-Effective Damage with a Melee Move.
    The target of the attack  is pushed 2 Meters, becomes Tripped, and gains an Injury.

- ⚪ **Celebrate [Errata]** — `manual` · P3 · themes: position, interrupt, action
  - _At-Will - Swift Action · 2-16 Errata_
  - note: Free Disengage after a hit and a 2 m Disengage - no action-economy engine to hang it on
  - Trigger: The user hits a foe with a damaging attack
    The user may immediately Disengage as a Free Action.
    Bonus: Whenever the user Disengages for any reason, they may Shift 2 meters instead of 1.

- 🟡 **Cruelty** — `partial` · P3 · themes: position, heal, interrupt, multiturn, status, damage · code: ABILITY_REACTIONS:25056, STAT_TRAINING_MOVES:25743, GAUNTLETS:40194
  - _Scene - Swift Action_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user hits a foe with a damaging attack
    After Damage is Resolved, the foe gains an Injury. The user is then informed of the total number of Injuries currently on the target, and may use that number to "purchase" the effects listed below.
    »» 1 Injury: The target loses 2 Hit Points. May be "purchased" multiple times.
    »» 1 Injury: The target is Slowed.
    »» 2 Injuries: Until the end of the encounter, the target may not gain Hit Points or Temporary Hit Points from any source. This effect ends if the target is switched out or Takes a Breather.

- 🟡 **Engulf** — `partial` · P3 · themes: position, heal, swap, status, action, skill · code: ABILITY_ACTION_ROWS:3831
  - _Static · Homebrew_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user's body fills its entire space, and anything that ends up inside it is inside the user, not beside it. A Pokemon or Trainer that begins its turn within the user's space - or that is moved, pushed or dragged into it - is put in a Vortex: it becomes Slowed and Trapped, and loses a Tick of Hit Points at the beginning of each of its turns. Unlike the Vortex keyword, this one never runs out on its own; it lasts exactly as long as the target is inside the user's space, and ends the moment the target is clear of it. Escaping is a Shift Action: make an opposed Athletics or Acrobatics Check against the user's Athletics Check. On a success, Shift out of the user's space without provoking Attac …

- 🟢 **Guard Dog** — `likely` · P3 · themes: position, interrupt, typing, cs, damage · code: PUSH_IMMUNE_ABILITIES:23877
  - _Scene - Free Action, Reaction_
  - Trigger: A foe directly lowers the user's CS (including Accuracy and Effect Range, but not including things like Status Afflictions).
    The user's CS are instead raised by the same amount they would have been lowered. Bonus: The user is immune to Push effects, and the effects of Roar. Defensive. 12 Unofficial Homebrew

- 🟡 **Lancer** — `partial` · P3 · themes: position, multiturn, damage · code: ABILITY_ACTION_ROWS:3620
  - _Static · 2-16 Errata_
  - note: v644: ABILITY_ACTION_ROWS picker drops the +3 Crit Range or +5 DR buff for the turn; whether you Shifted is the table's call
  - During their turn, if the user Shifts at least 3 meters, they gain a +3 Bonus to Critical Hit Range until the beginning of their next turn. If they do not Shift or Disengage at all, they gain +5 Damage Reduction until the beginning of their next turn.

- ⚪ **Lingering Aroma** — `manual` · P3 · themes: position, multiturn
  - _Scene - Swift Action_
  - note: Homebrew: a 1 m pull and handing the Ability to allies
  - Target: All foes and allies within 2 meters
    Foes within range are pushed 1 meter towards the user. Allies within Range gain Lingering Aroma until the end of the Scene or until they are switched out, if they don't already have it. 13 Unofficial Homebrew

- 🟡 **Magnet Pull [Errata]** — `partial` · P3 · themes: position, multiturn · code: ABILITY_ACTION_ROWS:3858
  - _Scene x3 - Swift Action · 2-16 Errata_
  - note: v620: ABILITY_ACTION_ROWS press; movement by hand
  - Target: A Steel-Type Pokemon within 6 meters
    Pick Two Effects;
    -The target is pushed or pulled X meters directly away or towards the user. X is up to 6 meters minus the target's Weight Class.
    -Until the end of the user's next turn, the target may not move more then 6 meters away from the user .
    -Until the end of the user's next turn, the target may not move closer than 3 meters ot the user.

- ⚪ **Mini-Noses** — `manual` · P3 · themes: position, swap, status, stat
  - _Daily - Standard Action_
  - note: positional or item-slot rule the Map does not model
  - The user detaches up to three Mini-Noses from themselves and places them adjacent to them on the battlefield. These Mini-Noses have HP equal to the user's level but otherwise uses their user's stats. Each Mini-Nose has a Levitate Speed of 4. The user may Shift them each round on their turn, and they may originate any Ranged Move from one of the Mini-Noses instead of themselves if they choose. If a Mini-Nose is reduced to 0 HP, it is destroyed and takes a full 24 hours to regrow, one at a time. If the user has less than three grown Mini-Noses, then this ability can only place as many on the field as are available. All Mini-Noses deactivate, but are not destroyed, if the user is Fainted. Mini- …

- 🟡 **Mummy [Errata]** — `partial` · P3 · themes: position, interrupt, control, swap · code: ABILITY_ACTION_ROWS:3853
  - _At-Will - Free Action · 2-16 Errata_
  - note: v620: ABILITY_ACTION_ROWS press (buff mark); which Ability to disable picked at the table via the on/off switch
  - Trigger: The user is hit by a Melee Attack
    Disable one of the user's Abilities for the rest of the Scene or until they are switched out.

- ⚪ **Noble Steed** — `manual` · P3 · themes: position · code: GAUNTLETS:40096
  - _Scene - Free Action_
  - note: positional or item-slot rule the Map does not model
  - The user may use a 1-Target Damaging Move this turn as though it had the Pass keyword. Bonus: Whenever you Shift through a square occupied by an ally that is equal or smaller in size, you can move the ally with you. Allies moved this way do not provoke Attacks of Opportunity. At the end of the Shift, the user chooses if the ally is released in an adjacent square or if the ally begins mounting the user. In addition, the user's Pass moves gain the Friendly Keyword.

<a id="abilities-13"></a>
## `abilities-13` — Damage, accuracy & crits

P1 · 10 open of 25 · open

- 🟡 **No Guard** — `partial` · P1 (player:Hugo, player:Lázaro) · themes: damage · code: openMoveRoll:28556
  - _Static_
  - note: v644: the user's own Melee rolls ignore the target's Evasion; the 'cannot apply Evasion vs Melee' half sits on the defender, whom the attacker's roll never reads
  - The user may not apply any form of Evasion to avoiding melee attacks; however, the user ignores all forms of evasion when making Melee attack rolls.

- 🟡 **Teamwork** — `partial` · P1 (enc, player:Lysgd) · themes: damage · code: STAT_TRAINING_MOVES:25747, teamworkAllies:26491
  - _Static_
  - note: v623: teamworkAllies finds on-team Teamwork mons; roll modal card ticks +2 Accuracy on Melee (any attack with Pack Master); adjacency is ticked by hand
  - While you are adjacent to an opponent, allies using Melee attacks against that opponent receive a +2 bonus to Accuracy Checks.

- ⚪ **Download** — `manual` · P2 (enc) · themes: damage, stat · code: ABILITY_ACTION_ROWS:3632
  - _Scene -  Free Action_
  - note: reveals information to the player — nothing to compute
  - Target: Trainer or Pokemon
    The target must reveal whether its Defense or Special Defense Stats are lower. If the Defense Stat is lower, the user gains a +5 Damage Bonus with Physical Moves when attacking the target. If the Special Defense Stat is lower, the Damage Bonus is instead to Special Moves.

- ✅ **Flying Fly Trap** — `auto` · P2 (pc) · themes: damage · code: defenseTypeMods:7740
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The Pokemon takes no damage from Ground Type Moves and Bug Type Moves. Defensive.

- ⚪ **Wonder Skin** — `manual` · P2 (enc) · themes: damage · engine: remember-only
  - _Static_
  - note: +6 Evasion vs Status Moves - the Evasion total is read by the GM at the roll and the sheet's Evasion doesn't know the Move class
  - The user gains +6 Evasion against Status Moves. Defensive.

- ✅ **Adaptability [Errata]** — `auto` · P3 · themes: damage · code: abilityDamageMods:26342
  - _Static · 2-16 Errata_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The user gains a +1d10 Bonus to Damage Rolls with Moves with which they apply STAB.

- ✅ **Aura Storm [Errata]** — `auto` · P3 · themes: damage · code: abilityDamageMods:26403
  - _Static · 2-16 Errata_
  - note: v587: abilityDamageMods / STATIC_ABILITY_EVASION row
  - For each injury the user has, they gain a +3 Bonus to Damage Rolls.

- 🟡 **Battery** — `partial` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3832
  - _Scene x2 - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: An adjacent Ally.
    The target's next Special Attack deals +2d6+4 damage. If that attack is Electric-Typed, it deals +3d6+6 more damage instead.

- ⚪ **Blur** — `manual` · P3 · themes: damage, skill
  - _Static_
  - note: Evasion halving against no-AC Moves - table rule on the defender's Evasion
  - Attacks and Moves targeting you that don't require an Accuracy Check now require one, as though they had an Accuracy Check of 2. You may only apply half of your Evasion to these Attacks and Moves. Defensive.

- 🟡 **Dark Aura** — `partial` · P3 · themes: damage, stat · code: abilityDamageMods:26396
  - _Static_
  - note: user's own Moves +1 DB (v587 abilityDamageMods); the allies' half is a table note
  - The user and all allies have the Damage Base of their damaging Dark Type Attacks increased by +1.

- 🟡 **Fairy Aura** — `partial` · P3 · themes: damage, stat · code: abilityDamageMods:26397
  - _Static_
  - note: user's own Moves +1 DB (v587 abilityDamageMods); the allies' half is a table note
  - The user and all allies have the Damage Base of their Damaging Fairy Type attacks increased by +1.

- ✅ **Fire Mane** — `auto` · P3 · themes: damage, stat · code: abilityDamageMods:26394
  - _Static_
  - note: v587: abilityDamageMods / STATIC_ABILITY_EVASION row
  - The user increases the Damage Base of its damaging Fire Type Moves by +2.

- 🟡 **Forest Lord** — `partial` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3830
  - _Scene x2 - Shift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - This turn, the user may originate a Grass or Ghost-Typed Move from any fully grown tree within 10 meters. Moves performed this way gain a +2 Bonus on their Accuracy Roll.

- ⚪ **Frisk [SuMo Errata]** — `manual` · P3 · themes: damage
  - _Static · Sun/Moon Errata_
  - note: +2 Accuracy vs adjacent targets - target adjacency isn't visible to the roll
  - The user gains a +2 Bonus to all Accuracy Rolls against adjacent targets.

- ✅ **Instinct** — `auto` · P3 · themes: damage · code: STATIC_ABILITY_EVASION:1581
  - _Static_
  - note: v587: abilityDamageMods / STATIC_ABILITY_EVASION row
  - The user's default Evasion is increased by +2. Defensive.

- ✅ **Interference [Errata]** — `auto` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3647
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The accuracy of all foes within 3 meters is reduced by -2 for 1 full round.

- ✅ **Mega Launcher [Errata]** — `auto` · P3 · themes: damage, stat · code: abilityDamageMods:26398
  - _Static · 2-16 Errata_
  - note: v587: abilityDamageMods / STATIC_ABILITY_EVASION row
  - The user increases the Damage Base of Aura Sphere, Dark Pulse, Dragon Pulse, and Water Pulse by +3.

- ✅ **Nimble Strikes** — `auto` · P3 · themes: damage, stat · code: abilityDamageMods:26400
  - _Static · 2-16 Errata_
  - note: v587: abilityDamageMods / STATIC_ABILITY_EVASION row
  - The user adds half their Speed Stat to the Damage Rolls of their physical Normal-Type Moves.

- 🟡 **Perception [Errata]** — `partial` · P3 · themes: damage, action · code: STATIC_ABILITY_EVASION:1581
  - _Static · 2-16 Errata_
  - note: +1 Evasion applied; the free Disengage from ally AoEs is by hand
  - The user gains +1 Evasion. Whenever an Ally uses a damaging area-of-effect attack that would hit you, you may Disengage as a Free Action before the attack resolves.

- ✅ **Power Spot** — `auto` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3837
  - _Static_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Allies within 2m of the user gain a +5 bonus to damage rolls.

- ⚪ **Pumpkingrab** — `manual` · P3 · themes: damage, skill
  - _Static_
  - note: +4 Struggle Accuracy / +3 Skill only when initiating a Grapple
  - The user gains a +4 bonus to Accuracy Checks of Struggle Attacks made to initiate Grapple, and a +3 Bonus to Skill Checks made to initiate a Grapple.

- 🟡 **Slow Start** — `partial` · P3 · themes: damage, stat · engine: remember-only · code: ABILITY_ACTION_ROWS:3628
  - _Static_
  - note: v644: press drops a 3-round +10 DR buff; halving Speed and Attack is by hand (no stat-multiplier layer)
  - For 3 rounds after joining an encounter, the Pokemon's Speed and Attack Stats are halved and they have 10 Damage Reduction.

- 🟡 **Supersweet Syrup** — `partial` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3843
  - _Static_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - All foes within a Burst 2 around the user have their Evasion lowered by -2 as long as they remain within this range.

- 🟡 **Telepathy [Errata]** — `partial` · P3 · themes: damage, action · code: STATIC_ABILITY_EVASION:1581
  - _Static · 2-16 Errata_
  - note: +1 Evasion applied; the free Disengage from ally AoEs is by hand
  - The user gains +1 Evasion. Whenever an Ally uses a damaging area-of-effect attack that would hit you, you may Disengage as a Free Action before the attack resolves.

- ✅ **Victory Star** — `auto` · P3 · themes: damage · code: ABILITY_ACTION_ROWS:3839
  - _Static_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Any allied Pokemon in the encounter gain a +2 Bonus to Accuracy Rolls.

<a id="abilities-14"></a>
## `abilities-14` — Combat Stages

P1 · 3 open of 18 · open

- ✅ **Intimidate [Errata]** — `auto` · P1 (enc, pc, player:Lázaro) · themes: cs, action, skill · code: ABILITY_ACTION_ROWS:3526
  - _At-Will - Swift Action · 2-16 Errata_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Target: Pokemon or Trainer within 5 meters
    Lower the target's Attack 1 Combat Stage. You may target a specific foe only once per Scene with Intimidate.

- ✅ **Frighten** — `auto` · P2 (enc) · themes: cs, skill · code: ABILITY_ACTION_ROWS:3529
  - _Scene - Swift Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Target: Pokemon or Trainer within 5 meters
    Lower the target's Speed 2 Combat Stages.

- ✅ **Speed Boost** — `auto` · P2 (enc, pc) · themes: cs, skill · engine: remember-only · code: ABILITY_TURN_HOOKS:24315, STAT_FAMILY:24751
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - The Pokemon's Speed is raised 1 Combat Stage at the end of each of its turns. Speed Boost has no effect while out of combat.

- ✅ **Confidence** — `auto` · P3 · themes: cs, skill, stat · code: ABILITY_ACTION_ROWS:3531, GAUNTLETS:40085
  - _Scene - Standard Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Choose a Combat Stat. All allies within 5 meters of the user gain +1 CS in the Chosen Stat.

- ✅ **Contrary** — `auto` · P3 · themes: cs, skill · engine: remember-only · code: lowerCS:3422, changeCS:25960, applyCSFx:25982, GAUNTLETS:40172
  - _Static_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - If something would raise the user's Combat Stages, it instead lowers the user's Combat Stages by the same amount. If something would lower the user's Combat Stages, it instead raises the user's Combat Stages by the same amount.

- ✅ **Costar** — `auto` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3835, GAUNTLETS:40034
  - _Scene - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Target: An ally within 3 meters with positive Combat Stages
    The user's Combat Stages are changed to match the target's Combat Stages.

- ✅ **Dauntless Shield** — `auto` · P3 · themes: cs, skill · code: abilityStatusCS:26621
  - _Static_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - The user's default Defense Combat Stages are increased by +1.

- ✅ **Download [Errata]** — `auto` · P3 · themes: cs, stat · code: ABILITY_ACTION_ROWS:3632
  - _Scene - Swift Action · 2-16 Errata_
  - note: v644: ABILITY_ACTION_ROWS press - picks which Defense is lower (or a free stat on a tie) and raises the CS
  - Target: Trainer or Pokemon
    The target must reveal whether its Defense or Special Defense Stats are lower. If the Defense Stat is lower, the user gains a +1 Attack CS. If the Special Defense Stat is lower, the user instead gains +1 Special Attack CS. If both are tied, the user gains +1 CS to any Stat of their choice.

- 🟡 **Flower Veil** — `partial` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3847
  - _Static_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Allied Grass-Type Pokemon within 10 meters cannot have Combat Stages lowered. Defensive.

- 🟡 **Flower Veil [Errata]** — `partial` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3847
  - _Static · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Grass-Type Pokemon within 5 meters cannot have their Combat Stages lowered.

- ✅ **Intrepid Sword** — `auto` · P3 · themes: cs, skill · code: abilityStatusCS:26622
  - _Static_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - The user's default Attack Combat Stages are increased by +1.

- ✅ **Minus** — `auto` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3533
  - _Scene -  Free Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Target: An ally with Plus within 10 Meters
    The target's Special Attack is raised by +2 Combat Stages.

- ✅ **Moody [Errata]** — `auto` · P3 · themes: cs, damage, skill, stat · code: ABILITY_TURN_HOOKS:24317
  - _Static · 2-16 Errata_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - At the end of the user's turn, roll 1d6 to determine a Stat to be raised by +2 Combat Stages, then roll 1d6 to determine a Stat to be lowered by 1 Combat Stage. 1 is Attack, 2 is Defense, 3 is Special Attack, 4 is Special Defense, 5 is Speed, and 6 is Accuracy.

- ✅ **Plus** — `auto` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3533
  - _Scene -  Free Action_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Target: An ally with Minus within 10 Meters
    The target's Special Attack is raised by +2 Combat Stages.

- 🟡 **Regal Challenge [Errata]** — `partial` · P3 · themes: cs, damage, action, stat · code: ABILITY_ACTION_ROWS:3819
  - _Scene - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: Pokemon or Trainer within 5 Meters
    Ask the target if they will show deference or defiance. If they choose Deference, the target loses their next Shift action and loses 3 CS in the Stat of the user's choice. If they choose Defiance, the user gains a +10 Bonus to all Damage Rolls for the rest of the Scene.

- ✅ **Sunglow [Errata]** — `auto` · P3 · themes: cs, damage, action · code: ABILITY_ACTION_ROWS:3751
  - _Daily - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - The user may activate Sunglow while exposed to sunlight to become Radiant. As a Swift Action, the user may expend the Radiant condition to gain +2 Attack CS and +2 Accuracy for the rest of the Scene.

- ✅ **Unaware** — `auto` · P3 · themes: cs, skill · engine: remember-only · code: unawareMode:26573, GAUNTLETS:39799
  - _Static_
  - note: v588-589: abilityStatusCS / lowerCS+changeCS / unawareMode / ABILITY_ACTION_ROWS / ABILITY_TURN_HOOKS
  - Whenever the user attacks, they ignore all positive Combat Stages to the target's Defense, Special Defense, and Speed.

- ✅ **Wave Rider** — `auto` · P3 · themes: cs, skill, stat · code: ABILITY_ACTION_ROWS:3749
  - _Static_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - While in water, the user's Speed Stat gains +4 Combat Stages. Remove these Combat Stages if the user exits the water.

<a id="abilities-15"></a>
## `abilities-15` — Type changes & immunities, Coats, barriers & Blessings

P1 · 4 open of 19 · open

- ✅ **Mud Dweller** — `auto` · P1 (player:Handels) · themes: typing · code: defenseTypeMods:7744
  - _Static_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user resists Ground-Type and Water-Type attacks one step further.

- ✅ **Bulletproof** — `auto` · P2 (pc, player:Hugo) · themes: typing · code: GAUNTLETS:40109, attackTargetWidget:57677
  - _Static_
  - note: v644: attackTargetWidget reads ctx.range - a ranged '<N|WR>, 1 Target' Move is resisted one step further (Defensive: off under Mold Breaker)
  - The user resists all X target ranged attacks one step further. This refers to attacks and Moves that simply hit one target or specify hitting multiple targets, such as Razor Wind hitting three targets. It has no effect on Moves that are capable of hitting multiple targets through areas of effect, such as Bursts or Cones. Defensive.

- ✅ **Limber** — `auto` · P2 (enc) · themes: typing · code: STATUS_IMMUNE_ABILITIES:895, GAUNTLETS:39775
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off)
  - The user is immune to Paralysis. Defensive.

- ⚪ **Anticipation** — `manual` · P3 · themes: typing, action
  - _At-Will - Swift Action_
  - note: reveals information to the player — nothing to compute
  - Target: Pokemon or Trainers
    The target reveals if they have any Moves that are Super-Effective against the Pokemon with Anticipation. You may not target a Pokemon or Trainer more than once per encounter with Anticipation. Anticipation only reveals whether the opponent does or does not have those moves, not the specific moves themselves.

- ✅ **Cave Crasher** — `auto` · P3 · themes: typing · code: defenseTypeMods:7745
  - _Static_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user resists Ground-Type and Rock-Type attacks one step further. Defensive.

- ✅ **Filter [Errata]** — `auto` · P3 · themes: typing, damage · code: defenseTypeMods:7784
  - _Static · 2-16 Errata_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user gains +5 Damage Reduction against Super-Effective damage. Defensive.

- ✅ **Ice Scales** — `auto` · P3 · themes: typing · code: defenseTypeMods:7793
  - _Static_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user resists Special Moves one step further. Defensive.

- ✅ **Mojo** — `auto` · P3 · themes: typing · code: ignoresTypeImmunity:26568
  - _Static_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - Normal Types are not immune to the user's Ghost Type Moves.

- ✅ **Neuroforce** — `auto` · P3 · themes: typing, damage · code: exploitAbilityBonus:26574
  - _Static_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - Whenever you deal Super-Effective Damage to a target, that target treats your Damage Roll as it were increased by +10.

- ✅ **Normalize [Errata]** — `auto` · P3 · themes: typing, damage · code: tokenDamageBreakdown:56647, attackTargetWidget:57681
  - _Static · 2-16 Errata_
  - note: v644: tokenDamageBreakdown atkNeutral / defender check - SE and Resisted both land neutral, immunities untouched
  - The user's attacks cannot deal Super-Effective or Resisted Damage; they instead resolve as if dealing Neutral Damage. The user also takes neutral damage from all attacks to which they are not immune. This does not affect Immunities.

- ⚪ **Polycephaly** — `manual` · P3 · themes: typing, action
  - _Static_
  - note: Struggle Attacks as a Swift Action and resisted further - Struggle action economy
  - The user may make Struggle Attacks as a Swift Action. Struggle Attacks made this way are resisted one step further than they normally would be.

- ✅ **Sacred Bell** — `auto` · P3 · themes: typing, damage · code: defenseTypeMods:7746
  - _Static · 2-16 Errata_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user resists Dark and Ghost-Type Damage one step further.

- ✅ **Solid Rock [Errata]** — `auto` · P3 · themes: typing, damage · code: defenseTypeMods:7784
  - _Static · 2-16 Errata_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - The user gains +5 Damage Reduction against Super-Effective damage. Defensive.

- ⚪ **Infiltrator** — `manual` · P1 (enc, pc, player:Lysgd) · themes: barrier, interrupt, swap, skill · code: GAUNTLETS:40172
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - The user gains a +2 Bonus to Stealth Checks, does not trigger Hazards, and Blessings cannot be activated in response to its actions, and the user may bypass the effects of Substitute.

- 🟡 **Beads of Ruin** — `partial` · P3 · themes: barrier, damage · code: ABILITY_ACTION_ROWS:3597, blessingIcon:48427
  - _Scene - Swift Action_
  - note: v644: press lays a shared 2-use Blessing square for the whole table (tableLayBlessing); the one-step effect is applied with the Effectiveness +/- buttons
  - Blessing - Any user affected by Beads of Ruin may activate it when dealing Special Damage to deal damage one step more effectively against one target of their attack. Beads of Ruin may be activated 2 times, then disappears.

- ⚪ **Stance Change** — `manual` · P3 · themes: barrier, interrupt, swap, cs, action, skill, stat
  - _Static_
  - note: Aegislash's Stance swap of Attack/Defense stats - a forme system the sheet doesn't model
  - Aegislash has two Stances: Shield Stance and Sword Stance. Its default Stance is Shield Stance. Whenever Aegislash uses a damaging attack, it switches to Sword Stance and swaps its Attack Stat with its Defense and its Special Attack Stat with its Special Defense, without changing Combat Stages. Whenever Aegislash uses King's Shield, Protect, a Status Move that raises Defense Combat Stages, or a Blessing, it switches to Shield Stance and swaps its offensive and defensive Stats back to their original arrangement. Aegislash may also change its Stance as a Full Action.

- 🟡 **Sword of Ruin** — `partial` · P3 · themes: barrier, damage · code: ABILITY_ACTION_ROWS:3598, blessingIcon:48427
  - _Scene - Swift Action_
  - note: v644: same shared 2-use Blessing square
  - Blessing - Any user affected by Sword of Ruin may activate it when dealing Physical Damage to deal damage one step more effectively against one target of their attack. Sword of Ruin may be activated 2 times, then disappears. 18 Unofficial Homebrew

- 🟡 **Tablets of Ruin** — `partial` · P3 · themes: barrier, typing, damage · code: ABILITY_ACTION_ROWS:3599, blessingIcon:48427
  - _Scene - Swift Action_
  - note: v644: same shared 2-use Blessing square
  - Blessing - Any user affected by Tablets of Ruin may activate it when receiving Physical Damage to resist the damage one step. Tablets of Ruin may be activated 2 times, then disappears.

- 🟡 **Vessel of Ruin** — `partial` · P3 · themes: barrier, typing, damage · code: ABILITY_ACTION_ROWS:3600, blessingIcon:48427
  - _Scene - Swift Action_
  - note: v644: same shared 2-use Blessing square
  - Blessing - Any user affected by Vessel of Ruin may activate it when receiving Special Damage to resist the damage one step. Vessel of Ruin may be activated 2 times, then disappears.

<a id="abilities-16"></a>
## `abilities-16` — Move control & copying, Action economy & AP, Curing

P1 · 5 open of 12 · open

- ✅ **Insomnia** — `auto` · P1 (enc, pc, player:Lysgd) · themes: control, status, typing · code: STATUS_IMMUNE_ABILITIES:892, moveLockReason:24666
  - _Static_
  - note: v647 moveLockReason: cannot use Rest
  - The user is immune to the Sleep condition, and cannot use the move Rest. Defensive.

- ✅ **Vital Spirit** — `auto` · P1 (enc, pc, player:Lázaro) · themes: control, status, typing · code: STATUS_IMMUNE_ABILITIES:893, moveLockReason:24666, GAUNTLETS:40084
  - _Static_
  - note: v647 moveLockReason: cannot use Rest
  - The user is immune to the Sleep condition, and cannot use the move Rest. Defensive.

- 🟡 **Memory Wipe** — `partial` · P2 (enc) · themes: control, status, action · code: ABILITY_ACTION_ROWS:3850
  - _Scene - Special_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - The user selects a Pokemon or Trainer within 10 meters. If used as a Swift Action, the last Move used by the target becomes Disabled. If used as a Standard Action, the target is Flinched. If used as an Extended Action that takes about 1 minute, it can erase up to 5 minutes that have occurred within the last 30 minutes from the target's memory.

- ✅ **Huge Power / Pure Power [Errata]** — `auto` · P3 · themes: control, swap, status, stat · code: errataAbilityMap:5111, pokeBaseStats:7148
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user's Base Attack Stat is increased by +5, and by +1 more for every 10 Levels the user has. This Ability cannot be disabled in any way.

- 🟡 **Memory Wipe [Errata]** — `partial` · P3 · themes: control, status, action · code: ABILITY_ACTION_ROWS:3856
  - _Scene - Special · 2-16 Errata_
  - note: v620: ABILITY_ACTION_ROWS press; effect resolved at the table
  - Target: A foe within 10 meters
    If used as a Swift Action, the last Move used by the target becomes Disabled. If used as a Standard Action, the target is Flinched and Paralyzed. If used as an Extended Action that takes about 1 minute, it can erase up to 10 minutes that have occurred within the last 30 minutes from the target's memory.

- ⚪ **Pickup** — `manual` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: action
  - _Daily - Extended Action_
  - note: reveals information to the player — nothing to compute
  - You may use Pickup as an Extended Action that requires at least 5 minutes. Roll 1d20, consult the Pickup keyword to figure out what you find!

- 🟡 **Electrodash** — `partial` · P2 (enc) · themes: action · code: ABILITY_ACTION_ROWS:3733
  - _Scene -  Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - The user may make a Sprint Action as a Swift Action.

- 🟢 **Klutz** — `likely` · P2 (enc) · themes: action · code: ABILITY_ACTION_ROWS:3735
  - _Static_
  - The Pokemon ignores the effects of all held Items in its possession. The user may drop Held Items At-Will as a Free Action during their turn, even if they have Status Afflictions that prevent them from taking actions.

- 🟡 **Empower** — `partial` · P3 · themes: action · code: ABILITY_ACTION_ROWS:3801
  - _Scene - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user may use a self-targeting Status-Class Move as a Free Action.

- ✅ **Natural Cure** — `auto` · P1 (enc, pc, player:Lysgd) · themes: cure, capture · code: ABILITY_ACTION_ROWS:3726, GAUNTLETS:40097
  - _Scene - Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); applied for you
  - Whenever the user is returned to its Poke Ball or Takes A Breather, it may activate Natural Cure to cure itself of all Persistent Status Afflictions.

- ✅ **Healer** — `auto` · P2 (enc, pc) · themes: cure · code: ABILITY_ACTION_ROWS:3713, GAUNTLETS:40194
  - _Scene -  Free Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); applied for you
  - Target: An Adjacent Pokemon or Trainer
    The target is cured of all Status conditions.

- ✅ **Gentle Vibe** — `auto` · P3 · themes: cure, cs, skill · code: ABILITY_ACTION_ROWS:3657, GAUNTLETS:40022
  - _Scene - Standard Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Burst 2.  All targets in the Burst, including the user, have their Combat Stages reset and are cured of any Volatile Status ailments.

<a id="abilities-02"></a>
## `abilities-02` — Interrupts, reactions & priority (2/5)

P2 · 6 open of 20 · open

- ✅ **Water Compaction** — `auto` · P2 (enc) · themes: interrupt, cs, skill · code: ABILITY_REACTIONS:25048
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Water Type Move
    The user receives +2 Defense Combat Stages. [Defensive]

- ✅ **Weak Armor** — `auto` · P2 (enc, pc) · themes: interrupt, cs, damage, skill · code: ABILITY_REACTIONS:25052
  - _At-Will - Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user takes Physical Damage
    The user may lower its Defense Combat Stage by 1 Combat Stage, and gain +1 Speed Combat Stage. This is done after the triggering damage is resolved.

- 🟡 **Absorb Force** — `partial` · P3 · themes: interrupt, damage · code: ABILITY_ACTION_ROWS:3816
  - _Scene -  Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user is damaged by a Physical Attack
    The user takes damage as if the attack was one step less effective.

- ⛔ **Accelerate** — `skip` · P3 · themes: interrupt, damage, stat
  - _Scene x2 - Standard Action, Priority_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate a damaging Move to which they add STAB with Priority. If the Move hits, the user adds half their Speed Stat to the Damage Roll. If the Move already had Priority, the attack gains a +4 Bonus to Accuracy.

- ⛔ **Ambush** — `skip` · P3 · themes: interrupt, status, damage, stat
  - _Scene -  Free Action_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may use a Melee Move with a Damage Base of 6 (before applying STAB or other modifiers) or lower as if it had the Priority keyword. If it hits, the target is Flinched.

- ⛔ **Ambush [Errata]** — `skip` · P3 · themes: interrupt, swap, status, damage, stat
  - _Scene - Free Action · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate this Ability to use a Move with a Damage Base of 6 (before applying STAB or other modifiers) or lower as if it had the Priority keyword. If it hits, the target is Flinched and has a -2 penalty to Accuracy Rolls for 1 full round.

- ✅ **Anger Shell** — `auto` · P3 · themes: interrupt, status, cs, skill · code: ABILITY_ACTION_ROWS:3742
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Trigger: The user becomes Enraged for the first time in a Scene, or receives one or more Injuries
    The user receives +1 Attack, Special Attack, and Speed Combat Stages, but loses -1 Defense and Special Defense Combat Stages.

- 🟡 **Armor Tail** — `partial` · P3 · themes: interrupt · code: ABILITY_ACTION_ROWS:3823
  - _Scene x2 - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Create a Ranged 4, Blast 3. Foes in this Area may not declare Priority or Interrupt Moves outside their own Initiatives for 1 full round. While this effect persists, whenever a foe enters or leaves the Blast area, the user may make an Attack of Opportunity against them, ignoring Range, but following other restrictions. Bonus: The user's Struggle Attacks may be Psychic-Typed.

- 🟡 **Ball Fetch** — `partial` · P3 · themes: interrupt, action · code: ABILITY_ACTION_ROWS:3770
  - _Scene - Free Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: A Pokemon is Released onto the battlefield
    The user may move up to their speed as a Free Action. They must end this movement closer to the triggering Pokemon.

- ✅ **Berserk** — `auto` · P3 · themes: interrupt, status, cs, skill · code: ABILITY_REACTIONS:25053
  - _At-Will - Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user drops to half HP or below for the first time in an encounter, or becomes Enraged
    The user receives +1 Special Attack Combat Stage.

- ✅ **Chilling Neigh** — `auto` · P3 · themes: interrupt, cs, damage, skill · code: ABILITY_REACTIONS:25071
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user causes a foe to Faint with a damaging attack
    The user's Attack is raised by 1 Combat Stage. In addition, all foes within 3m of the user take a -2 penalty to evasion for one full round.

- 🟡 **Combo Striker** — `partial` · P3 · themes: interrupt, action · code: ABILITY_ACTION_ROWS:3771
  - _At-Will - Free Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user rolls a natural 1, 10, or 11 on an attack roll with a damaging move
    After the triggering attack is resolved, the user may use a Struggle Attack as a Free Action.
    Note: Yes, Struggle Attacks made due to Combo Striker may trigger Combo Striker.

- ✅ **Cotton Down** — `auto` · P3 · themes: interrupt, status, cs · code: ABILITY_REACTIONS:25062
  - _Scene - Free Action, Reaction_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user is hit by an attack
    All Pokemon in a Burst 1 around the user have their speed lowered by 1 CS, and are Slowed for one full round.

- ✅ **Curious Medicine** — `auto` · P3 · themes: interrupt, cs, action · code: ABILITY_ACTION_ROWS:3655
  - _Scene - Swift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - All allies within 2m of the user have their CS reset to their default values.
    Special: The user may instead trigger this as a Free Action Reaction when entering the field.

- 🟡 **Dancer** — `partial` · P3 · themes: interrupt, action · code: ABILITY_ACTION_ROWS:3772, GAUNTLETS:39996
  - _Scene x2 - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: Someone within 10 meters uses a Status-Class Dance Move.
    The user may immediately use the triggering Move as a free action.

- ✅ **Dazzling** — `auto` · P3 · themes: interrupt · code: ABILITY_ACTION_ROWS:3649, GAUNTLETS:40020
  - _Scene x2 - Swift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Target: An adjacent foe
    For the rest of the Scene, the target's Initiative is lowered by 10 and cannot use Priority Moves.Bonus: Interrupt Moves may not be declared in response to the user's actions.

- ✅ **Deadly Poison** — `auto` · P3 · themes: interrupt, status · code: ABILITY_REACTIONS:25054
  - _Scene - Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user Poisons a target
    The target is Badly Poisoned instead.

- ✅ **Dodge** — `auto` · P3 · themes: interrupt · code: ABILITY_SHIELDS:24483
  - _Daily - Free Action_
  - note: v586: defenseTypeMods / exploitAbilityBonus / onStatusGained / ABILITY_SHIELDS / ABILITY_REACTIONS
  - Trigger: The user is hit by a Damaging Move.
    The triggering Move instead misses. Defensive.

- ✅ **Dragon's Maw** — `auto` · P3 · themes: interrupt, swap, status, typing · code: attackTargetWidget:57525
  - _Scene x2 - Free Action_
  - note: v644: same toggle as Transistor, Dragon-Type
  - Trigger: The user hits with a damaging Dragon-Type Move
    One target hit by the attack becomes one stage more vulnerable to the attack (applied after all other modifiers). Immune targets are treated as initially double-resistant for the purposes of this Ability, and may be damaged normally.

- 🟡 **Dragonize** — `partial` · P3 · themes: interrupt, damage, stat · code: ABILITY_ACTION_ROWS:3802
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Normal Type damaging Move.
    The Move is changed to be Dragon-Type, and its Damage Base is increased by +1.

<a id="abilities-17"></a>
## `abilities-17` — Weather & Terrain (1/2)

P2 · 9 open of 20 · open

- ✅ **Cloud Nine** — `auto` · P2 (enc) · themes: weather · code: ABILITY_ACTION_ROWS:3585, GAUNTLETS:40097
  - _Scene -  Free Action_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The weather of the Field is set to Normal.

- ✅ **Hydration** — `auto` · P2 (enc) · themes: weather, cure · code: ABILITY_ACTION_ROWS:3561, ABILITY_TURN_HOOKS:24329, GAUNTLETS:40021
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - At the end of the user's turn, if the weather is Rainy, the user is cured of one Status Affliction.

- ✅ **Protosynthesis** — `auto` · P2 (enc) · themes: weather, cs, skill, stat · engine: remember-only · code: abilityStatusCS:26598
  - _Static_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - While in Sunny Weather or under 50% max hitpoints, the user receives +1 Combat Stage in their highest non-HP stat.

- ✅ **Quark Drive** — `auto` · P2 (enc) · themes: weather, cs, skill, stat · engine: remember-only · code: abilityStatusCS:26598
  - _Static_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - While in Electric Terrain or under 50% max hitpoints, the user receives +1 Combat Stage in their highest non-HP stat.

- ✅ **Sand Force [Errata]** — `auto` · P2 (enc, pc) · themes: weather, heal, typing, damage · code: abilityDamageMods:26391
  - _Static · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - While on sandy terrain or in Sandstorms, the user's Ground, Rock, and Steel-Typed damaging moves deal +5 Damage.
    Bonus: The user is immune to Hit Point loss from Sandstorms.

- 🟡 **Air Lock** — `partial` · P3 · themes: weather, action · code: ABILITY_ACTION_ROWS:3585
  - _Scene -  Free Action_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - The weather is set to Normal as long as the Pokemon with Air Lock wants it to remain that way. The user may continue to sustain this effect as a Swift Action each round.

- 🟡 **Burning Blaze** — `partial` · P3 · themes: weather, interrupt, status · code: ABILITY_REACTIONS:25055
  - _Scene x2 - Free Action_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user hits a target with an Electric-Type Move
    The triggering target is Burned. Bonus: While in Sunny Weather, the user may also activate Moves as if in Rainy Weather.

- ✅ **Chlorophyll [Errata]** — `auto` · P3 · themes: weather, heal · code: abilityInitiative:52111
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - While in Sunny Weather or under 50% Max Hit Points, the user's Initiative is doubled.

- ⚪ **Covert** — `manual` · P3 · themes: weather, damage
  - _Static_
  - note: +2 Evasion on a terrain 'related to its natural habitat' - no habitat/terrain mapping
  - If this Pokemon is standing on a terrain related to its natural habitat, its Evasion is increased by +2. For Ice types, this is generally snowy or icy terrain; Ground and Ground types are apt to feel at home in sandy terrain or craggy rocks; Grass types, Bug Types, and others likely feel at home in long grass. Some Pokemon may be at home in several types of terrain.

- ✅ **Desert Weather [Errata]** — `auto` · P3 · themes: weather, heal, typing, damage · code: ABILITY_TURN_HOOKS:24323
  - _Static · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user is immune to Sandstorm Damage, resists Fire-Type Moves in Sunny Weather, and gains a Tick of Temporary Hit Points at the end of each of its turns while in Rainy Weather.

- 🟢 **Flower Gift** — `likely` · P3 · themes: weather, cs, skill, stat · code: ABILITY_ACTION_ROWS:3575
  - _Scene -  Free Action · Burst_
  - If it is Sunny, Flower Gift creates a 4-meter Burst. The user and all of their allies in the burst gain +2 Combat Stages, distributed among any Stat or Stats as they wish.

- 🟡 **Flower Gift [Errata]** — `partial` · P3 · themes: weather, heal, cs, skill, stat · code: ABILITY_ACTION_ROWS:3575
  - _Scene - Swift Action · 2-16 Errata_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - Flower Gift may only be used if the Weather is Sunny or if the user is under 50% Hit Points. When activated, the user may pick two Stats, gaining +2 Combat Stages in each Stat. All targets within 2 meters also gain +1 Combat Stage in each of the chosen Stats.

- 🟡 **Fungus Lord** — `partial` · P3 · themes: weather, multiturn · code: ABILITY_ACTION_ROWS:3826
  - _Scene - Shift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user creates Grassy Terrain in a Burst 2 that lasts until the end of the Scene. Any creatures in those squares are affected as if by the Field Move Grassy Terrain, rather than any other Field Move. Bonus: The user may originate a Move they gain STAB on from any square that is Grassy Terrain.

- ✅ **Grass Pelt [Errata]** — `auto` · P3 · themes: weather, heal, damage · code: ABILITY_ACTION_ROWS:3567
  - _Scene - Swift Action · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user gains two ticks worth of Temporary Hit Points.
    Bonus: When standing on any grassy or leafy terrain that is either Slow or Rough Terrain, the user gains +5 Damage Reduction. Defensive.

- 🟡 **Hadron Engine** — `partial` · P3 · themes: weather, interrupt, multiturn · code: ABILITY_ACTION_ROWS:3827
  - _Scene - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Special Move
    The triggering Move gains Smite for this use. After resolving, create Electric Terrain in a Blast 5, centered on the user, that lasts until the end of the Encounter. Any combatants in those squares are affected as if by the Field Move Electric Terrain, rather than any other Field Move. Bonus: The squares in a Burst 1 around the user count as Electric Terrain.

- 🟡 **Hay Fever** — `partial` · P3 · themes: weather, heal, interrupt, swap, status · code: ABILITY_ACTION_ROWS:3766
  - _At-Will - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Status Move; or the user ends their turn while Asleep.
    The user creates a Burst 2 or Close Blast 3 of allergenic pollen. All Trainers and Pokemon in the burst that are not Bug, Grass, or Poison Typed lose a Tick of Hit Points. This Ability cannot be activated in Rainy Weather, Sandstorms, or if it is Hailing.

- 🟡 **Heliovolt** — `partial` · P3 · themes: weather, interrupt, damage · code: ABILITY_ACTION_ROWS:3591
  - _At-Will - Swift Action · 2-16 Errata_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - Trigger: The user uses an Electric-Type Move
    For 1 full round, the user gains +1 Evasion and is considered to be in Sunny Weather.

- ✅ **Hydration [Errata]** — `auto` · P3 · themes: weather, cure · code: ABILITY_ACTION_ROWS:3561
  - _Scene - Swift Action · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user is cured of one Status Affliction. Hydration's Frequency is ignored if used during Rainy Weather.

- ✅ **Ice Body [Errata]** — `auto` · P3 · themes: weather, heal, typing · code: ABILITY_ACTION_ROWS:3564
  - _Daily x5 - Swift Action · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user gains a Tick of Hit Points. Ice Body may only be used while the user is under 50% Hit Points or in Hailing Weather.
    Bonus: The user is immune to Hit Point loss from Hail.

- 🟡 **Ice Face** — `partial` · P3 · themes: weather, heal, typing, damage, action · code: ABILITY_ACTION_ROWS:3569
  - _Static_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - The user begins the battle with two ticks of temporary hit points. As a Standard Action in Hail, they may gain two ticks of temporary hit points. The user is immune to damage from Hail. While the user has Temporary Hit Points from this Feature, it is in Ice Face form, otherwise it is in Noice Face form.

<a id="abilities-19"></a>
## `abilities-19` — Status afflictions (1/2)

P2 · 7 open of 20 · open

- ✅ **Corrosion** — `auto` · P2 (enc, pc) · themes: status, typing, damage · code: moveStatusNode:22914, statusMoveApplyNode:23108, attackTargetWidget:57681
  - _Static_
  - note: v644: Poison attacks resisted one step less, immune targets take x0.25 (attackTargetWidget corrosion flag), and Poison / Badly Poisoned reach Steel and Poison-Types through statusBlockFor opts.corrosion
  - The user's Poison-Type attacks are resisted one step less, and deal damage to Immune targetsas if they were doubly resisted. The user may Poison and Badly Poison Steel and Poison-Type Pokemon.

- 🟡 **Early Bird [Errata]** — `partial` · P2 (pc) · themes: status · code: abilityInitiative:52114
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user gains a bonus to Initiative equal to half its Speed, and a +3 Bonus on Save Checks against Sleep.

- 🟡 **Inner Focus** — `partial` · P2 (enc, pc) · themes: status · code: STATUS_IMMUNE_ABILITIES:904, GAUNTLETS:40184
  - _Static_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - The user cannot be Flinched. If an effect would set the user's Initiative to 0, their Initiative is not affected. Defensive.

- ✅ **Magma Armor** — `auto` · P2 (enc, pc) · themes: status · code: STATUS_IMMUNE_ABILITIES:896
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Frozen + Boss Chilled)
  - The user cannot be Frozen. Defensive.

- ✅ **Oblivious** — `auto` · P2 (enc, pc) · themes: status, typing · code: STATUS_IMMUNE_ABILITIES:897
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off)
  - The user is immune to the Enraged and Infatuated conditions. Defensive.

- ✅ **Run Away** — `auto` · P2 (enc, pc) · themes: status · code: STATUS_IMMUNE_ABILITIES:910
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Slowed/Stuck/Trapped, not Defensive); the no-AoO-on-Shift clause has no engine in the app — table rule
  - The user cannot be Slowed, Stuck, or Trapped. The user does not provoke Attacks of Opportunity by Shifting.

- ✅ **Run Away [Errata]** — `auto` · P2 (pc) · themes: status · code: STATUS_IMMUNE_ABILITIES:911
  - _Static · 2-16 Errata_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Trapped only); the no-AoO-on-Shift clause has no engine in the app — table rule
  - The user does not provoke Attacks of Opportunity by Shifting. The user cannot be Trapped.

- ✅ **Shed Skin** — `auto` · P2 (enc) · themes: status, cure · code: ABILITY_ACTION_ROWS:3558
  - _Scene -  Free Action_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user is cured of one of Paralysis, Freezing, Burns, Poison, or Sleep.

- ✅ **Tangled Feet [Errata]** — `auto` · P2 (enc) · themes: status, typing, damage · code: STATUS_IMMUNE_ABILITIES:912, weatherEvasion:1590
  - _Static · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - While Confused or Slowed, the user gains +3 Evasion. The user is immune to the Vulnerable Condition.

- 🟡 **Ugly** — `partial` · P2 (pc) · themes: status, social · code: statusRangeAbility:26275
  - _Static_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The Pokemon's Moves Flinch Targets on a roll of 19+. If a move already has a chance of Flinching foes, The Effect Range is increased by +2. During the Introduction Stage of a Contest using this Pokemon, any 6s that are rolled instead count as 1s.

- ✅ **Water Veil** — `auto` · P2 (pc) · themes: status, typing · code: STATUS_IMMUNE_ABILITIES:899, GAUNTLETS:39785
  - _Static · Immune_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off)
  - The user is immune to Burns. Defensive.

- 🟡 **Beautiful** — `partial` · P3 · themes: status, cure, damage, social · code: ABILITY_ACTION_ROWS:3640
  - _Scene - Swift Action_
  - note: v644: press cures Enraged on ticked targets; the +2 Beauty Dice are a Contest roll, by hand
  - The user may activate Beautiful to either grain +2 Beauty DIce in a Contest, or to cure any adjacent targets of the Enraged Condition.

- 🟡 **Beautiful [Errata]** — `partial` · P3 · themes: status, cure, cs, damage, skill, social · code: ABILITY_ACTION_ROWS:3642
  - _Scene - Standard Action · 2-16 Errata_
  - note: v644: press gives +1 Special Attack CS and cures Enraged on ticked allies; Contest dice by hand
  - The user may activate Beautiful to either gain +2 Beauty Dice in a Contest, or to gain +1 Special Attack Combat Stage and cure all allies within 5 meters of the Enraged Condition.

- ✅ **Brimstone** — `auto` · P3 · themes: status · code: ABILITY_REACTIONS:25050
  - _Static_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - Whenever the user causes a Burn with a damaging Fire-Type Attack, the target is also Poisoned.

- ✅ **Brimstone [Errata]** — `auto` · P3 · themes: status, typing · code: ABILITY_REACTIONS:25051
  - _Static · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - Whenever the user inflicts Burn or Poison with a damaging Fire-Type or Poison-Type Attack, the target becomes both Burned and Poisoned.

- ✅ **Daze** — `auto` · P3 · themes: status · code: ABILITY_ACTION_ROWS:3845
  - _Scene - Standard Action_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Make an AC4 Status attack against a target within 6 meters.  If you hit, the target falls Asleep.

- 🟡 **Electrodash [Errata]** — `partial` · P3 · themes: status, action
  - _Scene x2 - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user may make a Sprint Action as a Free Action.
    Bonus: The user may free itself from the Stuck condition as a Shift Action. The user does not provoke Attacks of Opportunity when Sprinting.

- ✅ **Flare Boost [Errata]** — `auto` · P3 · themes: status, cs, skill · code: ABILITY_ACTION_ROWS:3572
  - _Scene - Swift Action · 2-16 Errata_
  - note: v591: abilityStatusCS / weatherEvasion / abilityDamageMods / ABILITY_REACTIONS deal / ABILITY_TURN_HOOKS / addSelf row
  - The user gains +3 Attack and Special Attack Combat Stages. Flare Boost may only be used while Burned.

- ✅ **Immunity** — `auto` · P3 · themes: status · code: STATUS_IMMUNE_ABILITIES:894
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off)
  - The user cannot be Poisoned or Badly Poisoned. Defensive.

- 🟡 **Inner Focus [Errata]** — `partial` · P3 · themes: status · code: STATUS_IMMUNE_ABILITIES:905
  - _Static · 2-16 Errata_
  - note: v591 main effect automated (see code); side clauses (sustain as Swift, allies in range, start-of-battle Temp HP, Initiative protection, Electric-Move trigger) stay by hand
  - The user cannot be Flinched, and their Initiative cannot be unwillingly lowered by any effects.

<a id="abilities-21"></a>
## `abilities-21` — Set-Up, charge & multi-turn, Stats & level

P2 · 5 open of 10 · open

- 🟡 **Magnet Pull** — `partial` · P2 (enc) · themes: multiturn · code: ABILITY_ACTION_ROWS:3723
  - _At-Will - Swift Action_
  - note: v606 ABILITY_ACTION_ROWS press (uses tracked); the rest is resolved at the table
  - Target: A Steel-Type Pokemon
    Until the end of the user's next turn, the target may not move more then 8-meters away from the user and/or may not move closer than 3-meters to the user.

- ✅ **Stakeout** — `auto` · P2 (pc) · themes: multiturn, damage, capture · code: attackTargetWidget:57535
  - _Static_
  - note: v644: attackTargetWidget checkbox 'targets arrived since my last turn' adds 2d6+4 per ticked target (whether they arrived is the table's call - nothing records it)
  - The user gains a +2d6+4 bonus on damage rolls against foes that were released from a Pokeball or entered the encounter since the user's last turn.

- 🟡 **Clay Cannons** — `partial` · P3 · themes: multiturn · code: ABILITY_ACTION_ROWS:3829
  - _At-Will - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Until the end of the round, the user may originate any Ranged Move they use from any square adjacent to itself.

- 🟡 **Clay Cannons [Errata]** — `partial` · P3 · themes: multiturn · code: ABILITY_ACTION_ROWS:3829
  - _At-Will - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Until the end of the round, the user may originate any Ranged Move they use from any square within 2 meters of itself.

- ✅ **Flutter** — `auto` · P3 · themes: multiturn, damage · code: ABILITY_ACTION_ROWS:3686
  - _At Will - Shift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user gains +3 Evasion until the end of their next turn and cannot be Flanked.

- ✅ **Hunger Switch** — `auto` · P3 · themes: multiturn, damage · code: COSMETIC_FORMS:4863, auraWheelDark:22265, ABILITY_TURN_HOOKS:24358
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - At the beginning of each of the user's turns, the user switches between Full Belly Mode and Hangry Mode until the beginning of its next turn, starting in Full Belly Mode. In Full Belly Mode, it gains a +3 bonus to Accuracy Rolls and +2 Evasion. In Hangry Mode, it gains a +10 Bonus to Damage Rolls and +2 to its Critical Hit Range.

- ✅ **Interference** — `auto` · P3 · themes: multiturn, damage · code: ABILITY_ACTION_ROWS:3646
  - _At-Will - Standard Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The accuracy of all foes within 3 meters is reduced by -2 until the end of the user's next turn.

- ⚪ **Receiver** — `manual` · P3 · themes: multiturn, swap, action
  - _Special - Free Action_
  - note: Copies an ally's Ability on faint - cross-creature Ability grant
  - Each of the effects below may be used once per Scene when triggered; 1) When an ally faints, the user selects one of their Abilities. The user gains that Ability until the end of the encounter.2) When the user faints, they may grant use of their Basic Ability to an ally on the field for the rest of the encounter.

- 🟢 **Heavy Metal [Errata]** — `likely` · P3 · themes: stat · code: weightClassOf:23901
  - _Static · 2-16 Errata_
  - The user's Weight Class is increased by +2. Their Defense Base Stat is increased by +2, but their Speed Base Stat is decreased by 2.

- 🟡 **Light Metal [Errata]** — `partial` · P3 · themes: stat · code: pokeBaseStats:7150
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user's Weight Class is decreased by 2. Their Speed Base Stat is increased by +2, but their Defense Base Stat is decreased by 2.

<a id="abilities-03"></a>
## `abilities-03` — Interrupts, reactions & priority (3/5)

P3 · 3 open of 20 · open

- ✅ **Dream Smoke** — `auto` · P3 · themes: interrupt, status · code: ABILITY_REACTIONS:25035
  - _Scene - Free Action · 2-16 Errata_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack
    The attacking foe falls Asleep.

- ⚪ **Drown Out [Errata]** — `manual` · P3 · themes: interrupt
  - _Scene x2 - Free Action · 2-16 Errata_
  - note: Makes a foe's Sonic Move fail - a reaction on the foe's Move, not on a hit
  - Trigger: A foe uses a Move with the Sonic keyword
    The triggering Move fails and has no effect.

- ✅ **Fade Away** — `auto` · P3 · themes: interrupt, multiturn, swap, damage · code: ABILITY_ACTION_ROWS:3760
  - _Scene - Standard Action, Interrupt_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - The user becomes Invisible until the beginning of their next turn, and may immediately Shift. This Ability may be activated as an Interrupt when hit by a Physical attack; the user may declare the use of Fade Away to avoid all damage and/or effects of the move. Defensive.

- ⛔ **Gale Wings [Errata]** — `skip` · P3 · themes: interrupt, damage, stat
  - _Scene x2 - Free Action, Priority · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate Gale Wings to use a Flying-Type Move with Priority. If the Move is a Damaging Move, the user adds half their Speed Stat to the Damage Roll.

- ✅ **Gorilla Tactics** — `auto` · P3 · themes: interrupt, multiturn, swap, damage · code: ABILITY_ACTION_ROWS:3688
  - _Scene - Swift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user uses a Move
    The user gains a +10 bonus to damage rolls until the end of the Scene, including on the triggering Move. However, until the end of the Scene, they may only use Moves that they have already used in this Scene before triggering this Ability (the triggering Move is included in those usable).

- ✅ **Grim Neigh** — `auto` · P3 · themes: interrupt, cs, damage, skill · code: ABILITY_REACTIONS:25072
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user causes a foe to Faint with a damaging attack
    The user's Special Attack is raised by 1 Combat Stage. In addition, all foes within 3m of the user take a -2 penalty to Accuracy for one full round.

- 🟡 **Haunting Elegy** — `partial` · P3 · themes: interrupt, swap · code: ABILITY_ACTION_ROWS:3805, sonicVoiceFor:31243, GAUNTLETS:40107
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Move with the Sonic keyword
    The triggering Move may be originated from any square within 3 meters of the user and may become Ghost Typed. If the Move was a Status Class Move, you may treat it as a Special Move with DB1. This ability may not be used with Perish Song.

- ✅ **Heat Mirage** — `auto` · P3 · themes: interrupt, multiturn, damage · code: ABILITY_ACTION_ROWS:3684, GAUNTLETS:40033
  - _At-Will - Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user uses a Fire-Type Move
    The user's Evasion is increased by +3 until the beginning of their next turn.

- ✅ **Horde Break** — `auto` · P3 · themes: interrupt, cure · code: ABILITY_ACTION_ROWS:3744
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Trigger: The user changes from School Form to Solo Form
    The user is cured of all Status Conditions.

- 🟡 **Ignition Boost** — `partial` · P3 · themes: interrupt, damage · code: ABILITY_ACTION_ROWS:3841
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: An adjacent Ally uses a Fire-Type Move
    The allied target gains a +5 Bonus to its damage roll with the triggering Move.  A target may not benefit from more than one instance of Ignition Boost at a time.

- ⚪ **Imposter [Errata]** — `manual` · P3 · themes: interrupt
  - _Static · 2-16 Errata_
  - note: Transform as a Free Interrupt - Transform exists as a Move; the interrupt timing is the table's
  - If the user is not Transformed, they may use Transform as a Free-Action Interrupt.

- ✅ **Justified** — `auto` · P3 · themes: interrupt, cs, skill · code: ABILITY_REACTIONS:25046, GAUNTLETS:40183
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a damaging Dark Type Move
    The user may raise its Attack 1 Combat Stage. The user always gains a +4 bonus to Skill Checks made to Intercept.

- ✅ **Justified [Errata]** — `auto` · P3 · themes: interrupt, cs, skill
  - _At-Will - Free Action · 2-16 Errata_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a damaging Dark Type Move or Attack of Opportunity
    The user may raise its Attack by +1 Combat Stage.
    Bonus: The user always gains a +4 bonus to Skill Checks made to Intercept.

- ⚪ **Kampfgeist [Errata]** — `manual` · P3 · themes: interrupt, typing, damage
  - _Scene - Free Action · 2-16 Errata_
  - note: One-step resist on a Bug/Dark/Rock hit chosen after seeing it - applied with the Effectiveness - button
  - Trigger: The user takes Bug, Dark, or Rock-Type Damage
    The triggering damage is resisted one step further.
    Bonus: The user gains STAB on Fighting-Type Moves.

- ⛔ **Leaf Rush** — `skip` · P3 · themes: interrupt, damage, stat
  - _Scene x2 - Free Action, Priority · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate Leaf Rush to use a Grass-Type Move with Priority. If the Move is a Damaging Move, the user adds half their Speed Stat to the Damage Roll.

- ⛔ **Lightning Kicks** — `skip` · P3 · themes: interrupt, swap · code: GAUNTLETS:40034
  - _Scene -  Free Action_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate this Ability to use any Move with "Kick" in the name as a Priority Move.

- ⛔ **Lightning Kicks [Errata]** — `skip` · P3 · themes: interrupt, swap, damage
  - _Scene - Free Action · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate this Ability to use any Move with "Kick" in the name as a Priority Move, and gain a +4 Bonus to the attack's Accuracy Roll.

- 🟡 **Liquid Voice** — `partial` · P3 · themes: interrupt · code: ABILITY_ACTION_ROWS:3804, sonicVoiceFor:31240, GAUNTLETS:40095
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Move with the [Sonic] keyword
    The triggering move loses the [Sonic] keyword, but gains the Friendly keyword and becomes Water Typed. If the Move was a Status Class Move, you may treat it as a Special Move with DB1.

- ⛔ **Maestrom Pulse** — `skip` · P3 · themes: interrupt, damage, stat
  - _Scene x2 - Free Action, Priority · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user may activate Maelstrom Pulse to use a Water-Type Move with Priority. If the Move is a Damaging Move, the user adds half their Speed Stat to the Damage Roll.

- ✅ **Magician** — `auto` · P3 · themes: interrupt, swap · code: ABILITY_REACTIONS:25066
  - _Scene - Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user hits a foe with a damaging Single-Target attack
    The user takes the target's Held Item. This Ability may not be triggered if the user is already holding a Held Item.

<a id="abilities-04"></a>
## `abilities-04` — Interrupts, reactions & priority (4/5)

P3 · 10 open of 20 · open

- 🟡 **Minus [SwSh]** — `partial` · P3 · themes: interrupt, cs, skill, stat · code: ABILITY_ACTION_ROWS:3810
  - _Scene x2 - Free Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: A foe within 10m has Combat Stages lowered
    The target loses an additional Combat Stage in one stat lowered by the triggering effect.

- ⚪ **Mirror Armor** — `manual` · P3 · themes: interrupt, swap, cs, stat
  - _At-Will - Free Action, Reaction_
  - note: Reflects CS drops back at the foe - needs a hook on every CS-lowering effect
  - Trigger: A foe's Move or Ability directly lowers the user's CS (including Effect Ranges, but not including things like Status)
    The user's CS are instead not lowered, and the triggering foe's CS in the affected stats are instead lowered the same amount the user's would have been.

- 🟡 **Mycelium Might** — `partial` · P3 · themes: interrupt, swap, action · code: ABILITY_ACTION_ROWS:3808
  - _Scene - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: A Round of Initiative ends
    The user may target a foe with a Status-Class Move as a Free Action. The foe's Abilities are ignored for this Move, Grass-Types are affected even if the Move has the Powder keyword, and Blessings or Interrupts cannot be activated in response.

- 🟡 **Opportunist** — `partial` · P3 · themes: interrupt, cs, skill · code: ABILITY_ACTION_ROWS:3809
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The Combat Stages of a foe are raised
    The Combat Stages of either the user or an adjacent ally are raised the same amount. 14 Unofficial Homebrew

- ✅ **Pickpocket** — `auto` · P3 · themes: interrupt, swap · code: ABILITY_REACTIONS:25065
  - _Scene -  Free Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user is hit by an opponent with a Melee Move
    If the opponent has a Held Item and the user does not, the user takes the Held Item the opponent is holding.

- 🟡 **Plus [SwSh]** — `partial` · P3 · themes: interrupt, cs, skill, stat · code: ABILITY_ACTION_ROWS:3810
  - _Scene x2 - Free Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: An ally within 10m has Combat Stages raised
    The target gains an additional Combat Stage in one stat raised by the triggering effect.

- ⚪ **Propeller Tail** — `manual` · P3 · themes: interrupt, swap, action
  - _Scene - Swift Action_
  - note: positional or item-slot rule the Map does not model
  - The user may make a Sprint Maneuver as a Free Action.
    Bonus: The user may not be Intercepted, nor may any Abilities, Moves, or Features be activated to change the user's target. Any of those existing effects (such as Follow Me) fail.

- 🟡 **Psionic Screech** — `partial` · P3 · themes: interrupt, status · code: ABILITY_ACTION_ROWS:3803
  - _Scene x2 - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Flying-Type Move
    The Move is changed to be the Psychic Type. Any targets hit by the attack are Flinched.

- ⚪ **Queenly Majesty** — `manual` · P3 · themes: interrupt, action
  - _Scene x2 - Free Action_
  - note: Stomp interrupt + immunity to Interrupts - interrupt timing is the table's
  - Connection - Stomp - if an adjacent target uses a Priority Move or an Interrupt action, the user may attack that target with Stomp as a Free Action Interrupt.    Bonus: The user cannot be targeted by Interrupt Moves and enemies may not activate Interrupts in response to the user's actions.

- 🟡 **Quick Draw** — `partial` · P3 · themes: interrupt, status, action, social · code: STATUS_IMMUNE_ABILITIES:906
  - _Scene - Free Action, Interrupt_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (the Bonus); left: the Interrupt Move and its -2 attack penalty
  - Trigger: A foe uses a Move, and the user has not acted this round
    The user immediately uses a Move on the triggering foe as a Standard Action Interrupt (this Move must still obey Frequency and Range). If this Move hits, the foe also gains a -2 penalty to their attack roll for the triggering attack, unless the foe cannot Flinch. 
    Bonus: The user cannot be Flinched. Defensive.

- ✅ **Rattled** — `auto` · P3 · themes: interrupt, cs, skill · code: ABILITY_REACTIONS:25045
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Bug, Dark, or Ghost Type Move
    The user's Speed is raised by +1 Combat Stage.

- 🟡 **Revelation** — `partial` · P3 · themes: interrupt, multiturn, damage, action · code: ABILITY_ACTION_ROWS:3773, GAUNTLETS:40007
  - _Scene x2 - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: Someone within 10 meters uses a damaging Dance Move
    The user may immediately use the triggering Move as a Standard Action interrupt.Bonus: Whenever the user uses a Dance Move, they gain +2 to Accuracy Rolls until the end of their next turn.

- ⛔ **Rocket** — `skip` · P3 · themes: interrupt, multiturn
  - _Scene - Swift Action_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user's Sky capability is increased by +3 until the end of the user's next turn, and the user goes first on the following round, ignoring initiative; Interrupt Moves may not be used in response to their Moves that round.

- ⛔ **Rocket [Errata]** — `skip` · P3 · themes: interrupt, swap
  - _Scene - Free Action · 2-16 Errata_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - Trigger: A Round Begins
    The user may take their turn at the top of the round. Priority, Interrupt, or Reaction Moves or Abilities cannot be declared in response to the user's turn.
    Bonus: The user's Sky capability is increased by +2

- ⚪ **Sequence** — `manual` · P3 · themes: interrupt, cs, damage, skill · code: attackTargetWidget:57541
  - _Scene -  Free Action_
  - note: Scene Free Action that raises Atk/SpAtk before damage and strips them after - a Combat Stage spike scoped to one attack; resolved at the table
  - Trigger: The user uses an Electric Attack
    For every allied Electric-Type Pokemon cardinally adjacent to the user, raise the user's Attack and Special Attack by +1 CS each before calculating damage for the triggering attack. After the attack is resolved, lose all Combat Stages gained this way.

- ✅ **Sequence [Errata]** — `auto` · P3 · themes: interrupt, damage · code: attackTargetWidget:57541
  - _At-Will - Free Action · 9-15 Errata_
  - note: v644: +3 damage per ADJACENT allied Electric-Type read from the Map (tokenTileGap) on every ticked target
  - Trigger: The user uses an Electric Attack
    For every allied Electric-Type Pokemon adjacent to the user, the triggering Attack deals an additional +3 Damage.

- 🟡 **Sharpness** — `partial` · P3 · themes: interrupt, status, cs, damage, action, stat · code: abilityDamageMods:26420, GAUNTLETS:39771
  - _Scene - Free Action_
  - note: v622: +2 DB on Slice-keyword Moves in abilityDamageMods; the Scene Free-Action trigger is at the table
  - Trigger: The user uses a Move with the Slice keyword
    The triggering Move ignores non-Speed Evasion, any DR, and the target's positive CS. Blessings may not be activated against it. After the Move is resolved, the user may Disengage up to 3m into any square adjacent to a target, as a Free Action. Bonus: The user increases the Damage Base of Moves with the Slice keyword by +2. Slice Moves: Aerial Ace, Air Cutter, Air Slash, Aqua Cutter, Behemoth Blade, Bitter Blade, Butterfly Knife*, Ceaseless Edge, Cross Poison, Cut, Dragon Claw, Fury Cutter, Kowtow Cleave, Leaf Blade, Metal Claw, Mighty Cleave, Night Slash, Occult Razor*, Population Bomb, Psyblade, Psycho Cut, Razor Leaf, Razor Shell, Razor …

- 🟡 **Skill Link** — `partial` · P3 · themes: interrupt · code: ABILITY_ACTION_ROWS:3806
  - _Scene -  Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user hits with a Move with the Five Strike keyword.
    The Triggering Move automatically hits 5 Times.

- 🟡 **Sleight of Hand** — `partial` · P3 · themes: interrupt, status, damage, action · code: ABILITY_ACTION_ROWS:3807
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user attacks with a damaging Move that cannot miss.
    The triggering Move instead has an AC of 2, but one legal target is Flinched on a successful hit. A target can only be flinched once per Scene by this effect. This effect must be declared before making the attack.

- ✅ **Spicy Spray** — `auto` · P3 · themes: interrupt, status · code: ABILITY_REACTIONS:25038
  - _Scene x2 - Free Action, Reaction_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a damaging attack
    The attacking foe becomes Burned.

<a id="abilities-05"></a>
## `abilities-05` — Interrupts, reactions & priority (5/5)

P3 · 6 open of 12 · open

- 🟡 **Spray Down [Errata]** — `partial` · P3 · themes: interrupt, typing, stat
  - _Scene x2 - Free Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user hits an airborne target with a ranged 1-target attack
    The triggering attack's target is knocked down to ground level, and loses all Sky or Levitate Speeds for 3 turns. During this time, they may be hit by Ground-Type Moves even if normally immune.

- 🟡 **Stalwart** — `partial` · P3 · themes: interrupt, swap, cs, damage · code: ABILITY_ACTION_ROWS:3692
  - _Scene - Free Action, Reaction_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user receives Massive Damage
    The user's Attack, Special Attack, Defense, and Special Defense all increase by 1 CS.
    Bonus: The user may not be Intercepted, nor may any Abilities, Moves, or Features be activated to change the user's target. Any of those existing effects (such as Follow Me) fail.

- 🟡 **Supremacy** — `partial` · P3 · themes: interrupt, control, status · code: ABILITY_ACTION_ROWS:3813
  - _Scene - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user hits with a Move that cannot miss
    Choose a legal target of the triggering Move. That target then reveals its Moves. Choose one of those Moves. That Move becomes Disabled for that target.

- ✅ **Tangling Hair** — `auto` · P3 · themes: interrupt, multiturn, status, cs, skill · code: ABILITY_REACTIONS:25040
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack
    The attacker receives -1 Speed Combat Stage and is Slowed until the end of its next turn.

- 🟡 **Thunder Boost** — `partial` · P3 · themes: interrupt, damage · code: ABILITY_ACTION_ROWS:3841
  - _At-Will - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: An adjacent Ally uses an Electric-Type Move
    The allied target gains a +5 Bonus to its damage roll with the triggering Move.  A target may not benefit from more than one instance of Thunder Boost at a time.

- 🟡 **Toxic Chain** — `partial` · P3 · themes: interrupt, status · code: ABILITY_ACTION_ROWS:3817
  - _Scene - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user Poisons a foe
    Choose another foe, they become Poisoned, and it and the triggering foe become Chained to each other. Whenever a foe is damaged, every foe Chained to them becomes Vulnerable for one full round.

- ✅ **Transistor** — `auto` · P3 · themes: interrupt, swap, status, typing · code: attackTargetWidget:57524
  - _Scene x2 - Free Action_
  - note: v644: attackTargetWidget toggle spends the Scene x2 use; first ticked target is one step more vulnerable, an immune one counts as doubly resisted first (typeMultAgainst immuneAs)
  - Trigger: The user hits with a damaging Electric-Type Move
    One target hit by the attack becomes one stage more vulnerable to the attack (applied after all other modifiers). Immune targets are treated as initially double-resistant for the purposes of this Ability, and may be damaged normally.

- 🟡 **Unnerve [Errata]** — `partial` · P3 · themes: interrupt, cs, skill · code: ABILITY_ACTION_ROWS:3812
  - _At-Will - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: A foe within 6 meters
    The target cannot gain positive Combat Stages or trade in Digestion Buffs for 1 full round.

- ⚪ **Variable Transmission** — `manual` · P3 · themes: interrupt, swap, status, skill
  - _Daily - Extended Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Trigger: The user is having a [Training] Feature applied by its Trainer.
    Connection - See Below. The user may choose one of the following Types. Until that [Training] Feature no longer applies, the user gains STAB on Moves of that Type and grants the Ability associated with that Type, as well as letting the user learn the Move of that Type as if it was a Move with the Connection keyword for this Ability. Innate. Type Ability Move Dark Intimidate Wicked Torque Fire Speed Boost Blazing Torque Poison Toxic Debris Noxious Torque Fairy Misty Surge Magical Torque Fighting Stamina Combat Torque

- ⚪ **Wandering Spirit** — `manual` · P3 · themes: interrupt, swap, skill
  - _Scene - Free Action, Reaction_
  - note: Ability swap with the attacker - Skill Swap isn't an engine yet
  - Trigger: The user is hit by a Melee attack
    The user exchanges Wandering Spirit with a random Ability of the opposing Pokemon, as per the Move Skill Swap.

- ⚪ **Weaponize** — `manual` · P3 · themes: interrupt, action
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - While being wielded as a Living Weapon and being actively Commanded as a Pokemon, the user may Intercept for its Wielder as a Free Action.

- ⚪ **Zero to Hero** — `manual` · P3 · themes: interrupt, swap, status, skill
  - _Scene - Shift Action_
  - note: positional or item-slot rule the Map does not model
  - Trigger: An ally is Fainted by a foe
    The user is removed from the field. When they gain Initiative the next time, choose an ally or the triggering foe. The user reappears on a square adjacent to the chosen target in Hero forme. The user returns to Zero forme when combat ends. Innate. 22 Unofficial Homebrew Updated Abilities Several old Abilities have been updated as part of this project, due to their performance in PTU Version 1.05 not measuring up to the Ability tiers they're often found in. Doing so made them more viable choices to give to new Pokemon, and thus influenced the decision-making involved with selecting Abilities throughout parts of this project. These can be considered optiona …

<a id="abilities-07"></a>
## `abilities-07` — Healing, drain, recoil & HP (2/3)

P3 · 10 open of 20 · open

- ✅ **Deep Sleep** — `auto` · P3 · themes: heal, interrupt, status · code: ABILITY_TURN_HOOKS:24326
  - _Static_
  - note: ABILITY_TURN_HOOKS row; fires from the Map ▶
  - When asleep, this Pokemon restores a Tick of Hit Points at the end of each turn.

- 🟡 **Defeatist [Errata]** — `partial` · P3 · themes: heal, damage · code: abilityDamageMods:26344
  - _Static · 2-16 Errata_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The user gain a +2d6 Bonus to Damage Rolls while over 50% of its Maximum Hit Points. While at 50% Max Hit Points or lower, the user gains a -5 penalty to Damage Rolls and +10 Initiative.

- 🟡 **Delayed Reaction** — `partial` · P3 · themes: heal, interrupt, multiturn, swap, damage · code: ABILITY_ACTION_ROWS:3762
  - _Scene -  Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user is hit by a direct damaging attack
    Halve the damage taken by the user. At the end of the user's next turn, the user loses Hit Points equal to the other half of the damage. For example, if the user is hit for 11 damage and triggers this Ability, the user would take 5 damage upon being hit and 6 damage at the end of its next turn. Defensive.

- 🟢 **Dreamspinner** — `likely` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3663
  - _Daily - Standard Action_
  - For each Sleeping Pokemon or Trainer within 10 meters, the user gains a Tick of Hit Points.

- ✅ **Dreamspinner [Errata]** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3663
  - _Scene x3 - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - All Sleeping Foes within 3 meters lose a Tick of Hit Points, and the user gains a Tick of Temporary Hit Points.

- ⚪ **Full Guard** — `manual` · P3 · themes: heal, interrupt, typing, damage
  - _Scene - Swift Action · 2-16 Errata_
  - note: Conditional one-step resist on a hit while holding Temp HP - applied with the Effectiveness - button
  - Trigger: You take Damage while having Temporary Hit Points
    You resist the triggering Damage one step further.
    Bonus: Whenever you take Super-Effective Damage and you have no Temporary Hit Points, you gain a tick of Temporary Hit Points. Defensive.

- 🟡 **Heatproof [Errata]** — `partial` · P3 · themes: heal, status, typing · code: defenseTypeMods:7742
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user resists Fire Type moves one step further, and does not lose Hit Points from the Burn Condition.

- ✅ **Juicy Energy** — `auto` · P3 · themes: heal, interrupt, stat · code: ABILITY_ACTION_ROWS:3756
  - _Daily - Free Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Trigger: The user trades in a Berry Juice Food Buff
    Instead of gaining 30 Hit Points, the user gains Hit Points equal to their Level.

- ✅ **Life Force [Errata]** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3673
  - _Daily x5 - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user gains a Tick of Hit Points.

- 🟢 **Liquid Ooze** — `likely` · P3 · themes: heal · code: defenseTypeMods:7743
  - _Static_
  - When the Pokemon with Liquid Ooze is damaged by Absorb, Drain Punch, Giga Drain, Horn Leech, Leech Life, Leech Seed or Mega Drain, that Move gains Recoil ½ and the Move's user does not gain any HP.

- 🟡 **Liquid Ooze [Errata]** — `partial` · P3 · themes: heal, status, typing, damage · code: defenseTypeMods:7743
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - This user resists Poison-Type Damage one step further. Additionally, when this user is damaged by Absorb, Drain Punch, Giga Drain, Horn Leech, Leech Life, or Mega Drain, that Move gains Recoil ½ and the Move's user does not gain any HP. If the user is hit by Leech Seed, the user does not lose Hit Points from Leech Seed; instead Leech Seed's user loses Hit Points equal to this user's Tick Value.

- ✅ **Lunchbox [Errata]** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3758
  - _Scene - Free Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Target: The user trades in a Food Buff
    The user gains a Tick of Temporary Hit Points. These Temporary Hit Points stack with any Temporary Hit Points granted by the triggering Food Buff.

- 🟡 **Magma Armor [Errata]** — `partial` · P3 · themes: heal, status, typing
  - _Static · 2-16 Errata_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off); left: the Tick on foes that hit it in Melee / end a turn grappling it
  - Whenever a foe hits you with a Melee Attack or ends their turn grappling you, they lose a tick of Hit Points. Foes immune to Burn do not suffer this effect.
    Bonus: The user cannot be Frozen. Defensive.

- 🟢 **Multiscale** — `likely` · P3 · themes: heal, interrupt, typing, damage · code: defenseTypeMods:7789, STAT_FAMILY:24749
  - _Static_
  - When at full Hit Points, when taking damage from a Move, half the total damage before applying weakness and resistance, after applying your Defenses. Defensive.

- ✅ **Multiscale [Errata]** — `auto` · P3 · themes: heal, typing, damage · code: defenseTypeMods:7789
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - While at full Hit Points, all damage taken is resisted one step further. Defensive.

- 🟡 **Perish Body** — `partial` · P3 · themes: heal, interrupt, damage, capture · code: ABILITY_ACTION_ROWS:3764
  - _Daily - Standard Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user is hit with a Melee attack
    The triggering creature and the user each receive a Perish Count of 3. At the beginning of each of the target's turns, their Perish count is lowered by 1. Once a Perish Count reaches 0, set the Pokemon's Hit Points to 0. A Perish Count disappears if a target returns to their Poke Ball, Takes a Breather, or is knocked out. Perish Body never causes Massive Damage. Defensive.

- ⚪ **Piercing Drill** — `manual` · P3 · themes: heal, damage
  - _Static_
  - note: Reactions / Interrupts may not be used against its Melee Attacks; a quarter damage through a shield - GM-adjudicated
  - Reactions, Interrupts, and Blessings may not be activated in response to the user's Melee Attacks; a target shielded by such an effect still loses Hit Points equal to a quarter of the Move's damage.

- ✅ **Poison Heal** — `auto` · P3 · themes: heal, interrupt, status, cure, cs, skill · engine: remember-only · code: ABILITY_ACTION_ROWS:3753
  - _Daily - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - Trigger: The user becomes Poisoned.
    For the rest of the encounter, while Poisoned or Badly Poisoned, the user gains a Tick of Hit Points at the beginning of each turn instead of losing any Hit Points from Poison. At the end of the encounter, the user is cured of the Poison Status. Additionally, the user does not have any Combat Stages lowered from being Poisoned.

- ✅ **Quick Feet** — `auto` · P3 · themes: heal, status, cs, skill · code: abilityStatusCS:26626
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - When Poisoned, Burned, Paralyzed, Frozen or put to Sleep, the user's Speed is raised 2 Combat Stages. The user does not lose Speed Combat Stages from Paralysis. If the user is healed all Status Conditions, their Speed is lowered appropriately.

- 🟡 **Quick Feet [Errata]** — `partial` · P3 · themes: heal, status, cs, skill · code: abilityStatusCS:26626
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; the Initiative half of Quick Feet [Errata]'s text is not
  - When Poisoned, Burned, Paralyzed, Frozen or put to Sleep, the user's Speed is raised 2 Combat Stages. The user's Initiative is not halved by Paralysis. If the user is healed all Status Conditions, their Speed is lowered appropriately.

<a id="abilities-08"></a>
## `abilities-08` — Healing, drain, recoil & HP (3/3)

P3 · 3 open of 9 · open

- ✅ **Shadow Shield** — `auto` · P3 · themes: heal, typing, damage · code: defenseTypeMods:7789
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - While at full Hit Points, the user resists all damage one step further. Defensive.

- 🟡 **Showdown Mode** — `partial` · P3 · themes: heal, damage, action · code: ABILITY_ACTION_ROWS:3624
  - _Scene - Swift Action, Priority (Limited)_
  - note: v644: press drops a showdown-mode buff - Melee Moves get +2 Crit Range (critThreshold) and +Tick damage (abilityDamageMods); the Tick lost after dealing it is by hand
  - The user enters Showdown Mode. While in Showdown Mode, the user's Melee Moves gain a +2 bonus to Critical Hit Range, deal bonus damage equal to the user's Tick Value, and after dealing damage with them, the user loses a Tick of Hit Points. The user may exit Showdown Mode as a Free Action.

- ✅ **Snuggle** — `auto` · P3 · themes: heal · code: ABILITY_ACTION_ROWS:3659
  - _Scene - Standard Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Target: An adjacent target
    The user and the target each gain two ticks of Temporary Hit Points.

- 🟡 **Tingle** — `partial` · P3 · themes: heal, interrupt, damage · code: ABILITY_REACTIONS:25058
  - _At-Will - Free Action · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user hits an adjacent target foe with a 1-Target attack
    The target loses a Tick of Hit Points and takes a -5 penalty to Damage Rolls for 1 full round.

- ✅ **Toxic Boost [Errata]** — `auto` · P3 · themes: heal, swap, status, typing, cs, skill · code: ABILITY_ACTION_ROWS:3679
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user gains +3 Attack and Special Attack Combat Stages. Toxic Boost may only be used while Poisoned or Badly Poisoned.
    Special: If the user has the Immunity Ability, they can still become Poisoned and Badly Poisoned but do not lose Hit Points from these conditions.

- ✅ **Toxic Nourishment** — `auto` · P3 · themes: heal, status, cure · code: ABILITY_ACTION_ROWS:3661
  - _Scene - Swift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Target: A Poisoned or Badly Poisoned character within 5m
    The target is cured of their Poison and the user gains 3 ticks of Temporary Hit Points.

- ⛔ **Triage** — `skip` · P3 · themes: heal, interrupt
  - _Static_
  - note: Priority is declared at the table; the initiative tracker has no priority lane to put it in
  - The user's moves with the Healing keyword may be used as Priority moves.

- 🟡 **Weeble** — `partial` · P3 · themes: heal, interrupt, damage · code: ABILITY_ACTION_ROWS:3815
  - _At-Will - Standard Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user is hit by a damaging attack
    The user may make an AC4 Physical Attack against an adjacent target. If the attack hits, the target loses Hit Points equal to 1/3rd of the damage taken by the user from the attack that triggered Weeble.

- ⚪ **Zen Mode** — `manual` · P3 · themes: heal, action, stat
  - _At-Will - Free Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Keep two sets of Base Stats for Darmanitan, the first set of Base Stats are its normal stats while the second will be referred to during Zen Mode. The HP Stat for both sets of Base Stats must be the same. If Darmanitan has its Base Stats altered in any way, both sets of Base Stats are affected. As a Free Action, Darmanitan may activate Zen Mode if it is at less than 50% of its full Hit Points. Darmanitan may change back from Zen Mode as a Free Action if its Hit Point total is at 50% or higher. Darmanitan may switch from one form to another once per Scene.

<a id="abilities-10"></a>
## `abilities-10` — Ability / item / stat swaps (2/2)

P3 · 1 open of 13 · open

- ⚪ **Leaf Gift** — `manual` · P3 · themes: swap, action
  - _Daily - Extended Action_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - The user is adept at crafting clothes for itself out of common leaves. As an extended action, the user may craft a Leaf Suit listed below by activating this Ability; each suit has different effects on the user. The user may only wear one Leaf Suit at a time; building a new suit destroys previous suits.
    
    Nourishing Suit - Effect: Grants the Sun Blanket and Leaf Guard Abilities.
    Heavy Suit - Effect: Grants the Sturdy and Overcoat Abilities.
    Vibrant Suit - Effect: Grants the Chlorophyll and Photosynthesis Abilities.

- ⚪ **Leafy Cloak** — `manual` · P3 · themes: swap
  - _Static · 2-16 Errata_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Whenever the user activates Leafy Cloak, they choose two of Chlorophyll, Leaf Guard, or Overcoat. Until the user activates Leafy Cloak again, they gain the chosen Abilities.

- ⚪ **Parental Bond** — `manual` · P3 · themes: swap, status, damage
  - _Static_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Only Kangaskhan with the Baby Template can be Mega Evolved and gain this Ability. While they have this Ability, the Baby gains 10 Damage Reduction, and will leave its mother's pouch and may be commanded to take action in battle. Both the Baby Kangaskhan with this Ability and its Mother may take their turn when the Mother takes its turn; the Baby will not willingly walk farther than 10 meters from its mother however. If the Baby Kangaskhan with this Ability is Fainted, its mother will become Enraged, and gain 5 Damage Reduction and +5 to Damage Rolls for the remainder of the Scene.

- ⚪ **Poltergeist [Errata]** — `manual` · P3 · themes: swap, stat
  - _Static · 2-16 Errata_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Rotom gains an Ability depending on what Form it has taken. If Rotom is level 40 or higher, it also may use a Move based on its Forme as if it that Move was on their Move List. (Ability - Move)
    
    Standard Rotom: Levitate - None
    Heat Rotom: Flash Fire - Overheat
    Wash Rotom: Water Absorb - Hydro Pump
    Frost Rotom: Winter's Kiss - Blizzard
    Fan Rotom: Windveiled - Hurricane
    Mow Rotom: Sap Sipper - Leaf Storm

- 🟡 **Power of Alchemy** — `partial` · P3 · themes: swap, status · code: ABILITY_ACTION_ROWS:3822
  - _Scene - Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: A Trainer or Pokemon within 10 meters
    The Pokemon gains an Ability known by the Target for the remainder of the encounter, or until it is Fainted.

- ⚪ **Quill & Rock** — `manual` · P3 · themes: swap, skill
  - _Static_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Squawkabilly's Advanced and High Abilities depend on their plumage color (decided upon generation). Innate. Plumage Color Advanced Ability High Ability Green Rockabilly Intimidate Blue Pack Hunt Defiant Yellow Vicious Reckless White Teamwork Ambush

- ⚪ **Seasonal** — `manual` · P3 · themes: swap
  - _Static · 2-16 Errata_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - The user gains an Ability based on the season.
    -Spring: Run Away
    -Summer: Grass Pelt
    -Autumn: Rivalry
    -Winter: Thick Fat

- ⚪ **Serpent's Mark** — `manual` · P3 · themes: swap, skill
  - _Static_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Arbok's Advanced and High Abilities depend on the Arbok's hood pattern. To determine its pattern, roll 1d6 upon evolution or upon generation. If an Arbok is bred, it will have the same pattern as its parent. If both parents are Arboks with different patterns, determine the pattern randomly.
    
    Pattern Name - Adv Ability / High Ability
    1) Attack Pattern - Rivalry / Strong Jaw
    2) Crush Pattern - Unnerve / Crush Trap
    3) Fear Pattern - Frighten / Regal Challenge
    4) Life Pattern - Regenerator / Defy Death
    5) Speed Pattern - Run Away / Speed Boost
    6) Stealth Pattern - Instinct / Infiltrator

- ⚪ **Serpent's Mark [Errata]** — `manual` · P3 · themes: swap, skill
  - _Static · 2-16 Errata_
  - note: roleplay, crafting or Forme/Ability-by-appearance rules resolved between sessions
  - Arbok's Advanced and High Abilities depend on the Arbok's hood pattern. To determine its pattern, roll 1d6 upon evolution or upon generation. If an Arbok is bred, it will have the same pattern as its parent. If both parents are Arboks with different patterns, flip a coin to decide which pattern is inherited.
    Pattern Name - Adv Ability / High Ability
    1) Attack Pattern - Strong Jaw / Guts
    2) Crush Pattern - Crush Trap / Frisk
    3) Fear Pattern - Unnerve / Regal Challenge
    4) Life Pattern - Regenerator / Defy Death
    5) Speed Pattern - Run Away / Speed Boost
    6) Stealth Pattern - Infiltrator / Ambush

- ⚪ **Splendorous Rider** — `manual` · P3 · themes: swap
  - _Scene x2 - Free Action_
  - note: positional or item-slot rule the Map does not model
  - The user may pick a Move from their Mount's known Moves that they do not already know. For the rest of the user's Turn, they may use that Move as though it was one of their own Moves. Note that this does not remove any frequency limitations - a Daily Move that the Mount knows may not be used more than once.
    This Ability may not be copied or transferred.

- ⚪ **Symbiosis** — `manual` · P3 · themes: swap
  - _At-Will -  Swift Action_
  - note: positional or item-slot rule the Map does not model
  - The user may pass its held item to an adjacent ally.

- ⚪ **Symbiosis [Errata]** — `manual` · P3 · themes: swap
  - _Scene - Swift Action · 2-16 Errata_
  - note: positional or item-slot rule the Map does not model
  - Target: An adjacent ally
    The user choses a Held Item they are holding. If the target is willing, they also gain the effects of the chosen item for the rest of the Scene. Items that are activated at a frequency may be activated independently by the user and the the target.

- ✅ **Unburden [Errata]** — `auto` · P3 · themes: swap, cs, skill · code: abilityStatusCS:26625
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The default state of the user's Speed is +2 Combat Stages. While holding a Held Item, the user's Speed is lowered by 2 Combat Stages.

<a id="abilities-12"></a>
## `abilities-12` — Movement, push & switching (2/2)

P3 · 7 open of 8 · open

- 🟡 **Shadow Tag** — `partial` · P3 · themes: position, status · code: ABILITY_ACTION_ROWS:3820, GAUNTLETS:40195
  - _Scene -  Free Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: An adjacent Trainer or Pokemon
    The target's shadow becomes pinned to the target's current spot for 5 turns. During this time, the target is Slowed and Trapped, and cannot move more than 5 meters from the spot their shadow is pinned to; even being Pushed and other forced movement effects cannot force the target to Move more than 5 meters from that spot.

- 🟡 **Sprint [Errata]** — `partial` · P3 · themes: position, interrupt, cs, skill · code: ABILITY_ACTION_ROWS:3690
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - Trigger: The user uses the Sprint Action during Combat
    The user gains +2 Speed Combat Stages.
    Bonus: The user's Overland Speed is increased by +2.

- 🟢 **Suction Cups [Errata]** — `likely` · P3 · themes: position, typing, damage · code: PUSH_IMMUNE_ABILITIES:23876
  - _At-Will - Shift Action · 2-16 Errata_
  - The user gains +5 Damage Reduction for 1 full round.
    Bonus: The user is immune to Push effects. Defensive.

- 🟢 **Sumo Stance** — `likely` · P3 · themes: position, typing · code: PUSH_IMMUNE_ABILITIES:23876, weightClassOf:23902
  - _Static_
  - The user's Weight Class is increased by +1, and the user is immune to Push effects. Defensive.

- 🟢 **Sumo Stance [Errata]** — `likely` · P3 · themes: position, interrupt, typing · code: PUSH_IMMUNE_ABILITIES:23876, weightClassOf:23902
  - _At-Will - Shift Action · 2-16 Errata_
  - Trigger: The user hits a foe with a Melee Attack
    The triggering foe is Pushed 1 meter away from the user and the user is immune to Push Effects for 1 full round.
    Bonus: The user's Weight Class is increased by +1.

- 🟡 **Sway** — `partial` · P3 · themes: position, interrupt · code: ABILITY_ACTION_ROWS:3814
  - _Scene - Standard Action, Interrupt_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user is hit by a damaging Melee Attack
    The triggering attack misses the user and hits the foe that made the attack instead. That foe may then be pushed to any empty square adjacent to the user.

- ✅ **Thrust** — `auto` · P3 · themes: position, stat · code: movePushNode:24024
  - _Static_
  - note: v644: movePushNode adds a 1 m Push clause to every Physical Move, +1 m when the Move already pushes
  - All moves used by this Pokemon which consult the Attack stat now have the Push keyword. The default push for moves is 1 meter. If a move already has the Push Keyword, that move may push 1 additional meter.

- 🟡 **Wind Rider** — `partial` · P3 · themes: position, interrupt, typing, cs, damage, action · code: ABILITY_ACTION_ROWS:3811
  - _At-Will - Free Action, Reaction_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: A foe or ally within 4m uses a Move with the Wind keyword
    The user may Disengage as a Free Action. Once per Scene, the user may also gain +1 CS in either Attack or Special Attack. Bonus: Whenever the user Disengages for any reason, they may Shift 2 meters instead of 1. Additionally, they are immune to the damage and effects of Moves with the Wind keyword. Defensive.

<a id="abilities-18"></a>
## `abilities-18` — Weather & Terrain (2/2)

P3 · 9 open of 20 · open

- 🟡 **Ice Jet** — `partial` · P3 · themes: weather, position, multiturn · code: ABILITY_ACTION_ROWS:3824
  - _Scene - Shift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user creates an area of Snow in a Burst 2 around themselves, as per the Move Snowscape, which lasts until the end of the user's next round. The user may also choose to Shift as though they had a speed of Sky 6, and does not provoke Attacks of Opportunity when moving this way. This movement may be made before or after creating the Snowstorm. Bonus: The user adds +1 to their Jump Capabilities.

- 🟢 **Leaf Guard** — `likely` · P3 · themes: weather, cure · code: ABILITY_ACTION_ROWS:3674, GAUNTLETS:40022
  - _Static_
  - At the end of the User's turn, if the weather is Sunny, the user is cured of one Status Condition.

- ✅ **Leaf Guard [Errata]** — `auto` · P3 · themes: weather, cure · code: ABILITY_ACTION_ROWS:3674
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user is cured of one Status Affliction. Leaf Guard's Frequency is ignored if used during Sunny Weather.

- ✅ **Mud Shield** — `auto` · P3 · themes: weather, heal, damage · code: ABILITY_ACTION_ROWS:3677
  - _Scene - Swift Action_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user gains two ticks worth of Temporary Hit Points.Bonus: When standing on any muddy or dirty terrain that is either Slow or Rough Terrain, the user gains +5 Damage Reduction. Defensive.

- 🟡 **Orichalcum Pulse** — `partial` · P3 · themes: weather, interrupt, multiturn, swap, status, typing, damage · code: ABILITY_ACTION_ROWS:3828
  - _Scene - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Trigger: The user uses a Physical Move
    The triggering Move gains Smite for this use. After resolving, create Prehistoric Weather in a Blast 5, centered on the user, that lasts until the end of the Encounter. Any combatants in those squares are affected by Prehistoric Weather, rather than any other Weather Effect. Prehistoric Weather counts as Sunny Weather for the purposes of any Abilities, Features or Moves, but Fire-type Moves gain a +10 damage bonus instead. Additionally, Combatants in Prehistoric Weather are immune to Frozen. Bonus: The squares in a Burst 1 around the user count as Prehistoric Weather.

- 🟡 **Permafrost** — `partial` · P3 · themes: weather, heal, status, typing, damage · code: defenseTypeMods:7782
  - _Static_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user gains 5 Damage Reduction against Super-Effective Damage. Additionally, whenever the user would lose a Tick of Hit Points due to an effect such as Sandstorm or the Burn Status condition, subtract 5 from the amount of Hit Points lost. Defensive.

- ⚪ **Permafrost [Errata]** — `manual` · P3 · themes: weather, heal, typing, damage
  - _Static · 2-16 Errata_
  - note: Immunity to every passive HP loss - needs a source tag on every HP write
  - The user is immune to damage and Hit Point loss from Hazards, Weather, Status Afflictions, Vortexes, Recoil, Hay Fever, Iron Barbs, Rough Skin, and Leech Seed. Defensive.

- 🟡 **Poison Puppeteer** — `partial` · P3 · themes: weather, position, status · code: ABILITY_ACTION_ROWS:3821
  - _At-Will - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: A Poisoned or Badly Poisoned foe within 3m
    The target is Pushed 3m in any direction of the user's choice. If this movement is stopped by Blocking Terrain, the target becomes Confused. If this movement is stopped by another foe, choose that foe or the target to become Poisoned or Confused.

- ✅ **Rain Dish [Errata]** — `auto` · P3 · themes: weather, heal · code: ABILITY_ACTION_ROWS:3669
  - _Daily x5 - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user gains a Tick of Hit Points. Rain Dish may only be used while the user is under 50% Hit Points or in Rainy Weather.

- 🟡 **Sand Rush [Errata]** — `partial` · P3 · themes: weather, heal, typing · code: abilityInitiative:52111
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - While in Sandstorming Weather or under 50% Max Hit Points, the user's Initiative is doubled.
    Bonus: The user is immune to Hit Point loss from Sandstorms.

- 🟡 **Sand Veil [Errata]** — `partial` · P3 · themes: weather, heal, damage · code: weatherEvasion:1587
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user gains +1 Evasion. This is increased to +2 Evasion while in a Sandstorm or sandy terrain. While in a Sandstorm, the user and adjacent allies do not lose Hit Points due to the Sandstorm.

- ⚪ **Screen Cleaner** — `manual` · P3 · themes: weather, typing · code: GAUNTLETS:40173
  - _Daily - Standard Action_
  - note: positional or item-slot rule the Map does not model
  - All Blessings on the field, both ally and enemy, are removed.
    Bonus: The user is immune to non-Blocking Hazards, and destroys them when moving over them. Blocking Hazards are treated instead as Slow Terrain for the purposes of movement only (the user may still not target through them), and are destroyed if moved through.

- ✅ **Slush Rush** — `auto` · P3 · themes: weather, heal · code: abilityInitiative:52112
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - While in Hailing Weather or under half maximum Hit Points, the user's Initiative is doubled.

- 🟡 **Snow Cloak [Errata]** — `partial` · P3 · themes: weather, heal, damage · code: weatherEvasion:1587
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user gains +1 Evasion. This is increased to +2 Evasion while in Hail or snowy terrain. While in Hail, the user and adjacent allies do not lose Hit Points due to the Hail.

- 🟡 **Sol Veil** — `partial` · P3 · themes: weather, damage · code: weatherEvasion:1587
  - _Static · 2-16 Errata_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - The user gains +1 Evasion. This is increased to +2 Evasion while in Sunny Weather or on grassy terrain. While in Sunny Weather, the user gains +5 Damage Reduction.

- ⚪ **Solar Power [Errata]** — `manual` · P3 · themes: weather, heal, interrupt, damage
  - _Scene x2 - Swift Action · 2-16 Errata_
  - note: Lose a Tick to add 5 + Tick to a damage roll - applied by hand on the roll
  - Trigger: The user rolls Damage
    The user loses a Tick of Hit Points, and gains a bonus to the triggering damage roll equal to 5 + their Tick Value. Solar Power may be activated ignoring Frequency while in Sunny Weather.

- ✅ **Sun Blanket [Errata]** — `auto` · P3 · themes: weather, heal, interrupt · code: ABILITY_ACTION_ROWS:3671
  - _Daily x5 - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - Trigger: The user gains Initiative
    The user gains a Tick of Hit Points. Sun Blanket may only be triggered while the user is under 50% Hit Points or in Sunny Weather.

- ✅ **Surge Surfer** — `auto` · P3 · themes: weather, heal · code: abilityInitiative:52113
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - On Electric Terrain or while under half maximum Hit Points, the user's Initiative is doubled.

- ✅ **Swift Swim [Errata]** — `auto` · P3 · themes: weather, heal · code: abilityInitiative:52112
  - _Static · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - While in Rainy Weather or under 50% Max Hit Points, the user's Initiative is doubled.

- ⚪ **Tower Shield** — `manual` · P3 · themes: weather
  - _Static_
  - note: positional or item-slot rule the Map does not model
  - The user counts as Blocking Terrain for the purposes of foes' Ranged attacks against allies.

<a id="abilities-20"></a>
## `abilities-20` — Status afflictions (2/2)

P3 · 8 open of 15 · open

- ✅ **Merciless** — `auto` · P3 · themes: status, damage · code: openMoveRoll:28803, attackTargetWidget:57659
  - _Static_
  - note: v644: openMoveRoll pre-rolls the crit's extra dice (ctx.forceCrit); the target picker adds them to every Poisoned / Badly Poisoned target, Shell Armor aware
  - Any attacks by the user against Poisoned targets are Critical Hits. They must still hit normally.

- ✅ **Own Tempo** — `auto` · P3 · themes: status, typing · code: STATUS_IMMUNE_ABILITIES:898, GAUNTLETS:40001
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off)
  - The user is immune to Confusion. Defensive.

- ✅ **Poison Touch** — `auto` · P3 · themes: status, damage · code: statusRangeAbility:26276
  - _Static_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The Pokemon's Moves which deal damage Poison Legal Targets on 19+. If a move already has a chance of Poisoning foes, Poison Touch increases the effect range by +2.

- 🟡 **Pride** — `partial` · P3 · themes: status, cs, skill · code: abilityStatusCS:26627
  - _Static_
  - note: v592 main effect automated; Bonus clause by hand (Sunny/Rainy activation, Injury purchases, -5 damage penalty, resist part, burn/weather HP loss, Weight Class, Save bonus, DR in Sun, sandstorm HP)
  - While suffering from Burn, Poison, Paralysis, Freezing, or while Asleep, the user's Special Attack is raised 2 Combat Stages. If suffering from none of these conditions, the user loses any Combat Stages gained this way.

- ✅ **Prime Fury [Errata]** — `auto` · P3 · themes: status, cs, skill · code: ABILITY_ACTION_ROWS:3682
  - _Scene - Swift Action · 2-16 Errata_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user becomes Enraged, and gains +1 Combat Stage in each of Attack and Special Attack.

- 🟡 **Ragelope** — `partial` · P3 · themes: status, cs · code: statusRangeAbility:26277
  - _Static · 2-16 Errata_
  - note: v644: Effect Range row (18+: Enraged lands on the user) added through statusRangeAbility; the +1 Speed / Attack CS half is read off the text
  - The user's Physical Attacks gain the following Effect Range: On 18+, the user becomes Enraged and gains +1 Speed CS. If the user is already Enraged, they gain +1 Attack CS instead.

- 🟡 **Rally [Errata]** — `partial` · P3 · themes: status, action · code: ABILITY_ACTION_ROWS:3818
  - _Scene - Swift Action · 2-16 Errata_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user and all allies within 10 meters may immediately Disengage 1 Meter as a free Action. Rally does not work on sleeping, paralyzed, stuck, fainted, or otherwise incapacitated allies.

- 🟡 **Regal Challenge** — `partial` · P3 · themes: status, cs, skill · code: ABILITY_ACTION_ROWS:3819
  - _Scene -  Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - Target: Pokemon or Trainer within 5 Meters
    Make an AC4 Status Attack against the target. If the attack hits, lower the target's Speed by 1 Combat Stage and the target is Slowed. If the attack misses, raise the user's Attack and Special Attack by +1 Combat Stage each.

- 🟡 **Slick Trail** — `partial` · P3 · themes: status · code: ABILITY_ACTION_ROWS:3825
  - _Scene - Swift Action_
  - note: v607 ABILITY_ACTION_ROWS press: records/announces; the rest is resolved at the table
  - The user leaves behind Slick Hazards in every square they move into this Turn, including the one their movement starts on. Bonus: The user may ignore Slick Hazards and does not have to stop shifting or become Vulnerable from them. 17 Unofficial Homebrew

- ✅ **Stench** — `auto` · P3 · themes: status · code: statusRangeAbility:26273
  - _Static_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The Pokemon's Moves Flinch Targets on a roll of 19+.  If a move already has a chance of Flinching foes, The Effect Range is increased by +2 instead.

- 🟡 **Stench [Errata]** — `partial` · P3 · themes: status, damage · code: statusRangeAbility:26274
  - _Static · 2-16 Errata_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The Pokemon's Moves Flinch Targets on a roll of 18+. If a move already has a chance of Flinching foes, the Effect Range is increased by +3 instead. Whenever the user Flinches a foe with an attack, that foe gains a -2 penalty to Accuracy Rolls for 1 full round.

- ✅ **Strange Tempo** — `auto` · P3 · themes: status, cure, cs, action, skill, stat · code: ABILITY_ACTION_ROWS:3746
  - _At-Will - Special_
  - note: v607 ABILITY_ACTION_ROWS press: applied for you
  - While Confused, the user may choose either to 1) As a Free Action, not to roll for Confusion, instead acting Normally or 2) As a Standard Action, cure themselves of Confusion and gain +2 Combat Stages to the Stat of their choIce.

- 🟡 **Supreme Overlord** — `partial` · P3 · themes: status, damage · code: abilityDamageMods:26348
  - _Static_
  - note: v608 abilityDamageMods dice slot / statusRangeAbility (roll modal); riders not covered are noted in the ledger text
  - The user gains a +1d6 bonus to Damage Rolls, and an additional +1d6 bonus to Damage Rolls for each ally that Fainted during this encounter.

- 🟢 **Tangled Feet** — `likely` · P3 · themes: status, damage · code: STATUS_IMMUNE_ABILITIES:912, weatherEvasion:1590
  - _Static_
  - While Confused, the user gains +3 Evasion.

- ✅ **Tochukaso** — `auto` · P3 · themes: status, typing · code: defenseTypeMods:7741
  - _Static_
  - note: v592: ABILITY_REACTIONS / ABILITY_ACTION_ROWS / abilityStatusCS / defenseTypeMods / abilityInitiative / pokeBaseStats
  - The user resists Bug-Type and Poison-Type attacks one step further. Defensive.

<a id="verify-abilities-01"></a>
## `verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 30 open of 40 · open

- 🟢 **Analytic** — `likely` · P1 (enc, player:Lysgd) · themes: damage · code: abilityDamageMods:26468, openMoveRoll:27617, moveRollFactsHTML:46212
  - _Static_
  - Whenever the user targets uses a damaging Move on a Pokemon or Trainer that have acted before it during Initiative this Round, that Move deals an additional +5 Damage.

- 🟢 **Battle Armor** — `likely` · P1 (enc, pc, player:Lázaro) · themes: typing, damage · engine: auto-note, remember-only · code: typeAbilityRow:4090, STAT_FAMILY:24745, AUTOMATED_ABILITIES:46344, CRIT_IMMUNE_ABILITIES:56889
  - _Static_
  - The user is immune to Critical Hits; they are instead normal hits. Defensive.

- 🟢 **Blaze** — `likely` · P1 (player:Lysgd) · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4783, GAUNTLETS:40107
  - _Static · Last Chance_
  - The user gains Last Chance with Fire.

- 🟢 **Bone Wielder** — `likely` · P1 (enc, player:Handels) · themes: swap, damage · code: typeMultAgainst:7234, boneWielderAcc:26542, boneWielderNeedsClub:26546, boneWielderPierces:26550, AUTOMATED_ABILITIES:46359, tokenDamageBreakdown:56558
  - _Static_
  - This ability is only functional if the user is holding a Thick Club item. The user gains a +1 Accuracy Bonus to Bone Club, Bonemerang, and Bone Rush. Additionally, the user cannot be disarmed, or have their Thick Club forcefully removed by Trick, Switcheroo, Thief, or any other Moves or effects unless the user wishes it.

- ✅ **Cursed Body** — `auto` · P1 (enc, pc, player:Handels) · themes: interrupt, control, status · code: FEATURE_ABILITY_CHOICES:9518, ABILITY_REACTIONS:25044
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Damaging Move.
    The Move becomes Disabled.

- ✅ **Disguise** — `auto` · P1 (player:Lázaro) · themes: interrupt, cs, stat · code: damageHealRow:8721, ABILITY_SHIELDS:24484
  - _Daily - Free Action_
  - note: v651: arms as a one-hit Shield; when the hit is voided coatsOnHit sets o.pendCS and pendingControl shows a +1 CS picker (one button per Stat)
  - Trigger: The user is hit by a damaging Move.
    The triggering attack attack instead misses and has no effect. The user then gains +1 CS in a Stat of their choice. [Defensive]

- ✅ **Effect Spore** — `auto` · P1 (player:Handels) · themes: interrupt, status · code: FEATURE_ABILITY_CHOICES:9512, ABILITY_REACTIONS:25036
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack
    Roll 1d6. On a result of 1 or 2, the attacker is Poisoned. On a result of 3 or 4, the attacker is Paralyzed. On a result of 5 or 6, the attacker falls asleep.

- 🟢 **Filter** — `likely` · P1 (enc, player:Handels) · themes: interrupt, typing, damage · engine: auto-note · code: defenseTypeMods:7778, STAT_FAMILY:24745, GAUNTLETS:40173, AUTOMATED_ABILITIES:46353
  - _Static_
  - When the user is hit by a Super-Effective attack, the attack deals x1.25 damage instead of x1.5 damage. If the user is hit by a Super-Super-Effective attack, the attack deals x1.5 damage instead of x2 damage. If you have both Solid Rock and Filter, you gain 5 Damage Reduction against Super-Effective Damage. Defensive.

- 🟢 **Flash Fire** — `likely` · P1 (enc, pc, player:Handels, player:Lysgd) · themes: typing, damage · engine: auto-note · code: typeMultAgainst:7263, TYPE_ABSORB_ABILITIES:7290, PTU_BUFFS:18338, buffApplies:18359
  - _Static_
  - The user is immune to the damage and effects of Fire-Type attacks. If the user is hit by a Fire-Type attack, the user gains a +5 Bonus to their next Damage Roll with a Fire-Type Move. Defensive.

- ✅ **Friend Guard** — `auto` · P1 (player:Lysgd) · themes: interrupt, typing, damage · code: ABILITY_ACTION_ROWS:3782, openCheerBrigade:31642, attackTargetWidget:57559
  - _Scene -  Free Action_
  - note: v645: attackTargetWidget lists every living Friend Guard holder with a use left; ticked, each ticked ALLY adjacent to it (tokenTileGap) resists the hit one step further
  - Trigger: An adjacent Ally takes Damage
    The damage is resisted one step further. Defensive.

- 🟢 **Guts** — `likely` · P1 (enc, player:Lázaro) · themes: status, cs, skill · engine: auto-note, remember-only · code: abilityStatusCS:26595, featMoveListPool:34826, AUTOMATED_ABILITIES:46331
  - _Static_
  - While suffering from Burn, Poison, Paralysis, Freezing, or while Asleep, the user's Attack is raised 2 Combat Stages. If suffering from none of these conditions, the user loses any Combat Stages gained this way.

- 🟢 **Hustle** — `likely` · P1 (enc, pc, player:Lysgd) · themes: damage · engine: auto-note · code: abilityDamageMods:26453, abilityAccMods:26581, AUTOMATED_ABILITIES:46316
  - _Static_
  - The user receives a -2 penalty to all Accuracy Rolls with Physical Attacks, and gains a +10 Bonus to all Physical Damage Rolls.

- ✅ **Ice Shield** — `auto` · P1 (enc, player:Handels) · themes: weather, barrier, heal, multiturn, damage · code: ABILITY_ACTION_ROWS:3783, FEATURE_ABILITY_CHOICES:9502, GAUNTLETS:40173
  - _Scene - Standard Action, Interrupt_
  - note: v653: ABILITY_ACTION_ROWS press spends the Scene use and drops 3 Ice Wall markers (HAZARDS icewall: 10 HP, 5 DR, Ice) when the GM has the Map up
  - The user places up to 3 segments of Ice Wall; each segment must be continuous with another segment, and at least one must be adjacent to the user. These Ice Walls count as Blocking Terrain and last until the end of the encounter or until they are destroyed. Each Ice Wall segment is 2 meters tall, 1 meter wide, and 2 centimeters thick. Each segment has 10 Hit Points, 5 Damage Reduction, and takes damage as if it was Ice-Type.

- 🟢 **Intimidate** — `likely` · P1 (enc, player:Lázaro) · themes: cs, skill · code: ABILITY_ACTION_ROWS:3526, MELEE_SKILL_SUBS:8827, trainerStruggle:8882, GIFTSAPPER_SKILLS:15838, SKILL_WORDS:22532, MENTOR_SKILL_OPTIONS:28983, FOE_FX:30970, MANIPULATE_EFFECTS:31527
  - _Scene - Swift Action_
  - Target: Pokemon or Trainer within 5 meters
    Lower the target's Attack 1 Combat Stage.

- 🟢 **Iron Fist** — `likely` · P1 (enc, player:Lysgd) · themes: heal, damage, skill, stat · engine: auto-note · code: abilityDamageMods:26326, AUTOMATED_ABILITIES:46307
  - _Static_
  - The user increases the Damage Base of the following Moves by +2; Bullet Punch, Comet Punch, Dizzy Punch, Drain Punch, Dynamic Punch, Fire Punch, Meteor Mash, Shadow Punch, Ice Punch, Mach Punch, Mega Punch, Sky Uppercut, Thunder Punch, Focus Punch, Hammer Arm, and Power-Up Punch.

- 🟡 **Keen Eye** — `partial` · P1 (enc, pc, player:Lysgd, player:Lázaro) · themes: swap, status, typing, damage, stat · code: STATUS_IMMUNE_ABILITIES:908, CS_LOWER_GUARDS:3397, ROTOM_POLTERGEIST:22211, GAUNTLETS:40021
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Blind, not Defensive); Accuracy-can't-be-lowered is CS_LOWER_GUARDS (not re-verified); left: ignore Accuracy Penalties + non-Stat Evasion
  - The user's Accuracy cannot be lowered, their attacks cannot have Accuracy Penalties (such as from Illuminate), the user is immune to the Blind condition (but not Total Blindness), and the user ignores any Evasion not directly derived from Stats (such as from the Instinct Ability, or from moves like Minimize).

- 🟢 **Levitate** — `likely` · P1 (enc, pc, player:Lysgd, player:Lázaro) · themes: typing, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7269, trainerDerivedGrid:11712, PE_MOBILITY:19483, capabilityHelp:21443, CAP_NUM_FIELDS:21449, CAP_FIELD_LABEL:21451, ABILITY_CAP_GRANTS:21504, monCapabilities:21605
  - _Static_
  - The Pokemon is immune to the damage and effects of Ground Type Moves, and gains a Levitate Speed of 4, or has existing Levitate Speeds increased by +2. Defensive.

- 🟢 **Mold Breaker** — `likely` · P1 (enc, player:Lázaro) · themes: swap · code: toggleStatus:854, typeAbilityRow:3919, MOLD_BREAKERS:7844, GAUNTLETS:39771
  - _Static_
  - The user ignores the effect of enemies' Defensive Abilities.

- 🟢 **Omen** — `likely` · P1 (enc, player:Lázaro) · themes: damage · code: openOmen:3490, typeAbilityRow:3955, FEATURE_ABILITY_CHOICES:9518
  - _Scene - Swift Action_
  - Choose a Pokemon or Trainer within 5 meters. The target's Accuracy is lowered by 2.

- 🟢 **Pressure** — `likely` · P1 (enc, player:Lázaro) · themes: status · engine: remember-only · code: typeAbilityRow:3897, hasCorePressure:43890
  - _Static_
  - While within 3 meters of the user, all foes are Suppressed. This effect ends when the user is Fainted.

- ✅ **Rivalry** — `auto` · P1 (player:Lysgd) · themes: damage · code: AURA_DEFS:20546, LEGENDARY_AURAS:20681, attackTargetWidget:57599
  - _Static_
  - note: v619: attackTargetWidget adds +5 per target of the same gender (ctx.attacker)
  - Whenever the user deals direct damage to a target of the same gender, increase the Damage dealt by +5.

- 🟢 **Sand Veil** — `likely` · P1 (pc, player:Lázaro) · themes: weather, damage · code: WEATHER_DEFS:1500, weatherEvasion:1587, FEATURE_ABILITY_CHOICES:9506
  - _Static_
  - The user's Evasion is increased by +2 while in a Sandstorm. The user and allies adjacent to the user are not damaged by the Sandstorm.

- 🟢 **Scrappy** — `likely` · P1 (enc, player:Handels) · themes: typing · engine: auto-note · code: scrappyPierces:26559, GAUNTLETS:40034, AUTOMATED_ABILITIES:46358
  - _Static_
  - Ghosts are not immune to the user's Normal and Fighting-Type Moves.

- 🟢 **Snow Cloak** — `likely` · P1 (enc, player:Lysgd) · themes: weather, damage · engine: auto-note, remember-auto · code: WEATHER_DEFS:1518, weatherEvasion:1587, AUTOMATED_ABILITIES:46340
  - _Static_
  - The user's Evasion is increased by +2 while in Hail. The user and allies adjacent to the user are not damaged by Hail.

- 🟢 **Soulstealer** — `likely` · P1 (enc, player:Handels) · themes: heal, interrupt · code: INJURY_SOURCES:5963
  - _Scene - Free Action_
  - Trigger: The user's attack causes a foe to Faint
    The user removes one Injury from themselves and recovers 25% of their Maximum Hit Points. If the triggering attack killed its target, the user instead removes all Injuries and recovers all Hit Points.

- ✅ **Sound Lance** — `auto` · P1 (player:Handels) · themes: interrupt, damage · engine: move-rider · code: ABILITY_ACTION_ROWS:3607
  - _Scene x2 - Swift Action_
  - note: v645 ABILITY_ACTION_ROWS press opens the target picker pre-filled with the user's Special Attack as Special Normal damage
  - Trigger: The user uses Supersonic
    Connection - Supersonic. The target of Supersonic takes Special Normal-Type damage equal to the user's Special Attack score. This effect functions independently of whether Supersonic hits its target.

- ✅ **Soundproof** — `auto` · P1 (enc, pc, player:Handels, player:Hugo) · themes: typing · code: FEATURE_ABILITY_CHOICES:9516, soundproofHears:31123, GAUNTLETS:40086, tokenDamageBreakdown:56556
  - _Static_
  - note: v615: Sonic Moves carry moveRule.sonic; tokenDamageBreakdown zeroes damage vs Soundproof
  - The Pokemon is immune to Moves with the Sonic Keyword. Defensive.

- ✅ **Stamina** — `auto` · P1 (enc, player:Handels) · themes: interrupt, cs, skill · code: EDGE_FX:130, ABILITY_REACTIONS:25049
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Damaging Attack
    The user receives +1 Defense Combat Stage. [Defensive]

- 🟢 **Swift Swim** — `likely` · P1 (enc, pc, player:Lázaro) · themes: weather, cs, skill · engine: auto-note · code: WEATHER_DEFS:1481, GAUNTLETS:39770, AUTOMATED_ABILITIES:46337, abilityInitiative:52112
  - _Static_
  - While in Rainy Weather, the user gains +4 Speed Combat Stages.

- 🟢 **Technician** — `likely` · P1 (enc, player:Handels) · themes: damage, stat · engine: auto-note, remember-only · code: abilityDamageMods:26330, GAUNTLETS:39775, AUTOMATED_ABILITIES:46306
  - _Static_
  - Moves with a Damage Base of 6 or lower have their Damage Base increased by +2. This bonus always applies to Moves with the Double Strike or Fivestrike Keywords.

- 🟢 **Thick Fat** — `likely` · P1 (enc, player:Handels) · themes: typing · engine: auto-note · code: defenseTypeMods:7736, AUTOMATED_ABILITIES:46347
  - _Static_
  - The user resists Fire-Type and Ice-Type attacks one step further. Defensive.

- 🟢 **Weird Power** — `likely` · P1 (enc, pc, player:Lázaro) · themes: damage, stat · code: crossStatDamage:9439, abilityDamageMods:26443
  - _Static · 2-16 Errata_
  - If the user's Attack is higher than its Special Attack, the user may add its Attack Stat to its Special Damage Rolls. If their Special Attack is higher, they user may add its Special Attack Stat to its Physical Damage Rolls. This does not stack with Mixed Power.

- 🟢 **White Flame** — `likely` · P1 (player:Handels) · themes: status, cure, damage · code: POWER_OF_RAGE_ABILITIES:9416, rageAbilityDamage:9417, berserkerCard:9772
  - _Static_
  - The user may not make rolls to cure themselves from the Enraged condition. However, while Enraged, the user gains a +5 Bonus to all Damage Rolls.

- 🟢 **Aerilate** — `likely` · P2 (enc) · themes: interrupt · engine: auto-note · code: ATE_ABILITIES:22222, AUTOMATED_ABILITIES:46321
  - _At Will -  Free Action_
  - Trigger: The User uses a Normal Type Damaging Move.
    The Move is Changed to Flying Type.

- 🟢 **Ancestral Connection** — `likely` · P2 (enc) · themes: interrupt, typing, damage, action · engine: auto-note · code: openMoveRoll:28343, AUTOMATED_ABILITIES:46329
  - _Static_
  - Trigger: The user hits a target with a damaging Move.
    Target: The triggering Move's target
    Whenever the user hits a target with a damaging Move, the spirit of its departed parent lashes out at that same target. The user immediately makes a Ghost-Type Struggle Attack against it as a Free Action, resolved with its own Accuracy Roll and Damage Roll; it may Critical Hit on its own. This bonus attack cannot trigger Ancestral Connection again.

- 🟢 **Anchored** — `likely` · P2 (enc) · themes: position, damage, action · engine: auto-note · code: openMoveRoll:27452, GAUNTLETS:39788, moveRollFactsHTML:46211, AUTOMATED_ABILITIES:46328
  - _Static_
  - Dhelmise has an Anchor token on the field, which occupies one square as if it is Medium sized but is otherwise ignored for cover and targeting. Dhelmise cannot move or be moved more than 3 meters away from its Anchor, willingly or otherwise. The Anchor token itself cannot be pushed, pulled, or moved against Dhelmise's will in any way. Dhelmise may shift their Anchor Token as a Swift Action, moving it to any open space within 3 meters of itself.
    Bonus: When the user Shifts the Anchor, it may immediately afterwards originate a damaging attack from its
    Anchor if it has the appropriate action available, giving that attack the following properties: the attack's range changes to "Melee, 1 Target", …

- ⚪ **Aqua Bullet** — `manual` · P2 (enc) · themes: action · engine: move-rider · code: GAUNTLETS:39786
  - _Static · 2-16 Errata_
  - note: Full-Action Sky 10 shift in a straight line - movement is the table's
  - Connection - Aqua Jet. The user may use Water-Type Moves as a Full Action to gain Sky 10 and shift in a straight line before attempting to use their Move. When shifting this way, the user does not provoke attacks of opportunity.

- 🟢 **Aura Storm** — `likely` · P2 (enc) · themes: heal, damage · code: typeAbilityRow:4074, auraStormBonus:4127, abilityDamageMods:26403
  - _Static_
  - For each injury the user has, they gain a +3 Damage bonus to all Moves with the Aura keyword. Additionally, while the user is at or under ½ of their Max Hit Points, they gain a +3 Damage Bonus to all Moves with the Aura Keyword.

- 🟢 **Chlorophyll** — `likely` · P2 (pc) · themes: weather, cs, skill · engine: auto-note · code: WEATHER_DEFS:1460, GAUNTLETS:40022, AUTOMATED_ABILITIES:46335, abilityInitiative:52111
  - _Static_
  - While in Sunny Weather, the user gains +4 Speed Combat Stages.

- 🟢 **Clear Body** — `likely` · P2 (enc, pc) · themes: swap, cs, skill · code: CS_LOWER_GUARDS:3398
  - _Static_
  - The user's Combat Stages may not be lowered by the effect of foes' Features, Abilities, or Moves. Status Affictions may still alter their Combat Stages. Defensive.

<a id="verify-abilities-02"></a>
## `verify-abilities-02` — Verify abilities the scan thinks are handled

P9 · 36 open of 40 · open

- 🟢 **Color Change** — `likely` · P2 (enc, pc) · themes: interrupt, typing · code: ENDABLE_TYPE_SHIFTS:2868, typeModsControl:3043
  - _At-Will - Free Action_
  - Trigger: The user is hit by a Move
    The User's Type changes to match the Type of the triggering Move.

- 🟢 **Commander** — `likely` · P2 (enc) · themes: position, interrupt, swap, action, stat · engine: remember-only · code: hasCommander:10157, PTU_BUFFS:18276, BUFF_CATS:18353, commanderTriggerRow:21999, derivedMonMoves:22125, derivedTrainerAttacks:22154, openGiveOrder:30561, commanderCard:31492
  - _At-Will - Swift Action_
  - Target: An adjacent Ally
    The user Attaches to the target. While Attached, the user occupies the target's square and replaces their Movement capabilities with the target's. Once per Round, the user and target may Intercept attacks for each other as a Free Action. Bonus: If the user is at least Level 30, while Attached, the target may use Order Up as though it were on their Move List. Special: If the target has the Mouthful Ability, they and the user may Intercept attacks any number of times per round for each other, instead of once.

- 🟢 **Compound Eyes** — `likely` · P2 (enc, pc) · themes: damage · engine: auto-note · code: FEATURE_ABILITY_CHOICES:9501, abilityAccMods:26579, AUTOMATED_ABILITIES:46318
  - _Static_
  - The user gains a +3 Bonus to all Accuracy Rolls.

- ✅ **Copy Master** — `auto` · P2 (enc, pc) · themes: control, cs, skill, stat · engine: move-rider · code: CONNECTION_USE_FX:30278
  - _Static_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (+1 CS picker)
  - Connection - Copycat. Whenever the user uses Copycat or Mimic, it gains +1 Combat Stage in a Stat of its choIce after the Move is resolved.

- 🟡 **Danger Syrup** — `partial` · P2 (pc) · themes: action · engine: move-rider · code: CONNECTION_STATUS:22698
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Sweet Scent.  If the user it hit by a damaging attack, it may use Sweet Scent as a Free action, frequency allowing.

- 🟡 **Decoy** — `partial` · P2 (pc) · themes: multiturn, control, damage · engine: move-rider · code: ABILITY_ACTION_ROWS:3616, GAUNTLETS:39802
  - _Daily - Free Action_
  - note: v644 ABILITY_ACTION_ROWS press: +2 Evasion until the end of the next turn; Follow Me's redirect is by hand
  - The user uses the Move "Follow Me" as if it was on their Move List, and their Evasion is raised by +2 until the end of their next turn.

- ✅ **Discipline** — `auto` · P2 (enc) · themes: status, cure · code: ABILITY_ACTION_ROWS:3604, typeAbilityRow:3939, GAUNTLETS:40109
  - _Scene -  Free Action_
  - note: v645 ABILITY_ACTION_ROWS press: cures Confused / Enraged / Infatuated / Flinched
  - If the user gains initiative and is Confused, Enraged, Infatuated, or Flinched, they may activate Discipline to cure themselves of any of these conditions.

- 🟢 **Dry Skin** — `likely` · P2 (pc) · themes: weather, heal, typing, damage · engine: auto-note · code: WEATHER_DEFS:1462, TYPE_ABSORB_ABILITIES:7275, absorbEntriesFor:7321, applyTokenDamage:56808
  - _Static_
  - Whenever the user is hit by a damaging Fire-Type Move or ends their turn in Sunny Weather, they lose a Tick of Hit Points. The user is immune to the damage and effects of Water-Type Moves, and whenever the user is hit by a damaging Water-Type Move or ends their turn in Rainy Weather, they gain a Tick of Hit Points.

- 🟢 **Fiery Crash** — `likely` · P2 (enc) · themes: status, damage, stat · engine: auto-note · code: fieryCrashInfo:26226, fieryCrashThresholds:26250, simProfile:44680, AUTOMATED_ABILITIES:46313
  - _Static_
  - Whenever the user uses a Move with the Dash keyword, they may either increase that Move's Damage Base by +2, or change the Move to be Fire-Type if it was not already. All Moves with the Dash keyword performed as Fire-Typed burn their target on 19+, or increase the effect range by +2 if they could already inflict Burn.

- 🟢 **Flash Fire [Errata]** — `likely` · P2 (enc) · themes: typing, cs, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7290
  - _Static · 2-16 Errata_
  - The user is immune to the damage and effects of Fire-Type attacks. If the user is hit by a Fire-Type attack, they gain +1 CS in their choice of Attack or Special Attack. Defensive.

- 🟢 **Forecast** — `likely` · P2 (enc, pc) · themes: weather, typing · code: autoTypeAbility:2426, typeModsTag:2761
  - _Static_
  - The user's Type changes depending on the weather. It changes to Fire Type if it is Sunny, Ice Type if it is Hailing, Water Type if it is Rainy, and Rock Type if there is a Sandstorm. It returns to Normal Type if it is in normal weather or foggy weather. If there are multiple Weather Effects on the field, choose one type for the user to be that corresponds with an existing Weather Effect.

- 🟡 **Forewarn** — `partial` · P2 (player:Hugo) · themes: damage · code: ABILITY_ACTION_ROWS:3780, researcherCard:37291, GAUNTLETS:40171
  - _Scene -  Free Action_
  - note: v617 verify sweep: found unhandled, added STATIC_ABILITY_EVASION / ABILITY_ACTION_ROWS / MOVE_FX_ROWS
  - Target: A Pokemon or Trainer
    The Move with the highest Damage Dice Roll known by the targeted foe is revealed. If there is a tie, all tied Moves are revealed. The Moves revealed gain a -2 Penalty during Accuracy Checks when used by the target for the rest of the encounter.

- 🟢 **Fur Coat** — `likely` · P2 (enc) · themes: typing · engine: auto-note, remember-auto · code: defenseTypeMods:7728, AUTOMATED_ABILITIES:46356, tokenDamageBreakdown:56623
  - _Static_
  - The user resists all Physical Attacks one step further. Defensive.

- 🟢 **Giver** — `likely` · P2 (enc) · themes: damage · engine: move-rider · code: reactionEffectLines:25142
  - _Scene x2 - Swift Action · 2-16 Errata_
  - Connection - Present. After rolling to determine Present's Damage Base, you may choose to ignore the roll and act as if you had rolled a 1 or a 5.
    Bonus: The user may know any number of TM and Tutor Moves, instead of a maximum of three.

- 🟢 **Grass Pelt** — `likely` · P2 (enc, pc) · themes: weather, damage · code: ABILITY_ACTION_ROWS:3567, ROTOM_POLTERGEIST:22212
  - _Static_
  - When standing on any grassy or leafy terrain that is either Slow or Rough Terrain, the user gains +5 Damage Reduction. Defensive.

- 🟡 **Gulp Missile** — `partial` · P2 (pc) · themes: heal, interrupt, status, cs, damage · engine: move-rider
  - _Scene x2 - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses Stockpile, Surf, or Dive
    Connection - Stockpile. The next time the user is damaged, it rolls an AC 4 Physical Attack against the attacker, even if the user Faints. On a hit, the target loses 2 ticks of HP. In addition, if the hit roll was successful, on an even roll the target is Paralyzed; on an odd roll, the target instead loses 1 Defense CS.

- 🟢 **Harvest** — `likely` · P2 (enc) · themes: weather, swap, action · code: tradeInDigestion:19079, digestionCard:19226, openSeedBag:36232
  - _At Will - Free Action_
  - Whenever the user trades in a Digestion/Food Buff from a Berry, flip a coin. On heads, the user gains all the benefits of the Digestion/Food Buff, but the Buff is not used up. On tails, the Buff is consumed normally. While in Sunny Weather, the Buff is never consumed. The user may trade in a Digestion/Food Buff up to once per turn during an encounter, but only until they flip "Tails".

- 🟢 **Hyper Cutter** — `likely` · P2 (enc, pc) · themes: cs, skill, stat · engine: remember-only · code: CS_LOWER_GUARDS:3397
  - _Static_
  - The user's Attack Stat may not be lowered, and its Attack Combat Stages may not be lowered. Defensive.

- 🟢 **Ice Body** — `likely` · P2 (enc, pc) · themes: weather, heal · engine: remember-only · code: WEATHER_DEFS:1523, ABILITY_ACTION_ROWS:3564
  - _Static_
  - While Hailing, the user gains a Tick of Hit Points at the beginning of each of their turns. The user is not damaged by Hail.

- 🟢 **Icey Surge** — `likely` · P2 (enc) · themes: weather · code: TERRAIN_SETTER_ABILITIES:3393
  - _Scene x3 - Swift Action_
  - The Field becomes Icey, as if affected by the Move Icey Terrain, for one full round.

- ✅ **Illuminate** — `auto` · P2 (enc) · themes: status, damage · code: STATIC_ABILITY_EVASION:1581, FEATURE_ABILITY_CHOICES:9504
  - _Static_
  - note: v617 verify sweep: found unhandled, added STATIC_ABILITY_EVASION / ABILITY_ACTION_ROWS / MOVE_FX_ROWS
  - Attacks that target the user have a -2 Accuracy Penalty against the user. Does not affect attackers with the Blindsense Capability. Defensive.

- 🟢 **Illusion** — `likely` · P2 (enc) · themes: control, action, skill, capture · engine: remember-auto · code: illusionCard:27182, GROUP_KEYWORDS:30122
  - _Special_
  - As a Standard Action, the user may mark an object, Pokemon, or Trainer. The user may have a number of targets marked equal to their Focus Rank; to mark a new target, an old mark must be forfeited. Once per round as a Free Action, the user may use illusory powers to make itself look exactly like a marked target. This may be done as the user is being released from a Poke Ball. This change is aesthetic and does not affect typing or Moves. The illusion allows the user to vaguely mimic sounds made by its marked target, but it is not capable of intelligible speech. Whenever the user is hit by a damaging Move, the Illusion is destroyed. The user may also dismiss the Illusion as a Free Action.

- 🟢 **Impostor** — `likely` · P2 (enc) · themes: interrupt, control, swap, cs, action, skill · engine: move-rider, remember-only · code: typeAbilityRow:3934
  - _At-Will_
  - Trigger: Ditto enters the encounter
    When Ditto is sent out, it may use the Move Transform as a free action. If the target of Transform has any modified Combat Stages, apply these Combat Stages to Ditto. One of the target's Abilities is randomly assigned to Ditto until Ditto uses Transform again.

- 🟢 **Last Chance** — `likely` · P2 (enc) · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4785, normPokemon:6827, namedLastChanceGrants:20939, typeAceAbilityText:21052, openTypeAceGrant:21062, grantExtraOrdinary:21082, abilityDamageMods:26460, rememberFeatures:34204
  - _Static · Last Chance_
  - The user gains Last Chance with Normal.

- 🟢 **Life Force** — `likely` · P2 (enc) · themes: heal · code: ABILITY_ACTION_ROWS:3673, FEATURE_ABILITY_CHOICES:9512, GAUNTLETS:40184
  - _Daily x5 - Swift Action_
  - The user gains a Tick of Hit Points.

- 🟢 **Lightning Rod [Errata]** — `likely` · P2 (pc) · themes: interrupt, typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7286
  - _Scene - Free Action · 2-16 Errata_
  - Trigger: A ranged Electric Type Move is used within 10 Meters of the user.
    The Move is turned into a 1-Target Move and is re-directed at the user without fail, and cannot miss. This negates Lock-On or Mind Reader. The user's Special Attack is then raised by +1 Combat Stage.
    Bonus: The user is immune to the damage and effects of Electric Type attacks. Defensive.

- 🟢 **Lunchbox** — `likely` · P2 (pc) · themes: heal, interrupt · code: ABILITY_ACTION_ROWS:3758, tradeInDigestion:19072, digestionCard:19227
  - _Scene -  Free Action_
  - Trigger: The user trades in a Digestion/Food Buff
    The user gains 5 Temporary Hit Points. These Temporary Hit Points stack with any Temporary Hit Points granted by the triggering Buff.

- 🟢 **Magic Guard** — `likely` · P2 (enc) · themes: weather, heal, typing, damage · engine: remember-only · code: FEATURE_ABILITY_CHOICES:9517, hpRecoilImmunity:23353, GAUNTLETS:40184
  - _Static_
  - The user is immune to damage and Hit Point loss from Hazards, Weather, Status Afflictions, Vortexes, Recoil, Hay Fever, Iron Barbs, Rough Skin, and Leech Seed. Defensive.

- 🟢 **Mentalize** — `likely` · P2 (enc) · themes: interrupt · engine: auto-note · code: ATE_ABILITIES:22224, AUTOMATED_ABILITIES:46326
  - _At-Will - Free Action_
  - Trigger: The user uses a Normal Type damaging Move.
    The Move is changed to be Psychic-Type.

- 🟢 **Mimicry** — `likely` · P2 (pc) · themes: weather, status · code: ENDABLE_TYPE_SHIFTS:2868, typeModsControl:3043
  - _Scene - Free Action_
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
    Your GM may provide additional options should they choose (for instance, an Ethereal Forest may provide Psychic and Fairy options.)

- 🟢 **Moody** — `likely` · P2 (enc) · themes: interrupt, status, cs, skill, stat · engine: remember-only · code: typeAbilityRow:3929, ABILITY_TURN_HOOKS:24317
  - _At-Will - Free Action_
  - Trigger: The user joins an encounter, misses with a Move, or hurts itself in Confusion
    Moody must be activated whenever it is triggered. Roll 1d10 to determine a Stat to be raised by +2 Combat Stages, then roll 1d10 to determine a Stat to be lower 2 Combat Stages. 1 or 2 is Attack, 3 or 4 is Defense, 5 or 6 is Special Attack, 7 or 8 is Special Defense, 9 or 10 is Speed.

- 🟢 **Motor Drive** — `likely` · P2 (enc) · themes: typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7280
  - _Static_
  - The user is immune to the damage and effects of Electric Type attacks. Whenever an Electric Type attack hits the Pokemon, raise their Speed by +1 Combat Stage. Defensive.

- 🟢 **Overcoat** — `likely` · P2 (enc, pc) · themes: weather, typing, damage · code: powderImmuneWhy:38779
  - _Static_
  - The user is immune to Moves with the Powder Keyword, and does not take damage from any Weather that would normally cause it to take damage. Defensive.

- 🟢 **Overgrow** — `likely` · P2 (pc) · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4783
  - _Static · Last Chance_
  - The user gains Last Chance with Grass.

- 🟢 **Pixilate** — `likely` · P2 (enc) · themes: interrupt · engine: auto-note · code: ATE_ABILITIES:22222, AUTOMATED_ABILITIES:46322
  - _At-Will - Free Action_
  - Trigger: The user uses a Normal Type damaging Move.
    The Move is changed to be Fairy-Type.

- 🟢 **Poltergeist** — `likely` · P2 (enc, pc) · themes: swap · code: derivedMonMoves:22124, poltergeistGrant:22215
  - _Static_
  - Rotom gains an Ability and a Move depending on what Form it has taken. This Move cannot be forgotten or replaced in any way.
    
    Standard Rotom: Move - Thunder Shock. Ability - Levitate.
    Heat Rotom: Move- Overheat. Ability - Levitate.
    Wash Rotom: Move - Hydro Pump. Ability - Aqua Boost.
    Frost Rotom: Move - Blizzard. Ability - Frostbite.
    Fan Rotom: Move - Air Slash. Ability - Keen Eye
    Mow Rotom: Move - Leaf Storm. Ability - Grass Pelt.

- 🟢 **Prime Fury** — `likely` · P2 (enc) · themes: status, cs, skill · code: ABILITY_ACTION_ROWS:3682, typeAbilityRow:4027, GAUNTLETS:40108
  - _Scene - Swift Action_
  - The user becomes Enraged, and gains +1 Attack Combat Stage.

- ✅ **Purifying Salt** — `auto` · P2 (enc) · themes: status, typing · engine: auto-note · code: STATUS_IMMUNE_ABILITIES:902, defenseTypeMods:7739, AUTOMATED_ABILITIES:46351
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off); Ghost resist was already in defenseTypeMods
  - The user gains resistance to Ghost-type moves, and cannot be Burned, Frozen, Paralyzed, Poisoned, Cursed, or put to Sleep. Defensive. 15 Unofficial Homebrew

- 🟢 **Rampaging Spirit** — `likely` · P2 (enc) · themes: heal, status · engine: auto-note · code: koFloor:9390, applyAutoKO:9835, AUTOMATED_ABILITIES:46330
  - _Static_
  - While Enraged, this Pokémon Faints at -50% Hit Points instead of 0%.

- 🟢 **Reckless** — `likely` · P2 (enc) · themes: position, heal, damage, stat · engine: auto-note · code: abilityDamageMods:26367, AUTOMATED_ABILITIES:46309
  - _Static_
  - Increase the Damage Base of the moves Jump Kick, Hi Jump Kick, and moves with the Recoil Keyword by +2.

<a id="verify-abilities-03"></a>
## `verify-abilities-03` — Verify abilities the scan thinks are handled

P9 · 37 open of 40 · open

- 🟢 **Reckless [Errata]** — `likely` · P2 (enc) · themes: position, heal, multiturn, damage, skill, stat · code: abilityDamageMods:26372
  - _Static · 2-16 Errata_
  - Increases the Damage Base of Moves with the Exhaust, Recoil, or Reckless Keywords by +3.
    Reckless Moves: Jump Kick, Hi Jump Kick, Close Combat, Draco Meteor, Hammer Arm, Leaf Storm, Outrage, Overheat, Petal Dance, Psycho Boost, Superpower, Thrash, and V-Create.

- 🟢 **Relaxing Surge** — `likely` · P2 (enc) · themes: weather · code: TERRAIN_SETTER_ABILITIES:3392
  - _Scene x3 - Swift Action_
  - The Field becomes Relaxing, as if affected by the Move Relaxing Terrain, for one full round.

- 🟢 **Rugged Surge** — `likely` · P2 (enc) · themes: weather · code: TERRAIN_SETTER_ABILITIES:3392
  - _Scene x3 - Swift Action_
  - The Field becomes Rugged, as if affected by the Move Rugged Terrain, for one full round.

- 🟢 **Run Up** — `likely` · P2 (enc) · themes: damage · code: FEATURE_ABILITY_CHOICES:9506, STAT_TRAINING_MOVES:25745, RUNNING_START_ABILITIES:26146, runningStartFor:26158
  - _Static_
  - If the user moves in a straight line to a target and uses a damaging Melee Attack, it may add the number of meters traveled in a direct line as Bonus Damage to a Damage Roll.

- 🟢 **Schooling** — `likely` · P2 (pc) · themes: heal, stat · code: schooling:10086, schoolingUseKey:10091, schoolingUsesLeft:10093, wishiwashiFormeControl:21889, GAUNTLETS:39785, makeStraggler:44088
  - _Daily - Swift Action_
  - The user changes to Schooling Forme, and gains Temporary Hit Points equal to half of its own maximum Hit Points. The user cannot gain Temporary Hit Points from other sources while in Schooling Forme. When the user is both below 50% of their maximum HP and has no Temporary Hit Points left, they change back into Solo Forme. Bonus: The user has two sets of base stats; Solo and Schooling. The HP of both forms must be the same.

- 🟢 **Serene Grace** — `likely` · P2 (enc) · themes: other · engine: auto-note, remember-only · code: openTrainerAttack:11072, openMoveRoll:27637, GAUNTLETS:40021, AUTOMATED_ABILITIES:46341
  - _Static_
  - The users Effect Range is increased by +2.

- 🟢 **Sheer Force** — `likely` · P2 (enc) · themes: interrupt, damage, stat · engine: auto-note · code: STAT_FAMILY:24743, abilityDamageMods:26333, openMoveRoll:28606, simStrike:44862, AUTOMATED_ABILITIES:46314
  - _Static_
  - If a Pokemon with Sheer Force uses a Move with a secondary effect that triggers during Accuracy Roll, increase that Move's Base Damage by +2. However, the secondary effects of Move never trigger. This does not affect Critical Hits, or moves with increased Critical Hit ranges.

- 🟢 **Shell Armor** — `likely` · P2 (enc, pc) · themes: typing, damage · engine: auto-note, remember-only · code: typeAbilityRow:4090, GAUNTLETS:39773, AUTOMATED_ABILITIES:46343, CRIT_IMMUNE_ABILITIES:56889
  - _Static_
  - The user is immune to Critical Hits; they are instead normal hits. Defensive.

- ✅ **Shield Dust** — `auto` · P2 (enc) · themes: interrupt, status, damage · code: FEATURE_ABILITY_CHOICES:9500, attackTargetWidget:57711
  - _Static_
  - note: v619: attackTargetWidget skips a Shield Dust target's status/CS riders (Mold Breaker / Gas respected)
  - The user ignores the secondary effects that trigger during Accuracy Roll of damaging Moves that target the user. For example, Flamethrower can never inflict the Burn Condition. Defensive.

- 🟢 **Shields Down** — `likely` · P2 (enc) · themes: skill, stat · code: shieldsDown:10062
  - _Static_
  - The user has two sets of base stats; Meteor and Core. The HP of both forms must be the same. When the user is in Meteor Forme and becomes Bruised, they change to Core Forme. The userreturns to Meteor Forme while outside of combat if not Bruised.

- 🟢 **Sniper** — `likely` · P2 (pc) · themes: interrupt, damage · code: openMoveRoll:28714, GAUNTLETS:39773, simStrike:44853
  - _Static_
  - When the Pokemon gets a Critical Hit, add the value of the Damage Dice Roll an additional time to the total damage.

- 🟢 **Snow Warning** — `likely` · P2 (enc) · themes: weather · code: WEATHER_SETTER_ABILITIES:3388
  - _Scene -  Free Action_
  - The Weather changes to Hail for 5 rounds. As a static effect the user is not damaged by Hail.

- 🟢 **Solid Rock** — `likely` · P2 (enc) · themes: interrupt, typing, damage · engine: auto-note · code: applyAbsorbToOwner:7399, defenseTypeMods:7778, AUTOMATED_ABILITIES:46354
  - _Static_
  - When the user is hit by a Super-Effective attack, the attack deals 1.25x damage instead of x1.5 damage. If the user is hit by a Super-Super-Effective attack, the attack deals x1.5 damage instead of x2 damage. If you have both Solid Rock and Filter, you gain 5 Damage eduction against Super-Effective Damage. Defensive.

- 🟢 **Sorcery** — `likely` · P2 (enc) · themes: control, swap, status, stat · code: pokeBaseStats:7155, GAUNTLETS:40171
  - _Static · 2-16 Errata_
  - The user's Base Special Attack Stat is increased by +5, and by +1 more for every 10 Levels the user has. This Ability cannot be disabled in any way.

- 🟢 **Sprint** — `likely` · P2 (enc) · themes: position, interrupt, cs, skill · code: ABILITY_ACTION_ROWS:3690, typeAbilityRow:4039, ABILITY_CAP_GRANTS:21507, BATTLE_ACTIONS:29224, ACTION_FEATURE_NOTES:29287
  - _Scene - Swift Action_
  - Trigger: The user uses the Sprint Action during Combat
    The user gains +2 Speed Combat Stages. Additionally, the user's Overland Speed is always increased by +2.

- ✅ **Static** — `auto` · P2 (enc, pc) · themes: interrupt, status · code: freqInfo:5557, fightOnToggle:9410, openTrainerAttack:10971, GIFT_FREQ_RE:15029, giftFreqText:15038, ABILITY_REACTIONS:25034, fieryCrashThresholds:26257, abilityDamageMods:26465
  - _Scene -  Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Melee Attack
    The attacking foe becomes Paralyzed.

- 🟢 **Steelworker** — `likely` · P2 (enc) · themes: interrupt, damage · engine: auto-note · code: openMoveRoll:27480, GAUNTLETS:39788, AUTOMATED_ABILITIES:46327
  - _Scene - Free Action_
  - Trigger: The user takes damage while adjacent to its Anchor
    The user calculates damage as if it was only Steel-Typed.Bonus: The user gains STAB on Steel-Type Moves that originate from its Anchor.

- 🟢 **Sticky Surge** — `likely` · P2 (enc) · themes: weather · code: TERRAIN_SETTER_ABILITIES:3393
  - _Scene x3 - Swift Action_
  - The Field becomes Sticky, as if affected by the Move Sticky Terrain, for one full round.

- 🟢 **Storm Drain** — `likely` · P2 (enc) · themes: interrupt, typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7283, absorbEntriesFor:7320, openOceanicFeeling:33954, GAUNTLETS:39801
  - _Scene -  Free Action_
  - Trigger: A ranged Water Type Move is used within 10 Meters of the user.
    The Move is turned into a Single-Target Move and is re-directed at the User without fail, and cannot miss. This negates Lock-On or Mind Reader. Additionally, the user is immune to the damage and effects of Water Type Moves, and each time they are hit by a Water-Type Move, the User's Special Attack is raised 1 Combat Stage. Defensive.

- 🟢 **Strong Jaw** — `likely` · P2 (enc) · themes: status, damage, stat · engine: auto-note, remember-only · code: abilityDamageMods:26381, AUTOMATED_ABILITIES:46310
  - _Static_
  - The user has the Damage Base of the following Moves increased by +2; Bite, Bug Bite, Crunch, Fire Fang, Ice Fang, Thunder Fang, Poison Fang, and Hyper Fang.

- 🟢 **Sturdy** — `likely` · P2 (enc, pc) · themes: heal, typing, damage · engine: remember-only · code: FEATURE_ABILITY_CHOICES:9506, GAUNTLETS:39770, tokenDamageBreakdown:56652
  - _Static_
  - The Pokemon is immune to the Moves Sheer Cold, Guillotine, Horn Drill and Fissure. If any attack would lower this Pokemon to 0 Hit Points or less from full Hit Points, instead the Pokemon's Hit Point value is set to 1. This effect fails if the user's full Hit Point value is 1. Pokemon with Sturdy do not gain Injuries from Massive Damage. Defensive.

- 🟢 **Sun Blanket** — `likely` · P2 (enc) · themes: weather, heal, typing · code: WEATHER_DEFS:1463, ABILITY_ACTION_ROWS:3671
  - _Static_
  - The user is one step more resistant to Fire-Type Attacks, and gains a Tick of Hit Points at the beginning of each turn in Sunny weather.

- 🟢 **Super Luck** — `likely` · P2 (enc) · themes: damage · engine: auto-note, remember-auto · code: trainerCritThreshold:9363, critThreshold:26117, AUTOMATED_ABILITIES:46319
  - _Static_
  - The Pokemon's Moves are Critical Hits on 18-20. If a Move already has an extended Critical Hit range, Super Luck extends that range by 2.

- 🟡 **Targeting System** — `partial` · P2 (enc) · themes: swap, action · engine: move-rider
  - _Scene - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Lock On. By activating this Ability the target may use Lock-On as a Swift Action.

- 🟢 **Telepathy** — `likely` · P2 (enc) · themes: interrupt · code: STATIC_ABILITY_EVASION:1581, PE_CAP_ALIAS:19487, POKE_EDGE_DEFS:19747
  - _At-Will - Shift Action, Interrupt_
  - Trigger: An ally uses an area-of-effect attack that would hit you
    You may Shift to remove yourself from the area-of-effect.

- ✅ **Thermal Exchange** — `auto` · P2 (enc) · themes: interrupt, status, typing, cs, skill · engine: auto-note, remember-only · code: STATUS_IMMUNE_ABILITIES:901, TYPE_ABSORB_ABILITIES:7296, ABILITY_REACTIONS:25047
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user is hit by a Fire-Type Move.
    The user receives +1 Attack Combat Stage. Bonus: The user is immune to Burns. Defensive.

- 🟢 **Thermosensitive** — `likely` · P2 (enc) · themes: weather, position, cs, skill · engine: auto-note · code: WEATHER_DEFS:1460, AUTOMATED_ABILITIES:46345
  - _Static_
  - While Sunny, the user's Attack and Special Attack are raised by +2 combat stages each. While Hailing, the user's movement capabilities are reduced by half.

- 🟢 **Tolerance** — `likely` · P2 (enc) · themes: typing · engine: auto-note, remember-auto · code: defenseTypeMods:7722, STAT_FAMILY:24749, EFFECTIVE_METHODS_ABILITIES:33520, openTypeMethodology:33652, AUTOMATED_ABILITIES:46342
  - _Static_
  - Any Types resisted by the user are resisted one step further. Defensive.

- 🟢 **Trace** — `likely` · P2 (enc) · themes: swap, status · engine: remember-only · code: typeAbilityRow:3994, GAUNTLETS:40185
  - _Scene - Free Action_
  - Target: A Trainer or Pokemon within 10 meters
    The Pokemon gains an Ability known by the Target for the remainder of the encounter, or until it is Fainted.

- 🟢 **Treasure Hoard** — `likely` · P2 (enc) · themes: weather, position, swap, damage · code: typeAbilityRow:4050, hasTreasureHoard:18486, ABILITY_CAP_GRANTS:21512
  - _At-Will - Swift Action_
  - The user leaves their chest behind in an adjacent square, changing from Chest Forme to Roaming Forme. The chest counts as Blocking Terrain, and may not be moved. When next to their chest, the user may activate this ability again to remove the chest from the field and revert to Chest Forme. When the user faints or is recalled, the chest disappears and they revert to Chest Forme. Bonus: While in Chest Forme, the user receives +5 Damage Reduction. While in Roaming Forme, the user does not provoke Attacks of Opportunity and gains +3 Overland.

- 🟢 **Type Strategist** — `likely` · P2 (enc) · themes: heal, typing, damage · engine: remember-auto · code: normPokemon:6827, openTypeAceGrant:21062, grantExtraOrdinary:21082, openMoveRoll:28466, GAUNTLETS:40171
  - _Static_
  - Whenever the user uses a Move of the Type associated with Type Strategist, they gain +5 Damage Reduction for one full round. If they are under 1/3rd of their Maximum Hit Points, they instead gain +10 Damage Reduction. Defensive.

- 🟢 **Volt Absorb** — `likely` · P2 (enc, pc) · themes: heal, typing, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7272
  - _Static_
  - The user is immune to the damage and effects of Electric-Type attacks, and whenever they are hit with an Electric Type attack, they gain Hit Points equal to a Tick of Hit Points. Defensive.

- 🟢 **Water Absorb** — `likely` · P2 (enc, pc) · themes: heal, typing, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7273, giftMaskPatron:15447
  - _Static_
  - The user is immune to the damage and effects of Water-Type attacks, and whenever they are hit with a Water Type attack, they gain a Tick of Hit Points. Defensive.

- 🟢 **White Smoke** — `likely` · P2 (enc, pc) · themes: cs, damage, skill · code: CS_LOWER_GUARDS:3398
  - _Static_
  - The user's Combat Stages, Evasion, or Accuracy may not be lowered except by the user's own Moves and effects. Defensive.

- 🟡 **Wind Power** — `partial` · P2 (enc) · themes: weather, interrupt, multiturn, action · engine: move-rider
  - _Scene - Swift Action, Reaction_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: A foe or ally within 4m uses a Move with the Wind keyword
    Connection - Charge. The user may use Charge as a Free Action. Wind Moves: Air Cutter, Bleakwind Storm, Blizzard, Fairy Wind, Gust, Heat Wave, Hurricane, Icy Wind, Ominous Wind, Petal Blizzard, Sandsear Storm, Sandstorm, Silver Wind, Springtide Storm, Tailwind, Twister, Whirlwind, Wildbolt Storm

- 🟢 **Winter's Kiss** — `likely` · P2 (enc) · themes: heal, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7277, FEATURE_ABILITY_CHOICES:9502
  - _Static_
  - The user does not take damage from Ice-Type Moves. Whenever the user uses or is hit by an Ice-Type Move, the user is healed by a Tick of Hit Points. Defensive.

- 🟡 **Wishmaster** — `partial` · P2 (enc) · themes: heal, cure, cs, stat · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Wish. Whenever the user uses Wish, the user may pick one of the following effects: the target is healed instantly instead of the following round; or the target gains +2 CS to the Stat of their choice upon being healed; or the target is cured of any Status Affliction.

- 🟢 **Wonder Guard** — `likely` · P2 (enc) · themes: typing, damage · engine: auto-note, remember-auto · code: defenseTypeMods:7773, AUTOMATED_ABILITIES:46352
  - _Static_
  - Only damaging attacks that are Super-Effective affect the Pokemon with Wonder Guard; all other damaging attacks cannot hit the user or deal damage. Wonder Guard loses its effect if the user has no weaknesses. Defensive.

- 🟢 **Adaptability** — `likely` · P3 · themes: damage · engine: auto-note · code: openTrainerAttack:10505, abilityDamageMods:26340, GAUNTLETS:39786, simProfile:44674, AUTOMATED_ABILITIES:46305
  - _Static_
  - Increase the Damage of all Moves with which the user shares an Elemental Type by +1 Damage Base.

- 🟢 **Aqua Boost** — `likely` · P3 · themes: interrupt, damage · code: ROTOM_POLTERGEIST:22209
  - _At-Will - Free Action_
  - Trigger: An adjacent Ally uses a Water-Type Move
    The allied target gains a +5 Bonus to its damage roll with the triggering Move.  A target may not benefit from more than one instance of Aqua Boost at a time.

<a id="verify-abilities-04"></a>
## `verify-abilities-04` — Verify abilities the scan thinks are handled

P9 · 35 open of 40 · open

- 🟢 **Arena Trap** — `likely` · P3 · themes: position, status, action, capture · code: ABILITY_ACTION_ROWS:3637, FEATURE_ABILITY_CHOICES:9521
  - _Scene -  Free Action_
  - Target: Pokemon or Trainers
    Once Arena trap is activated, all foes within 5 meters of the user are considered Slowed. This does not affect targets of the Flying Type, or with a Levitate, Sky, or Burrow Speed of 4 or higher. The user may end the effect as a Free Action, and the effect ends if the user is fainted or returned to a Poke Ball.

- 🟢 **Aroma Veil** — `likely` · P3 · themes: status · code: normTrainer:6853, FEATURE_ABILITY_CHOICES:9512, STATUS_VEILS:43923
  - _Static_
  - The user and all Pokemon and Trainers within 3 meters cannot be Confused, Enraged, or Suppressed. Defensive.

- 🟢 **Aroma Veil [Errata]** — `likely` · P3 · themes: status · code: normTrainer:6853, FEATURE_ABILITY_CHOICES:9512, STATUS_VEILS:43926
  - _Static · 2-16 Errata_
  - The user and all adjacent Pokemon and Trainers cannot become Confused, Enraged, or Suppressed. Defensive.

- 🟡 **Ballistic** — `partial` · P3 · themes: damage, stat · engine: move-rider · code: abilityDamageMods:26414
  - _Static_
  - note: v644 abilityDamageMods: +2 DB on Rollout / Steamroller / Steel Roller / every 'Ball' Move; the Versatile keyword is by hand
  - Connection - Rollout. The user increases the Damage Base of Rollout, Steamroller, Steel Roller, and all Moves with "Ball" in the name by +2, and these Moves gain the Versatile Keyword for the user.

- 🟢 **Beam Cannon** — `likely` · P3 · themes: damage · code: critThreshold:26119
  - _Static_
  - The Effect Range and Critical Hit Range of the user's Ranged, 1-Target Moves are increased by 3.

- 🟢 **Berry Storage** — `likely` · P3 · themes: interrupt · code: eatSnack:18932, digestionCard:19229
  - _Daily - Extended Action_
  - Trigger: The user eats a Berry
    The user gains 3 instances of the Berry's Digestion/Food Buff instead of 1. It may only trade in one of these Digestion/Food Buffs each Scene. Neither storing nor trading in these Digestion/Food Buffs counts against the user's normal limits. All Digestion/Food Buffs gained from Berry Storage are lost after an Extended Rest.

- 🟢 **Big Pecks** — `likely` · P3 · themes: cs, skill, stat · code: CS_LOWER_GUARDS:3397
  - _Static_
  - The user cannot have its Defense Stat lowered. The user cannot have its Defense Combat Stages lowered. Defensive.

- 🟡 **Big Swallow** — `partial` · P3 · themes: swap · engine: move-rider · code: openMoveRoll:27573, GAUNTLETS:39799
  - _Static_
  - note: v644 openMoveRoll: Spit Up reads the Stockpile Count one higher (max 3); Swallow's healing is not bumped
  - Connection - Stockpile. Whenever the user uses Swallow or Spit Up, it may treat the Stockpile Count as if it was one higher. This Ability has no effect if the Stockpile Counter is already 3.

- 🟡 **Blow Away** — `partial` · P3 · themes: heal, interrupt · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Whirlwind. When the user uses Whirlwind, all targets hit lose a Tick of Hit Points.

- 🟡 **Blow Away [Errata]** — `partial` · P3 · themes: position, heal, interrupt · engine: move-rider
  - _Static · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Whirlwind. When the user uses Whirlwind, all targets hit are pushed an additional 2 meters and lose a Tick of Hit Points.

- 🟡 **Bone Lord** — `partial` · P3 · themes: interrupt, swap, status · engine: move-rider · code: CONNECTION_CS:25997
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user hits with Bone Club, Bonemerang, or Bone Rush
    Connection - Bonemerang. This Ability may be activated when hitting with Bone Club to automatically Flinch its target; or to use Bonemerang as a Priority Move; or when hitting with Bone Rush to cause the attack to automatically hit 5 times.

- 🟡 **Bone Lord [Errata]** — `partial` · P3 · themes: interrupt, cs, action · engine: move-rider · code: CONNECTION_CS:25997
  - _At-Will - Free Action · 2-16 Errata_
  - note: v647 CONNECTION_CS: Bone Club -1 Def/Sp.Atk on the 🔺 card; the other two Moves by hand
  - Trigger: You hit with Bone Club, Bonemerang, or Bone Rush
    Connection - Bonemerang. Once per Scene per Move, the following Moves may be used as if they had the following bonuses:
    - Bone Club: Bone Club's target loses 1 Defense and Special Attack CS.
    - Bonemerang: Has a Range of Line 6 but loses the Double Strike keyword
    - Bone Rush: Bone Rush automatically 'hits' four times (as per the Five Strike keyword).

- 🟢 **Bone Wielder [Errata]** — `likely` · P3 · themes: typing · engine: auto-note · code: typeMultAgainst:7234, boneWielderPierces:26550, AUTOMATED_ABILITIES:46359
  - _Static · 2-16 Errata_
  - The user's Bone Club, Bonemerang, and Bone Rush Moves ignore immunity against Ground-Type Moves.

- ✅ **Celebrate** — `auto` · P3 · themes: interrupt, swap, status, cs, action, skill · code: typeAbilityRow:4065, ABILITY_REACTIONS:25073
  - _At-Will - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user causes a foe to Faint by using a damaging attack
    The user increases their Speed by 1 Combat Stage and may immediately take an additional Shift Action to move as if they were Slowed. This Ability may only be activated if the user is not prevented from shifting.

- ✅ **Chemical Romance** — `auto` · P3 · themes: status · engine: move-rider · code: CONNECTION_STATUS:22699
  - _Static_
  - note: v647 CONNECTION_STATUS: Poison Gas/Smog/Sweet Scent/Toxic/Venom Drench Infatuate (apply to male targets only)
  - Connection - Sweet Scent. Whenever the user hits a male target with Poison Gas, Smog, Sweet Scent, Toxic, or Venom Drench, that target becomes Infatuated with the user.

- ✅ **Conqueror** — `auto` · P3 · themes: interrupt, cs, skill · code: edgeByName:11797, ABILITY_REACTIONS:25070
  - _Scene - Free Action_
  - note: ABILITY_REACTIONS row — ⚡ button under the 💥 Apply result (v585)
  - Trigger: The user causes a foe to Faint by using a damaging Physical or Special Attack
    The user's Attack, Special Attack, and Speed gain +1 Combat Stage.

- 🟡 **Corrosive Toxins** — `partial` · P3 · themes: heal, swap, status, typing · engine: move-rider
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Toxic. The user may activate this Ability when using Toxic to allow the Move to ignore Immunity to the Status Affliction, Blessings, and the effects of Abilities that may prevent Hit Point loss from being Badly Poisoned (such as Magic Guard or Poison Heal).

- 🟡 **Crush Trap** — `partial` · P3 · themes: interrupt, swap, damage · engine: move-rider
  - _Scene - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user successfully grapples a target.
    Connection - Wrap. When you activate this ability, the user may immediately deal damage to the target as if the user had hit with a Struggle Attack. There is no Accuracy Roll and thus this damage cannot miss, be a Critical Hit, or trigger any Effect Ranges.

- 🟡 **Danger Syrup [Errata]** — `partial` · P3 · themes: swap, status, action · engine: move-rider · code: CONNECTION_STATUS:22698
  - _Scene - Free Action · 2-16 Errata_
  - note: v647 CONNECTION_STATUS: Sweet Scent Blinds; the free-action use is by hand
  - Connection - Sweet Scent. When this Ability is activated the user may use Sweet Scent as a Free Action, ignoring Frequency. Whenever the user hits a foe with Sweet Scent, that foe is Blinded for 1 full round.

- 🟢 **Dark Art** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4784
  - _Static · Last Chance_
  - The user gains Last Chance with Dark.

- 🟢 **Defy Death** — `likely` · P3 · themes: heal, swap · code: INJURY_SOURCES:5956
  - _Daily - Swift Action_
  - By activating this Ability, the user is instantly healed of up to 2 Injuries;  These count towards the total number of Injuries that can be healed each day.  Additionally, to die, the user must reach -250% Hit Points instead of -200% Hit Points.

- 🟢 **Defy Death [Errata]** — `likely` · P3 · themes: heal, cure · code: INJURY_SOURCES:5959
  - _At-Will - Swift Action · 2-16 Errata_
  - The user instantly removes up to three injuries, and gains a Tick of Hit Points for each injury removed this way. Defy Death may be used to cure up to three Injuries per day. Injuries removed this way do not count towards the total number of injuries that can be healed per day.

- 🟢 **Desert Weather** — `likely` · P3 · themes: weather, heal, typing, damage · code: WEATHER_DEFS:1485, ABILITY_TURN_HOOKS:24323
  - _Static_
  - The user is immune to Sandstorm Damage, resists Fire-Type Moves in Sunny Weather, and regains 1/16th of its Max Hit Points at the end of each of its turns while in Rainy Weather.

- 🟡 **Diamond Defense** — `partial` · P3 · themes: hazard, swap, damage, skill · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Stealth Rock. Stealth Rock's Frequency is Scene x2, and the user's Stealth Rocks can be treated as dealing Rock-Type or Fairy-Type Damage, whichever is more effective.

- 🟡 **Dig Away** — `partial` · P3 · themes: weather, interrupt, swap, skill · engine: move-rider
  - _Daily - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Dig. When hit by a Move, this Pokemon may activate this Feature to use Dig, frequency allowing, as an interrupt to avoid the attack and shift underground immediately. This consumes a command as normal. The terrain must allow for Dig to be used.

- ✅ **Dire Spore** — `auto` · P3 · themes: status · engine: move-rider · code: CONNECTION_STATUS:22689
  - _Static_
  - note: v626 CONNECTION_STATUS: Spore also Poisons (status card)
  - Connection - Spore. Whenever the user hits a target with Spore, that target is also Poisoned.

- 🟢 **Drizzle** — `likely` · P3 · themes: weather · code: WEATHER_SETTER_ABILITIES:3386
  - _Scene - Swift Action_
  - The Weather changes to be Rainy for 5 rounds.

- 🟢 **Drizzle [Errata]** — `likely` · P3 · themes: weather · code: WEATHER_SETTER_ABILITIES:3386
  - _Scene x3 - Swift Action · 2-16 Errata_
  - The Weather changes to be Rainy for 1 full round.

- 🟢 **Drought** — `likely` · P3 · themes: weather · code: WEATHER_SETTER_ABILITIES:3385
  - _Scene -  Free Action_
  - The Weather changes to be Sunny for 5 rounds.

- 🟢 **Drought [Errata]** — `likely` · P3 · themes: weather · code: WEATHER_SETTER_ABILITIES:3385
  - _Scene x3 - Swift Action · 2-16 Errata_
  - The Weather changes to be Sunny for 1 full round.

- ⚪ **Drown Out** — `manual` · P3 · themes: interrupt, damage, skill · code: FEATURE_ABILITY_CHOICES:9516, GAUNTLETS:40079
  - _Scene -  Free Action_
  - note: Focus Check vs the Move's Accuracy Roll to make a Sonic Move fail - table roll
  - Trigger: A foe uses a Move with the Sonic keyword
    The user makes a Focus Check with a DC equal to the Move's Accuracy Roll. If the user succeeds, the triggering Move fails.

- 🟡 **Dust Cloud** — `partial` · P3 · themes: swap, status · engine: move-rider
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - PoisonPowder. Whenever the user uses PoisonPowder, Sleep Powder, or Stun Spore, the user may activate this Ability to use if it as if that move have a range of Burst 1 instead.

- 🟡 **Dust Cloud [Errata]** — `partial` · P3 · themes: status · engine: move-rider
  - _Static · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Poison Powder. The user may use Moves with the Powder Keyword as if they had a Range of "Burst 1".

- 🟢 **Earth Eater** — `likely` · P3 · themes: heal, typing, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7274
  - _Static_
  - The user is immune to the damage and effects of Ground-Type attacks, and whenever they are hit with a Ground-Type attack, they gain a Tick of Hit Points. Defensive.

- 🟡 **Eggscellence** — `partial` · P3 · themes: damage · engine: move-rider · code: openMoveRoll:27481
  - _Static · 9-15 Errata_
  - note: v644: STAB on Barrage and Egg Bomb; the one-step-more-effective on 16+ is by hand
  - Connection - Barrage. The user receives STAB when using Barrage and Egg Bomb. These Moves deal Damage as if one step more effective on 16+.

- 🟢 **Electric Surge** — `likely` · P3 · themes: weather · code: TERRAIN_SETTER_ABILITIES:3391
  - _Scene x3 - Swift Action_
  - The Field becomes Electrified, as if affected by the Move Electric Terrain, for one full round.

- 🟡 **Electromorphosis** — `partial` · P3 · themes: interrupt, multiturn, action · engine: move-rider
  - _Scene - Swift Action, Reaction_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: An adjacent foe hits the user with a damaging Move
    Connection - Charge. The user may use Charge as a Free Action. 11 Unofficial Homebrew

- 🟢 **Elevate** — `likely` · P3 · themes: typing, cs, damage, skill, stat · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7270, ABILITY_CAP_GRANTS:21508
  - _Static_
  - The Pokemon is immune to the damage and effects of Ground Type Moves, and gains a Levitate Speed of 4, or has existing Levitate Speeds increased by +2. Bonus: Whenever the user's Move causes a target to faint, it may raise the Combat Stage of its highest Base Stat by +1. Defensive.

- 🟢 **Enduring Rage** — `likely` · P3 · themes: status, cure, damage · code: POWER_OF_RAGE_ABILITIES:9416, rageAbilityDR:9449
  - _Static_
  - The user may not make rolls to cure themselved of the Enraged condition.  However, while Enraged, the user gains 5 Damage Reduction.

- 🟡 **Enfeebling Lips** — `partial` · P3 · themes: control, cs, skill, stat · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Lovely Kiss. Whenever the user uses the Move "Lovely Kiss", they may choose a stat. If the Move successfully hits, the Pokemon or Trainer being targeted loses 2 combat stages in that stat.

<a id="verify-abilities-05"></a>
## `verify-abilities-05` — Verify abilities the scan thinks are handled

P9 · 36 open of 40 · open

- 🟢 **Exploit** — `likely` · P3 · themes: typing, damage · engine: remember-auto · code: exploitAbilityBonus:26574, EFFECTIVE_METHODS_ABILITIES:33520, openTypeMethodology:33652
  - _Static_
  - Whenever you deal Super-Effective Damage to a target, that target treats your damage roll as if it were increased by +5.

- 🟡 **Flame Tongue** — `partial` · P3 · themes: interrupt, status · engine: move-rider · code: CONNECTION_STATUS:22692
  - _Scene -  Free Action_
  - note: v626 CONNECTION_STATUS: Lick Burns; the Injury is given at the table
  - Trigger: The user hits a foe with Lick.
    Connection - Lick. The foe hit with Lick gains an Injury and becomes Burned.

- 🟢 **Flare Boost** — `likely` · P3 · themes: status, cure, cs, skill · engine: auto-note · code: ABILITY_ACTION_ROWS:3572, abilityStatusCS:26597, AUTOMATED_ABILITIES:46333
  - _Static_
  - While Burned, the user's Special Attack is raised by 2 Combat Stages. If the user is cured of its Burn, its Special Attack is lowered by 2 Combat Stages.

- 🟡 **Flavorful Aroma** — `partial` · P3 · themes: barrier, interrupt, damage · engine: move-rider
  - _At-Will - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses Aromatic Mist
    Connection - Aromatic Mist. All allies affected by Aromatic Mist gain +1 to Accuracy Rolls and +5 to Damage Rolls for one full round.

- 🟢 **Fluffy** — `likely` · P3 · themes: typing · engine: auto-note · code: defenseTypeMods:7751, AUTOMATED_ABILITIES:46350
  - _Static_
  - The user resists damaging Melee attacks one step further, but resists Fire-Type attacks one step less. [Defensive]

- ✅ **Fluffy Charge** — `auto` · P3 · themes: multiturn, cs · engine: move-rider · code: CONNECTION_CS:25995
  - _Static_
  - note: v644 CONNECTION_CS: Charge gets a +1 Defense Combat Stage clause on the roll's Combat Stages card
  - Connection - Charge.  Whenever the user uses Charge, they gain +1 CS to Defense.

- 🟢 **Focus** — `likely` · P3 · themes: other · engine: remember-auto · code: illusionMarkCap:4697, LAST_CHANCE_ABILITIES:4784, MELEE_SKILL_SUBS:8829, EQUIP_EFFECTS:13329, GIFTSAPPER_SKILLS:15838, giftFocusCheck:15958, POKE_EDGE_DEFS:19743, SKILL_WORDS:22533
  - _Static · Last Chance_
  - The user gains Last Chance with Fighting.

- 🟡 **Fox Fire** — `partial` · P3 · themes: interrupt, control, action · engine: move-rider · code: GAUNTLETS:40171
  - _Scene - Standard Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - The user creates 3 Fire Wisps. Whenever the user is targeted by a foe within 6 meters, they may spend a Fire Wisp as an Interrupt to use the Move Ember against that foe as a Free Action, as if it was on their Move List.

- 🟡 **Fox Fire [Errata]** — `partial` · P3 · themes: control, action · engine: move-rider
  - _Scene - Standard Action · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Ember. The user creates 3 Fire Wisps. Whenever the user is targeted by a foe within 6 meters, they may spend a Fire Wisp as to use the Move Ember against that foe as a Free Action after the triggering Move is resolved.

- 🟢 **Freezing Point** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4784
  - _Trigger · Last Chance_
  - The user gains Last Chance with Ice.

- 🟢 **Frostbite** — `likely` · P3 · themes: status · code: FEATURE_ABILITY_CHOICES:9503, openTrainerAttack:11067, ROTOM_POLTERGEIST:22210, moveStatusEffects:22832, openMoveRoll:27636, simProfile:44682
  - _Static_
  - The user's damaging Ice Type attacks cause the target to become Slowed on 18+, and the Effect Range for Freeze on these Moves is increased by +1. If the Move does not cause Freezing, it now causes Freezing on a roll of 20.

- 🟢 **Full Metal Body** — `likely` · P3 · themes: swap, cs, skill · code: CS_LOWER_GUARDS:3398
  - _Static_
  - The user's Combat Stages may not be lowered by the effect of foes' Feautres, Abilities, or Moves. Status Affictions may still alter their Combat Stages. Defensive.

- 🟡 **Gale Wings [SuMo Errata]** — `partial` · P3 · themes: other · engine: move-rider
  - _Static · Sun/Moon Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Quick Attack. The user may use Quick Attack as a Flying-Type Move.

- 🟢 **Galvanize** — `likely` · P3 · themes: other · engine: auto-note · code: ATE_ABILITIES:22222, AUTOMATED_ABILITIES:46323
  - _At-Will - Free Action_
  - If the user attacks with a Normal-Type Move, that Move is Electric-Type instead.

- 🟢 **Gardener** — `likely` · P3 · themes: action · code: trainerCapGrants:13472, gardenCard:38394, gardenPlantRow:38497
  - _Daily x3 - Extended Action_
  - Target: A yielding Plant
    Increase the Soil Quality of the plant by +1, as if Mulch has been applied.  This may target a Specific Plant only once per day.

- 🟢 **Glisten** — `likely` · P3 · themes: typing · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7288
  - _Static_
  - The user is immune to Fairy-Type attacks. Defensive.Bonus: If the user is hit by a damaging Fairy-Type attack, they receive +1 Defense or Special DefenseCombat Stages.

- 🟢 **Gluttony** — `likely` · P3 · themes: other · code: digestionCap:18843, drinkRefreshment:19120, digestionCard:19224, openCulinaryAppreciation:36116
  - _Static_
  - The user may have up to three Digestion/Food Buffs at once, and may eat up to two refreshments per half hour.

- 🟢 **Gore** — `likely` · P3 · themes: position, damage · engine: move-rider · code: critThreshold:26120
  - _Static_
  - Connection - Horn Attack. Whenever the user uses Horn Attack, they may push the target away 1 meter. Additionally, Horn Attack has a Critical Range of 18-20 for the user.

- 🟡 **Gore [Errata]** — `partial` · P3 · themes: position, interrupt · engine: move-rider
  - _Scene x2 - Swift Action · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses Horn Attack
    Connection - Horn Attack. Horn Attack gains the Double Strike keyword, and pushes its target 2 meters.

- 🟢 **Grassy Surge** — `likely` · P3 · themes: weather · code: TERRAIN_SETTER_ABILITIES:3391, GAUNTLETS:40084
  - _Scene x3 - Swift Action_
  - The Field becomes Grassy, as if affected by the Move Grassy Terrain, for one full round.

- 🟢 **Gulp** — `likely` · P3 · themes: heal · code: INJURY_SOURCES:5970
  - _Daily -  Extended Action_
  - If the user is allowed to spend time fully submerged in water for at least 10 minutes, they may heal up to 25% of their Max Hit Points, and remove one Injury.

- 🟢 **Haunt** — `likely` · P3 · themes: other · engine: remember-auto · code: ABILITY_ACTION_ROWS:3665, LAST_CHANCE_ABILITIES:4784
  - _Static · Last Chance_
  - The user gains Last Chance with Ghost.

- 🟢 **Heatproof** — `likely` · P3 · themes: typing · engine: auto-note · code: defenseTypeMods:7737, AUTOMATED_ABILITIES:46348
  - _Static_
  - The user resists Fire Type moves one step further (Super-Effective Becomes Neutral, Doubly-Super Effective becomes Super-Effective, Neutral becomes Resistant, Resistant becomes doubly Resistant).

- 🟢 **Helper** — `likely` · P3 · themes: multiturn, damage, skill · engine: move-rider · code: openSkillReroll:24891
  - _Static_
  - Connection - Helping Hand. Whenever the user uses a Move that targets a single Ally, that Ally gains a +1 Bonus to Accuracy and Skill Checks until the end of the user's next turn.

- 🟢 **Honey Paws** — `likely` · P3 · themes: swap · code: eatSnack:18929, digestionCard:19228
  - _Static_
  - The user may consume Honey to gain a Digestion/Food Buff as if they had consumed Leftovers. This Digestion/Food Buff does not count against their normal limit.

- ✅ **Honey Thief** — `auto` · P3 · themes: heal, swap · engine: move-rider · code: CONNECTION_USE_FX:30272
  - _Static_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (a Tick of Temp HP)
  - Connection - Bug Bite. If the user uses Bug Bite to steal the effects of a Digestion/Food Buff, they gain a Tick of Temporary Hit Points.

- 🟢 **Huge Power** — `likely` · P3 · themes: stat · engine: auto-note · code: pokeBaseStats:7146, AUTOMATED_ABILITIES:46303
  - _Static_
  - The Pokemon's Base Attack stat is doubled. This may double any bonuses from Nature or Vitamins, but not bonuses from Trainer Features.

- 🟢 **Hustle [Errata]** — `likely` · P3 · themes: damage · engine: auto-note · code: abilityDamageMods:26456, abilityAccMods:26583, AUTOMATED_ABILITIES:46317
  - _Static · 2-16 Errata_
  - The user receives a -2 penalty to all Accuracy Rolls and gains a +10 Bonus to All Damage Rolls.

- ✅ **Hypnotic** — `auto` · P3 · themes: other · engine: move-rider · code: openMoveRoll:28036, GAUNTLETS:40172
  - _Static_
  - note: v644 openMoveRoll noMissNow: Hypnosis cannot miss
  - Connection - Hypnosis. When used by the user, Hypnosis cannot miss.

- 🟢 **Landslide** — `likely` · P3 · themes: multiturn · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4785
  - _Static · Last Chance_
  - The user gains Last Chance with Ground.

- 🟡 **Leek Mastery** — `partial` · P3 · themes: swap, skill · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Acrobatics. If the user is holding a Rare Leek, they may still use Acrobatics as if they were not holding an item. The user cannot be disarmed of their Stick, nor can be it be forcefully removed by Trick, Switcheroo, Thief, or any other Moves or effects unless the user wishes it.

- 🟢 **Lightning Rod** — `likely` · P3 · themes: interrupt, typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7285, FEATURE_ABILITY_CHOICES:9521
  - _Scene -  Free Action_
  - Trigger: A ranged Electric Type Move is used within 10 Meters of the user.
    The Move is turned into a Single-Target Move and is re-directed at the user without fail, and cannot miss. This negates Lock-On or Mind Reader. Additionally, the user is immune to the damage and effects of Electric Type attacks, and each time they are hit by an Electric attack, the user's Special Attack is raised 1 Combat Stage. Defensive.

- 🟡 **Lullaby** — `partial` · P3 · themes: control · engine: move-rider
  - _Scene - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Sing. Whenever the user uses the Move "Sing", they may activate this Feature. The user then picks a Pokemon or Trainer being targeted by Sing; Sing automatically hits that target.

- 🟢 **Mach Speed** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4785
  - _Static · Last Chance_
  - The user gains Last Chance with Flying.

- ⚪ **Magic Bounce** — `manual` · P3 · themes: barrier, interrupt, swap · engine: remember-only · code: FEATURE_ABILITY_CHOICES:9517, magicBounceFx:31150, GAUNTLETS:40174
  - _Scene -  Free Action_
  - note: Reflect a Status Move back at the attacker - needs a reaction hook on Status Moves
  - Trigger: The user is hit by a Status Move
    The user may reflect the Move back to the attacker. This Ability may be used to change the placement and affiliation of any Hazards being set within 10 meters of the user as well. Defensive.

- 🟢 **Marvel Scale** — `likely` · P3 · themes: status, cure, cs, skill · engine: auto-note · code: abilityStatusCS:26628, GAUNTLETS:39784, AUTOMATED_ABILITIES:46334
  - _Static_
  - When Asleep, Paralyzed, Burned, Frozen or Poisoned, Marvel Scale raises the user's Defense by +2 Combat Stages. The Combat Stages return to Normal if the user is cured of their status affliction.

- 🟢 **Mega Launcher** — `likely` · P3 · themes: damage, stat · engine: auto-note · code: abilityDamageMods:26383, AUTOMATED_ABILITIES:46311
  - _Static_
  - The user increases the Damage Base of Aura Sphere, Dark Pulse, Dragon Pulse, and Water Pulse by +2.

- 🟢 **Mega Sol** — `likely` · P3 · themes: weather, multiturn · code: WEATHER_SETTER_ABILITIES:3385
  - _Scene - Free Action_
  - The Weather changes to be Sunny for 5 rounds. Bonus: While the Weather is Sunny, the user ignores the Set-Up turn of Moves with the Set-Up Keyword.

- 🟢 **Migraine** — `likely` · P3 · themes: heal · engine: move-rider · code: ABILITY_CAP_GRANTS:21514, CONNECTION_STATUS:22695
  - _Static_
  - Whenever the user is at 50% Hit Points or less, they gain the Telekinetic Capability and may add STAB to Psychic Type Moves.

- 🟡 **Migraine [Errata]** — `partial` · P3 · themes: heal, interrupt, status, damage · engine: move-rider · code: CONNECTION_STATUS:22695
  - _Scene x2 - Free Action · 2-16 Errata_
  - note: v647 CONNECTION_STATUS: Confusion Confuses; the auto-crit is by hand
  - Trigger: The user hits with Confusion while at 50% Hit Points or less
    Connection - Confusion. Confusion automatically gives its target the Confusion Affliction and is a Critical Hit.

<a id="verify-abilities-06"></a>
## `verify-abilities-06` — Verify abilities the scan thinks are handled

P9 · 36 open of 40 · open

- 🟡 **Mimitree** — `partial` · P3 · themes: control · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Mimic. Whenever the user uses a Move copied by Mimic, they may choose to replace that Move with Mimic once more. When used this way, the user ignores Mimic's Frequency.

- 🟢 **Mind Mold** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4785
  - _Static · Last Chance_
  - The user gains Last Chance with Psychic.

- 🟡 **Mind's Eye** — `partial` · P3 · themes: status, typing, damage · engine: move-rider · code: STATUS_IMMUNE_ABILITIES:909
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off) (Blind Bonus); left: Blood Moon connection, Accuracy clauses, Ghost-not-immune to Normal
  - Connection - Blood Moon. Blood Moon deals damage one step more Effectively against the target in the end square of the Line, if that target has no cardinally adjacent allies. Bonus: The user's Accuracy cannot be lowered, their attacks cannot have Accuracy Penalties (such as from Illuminate), and the user is immune to the Blind condition (but not Total Blindness). Ghost-Types are not immune to the user's Normal-Type Moves.

- 🟢 **Miracle Mile** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4786
  - _Static · Last Chance_
  - The user gains Last Chance with Fairy.

- 🟡 **Missile Launch** — `partial` · P3 · themes: damage, action · engine: move-rider
  - _Scene x2 - Standard Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Dragon Darts. The user places two Dreepy Tokens within 6m. The user may move all Dreepy Tokens it controls 4m as a Swift Action. A Dreepy Token can freely enter other creatures' squares as part of this movement, which destroys the token, and causes the creature to suffer an AC2 DB 5 Physical Dragon-Type attack as if from the user of Missile Launch.
    Dreepy Tokens may be targeted. They have the same evasions as the user, and any damage destroys them (including from Smite damage).

- 🟢 **Misty Surge** — `likely` · P3 · themes: weather · code: TERRAIN_SETTER_ABILITIES:3391
  - _Scene x3 - Swift Action_
  - The Field becomes Misty, as if affected by the Move Misty Terrain for one full round.

- 🟢 **Mountain Peak** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4786
  - _Static · Last Chance_
  - The user gains Last Chance with Rock.

- 🟢 **Mouthful** — `likely` · P3 · themes: interrupt, action, skill · engine: move-rider · code: commanderInterceptText:10271, openCommanderAttach:22085
  - _Scene - Swift Action_
  - Trigger: The user hits a smaller foe with a Melee Move
    Connection - Order Up. The user may attempt a Grapple as a Free Action; this Grapple automatically hits, but still requires an opposed Skill Check. Bonus: While dominant in a Grapple, the user does not suffer the usual penalties for being in a Grapple.

- 🟢 **Multitype** — `likely` · P3 · themes: control, status · code: typeShiftDamageBonus:2577, multitypeControl:2885, trainerStabTypes:21001
  - _At Will - Free Action_
  - The user changes its Elemental Type to any of the Elemental Types. Multitype cannot be copied or disabled.

- ✅ **Needles** — `auto` · P3 · themes: heal · engine: move-rider · code: ABILITY_REACTIONS:25059
  - _Static · 9-15 Errata_
  - note: v644 ABILITY_REACTIONS (trig deal, Physical Melee): the ⚡ button under 💥 Apply takes a Tick
  - Connection - Needle Arm. Whenever the user hits a target with a Physical Melee attack, that target loses a Tick of Hit Points.

- ✅ **Neurotoxin** — `auto` · P3 · themes: status · engine: move-rider · code: ABILITY_REACTIONS:25060
  - _Static_
  - note: v644 ABILITY_REACTIONS (trig deal, Poison-Type): the ⚡ button adds Paralysis
  - Connection - Poison Fang. Whenever the user inflicts Poisoned or Badly Poisoned with a damaging Poison-Type Attack, the target is also Paralyzed.

- 🟢 **Neutralizing Gas** — `likely` · P3 · themes: interrupt, swap, status · engine: move-rider · code: inNeutralizingGas:43941
  - _Static_
  - Abilities may not be Triggered in a burst 1 around the user, and Defensive abilities do not function in that area (the user is unaffected by this). If the user uses Poison Gas, Smog, Clear Smog, or Strange Steam, targets hit by those Moves may not trigger Abilities or benefit from Defensive abilities for one full round.

- 🟢 **Normalize** — `likely` · P3 · themes: other · engine: auto-note · code: ateInfo:22229, effectiveMoveType:22268, struggleFor:22296, openMoveRoll:27461, moveRollFactsHTML:46090, AUTOMATED_ABILITIES:46320, tokenDamageBreakdown:56647, attackTargetWidget:57681
  - _Static_
  - All Moves performed by the Pokemon are considered Normal Type instead of whatever Type they normally are.

- 🟡 **Odious Spray** — `partial` · P3 · themes: swap, status, damage · engine: move-rider · code: CONNECTION_STATUS:22696
  - _Scene -  Free Action_
  - note: v647 CONNECTION_STATUS: Poison Gas Flinches; the range 8 / AC 2 change is by hand
  - Connection - Poison Gas. The user may activate this Ability when using Poison Gas to cause Poison Gas to be a single target attack with a range of 8. When used this way, Poison Gas has an AC of 2, and also flinches its target if it hits.

- 🟡 **Odious Spray [Errata]** — `partial` · P3 · themes: interrupt, status, damage · engine: move-rider · code: CONNECTION_STATUS:22697
  - _Static · 2-16 Errata_
  - note: v647 CONNECTION_STATUS: Poison Gas Flinches; the range 8 / AC 2 change is by hand
  - Connection - Poison Gas. The user may use Poison Gas as if it had a Range "8, 1 Target", an AC of 2, and Flinched its target when it hit.

- 🟢 **Overcharge** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4786
  - _Static · Last Chance_
  - The user gains Last Chance with Electric.

- 🟢 **Pastel Veil** — `likely` · P3 · themes: status · code: STATUS_VEILS:43932
  - _Static_
  - The user and allies within 3 meters cannot be Poisoned or Badly Poisoned. Defensive.  Defensive.

- 🟢 **Perception** — `likely` · P3 · themes: interrupt · code: STATIC_ABILITY_EVASION:1581, pokeEdgeCapGrants:19582, POKE_EDGE_DEFS:19753, SKILL_WORDS:22531, CAPTURE_SKILLS:31853
  - _At-Will - Shift Action, Interrupt_
  - Trigger: An ally uses an area-of-effect attack that would hit you
    You may Shift to remove yourself from the area-of-effect.

- 🟢 **Photosynthesis** — `likely` · P3 · themes: heal · code: INJURY_SOURCES:5973
  - _Daily - Extended Action_
  - If the user is allowed to bask in normal sunlight for at least 10 minutes, they may heal up to 25% of their Max Hit Points, and remove one Injury.

- 🟢 **Power Construct** — `likely` · P3 · themes: heal, multiturn · code: POWER_CONSTRUCT_ABILITY:2295
  - _Daily - Swift Action_
  - The user changes to Complete Forme until the end of the Scene, and gains Temporary Hit Points equal to half of the maximum hit points that Complete Forme would have. The user cannot gain Temporary Hit Points from other sources while in Complete Forme.
    Special: The user still uses the HP total and HP Maximum of the Forme that it was in (10% or 50% Forme) before entering Complete Forme. Both Formes must still follow BSR. The user can only use Power Construct while below 50% HP

- 🟢 **Pressure [Errata]** — `likely` · P3 · themes: status · code: typeAbilityRow:3903
  - _Scene - Swift Action · 2-16 Errata_
  - All foes within 3 meters are Suppressed for 1 full round.

- 🟢 **Prism Armor** — `likely` · P3 · themes: typing, damage · engine: auto-note · code: defenseTypeMods:7783, AUTOMATED_ABILITIES:46355
  - _Static_
  - The user gains +5 Damage Reduction against Super Effective-Damage. Defensive.

- 🟢 **Protean** — `likely` · P3 · themes: interrupt, swap, typing · code: ENDABLE_TYPE_SHIFTS:2868, proteanCard:3208
  - _At-Will -  Swift Action_
  - Trigger: The user uses a Move.
    The user's Type changes to match the Type of the triggering Move. This Ability resolves before the Move is resolved (And thus you may apply STAB, and trigger other Features and Abilities appropriately).

- 🟢 **Psychic Surge** — `likely` · P3 · themes: weather · code: TERRAIN_SETTER_ABILITIES:3392
  - _Scene x3 - Swift Action_
  - The Field becomes Weird, as if affected by the Move Psychic Terrain for one full round.

- 🟢 **Punk Rock** — `likely` · P3 · themes: typing, damage · engine: auto-note · code: abilityDamageMods:26417, GAUNTLETS:40108, AUTOMATED_ABILITIES:46312
  - _Static_
  - The user gains +2 DB to moves that have the Sonic keyword. 
    Bonus: The user resists moves with the Sonic keyword one step further. Defensive.

- 🟢 **Pure Blooded** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4787
  - _Static · Last Chance_
  - The user gains Last Chance with Dragon.

- 🟢 **Pure Power** — `likely` · P3 · themes: stat · engine: auto-note · code: HELD_FX:4415, pokeBaseStats:7146, AUTOMATED_ABILITIES:46304
  - _Static_
  - The Pokemon's base attack stat is doubled. This may double any bonuses from Nature or Vitamins, but not bonuses from Features.

- 🟢 **Quick Cloak** — `likely` · P3 · themes: typing, damage · code: typeModsControl:3043
  - _At-Will - Standard Action_
  - Burmy quickly builds a cloak out of nearby materials; using leaves and twigs will give it a Grass Plant Cloak, using sand and rocks will give it a Ground Sandy Cloak, and using trash or scrap will give it a Steel Trash Cloak. While in a Cloak, Burmy gains the Type associated with the Cloak as a secondary Typing, which will become permanent upon evolution into Wormadam. Cloaks are destroyed if Burmy is hit for Super-Effective Damage, or if Burmy makes a new Cloak.

- 🟡 **Quick Curl** — `partial` · P3 · themes: swap, action · engine: move-rider · code: CONNECTION_USE_FX:30268
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Defense Curl. The user may activate this Ability to use Defense Curl as a Swift Action.

- ✅ **Quick Curl [Errata]** — `auto` · P3 · themes: interrupt, swap, damage, action · engine: move-rider · code: CONNECTION_USE_FX:30268
  - _Scene - Free Action · 2-16 Errata_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (+10 DR buff for a round)
  - Connection - Defense Curl. The user may activate this Ability to use Defense Curl as an Standard Action Interrupt and gain +10 Damage Reduction for 1 full round.

- 🟢 **RKS System** — `likely` · P3 · themes: typing, damage · code: autoTypeAbility:2432
  - _Scene - Free Action_
  - If the user is hit by a damaging attack, they may calculate damage as if they were Normal-Typeinstead. If they were already Normal-Type, they resist all damage one step further.Bonus: The user's Type changes to match the Type of their held Memory Disc.

- 🟢 **Rain Dish** — `likely` · P3 · themes: weather, heal · code: WEATHER_DEFS:1483, ABILITY_ACTION_ROWS:3669
  - _Static_
  - While Rainy, the user gains a Tick of Hit Points at the beginning of each of their turns.

- 🟢 **Razor Edge** — `likely` · P3 · themes: status, damage · engine: move-rider · code: critThreshold:26118
  - _Static_
  - Connection - Poison Tail. The user's Critical Hit Range on all Moves is increased by +2; any Moves with "Tail" in their name have their Critical Hit Range increased by +3 instead.

- ✅ **Refreshing Veil** — `auto` · P3 · themes: cure · engine: move-rider · code: CONNECTION_USE_FX:30274
  - _Scene - Free Action_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (cures every Persistent Status)
  - Connection - Aqua Ring. Whenever the user activates Aqua Ring, they may activate this Feature to cure themselves of all Persistent Status Effects.

- 🟢 **Refridgerate** — `likely` · P3 · themes: interrupt · engine: auto-note · code: MEGA_ABILITY_NAME_FIX:5217, ATE_ABILITIES:22223, AUTOMATED_ABILITIES:46324
  - _At-Will - Free Action_
  - Trigger: The user uses a Normal Type Damaging Move.
    The Move is changed to be Ice Type.

- 🟢 **Regenerator** — `likely` · P3 · themes: position, heal, interrupt, action, capture · engine: remember-only · code: GAUNTLET_BOTS:39742, recallRegenerator:52763
  - _Daily x2 - Free Action_
  - Trigger: The user is recalled into a Pokeball or Takes a Breather.
    The user gains Hit Points equal to 1/3rd of its maximum Hit Points. Regenerator may be activated only once per Scene.

- 🟢 **Ripen** — `likely` · P3 · themes: heal, cure, cs, stat · code: ripenOn:18859, digestionCard:19225
  - _Static_
  - Any numeric benefits of Berry Food Buffs the user trades in are doubled. (Oran Berries restore 10 HP, Liechi increases Attack by +2 CS, Jaboca causes ¼ Hit Point loss, Occa Weakens a Move 2 stages, etc.). This does not increase the number of statuses cured, Scene Moves restored, stats lowered by suppressants, or allow triggering at double the usual HP one must be at.

- 🟢 **Rock Head** — `likely` · P3 · themes: heal · code: FEATURE_ABILITY_CHOICES:9506, hpRecoilImmunity:23352, RUNNING_START_ABILITIES:26143, GAUNTLETS:39789, simStrike:44889
  - _Static_
  - The user ignores the Recoil keyword when attacking.

- 🟢 **Rock Head [Errata]** — `likely` · P3 · themes: heal, damage · code: hpRecoilImmunity:23352, RUNNING_START_ABILITIES:26143, simStrike:44889
  - _Static · 2-16 Errata_
  - The user ignores the Recoil keyword when attacking. If the user moves at least 4 meters in a straight line towards a foe before attacking that foe with a physical attack, they may add a +2d6 Bonus to the Damage Roll against that foe.

- 🟡 **Rocky Payload** — `partial` · P3 · themes: other · engine: move-rider · code: openMoveRoll:27482
  - _Static_
  - note: v647 STAB on Rock-Type Moves; Fling as Flying/Rock is by hand
  - Connection - Fling. The user may use Fling as if it was a Flying-Type or Rock-Type move. They may ignore the effects of held Items in their possession. Bonus: The user gains STAB on Rock-Type Moves.

<a id="verify-abilities-07"></a>
## `verify-abilities-07` — Verify abilities the scan thinks are handled

P9 · 33 open of 40 · open

- ✅ **Root Down** — `auto` · P3 · themes: barrier, heal, swap · engine: move-rider · code: CONNECTION_USE_FX:30270
  - _At-Will - Shift Action_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (1/16 Max HP as Temp HP)
  - Connection - Ingrain. While the user has the Ingrain Coat, they may activate this Ability to gain Temporary Hit Points equal to 1/16th of their Max Hit Points.

- ✅ **Root Down [Errata]** — `auto` · P3 · themes: barrier, swap, damage · engine: move-rider · code: CONNECTION_USE_FX:30270
  - _At-Will - Shift Action · 2-16 Errata_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (+5 DR buff)
  - Connection - Ingrain. While the user has the Ingrain Coat, they may activate this Ability to gain 5 Damage Reduction.

- 🟢 **Sand Force** — `likely` · P3 · themes: weather, typing, damage · engine: auto-note · code: WEATHER_DEFS:1501, abilityDamageMods:26391, AUTOMATED_ABILITIES:46339
  - _Static_
  - While in a Sandstorm, the user's Ground, Rock, and Steel-Type Direct-Damage Moves deal +5 Damage. Additionally, the user is immune to damage from Sandstorms.

- 🟢 **Sand Rush** — `likely` · P3 · themes: weather, typing, cs, damage, skill · engine: auto-note · code: WEATHER_DEFS:1499, AUTOMATED_ABILITIES:46338, abilityInitiative:52111
  - _Static_
  - While the Weather is a Sandstorm, the user gains +4 Speed Combat Stages. Additionally, the user is immune to damage from Sandstorms.

- 🟡 **Sand Spit** — `partial` · P3 · themes: interrupt · engine: move-rider
  - _Scene - Free Action, Reaction_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user is damaged by an attack from a foe within 2m
    Connection - Sand Attack. The user attacks the triggering foe with Sand Attack.

- 🟢 **Sand Stream** — `likely` · P3 · themes: weather · code: WEATHER_SETTER_ABILITIES:3387
  - _Scene -  Free Action_
  - The Weather changes to a Sandstorm for 5 rounds. As a static effect, the user is not damaged by Sandstorm.

- 🟢 **Sand Stream [Errata]** — `likely` · P3 · themes: weather, heal, typing · code: WEATHER_SETTER_ABILITIES:3387
  - _Scene x3 - Swift Action · 2-16 Errata_
  - The Weather changes to a Sandstorm for 1 full round.
    Bonus: The user is immune to Hit Point loss from Sandstorms.

- 🟢 **Sap Sipper** — `likely` · P3 · themes: typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7281
  - _Static_
  - The user is immune to the damage and effects of Grass Type attacks. If a damaging Grass Type attack hits the user, the user gains +1 Attack Combat Stage. Defensive.

- 🟢 **Sap Sipper [Errata]** — `likely` · P3 · themes: typing, cs, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7282
  - _Static · 2-16 Errata_
  - The user is immune to the damage and effects of Grass-Type attacks. If the user is hit by a Grass-Type attack, they gain +1 CS in their choice of Attack or Special Attack. Defensive.

- 🟡 **Seed Sower** — `partial` · P3 · themes: weather, interrupt, action · engine: move-rider
  - _Scene - Free Action, Reaction_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user is damaged by a foe within 2m
    Connection - Leech Seed. The user may use Leech Seed as a Free Action on the triggering foe. This attack cannot miss. Bonus: The user counts as in Grassy Terrain when targeting foes affected by Leech Seed. 16 Unofficial Homebrew

- 🟢 **Sheer Force [Errata]** — `likely` · P3 · themes: damage · engine: auto-note · code: abilityDamageMods:26335, openMoveRoll:28606, simStrike:44862, AUTOMATED_ABILITIES:46315
  - _Static · 2-16 Errata_
  - Moves with an Effect Range gain a +10 Bonus to Damage, but Effect Ranges can never be triggered.

- ✅ **Shell Cannon** — `auto` · P3 · themes: position, swap, damage · engine: move-rider · code: CONNECTION_USE_FX:30277
  - _Scene -  Free Action_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (next-attack +2 Accuracy / +4 damage buff)
  - When Blastoise uses Aqua Jet, Dive, Flash Cannon, Hydro Cannon, Hydro Pump, Tackle, Waterfall, Water Gun, and Water Spout they may activate this Ability to gain +2 to their Accuracy Roll and deals +4 Bonus Damage with Damage Rolls. When using Aqua Jet, Dive, Tackle, or Waterfall, Blastoise must shift in a straight line to their target to activate this Ability, but their Overland and Swim Speeds are increased by +2 when doing so.

- 🟡 **Shell Shield** — `partial` · P3 · themes: interrupt, swap, action · engine: move-rider · code: CONNECTION_USE_FX:30269
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Withdraw. The user may activate this Ability to use Withdraw as an Interrupt and a Free Action. The user must still use a Shift Action to stop being Withdrawn.

- ✅ **Shell Shield [Errata]** — `auto` · P3 · themes: interrupt, swap, damage, action · engine: move-rider · code: CONNECTION_USE_FX:30269
  - _Scene - Free Action · 2-16 Errata_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (+10 DR buff for a round)
  - Connection - Withdraw. The user may activate this Ability to use Withdraw as an Standard Action Interrupt and gain +10 Damage Reduction for 1 full round.

- ✅ **Silk Threads** — `auto` · P3 · themes: multiturn, status · engine: move-rider · code: CONNECTION_STATUS:22690
  - _Static_
  - note: v626 CONNECTION_STATUS: String Shot Slows
  - Connection - String Shot. Whenever the user uses "String Shot", the target becomes Slowed until the end of their next turn.

- ✅ **Silk Threads [Errata]** — `auto` · P3 · themes: status · engine: move-rider · code: CONNECTION_STATUS:22691
  - _Static · 2-16 Errata_
  - note: v626 CONNECTION_STATUS: Slowed + Vulnerable
  - Connection - String Shot. Whenever the user uses String Shot, all targets hit become Slowed and Vulnerable for 1 full round.

- 🟢 **Simple** — `likely` · P3 · themes: cs, skill · engine: remember-only · code: LIVING_WEAPON_FORMS:9028
  - _Static_
  - When the Pokemon's Combat Stages are altered, double the amount of Combat Stages they are raised or lowered.

- 🟢 **Sniper [Errata]** — `likely` · P3 · themes: interrupt, damage · code: openMoveRoll:28715
  - _Static · 2-16 Errata_
  - When the user gets a Critical Hit, the attack deals +3d10 additional damage.

- 🟢 **Solar Power** — `likely` · P3 · themes: weather, cs, skill, stat · engine: auto-note · code: WEATHER_DEFS:1460, AUTOMATED_ABILITIES:46336
  - _Static_
  - When Sunny, the Pokemon loses 1/16th of its Max HP at the beginning of its turn. When Sunny, its Special Attack Stat is increased by 2 Combat Stages.

- 🟡 **Sonic Courtship** — `partial` · P3 · themes: interrupt · engine: move-rider
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses Attract
    Connection - Attract. Treat Attract as a Cone 2 Move with the Sonic keyword for this use, which effects all targets regardless of Gender.

- 🟡 **Sonic Courtship [Errata]** — `partial` · P3 · themes: interrupt · engine: move-rider
  - _Scene - Free Action · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses Attract
    Connection - Attract. The user may use Attract as if it had a range of "Burst 3, Sonic, Friendly".

- 🟡 **Soothing Tone** — `partial` · P3 · themes: heal, control · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Heal Bell. Whenever the user uses the Move Heal Bell, all targets that recovered from a Status ailment gain a Tick of Hit Points.

- 🟡 **Soothing Tone [Errata]** — `partial` · P3 · themes: heal, action · engine: move-rider
  - _Static · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Heal Bell. Whenever the user uses a Move that targets allies, those allies gain temporary Hit Points equal to the user's Special Attack. This may affect a specific ally only once per Scene.

- 🟢 **Soulstealer [Errata]** — `likely` · P3 · themes: heal, interrupt · code: INJURY_SOURCES:5967
  - _Scene - Free Action · 2-16 Errata_
  - Trigger: The user's attack causes a foe to Faint
    The user removes one Injury from themselves and gains Hit Points equal to 25% of their Max Hit Points. If the triggering attack killed its target, the user instead removes all Injuries and recovers Hit Points equal to 50% of the user's Max Hit Points.

- ✅ **Sound Lance [Errata]** — `auto` · P3 · themes: heal, interrupt · engine: move-rider · code: ABILITY_ACTION_ROWS:3613
  - _Scene x2 - Swift Action · 2-16 Errata_
  - note: v645 ABILITY_ACTION_ROWS press: the target loses HP equal to the user's Special Attack (abfx loseHP, dynamic params)
  - Trigger: The user uses Supersonic
    Connection - Supersonic. The target of Supersonic loses Hit Points equal to the user's Special Attack. This occurs even if Supersonic misses.

- 🟡 **Spiteful Intervention** — `partial` · P3 · themes: other · engine: move-rider
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection -  Spite.  The user may use Spite in response to an attack hitting an ally, in addition to hitting themselves.

- 🟢 **Stall** — `likely` · P3 · themes: interrupt · code: HELD_FX:4436
  - _Static_
  - In a round's queue, a Pokemon with Stall is always last. If a Pokemon goes to the end of the queue, the Pokemon with Stall is still the last to move. The user's actions taken on their Initiative Count (not Priority or Interrupt) cannot be Interrupted.

- 🟢 **Starlight** — `likely` · P3 · themes: status, damage · code: typeAbilityRow:3966, FEATURE_ABILITY_CHOICES:9505
  - _Scene - Swift Action_
  - The user may activate Starlight while exposed to moonlight or starlight to become Luminous. While the user is Luminous, all foes suffer a -2 penalty to Accuracy Rolls against the user. The user may expend the Luminous condition upon hitting a foe with a damaging attack to cause that foe to become Confused.

- 🟢 **Starlight [Errata]** — `likely` · P3 · themes: cs, damage, action · code: typeAbilityRow:3966
  - _Daily - Swift Action · 2-16 Errata_
  - The user may activate Starlight while exposed to moonlight or starlight to become Luminous. As a Swift Action, the user may expend the Luminous condition to gain +2 Special Defense CS and +2 Evasion for the rest of the Scene.

- 🟡 **Starswirl** — `partial` · P3 · themes: swap, damage, action · engine: move-rider
  - _Scene - Swift Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Rapid Spin. The user may activate this Ability to user Rapid Spin as a Swift Action that deals no damage. Rapid Spin need not have a target when used this way.

- 🟡 **Starswirl [Errata]** — `partial` · P3 · themes: swap, action · engine: move-rider
  - _Scene - Swift Action · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Rapid Spin. The user may activate this Ability to user Rapid Spin as a Swift Action.

- 🟡 **Steam Engine** — `partial` · P3 · themes: weather, interrupt, action · engine: move-rider
  - _Scene x2 - Swift Action, Reaction_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user is hit by a damaging Fire-Type or Water-Type Move, or begins their turn in Rainy Weather
    Connection - Smokescreen. The user may use Smokescreen as a Free Action, ignoring frequency, centered on the user.

- 🟢 **Stellar Blast** — `likely` · P3 · themes: interrupt, multiturn, swap, typing, damage, stat · engine: move-rider · code: terastallize:2700, typeAbilityRow:4017, teraRollNotes:4152, teraMoveType:22251, moveTargetRules:52038
  - _At-Will - Swift Action_
  - Trigger: The user hits a foe with a Move
    Connection - Tera Blast. Choose a Type of the triggering foe. The user then Radiates that Type until the end of the Encounter or they begin Radiating another Type. While Radiating, the user and all allies within a Burst 2 around them receive a +10 Damage Bonus when using Moves of that Type. Bonus: While Radiating a Type, the user may use Tera Blast as that Type. This does not change whether or not they gain STAB. Additionally, when using Tera Blast against a target that has changed Forme, it is one step more effective. This may not cause the Effectiveness to be raised above Doubly Super Effective. Note 1: Changing Forme includes any effect that switch …

- 🟡 **Sticky Smoke** — `partial` · P3 · themes: damage · engine: move-rider
  - _Scene -  Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Smokescreen. All targets that begin or end their turn in the target's Smokescreen have their Accuracy lowered by -1. This penalty may occur multiple times. This stacks with the usual penalties from Smokescreen.

- 🟢 **Storm Drain [Errata]** — `likely` · P3 · themes: interrupt, typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7284
  - _Scene - Free Action · 2-16 Errata_
  - Trigger: A ranged Water Type Move is used within 10 Meters of the user
    The Move is turned into a 1-Target Move and is re-directed at the user without fail, and cannot miss. This negates Lock-On or Mind Reader. the user's Special Attack is then raised by +1 Combat Stage.
    Bonus: The user is immune to the damage and effects of Water Type attacks. Defensive.

- 🟢 **Sunglow** — `likely` · P3 · themes: multiturn, status, damage · code: ABILITY_ACTION_ROWS:3751, FEATURE_ABILITY_CHOICES:9505
  - _Scene - Swift Action_
  - The user may activate Sunglow while exposed to sunlight to become Radiant. While Radiant, the user gains a +5 bonus to all Damage Rolls. The user may expend the Radiant condition upon hitting a foe with a damaging attack to cause that foe to become Blinded until the end of their next turn.

- 🟢 **Swarm** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4783, encOfMon:5435
  - _Static · Last Chance_
  - The user gains Last Chance with Bug.

- 🟢 **Sweet Veil** — `likely` · P3 · themes: status, typing · code: STATUS_VEILS:43929
  - _Static_
  - The user and allies within 3 meters are immune to Sleep. Defensive.

- 🟡 **Tera Cudgel** — `partial` · P3 · themes: weather, heal, interrupt, multiturn, status, damage, action · engine: move-rider
  - _At-Will - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user hits a target with Ivy Cudgel.
    Connection - Ivy Cudgel. Tera Cudgel's Effect depends on the user's current Embody Aspect Forme. Innate. ● Teal Mask: The user may choose to have the attack deal damage as though it were one step less Effective; if they do so, they may then Disengage 3m and attack a different target with Ivy Cudgel as a Free Action, ignoring Frequency, dealing damage as though it were one step less Effective. ● Wellspring Mask: The triggering target becomes Thornbound by the user until the end of the user's next turn. Thornbound characters suffer a -2 Accuracy and -10 damage penalty when targeting characters other than the user, and are treated as Slowed when …

- 🟢 **Tera Shell** — `likely` · P3 · themes: interrupt, multiturn, typing, damage · code: openTeraShell:3281, typeAbilityRow:4012
  - _Scene - Free Action, Interrupt_
  - Trigger: The user is hit by a Move
    The user becomes the Type of their choice as long as that Type resists the Type of the triggering Move, until the end of the encounter. Replace all other Types. Special: When the user changes type, they never change on what Moves they gain STAB. If they would gain STAB on a Move they did not before, they instead gain a +10 Damage Bonus. 19 Unofficial Homebrew

<a id="verify-abilities-08"></a>
## `verify-abilities-08` — Verify abilities the scan thinks are handled

P9 · 31 open of 34 · open

- 🟢 **Teraform Zero** — `likely` · P3 · themes: weather, interrupt · engine: move-rider · code: openTeraformZero:3340, typeAbilityRow:4022, teraMoveType:22254
  - _Scene - Free Action_
  - Trigger: The user starts their turn while having changed Type, or Radiating a Type.
    Connection - Tera Starstorm. All Weather and Terrain effects currently on the Field end, and the user may choose any Weather Effect to replace them. The user may then change their Type to the one associated with the chosen Weather. Additionally, choose one and create the chosen Terrain anywhere within a Burst 4: » Three continuous squares of Blocking Terrain. » Two Blasts 3 of Slow Terrain » Two Blasts 3 of Rough Terrain Bonus: When using Tera Starstorm, it always changes to match the user's Type.

- 🟢 **Teravolt** — `likely` · P3 · themes: interrupt, control, swap, status · code: typeAbilityRow:3919, MOLD_BREAKERS:7846
  - _At-Will - Free Action_
  - Trigger: The user damages a foe
    The damaged foe's Abilities are disabled for the remainder of the encounter.

- 🟢 **Teravolt [Errata]** — `likely` · P3 · themes: swap, typing, damage · code: typeAbilityRow:3919, MOLD_BREAKERS:7846
  - _Static · 2-16 Errata_
  - The user's Electric-Type Attacks ignore the effect of enemies' Defensive Abilities, and if they would be resisted they deal neutral damage instead.

- 🟡 **Tingly Tongue** — `partial` · P3 · themes: interrupt, multiturn, damage, skill · engine: move-rider · code: CONNECTION_STATUS:22694
  - _Scene x2 -  Free Action_
  - note: v647 CONNECTION_STATUS: Lick Paralyzes; +10 DB and the 15+ Save rider by hand
  - Trigger: The user hits a target with Lick
    Connection - Lick. Lick's Damage Roll gains a +10 Bonus and automatically paralyses its target. On a roll of 15+, the target automatically fails its Paralysis Save Check on its next turn.

- 🟢 **Tinted Lens** — `likely` · P3 · themes: typing · engine: remember-auto · code: FEATURE_ABILITY_CHOICES:9501, openTrainerAttack:11256, STAT_FAMILY:24747, openMoveRoll:28365, GAUNTLETS:40033, simProfile:44700
  - _Static_
  - The user's Resisted moves are instead Neutral. The user's Doubly Resisted moves are instead Resisted. The user's Triply Resisted Moves are instead Double Resisted.

- 🟡 **Tonguelash** — `partial` · P3 · themes: interrupt, status · engine: move-rider · code: CONNECTION_STATUS:22693
  - _Scene x2 - Free Action · 2-16 Errata_
  - note: v647 CONNECTION_STATUS: Lick Paralyzes + Flinches on the 🩺 card; the Normal-Type option is by hand
  - Trigger: The user hits a target with Lick
    Connection - Lick. Lick automatically Paralyzes and Flinches its target.
    Bonus: The user may use Lick as if it was Normal-Typed.

- 🟢 **Torrent** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4783, GAUNTLETS:40095
  - _Static_
  - The user gains Last Chance with Water.

- 🟢 **Tough Claws** — `likely` · P3 · themes: damage, stat · engine: auto-note · code: abilityDamageMods:26364, AUTOMATED_ABILITIES:46308
  - _Static_
  - The user increases the Damage Base of all Melee Moves by +2.

- 🟢 **Toxic Boost** — `likely` · P3 · themes: status, cure, cs, skill, stat · engine: auto-note · code: ABILITY_ACTION_ROWS:3679, abilityStatusCS:26596, AUTOMATED_ABILITIES:46332
  - _Static_
  - When Poisoned or Badly Poisoned, the user's Attack is raised by 2 Combat Stages. If the user is cured of its Poisoning, its Attack stat is lowered by 2 Combat Stages.

- 🟡 **Toxic Debris** — `partial` · P3 · themes: hazard, interrupt, control, action · engine: move-rider
  - _Scene x2 - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The Target is hit by a damaging Physical Move
    Connection - Toxic Spikes. The user may use the Move Toxic Spikes as a Free Action Reaction, ignoring frequency, targeting all tiles in a Burst 1 around the user. 20 Unofficial Homebrew

- 🟡 **Transporter** — `partial` · P3 · themes: position, interrupt, control · engine: move-rider
  - _Daily x3 - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: You use the Move Teleport or activate the Teleporter Capability
    Choose One Effect: Connection - Teleport. You activate Teleporter as if your Teleporter value were three times its normal value or you may take one willing Pokemon or Trainer along with you as you teleport so long as you are touching them when you activate Transporter. You may expend two uses of Transporter at once to choose both effects.

- 🟡 **Transporter [Errata]** — `partial` · P3 · themes: position, interrupt · engine: move-rider
  - _Daily x3 - Free Action · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: You Teleport
    Connection - Teleport. You activate Teleporter as if your Teleporter value were three times its normal value; or you may take one willing adjacent Pokemon or Trainer along with you as you teleport so long as you are touching them when you activate Transporter. You may expend two uses of Transporter at once to choose both effects

- 🟡 **Trinity** — `partial` · P3 · themes: status · engine: move-rider
  - _Static · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Tri Attack. You may use Tri Attack as if it had a range of "Melee, 3 Targets". Make a different attack roll for each target. If Tri-Attack's effect range is activated, do not roll for the effect; the first target can only be Frozen, the second can only be Burned, and the third can only be Paralyzed. Additionally, you may use Tri-Attack as a Physical Attack if you wish.

- 🟢 **Turboblaze** — `likely` · P3 · themes: interrupt, control, swap, status · code: typeAbilityRow:3919, MOLD_BREAKERS:7845
  - _At-Will - Free Action_
  - Trigger: The user damages a foe
    The damaged foe's Abilities are disabled for the remainder of the encounter.

- 🟢 **Turboblaze [Errata]** — `likely` · P3 · themes: swap, typing, damage · code: typeAbilityRow:3919, MOLD_BREAKERS:7845
  - _Static · 2-16 Errata_
  - The user's Fire-Type Attacks ignore the effect of enemies' Defensive Abilities, and if they would be resisted they deal neutral damage instead.

- 🟢 **Twisted Power** — `likely` · P3 · themes: damage, stat · engine: remember-auto · code: crossStatDamage:9437, POKE_EDGE_DEFS:19766, abilityDamageMods:26434
  - _Static_
  - The user adds half of their Attack Stat to the damage rolls of their Special Moves; and the user adds half of their Special Attack Stat to the damage of their Physical Moves. This does not change the Damage Class of any attack.

- 🟢 **Type Aura** — `likely` · P3 · themes: damage · code: typeAbilityRow:4096, teraRollNotes:4142, abilityDamageMods:26353
  - _Static · 2-16 Errata_
  - The user and all allies within 3 meters gain a +5 Bonus to Damage Rolls with Moves matching the user's Primary Type.

- 🟢 **Unbreakable** — `likely` · P3 · themes: other · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4787
  - _Static · Last Chance_
  - The user gains Last Chance with Steel.

- 🟢 **Unnerve** — `likely` · P3 · themes: cs, skill · code: ABILITY_ACTION_ROWS:3812, FEATURE_ABILITY_CHOICES:9500
  - _Static_
  - Foes within 3 meters of you cannot gain positive Combat Stages or trade in Digestion/Food Buffs. This does not affect any Combat Stages they already have.

- 🟢 **Unseen Fist** — `likely` · P3 · themes: other · code: typeAbilityRow:4084, teraRollNotes:4146
  - _Static_
  - Reactions, Interrupts, and Blessings may not be activated in response to the user's Melee Attacks.

- 🟢 **Venom** — `likely` · P3 · themes: status · engine: remember-auto · code: LAST_CHANCE_ABILITIES:4787
  - _Static · Last Chance_
  - The user gains Last Chance with Poison.

- ✅ **Vicious** — `auto` · P3 · themes: interrupt, swap, damage, action · engine: move-rider · code: CONNECTION_USE_FX:30279
  - _Scene - Special_
  - note: v647 CONNECTION_USE_FX: pick extra Standard Action or +2 Crit Range buff
  - Trigger: The user uses Hone Claws
    Connection - Hone Claws. When this Ability is activated, choose one effect; the user gains another Standard Action this round; or the user increase their Critical Hit Range on all attacks by +2 for the remainder of the encounter.

- ✅ **Vigor** — `auto` · P3 · themes: heal, interrupt, swap, damage · engine: move-rider · code: CONNECTION_USE_FX:30273
  - _Daily - Free Action_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (a Tick of HP)
  - Trigger: The user uses Endure
    Connection - Endure. When this Ability is activated, after being set to 1 Hit Point, the user gains a Tick of Hit Points. Furthermore, if the Move that triggered Endure gave the user an Injury from Massive Damage, the user does not gain that Injury. Defensive.

- 🟡 **Voodoo Doll** — `partial` · P3 · themes: interrupt, control, status · engine: move-rider
  - _Daily - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user uses the Move Curse as a Ghost Type
    Connection - Curse. Choose an additional target within 8 meters of the user to become Cursed.

- ✅ **Wallmaster** — `auto` · P3 · themes: barrier, cs, skill · engine: move-rider · code: CONNECTION_USE_FX:30282
  - _Static_
  - note: v646 CONNECTION_USE_FX: the 🔗 box's 'Use it on this Move' button now writes the effect (+2 Defense CS or a Barrier reminder)
  - Connection - Barrier. Whenever the user uses Barrier, they may choose to either gain +2 Defense Combat Stages, or place 2 additional segments of Barrier.

- 🟢 **Wash Away** — `likely` · P3 · themes: interrupt, cs, skill · code: openOceanicFeeling:33954, GAUNTLETS:40095
  - _Daily - Free Action_
  - Trigger: The user hits with a Water Type Move
    Before the Move "hits", all Combat Stages on targets hit by the Move are reset to their default (usually 0), and all coats on the targets, except ones placed by Water Sport, are destroyed.

- 🟡 **Water Bubble** — `partial` · P3 · themes: weather, status, typing, damage · engine: auto-note · code: STATUS_IMMUNE_ABILITIES:900, defenseTypeMods:7738, AUTOMATED_ABILITIES:46349
  - _Static_
  - note: found-03 STATUS_IMMUNE_ABILITIES (inflictStatus funnel + ⃠ chips; Mold Breaker/Neutralizing Gas switch Defensive rows off); Fire resist was already in defenseTypeMods; left: 'always act as though in Rainy Weather' and the Melee Water-Move bonus
  - The user resists Fire-Type attacks one step further, is immune to being Burned, and may always act as though in Rainy Weather. [Defensive]Bonus: The user may attack with Water-Type Moves as if they had a range of "Melee, 1 target". If they do, that Move's Class is changed to Physical and it deals +1d6+2 damage.

- 🟢 **Well-Baked Body** — `likely` · P3 · themes: typing, cs, damage, skill · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7287
  - _Static_
  - The user is immune to the damage and effects of Fire-Type attacks, and whenever they are hit with a Fire-Type attack, they gain +2 Defense Combat Stages. Defensive. 21 Unofficial Homebrew

- 🟡 **Whirlwind Kicks** — `partial` · P3 · themes: interrupt, control · engine: move-rider · code: GAUNTLETS:40035
  - _Static_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Rapid Spin. When the user uses the Move "Rapid Spin", it has a range of "Burst 1" instead of Melee and gains the Priority keyword.

- 🟡 **Whirlwind Kicks [Errata]** — `partial` · P3 · themes: other · engine: move-rider
  - _Static · 2-16 Errata_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Connection - Triple Kick. When the user uses the Moves "Rapid Spin" or "Triple Kick", they have a range of "Burst 1".

- 🟢 **Windveiled** — `likely` · P3 · themes: typing, damage, stat · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7289, PTU_BUFFS:18341
  - _Static_
  - The user is immune to the damage and effects of Flying-Type attacks. If the user is hit by a Flying-Type attack, the user raises the Damage Base of their next Flying-Type Move by +1. Defensive.

- 🟢 **Windveiled [Errata]** — `likely` · P3 · themes: typing, cs, damage · engine: auto-note · code: TYPE_ABSORB_ABILITIES:7289
  - _Static · 2-16 Errata_
  - The user is immune to the damage and effects of Flying-Type attacks. If the user is hit by a Flying-Type attack, the user gains +1 Speed CS. Defensive.

- 🟡 **Wistful Melody** — `partial` · P3 · themes: swap, cs · engine: move-rider · code: CONNECTION_CS:25996, GAUNTLETS:40096
  - _Scene - Free Action_
  - note: v647 CONNECTION_CS: Sing -2 Attack/Sp.Attack on the 🔺 card (Soundproof judged by the GM)
  - Connection - Sing. Whenever the user uses Sing, they may activate to his Ability to cause targets that are targeted by Sing have their Attack and Special Attack lowered by -2 CS each, whether Sing successfully hits that target or not. This Ability does not affect targets with the Soundproof Ability.

- 🟡 **Wobble** — `partial` · P3 · themes: barrier, interrupt · engine: move-rider
  - _Scene - Free Action_
  - note: verify sweep v626: Connection rider box (🔗) shows the rule and spends the use on the Move roll; the effect is resolved at the table
  - Trigger: The user is hit by a damaging attack
    The user may use either Counter or Mirror Coat as a Reaction, ignoring Frequency.

<a id="late-verify-abilities-01"></a>
## `late-verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 1 open of 1 · open

- 🟢 **Early Bird** — `likely` · P1 (player:Handels) · themes: other · code: FEATURE_STATUS_IMMUNITY:880, abilityInitiative:52114
  - _Static_
  - The user gains a +3 Bonus to rolls made due to Status Afflictions.

<a id="late-verify-abilities-01"></a>
## `late-verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 1 open of 1 · open

- 🟢 **Heavy Metal** — `likely` · P3 · themes: other · code: weightClassOf:23901
  - _Static_
  - When referring to Weight Classes, treat the Pokemon as if it is 2 Weight Classes higher.

<a id="late-verify-abilities-01"></a>
## `late-verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 1 open of 1 · open

- 🟢 **Light Metal** — `likely` · P3 · themes: other · code: pokeBaseStats:7150
  - _Static_
  - When referring to Weight Classes, treat the Pokemon as if it is 2 Weight Classes lower.

<a id="late-verify-abilities-01"></a>
## `late-verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 1 open of 1 · open

- 🟢 **Ravenous Cycle** — `likely` · P3 · themes: position, heal, multiturn · code: ABILITY_TURN_HOOKS:24363, syncHungerBuff:24376
  - _Static_
  - Static. Connection - Hunger Switch. Each Mode the user switches into feeds it: whenever the user switches into Full Belly Mode, it gains Temporary Hit Points equal to a Tick of its Maximum Hit Points; whenever it switches into Hangry Mode, all of its Movement Capabilities are increased by +3 until the beginning of its next turn.

<a id="late-verify-abilities-01"></a>
## `late-verify-abilities-01` — Verify abilities the scan thinks are handled

P9 · 1 open of 1 · open

- 🟢 **Probability Control** — `likely` · P3 · themes: other · code: GAUNTLETS:40174
  - _Scene - Free Action_
  - Target: Any roll made by yourself or an ally.
    The user may reroll any roll, or have any ally reroll any roll that has been made. This leaves discoverable Psychic residue.

## Not in any batch

Confirmed, flavour-only or skipped. Spot-check the ⚪ manual ones — they are a heuristic guess that the text has no mechanics.

- ⚪ **Cluster Mind** — `manual` · P3 · themes: other
  - _Static_
  - The user's Move Pool limit is increased by +2.

- ⚪ **Flower Power [Errata]** — `manual` · P3 · themes: other
  - _Static · 2-16 Errata_
  - The user may perform damaging Grass Type Moves as if they were their choice of either Physical or Special.

- ⚪ **Gluttony [Errata]** — `manual` · P3 · themes: other
  - _Static · 2-16 Errata_
  - The user may have up to three Food Buffs at once, use up to three Food Buffs per Scene, and may eat two refreshments per half hour.

- ⚪ **Kampfgeist** — `manual` · P3 · themes: other
  - _Static_
  - The user gainst STAB on Fighting Type Moves.

- ⚪ **Line Charge** — `manual` · P3 · themes: other
  - _Static · 2-16 Errata_
  - The user can only shift in cardinal directions on the grid. However, they do not provoke attacks of opportunity from Shifting.

- ⚪ **Long Reach** — `manual` · P3 · themes: other
  - _Static_
  - The user may use damaging attacks as if they had a range of "8, 1 Target" instead of their usual range.

- ⚪ **No Guard [Errata]** — `manual` · P3 · themes: other
  - _Static · 2-16 Errata_
  - The user gains a +3 bonus to all Attack Rolls; however all foes gain a +3 Bonus on Attack Rolls against the user.

- ⚪ **Pumpkingrab [Errata]** — `manual` · P3 · themes: other
  - _Scene - Standard Action · 2-16 Errata_
  - The user automatically Grapples an adjacent foe and gains dominance.

- ⚪ **Radiant Beam** — `manual` · P3 · themes: other
  - _Static_
  - The user may use damaging Grass-Type attacks as if they had a range of "Line 4" instead of their usual range.

- ⚪ **Rockabilly** — `manual` · P3 · themes: other
  - _Static_
  - The user's Sonic Moves gain the Versatile Keyword.

- ⚪ **Spike Shot** — `manual` · P3 · themes: other
  - _Static · 2-16 Errata_
  - The user may use Moves with a Range of "Melee, 1-Target" as if they had a Range of "8, 1-Target" instead.

- ⚪ **Sticky Hold** — `manual` · P2 (pc) · themes: other
  - _Static_
  - The Pokemon's held items cannot be stolen, switched, destroyed or dropped.

- ⚪ **Wily** — `manual` · P3 · themes: other
  - _Static_
  - The user's Status Class Moves may target an additional target within range. This does not apply to area-of-effect moves.

- ⚪ **Zen Mode [Errata]** — `manual` · P3 · themes: other
  - _Scene - Swift Action · 2-16 Errata_
  - The user changes into Zen Mode forme for the rest of the Scene, and may use the Moves "Flamethrower" and "Psychic" as if they were on its Move List.

- ⚪ **Zen Snowed** — `manual` · P3 · themes: other
  - _Scene - Swift Action_
  - The user changes into Zen Mode forme for the rest of the Scene, and may use the Moves "Ice Punch" and "Fire Punch" as if they were on its Move List.

