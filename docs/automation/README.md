# The automation plan

**Goal:** every Move, Ability, Feature, Edge, Poké Edge, Technique, Legendary Gift, Capability and item in
the sheet does what its rules text says without the table doing it by hand — or is consciously marked as
something that can't/shouldn't be automated.

That is ~3,800 entries. It does not fit in one conversation, so it is split into **foundations** (shared
engines, done first) and **batches** (15–30 entries sharing one theme or one Trainer Class), worked through
one or two per conversation.

| file | what it is |
|---|---|
| [LEDGER.md](LEDGER.md) | the dashboard: counts per category, the foundations, every batch in work order |
| [FOUNDATIONS.md](FOUNDATIONS.md) | the shared engines, with where to start reading in `app.js` |
| `ledger/<category>.md` | every entry, grouped by batch, with status, evidence and its full rules text |
| `status.json` | **hand-kept verdicts** — the only file you record decisions in (via `audit.py mark`) |
| `batches.json` | the frozen plan. Ids never renumber; new data is appended as `late-…` batches |
| `engine-tags.json` | what the app's own text parsers recognise, exported from the running page |
| `tools/automation-audit/audit.py` | regenerates everything above |
| `tools/automation-audit/engine-tags.js` | the in-page harness that produces `engine-tags.json` |

---

## Starting a conversation

Paste this (or just say "continue the automation plan"):

> Continue the automation plan in `docs/automation/README.md` in the ptu-sheet repo. Run
> `python tools/automation-audit/audit.py next`, automate that foundation/batch, verify it in the preview,
> record the verdicts with `audit.py mark`, regenerate the ledger, and bump `app.js?v=`.

## The loop for one batch

1. **Get the work.** `python tools/automation-audit/audit.py next` prints the first open foundation, or else
   the first open batch with every entry's full rules text, meta line, who uses it and what the scan found.
   `audit.py show moves-04` prints a specific one.
2. **Check what already exists before writing anything.** For each entry: `grep -n -i "<name>" app.js`, and read
   the engine its theme points at (FOUNDATIONS.md). The scan only knows names and parser hits — an entry marked
   `todo` can still be handled generically somewhere the scan can't see. The app is 48k lines and has a system
   for most things; extending one beats writing a new one.
3. **Automate generically.** Prefer a registry row or a text parser that covers the whole family over code keyed
   to one name. Follow the house rules below.
4. **Verify in the preview** (launch config `ptu-sheet` / `-2` / `-3` in the Desktop folder's `.claude/launch.json`,
   serving this repo). Drive it with the Browser `javascript_tool` — build a Pokémon/Trainer with the thing,
   open the roll or card, assert on the DOM and on the object. Read the console for errors (there is no
   `node` on this machine; the page load IS the syntax check).
5. **Record verdicts** for every entry in the batch — including the ones you decided against:
   ```
   python tools/automation-audit/audit.py mark moves "Calm Mind" auto "moveCSEffects: 'Raise X 1 Combat Stage' shape"
   python tools/automation-audit/audit.py mark abilities "Illuminate" skip "Accuracy is rolled before a target exists"
   python tools/automation-audit/audit.py mark foundations found-01 auto "CS_PATTERNS +3 shapes; 0 unparsed CS moves"
   ```
   Statuses: `auto` (done & verified) · `skip` (won't automate — say why) · `manual` (nothing mechanical) ·
   `partial` (some clauses left; note which).
6. **Regenerate:** `python tools/automation-audit/audit.py` (≈1 min). If you changed a text parser, re-run the
   harness first (below) so `engine-tags.json` reflects it.
7. **Ship hygiene:** bump `app.js?v=` (and `styles.css?v=` / `data/data.js?v=` if touched) in `index.html`;
   write/update a memory file for anything non-obvious; **do not commit or push unless the user asks.**

A conversation can usually take **one foundation**, or **two or three batches** once their foundation exists
(then most entries are one registry row each).

## House rules (learned the hard way — see the memory files)

- **The repo is canonical.** Edit only `C:\Users\gugus\Documents\GitHub\ptu-sheet`. The Desktop folder is data.
- **Patching `app.js` from Python:** it's CRLF and 3 MB. Read with `io.open(p, encoding="utf-8")`, match on `\n`,
  encode the whole string first, write `.tmp` then `os.replace`, and back it up to the scratchpad first. Never put
  backslashes or surrogate-pair emoji in a heredoc'd script (`\U0001F48E` escapes only). Or just use the Edit tool.
- **Cache-bust** every changed static file in `index.html`, or players keep the old cached copy.
- **Data files come in pairs:** `data/*.json` is the source, `data/data.js` is what loads. Change both.
- **Apply, don't silently change numbers.** A rule that alters a roll the player didn't ask about is shown as a
  toggle/tick on the roll; a rule that changes a creature's state is a ⚡/⬆ Apply button. Always-on Static math
  (Huge Power, Thick Fat) is applied directly and gets an `AUTOMATED_ABILITIES` / `FEATURE_AUTO_NOTES` line so
  the player can see the sheet did it.
- **Players can't see enemy tokens.** Anything aimed at a foe goes through `FOE_FX` + `foeFxDialog` (player
  declares, GM picks targets from the 🎲 Rolls feed). Don't write a new picker.
