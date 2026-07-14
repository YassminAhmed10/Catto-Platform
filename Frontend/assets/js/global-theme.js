// global-theme.js
// Applies the purple theme based on what the player REALLY owns in the
// database (shop_items / user_inventory), not a fake localStorage flag.
document.addEventListener('DOMContentLoaded', () => {
  fetch('../Backend/get_profile.php')
    .then(res => res.json())
    .then(data => {
      if (data.success && (data.data.inventory || []).includes('purple-theme')) {
        document.body.classList.add('theme-royal-purple');
      }
    })
    .catch(err => console.error("global-theme.js: could not verify theme ownership:", err));
});