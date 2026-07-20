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
const CACHE = "ptu-sheet-v6";
/* Precache the shell only. The versioned assets (app.js?v=NN, styles.css?v=NN, data/data.js?v=NN)
   are deliberately NOT listed: their real URLs carry a ?v= the install step can't know, so listing
   the bare paths cached copies nothing ever requests, while the real files get cached at runtime on
   first load anyway. config.js IS requested bare, so it stays. */
const ASSETS = ["./", "./index.html", "./config.js", "./manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
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
