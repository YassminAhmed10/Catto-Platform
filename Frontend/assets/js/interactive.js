// Shared interaction and overlay utilities. Event delegation keeps dynamic UI covered.
(function () {
  const interactiveSelector = [
    'button', '.nav-btn', '.stop-node', '.content-card', '.memory-card', '.swatch',
    '.cta-btn', '.modal-close', '.reading-card', '.topic-word-chip', '.how-card',
    '.language-btn', '.level-btn', '.auth-btn', '.social-btn', '.menu-toggle',
    '.sidebar-close', '.sidebar-menu a', '.lesson-card', '.auth-submit'
  ].join(',');

  let activeOverlay = null;
  let previousFocus = null;
  let restoreOverflow = '';

  function focusableIn(container) {
    return Array.from(container.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  }
  function panelFor(backdrop) {
    const panel = backdrop._overlaySettings && backdrop._overlaySettings.panel;
    return typeof panel === 'string' ? (backdrop.querySelector(panel) || document.querySelector(panel)) : panel;
  }

  window.Overlay = {
    open(backdrop, options) {
      if (!backdrop) return;
      if (activeOverlay && activeOverlay !== backdrop) this.close(activeOverlay);
      const settings = Object.assign({ panel: '.modal-card', openClass: 'open', onClose: null }, options);
      previousFocus = document.activeElement;
      activeOverlay = backdrop;
      backdrop._overlaySettings = settings;
      restoreOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      backdrop.classList.add(settings.openClass);
      backdrop.setAttribute('aria-hidden', 'false');
      const panel = panelFor(backdrop);
      if (panel) {
        panel.setAttribute('tabindex', '-1');
        setTimeout(() => (focusableIn(panel)[0] || panel).focus(), 0);
      }
    },
    close(backdrop) {
      if (!backdrop) return;
      const settings = backdrop._overlaySettings || { openClass: 'open' };
      backdrop.classList.remove(settings.openClass);
      backdrop.setAttribute('aria-hidden', 'true');
      if (activeOverlay === backdrop) {
        document.body.style.overflow = restoreOverflow;
        activeOverlay = null;
        if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
      }
      if (typeof settings.onClose === 'function') settings.onClose();
    },
    closeActive() { if (activeOverlay) this.close(activeOverlay); },
    get active() { return activeOverlay; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function firstClick() {
      if (typeof Sound !== 'undefined') Sound._init();
    }, { once: true });

    document.body.addEventListener('mouseenter', function (event) {
      const target = event.target.closest(interactiveSelector);
      if (!target || target.matches('.locked, .locked-card, [disabled]')) return;
      if (typeof Sound !== 'undefined') Sound.hover();
    }, true);

    document.body.addEventListener('click', function (event) {
      const target = event.target.closest(interactiveSelector);

      if (target && target.closest('.sidebar-menu')) {
      return; 
      }
      if (!target) return;

      if (target.closest('.sidebar-menu')) {
          return; 
      }

      if (target.matches('.locked, .locked-card, [disabled]')) {
        if (typeof Sound !== 'undefined') Sound.locked();
        return;
      }
      if (!target.closest('.stop') && target.id !== 'muteToggle' && typeof Sound !== 'undefined') Sound.pop();
    });

    document.addEventListener('keydown', function (event) {
      if (!Overlay.active) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        Overlay.closeActive();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelFor(Overlay.active);
      if (!panel) return;
      const items = focusableIn(panel);
      if (!items.length) { event.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
}());
