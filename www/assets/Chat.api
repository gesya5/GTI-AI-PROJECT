// ==========================================
// GTI AI - Core Logic
// ==========================================
const splash        = document.getElementById('splash');
const splashVideo   = document.getElementById('splashVideo');
const skipBtn       = document.getElementById('skipBtn');

const app           = document.getElementById('app');
const chat          = document.getElementById('chat');
const input         = document.getElementById('userInput');
const sendBtn       = document.getElementById('sendBtn');
const menuBtn       = document.getElementById('menuBtn');
const sideMenu      = document.getElementById('sideMenu');
const overlay       = document.getElementById('overlay');
const newChatBtn    = document.getElementById('newChatBtn');

const attachBtn     = document.getElementById('attachBtn');
const attachPanel   = document.getElementById('attachPanel');
const attachOverlay = document.getElementById('attachOverlay');

const aboutModal    = document.getElementById('aboutModal');
const aboutOverlay  = document.getElementById('aboutOverlay');
const navAbout      = document.getElementById('navAbout');
const closeAbout    = document.getElementById('closeAbout');

const historyList     = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// ==========================================
// AKTIFKAN SUARA VIDEO SETELAH USER TAP
// ==========================================
function enableSound() {
  if (!splashVideo) return;
  splashVideo.muted = false;
  splashVideo.volume = 1.0;
  splashVideo.play().catch(() => {});
  document.removeEventListener('touchstart', enableSound);
  document.removeEventListener('click',      enableSound);
  document.removeEventListener('keydown',    enableSound);
}
document.addEventListener('touchstart', enableSound, { once: true });
document.addEventListener('click',      enableSound, { once: true });
document.addEventListener('keydown',    enableSound, { once: true });

// ==========================================
// SPLASH → DASHBOARD
// ==========================================
let splashDone = false;

function enterDashboard() {
  if (splashDone) return;
  splashDone = true;
  try { splashVideo.pause(); } catch (e) {}
  splash.classList.add('hide');
  app.classList.remove('hidden');
  loadDeveloperInfo();
  loadHistory();
}

splashVideo.addEventListener('ended', enterDashboard);
splashVideo.addEventListener('error', () => setTimeout(enterDashboard, 500));
skipBtn.addEventListener('click', enterDashboard);

window.addEventListener('load', () => {
  splashVideo.play().catch(() => setTimeout(enterDashboard, 800));
});

// ==========================================
// RIWAYAT CHAT
// ==========================================
const HISTORY_KEY = 'gti_history';
let currentChatId = null;

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch(e) { return []; }
}

function saveHistory(h) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 30)));
}

function createNewChat() {
  const id = 'chat_' + Date.now();
  const h = getHistory();
  h.unshift({ id, title: 'Chat Baru', messages: [], date: new Date().toISOString() });
  saveHistory(h);
  currentChatId = id;
  return id;
}

function getCurrentChat() {
  return getHistory().find(c => c.id === currentChatId);
}

function loadHistory() {
  const h = getHistory();
  historyList.innerHTML = '';

  if (!h.length) {
    historyList.innerHTML = `<li class="history-empty">Belum ada riwayat chat</li>`;
    return;
  }

  h.forEach(c => {
    const li = document.createElement('li');
    li.className = 'history-item';
    if (c.id === currentChatId) li.classList.add('active');
    li.dataset.id = c.id;

    li.innerHTML = `
      <span class="hist-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </span>
      <span class="hist-text">${c.title}</span>
      <button class="hist-del" data-del="${c.id}" aria-label="hapus chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>
        </svg>
      </button>
    `;

    li.addEventListener('click', (e) => {
      if (e.target.closest('.hist-del')) return;
      openChat(c.id);
    });

    li.querySelector('.hist-del').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteChat(c.id);
    });

    historyList.appendChild(li);
  });
}

function deleteChat(id) {
  if (!confirm('Hapus chat ini?')) return;
  let h = getHistory();
  h = h.filter(c => c.id !== id);
  saveHistory(h);
  if (id === currentChatId) {
    currentChatId = null;
    chat.innerHTML = '';
    renderWelcome();
  }
  loadHistory();
}

function openChat(id) {
  const chatData = getHistory().find(c => c.id === id);
  if (!chatData) return;
  currentChatId = id;
  chat.innerHTML = '';
  chatData.messages.forEach(m => renderMessage(m.text, m.role, false));
  if (!chatData.messages.length) renderWelcome();
  loadHistory();
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
}

function renderWelcome() {
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = `
    <div class="avatar"><img src="assets/logo.svg" alt="bot"/></div>
    <div class="bubble"><p>Halo Tuan. Saya <b>GTI AI</b>, siap membantu apapun yang Tuan butuhkan.</p></div>
  `;
  chat.appendChild(div);
}

clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Hapus semua riwayat chat Tuan?')) {
    localStorage.removeItem(HISTORY_KEY);
    currentChatId = null;
    loadHistory();
    chat.innerHTML = '';
    renderWelcome();
  }
});

// ==========================================
// SIDE MENU
// ==========================================
menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
  overlay.classList.add('show');
  loadHistory();
});
overlay.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
});

