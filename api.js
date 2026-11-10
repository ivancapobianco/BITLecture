// Tiny client for the Supabase functions (no external library).
window.API = (function () {
  const C = window.CONFIG || {};
  const enabled = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);

  async function rpc(name, body) {
    const headers = { "Content-Type": "application/json", apikey: C.SUPABASE_ANON_KEY };
    // Old "anon" keys (eyJ...) also go in the Authorization header; new "publishable" keys (sb_publishable_...) must not.
    if (!C.SUPABASE_ANON_KEY.startsWith("sb_")) headers.Authorization = "Bearer " + C.SUPABASE_ANON_KEY;
    const res = await fetch(C.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/rpc/" + name, {
      method: "POST",
      headers,
      body: JSON.stringify(body || {})
    });
    const txt = await res.text();
    if (!res.ok) throw new Error(txt || res.statusText);
    return txt ? JSON.parse(txt) : null;
  }

  return {
    enabled,
    getState: () => rpc("get_state"),
    submit: (game, client, items) => rpc("submit_answers", { p_game: game, p_client: client, p_items: items }),
    results: (game) => rpc("get_results", { p_game: game }),
    setGame: (pin, game) => rpc("set_game", { p_pin: pin, p_game: game }),
    newSession: (pin) => rpc("new_session", { p_pin: pin })
  };
})();