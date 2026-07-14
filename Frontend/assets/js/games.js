/* =========================================================
   games.js — Language Island: 3 games x 6 languages + Alphabet Crush
   ========================================================= */

/* =========================================================
   0) IMAGE PATHS
   ========================================================= */
const IMG_BASE = "imgs/Games/";
const LISTENING_IMG_BASE = "imgs/Listening/";
const CATTO_IMG = "imgs/Cattoimages/LearnWithCatto/Catto.png";

// Language Island images
const ISLAND_IMAGES = {
  en: "imgs/Games/EN_Island.png",
  ar: "imgs/Games/AR_Island.png",
  de: "imgs/Games/GR_Island.png",
  es: "imgs/Games/SP_Island.png",
  fr: "imgs/Games/FR_Island.png",
  it: "imgs/Games/IT_Island.png"
};

// Game mode images
const GAME_IMAGES = {
  memory: "imgs/Games/ABC-Match.png",
  quiz: "imgs/Games/ABC-Quiz.png",
  listen: "imgs/Games/ABC-Listen.png",
  crush: "imgs/Games/ABC-Crush.png"
};

/* =========================================================
   1) WORD BANK - Using Listening folder images for memory game
   ========================================================= */
const WORD_BANK = {
  en: { name:"English", native:"English", dir:"ltr", speechLang:"en-US", color:"#4C8DAF",
    words:[
      {key:"candy",  text:"Candy",  img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"Door",   img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"Tree",   img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"Eagle",  img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"Boat",   img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"Lion",   img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
  ar: { name:"Arabic", native:"العربية", dir:"rtl", speechLang:"ar-SA", color:"#58C27D",
    words:[
      {key:"candy",  text:"حلوى", img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"باب",   img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"شجرة",  img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"نسر",   img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"قارب",  img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"أسد",   img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
  de: { name:"German", native:"Deutsch", dir:"ltr", speechLang:"de-DE", color:"#8C6FC9",
    words:[
      {key:"candy",  text:"Süßigkeit", img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"Tür",        img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"Baum",       img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"Adler",      img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"Boot",       img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"Löwe",       img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
  es: { name:"Spanish", native:"Español", dir:"ltr", speechLang:"es-ES", color:"#FF6F59",
    words:[
      {key:"candy",  text:"Caramelo", img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"Puerta",    img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"Árbol",     img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"Águila",    img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"Barco",     img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"León",      img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
  fr: { name:"French", native:"Français", dir:"ltr", speechLang:"fr-FR", color:"#FFB84D",
    words:[
      {key:"candy",  text:"Bonbon",  img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"Porte",    img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"Arbre",    img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"Aigle",    img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"Bateau",   img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"Lion",     img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
  it: { name:"Italian", native:"Italiano", dir:"ltr", speechLang:"it-IT", color:"#E5563F",
    words:[
      {key:"candy",  text:"Caramella", img:LISTENING_IMG_BASE+"Candy.png"},
      {key:"door",   text:"Porta",      img:LISTENING_IMG_BASE+"Door.png"},
      {key:"tree",   text:"Albero",     img:LISTENING_IMG_BASE+"Tree.png"},
      {key:"eagle",  text:"Aquila",     img:LISTENING_IMG_BASE+"Eagle.png"},
      {key:"boat",   text:"Barca",      img:LISTENING_IMG_BASE+"Boat.png"},
      {key:"lion",   text:"Leone",      img:LISTENING_IMG_BASE+"AR-Lion.png"},
    ]},
};

/* =========================================================
   1b) ALPHABET BANK — for Alphabet Crush
   ========================================================= */
const ALPHABET_BANK = {
  en: { letters:["A","B","C","D","E","F"] },
  ar: { letters:["ا","ب","ت","ث","ج","ح"] },
  de: { letters:["A","B","C","D","E","F"] },
  es: { letters:["A","B","C","D","E","F"] },
  fr: { letters:["A","B","C","D","E","F"] },
  it: { letters:["A","B","C","D","E","F"] },
};
const TILE_COLORS = ["#FF6F59","#FFD23F","#58C27D","#6EC6FF","#B79CED","#FF8A5B"];

const DEFAULT_LANG = "en";

const GAME_TYPES = [
  {key:"memory", title:"Memory Match", desc:"", color:"var(--coral)"},
  {key:"quiz",   title:"Picture Quiz", desc:"",          color:"var(--grass)"},
  {key:"listen", title:"Listen & Choose", desc:"",      color:"#4C8DAF"},
  {key:"crush",  title:"Alphabet Crush", desc:"",           color:"#8C6FC9"},
];

/* =========================================================
   2) SVG ICONS
   ========================================================= */
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-4-6.3 4 1.7-7L1.9 9.2l7.1-.6z"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h10v2h3v2c0 2.2-1.8 4-4 4h-.2A5 5 0 0 1 13 15.9V18h3v2H8v-2h3v-2.1A5 5 0 0 1 8.2 12H8c-2.2 0-4-1.8-4-4V6h3V4zm-3 4c0 1.1.9 2 2 2V6H4v2zm16 0V6h-2v4c1.1 0 2-.9 2-2z"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a3.5 3.5 0 0 0-2-3.2v6.4a3.5 3.5 0 0 0 2-3.2z"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6z"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4V4zm0 10h6v6H4v-6zM14 4h6v6h-6V4zm0 10h6v6h-6v-6z"/></svg>`,
};
function icon(name, cls){ return `<span class="icon ${cls||''}">${ICONS[name]||''}</span>`; }

function pic(src, label, extraClass){
  const safeLabel = (label||'').replace(/"/g,'&quot;');
  return `<div class="pic ${extraClass||''}"><img src="${src}" alt="${safeLabel}"
    onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${safeLabel}'}))"></div>`;
}

/* =========================================================
   3) PROGRESS STORAGE — Backend API (COINS ONLY)
   ========================================================= */

// Cache for game progress data
let progressCache = null;
let userTotalsCache = { star_shells: 0, total_stars: 0 };

// Save game progress to the backend (COINS ONLY)
function saveGameProgress(language, gameType, coinsEarned, score, won) {
    console.log(`Saving: language=${language}, gameType=${gameType}, coins=${coinsEarned}, score=${score}, won=${won}`);
    
    return fetch('../Backend/save_game_progress.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            language: language,
            game_type: gameType,
            coins_earned: coinsEarned,
            score: score,
            won: won
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log('Save response:', data);
        if (data.success) {
            userTotalsCache.star_shells = data.star_shells;
            userTotalsCache.total_stars = data.total_stars;
            updateHeaderDisplays(data.star_shells, data.total_stars);
            return data;
        } else {
            console.warn('Failed to save progress:', data.message);
            return null;
        }
    })
    .catch(err => {
        console.warn('Error saving progress:', err);
        return null;
    });
}

// Fetch game progress from the backend
function fetchGameProgress(language) {
    const url = language 
        ? `../Backend/get_game_progress.php?language=${encodeURIComponent(language)}`
        : '../Backend/get_game_progress.php';
    
    return fetch(url, {
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            userTotalsCache.star_shells = data.star_shells;
            userTotalsCache.total_stars = data.total_stars;
            progressCache = data.progress;
            updateHeaderDisplays(data.star_shells, data.total_stars);
            return data;
        }
        return null;
    })
    .catch(err => {
        console.warn('Error fetching progress:', err);
        return null;
    });
}

// Update header coin and star displays
function updateHeaderDisplays(starShells, totalStars) {
    const coinsDisplay = document.getElementById('headerCoins');
    const starsDisplay = document.getElementById('headerStars');
    const coinsPill = document.querySelector('.coins-display');
    const starsPill = document.querySelector('.stars-display');
    
    if (coinsDisplay) coinsDisplay.textContent = starShells || 0;
    if (starsDisplay) starsDisplay.textContent = totalStars || 0;
    if (coinsPill) coinsPill.style.display = 'flex';
    if (starsPill) starsPill.style.display = 'flex';
}

/* =========================================================
   4) MODAL CONTROLS
   ========================================================= */
function openLoginModal() {
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof Sound !== 'undefined') Sound.pop();
  }
}

function closeLoginModal() {
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(function(m) {
    m.classList.remove('open');
  });
  document.body.style.overflow = '';
}

/* =========================================================
   5) STATE
   ========================================================= */
const state = { lang:null, game:null };
const app = document.getElementById("app");
const cattoBubble = document.getElementById("cattoBubble");
const cattoImgWrap = document.getElementById("cattoImgWrap");

function cattoSay(msg, mood){
  cattoBubble.textContent = msg;
  cattoImgWrap.classList.remove("bounce","shake","spin");
  void cattoImgWrap.offsetWidth;
  if(mood==="happy") cattoImgWrap.classList.add("bounce");
  if(mood==="sad") cattoImgWrap.classList.add("shake");
  if(mood==="win") cattoImgWrap.classList.add("spin");
}

function speak(text, langCode){
  if(!("speechSynthesis" in window)) return;
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode; u.rate = 0.85; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  }catch(e){}
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}





// =========================================================
// UPDATE CATTO SKIN ON GAMES PAGE
// =========================================================
function updateCattoSkin() {
  const cattoImg = document.getElementById('cattoImg');
  if (!cattoImg) return;
  
  // Get current skin from header or localStorage
  let skin = 'default-catto';
  if (window.currentEquippedSkin) {
    skin = window.currentEquippedSkin;
  } else {
    try {
      const user = JSON.parse(localStorage.getItem('languageIslandUser'));
      if (user && user.equipped_skin) {
        skin = user.equipped_skin;
      }
    } catch(e) {}
  }
  
  // Use profile folder
  const skinPath = `imgs/profile/${skin}.png`;
  cattoImg.src = skinPath;
  cattoImg.onerror = function() {
    this.src = 'imgs/profile/default-catto.png';
    this.onerror = null;
  };
}

// Call when page loads
setTimeout(updateCattoSkin, 300);

// Listen for skin changes
document.addEventListener('skinChanged', updateCattoSkin);

// Also update when renderHome is called
const originalRenderHome = window.renderHome;
window.renderHome = function() {
  if (typeof originalRenderHome === 'function') {
    originalRenderHome();
  }
  setTimeout(updateCattoSkin, 200);
};



















/* =========================================================
   TRACK ACTIVITY FOR STREAK
   ========================================================= */
function trackGameActivity() {
    if (window.updateDailyStreak) {
        let gameTime = parseInt(sessionStorage.getItem('gameActivityTime')) || 0;
        gameTime += 60; // Add 1 minute per game play
        sessionStorage.setItem('gameActivityTime', gameTime.toString());
        
        if (gameTime >= 600) { // 10 minutes
            window.updateDailyStreak();
            sessionStorage.setItem('gameActivityTime', '0');
        }
    }
}

/* =========================================================
   6) HOME — Language Islands with Images (3x2 Grid - NO STARS)
   ========================================================= */
window.renderHome = function(){
  state.lang=null; state.game=null;
  
  if (window.isUserLoggedIn && window.isUserLoggedIn()) {
    cattoSay("Hi! Pick a language and let's play!", "happy");
    fetchGameProgress().then(() => {
      renderLanguageCards();
    });
  } else {
    cattoSay("Hi! Sign in to play games!", "happy");
    renderLanguageCards();
  }
}

function renderLanguageCards() {
  const isLoggedIn = window.isUserLoggedIn && window.isUserLoggedIn();
  
  const cards = Object.entries(WORD_BANK).map(([key,l])=>{
    const islandImg = ISLAND_IMAGES[key] || "imgs/Games/default.png";
    return `
      <button class="lang-card" data-lang="${key}">
        <img src="${islandImg}" alt="${l.name}" onerror="this.src='imgs/Games/default.png'">
      </button>`;
  }).join("");

  app.innerHTML = `
    <section class="games-hero">
      <h1>Language Games</h1>
      <p>Pick a language, then pick a game, and start learning and playing!</p>
      ${!isLoggedIn ? '<p style="color:var(--coral);font-weight:800;font-size:15px;margin-top:8px;">Sign in to unlock all games and track your progress!</p>' : ''}
    </section>
    <section class="lang-grid">${cards}</section>
  `;

  app.querySelectorAll(".lang-card").forEach(btn=>{
    btn.addEventListener("click", function() {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        openHub(this.dataset.lang);
      } else {
        openLoginModal();
        sessionStorage.setItem('pendingLanguage', this.dataset.lang);
      }
    });
  });
}

/* =========================================================
   7) HUB — Game Selection with Images (NO STAR DISPLAYS)
   ========================================================= */
function openHub(key){
  state.lang = key;
  const l = WORD_BANK[key];
  cattoSay(`${l.name}! Pick a game to get started`, "happy");

  const cards = GAME_TYPES.map(g=>{
    const gameImg = GAME_IMAGES[g.key] || "imgs/Games/default.png";
    return `
      <button class="game-card" data-game="${g.key}">
        <img src="${gameImg}" alt="${g.title}" onerror="this.src='imgs/Games/default.png'">
        <span class="game-title">${g.title}</span>
        <span class="game-desc">${g.desc}</span>
      </button>`;
  }).join("");

  app.innerHTML = `
    <section class="hub">
      <button class="back-btn" id="backHome">${icon('back','arrow-ic')} Back to languages</button>
      <h2 class="hub-title">${l.name}</h2>
      <div class="game-grid">${cards}</div>
    </section>
  `;
  document.getElementById("backHome").addEventListener("click", window.renderHome);
  app.querySelectorAll(".game-card").forEach(btn=>{
    btn.addEventListener("click", function() {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        startGame(this.dataset.game);
      } else {
        openLoginModal();
        sessionStorage.setItem('pendingGame', this.dataset.game);
        sessionStorage.setItem('pendingLanguage', state.lang);
      }
    });
  });
}

function startGame(gameKey){
  state.game = gameKey;
  trackGameActivity(); // Track activity for streak
  if(gameKey==="memory") startMemoryGame();
  else if(gameKey==="quiz") startQuizGame("quiz");
  else if(gameKey==="listen") startQuizGame("listen");
  else if(gameKey==="crush") startCrushGame();
}

/* =========================================================
   8) MEMORY GAME - Auto-shuffles images every time (COINS ONLY)
   ========================================================= */
const memory = { cards:[], flipped:[], matched:0, moves:0, locked:false };

function startMemoryGame(){
  const l = WORD_BANK[state.lang];
  
  // Create pairs for ALL 6 words (12 cards total)
  const pairs = l.words.flatMap((w,i)=>[
    {id:i*2,   pairId:i, kind:"pic",  word:w},
    {id:i*2+1, pairId:i, kind:"word", word:w},
  ]);
  
  // SHUFFLE the cards every time - this changes positions!
  memory.cards = shuffle(pairs).map(c=>({...c, flipped:false, matched:false}));
  memory.flipped=[]; 
  memory.matched=0; 
  memory.moves=0; 
  memory.locked=false;
  
  cattoSay("Flip two cards and find the picture and its word!","happy");
  renderMemoryGame();
}

function renderMemoryGame(){
  const l = WORD_BANK[state.lang];
  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <h2 class="hub-title">Memory Match — ${l.name}</h2>
      <p class="memory-progress" id="memStats">Moves: ${memory.moves} · Matches: ${memory.matched} / ${l.words.length}</p>
      <div class="memory-grid" id="memGrid"></div>
    </section>
  `;
  document.getElementById("backHub").addEventListener("click", ()=>{ openHub(state.lang); });

  const grid = document.getElementById("memGrid");
  grid.style.gridTemplateColumns = "repeat(4, 1fr)";
  
  grid.innerHTML = memory.cards.map((c,i)=>{
    let inner = "";
    if(c.flipped||c.matched){
      inner = c.kind==="pic" ? pic(c.word.img, c.word.text) : `<span>${c.word.text}</span>`;
    } else {
      inner = `<span class="hidden-face">?</span>`;
    }
    return `<div class="memory-card ${c.matched?'matched':''}" data-i="${i}">${inner}</div>`;
  }).join("");

  grid.querySelectorAll(".memory-card").forEach(el=>{
    el.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    el.addEventListener("click", ()=> flipMemoryCard(parseInt(el.dataset.i,10)));
  });
}

function flipMemoryCard(i){
  if(memory.locked) return;
  const card = memory.cards[i];
  if(card.flipped||card.matched) return;

  card.flipped = true;
  memory.flipped.push(i);
  renderMemoryGame();

  if(memory.flipped.length===2){
    memory.moves++;
    memory.locked = true;
    const [i1,i2] = memory.flipped;
    const c1 = memory.cards[i1], c2 = memory.cards[i2];

    if(c1.pairId===c2.pairId && c1.kind!==c2.kind){
      c1.matched = true; c2.matched = true;
      memory.matched++;
      memory.flipped = [];
      memory.locked = false;
      cattoSay("Great match!","happy");
      speak(c1.word.text, WORD_BANK[state.lang].speechLang);
      renderMemoryGame();
      if(memory.matched===WORD_BANK[state.lang].words.length){
        // COINS ONLY: 10 coins
        const coinsEarned = 10;
        saveGameProgress(state.lang, 'memory', coinsEarned, memory.matched, true)
          .then(() => {
            setTimeout(() => renderCelebration('memory', coinsEarned), 500);
          });
      }
    } else {
      setTimeout(()=>{
        c1.flipped=false; c2.flipped=false;
        memory.flipped=[]; memory.locked=false;
        cattoSay("Try again, you can do it!","sad");
        renderMemoryGame();
      }, 800);
    }
  }
}

/* =========================================================
   9) QUIZ GAMES - COINS ONLY
   ========================================================= */
const quiz = { mode:null, order:[], index:0, wrongTries:0 };

function startQuizGame(mode){
  quiz.mode = mode;
  const l = WORD_BANK[state.lang];
  quiz.order = shuffle(l.words.map((_,i)=>i));
  quiz.index = 0;
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const l = WORD_BANK[state.lang];
  const total = l.words.length;
  if(quiz.index >= total){ 
    // COINS ONLY: 8 coins
    const coinsEarned = 8;
    saveGameProgress(state.lang, quiz.mode, coinsEarned, total - quiz.wrongTries, true)
      .then(() => {
        renderCelebration(quiz.mode, coinsEarned);
      });
    return; 
  }

  const correctIdx = quiz.order[quiz.index];
  const correctWord = l.words[correctIdx];
  const numChoices = Math.min(3, total);
  const pool = shuffle(l.words.map((_,i)=>i).filter(i=>i!==correctIdx)).slice(0, numChoices-1);
  const choiceIdxs = shuffle([correctIdx, ...pool]);
  quiz.wrongTries = 0;

  const isListen = quiz.mode==="listen";
  cattoSay(isListen ? "Listen closely and pick the right picture!" : `Find the picture for: ${correctWord.text}`, "happy");

  const questionBlock = isListen
    ? `<button class="hear-btn" id="hearBtn">${icon('speaker')} Hear it again</button>`
    : `${pic(correctWord.img, correctWord.text, 'quiz-pic-big')}
       <div class="quiz-word-big">${correctWord.text}</div>
       <button class="hear-btn" id="hearBtn">${icon('speaker')} Hear the word</button>`;

  const choicesBlock = isListen
    ? `<div class="pic-choices" id="choices">
        ${choiceIdxs.map(i=>`<button class="choice-pic-btn" data-i="${i}">${pic(l.words[i].img, l.words[i].text)}</button>`).join("")}
       </div>`
    : `<div class="word-choices" id="choices">
        ${choiceIdxs.map(i=>`<button class="choice-btn" data-i="${i}">${l.words[i].text}</button>`).join("")}
       </div>`;

  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <div class="quiz-top">
        <div class="quiz-progress-track">
          ${l.words.map((_,i)=>`<span class="dot ${i<quiz.index?'done':''} ${i===quiz.index?'current':''}"></span>`).join("")}
        </div>
        <div class="quiz-stars">${icon('star','star-ic')} ${userTotalsCache.total_stars}</div>
      </div>
      <div class="quiz-question">${questionBlock}</div>
      ${choicesBlock}
    </section>
  `;

  document.getElementById("backHub").addEventListener("click", ()=> openHub(state.lang));
  const hearBtn = document.getElementById("hearBtn");
  if(hearBtn) hearBtn.addEventListener("click", ()=> speak(correctWord.text, l.speechLang));

  document.querySelectorAll("#choices button").forEach(btn=>{
    btn.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    btn.addEventListener("click", ()=> onQuizChoice(btn, parseInt(btn.dataset.i,10), correctIdx, correctWord, l));
  });

  if(isListen) speak(correctWord.text, l.speechLang);
}

function onQuizChoice(btn, chosenIdx, correctIdx, correctWord, l){
  if(chosenIdx===correctIdx){
    btn.classList.add("correct");
    cattoSay(`${correctWord.text} — that's right!`,"win");
    document.querySelectorAll("#choices button").forEach(b=> b.disabled=true);
    setTimeout(()=>{ quiz.index++; renderQuizQuestion(); }, 900);
  } else {
    quiz.wrongTries++;
    btn.classList.add("wrong");
    btn.disabled = true;
    cattoSay("Not quite, try again!","sad");
  }
}

/* =========================================================
   10) ALPHABET CRUSH — Match-3 Game (COINS ONLY)
   ========================================================= */
const CRUSH_ROWS = 6;
const CRUSH_COLS = 6;
const CRUSH_TARGET_SCORE = 150;
const CRUSH_MAX_MOVES = 15;

const crush = { board:[], selected:null, score:0, movesLeft:CRUSH_MAX_MOVES, busy:false };

function crushIdx(r,c){ return r*CRUSH_COLS + c; }
function crushRandomTile(){ return Math.floor(Math.random() * ALPHABET_BANK[state.lang].letters.length); }

function generateCrushBoard(){
  const board = new Array(CRUSH_ROWS*CRUSH_COLS).fill(0);
  for(let r=0;r<CRUSH_ROWS;r++){
    for(let c=0;c<CRUSH_COLS;c++){
      let val, tries=0;
      do{
        val = crushRandomTile();
        tries++;
      } while(
        tries<25 && (
          (c>=2 && board[crushIdx(r,c-1)]===val && board[crushIdx(r,c-2)]===val) ||
          (r>=2 && board[crushIdx(r-1,c)]===val && board[crushIdx(r-2,c)]===val)
        )
      );
      board[crushIdx(r,c)] = val;
    }
  }
  return board;
}

function startCrushGame(){
  crush.board = generateCrushBoard();
  crush.selected = null;
  crush.score = 0;
  crush.movesLeft = CRUSH_MAX_MOVES;
  crush.busy = false;
  cattoSay("Swap letters to match 3 or more in a row!","happy");
  renderCrushGame();
}

function renderCrushGame(){
  const l = WORD_BANK[state.lang];
  app.innerHTML = `
    <section class="hub" dir="${l.dir}">
      <button class="back-btn" id="backHub">${icon('back','arrow-ic')} Back</button>
      <h2 class="hub-title">Alphabet Crush — ${l.name}</h2>
      <div class="crush-stats">
        <span class="crush-stat">${icon('star','star-ic')} Score: <b id="crushScore">${crush.score}</b> / ${CRUSH_TARGET_SCORE}</span>
        <span class="crush-stat">Moves left: <b id="crushMoves">${crush.movesLeft}</b></span>
      </div>
      <div class="crush-grid" id="crushGrid" style="grid-template-columns:repeat(${CRUSH_COLS},1fr)"></div>
    </section>
  `;
  document.getElementById("backHub").addEventListener("click", ()=> openHub(state.lang));
  renderCrushGrid();
}

function renderCrushGrid(){
  const alpha = ALPHABET_BANK[state.lang];
  const grid = document.getElementById("crushGrid");
  if(!grid) return;
  grid.innerHTML = crush.board.map((val,i)=>{
    if(val===null) return `<div class="crush-tile empty" data-i="${i}"></div>`;
    const selected = crush.selected===i ? "selected" : "";
    return `<button class="crush-tile ${selected}" data-i="${i}" style="background:${TILE_COLORS[val]}">${alpha.letters[val]}</button>`;
  }).join("");
  grid.querySelectorAll(".crush-tile:not(.empty)").forEach(el=>{
    el.addEventListener("mouseenter", ()=>{ if (typeof Sound !== 'undefined' && Sound.hover) Sound.hover(); });
    el.addEventListener("click", ()=> onCrushTileClick(parseInt(el.dataset.i,10)));
  });
}

function onCrushTileClick(i){
  if(crush.busy) return;
  if (typeof Sound !== 'undefined' && Sound.chime) Sound.chime();
  
  if(crush.selected===null){
    crush.selected = i;
    renderCrushGrid();
    return;
  }
  if(crush.selected===i){
    crush.selected = null;
    renderCrushGrid();
    return;
  }

  const a = crush.selected, b = i;
  const ra=Math.floor(a/CRUSH_COLS), ca=a%CRUSH_COLS;
  const rb=Math.floor(b/CRUSH_COLS), cb=b%CRUSH_COLS;
  const isAdjacent = (Math.abs(ra-rb) + Math.abs(ca-cb)) === 1;

  if(!isAdjacent){
    crush.selected = i;
    renderCrushGrid();
    return;
  }

  crush.selected = null;
  attemptCrushSwap(a,b);
}

function attemptCrushSwap(a,b){
  crush.busy = true;
  [crush.board[a], crush.board[b]] = [crush.board[b], crush.board[a]];
  const matches = findCrushMatches();

  if(matches.size===0){
    if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
    renderCrushGrid();
    setTimeout(()=>{
      [crush.board[a], crush.board[b]] = [crush.board[b], crush.board[a]];
      crush.busy = false;
      cattoSay("No match there — try another swap!","sad");
      renderCrushGrid();
    }, 350);
    return;
  }

  crush.movesLeft--;
  renderCrushGrid();
  setTimeout(resolveCrushMatches, 250);
}

function findCrushMatches(){
  const toClear = new Set();
  const NONE = Symbol("none");

  for(let r=0;r<CRUSH_ROWS;r++){
    let runStart=0;
    for(let c=1;c<=CRUSH_COLS;c++){
      const cur = c<CRUSH_COLS ? crush.board[crushIdx(r,c)] : NONE;
      const prev = crush.board[crushIdx(r,c-1)];
      if(cur!==prev){
        if(c-runStart>=3){ for(let k=runStart;k<c;k++) toClear.add(crushIdx(r,k)); }
        runStart=c;
      }
    }
  }
  for(let c=0;c<CRUSH_COLS;c++){
    let runStart=0;
    for(let r=1;r<=CRUSH_ROWS;r++){
      const cur = r<CRUSH_ROWS ? crush.board[crushIdx(r,c)] : NONE;
      const prev = crush.board[crushIdx(r-1,c)];
      if(cur!==prev){
        if(r-runStart>=3){ for(let k=runStart;k<r;k++) toClear.add(crushIdx(k,c)); }
        runStart=r;
      }
    }
  }
  return toClear;
}

function resolveCrushMatches(){
  const matches = findCrushMatches();
  if(matches.size===0){
    crush.busy = false;
    checkCrushEnd();
    return;
  }

  crush.score += matches.size * 10;
  matches.forEach(i=> crush.board[i] = null);
  cattoSay("Nice match!","happy");
  if (typeof Sound !== 'undefined' && Sound.match) Sound.match();
  
  updateCrushStats();
  renderCrushGrid();

  setTimeout(()=>{
    cascadeCrushBoard();
    renderCrushGrid();
    setTimeout(resolveCrushMatches, 300);
  }, 300);
}

function cascadeCrushBoard(){
  for(let c=0;c<CRUSH_COLS;c++){
    let pointer = CRUSH_ROWS-1;
    for(let r=CRUSH_ROWS-1;r>=0;r--){
      const val = crush.board[crushIdx(r,c)];
      if(val!==null){
        crush.board[crushIdx(pointer,c)] = val;
        if(pointer!==r) crush.board[crushIdx(r,c)] = null;
        pointer--;
      }
    }
    for(let r=pointer;r>=0;r--){
      crush.board[crushIdx(r,c)] = crushRandomTile();
    }
  }
}

function updateCrushStats(){
  const scoreEl = document.getElementById("crushScore");
  const movesEl = document.getElementById("crushMoves");
  if(scoreEl) scoreEl.textContent = crush.score;
  if(movesEl) movesEl.textContent = crush.movesLeft;
}

function checkCrushEnd(){
  updateCrushStats();
  if(crush.score >= CRUSH_TARGET_SCORE){
    // COINS ONLY: 15 coins
    const coinsEarned = 15;
    saveGameProgress(state.lang, 'crush', coinsEarned, crush.score, true)
      .then(() => {
        setTimeout(() => renderCrushWin(coinsEarned), 400);
      });
  } else if(crush.movesLeft<=0){
    setTimeout(renderCrushLose, 400);
  }
}

function renderCrushWin(coinsEarned){
  const l = WORD_BANK[state.lang];
  
  // Get user name from header data
  let userName = 'Explorer';
  if (window.currentUserData && window.currentUserData.first_name) {
    userName = window.currentUserData.first_name;
  } else if (window.getCurrentUser && window.getCurrentUser()) {
    const user = window.getCurrentUser();
    if (user.first_name) userName = user.first_name;
  }
  
  cattoSay("Amazing! You crushed it!", "win");
  app.innerHTML = `
    <section class="crush-result">
      <div class="celebration-icon">
        <img src="imgs/Games/10Coins_Catto.png" alt="Catto Coins" onerror="this.style.display='none'">
      </div>
      <h2>Amazing, ${userName}!</h2>
      <p>You reached ${crush.score} points in ${l.name} Alphabet Crush</p>
      <div class="reward-summary">
        <span class="coin-reward"><span class="coin-emoji">🪙</span> +${coinsEarned}</span>
      </div>
      <div class="result-actions">
        <button class="cta-btn" id="playAgain">Play Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("playAgain").addEventListener("click", startCrushGame);
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

function renderCrushLose(){
  const l = WORD_BANK[state.lang];
  
  // Get user name
  let userName = 'Explorer';
  if (window.currentUserData && window.currentUserData.first_name) {
    userName = window.currentUserData.first_name;
  } else if (window.getCurrentUser && window.getCurrentUser()) {
    const user = window.getCurrentUser();
    if (user.first_name) userName = user.first_name;
  }
  
  cattoSay("So close! Want to try again?", "sad");
  app.innerHTML = `
    <section class="crush-result">
      <div class="celebration-icon">
        <img src="imgs/Games/10Coins_Catto.png" alt="Catto Coins" onerror="this.style.display='none'">
      </div>
      <h2>So close, ${userName}!</h2>
      <p>You scored ${crush.score} out of ${CRUSH_TARGET_SCORE} in ${l.name} Alphabet Crush</p>
      <div class="result-actions">
        <button class="cta-btn" id="tryAgain">Try Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("tryAgain").addEventListener("click", startCrushGame);
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

/* =========================================================
   11) CELEBRATION (for Memory & Quiz games) - COINS ONLY
   ========================================================= */
function renderCelebration(gameKey, coinsEarned){
  const l = WORD_BANK[state.lang];
  const gameTitle = GAME_TYPES.find(g=>g.key===gameKey)?.title || gameKey;
  
  // Get user name from header data
  let userName = 'Explorer';
  if (window.currentUserData && window.currentUserData.first_name) {
    userName = window.currentUserData.first_name;
  } else if (window.getCurrentUser && window.getCurrentUser()) {
    const user = window.getCurrentUser();
    if (user.first_name) userName = user.first_name;
  }
  
  cattoSay("Well done, you finished the game!", "win");

  app.innerHTML = `
    <section class="celebrate">
      <div class="celebration-icon">
        <img src="imgs/Games/10Coins_Catto.png" alt="Catto Coins" onerror="this.style.display='none'">
      </div>
      <h2>Well done, ${userName}!</h2>
      <p>You finished the "${gameTitle}" game in ${l.name}</p>
      <div class="reward-summary">
        <span class="coin-reward"><span class="coin-emoji">🪙</span> +${coinsEarned}</span>
      </div>
      <div class="celebrate-actions">
        <button class="cta-btn" id="playAgain">Play Again</button>
        <button class="cta-btn secondary" id="chooseAnother">Choose Another Game or Language</button>
      </div>
    </section>
  `;
  document.getElementById("playAgain").addEventListener("click", ()=> startGame(gameKey));
  document.getElementById("chooseAnother").addEventListener("click", ()=> openHub(state.lang));
}

/* =========================================================
   12) MODAL EVENT HANDLERS
   ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  var closeBtn = document.getElementById('loginModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLoginModal);
  }
  
  var modal = document.getElementById('loginRequiredModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLoginModal();
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  var signinBtn = document.getElementById('loginModalSignin');
  if (signinBtn) {
    signinBtn.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingLanguage');
      if (pendingLang) {
        sessionStorage.setItem('pendingLanguageAfterAuth', pendingLang);
      }
    });
  }
  
  var signupBtn = document.getElementById('loginModalSignup');
  if (signupBtn) {
    signupBtn.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingLanguage');
      if (pendingLang) {
        sessionStorage.setItem('pendingLanguageAfterAuth', pendingLang);
      }
    });
  }
  
  var justSignedIn = sessionStorage.getItem('justSignedIn');
  if (justSignedIn === 'true') {
    sessionStorage.removeItem('justSignedIn');
    var pendingLang = sessionStorage.getItem('pendingLanguageAfterAuth') || sessionStorage.getItem('pendingLanguage');
    if (pendingLang) {
      sessionStorage.removeItem('pendingLanguage');
      sessionStorage.removeItem('pendingLanguageAfterAuth');
      setTimeout(function() {
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          openHub(pendingLang);
        }
      }, 500);
    } else {
      window.renderHome();
    }
  }
  
  var justSignedUp = sessionStorage.getItem('justSignedUp');
  if (justSignedUp === 'true') {
    sessionStorage.removeItem('justSignedUp');
    var pendingLang = sessionStorage.getItem('pendingLanguageAfterAuth') || sessionStorage.getItem('pendingLanguage');
    if (pendingLang) {
      sessionStorage.removeItem('pendingLanguage');
      sessionStorage.removeItem('pendingLanguageAfterAuth');
      setTimeout(function() {
        if (window.isUserLoggedIn && window.isUserLoggedIn()) {
          openHub(pendingLang);
        }
      }, 500);
    } else {
      window.renderHome();
    }
  }
  
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    Sound._init();
  }
  
  window.renderHome();
});

/* =========================================================
   13) BOOT
   ========================================================= */
// Initial render is now handled in DOMContentLoaded above