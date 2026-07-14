/* =========================================================
   Fun sound effects system for kids - COMPLETE VERSION
   ========================================================= */

if (typeof window !== "undefined" && window.Sound && window.Sound.__soundSystemLoaded) {
  console.log("🎵 Sound system already loaded — skipping duplicate init.");
} else {

(function () {
  "use strict";

  const Sound = {
    __soundSystemLoaded: true,

    _enabled: true,
    _ctx: null,
    _initialized: false,

    // ---- page-turn specific state ----
    _pageTurnVolume: 0.5,
    _pageTurnAudioSrc: "assets/sounds/page-turn.mp3", // ← FIXED PATH
    _pageTurnAudioPool: [],
    _pageTurnAudioPoolSize: 3,
    _pageTurnAudioFailed: false,
    _pageTurnWired: false,

    _init() {
      if (this._initialized) return;

      try {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)();

        const resumeAudio = () => {
          if (this._ctx && this._ctx.state === "suspended") {
            this._ctx.resume().catch((err) => {
              console.log("⚠️ Could not resume audio:", err);
            });
          }
          document.removeEventListener("click", resumeAudio);
          document.removeEventListener("touchstart", resumeAudio);
          document.removeEventListener("keydown", resumeAudio);
        };

        document.addEventListener("click", resumeAudio);
        document.addEventListener("touchstart", resumeAudio);
        document.addEventListener("keydown", resumeAudio);

        this._initialized = true;
        console.log("🎵 Sound system initialized!");
      } catch (e) {
        console.log("⚠️ Web Audio not supported - using silent mode");
        this._initialized = true;
      }

      this._preloadPageTurnAudio();
    },

    // Every effect below used to do:
    //   if (ctx.state === "suspended") { ctx.resume(); return; }
    // which meant the FIRST click that has to wake up the AudioContext
    // (right after the page loads, before anything else has used Web
    // Audio) resumed the context but threw away the sound instead of
    // playing it — so effects looked broken on the first tap and only
    // started working from the second click onward. This helper resumes
    // (if needed) and always plays afterward.
    _runWhenReady(fn) {
      if (!this._ctx) return;
      if (this._ctx.state === "suspended") {
        this._ctx.resume().then(fn).catch(() => {});
      } else {
        fn();
      }
    },

    _preloadPageTurnAudio() {
      if (this._pageTurnAudioPool.length || typeof Audio === "undefined") return;
      for (let i = 0; i < this._pageTurnAudioPoolSize; i++) {
        const audio = new Audio();
        audio.src = this._pageTurnAudioSrc;
        audio.preload = "auto";
        audio.volume = this._pageTurnVolume;
        audio.addEventListener(
          "error",
          () => {
            this._pageTurnAudioFailed = true;
          },
          { once: true }
        );
        this._pageTurnAudioPool.push(audio);
      }
      this._pageTurnAudioIndex = 0;
    },

    setPageTurnAudioSrc(path) {
      this._pageTurnAudioSrc = path;
      this._pageTurnAudioFailed = false;
      if (!this._pageTurnAudioPool.length) this._preloadPageTurnAudio();
      this._pageTurnAudioPool.forEach((a) => {
        a.src = path;
      });
    },

    setPageTurnVolume(v) {
      this._pageTurnVolume = Math.max(0, Math.min(1, v));
      this._pageTurnAudioPool.forEach((a) => {
        a.volume = this._pageTurnVolume;
      });
    },

    _synthPageTurn() {
      if (!this._ctx) return;
      const ctx = this._ctx;
      const now = ctx.currentTime;
      const vol = this._pageTurnVolume;

      const swish = (freq, startOffset, dur, peak) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const startTime = now + startOffset;
        gain.gain.setValueAtTime(peak * vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
        osc.start(startTime);
        osc.stop(startTime + dur);
      };

      swish(900 + Math.random() * 200, 0, 0.06, 0.4);
      swish(700 + Math.random() * 200, 0.06, 0.05, 0.3);
      swish(500 + Math.random() * 150, 0.11, 0.07, 0.18);
    },

    pageTurn() {
      if (!this._enabled) return;
      this._init();

      const playSynthFallback = () => {
        if (!this._ctx) return;
        if (this._ctx.state === "suspended") {
          this._ctx.resume().then(() => this._synthPageTurn()).catch(() => {});
        } else {
          this._synthPageTurn();
        }
      };

      if (!this._pageTurnAudioFailed && this._pageTurnAudioPool.length) {
        try {
          const audio = this._pageTurnAudioPool[this._pageTurnAudioIndex];
          this._pageTurnAudioIndex = (this._pageTurnAudioIndex + 1) % this._pageTurnAudioPool.length;
          audio.currentTime = 0;
          audio.volume = this._pageTurnVolume;
          const playPromise = audio.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => playSynthFallback());
          }
        } catch (e) {
          playSynthFallback();
        }
      } else {
        playSynthFallback();
      }
    },

    // ---------------------------------------------------------------
    // Other sound effects
    // ---------------------------------------------------------------

    pop() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const osc = this._ctx.createOscillator();
          const gain = this._ctx.createGain();
          osc.connect(gain);
          gain.connect(this._ctx.destination);

          osc.frequency.value = 600 + Math.random() * 300;
          osc.type = "sine";

          const now = this._ctx.currentTime;
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          osc.start(now);
          osc.stop(now + 0.15);
        } catch (e) {}
      });
    },

    match() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const notes = [659, 523];
          const now = this._ctx.currentTime;

          notes.forEach(
            function (freq, i) {
              const osc = this._ctx.createOscillator();
              const gain = this._ctx.createGain();
              osc.connect(gain);
              gain.connect(this._ctx.destination);

              osc.frequency.value = freq;
              osc.type = "sine";

              const startTime = now + i * 0.08;
              gain.gain.setValueAtTime(0.15, startTime);
              gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

              osc.start(startTime);
              osc.stop(startTime + 0.12);
            }.bind(this)
          );
        } catch (e) {}
      });
    },

    navGo() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const notes = [523, 659, 784];
          const now = this._ctx.currentTime;

          notes.forEach(
            function (freq, i) {
              const osc = this._ctx.createOscillator();
              const gain = this._ctx.createGain();
              osc.connect(gain);
              gain.connect(this._ctx.destination);

              osc.frequency.value = freq;
              osc.type = "sine";

              const startTime = now + i * 0.06;
              gain.gain.setValueAtTime(0.12, startTime);
              gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

              osc.start(startTime);
              osc.stop(startTime + 0.1);
            }.bind(this)
          );
        } catch (e) {}
      });
    },

    unlock() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const notes = [523, 659, 784, 1047];
          const now = this._ctx.currentTime;

          notes.forEach(
            function (freq, i) {
              const osc = this._ctx.createOscillator();
              const gain = this._ctx.createGain();
              osc.connect(gain);
              gain.connect(this._ctx.destination);

              osc.frequency.value = freq;
              osc.type = "sine";

              const startTime = now + i * 0.15;
              gain.gain.setValueAtTime(0.15, startTime);
              gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

              osc.start(startTime);
              osc.stop(startTime + 0.2);
            }.bind(this)
          );
        } catch (e) {}
      });
    },

    locked() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const now = this._ctx.currentTime;

          const osc1 = this._ctx.createOscillator();
          const gain1 = this._ctx.createGain();
          osc1.connect(gain1);
          gain1.connect(this._ctx.destination);
          osc1.frequency.value = 300;
          osc1.type = "square";
          gain1.gain.setValueAtTime(0.1, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc1.start(now);
          osc1.stop(now + 0.15);

          const osc2 = this._ctx.createOscillator();
          const gain2 = this._ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(this._ctx.destination);
          osc2.frequency.value = 200;
          osc2.type = "square";
          gain2.gain.setValueAtTime(0.08, now + 0.15);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc2.start(now + 0.15);
          osc2.stop(now + 0.3);
        } catch (e) {}
      });
    },

    win() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const melody = [523, 587, 659, 784, 880, 784, 880, 1047];
          const now = this._ctx.currentTime;

          melody.forEach(
            function (freq, i) {
              const osc = this._ctx.createOscillator();
              const gain = this._ctx.createGain();
              osc.connect(gain);
              gain.connect(this._ctx.destination);

              osc.frequency.value = freq;
              osc.type = "sine";

              const startTime = now + i * 0.1;
              gain.gain.setValueAtTime(0.12, startTime);
              gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

              osc.start(startTime);
              osc.stop(startTime + 0.15);
            }.bind(this)
          );
        } catch (e) {}
      });
    },

    hover() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const osc = this._ctx.createOscillator();
          const gain = this._ctx.createGain();
          osc.connect(gain);
          gain.connect(this._ctx.destination);

          osc.frequency.value = 1200 + Math.random() * 300;
          osc.type = "sine";

          const now = this._ctx.currentTime;
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          osc.start(now);
          osc.stop(now + 0.05);
        } catch (e) {}
      });
    },

    chime() {
      if (!this._enabled) return;
      this._init();

      this._runWhenReady(() => {
        try {
          const notes = [523, 659];
          const now = this._ctx.currentTime;

          notes.forEach(
            function (freq, i) {
              const osc = this._ctx.createOscillator();
              const gain = this._ctx.createGain();
              osc.connect(gain);
              gain.connect(this._ctx.destination);
              osc.frequency.value = freq;
              osc.type = "sine";
              const startTime = now + i * 0.1;
              gain.gain.setValueAtTime(0.1, startTime);
              gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
              osc.start(startTime);
              osc.stop(startTime + 0.15);
            }.bind(this)
          );
        } catch (e) {}
      });
    },

    toggle() {
      this._enabled = !this._enabled;
      return this._enabled;
    },
  };

  window.Sound = Sound;

  // ---------------------------------------------------------------
  // Auto-wire the page-turn sound to common book navigation patterns.
  // ---------------------------------------------------------------
  function wirePageTurnEvents() {
    if (Sound._pageTurnWired) return;
    Sound._pageTurnWired = true;

    const NAV_SELECTOR = [
      "#nextPage", "#prevPage", "#next-page", "#prev-page",
      "#btnNext", "#btnPrev", ".next-btn", ".prev-btn",
      ".next-page", ".prev-page", ".page-nav-next", ".page-nav-prev",
      '[data-action="next-page"]', '[data-action="prev-page"]',
      '[data-page-nav="next"]', '[data-page-nav="prev"]'
    ].join(", ");

    document.addEventListener("click", (e) => {
      const target = e.target && e.target.closest ? e.target.closest(NAV_SELECTOR) : null;
      if (target) Sound.pageTurn();
    }, true);

    const SWIPE_CONTAINER_SELECTOR = [
      ".book", ".flipbook", ".book-container",
      ".page-flip", "#book", "[data-swipe-pages]"
    ].join(", ");

    let touchStartX = null;
    let touchStartY = null;

    document.addEventListener("touchstart", (e) => {
      const container = e.target && e.target.closest ? e.target.closest(SWIPE_CONTAINER_SELECTOR) : null;
      if (!container || !e.touches || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const touch = e.changedTouches && e.changedTouches[0];
      if (!touch) {
        touchStartX = null;
        touchStartY = null;
        return;
      }
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      touchStartX = null;
      touchStartY = null;
      const SWIPE_THRESHOLD = 40;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        Sound.pageTurn();
      }
    }, { passive: true });

    document.addEventListener("book:pageChange", () => Sound.pageTurn());
  }

  function boot() {
    // NOTE: we deliberately do NOT call Sound._init() here anymore.
    // Creating the AudioContext at page load (before any click) is
    // exactly what triggers Chrome's "AudioContext was not allowed to
    // start" warning, because the context isn't tied to a user gesture.
    // Sound._init() already runs lazily inside pop()/match()/etc., which
    // are only ever called from click handlers — so the context now
    // gets created at the right time automatically.
    Sound._preloadPageTurnAudio();
    wirePageTurnEvents();
  }

  document.addEventListener("DOMContentLoaded", boot);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    boot();
  }
})();

} // end duplicate-load guard