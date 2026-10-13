// Vercel Serverless Function: POST /api/chat
// Set GROQ_API_KEY in Vercel Project Settings > Environment Variables.
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY belum diatur di Vercel Environment Variables."
    });
  }

  const body = req.body || {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Pesan tidak boleh kosong." });
  if (message.length > 12000) {
    return res.status(413).json({ error: "Pesan terlalu panjang." });
  }

  const model = typeof body.model === "string" && body.model.length < 120
    ? body.model : (process.env.GROQ_MODEL || "openai/gpt-oss-120b");
  const systemPrompt = typeof body.systemPrompt === "string"
    ? body.systemPrompt.slice(0, 4000)
    : "Kamu adalah GTI AI, asisten yang membantu pengguna.";
  const temperature = Number.isFinite(Number(body.temperature))
    ? Math.min(2, Math.max(0, Number(body.temperature))) : 0.8;
  const maxTokens = Number.isFinite(Number(body.maxTokens))
    ? Math.min(4096, Math.max(1, Number(body.maxTokens))) : 1024;

  try {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const detail = data && data.error && data.error.message
        ? data.error.message : "Penyedia AI menolak permintaan.";
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502)
        .json({ error: detail });
    }

    const reply = data && data.choices && data.choices[0] &&
      data.choices[0].message && data.choices[0].message.content;
    if (typeof reply !== "string") {
      return res.status(502).json({ error: "Format respons AI tidak valid." });
    }
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(502).json({ error: "Tidak dapat menghubungi penyedia AI." });
  }
           }
