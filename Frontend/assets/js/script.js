/* =========================================================
   Catto's Alphabet Island — game data & logic
   ========================================================= */

const ALPHABETS = {
  en: {
    name: "English", native: "English", flag: "🇬🇧", dir: "ltr", speechLang: "en-US",
    letters: [
      ["A","Apple","🍎"],["B","Ball","⚽"],["C","Cat","🐱"],["D","Dog","🐶"],["E","Elephant","🐘"],
      ["F","Fish","🐟"],["G","Grapes","🍇"],["H","Hat","🎩"],["I","Ice Cream","🍦"],["J","Juice","🧃"],
      ["K","Kite","🪁"],["L","Lion","🦁"],["M","Moon","🌙"],["N","Nest","🪺"],["O","Orange","🍊"],
      ["P","Pig","🐷"],["Q","Queen","👑"],["R","Rainbow","🌈"],["S","Sun","☀️"],["T","Tree","🌳"],
      ["U","Umbrella","☂️"],["V","Violin","🎻"],["W","Watermelon","🍉"],["X","Xylophone","🎼"],
      ["Y","Yo-yo","🪀"],["Z","Zebra","🦓"]
    ]
  },
  es: {
    name: "Spanish", native: "Español", flag: "🇪🇸", dir: "ltr", speechLang: "es-ES",
    letters: [
      ["A","Avión","✈️"],["B","Barco","🚢"],["C","Casa","🏠"],["D","Dado","🎲"],["E","Elefante","🐘"],
      ["F","Flor","🌸"],["G","Gato","🐱"],["H","Helado","🍦"],["I","Iguana","🦎"],["J","Jirafa","🦒"],
      ["K","Kiwi","🥝"],["L","Luna","🌙"],["M","Mariposa","🦋"],["N","Nube","☁️"],["Ñ","Ñandú","🐦"],
      ["O","Oso","🐻"],["P","Pez","🐟"],["Q","Queso","🧀"],["R","Ratón","🐭"],["S","Sol","☀️"],
      ["T","Tigre","🐯"],["U","Uva","🍇"],["V","Vaca","🐄"],["W","Waffle","🧇"],["X","Xilófono","🎼"],
      ["Y","Yoyo","🪀"],["Z","Zorro","🦊"]
    ]
  },
  fr: {
    name: "French", native: "Français", flag: "🇫🇷", dir: "ltr", speechLang: "fr-FR",
    letters: [
      ["A","Avion","✈️"],["B","Ballon","🎈"],["C","Chat","🐱"],["D","Dauphin","🐬"],["E","Éléphant","🐘"],
      ["F","Fraise","🍓"],["G","Girafe","🦒"],["H","Hibou","🦉"],["I","Igloo","🧊"],["J","Jus","🧃"],
      ["K","Koala","🐨"],["L","Lion","🦁"],["M","Maison","🏠"],["N","Nuage","☁️"],["O","Orange","🍊"],
      ["P","Poisson","🐟"],["Q","Quatre","🔢"],["R","Renard","🦊"],["S","Soleil","☀️"],["T","Tortue","🐢"],
      ["U","Usine","🏭"],["V","Vache","🐄"],["W","Wagon","🚃"],["X","Xylophone","🎼"],
      ["Y","Yaourt","🥣"],["Z","Zèbre","🦓"]
    ]
  },
  de: {
    name: "German", native: "Deutsch", flag: "🇩🇪", dir: "ltr", speechLang: "de-DE",
    letters: [
      ["A","Apfel","🍎"],["B","Ball","⚽"],["C","Clown","🤡"],["D","Drache","🐉"],["E","Elefant","🐘"],
      ["F","Fisch","🐟"],["G","Giraffe","🦒"],["H","Hut","🎩"],["I","Igel","🦔"],["J","Jacke","🧥"],
      ["K","Katze","🐱"],["L","Löwe","🦁"],["M","Maus","🐭"],["N","Nest","🪺"],["O","Orange","🍊"],
      ["P","Pilz","🍄"],["Q","Qualle","🪼"],["R","Rakete","🚀"],["S","Sonne","☀️"],["T","Tiger","🐯"],
      ["U","Uhr","⏰"],["V","Vogel","🐦"],["W","Wasser","💧"],["X","Xylophon","🎼"],["Y","Yoga","🧘"],
      ["Z","Zebra","🦓"],["Ä","Ähre","🌾"],["Ö","Öl","🛢️"],["Ü","Überraschung","🎁"],["ß","Straße","🛣️"]
    ]
  },
  it: {
    name: "Italian", native: "Italiano", flag: "🇮🇹", dir: "ltr", speechLang: "it-IT",
    letters: [
      ["A","Albero","🌳"],["B","Balena","🐳"],["C","Cane","🐶"],["D","Delfino","🐬"],["E","Elefante","🐘"],
      ["F","Fiore","🌸"],["G","Gatto","🐱"],["H","Hotel","🏨"],["I","Isola","🏝️"],["L","Luna","🌙"],
      ["M","Mela","🍎"],["N","Nuvola","☁️"],["O","Orso","🐻"],["P","Pesce","🐟"],["Q","Quadro","🖼️"],
      ["R","Rana","🐸"],["S","Sole","☀️"],["T","Tartaruga","🐢"],["U","Uva","🍇"],["V","Volpe","🦊"],
      ["Z","Zebra","🦓"]
    ]
  },
  ar: {
    name: "Arabic", native: "العربية", flag: "🇸🇦", dir: "rtl", speechLang: "ar-SA",
    letters: [
      ["ا","أرنب","🐰"],["ب","بطة","🦆"],["ت","تفاح","🍎"],["ث","ثلج","❄️"],["ج","جمل","🐫"],
      ["ح","حوت","🐳"],["خ","خيار","🥒"],["د","دب","🐻"],["ذ","ذئب","🐺"],["ر","رمّان","🍇"],
      ["ز","زرافة","🦒"],["س","سمك","🐟"],["ش","شمس","☀️"],["ص","صقر","🦅"],["ض","ضفدع","🐸"],
      ["ط","طائر","🐦"],["ظ","ظرف","✉️"],["ع","عنب","🍇"],["غ","غراب","🐦‍⬛"],["ف","فيل","🐘"],
      ["ق","قرد","🐒"],["ك","كلب","🐶"],["ل","ليمون","🍋"],["م","موز","🍌"],["ن","نملة","🐜"],
      ["ه","هلال","🌙"],["و","وردة","🌹"],["ي","يد","✋"]
    ]
  }
};

