# food — automation ledger

[← LEDGER](../LEDGER.md)

<a id="food-01"></a>
## `food-01` — Type changes & immunities, Status afflictions

P3 · 0 open of 17 · ✔ done

- ✅ **Babiri Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Steel-type move by one step

- ✅ **Charti Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Rock-type move by one step

- ✅ **Chople Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Fighting-type move by one step

- ✅ **Coba Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Flying-type move by one step

- ✅ **Colbur Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Dark-type move by one step

- ✅ **Haban Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Dragon-type move by one step

- ✅ **Kasib Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Ghost-type move by one step

- ✅ **Occa Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Fire-type move by one step

- ✅ **Passho Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Water-type move by one step

- ✅ **Payapa Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Psychic-type move by one step

- ✅ **Rindo Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Grass-type move by one step

- ✅ **Roseli Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Fairy-type move by one step

- ✅ **Shuca Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Ground-type move by one step

- ✅ **Tanga Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Bug-type move by one step

- ✅ **Wacan Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Electric-type move by one step

- ✅ **Yache Berry** — `auto` · P3 · themes: typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Ice-type move by one step

- ✅ **Kebia Berry** — `auto` · P3 · themes: status, typing
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's super effective Poison-type move by one step

<a id="verify-food-01"></a>
## `verify-food-01` — Verify food the scan thinks are handled

P9 · 0 open of 48 · ✔ done

- ✅ **Aspear Berry** — `auto` · P1 (player:Lysgd) · themes: status, cure · code: SNACK_DEFS:17461
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures freeze

- ✅ **Dry Wafer** — `auto` · P1 (player:Lázaro) · themes: status, damage · code: SNACK_DEFS:17453
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Deal +5 additional damage when making a special attack.  If the user likes Dry, deal +10 additional damage instead.  If the user dislikes Dry, they become Enraged.

- ✅ **Leftovers** — `auto` · P1 (player:Lysgd, player:Lázaro) · themes: heal · code: SNACK_DEFS:17447, eatSnack:17700, chefDumplingIngredients:32855
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Recover 1/16th of max Hit Points at the beginning of each turn for the rest of the encounter

- ✅ **Leppa Berry** — `auto` · P1 (player:Lysgd) · themes: heal · code: SNACK_DEFS:17488
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores a Scene Move

- ✅ **Pecha Berry** — `auto` · P1 (player:Lázaro) · themes: status, cure · code: SNACK_DEFS:17459
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures poison

- ✅ **Sweet Confection** — `auto` · P1 (player:Lázaro) · themes: multiturn, status, damage · code: SNACK_DEFS:17455
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +4 Evasion until the end of the user's next turn.  If the user likes Sweet, gain +4 Accuracy as well.  If the user dislikes Sweet, they become Enraged.

- ✅ **Aguav Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17470
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Bitter, it heals 1/6th instead. If the user dislikes Bitter, the user is Confused.

- ✅ **Apicot Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17476
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Defense CS +1

- ✅ **Bitter Treat** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17454
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +5 damage reduction against a special attack.  If the user likes Sour, gain +10 damage reduction instead.  If the user dislikes Sour, they become Enraged.

- ✅ **Black Sludge** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17448
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Recover 1/8th of max Hit Points at the beginning of each turn for the rest of the encounter

- ✅ **Candy Bar** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17445
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Cheri Berry** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17457
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures paralysis

- ✅ **Chesto Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17458
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures sleep

- ✅ **Chilan Berry** — `auto` · P3 · themes: other · code: SNACK_DEFS:17500
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's Normal-type move by one step

- ✅ **Cornn Berry** — `auto` · P3 · themes: control, status, cure · code: SNACK_DEFS:17483
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Disabled condition

- ✅ **Custap Berry** — `auto` · P3 · themes: interrupt · code: SNACK_DEFS:17489
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Grants the Priority keyword to any Move. May only be used at 25% HP or lower.

