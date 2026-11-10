// Paste the two values from Supabase -> Project Settings -> API here
// ("Project URL" and the "anon public" key).
// If you leave them empty, the games still work, but without live results:
// students then pick the game from a menu.
window.CONFIG = {
  SUPABASE_URL: "https://qvorbgdlokhgekzeltla.supabase.co",        // e.g. "https://abcdefgh.supabase.co"
  SUPABASE_ANON_KEY: "sb_publishable_NqsXhiP7IX0xCAPr7aIPqg__sXBeLMy",   // the long "anon public" key
  POLL_SECONDS: 3          // how often (seconds) the phones check whether you unlocked a game
};