/* =========================================================
   HOME.JS - Home page (index.html) specific behavior only.

   IMPORTANT: This file must NOT redeclare `Auth` — auth.js
   already owns that object and is loaded first. Redeclaring
   `const Auth = {...}` here throws a SyntaxError that stops
   this whole file from running, which is why "Let's Learn"
   was silently doing nothing for logged-in users.
   ========================================================= */

// Languages that already have a dedicated lesson page.
// Add more here as you build out english.html-style pages for them.
const READY_LANGUAGES = {
  en: 'english.html',
  es: 'spanish.html'
};

// Maps each flag's language code to Catto's matching outfit video.
// These filenames match what's actually in imgs/Catto_Videos/ —
// note it's a mix of language names and country names, so don't
// assume a single naming pattern when adding more later.
const CATTO_LANGUAGE_VIDEOS = {
  en: 'imgs/Catto_Videos/Catto_English.webm',
  fr: 'imgs/Catto_Videos/Catto_French.webm',
  es: 'imgs/Catto_Videos/Catto_Spain.webm',
  it: 'imgs/Catto_Videos/Catto_Italy.webm',
  de: 'imgs/Catto_Videos/Catto_German.webm',
  ar: 'imgs/Catto_Videos/Catto_Egypt.webm'
};
const CATTO_FALLBACK_VIDEO = CATTO_LANGUAGE_VIDEOS.en;

// Matching speech-bubble greeting per language.
const CATTO_LANGUAGE_GREETINGS = {
  en: 'Hello, my friend! I am Catto!',
  fr: 'Bonjour, mon ami ! Je suis Catto !',
  es: '¡Hola, mi amigo! ¡Soy Catto!',
  it: 'Ciao, amico mio! Sono Catto!',
  de: 'Hallo, mein Freund! Ich bin Catto!',
  ar: 'مرحباً يا صديقي! أنا كاتو!'
};

// ============================================
// LOGIN REQUIRED MODAL (the one already in index.html
// with id="loginRequiredModal")
// ============================================
function showLoginRequiredModal() {
  const modal = document.getElementById('loginRequiredModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (typeof Sound !== 'undefined') Sound.pop();
}

function hideLoginRequiredModal() {
  const modal = document.getElementById('loginRequiredModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (typeof Sound !== 'undefined') Sound.pop();
}

// Expose globally — auth.js's showLoginPrompt() calls window.showLoginRequiredModal()
window.showLoginRequiredModal = showLoginRequiredModal;
window.hideLoginRequiredModal = hideLoginRequiredModal;

// ============================================
// COMING SOON MODAL (built dynamically — reuses your
// existing .modal-backdrop / .modal-card styling)
// ============================================
function showComingSoonModal(languageName) {
  let modal = document.getElementById('comingSoonModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'comingSoonModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card login-required-modal">
        <button class="modal-close interactive" id="comingSoonModalClose" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-catto-image">
          <img src="imgs/Cattoimages/Catto_Login.png" alt="Catto" onerror="this.style.display='none'">
        </div>
        <h2 class="modal-title">Coming Soon!</h2>
        <p class="modal-subtitle" id="comingSoonText">This language isn't ready yet.</p>
        <div class="modal-actions">
          <button class="cta-btn interactive" id="comingSoonOk">Got it!</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#comingSoonModalClose').addEventListener('click', hideComingSoonModal);
    modal.querySelector('#comingSoonOk').addEventListener('click', hideComingSoonModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideComingSoonModal();
    });
  }

  const text = document.getElementById('comingSoonText');
  if (text) {
    text.textContent = `${languageName} is on its way — Catto's still packing for that trip! Try English or Spanish for now.`;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (typeof Sound !== 'undefined') Sound.pop();
}

function hideComingSoonModal() {
  const modal = document.getElementById('comingSoonModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (typeof Sound !== 'undefined') Sound.pop();
}

// ============================================
// LANGUAGE BAR (the .lang-nav-btn flags in the header)
// ============================================
function getSelectedLanguage() {
  const activeBtn = document.querySelector('.lang-nav-btn.active');
  return activeBtn ? activeBtn.dataset.lang : 'en';
}

function getSelectedLanguageName() {
  const activeBtn = document.querySelector('.lang-nav-btn.active');
  return activeBtn ? (activeBtn.title || activeBtn.dataset.lang) : 'This language';
}

// Swaps the <source> of every Catto video on the page to match the
// selected language, reloads it so the browser actually picks up the
// new file, and updates the speech-bubble greeting to match.
// This is what was missing before — clicking a flag only toggled the
// "active" class, nothing ever told the <video> element to change.
function updateCattoForLanguage(lang, options = {}) {
  const allowSound = !!options.allowSound;
  const videoSrc = CATTO_LANGUAGE_VIDEOS[lang] || CATTO_FALLBACK_VIDEO;

  document.querySelectorAll('.catto-video, .meet-video video').forEach((video) => {
    const source = video.querySelector('source');
    if (!source) return;

    // If this language's clip 404s (not produced yet), quietly fall back
    // to the English clip instead of leaving a blank/frozen video.
    const onError = () => {
      if (source.src.indexOf(CATTO_FALLBACK_VIDEO) === -1) {
        source.src = CATTO_FALLBACK_VIDEO;
        video.load();
        attemptPlay(video, allowSound);
      }
    };

    source.removeEventListener('error', onError);
    source.src = videoSrc;
    source.addEventListener('error', onError, { once: true });

    // Changing source.src alone does nothing until the element reloads.
    video.load();
    attemptPlay(video, allowSound);
  });

  const speechText = document.getElementById('speechText');
  if (speechText) {
    speechText.textContent = CATTO_LANGUAGE_GREETINGS[lang] || CATTO_LANGUAGE_GREETINGS.en;
  }
}

// Clicking a flag is a real user gesture, so the browser will happily
// autoplay WITH sound at that point — that's when we unmute. On page
// load (restoring the saved language) there's no gesture yet, so the
// video has to stay muted or the browser blocks autoplay entirely.
function attemptPlay(video, allowSound) {
  video.muted = !allowSound;
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Autoplay-with-sound got blocked (e.g. gesture didn't count) —
      // fall back to muted so the video still shows instead of freezing.
      if (!video.muted) {
        video.muted = true;
        video.play().catch(() => {});
      }
    });
  }
}

function wireLanguageBar() {
  const langButtons = document.querySelectorAll('.lang-nav-btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof Sound !== 'undefined') Sound.pop();
      updateCattoForLanguage(btn.dataset.lang, { allowSound: true });
      try {
        localStorage.setItem('selectedLanguage', btn.dataset.lang);
      } catch (e) {}
    });
  });

  // Restore last-picked language on load, if any. No user gesture has
  // happened yet at this point, so this stays muted (allowSound: false)
  // — the browser would otherwise block the video from autoplaying at all.
  try {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) {
      const savedBtn = document.querySelector(`.lang-nav-btn[data-lang="${saved}"]`);
      if (savedBtn) {
        langButtons.forEach((b) => b.classList.remove('active'));
        savedBtn.classList.add('active');
        updateCattoForLanguage(saved);
      }
    }
  } catch (e) {}
}

