// ============================================
// LANGUAGE SELECT - UNIFIED LANGUAGE CONTROL
// ============================================

class LanguageSelect {
  constructor() {
    // ============================================
    // LANGUAGE CONFIGURATION
    // ============================================
    this.languageConfig = {
      en: {
        name: 'English',
        flagClass: 'fi-gb',
        flagColor: '#012169',
        greeting: 'Hi My Friend I\'m Catto',
        audioFile: 'Sounds/p_16844268_480.mp3',
        color: '#FF6F59',
        image: 'imgs/buttons/English.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'Alphabet Adventure',
            subtitle: 'Learn the ABCs',
            page: '/english/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'ABC Song', desc: 'Sing along!' },
              { id: 2, icon: 'fa-font', name: 'Capital Letters', desc: 'A B C D...' },
              { id: 3, icon: 'fa-font', name: 'Small Letters', desc: 'a b c d...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'Letter Match', desc: 'Find the pairs' },
              { id: 5, icon: 'fa-search', name: 'Find the Letter', desc: 'Spot it!' },
              { id: 6, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          },
          { 
            id: 2, 
            title: 'Words & Sounds',
            subtitle: 'Build your vocabulary',
            page: '/english/level2',
            lessons: [
              { id: 1, icon: 'fa-headphones', name: 'Listen & Repeat', desc: 'Hear the words' },
              { id: 2, icon: 'fa-image', name: 'Picture Match', desc: 'Match words to images' },
              { id: 3, icon: 'fa-pen', name: 'Spelling Practice', desc: 'Write the words' },
              { id: 4, icon: 'fa-gamepad', name: 'Word Games', desc: 'Play and learn' },
              { id: 5, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          },
          { 
            id: 3, 
            title: 'Phrases & Sentences',
            subtitle: 'Start speaking!',
            page: '/english/level3',
            lessons: [
              { id: 1, icon: 'fa-comment', name: 'Daily Phrases', desc: 'Useful expressions' },
              { id: 2, icon: 'fa-users', name: 'Role Play', desc: 'Practice dialogues' },
              { id: 3, icon: 'fa-pen', name: 'Sentence Building', desc: 'Create sentences' },
              { id: 4, icon: 'fa-music', name: 'Songs & Rhymes', desc: 'Sing along!' },
              { id: 5, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          },
          { 
            id: 4, 
            title: 'Reading & Stories',
            subtitle: 'Read with Catto!',
            page: '/english/level4',
            lessons: [
              { id: 1, icon: 'fa-book-open', name: 'Short Stories', desc: 'Read along' },
              { id: 2, icon: 'fa-comment', name: 'Story Questions', desc: 'Answer questions' },
              { id: 3, icon: 'fa-pen', name: 'Write Your Story', desc: 'Be creative!' },
              { id: 4, icon: 'fa-users', name: 'Read Together', desc: 'Practice reading' },
              { id: 5, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          },
          { 
            id: 5, 
            title: 'Conversation',
            subtitle: 'Speak with confidence!',
            page: '/english/level5',
            lessons: [
              { id: 1, icon: 'fa-comment-dots', name: 'Daily Conversations', desc: 'Real-life talk' },
              { id: 2, icon: 'fa-phone', name: 'Phone Calls', desc: 'Practice on the phone' },
              { id: 3, icon: 'fa-store', name: 'Shopping', desc: 'At the store' },
              { id: 4, icon: 'fa-restaurant', name: 'Ordering Food', desc: 'At the restaurant' },
              { id: 5, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          }
        ]
      },
      ar: {
        name: 'Arabic',
        flagClass: 'fi-eg',
        flagColor: '#CE1126',
        greeting: 'مرحباً صديقي أنا كاتو',
        audioFile: 'Sounds/مرحبا صديقي.wav',
        color: '#58C27D',
        image: 'imgs/buttons/arabic.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'مغامرة الأبجدية',
            subtitle: 'تعلم الحروف',
            page: '/arabic/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'أغنية الأبجدية', desc: 'غنّ معنا!' },
              { id: 2, icon: 'fa-font', name: 'الحروف الكبيرة', desc: 'أ ب ج د...' },
              { id: 3, icon: 'fa-font', name: 'الحروف الصغيرة', desc: 'ا ب ت ث...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'تطابق الحروف', desc: 'جد الأزواج' },
              { id: 5, icon: 'fa-search', name: 'أوجد الحرف', desc: 'ابحث عنه!' },
              { id: 6, icon: 'fa-star', name: 'الاختبار النهائي', desc: '⭐ اختبر معلوماتك', isQuiz: true }
            ]
          }
        ]
      },
      de: {
        name: 'German',
        flagClass: 'fi-de',
        flagColor: '#DD0000',
        greeting: 'Hallo mein Freund, ich bin Catto',
        audioFile: 'Sounds/Made with FlexClip AI-2026-07-10T0119170.mp3',
        color: '#FFD23F',
        image: 'imgs/buttons/GermanCatto.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'Alphabet Abenteuer',
            subtitle: 'Learn the ABCs',
            page: '/german/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'ABC Song', desc: 'Sing along!' },
              { id: 2, icon: 'fa-font', name: 'Capital Letters', desc: 'A B C D...' },
              { id: 3, icon: 'fa-font', name: 'Small Letters', desc: 'a b c d...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'Letter Match', desc: 'Find the pairs' },
              { id: 5, icon: 'fa-search', name: 'Find the Letter', desc: 'Spot it!' },
              { id: 6, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          }
        ]
      },
      fr: {
        name: 'French',
        flagClass: 'fi-fr',
        flagColor: '#002395',
        greeting: 'Bonjour mon ami, je suis Catto',
        audioFile: 'Sounds/Bonjour mon ami, je suis Catto.mp3',
        color: '#6EC6FF',
        image: 'imgs/buttons/French.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'Aventure Alphabet',
            subtitle: 'Learn the ABCs',
            page: '/french/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'ABC Song', desc: 'Sing along!' },
              { id: 2, icon: 'fa-font', name: 'Capital Letters', desc: 'A B C D...' },
              { id: 3, icon: 'fa-font', name: 'Small Letters', desc: 'a b c d...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'Letter Match', desc: 'Find the pairs' },
              { id: 5, icon: 'fa-search', name: 'Find the Letter', desc: 'Spot it!' },
              { id: 6, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          }
        ]
      },
      es: {
        name: 'Spanish',
        flagClass: 'fi-es',
        flagColor: '#C60B1E',
        greeting: 'Hola mi amigo, soy Catto',
        audioFile: 'Sounds/Hola.mp3',
        color: '#FF8A5B',
        image: 'imgs/buttons/Spain.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'Aventura del Alfabeto',
            subtitle: 'Learn the ABCs',
            page: '/spanish/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'ABC Song', desc: 'Sing along!' },
              { id: 2, icon: 'fa-font', name: 'Capital Letters', desc: 'A B C D...' },
              { id: 3, icon: 'fa-font', name: 'Small Letters', desc: 'a b c d...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'Letter Match', desc: 'Find the pairs' },
              { id: 5, icon: 'fa-search', name: 'Find the Letter', desc: 'Spot it!' },
              { id: 6, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          }
        ]
      },
      it: {
        name: 'Italian',
        flagClass: 'fi-it',
        flagColor: '#009246',
        greeting: 'Ciao amico mio, sono Catto',
        audioFile: 'Sounds/Ciao.mp3',
        color: '#9B59B6',
        image: 'imgs/buttons/Italy.png',
        levelPositions: {
          1: { left: 19.5, top: 30.5 },
          2: { left: 41.5, top: 43.5 },
          3: { left: 66.5, top: 43.5 },
          4: { left: 20.5, top: 74.5 },
          5: { left: 46.5, top: 77.5 }
        },
        trophyPosition: { left: 89, top: 69 },
        levels: [
          { 
            id: 1, 
            title: 'Avventura Alfabeto',
            subtitle: 'Learn the ABCs',
            page: '/italian/level1',
            lessons: [
              { id: 1, icon: 'fa-book', name: 'ABC Song', desc: 'Sing along!' },
              { id: 2, icon: 'fa-font', name: 'Capital Letters', desc: 'A B C D...' },
              { id: 3, icon: 'fa-font', name: 'Small Letters', desc: 'a b c d...' },
              { id: 4, icon: 'fa-puzzle-piece', name: 'Letter Match', desc: 'Find the pairs' },
              { id: 5, icon: 'fa-search', name: 'Find the Letter', desc: 'Spot it!' },
              { id: 6, icon: 'fa-star', name: 'Final Quiz', desc: '⭐ Test your knowledge', isQuiz: true }
            ]
          }
        ]
      }
    };

    this.languageList = ['en', 'ar', 'de', 'fr', 'es', 'it'];

    // Use Unicode escapes so Arabic text is independent of the file's editor encoding.
    const arabicLevel = this.languageConfig.ar.levels[0];
    this.languageConfig.ar.greeting = '\u0645\u0631\u062d\u0628\u0627\u064b \u0635\u062f\u064a\u0642\u064a\u060c \u0623\u0646\u0627 \u0643\u0627\u062a\u0648';
    arabicLevel.title = '\u0645\u063a\u0627\u0645\u0631\u0629 \u0627\u0644\u0623\u0628\u062c\u062f\u064a\u0629';
    arabicLevel.subtitle = '\u062a\u0639\u0644\u0651\u0645 \u0627\u0644\u062d\u0631\u0648\u0641';
    const arabicLessons = [
      ['\u0623\u063a\u0646\u064a\u0629 \u0627\u0644\u0623\u0628\u062c\u062f\u064a\u0629', '\u063a\u0646\u0651 \u0645\u0639\u0646\u0627!'],
      ['\u0627\u0644\u062d\u0631\u0648\u0641 \u0627\u0644\u0643\u0628\u064a\u0631\u0629', '\u0623 \u0628 \u062c \u062f...'],
      ['\u0627\u0644\u062d\u0631\u0648\u0641 \u0627\u0644\u0635\u063a\u064a\u0631\u0629', '\u0627 \u0628 \u062a \u062b...'],
      ['\u062a\u0637\u0627\u0628\u0642 \u0627\u0644\u062d\u0631\u0648\u0641', '\u062c\u062f \u0627\u0644\u0623\u0632\u0648\u0627\u062c'],
      ['\u0623\u0648\u062c\u062f \u0627\u0644\u062d\u0631\u0641', '\u0627\u0628\u062d\u062b \u0639\u0646\u0647!'],
      ['\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064a', '\u0627\u062e\u062a\u0628\u0631 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643']
    ];
    arabicLevel.lessons.forEach((lesson, index) => {
      lesson.name = arabicLessons[index][0];
      lesson.desc = arabicLessons[index][1];
    });

    // ============================================
    // STATE
    // ============================================
    this.currentLanguageCode = 'en';
    this.currentLanguage = this.languageConfig['en'];
    this.levelProgress = {};
    this.lessonProgress = {};
    this.audioPlayers = {};
    this.currentAudio = null;
    this.isAudioPlaying = false;
    this.isFirstInteraction = true;
    this.currentLevelId = null;

    this.languageList.forEach(code => {
      this.levelProgress[code] = { currentLevel: 0, completed: false };
      this.lessonProgress[code] = {};
      const config = this.languageConfig[code];
      if (config && config.levels) {
        config.levels.forEach(level => {
          this.lessonProgress[code][level.id] = { lessonsCompleted: [] };
        });
      }
    });

    // ============================================
    // DOM ELEMENTS
    // ============================================
    this.elements = {
      mascotVideo: document.getElementById('catVideo'),
      greetingText: document.getElementById('greetingText'),
      langIndicator: document.getElementById('langIndicator'),
      catSpeech: document.getElementById('catSpeech'),
      languageGrid: document.getElementById('languageGrid'),
      selectedLanguageName: document.getElementById('selectedLanguageName'),
      progressText: document.getElementById('progressText'),
      toast: document.getElementById('toast'),
      toastMessage: document.getElementById('toastMessage'),
      levelButtonsContainer: document.getElementById('levelButtonsContainer'),
      trophyBtn: document.getElementById('trophyBtn'),
      lessonModalBackdrop: document.getElementById('lessonModalBackdrop'),
      lessonModalClose: document.getElementById('lessonModalClose'),
      lessonLevelBadge: document.getElementById('lessonLevelBadge'),
      lessonModalTitle: document.getElementById('lessonModalTitle'),
      lessonModalSubtitle: document.getElementById('lessonModalSubtitle'),
      lessonGrid: document.getElementById('lessonGrid'),
      lessonProgressText: document.getElementById('lessonProgressText'),
      startBtn: document.getElementById('startBtn')
    };

    this.init();
  }

  init() {
    this.loadProgress();
    this.loadAudioFiles();
    this.buildLanguageGrid();
    this.buildRoadmap();
    this.setupEvents();
    this.setLanguage('en');
    document.addEventListener('authChange', () => {
      this.loadProgress();
      this.buildRoadmap();
    });
    
    document.addEventListener('click', () => this.handleFirstInteraction(), { once: true });
    document.addEventListener('touchstart', () => this.handleFirstInteraction(), { once: true });
    
    console.log('🌍 Language Select initialized!');
  }

  isGuest() {
    return typeof Auth === 'undefined' || !Auth.isLoggedIn();
  }

  loadProgress() {
    let savedProgress = null;
    let reconciled = false;
    if (!this.isGuest() && typeof Auth !== 'undefined') {
      savedProgress = Auth.getRoadmapProgress();
    } else {
      try {
        savedProgress = JSON.parse(sessionStorage.getItem('languageIslandGuestRoadmapProgress') || 'null');
      } catch (error) {
        sessionStorage.removeItem('languageIslandGuestRoadmapProgress');
      }
    }

    if (savedProgress) {
      this.levelProgress = savedProgress.levelProgress || {};
      this.lessonProgress = savedProgress.lessonProgress || {};
    }

    this.languageList.forEach(code => {
      if (!this.levelProgress[code]) this.levelProgress[code] = { currentLevel: 0, completed: false };
      if (!this.lessonProgress[code]) this.lessonProgress[code] = {};
      this.languageConfig[code].levels.forEach(level => {
        if (!this.lessonProgress[code][level.id]) this.lessonProgress[code][level.id] = { lessonsCompleted: [] };
      });

      if (!this.isGuest()) {
        const levels = this.languageConfig[code].levels;
        let completedLevels = 0;
        for (let index = 0; index < levels.length; index++) {
          const completedLessons = this.lessonProgress[code][levels[index].id].lessonsCompleted;
          if (completedLessons.length !== levels[index].lessons.length) break;
          completedLevels++;
        }
        if (completedLevels === levels.length && !this.levelProgress[code].completed) {
          this.levelProgress[code].completed = true;
          reconciled = true;
        } else if (completedLevels < levels.length && this.levelProgress[code].currentLevel < completedLevels) {
          this.levelProgress[code].currentLevel = completedLevels;
          reconciled = true;
        }
      }
    });

    if (reconciled) this.persistProgress();
  }

  persistProgress() {
    const progress = { levelProgress: this.levelProgress, lessonProgress: this.lessonProgress };
    if (this.isGuest()) {
      sessionStorage.setItem('languageIslandGuestRoadmapProgress', JSON.stringify(progress));
    } else if (typeof Auth !== 'undefined') {
      Auth.saveRoadmapProgress(progress);
    }
  }

  // ============================================
  // AUDIO
  // ============================================
  loadAudioFiles() {
    this.languageList.forEach(code => {
      const lang = this.languageConfig[code];
      if (!lang) return;
      const audio = new Audio(lang.audioFile);
      audio.preload = 'auto';
      this.audioPlayers[code] = audio;
    });
  }

  playAudio(langId) {
    this.stopAudio();
    if (!Sound._enabled) return;
    const audio = this.audioPlayers[langId];
    if (audio) {
      audio.currentTime = 0;
      audio.play().then(() => {
        this.isAudioPlaying = true;
        this.currentAudio = audio;
      }).catch(() => {});
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isAudioPlaying = false;
      this.currentAudio = null;
    }
  }

  // ============================================
  // BUILD UI
  // ============================================
  buildLanguageGrid() {
    const grid = this.elements.languageGrid;
    if (!grid) return;
    grid.innerHTML = '';
    this.languageList.forEach(code => {
      const lang = this.languageConfig[code];
      if (!lang) return;
      const btn = document.createElement('button');
      btn.className = 'language-btn';
      btn.dataset.lang = code;
      btn.innerHTML = `
        <img src="${lang.image}" alt="${lang.name}" class="lang-image" loading="lazy">
        <span class="lang-name">${lang.name}</span>
        <span class="lang-badge"><span class="fi ${lang.flagClass}"></span></span>
      `;
      btn.addEventListener('mouseenter', () => Sound.hover());
      grid.appendChild(btn);
    });
  }

  buildRoadmap() {
    this.buildLevelButtons();
    this.updateTrophy();
    this.updateProgress();
  }

  buildLevelButtons() {
    const container = this.elements.levelButtonsContainer;
    if (!container) return;
    
    const lang = this.currentLanguage;
    const progress = this.levelProgress[this.currentLanguageCode];
    container.innerHTML = '';
    
    lang.levels.forEach((level, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'level-btn level-item';
      btn.dataset.level = level.id;
      btn.dataset.index = index;
      btn.setAttribute('aria-label', `Level ${level.id}: ${level.title}`);
      
      let state = 'locked';
      if (this.isGuest() && index === 0) {
        state = 'unlocked';
      } else if (index < progress.currentLevel) {
        state = 'completed';
      } else if (index === progress.currentLevel) {
        state = 'unlocked';
      }
      
      btn.classList.add(state);
      const stateIcon = state === 'completed' ? 'fa-check' : (state === 'unlocked' ? 'fa-play' : 'fa-lock');
      btn.innerHTML = `
        <span class="level-item__pin">${level.id}</span>
        <span class="level-item__copy"><strong>${level.title}</strong><small>${level.subtitle}</small></span>
        <span class="level-item__icon"><i class="fas ${state === 'locked' ? 'fa-lock' : level.icon}"></i></span>
        <span class="level-item__status" aria-hidden="true"><i class="fas ${stateIcon}"></i></span>
      `;
      
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleLevelClick(index);
      });
      
      btn.addEventListener('mouseenter', () => {
        if (state === 'unlocked' || state === 'completed') {
          Sound.hover();
        }
      });
      
      container.appendChild(btn);
    });
    
    if (this.elements.trophyBtn) {
      this.elements.trophyBtn.classList.toggle('locked', !progress.completed);
      this.elements.trophyBtn.classList.toggle('visible', progress.completed);
      const status = this.elements.trophyBtn.querySelector('.level-item__status');
      if (status) status.innerHTML = `<i class="fas ${progress.completed ? 'fa-star' : 'fa-lock'}"></i>`;
    }
  }

  // ============================================
  // LEVEL INTERACTION
  // ============================================
  handleLevelClick(index) {
    if (this.isGuest() && index !== 0) {
      Auth.showLoginPrompt();
      return;
    }
    const progress = this.levelProgress[this.currentLanguageCode];
    const lang = this.currentLanguage;
    const level = lang.levels[index];
    
    if (this.isGuest() && index === 0) {
      Sound.pop();
      this.openLessonModal(level);
    } else if (index === progress.currentLevel) {
      Sound.pop();
      this.openLessonModal(level);
    } else if (index < progress.currentLevel) {
      Sound.pop();
      this.showToast(`Level ${level.id} already completed!`);
    } else {
      Sound.locked();
      this.showToast(`🔒 Complete Level ${progress.currentLevel + 1} first!`);
    }
  }

  // ============================================
  // LESSON MODAL
  // ============================================
  openLessonModal(level) {
    this.currentLevelId = level.id;
    const lang = this.currentLanguage;
    const progress = this.lessonProgress[this.currentLanguageCode] || {};
    const levelProgress = progress[level.id] || { lessonsCompleted: [] };
    const totalLessons = level.lessons.length;
    const completedCount = levelProgress.lessonsCompleted ? levelProgress.lessonsCompleted.length : 0;
    const allCompleted = completedCount === totalLessons;
    
    const isRtl = this.currentLanguageCode === 'ar';
    const modalCard = this.elements.lessonModalBackdrop.querySelector('.lesson-modal');
    this.elements.lessonModalBackdrop.dir = isRtl ? 'rtl' : 'ltr';
    this.elements.lessonModalBackdrop.classList.toggle('is-rtl', isRtl);
    modalCard.classList.toggle('is-rtl', isRtl);
    this.elements.lessonLevelBadge.textContent = isRtl ? `المستوى ${level.id}` : `Level ${level.id}`;
    this.elements.lessonModalTitle.textContent = level.title;
    this.elements.lessonModalSubtitle.textContent = allCompleted ? '🎉 All lessons completed! Great job!' : level.subtitle;
    
    const grid = this.elements.lessonGrid;
    grid.innerHTML = '';
    
    level.lessons.forEach((lesson, idx) => {
      const isCompleted = levelProgress.lessonsCompleted && levelProgress.lessonsCompleted.includes(lesson.id);
      const previousComplete = idx === 0 || levelProgress.lessonsCompleted.includes(level.lessons[idx - 1].id);
      const state = isCompleted ? 'completed' : (previousComplete ? 'active' : 'locked');
      const statusIcon = state === 'completed' ? 'fa-check' : (state === 'active' ? 'fa-star' : 'fa-lock');
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `lesson-card lesson-card--${state}` + (lesson.isQuiz ? ' quiz-card' : '');
      card.dataset.lessonId = lesson.id;
      card.dataset.state = state;
      card.disabled = state === 'locked';
      card.setAttribute('aria-label', `${lesson.name}: ${state}`);
      
      card.innerHTML = `
        <span class="lesson-icon"><i class="fas ${lesson.icon}"></i></span>
        <span class="lesson-copy"><span class="lesson-name">${lesson.name}</span><span class="lesson-desc">${lesson.desc}</span></span>
        <span class="lesson-status" aria-hidden="true"><i class="fas ${statusIcon}"></i></span>
      `;
      
      card.addEventListener('click', () => this.handleLessonClick(level, lesson));
      grid.appendChild(card);
    });
    
    this.updateLessonProgress(level, completedCount, totalLessons);
    Overlay.open(this.elements.lessonModalBackdrop, { panel: '.lesson-modal' });
  }

  handleLessonClick(level, lesson) {
    const progress = this.lessonProgress[this.currentLanguageCode] || {};
    const levelProgress = progress[level.id] || { lessonsCompleted: [] };
    
    if (levelProgress.lessonsCompleted && levelProgress.lessonsCompleted.includes(lesson.id)) {
      Sound.pop();
      this.showToast(`${lesson.name} already completed!`);
      return;
    }
    
    Sound.pop();
    this.showToast(`Starting ${lesson.name}...`);
    
    setTimeout(() => {
      this.completeLesson(level, lesson);
    }, 1500);
  }

  completeLesson(level, lesson) {
    if (!this.lessonProgress[this.currentLanguageCode]) {
      this.lessonProgress[this.currentLanguageCode] = {};
    }
    if (!this.lessonProgress[this.currentLanguageCode][level.id]) {
      this.lessonProgress[this.currentLanguageCode][level.id] = { lessonsCompleted: [] };
    }
    
    const progress = this.lessonProgress[this.currentLanguageCode][level.id];
    if (!progress.lessonsCompleted.includes(lesson.id)) {
      progress.lessonsCompleted.push(lesson.id);
    }
    this.persistProgress();
    
    const totalLessons = level.lessons.length;
    const completedCount = progress.lessonsCompleted.length;
    const allCompleted = completedCount === totalLessons;
    
    this.openLessonModal(level);
    
    if (allCompleted) {
      Sound.win();
      this.completeLevel(level.id);
      this.showToast(`Level ${level.id} completed! Unlocking next level...`);
      setTimeout(() => {
        this.closeLessonModal();
      }, 2000);
    } else {
      Sound.chime();
      this.showToast(`✅ ${lesson.name} completed! ${completedCount} of ${totalLessons} done!`);
    }
  }

  completeLevel(levelId) {
    const progress = this.levelProgress[this.currentLanguageCode];
    const lang = this.currentLanguage;
    const levelIndex = lang.levels.findIndex(l => l.id === levelId);
    
    if (this.isGuest()) {
      this.buildRoadmap();
      this.persistProgress();
      return;
    }

    if (levelIndex === progress.currentLevel && levelIndex < lang.levels.length - 1) {
      progress.currentLevel++;
      this.persistProgress();
      this.buildRoadmap();
      this.updateProgress();
      Sound.unlock();
    } else if (levelIndex === lang.levels.length - 1 && levelIndex === progress.currentLevel) {
      progress.completed = true;
      this.persistProgress();
      this.buildRoadmap();
      this.updateProgress();
      this.updateTrophy();
      Sound.win();
    }
  }

  updateLessonProgress(level, completed, total) {
    this.elements.lessonProgressText.innerHTML = `
      <i class="fas fa-star"></i> ${completed} of ${total} lessons completed
    `;
  }

  closeLessonModal() {
    if (window.Overlay) Overlay.close(this.elements.lessonModalBackdrop);
  }

  updateTrophy() {
    const progress = this.levelProgress[this.currentLanguageCode];
    if (this.elements.trophyBtn) {
      if (progress.completed) {
        this.elements.trophyBtn.classList.add('visible');
      } else {
        this.elements.trophyBtn.classList.remove('visible');
      }
    }
  }

  updateProgress() {
    const progress = this.levelProgress[this.currentLanguageCode];
    const lang = this.currentLanguage;
    const total = lang.levels.length;
    const current = progress.currentLevel + 1;
    
    if (this.elements.progressText) {
      if (progress.completed) {
        this.elements.progressText.textContent = `🎉 All ${total} levels completed!`;
      } else {
        this.elements.progressText.textContent = `Level ${current} of ${total}`;
      }
    }
  }

  // ============================================
  // LANGUAGE SWITCHING
  // ============================================
  setLanguage(code) {
    if (!this.languageConfig[code]) return;
    
    this.currentLanguageCode = code;
    this.currentLanguage = this.languageConfig[code];
    
    if (!this.levelProgress[code]) {
      this.levelProgress[code] = { currentLevel: 0, completed: false };
    }
    if (!this.lessonProgress[code]) {
      this.lessonProgress[code] = {};
      this.currentLanguage.levels.forEach(level => {
        this.lessonProgress[code][level.id] = { lessonsCompleted: [] };
      });
    }
    
    this.stopAudio();
    this.updateMascot();
    this.updateLevelsTitle();
    this.buildRoadmap();
    
    if (Sound._enabled) {
      setTimeout(() => this.playAudio(this.currentLanguageCode), 300);
    }
    this.showToast(`🌍 Now speaking: ${this.currentLanguage.name}`);
  }

  updateMascot() {
    const lang = this.currentLanguage;
    const { greetingText, langIndicator, mascotVideo, catSpeech } = this.elements;
    
    if (greetingText) {
      greetingText.style.opacity = '0';
      greetingText.style.transform = 'scale(0.8)';
      setTimeout(() => {
        greetingText.textContent = lang.greeting;
        greetingText.style.opacity = '1';
        greetingText.style.transform = 'scale(1)';
        greetingText.style.color = lang.flagColor;
      }, 200);
    }
    
    if (catSpeech) {
      catSpeech.style.border = `3px solid ${lang.flagColor}`;
      catSpeech.style.boxShadow = `0 6px 0 rgba(46,38,87,0.1), 0 0 20px ${lang.flagColor}33`;
    }
    
    if (langIndicator) {
      langIndicator.innerHTML = `<span class="fi ${lang.flagClass}"></span>`;
      langIndicator.style.borderColor = lang.flagColor;
    }
    
    if (mascotVideo) {
      mascotVideo.style.borderColor = lang.flagColor;
    }
  }

  updateLevelsTitle() {
    if (this.elements.selectedLanguageName) {
      this.elements.selectedLanguageName.textContent = this.currentLanguage.name;
    }
  }

  showToast(message) {
    if (this.elements.toastMessage) {
      this.elements.toastMessage.textContent = message;
    }
    if (this.elements.toast) {
      this.elements.toast.classList.add('show');
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.elements.toast.classList.remove('show');
      }, 2500);
    }
  }

  handleFirstInteraction() {
    if (this.isFirstInteraction) {
      this.isFirstInteraction = false;
      const video = this.elements.mascotVideo;
      if (video) {
        video.muted = false;
        video.play().catch(() => {});
      }
    }
  }

  // ============================================
  // EVENT SETUP
  // ============================================
  setupEvents() {
    const { mascotVideo } = this.elements;
    if (mascotVideo) {
      mascotVideo.addEventListener('click', (e) => {
        e.stopPropagation();
        Sound.pop();
        this.playAudio(this.currentLanguageCode);
        const { greetingText } = this.elements;
        if (greetingText) {
          const messages = ['👋 Hi!', '😊 Meow!', '🌟 Let\'s learn!', '🎯 You\'re great!', '🌈 Hello there!'];
          const randomMsg = messages[Math.floor(Math.random() * messages.length)];
          greetingText.textContent = randomMsg;
          setTimeout(() => {
            greetingText.textContent = this.currentLanguage.greeting;
          }, 2000);
        }
      });
    }

    // Roadmap modal language buttons (.language-btn)
    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.lang;
        Sound.pop();
        this.setLanguage(code);
      });
    });

    // Header language flags (.lang-nav-btn) -> swap Catto video + play language audio
    const catVideo = document.getElementById('catVideo');
    const speechBubble = document.getElementById('speechText');
    const videoByLang = {
      en: 'imgs/Catto_Videos/Catto_English.webm',
      fr: 'imgs/Catto_Videos/Catto_French.webm',
      de: 'imgs/Catto_Videos/Catto_German.webm',
      es: 'imgs/Catto_Videos/Catto_Spain.webm',
      it: 'imgs/Catto_Videos/Catto_Italy.webm',
      ar: 'imgs/Catto_Videos/Catto_Egypt.webm',
    };

    document.querySelectorAll('.lang-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.lang;
        Sound.pop();
        if (catVideo && videoByLang[code]) {
          catVideo.muted = false;
          const src = videoByLang[code];
          if (catVideo.querySelector('source')) {
            catVideo.querySelector('source').src = src;
          } else {
            catVideo.innerHTML = `<source src="${src}" type="video/webm">`;
          }
          catVideo.load();
          catVideo.play().catch(() => {});
        }

        if (speechBubble && this.languageConfig[code]) {
          speechBubble.textContent = this.languageConfig[code].greeting;
        }

        this.setLanguage(code);

        // Play language audio for the selected language
        if (Sound._enabled) {
          try {
            this.playAudio(code);
          } catch (e) {}
        }
      });
    });

    const closeModal = () => {
      this.closeLessonModal();
      if (typeof Sound !== 'undefined') Sound.pop();
    };

    if (this.elements.lessonModalClose) {
      this.elements.lessonModalClose.addEventListener('click', closeModal);
    }
    if (this.elements.lessonModalBackdrop) {
      this.elements.lessonModalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.elements.lessonModalBackdrop) closeModal();
      });
    }

    if (this.elements.trophyBtn) {
      this.elements.trophyBtn.addEventListener('click', () => {
        const progress = this.levelProgress[this.currentLanguageCode];
        if (this.isGuest() || !progress.completed) {
          Auth.showLoginPrompt();
        } else {
          Sound.win();
          this.showToast(`🏆 You're a champion in ${this.currentLanguage.name}!`);
        }
      });
    }

    if (this.elements.startBtn) {
      this.elements.startBtn.addEventListener('click', () => {
        Sound.pop();
        const progress = this.levelProgress[this.currentLanguageCode];
        const level = this.currentLanguage.levels[this.isGuest() ? 0 : progress.currentLevel];
        if (level) {
          this.openLessonModal(level);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const list = this.languageList;
        const idx = list.indexOf(this.currentLanguageCode);
        const newIdx = idx > 0 ? idx - 1 : list.length - 1;
        Sound.pop();
        this.setLanguage(list[newIdx]);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const list = this.languageList;
        const idx = list.indexOf(this.currentLanguageCode);
        const newIdx = idx < list.length - 1 ? idx + 1 : 0;
        Sound.pop();
        this.setLanguage(list[newIdx]);
      }
    });
  }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const checkSound = setInterval(() => {
    if (typeof Sound !== 'undefined') {
      clearInterval(checkSound);
      window.languageSelect = new LanguageSelect();
      console.log('🌍 Language Select ready!');
    }
  }, 100);
});

document.addEventListener('click', function initAudio() {
  if (typeof Sound !== 'undefined' && Sound._ctx) {
    Sound._ctx.resume().then(() => {
      console.log('🎵 Audio is ready!');
      setTimeout(() => {
        Sound.pop();
        Sound.pop();
        Sound.win();
      }, 100);
    }).catch(() => {});
  }
  document.removeEventListener('click', initAudio);
}, { once: true });
