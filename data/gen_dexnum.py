"""Build data/dexnum.js — every PTU species row keyed to its National Dex number.

Source: PokeAPI's national pokedex (1025 base species). PTU's species table stores every form as
its own row ("Vulpix Alolan", "Gourgeist Small", "Mega Charizard X"), so a row that isn't itself a
national species falls back to the longest run of words inside its name that IS one. That resolves
1299 of the 1317 rows with zero false positives (audited: the matched national name is a substring
of every PTU name it was matched to). The rest are the two Nidoran (PokeAPI spells them
"nidoran-f" / "nidoran-m") plus homebrew, which has no national number and is left out.
"""
import json, os, re, unicodedata, urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.dirname(os.path.abspath(__file__))


def key(s):
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", s.lower())


def national():
    cache = os.path.join(WORK, ".natdex-cache.json")
    if os.path.exists(cache):
        return json.load(open(cache))
    req = urllib.request.Request("https://pokeapi.co/api/v2/pokedex/1/",
                                 headers={"User-Agent": "Mozilla/5.0"})
    d = json.load(urllib.request.urlopen(req, timeout=60))
    nat = {x["pokemon_species"]["name"]: x["entry_number"] for x in d["pokemon_entries"]}
    json.dump(nat, open(cache, "w"), indent=0)
    return nat


nat = national()
natk = {key(n): v for n, v in nat.items()}
MANUAL = {"nidoranfemale": 29, "nidoranmale": 32}

species = [s["name"] for s in json.load(open(os.path.join(REPO, "data/species.json"), encoding="utf8"))]
custom = json.load(open(os.path.join(REPO, "data/custom_species.json"), encoding="utf8"))
species += [s["name"] for s in (custom if isinstance(custom, list) else custom.get("species", []))]


def resolve(name):
    k = key(name)
    if k in MANUAL:
        return MANUAL[k]
    if k in natk:
        return natk[k]
    t = [x for x in re.split(r"[\s\-]+", name.strip()) if x]
    for size in range(len(t) - 1, 0, -1):
        for i in range(0, len(t) - size + 1):
            cand = key(" ".join(t[i:i + size]))
            if cand in natk:
                return natk[cand]
    return None


# app.js's own dexKey() does NOT fold accents -- it just drops everything outside [a-z0-9], so
# "Flabebe" keys as flabebe but "Flabebe" with its accents keys as flabb. Emit BOTH spellings so a
# lookup matches whichever way the name is written.
def appkey(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


out, missing = {}, []
for n in species:
    v = resolve(n)
    if v:
        out[key(n)] = v
        out[appkey(n)] = v
    elif key(n) not in out:
        missing.append(n)

# audit: every match must name its national species inside the PTU name
num2name = {v: n for n, v in nat.items()}
bad = [n for n in species
       if out.get(key(n)) and key(n) not in MANUAL and key(num2name[out[key(n)]]) not in key(n)]
assert not bad, bad

items = sorted(out.items(), key=lambda kv: (kv[1], kv[0]))
lines, row = [], []
for k, v in items:
    row.append(json.dumps(k) + ":" + str(v))
    if len(row) == 12:
        lines.append(",".join(row))
        row = []
if row:
    lines.append(",".join(row))

body = (
    "/* National Dex number for every species row, keyed the way app.js's dexKey() keys them\n"
    "   (lowercased, non-alphanumerics dropped). Generated from PokeAPI's national pokedex by\n"
    "   data/gen_dexnum.py -- forms resolve to their base species' number, so Vulpix Alolan,\n"
    "   Mega Charizard X and Gourgeist Small all carry the number their base Pokemon has.\n"
    "   Homebrew species are deliberately absent and sort last in the Dex tab. */\n"
    "window.PTU_DEXNUM={\n" + ",\n".join(lines) + "};\n")

path = os.path.join(REPO, "data/dexnum.js")
data = body.replace("\n", "\r\n").encode("utf-8")
assert len(data) > 10000
open(path + ".tmp", "wb").write(data)
os.replace(path + ".tmp", path)
print("wrote", path, len(data), "bytes;", len(out), "keyed;", len(missing), "without a number")
print("no number:", ", ".join(sorted(set(missing))))
