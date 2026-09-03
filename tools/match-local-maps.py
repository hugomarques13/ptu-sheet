#!/usr/bin/env python3
"""
Match local map image files to the Storage paths the campaign still needs, by pixel dimensions.

The rescue can only recover what a browser cached; anything left over has to come off disk. Simply
re-uploading through the app would mint NEW uid paths and lose each image's placement (x/y/w/h) and
layer order, so instead this puts your local files back at the EXACT paths the rows already point
at — after which every map is exactly as it was.

Identification is by width x height, read from the file header (no Pillow needed), because the
stored names are random uids that carry no hint of which map they were. Where several maps share a
size the filename is compared against the map name to break the tie, and anything still ambiguous
is reported rather than guessed.

    python tools/match-local-maps.py "D:/maps"              # propose only
    python tools/match-local-maps.py "D:/maps" --apply      # merge into backup/images.json

--apply never overwrites an image already in backup/images.json.
"""
import argparse, base64, json, os, re, struct, sys

EXT = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp")


def dims(path):
    """(width, height, mime) from the file header, or None."""
    try:
        with open(path, "rb") as f:
            head = f.read(32)
            if head[:8] == b"\x89PNG\r\n\x1a\n" and head[12:16] == b"IHDR":
                w, h = struct.unpack(">II", head[16:24])
                return w, h, "image/png"
            if head[:2] == b"\xff\xd8":                      # JPEG: walk to a SOF marker
                f.seek(2)
                while True:
                    b = f.read(1)
                    if not b:
                        return None
                    if b != b"\xff":
                        continue
                    m = f.read(1)
                    while m == b"\xff":
                        m = f.read(1)
                    if not m:
                        return None
                    mk = m[0]
                    if mk in (0xD8, 0xD9) or 0xD0 <= mk <= 0xD7:
                        continue
                    ln = struct.unpack(">H", f.read(2))[0]
                    if mk in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
                              0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                        f.read(1)
                        h, w = struct.unpack(">HH", f.read(4))
                        return w, h, "image/jpeg"
                    f.seek(ln - 2, 1)
            if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
                c = head[12:16]
                if c == b"VP8X":
                    d = head[24:30]
                    return (d[0] | d[1] << 8 | d[2] << 16) + 1, (d[3] | d[4] << 8 | d[5] << 16) + 1, "image/webp"
                if c == b"VP8 ":
                    d = head[26:30]
                    return struct.unpack("<HH", d[0:4])[0] & 0x3FFF, struct.unpack("<HH", d[0:4])[1] & 0x3FFF, "image/webp"
                if c == b"VP8L":
                    b4 = head[21:25]
                    n = int.from_bytes(b4, "little")
                    return (n & 0x3FFF) + 1, ((n >> 14) & 0x3FFF) + 1, "image/webp"
    except Exception:
        return None
    return None


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folder", help="folder holding your local map images (searched recursively)")
    ap.add_argument("--out", default="backup")
    ap.add_argument("--apply", action="store_true", help="merge the confident matches into images.json")
    ap.add_argument("--include-guesses", action="store_true",
                    help="also apply the low-confidence, name-less size matches")
    a = ap.parse_args()

    need = json.load(open(os.path.join(a.out, "missing-maps.json"), encoding="utf-8"))

    local = []
    for root, _, files in os.walk(a.folder):
        for fn in files:
            if fn.lower().endswith(EXT):
                p = os.path.join(root, fn)
                d = dims(p)
                if d:
                    local.append({"path": p, "file": fn, "w": d[0], "h": d[1], "type": d[2]})
    print("scanned %s — %d readable image(s)\n" % (a.folder, len(local)))
    if not local:
        sys.exit("No images found there. Point it at the folder holding your map files.")

    # Global assignment, best NAME match first — never "first want in the list grabs it".
    # Doing it per-want in order let an alphabetically-early map consume the only file of its size
    # even when the filename plainly belonged to another map (Cave -1 taking Ponzona Town.png),
    # which is a silent wrong-picture-on-wrong-map error rather than an honest miss.
    def score(want, f):
        a = norm(re.sub(r"\[.*", "", want["map"]))
        b = norm(os.path.splitext(f["file"])[0])
        if not a or not b:
            return 0
        if a == b:
            return 3
        if a in b or b in a:
            return 2
        wa = set(re.findall(r"[a-z0-9]+", re.sub(r"\[.*", "", want["map"]).lower()))
        wb = set(re.findall(r"[a-z0-9]+", os.path.splitext(f["file"])[0].lower()))
        return 1 if (wa & wb) else 0

    def numeric_pick(want, cands):
        """PoisonGym1.png / PoisonGym2.png against "Poison Gym [1/2]" / "[2/2]".

        Only fires when the candidate filenames are identical apart from a trailing number and
        those numbers are exactly the slot numbers - i.e. the naming is genuinely an ordering, not
        a coincidence. Poison Gym's two halves sit at different y, so a swap would be visible."""
        mm = re.search(r"\[(\d+)/(\d+)\]", want["map"])
        if not mm:
            return None
        idx = int(mm.group(1))
        stems, nums = set(), {}
        for c in cands:
            st = os.path.splitext(c["file"])[0]
            nm = re.search(r"(\d+)$", st.strip())
            if not nm:
                return None
            stems.add(norm(st[:nm.start()]))
            nums[int(nm.group(1))] = c
        if len(stems) != 1 or set(nums) != set(range(1, int(mm.group(2)) + 1)):
            return None
        return nums.get(idx)

    pairs = []
    for wi, want in enumerate(need):
        for fi, f in enumerate(local):
            if f["w"] == want["w"] and f["h"] == want["h"]:
                pairs.append((score(want, f), wi, fi))
    pairs.sort(key=lambda t: -t[0])

    matches, ambiguous, unmatched, guesses = [], [], [], []
    takenw, takenf = set(), set()
    for sc, wi, fi in pairs:
        if sc == 0 or wi in takenw or fi in takenf:
            continue
        # a tie at the same score for this want, against a file nobody better claimed, is ambiguous
        rivals = [f2 for s2, w2, f2 in pairs
                  if w2 == wi and s2 == sc and f2 != fi and f2 not in takenf]
        if rivals:
            np = numeric_pick(need[wi], [local[fi]] + [local[r] for r in rivals])
            if np is not None:
                nfi = local.index(np)
                if nfi not in takenf:
                    takenw.add(wi); takenf.add(nfi)
                    matches.append({"want": need[wi], "file": np, "score": sc})
                    continue
            ambiguous.append((need[wi], [local[fi]] + [local[r] for r in rivals]))
            takenw.add(wi)
            continue
        takenw.add(wi); takenf.add(fi)
        matches.append({"want": need[wi], "file": local[fi], "score": sc})

    # Whatever is left has no name relationship at all. If exactly one unused file of the right
    # size remains it is *probably* the one — but it is a guess, so it is reported apart and is
    # NOT applied unless --include-guesses says so.
    for wi, want in enumerate(need):
        if wi in takenw:
            continue
        cands = [fi for fi, f in enumerate(local)
                 if f["w"] == want["w"] and f["h"] == want["h"] and fi not in takenf]
        if len(cands) == 1:
            takenf.add(cands[0])
            guesses.append({"want": want, "file": local[cands[0]], "score": 0})
        elif cands:
            ambiguous.append((want, [local[c] for c in cands]))
        else:
            unmatched.append(want)

    if matches:
        print("MATCHED (%d)" % len(matches))
        for m in matches:
            print("   %-30s %5dx%-5d  <-  %s" % (m["want"]["map"], m["want"]["w"], m["want"]["h"],
                                                 m["file"]["file"]))
    if ambiguous:
        print("\nAMBIGUOUS — same size, name didn't decide (%d). Rename the file to the map name and re-run:" % len(ambiguous))
        for want, cands in ambiguous:
            print("   %-30s %5dx%-5d  candidates: %s" % (want["map"], want["w"], want["h"],
                                                         ", ".join(c["file"] for c in cands)))
    if unmatched:
        print("\nNO LOCAL FILE AT THAT SIZE (%d):" % len(unmatched))
        for want in unmatched:
            print("   %-30s %5dx%-5d" % (want["map"], want["w"], want["h"]))

    if guesses:
        print("\nLOW CONFIDENCE (%d) - only one local file left at that size, but the"
              " name says nothing. Check each, then re-run with --include-guesses to accept:"
              % len(guesses))
        for g in guesses:
            print("   %-30s %5dx%-5d  <-  %s" % (g["want"]["map"], g["want"]["w"],
                                                 g["want"]["h"], g["file"]["file"]))

    if not a.apply:
        print("\n(dry run — re-run with --apply to merge these into %s/images.json)" % a.out)
        return

    merged = os.path.join(a.out, "images.json")
    images = json.load(open(merged, encoding="utf-8")) if os.path.exists(merged) else []
    have = {o["name"] for o in images}
    added = 0
    for m in (matches + guesses if a.include_guesses else matches):
        name = m["want"]["name"]
        if name in have:
            continue
        blob = open(m["file"]["path"], "rb").read()
        images.append({"name": name, "type": m["file"]["type"],
                       "b64": base64.b64encode(blob).decode("ascii")})
        have.add(name)
        added += 1
    json.dump(images, open(merged, "w", encoding="utf-8"))
    mb = sum(len(base64.b64decode(o["b64"])) for o in images) / 1048576
    print("\nadded %d — %s now holds %d image(s), %.2f MB" % (added, merged, len(images), mb))


if __name__ == "__main__":
    main()