- ✅ **Enigma Berry** — `auto` · P3 · themes: interrupt, typing · code: SNACK_DEFS:17479
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - User gains Temporary HP equal to 1/6th of their Max HP when hit by a Super Effective Move.

- ✅ **Figy Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17467
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Spicy, it heals 1/6th instead. If the user dislikes Spicy, the user is Confused.

- ✅ **Ganlon Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17473
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Defense CS +1

- ✅ **Herbal Restorative** — `auto` · P3 · themes: skill · code: SNACK_DEFS:17522, openApplyRestorative:29581, isHerbalRestorative:29592, herbalConsume:29616
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - [Playtest] +2 bonus on a Save Check.

- ✅ **Honey** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17446, eatSnack:17692
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Iapapa Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17471
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Sour, it heals 1/6th instead. If the user dislikes Sour, the user is Confused.

- ✅ **Jaboca Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17481
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Foe dealing Physical Damage to the user loses 1/8 of their Maximum HP.

- ✅ **Kee Berry** — `auto` · P3 · themes: interrupt, cs, action · code: SNACK_DEFS:17490
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Defense CS +1. Activates as a Free Action when hit by a Physical Move.

- ✅ **Lansat Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17477
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Increases Critical Range by +1 for the remainder of the encounter.

- ✅ **Liechi Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17472
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Attack CS +1

- ✅ **Lum Berry** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17465, snackByKey:17531
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures any single status ailment

- ✅ **Mago Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17469
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Sweet, it heals 1/6th instead. If the user dislikes Sweet, the user is Confused.

- ✅ **Magost Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17484
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Enraged condition

- ✅ **Maranga Berry** — `auto` · P3 · themes: interrupt, cs, action · code: SNACK_DEFS:17491
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Defense CS +1. Activates as a Free Action when hit by a Special Move.

- ✅ **Mental Herb** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17512
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures all Volatile Status Effects

- ✅ **Micle Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17480
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Increases Accuracy by +1.

- ✅ **Nomel Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17486
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Infatuated condition

- ✅ **Oran Berry** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17462, gardenGrowers:35074
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Persim Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17463
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Confusion

- ✅ **Petaya Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17475
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Attack CS +1

- ✅ **Power Herb** — `auto` · P3 · themes: multiturn · code: SNACK_DEFS:17514
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Eliminates the Set-Up turn of Moves with the Set-Up Keyword

- ✅ **Rabuta Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17485
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Suppressed condition

- ✅ **Rawst Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17460
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures burn

- ✅ **Rowap Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17482
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Foe dealing Special Damage to the user loses 1/8 of their Maximum HP.

- ✅ **Salac Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17474
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Speed CS +1

- ✅ **Salty Surprise** — `auto` · P3 · themes: heal, interrupt, status · code: SNACK_DEFS:17450
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain 5 temporary Hit Points when hit by an attack.  If the user likes Salty, gain 10 temporary Hit Points instead.  If the user dislikes Salty, they become Enraged.

- ✅ **Sitrus Berry** — `auto` · P3 · themes: heal · code: inventoryRow:13378, SNACK_DEFS:17466, snackByKey:17531, openFoodPicker:18015
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 15 Hit Points

- ✅ **Sour Candy** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17452
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +5 damage reduction against a physical attack.  If the user likes Sour, gain +10 damage reduction instead.  If the user dislikes Sour, they become Enraged.

- ✅ **Spicy Wrap** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17451
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Deal +5 additional damage when making a physical attack.  If the user likes Spicy, deal +10 additional damage instead.  If the user dislikes Spicy, they become Enraged.

- ✅ **Starf Berry** — `auto` · P3 · themes: cs, stat · code: SNACK_DEFS:17478
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Random stat CS +2.  May be used only at 25% HP or lower.

- ✅ **White Herb** — `auto` · P3 · themes: cs, skill · code: SNACK_DEFS:17513
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Any negative Combat Stages are set to 0

- ✅ **Wiki Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17468
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Dry, it heals 1/6th instead. If the user dislikes Dry, the user is Confused.