- **State lives on the creature and is cleared by the rest paths.** New per-Scene state must be wiped in both
  End Scene paths (party `applyEndScene` and encounter `resetForScene`); per-turn state rides the initiative
  engine (`setInitiativeTurn`, `expireTurnBuffs`).
- **Combat Stage drops go through `lowerCS`/`changeCS`** so the CS guards (Clear Body …) apply. A status the sheet
  applies goes through `inflictStatus(o, key, {mold})` / `inflictStatuses` (Type, Veil, `STATUS_IMMUNE_ABILITIES`,
  Feature and grounded-Terrain immunities; never toggles off — pass `mold` when the source is an attacker whose
  Mold Breaker is on). A new "immune to X" Ability is one row in `STATUS_IMMUNE_ABILITIES`;
  `toggleStatus` is the hand-toggled chip. A Move's target-side statuses + CS ride with the hit via `moveHitFx` →
  `attackTargetWidget({fx})` and the feed's `atk.fx` — don't add a second Apply button for them.
- **Consts reachable from `load()` must be declared above `let state = load()`** (the TDZ bug).
- When a rule genuinely can't be automated (needs positioning the Map doesn't model, GM judgement, narrative),
  `skip` it with the reason — that is a finished entry, not a failure.

## Re-running the harness

Needed after data changes or after extending a text parser (CS patterns, Effect Ranges, riders…):

```bash
python tools/automation-audit/receive.py docs/automation/engine-tags.json
```
(run that in the background), then in the preview page:
```js
(0,eval)(await (await fetch("tools/automation-audit/engine-tags.js?"+Date.now())).text());
await (await fetch("http://localhost:8799",{method:"POST",body:JSON.stringify(auditEngineTags())})).text()
```

## How the heuristic decides (so you know how far to trust it)

- **Code evidence** = the entry's name appears quoted in `app.js`, inside a declaration that isn't a pick-list,
  alias table, translation or reminder (`NOT_EVIDENCE` in `audit.py`). Line numbers are shown as `ctx:line`.
- **Engine tags** = the app's own parsers matched its text (`moveCSEffects`, `effectThresholds`,
  `specialMoveInfo`, Feature riders, modes, `abilityAutoNote` …). `action-surfaced` and `stat-tag` only mean the
  Feature shows up as a Battle action / pays its [+Stat] tag — not that its effect is automated.
- **Themes** = regexes over the rules text (`THEMES`). A Move is `partial` when its themes are only partly
  explained by its engine tags; that's a strong signal. For everything else, any evidence ⇒ `likely`, which is
  verified in the P9 sweep batches at the end rather than rebuilt.
- **Priority** comes from `backup/sheets.json` (the 2026-09-03 campaign snapshot): P1 a player uses it, P2 an
  encounter or the PC does, P3 nobody yet. Refresh the snapshot to re-prioritise (then `audit.py rebatch` —
  only if nothing has been marked yet, because it renumbers batches).

## Data problems the audit tripped over

- `data/moves.json` and `data/data.js` carry **23 spreadsheet header rows** named `Name` (type `Type`, effect
  `Effects`). The audit ignores them; they may show up in Move pickers. Worth deleting in both files.
- Feature/Edge categories carry `U+FFFD` where `é` was (`Pok�mon Training & Orders`). The ledger repairs it for
  display only.
