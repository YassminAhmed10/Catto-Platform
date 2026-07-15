/* =========================================================
   SOUND SYSTEM 
   ========================================================= */

if (typeof window !== "undefined" && window.Sound && window.Sound.__soundSystemLoaded) {
  console.log("Sound system already loaded — skipping duplicate init.");
} else {

(function () {
  "use strict";

  const Sound = {
    __soundSystemLoaded: true,

    _enabled: true,
    _ctx: null,
    _initialized: false,

    _init() {
      if (this._initialized) return;

      try {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)();

        const resumeAudio = () => {
          if (this._ctx && this._ctx.state === "suspended") {
            this._ctx.resume().catch((err) => {
              console.log("Could not resume audio:", err);
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
        console.log("Sound system initialized (Web Audio only)!");
      } catch (e) {
        console.log("Web Audio not supported - using silent mode");
        this._initialized = true;
      }
    },

    _ensureContext() {
      this._init();
      if (!this._ctx) return false;
      if (this._ctx.state === "suspended") {
        this._ctx.resume().catch(() => {});
      }
      return this._ctx.state === "running";
    },

    _runWhenReady(fn) {
      if (!this._enabled) return;
      if (!this._ensureContext()) return;
      
      try {
        fn();
      } catch(e) {
        // Silent fail
      }
    },

    // ---- Page turn sound ----
    pageTurn() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const now = ctx.currentTime;
        const vol = 0.4;

        // Swish sound
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
      });
    },

    // ---- Pop sound (for clicks) ----
    pop() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 600 + Math.random() * 300;
        osc.type = "sine";

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
      });
    },

    // ---- Match sound (for correct answers) ----
    match() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const notes = [659, 523];
        const now = ctx.currentTime;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.value = freq;
          osc.type = "sine";

          const startTime = now + i * 0.08;
          gain.gain.setValueAtTime(0.15, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

          osc.start(startTime);
          osc.stop(startTime + 0.12);
        });
      });
    },

    // ---- Nav go sound ----
    navGo() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const notes = [523, 659, 784];
        const now = ctx.currentTime;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.value = freq;
          osc.type = "sine";

          const startTime = now + i * 0.06;
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

          osc.start(startTime);
          osc.stop(startTime + 0.1);
        });
      });
    },

    // ---- Unlock sound ----
    unlock() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const notes = [523, 659, 784, 1047];
        const now = ctx.currentTime;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.value = freq;
          osc.type = "sine";

          const startTime = now + i * 0.15;
          gain.gain.setValueAtTime(0.15, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

          osc.start(startTime);
          osc.stop(startTime + 0.2);
        });
      });
    },

    // ---- Locked/Error sound ----
    locked() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.frequency.value = 300;
        osc1.type = "square";
        gain1.gain.setValueAtTime(0.1, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc1.start(now);
        osc1.stop(now + 0.15);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.value = 200;
        osc2.type = "square";
        gain2.gain.setValueAtTime(0.08, now + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc2.start(now + 0.15);
        osc2.stop(now + 0.3);
      });
    },

    // ---- Win/Celebration sound ----
    win() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const melody = [523, 587, 659, 784, 880, 784, 880, 1047];
        const now = ctx.currentTime;

        melody.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.frequency.value = freq;
          osc.type = "sine";

          const startTime = now + i * 0.1;
          gain.gain.setValueAtTime(0.12, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

          osc.start(startTime);
          osc.stop(startTime + 0.15);
        });
      });
    },

    // ---- Hover sound ----
    hover() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 1200 + Math.random() * 300;
        osc.type = "sine";

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
      });
    },

    // ---- Chime sound ----
    chime() {
      this._runWhenReady(() => {
        const ctx = this._ctx;
        const notes = [523, 659];
        const now = ctx.currentTime;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          const startTime = now + i * 0.1;
          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
          osc.start(startTime);
          osc.stop(startTime + 0.15);
        });
      });
    },

    // ---- Toggle sound on/off ----
    toggle() {
      this._enabled = !this._enabled;
      return this._enabled;
    },

    // ---- Get enabled state ----
    isEnabled() {
      return this._enabled;
    }
  };

  window.Sound = Sound;

  // ---- Auto-wire page turn events ----
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

    // Swipe detection for books
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
    // Don't initialize AudioContext here
    // Don't preload any MP3 files
    wirePageTurnEvents();
    console.log("Sound system ready (Web Audio only, no external files)");
  }

  document.addEventListener("DOMContentLoaded", boot);
  if (document.readyState === "complete" || document.readyState === "interactive") {
    boot();
  }
})();

}