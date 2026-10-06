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

- ✅ **Aspear Berry** — `auto` · P1 (player:Lysgd) · themes: status, cure · code: SNACK_DEFS:17829
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures freeze

- ✅ **Dry Wafer** — `auto` · P1 (player:Lázaro) · themes: status, damage · code: SNACK_DEFS:17821
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Deal +5 additional damage when making a special attack.  If the user likes Dry, deal +10 additional damage instead.  If the user dislikes Dry, they become Enraged.

- ✅ **Leftovers** — `auto` · P1 (player:Lysgd, player:Lázaro) · themes: heal · code: SNACK_DEFS:17815, eatSnack:18068, chefDumplingIngredients:33954
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Recover 1/16th of max Hit Points at the beginning of each turn for the rest of the encounter

- ✅ **Leppa Berry** — `auto` · P1 (player:Lysgd) · themes: heal · code: SNACK_DEFS:17856
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores a Scene Move

- ✅ **Pecha Berry** — `auto` · P1 (player:Lázaro) · themes: status, cure · code: SNACK_DEFS:17827
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures poison

- ✅ **Sweet Confection** — `auto` · P1 (player:Lázaro) · themes: multiturn, status, damage · code: SNACK_DEFS:17823
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +4 Evasion until the end of the user's next turn.  If the user likes Sweet, gain +4 Accuracy as well.  If the user dislikes Sweet, they become Enraged.

- ✅ **Aguav Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17838
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Bitter, it heals 1/6th instead. If the user dislikes Bitter, the user is Confused.

- ✅ **Apicot Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17844
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Defense CS +1

- ✅ **Bitter Treat** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17822
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +5 damage reduction against a special attack.  If the user likes Sour, gain +10 damage reduction instead.  If the user dislikes Sour, they become Enraged.

- ✅ **Black Sludge** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17816
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Recover 1/8th of max Hit Points at the beginning of each turn for the rest of the encounter

- ✅ **Candy Bar** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17813
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Cheri Berry** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17825
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures paralysis

- ✅ **Chesto Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17826
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures sleep

- ✅ **Chilan Berry** — `auto` · P3 · themes: other · code: SNACK_DEFS:17868
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Weakens foe's Normal-type move by one step

- ✅ **Cornn Berry** — `auto` · P3 · themes: control, status, cure · code: SNACK_DEFS:17851
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Disabled condition

- ✅ **Custap Berry** — `auto` · P3 · themes: interrupt · code: SNACK_DEFS:17857
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Grants the Priority keyword to any Move. May only be used at 25% HP or lower.

- ✅ **Enigma Berry** — `auto` · P3 · themes: interrupt, typing · code: SNACK_DEFS:17847
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - User gains Temporary HP equal to 1/6th of their Max HP when hit by a Super Effective Move.

- ✅ **Figy Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17835
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Spicy, it heals 1/6th instead. If the user dislikes Spicy, the user is Confused.

- ✅ **Ganlon Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17841
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Defense CS +1

- ✅ **Herbal Restorative** — `auto` · P3 · themes: skill · code: SNACK_DEFS:17890, openApplyRestorative:30542, isHerbalRestorative:30553, herbalConsume:30577
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - [Playtest] +2 bonus on a Save Check.

- ✅ **Honey** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17814, eatSnack:18060, CAP_PRODUCERS:25675
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Iapapa Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17839
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Sour, it heals 1/6th instead. If the user dislikes Sour, the user is Confused.

- ✅ **Jaboca Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17849
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Foe dealing Physical Damage to the user loses 1/8 of their Maximum HP.

- ✅ **Kee Berry** — `auto` · P3 · themes: interrupt, cs, action · code: SNACK_DEFS:17858
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Defense CS +1. Activates as a Free Action when hit by a Physical Move.

- ✅ **Lansat Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17845
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Increases Critical Range by +1 for the remainder of the encounter.

- ✅ **Liechi Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17840
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Attack CS +1

- ✅ **Lum Berry** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17833, snackByKey:17899
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures any single status ailment

- ✅ **Mago Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17837
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Sweet, it heals 1/6th instead. If the user dislikes Sweet, the user is Confused.

- ✅ **Magost Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17852
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Enraged condition

- ✅ **Maranga Berry** — `auto` · P3 · themes: interrupt, cs, action · code: SNACK_DEFS:17859
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Defense CS +1. Activates as a Free Action when hit by a Special Move.

- ✅ **Mental Herb** — `auto` · P3 · themes: cure · code: SNACK_DEFS:17880
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures all Volatile Status Effects

- ✅ **Micle Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17848
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Increases Accuracy by +1.

- ✅ **Nomel Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17854
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Infatuated condition

- ✅ **Oran Berry** — `auto` · P3 · themes: heal · code: SNACK_DEFS:17830, gardenGrowers:36174
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 5 Hit Points

- ✅ **Persim Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17831
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Confusion

- ✅ **Petaya Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17843
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Special Attack CS +1

- ✅ **Power Herb** — `auto` · P3 · themes: multiturn · code: SNACK_DEFS:17882
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Eliminates the Set-Up turn of Moves with the Set-Up Keyword

- ✅ **Rabuta Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17853
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures Suppressed condition

- ✅ **Rawst Berry** — `auto` · P3 · themes: status, cure · code: SNACK_DEFS:17828
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Cures burn

- ✅ **Rowap Berry** — `auto` · P3 · themes: damage · code: SNACK_DEFS:17850
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Foe dealing Special Damage to the user loses 1/8 of their Maximum HP.

- ✅ **Salac Berry** — `auto` · P3 · themes: cs · code: SNACK_DEFS:17842
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Speed CS +1

- ✅ **Salty Surprise** — `auto` · P3 · themes: heal, interrupt, status · code: SNACK_DEFS:17818
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain 5 temporary Hit Points when hit by an attack.  If the user likes Salty, gain 10 temporary Hit Points instead.  If the user dislikes Salty, they become Enraged.

- ✅ **Sitrus Berry** — `auto` · P3 · themes: heal · code: inventoryRow:13739, SNACK_DEFS:17834, snackByKey:17899, openFoodPicker:18383
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Restores 15 Hit Points

- ✅ **Sour Candy** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17820
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Gain +5 damage reduction against a physical attack.  If the user likes Sour, gain +10 damage reduction instead.  If the user dislikes Sour, they become Enraged.

- ✅ **Spicy Wrap** — `auto` · P3 · themes: status, damage · code: SNACK_DEFS:17819
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Deal +5 additional damage when making a physical attack.  If the user likes Spicy, deal +10 additional damage instead.  If the user dislikes Spicy, they become Enraged.

- ✅ **Starf Berry** — `auto` · P3 · themes: cs, stat · code: SNACK_DEFS:17846
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Random stat CS +2.  May be used only at 25% HP or lower.

- ✅ **White Herb** — `auto` · P3 · themes: cs, skill · code: SNACK_DEFS:17881
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Any negative Combat Stages are set to 0

- ✅ **Wiki Berry** — `auto` · P3 · themes: heal, status · code: SNACK_DEFS:17836
  - note: snackDef / Food engine (Digestion Buffs, berries, herbs) implements it — verified in the running app (v597)
  - Heals 1/8th of the Pokemon's Max HP. If the user likes Dry, it heals 1/6th instead. If the user dislikes Dry, the user is Confused.

