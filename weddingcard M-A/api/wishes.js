// Vercel serverless function: shared wishes wall stored in Upstash Redis (free tier).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "wedding:wishes";

async function redis(commands) {
  const r = await fetch(URL_ + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return r.json();
}

async function list() {
  const out = await redis([["LRANGE", KEY, 0, 99]]);
  return (out[0].result || []).map((s) => { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!URL_ || !TOKEN) return res.status(503).json({ error: "Database not connected" });
  try {
    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const name = String(b.name || "").trim().slice(0, 40);
      const msg = String(b.msg || "").trim().slice(0, 220);
      if (!name || !msg) return res.status(400).json({ error: "Name and message required" });
      await redis([
        ["LPUSH", KEY, JSON.stringify({ name, msg, t: Date.now() })],
        ["LTRIM", KEY, 0, 99],
      ]);
    } else if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    return res.status(200).json({ wishes: await list() });
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
