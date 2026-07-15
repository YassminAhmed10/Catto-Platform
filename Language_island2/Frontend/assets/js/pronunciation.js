/* =========================================================
   PRONUNCIATION.JS - Speak & Practice Page (FIXED)
   ========================================================= */

console.log('Pronunciation.js loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM ready for Pronunciation page');

    // =========================================================
    // LANGUAGE DATA
    // =========================================================
    var languages = {
        en: { name: 'English', color: '#4C8DAF', speechLang: 'en-US', flag: 'us' },
        ar: { name: 'Arabic', color: '#58C27D', speechLang: 'ar-SA', flag: 'sa' },
        de: { name: 'German', color: '#8C6FC9', speechLang: 'de-DE', flag: 'de' },
        es: { name: 'Spanish', color: '#FF6F59', speechLang: 'es-ES', flag: 'es' },
        fr: { name: 'French', color: '#FFB84D', speechLang: 'fr-FR', flag: 'fr' },
        it: { name: 'Italian', color: '#E5563F', speechLang: 'it-IT', flag: 'it' }
    };

    var langImages = {
        ar: 'imgs/Speaking/Speak-AR.png',
        en: 'imgs/Speaking/Speak-EN.png',
        fr: 'imgs/Speaking/Speak-FR.png',
        de: 'imgs/Speaking/Speak-DE.png',
        it: 'imgs/Speaking/Speak-IT.png',
        es: 'imgs/Speaking/Speak-ES.png'
    };

    // =========================================================
    // PRONUNCIATION DATA
    // =========================================================
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
    var recognition = null;
    var isListening = false;
    var isProcessing = false;

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
    // TEXT SIMILARITY - ENHANCED
    // =========================================================
    function normalize(str) {
        return (str || '')
            .toLowerCase()
            .trim()
            .replace(/[.,!?؟،-]/g, '')
            .replace(/\s+/g, ' ');
    }

    function getPhoneticPattern(word) {
        var patterns = {
            'apple': 'apel',
            'ant': 'ant',
            'ball': 'bol',
            'bird': 'berd',
            'cat': 'kat',
            'car': 'kar',
            'cup': 'kap',
            'dog': 'dog',
            'fish': 'fish',
            'tree': 'tri',
            'house': 'haus',
            'water': 'woter',
            'bee': 'bi',
            'boat': 'bot',
            'sky': 'skai',
            'star': 'star',
            'moon': 'mun',
            'sun': 'san',
            'rain': 'rein',
            'snow': 'sno',
            'cloud': 'klaud',
            'book': 'buk',
            'pen': 'pen',
            'desk': 'desk',
            'chair': 'cher',
            'table': 'tebel',
            'door': 'dor',
            'window': 'windo',
            'flower': 'flauer',
            'garden': 'garden',
            'animal': 'animal',
            'friend': 'frend',
            'family': 'fameli',
            'school': 'skul',
            'teacher': 'ticher',
            'student': 'stjudent',
            'happy': 'hapi',
            'sad': 'sad',
            'big': 'big',
            'small': 'smol',
            'fast': 'fast',
            'slow': 'slo',
            'alligator': 'aligeitor',
            'butterfly': 'baterflai'
        };
        
        var normalized = normalize(word);
        return patterns[normalized] || normalized;
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

        if (t.length > 3 && h.indexOf(t) !== -1) return true;
        if (h.length > 3 && t.indexOf(h) !== -1) return true;

        var targetPattern = getPhoneticPattern(target);
        var heardPattern = getPhoneticPattern(heard);
        
        var distance = Math.min(levenshtein(t, h), levenshtein(targetPattern, heardPattern));
        var allowance = t.length <= 3 ? 1 : (t.length <= 6 ? 2 : 3);
        
        if (t.length > 3) allowance += 1;
        
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
        utterance.rate = 0.7;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        utterance.onend = function() { if (callback) callback(); };
        utterance.onerror = function() { if (callback) callback(); };
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
        if (isProcessing) return;

        if (recognition) {
            try { recognition.abort(); } catch (e) {}
            recognition = null;
        }

        recognition = new SpeechRecognitionAPI();
        recognition.lang = langCode;
        recognition.maxAlternatives = 10;
        recognition.interimResults = true;
        recognition.continuous = false;

        isListening = true;

        var finalTranscript = '';
        var allAlternatives = [];

        recognition.onresult = function(event) {
            var lastIndex = event.results.length - 1;
            
            for (var i = 0; i < event.results.length; i++) {
                for (var j = 0; j < event.results[i].length; j++) {
                    allAlternatives.push(event.results[i][j].transcript);
                }
            }

            if (event.results[lastIndex].isFinal) {
                finalTranscript = event.results[lastIndex][0].transcript;
            }
        };

        recognition.onerror = function(event) {
            isListening = false;
            isProcessing = false;
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

        recognition.onend = function() {
            isListening = false;
            isProcessing = false;
            
            var heard = finalTranscript || (allAlternatives.length > 0 ? allAlternatives[0] : null);
            
            if (heard) {
                var matched = false;
                for (var k = 0; k < allAlternatives.length; k++) {
                    if (isCloseEnough(targetWord, allAlternatives[k])) {
                        matched = true;
                        heard = allAlternatives[k];
                        break;
                    }
                }
                
                if (matched) {
                    onDone('correct', heard);
                } else {
                    onDone('incorrect', heard);
                }
            } else {
                onDone('no-speech', null);
            }
        };

        try {
            recognition.start();
            console.log('Listening for:', targetWord);
            setTimeout(function() {
                if (isListening) {
                    try {
                        recognition.stop();
                    } catch(e) {}
                }
            }, 5000);
        } catch (e) {
            isListening = false;
            isProcessing = false;
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
            toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 3000);
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
        loginModalClose.addEventListener('click', function() {
            var modal = document.getElementById('loginRequiredModal');
            if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
        });
    }

    var loginRequiredModal = document.getElementById('loginRequiredModal');
    if (loginRequiredModal) {
        loginRequiredModal.addEventListener('click', function(e) {
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
    // RENDER LANGUAGE SELECTION
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
                msg.textContent = 'Welcome, ' + userName + '! Pick a language to practice speaking.';
                msg.style.color = '#2E2657';
                msg.style.fontSize = '16px';
            } else {
                msg.innerHTML = '<strong><i class="fas fa-lock"></i> Sign in to unlock pronunciation practice!</strong> <a href="signin.html" style="color:#FF6F59;text-decoration:underline;">Sign In</a> or <a href="signup.html" style="color:#FF6F59;text-decoration:underline;">Create Account</a>';
                msg.style.color = '#FF6B59';
                msg.style.fontSize = '15px';
            }
        }

        var html = '';
        var langKeys = Object.keys(languages);
        
        langKeys.forEach(function(key) {
            var lang = languages[key];
            var imgSrc = langImages[key] || 'imgs/buttons/default.png';
            var total = pronunciationData[key] ? pronunciationData[key].letters.length : 0;

            var isLocked = !loggedIn;
            var lockIcon = isLocked ? '<i class="fas fa-lock" style="font-size:12px;color:#8C87A8;margin-left:6px;"></i>' : '';

            html +=
                '<button class="lang-pron-btn interactive" data-lang="' + key + '" ' + (isLocked ? 'data-locked="true"' : '') + '>' +
                    '<img src="' + imgSrc + '" alt="' + lang.name + '" onerror="this.src=\'imgs/buttons/default.png\'">' +
                    '<span class="lang-label">' + lang.name + ' ' + lockIcon + '</span>' +
                    '<span class="lang-progress">' + (isLocked ? '<i class="fas fa-lock"></i> Locked' : total + ' letters') + '</span>' +
                '</button>';
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.lang-pron-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
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
    // RENDER LETTERS - NO COMPLETION CHECK
    // =========================================================
    function renderLetters(langKey, data) {
        var grid = document.getElementById('lettersGrid');
        grid.innerHTML = '';

        var container = document.createElement('div');
        container.className = 'letters-container';

        data.letters.forEach(function(letter) {
            var card = document.createElement('div');
            card.className = 'letter-card interactive';
            card.innerHTML =
                '<span class="letter-char">' + letter.char + '</span>' +
                '<span class="letter-name">' + letter.name + '</span>';

            card.addEventListener('click', function() {
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

        var letterInfo = data.letters.find(function(l) { return l.char === letterChar; });
        document.getElementById('lettersGrid').style.display = 'none';
        document.getElementById('wordsSection').style.display = 'block';
        
        // FIX: Use innerHTML for HTML content
        var titleEl = document.getElementById('selectedLetterTitle');
        if (titleEl) {
            titleEl.innerHTML = '<i class="fas fa-pencil-alt"></i> Letter ' + letterChar + (letterInfo ? ' - ' + letterInfo.name : '');
        }

        renderCurrentWord(langKey, letterChar);
        document.getElementById('wordsSection').scrollIntoView({ behavior: 'smooth' });
    }

    function renderCurrentWord(langKey, letterChar) {
        var words = pronunciationData[langKey].words[letterChar];
        var wordObj = words[currentWordIndex];
        var lang = languages[langKey];

        // Update image
        var practiceImage = document.getElementById('practiceImage');
        var img = document.getElementById('practiceImg');
        var emoji = document.getElementById('practiceEmoji');
        
        if (wordObj.image && wordObj.image.length > 0) {
            img.style.display = 'block';
            emoji.style.display = 'none';
            img.src = wordObj.image;
            img.onerror = function() {
                img.style.display = 'none';
                emoji.style.display = 'block';
                emoji.textContent = '📄';
            };
        } else {
            img.style.display = 'none';
            emoji.style.display = 'block';
            emoji.textContent = '📄';
        }

        // Update text
        document.getElementById('practiceWord').textContent = wordObj.word;
        document.getElementById('practiceTranslation').textContent = wordObj.translation;
        document.getElementById('wordPosition').textContent = (currentWordIndex + 1) + ' / ' + words.length;

        // Update mic button
        var micBtn = document.getElementById('micBtn');
        var micLabel = document.getElementById('micLabel');
        if (!speechRecognitionSupported) {
            micBtn.classList.add('disabled-mic');
            micLabel.innerHTML = '<i class="fas fa-microphone-slash"></i> Mic unavailable';
        } else {
            micBtn.classList.remove('disabled-mic');
            micLabel.innerHTML = '<i class="fas fa-microphone"></i> Tap & Say It';
        }

        clearResultFeedback();
        
        // Auto-speak the word
        setTimeout(function() {
            speakWord(wordObj.word, lang.speechLang);
        }, 300);
    }

    function clearResultFeedback() {
        var feedback = document.getElementById('resultFeedback');
        feedback.className = 'result-feedback';
        feedback.innerHTML = '';
    }

    function showResultFeedback(type, text) {
        var feedback = document.getElementById('resultFeedback');
        feedback.className = 'result-feedback show ' + type;
        feedback.innerHTML = text;
    }

    // =========================================================
    // EVENT HANDLERS
    // =========================================================
    
    var listenAgainBtn = document.getElementById('listenAgainBtn');
    if (listenAgainBtn) {
        listenAgainBtn.addEventListener('click', function() {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            var wordObj = words[currentWordIndex];
            var lang = languages[currentLang];
            speakWord(wordObj.word, lang.speechLang);
        });
    }

    var micBtn = document.getElementById('micBtn');
    if (micBtn) {
        micBtn.addEventListener('click', function() {
            if (!speechRecognitionSupported) {
                showToast('Microphone practice needs Chrome or Edge.');
                return;
            }
            if (isListening || isProcessing) return;
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
            document.getElementById('micLabel').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Listening...';
            showResultFeedback('listening-state', '<i class="fas fa-ear-listen"></i> Listening... Say the word!');

            isProcessing = true;

            checkPronunciation(wordObj.word, lang.speechLang, function(result, heard) {
                micBtn.classList.remove('listening');
                document.getElementById('micLabel').innerHTML = '<i class="fas fa-microphone"></i> Tap & Say It';
                isProcessing = false;

                if (result === 'correct') {
                    micBtn.classList.add('correct');
                    showResultFeedback('correct', '<i class="fas fa-check-circle"></i> Great job! That\'s correct!');
                    if (typeof Sound !== 'undefined' && Sound.chime) Sound.chime();
                    
                    // Auto-advance to next word after delay
                    var wordsList = pronunciationData[currentLang].words[currentLetter];
                    if (currentWordIndex < wordsList.length - 1) {
                        setTimeout(function() {
                            currentWordIndex++;
                            renderCurrentWord(currentLang, currentLetter);
                        }, 1200);
                    } else {
                        setTimeout(function() {
                            showToast('🎉 You completed all words for this letter!');
                        }, 1200);
                    }
                    
                    setTimeout(function() {
                        micBtn.classList.remove('correct');
                    }, 800);
                    
                } else if (result === 'incorrect') {
                    micBtn.classList.add('incorrect');
                    var heardText = heard ? ' "' + heard + '"' : '';
                    showResultFeedback('incorrect', '<i class="fas fa-times-circle"></i> Try again! You said:' + heardText);
                    setTimeout(function() {
                        micBtn.classList.remove('incorrect');
                        speakWord(wordObj.word, lang.speechLang);
                    }, 800);
                } else if (result === 'no-speech') {
                    showResultFeedback('incorrect', '<i class="fas fa-volume-mute"></i> I didn\'t hear anything — try again.');
                } else if (result === 'not-allowed') {
                    openMicHelpModal();
                    clearResultFeedback();
                } else {
                    showResultFeedback('incorrect', '<i class="fas fa-exclamation-triangle"></i> Something went wrong — try again.');
                }
            });
        });
    }

    var prevWordBtn = document.getElementById('prevWordBtn');
    var nextWordBtn = document.getElementById('nextWordBtn');

    if (prevWordBtn) {
        prevWordBtn.addEventListener('click', function() {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            if (currentWordIndex > 0) {
                currentWordIndex--;
                renderCurrentWord(currentLang, currentLetter);
            }
        });
    }

    if (nextWordBtn) {
        nextWordBtn.addEventListener('click', function() {
            if (!currentLang || !currentLetter) return;
            var words = pronunciationData[currentLang].words[currentLetter];
            if (currentWordIndex < words.length - 1) {
                currentWordIndex++;
                renderCurrentWord(currentLang, currentLetter);
            }
        });
    }

    // =========================================================
    // BACK NAVIGATION
    // =========================================================
    var backToLettersBtn = document.getElementById('backToLetters');
    if (backToLettersBtn) {
        backToLettersBtn.addEventListener('click', function() {
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
        backToLangsBtn.addEventListener('click', function() {
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
            setTimeout(function() { showContentForLanguage(pendingLang); }, 500);
        }
    }

    document.addEventListener('authChanged', function() {
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
    setTimeout(function() {
        renderLanguageSelection();
        checkReturnFromLogin();
    }, 300);

    console.log('Pronunciation.js loaded successfully!');
});