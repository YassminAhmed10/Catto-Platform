/* =========================================================
   SETTINGS.JS - Theme Management Page
   ========================================================= */

console.log('Settings.js loading...');

// =========================================================
// API BASE URL - Use absolute path from root
// =========================================================
var API_BASE = '/Catto_Platform/Language_island2/Backend/';

document.addEventListener('DOMContentLoaded', function() {
    console.log(' DOM ready - Settings page');

    // =========================================================
    // DOM ELEMENTS
    // =========================================================
    var themeGrid = document.getElementById('themeGrid');
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toastMessage');
    var updateToast = document.getElementById('updateToast');
    var updateToastMessage = document.getElementById('updateToastMessage');
    var updateToastSubmessage = document.getElementById('updateToastSubmessage');
    var updateToastIconImg = document.getElementById('updateToastIconImg');
    var updateToastCloseBtn = document.getElementById('updateToastCloseBtn');
    var toastBackdrop = document.getElementById('toastBackdrop');

    console.log('themeGrid found?', !!themeGrid);

    // =========================================================
    // THEME LABELS & SWATCHES
    // =========================================================
    var THEME_LABELS = {
        'default': 'Default Theme',
        'purple-theme': 'Purple Theme',
        'night-theme': 'Night Theme',
        'space-theme': 'Space Theme',
        'boys-theme': 'Boys Theme'
    };

    var THEME_SWATCH_CLASS = {
        'default': 'swatch-default',
        'purple-theme': 'swatch-purple',
        'night-theme': 'swatch-night',
        'space-theme': 'swatch-space',
        'boys-theme': 'swatch-boys'
    };

    // =========================================================
    // STATE
    // =========================================================
    var current = {
        equipped_theme: 'default',
        inventory: []
    };

    var toastTimeout = null;

    // =========================================================
    // LOAD PROFILE
    // =========================================================
    function loadProfile() {
        console.log('Loading profile...');
        fetch(API_BASE + 'get_profile.php')
            .then(function(res) {
                if (!res.ok) {
                    throw new Error('Network response was not ok: ' + res.status);
                }
                return res.json();
            })
            .then(function(data) {
                console.log('Profile data received:', data);
                if (data.success === false && data.error === 'not_logged_in') {
                    window.location.href = 'signin.html';
                    return;
                }
                if (data.success) {
                    var d = data.data;
                    current.equipped_theme = d.equipped_theme || 'default';
                    current.inventory = d.inventory_details || [];

                    if (typeof window.applyThemeClass === 'function') {
                        window.applyThemeClass(current.equipped_theme);
                    }

                    renderThemeGrid();
                }
            })
            .catch(function(err) {
                console.error('❌ Could not load profile:', err);
                showToast('Error loading profile. Please refresh.', 'error');
            });
    }

    // =========================================================
    // RENDER THEME GRID
    // =========================================================
    function renderThemeGrid() {
        if (!themeGrid) {
            console.error('themeGrid not found!');
            return;
        }

        function owns(themeId) {
            return current.inventory.some(function(item) {
                return item.item_name === themeId;
            });
        }

        var allThemes = [
            { name: 'default', owned: true },
            { name: 'purple-theme', owned: owns('purple-theme') },
            { name: 'night-theme', owned: owns('night-theme') },
            { name: 'space-theme', owned: owns('space-theme') },
            { name: 'boys-theme', owned: owns('boys-theme') }
        ];

        var html = '';
        allThemes.forEach(function(theme) {
            var themeName = theme.name;
            var isEquipped = themeName === current.equipped_theme;
            var isOwned = theme.owned;
            var displayName = THEME_LABELS[themeName] || themeName;
            var swatchClass = THEME_SWATCH_CLASS[themeName] || 'swatch-default';

            html += `
                <div class="theme-card ${isEquipped ? 'equipped' : ''} ${!isOwned ? 'locked' : ''}"
                     data-theme="${themeName}" data-owned="${isOwned}">
                    ${isEquipped ? '<div class="theme-check">✓</div>' : ''}
                    ${!isOwned ? '<div class="theme-lock"><i class="fas fa-lock"></i></div>' : ''}
                    <div class="theme-swatch ${swatchClass}"></div>
                    <span class="theme-name">${displayName}</span>
                    <span class="theme-status ${isEquipped ? 'equipped-text' : (isOwned ? 'owned-text' : 'locked-text')}">
                        ${isEquipped ? '✓ Equipped' : (isOwned ? 'Tap to equip' : 'Get it in the Shop')}
                    </span>
                </div>
            `;
        });

        themeGrid.innerHTML = html;

        themeGrid.querySelectorAll('.theme-card').forEach(function(card) {
            card.addEventListener('click', function() {
                var themeName = this.dataset.theme;
                var isOwned = this.dataset.owned === 'true';

                if (!isOwned) {
                    goToShopForTheme(themeName);
                    return;
                }
                if (themeName === current.equipped_theme) {
                    showToast('This theme is already equipped!', 'info');
                    return;
                }

                equipTheme(themeName);
            });
        });
    }

    // =========================================================
    // REDIRECT TO SHOP (Themes category) TO BUY A LOCKED THEME
    // =========================================================
    function goToShopForTheme(themeName) {
        showToast('Taking you to the Shop to unlock this theme…', 'info');
        setTimeout(function() {
            window.location.href = 'shop.html?category=themes&item=' + encodeURIComponent(themeName);
        }, 600);
    }

    // =========================================================
    // EQUIP THEME
    // =========================================================
    function equipTheme(themeName) {
        console.log('Equipping theme:', themeName);

        fetch(API_BASE + 'update_theme.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ theme: themeName })
        })
        .then(function(res) {
            if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
            return res.json();
        })
        .then(function(data) {
            console.log('Theme equip response:', data);
            if (data.success) {
                current.equipped_theme = themeName;

                if (typeof window.applyThemeClass === 'function') {
                    window.applyThemeClass(themeName);
                }

                try {
                    var userData = localStorage.getItem('languageIslandUser');
                    if (userData) {
                        var user = JSON.parse(userData);
                        user.equipped_theme = themeName;
                        localStorage.setItem('languageIslandUser', JSON.stringify(user));
                    }
                } catch(e) {}

                renderThemeGrid();
                showUpdateToast('Theme equipped!', 'success', 'Your new theme is ready');
            } else {
                showUpdateToast('Failed to equip theme', 'error', data.message || 'Please try again');
            }
        })
        .catch(function(err) {
            console.error('❌ Error equipping theme:', err);
            showUpdateToast('Network error', 'error', 'Please try again');
        });
    }

    // =========================================================
    // TOAST FUNCTIONS
    // =========================================================
    function showToast(message, type) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('show');
        if (type === 'error') {
            toast.style.background = '#C94E4E';
        } else if (type === 'info') {
            toast.style.background = '#4C8DAF';
        } else {
            toast.style.background = '#2E7D32';
        }
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function() {
            toast.classList.remove('show');
            toast.style.background = '';
        }, 3000);
    }

    function showUpdateToast(message, type, submessage) {
        if (!updateToast || !updateToastMessage) return;

        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }

        updateToast.classList.remove('show', 'success', 'error', 'info');
        if (toastBackdrop) toastBackdrop.classList.remove('show');
        
        void updateToast.offsetWidth;

        updateToastMessage.textContent = message;
        if (updateToastSubmessage) {
            updateToastSubmessage.textContent = submessage || '';
        }
        if (updateToastIconImg) {
            updateToastIconImg.src = 'imgs/profile/Update.png';
            updateToastIconImg.alt = 'Update';
        }
        
        if (type === 'success') {
            updateToast.classList.add('success');
        } else if (type === 'error') {
            updateToast.classList.add('error');
        } else if (type === 'info') {
            updateToast.classList.add('info');
        }

        if (toastBackdrop) toastBackdrop.classList.add('show');

        requestAnimationFrame(function() {
            updateToast.classList.add('show');
        });

        toastTimeout = setTimeout(function() {
            hideUpdateToast();
        }, 4000);
    }

    function hideUpdateToast() {
        if (updateToast) updateToast.classList.remove('show');
        if (toastBackdrop) toastBackdrop.classList.remove('show');
        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }
    }

    // =========================================================
    // KEYBOARD SHORTCUTS
    // =========================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideUpdateToast();
        }
    });

    // =========================================================
    // UPDATE CLOSE BUTTON
    // =========================================================
    if (updateToastCloseBtn) {
        updateToastCloseBtn.addEventListener('click', hideUpdateToast);
    }

    if (toastBackdrop) {
        toastBackdrop.addEventListener('click', hideUpdateToast);
    }

    // =========================================================
    // INIT
    // =========================================================
    loadProfile();

    window.equipTheme = equipTheme;
    window.renderThemeGrid = renderThemeGrid;

    console.log('Settings.js initialized successfully!');
});