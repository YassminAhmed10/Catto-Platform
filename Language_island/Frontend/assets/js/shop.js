/* =========================================================
   SHOP.JS - Buy & Equip & Sort
   ========================================================= */

console.log('Shop.js loaded!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready - initializing shop...');
  
  let currentCoins = 0;
  let purchasedItems = [];
  let currentSkin = '';
  let currentTheme = 'default';
  let currentCategory = 'all';
  let isLoggedIn = false;

  // =========================================================
  // SHOP ITEMS
  // =========================================================
  const shopItems = {
    skins: [
      { id: 'wizard-catto', name: 'Wizard Catto', price: 250, category: 'skins', image: 'imgs/Cattoimages/wizard-catto.png', description: 'Equip Catto with his magical wizard hat and wand.' },
      { id: 'king-of-learning', name: 'King of Learning', price: 300, category: 'skins', image: 'imgs/shop/King of Learning.png', description: 'Rule the kingdom of knowledge with this royal skin.' },
      { id: 'astronaut-catto', name: 'Astronaut Catto', price: 300, category: 'skins', image: 'imgs/shop/Astronaut-Catto.png', description: 'Blast off to learning with this space explorer skin.' },
      { id: 'chef-catto', name: 'Chef Catto', price: 250, category: 'skins', image: 'imgs/shop/Chef Catto.png', description: 'Cook up some knowledge with this chef skin.' },
      { id: 'artist-catto', name: 'Artist Catto', price: 250, category: 'skins', image: 'imgs/shop/Artist Catto.png', description: 'Create masterpieces with this creative artist skin.' },
      { id: 'ocean-explorer', name: 'Ocean Explorer Catto', price: 300, category: 'skins', image: 'imgs/shop/Ocean Explorer Catto.png', description: 'Dive deep into learning with this ocean explorer skin.' },
      { id: 'doctor-catto', name: 'Doctor Catto', price: 250, category: 'skins', image: 'imgs/Cattoimages/doctor-catto.png', description: 'Equip Catto with his stethoscope and doctor\'s coat.' },
      { id: 'pirate-catto', name: 'Pirate Catto', price: 250, category: 'skins', image: 'imgs/Cattoimages/pirate-catto.png', description: 'Equip Catto with his cool pirate hat and eye patch.' }
    ],
    prints: [
      { id: 'coloring_book', name: 'Animal Coloring Book', price: 150, category: 'prints', image: 'imgs/shop/icons/coloring-book.png', description: 'A printable coloring book featuring all the new animals you learned!' },
      { id: 'sudoku', name: 'Animal Sudoku', price: 150, category: 'prints', image: 'imgs/shop/icons/sudoku.png', description: 'A printable solo puzzle game using the animals you just learned!' },
      { id: 'nonogram', name: 'Food Nonogram', price: 150, category: 'prints', image: 'imgs/shop/icons/nonogram.png', description: 'Solve the printable number grid to reveal a secret food picture.' }
    ],
    books: [
      { id: 'catto-space', name: 'Catto in Space', price: 200, category: 'books', image: 'imgs/shop/Books/Catto-space.png', description: 'Join Catto on an adventure through the stars and planets!' },
      { id: 'catto-fruits', name: 'Catto & Fruits', price: 200, category: 'books', image: 'imgs/shop/Books/Catto-fruits.png', description: 'Learn about healthy fruits with Catto in this colorful book!' },
      { id: 'catto-numbers', name: 'Catto & Numbers', price: 200, category: 'books', image: 'imgs/shop/Books/Catto-numbers.png', description: 'Count along with Catto and discover the world of numbers!' },
      { id: 'fantasy-book', name: 'Romance Fantasy Adventure', price: 250, category: 'books', image: 'imgs/shop/Books/fantasy-book.png', description: 'Dive into a magical world of romance and fantasy.' }
    ],
    themes: [
      { id: 'purple-theme', name: 'Royal Purple Theme', price: 300, category: 'themes', image: '', description: 'Unlock a magical purple color palette for your entire dashboard.', isTheme: true, swatchClass: 'swatch-purple' },
      { id: 'night-theme', name: 'Night Theme', price: 300, category: 'themes', image: '', description: 'Swap the sun for a glowing moon and dress your dashboard in navy & white.', isTheme: true, swatchClass: 'swatch-night' },
      { id: 'space-theme', name: 'Space Theme', price: 350, category: 'themes', image: '', description: 'Blast into a galaxy of planets and stars across your whole dashboard.', isTheme: true, swatchClass: 'swatch-space' },
      { id: 'boys-theme', name: 'Boys Theme', price: 300, category: 'themes', image: '', description: 'Cool green energy, waves, and a dynamic nature-inspired look.', isTheme: true, swatchClass: 'swatch-boys' }
    ]
  };

  // Flatten all items for easy access
  const allItems = [];
  Object.values(shopItems).forEach(category => {
    category.forEach(item => {
      allItems.push(item);
    });
  });

  console.log('All items loaded:', allItems.length);

  // Category tab elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const shopGrid = document.getElementById('shopGrid');
  const loginStatusMsg = document.getElementById('loginStatusMsg');
  const shopOverlay = document.getElementById('shopOverlay');

  console.log('shopGrid exists:', !!shopGrid);
  console.log('Tab buttons found:', tabButtons.length);

  function applyCategoryFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('category');
    if (cat) {
      var targetTab = document.querySelector('.tab-btn[data-category="' + cat + '"]');
      if (targetTab) {
        tabButtons.forEach(b => b.classList.remove('active'));
        targetTab.classList.add('active');
        currentCategory = cat;
      }
    }
  }
  applyCategoryFromUrl();

  // Category tab click handlers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      console.log('Category changed to:', currentCategory);
      filterItems();
    });
  });

  function filterItems() {
    if (!shopGrid) return;
    const cards = shopGrid.querySelectorAll('.shop-card');
    const isMyItems = currentCategory === 'myitems';
    
    cards.forEach(card => {
      const category = card.dataset.category;
      const isOwned = card.dataset.owned === 'true';
      
      if (currentCategory === 'all') {
        card.classList.remove('hidden');
      } else if (isMyItems) {
        if (isOwned) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      } else {
        if (category === currentCategory && !isOwned) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }
    });
  }

  function fetchShopData() {
    console.log('Fetching shop data...');
    fetch('../Backend/get_profile.php')
      .then(res => res.json())
      .then(data => {
        console.log('Shop data received:', data);
        if (!data.success) {
          console.log('Not logged in or error');
          isLoggedIn = false;
          updateLoginStatus(false);
          showOverlay(true);
          return;
        }
        
        isLoggedIn = true;
        currentCoins = data.data.coins || 0;
        purchasedItems = data.data.inventory || [];
        currentSkin = data.data.equipped_skin || 'default-catto';
        currentTheme = data.data.equipped_theme || 'default';
        
        console.log('Coins:', currentCoins);
        console.log('Purchased items:', purchasedItems);
        console.log('Current skin:', currentSkin);
        
        updateLoginStatus(true);
        showOverlay(false);
        updateShopUI();
      })
      .catch(err => {
        console.error("Shop fetch error:", err);
        isLoggedIn = false;
        updateLoginStatus(false);
        showOverlay(true);
      });
  }

  function showOverlay(show) {
    if (!shopOverlay) return;
    if (show) {
      shopOverlay.classList.add('show');
    } else {
      shopOverlay.classList.remove('show');
    }
  }

  function updateLoginStatus(loggedIn) {
    if (!loginStatusMsg) return;
    if (loggedIn) {
      loginStatusMsg.innerHTML = `<i class="fas fa-coins" style="margin-right:6px;color:var(--star);"></i> You have <strong>${currentCoins}</strong> coins! Spend them wisely!`;
      loginStatusMsg.style.color = 'var(--sky-text-soft)';
    } else {
      loginStatusMsg.innerHTML = `<i class="fas fa-lock" style="margin-right:6px;"></i> Sign in to start earning coins!`;
      loginStatusMsg.style.color = 'var(--coral)';
    }
  }

  // Update ALL avatars across all pages
  function updateAllAvatars(skinPath) {
    console.log('Updating all avatars to:', skinPath);
    
    const headerAvatar = document.getElementById('userAvatarIcon');
    if (headerAvatar) headerAvatar.src = skinPath;
    
    const sidebarAvatar = document.getElementById('sidebarUserImage');
    if (sidebarAvatar) sidebarAvatar.src = skinPath;
    
    const profileAvatar = document.getElementById('cattoAvatar');
    if (profileAvatar) profileAvatar.src = skinPath;
    
    const gameCatto = document.getElementById('cattoImg');
    if (gameCatto) gameCatto.src = skinPath;
    
    try {
      localStorage.setItem('currentSkin', skinPath);
    } catch(e) {}
  }

  function updateShopUI() {
    console.log('Updating shop UI...');
    
    if (shopGrid) shopGrid.innerHTML = '';

    const purchased = [];
    const unpurchased = [];

    allItems.forEach(item => {
      if (purchasedItems.includes(item.id)) {
        purchased.push(item);
      } else {
        unpurchased.push(item);
      }
    });

    console.log('Unpurchased items:', unpurchased.length);
    console.log('Purchased items:', purchased.length);

    if (allItems.length === 0 && shopGrid) {
      shopGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--plum-soft);">
          <p style="font-size:18px;font-weight:700;">🛍️ No items available!</p>
          <p>Check back later for new items.</p>
        </div>
      `;
    } else if (shopGrid) {
      unpurchased.forEach(item => {
        const card = createItemCard(item, false);
        shopGrid.appendChild(card);
      });
      
      purchased.forEach(item => {
        const card = createItemCard(item, true);
        shopGrid.appendChild(card);
      });
    }

    // Apply theme using global function
    if (typeof window.applyThemeClass === 'function') {
      window.applyThemeClass(currentTheme);
    }

    filterItems();
  }

  function createItemCard(item, isOwned) {
    const card = document.createElement('div');
    card.className = 'shop-card';
    
    // Add specific classes based on category
    if (item.category === 'prints') {
      card.classList.add('print-card');
    }
    if (item.category === 'books') {
      card.classList.add('print-card');
      card.classList.add('book-card');
    }
    if (isOwned) {
      card.classList.add('my-item-card');
    }
    card.dataset.category = item.category;
    card.dataset.itemId = item.id;
    card.dataset.owned = isOwned ? 'true' : 'false';

    let imageHtml = '';
    if (item.isTheme) {
      const swatchClass = item.swatchClass || 'swatch-default';
      imageHtml = `<div class="theme-swatch-shop ${swatchClass}"></div>`;
    } else if (item.image && item.image.length > 0) {
      imageHtml = `<img src="${item.image}" alt="${item.name}" class="card-image shop-item-img" loading="lazy">`;
    } else {
      imageHtml = `<div class="card-image-placeholder">🪙</div>`;
    }

    const categoryLabels = {
      skins: 'Skin',
      prints: 'Printable',
      books: 'Book',
      themes: 'Theme'
    };

    let ownedBadge = '';
    if (isOwned) {
      ownedBadge = `<span class="owned-badge">✓ Owned</span>`;
    }

    let buttonHtml = '';
    if (isOwned) {
      if (item.category === 'skins') {
        if (currentSkin === item.id) {
          buttonHtml = `<button class="buy-btn purchased" disabled>Equipped ✔</button>`;
        } else {
          buttonHtml = `<button class="buy-btn equip-btn" data-item="${item.id}">Equip</button>`;
        }
      } else if (item.category === 'prints' || item.category === 'books') {
        buttonHtml = `<a href="../Backend/download.php?item=${item.id}" class="buy-btn purchased" style="text-decoration:none;display:inline-block;">Download PDF 📥</a>`;
      } else if (item.isTheme) {
        // For owned themes, show a message to go to Settings
        buttonHtml = `<button class="buy-btn purchased" disabled>Owned ✔</button>`;
      } else {
        buttonHtml = `<button class="buy-btn purchased" disabled>Owned ✔</button>`;
      }
    } else {
      buttonHtml = `<button class="buy-btn" data-item="${item.id}" data-price="${item.price}">${item.price} 🪙</button>`;
    }

    card.innerHTML = `
      ${imageHtml}
      ${ownedBadge}
      <span class="card-category">${categoryLabels[item.category] || 'Item'}</span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      ${buttonHtml}
    `;

    // Handle image loading errors with fallback - only once
    const img = card.querySelector('.shop-item-img');
    if (img) {
      img.addEventListener('error', function() {
        if (!this.dataset.fallbackAttempted) {
          this.dataset.fallbackAttempted = 'true';
          const placeholder = document.createElement('div');
          placeholder.className = 'card-image-placeholder';
          placeholder.textContent = '🪙';
          this.parentNode.replaceChild(placeholder, this);
        }
      });
    }

    const buyBtn = card.querySelector('.buy-btn');
    if (buyBtn && !buyBtn.disabled && !buyBtn.classList.contains('purchased')) {
      const isEquipBtn = buyBtn.classList.contains('equip-btn');
      if (isEquipBtn) {
        buyBtn.addEventListener('click', () => equipItem(item.id));
      } else {
        buyBtn.addEventListener('click', () => {
          if (!isLoggedIn) {
            showLoginModal();
            return;
          }
          buyItem(item);
        });
      }
    }

    return card;
  }

  function buyItem(item) {
    console.log('Buying item:', item.id, 'price:', item.price);
    if (currentCoins < item.price) {
      showToast('❌ Not enough coins! Play games to earn more.');
      return;
    }

    showPurchaseModal(item);
  }

  function showPurchaseModal(item) {
    const modal = document.getElementById('purchaseModal');
    if (!item) return;

    const purchaseIcon = document.getElementById('purchaseIcon');
    
    // For themes, show swatch in modal
    if (item.isTheme) {
      const swatchClass = item.swatchClass || 'swatch-default';
      purchaseIcon.innerHTML = `<div class="theme-swatch-shop ${swatchClass}" style="width:100px;height:100px;border-radius:50%;margin:0 auto;"></div>`;
    } else if (item.image && item.image.length > 0) {
      // For books, remove border and background in modal
      const isBook = item.category === 'books';
      const borderStyle = isBook ? 'border:none !important;border-radius:0 !important;box-shadow:none !important;' : 'border:4px solid var(--coral);border-radius:50%;';
      const objectFit = isBook ? 'contain' : 'cover';
      purchaseIcon.innerHTML = `<img src="${item.image}" alt="${item.name}" class="purchase-item-img" style="width:100px;height:100px;${borderStyle}object-fit:${objectFit};background:transparent !important;">`;
    } else {
      purchaseIcon.innerHTML = `<span style="font-size:56px;">🪙</span>`;
    }

    // Handle purchase image error
    const purchaseImg = purchaseIcon.querySelector('.purchase-item-img');
    if (purchaseImg) {
      purchaseImg.addEventListener('error', function() {
        if (!this.dataset.fallbackAttempted) {
          this.dataset.fallbackAttempted = 'true';
          this.parentNode.innerHTML = `<span style="font-size:56px;">🪙</span>`;
        }
      });
    }

    document.getElementById('purchaseTitle').textContent = `Buy ${item.name}?`;
    document.getElementById('purchaseText').textContent = `This will cost you ${item.price} coins.`;
    document.getElementById('purchaseDetails').innerHTML = `
      <div class="pd-info" style="text-align:center;width:100%;">
        <div class="pd-name">${item.name}</div>
        <div class="pd-price" style="font-size:20px;color:var(--coral-dark);font-weight:800;">${item.price} 🪙</div>
        <div style="font-size:13px;color:var(--plum-soft);margin-top:4px;">${item.description}</div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const confirmBtn = document.getElementById('purchaseConfirm');
    const cancelBtn = document.getElementById('purchaseCancel');
    const closeBtn = document.getElementById('purchaseModalClose');

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    confirmBtn.onclick = () => {
      closeModal();
      processPurchase(item.id);
    };

    cancelBtn.onclick = closeModal;
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  function processPurchase(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    fetch('../Backend/buy_item.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_name: itemId })
    })
    .then(res => res.json())
    .then(response => {
      console.log('Purchase response:', response);
      if (response.success) {
        fetchShopData();
        showToast(`Purchased ${item.name}!`);
      } else {
        showToast(`❌ ${response.message || 'Error.'}`);
      }
    })
    .catch(err => {
      console.error('Error purchasing:', err);
      showToast('❌ Network error. Please try again.');
    });
  }

  function equipItem(itemId) {
    console.log('Equipping item:', itemId);
    fetch('../Backend/equip_skin.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipped_skin: itemId })
    })
    .then(res => res.json())
    .then(response => {
      console.log('Equip response:', response);
      if (response.success) {
        const skinPath = `imgs/Cattoimages/${itemId}.png`;
        
        if (typeof window.updateAllAvatars === 'function') {
          window.updateAllAvatars(skinPath);
        } else {
          updateAllAvatars(skinPath);
        }
        
        try {
          localStorage.setItem('currentSkin', skinPath);
        } catch(e) {}
        
        fetchShopData();
        if (typeof initHeader === 'function') initHeader();
        
        showToast(`Skin Equipped!`);
      } else {
        showToast(`❌ ${response.message || 'Error equipping.'}`);
      }
    })
    .catch(err => {
      console.error('Error equipping:', err);
      showToast('Network error. Please try again.');
    });
  }

  function showLoginModal() {
    const modal = document.getElementById('loginRequiredModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (typeof Sound !== 'undefined') Sound.pop();
    }
  }

  function showToast(message) {
    console.log('Toast:', message);
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  // Close login modal
  const loginModalClose = document.getElementById('loginModalClose');
  if (loginModalClose) {
    loginModalClose.addEventListener('click', () => {
      const modal = document.getElementById('loginRequiredModal');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Close login modal on backdrop click
  const loginModal = document.getElementById('loginRequiredModal');
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Apply cached skin on load
  function applyCachedSkin() {
    try {
      const cachedSkin = localStorage.getItem('currentSkin');
      if (cachedSkin) {
        updateAllAvatars(cachedSkin);
      }
    } catch(e) {}
  }
  
  applyCachedSkin();

  window.fetchShopData = fetchShopData;
  window.updateAllAvatars = updateAllAvatars;
  fetchShopData();
});