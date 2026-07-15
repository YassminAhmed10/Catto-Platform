/* =========================================================
   LISTENING.JS
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
    // =========================================================
    var currentLang = null;
    var listenedWords = [];
    var starsAwardedLanguages = [];

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
    // LOAD STARS AWARDED
    // =========================================================
    function loadStarsAwarded() {
        try {
            var saved = localStorage.getItem('starsAwardedLanguages');
            if (saved) {
                starsAwardedLanguages = JSON.parse(saved);
            }
        } catch(e) {
            starsAwardedLanguages = [];
        }
        console.log('Loaded starsAwardedLanguages:', starsAwardedLanguages);
    }

    function markStarsAwarded(langKey) {
        if (starsAwardedLanguages.indexOf(langKey) === -1) {
            starsAwardedLanguages.push(langKey);
            try {
                localStorage.setItem('starsAwardedLanguages', JSON.stringify(starsAwardedLanguages));
            } catch(e) {}
            console.log('Marked stars awarded for:', langKey);
        }
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
            console.log('Header stars updated to:', headerStars.textContent);
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
                <h2>🎉 Congrats, ${userName}!</h2>
                <p>You earned +${stars} stars for completing listening!</p>
                <div class="star-count-display">
                    <span>Total Stars: <strong id="starEarnedTotal">${totalStars || 0}</strong></span>
                </div>
                <button class="cta-btn" id="starEarnedCloseBtn">Awesome</button>
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
    // COMPLETE LISTENING - EARN 5 STARS (FORCE RE-AWARD)
    // =========================================================
    function earnStarsForListening(langKey) {
        console.log('earnStarsForListening called for:', langKey);
        console.log('starsAwardedLanguages:', starsAwardedLanguages);
        
        // Get current stars from header
        var headerStars = document.getElementById('headerStars');
        var currentStars = parseInt(headerStars ? headerStars.textContent : 0);
        console.log('Current total stars:', currentStars);
        
        // Force re-award if marked but not actually awarded (stars are 0)
        var isMarked = starsAwardedLanguages.indexOf(langKey) !== -1;
        if (isMarked && currentStars < 5) {
            console.log('Stars marked but not awarded (stars=0). Re-awarding...');
            // Remove from awarded list to re-award
            starsAwardedLanguages = starsAwardedLanguages.filter(function(l) { return l !== langKey; });
            try {
                localStorage.setItem('starsAwardedLanguages', JSON.stringify(starsAwardedLanguages));
            } catch(e) {}
        }
        
        // Check if already awarded
        if (starsAwardedLanguages.indexOf(langKey) !== -1) {
            console.log('Stars already awarded for:', langKey);
            // Still show the modal if it was already awarded but user completed again
            setTimeout(function() {
                showStarEarnedModal(0, currentStars);
            }, 2000);
            return;
        }

        var newTotal = currentStars + 5;
        console.log('New total:', newTotal);
        
        // Update header stars immediately
        updateHeaderStars(newTotal);

        // Mark as awarded
        markStarsAwarded(langKey);

        // Show modal after 2 seconds
        setTimeout(function() {
            showStarEarnedModal(5, newTotal);
        }, 2000);

        // Also try to save to database via Activity system
        if (typeof Activity !== 'undefined' && Activity.completeActivity) {
            var activityId = 'listening_' + langKey + '_' + Date.now();
            console.log('Sending to Activity system:', activityId);
            
            Activity.completeActivity('listening', activityId, 5)
                .then(function(data) {
                    console.log('Activity response:', data);
                    if (data.success && data.total_stars) {
                        if (data.total_stars !== newTotal) {
                            updateHeaderStars(data.total_stars);
                        }
                    }
                })
                .catch(function(err) {
                    console.error('Error saving activity:', err);
                });
        } else {
            console.warn('Activity system not available, stars saved locally only');
        }
    }

    // =========================================================
    // CHECK COMPLETION
    // =========================================================
    function isWordListened(langKey, letterChar, wordText) {
        var id = langKey + '_' + letterChar + '_' + wordText;
        return listenedWords.indexOf(id) !== -1;
    }

    function areAllWordsListened(langKey, letterChar) {
        var data = listeningData[langKey];
        if (!data || !data.words[letterChar]) return false;

        var words = data.words[letterChar];
        var allListened = words.every(function(w) {
            return isWordListened(langKey, letterChar, w.word);
        });

        return allListened;
    }

    function areAllLettersCompleted(langKey) {
        var data = listeningData[langKey];
        if (!data) return false;

        var allCompleted = data.letters.every(function(letter) {
            return areAllWordsListened(langKey, letter.char);
        });

        return allCompleted;
    }

    // =========================================================
    // RENDER LANGUAGE SELECTION
    // =========================================================
    function renderLanguageSelection() {
        var grid = document.getElementById('langGridListening');
        if (!grid) return;

        var isLoggedInUser = isLoggedIn();
        var user = getCurrentUser();
        var userName = user ? user.first_name || user.name || 'Explorer' : 'Explorer';

        var loginMsg = document.getElementById('loginStatusMsg');
        if (loginMsg) {
            if (isLoggedInUser) {
                loginMsg.textContent = 'Welcome, ' + userName + '! Pick a language to start listening.';
                loginMsg.style.color = '#2E2657';
            } else {
                loginMsg.textContent = 'Sign in to unlock all listening activities.';
                loginMsg.style.color = '#FF6B59';
            }
        }

        loadStarsAwarded();

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

        // Reset listened words for this session
        listenedWords = [];

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
            playBtn.innerHTML = '<i class="fas fa-play"></i>';

            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var letter = this.dataset.letter;
                var lang = languages[this.dataset.lang];
                if (lang) {
                    var playBtnEl = this;
                    playBtnEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    speakText(letter, lang.speechLang);
                    setTimeout(function() {
                        playBtnEl.innerHTML = '<i class="fas fa-play"></i>';
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
                    imageContainer.innerHTML = '<span class="word-emoji">📄</span>';
                };
                imageContainer.appendChild(img);
            } else {
                imageContainer.innerHTML = '<span class="word-emoji">📄</span>';
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

            if (isListened) {
                playBtn.textContent = 'Listen';
                playBtn.style.background = '#2E7D32';
                playBtn.style.color = '#FFFFFF';
                playBtn.style.boxShadow = '0 4px 0 #1a6b2a';
            } else {
                playBtn.textContent = 'Listen';
                playBtn.style.background = '#FFD23F';
                playBtn.style.color = '#2E2657';
                playBtn.style.boxShadow = '0 4px 0 #E5B800';
            }

            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var wordTextValue = this.dataset.word;
                var lang = languages[this.dataset.lang];
                var letter = this.dataset.letter;
                var wordId = langKey + '_' + letter + '_' + wordTextValue;

                if (lang) {
                    var playBtnEl = this;
                    playBtnEl.textContent = 'Speaking...';
                    playBtnEl.style.background = '#FF6B59';
                    playBtnEl.style.color = '#FFFFFF';
                    playBtnEl.style.boxShadow = '0 4px 0 #C94E4E';
                    playBtnEl.disabled = true;

                    speakText(wordTextValue, lang.speechLang, function() {
                        if (listenedWords.indexOf(wordId) === -1) {
                            listenedWords.push(wordId);
                            console.log('Listened to:', wordId);
                        }

                        var wordCard = playBtnEl.closest('.word-card');
                        if (wordCard && listenedWords.indexOf(wordId) !== -1) {
                            wordCard.style.borderColor = '#2E7D32';
                            wordCard.style.borderWidth = '3px';
                            wordCard.style.borderStyle = 'solid';
                            wordCard.style.background = '#F0FFF5';
                        }

                        playBtnEl.textContent = 'Listen';
                        playBtnEl.style.background = '#2E7D32';
                        playBtnEl.style.color = '#FFFFFF';
                        playBtnEl.style.boxShadow = '0 4px 0 #1a6b2a';
                        playBtnEl.disabled = false;

                        if (areAllWordsListened(langKey, letter)) {
                            console.log('Letter completed:', letter);
                            
                            if (areAllLettersCompleted(langKey)) {
                                console.log('ALL LETTERS COMPLETED for language:', langKey);
                                
                                if (starsAwardedLanguages.indexOf(langKey) === -1) {
                                    console.log('Awarding stars for:', langKey);
                                    setTimeout(function() {
                                        earnStarsForListening(langKey);
                                    }, 2000);
                                    showToast('You completed all listening activities!');
                                } else {
                                    console.log('Stars already awarded for:', langKey, 'but showing modal anyway');
                                    // Show modal even if already awarded (for replay)
                                    setTimeout(function() {
                                        var headerStars = document.getElementById('headerStars');
                                        var currentStars = parseInt(headerStars ? headerStars.textContent : 0);
                                        showStarEarnedModal(0, currentStars);
                                    }, 2000);
                                }
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

    // =========================================================
    // CLOSE LOGIN MODAL
    // =========================================================
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
    // LISTEN FOR STAR UPDATES
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
    // LOAD STARS AWARDED
    // =========================================================
    function loadCompletedLetters() {
        loadStarsAwarded();
    }

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
            }

            .word-card {
                border: 3px solid #F1EEFB;
                transition: all 0.3s ease;
            }

            .word-play-btn {
                transition: all 0.3s ease;
            }

            .word-play-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .star-earned-modal .modal-card.star-earned-card {
                max-width: 380px;
                padding: 30px 24px 28px;
                text-align: center;
                background: #FFFFFF;
                border: 3px solid #FFD23F;
                border-radius: 28px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                animation: starPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            @keyframes starPop {
                0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
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
        `;
        document.head.appendChild(style);
    }

    // =========================================================
    // INIT
    // =========================================================
    addListeningStyles();
    loadCompletedLetters();
    
    setTimeout(function() {
        renderLanguageSelection();
        checkReturnFromLogin();
    }, 300);

    document.addEventListener('authChanged', function() {
        renderLanguageSelection();
    });

    console.log('Listening.js loaded successfully!');
});