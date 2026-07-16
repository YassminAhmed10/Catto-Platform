/* =========================================================
   LISTENING.JS - Unlimited Replay Version
   FIX: users can replay the same language as many times as
   they want, and total stars always updates on every full
   completion. No more "you already completed this" blocking,
   and no more fragile DOM-text-guessing to restore the view.
   ========================================================= */

console.log('Listening.js loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready for Listening page');

    // =========================================================
    // LANGUAGE DATA
    // =========================================================
    var languages = {
        en: { name: 'English', flag: 'fi-gb', color: '#4C8DAF', speechLang: 'en-US' },
        ar: { name: 'Arabic', flag: 'fi-eg', color: '#58C27D', speechLang: 'ar-SA' },
        de: { name: 'German', flag: 'fi-de', color: '#8C6FC9', speechLang: 'de-DE' },
        es: { name: 'Spanish', flag: 'fi-es', color: '#FF6F59', speechLang: 'es-ES' },
        fr: { name: 'French', flag: 'fi-fr', color: '#FFB84D', speechLang: 'fr-FR' },
        it: { name: 'Italian', flag: 'fi-it', color: '#E5563F', speechLang: 'it-IT' }
    };

    var langImages = {
        ar: 'imgs/Listening/AR-Listening.png',
        en: 'imgs/Listening/EN-Listening.png',
        fr: 'imgs/Listening/EN-Listening.png',
        de: 'imgs/Listening/EN-Listening.png',
        it: 'imgs/Listening/EN-Listening.png',
        es: 'imgs/Listening/EN-Listening.png'
    };

    // =========================================================
    // LETTERS AND WORDS DATA
    // =========================================================
    var listeningData = {
        en: {
            letters: [
                { char: 'A', name: 'A', sound: '/eɪ/' },
                { char: 'B', name: 'B', sound: '/biː/' },
                { char: 'C', name: 'C', sound: '/siː/' }
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
                { char: 'أ', name: 'ألف', sound: '/ʔalif/' },
                { char: 'ب', name: 'باء', sound: '/baːʔ/' },
                { char: 'ت', name: 'تاء', sound: '/taːʔ/' }
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
                { char: 'A', name: 'A', sound: '/a/' },
                { char: 'B', name: 'Be', sound: '/be/' },
                { char: 'C', name: 'Ce', sound: '/θe/' }
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
                { char: 'A', name: 'A', sound: '/a/' },
                { char: 'B', name: 'Bé', sound: '/be/' },
                { char: 'C', name: 'Cé', sound: '/se/' }
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
                { char: 'A', name: 'A', sound: '/aː/' },
                { char: 'B', name: 'Be', sound: '/beː/' },
                { char: 'C', name: 'Ce', sound: '/tseː/' }
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
                { char: 'A', name: 'A', sound: '/a/' },
                { char: 'B', name: 'Bi', sound: '/bi/' },
                { char: 'C', name: 'Ci', sound: '/tʃi/' }
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
    // STATE
    // NOTE: no "starsAwardedLanguages" list anymore, on purpose.
    // A language is never permanently marked as "done" — only
    // the CURRENT play-through's listened words are tracked, so
    // completion can be reached again and again.
    // =========================================================
    var currentLang = null;
    var currentLetter = null;      // tracks which letter's word list is open, so we
                                    // never have to re-read it back out of the DOM
    var listenedWords = [];
    var wordListenCount = {};
    var isAwardingStars = false;

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
    // SPEECH SYNTHESIS
    // =========================================================
    var synth = window.speechSynthesis;

    function speakText(text, langCode, callback) {
        if (!synth) {
            if (callback) callback();
            return;
        }

        if (synth.speaking) {
            synth.cancel();
        }

        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = langCode;
        utterance.rate = 0.85;
        utterance.pitch = 1.1;

        utterance.onend = function() {
            if (callback) callback();
            if (typeof Sound !== 'undefined' && Sound.chime) Sound.chime();
        };

        utterance.onerror = function() {
            if (callback) callback();
        };

        synth.speak(utterance);
        if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
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
    // SHOW STAR EARNED MODAL
    // =========================================================
    function showStarEarnedModal(stars, totalStars) {
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
                <p>You earned +${stars} stars for completing listening practice!</p>
                <div class="star-count-display">
                    <span>Total Stars: <strong id="starEarnedTotal">${totalStars || 0}</strong></span>
                </div>
                <button class="cta-btn" id="starEarnedCloseBtn">Play Again</button>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(function() {
            modal.classList.add('open');
        }, 100);

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
        }, 4000);

        if (typeof Sound !== 'undefined' && Sound.win) Sound.win();
    }

    // =========================================================
    // COMPLETE LISTENING - EARN 5 STARS, EVERY SINGLE TIME
    // FIX: resets immediately (no 3s guessing-game) and re-draws
    // whichever view (letters grid, or an open word list) the
    // user is currently looking at, using tracked state instead
    // of parsing it back out of visible text.
    // =========================================================
    function earnStarsForListening(langKey) {
        console.log('earnStarsForListening called for:', langKey);

        if (isAwardingStars) {
            console.log('Already awarding stars, skipping duplicate trigger...');
            return;
        }
        isAwardingStars = true;

        var headerStars = document.getElementById('headerStars');
        var currentStars = parseInt(headerStars ? headerStars.textContent : 0) || 0;
        var newTotal = currentStars + 5;
        console.log('Current total stars:', currentStars, '-> New total:', newTotal);

        // 1) Update the header + localStorage immediately.
        updateHeaderStars(newTotal);

        // 2) Reset the play-through state right away, so the user
        //    is free to start again the instant they want to —
        //    no waiting, no permanent "done" flag anywhere.
        resetWordsForLanguage(langKey);
        refreshCurrentView(langKey);

        // 3) Let them know, and let them close it manually or
        //    let it auto-dismiss — either way replay is already
        //    unlocked underneath it.
        showStarEarnedModal(5, newTotal);
        showToast('Great job! You can listen again to earn more stars.');

        // 4) Persist to the backend. A fresh, unique activity_id
        //    every time means save_activity.php never rejects
        //    this as a duplicate — every full playthrough counts.
        if (typeof Activity !== 'undefined' && Activity.completeActivity) {
            var activityId = 'listening_' + langKey + '_' + Date.now();
            console.log('Sending to Activity system:', activityId);

            Activity.completeActivity('listening', activityId, 5)
                .then(function(data) {
                    console.log('Activity response:', data);
                    if (data && data.success && typeof data.total_stars !== 'undefined') {
                        // Trust the server's number as the source of truth
                        // once it responds, in case of any drift.
                        updateHeaderStars(data.total_stars);
                    }
                })
                .catch(function(err) {
                    console.error('Error saving activity:', err);
                })
                .finally(function() {
                    isAwardingStars = false;
                });
        } else {
            console.warn('Activity system not available, stars saved locally only');
            isAwardingStars = false;
        }
    }

    // =========================================================
    // RESET WORDS FOR LANGUAGE - Allow immediate replay
    // =========================================================
    function resetWordsForLanguage(langKey) {
        listenedWords = [];
        wordListenCount = {};
        console.log('Reset words for language:', langKey, '- ready to replay');
    }

    // =========================================================
    // REFRESH WHATEVER VIEW IS CURRENTLY VISIBLE
    // Replaces the old fragile "parse the title text" approach.
    // =========================================================
    function refreshCurrentView(langKey) {
        var wordsSection = document.getElementById('wordsSection');
        var wordsVisible = wordsSection && wordsSection.style.display !== 'none';

        if (wordsVisible && currentLetter) {
            // They were mid-way through a letter's word list — redraw
            // that same letter's words, now unlocked again.
            showWordsForLetter(langKey, currentLetter);
        } else {
            // Otherwise just refresh the letters grid.
            renderLetters(langKey, listeningData[langKey]);
        }
    }

    // =========================================================
    // CHECK COMPLETION (for the CURRENT play-through only)
    // =========================================================
    function isWordListened(langKey, letterChar, wordText) {
        var id = langKey + '_' + letterChar + '_' + wordText;
        return listenedWords.indexOf(id) !== -1;
    }

    function areAllWordsListened(langKey, letterChar) {
        var data = listeningData[langKey];
        if (!data || !data.words[letterChar]) return false;

        var words = data.words[letterChar];
        return words.every(function(w) {
            return isWordListened(langKey, letterChar, w.word);
        });
    }

    function areAllLettersCompleted(langKey) {
        var data = listeningData[langKey];
        if (!data) return false;

        return data.letters.every(function(letter) {
            return areAllWordsListened(langKey, letter.char);
        });
    }

    // =========================================================
    // RENDER LANGUAGE SELECTION
    // =========================================================
    function renderLanguageSelection() {
        var grid = document.getElementById('langGridListening');
        if (!grid) return;

        var isLoggedInUser = isLoggedIn();

        var loginMsg = document.getElementById('loginStatusMsg');
        if (loginMsg) {
            if (isLoggedInUser) {
                loginMsg.textContent = '';
            } else {
                loginMsg.textContent = 'Sign in to unlock all listening activities.';
                loginMsg.style.color = '#FF6B59';
            }
        }

        var html = '';
        var langKeys = Object.keys(languages);
        langKeys.forEach(function(key) {
            var lang = languages[key];
            var imgSrc = langImages[key] || 'imgs/buttons/default.png';

            html += `
                <button class="lang-listening-btn" data-lang="${key}">
                    <img src="${imgSrc}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
                    <span class="lang-label">${lang.name}</span>
                </button>
            `;
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.lang-listening-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var langKey = this.dataset.lang;
                if (isLoggedIn()) {
                    showContentForLanguage(langKey);
                } else {
                    sessionStorage.setItem('pendingListeningLang', langKey);
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
        currentLetter = null;
        var lang = languages[langKey];
        var data = listeningData[langKey];

        if (!data) {
            showToast('No content available for this language yet.');
            return;
        }

        var langSelection = document.getElementById('langSelection');
        var contentSection = document.getElementById('contentSection');
        var selectedLangName = document.getElementById('selectedLangName');

        if (langSelection) langSelection.style.display = 'none';
        if (contentSection) contentSection.style.display = 'block';
        if (selectedLangName) selectedLangName.textContent = lang.name;

        // Always start this visit with a clean slate — a language
        // is never "locked" from being played again.
        resetWordsForLanguage(langKey);

        renderLetters(langKey, data);
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // =========================================================
    // RENDER LETTERS
    // =========================================================
    function renderLetters(langKey, data) {
        var grid = document.getElementById('lettersGrid');
        if (!grid) return;
        grid.innerHTML = '';

        var container = document.createElement('div');
        container.className = 'letters-container';

        data.letters.forEach(function(letter) {
            var card = document.createElement('div');
            card.className = 'letter-card interactive';
            card.dataset.letter = letter.char;
            card.dataset.lang = langKey;

            var allWordsListened = areAllWordsListened(langKey, letter.char);

            if (allWordsListened) {
                card.style.borderColor = '#2E7D32';
                card.style.borderWidth = '3px';
                card.style.borderStyle = 'solid';
                card.style.background = '#F0FFF5';
            }

            var playBtn = document.createElement('button');
            playBtn.className = 'letter-play';
            playBtn.dataset.letter = letter.char;
            playBtn.dataset.lang = langKey;
            playBtn.innerHTML = 'Play';

            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var letter = this.dataset.letter;
                var lang = languages[this.dataset.lang];
                if (lang) {
                    var playBtnEl = this;
                    playBtnEl.textContent = 'Speaking...';
                    playBtnEl.disabled = true;
                    speakText(letter, lang.speechLang);
                    setTimeout(function() {
                        playBtnEl.textContent = 'Play';
                        playBtnEl.disabled = false;
                    }, 1500);
                }
            });

            card.appendChild(playBtn);

            var charSpan = document.createElement('span');
            charSpan.className = 'letter-char';
            charSpan.textContent = letter.char;
            card.appendChild(charSpan);

            var nameSpan = document.createElement('span');
            nameSpan.className = 'letter-name';
            nameSpan.textContent = letter.name;
            card.appendChild(nameSpan);

            var soundSpan = document.createElement('span');
            soundSpan.className = 'letter-sound';
            soundSpan.textContent = letter.sound;
            card.appendChild(soundSpan);

            card.addEventListener('click', function(e) {
                if (!e.target.closest('.letter-play')) {
                    showWordsForLetter(langKey, letter.char);
                }
            });

            container.appendChild(card);
        });

        grid.appendChild(container);

        var wordsSection = document.getElementById('wordsSection');
        if (wordsSection) wordsSection.style.display = 'none';
        grid.style.display = 'block';
    }

    // =========================================================
    // SHOW WORDS FOR LETTER
    // =========================================================
    function showWordsForLetter(langKey, letterChar) {
        var data = listeningData[langKey];
        if (!data || !data.words[letterChar]) {
            showToast('No words for this letter yet.');
            return;
        }

        currentLetter = letterChar; // track it — no more guessing later

        var words = data.words[letterChar];
        var letterInfo = data.letters.find(function(l) { return l.char === letterChar; });

        var lettersGrid = document.getElementById('lettersGrid');
        var wordsSection = document.getElementById('wordsSection');
        var selectedLetterTitle = document.getElementById('selectedLetterTitle');

        if (lettersGrid) lettersGrid.style.display = 'none';
        if (wordsSection) wordsSection.style.display = 'block';
        if (selectedLetterTitle) {
            selectedLetterTitle.textContent = 'Letter ' + letterChar + ' - ' + (letterInfo ? letterInfo.name : '');
        }

        var grid = document.getElementById('wordsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        words.forEach(function(wordObj) {
            var wordId = langKey + '_' + letterChar + '_' + wordObj.word;
            var isListened = listenedWords.indexOf(wordId) !== -1;

            var card = document.createElement('div');
            card.className = 'word-card interactive';
            card.dataset.wordId = wordId;
            card.dataset.word = wordObj.word;

            if (isListened) {
                card.style.borderColor = '#2E7D32';
                card.style.borderWidth = '3px';
                card.style.borderStyle = 'solid';
                card.style.background = '#F0FFF5';
            }

            var imageContainer = document.createElement('div');
            imageContainer.className = 'word-image-container';

            if (wordObj.image) {
                var img = document.createElement('img');
                img.src = wordObj.image;
                img.alt = wordObj.word;
                img.className = 'word-image';
                img.onerror = function() {
                    imageContainer.innerHTML = '📄';
                };
                imageContainer.appendChild(img);
            } else {
                imageContainer.innerHTML = '📄';
            }

            card.appendChild(imageContainer);

            var wordText = document.createElement('span');
            wordText.className = 'word-text';
            wordText.textContent = wordObj.word;
            card.appendChild(wordText);

            var translation = document.createElement('span');
            translation.className = 'word-translation';
            translation.textContent = wordObj.translation;
            card.appendChild(translation);

            var playBtn = document.createElement('button');
            playBtn.className = 'word-play-btn';
            playBtn.dataset.word = wordObj.word;
            playBtn.dataset.lang = langKey;
            playBtn.dataset.letter = letterChar;
            playBtn.dataset.wordId = wordId;

            var listenCount = wordListenCount[wordId] || 0;
            playBtn.textContent = listenCount > 0 ? 'Listen (' + listenCount + ')' : 'Listen';

            if (isListened) {
                playBtn.style.background = '#2E7D32';
                playBtn.style.color = '#FFFFFF';
                playBtn.style.boxShadow = '0 4px 0 #1a6b2a';
            } else {
                playBtn.style.background = '#FFD23F';
                playBtn.style.color = '#2E2657';
                playBtn.style.boxShadow = '0 4px 0 #E5B800';
            }

            // IMPORTANT: never permanently disabled — always
            // clickable, so the user can re-listen at any time.
            playBtn.disabled = false;

            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var wordTextValue = this.dataset.word;
                var lang = languages[this.dataset.lang];
                var letter = this.dataset.letter;
                var wId = this.dataset.wordId;

                if (lang) {
                    var playBtnEl = this;
                    playBtnEl.textContent = 'Speaking...';
                    playBtnEl.style.background = '#FF6B59';
                    playBtnEl.style.color = '#FFFFFF';
                    playBtnEl.style.boxShadow = '0 4px 0 #C94E4E';
                    playBtnEl.disabled = true;

                    speakText(wordTextValue, lang.speechLang, function() {
                        wordListenCount[wId] = (wordListenCount[wId] || 0) + 1;

                        if (listenedWords.indexOf(wId) === -1) {
                            listenedWords.push(wId);
                        }

                        var wordCard = playBtnEl.closest('.word-card');
                        if (wordCard) {
                            wordCard.style.borderColor = '#2E7D32';
                            wordCard.style.borderWidth = '3px';
                            wordCard.style.borderStyle = 'solid';
                            wordCard.style.background = '#F0FFF5';
                        }

                        var count = wordListenCount[wId] || 0;
                        playBtnEl.textContent = 'Listen (' + count + ')';
                        playBtnEl.style.background = '#2E7D32';
                        playBtnEl.style.color = '#FFFFFF';
                        playBtnEl.style.boxShadow = '0 4px 0 #1a6b2a';
                        playBtnEl.disabled = false; // stays clickable, always

                        if (areAllWordsListened(langKey, letter)) {
                            if (areAllLettersCompleted(langKey)) {
                                console.log('ALL LETTERS COMPLETED for language:', langKey, '- awarding stars');
                                setTimeout(function() {
                                    earnStarsForListening(langKey);
                                }, 800);
                            } else {
                                showToast('Letter ' + letter + ' completed!');
                            }
                        }
                    });
                }
            });

            card.appendChild(playBtn);
            grid.appendChild(card);
        });

        if (wordsSection) {
            wordsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // =========================================================
    // BACK TO LETTERS
    // =========================================================
    var backToLettersBtn = document.getElementById('backToLetters');
    if (backToLettersBtn) {
        backToLettersBtn.addEventListener('click', function() {
            if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();

            currentLetter = null;

            var wordsSection = document.getElementById('wordsSection');
            if (wordsSection) wordsSection.style.display = 'none';

            if (currentLang && listeningData[currentLang]) {
                renderLetters(currentLang, listeningData[currentLang]);
            }

            var lettersGrid = document.getElementById('lettersGrid');
            if (lettersGrid) {
                lettersGrid.style.display = 'block';
                lettersGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // =========================================================
    // BACK TO LANGUAGES
    // =========================================================
    var backToLangsBtn = document.getElementById('backToLangs');
    if (backToLangsBtn) {
        backToLangsBtn.addEventListener('click', function() {
            if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();

            var contentSection = document.getElementById('contentSection');
            var langSelection = document.getElementById('langSelection');

            if (contentSection) contentSection.style.display = 'none';
            if (langSelection) {
                langSelection.style.display = 'block';
                langSelection.scrollIntoView({ behavior: 'smooth' });
            }

            renderLanguageSelection();
        });
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
    // LOGIN MODAL
    // =========================================================
    function openLoginModal() {
        var modal = document.getElementById('loginRequiredModal');
        if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (typeof Sound !== 'undefined' && Sound.pop) Sound.pop();
        }
    }

    var loginModalClose = document.getElementById('loginModalClose');
    if (loginModalClose) {
        loginModalClose.addEventListener('click', function() {
            var modal = document.getElementById('loginRequiredModal');
            if (modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    var loginRequiredModal = document.getElementById('loginRequiredModal');
    if (loginRequiredModal) {
        loginRequiredModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================================
    // LISTEN FOR STAR UPDATES (from other pages/tabs)
    // =========================================================
    document.addEventListener('starsUpdated', function(e) {
        var headerStars = document.getElementById('headerStars');
        if (headerStars) headerStars.textContent = e.detail.totalStars || 0;
    });

    // =========================================================
    // CHECK FOR RETURN FROM LOGIN
    // =========================================================
    function checkReturnFromLogin() {
        var justSignedIn = sessionStorage.getItem('justSignedIn');
        if (justSignedIn === 'true') {
            sessionStorage.removeItem('justSignedIn');
            var pendingLang = sessionStorage.getItem('pendingListeningLang');
            if (pendingLang && isLoggedIn()) {
                sessionStorage.removeItem('pendingListeningLang');
                setTimeout(function() {
                    showContentForLanguage(pendingLang);
                }, 500);
            }
        }
    }

    // =========================================================
    // LISTEN FOR AUTH CHANGES
    // =========================================================
    document.addEventListener('authChanged', function(e) {
        console.log('Auth changed event received:', e.detail);
        renderLanguageSelection();

        if (e.detail && e.detail.loggedIn) {
            var pendingLang = sessionStorage.getItem('pendingListeningLang');
            if (pendingLang) {
                sessionStorage.removeItem('pendingListeningLang');
                setTimeout(function() {
                    showContentForLanguage(pendingLang);
                }, 500);
            }
        }
    });

    // =========================================================
    // ADD CSS STYLES
    // =========================================================
    function addListeningStyles() {
        if (document.getElementById('listening-styles')) return;

        var style = document.createElement('style');
        style.id = 'listening-styles';
        style.textContent = `
            .letter-card {
                border: 3px solid transparent;
                transition: all 0.3s ease;
                position: relative;
                padding: 16px;
                border-radius: 12px;
                text-align: center;
                background: #FFFFFF;
                cursor: pointer;
                box-shadow: 0 4px 0 rgba(46,38,87,0.06);
            }

            .letter-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 0 rgba(46,38,87,0.06);
            }

            .letter-play {
                position: absolute;
                top: 8px;
                right: 8px;
                padding: 4px 12px;
                border-radius: 999px;
                border: none;
                background: #F1EEFB;
                color: #2E2657;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Baloo 2', cursive;
                font-weight: 600;
                font-size: 12px;
            }

            .letter-play:hover:not(:disabled) {
                background: #FFD23F;
                transform: scale(1.05);
            }

            .letter-play:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .letter-char {
                font-size: 32px;
                font-weight: 800;
                display: block;
                font-family: 'Baloo 2', cursive;
                color: #2E2657;
            }

            .letter-name {
                font-size: 14px;
                font-weight: 600;
                color: #5A5184;
                display: block;
            }

            .letter-sound {
                font-size: 12px;
                color: #8C87A8;
                display: block;
            }

            .word-card {
                border: 3px solid #F1EEFB;
                transition: all 0.3s ease;
                padding: 16px;
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                background: #FFFFFF;
                box-shadow: 0 4px 0 rgba(46,38,87,0.06);
            }

            .word-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 0 rgba(46,38,87,0.06);
            }

            .word-image-container {
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #F8F7FF;
                border-radius: 12px;
                overflow: hidden;
            }

            .word-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .word-text {
                font-family: 'Baloo 2', cursive;
                font-size: 20px;
                font-weight: 700;
                color: #2E2657;
            }

            .word-translation {
                font-size: 14px;
                color: #8C87A8;
                font-weight: 600;
            }

            .word-play-btn {
                padding: 8px 20px;
                border: none;
                border-radius: 999px;
                font-family: 'Baloo 2', cursive;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }

            .word-play-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .word-play-btn:not(:disabled):hover {
                transform: translateY(-2px);
            }

            .word-play-btn:not(:disabled):active {
                transform: translateY(2px);
            }

            .star-earned-modal .modal-card.star-earned-card {
                max-width: 380px;
                padding: 30px 24px 28px;
                text-align: center;
                background: #FFFFFF;
                border: 3px solid #FFD23F;
                border-radius: 28px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            }

            .star-earned-card .star-icon {
                width: 100px;
                height: 100px;
                margin: 0 auto 12px;
            }

            .star-earned-card .star-icon img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .star-earned-card h2 {
                font-family: 'Baloo 2', cursive;
                font-size: 24px;
                color: #2E2657;
                margin: 0 0 4px;
            }

            .star-earned-card p {
                color: #8C87A8;
                font-weight: 600;
                font-size: 15px;
                margin: 0 0 16px;
            }

            .star-earned-card .star-count-display {
                background: #FFF5E0;
                padding: 8px 20px;
                border-radius: 999px;
                display: inline-block;
                margin-bottom: 20px;
                font-family: 'Baloo 2', cursive;
                font-size: 16px;
                color: #2E2657;
                border: 2px solid #FFD23F;
            }

            .star-earned-card .star-count-display strong {
                color: #E5563F;
                font-size: 20px;
            }

            .star-earned-card .cta-btn {
                background: #FF6B59;
                color: #FFFFFF;
                border: none;
                padding: 10px 32px;
                border-radius: 999px;
                font-family: 'Baloo 2', cursive;
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                box-shadow: 0 5px 0 #C94E4E;
                transition: all 0.15s ease;
            }

            .star-earned-card .cta-btn:hover {
                transform: translateY(-2px);
            }

            .star-earned-card .cta-btn:active {
                transform: translateY(3px);
                box-shadow: 0 2px 0 #C94E4E;
            }

            .words-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 16px;
                margin-top: 16px;
            }

            .words-header {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 16px;
                flex-wrap: wrap;
            }
        `;
        document.head.appendChild(style);
    }

    // =========================================================
    // INIT
    // =========================================================
    addListeningStyles();

    setTimeout(function() {
        renderLanguageSelection();
        checkReturnFromLogin();
    }, 300);

    console.log('Listening.js loaded successfully! (unlimited replay enabled)');
});