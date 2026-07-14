/* =========================================================
   PRONUNCIATION.JS - Speak & Practice Page
   ========================================================= */

console.log(' Pronunciation.js loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready for Pronunciation page');

    // =========================================================
    // LANGUAGE DATA - UPDATED WITH NEW SPEAKING IMAGES
    // =========================================================
    var languages = {
        en: { name: 'English', color: '#4C8DAF', speechLang: 'en-US', flag: 'us' },
        ar: { name: 'Arabic', color: '#58C27D', speechLang: 'ar-SA', flag: 'sa' },
        de: { name: 'German', color: '#8C6FC9', speechLang: 'de-DE', flag: 'de' },
        es: { name: 'Spanish', color: '#FF6F59', speechLang: 'es-ES', flag: 'es' },
        fr: { name: 'French', color: '#FFB84D', speechLang: 'fr-FR', flag: 'fr' },
        it: { name: 'Italian', color: '#E5563F', speechLang: 'it-IT', flag: 'it' }
    };

    // NEW: Speaking page images - no background, no border
    var langImages = {
        ar: 'imgs/Speaking/Speak-AR.png',
        en: 'imgs/Speaking/Speak-EN.png',
        fr: 'imgs/Speaking/Speak-FR.png',
        de: 'imgs/Speaking/Speak-DE.png',
        it: 'imgs/Speaking/Speak-IT.png',
        es: 'imgs/Speaking/Speak-ES.png'
    };

    var pronunciationData = {
        en: {
            letters: [
                { char: 'A', name: 'A' },
                { char: 'B', name: 'B' },
                { char: 'C', name: 'C' }
            ],
            words: {
                'A': [
                    { word: 'Apple', translation: 'تفاحة', image: 'imgs/Listening/Apple-L.png' },
                    { word: 'Ant', translation: 'نملة', image: 'imgs/Listening/Ant.png' },
                    { word: 'Alligator', translation: 'تمساح', image: 'imgs/Listening/EN-Alligator.png' }
                ],
                'B': [
                    { word: 'Ball', translation: 'كرة', image: 'imgs/Listening/EN-Ball.png' },
                    { word: 'Bird', translation: 'طائر', image: 'imgs/Listening/EN-Bird.png' },
                    { word: 'Butterfly', translation: 'فراشة', image: 'imgs/Listening/EN-Butterfly.png' }
                ],
                'C': [
                    { word: 'Cat', translation: 'قطة', image: 'imgs/Listening/default-catto.png' },
                    { word: 'Car', translation: 'سيارة', image: 'imgs/Listening/EN-Car.png' },
                    { word: 'Cup', translation: 'كوب', image: 'imgs/Listening/EN-Cup.png' }
                ]
            }
        },
        ar: {
            letters: [
                { char: 'أ', name: 'ألف' },
                { char: 'ب', name: 'باء' },
                { char: 'ت', name: 'تاء' }
            ],
            words: {
                'أ': [
                    { word: 'أرنب', translation: 'Rabbit', image: 'imgs/Listening/AR-Rabbit.png' },
                    { word: 'أسد', translation: 'Lion', image: 'imgs/Listening/AR-Lion.png' },
                    { word: 'أفعى', translation: 'Snake', image: 'imgs/Listening/AR-Snake.png' }
                ],
                'ب': [
                    { word: 'بطة', translation: 'Duck', image: 'imgs/Listening/AR-Duck.png' },
                    { word: 'بيت', translation: 'House', image: 'imgs/Listening/House.png' },
                    { word: 'باب', translation: 'Door', image: 'imgs/Listening/Door.png' }
                ],
                'ت': [
                    { word: 'تفاحة', translation: 'Apple', image: 'imgs/Listening/Apple-L.png' },
                    { word: 'تاج', translation: 'Crown', image: 'imgs/Listening/Taj.png' },
                    { word: 'تمر', translation: 'Dates', image: 'imgs/Listening/Dates.png' }
                ]
            }
        },
        es: {
            letters: [
                { char: 'A', name: 'A' },
                { char: 'B', name: 'Be' },
                { char: 'C', name: 'Ce' }
            ],
            words: {
                'A': [
                    { word: 'Abeja', translation: 'Bee', image: 'imgs/Listening/Bee.png' },
                    { word: 'Árbol', translation: 'Tree', image: 'imgs/Listening/Tree.png' },
                    { word: 'Agua', translation: 'Water', image: 'imgs/Listening/Water.png' }
                ],
                'B': [
                    { word: 'Bola', translation: 'Ball', image: 'imgs/Listening/EN-Ball.png' },
                    { word: 'Barco', translation: 'Boat', image: 'imgs/Listening/Boat.png' },
                    { word: 'Beso', translation: 'Kiss', image: 'imgs/Listening/Kiss.png' }
                ],
                'C': [
                    { word: 'Casa', translation: 'House', image: 'imgs/Listening/House.png' },
                    { word: 'Coche', translation: 'Car', image: 'imgs/Listening/EN-Car.png' },
                    { word: 'Cielo', translation: 'Sky', image: 'imgs/Listening/Sky.png' }
                ]
            }
        },
        fr: {
            letters: [
                { char: 'A', name: 'A' },
                { char: 'B', name: 'Bé' },
                { char: 'C', name: 'Cé' }
            ],
            words: {
                'A': [
                    { word: 'Avion', translation: 'Plane', image: 'imgs/Listening/Avion-L.png' },
                    { word: 'Arbre', translation: 'Tree', image: 'imgs/Listening/Tree.png' },
                    { word: 'Eau', translation: 'Water', image: 'imgs/Listening/Water.png' }
                ],
                'B': [
                    { word: 'Bateau', translation: 'Boat', image: 'imgs/Listening/Boat.png' },
                    { word: 'Balle', translation: 'Ball', image: 'imgs/Listening/EN-Ball.png' },
                    { word: 'Bonbon', translation: 'Candy', image: 'imgs/Listening/Candy.png' }
                ],
                'C': [
                    { word: 'Chat', translation: 'Cat', image: 'imgs/Listening/default-catto.png' },
                    { word: 'Chien', translation: 'Dog', image: 'imgs/Listening/Dog.png' },
                    { word: 'Ciel', translation: 'Sky', image: 'imgs/Listening/Sky.png' }
                ]
            }
        },
        de: {
            letters: [
                { char: 'A', name: 'A' },
                { char: 'B', name: 'Be' },
                { char: 'C', name: 'Ce' }
            ],
            words: {
                'A': [
                    { word: 'Apfel', translation: 'Apple', image: 'imgs/Listening/Apple-L.png' },
                    { word: 'Auto', translation: 'Car', image: 'imgs/Listening/EN-Car.png' },
                    { word: 'Adler', translation: 'Eagle', image: 'imgs/Listening/Eagle.png' }
                ],
                'B': [
                    { word: 'Ball', translation: 'Ball', image: 'imgs/Listening/EN-Ball.png' },
                    { word: 'Bär', translation: 'Bear', image: 'imgs/Listening/Bear.png' },
                    { word: 'Blume', translation: 'Flower', image: 'imgs/Listening/Flower.png' }
                ],
                'C': [
                    { word: 'Computer', translation: 'Computer', image: 'imgs/Listening/Computer.png' },
                    { word: 'Clown', translation: 'Clown', image: 'imgs/Listening/Clown.png' },
                    { word: 'Creme', translation: 'Cream', image: 'imgs/Listening/Cream.png' }
                ]
            }
        },
        it: {
            letters: [
                { char: 'A', name: 'A' },
                { char: 'B', name: 'Bi' },
                { char: 'C', name: 'Ci' }
            ],
            words: {
                'A': [
                    { word: 'Albero', translation: 'Tree', image: 'imgs/Listening/Tree.png' },
                    { word: 'Ape', translation: 'Bee', image: 'imgs/Listening/Bee.png' },
                    { word: 'Amico', translation: 'Friend', image: 'imgs/Listening/Friends.png' }
                ],
                'B': [
                    { word: 'Bambino', translation: 'Child', image: 'imgs/Listening/Child.png' },
                    { word: 'Barca', translation: 'Boat', image: 'imgs/Listening/Boat.png' },
                    { word: 'Bocca', translation: 'Mouth', image: 'imgs/Listening/mouth.png' }
                ],
                'C': [
                    { word: 'Cane', translation: 'Dog', image: 'imgs/Listening/Dog.png' },
                    { word: 'Casa', translation: 'House', image: 'imgs/Listening/House.png' },
                    { word: 'Cielo', translation: 'Sky', image: 'imgs/Listening/Sky.png' }
                ]
            }
        }
    };

    // =========================================================
    // BROWSER SUPPORT CHECK
    // =========================================================
    var SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var speechRecognitionSupported = !!SpeechRecognitionAPI;

    if (!speechRecognitionSupported) {
        var banner = document.getElementById('unsupportedBanner');
        if (banner) banner.style.display = 'flex';
        console.warn('SpeechRecognition not supported in this browser.');
    } else {
        console.log('SpeechRecognition is supported!');
    }

    // =========================================================
    // STATE
    // =========================================================
    var currentLang = null;
    var currentLetter = null;
    var currentWordIndex = 0;
    var pronouncedWords = [];
    var starsAwardedLanguages = [];
    var recognition = null;
    var isListening = false;

    // =========================================================
    // AUTH HELPERS
    // =========================================================
    function isLoggedIn() {
        if (window.Auth && typeof window.Auth.isLoggedIn === 'function') {
            return window.Auth.isLoggedIn();
        }
        try {
            var user = localStorage.getItem('languageIslandUser');
            return !!(user && user !== 'null' && user !== '');
        } catch (e) {
            return false;
        }
    }

    function getCurrentUser() {
        if (window.Auth && typeof window.Auth.getCurrentUser === 'function') {
            return window.Auth.getCurrentUser();
        }
        try {
            var user = localStorage.getItem('languageIslandUser');
            if (user && user !== 'null' && user !== '') return JSON.parse(user);
        } catch (e) {}
        return null;
    }

    // =========================================================
    // PERSISTED PROGRESS
    // =========================================================
    function loadProgress() {
        try {
            var saved = localStorage.getItem('pronouncedWords');
            if (saved) pronouncedWords = JSON.parse(saved);
        } catch (e) { pronouncedWords = []; }

        try {
            var savedStars = localStorage.getItem('pronunciationStarsAwarded');
            if (savedStars) starsAwardedLanguages = JSON.parse(savedStars);
        } catch (e) { starsAwardedLanguages = []; }
    }

    function saveProgress() {
        try {
            localStorage.setItem('pronouncedWords', JSON.stringify(pronouncedWords));
        } catch (e) {}
    }

    function markStarsAwarded(langKey) {
        if (starsAwardedLanguages.indexOf(langKey) === -1) {
            starsAwardedLanguages.push(langKey);
            try {
                localStorage.setItem('pronunciationStarsAwarded', JSON.stringify(starsAwardedLanguages));
            } catch (e) {}
        }
    }

    function wordId(langKey, letterChar, word) {
        return langKey + '_' + letterChar + '_' + word;
    }

    function isWordDone(langKey, letterChar, word) {
        return pronouncedWords.indexOf(wordId(langKey, letterChar, word)) !== -1;
    }

    function markWordDone(langKey, letterChar, word) {
        var id = wordId(langKey, letterChar, word);
        if (pronouncedWords.indexOf(id) === -1) {
            pronouncedWords.push(id);
            saveProgress();
        }
    }

    function areAllWordsDone(langKey, letterChar) {
        var words = pronunciationData[langKey].words[letterChar] || [];
        return words.every(function (w) { return isWordDone(langKey, letterChar, w.word); });
    }

    function areAllLettersDone(langKey) {
        var data = pronunciationData[langKey];
        return data.letters.every(function (l) { return areAllWordsDone(langKey, l.char); });
    }

    // =========================================================
    // TEXT SIMILARITY
    // =========================================================
    function normalize(str) {
        return (str || '')
            .toLowerCase()
            .trim()
            .replace(/[.,!?؟،]/g, '');
    }

    function levenshtein(a, b) {
        var m = a.length, n = b.length;
        var dp = [];
        for (var i = 0; i <= m; i++) dp.push([i]);
        for (var j = 0; j <= n; j++) dp[0][j] = j;

        for (i = 1; i <= m; i++) {
            for (j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    function isCloseEnough(target, heard) {
        var t = normalize(target);
        var h = normalize(heard);
        if (!h) return false;
        if (t === h) return true;

        var distance = levenshtein(t, h);
        var allowance = t.length <= 3 ? 0 : (t.length <= 6 ? 1 : 2);
        return distance <= allowance;
    }

    // =========================================================
    // SPEECH SYNTHESIS
    // =========================================================
    var synth = window.speechSynthesis;

    function speakWord(text, langCode, callback) {
        if (!synth) {
            if (callback) callback();
            return;
        }
        if (synth.speaking) synth.cancel();

        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode;
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        utterance.onend = function () { if (callback) callback(); };
        utterance.onerror = function () { if (callback) callback(); };
        synth.speak(utterance);
        if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
    }

    // =========================================================
    // SPEECH RECOGNITION
    // =========================================================
    function checkPronunciation(targetWord, langCode, onDone) {
        if (!speechRecognitionSupported) {
            onDone('unsupported', null);
            return;
        }
        if (isListening) return;

        if (recognition) {
            try { recognition.abort(); } catch (e) {}
        }

        recognition = new SpeechRecognitionAPI();
        recognition.lang = langCode;
        recognition.maxAlternatives = 5;
        recognition.interimResults = false;
        recognition.continuous = false;

        isListening = true;

        recognition.onresult = function (event) {
            isListening = false;
            var alternatives = [];
            for (var i = 0; i < event.results.length; i++) {
                for (var j = 0; j < event.results[i].length; j++) {
                    alternatives.push(event.results[i][j].transcript);
                }
            }

            var matched = false;
            var bestMatch = alternatives[0] || null;
            
            for (var k = 0; k < alternatives.length; k++) {
                if (isCloseEnough(targetWord, alternatives[k])) {
                    matched = true;
                    bestMatch = alternatives[k];
                    break;
                }
            }

            onDone(matched ? 'correct' : 'incorrect', bestMatch);
        };

        recognition.onerror = function (event) {
            isListening = false;
            console.log('Recognition error:', event.error);
            if (event.error === 'no-speech') {
                onDone('no-speech', null);
            } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                onDone('not-allowed', null);
            } else if (event.error === 'audio-capture') {
                onDone('not-allowed', null);
            } else {
                onDone('error', null);
            }
        };

        recognition.onend = function () {
            isListening = false;
        };

        try {
            recognition.start();
            console.log('Listening for:', targetWord);
        } catch (e) {
            isListening = false;
            console.error('Error starting recognition:', e);
            onDone('error', null);
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
            toast._timer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
        }
    }

    // =========================================================
    // LOGIN MODAL
    // =========================================================
    function openLoginModal() {
        if (window.Auth && typeof window.Auth.showLoginPrompt === 'function') {
            window.Auth.showLoginPrompt();
        } else {
            var modal = document.getElementById('loginRequiredModal');
            if (modal) {
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
                if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
            }
        }
    }

    var loginModalClose = document.getElementById('loginModalClose');
    if (loginModalClose) {
        loginModalClose.addEventListener('click', function () {
            var modal = document.getElementById('loginRequiredModal');
            if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
        });
    }

    var loginRequiredModal = document.getElementById('loginRequiredModal');
    if (loginRequiredModal) {
        loginRequiredModal.addEventListener('click', function (e) {
            if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
        });
    }

    // =========================================================
    // MIC HELP MODAL
    // =========================================================
    function openMicHelpModal() {
        var modal = document.getElementById('micHelpModal');
        if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    }
    function closeMicHelpModal() {
        var modal = document.getElementById('micHelpModal');
        if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
    }
    var micHelpModalClose = document.getElementById('micHelpModalClose');
    if (micHelpModalClose) micHelpModalClose.addEventListener('click', closeMicHelpModal);
    var micHelpCloseBtn = document.getElementById('micHelpCloseBtn');
    if (micHelpCloseBtn) micHelpCloseBtn.addEventListener('click', closeMicHelpModal);

    // =========================================================
    // STARS MODAL
    // =========================================================
    function earnStarsForPronunciation(langKey) {
        var activityId = 'pronunciation_' + langKey + '_' + Date.now();

        if (typeof Activity !== 'undefined' && Activity.completeActivity) {
            Activity.completeActivity('pronunciation', activityId, 5)
                .then(function (data) {
                    if (data.success) {
                        showStarEarnedModal(5, data.total_stars);
                    } else {
                        showStarEarnedModal(5);
                    }
                })
                .catch(function () {
                    showStarEarnedModal(5);
                });
        } else {
            showStarEarnedModal(5);
        }
    }

    function showStarEarnedModal(stars, totalStars) {
        var existing = document.getElementById('starEarnedModal');
        if (existing) existing.remove();

        var user = getCurrentUser();
        var userName = user ? (user.first_name || user.name || 'Explorer') : 'Explorer';

        if (!totalStars) {
            var headerStars = document.getElementById('headerStars');
            if (headerStars) totalStars = parseInt(headerStars.textContent) || 0;
        }

        var modal = document.createElement('div');
        modal.id = 'starEarnedModal';
        modal.className = 'modal-backdrop star-earned-modal';
        modal.innerHTML =
            '<div class="modal-card star-earned-card">' +
                '<div class="star-icon">⭐</div>' +
                '<h2>Congrats, ' + userName + '!</h2>' +
                '<p>You earned +' + stars + ' stars for great pronunciation!</p>' +
                '<div class="star-count-display"><span>Total Stars: <strong>' + (totalStars || 0) + '</strong></span></div>' +
                '<button class="cta-btn" id="starEarnedCloseBtn">Awesome!</button>' +
            '</div>';

        document.body.appendChild(modal);
        setTimeout(function () { modal.classList.add('open'); }, 50);

        var closeBtn = document.getElementById('starEarnedCloseBtn');
        function dismiss() {
            modal.classList.remove('open');
            setTimeout(function () { modal.remove(); }, 300);
        }
        if (closeBtn) closeBtn.addEventListener('click', dismiss);
        modal.addEventListener('click', function (e) { if (e.target === modal) dismiss(); });
        setTimeout(dismiss, 5000);

        if (typeof Sound !== 'undefined' && Sound.win) Sound.win();
    }

    // =========================================================
    // RENDER LANGUAGE SELECTION - 2 ROWS, 3 COLUMNS
    // =========================================================
    function renderLanguageSelection() {
        var grid = document.getElementById('langGridPronunciation');
        if (!grid) return;

        var loggedIn = isLoggedIn();
        var user = getCurrentUser();
        var userName = user ? (user.first_name || user.name || 'Explorer') : 'Explorer';

        var msg = document.getElementById('loginStatusMsg');
        if (msg) {
            if (loggedIn) {
                msg.textContent = 'Welcome, ' + userName + '! Pick a language to start speaking.';
                msg.style.color = '#2E2657';
                msg.style.fontSize = '16px';
            } else {
                msg.innerHTML = '<strong>Sign in to unlock pronunciation practice!</strong> <a href="signin.html" style="color:#FF6F59;text-decoration:underline;">Sign In</a> or <a href="signup.html" style="color:#FF6F59;text-decoration:underline;">Create Account</a>';
                msg.style.color = '#FF6B59';
                msg.style.fontSize = '15px';
            }
        }

        var html = '';
        var langKeys = Object.keys(languages);
        
        langKeys.forEach(function (key) {
            var lang = languages[key];
            var imgSrc = langImages[key] || 'imgs/buttons/default.png';
            var total = pronunciationData[key] ? pronunciationData[key].letters.length : 0;
            var done = pronunciationData[key]
                ? pronunciationData[key].letters.filter(function (l) { return areAllWordsDone(key, l.char); }).length
                : 0;

            var isLocked = !loggedIn;
            var lockIcon = isLocked ? '<i class="fas fa-lock" style="font-size:12px;color:#8C87A8;margin-left:6px;"></i>' : '';

            html +=
                '<button class="lang-pron-btn interactive" data-lang="' + key + '" ' + (isLocked ? 'data-locked="true"' : '') + '>' +
                    '<img src="' + imgSrc + '" alt="' + lang.name + '" onerror="this.src=\'imgs/buttons/default.png\'">' +
                    '<span class="lang-label">' + lang.name + ' ' + lockIcon + '</span>' +
                    '<span class="lang-progress">' + (isLocked ? ' Locked' : done + '/' + total + ' letters') + '</span>' +
                '</button>';
        });

        grid.innerHTML = html;

        // Force 2 rows, 3 columns layout
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        grid.style.gap = '20px';
        grid.style.maxWidth = '900px';
        grid.style.margin = '0 auto';
        grid.style.padding = '0 20px';

        grid.querySelectorAll('.lang-pron-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var langKey = this.dataset.lang;
                if (isLoggedIn()) {
                    showContentForLanguage(langKey);
                } else {
                    sessionStorage.setItem('pendingPronunciationLang', langKey);
                    openLoginModal();
                }
            });
        });
    }

    // =========================================================
    // SHOW CONTENT FOR LANGUAGE
    // =========================================================
    function showContentForLanguage(langKey) {
        currentLang = langKey;
        var lang = languages[langKey];
        var data = pronunciationData[langKey];
        if (!data) { showToast('No content available for this language yet.'); return; }

        document.getElementById('langSelection').style.display = 'none';
        document.getElementById('contentSection').style.display = 'block';
        document.getElementById('selectedLangName').textContent = lang.name;

        renderLetters(langKey, data);
        document.getElementById('contentSection').scrollIntoView({ behavior: 'smooth' });
    }

    // =========================================================
    // RENDER LETTERS
    // =========================================================
    function renderLetters(langKey, data) {
        var grid = document.getElementById('lettersGrid');
        grid.innerHTML = '';

        var container = document.createElement('div');
        container.className = 'letters-container';

        data.letters.forEach(function (letter) {
            var card = document.createElement('div');
            card.className = 'letter-card interactive';

            var done = areAllWordsDone(langKey, letter.char);
            if (done) {
                card.style.borderColor = '#2E7D32';
                card.style.borderWidth = '3px';
                card.style.borderStyle = 'solid';
                card.style.background = '#F0FFF5';
            }

            card.innerHTML =
                '<span class="letter-char">' + letter.char + '</span>' +
                '<span class="letter-name">' + letter.name + '</span>';

            card.addEventListener('click', function () {
                showWordsForLetter(langKey, letter.char);
            });

            container.appendChild(card);
        });

        grid.appendChild(container);
        document.getElementById('wordsSection').style.display = 'none';
        grid.style.display = 'block';
    }

    // =========================================================
    // SHOW WORDS FOR LETTER
    // =========================================================
    function showWordsForLetter(langKey, letterChar) {
        var data = pronunciationData[langKey];
        if (!data || !data.words[letterChar]) { showToast('No words for this letter yet.'); return; }

        currentLetter = letterChar;
        currentWordIndex = 0;

        var letterInfo = data.letters.find(function (l) { return l.char === letterChar; });
        document.getElementById('lettersGrid').style.display = 'none';
        document.getElementById('wordsSection').style.display = 'block';
        document.getElementById('selectedLetterTitle').textContent =
            'Letter ' + letterChar + (letterInfo ? ' - ' + letterInfo.name : '');

        renderWordsOverview(langKey, letterChar);
        renderCurrentWord(langKey, letterChar);

        document.getElementById('wordsSection').scrollIntoView({ behavior: 'smooth' });
    }

    function renderWordsOverview(langKey, letterChar) {
        var overview = document.getElementById('wordsOverview');
        var words = pronunciationData[langKey].words[letterChar];
        overview.innerHTML = '';

        words.forEach(function (w, idx) {
            var dot = document.createElement('span');
            dot.className = 'word-dot';
            if (idx === currentWordIndex) dot.classList.add('active');
            if (isWordDone(langKey, letterChar, w.word)) dot.classList.add('done');
            overview.appendChild(dot);
        });
    }

    function renderCurrentWord(langKey, letterChar) {
        var words = pronunciationData[langKey].words[letterChar];
        var wordObj = words[currentWordIndex];
        var lang = languages[langKey];

        var practiceImage = document.getElementById('practiceImage');
        var img = document.getElementById('practiceImg');
        var emoji = document.getElementById('practiceEmoji');
        
        if (wordObj.image) {
            img.style.display = 'block';
            emoji.style.display = 'none';
            img.src = wordObj.image;
            img.onerror = function () {
                img.style.display = 'none';
                emoji.style.display = 'block';
                emoji.textContent = '';
            };
        } else {
            img.style.display = 'none';
            emoji.style.display = 'block';
            emoji.textContent = '';
        }

        document.getElementById('practiceWord').textContent = wordObj.word;
        document.getElementById('practiceTranslation').textContent = wordObj.translation;
        document.getElementById('wordPosition').textContent = (currentWordIndex + 1) + ' / ' + words.length;

        clearResultFeedback();
        renderWordsOverview(langKey, letterChar);

        var micBtn = document.getElementById('micBtn');
        var micLabel = document.getElementById('micLabel');
        if (!speechRecognitionSupported) {
            micBtn.classList.add('disabled-mic');
            micLabel.textContent = 'Mic unavailable';
        } else {
            micBtn.classList.remove('disabled-mic');
            micLabel.textContent = 'Tap & Say It';
        }

        speakWord(wordObj.word, lang.speechLang);
    }

    function clearResultFeedback() {
        var feedback = document.getElementById('resultFeedback');
        feedback.className = 'result-feedback';
        feedback.textContent = '';
    }

    function showResultFeedback(type, text) {
        var feedback = document.getElementById('resultFeedback');
        feedback.className = 'result-feedback show ' + type;
        feedback.textContent = text;
    }

    // =========================================================
    // EVENT HANDLERS
    // =========================================================
    
    var listenAgainBtn = document.getElementById('listenAgainBtn');
    if (listenAgainBtn) {
        listenAgainBtn.addEventListener('click', function () {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            var wordObj = words[currentWordIndex];
            var lang = languages[currentLang];
            speakWord(wordObj.word, lang.speechLang);
        });
    }

    var micBtn = document.getElementById('micBtn');
    if (micBtn) {
        micBtn.addEventListener('click', function () {
            if (!speechRecognitionSupported) {
                showToast('Microphone practice needs Chrome or Edge.');
                return;
            }
            if (isListening) return;
            if (!currentLang || !currentLetter) {
                showToast('Please select a letter first.');
                return;
            }

            var words = pronunciationData[currentLang].words[currentLetter];
            if (!words || currentWordIndex >= words.length) return;
            var wordObj = words[currentWordIndex];
            var lang = languages[currentLang];

            micBtn.classList.remove('correct', 'incorrect');
            micBtn.classList.add('listening');
            document.getElementById('micLabel').textContent = 'Listening...';
            showResultFeedback('listening-state', ' Listening... Say it!');

            checkPronunciation(wordObj.word, lang.speechLang, function (result, heard) {
                micBtn.classList.remove('listening');
                document.getElementById('micLabel').textContent = 'Tap & Say It';

                if (result === 'correct') {
                    micBtn.classList.add('correct');
                    showResultFeedback('correct', 'Great job! That\'s correct!');
                    if (typeof Sound !== 'undefined' && Sound.chime) Sound.chime();
                    markWordDone(currentLang, currentLetter, wordObj.word);
                    renderWordsOverview(currentLang, currentLetter);
                    checkForCompletion();
                    
                    setTimeout(function() {
                        micBtn.classList.remove('correct');
                    }, 800);
                    
                } else if (result === 'incorrect') {
                    micBtn.classList.add('incorrect');
                    showResultFeedback('incorrect', 'Try again! You said "' + (heard || '...') + '"');
                    setTimeout(function() {
                        micBtn.classList.remove('incorrect');
                    }, 800);
                } else if (result === 'no-speech') {
                    showResultFeedback('incorrect', 'I didn\'t hear anything — try again.');
                } else if (result === 'not-allowed') {
                    openMicHelpModal();
                    clearResultFeedback();
                } else {
                    showResultFeedback('incorrect', 'Something went wrong — try again.');
                }
            });
        });
    }

    var prevWordBtn = document.getElementById('prevWordBtn');
    var nextWordBtn = document.getElementById('nextWordBtn');

    if (prevWordBtn) {
        prevWordBtn.addEventListener('click', function () {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            currentWordIndex = (currentWordIndex - 1 + words.length) % words.length;
            renderCurrentWord(currentLang, currentLetter);
        });
    }

    if (nextWordBtn) {
        nextWordBtn.addEventListener('click', function () {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            currentWordIndex = (currentWordIndex + 1) % words.length;
            renderCurrentWord(currentLang, currentLetter);
        });
    }

    function checkForCompletion() {
        if (!areAllWordsDone(currentLang, currentLetter)) return;

        if (areAllLettersDone(currentLang)) {
            if (starsAwardedLanguages.indexOf(currentLang) === -1) {
                setTimeout(function () {
                    earnStarsForPronunciation(currentLang);
                    markStarsAwarded(currentLang);
                }, 1500);
                showToast('You finished pronunciation for all letters!');
            }
        } else {
            showToast(' Letter ' + currentLetter + ' complete! Keep going!');
        }
    }

    // =========================================================
    // BACK NAVIGATION
    // =========================================================
    var backToLettersBtn = document.getElementById('backToLetters');
    if (backToLettersBtn) {
        backToLettersBtn.addEventListener('click', function () {
            if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
            document.getElementById('wordsSection').style.display = 'none';
            var grid = document.getElementById('lettersGrid');
            grid.style.display = 'block';
            renderLetters(currentLang, pronunciationData[currentLang]);
            grid.scrollIntoView({ behavior: 'smooth' });
        });
    }

    var backToLangsBtn = document.getElementById('backToLangs');
    if (backToLangsBtn) {
        backToLangsBtn.addEventListener('click', function () {
            if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
            document.getElementById('contentSection').style.display = 'none';
            var langSelection = document.getElementById('langSelection');
            langSelection.style.display = 'block';
            langSelection.scrollIntoView({ behavior: 'smooth' });
            renderLanguageSelection();
        });
    }

    // =========================================================
    // RETURN FROM LOGIN
    // =========================================================
    function checkReturnFromLogin() {
        var justSignedIn = sessionStorage.getItem('justSignedIn');
        var pendingLang = sessionStorage.getItem('pendingPronunciationLang');
        if (justSignedIn === 'true' && pendingLang && isLoggedIn()) {
            sessionStorage.removeItem('justSignedIn');
            sessionStorage.removeItem('pendingPronunciationLang');
            setTimeout(function () { showContentForLanguage(pendingLang); }, 500);
        }
    }

    document.addEventListener('authChanged', function () {
        renderLanguageSelection();
    });

    // =========================================================
    // KEYBOARD SHORTCUTS
    // =========================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Space') {
            var wordsSection = document.getElementById('wordsSection');
            if (wordsSection && wordsSection.style.display !== 'none') {
                e.preventDefault();
                var micBtn = document.getElementById('micBtn');
                if (micBtn && !micBtn.disabled) {
                    micBtn.click();
                }
            }
        }
        
        if (e.key === 'ArrowLeft') {
            var wordsSection = document.getElementById('wordsSection');
            if (wordsSection && wordsSection.style.display !== 'none') {
                e.preventDefault();
                var prevBtn = document.getElementById('prevWordBtn');
                if (prevBtn) prevBtn.click();
            }
        }
        if (e.key === 'ArrowRight') {
            var wordsSection = document.getElementById('wordsSection');
            if (wordsSection && wordsSection.style.display !== 'none') {
                e.preventDefault();
                var nextBtn = document.getElementById('nextWordBtn');
                if (nextBtn) nextBtn.click();
            }
        }
    });

    // =========================================================
    // INIT
    // =========================================================
    loadProgress();
    setTimeout(function () {
        renderLanguageSelection();
        checkReturnFromLogin();
    }, 300);

    console.log('Pronunciation.js loaded successfully!');
});