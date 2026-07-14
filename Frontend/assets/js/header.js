/* =========================================================
   HEADER.JS - 100% DB-Driven Authentication & Global State
   ========================================================= */

// 1. Global state for ALL pages to use
window.userLogStatus = false;
window.currentUserData = null;
window.currentEquippedSkin = 'default-catto';

// Global functions that other pages rely on
window.isUserLoggedIn = function() {
  return window.userLogStatus;
};

window.getCurrentUser = function() {
  return window.currentUserData;
};

window.getCurrentSkin = function() {
  return window.currentEquippedSkin;
};

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

function initHeader() {
  console.log('Header: Checking authentication...');
  
  // --- NEW: Auto-highlight active nav button ---
  highlightActiveNav();
  
  fetch('../Backend/get_profile.php')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('Header: Auth response received:', data);
      
      const authButtons = document.getElementById('authButtons');
      const userMenuWrapper = document.getElementById('userMenuWrapper');
      const coinsDisplay = document.querySelector('.coins-display');
      const starsDisplay = document.querySelector('.stars-display');

      if (data.success && data.data) {
        // --- LOGGED IN ---
        window.userLogStatus = true;
        window.currentUserData = data.data;
        window.currentEquippedSkin = data.data.equipped_skin || 'default-catto';

        if (authButtons) authButtons.style.display = 'none';
        if (userMenuWrapper) userMenuWrapper.style.display = 'flex';
        if (coinsDisplay) coinsDisplay.style.display = 'flex';
        if (starsDisplay) starsDisplay.style.display = 'flex';

        updateHeaderUI(data.data);
        
        // Trigger UI updates on other pages
        if (typeof window.renderHome === 'function') {
          console.log('Header: Calling renderHome()');
          window.renderHome();
        }
        
        if (typeof updateLoginStatus === 'function') {
          updateLoginStatus();
        }
        
        console.log('Header: User logged in:', data.data.first_name);
        
      } else {
        // --- NOT LOGGED IN ---
        window.userLogStatus = false;
        window.currentUserData = null;
        window.currentEquippedSkin = 'default-catto';

        if (authButtons) authButtons.style.display = 'flex';
        if (userMenuWrapper) userMenuWrapper.style.display = 'none';
        if (coinsDisplay) coinsDisplay.style.display = 'none';
        if (starsDisplay) starsDisplay.style.display = 'none';
        
        // Reset avatars to default
        updateAllAvatars('imgs/profile/default-catto.png');
        
        console.log('Header: User not logged in');
      }
    })
    .catch(err => {
      console.error("Header: DB check failed:", err);
    });

  setupSidebar();
}

// =========================================================
// NEW: Auto-highlight active nav button based on current URL
// =========================================================
function highlightActiveNav() {
  // Get current page filename (e.g., 'books.html', 'games.html')
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  console.log('📍 Current page:', currentPage);
  
  // Get all nav buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  
  // First, remove 'active' class from all buttons
  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Then add 'active' to the matching button
  navButtons.forEach(btn => {
    const btnPage = btn.getAttribute('href');
    if (btnPage === currentPage) {
      btn.classList.add('active');
      console.log('✅ Active nav set for:', btnPage);
    }
  });
}

function updateHeaderUI(userDbData) {
  // 1. Balances
  const headerCoins = document.getElementById('headerCoins');
  const headerStars = document.getElementById('headerStars');
  if (headerCoins) headerCoins.innerText = userDbData.star_shells || 0;
  if (headerStars) headerStars.innerText = userDbData.total_stars || 0;

  // 2. Sidebar Info
  const sidebarUsername = document.getElementById('sidebarUsername');
  const sidebarEmail = document.getElementById('sidebarEmail');
  if (sidebarUsername) sidebarUsername.textContent = userDbData.first_name || 'Explorer';
  if (sidebarEmail) sidebarEmail.textContent = userDbData.email || '';

  // 3. Avatar Skin Update - ALWAYS use profile folder
  const currentSkin = userDbData.equipped_skin || 'default-catto';
  window.currentEquippedSkin = currentSkin;
  
  // ONLY use profile folder, never Cattoimages
  const skinPath = `imgs/profile/${currentSkin}.png`;
  
  updateAllAvatars(skinPath);
}

