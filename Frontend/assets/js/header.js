/* =========================================================
   HEADER.JS - 100% DB-Driven Authentication & Global State
   ========================================================= */

// 1. Global state for ALL pages to use
window.userLogStatus = false;
window.currentUserData = null;
window.currentEquippedSkin = 'default-catto';
window.currentEquippedTheme = 'default';

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

window.getCurrentTheme = function() {
  return window.currentEquippedTheme;
};

document.addEventListener('DOMContentLoaded', function() {
  initHeader();
});

function initHeader() {
  console.log('Header: Checking authentication...');
  
  // Auto-highlight active nav button
  highlightActiveNav();
  
  // Try to get user data from localStorage first (fast)
  try {
    var cachedUser = localStorage.getItem('languageIslandUser');
    if (cachedUser && cachedUser !== 'null' && cachedUser !== '') {
      var user = JSON.parse(cachedUser);
      window.currentUserData = user;
      window.userLogStatus = true;
      window.currentEquippedSkin = user.equipped_skin || 'default-catto';
      window.currentEquippedTheme = user.equipped_theme || 'default';
      
      // Update UI immediately with cached data
      updateHeaderUI(user);
      
      var authButtons = document.getElementById('authButtons');
      var userMenuWrapper = document.getElementById('userMenuWrapper');
      var coinsDisplay = document.querySelector('.coins-display');
      var starsDisplay = document.querySelector('.stars-display');
      if (authButtons) authButtons.style.display = 'none';
      if (userMenuWrapper) userMenuWrapper.style.display = 'flex';
      if (coinsDisplay) coinsDisplay.style.display = 'flex';
      if (starsDisplay) starsDisplay.style.display = 'flex';
      
      console.log('Header: Using cached user data');
    }
  } catch(e) {}
  
  // Use absolute path from root
  var apiUrl = '../Backend/check_session.php';
  console.log('Header: Fetching from:', apiUrl);
  
  fetch(apiUrl, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function(res) {
    console.log('Header: Response status:', res.status);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    return res.text(); // Use text first to see what's returned
  })
  .then(function(text) {
    console.log('Header: Raw response:', text.substring(0, 200));
    try {
      var data = JSON.parse(text);
      console.log('Header: Parsed data:', data);
      handleAuthResponse(data);
    } catch(e) {
      console.error('Header: Failed to parse JSON:', e);
      console.log('Header: Raw HTML response:', text);
      // If we can't parse JSON, use cached data
      if (!window.userLogStatus) {
        showLoggedOutUI();
      }
    }
  })
  .catch(function(err) {
    console.warn('Header: Server check failed:', err.message);
    if (!window.userLogStatus) {
      showLoggedOutUI();
    }
  });

  setupSidebar();
}

function handleAuthResponse(data) {
  var authButtons = document.getElementById('authButtons');
  var userMenuWrapper = document.getElementById('userMenuWrapper');
  var coinsDisplay = document.querySelector('.coins-display');
  var starsDisplay = document.querySelector('.stars-display');

  if (data.logged_in && data.user) {
    // --- LOGGED IN ---
    window.userLogStatus = true;
    window.currentUserData = data.user;
    window.currentEquippedSkin = data.user.equipped_skin || 'default-catto';
    window.currentEquippedTheme = data.user.equipped_theme || 'default';

    if (authButtons) authButtons.style.display = 'none';
    if (userMenuWrapper) userMenuWrapper.style.display = 'flex';
    if (coinsDisplay) coinsDisplay.style.display = 'flex';
    if (starsDisplay) starsDisplay.style.display = 'flex';

    updateHeaderUI(data.user);
    
    // Store in localStorage
    try {
      localStorage.setItem('languageIslandUser', JSON.stringify(data.user));
    } catch(e) {}
    
    // Trigger UI updates
    if (typeof window.renderHome === 'function') {
      console.log('Header: Calling renderHome()');
      window.renderHome();
    }
    
    if (typeof updateLoginStatus === 'function') {
      updateLoginStatus();
    }
    
    console.log('Header: User logged in:', data.user.first_name);
    
  } else {
    showLoggedOutUI();
  }
}

function showLoggedOutUI() {
  window.userLogStatus = false;
  window.currentUserData = null;
  window.currentEquippedSkin = 'default-catto';
  window.currentEquippedTheme = 'default';

  var authButtons = document.getElementById('authButtons');
  var userMenuWrapper = document.getElementById('userMenuWrapper');
  var coinsDisplay = document.querySelector('.coins-display');
  var starsDisplay = document.querySelector('.stars-display');
  
  if (authButtons) authButtons.style.display = 'flex';
  if (userMenuWrapper) userMenuWrapper.style.display = 'none';
  if (coinsDisplay) coinsDisplay.style.display = 'none';
  if (starsDisplay) starsDisplay.style.display = 'none';
  
  updateAllAvatars('imgs/profile/default-catto.png');
  
  try {
    localStorage.removeItem('languageIslandUser');
  } catch(e) {}
  
  console.log('Header: User not logged in');
}

