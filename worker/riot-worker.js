// ARAM Mimik – Zwischendienst für Riot-Spieldaten (Cloudflare Worker)
//
// Die Webseite schickt eine Spielnummer, z. B. ?match=EUW1_8047091059.
// Dieser Dienst fragt damit bei Riot nach und gibt nur die Daten zurück, die die Seite braucht.
// Der Riot-Schlüssel liegt als geheime Variable RIOT_KEY in Cloudflare und steht nirgends im Code.
//
// ?ping=1      prüft, ob der Schlüssel funktioniert
// ?match=...   holt ein Spiel

const ALLOWED_ORIGINS = ["https://timurozn.github.io"];

const ROUTING = {
  EUW1: "europe", EUN1: "europe", TR1: "europe", RU: "europe", ME1: "europe",
  NA1: "americas", BR1: "americas", LA1: "americas", LA2: "americas",
  KR: "asia", JP1: "asia",
  OC1: "sea", PH2: "sea", SG2: "sea", TH2: "sea", TW2: "sea", VN2: "sea"
};

function originOk(request) {
  const origin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": originOk(request) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(body, status, cors, extra) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, cors, extra || {})
  });
}

function slim(d) {
  const info = d.info || {};
  return {
    id: (d.metadata && d.metadata.matchId) || "",
    at: info.gameCreation || info.gameStartTimestamp || 0,
    dur: info.gameDuration || 0,
    q: info.queueId || 0,
    mode: info.gameMode || "",
    p: (info.participants || []).map(function (x) {
      const aug = [];
      for (let i = 1; i <= 6; i++) { const a = x["playerAugment" + i]; if (a) aug.push(a); }
      return {
        n: x.riotIdGameName || x.summonerName || "",
        t: x.riotIdTagline || "",
        c: x.championName || "",
        ci: x.championId || 0,
        k: x.kills || 0,
        d: x.deaths || 0,
        a: x.assists || 0,
        dmg: x.totalDamageDealtToChampions || 0,
        tk: x.totalDamageTaken || 0,
        g: x.goldEarned || 0,
        w: !!x.win,
        tm: x.teamId || 0,
        aug: aug
      };
    })
  };
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "GET") return json({ error: "method" }, 405, cors);
    // only our own page may use this service (browsers always send their origin on such requests)
    if (!originOk(request)) return json({ error: "origin" }, 403, cors);

    const url = new URL(request.url);
    if (!env.RIOT_KEY) return json({ error: "no-key" }, 500, cors);

    if (url.searchParams.get("ping")) {
      const r = await fetch("https://euw1.api.riotgames.com/lol/status/v4/platform-data", { headers: { "X-Riot-Token": env.RIOT_KEY } });
      return json({ ok: r.ok, status: r.status }, 200, cors, { "Cache-Control": "no-store" });
    }

    const id = (url.searchParams.get("match") || "").toUpperCase();
    const m = /^([A-Z]{2,4}\d?)_(\d{6,13})$/.exec(id);
    if (!m || !ROUTING[m[1]]) return json({ error: "bad-id" }, 400, cors);

    // finished matches never change, so they are cached at Cloudflare
    const cache = caches.default;
    const cacheKey = new Request("https://aram-mimik-cache.invalid/match/" + id);
    const hit = await cache.match(cacheKey);
    if (hit) return json(await hit.json(), 200, cors);

    const r = await fetch("https://" + ROUTING[m[1]] + ".api.riotgames.com/lol/match/v5/matches/" + id, {
      headers: { "X-Riot-Token": env.RIOT_KEY }
    });
    if (r.status === 404) return json({ error: "not-found" }, 404, cors);
    if (r.status === 401 || r.status === 403) return json({ error: "key" }, 502, cors);
    if (r.status === 429) return json({ error: "busy" }, 429, cors);
    if (!r.ok) return json({ error: "riot", status: r.status }, 502, cors);

    const out = slim(await r.json());
    ctx.waitUntil(cache.put(cacheKey, new Response(JSON.stringify(out), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=31536000" }
    })));
    return json(out, 200, cors);
  }
};