// Update ALL avatars across the entire site - ONLY use profile folder
function updateAllAvatars(skinPath) {
  console.log('Updating all avatars to:', skinPath);
  
  // ALWAYS use profile folder for fallback
  const fallbackPath = 'imgs/profile/default-catto.png';
  
  function setImageWithFallback(imgElement, path) {
    if (!imgElement) return;
    
    // Prevent infinite loop
    if (imgElement.dataset.fallbackAttempted === 'true') {
      return;
    }
    
    imgElement.src = path;
    imgElement.onerror = function() {
      if (this.dataset.fallbackAttempted === 'true') {
        return;
      }
      
      this.dataset.fallbackAttempted = 'true';
      console.warn('Image not found:', path, 'using default');
      
      // Always use profile folder fallback
      this.src = fallbackPath;
      this.onerror = null;
    };
  }
  
  // Header avatar
  const headerAvatar = document.getElementById('userAvatarIcon');
  setImageWithFallback(headerAvatar, skinPath);
  
  // Sidebar avatar
  const sidebarAvatar = document.getElementById('sidebarUserImage');
  setImageWithFallback(sidebarAvatar, skinPath);
  
  // Profile page avatar
  const profileAvatar = document.getElementById('cattoAvatar');
  setImageWithFallback(profileAvatar, skinPath);
  
  // Games page companion Catto
  const gameCatto = document.getElementById('cattoImg');
  setImageWithFallback(gameCatto, skinPath);
  
  // Any other avatars on the page
  document.querySelectorAll('.user-avatar-icon, .sidebar-avatar-wrapper img, .profile-avatar-wrapper img, .catto-img-wrap img').forEach(el => {
    if (el.id !== 'cattoAvatar' && el.id !== 'userAvatarIcon' && el.id !== 'sidebarUserImage') {
      setImageWithFallback(el, skinPath);
    }
  });
  
  // Dispatch event for other pages to update their Catto companions
  try {
    const event = new CustomEvent('skinChanged', { 
      detail: { skinPath: skinPath, skinName: window.currentEquippedSkin } 
    });
    document.dispatchEvent(event);
    console.log('Dispatched skinChanged event');
  } catch(e) {
    console.warn('Could not dispatch skinChanged event:', e);
  }
  
  // Store in localStorage for quick access
  try {
    localStorage.setItem('currentSkin', skinPath);
    localStorage.setItem('currentSkinName', window.currentEquippedSkin);
  } catch(e) {}
}

// Apply skin from localStorage on page load (instant)
function applyCachedSkin() {
  try {
    const cachedSkinPath = localStorage.getItem('currentSkin');
    const cachedSkinName = localStorage.getItem('currentSkinName');
    
    if (cachedSkinPath) {
      // Make sure it's a profile path
      const fixedPath = cachedSkinPath.replace('imgs/Cattoimages/', 'imgs/profile/');
      updateAllAvatars(fixedPath);
      
      // Update global state
      if (cachedSkinName) {
        window.currentEquippedSkin = cachedSkinName;
      }
    }
  } catch(e) {}
}

// Call on load
setTimeout(applyCachedSkin, 100);

function setupSidebar() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');
  const logoutBtn = document.getElementById('menuLogout');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }

  if (menuToggle) menuToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fetch('../Backend/logout.php', { method: 'POST' })
        .then(() => {
          try {
            localStorage.removeItem('currentSkin');
            localStorage.removeItem('currentSkinName');
            localStorage.removeItem('languageIslandUser');
          } catch(e) {}
          window.location.href = 'index.html';
        })
        .catch(() => {
          window.location.href = 'index.html';
        });
    });
  }
}

// Expose functions globally
window.updateAllAvatars = updateAllAvatars;
window.applyCachedSkin = applyCachedSkin;

console.log('✅ Header.js loaded successfully!');