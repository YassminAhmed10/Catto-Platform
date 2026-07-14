/* =========================================================
   HOME.JS - Merged UI and Media Functionality (DB-Driven)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // LANGUAGE DATA - COMPLETE CONFIGURATION
  // ============================================
  const languages = {
    en: { 
      name: 'English', 
      flag: 'fi-gb', 
      color: '#012169', 
      path: 'english', 
      video: 'imgs/Catto_Videos/Catto_English.webm',
      greeting: 'Hello my friend! I am Catto! 🐱',
      shortGreeting: 'Hello!',
      sound: 'Sounds/Hello.mp3'
    },
    fr: { 
      name: 'French', 
      flag: 'fi-fr', 
      color: '#002395', 
      path: 'french', 
      video: 'imgs/Catto_Videos/Catto_French.webm',
      greeting: 'Bonjour mon ami! Je suis Catto! 🐱',
      shortGreeting: 'Bonjour!',
      sound: 'Sounds/Bonjour mon ami, je suis Catto.mp3'
    },
    es: { 
      name: 'Spanish', 
      flag: 'fi-es', 
      color: '#C60B1E', 
      path: 'spanish', 
      video: 'imgs/Catto_Videos/Catto_Spain.webm',
      greeting: '¡Hola amigo! Soy Catto! 🐱',
      shortGreeting: '¡Hola!',
      sound: 'Sounds/Hola.mp3'
    },
    it: { 
      name: 'Italian', 
      flag: 'fi-it', 
      color: '#009246', 
      path: 'italian', 
      video: 'imgs/Catto_Videos/Catto_Italy.webm',
      greeting: 'Ciao amico! Sono Catto! 🐱',
      shortGreeting: 'Ciao!',
      sound: 'Sounds/Ciao.mp3'
    },
    de: { 
      name: 'German', 
      flag: 'fi-de', 
      color: '#DD0000', 
      path: 'german', 
      video: 'imgs/Catto_Videos/Catto_German.webm',
      greeting: 'Hallo mein Freund! Ich bin Catto! 🐱',
      shortGreeting: 'Hallo!',
      sound: 'Sounds/Hallo.mp3'
    },
    ar: { 
      name: 'Arabic', 
      flag: 'fi-eg', 
      color: '#CE1126', 
      path: 'arabic', 
      video: 'imgs/Catto_Videos/Catto_Egypt.webm',
      greeting: 'مرحباً يا صديقي! أنا كاتو! 🐱',
      shortGreeting: 'مرحباً!',
      sound: 'Sounds/مرحبا صديقي.wav'
    }
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const state = {
    currentLang: 'en',
    isPlaying: false,
    currentAudio: null,
    currentVideo: null,
    messageTimeout: null
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================
  const langNavBtns = document.querySelectorAll('.lang-nav-btn');
  const catVideo = document.getElementById('catVideo');
  const speechBubble = document.getElementById('speechBubble');
  const speechText = document.getElementById('speechText');

  // ============================================
  // MEDIA CONTROL FUNCTIONS
  // ============================================
  
  function stopVideo() {
    if (catVideo) {
      catVideo.pause();
      catVideo.currentTime = 0;
      catVideo.src = '';
      catVideo.load();
    }
  }

  function stopAudio() {
    if (state.currentAudio) {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
      state.currentAudio = null;
    }
  }

  function stopAllMedia() {
    stopVideo();
    stopAudio();
    
    if (state.messageTimeout) {
      clearTimeout(state.messageTimeout);
      state.messageTimeout = null;
    }
    
    if (speechBubble) {
      speechBubble.classList.remove('show');
    }
    
    state.isPlaying = false;
  }

  function playGreetingSound(langKey) {
    const lang = languages[langKey];
    if (!lang || !lang.sound) return;
    
    stopAudio();
    
    try {
      const audio = new Audio(lang.sound);
      audio.volume = 0.8;
      state.currentAudio = audio;
      
      audio.play().catch(e => {
        console.log('Sound play failed:', e);
        state.currentAudio = null;
      });
    } catch(e) {
      console.log('Audio error:', e);
    }
  }

  function playGreetingVideo(langKey) {
    const lang = languages[langKey];
    if (!lang || !lang.video) return;
    
    stopVideo();
    
    if (!catVideo) return;
    
    catVideo.src = lang.video;
    catVideo.load();
    
    catVideo.play().catch(e => {
      console.log('Video autoplay blocked:', e);
      setTimeout(() => catVideo.play().catch(() => {}), 300);
    });
    
    catVideo.classList.remove('talking');
    void catVideo.offsetWidth;
    catVideo.classList.add('talking');
  }

  function showGreetingMessage(langKey) {
    const lang = languages[langKey];
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
    
    state.messageTimeout = setTimeout(() => {
      if (speechBubble) speechBubble.classList.remove('show');
      state.messageTimeout = null;
    }, 5000);
  }

  function switchLanguage(langKey) {
    if (langKey === state.currentLang && state.isPlaying) return;
    
    stopAllMedia();
    
    state.currentLang = langKey;
    state.isPlaying = true;
    
    playGreetingVideo(langKey);
    playGreetingSound(langKey);
    showGreetingMessage(langKey);
    
    setTimeout(() => {
      state.isPlaying = false;
    }, 6000);
  }

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================
  window.showToast = function(message, isSuccess) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      if (isSuccess) {
        toast.style.background = '#58C27D';
      } else {
        toast.style.background = '#2E2657';
      }
      
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        toast.style.background = '';
      }, 2500);
    }
  };

  // ============================================
  // MODAL FUNCTIONS - FIXED
  // ============================================
  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Always close every other modal first
    closeAllModals();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof Sound !== 'undefined') Sound.pop();
  }


  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Show login modal - this is the ONLY modal that opens
  window.showLoginRequiredModal = function() {
    openModal('loginRequiredModal');
  };

  // Show language selection - ONLY if user is logged in
  window.showLanguageSelectionModal = function() {
    // Check if user is logged in first
    if (window.isUserLoggedIn && window.isUserLoggedIn()) {
      // User is logged in - redirect to language selection or dashboard
      window.location.href = 'languages.html';
    } else {
      // User is not logged in - show login modal
      window.showLoginRequiredModal();
    }
  };

  // ============================================
  // MAIN ACTION HANDLER - "Let's Learn" Button
  // ============================================
  function handleMainAction(e) {
    e.preventDefault();
    if (typeof Sound !== 'undefined') Sound.pop();
    
    // Check if user is logged in via Auth system
    if (window.isUserLoggedIn && window.isUserLoggedIn()) {
      // User is logged in - go to languages page
      window.location.href = 'languages.html';
    } else {
      // User is not logged in - show login modal
      window.showLoginRequiredModal();
    }
  }

  // ============================================
  // EVENT LISTENERS: NAVBAR & CATTO
  // ============================================
  if (langNavBtns.length > 0) {
    langNavBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const lang = this.dataset.lang;
        
        langNavBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        switchLanguage(lang);
      });
      
      btn.addEventListener('mouseenter', () => {
        if (typeof Sound !== 'undefined') Sound.hover();
      });
    });
  }

  if (catVideo) {
    catVideo.addEventListener('click', () => {
      const langKeys = Object.keys(languages);
      const randomLang = langKeys[Math.floor(Math.random() * langKeys.length)];
      
      langNavBtns.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.lang === randomLang) b.classList.add('active');
      });
      
      switchLanguage(randomLang);
      
      if (typeof Sound !== 'undefined') Sound.pop();
    });
  }

  // Auto-play the first language (English) on load
  setTimeout(() => {
    const activeBtn = document.querySelector('.lang-nav-btn.active');
    const lang = activeBtn ? activeBtn.dataset.lang : 'en';
    const langData = languages[lang];
    
    if (langData && speechText) {
      speechText.textContent = langData.greeting;
      speechText.style.color = langData.color;
    }
    if (speechBubble) {
      speechBubble.style.borderColor = langData.color;
      speechBubble.classList.add('show');
    }
    
    state.messageTimeout = setTimeout(() => {
      if (speechBubble) speechBubble.classList.remove('show');
      state.messageTimeout = null;
    }, 5000);
    
    if (catVideo && langData) {
      catVideo.src = langData.video;
      catVideo.load();
      catVideo.play().catch(() => {});
    }
  }, 800);

  // ============================================
  // BUTTON EVENT LISTENERS
  // ============================================
  const startBtn = document.getElementById('startBtn');
  const meetBtn = document.getElementById('meetCattoBtn');
  
  if (startBtn) startBtn.addEventListener('click', handleMainAction);
  if (meetBtn) meetBtn.addEventListener('click', handleMainAction);

  // ============================================
  // MODAL CLOSERS
  // ============================================
  // Close button
  document.getElementById('loginModalClose')?.addEventListener('click', function() {
    closeModal('loginRequiredModal');
  });
  
  // Click outside modal
  document.getElementById('loginRequiredModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal('loginRequiredModal');
    }
  });

  // ============================================
  // ESCAPE KEY TO CLOSE MODALS
  // ============================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // ============================================
  // CHECK IF USER JUST SIGNED IN
  // ============================================
  if (sessionStorage.getItem('justSignedIn') === 'true') {
    sessionStorage.removeItem('justSignedIn');
    setTimeout(() => {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        showToast('👋 Welcome back!', true);
        // Redirect to languages page
        window.location.href = 'languages.html';
      }
    }, 500);
  }

  if (sessionStorage.getItem('justSignedUp') === 'true') {
    sessionStorage.removeItem('justSignedUp');
    setTimeout(() => {
      if (window.isUserLoggedIn && window.isUserLoggedIn()) {
        showToast('🎉 Welcome to Language Island!', true);
        // Redirect to languages page
        window.location.href = 'languages.html';
      }
    }, 500);
  }

  // ============================================
  // SOUND SYSTEM
  // ============================================
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    setTimeout(() => Sound._init(), 200);
  }

  // Expose global methods
  window.switchLanguage = switchLanguage;
  window.stopAllMedia = stopAllMedia;

  console.log('✅ Home page loaded successfully!');
});