/* -------------------- state -------------------- */
const state = {
  lang: null,
  mode: null,        // 'learn' | 'play'
  learnIndex: 0,
  quizOrder: [],
  quizIndex: 0,
  quizChoices: [],
  wrongTries: 0,
  soundOn: true
};

const PROGRESS_KEY = "catto-alphabet-progress";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function getLangProgress(key) {
  const p = loadProgress();
  return p[key] || { stars: 0, completed: [] };
}
function setLangProgress(key, data) {
  const p = loadProgress();
  p[key] = data;
  saveProgress(p);
}

/* -------------------- dom refs -------------------- */
const app = document.getElementById("app");
const cattoBubble = document.getElementById("cattoBubble");
const cattoImg = document.getElementById("cattoImg");
const muteBtn = document.getElementById("muteToggle");

/* -------------------- speech -------------------- */
function speak(text, langCode) {
  if (!state.soundOn) return;
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode;
    u.rate = 0.85;
    u.pitch = 1.15;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

/* -------------------- catto reactions -------------------- */
function cattoSay(msg, mood) {
  cattoBubble.textContent = msg;
  cattoImg.classList.remove("bounce", "shake", "spin");
  void cattoImg.offsetWidth; // restart animation
  if (mood === "happy") cattoImg.classList.add("bounce");
  if (mood === "sad") cattoImg.classList.add("shake");
  if (mood === "win") cattoImg.classList.add("spin");
}

/* -------------------- rendering: home -------------------- */
function renderHome() {
  state.lang = null; state.mode = null;
  cattoSay("Meow! Pick a language and let's learn letters together! 🐾", null);
  const cards = Object.entries(ALPHABETS).map(([key, l]) => {
    const prog = getLangProgress(key);
    const pct = Math.round((prog.completed.length / l.letters.length) * 100) || 0;
    return `
      <button class="lang-card" data-lang="${key}">
        <span class="lang-flag">${l.flag}</span>
        <span class="lang-name">${l.native}</span>
        <span class="lang-sub">${l.name}</span>
        <span class="lang-bar"><span class="lang-bar-fill" style="width:${pct}%"></span></span>
        <span class="lang-stars">⭐ ${prog.stars}</span>
      </button>`;
  }).join("");

  app.innerHTML = `
    <section class="hero">
      <h1>Learn the Alphabet with Catto! 🐱</h1>
      <p>Tap a language below to start exploring letters, sounds, and words.</p>
    </section>
    <section class="lang-grid">${cards}</section>
  `;

  app.querySelectorAll(".lang-card").forEach(btn => {
    btn.addEventListener("click", () => {
      Sound.pop();
      openHub(btn.dataset.lang);
    });
  });
}

/* -------------------- rendering: language hub -------------------- */
function openHub(key) {
  state.lang = key;
  const l = ALPHABETS[key];
  const prog = getLangProgress(key);
  cattoSay(`${l.flag} ${l.native}! Want to Learn or Play?`, "happy");

  app.innerHTML = `
    <section class="hub">
      <button class="back-btn" id="backHome">⬅ Back to Islands</button>
      <h2 class="hub-title">${l.flag} ${l.native} <span>(${l.name})</span></h2>
      <p class="hub-sub">⭐ ${prog.stars} stars earned · ${prog.completed.length}/${l.letters.length} letters mastered</p>
      <div class="hub-cards">
        <button class="mode-card" id="learnBtn">
          <span class="mode-icon">📖</span>
          <span class="mode-title">Learn the Alphabet</span>
          <span class="mode-desc">Tap each letter to see, hear, and say it.</span>
        </button>
        <button class="mode-card" id="playBtn">
          <span class="mode-icon">🎯</span>
          <span class="mode-title">Letter Hunt Game</span>
          <span class="mode-desc">Catto calls a letter — can you find it?</span>
        </button>
      </div>
    </section>
  `;
  document.getElementById("backHome").addEventListener("click", () => { Sound.match(); renderHome(); });
  document.getElementById("learnBtn").addEventListener("click", () => { Sound.navGo(); renderLearn(); });
  document.getElementById("playBtn").addEventListener("click", () => { Sound.navGo(); startQuiz(); });
}

/* -------------------- rendering: learn mode -------------------- */
function renderLearn() {
  state.mode = "learn";
  const l = ALPHABETS[state.lang];
  const [ch, word, emoji] = l.letters[state.learnIndex];
  cattoSay(`This is "${ch}" — like ${word}!`, "happy");

  app.innerHTML = `
    <section class="learn-screen" dir="${l.dir}">
      <button class="back-btn" id="backHub">⬅ Back</button>
      <div class="learn-progress">Letter ${state.learnIndex + 1} of ${l.letters.length}</div>
      <div class="letter-card" id="letterCard">
        <div class="big-letter">${ch}</div>
        <div class="big-emoji">${emoji}</div>
        <div class="big-word">${word}</div>
      </div>
      <button class="hear-btn" id="hearBtn">🔊 Hear it</button>
      <div class="learn-nav">
        <button class="nav-arrow" id="prevBtn" ${state.learnIndex === 0 ? "disabled" : ""}>◀ Prev</button>
        <button class="nav-arrow" id="nextBtn">Next ▶</button>
      </div>
      <div class="learn-grid" id="learnGrid"></div>
    </section>
  `;

  const grid = document.getElementById("learnGrid");
  grid.innerHTML = l.letters.map((entry, i) =>
    `<button class="mini-letter ${i === state.learnIndex ? "active" : ""}" data-i="${i}">${entry[0]}</button>`
  ).join("");

  grid.querySelectorAll(".mini-letter").forEach(btn => {
    btn.addEventListener("click", () => {
      Sound.hover();
      state.learnIndex = parseInt(btn.dataset.i, 10);
      renderLearn();
    });
  });

  document.getElementById("backHub").addEventListener("click", () => { Sound.match(); openHub(state.lang); });
  document.getElementById("hearBtn").addEventListener("click", () => { Sound.pop(); speak(ch, l.speechLang); });
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (state.learnIndex > 0) { Sound.hover(); state.learnIndex--; renderLearn(); }
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    Sound.hover();
    state.learnIndex = (state.learnIndex + 1) % l.letters.length;
    renderLearn();
  });

  speak(ch, l.speechLang);
}

