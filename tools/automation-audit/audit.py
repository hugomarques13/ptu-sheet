"""Automation audit — builds the ledger of what the sheet does and does not automate yet.

Usage (from the repo root):
    python tools/automation-audit/audit.py              # regenerate docs/automation/LEDGER.md + ledger/*.md
    python tools/automation-audit/audit.py next         # print the next open batch, with full rules text
    python tools/automation-audit/audit.py show <batch> # print one batch (e.g. moves-07)
    python tools/automation-audit/audit.py mark <cat> "<name>" <status> ["note"]
                                                        # record a verdict in docs/automation/status.json
    python tools/automation-audit/audit.py rebatch      # throw away batches.json and re-plan (rarely!)

Inputs
    app.js, data/*.json                      the code and the rules text
    docs/automation/engine-tags.json         what the app's own text parsers recognise — produced by
                                             tools/automation-audit/engine-tags.js run inside the page
    backup/sheets.json                       the campaign snapshot, used only to PRIORITISE (what the
                                             players and encounters actually use goes first)
    docs/automation/status.json              hand-kept verdicts; these always win over the heuristic
    docs/automation/batches.json             the frozen work plan (created on first run)

Statuses
    auto      confirmed automated (only ever set by hand, via `mark`)
    likely    code references it / a parser picks it up — verify in the final sweep, don't rebuild
    partial   some of its mechanics are handled, some clauses are not (moves only, from engine tags)
    todo      has mechanics and nothing in the code touches it
    manual    no mechanics to automate (flavour, narrative, GM fiat) — heuristic guess, spot-check
    skip      decided NOT to automate (set by hand, with the reason in the note)
"""
import bisect, collections, io, json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DOCS = os.path.join(ROOT, "docs", "automation")
P = lambda *a: os.path.join(ROOT, *a)

def jload(path, default=None):
    if not os.path.exists(path): return default
    return json.load(io.open(path, encoding="utf-8"))

def jdump(obj, path):
    text = json.dumps(obj, ensure_ascii=False, indent=1, sort_keys=True) + "\n"
    with io.open(path + ".tmp", "w", encoding="utf-8", newline="\n") as f: f.write(text)
    os.replace(path + ".tmp", path)

def wtext(text, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with io.open(path + ".tmp", "w", encoding="utf-8", newline="\n") as f: f.write(text)
    os.replace(path + ".tmp", path)

def fix(s):
    """the xlsx/PDF extraction left U+FFFD where é and curly quotes were"""
    s = str(s or "")
    return s.replace("Pok�mon", "Pokémon").replace("Pok�", "Poké").replace("�", "'")

# ---------------------------------------------------------------------------------------------------
# 1. entities
# ---------------------------------------------------------------------------------------------------
TAGS = jload(os.path.join(DOCS, "engine-tags.json"), {}) or {}

def entities():
    items = jload(P("data", "items.json"))
    cats = collections.OrderedDict()
    def add(cat, rows, text, extra=lambda r: ""):
        seen, out = set(), []
        for r in rows:
            n = fix(r.get("name")).strip()
            if not n or n == "Name" or n in seen: continue
            seen.add(n)
            out.append({"name": n, "text": fix(text(r)), "meta": fix(extra(r)), "raw": r})
        cats[cat] = out
    add("moves", jload(P("data", "moves.json")), lambda r: r.get("effect") or "",
        lambda r: f"{r.get('type','')} {r.get('class','')} · DB {r.get('damageBase') or '—'} · AC {r.get('ac') or '—'} · {r.get('frequency','')} · {r.get('range','')}")
    add("abilities", jload(P("data", "abilities.json")),
        lambda r: "\n".join(x for x in [r.get("trigger") and "Trigger: " + r["trigger"], r.get("target") and "Target: " + r["target"], r.get("effect")] if x),
        lambda r: " · ".join(x for x in [r.get("frequency"), r.get("keywords")] if x))
    add("features", jload(P("data", "features.json")), lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("category"), r.get("tags") if r.get("tags") not in (None, "None") else "", r.get("frequency"), r.get("prerequisites") and "Prereq: " + r["prerequisites"]] if x))
    add("edges", jload(P("data", "edges.json")), lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("category"), r.get("prerequisites") and "Prereq: " + r["prerequisites"]] if x))
    add("pokeedges", jload(P("data", "pokeedges.json")), lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("cost") and f"Cost {r['cost']}", r.get("prerequisites") and "Prereq: " + r["prerequisites"]] if x))
    add("techniques", jload(P("data", "techniques.json")), lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("frequency"), r.get("prereq") and "Prereq: " + r["prereq"]] if x))
    add("gifts", (TAGS.get("catalogs") or {}).get("gifts", []), lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("kind"), r.get("freq"), r.get("prereq") and "Prereq: " + r["prereq"]] if x))
    add("held", items["held"], lambda r: r.get("effect") or "")
    add("food", items["food"], lambda r: r.get("effect") or "")
    add("gear", items["gear"], lambda r: r.get("effect") or "",
        lambda r: " · ".join(x for x in [r.get("cat"), r.get("slot") and "Slot " + r["slot"], r.get("cost") and f"${r['cost']}"] if x))
    add("capabilities", items["capabilities"], lambda r: r.get("effect") or "")
    return cats

