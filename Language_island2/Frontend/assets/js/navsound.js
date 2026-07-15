document.addEventListener('DOMContentLoaded', function() {
  var navButtons = document.querySelectorAll('.nav-btn');
  
  // ---------- PAGE NAVIGATION SOUNDS ----------
  // Store the current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Sound for going to a page
  function playGoSound() {
    if (typeof Sound !== 'undefined') {
      Sound.pop();
      setTimeout(function() {
        Sound.hover();
      }, 100);
    }
  }
  
  // Sound for returning/back
  function playReturnSound() {
    if (typeof Sound !== 'undefined') Sound.match();
  }
  
  // Navigation click sounds with page transition effects
  navButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var targetPage = this.getAttribute('href');
      
      // Don't do anything if it's the current page
      if (targetPage === currentPage) {
        e.preventDefault();
        if (typeof Sound !== 'undefined') Sound.locked();
        // Shake animation
        this.style.animation = 'shake 0.3s ease';
        setTimeout(function() {
          btn.style.animation = '';
        }, 300);
        return;
      }
      
      // Play "going" sound
      playGoSound();
      
      // Visual feedback - page transition effect
      this.style.transform = 'scale(0.9)';
      this.style.background = '#FFD23F';
      this.style.color = '#2E2657';
      
      // Create a page transition flash effect
      var flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, #FFD23F88 0%, transparent 70%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        animation: pageFlash 0.5s ease-out forwards;
      `;
      document.body.appendChild(flash);
      
      setTimeout(function() {
        flash.remove();
      }, 600);
      
      // Allow navigation to proceed
      setTimeout(function() {
        btn.style.transform = '';
        btn.style.background = '';
        btn.style.color = '';
      }, 200);
    });
    
    // Hover effects
    btn.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        if (typeof Sound !== 'undefined') Sound.hover();
        this.style.transform = 'translateY(-3px) scale(1.02)';
        
        // Show tooltip about navigation
        var targetPage = this.getAttribute('href');
        if (targetPage !== currentPage) {
          this.title = 'Go to ' + targetPage.replace('.html', '');
        }
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // ---------- BROWSER BACK/FORWARD BUTTONS ----------
  window.addEventListener('popstate', function(e) {
    playReturnSound();
    
    var toast = document.getElementById('toast');
    if (toast) {
      var originalText = toast.textContent;
      toast.textContent = '🔙 Welcome back!';
      toast.style.background = '#6EC6FF';
      toast.classList.add('show');
      setTimeout(function() {
        toast.classList.remove('show');
        toast.textContent = originalText;
        toast.style.background = '';
      }, 1500);
    }
  });
  
  // ---------- PAGE TRANSITION ANIMATION ----------
  if (!document.getElementById('navStyles')) {
    var styleSheet = document.createElement('style');
    styleSheet.id = 'navStyles';
    styleSheet.textContent = `
      @keyframes pageFlash {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.5); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .page-enter {
        animation: pageEnter 0.4s ease-out forwards;
      }
      
      @keyframes pageEnter {
        0% { opacity: 0; transform: translateY(20px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      
      .page-exit {
        animation: pageExit 0.3s ease-in forwards;
      }
      
      @keyframes pageExit {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.9); }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // ---------- DETECT PAGE LOAD/RETURN ----------
  document.body.classList.add('page-enter');
  setTimeout(function() {
    document.body.classList.remove('page-enter');
  }, 500);
  
  if (performance.navigation && performance.navigation.type === 2) {
    playReturnSound();
    setTimeout(function() {
      var toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = '🔙 Welcome back to Language Island!';
        toast.style.background = '#58C27D';
        toast.classList.add('show');
        setTimeout(function() {
          toast.classList.remove('show');
          toast.style.background = '';
        }, 2000);
      }
    }, 300);
  }
  
  // ---------- KEYBOARD SHORTCUTS ----------
  document.addEventListener('keydown', function(e) {
    // Arrow keys for navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      var activeBtn = document.querySelector('.nav-btn.active');
      if (activeBtn) {
        var buttons = Array.from(document.querySelectorAll('.nav-btn'));
        var currentIndex = buttons.indexOf(activeBtn);
        var newIndex;
        
        if (e.key === 'ArrowRight') {
          newIndex = Math.min(currentIndex + 1, buttons.length - 1);
        } else {
          newIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (newIndex !== currentIndex) {
          var targetBtn = buttons[newIndex];
          if (targetBtn) {
            var href = targetBtn.getAttribute('href');
            if (href !== currentPage) {
              playGoSound();
              window.location.href = href;
            }
          }
        }
      }
    }
  });
  
  console.log('Navigation sounds loaded!');
  console.log('Current page:', currentPage);
});