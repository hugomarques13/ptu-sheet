/* Offline cache for the PTU Sheet app (only active when hosted over http/https).
   Strategy:
   - HTML → NETWORK-FIRST *and* HTTP-cache-bypassing, so a new deploy shows up immediately
     (the fresh index.html references the correct ?v= for app.js/styles.css).
   - Other GET assets → cache-first (they're version-busted via ?v=), falling back to cache offline.

   WHY THE no-store MATTERS (this was a real bug): a plain `fetch(req)` still goes through the
   browser's HTTP cache. GitHub Pages serves index.html with `Cache-Control: max-age=600`, so for
   10 minutes after any visit the "network-first" fetch was quietly answered by the HTTP cache and
   never hit the network — handing back a STALE index.html that still pointed at the previous
   ?v=, which pinned users to the old app.js. Only a hard refresh (which bypasses both the SW and
   the HTTP cache) escaped it, and that's awkward-to-impossible on mobile. `cache:"no-store"`
   makes the HTML fetch genuinely go to the network. */
const CACHE = "ptu-sheet-v10";   // bumped: config.js now points at the new Supabase project — force clients to re-fetch it (v8 could pin the old cached config.js)
/* Precache the shell only. The versioned assets (app.js?v=NN, styles.css?v=NN, data/data.js?v=NN)
   are deliberately NOT listed: their real URLs carry a ?v= the install step can't know, so listing
   the bare paths cached copies nothing ever requests, while the real files get cached at runtime on
   first load anyway. config.js IS requested bare, so it stays. */
/* Uploaded images (Supabase Storage) get their OWN cache, deliberately NOT versioned with CACHE:
   they are content-addressed, so an old entry is never stale, and the map backgrounds are huge
   (the Isles map is a single 9600x12800 png). Re-downloading them on every app deploy would cost
   more Supabase egress than the entire app shell. Survives app updates AND the manual forceRefresh
   wipe in app.js -- keep the two names in sync if this ever changes. */
const IMG_CACHE = "ptu-img-v1";
const KEEP = [CACHE, IMG_CACHE];
const ASSETS = ["./", "./index.html", "./config.js", "./manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  const sameOrigin = url.origin === self.location.origin;

  // Treat the document as HTML whether it arrives as a navigation OR as a same-origin request for
  // an .html path / directory root. Without the second half, a plain fetch("/index.html") fell
  // into the cache-first branch below and got served a stale page straight out of the cache.
  const isHTML = req.mode === "navigate" || req.destination === "document" ||
    (sameOrigin && (url.pathname.endsWith("/") || url.pathname.endsWith(".html")));

  if (isHTML) {
    e.respondWith(
      // no-store: skip the HTTP cache entirely so this is a REAL network-first (see note above)
      fetch(url.pathname + url.search, { cache: "no-store" }).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(h => h || caches.match("./index.html")))
    );
    return;
  }

  // Uploaded images (Supabase Storage public objects) -> cache-first, permanently, in IMG_CACHE.
  // This is a deliberate, NARROW exception to the cross-origin rule below, and it is safe for the
  // one reason that rule exists to protect: these URLs are CONTENT-ADDRESSED. storeImg() mints a
  // fresh uid() path for every upload and never overwrites one, so replacing a map image produces a
  // NEW url and a cached response can never go stale. That is emphatically NOT true of /rest/v1/ or
  // /realtime/v1/, which is why this tests the storage path specifically rather than the host.
  //
  // Why it earns its keep: the map backgrounds are tens of MB and were relying on the browser HTTP
  // cache alone, which evicts big entries first and is emptied by clear-browsing-data, private
  // windows and new devices. Every one of those re-downloaded every map. Cache Storage is not
  // evicted that way, so each device now pays for each image exactly once, at full resolution.
  if (url.pathname.startsWith("/storage/v1/object/public/")) {
    e.respondWith(
      caches.open(IMG_CACHE).then(c => c.match(url.href).then(hit => hit ||
        // Re-issue as an EXPLICIT CORS request rather than forwarding the <img> element's own
        // no-cors one. An opaque response reports status 0 / ok false whether it carries the png
        // or an error page, so caching one blind would let a transient 402 (over quota) or 404 be
        // stored FOREVER in a cache nothing ever clears — every map would stay broken long after
        // the cause was fixed. Supabase serves public objects with access-control-allow-origin, so
        // a cors fetch gives a real status we can test, and it still renders in an <img>.
        fetch(url.href, { mode: "cors", credentials: "omit" }).then(res => {
          if (res && res.ok) c.put(url.href, res.clone()).catch(() => {});
          return res;
        }).catch(() => fetch(req))   // CORS unexpectedly refused → pass through uncached
      ))
    );
    return;
  }

  // Cross-origin requests (Supabase's REST/Realtime API, hotlinked Pokémon art, …) must NEVER be
  // cache-first: this branch was matching them too (only `isHTML` above checked origin), so a
  // browser with the app installed as a PWA would permanently pin the FIRST-EVER response for a
  // given Supabase query URL in Cache Storage and keep serving it forever, even after real writes
  // changed the row server-side — indistinguishable from data "reverting" and, since casUpsert's
  // conflict-retry re-fetch reuses that exact same URL, an unwinnable compare-and-swap loop (the
  // "Save kept conflicting" toast) for a genuinely solo editor. Only same-origin (our own static,
  // version-busted assets) get cache-first; everything else always hits the network.
  if (!sameOrigin) { return; }

  // cache-first for versioned assets, with a network fallback that populates the cache
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit)
    )
  );
});
