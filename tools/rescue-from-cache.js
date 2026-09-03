/* ─────────────────────────────────────────────────────────────────────────────
   Campaign recovery straight out of a browser.

   Two jobs, and the second one is the important one now that `tools/dump-direct.py` can pull the
   rows out of Postgres even while the project is restricted:

     1. THE ROWS — every device that has been in the campaign keeps what it last saw in
        localStorage, and the GM's copy is the whole campaign (every player sheet, the PC, the map,
        the encounter library, the shops, the roll feed). Use this only if the direct Postgres dump
        is not an option.

     2. THE IMAGES — map backgrounds, avatars and sprites live in the Storage bucket, behind the
        same HTTP gateway that returns 402 on a restricted project, so NOTHING server-side can get
        them back. But they were uploaded with `cacheControl: 31536000`, so any browser that has
        looked at them in the last year still has them in its own HTTP disk cache. Re-fetching with
        `cache: "force-cache"` reads that copy without going near the network. This is the only way
        to save the pictures short of paying for a month of Pro.

   HOW TO RUN
     1. On the GM's machine, open the PTU Sheet page — the deployed one, at the same URL the
        campaign was played on, since both localStorage and the HTTP cache are per-origin. Do NOT
        clear the cache or "empty cache and hard reload" first; that is the copy we are reading.
     2. F12 → Console → paste this whole file → Enter.
     3. It downloads `ptu-rescue-<campaign>.json` (the rows) and, if any pictures survived,
        `ptu-rescue-images-<campaign>.json`.
     4. Put them in a folder as `sheets.json` and `images.json`, then:
            python tools/migrate-project.py restore --url <NEW_URL> --key <NEW_KEY> --in rescue
        (If you dumped the rows over Postgres instead, keep that `sheets.json` and just drop this
        `images.json` next to it — restore reads both.)

   Worth having every player run it too: their own sheet is often fresher on their device than in
   the GM's last snapshot, and between them they may hold images the GM's cache has evicted.
   ───────────────────────────────────────────────────────────────────────────── */
(async () => {
  const KINDS = ["pc", "mapmeta", "maptokens", "mapfog", "enc", "shops", "rolls"];
  const save = (obj, filename) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(obj)], { type: "application/json" }));
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    return filename;
  };

  /* ── which campaigns does this device know about? read it off the cache keys ── */
  const campaigns = new Set();
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    let m = /^ptu_cloud_cache_shared_[a-z]+_(.+)$/.exec(k);
    if (m) { campaigns.add(m[1]); continue; }
    m = /^ptu_cloud_cache_(?!shared_)(.+)$/.exec(k);
    if (m) campaigns.add(m[1]);
  }
  if (!campaigns.size) { console.log("%cNo cached campaign found on this device.", "color:#c0392b"); return; }

  const list = [...campaigns];
  const campaign = list.length === 1 ? list[0] : (prompt("Which campaign? " + list.join(", "), list[0]) || "").trim();
  if (!campaign) return;

  /* ── 1. the rows ── */
  const rows = [], seen = new Set();
  const take = (r, where) => {
    if (!r || !r.id || !r.data || seen.has(r.id)) return;
    seen.add(r.id);
    rows.push({ id: r.id, campaign: r.campaign || campaign, owner_id: r.owner_id,
                owner_name: r.owner_name || null, name: r.name || null, data: r.data,
                updated_at: r.updated_at || null, _from: where });
  };
  try {
    const chars = JSON.parse(localStorage.getItem("ptu_cloud_cache_" + campaign) || "[]");
    (Array.isArray(chars) ? chars : []).forEach(r => take(r, "roster"));
  } catch (e) { console.warn("roster cache unreadable", e); }
  KINDS.forEach(kind => {
    try { take(JSON.parse(localStorage.getItem("ptu_cloud_cache_shared_" + kind + "_" + campaign) || "null"), kind); }
    catch (e) { console.warn(kind + " cache unreadable", e); }
  });

  if (!rows.length) { console.log("%cNothing cached for “" + campaign + "”.", "color:#c0392b"); return; }

  console.table(rows.map(r => ({
    id: r.id, from: r._from, name: r.name,
    KB: +(JSON.stringify(r.data).length / 1024).toFixed(1),
    saved: r.updated_at || "(unknown)"
  })));
  const rowsFile = JSON.stringify(rows.map(r => { const { _from, ...rest } = r; return rest; }));
  save(JSON.parse(rowsFile), "ptu-rescue-" + campaign + ".json");
  console.log("%c" + rows.length + " rows saved.", "color:#27ae60;font-weight:bold");

  /* ── 2. the images, out of this browser's own HTTP cache ── */
  // Every Storage URL mentioned anywhere in the campaign, deduped. Matching on the bucket path
  // rather than the project host, so it still finds them if the project ref ever changed.
  const urls = [...new Set((rowsFile.match(/https:\/\/[^"'\\ ]+\/storage\/v1\/object\/public\/images\/[^"'\\ ]+/g) || [])
                            .map(u => u.replace(/[)\]},.]+$/, "")))];
  if (!urls.length) { console.log("No Storage images are referenced by this campaign."); return; }

  console.log("Trying " + urls.length + " image(s) from this browser's cache — this does not need the server…");
  const toB64 = blob => new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result).split(",")[1]);
    fr.onerror = rej;
    fr.readAsDataURL(blob);
  });

  const images = [], missing = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const name = decodeURIComponent(url.split("/object/public/images/")[1] || "");
    try {
      // force-cache: use the stored response if it is still fresh (the upload set a one-year
      // max-age) and only fall through to the network — which will 402 — when it isn't.
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) { missing.push(name + " (HTTP " + res.status + ")"); continue; }
      const blob = await res.blob();
      if (!blob.size || /json/.test(blob.type)) { missing.push(name + " (not an image)"); continue; }
      images.push({ name, type: blob.type || "application/octet-stream", b64: await toB64(blob) });
    } catch (e) {
      missing.push(name + " (" + e.message + ")");
    }
    console.log("  images: " + (i + 1) + "/" + urls.length + "  recovered " + images.length);
  }

  if (images.length) {
    const mb = images.reduce((n, o) => n + o.b64.length, 0) / 1048576 * 0.75;
    save(images, "ptu-rescue-images-" + campaign + ".json");
    console.log("%c" + images.length + "/" + urls.length + " images recovered (~" + mb.toFixed(1) +
                " MB). Save the file as images.json next to sheets.json.",
                "color:#27ae60;font-weight:bold");
  } else {
    console.log("%cNo images were still in this browser's cache.", "color:#c0392b");
  }
  if (missing.length) console.log("Not recovered here (try another player's browser):", missing);
})();
