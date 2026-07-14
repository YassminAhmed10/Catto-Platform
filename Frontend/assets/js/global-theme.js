// global-theme.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('../Backend/get_profile.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // User is logged in, check their equipped theme
        const equippedTheme = data.data.equipped_theme || 'default';
        
        if (equippedTheme === 'purple-theme') {
          document.body.classList.add('theme-royal-purple');
        } else {
          document.body.classList.remove('theme-royal-purple');
        }
      } else {
        // User is NOT logged in (guest). Force the default theme.
        document.body.classList.remove('theme-royal-purple');
      }
    })
    .catch(err => console.error("global-theme.js error:", err));
});