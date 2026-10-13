// ==========================================
// GTI AI - KONFIGURASI FRONTEND
// API key disimpan aman di Vercel Environment Variables,
// bukan di file ini.
// ==========================================
window.REX_CONFIG = {
  provider: "vercel",
  model: "openai/gpt-oss-120b",
  endpoint: "/api/chat",
  systemPrompt: "Kamu adalah GTI AI, asisten cerdas, tegas, patuh, dan sigap melayani Tuan.",
  temperature: 0.8,
  maxTokens: 1024,

  developer: {
    name: "REX",
    model: "GPT-OSS 120B",
    tiktok: "https://tiktok.com/@jb.al.game.di.stur12",
    whatsapp: "https://wa.me/6285251573728",
    telegram: "https://t.me/reyven_1"
  }
};
