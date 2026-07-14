/* =========================================================
   PROFILE.JS - Complete Profile Page with Debugging
   ========================================================= */

console.log('📄 Profile.js loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM ready');

    // =========================================================
    // DEBUG: Check if all elements exist
    // =========================================================
    var editBtn = document.getElementById('editProfileBtn');
    console.log('🔍 editBtn found?', editBtn);
    
    var displayMode = document.getElementById('profileDisplayMode');
    console.log('🔍 displayMode found?', displayMode);
    
    var editMode = document.getElementById('profileEditMode');
    console.log('🔍 editMode found?', editMode);

    // =========================================================
    // If editBtn is null, stop and log error
    // =========================================================
    if (!editBtn) {
        console.error('❌ editProfileBtn not found! Check the ID in HTML.');
        return;
    }

    // =========================================================
    // TEST: Simple click test first
    // =========================================================
    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🟢 Edit button clicked! (test)');
        alert('✅ Click works! Now let\'s test the real function.');
    });

    // =========================================================
    // DOM ELEMENTS
    // =========================================================
    var saveBtn = document.getElementById('saveProfileBtn');
    var cancelBtn = document.getElementById('cancelProfileBtn');
    var errorBox = document.getElementById('profileMessage');

    var firstNameInput = document.getElementById('editFirstName');
    var lastNameInput = document.getElementById('editLastName');
    var emailInput = document.getElementById('editEmail');
    var genderInput = document.getElementById('editGender');
    var dobInput = document.getElementById('editDob');

    // Skin modal elements
    var avatarWrapper = document.getElementById('profileAvatarClick');
    var skinModal = document.getElementById('skinModal');
    var skinModalClose = document.getElementById('skinModalClose');
    var skinGrid = document.getElementById('skinGrid');

    // Theme elements ("My Themes" buttons)
    var themeButtons = document.querySelectorAll('.theme-toggle-btn');
    var purpleThemeBtn = document.getElementById('purpleThemeBtn');

    // Toast elements
    var updateToast = document.getElementById('updateToast');
    var updateToastMessage = document.getElementById('updateToastMessage');
    var updateToastSubmessage = document.getElementById('updateToastSubmessage');
    var updateToastIconImg = document.getElementById('updateToastIconImg');
    var updateToastCloseBtn = document.getElementById('updateToastCloseBtn');
    var toastBackdrop = document.getElementById('toastBackdrop');

    console.log('🔍 Input elements found?', {
        firstName: !!firstNameInput,
        lastName: !!lastNameInput,
        email: !!emailInput,
        gender: !!genderInput,
        dob: !!dobInput
    });

    // =========================================================
    // STATE
    // =========================================================
    var current = {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        dob: '',
        equipped_skin: 'default-catto',
        equipped_theme: 'default',
        id: 0,
        star_shells: 0,
        total_stars: 0,
        daily_streak: 0,
        inventory: []
    };

    var toastTimeout = null;

    // =========================================================
    // LOAD PROFILE
    // =========================================================
    function loadProfile() {
        console.log('🔄 Loading profile...');
        fetch('../Backend/get_profile.php')
            .then(function(res) {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(function(data) {
                console.log('📥 Profile data received:', data);
                if (data.success === false && data.error === 'not_logged_in') {
                    window.location.href = 'signin.html';
                    return;
                }
                if (data.success) {
                    var d = data.data;
                    console.log('👤 User data:', d);

                    current.first_name = d.first_name || '';
                    current.last_name = d.last_name || '';
                    current.email = d.email || '';
                    current.gender = d.gender || 'prefer-not';
                    current.dob = d.dob || '';
                    current.equipped_skin = d.equipped_skin || 'default-catto';
                    current.equipped_theme = d.equipped_theme || 'default';
                    current.id = d.id || 0;
                    current.star_shells = d.star_shells || 0;
                    current.total_stars = d.total_stars || 0;
                    current.daily_streak = d.daily_streak || 0;
                    current.inventory = d.inventory_details || [];

                    renderDisplay(d);
                    updateStats(d);
                    loadCloset(d);
                    calculateStreak(d);
                    updateThemeButtonsUI();
                }
            })
            .catch(function(err) {
                console.error('❌ Could not load profile:', err);
                showToast('Error loading profile. Please refresh.', 'error');
            });
    }

    // =========================================================
    // RENDER DISPLAY
    // =========================================================
    function renderDisplay(d) {
        console.log('🎨 Rendering display...');
        
        var userName = d.first_name || 'Explorer';
        var userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = userName;

        var sidebarUsername = document.getElementById('sidebarUsername');
        if (sidebarUsername) sidebarUsername.textContent = userName;

        var displayFullName = document.getElementById('displayFullName');
        if (displayFullName) {
            displayFullName.textContent = (d.first_name || '') + ' ' + (d.last_name || '');
        }

        var displayEmail = document.getElementById('displayEmail');
        if (displayEmail) displayEmail.textContent = d.email || '';

        var userEmail = document.getElementById('userEmail');
        if (userEmail) userEmail.textContent = d.email || '';

        var genderEl = document.getElementById('displayGender');
        if (genderEl) genderEl.textContent = d.gender_display || 'Not specified';

        var dobEl = document.getElementById('displayDob');
        if (dobEl) dobEl.textContent = d.dob_display || 'Not set';

        var ageEl = document.getElementById('displayAge');
        if (ageEl) ageEl.textContent = (d.age !== null && d.age !== undefined) ? d.age : '—';

        var memberSinceEl = document.getElementById('memberSince');
        if (memberSinceEl) memberSinceEl.textContent = d.member_since || 'Not set';

        var userIdEl = document.getElementById('displayUserId');
        if (userIdEl && d.id !== undefined) {
            userIdEl.textContent = '#' + String(d.id).padStart(3, '0');
        }

        var avatarEl = document.getElementById('cattoAvatar');
        var skinName = current.equipped_skin || 'default-catto';
        var skinPath = 'imgs/profile/' + skinName + '.png';
        
        if (avatarEl) {
            avatarEl.src = skinPath;
            avatarEl.onerror = function() {
                if (this.dataset.fallbackAttempted === 'true') return;
                this.dataset.fallbackAttempted = 'true';
                this.src = 'imgs/profile/default-catto.png';
                this.onerror = null;
            };
        }

        var levelBadge = document.getElementById('userLevelBadge');
        if (levelBadge) {
            levelBadge.textContent = '#' + String(d.id || 0).padStart(3, '0');
        }

        updateAllAvatars('imgs/profile/' + current.equipped_skin + '.png');
    }

    // =========================================================
    // UPDATE STATS
    // =========================================================
    function updateStats(d) {
        var statCoins = document.getElementById('statCoins');
        if (statCoins) statCoins.textContent = d.star_shells || 0;

        var statLevel = document.getElementById('statLevel');
        if (statLevel) statLevel.textContent = d.level || 1;

        var statStars = document.getElementById('statStars');
        if (statStars) statStars.textContent = d.total_stars || 0;
    }

    // =========================================================
    // CALCULATE STREAK
    // =========================================================
    function calculateStreak(d) {
        var today = new Date().toDateString();
        var savedStreak = parseInt(localStorage.getItem('dailyStreak')) || 0;
        var lastActive = localStorage.getItem('lastActivityDate');

        if (d.daily_streak !== undefined && d.daily_streak > 0) {
            current.daily_streak = d.daily_streak;
        } else if (lastActive === today) {
            current.daily_streak = savedStreak;
        } else {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastActive === yesterday.toDateString()) {
                current.daily_streak = savedStreak;
            } else if (lastActive !== today) {
                current.daily_streak = 0;
                localStorage.setItem('dailyStreak', '0');
            }
        }

        var statStreak = document.getElementById('statStreak');
        if (statStreak) statStreak.textContent = current.daily_streak;
    }

    // =========================================================
    // UPDATE ALL AVATARS
    // =========================================================
    function updateAllAvatars(skinPath) {
        console.log('🔄 Updating all avatars to:', skinPath);
        
        var fallbackPath = 'imgs/profile/default-catto.png';
        
        function setImageWithFallback(imgElement, path) {
            if (!imgElement) return;
            if (imgElement.dataset.fallbackAttempted === 'true') {
                return;
            }
            imgElement.src = path;
            imgElement.onerror = function() {
                if (this.dataset.fallbackAttempted === 'true') {
                    return;
                }
                this.dataset.fallbackAttempted = 'true';
                this.src = fallbackPath;
                this.onerror = null;
            };
        }
        
        var headerAvatar = document.getElementById('userAvatarIcon');
        setImageWithFallback(headerAvatar, skinPath);
        
        var sidebarAvatar = document.getElementById('sidebarUserImage');
        setImageWithFallback(sidebarAvatar, skinPath);
        
        var profileAvatar = document.getElementById('cattoAvatar');
        setImageWithFallback(profileAvatar, skinPath);
        
        var gameCatto = document.getElementById('cattoImg');
        setImageWithFallback(gameCatto, skinPath);
        
        try {
            localStorage.setItem('currentSkin', skinPath);
        } catch(e) {}
    }

    // =========================================================
    // LOAD CLOSET
    // =========================================================
    var PRINT_ICONS = {
        'coloring_book': '🖍️',
        'sudoku': '🧩',
        'nonogram': '🎨',
        'fantasy-book': '📚'
    };

    var THEME_LABELS = {
        'default': 'Default Theme',
        'purple-theme': 'Purple Theme'
    };

    function prettifyName(name) {
        return name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    }

    function loadCloset(d) {
        var grid = document.getElementById('closetGrid');
        if (!grid) return;

        var inventory = (d.inventory_details || []).slice();

        // The Default Theme is always available (it's free), so make sure it
        // always shows up in the collection even though it's not "purchased".
        var hasDefaultTheme = inventory.some(function(item) {
            return item.item_type === 'theme' && item.item_name === 'default';
        });
        if (!hasDefaultTheme) {
            inventory.unshift({ item_name: 'default', item_type: 'theme' });
        }

        if (inventory.length === 0) {
            grid.innerHTML = `
                <div class="closet-empty">
                    <p>Your closet is empty!</p>
                    <p>Visit the Shop to buy some cool items 🛍️</p>
                </div>
            `;
            return;
        }

        var equippedTheme = d.equipped_theme || 'default';

        var html = '';
        inventory.forEach(function(item) {
            var itemType = item.item_type || 'skin';
            var itemName = item.item_name;
            var isEquipped = false;
            var isPrintable = (itemType === 'prints' || itemType === 'books');
            var displayName;
            var mediaHtml;
            var typeLabel;

            if (itemType === 'skin') {
                isEquipped = itemName === d.equipped_skin;
                displayName = prettifyName(itemName);
                mediaHtml = `<img src="imgs/profile/${itemName}.png" alt="${displayName}" class="item-image" onerror="this.src='imgs/profile/default-catto.png'">`;
                typeLabel = 'Skin';
            } else if (itemType === 'theme') {
                isEquipped = itemName === equippedTheme;
                displayName = THEME_LABELS[itemName] || prettifyName(itemName);
                var swatchClass = itemName === 'purple-theme' ? 'theme-swatch-purple' : 'theme-swatch-default';
                mediaHtml = `<div class="item-image item-icon ${swatchClass}">🎨</div>`;
                typeLabel = 'Theme';
            } else if (isPrintable) {
                displayName = prettifyName(itemName);
                var icon = PRINT_ICONS[itemName] || '📄';
                mediaHtml = `<div class="item-image item-icon">${icon}</div>`;
                typeLabel = itemType === 'books' ? 'Book' : 'Printable';
            } else {
                displayName = prettifyName(itemName);
                mediaHtml = `<img src="imgs/profile/${itemName}.png" alt="${displayName}" class="item-image" onerror="this.src='imgs/profile/default-catto.png'">`;
                typeLabel = prettifyName(itemType);
            }

            html += `
                <div class="closet-item ${isEquipped ? 'equipped' : ''} ${isPrintable ? 'printable' : ''}" data-item="${itemName}" data-type="${itemType}">
                    ${isEquipped ? '<span class="equipped-badge">✓ Equipped</span>' : ''}
                    ${isPrintable ? '<span class="download-badge">📥 Download</span>' : ''}
                    ${mediaHtml}
                    <span class="item-name">${displayName}</span>
                    <span class="item-type">${typeLabel}</span>
                </div>
            `;
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.closet-item').forEach(function(el) {
            el.addEventListener('click', function() {
                var itemName = this.dataset.item;
                var itemType = this.dataset.type;

                if (itemType === 'skin') {
                    if (itemName !== current.equipped_skin) {
                        equipSkin(itemName);
                    }
                } else if (itemType === 'theme') {
                    if (itemName !== current.equipped_theme) {
                        equipTheme(itemName);
                    }
                } else if (itemType === 'prints' || itemType === 'books') {
                    window.open('../Backend/download.php?item=' + encodeURIComponent(itemName), '_blank');
                }
            });
        });
    }

    // =========================================================
    // EQUIP SKIN
    // =========================================================
    function equipSkin(skinName) {
        console.log('🎯 Equipping skin:', skinName);
        
        fetch('../Backend/equip_skin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ equipped_skin: skinName })
        })
        .then(function(res) {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(function(data) {
            console.log('📥 Equip response:', data);
            if (data.success) {
                current.equipped_skin = skinName;
                var skinPath = 'imgs/profile/' + skinName + '.png';
                updateAllAvatars(skinPath);
                loadProfile();
                showUpdateToast('Skin equipped!', 'success', 'Your new look is ready');
            } else {
                showUpdateToast('Failed to equip skin', 'error', data.message || 'Please try again');
            }
        })
        .catch(function(err) {
            console.error('❌ Error equipping skin:', err);
            showUpdateToast('Network error', 'error', 'Please try again');
        });
    }

    // =========================================================
    // EQUIP THEME (used by "My Themes" buttons AND the closet grid)
    // =========================================================
    function equipTheme(themeName) {
        console.log('🎨 Equipping theme:', themeName);

        fetch('../Backend/update_theme.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ theme: themeName })
        })
        .then(function(res) {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(function(data) {
            console.log('📥 Theme equip response:', data);
            if (data.success) {
                current.equipped_theme = themeName;

                // Instantly toggle the CSS class so the page changes without a refresh
                if (themeName === 'purple-theme') {
                    document.body.classList.add('theme-royal-purple');
                } else {
                    document.body.classList.remove('theme-royal-purple');
                }

                updateThemeButtonsUI();
                loadProfile();
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

    // Sync the "My Themes" buttons (show/hide Purple, highlight active one)
    function updateThemeButtonsUI() {
        if (!themeButtons || themeButtons.length === 0) return;

        var ownsPurple = current.inventory.some(function(item) {
            return item.item_name === 'purple-theme';
        });
        if (purpleThemeBtn) {
            purpleThemeBtn.style.display = ownsPurple ? 'inline-block' : 'none';
        }

        var equippedTheme = current.equipped_theme || 'default';
        themeButtons.forEach(function(btn) {
            if (btn.getAttribute('data-theme') === equippedTheme) {
                btn.classList.remove('secondary');
            } else {
                btn.classList.add('secondary');
            }
        });
    }

    // Attach click listeners to the "My Themes" buttons once
    if (themeButtons && themeButtons.length > 0) {
        themeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                equipTheme(btn.getAttribute('data-theme'));
            });
        });
    }

    // =========================================================
    // TOAST FUNCTIONS
    // =========================================================
    function showToast(message, type) {
        var toast = document.getElementById('toast');
        var toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            if (type === 'error') {
                toast.style.background = '#C94E4E';
            } else {
                toast.style.background = '#2E7D32';
            }
            clearTimeout(toast._timer);
            toast._timer = setTimeout(function() {
                toast.classList.remove('show');
                toast.style.background = '';
            }, 3000);
        }
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
    // EDIT MODE FUNCTIONS - FIXED
    // =========================================================
    function enterEditMode() {
        console.log('✏️ Entering edit mode...');
        
        if (!firstNameInput || !lastNameInput || !emailInput) {
            console.error('❌ Input elements not found!');
            showToast('Error: Input fields not found', 'error');
            return;
        }

        firstNameInput.value = current.first_name || '';
        lastNameInput.value = current.last_name || '';
        emailInput.value = current.email || '';
        if (genderInput) genderInput.value = current.gender || 'prefer-not';
        if (dobInput) dobInput.value = current.dob || '';
        
        clearError();

        if (displayMode) {
            displayMode.style.display = 'none';
            console.log('✅ Display mode hidden');
        }
        if (editMode) {
            editMode.style.display = 'block';
            console.log('✅ Edit mode shown');
        }
        
        console.log('✅ Edit mode activated successfully');
    }

    function exitEditMode() {
        console.log('✏️ Exiting edit mode...');
        
        if (displayMode) {
            displayMode.style.display = 'block';
            console.log('✅ Display mode shown');
        }
        if (editMode) {
            editMode.style.display = 'none';
            console.log('✅ Edit mode hidden');
        }
        clearError();
        console.log('✅ Edit mode exited');
    }

    function clearError() {
        if (errorBox) {
            errorBox.textContent = '';
            errorBox.className = '';
            errorBox.style.display = 'none';
        }
    }

    function showError(message) {
        if (errorBox) {
            errorBox.textContent = message;
            errorBox.className = 'error';
            errorBox.style.display = 'block';
        }
    }

    function showSuccess(message) {
        if (errorBox) {
            errorBox.textContent = message;
            errorBox.className = 'success';
            errorBox.style.display = 'block';
            setTimeout(function() {
                if (errorBox.className === 'success') clearError();
            }, 3000);
        }
    }

    // =========================================================
    // EDIT BUTTON - MAIN HANDLER (Replace test listener)
    // =========================================================
    // Remove test listener and add real one
    // (We'll remove the test listener by replacing it)
    
    // Clone and replace to remove old listeners
    var newEditBtn = editBtn.cloneNode(true);
    editBtn.parentNode.replaceChild(newEditBtn, editBtn);
    
    // Now add the real listener
    newEditBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🟢 Edit button clicked! (real)');
        enterEditMode();
    });
    
    console.log('✅ Real edit listener attached');

    // =========================================================
    // CANCEL BUTTON
    // =========================================================
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔴 Cancel button clicked');
            exitEditMode();
        });
    }

    // =========================================================
    // SAVE BUTTON
    // =========================================================
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💾 Save button clicked');
            
            var first_name = firstNameInput ? firstNameInput.value.trim() : '';
            var last_name = lastNameInput ? lastNameInput.value.trim() : '';
            var email = emailInput ? emailInput.value.trim() : '';
            var gender = genderInput ? genderInput.value : current.gender;
            var dob = dobInput ? dobInput.value : current.dob;

            clearError();

            if (!first_name || !last_name || !email) {
                showError('Please fill in all fields.');
                return;
            }

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            saveBtn.disabled = true;
            saveBtn.textContent = 'Saving...';

            fetch('../Backend/update_profile.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    gender: gender,
                    dob: dob
                })
            })
            .then(function(res) {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(function(response) {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Save Changes';

                if (response.success) {
                    current.first_name = response.first_name;
                    current.last_name = response.last_name;
                    current.email = response.email;
                    current.gender = response.gender;
                    current.dob = response.dob;

                    loadProfile();
                    exitEditMode();
                    showSuccess('Profile updated!');
                    showUpdateToast('Profile updated!', 'success', 'Your changes have been saved');
                } else {
                    showError(response.message || 'Could not save changes.');
                }
            })
            .catch(function(err) {
                saveBtn.disabled = false;
                saveBtn.textContent = 'Save Changes';
                console.error('❌ Network error saving profile:', err);
                showError('Network error. Please try again.');
            });
        });
    }

    // =========================================================
    // SKIN MODAL
    // =========================================================
    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', function(e) {
            e.preventDefault();
            openSkinModal();
        });
    }

    function openSkinModal() {
        console.log('🎨 Opening skin modal...');
        fetch('../Backend/get_profile.php')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.success) {
                    current.inventory = data.data.inventory_details || [];
                    current.equipped_skin = data.data.equipped_skin || 'default-catto';
                    renderSkinGrid();
                }
            })
            .catch(function(err) { console.error('❌ Error fetching inventory:', err); });
        
        if (skinModal) {
            skinModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (typeof Sound !== 'undefined') Sound.pop();
        }
    }

    function closeSkinModal() {
        if (skinModal) {
            skinModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    function renderSkinGrid() {
        if (!skinGrid) return;

        var skins = current.inventory.filter(function(item) { return item.item_type === 'skin'; });
        
        var defaultSkin = {
            item_name: 'default-catto',
            item_type: 'skin'
        };

        var hasDefault = skins.some(function(s) { return s.item_name === 'default-catto'; });
        var allSkins = hasDefault ? skins : [defaultSkin].concat(skins);

        if (allSkins.length === 0) {
            skinGrid.innerHTML = `
                <div class="skin-empty" style="grid-column:1/-1;text-align:center;padding:20px;color:var(--plum-soft);">
                    <p>No skins available. Visit the shop to buy some!</p>
                </div>
            `;
            return;
        }

        var html = '';
        allSkins.forEach(function(skin) {
            var skinName = skin.item_name;
            var displayName = skinName.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
            var isEquipped = skinName === current.equipped_skin;
            var isDefault = skinName === 'default-catto';
            var isOwned = isDefault || current.inventory.some(function(s) { return s.item_name === skinName; });
            
            html += `
                <div class="skin-option ${isEquipped ? 'equipped' : ''}" 
                     data-skin="${skinName}" 
                     data-owned="${isOwned}">
                    ${isEquipped ? '<div class="skin-check">✓</div>' : ''}
                    <img src="imgs/profile/${skinName}.png" alt="${displayName}" class="skin-image" onerror="this.src='imgs/profile/default-catto.png'">
                    <span class="skin-name">${displayName}</span>
                    <span class="skin-status ${isEquipped ? 'equipped-text' : (isOwned ? 'owned-text' : 'locked-text')}">
                        ${isEquipped ? '✓ Equipped' : (isOwned ? 'Owned' : '🔒 Locked')}
                    </span>
                </div>
            `;
        });

        skinGrid.innerHTML = html;

        skinGrid.querySelectorAll('.skin-option').forEach(function(el) {
            el.addEventListener('click', function() {
                var skinName = this.dataset.skin;
                var isOwned = this.dataset.owned === 'true';
                
                if (isOwned && skinName !== current.equipped_skin) {
                    equipSkin(skinName);
                    closeSkinModal();
                } else if (!isOwned) {
                    showToast('You don\'t own this skin! Visit the shop to buy it.', 'error');
                }
            });
        });
    }

    if (skinModalClose) {
        skinModalClose.addEventListener('click', closeSkinModal);
    }

    if (skinModal) {
        skinModal.addEventListener('click', function(e) {
            if (e.target === this) closeSkinModal();
        });
    }

    // =========================================================
    // KEYBOARD SHORTCUTS
    // =========================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (skinModal && skinModal.classList.contains('open')) closeSkinModal();
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

    // Expose functions globally
    window.loadProfile = loadProfile;
    window.updateAllAvatars = updateAllAvatars;

    console.log('✅ Profile.js initialized successfully!');
    console.log('🔍 Click the Edit Profile button and check the console.');
});