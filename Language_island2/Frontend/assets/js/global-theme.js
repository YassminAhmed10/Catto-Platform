/* =========================================================
   GLOBAL-THEME.JS - Handles theme and skin preferences
   ========================================================= */

(function() {
  'use strict';

  console.log('🎨 Global theme loaded!');

  var THEME_CLASS_MAP = {
    'default': null,
    'purple-theme': 'theme-royal-purple',
    'night-theme': 'theme-night',
    'space-theme': 'theme-space',
    'boys-theme': 'theme-boys'
  };

  var ALL_THEME_CLASSES = ['theme-royal-purple', 'theme-night', 'theme-space', 'theme-boys'];

  // ============================================
  // APPLY THEME CLASS TO BODY
  // ============================================
  function applyThemeClass(theme) {
    // Remove ALL theme classes first
    ALL_THEME_CLASSES.forEach(function(cls) {
      document.body.classList.remove(cls);
    });

    // If theme is default remove all classes (no class added)
    var cls = THEME_CLASS_MAP[theme];
    if (cls) {
      document.body.classList.add(cls);
    }

    // Toggle decorations
    toggleSpaceDecor(theme === 'space-theme');
    toggleNightDecor(theme === 'night-theme');
    togglePurpleDecor(theme === 'purple-theme');
    toggleBoysDecor(theme === 'boys-theme');

    console.log('🎨 Theme applied:', theme || 'default');
  }

  // ============================================
  // ADD AND REMOVE FLOATING PLANETS & NEBULA FOR SPACE THEME
  // ============================================
  function toggleSpaceDecor(show) {
    var sky = document.querySelector('.sky');
    if (!sky) return;

    var existingPlanets = sky.querySelectorAll('.space-planet');
    existingPlanets.forEach(function(el) { el.remove(); });

    var existingNebula = sky.querySelectorAll('.space-nebula');
    existingNebula.forEach(function(el) { el.remove(); });

    if (show) {
      for (var i = 1; i <= 4; i++) {
        var planet = document.createElement('div');
        planet.className = 'space-planet planet-' + i;
        sky.appendChild(planet);
      }

      var nebula = document.createElement('div');
      nebula.className = 'space-nebula';
      sky.appendChild(nebula);
    }
  }

  // ============================================
  // ADD AND REMOVE SHOOTING STAR FOR NIGHT THEME
  // ============================================
  function toggleNightDecor(show) {
    var sky = document.querySelector('.sky');
    if (!sky) return;

    var existing = sky.querySelectorAll('.night-shooting-star');
    existing.forEach(function(el) { el.remove(); });

    if (show) {
      var shootingStar = document.createElement('div');
      shootingStar.className = 'night-shooting-star';
      sky.appendChild(shootingStar);
    }
  }

  // ============================================
  // ADD AND REMOVE FLOWER FOR PURPLE THEME
  // ============================================
  function togglePurpleDecor(show) {
    var sky = document.querySelector('.sky');
    if (!sky) return;

    var existingFlower = sky.querySelectorAll('.flower-container');
    existingFlower.forEach(function(el) { el.remove(); });

    var existingSparkles = sky.querySelectorAll('.sparkle-particle');
    existingSparkles.forEach(function(el) { el.remove(); });

    if (show) {
      var flower = document.createElement('div');
      flower.className = 'flower-container';
      
      var petalColors = ['#E8D5FF', '#D4B8FF', '#B28CFF', '#9A6FE0', '#B28CFF', '#D4B8FF'];
      for (var i = 1; i <= 6; i++) {
        var petal = document.createElement('div');
        petal.className = 'flower-petal';
        petal.style.background = 'linear-gradient(135deg, ' + petalColors[i-1] + ', #7A4FD1 80%)';
        petal.style.animationDelay = (i * 0.3) + 's';
        flower.appendChild(petal);
      }
      
      for (var i = 7; i <= 12; i++) {
        var innerPetal = document.createElement('div');
        innerPetal.className = 'flower-petal-inner';
        innerPetal.style.animationDelay = ((i - 6) * 0.25) + 's';
        flower.appendChild(innerPetal);
      }
      
      var center = document.createElement('div');
      center.className = 'flower-center';
      flower.appendChild(center);
      
      for (var i = 1; i <= 8; i++) {
        var sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.style.animationDelay = (i * 0.4) + 's';
        flower.appendChild(sparkle);
      }
      
      sky.appendChild(flower);
    }
  }

  // ============================================
  // ADD AND REMOVE GREEN PARTICLES FOR BOYS THEME
  // ============================================
  function toggleBoysDecor(show) {
    var sky = document.querySelector('.sky');
    if (!sky) return;

    var existing = sky.querySelectorAll('.green-particle');
    existing.forEach(function(el) { el.remove(); });

    if (show) {
      for (var i = 1; i <= 20; i++) {
        var particle = document.createElement('div');
        particle.className = 'green-particle';
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.top = (Math.random() * 100) + '%';
        particle.style.width = (Math.random() * 6 + 2) + 'px';
        particle.style.height = (Math.random() * 6 + 2) + 'px';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
        sky.appendChild(particle);
      }
    }
  }

  // ============================================
  // THEME MANAGEMENT Use header.js data
  // ============================================
  function applyThemeFromHeader() {
    if (typeof window.getCurrentTheme === 'function') {
      var theme = window.getCurrentTheme();
      applyThemeClass(theme);
      return true;
    }
    return false;
  }

  // ============================================
  // LOAD SAVED SKIN 
  // ============================================
  function applySkinFromHeader() {
    if (typeof window.getCurrentSkin === 'function') {
      var skin = window.getCurrentSkin();
      if (skin && skin !== 'default-catto') {
        var skinPath = 'imgs/profile/' + skin + '.png';
        if (typeof window.updateAllAvatars === 'function') {
          window.updateAllAvatars(skinPath);
        }
      }
      return true;
    }
    return false;
  }

  // ============================================
  // ADD AND REMOVE GREEN WAVES & PARTICLES FOR BOYS THEME
  // ============================================
function toggleBoysDecor(show) {
  var sky = document.querySelector('.sky');
  if (!sky) return;

  var existingParticles = sky.querySelectorAll('.green-particle');
  existingParticles.forEach(function(el) { el.remove(); });

  var existingWaves = sky.querySelectorAll('.wave-container');
  existingWaves.forEach(function(el) { el.remove(); });

  if (show) {
    // Add wave container with 3 wave layers
    var waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';
    
    for (var w = 1; w <= 3; w++) {
      var wave = document.createElement('div');
      wave.className = 'wave wave-' + w;
      waveContainer.appendChild(wave);
    }
    
    sky.appendChild(waveContainer);

    // Add fireflies
    for (var i = 1; i <= 20; i++) {
      var particle = document.createElement('div');
      particle.className = 'green-particle';
      particle.style.left = (Math.random() * 100) + '%';
      particle.style.top = (Math.random() * 100) + '%';
      particle.style.width = (Math.random() * 6 + 2) + 'px';
      particle.style.height = (Math.random() * 6 + 2) + 'px';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
      sky.appendChild(particle);
    }
  }
}






















  // ============================================
  // EXPOSE GLOBALLY
  // ============================================
  window.applyThemeFromHeader = applyThemeFromHeader;
  window.applySkinFromHeader = applySkinFromHeader;
  window.applyThemeClass = applyThemeClass;
  window.toggleSpaceDecor = toggleSpaceDecor;
  window.toggleNightDecor = toggleNightDecor;
  window.togglePurpleDecor = togglePurpleDecor;
  window.toggleBoysDecor = toggleBoysDecor;

  // ============================================
  // INIT
  // ============================================
  function init() {
    if (!applyThemeFromHeader()) {
      try {
        var userData = localStorage.getItem('languageIslandUser');
        if (userData && userData !== 'null' && userData !== '') {
          var user = JSON.parse(userData);
          var theme = user.equipped_theme || 'default';
          applyThemeClass(theme);
        }
      } catch(e) {
        // If error, apply default theme
        applyThemeClass('default');
      }
    }

    applySkinFromHeader();

    console.log('🎨 Theme applied successfully');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }

})();