// ============================================
// UI VISUAL STATE MANAGER (Real Backend + Enhanced UI)
// ============================================

const Auth = {
  // Storage key we will use to check if PHP logged us in
  STORAGE_KEY: 'languageIslandUser',
  
  _currentUser: null,
  _isLoggedIn: false,
  
  init() {
    this.loadSession(); // paint instantly from cache so the UI doesn't flash
    this.updateUI();
    this.setupProtectedContent();
    this.verifySessionWithServer(); // then confirm the session is REAL
    console.log('UI Auth system initialized!');
  },

  // Asks the server "is my session actually still valid?" instead of
  // trusting localStorage forever.
  verifySessionWithServer() {
    fetch('../Backend/check_session.php')
      .then(res => res.json())
      .then(data => {
        if (data.logged_in) {
          // Refresh the cached copy
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data.user));
          this._currentUser = data.user;
          this._isLoggedIn = true;
          this.updateUI();
          // Update header displays with server data
          this.updateHeaderDisplays(data.user.star_shells || 0, data.user.total_stars || 0);
        } else if (this._isLoggedIn) {
          console.warn('Session expired or invalid on the server — logging out locally.');
          this.clearSession();
        }
      })
      .catch(err => {
        console.warn('Could not verify session with server:', err);
      });
  },
  
  // Checks if our PHP fetch script saved the user locally
  loadSession() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        this._currentUser = user;
        this._isLoggedIn = true;
        // Update header displays from cached user data
        this.updateHeaderDisplays(user.star_shells || 0, user.total_stars || 0);
        return true;
      } catch (e) {
        this.clearSession();
        return false;
      }
    }
    return false;
  },
  
  clearSession() {
    localStorage.removeItem(this.STORAGE_KEY);
    this._currentUser = null;
    this._isLoggedIn = false;
    this.updateUI();
    // Hide coin/star displays when logged out
    this.updateHeaderDisplays(0, 0, true);
  },
  
  getCurrentUser() {
    return this._currentUser;
  },
  
  isLoggedIn() {
    return this._isLoggedIn;
  },
  
  logout() {
    fetch('../Backend/logout.php', { method: 'POST' })
      .catch(err => console.warn('Could not reach logout endpoint:', err))
      .finally(() => {
        this.clearSession();
        window.location.href = 'index.html';
      });
  },

  getRoadmapProgress() {
    return JSON.parse(localStorage.getItem('roadmapProgress')) || {}; 
  },

  saveRoadmapProgress(progress) {
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
  },
  
  // ============================================
  // HEADER DISPLAY UPDATES
  // ============================================
  updateHeaderDisplays(starShells, totalStars, hide = false) {
    const coinsDisplay = document.getElementById('headerCoins');
    const starsDisplay = document.getElementById('headerStars');
    const coinsPill = document.querySelector('.coins-display');
    const starsPill = document.querySelector('.stars-display');
    
    if (hide) {
      if (coinsPill) coinsPill.style.display = 'none';
      if (starsPill) starsPill.style.display = 'none';
      return;
    }
    
    if (coinsDisplay) coinsDisplay.textContent = starShells || 0;
    if (starsDisplay) starsDisplay.textContent = totalStars || 0;
    if (coinsPill) coinsPill.style.display = 'flex';
    if (starsPill) starsPill.style.display = 'flex';
  },
  
  // ============================================
  // UI UPDATES 
  // ============================================
  updateUI() {
    const isLoggedIn = this.isLoggedIn();
    const user = this.getCurrentUser();
    
    const authButtons = document.getElementById('authButtons');
    if (authButtons) {
      if (isLoggedIn) {
        authButtons.innerHTML = '';
        authButtons.style.display = 'none';
      } else {
        authButtons.style.display = 'flex';
        authButtons.innerHTML = `
          <a href="signin.html" class="auth-btn login interactive">Sign In</a>
          <a href="signup.html" class="auth-btn signup interactive">Sign Up</a>
        `;
      }
    }
    
    this.updateSidebar(isLoggedIn, user);
    this.updateProtectedContent(isLoggedIn);
    this.updateRoadmapLock(isLoggedIn);
  },
  
  updateSidebar(isLoggedIn, user) {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const userAvatarIcon = document.getElementById('userAvatarIcon');
    
    if (isLoggedIn && user) {
      if (sidebar) {
          sidebar.style.display = 'flex';
          sidebar.classList.remove('open');
      }
      if (menuToggle) menuToggle.style.display = 'flex';
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      
      // Update sidebar avatar - ALWAYS USE PROFILE FOLDER
      const sidebarUserImage = document.getElementById('sidebarUserImage');
      if (sidebarUserImage) {
        const skin = user.equipped_skin || user.equippedSkin || 'default-catto';
        // ONLY use profile folder
        const skinPath = `imgs/profile/${skin}.png`;
        sidebarUserImage.src = skinPath;
        sidebarUserImage.onerror = function() {
          console.warn('Sidebar avatar not found, using default');
          this.src = 'imgs/profile/default-catto.png';
          this.onerror = null;
        };
      }
      
      // Update header avatar - ALWAYS USE PROFILE FOLDER
      if (userAvatarIcon) {
        const skin = user.equipped_skin || user.equippedSkin || 'default-catto';
        const skinPath = `imgs/profile/${skin}.png`;
        userAvatarIcon.src = skinPath;
        userAvatarIcon.onerror = function() {
          console.warn('Header avatar not found, using default');
          this.src = 'imgs/profile/default-catto.png';
          this.onerror = null;
        };
      }
      
      const username = document.getElementById('sidebarUsername');
      const email = document.getElementById('sidebarEmail');
      
      if (username) username.textContent = user.first_name || user.firstName || 'Explorer';
      if (email) email.textContent = user.email || '';
      
    } else {
      if (sidebar) {
          sidebar.style.display = 'none';
          sidebar.classList.remove('open');
      }
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      if (menuToggle) menuToggle.style.display = 'none';
      
      // Reset avatar to default - USE PROFILE FOLDER
      if (userAvatarIcon) {
        userAvatarIcon.src = 'imgs/profile/default-catto.png';
        userAvatarIcon.onerror = null;
      }
      
      // Reset sidebar avatar
      const sidebarUserImage = document.getElementById('sidebarUserImage');
      if (sidebarUserImage) {
        sidebarUserImage.src = 'imgs/profile/default-catto.png';
        sidebarUserImage.onerror = null;
      }
    }
  },
  
  updateProtectedContent(isLoggedIn) {
    document.querySelectorAll('.protected-content').forEach(el => {
      if (isLoggedIn) {
        el.style.display = '';
        el.style.pointerEvents = '';
      } else {
        el.style.display = 'none';
      }
    });
  },
  
  updateRoadmapLock(isLoggedIn) {
    const roadmapContainer = document.getElementById('roadmapContainer');
    const roadmapLock = document.getElementById('roadmapLockOverlay');
    
    if (!isLoggedIn && roadmapContainer) {
      if (!roadmapLock) {
        const overlay = document.createElement('div');
        overlay.id = 'roadmapLockOverlay';
        overlay.className = 'roadmap-lock-overlay';
        overlay.innerHTML = `
          <div class="lock-content">
            <i class="fas fa-lock"></i>
            <h3>Unlock Your Learning Journey</h3>
            <p>Create an account or sign in to start learning!</p>
            <div class="lock-buttons">
              <a href="signup.html" class="auth-btn signup">Sign Up</a>
              <a href="signin.html" class="auth-btn login">Sign In</a>
            </div>
          </div>
        `;
        roadmapContainer.style.position = 'relative';
        roadmapContainer.appendChild(overlay);
      }
      roadmapContainer.classList.add('locked');
    } else if (isLoggedIn && roadmapContainer) {
      roadmapContainer.classList.remove('locked');
      const overlay = document.getElementById('roadmapLockOverlay');
      if (overlay) overlay.remove();
    }
  },
  
  setupProtectedContent() {
    const protectedSections = ['.levels-section', '.language-selection', '.roadmap-container', '#lessonModalBackdrop'];
    protectedSections.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.classList.add('protected-content'));
    });

    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        if (!Auth.isLoggedIn()) {
          e.preventDefault();
          Auth.showLoginPrompt();
        }
      });
    }
  },

  // ============================================
  // LOGIN PROMPT MODAL
  // ============================================
  showLoginPrompt() {
    if (this.isLoggedIn()) return;
    
    let modal = document.getElementById('loginPromptModal');
    if (modal) { 
        if (typeof Overlay !== 'undefined') {
            Overlay.open(modal, { panel: '.login-prompt-card' }); 
        } else {
            modal.classList.add('open');
        }
        return; 
    }
    
    modal = document.createElement('div');
    modal.id = 'loginPromptModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card login-prompt-card">
        <button class="modal-close interactive" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-catto-image">
          <img src="imgs/Cattoimages/Catto_Login.png" alt="Catto" onerror="this.style.display='none'">
        </div>
        <h2 class="modal-title">Sign In Required</h2>
        <p class="modal-subtitle">Please sign in or create an account to continue!</p>
        <div class="modal-actions">
          <a href="signin.html" class="cta-btn interactive">Sign In <i class="fas fa-arrow-right"></i></a>
          <a href="signup.html" class="cta-btn secondary interactive">Create Account <i class="fas fa-user-plus"></i></a>
        </div>
        <button class="login-prompt-dismiss" style="background:none;border:none;color:#8C87A8;font-size:13px;cursor:pointer;margin-top:12px;text-decoration:underline;">
          Maybe later
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const close = function () { 
        if (typeof Overlay !== 'undefined') {
            Overlay.close(modal); 
        } else {
            modal.classList.remove('open');
        }
        setTimeout(() => modal.remove(), 220); 
        if (typeof Sound !== 'undefined') Sound.pop();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.login-prompt-dismiss').addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
    
    if (typeof Sound !== 'undefined') Sound.pop();
    if (typeof Overlay !== 'undefined') {
      Overlay.open(modal, { panel: '.login-prompt-card' });
    } else {
      modal.classList.add('open');
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() { 
  Auth.init(); 
});

// Also re-init on pageshow (for back/forward cache)
window.addEventListener('pageshow', function() { 
  Auth.init(); 
});

// Expose Auth globally for other scripts
window.Auth = Auth;