# ---------------------------------------------------------------------------------------------------
# 2. static scan — where app.js names each entity, and inside which declaration
# ---------------------------------------------------------------------------------------------------
# Declarations that mention names WITHOUT automating them: pick-lists, aliases, translations,
# reminders, rules prose. A hit only here is not evidence.
NOT_EVIDENCE = {
    "METRONOME_BANNED", "metronomeBanned", "metronomePool", "FEATURE_MOVE_LISTS", "WEAPON_MOVES_ADEPT",
    "WEAPON_MOVES_MASTER", "ARCANE_MOVES_NOVICE", "ARCANE_MOVES_EXPERT", "MOVE_ALIASES", "SPECIES_ALIASES",
    "KEYWORD_DEFS", "KEYWORD_CATS", "KEYWORD_RE_SRC", "ITEM_EFFECT_ES", "ITEM_EFFECT_ES_PATTERNS",
    "RECIPE_BLURB_ES", "ACCENTUATED_TASTES_ES", "BAIT_ES_TAIL", "ITEM_ART_ALIAS", "HEX_MANIAC_MOVES",
    "GIFT_GROUPS", "GIFT_CATALOG", "GENERAL_GIFTS", "MESSIAH_FEATURES", "SIGNER_FEATURES", "USURPER_FEATURES",
    "BRANDS", "BLESSINGS", "ARCANA", "LU_MILESTONES", "ABILITY_REMEMBER", "FEATURE_REMEMBER",
    "FEATURE_CLASS_FIXUPS", "RESEARCH_FIELDS", "SKILLS", "RANKS", "EDGE_CAT_ORDER", "LU_HIDDEN_SOURCES",
    "EMBRACE_TAG_CLASSES", "DC_BOOK_CHECKS", "DC_SKILL_EXAMPLES", "HP_FRACTIONS", "HP_HALF_CURRENT_WHY",
    "TYPE_LINKED_SKILLS", "SKILL_CATEGORY", "MENTOR_LESSONS", "ENC_AREAS", "SHOP_DESC_SHORT",
}
CAT_SKIP_CTX = {   # per-category: contexts that are catalogs of THAT kind of thing (recipes listing gear)
    "gear": {"SNACK_DEFS", "CHEF_RECIPES", "APOTHECARY_RECIPES", "POKEBALL_RECIPES", "BOTANY_RECIPES",
             "GARDEN_TIERS", "MEAL_PLANNER", "ARTIFICER_RECIPES", "CHEMISTRY_RECIPES", "APRICORN_BALLS",
             "REFRESHMENTS", "TASTE_SNACK"},
    "food": {"CHEF_RECIPES", "GARDEN_TIERS", "BOTANY_RECIPES", "TASTE_SNACK"},
    "held": {"CHEF_RECIPES", "GARDEN_TIERS", "BOTANY_RECIPES", "ARTIFICER_RECIPES"},
}
DECL = re.compile(r"^(?:async\s+)?(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)")

class Scan:
    def __init__(self):
        src = io.open(P("app.js"), encoding="utf-8").read()
        self.low = src.lower()
        self.starts = [0]
        cur, self.ctx = "<top>", []
        for ln in src.split("\n"):
            self.starts.append(self.starts[-1] + len(ln) + 1)
            m = DECL.match(ln)
            if m: cur = m.group(1)
            self.ctx.append(cur)
        self.n_lines = len(self.ctx)

    def hits(self, name):
        n = name.lower()
        out = collections.OrderedDict()
        for m in re.finditer(r"[\"'`/(|]" + re.escape(n) + r"(?:[\"'`/)|]| \[)", self.low):
            li = bisect.bisect_right(self.starts, m.start()) - 1
            out.setdefault(self.ctx[li], li + 1)
        return out   # ctx -> first line (1-based)

