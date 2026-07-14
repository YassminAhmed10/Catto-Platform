/* =========================================================
   BOOKS.JS - Books Page with Book Reader Modal (FIXED LOGIN)
   ========================================================= */

console.log('Books.js loading...');

document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // LANGUAGE DATA
    // =========================================================
    var languages = {
        en: { name: 'English', flag: 'fi-gb', color: '#4C8DAF' },
        ar: { name: 'Arabic', flag: 'fi-eg', color: '#58C27D' },
        de: { name: 'German', flag: 'fi-de', color: '#8C6FC9' },
        es: { name: 'Spanish', flag: 'fi-es', color: '#FF6F59' },
        fr: { name: 'French', flag: 'fi-fr', color: '#FFB84D' },
        it: { name: 'Italian', flag: 'fi-it', color: '#E5563F' }
    };

    var langImages = {
        ar: 'imgs/BooksPage/AR-Button.png',
        en: 'imgs/BooksPage/EN-Button.png',
        fr: 'imgs/BooksPage/FN-Button.png',
        de: 'imgs/BooksPage/DE-Button.png',
        it: 'imgs/BooksPage/IT-Button.png',
        es: 'imgs/BooksPage/SP-Button.png'
    };

    // =========================================================
    // BOOK DATA WITH PAGE IMAGES
    // =========================================================
    var booksData = {
        en: [
            { 
                id: 'alphabet_adventure_en', 
                cover: 'imgs/Books/EN_Book/Catto_Alphabet_bookCover.png', 
                title: 'Alphabet Adventure', 
                pages: [
                    'imgs/Books/EN_Book/EN_Book_Alphabets_Page1.png',
                    'imgs/Books/EN_Book/EN_Book_Alphabets_Page2.png',
                    'imgs/Books/EN_Book/EN_Book_Alphabets_Page3.png',
                    'imgs/Books/EN_Book/EN_Book_Alphabets_Page4.png',
                    'imgs/Books/EN_Book/EN_Book_Alphabets_Page5.png'
                ],
                pageTexts: [
                    'Learn the alphabet!',
                    'A is for Apple',
                    'B is for Ball',
                    'C is for Cat',
                    'Great job! You learned the alphabet!'
                ]
            },
            { id: 'zaza_goes_fishing_en', cover: '📘', title: 'Zaza Goes Fishing', pages: ['Page 1', 'Page 2'], pageTexts: ['Zaza goes to the sea.', 'Zaza sees a fish.'] },
            { id: 'my_family_en', cover: '📙', title: 'My Family', pages: ['Page 1', 'Page 2'], pageTexts: ['This is my family.', 'Mom, dad, and me.'] },
            { id: 'lost_star_en', cover: '📕', title: 'The Lost Star', locked: true },
            { id: 'market_day_en', cover: '📓', title: 'Market Day', locked: true },
            { id: 'rainy_day_fun_en', cover: '📔', title: 'Rainy Day Fun', locked: true }
        ],
        ar: [
            { 
                id: 'alphabet_adventure_ar', 
                cover: '📗', 
                title: 'رحلة الأبجدية', 
                pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
                pageTexts: ['تعلم الحروف العربية!', 'أ هو أرنب', 'ب هو بطة', 'ت هو تفاحة', 'أحسنت! لقد تعلمت الحروف!']
            },
            { id: 'zaza_goes_fishing_ar', cover: '📘', title: 'زازا يذهب للصيد', pages: ['Page 1', 'Page 2'], pageTexts: ['زازا الثعلب يذهب إلى البحر.', 'زازا يرى سمكة زرقاء.'] },
            { id: 'my_family_ar', cover: '📙', title: 'عائلتي', pages: ['Page 1', 'Page 2'], pageTexts: ['هذه عائلتي.', 'أمي، أبي وأنا.'] }
        ],
        es: [
            { 
                id: 'alphabet_adventure_es', 
                cover: '📗', 
                title: 'Aventura del Alfabeto', 
                pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
                pageTexts: ['Aprende el alfabeto!', 'A es para Abeja', 'B es para Bola', 'C es para Casa', 'Buen trabajo! Aprendiste el alfabeto!']
            },
            { id: 'zaza_goes_fishing_es', cover: '📘', title: 'Zaza Va a Pescar', pages: ['Page 1', 'Page 2'], pageTexts: ['Zaza el zorro va al mar.', 'Zaza ve un pez azul.'] }
        ],
        fr: [
            { 
                id: 'alphabet_adventure_fr', 
                cover: '📗', 
                title: 'Aventure de l\'Alphabet', 
                pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
                pageTexts: ['Apprenez l\'alphabet!', 'A est pour Avion', 'B est pour Bateau', 'C est pour Chat', 'Bon travail! Vous avez appris l\'alphabet!']
            }
        ],
        de: [
            { 
                id: 'alphabet_adventure_de', 
                cover: '📗', 
                title: 'Abenteuer Alphabet', 
                pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
                pageTexts: ['Lerne das Alphabet!', 'A ist für Apfel', 'B ist für Ball', 'C ist für Computer', 'Großartig! Du hast das Alphabet gelernt!']
            }
        ],
        it: [
            { 
                id: 'alphabet_adventure_it', 
                cover: '📗', 
                title: 'Avventura dell\'Alfabeto', 
                pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'],
                pageTexts: ['Impara l\'alfabeto!', 'A è per Albero', 'B è per Barca', 'C è per Cane', 'Ottimo lavoro! Hai imparato l\'alfabeto!']
            }
        ]
    };

    // =========================================================
    // STATE
    // =========================================================
    var currentLang = null;
    var currentBook = null;
    var currentPage = 0;
    var isBookCompleted = false;
    var bookReaderModal = null;

    // =========================================================
    // AUTH CHECK - FIXED
    // =========================================================
    function isLoggedIn() {
        // Check multiple ways to confirm login
        if (window.isUserLoggedIn && typeof window.isUserLoggedIn === 'function') {
            return window.isUserLoggedIn();
        }
        // Check localStorage
        try {
            var user = localStorage.getItem('languageIslandUser');
            if (user && user !== 'null' && user !== '') {
                return true;
            }
        } catch(e) {}
        return false;
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

    // =========================================================
    // READ BOOK - EARN 5 STARS
    // =========================================================
    function earnStarsForBook(bookId, langKey, bookTitle) {
        var activityId = langKey + '_' + bookId + '_' + Date.now();
        console.log('Earning stars for reading:', bookTitle);

        if (typeof Activity !== 'undefined' && Activity.completeActivity) {
            Activity.completeActivity('book', activityId, 5)
                .then(function(data) {
                    if (data.success) {
                        showStarEarnedModal(5, bookTitle, data.total_stars);
                    } else {
                        showToast('You earned 5 stars!');
                    }
                })
                .catch(function(err) {
                    console.error('Error earning stars:', err);
                    showToast('Network error. Please try again.');
                });
        } else {
            showStarEarnedModal(5, bookTitle);
        }
    }

    // =========================================================
    // SHOW STAR EARNED MODAL
    // =========================================================
    function showStarEarnedModal(stars, bookTitle, totalStars) {
        var existingModal = document.getElementById('starEarnedModal');
        if (existingModal) existingModal.remove();

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
                <h2>+${stars} Stars!</h2>
                <p>You earned 5 stars for reading "${bookTitle}"</p>
                <div class="star-count-display">
                    <span>Total Stars: <strong id="starEarnedTotal">${totalStars || 0}</strong></span>
                </div>
                <button class="cta-btn" id="starEarnedCloseBtn">Awesome!</button>
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

        if (typeof Sound !== 'undefined') Sound.win();
    }

    // =========================================================
    // BOOK READER MODAL
    // =========================================================
    function openBookReader(book, langKey) {
        currentBook = book;
        currentLang = langKey;
        currentPage = 0;
        isBookCompleted = false;

        var modal = document.createElement('div');
        modal.id = 'bookReaderModal';
        modal.className = 'modal-backdrop book-reader-modal';
        modal.innerHTML = `
            <div class="modal-card book-reader-card">
                <button class="modal-close" id="bookReaderClose" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="book-reader-content">
                    <div class="book-page-container">
                        <div class="book-page-image" id="bookPageImage">
                            <img id="bookPageImg" src="" alt="Book Page">
                            <div class="book-page-placeholder" id="bookPlaceholder" style="display:none;">
                                <i class="fas fa-book-open"></i>
                                <p id="bookPageText">Page content</p>
                            </div>
                        </div>
                    </div>
                    <div class="book-reader-footer">
                        <span class="page-indicator" id="pageIndicator">1 / 1</span>
                        <div class="page-controls">
                            <button id="prevPageBtn" disabled>
                                <i class="fas fa-chevron-left"></i> Previous
                            </button>
                            <button id="nextPageBtn">
                                Next <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" id="readingProgressBar" style="width:0%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        bookReaderModal = modal;

        setTimeout(function() {
            modal.classList.add('open');
        }, 100);

        renderBookPage();

        var closeBtn = document.getElementById('bookReaderClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeBookReader(false);
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookReader(false);
            }
        });

        var prevBtn = document.getElementById('prevPageBtn');
        var nextBtn = document.getElementById('nextPageBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 0) {
                    currentPage--;
                    renderBookPage();
                    if (typeof Sound !== 'undefined') Sound.pageTurn();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                var totalPages = currentBook.pages ? currentBook.pages.length : 0;
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    renderBookPage();
                    if (typeof Sound !== 'undefined') Sound.pageTurn();
                } else if (currentPage === totalPages - 1 && !isBookCompleted) {
                    isBookCompleted = true;
                    closeBookReader(true);
                }
            });
        }

        // Keyboard shortcuts
        var keydownHandler = function(e) {
            if (e.key === 'Escape') {
                closeBookReader(false);
            }
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                var nextBtnEl = document.getElementById('nextPageBtn');
                if (nextBtnEl) nextBtnEl.click();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                var prevBtnEl = document.getElementById('prevPageBtn');
                if (prevBtnEl) prevBtnEl.click();
            }
        };
        document.addEventListener('keydown', keydownHandler);
        
        // Store handler for cleanup
        modal._keydownHandler = keydownHandler;
    }

    function renderBookPage() {
        var imgElement = document.getElementById('bookPageImg');
        var placeholder = document.getElementById('bookPlaceholder');
        var pageText = document.getElementById('bookPageText');
        var indicator = document.getElementById('pageIndicator');
        var progressBar = document.getElementById('readingProgressBar');
        var prevBtn = document.getElementById('prevPageBtn');
        var nextBtn = document.getElementById('nextPageBtn');

        if (!currentBook) return;

        var totalPages = currentBook.pages ? currentBook.pages.length : 0;

        var hasImages = currentBook.pages && currentBook.pages.length > 0 && 
                        typeof currentBook.pages[0] === 'string' &&
                        currentBook.pages[0].match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);

        if (hasImages && imgElement) {
            imgElement.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
            imgElement.src = currentBook.pages[currentPage];
            imgElement.alt = currentBook.pageTexts && currentBook.pageTexts[currentPage] ? 
                             currentBook.pageTexts[currentPage] : 'Page ' + (currentPage + 1);
        } else if (placeholder && pageText) {
            imgElement.style.display = 'none';
            placeholder.style.display = 'flex';
            var textContent = currentBook.pageTexts && currentBook.pageTexts[currentPage] ? 
                              currentBook.pageTexts[currentPage] : 
                              'Page ' + (currentPage + 1);
            pageText.textContent = textContent;
        }

        if (indicator) {
            indicator.textContent = (currentPage + 1) + ' / ' + totalPages;
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.style.opacity = currentPage === 0 ? '0.4' : '1';
        }

        if (nextBtn) {
            var isLastPage = currentPage === totalPages - 1;
            nextBtn.innerHTML = isLastPage ? 
                'Finish <i class="fas fa-check"></i>' : 
                'Next <i class="fas fa-chevron-right"></i>';
        }

        if (progressBar) {
            var progress = ((currentPage + 1) / totalPages) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    function closeBookReader(completed) {
        var modal = document.getElementById('bookReaderModal');
        if (modal) {
            // Remove keydown handler
            if (modal._keydownHandler) {
                document.removeEventListener('keydown', modal._keydownHandler);
            }
            modal.classList.remove('open');
            setTimeout(function() {
                modal.remove();
                bookReaderModal = null;
                
                if (completed && currentBook) {
                    setTimeout(function() {
                        earnStarsForBook(currentBook.id, currentLang, currentBook.title);
                    }, 2000);
                }
            }, 300);
        }
    }

    // =========================================================
    // RENDER LANGUAGE SELECTION
    // =========================================================
    function renderLanguages() {
        var grid = document.getElementById('langGridBooks');
        if (!grid) return;

        var isLoggedInUser = isLoggedIn();
        var user = getCurrentUser();
        var userName = user ? user.first_name || user.name || 'Explorer' : 'Explorer';
        
        var loginMsg = document.getElementById('loginStatusMsg');
        if (loginMsg) {
            if (isLoggedInUser) {
                loginMsg.textContent = 'Welcome, ' + userName + '! Pick a language to start reading!';
                loginMsg.style.color = 'var(--plum-soft)';
                loginMsg.style.fontWeight = '700';
            } else {
                loginMsg.textContent = 'Sign in to unlock all books and track your progress!';
                loginMsg.style.color = 'var(--coral)';
                loginMsg.style.fontWeight = '800';
            }
        }

        var html = '';
        var langKeys = Object.keys(languages);
        langKeys.forEach(function(key) {
            var lang = languages[key];
            var totalBooks = booksData[key] ? booksData[key].length : 0;
            
            html += `
                <button class="lang-card" data-lang="${key}">
                    <img src="${langImages[key] || 'imgs/buttons/default.png'}" alt="${lang.name}" onerror="this.src='imgs/buttons/default.png'">
                    <span class="lang-name">${lang.name}</span>
                    <span class="lang-progress">${totalBooks} books</span>
                </button>
            `;
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.lang-card').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var lang = this.dataset.lang;
                if (isLoggedIn()) {
                    showBooks(lang);
                } else {
                    sessionStorage.setItem('pendingBookLang', lang);
                    openLoginModal();
                }
            });
        });
    }

    // =========================================================
    // SHOW BOOKS
    // =========================================================
    function showBooks(langKey) {
        currentLang = langKey;
        var books = booksData[langKey] || [];
        var lang = languages[langKey];

        var langGrid = document.getElementById('langSelection');
        var booksSection = document.getElementById('booksSection');
        var selectedLangName = document.getElementById('selectedLangName');
        
        if (langGrid) langGrid.style.display = 'none';
        if (booksSection) booksSection.style.display = 'block';
        if (selectedLangName) selectedLangName.textContent = lang.name;

        var grid = document.getElementById('bookGrid');
        if (!grid) return;

        var html = '';
        books.forEach(function(book) {
            var isLocked = book.locked || false;
            var coverStyle = book.cover && book.cover.startsWith('imgs') ? 
                'background-image: url(' + book.cover + '); background-size: cover; background-position: center;' : 
                'background: linear-gradient(135deg, ' + lang.color + ', ' + lang.color + 'dd);';
            
            html += `
                <div class="book-card ${isLocked ? 'locked' : ''}" 
                     data-book-id="${book.id}" data-lang="${langKey}">
                    <div class="book-cover" style="${coverStyle}">
                        ${!book.cover || !book.cover.startsWith('imgs') ? '<span class="book-emoji">' + (book.cover || '📖') + '</span>' : ''}
                    </div>
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        ${isLocked ? '<span class="badge locked-badge">Coming Soon</span>' : ''}
                        ${!isLocked ? '<button class="read-btn" data-book-id="' + book.id + '" data-lang="' + langKey + '" data-title="' + book.title + '">Read</button>' : ''}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.read-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var bookId = this.dataset.bookId;
                var langKey = this.dataset.lang;
                var book = booksData[langKey].find(function(b) { return b.id === bookId; });
                if (book && !book.locked) {
                    openBookReader(book, langKey);
                }
            });
        });

        if (booksSection) {
            booksSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // =========================================================
    // BACK TO LANGUAGES
    // =========================================================
    var backBtn = document.getElementById('backToLangs');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            var langGrid = document.getElementById('langSelection');
            var booksSection = document.getElementById('booksSection');
            if (langGrid) langGrid.style.display = 'block';
            if (booksSection) booksSection.style.display = 'none';
            renderLanguages();
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
            if (typeof Sound !== 'undefined') Sound.pop();
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
            var pendingLang = sessionStorage.getItem('pendingBookLang');
            if (pendingLang && isLoggedIn()) {
                sessionStorage.removeItem('pendingBookLang');
                setTimeout(function() {
                    showBooks(pendingLang);
                }, 500);
            }
        }
    }

    // =========================================================
    // ADD BOOK READER STYLES
    // =========================================================
    function addBookReaderStyles() {
        if (document.getElementById('book-reader-styles')) return;
        
        var style = document.createElement('style');
        style.id = 'book-reader-styles';
        style.textContent = `
            .book-reader-modal .modal-card.book-reader-card {
                max-width: 700px;
                width: 92%;
                padding: 20px 24px 24px;
                border-radius: 24px;
                background: var(--white);
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }

            .book-reader-modal .modal-close {
                position: absolute;
                top: 12px;
                right: 16px;
                background: #F1EEFB;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                font-size: 16px;
                color: var(--plum);
                cursor: pointer;
                transition: all 0.2s ease;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .book-reader-modal .modal-close:hover {
                background: var(--coral);
                color: white;
                transform: rotate(90deg);
            }

            .book-page-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 300px;
                background: #F8F7FF;
                border-radius: 16px;
                margin: 8px 0 16px;
                padding: 16px;
                border: 2px solid #F1EEFB;
            }

            .book-page-image {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .book-page-image img {
                max-width: 100%;
                max-height: 60vh;
                border-radius: 12px;
                object-fit: contain;
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            }

            .book-page-placeholder {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                color: var(--plum-soft);
                font-size: 18px;
                font-weight: 600;
                width: 100%;
                min-height: 200px;
            }

            .book-page-placeholder i {
                font-size: 48px;
                color: var(--coral);
                margin-bottom: 12px;
            }

            .book-reader-footer {
                margin-top: 12px;
            }

            .page-indicator {
                display: block;
                text-align: center;
                font-family: var(--font-display);
                font-weight: 700;
                color: var(--plum-soft);
                font-size: 14px;
                margin-bottom: 8px;
            }

            .page-controls {
                display: flex;
                justify-content: space-between;
                gap: 12px;
            }

            .page-controls button {
                padding: 10px 24px;
                border: none;
                border-radius: 999px;
                font-family: var(--font-display);
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.15s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .page-controls button:disabled {
                opacity: 0.4;
                cursor: not-allowed;
                transform: none;
            }

            #prevPageBtn {
                background: #F1EEFB;
                color: var(--plum);
            }

            #prevPageBtn:hover:not(:disabled) {
                transform: translateY(-2px);
                background: #E8E4F5;
            }

            #nextPageBtn {
                background: var(--coral);
                color: white;
                box-shadow: 0 4px 0 var(--coral-dark);
            }

            #nextPageBtn:hover:not(:disabled) {
                transform: translateY(-2px);
            }

            #nextPageBtn:active:not(:disabled) {
                transform: translateY(3px);
                box-shadow: 0 1px 0 var(--coral-dark);
            }

            .progress-bar-container {
                margin-top: 12px;
                height: 4px;
                background: #F1EEFB;
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: var(--coral);
                border-radius: 4px;
                transition: width 0.3s ease;
            }

            .star-earned-modal .modal-card.star-earned-card {
                max-width: 380px;
                padding: 30px 24px 28px;
                text-align: center;
                background: white;
                border: 3px solid var(--star);
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
                font-family: var(--font-display);
                font-size: 28px;
                color: var(--plum);
                margin: 0 0 4px;
            }

            .star-earned-card p {
                color: var(--plum-soft);
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
                font-family: var(--font-display);
                font-size: 16px;
                color: var(--plum);
                border: 2px solid var(--star);
            }

            .star-earned-card .star-count-display strong {
                color: var(--coral-dark);
                font-size: 20px;
            }

            .star-earned-card .cta-btn {
                background: var(--coral);
                color: white;
                border: none;
                padding: 10px 32px;
                border-radius: 999px;
                font-family: var(--font-display);
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                box-shadow: 0 5px 0 var(--coral-dark);
                transition: all 0.15s ease;
            }

            .star-earned-card .cta-btn:hover {
                transform: translateY(-2px);
            }

            .star-earned-card .cta-btn:active {
                transform: translateY(3px);
                box-shadow: 0 2px 0 var(--coral-dark);
            }

            @media (max-width: 480px) {
                .book-reader-modal .modal-card.book-reader-card {
                    padding: 14px 16px 18px;
                    max-width: 95%;
                }
                .page-controls button {
                    padding: 8px 16px;
                    font-size: 12px;
                }
                .book-page-container {
                    min-height: 200px;
                    padding: 10px;
                }
                .star-earned-modal .modal-card.star-earned-card {
                    max-width: 320px;
                    padding: 24px 16px 20px;
                }
                .star-earned-card .star-icon {
                    width: 70px;
                    height: 70px;
                }
                .star-earned-card h2 {
                    font-size: 22px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // =========================================================
    // INIT
    // =========================================================
    addBookReaderStyles();
    
    // Wait for header to load before rendering
    setTimeout(function() {
        renderLanguages();
        checkReturnFromLogin();
    }, 300);

    // Also re-render when auth changes
    document.addEventListener('authChanged', function() {
        renderLanguages();
    });

    console.log('Books.js loaded successfully with book reader!');
});