/* =========================================================
   VIDEOS.JS
   ========================================================= */

console.log('🎬 Videos.js loading...');

document.addEventListener('DOMContentLoaded', function() {

  // =========================================================
  // LANGUAGE DATA
  // =========================================================
  var languages = {
    en: { name: 'English', flag: 'fi-gb', color: '#4C8DAF', path: 'english' },
    ar: { name: 'Arabic', flag: 'fi-eg', color: '#58C27D', path: 'arabic' },
    de: { name: 'German', flag: 'fi-de', color: '#8C6FC9', path: 'german' },
    es: { name: 'Spanish', flag: 'fi-es', color: '#FF6F59', path: 'spanish' },
    fr: { name: 'French', flag: 'fi-fr', color: '#FFB84D', path: 'french' },
    it: { name: 'Italian', flag: 'fi-it', color: '#E5563F', path: 'italian' }
  };

  var langImages = {
    ar: 'imgs/VideosPage/Arabic-V-B.png',
    en: 'imgs/VideosPage/EN-V-B.png',
    fr: 'imgs/VideosPage/Feancais-V-B.png',
    de: 'imgs/VideosPage/Deutsch-V-B.png',
    it: 'imgs/VideosPage/Italisno-V-B.png',
    es: 'imgs/VideosPage/Spanish-V-B.png'
  };

  // =========================================================
  // CATEGORY COVER IMAGES
  // =========================================================
  var categoryCoverImages = {
    en: 'Videos/AlphabetsCover.png',
    ar: 'Videos/AlphabetsCover-AR.png',
    de: 'Videos/AlphabetsCover-DE.png',
    es: 'Videos/AlphabetsCover-ES.png',
    fr: 'Videos/AlphabetsCover.png',
    it: 'Videos/AlphabetsCover.png'
  };

  // =========================================================
  // VIDEO COVER IMAGES
  // =========================================================
  var coverImages = {
    en: {
      alphabets: {
        'Letter A': 'Videos/VideoCover.png',
        'Letter B': 'Videos/VideoCover-B.png',
        'Letter C': 'Videos/VideoCover-C.png'
      }
    },
    ar: {
      alphabets: {
        'حرف أ': 'Videos/Arabic/حرف الف.png',
        'حرف ب': 'Videos/Arabic/حرف الباء.png',
        'حرف ت': 'Videos/Arabic/حرف التاء.png'
      }
    },
    es: {
      alphabets: {
        'Letra A': 'Videos/VideoCover.png',
        'Letra B': 'Videos/VideoCover-B.png',
        'Letra C': 'Videos/VideoCover-C.png'
      }
    },
    fr: {
      alphabets: {
        'Lettre A': 'Videos/VideoCover.png',
        'Lettre B': 'Videos/VideoCover-B.png',
        'Lettre C': 'Videos/VideoCover-C.png'
      }
    },
    de: {
      alphabets: {
        'Buchstabe A': 'Videos/VideoCover.png',
        'Buchstabe B': 'Videos/VideoCover-B.png',
        'Buchstabe C': 'Videos/VideoCover-C.png'
      }
    },
    it: {
      alphabets: {
        'Lettera A': 'Videos/VideoCover.png',
        'Lettera B': 'Videos/VideoCover-B.png',
        'Lettera C': 'Videos/VideoCover-C.png'
      }
    }
  };

  // =========================================================
  // VIDEO PATHS BY LANGUAGE AND CATEGORY
  // =========================================================
  var videoPaths = {
    en: {
      alphabets: {
        'Letter A': 'Videos/EN-A-V1.mp4',
        'Letter B': 'Videos/Letter-B-EN.mp4',
        'Letter C': 'Videos/Letter-C-EN.mp4'
      }
    },
    ar: {
      alphabets: {
        'حرف أ': 'Videos/Arabic/ألف.mp4',
        'حرف ب': 'Videos/Arabic/باء.mp4',
        'حرف ت': 'Videos/Arabic/تاء.mp4'
      }
    },
    es: {
      alphabets: {
        'Letra A': 'Videos/Spanish/A-SP.mp4',
        'Letra B': 'Videos/Spanish/C-SP.mp4',
        'Letra C': 'Videos/Spanish/B-SP.mp4'
      }
    },
    fr: {
      alphabets: {
        'Lettre A': 'Videos/French/A-FR.mp4',
        'Lettre B': 'Videos/French/B-FR.mp4',
        'Lettre C': 'Videos/French/C-FR.mp4'
      }
    },
    de: {
      alphabets: {
        'Buchstabe A': 'Videos/Deutsch/A-GR.mp4',
        'Buchstabe B': 'Videos/Deutsch/B-GR.mp4',
        'Buchstabe C': 'Videos/Deutsch/C-GR.mp4'
      }
    },
    it: {
      alphabets: {
        'Lettera A': 'Videos/Italy/A-IT.mp4',
        'Lettera B': 'Videos/Italy/B-IT.mp4',
        'Lettera C': 'Videos/Italy/B-IT.mp4'
      }
    }
  };

  // =========================================================
  // VIDEO CATEGORIES & DATA BY LANGUAGE
  // =========================================================
  var categoriesData = {
    en: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Letter A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Letter B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Letter C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    ar: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the alphabet' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'حرف أ', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'حرف ب', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'حرف ت', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    es: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Letra A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Letra B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Letra C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    fr: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Lettre A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Lettre B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Lettre C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    de: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Buchstabe A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Buchstabe B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Buchstabe C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    },
    it: {
      categories: [
        { key: 'alphabets', icon: '🔤', name: 'Alphabets', desc: 'Learn the ABCs' }
      ],
      videos: {
        alphabets: [
          { icon: '🔤', color: '#FF6F59', title: 'Lettera A', minutes: '2 min', tag: 'Letter' },
          { icon: '🔤', color: '#FFB84D', title: 'Lettera B', minutes: '3 min', tag: 'Letter' },
          { icon: '🔤', color: '#6EC6FF', title: 'Lettera C', minutes: '2 min', tag: 'Letter' }
        ]
      }
    }
  };

  // =========================================================
  // STATE
  // =========================================================
  var currentLangKey = null;
  var currentCategoryKey = null;
  var watchedVideos = [];
  var awardedVideoIds = [];

  // Tracks the video currently open in the modal, and whether
  // it has finished playing. Nothing acts on this until the
  // user closes the modal themselves.
  var currentPlayingVideo = null; // { langKey, categoryKey, videoTitle, videoId, hasCompleted }

  // =========================================================
  // AUTH CHECK
  // =========================================================
  function isLoggedIn() {
    if (window.isUserLoggedIn && typeof window.isUserLoggedIn === 'function') {
      return window.isUserLoggedIn();
    }
    try {
      var user = localStorage.getItem('languageIslandUser');
      if (user && user !== 'null' && user !== '') {
        return true;
      }
    } catch(e) {}
    return false;
  }

  function getCurrentUser() {
    if (window.currentUserData) {
      return window.currentUserData;
    }
    try {
      var user = localStorage.getItem('languageIslandUser');
      if (user && user !== 'null' && user !== '') {
        return JSON.parse(user);
      }
    } catch(e) {}
    return null;
  }

  // =========================================================
  // LOAD AWARDED VIDEOS (Per-video tracking)
  // =========================================================
  function loadAwardedVideos() {
    try {
      var saved = localStorage.getItem('awardedVideoIds');
      if (saved) {
        awardedVideoIds = JSON.parse(saved);
      }
    } catch(e) {
      awardedVideoIds = [];
    }
  }

  function markVideoAwarded(videoId) {
    if (awardedVideoIds.indexOf(videoId) === -1) {
      awardedVideoIds.push(videoId);
      try {
        localStorage.setItem('awardedVideoIds', JSON.stringify(awardedVideoIds));
      } catch(e) {}
    }
  }

  function isVideoAwarded(videoId) {
    return awardedVideoIds.indexOf(videoId) !== -1;
  }

  // =========================================================
  // SAVE TO DATABASE DIRECTLY
  // =========================================================
  function saveStarsToDatabase(activityId, stars) {
    console.log('Saving to database:', activityId);

    return fetch('../Backend/save_activity.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        activity_type: 'video',
        activity_id: activityId,
        stars_earned: stars
      })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(function(data) {
      console.log('Database save response:', data);
      return data;
    })
    .catch(function(err) {
      console.error('Error saving to database:', err);
      return null;
    });
  }

  // =========================================================
  // UPDATE HEADER STARS
  // =========================================================
  function updateHeaderStars(totalStars) {
    console.log('Updating header stars to:', totalStars);

    var headerStars = document.getElementById('headerStars');
    var starsPill = document.querySelector('.stars-display');

    if (headerStars) {
      headerStars.textContent = totalStars || 0;
    }
    if (starsPill) {
      starsPill.style.display = 'flex';
    }

    try {
      var userData = JSON.parse(localStorage.getItem('languageIslandUser')) || {};
      userData.total_stars = totalStars;
      localStorage.setItem('languageIslandUser', JSON.stringify(userData));
    } catch(e) {}

    try {
      document.dispatchEvent(new CustomEvent('starsUpdated', {
        detail: { totalStars: totalStars }
      }));
    } catch(e) {}
  }

  // =========================================================
  // SHOW STAR EARNED MODAL - Per video
  // =========================================================
  function showStarEarnedModal(stars, totalStars, videoTitle) {
    console.log('Showing star earned modal - Stars:', stars, 'Total:', totalStars);

    var existingModal = document.getElementById('starEarnedModal');
    if (existingModal) existingModal.remove();

    var user = getCurrentUser();
    var userName = user ? (user.first_name || user.name || 'Explorer') : 'Explorer';

    var modal = document.createElement('div');
    modal.id = 'starEarnedModal';
    modal.className = 'modal-backdrop star-earned-modal';

    if (!totalStars) {
      var headerStars = document.getElementById('headerStars');
      if (headerStars) {
        totalStars = parseInt(headerStars.textContent) || 0;
      }
    }

    modal.innerHTML = `
      <div class="modal-card star-earned-card">
        <div class="star-icon">
          <img src="imgs/profile/Stars.png" alt="Stars" onerror="this.style.display='none'">
        </div>
        <h2>Congratulations, ${userName}!</h2>
        <p>You earned +${stars} stars for watching "${videoTitle}"</p>
        <div class="star-count-display">
          <span>Total Stars: <strong id="starEarnedTotal">${totalStars || 0}</strong></span>
        </div>
        <button class="cta-btn" id="starEarnedCloseBtn">Continue</button>
      </div>
    `;

    document.body.appendChild(modal);

    setTimeout(function() {
      modal.classList.add('open');
    }, 300);

    var closeBtn = document.getElementById('starEarnedCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
        setTimeout(function() {
          modal.remove();
        }, 300);
      });
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        setTimeout(function() {
          modal.remove();
        }, 300);
      }
    });

    setTimeout(function() {
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
        setTimeout(function() {
          modal.remove();
        }, 300);
      }
    }, 5000);

    if (typeof Sound !== 'undefined' && Sound.win) Sound.win();
  }

  // =========================================================
  // PER-VIDEO REWARD
  // =========================================================
  function earnStarsForVideo(videoId, videoTitle) {
    console.log('earnStarsForVideo called for:', videoId, 'Title:', videoTitle);

    // We removed the 'isVideoAwarded' block so you can earn stars infinitely!

    var activityId = 'video_' + videoId + '_' + Date.now();

    saveStarsToDatabase(activityId, 5)
      .then(function(data) {
        var totalStars;

        if (data && data.success && typeof data.total_stars !== 'undefined') {
          totalStars = data.total_stars;
        } else {
          var headerStars = document.getElementById('headerStars');
          totalStars = (parseInt(headerStars ? headerStars.textContent : 0) || 0) + 5;
          console.warn('Could not confirm stars from server, using local estimate:', totalStars);
        }

        updateHeaderStars(totalStars);
        showStarEarnedModal(5, totalStars, videoTitle);
      });
  }

  // =========================================================
  // CHECK VIDEO COMPLETION
  // =========================================================
  function isVideoWatched(videoId) {
    return watchedVideos.indexOf(videoId) !== -1;
  }

  // =========================================================
  // HANDLE VIDEO MODAL CLOSE
  // =========================================================
  function handleVideoModalClose() {
    closeVideoModal();

    if (currentPlayingVideo && currentPlayingVideo.hasCompleted) {
      var videoId = currentPlayingVideo.videoId;
      var videoTitle = currentPlayingVideo.videoTitle;

      // 1. ALWAYS trigger the reward delay after the video completes
      setTimeout(function() {
        earnStarsForVideo(videoId, videoTitle);
      }, 2000);

      // 2. Only update the UI once per session so it doesn't try to restyle a styled card
      if (watchedVideos.indexOf(videoId) === -1) {
        watchedVideos.push(videoId);
        console.log('Marked as watched (on close):', videoId);

        document.querySelectorAll('.content-card').forEach(function(card) {
          var cardTitle = card.querySelector('h3');
          if (cardTitle && cardTitle.textContent === videoTitle) {
            card.style.borderColor = '#2E7D32';
            card.style.borderWidth = '3px';
            card.style.borderStyle = 'solid';
            card.style.background = '#F0FFF5';
            var btn = card.querySelector('.watch-btn');
            if (btn) {
              btn.textContent = 'Watched';
              btn.className = 'watch-btn watched';
            }
          }
        });

        showToast('You completed this video!');
      } else {
        // Let the user know they finished a re-watch!
        showToast('Great job watching this again!');
      }
    }

    currentPlayingVideo = null;
  }

  // =========================================================
  // MODAL CONTROLS
  // =========================================================
  function openLoginModal() {
    var modal = document.getElementById('loginRequiredModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (typeof Sound !== 'undefined') Sound.pop();
    }
  }

  function closeLoginModal() {
    var modal = document.getElementById('loginRequiredModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function openVideoModal() {
    var modal = document.getElementById('videoModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

function closeVideoModal() {
    console.log('Closing video modal...');
    var modal = document.getElementById('videoModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      
      var video = document.getElementById('videoPlayer');
      var source = document.getElementById('videoSource');
      
      if (video) {
        video.pause();          
        video.currentTime = 0;  
        
        if (source) {
          source.src = ''; 
        }
        video.removeAttribute('src');
        video.load();
      }
    }
  }

  // =========================================================
  // TOAST
  // =========================================================
  function showToast(message) {
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(function() {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // =========================================================
  // RENDER LANGUAGE SELECTION
  // =========================================================
  function renderLanguageSelection() {
    var grid = document.getElementById('langGridVideos');
    if (!grid) return;

    var isLoggedInUser = isLoggedIn();
    var user = getCurrentUser();
    var userName = user ? user.first_name || user.name || 'Explorer' : 'Explorer';

    var loginMsg = document.getElementById('loginStatusMsg');
    if (loginMsg) {
      if (isLoggedInUser) {
        loginMsg.textContent = '';
        loginMsg.style.color = '#2E2657';
      } else {
        loginMsg.textContent = 'Sign in to unlock all videos and track your progress.';
        loginMsg.style.color = '#FF6B59';
      }
    }

    var html = '';
    var langKeys = Object.keys(languages);
    langKeys.forEach(function(key) {
      var lang = languages[key];
      var imgSrc = langImages[key] || 'imgs/buttons/default.png';
      html += `
        <button class="lang-video-btn" data-lang="${key}">
          <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
          <span class="lang-label">${lang.name}</span>
        </button>
      `;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.lang-video-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var langKey = this.dataset.lang;
        if (typeof Sound !== 'undefined') Sound.pop();

        if (isLoggedIn()) {
          setTimeout(function() {
            showCategoriesForLanguage(langKey);
          }, 150);
        } else {
          sessionStorage.setItem('pendingVideoLang', langKey);
          openLoginModal();
        }
      });
    });

    updateLoginStatus();
  }

  // =========================================================
  // UPDATE LOGIN STATUS
  // =========================================================
  function updateLoginStatus() {
    var msg = document.getElementById('loginStatusMsg');
    if (msg) {
      if (isLoggedIn()) {
        var user = getCurrentUser();
        var name = user ? user.name || 'Explorer' : 'Explorer';
        msg.textContent = '';
        msg.style.color = '#2E2657';
      } else {
        msg.textContent = 'Sign in to unlock all videos and track your progress.';
        msg.style.color = '#FF6B59';
      }
    }
  }

  // =========================================================
  // SHOW CATEGORIES FOR LANGUAGE
  // =========================================================
  function showCategoriesForLanguage(langKey) {
    console.log('Showing categories for:', langKey);

    var data = categoriesData[langKey];
    var lang = languages[langKey] || { name: 'Unknown' };

    if (!data) {
      showToast('No content available for this language yet.');
      return;
    }

    var langSelection = document.getElementById('langSelection');
    var categoriesSection = document.getElementById('categoriesSection');
    var selectedLangName = document.getElementById('selectedLangName');

    if (langSelection) langSelection.style.display = 'none';
    if (categoriesSection) categoriesSection.style.display = 'block';
    if (selectedLangName) selectedLangName.textContent = lang.name;

    var grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    grid.style.pointerEvents = 'none';
    setTimeout(function() {
      grid.style.pointerEvents = 'auto';
    }, 350);

    if (!data.categories || data.categories.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;text-align:center;padding:40px 20px;">
          <span class="empty-icon"></span>
          <h3>No categories yet!</h3>
          <p>Check back soon for new content.</p>
        </div>
      `;
      return;
    }

    var categoryCover = categoryCoverImages[langKey] || 'Videos/AlphabetsCover.png';

    data.categories.forEach(function(category) {
      var card = document.createElement('button');
      card.className = 'category-card';

      var categoryKey = category.key || 'default';
      var categoryIcon = category.icon || '📚';
      var categoryName = category.name || 'Category';
      var categoryDesc = category.desc || '';

      var isAlphabets = categoryKey === 'alphabets';

      if (isAlphabets) {
        card.className = card.className + ' alphabets-category';

        var img = document.createElement('img');
        img.className = 'category-image';
        img.src = categoryCover;
        img.alt = categoryName;
        img.loading = 'lazy';

        img.onerror = function() {
          this.style.display = 'none';
          var wrapper = this.parentElement;
          if (wrapper) {
            wrapper.innerHTML = '';
            var iconSpan = document.createElement('span');
            iconSpan.className = 'category-icon';
            iconSpan.textContent = categoryIcon;
            var nameHeading = document.createElement('h3');
            nameHeading.textContent = categoryName;
            var descPara = document.createElement('p');
            descPara.textContent = categoryDesc;
            wrapper.appendChild(iconSpan);
            wrapper.appendChild(nameHeading);
            wrapper.appendChild(descPara);
          }
        };

        var wrapper = document.createElement('div');
        wrapper.className = 'category-image-wrapper';
        wrapper.appendChild(img);

        card.appendChild(wrapper);

        var textDiv = document.createElement('div');
        textDiv.className = 'category-text';
        textDiv.style.display = 'none';
        textDiv.innerHTML = `
          <span class="category-icon">${categoryIcon}</span>
          <h3>${categoryName}</h3>
          <p>${categoryDesc}</p>
        `;
        card.appendChild(textDiv);

      } else {
        card.innerHTML = `
          <span class="category-icon">${categoryIcon}</span>
          <h3>${categoryName}</h3>
          <p>${categoryDesc}</p>
        `;
      }

      card.addEventListener('click', function(e) {
        e.preventDefault(); 
        e.stopPropagation();
        
        if (typeof Sound !== 'undefined') Sound.pop();
        
        setTimeout(function() {
          showVideosForCategory(langKey, categoryKey);
        }, 150);
      });

      grid.appendChild(card);
    });

    var videosSection = document.getElementById('videosSection');
    if (videosSection) videosSection.style.display = 'none';

    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // SHOW VIDEOS FOR CATEGORY
  // =========================================================
  function showVideosForCategory(langKey, categoryKey) {
    console.log('Showing videos for category:', categoryKey);
    currentLangKey = langKey;
    currentCategoryKey = categoryKey;

    var data = categoriesData[langKey];
    var videos = data.videos[categoryKey] || [];
    var category = data.categories.find(function(c) { return c.key === categoryKey; });

    var categoriesSection = document.getElementById('categoriesSection');
    var videosSection = document.getElementById('videosSection');
    var selectedCategoryName = document.getElementById('selectedCategoryName');

    if (categoriesSection) categoriesSection.style.display = 'none';
    if (videosSection) videosSection.style.display = 'block';
    if (selectedCategoryName) selectedCategoryName.textContent = category ? category.name : 'Videos';

    var grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.innerHTML = '';

    grid.style.pointerEvents = 'none';
    setTimeout(function() {
      grid.style.pointerEvents = 'auto';
    }, 350);

    if (!videos || videos.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon"></span>
          <h3>More videos coming soon!</h3>
          <p>Check back later for new content.</p>
        </div>
      `;
      return;
    }

    videos.forEach(function(video) {
      var card = document.createElement('button');
      var isLocked = video.locked || false;
      card.className = 'content-card' + (isLocked ? ' locked-card' : '');

      var videoTitle = video.title || 'Video';
      var videoIcon = video.icon || '';
      var videoColor = video.color || '#FFB84D';
      var videoMinutes = video.minutes || '2 min';

      var videoId = langKey + '_' + categoryKey + '_' + videoTitle;
      var isWatched = watchedVideos.indexOf(videoId) !== -1;

      if (isWatched) {
        card.style.borderColor = '#2E7D32';
        card.style.borderWidth = '3px';
        card.style.borderStyle = 'solid';
        card.style.background = '#F0FFF5';
      }

      var coverSrc = null;
      if (coverImages[langKey] && coverImages[langKey][categoryKey]) {
        if (coverImages[langKey][categoryKey][videoTitle]) {
          coverSrc = coverImages[langKey][categoryKey][videoTitle];
        } else {
          var covers = Object.values(coverImages[langKey][categoryKey]);
          if (covers.length > 0) {
            coverSrc = covers[0];
          }
        }
      }

      if (!coverSrc && coverImages['en'] && coverImages['en'][categoryKey]) {
        var enCovers = Object.values(coverImages['en'][categoryKey]);
        if (enCovers.length > 0) {
          coverSrc = enCovers[0];
        }
      }

      var coverHtml = '';
      if (coverSrc) {
        coverHtml = `
          <div class="video-cover-wrapper">
            <img src="${coverSrc}" alt="${videoTitle}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:48px;\\'>${videoIcon}</span>'">
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
          </div>
        `;
      } else {
        coverHtml = `
          <div class="video-cover-wrapper" style="background:${videoColor}22;">
            <span style="font-size:48px;">${videoIcon}</span>
            <div class="play-icon-overlay"><i class="fas fa-play"></i></div>
          </div>
        `;
      }

      var watchButtonHtml = '';
      if (isLocked) {
        watchButtonHtml = `<button class="watch-btn" disabled>Locked</button>`;
      } else if (isWatched) {
        watchButtonHtml = `<button class="watch-btn watched">Watched</button>`;
      } else {
        watchButtonHtml = `<button class="watch-btn">Watch</button>`;
      }

      card.innerHTML = `
        ${coverHtml}
        <h3>${videoTitle}</h3>
        <p>${videoMinutes} watch</p>
        ${watchButtonHtml}
      `;

      card.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target.closest('.watch-btn')) return;

        if (isLocked) {
          if (typeof Sound !== 'undefined') Sound.locked();
          showToast('This video is coming soon!');
        } else {
          if (typeof Sound !== 'undefined') Sound.pop();
          
          setTimeout(function() {
            playVideo(langKey, categoryKey, videoTitle);
          }, 150);
        }
      });

      var watchBtn = card.querySelector('.watch-btn');
      if (watchBtn && !isLocked) {
        watchBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof Sound !== 'undefined') Sound.pop();
          playVideo(langKey, categoryKey, videoTitle);
        });
      }

      grid.appendChild(card);
    });

    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================
  // PLAY VIDEO
  // =========================================================
  function playVideo(langKey, categoryKey, videoTitle) {
    console.log('Playing video:', videoTitle);

    var path = null;
    if (videoPaths[langKey] && videoPaths[langKey][categoryKey] && videoPaths[langKey][categoryKey][videoTitle]) {
      path = videoPaths[langKey][categoryKey][videoTitle];
    } else {
      if (videoPaths[langKey] && videoPaths[langKey][categoryKey]) {
        var videos = Object.values(videoPaths[langKey][categoryKey]);
        if (videos.length > 0) {
          path = videos[0];
        }
      }
    }

    if (!path) {
      showToast('Video not found. Please try another video.');
      return;
    }

    var video = document.getElementById('videoPlayer');
    var source = document.getElementById('videoSource');
    var titleEl = document.getElementById('videoModalTitle');
    var tagEl = document.getElementById('videoModalTag');
    var progressBar = document.getElementById('videoProgressBar');
    var playOverlay = document.getElementById('videoPlayOverlay');

    if (source) {
      source.src = path;
      video.load();
    }

    if (titleEl) {
      titleEl.textContent = videoTitle || 'Video';
    }

    var data = categoriesData[langKey];
    var category = data ? data.categories.find(function(c) { return c.key === categoryKey; }) : null;
    if (tagEl && category) {
      tagEl.textContent = category.name || 'Video';
    }

    if (progressBar) {
      progressBar.style.width = '0%';
    }

    if (playOverlay) {
      playOverlay.classList.add('show');
    }

    // Remove old event listeners by cloning
    var newVideo = video.cloneNode(true);
    video.parentNode.replaceChild(newVideo, video);
    video = newVideo;

    var videoId = langKey + '_' + categoryKey + '_' + videoTitle;

    // Set up tracking for this playback. Nothing fires from
    // these listeners except flipping hasCompleted to true
    // the actual watched/stars logic waits for modal close.
    currentPlayingVideo = {
      langKey: langKey,
      categoryKey: categoryKey,
      videoTitle: videoTitle,
      videoId: videoId,
      hasCompleted: false
    };

    video.addEventListener('loadedmetadata', function() {
      console.log('Video duration:', video.duration, 'seconds');
    });

    video.addEventListener('timeupdate', function() {
      if (progressBar && video.duration) {
        var progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';

        if (progress >= 98 && currentPlayingVideo && !currentPlayingVideo.hasCompleted) {
          currentPlayingVideo.hasCompleted = true;
          console.log('Video fully watched (pending close):', videoTitle);
        }
      }
    });

    video.addEventListener('play', function() {
      if (playOverlay) {
        playOverlay.classList.remove('show');
      }
    });

    video.addEventListener('pause', function() {
      if (playOverlay && !video.ended) {
        playOverlay.classList.add('show');
      }
    });

    video.addEventListener('ended', function() {
      if (playOverlay) {
        playOverlay.classList.add('show');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      }

      if (currentPlayingVideo && !currentPlayingVideo.hasCompleted) {
        currentPlayingVideo.hasCompleted = true;
        console.log('Video ended (pending close):', videoTitle);
      }
    });

    openVideoModal();

    video.play().catch(function(e) {
      console.log('Video autoplay blocked, user must click play manually.');
      if (playOverlay) {
        playOverlay.classList.add('show');
      }
    });
  }

  // =========================================================
  // VIDEO MODAL CONTROLS
  // =========================================================
  var playOverlay = document.getElementById('videoPlayOverlay');
  if (playOverlay) {
    playOverlay.addEventListener('click', function() {
      var video = document.getElementById('videoPlayer');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }

  var videoModalClose = document.getElementById('videoModalClose');
  if (videoModalClose) {
    videoModalClose.addEventListener('click', function() {
      handleVideoModalClose();
    });
  }

  var videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', function(e) {
      if (e.target === this) {
        handleVideoModalClose();
      }
    });
  }

  var fullscreenBtn = document.getElementById('videoFullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
      var video = document.getElementById('videoPlayer');
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var modal = document.getElementById('videoModal');
      if (modal && modal.classList.contains('open')) {
        handleVideoModalClose();
      }
    }
  });

  // =========================================================
  // BACK TO LANGUAGES
  // =========================================================
  var backToLangsBtn = document.getElementById('backToLangs');
  if (backToLangsBtn) {
    backToLangsBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var categoriesSection = document.getElementById('categoriesSection');
      var langSelection = document.getElementById('langSelection');
      if (categoriesSection) categoriesSection.style.display = 'none';
      if (langSelection) {
        langSelection.style.display = 'block';
        langSelection.style.visibility = 'visible';
        langSelection.style.opacity = '1';
      }
      if (langSelection) langSelection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // BACK TO CATEGORIES
  // =========================================================
  var backToCategoriesBtn = document.getElementById('backToCategories');
  if (backToCategoriesBtn) {
    backToCategoriesBtn.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
      var videosSection = document.getElementById('videosSection');
      var categoriesSection = document.getElementById('categoriesSection');
      if (videosSection) videosSection.style.display = 'none';
      if (categoriesSection) {
        categoriesSection.style.display = 'block';
        categoriesSection.style.visibility = 'visible';
        categoriesSection.style.opacity = '1';
      }
      if (categoriesSection) categoriesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================================
  // LOGIN MODAL EVENT HANDLERS
  // =========================================================
  var loginModalClose = document.getElementById('loginModalClose');
  if (loginModalClose) {
    loginModalClose.addEventListener('click', closeLoginModal);
  }

  var loginRequiredModal = document.getElementById('loginRequiredModal');
  if (loginRequiredModal) {
    loginRequiredModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeLoginModal();
      }
    });
  }

  var loginModalSignin = document.getElementById('loginModalSignin');
  if (loginModalSignin) {
    loginModalSignin.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingVideoLangAfterAuth', pendingLang);
      }
    });
  }

  var loginModalSignup = document.getElementById('loginModalSignup');
  if (loginModalSignup) {
    loginModalSignup.addEventListener('click', function(e) {
      sessionStorage.setItem('returnTo', window.location.pathname);
      var pendingLang = sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.setItem('pendingVideoLangAfterAuth', pendingLang);
      }
    });
  }

  // =========================================================
  // CHECK FOR RETURN FROM LOGIN
  // =========================================================
  function checkReturnFromLogin() {
    var justSignedIn = sessionStorage.getItem('justSignedIn');
    if (justSignedIn === 'true') {
      sessionStorage.removeItem('justSignedIn');
      var pendingLang = sessionStorage.getItem('pendingVideoLangAfterAuth') || sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingVideoLang');
        sessionStorage.removeItem('pendingVideoLangAfterAuth');
        setTimeout(function() {
          if (isLoggedIn()) {
            showCategoriesForLanguage(pendingLang);
            showToast('Welcome back! Here are your videos.');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('Welcome back!');
        }, 500);
      }
    }

    var justSignedUp = sessionStorage.getItem('justSignedUp');
    if (justSignedUp === 'true') {
      sessionStorage.removeItem('justSignedUp');
      var pendingLang = sessionStorage.getItem('pendingVideoLangAfterAuth') || sessionStorage.getItem('pendingVideoLang');
      if (pendingLang) {
        sessionStorage.removeItem('pendingVideoLang');
        sessionStorage.removeItem('pendingVideoLangAfterAuth');
        setTimeout(function() {
          if (isLoggedIn()) {
            showCategoriesForLanguage(pendingLang);
            showToast('Welcome! Start your video adventure.');
          }
        }, 500);
      } else {
        setTimeout(function() {
          updateLoginStatus();
          showToast('Welcome to Language Island!');
        }, 500);
      }
    }
  }

  // =========================================================
  // LOAD WATCHED VIDEOS & AWARDED VIDEOS
  // =========================================================
  function loadWatchedVideos() {
    watchedVideos = [];
    console.log('Reset watched videos for this session');
    loadAwardedVideos();
  }

  // =========================================================
  // SOUND SYSTEM
  // =========================================================
  if (typeof Sound !== 'undefined') {
    Sound._enabled = true;
    Sound._init();
  }

  // =========================================================
  // INIT
  // =========================================================
  loadWatchedVideos();

  setTimeout(function() {
    renderLanguageSelection();
    checkReturnFromLogin();
  }, 300);

  document.addEventListener('authChanged', function() {
    renderLanguageSelection();
  });

  console.log('Videos.js loaded successfully!');
});