# ---------------------------------------------------------------------------------------------------
# 3. what the rules text asks for — themes (first match = the batch it is planned into)
# ---------------------------------------------------------------------------------------------------
ST = r"(?:burn(?:s|ed)?|paralyz\w*|poison\w*|asleep|sleep|frozen|freez\w*|confus\w*|flinch\w*|infatuat\w*|enrag\w*|cursed|blind\w*|tripped|vulnerable|suppressed|stuck|slowed|trapped|disabled|drowsy|fainted|badly poisoned)"
THEMES = [  # (key, title, regex)
    ("weather",   "Weather & Terrain",            r"\b(sunny|rainy|rain\b|hail\w*|sandstorm|snow\w*|weather|terrain)\b"),
    ("hazard",    "Hazards & field markers",      r"\b(hazard|spikes|stealth rock|sticky web|toxic spikes|field effect)\b"),
    ("barrier",   "Coats, barriers & Blessings",  r"\b(coat|barrier|blessing|light screen|reflect|safeguard|mist|substitute|wall)\b"),
    ("position",  "Movement, push & switching",   r"\b(push\w*|pull\w*|shift\w* .{0,20}(met(er|re)s?|squares?)|teleport\w*|swap places|recall\w*|switch\w* (out|in|places)|knock\w* back|movement capabilit\w*|overland|sky speed|swim speed|burrow|jump)\b"),
    ("heal",      "Healing, drain, recoil & HP",  r"\b(regain\w*|recover\w*|heal\w*|restor\w*|drain\w*|recoil|temporary hit points|hit points?|ticks? of)\b"),
    ("interrupt", "Interrupts, reactions & priority", r"\b(interrupt|priority|reaction|trigger|protect\w*|intercept\w*|when .{0,40}(hit|targeted|attacked))\b"),
    ("multiturn", "Set-Up, charge & multi-turn",  r"\b(set-?up|resolution|next turn|following turn|charg\w+|exhaust\w*|recharge|two turns|lasts? .{0,20}(rounds?|turns?)|until the end of)\b"),
    ("control",   "Move control & copying",       r"\b(disable\w*|encore|taunt\w*|torment\w*|imprison|mimic|sketch|copy|copies|last move|uses? the move)\b"),
    ("swap",      "Ability / item / stat swaps",  r"\b(swap\w*|exchange\w*|held item|steal\w*|knock\w* off|consum\w*|ability|abilities|item)\b"),
    ("status",    "Status afflictions",           r"\b" + ST + r"\b"),
    ("cure",      "Curing",                       r"\b(cure\w*|remov\w* .{0,30}(status|affliction|condition)s?)\b"),
    ("typing",    "Type changes & immunities",    r"\b(types?\b.{0,25}(becomes?|chang\w*|gain\w*|los\w*)|immune|immunity|resist\w*|super[- ]effective|weakness)\b"),
    ("cs",        "Combat Stages",                r"\b(combat stages?|cs\b)"),
    ("damage",    "Damage, accuracy & crits",     r"\b(damage base|db\b|damage|critical|accuracy|evasion|ac\b|dice|d6|d20)\b"),
    ("action",    "Action economy & AP",          r"\b(ap\b|action points?|standard action|swift action|shift action|free action|full action|extended action|once per)\b"),
    ("skill",     "Skills & checks",              r"\b(check|skill|rank|athletics|acrobatics|combat|stealth|perception|focus|survival|intimidate|charm|command|guile|intuition|education)\b"),
    ("capture",   "Capture & Poké Balls",         r"\b(capture|poke ?ball|poké ?ball|catch)\b"),
    ("stat",      "Stats & level",                r"\b(stats?|level|base \w+|hp stat|attack stat|experience|exp\b)\b"),
    ("social",    "Loyalty, contests & social",   r"\b(loyalty|contest|appeal|happiness|disposition|obey\w*)\b"),
]
THEME_RE = [(k, t, re.compile(r, re.I)) for k, t, r in THEMES]
THEME_TITLE = {k: t for k, t, _ in THEMES}
THEME_TITLE["other"] = "Uncategorised mechanics"
THEME_TITLE["plain"] = "Plain rolls"

def themes_of(text):
    return [k for k, _, rx in THEME_RE if rx.search(text or "")]

# which Move-engine tags explain which theme
MOVE_EXPLAINS = {
    "cs": {"cs"}, "range-status": {"status"}, "rand-status": {"status"}, "range-flinch": {"status"},
    "status-fx": {"status"}, "status-always": {"status"}, "status-self": {"status"},
    "range-crit": {"damage"}, "always-crit": {"damage"}, "weight": {"damage"}, "def-pierce": {"damage", "typing"},
    "target-rules": {"damage"}, "five-strike": {"damage"}, "double-strike": {"damage"}, "ohko": {"damage"},
    "field-type": {"weather", "typing"}, "typemod": {"typing"}, "conversion": {"typing"}, "picks-type": {"typing"},
    "blessing": {"barrier"}, "powder": {"typing"}, "versatile": {"damage"}, "item-move": {"swap"},
}
FLAVOUR_ONLY = re.compile(r"^\s*(none\.?|—|-|n/?a)?\s*$", re.I)

# ---------------------------------------------------------------------------------------------------
# 4. campaign usage — what to do first
# ---------------------------------------------------------------------------------------------------
SENTINELS = {"__pc__", "__map__", "__enc__", "__shop__", "__rolls__"}