/* -------------------- rendering: quiz (play) mode -------------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz() {
  state.mode = "play";
  const l = ALPHABETS[state.lang];
  state.quizOrder = shuffle(l.letters.map((_, i) => i));
  state.quizIndex = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const l = ALPHABETS[state.lang];
  const total = l.letters.length;

  if (state.quizIndex >= total) { renderCelebration(); return; }

  const correctIdx = state.quizOrder[state.quizIndex];
  const [ch, word, emoji] = l.letters[correctIdx];

  // build 4 choices (or fewer if alphabet is small)
  const numChoices = Math.min(4, total);
  const pool = shuffle(l.letters.map((_, i) => i).filter(i => i !== correctIdx)).slice(0, numChoices - 1);
  const choiceIdxs = shuffle([correctIdx, ...pool]);
  state.quizChoices = choiceIdxs;
  state.wrongTries = 0;

  cattoSay(`Find the letter for ${word}! ${emoji}`, "happy");

  const prog = getLangProgress(state.lang);

  app.innerHTML = `
    <section class="quiz-screen" dir="${l.dir}">
      <button class="back-btn" id="backHub">⬅ Back</button>
      <div class="quiz-top">
        <div class="quiz-progress-track">
          ${l.letters.map((_, i) => `<span class="dot ${prog.completed.includes(i) ? "done" : ""} ${i === correctIdx ? "current" : ""}"></span>`).join("")}
        </div>
        <div class="quiz-stars">⭐ ${prog.stars}</div>
      </div>
      <div class="quiz-question">
        <div class="quiz-emoji">${emoji}</div>
        <div class="quiz-word">${word}</div>
        <button class="hear-btn small" id="hearBtn">🔊 Hear the letter</button>
      </div>
      <div class="quiz-choices" id="quizChoices">
        ${choiceIdxs.map(i => `<button class="choice-btn" data-i="${i}">${l.letters[i][0]}</button>`).join("")}
      </div>
    </section>
  `;

  document.getElementById("backHub").addEventListener("click", () => { Sound.match(); openHub(state.lang); });
  document.getElementById("hearBtn").addEventListener("click", () => { speak(ch, l.speechLang); });

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.addEventListener("click", () => onChoice(btn, parseInt(btn.dataset.i, 10), correctIdx, ch, l));
  });

  speak(ch, l.speechLang);
}

function onChoice(btn, chosenIdx, correctIdx, correctChar, l) {
  if (chosenIdx === correctIdx) {
    Sound.win();
    btn.classList.add("correct");
    cattoSay(`Yes! "${correctChar}" — great job! 🎉`, "win");

    const prog = getLangProgress(state.lang);
    if (!prog.completed.includes(correctIdx)) {
      prog.completed.push(correctIdx);
      prog.stars += state.wrongTries === 0 ? 2 : 1;
      setLangProgress(state.lang, prog);
    }

    document.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);
    setTimeout(() => {
      state.quizIndex++;
      renderQuizQuestion();
    }, 900);
  } else {
    Sound.locked();
    state.wrongTries++;
    btn.classList.add("wrong");
    btn.disabled = true;
    cattoSay(`Not quite — try again! You can do it! 💪`, "sad");
  }
}

/* -------------------- celebration -------------------- */
function renderCelebration() {
  const l = ALPHABETS[state.lang];
  const prog = getLangProgress(state.lang);
  Sound.unlock();
  cattoSay(`WOW! You finished the whole ${l.native} alphabet! 🏆`, "win");

  app.innerHTML = `
    <section class="celebrate">
      <div class="confetti">🎉✨🎊✨🎉</div>
      <h2>You did it!</h2>
      <p>You learned all ${l.letters.length} letters of the ${l.native} alphabet.</p>
      <p class="stars-final">⭐ Total stars: ${prog.stars}</p>
      <div class="celebrate-actions">
        <button class="cta-btn" id="playAgain">Play Again 🔁</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Language 🗺️</button>
      </div>
    </section>
  `;
  document.getElementById("playAgain").addEventListener("click", () => { Sound.navGo(); startQuiz(); });
  document.getElementById("chooseAnother").addEventListener("click", () => { Sound.navGo(); renderHome(); });
}

/* -------------------- mute toggle -------------------- */
muteBtn.addEventListener("click", () => {
  state.soundOn = Sound.toggle();
  muteBtn.textContent = state.soundOn ? "🔊" : "🔇";
  if (!state.soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
});

/* -------------------- boot -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  Sound._init();
  renderHome();
});