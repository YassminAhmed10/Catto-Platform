/* =========================================================
   HOME.JS
   ========================================================= */

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  initHome();
}

function initHome() {

  // ============================================
  // LANGUAGE DATA - COMPLETE CONFIGURATION
  // ============================================
  var languages = {
    en: { 
      name: 'English', 
      flag: 'fi-gb', 
      color: '#012169', 
      path: 'english', 
      video: 'imgs/Catto_Videos/Catto_English.webm',
      greeting: 'Hello my friend! I am Catto! ',
      shortGreeting: 'Hello!',
      sound: 'Sounds/Hello.mp3'
    },
    fr: { 
      name: 'French', 
      flag: 'fi-fr', 
      color: '#002395', 
      path: 'french', 
      video: 'imgs/Catto_Videos/Catto_French.webm',
      greeting: 'Bonjour mon ami! Je suis Catto! ',
      shortGreeting: 'Bonjour!',
      sound: 'Sounds/Bonjour mon ami, je suis Catto.mp3'
    },
    es: { 
      name: 'Spanish', 
      flag: 'fi-es', 
      color: '#C60B1E', 
      path: 'spanish', 
      video: 'imgs/Catto_Videos/Catto_Spain.webm',
      greeting: '¡Hola amigo! Soy Catto! ',
      shortGreeting: '¡Hola!',
      sound: 'Sounds/Hola.mp3'
    },
    it: { 
      name: 'Italian', 
      flag: 'fi-it', 
      color: '#009246', 
      path: 'italian', 
      video: 'imgs/Catto_Videos/Catto_Italy.webm',
      greeting: 'Ciao amico! Sono Catto! ',
      shortGreeting: 'Ciao!',
      sound: 'Sounds/Ciao.mp3'
    },
    de: { 
      name: 'German', 
      flag: 'fi-de', 
      color: '#DD0000', 
      path: 'german', 
      video: 'imgs/Catto_Videos/Catto_German.webm',
      greeting: 'Hallo mein Freund! Ich bin Catto! ',
      shortGreeting: 'Hallo!',
      sound: 'Sounds/Hallo.mp3'
    },
    ar: { 
      name: 'Arabic', 
      flag: 'fi-eg', 
      color: '#CE1126', 
      path: 'arabic', 
      video: 'imgs/Catto_Videos/Catto_Egypt.webm',
      greeting: 'مرحباً يا صديقي! أنا كاتو! ',
      shortGreeting: 'مرحباً!',
      sound: 'Sounds/مرحبا صديقي.wav'
    }
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  var state = {
    currentLang: 'en',
    isPlaying: false,
    currentAudio: null,
    messageTimeout: null
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  var langNavBtns = document.querySelectorAll('.lang-nav-btn');
  var catVideo = document.getElementById('catVideo');
  var meetVideo = document.querySelector('.meet-video video');
  var speechBubble = document.getElementById('speechBubble');
  var speechText = document.getElementById('speechText');

  // ============================================
  // VIDEO CONTROL FUNCTIONS
  // ============================================
  
  function updateMainVideo(langKey) {
    var lang = languages[langKey];
    if (!lang || !lang.video || !catVideo) return;
    
    catVideo.src = lang.video;
    catVideo.load();
    catVideo.className = 'catto-video lang-' + langKey;
    
    catVideo.play().catch(function(e) {
      setTimeout(function() {
        catVideo.play().catch(function() {});
      }, 300);
    });
    
    catVideo.classList.remove('talking');
    void catVideo.offsetWidth;
    catVideo.classList.add('talking');
  }

  function updateMeetVideo(langKey) {
    var lang = languages[langKey];
    if (!lang || !lang.video || !meetVideo) return;
    
    meetVideo.src = lang.video;
    meetVideo.load();
    meetVideo.className = 'lang-' + langKey;
    
    meetVideo.play().catch(function(e) {
      setTimeout(function() {
        meetVideo.play().catch(function() {});
      }, 300);
    });
  }

  function updateAllVideos(langKey) {
    updateMainVideo(langKey);
    updateMeetVideo(langKey);
  }

  // ============================================
  // AUDIO CONTROL FUNCTIONS
  // ============================================
  
  function stopAudio() {
    if (state.currentAudio) {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
      state.currentAudio = null;
    }
  }

  function playGreetingSound(langKey) {
    var lang = languages[langKey];
    if (!lang || !lang.sound) return;
    
    stopAudio();
    
    try {
      var audio = new Audio(lang.sound);
      audio.volume = 0.8;
      state.currentAudio = audio;
      
      audio.play().catch(function(e) {
        console.log('Sound play failed:', e);
        state.currentAudio = null;
      });
    } catch(e) {
      console.log('Audio error:', e);
    }
  }

  // ============================================
  // SHOW GREETING MESSAGE
  // ============================================
  function showGreetingMessage(langKey) {
    var lang = languages[langKey];
    if (!lang) return;
    
    if (state.messageTimeout) {
      clearTimeout(state.messageTimeout);
      state.messageTimeout = null;
    }
    
    if (speechText) {
      speechText.textContent = lang.greeting;
      speechText.style.color = lang.color;
    }
    
    if (speechBubble) {
      speechBubble.style.borderColor = lang.color;
      speechBubble.classList.add('show');
    }
    
    state.messageTimeout = setTimeout(function() {
      if (speechBubble) {
        speechBubble.classList.remove('show');
      }
      state.messageTimeout = null;
    }, 5000);
  }

  // ============================================
  // MAIN LANGUAGE SWITCH FUNCTION
  // ============================================
  function switchLanguage(langKey) {
    if (langKey === state.currentLang && state.isPlaying) {
      return;
    }
    
    stopAudio();
    
    state.currentLang = langKey;
    state.isPlaying = true;
    
    updateAllVideos(langKey);
    playGreetingSound(langKey);
    showGreetingMessage(langKey);
    
    setTimeout(function() {
      state.isPlaying = false;
    }, 6000);
  }

  // ============================================
  // CHECK LOGIN STATUS
  // ============================================
  function isUserLoggedIn() {
    try {
      var user = localStorage.getItem('languageIslandUser');
      return user !== null && user !== 'null' && user !== '';
    } catch(e) {
      return false;
    }
  }

  function getCurrentUser() {
    try {
      var user = localStorage.getItem('languageIslandUser');
      if (user && user !== 'null' && user !== '') {
        return JSON.parse(user);
      }
    } catch(e) {}
    return null;
  }

  // ============================================
  // TOAST
  // ============================================
  function showToast(message, isSuccess) {
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      if (isSuccess) {
        toast.style.background = '#58C27D';
      } else {
        toast.style.background = '#2E2657';
      }
      clearTimeout(toast._timer);
      toast._timer = setTimeout(function() {
        toast.classList.remove('show');
        toast.style.background = '';
      }, 2500);
    }
  }

  // ============================================
  // LANGUAGE NAVBAR - CLICK HANDLERS
  // ============================================
  if (langNavBtns.length > 0) {
    langNavBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var lang = this.dataset.lang;
        
        langNavBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        
        switchLanguage(lang);
        
        try {
          localStorage.setItem('selectedLanguage', lang);
        } catch(e) {}
      });
      
      btn.addEventListener('mouseenter', function() {
        if (typeof Sound !== 'undefined') Sound.hover();
      });
    });
  }

  // ============================================
  // CLICK ON CATTO VIDEO - RANDOM GREETING
  // ============================================
  if (catVideo) {
    catVideo.addEventListener('click', function() {
      var langKeys = Object.keys(languages);
      var randomLang = langKeys[Math.floor(Math.random() * langKeys.length)];
      
      langNavBtns.forEach(function(b) {
        b.classList.remove('active');
        if (b.dataset.lang === randomLang) {
          b.classList.add('active');
        }
      });
      
      switchLanguage(randomLang);
      
      if (typeof Sound !== 'undefined') Sound.pop();
    });
  }

  // ============================================
  // AUTO-PLAY FIRST GREETING
  // ============================================
  setTimeout(function() {
    var activeBtn = document.querySelector('.lang-nav-btn.active');
    var lang = activeBtn ? activeBtn.dataset.lang : 'en';
    
    try {
      var saved = localStorage.getItem('selectedLanguage');
      if (saved) {
        var savedBtn = document.querySelector('.lang-nav-btn[data-lang="' + saved + '"]');
        if (savedBtn) {
          langNavBtns.forEach(function(b) { b.classList.remove('active'); });
          savedBtn.classList.add('active');
          lang = saved;
        }
      }
    } catch(e) {}
    
    var langData = languages[lang];
    if (langData && speechText) {
      speechText.textContent = langData.greeting;
      speechText.style.color = langData.color;
    }
    if (speechBubble) {
      speechBubble.style.borderColor = langData.color;
      speechBubble.classList.add('show');
    }
    
    state.messageTimeout = setTimeout(function() {
      if (speechBubble) {
        speechBubble.classList.remove('show');
      }
      state.messageTimeout = null;
    }, 5000);
    
    updateAllVideos(lang);
    
  }, 800);

  // ============================================
  // MODAL HELPERS
  // ============================================
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (typeof Sound !== 'undefined') Sound.pop();
      console.log('Modal opened:', modalId);
    } else {
      console.error('Modal not found:', modalId);
    }
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      console.log(' Modal closed:', modalId);
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(function(m) {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  // ============================================
  // SHOW LOGIN REQUIRED MODAL (Guest mode)
  // ============================================
  function showLoginRequiredModal() {
    console.log('Showing login required modal');
    openModal('loginRequiredModal');
  }

  // ============================================
  // SHOW LANGUAGE SELECTION MODAL (User mode)
  // ============================================
  function showLanguageSelectionModal() {
    console.log('Showing language selection modal');
    var grid = document.getElementById('languageGridModal');
    if (!grid) {
      console.error('languageGridModal not found!');
      return;
    }
    
    var langImages = {
      ar: 'imgs/buttons/arabic.png',
      en: 'imgs/buttons/English.png',
      fr: 'imgs/buttons/French.png',
      de: 'imgs/buttons/GermanCatto.png',
      it: 'imgs/buttons/Italy.png',
      es: 'imgs/buttons/Spain.png'
    };

    // Fixed order so the 3x2 grid always looks the same
    var displayOrder = ['en', 'es', 'fr', 'de', 'it', 'ar'];
    
    var html = '';
    displayOrder.forEach(function(key) {
      var lang = languages[key];
      if (!lang) return;
      var imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-image-btn interactive" data-lang="${key}" type="button">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    });
    grid.innerHTML = html;
    
    grid.querySelectorAll('.lang-image-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var langKey = this.dataset.lang;
        var lang = languages[langKey];
        if (!lang) return;

        if (typeof Sound !== 'undefined') Sound.pop();
        closeModal('languageModal');

        // Remember the choice for next visit too
        try {
          localStorage.setItem('selectedLanguage', langKey);
        } catch(e) {}

        // Language pages live at the site root ,
        window.location.href = lang.path + '.html';
      });
    });
    
    openModal('languageModal');
  }

  // ============================================
  // UNIFIED BUTTON HANDLER
  // ============================================
  function handleStartLearning(buttonName) {
    console.log('' + buttonName + ' clicked - User logged in?', isUserLoggedIn());
    if (typeof Sound !== 'undefined') Sound.pop();
    
    if (isUserLoggedIn()) {
      console.log('User is logged in - showing language modal');
      showLanguageSelectionModal();
    } else {
      console.log(' User is guest - showing login modal');
      showLoginRequiredModal();
    }
  }

  // ============================================
  // "LET'S LEARN" BUTTON
  // ============================================
  var startBtn = document.getElementById('startBtn');
  if (startBtn) {
    console.log('startBtn found');
    startBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleStartLearning('Let\'s Learn');
    });
  } else {
    console.warn('startBtn not found!');
  }

  // ============================================
  // START YOUR ADVENTURE BUTTON
  // ============================================
  var meetBtn = document.getElementById('meetCattoBtn');
  if (meetBtn) {
    console.log('meetCattoBtn found');
    meetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleStartLearning('Start Your Adventure!');
    });
  } else {
    console.warn('meetCattoBtn not found! Check the ID in HTML.');
  }

  // ============================================
  // MODAL CLOSE HANDLERS
  // ============================================
  var loginModalClose = document.getElementById('loginModalClose');
  if (loginModalClose) {
    loginModalClose.addEventListener('click', function() {
      closeModal('loginRequiredModal');
    });
  }

  var loginModal = document.getElementById('loginRequiredModal');
  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal('loginRequiredModal');
      }
    });
  }

  var languageModalClose = document.getElementById('languageModalClose');
  if (languageModalClose) {
    languageModalClose.addEventListener('click', function() {
      closeModal('languageModal');
    });
  }

  var languageModal = document.getElementById('languageModal');
  if (languageModal) {
    languageModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal('languageModal');
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // ============================================
  // SOUND SYSTEM
  // ============================================
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    setTimeout(function() {
      Sound._init();
    }, 200);
  }

  // ============================================
  // CHECK IF USER JUST SIGNED IN
  // ============================================
  var justSignedIn = sessionStorage.getItem('justSignedIn');
  if (justSignedIn === 'true') {
    sessionStorage.removeItem('justSignedIn');
    setTimeout(function() {
      if (isUserLoggedIn()) {
        showToast('Welcome back!', true);
      }
    }, 300);
  }

  var justSignedUp = sessionStorage.getItem('justSignedUp');
  if (justSignedUp === 'true') {
    sessionStorage.removeItem('justSignedUp');
    setTimeout(function() {
      if (isUserLoggedIn()) {
        showToast('Welcome to Language Island!', true);
      }
    }, 300);
  }

  // ============================================
  // RENDER HOME - Called by header.js
  // ============================================
  window.renderHome = function() {
    var user = getCurrentUser();
    if (!user) return;

    if (speechText && user.first_name) {
      speechText.textContent = 'Welcome back, ' + user.first_name + '!';
    }
    
    console.log('Home page updated for user:', user.first_name);
  };

  // ============================================
  // MAKE FUNCTIONS AVAILABLE GLOBALLY
  // ============================================
  window.showToast = showToast;
  window.showLoginRequiredModal = showLoginRequiredModal;
  window.showLanguageSelectionModal = showLanguageSelectionModal;
  window.switchLanguage = switchLanguage;
  window.getCurrentUser = getCurrentUser;
  window.isUserLoggedIn = isUserLoggedIn;
  window.updateAllVideos = updateAllVideos;

  console.log('Home page loaded with all features!');
  console.log('Available buttons:', {
    startBtn: document.getElementById('startBtn'),
    meetCattoBtn: document.getElementById('meetCattoBtn')
  });
}