def usage():
    rows = jload(P("backup", "sheets.json"), []) or []
    use = collections.defaultdict(lambda: collections.defaultdict(set))   # cat -> name(lower) -> {who}
    def names(v):
        if isinstance(v, str): return [v]
        if isinstance(v, dict): return [v.get("name")] if v.get("name") else []
        if isinstance(v, list): return [n for x in v for n in names(x)]
        return []
    def mon(p, who):
        for n in names(p.get("moves")) + names(p.get("customMoves")): use["moves"][n.lower()].add(who)
        for n in names(p.get("abilities")): use["abilities"][n.lower()].add(who)
        for n in names(p.get("heldItem")): use["held"][n.lower()].add(who)
        for n in names(p.get("pokeEdges")): use["pokeedges"][n.lower()].add(who)
    def trainer(t, who):
        for k in ("features", "extraFeatures"):
            for n in names(t.get(k)): use["features"][n.lower()].add(who)
        for n in (t.get("levelUp") or {}).values():
            if isinstance(n, str): use["features"][n.lower()].add(who); use["edges"][n.lower()].add(who)
        for k in ("edges", "extraEdges"):
            for n in names(t.get(k)): use["edges"][n.lower()].add(who)
        for n in names(t.get("moves")) + names(t.get("featMoves")) + names(t.get("encMoves")): use["moves"][n.lower()].add(who)
        for n in names(t.get("abilities")) + names(t.get("featAbil")): use["abilities"][n.lower()].add(who)
        for n in names(t.get("techniques")): use["techniques"][n.lower()].add(who)
        for n in names(t.get("gifts")): use["gifts"][n.lower()].add(who)
        for n in names(t.get("inventory")) + names(t.get("equipment")):
            for c in ("gear", "held", "food"): use[c][n.lower()].add(who)
    for r in rows:
        d, owner = r.get("data") or {}, r.get("owner_id") or ""
        if owner in SENTINELS:
            if d.get("kind") == "enc":
                for e in d.get("encounters") or []:
                    who = "enc"
                    for p in e.get("mons") or []: mon(p, who)
                    for tr in e.get("trainers") or []:
                        trainer(tr.get("trainer") or {}, who)
                        for p in tr.get("pokemon") or []: mon(p, who)
            elif d.get("kind") == "pc":
                for p in d.get("pokemon") or []: mon(p, "pc")
            continue
        who = "player:" + fix(r.get("owner_name") or "?")
        trainer(d.get("trainer") or {}, who)
        for p in d.get("pokemon") or []: mon(p, who)
    return use

def prio(whos, gm_names=("Hugo",)):
    if any(w.startswith("player:") and w[7:] not in gm_names for w in whos): return 1
    if whos: return 2
    return 3

# ---------------------------------------------------------------------------------------------------
# 5. classify
# ---------------------------------------------------------------------------------------------------
def classify(cat, e, hits, tags):
    text = e["text"]
    th = themes_of(text)
    evidence = [c for c in hits if c not in NOT_EVIDENCE and c not in CAT_SKIP_CTX.get(cat, set())]
    note = ""
    if cat == "moves":
        explained = set().union(*[MOVE_EXPLAINS.get(t, set()) for t in tags]) if tags else set()
        explained |= {"damage", "action"} if th else set()   # every Move roll already does DB/AC/frequency
        residual = [t for t in th if t not in explained and t not in ("skill", "stat", "social")]
        if FLAVOUR_ONLY.match(text) or not th: status = "auto" if not evidence and not tags else "likely"; residual = []
        elif not residual: status = "likely"
        elif tags or evidence: status = "partial"
        else: status = "todo"
        return status, (residual or th or ["plain"]), evidence
    strong = [t for t in tags if t not in ("action-surfaced", "stat-tag", "remember-only", "group-rider")]
    if cat == "gifts" and e["raw"].get("action"): strong.append("gift-action")
    if evidence or strong: status = "likely"
    elif FLAVOUR_ONLY.match(text) or not th: status = "manual"
    else: status = "todo"
    if cat == "gear" and (e["raw"].get("cat") in ("Key Item",)) and status == "todo" and not re.search(r"\b(bonus|\+\d|roll|damage|action|capabilit|check)\b", text, re.I):
        status = "manual"
    return status, (th or ["other"]), evidence

# ---------------------------------------------------------------------------------------------------
# 6. batches — frozen once written, so batch ids stay stable while sessions work through them
# ---------------------------------------------------------------------------------------------------
BATCH_SIZE = {"moves": 25, "abilities": 20, "features": 18, "gifts": 20, "held": 25, "gear": 30,
              "food": 30, "edges": 20, "pokeedges": 20, "techniques": 20, "capabilities": 25}
CAT_ORDER = ["features", "abilities", "moves", "edges", "pokeedges", "techniques", "held", "gifts",
             "capabilities", "food", "gear"]

