document.addEventListener('DOMContentLoaded', () => {
    const avatarImg = document.getElementById('cattoAvatar');
    const modal = document.getElementById('closetModal');
    const openBtn = document.getElementById('openClosetBtn');
    const closeBtn = document.getElementById('closeClosetBtn');
    const skinGrid = document.getElementById('skinGrid');

    let ownedSkins = [];       // skin item_names the player actually owns
    let currentEquipped = 'default-catto';

    // 1. Fetch real data from the backend on load
    fetch('../Backend/get_profile.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const details = data.data.inventory_details || [];
                ownedSkins = details
                    .filter(item => item.item_type === 'skin')
                    .map(item => item.item_name);

                currentEquipped = data.data.equipped_skin || 'default-catto';

                updateAvatarImage(currentEquipped);
                buildCloset();
            }
        });

    // 2. Modal Controls
    openBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // 3. Build the Skin Grid 
    function buildCloset() {
        skinGrid.innerHTML = '';

        const allAvailableSkins = ['default-catto', ...ownedSkins];

        allAvailableSkins.forEach(skinName => {
            const skinDiv = document.createElement('div');
            skinDiv.className = `skin-option ${skinName === currentEquipped ? 'active-skin' : ''}`;
            skinDiv.innerHTML = `<img src="imgs/Cattoimages/${skinName}.png" alt="${skinName}">`;

            skinDiv.addEventListener('click', () => equipSkin(skinName));
            skinGrid.appendChild(skinDiv);
        });
    }

    // 4. Handle Equipping & DB Update
    function equipSkin(skinName) {
        const previousEquipped = currentEquipped;

        // UI update
        currentEquipped = skinName;
        updateAvatarImage(skinName);
        buildCloset();
        modal.style.display = 'none';

        fetch('../Backend/update_skin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ equipped_skin: skinName })
        })
        .then(res => res.json())
        .then(response => {
            if (!response.success) {
                console.error("Failed to save skin to database:", response.message);
                // Roll back the UI since the save didn't actually happen
                currentEquipped = previousEquipped;
                updateAvatarImage(previousEquipped);
                buildCloset();
            }
        })
        .catch(err => {
            console.error("Network error saving skin:", err);
            currentEquipped = previousEquipped;
            updateAvatarImage(previousEquipped);
            buildCloset();
        });
    }

    function updateAvatarImage(skinName) {
        if (avatarImg) {
            avatarImg.src = `imgs/Cattoimages/${skinName}.png`;
        }
    }
});