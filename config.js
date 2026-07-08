/* ─────────────────────────────────────────────────────────────
   Cloud sync configuration (optional).

   Leave the values blank to run the app fully offline / local-only.
   To enable online sync across your group, fill these in with your
   free Supabase project details — see SETUP-CLOUD.md.

   The anon / publishable key is meant to be public (safe to commit).
   NEVER put your SECRET key here — it bypasses all security.
   ───────────────────────────────────────────────────────────── */
window.PTU_CLOUD = {
  url:     "https://dwrnjwetovrvqpiomjfn.supabase.co",   // your project URL
  anonKey: "sb_publishable_tvH4R6ou5QyJJTYCncm4gQ__xfF-OQB", // publishable key (public-safe)
  gmCode:  "hugo-gm-2026",   // ← whoever types this can edit ALL sheets. Change it to your own secret!
};
