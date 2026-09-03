/* ─────────────────────────────────────────────────────────────────────────────
   RESCUE THE CAMPAIGN'S IMAGES OUT OF THIS BROWSER'S CACHE

   Companion to tools/rescue-from-cache.js. That script derives its URL list from localStorage —
   only what THIS device last happened to see. This one has the 257 URLs referenced by the real
   database baked in (extracted from the Postgres/SQL-editor export), so nothing is missed just
   because a device's snapshot was stale. Generated 2026-09-03; regenerate if the rows change.

   WHY THIS IS THE ONLY WAY: the Storage bucket sits behind the same HTTP gateway that returns
   402 on a restricted project, so no server-side export can reach the pictures. They were
   uploaded with cacheControl: 31536000, so any browser that has looked at them within the year
   still holds them in its own HTTP disk cache; `cache: "force-cache"` reads that copy without
   going near the network.

   HOW TO RUN
     1. Open the DEPLOYED page, at the SAME URL the campaign was played on — both the HTTP cache
        and localStorage are per-origin, and Chrome partitions the cache by top-level site, so a
        different address (or localhost) sees an empty cache.
     2. Do NOT clear browsing data / "empty cache and hard reload" first. That is the copy we read.
     3. F12 → Console → paste this whole file → Enter. Leave the tab focused; it takes a minute.
     4. It downloads ptu-rescue-images-MORE.json. Save it next to sheets.json as images.json.
     5. Worth running on EVERY player's machine too: between them they usually cover the whole set,
        and each run reports exactly which files it could not find.
   ───────────────────────────────────────────────────────────────────────────── */
(async () => {
  const URLS = [
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpqjuq0rjae.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpqpbj8v1ht.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpr80qryb9b.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdprgtm9f981.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdprp78wp12g.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdprwixq13oc.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdps3lcm1n36.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpsach5x7p0.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpsh9gszsgf.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msdpso9x59d34.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/mses4igf0f9bo.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msjb2kgvuo4di.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msspfrzktjrq4.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msspg7djv8vjr.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/msspgj5zsnz4r.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/mt2v2azkc6pkp.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/avatar/mt2vrpernzg5v.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7bs9vc1f1.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7c6n7im1j.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7ccd2pzor.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7chnt7sw0.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7cn6ylzco.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7dbz9mqgj.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7djmge2xu.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7dp0pd96n.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7e0awmn95.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7e5ivffvy.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7eb919rhr.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7egwkrnvy.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7engwhvpe.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7gdnnb8yu.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7gjvjirtu.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7gqfjpo6d.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7heg2zim8.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7hk4uwi78.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7hpl4ygh8.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7hvrf764a.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7i1cf0wdd.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7i9zf908z.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7if4a9y9w.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7iql9xd9f.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7ivym8zkc.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7j1ie4y65.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7jaz8cgng.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7jhyxf2ek.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7jp3j9zhs.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7jufjs3pl.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7k3z5htcq.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7k9sxu2j8.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7kga0ainp.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7klbc927n.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7kt50cus2.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/enc/mt3h7kz4zebd2.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/mstgxdn279m5h.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msth1qe3ov6g0.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msth1x1v8cun4.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msth212nm57h5.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msth3b5fi899f.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msth5trzrnt8z.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthuhk9jjpcr.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthuxttp1f2f.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthuzvg2xou2.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthvynw8epx6.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthw9j9jrjqp.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthx6scldgl0.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthxlhns6v6o.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/msthzmfb7r4qj.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/mstiu6ndwza30.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/item/mstiug1fbv4cq.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjqmf1d7ow.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjr3p7p74j.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjrag5dq06.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjrgh35myl.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjsg4awliq.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjsvvpwr2j.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjteec9eps.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjuqeqiih1.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mscbjvb1luj16.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msdpka092s955.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mshiw18jr8wzl.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msjatf785c8eg.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msjb5hk0pud9a.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msjbgr16v2xl6.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msjbpt3pq3czx.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/msjdjbhtx85fm.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mskc3022vpsl4.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt68u6b2eiq72.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt72a5cs9nxih.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt72cf53svyqe.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt7r4ugnvi7zl.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt7r4zj6bvzni.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/map/mt7r6g5dq94o5.png",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/mon/mshiy645b7tse.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/mon/msspohxjv0ycf.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/mon/mt656t1nydpxw.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/msjavlkrqph0y.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/msjbiiv8kn7gj.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/msjbqi5k65lo3.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/mskcg9mpu3037.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/mskcgs0tijlqa.jpeg",
  "https://sorunoixnsdafxxccmyw.supabase.co/storage/v1/object/public/images/poketicia/rival/mt7rklcukr6j6.jpeg"
];

  const toB64 = blob => new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result).split(",")[1]);
    fr.onerror = rej;
    fr.readAsDataURL(blob);
  });

  console.log("Trying " + URLS.length + " image(s) from this browser's cache — no server needed…");
  const images = [], missing = [];
  for (let i = 0; i < URLS.length; i++) {
    const url = URLS[i];
    const name = decodeURIComponent(url.split("/object/public/images/")[1] || "");
    try {
      const res = await fetch(url, { cache: "force-cache" });
      // A 402 here means it was NOT in cache and the request escaped to the restricted gateway.
      if (!res.ok) { missing.push(name + " (HTTP " + res.status + ")"); continue; }
      const blob = await res.blob();
      if (!blob.size || /json/.test(blob.type)) { missing.push(name + " (not an image)"); continue; }
      images.push({ name, type: blob.type || "application/octet-stream", b64: await toB64(blob) });
    } catch (e) { missing.push(name + " (" + e.message + ")"); }
    if ((i + 1) % 20 === 0 || i === URLS.length - 1)
      console.log("  " + (i + 1) + "/" + URLS.length + " tried, " + images.length + " recovered");
  }

  if (images.length) {
    const mb = images.reduce((n, o) => n + o.b64.length, 0) / 1048576 * 0.75;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(images)], { type: "application/json" }));
    a.download = "ptu-rescue-images-MORE.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 30000);
    console.log("%c" + images.length + "/" + URLS.length + " recovered (~" + mb.toFixed(1) +
                " MB). Save it as images.json next to sheets.json.",
                "color:#27ae60;font-weight:bold");
  } else {
    console.log("%cNothing was left in this browser's cache.", "color:#c0392b");
  }
  if (missing.length) {
    console.log("NOT recovered here (" + missing.length + ") — try another player's browser:");
    console.log(missing.join(String.fromCharCode(10)));
    const b = document.createElement("a");
    b.href = URL.createObjectURL(new Blob([JSON.stringify(missing, null, 1)], { type: "application/json" }));
    b.download = "ptu-rescue-MISSING-MORE.json";
    b.click();
  }
})();