// =========================================================
// Auto-highlight active nav button based on current URL
// =========================================================
function highlightActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  console.log('📍 Current page:', currentPage);
  
  var navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  
  navButtons.forEach(function(btn) {
    var btnPage = btn.getAttribute('href');
    if (btnPage === currentPage) {
      btn.classList.add('active');
      console.log('Active nav set for:', btnPage);
    }
  });
}

function updateHeaderUI(userDbData) {
  // 1. Balances
  var headerCoins = document.getElementById('headerCoins');
  var headerStars = document.getElementById('headerStars');
  if (headerCoins) headerCoins.innerText = userDbData.star_shells || 0;
  if (headerStars) headerStars.innerText = userDbData.total_stars || 0;

  // 2. Sidebar Info
  var sidebarUsername = document.getElementById('sidebarUsername');
  var sidebarEmail = document.getElementById('sidebarEmail');
  if (sidebarUsername) sidebarUsername.textContent = userDbData.first_name || 'Explorer';
  if (sidebarEmail) sidebarEmail.textContent = userDbData.email || '';

  // 3. Avatar Skin Update
  var currentSkin = userDbData.equipped_skin || 'default-catto';
  window.currentEquippedSkin = currentSkin;
  
  var skinPath = 'imgs/profile/' + currentSkin + '.png';
  
  updateAllAvatars(skinPath);
  
  // 4. Theme Update
  var currentTheme = userDbData.equipped_theme || 'default';
  window.currentEquippedTheme = currentTheme;
  
  applyTheme(currentTheme);
}

// Apply theme based on user preference
function applyTheme(theme) {
  document.body.classList.remove('theme-royal-purple');
  if (theme === 'purple-theme') {
    document.body.classList.add('theme-royal-purple');
  }
}

// Update ALL avatars across the entire site
function updateAllAvatars(skinPath) {
  console.log('Updating all avatars to:', skinPath);
  
  var fallbackPath = 'imgs/profile/default-catto.png';
  
  function setImageWithFallback(imgElement, path) {
    if (!imgElement) return;
    if (imgElement.dataset.fallbackAttempted === 'true') return;
    
    imgElement.src = path;
    imgElement.onerror = function() {
      if (this.dataset.fallbackAttempted === 'true') return;
      this.dataset.fallbackAttempted = 'true';
      this.src = fallbackPath;
      this.onerror = null;
    };
  }
  
  var headerAvatar = document.getElementById('userAvatarIcon');
  setImageWithFallback(headerAvatar, skinPath);
  
  var sidebarAvatar = document.getElementById('sidebarUserImage');
  setImageWithFallback(sidebarAvatar, skinPath);
  
  var profileAvatar = document.getElementById('cattoAvatar');
  setImageWithFallback(profileAvatar, skinPath);
  
  var gameCatto = document.getElementById('cattoImg');
  setImageWithFallback(gameCatto, skinPath);
  
  document.querySelectorAll('.user-avatar-icon, .sidebar-avatar-wrapper img, .profile-avatar-wrapper img, .catto-img-wrap img').forEach(function(el) {
    if (el.id !== 'cattoAvatar' && el.id !== 'userAvatarIcon' && el.id !== 'sidebarUserImage') {
      setImageWithFallback(el, skinPath);
    }
  });
  
  try {
    var event = new CustomEvent('skinChanged', { 
      detail: { skinPath: skinPath, skinName: window.currentEquippedSkin } 
    });
    document.dispatchEvent(event);
  } catch(e) {}
}

function setupSidebar() {
  var menuToggle = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  var sidebarOverlay = document.getElementById('sidebarOverlay');
  var sidebarClose = document.getElementById('sidebarClose');
  var logoutBtn = document.getElementById('menuLogout');

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
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var logoutUrl = '../Backend/logout.php';
      fetch(logoutUrl, { method: 'POST', credentials: 'include' })
        .then(function() {
          try { localStorage.removeItem('languageIslandUser'); } catch(e) {}
          window.location.href = 'index.html';
        })
        .catch(function() {
          window.location.href = 'index.html';
        });
    });
  }
}

// Expose functions globally
window.updateAllAvatars = updateAllAvatars;
window.applyTheme = applyTheme;

console.log('Header.js loaded successfully!');