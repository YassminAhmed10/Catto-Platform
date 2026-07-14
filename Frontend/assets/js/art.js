/* =========================================================
   ART.JS - Art Studio Complete JavaScript with Tabs
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  /* =========================================================
     0) IMAGE PATHS
     ========================================================= */
  const CATTO_IMG = "imgs/Cattoimages/LearnWithCatto/Catto.png";

  /* =========================================================
     1) WORD BANK
     ========================================================= */
  const WORD_BANK = {
    en: { name:"English", native:"English", dir:"ltr", speechLang:"en-US", color:"#4C8DAF",
      words:[
        {key:"apple",  text:"Apple",  shape:"apple"},
        {key:"ball",   text:"Ball",   shape:"ball"},
        {key:"carrot", text:"Carrot", shape:"carrot"},
      ]},
    ar: { name:"Arabic", native:"العربية", dir:"rtl", speechLang:"ar-SA", color:"#58C27D",
      words:[
        {key:"apple",  text:"تفاحة", shape:"apple"},
        {key:"ball",   text:"كرة",   shape:"ball"},
        {key:"carrot", text:"جزرة",  shape:"carrot"},
      ]},
    de: { name:"German", native:"Deutsch", dir:"ltr", speechLang:"de-DE", color:"#8C6FC9",
      words:[
        {key:"apple",  text:"Apfel",   shape:"apple"},
        {key:"ball",   text:"Ball",    shape:"ball"},
        {key:"carrot", text:"Karotte", shape:"carrot"},
      ]},
    es: { name:"Spanish", native:"Español", dir:"ltr", speechLang:"es-ES", color:"#FF6F59",
      words:[
        {key:"apple",  text:"Manzana",   shape:"apple"},
        {key:"ball",   text:"Pelota",    shape:"ball"},
        {key:"carrot", text:"Zanahoria", shape:"carrot"},
      ]},
    fr: { name:"French", native:"Français", dir:"ltr", speechLang:"fr-FR", color:"#FFB84D",
      words:[
        {key:"apple",  text:"Pomme",   shape:"apple"},
        {key:"ball",   text:"Ballon",  shape:"ball"},
        {key:"carrot", text:"Carotte", shape:"carrot"},
      ]},
    it: { name:"Italian", native:"Italiano", dir:"ltr", speechLang:"it-IT", color:"#E5563F",
      words:[
        {key:"apple",  text:"Mela",   shape:"apple"},
        {key:"ball",   text:"Palla",  shape:"ball"},
        {key:"carrot", text:"Carota", shape:"carrot"},
      ]},
  };

  /* =========================================================
     2) ICONS (no emoji)
     ========================================================= */
  const ICONS = {
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-4-6.3 4 1.7-7L1.9 9.2l7.1-.6z"/></svg>`,
    back: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6z"/></svg>`,
    brush: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.29a1 1 0 0 0-1.42 0L9.5 14.5l2 2 9.79-9.79a1 1 0 0 0 0-1.42z"/></svg>`,
    pencil: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    eraser: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.24 3.56 21.19 8.5a1 1 0 0 1 0 1.41L13 18.12l-6.36-.01L3 14.47a1 1 0 0 1 0-1.41l11.83-11.5a1 1 0 0 1 1.41 0zM7.05 16.11l1.94 1.94 3.5-.01-4.24-4.24-1.2 1.17a1 1 0 0 0 0 1.14z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12l-1 13.5A2 2 0 0 1 15 22H9a2 2 0 0 1-2-1.5L6 7zm3-4h6l1 2h4v2H2V5h4l1-2z"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.5l3.5-3.5 1.4 1.4L12 16.9l-4.9-4.9L8.5 10.5 12 14V3h0zM5 19h14v2H5v-2z"/></svg>`,
  };
  function icon(name, cls){ return `<span class="icon ${cls||''}">${ICONS[name]||''}</span>`; }
  function pic(src, label, extraClass){
    const safeLabel = (label||'').replace(/"/g,'&quot;');
    return `<div class="pic ${extraClass||''}"><span>${safeLabel}</span></div>`;
  }

  /* =========================================================
     3) PROGRESS STORAGE
     ========================================================= */
  const PROGRESS_KEY = "language-island-art-progress";
  function loadProgress(){ try{ return JSON.parse(localStorage.getItem(PROGRESS_KEY))||{}; }catch(e){ return {}; } }
  function saveProgress(p){ try{ localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); }catch(e){} }
  function getLangProgress(key){ const p=loadProgress(); return p[key]||{stars:0}; }
  function addStars(key,n){ const p=loadProgress(); p[key]=p[key]||{stars:0}; p[key].stars+=n; saveProgress(p); }

  /* =========================================================
     4) STATE
     ========================================================= */
  const state = { lang:null, tab:"color", wordIndex:0 };
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

  function showToast(msg){
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    if(toast && toastMessage) {
      toastMessage.textContent = msg;
      toast.classList.add("show");
      clearTimeout(toast._timer);
      toast._timer = setTimeout(function() {
        toast.classList.remove("show");
      }, 2500);
    }
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

  /* =========================================================
     5) HOME — pick a language
     ========================================================= */
  function renderHome(){
    state.lang=null;
    cattoSay("Hi! Pick a language, then let's color and write!","happy");

    const cards = Object.entries(WORD_BANK).map(([key,l])=>{
      const prog = getLangProgress(key);
      const imgMap = {
        ar: 'Arabic_Art.png',
        en: 'English_Art.png',
        fr: 'Francais_Art.png',
        de: 'Deutsch_Art.png',
        it: 'Italiano_Art.png',
        es: 'Espanol_Art.png'
      };
      return `
        <button class="lang-art-btn" data-lang="${key}">
          <img src="imgs/ART/${imgMap[key]}" alt="${l.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${l.name}</span>
        </button>`;
    }).join("");

    app.innerHTML = `
      <section class="page-hero">
        <h1>Art Studio</h1>
        <p>Pick a language, then color a picture or trace a word!</p>
        <p style="font-size:14px;font-weight:800;margin-top:6px;" id="loginStatusMsg">Sign in to unlock all art activities!</p>
      </section>
      <section class="lang-selection">
        <div class="lang-grid-art">${cards}</div>
      </section>
    `;

    app.querySelectorAll(".lang-art-btn").forEach(btn=>{
      btn.addEventListener("click", function() {
        if (typeof window.isUserLoggedIn !== 'undefined' && window.isUserLoggedIn()) {
          openStudio(this.dataset.lang);
        } else {
          sessionStorage.setItem('pendingArtLang', this.dataset.lang);
          openLoginModal();
        }
      });
    });

    updateLoginStatus();
  }

  /* =========================================================
     6) LOGIN MODAL - FIXED CLOSE
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

  // =========================================================
  // MODAL CLOSE HANDLERS - FIXED
  // =========================================================
  var loginModalClose = document.getElementById('loginModalClose');
  if (loginModalClose) {
    loginModalClose.addEventListener('click', function() {
      closeLoginModal();
    });
  }

  // Close modal on backdrop click
  var loginRequiredModal = document.getElementById('loginRequiredModal');
  if (loginRequiredModal) {
    loginRequiredModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLoginModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLoginModal();
      var modal = document.getElementById('loginRequiredModal');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  function updateLoginStatus() {
    var msg = document.getElementById('loginStatusMsg');
    if (msg) {
      if (typeof window.isUserLoggedIn !== 'undefined' && window.isUserLoggedIn()) {
        var user = typeof window.getCurrentUser !== 'undefined' ? window.getCurrentUser() : null;
        var name = user ? user.name || 'Explorer' : 'Explorer';
        msg.textContent = ' Welcome, ' + name + '! Pick a language to start creating!';
        msg.style.color = 'var(--grass)';
      } else {
        msg.textContent = '';
        msg.style.color = 'var(--coral)';
      }
    }
  }

  /* =========================================================
     7) STUDIO — with Color It / Write It tabs
     ========================================================= */
  function openStudio(key){
    state.lang = key;
    state.tab = "color";
    state.wordIndex = 0;
    const l = WORD_BANK[key];
    cattoSay(`${l.name}! Color it or write it — your choice!`, "happy");
    renderStudio();
  }

  function renderStudio(){
    const l = WORD_BANK[state.lang];
    const prog = getLangProgress(state.lang);

    const wordButtons = l.words.map((w,i)=>`
      <button class="word-pick-btn ${i===state.wordIndex?'active':''}" data-i="${i}">
        ${pic('', w.text)}<span>${w.text}</span>
      </button>`).join("");

    app.innerHTML = `
      <section class="studio-section">
        <div class="section-header">
          <button class="back-btn" id="backHome"><i class="fas fa-arrow-left"></i> Back to languages</button>
          <h2 id="studioLangTitle">Art Studio — <span>${l.name}</span></h2>
        </div>
        
        <!-- TABS: Color It / Write It -->
        <div class="tab-row">
          <button class="tab-btn ${state.tab==='color'?'active':''}" id="tabColor">
            <i class="fas fa-paint-brush"></i> Color It
          </button>
          <button class="tab-btn ${state.tab==='write'?'active':''}" id="tabWrite">
            <i class="fas fa-pen"></i> Write It
          </button>
        </div>
        
        <div class="word-row">${wordButtons}</div>

        <div class="studio-panel">
          <div class="studio-toolbar">
            <div class="color-swatches" id="colorSwatches"></div>
            <div class="tool-field">
              <span>Size</span>
              <input type="range" id="brushSize" min="3" max="30" value="10">
            </div>
            <label class="eraser-toggle">
              <input type="checkbox" id="eraserToggle"> Eraser
            </label>
          </div>
          <div class="canvas-stack" id="canvasStack">
            <canvas id="guideCanvas"></canvas>
            <canvas id="drawCanvas"></canvas>
          </div>
          <div class="studio-actions">
            <button class="mini-btn" id="clearCanvas"><i class="fas fa-trash-alt"></i> Clear</button>
            <button class="mini-btn" id="hearWordBtn"><i class="fas fa-volume-up"></i> Hear the word</button>
            <button class="mini-btn primary" id="saveCanvas"><i class="fas fa-download"></i> Save my art</button>
          </div>
        </div>
      </section>
    `;

    // Tab event listeners
    document.getElementById("tabColor").addEventListener("click", function() {
      state.tab = "color";
      renderStudio();
    });
    
    document.getElementById("tabWrite").addEventListener("click", function() {
      state.tab = "write";
      renderStudio();
    });

    document.getElementById("backHome").addEventListener("click", renderHome);
    document.getElementById("hearWordBtn").addEventListener("click", ()=>{
      speak(l.words[state.wordIndex].text, l.speechLang);
    });
    
    app.querySelectorAll(".word-pick-btn").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        state.wordIndex = parseInt(btn.dataset.i,10);
        renderStudio();
      });
    });

    setupCanvas();
  }

  /* =========================================================
     8) CANVAS SETUP
     ========================================================= */
  let guideCanvas, guideCtx, drawCanvas, drawCtx;
  let drawing = false, last = null;
  const colors = ['#2E2657','#FF6F59','#FFD23F','#58C27D','#6EC6FF','#B79CED','#FF8A5B','#FFFFFF'];
  let currentColor = colors[0];

  function setupCanvas(){
    guideCanvas = document.getElementById("guideCanvas");
    drawCanvas = document.getElementById("drawCanvas");
    guideCtx = guideCanvas.getContext("2d");
    drawCtx = drawCanvas.getContext("2d");

    const swatchWrap = document.getElementById("colorSwatches");
    colors.forEach((c,i)=>{
      const sw = document.createElement("button");
      sw.className = "swatch" + (c===currentColor ? " active" : "");
      sw.style.background = c;
      sw.setAttribute("aria-label","Choose color");
      sw.addEventListener("click", ()=>{
        currentColor = c;
        document.getElementById("eraserToggle").checked = false;
        swatchWrap.querySelectorAll(".swatch").forEach(s=>s.classList.remove("active"));
        sw.classList.add("active");
      });
      swatchWrap.appendChild(sw);
    });

    fitCanvas();
    window.addEventListener("resize", fitCanvas);

    drawCanvas.addEventListener("mousedown", startDraw);
    drawCanvas.addEventListener("mousemove", drawMove);
    window.addEventListener("mouseup", endDraw);
    drawCanvas.addEventListener("touchstart", startDraw, {passive:false});
    drawCanvas.addEventListener("touchmove", drawMove, {passive:false});
    drawCanvas.addEventListener("touchend", endDraw);

    document.getElementById("clearCanvas").addEventListener("click", ()=>{
      clearDrawLayer();
      showToast("Fresh page!");
    });
    document.getElementById("saveCanvas").addEventListener("click", saveArt);
  }

  function fitCanvas(){
    if(!guideCanvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = guideCanvas.getBoundingClientRect();
    [guideCanvas, drawCanvas].forEach(c=>{
      c.width = rect.width * ratio;
      c.height = rect.height * ratio;
    });
    guideCtx.setTransform(ratio,0,0,ratio,0,0);
    drawCtx.setTransform(ratio,0,0,ratio,0,0);
    redrawGuide();
  }

  function redrawGuide(){
    const rect = guideCanvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    guideCtx.clearRect(0,0,w,h);
    guideCtx.save();
    guideCtx.strokeStyle = "#C9C4E8";
    guideCtx.lineWidth = 5;
    guideCtx.lineJoin = "round";
    guideCtx.lineCap = "round";

    const l = WORD_BANK[state.lang];
    const word = l.words[state.wordIndex];

    if(state.tab === "color"){
      // Draw shape for coloring
      const cx = w/2, cy = h/2, r = Math.min(w,h)*0.28;
      const shape = word.shape;
      if(shape === 'apple') {
        drawAppleOutline(guideCtx, cx, cy, r);
      } else if(shape === 'ball') {
        drawBallOutline(guideCtx, cx, cy, r);
      } else if(shape === 'carrot') {
        drawCarrotOutline(guideCtx, cx, cy, r);
      }
    } else {
      // Write It mode - show word outline
      guideCtx.textAlign = "center";
      guideCtx.textBaseline = "middle";
      guideCtx.direction = l.dir === "rtl" ? "rtl" : "ltr";
      const fontSize = Math.min(w / Math.max(word.text.length,1) / 0.62, h*0.45);
      guideCtx.font = `800 ${fontSize}px "Baloo 2", sans-serif`;
      guideCtx.lineWidth = 2.5;
      guideCtx.setLineDash([8,7]);
      guideCtx.strokeText(word.text, w/2, h/2);
    }
    guideCtx.restore();
  }

  function drawAppleOutline(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r*0.55);
    ctx.bezierCurveTo(cx - r*0.35, cy - r*0.95, cx - r*1.05, cy - r*0.5, cx - r*0.95, cy + r*0.1);
    ctx.bezierCurveTo(cx - r*0.9, cy + r*0.85, cx - r*0.35, cy + r*1.15, cx, cy + r*1.0);
    ctx.bezierCurveTo(cx + r*0.35, cy + r*1.15, cx + r*0.9, cy + r*0.85, cx + r*0.95, cy + r*0.1);
    ctx.bezierCurveTo(cx + r*1.05, cy - r*0.5, cx + r*0.35, cy - r*0.95, cx, cy - r*0.55);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - r*0.55);
    ctx.quadraticCurveTo(cx + r*0.05, cy - r*0.9, cx + r*0.15, cy - r*1.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + r*0.4, cy - r*1.0, r*0.22, r*0.12, -0.5, 0, Math.PI*2);
    ctx.stroke();
  }

  function drawBallOutline(ctx, cx, cy, r) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.quadraticCurveTo(cx - r*0.6, cy, cx, cy + r); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.quadraticCurveTo(cx + r*0.6, cy, cx, cy + r); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
  }

  function drawCarrotOutline(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.moveTo(cx - r*0.55, cy - r*0.6);
    ctx.quadraticCurveTo(cx - r*0.5, cy + r*0.3, cx, cy + r*1.2);
    ctx.quadraticCurveTo(cx + r*0.5, cy + r*0.3, cx + r*0.55, cy - r*0.6);
    ctx.quadraticCurveTo(cx, cy - r*0.8, cx - r*0.55, cy - r*0.6);
    ctx.closePath();
    ctx.stroke();
    [-0.3,0,0.3].forEach(off=>{
      ctx.beginPath();
      ctx.moveTo(cx + off*r, cy - r*0.6);
      ctx.quadraticCurveTo(cx + off*r*1.3, cy - r*1.1, cx + off*r*0.6, cy - r*1.4);
      ctx.stroke();
    });
  }

  function clearDrawLayer(){
    const rect = drawCanvas.getBoundingClientRect();
    drawCtx.clearRect(0,0,rect.width,rect.height);
  }

  function getPos(e){
    const rect = drawCanvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function startDraw(e){ drawing = true; last = getPos(e); e.preventDefault(); }

  function drawMove(e){
    if(!drawing) return;
    const pos = getPos(e);
    const eraser = document.getElementById("eraserToggle").checked;
    drawCtx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    drawCtx.strokeStyle = currentColor;
    drawCtx.lineWidth = eraser ? Number(document.getElementById("brushSize").value)*2.2 : Number(document.getElementById("brushSize").value);
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";
    drawCtx.beginPath();
    drawCtx.moveTo(last.x, last.y);
    drawCtx.lineTo(pos.x, pos.y);
    drawCtx.stroke();
    last = pos;
    e.preventDefault();
  }

  function endDraw(){ drawing = false; last = null; }

  function saveArt(){
    const merge = document.createElement("canvas");
    merge.width = guideCanvas.width;
    merge.height = guideCanvas.height;
    const mctx = merge.getContext("2d");
    mctx.fillStyle = "#FFFDF6";
    mctx.fillRect(0,0,merge.width,merge.height);
    mctx.drawImage(guideCanvas,0,0);
    mctx.drawImage(drawCanvas,0,0);

    const link = document.createElement("a");
    const l = WORD_BANK[state.lang];
    const word = l.words[state.wordIndex];
    link.download = `my-${l.name.toLowerCase()}-${word.key}-art.png`;
    link.href = merge.toDataURL("image/png");
    link.click();

    addStars(state.lang, 1);
    cattoSay("Beautiful work! Here's a star for you!","win");
    showToast("Your masterpiece was saved!");
  }

  // =========================================================
  // CHECK FOR RETURN FROM LOGIN
  // =========================================================
  function checkReturnFromLogin() {
    var justSignedIn = sessionStorage.getItem('justSignedIn');
    if (justSignedIn === 'true') {
      sessionStorage.removeItem('justSignedIn');
      var pendingLang = sessionStorage.getItem('pendingArtLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingArtLang');
        setTimeout(function() {
          if (typeof window.isUserLoggedIn !== 'undefined' && window.isUserLoggedIn()) {
            openStudio(pendingLang);
            showToast('👋 Welcome back! Let\'s create!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('👋 Welcome back!');
        }, 500);
      }
    }

    var justSignedUp = sessionStorage.getItem('justSignedUp');
    if (justSignedUp === 'true') {
      sessionStorage.removeItem('justSignedUp');
      var pendingLang = sessionStorage.getItem('pendingArtLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingArtLang');
        setTimeout(function() {
          if (typeof window.isUserLoggedIn !== 'undefined' && window.isUserLoggedIn()) {
            openStudio(pendingLang);
            showToast('🎉 Welcome! Start creating art!');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('🎉 Welcome to Language Island!');
        }, 500);
      }
    }
  }

  // =========================================================
  // SOUND SYSTEM
  // =========================================================
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    Sound._init();
  }

  // =========================================================
  // INIT
  // =========================================================
  renderHome();
  checkReturnFromLogin();

  console.log('Art Studio loaded with tabs!');
});