def plan(rows):
    batches = []
    for cat in CAT_ORDER:
        open_rows = [r for r in rows if r["cat"] == cat and r["status"] in ("todo", "partial")]
        groups = collections.OrderedDict()
        for r in open_rows:
            if cat == "features":
                key = (r["classes"][0] if r["classes"] else r["category"] or "Unclassed")
            elif cat == "gear":
                key = r["raw"].get("cat") or "Gear"
            else:
                key = THEME_TITLE.get(r["themes"][0], "Uncategorised mechanics")
            groups.setdefault(key, []).append(r)
        # groups holding players' things first, then the biggest
        ordered = sorted(groups.items(), key=lambda kv: (min(x["prio"] for x in kv[1]), -len(kv[1]), kv[0]))
        size, cur, cur_keys, n = BATCH_SIZE[cat], [], [], 0
        def flush():
            nonlocal cur, cur_keys, n
            if not cur: return
            n += 1
            title = ", ".join(cur_keys) if len(cur_keys) <= 4 else ", ".join(cur_keys[:4]) + f" +{len(cur_keys) - 4} more"
            batches.append({"id": f"{cat}-{n:02d}", "cat": cat, "title": title,
                            "prio": min(x["prio"] for x in cur), "items": [x["name"] for x in cur]})
            cur, cur_keys = [], []
        for key, members in ordered:
            members.sort(key=lambda x: (x["prio"], x["name"]))
            if len(members) > size:      # a big group gets batches of its own
                flush()
                chunks = [members[i:i + size] for i in range(0, len(members), size)]
                # fold a tiny tail into the previous chunk instead of leaving a 3-item batch
                if len(chunks) > 1 and len(chunks[-1]) < size // 3: chunks[-2].extend(chunks.pop())
                for i, ch in enumerate(chunks):
                    cur, cur_keys = ch, [key + (f" ({i + 1}/{len(chunks)})" if len(chunks) > 1 else "")]
                    flush()
                continue
            if len(cur) + len(members) > size: flush()   # small groups (one class, one theme) share a batch
            cur.extend(members); cur_keys.append(key)
        flush()
        # a 1-3 item batch left behind by a big group is folded into its neighbour
        mine = [b for b in batches if b["cat"] == cat]
        for b in list(mine):
            if len(b["items"]) >= max(4, size // 4) or len(mine) < 2: continue
            i = mine.index(b)
            host = min([x for x in (mine[i - 1] if i else None, mine[i + 1] if i + 1 < len(mine) else None) if x],
                       key=lambda x: len(x["items"]))
            host["items"].extend(b["items"]); host["prio"] = min(host["prio"], b["prio"])
            host["title"] += ", " + b["title"]
            mine.remove(b); batches.remove(b)
        for i, b in enumerate(mine, 1): b["id"] = f"{cat}-{i:02d}"
    # the final sweep: things the scan believes are handled, to be confirmed rather than rebuilt
    for cat in CAT_ORDER:
        likely = sorted([r for r in rows if r["cat"] == cat and r["status"] == "likely"], key=lambda x: (x["prio"], x["name"]))
        size = BATCH_SIZE[cat] * 2
        for i in range(0, len(likely), size):
            batches.append({"id": f"verify-{cat}-{i // size + 1:02d}", "cat": cat, "title": f"Verify {cat} the scan thinks are handled",
                            "prio": 9, "items": [x["name"] for x in likely[i:i + size]]})
    # one global order: what the players use first, then encounters, then the rest, then the sweep
    batches.sort(key=lambda b: (b["prio"], CAT_ORDER.index(b["cat"]), b["id"]))
    return batches

# ---------------------------------------------------------------------------------------------------
# 6b. foundations — shared engines that whole batches need. Build these FIRST: each one turns dozens
#     of per-item jobs into "add a registry row". Line numbers are where to start reading (2026-09-15).
# ---------------------------------------------------------------------------------------------------
FOUNDATIONS = [
    ("found-01", "Move-CS parser coverage",
     "moves: Combat Stages theme (moves-* 'Combat Stages'); every Ability/Feature that says 'raise … Combat Stage'",
     "`CS_PATTERNS` / `moveCSEffects` (~app.js:20105-20165) miss shapes like Calm Mind's \"Raise the user's Special "
     "Attack 1 Combat Stage and raise the user's Special Defense 1 Combat Stage\". Add the missing sentence shapes; "
     "done when the harness finds no Move whose text has a CS change and `moveCSEffects` returns []. Keep direction "
     "from the VERB, not the sign."),
    ("found-02", "Move effects land on the target",
     "moves: Status afflictions theme (~110), target-CS clauses, Flinch",
     "Effect-Range statuses are only announced (`statusHitFromText` banner, ~app.js:22189 and 9257) and "
     "\"The target is Confused.\" (always-on) is not even announced. Carry the triggered statuses + target CS entries "
     "into `attackTargetWidget` (~45638, GM) and the FOE_FX declare path (players, see project-foe-fx memory), apply via "
     "`toggleStatus` so `statusImmunityFor` + STATUS_DEFS type immunities are honoured."),
    ("found-03", "Status immunity registry for Abilities",
     "abilities: Status afflictions / Type changes & immunities themes (Insomnia, Limber, Water Veil, Own Tempo, "
     "Oblivious, Immunity, Magma Armor, Vital Spirit, Leaf Guard, Comatose, Pastel Veil, Sweet Veil …)",
     "`FEATURE_STATUS_IMMUNITY` / `statusImmunityFor` (~app.js:731) only know Trainer Features and bail on non-trainers; "
     "`STATUS_VEILS` (~35869) is a separate path. Make one `STATUS_IMMUNE_ABILITIES` registry (with weather/terrain "
     "conditions) that every status push consults — find the ~20 push sites with `grep -n \"statuses.push\\|statuses = \\[\"`. "
     "found-02 already built the funnel: `inflictStatus` → `statusBlockFor` (STATUS_DEFS Type immunity + Veils + "
     "`statusImmunityFor`) is what every Move/FOE_FX application uses — extend `statusImmunityFor` (drop its "
     "trainer-only bail) and route the remaining push sites through `inflictStatus`."),
    ("found-04", "HP effects of Moves (drain, recoil, self-heal, sacrifice)",
     "moves: Healing, drain, recoil & HP theme (~75); Abilities/Features that heal on a trigger",
     "After the damage roll, offer one-press buttons: drain (half of the damage actually dealt, after the target's "
     "defences — take it from `attackTargetWidget`'s result), recoil (⅓ / ¼ of dealt), self-heal (½ max via "
     "`HP_FRACTIONS`, weather-adjusted Synthesis family), Healing Wish (`SACRIFICE_HEAL_MOVES`). Route through the "
     "same HP pipeline as `damageHealRow` (Temp HP, Injuries, KO)."),
    ("found-05", "Field-setting Moves (weather, terrain, rooms)",
     "moves: Weather & Terrain theme; Trick Room / Gravity / Wonder Room / Magic Room if they get a field state",
     "Copy the `WEATHER_SETTER_ABILITIES` → `setMapWeather` / `toggleMapTerrain` button (~app.js:2845, 47450) onto the "
     "Move roll for Sunny Day, Rain Dance, Sandstorm, Hail/Snowscape, the four Terrain Moves; decide whether rooms get "
     "a map-meta flag."),
    ("found-06", "Hazard-setting Moves",
     "moves: Hazards & field markers theme (Spikes, Toxic Spikes, Stealth Rock, Sticky Web, …)",
     "Reuse `dropStealthRockBy(token,map)` / `HAZARDS` (~app.js:44305) so the roll places the markers; hazard "
     "effects on entering squares may already exist — check `openHazardMenu` first."),
    ("found-07", "Push / pull / shift / swap tokens on the Map",
     "moves: Movement, push & switching theme (~70); Push Maneuver Features (Attack Mastery …); Abilities like Suction Cups",
     "One `forcedMove(token, dir, metres, {ignoreStuck})` on the Map with a target + direction picker from the roll; "
     "respect Stuck/Slowed/Heavy/Suction Cups, stop at walls/tokens. Players declare via FOE_FX."),
    ("found-08", "Timed & multi-turn effects",
     "moves: Set-Up, charge & multi-turn theme; 'until the end of your next turn' clauses everywhere",
     "Buffs already expire on turns (`isTurnDurBuff` / `expireTurnBuffs` ~app.js:16047, `setInitiativeTurn` ~42743, "
     "`tickTypeModTurns` ~1984). Generalise into a per-creature pending-effect list: Set-Up → Resolution next turn, "
     "Recharge/Exhaust, charge turns (Solar Beam, Sky Attack), Semi-invulnerable (Dig/Fly/Shadow Force)."),
    ("found-09", "Ability trigger hooks",
     "abilities: Interrupts, reactions & priority theme; switch-in / turn-start / on-hit / on-KO Abilities",
     "One `ABILITY_HOOKS` dispatch called from the turn engine (`applyTurnStartRegen` ~42659), the apply-hit pipeline "
     "(`attackTargetWidget`), switch-in and KO. Migrate the ad-hoc ones (Speed Boost, Moody, Regenerator …) so new "
     "rows are data, not code."),
    ("found-10", "Coats, screens & protection as buffs",
     "moves: Coats, barriers & Blessings theme (Light Screen, Reflect, Safeguard, Mist, Aqua Ring, Protect family)",
     "Model them as PTU_BUFFS entries (~app.js:15828) with DR / immunity / regen mods read by `buffDR` and "
     "`defenseTypeMods`; Protect family = a one-shot 'next attack misses' charge like `consumeDamageBuffs`."),
    ("found-11", "Move-lock statuses (Disable, Encore, Taunt, Torment, Imprison)",
     "moves: Move control & copying theme; Cursed Body, Mummy-style Abilities",
     "Store the locked Move on the creature, grey it out in ⚔ Battle move lists and refuse the roll; clear with "
     "`clearSceneStatuses`."),
    ("found-12", "Parameterised Feature families",
     "features: Stat Ace ([Stat] Link / Embodiment / Mastery / Stratagem ×5), Type Ace per-type chains, Style Expert "
     "per-Contest-stat Features",
     "These are the same Feature five or eighteen times with one word changed. Implement each family ONCE keyed by the "
     "varying word (see `STAT_ACE_FEATURES` ~app.js:540 and `TYPE_ACE_BRANCH` ~27617 for the existing pattern)."),
]

# ---------------------------------------------------------------------------------------------------
# 7. build
# ---------------------------------------------------------------------------------------------------
def build():
    scan, use, cats = Scan(), usage(), entities()
    status_over = jload(os.path.join(DOCS, "status.json"), {}) or {}
    fclass = TAGS.get("featureClass", {})
    rows = []
    for cat, ents in cats.items():
        ctags = TAGS.get(cat, {}) if cat in ("moves", "abilities", "features") else {}
        for e in ents:
            hits = scan.hits(e["name"])
            tags = ctags.get(e["name"], [])
            status, themes, evidence = classify(cat, e, hits, tags)
            o = (status_over.get(cat) or {}).get(e["name"])
            whos = use.get(cat, {}).get(e["name"].lower(), set())
            rows.append({
                "cat": cat, "name": e["name"], "text": e["text"], "meta": e["meta"], "raw": e["raw"],
                "status": (o or {}).get("status") or status, "heuristic": status, "note": (o or {}).get("note", ""),
                "themes": themes, "tags": tags, "evidence": [f"{c}:{hits[c]}" for c in evidence][:8],
                "prio": prio(whos), "who": sorted(whos),
                "classes": fclass.get(e["name"], []) if cat == "features" else [],
                "category": fix(e["raw"].get("category")) if cat == "features" else "",
            })
    return rows

def batches_for(rows, force=False):
    path = os.path.join(DOCS, "batches.json")
    old = None if force else jload(path)
    if old:
        known = {(b["cat"], n) for b in old for n in b["items"]}
        fresh = [r for r in rows if r["status"] in ("todo", "partial", "likely") and (r["cat"], r["name"]) not in known]
        if fresh:   # new data since the plan was frozen — append, never renumber
            extra = plan(fresh)
            for b in extra: b["id"] = "late-" + b["id"]
            old.extend(extra)
            jdump(old, path)
        return old
    b = plan(rows)
    jdump(b, path)
    return b

ST_ICON = {"auto": "✅", "likely": "🟢", "partial": "🟡", "todo": "🔴", "manual": "⚪", "skip": "⛔"}

def batch_state(b, by):
    sts = [by[(b["cat"], n)]["status"] for n in b["items"] if (b["cat"], n) in by]
    open_ = sum(s in ("todo", "partial", "likely") for s in sts)
    return ("done" if open_ == 0 else "open"), open_, len(sts)

def item_md(r, full=False):
    lim = None if full else 700
    text = r["text"].strip()
    if lim and len(text) > lim: text = text[:lim].rstrip() + " …"
    bits = [f"{ST_ICON.get(r['status'], '?')} **{r['name']}** — `{r['status']}`",
            f"P{r['prio']}" + (f" ({', '.join(r['who'][:4])})" if r["who"] else ""),
            "themes: " + ", ".join(r["themes"])]
    if r["tags"]: bits.append("engine: " + ", ".join(r["tags"]))
    if r["evidence"]: bits.append("code: " + ", ".join(r["evidence"]))
    if r["classes"]: bits.append("class: " + ", ".join(r["classes"][:3]))
    out = "- " + " · ".join(bits) + "\n"
    if r["meta"]: out += f"  - _{r['meta']}_\n"
    if r["note"]: out += f"  - note: {r['note']}\n"
    if text: out += "  - " + text.replace("\n", "\n    ") + "\n"
    return out

def write_docs(rows, batches):
    by = {(r["cat"], r["name"]): r for r in rows}
    cnt = collections.defaultdict(collections.Counter)
    for r in rows: cnt[r["cat"]][r["status"]] += 1
    L = ["# Automation ledger", "",
         "Generated by `python tools/automation-audit/audit.py` — **do not hand-edit**; record verdicts with "
         "`audit.py mark …` (they land in `status.json`) and regenerate. The process is in [README.md](README.md).", "",
         "| category | total | ✅ auto | 🟢 likely | 🟡 partial | 🔴 todo | ⚪ manual | ⛔ skip |", "|---|---:|---:|---:|---:|---:|---:|---:|"]
    for cat in CAT_ORDER:
        c = cnt[cat]
        L.append(f"| [{cat}](ledger/{cat}.md) | {sum(c.values())} | {c['auto']} | {c['likely']} | {c['partial']} | {c['todo']} | {c['manual']} | {c['skip']} |")
    tot = collections.Counter()
    for c in cnt.values(): tot.update(c)
    L.append(f"| **all** | **{sum(tot.values())}** | {tot['auto']} | {tot['likely']} | {tot['partial']} | {tot['todo']} | {tot['manual']} | {tot['skip']} |")
    fdone = (jload(os.path.join(DOCS, "status.json"), {}) or {}).get("foundations", {})
    L += ["", "## Foundations (do these first)", "",
          "Shared engines. Each turns a whole batch below from \"write code per item\" into \"add a registry row\". "
          "Mark one finished with `audit.py mark foundations found-NN auto \"what was built\"`.", "",
          "| id | engine | unlocks | state |", "|---|---|---|---|"]
    for fid, title, unlocks, _ in FOUNDATIONS:
        st = (fdone.get(fid) or {}).get("status")
        L.append(f"| `{fid}` | [{title}](FOUNDATIONS.md#{fid}) | {unlocks} | {'✔ done' if st in ('auto', 'skip') else 'open'} |")
    F = ["# Foundations", "", "[← LEDGER](LEDGER.md) · generated from `FOUNDATIONS` in `tools/automation-audit/audit.py` "
         "— edit it there. Line numbers were right on 2026-09-15; grep the names if they have drifted.", ""]
    for fid, title, unlocks, how in FOUNDATIONS:
        rec = fdone.get(fid) or {}
        st = "✔ done" if rec.get("status") in ("auto", "skip") else "open"
        F += [f'<a id="{fid}"></a>', f"## `{fid}` — {title}", "", f"**State:** {st}" + (f" — {rec['note']}" if rec.get("note") else ""),
              "", f"**Unlocks:** {unlocks}", "", how, ""]
    wtext("\n".join(F) + "\n", os.path.join(DOCS, "FOUNDATIONS.md"))
    L += ["", "## Batches", "", "Work them top to bottom. `P1` = a player sheet uses something in the batch, `P2` = an "
          "encounter / the PC does, `P3` = nobody yet, `P9` = verification sweep.", "",
          "| # | batch | what | prio | open / items | state |", "|---:|---|---|---:|---:|---|"]
    for i, b in enumerate(batches, 1):
        state, open_, n = batch_state(b, by)
        L.append(f"| {i} | `{b['id']}` | [{b['title']}](ledger/{b['cat']}.md#{b['id']}) | P{b['prio']} | {open_} / {n} | {'✔ done' if state == 'done' else 'open'} |")
    wtext("\n".join(L) + "\n", os.path.join(DOCS, "LEDGER.md"))

    for cat in CAT_ORDER:
        mine = [b for b in batches if b["cat"] == cat]
        M = [f"# {cat} — automation ledger", "", "[← LEDGER](../LEDGER.md)", ""]
        placed = set()
        for b in mine:
            state, open_, n = batch_state(b, by)
            M += [f'<a id="{b["id"]}"></a>', f"## `{b['id']}` — {b['title']}", "",
                  f"P{b['prio']} · {open_} open of {n} · {'✔ done' if state == 'done' else 'open'}", ""]
            for name in b["items"]:
                r = by.get((cat, name))
                if r: M.append(item_md(r)); placed.add(name)
        rest = sorted([r for r in rows if r["cat"] == cat and r["name"] not in placed], key=lambda r: (r["status"], r["name"]))
        if rest:
            M += ["## Not in any batch", "", "Confirmed, flavour-only or skipped. Spot-check the ⚪ manual ones — "
                  "they are a heuristic guess that the text has no mechanics.", ""]
            M += [item_md(r) for r in rest]
        wtext("\n".join(M) + "\n", os.path.join(DOCS, "ledger", f"{cat}.md"))

def main(argv):
    cmd = argv[1] if len(argv) > 1 else "build"
    if cmd == "mark":
        cat, name, status = argv[2], argv[3], argv[4]
        assert status in ST_ICON, f"status must be one of {list(ST_ICON)}"
        path = os.path.join(DOCS, "status.json")
        data = jload(path, {}) or {}
        data.setdefault(cat, {})[name] = {"status": status, **({"note": argv[5]} if len(argv) > 5 else {})}
        jdump(data, path)
        print(f"{cat} / {name} → {status}")
        return
    rows = build()
    batches = batches_for(rows, force=(cmd == "rebatch"))
    by = {(r["cat"], r["name"]): r for r in rows}
    if cmd in ("next", "show"):
        fdone = (jload(os.path.join(DOCS, "status.json"), {}) or {}).get("foundations", {})
        want = argv[2] if cmd == "show" else None
        for fid, title, unlocks, how in FOUNDATIONS:
            open_f = (fdone.get(fid) or {}).get("status") not in ("auto", "skip")
            if (want == fid) or (want is None and open_f):
                print(f"# {fid} — {title} (foundation)\n\nUnlocks: {unlocks}\n\n{how}\n")
                return
        if cmd == "show":
            b = next((b for b in batches if b["id"] == argv[2]), None)
        else:
            b = next((b for b in batches if batch_state(b, by)[0] == "open"), None)
        if not b: print("nothing open"); return
        print(f"# {b['id']} — {b['title']} (P{b['prio']})\n")
        for n in b["items"]:
            r = by.get((b["cat"], n))
            if r: print(item_md(r, full=True))
        return
    write_docs(rows, batches)
    c = collections.Counter(r["status"] for r in rows)
    print(dict(c), "batches:", len(batches), "open:", sum(batch_state(b, by)[0] == "open" for b in batches))

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main(sys.argv)