// ==========================================
// NEW CHAT
// ==========================================
newChatBtn.addEventListener('click', () => {
  currentChatId = null;
  chat.innerHTML = '';
  renderWelcome();
  input.value = '';
  input.focus();
  loadHistory();
});

// ==========================================
// ATTACHMENT
// ==========================================
attachBtn.addEventListener('click', () => {
  attachPanel.classList.toggle('open');
  attachOverlay.classList.toggle('show');
});
attachOverlay.addEventListener('click', () => {
  attachPanel.classList.remove('open');
  attachOverlay.classList.remove('show');
});

document.querySelectorAll('.attach-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    attachPanel.classList.remove('open');
    attachOverlay.classList.remove('show');
    handleAttachment(type);
  });
});

function handleAttachment(type) {
  if (window.RexNative && typeof window.RexNative.openPicker === 'function') {
    window.RexNative.openPicker(type);
    return;
  }
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  if (type === 'camera') {
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment';
  } else if (type === 'gallery') {
    fileInput.accept = 'image/*,video/*';
  } else {
    fileInput.accept = '*/*';
  }
  fileInput.onchange = () => {
    const f = fileInput.files[0];
    if (f) handleUserMessage(`[Mengirim ${type}: ${f.name}]`);
  };
  fileInput.click();
}

// ==========================================
// ABOUT
// ==========================================
navAbout.addEventListener('click', (e) => {
  e.preventDefault();
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
  aboutModal.classList.add('open');
  aboutOverlay.classList.add('show');
});
closeAbout.addEventListener('click', closeAboutModal);
aboutOverlay.addEventListener('click', closeAboutModal);
function closeAboutModal() {
  aboutModal.classList.remove('open');
  aboutOverlay.classList.remove('show');
}

function loadDeveloperInfo() {
  const cfg = window.REX_CONFIG || {};
  const dev = cfg.developer || {};
  const elModel = document.getElementById('aboutModel');
  const elDev   = document.getElementById('aboutDev');
  const elTk    = document.getElementById('linkTiktok');
  const elWa    = document.getElementById('linkWa');
  const elTg    = document.getElementById('linkTg');
  if (elModel && dev.model) elModel.textContent = dev.model;
  if (elDev && dev.name)    elDev.textContent   = dev.name;
  if (elTk && dev.tiktok)   elTk.href   = dev.tiktok;
  if (elWa && dev.whatsapp) elWa.href   = dev.whatsapp;
  if (elTg && dev.telegram) elTg.href   = dev.telegram;
}

// ==========================================
// RENDER MESSAGE
// ==========================================
function renderMessage(text, who = 'bot', save = true) {
  const msg = document.createElement('div');
  msg.className = `msg ${who}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = who === 'bot'
    ? `<img src="assets/logo.svg" alt="bot"/>`
    : `<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" fill="#000"/></svg>`;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = `<p>${text}</p>`;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  if (save) {
    if (!currentChatId) {
      createNewChat();
      const w = getCurrentChat();
      if (w && !w.messages.length) {
        w.messages.push({ role: 'bot', text: 'Halo Tuan. Saya <b>GTI AI</b>, siap membantu apapun yang Tuan butuhkan.' });
        saveHistory(getHistory());
      }
    }
    const c = getCurrentChat();
    if (c) {
      c.messages.push({ role: who, text: text });

      // Judul chat hanya di-set dari pesan USER PERTAMA
      if (who === 'user' && c.title === 'Chat Baru') {
        let judul = text.replace(/<[^>]*>/g, '').trim()
          .replace(/[\n\r]+/g, ' ')
          .replace(/\s+/g, ' ')
          .slice(0, 35);

        if (judul.length >= 3) {
          c.title = judul + (judul.length >= 35 ? '...' : '');
        } else {
          c.title = 'Chat ' + new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
        }
      }

      saveHistory(getHistory());
      loadHistory();
    }
  }
}

// ==========================================
// HANDLE MESSAGE
// ==========================================
async function handleUserMessage(text) {
  renderMessage(text, 'user');
  input.value = '';

  const typing = document.createElement('div');
typing.className = 'msg bot typing';
typing.innerHTML = `
  <div class="avatar"><img src="assets/logo.svg" alt="bot"/></div>
  <div class="bubble">
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>
  </div>`;
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  const reply = await getAIResponse(text);
  setTimeout(() => {
    chat.removeChild(typing);
    renderMessage(reply, 'bot');
  }, 300);
}

async function handleSend() {
  const text = input.value.trim();
  if (!text) return;
  await handleUserMessage(text);
}

sendBtn.addEventListener('click', handleSend);
input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

// ==========================================
// AI RESPONSE
// ==========================================
async function getAIResponse(userText) {
  const cfg = window.REX_CONFIG || {};
  try {
    const res = await fetch(cfg.endpoint || "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        systemPrompt: cfg.systemPrompt,
        model: cfg.model,
        temperature: cfg.temperature,
        maxTokens: cfg.maxTokens
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return "Server AI error (" + res.status + "): " +
        (data.error || "Permintaan gagal. Periksa konfigurasi Vercel.");
    }
    if (data.reply) return data.reply;
    return "Respons dari server tidak dikenali.";
  } catch (err) {
    return "Gagal menghubungi server: " + err.message;
  }
}
