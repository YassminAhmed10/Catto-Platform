/* =========================================================
   ROADMAP.JS - Interactive Language Learning Map
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
  const stops = Array.from(document.querySelectorAll('.stop'));
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalFlag = document.getElementById('modalFlag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCta = document.getElementById('modalCta');
  const toast = document.getElementById('toast');
  const progressText = document.getElementById('progressText');
  const startBtn = document.getElementById('startBtn');

  let unlockedCount = stops.filter(s => s.dataset.status === 'unlocked').length;
  let activeWorld = null;
  let toastTimer = null;

  // Test sound on page load
  setTimeout(function() {
    try {
      if (typeof Sound !== 'undefined') {
        Sound._init();
        Sound.pop();
        console.log('🔊 Sound test successful!');
      }
    } catch (e) {
      console.log('🔇 Sound test failed - will work on user interaction');
    }
  }, 500);

  function updateProgressText() {
    if (progressText) {
      progressText.textContent = unlockedCount + ' of ' + stops.length + ' worlds unlocked';
    }

    var pill = document.getElementById('progressPill');
    if (pill) {
      pill.style.transform = 'scale(1.1)';
      setTimeout(function() {
        pill.style.transform = '';
      }, 300);
    }
  }

  function showToast(message, isSuccess) {
    if (isSuccess === undefined) isSuccess = false;
    if (toast) {
      toast.textContent = message;
      toast.style.background = isSuccess ? '#58C27D' : '#2E2657';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function() {
        toast.classList.remove('show');
        toast.style.background = '';
      }, 2500);
    }
  }

  // ---------- FLAG HELPER ----------
  function flagSvgFor(code) {
    if (window.LANGUAGE_FLAG_SVG && window.LANGUAGE_FLAG_SVG[code]) {
      return window.LANGUAGE_FLAG_SVG[code];
    }
    // Fallback flags
    var fallbackFlags = {
      'es': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#C60B1E"/><rect width="60" height="20" y="10" fill="#FFC400"/><rect width="60" height="4" y="18" fill="#C60B1E"/><circle cx="30" cy="20" r="6" fill="#C60B1E"/></svg>',
      'fr': '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#002395"/><rect width="20" height="40" x="20" fill="white"/><rect width="20" height="40" x="40" fill="#ED2939"/></svg>',
      'de': '<svg viewBox="0 0 60 40"><rect width="60" height="13.3" y="0" fill="#000"/><rect width="60" height="13.3" y="13.3" fill="#DD0000"/><rect width="60" height="13.3" y="26.6" fill="#FFCE00"/></svg>',
      'it': '<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#009246"/><rect width="20" height="40" x="20" fill="white"/><rect width="20" height="40" x="40" fill="#CE2B37"/></svg>',
      'jp': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="white"/><circle cx="30" cy="20" r="12" fill="#BC002D"/></svg>',
      'cn': '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#DE2910"/><rect x="4" y="4" width="18" height="12" fill="#FFDE00"/><circle cx="13" cy="10" r="6" fill="#DE2910"/><circle cx="10" cy="7" r="1.5" fill="#FFDE00"/><circle cx="16" cy="7" r="1.5" fill="#FFDE00"/><circle cx="10" cy="13" r="1.5" fill="#FFDE00"/><circle cx="16" cy="13" r="1.5" fill="#FFDE00"/></svg>'
    };
    return fallbackFlags[code] || '';
  }

  function openModal(stopEl) {
    activeWorld = stopEl;
    var svg = flagSvgFor(stopEl.dataset.flag);
    if (svg && modalFlag) {
      modalFlag.innerHTML = svg;
    }
    if (modalTitle) {
      modalTitle.textContent = 'Ready to explore ' + stopEl.dataset.lang + '?';
    }
    if (modalBody) {
      modalBody.textContent = 'Three fun lessons and a quiz are waiting on this island!';
    }
    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
    }

    if (typeof Sound !== 'undefined') Sound.pop();

    var modal = document.getElementById('modalCard');
    if (modal) {
      modal.style.animation = 'modalPop 0.3s ease';
      setTimeout(function() {
        modal.style.animation = '';
      }, 300);
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
    }
    activeWorld = null;
    if (typeof Sound !== 'undefined') Sound.pop();
  }

  function shakeNode(node) {
    node.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 400, easing: 'ease-in-out' }
    );
  }

  function unlockNextWorld() {
    var next = stops.find(function(s) { return s.dataset.status === 'locked'; });
    if (!next) return;

    if (typeof Sound !== 'undefined') Sound.unlock();

    next.dataset.status = 'unlocked';
    var node = next.querySelector('.stop-node');
    if (node) node.classList.add('current');

    var lockBadge = node.querySelector('.lock-badge');
    if (lockBadge) {
      lockBadge.style.animation = 'popOut 0.3s ease';
      setTimeout(function() { lockBadge.remove(); }, 300);
    }

    unlockedCount++;
    updateProgressText();
    burstConfetti(next);
    showToast('🎉 New world unlocked: ' + next.dataset.lang + '!', true);
  }

  function burstConfetti(anchorEl) {
    var rect = anchorEl.getBoundingClientRect();
    var colors = ['#FF6F59', '#FFD23F', '#58C27D', '#6EC6FF', '#2E2657', '#FF8A5B', '#FFB84D'];
    var emojis = ['⭐', '🌟', '🎉', '🎊', '✨', '🌈', '🎈', '💫', '🎆'];

    for (var i = 0; i < 30; i++) {
      var piece = document.createElement('div');
      var size = 6 + Math.random() * 10;
      var isEmoji = Math.random() > 0.6;

      piece.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2 + (Math.random() - 0.5) * 40}px;
        top: ${rect.top + rect.height/2 + (Math.random() - 0.5) * 40}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        z-index: 9999;
        font-size: ${size + 10}px;
      `;

      if (isEmoji) {
        piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      } else {
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }

      document.body.appendChild(piece);

      var angle = Math.random() * Math.PI * 2;
      var distance = 40 + Math.random() * 150;
      var dx = Math.cos(angle) * distance;
      var dy = Math.sin(angle) * distance - 60;

      piece.animate(
        [
          { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: 1 },
          { transform: 'translate(' + dx + 'px, ' + (dy + 180) + 'px) rotate(' + (Math.random() * 720) + 'deg) scale(0.2)', opacity: 0 }
        ],
        {
          duration: 1200 + Math.random() * 600,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          fill: 'forwards'
        }
      ).onfinish = function() { piece.remove(); };
    }
  }

  // ---------- STOP / LEVEL INTERACTIONS ----------
  stops.forEach(function(stop) {
    var node = stop.querySelector('.stop-node');

    if (node) {
      node.addEventListener('click', function(e) {
        e.stopPropagation();

        if (stop.dataset.status === 'unlocked') {
          if (typeof Sound !== 'undefined') Sound.pop();
          openModal(stop);
        } else {
          if (typeof Sound !== 'undefined') Sound.locked();
          shakeNode(node);
          showToast('🔒 Finish the level before this one to unlock it!');
        }
      });

      node.addEventListener('mouseenter', function() {
        if (stop.dataset.status === 'unlocked') {
          this.style.boxShadow = '0 8px 0 rgba(46,38,87,0.15), 0 0 30px rgba(255,210,63,0.5)';
          this.style.borderColor = '#FFD23F';
        } else {
          this.style.boxShadow = '0 8px 0 rgba(46,38,87,0.15), 0 0 20px rgba(255,0,0,0.2)';
        }
      });

      node.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
        this.style.borderColor = '';
      });
    }
  });

  // ---------- MODAL CONTROLS ----------
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', function(e) {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // ---------- MODAL CTA ----------
  if (modalCta) {
    modalCta.addEventListener('click', function() {
      if (activeWorld) {
        if (typeof Sound !== 'undefined') Sound.win();
        burstConfetti(activeWorld.querySelector('.stop-node'));
        showToast('🚀 Off to ' + activeWorld.dataset.lang + ' world! Let\'s go!', true);
        unlockNextWorld();
      }
      closeModal();
    });
  }

  // ---------- START BUTTON ----------
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      this.style.transform = 'scale(0.95)';
      setTimeout(function() {
        startBtn.style.transform = '';
      }, 200);

      var first = stops.find(function(s) { return s.dataset.status === 'unlocked'; });
      if (first) {
        openModal(first);
      } else {
        showToast('🌟 Start with Spanish! It\'s ready to go!');
      }
    });
  }

  // ---------- ADD POP ANIMATION ----------
  if (!document.getElementById('modalStyles')) {
    var styleSheet = document.createElement('style');
    styleSheet.id = 'modalStyles';
    styleSheet.textContent = `
      @keyframes modalPop {
        0% { transform: scale(0.7) translateY(20px); opacity: 0; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }

      @keyframes popOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  updateProgressText();

  // Welcome message
  setTimeout(function() {
    showToast('🌟 Welcome to Language Island! Click a level to start!', true);
  }, 800);
});