// ============================================
// LOGIN STATE HELPER
// ============================================
function isLoggedIn() {
  // header.js sets window.userLogStatus from the server check.
  // auth.js's Auth.isLoggedIn() reflects the cached/local state.
  // Prefer the server-verified one when available, fall back to Auth.
  if (typeof window.isUserLoggedIn === 'function') {
    return window.isUserLoggedIn();
  }
  if (window.Auth && typeof window.Auth.isLoggedIn === 'function') {
    return window.Auth.isLoggedIn();
  }
  return false;
}

// ============================================
// ROUTE TO THE SELECTED LANGUAGE'S LESSON PAGE
// ============================================
function goToSelectedLanguage() {
  const lang = getSelectedLanguage();
  const destination = READY_LANGUAGES[lang];

  if (destination) {
    window.location.href = destination;
  } else {
    showComingSoonModal(getSelectedLanguageName());
  }
}

// ============================================
// HOME PAGE INIT
// ============================================
function initHomePage() {
  wireLoginModalControls();
  wireLanguageBar();
  wireStartButtons();
}

function wireLoginModalControls() {
  const modal = document.getElementById('loginRequiredModal');
  const closeBtn = document.getElementById('loginModalClose');

  if (closeBtn) {
    closeBtn.addEventListener('click', hideLoginRequiredModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideLoginRequiredModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideLoginRequiredModal();
      hideComingSoonModal();
    }
  });
}

function wireStartButtons() {
  // Hero "Let's Learn!" button
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // auth.js already attaches a listener that calls Auth.showLoginPrompt()
      // (which now delegates to showLoginRequiredModal above) when logged out
      // and calls e.preventDefault() in that case. We only need to handle
      // the logged-in case here.
      if (isLoggedIn()) {
        if (typeof Sound !== 'undefined') Sound.pop();
        goToSelectedLanguage();
      }
    });
  }

  // "Meet Catto" / "Start Your Adventure!" button lower on the page
  const meetCattoBtn = document.getElementById('meetCattoBtn');
  if (meetCattoBtn) {
    meetCattoBtn.addEventListener('click', () => {
      if (typeof Sound !== 'undefined') Sound.pop();
      if (isLoggedIn()) {
        goToSelectedLanguage();
      } else {
        showLoginRequiredModal();
      }
    });
  }
}

// ============================================
// Optional hook header.js looks for after a successful
// login check: `if (typeof window.renderHome === 'function') window.renderHome();`
// ============================================
function renderHome() {
  const user = (window.Auth && window.Auth.getCurrentUser && window.Auth.getCurrentUser())
    || (typeof window.currentUserData === 'function' ? window.currentUserData() : window.currentUserData);

  if (!user) return;

  const speechText = document.getElementById('speechText');
  if (speechText && user.first_name) {
    speechText.textContent = `Welcome back, ${user.first_name}!`;
  }
}
window.renderHome = renderHome;

document.addEventListener('DOMContentLoaded', initHomePage);