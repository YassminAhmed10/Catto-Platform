// =========================================================
// AUTH FUNCTIONS
// =========================================================

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Set field state
function setFieldState(input, errorEl, isValid) {
  if (!input || !errorEl) return;
  
  if (isValid === true) {
    input.classList.remove('error');
    errorEl.classList.remove('show');
  } else if (isValid === false) {
    input.classList.add('error');
    errorEl.classList.add('show');
  } else {
    input.classList.remove('error');
    errorEl.classList.remove('show');
  }
}

// =========================================================
// DOM READY
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
  // If already logged in, redirect to home
  if (typeof Auth !== 'undefined' && typeof Auth.isLoggedIn === 'function' && Auth.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }
  
  // Check localStorage directly
  try {
    var userData = localStorage.getItem('languageIslandUser');
    if (userData && userData !== 'null' && userData !== '') {
      window.location.href = 'index.html';
      return;
    }
  } catch(e) {}

  var form = document.getElementById('signinForm');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var emailError = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');
  var togglePass = document.getElementById('togglePass');
  var toast = document.getElementById('toast');
  var toastMessage = document.getElementById('toastMessage');

  // Toggle password visibility
  if (togglePass) {
    togglePass.addEventListener('click', function() {
      var isHidden = password.type === 'password';
      password.type = isHidden ? 'text' : 'password';
      togglePass.innerHTML = isHidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      if (typeof Sound !== 'undefined') Sound.pop();
    });
  }

  // Form submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var emailVal = email.value.trim();
    var passwordVal = password.value;

    var emailValid = isValidEmail(emailVal);
    var passwordValid = passwordVal.length > 2;

    setFieldState(email, emailError, emailValid);
    setFieldState(password, passwordError, passwordValid);

    if (emailValid && passwordValid) {
      var submitBtn = form.querySelector('.auth-submit');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
      submitBtn.disabled = true;

      fetch('../Backend/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailVal,
          password: passwordVal
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if (data.success) {
          localStorage.setItem('starShells', data.user.star_shells);
          localStorage.setItem('languageIslandUser', JSON.stringify(data.user));
          
          sessionStorage.setItem('justSignedIn', 'true');
          
          if (toastMessage) toastMessage.textContent = 'Welcome back, ' + data.user.first_name + '!';
          if (toast) {
            toast.className = 'toast show';
            toast.style.background = '#58C27D';
          }
          if (typeof Sound !== 'undefined') Sound.win();
          
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 1000);
        } else {
          if (toastMessage) toastMessage.textContent = '❌ ' + data.message;
          if (toast) {
            toast.className = 'toast show';
            toast.style.background = '#E74C3C';
          }
          if (typeof Sound !== 'undefined') Sound.locked();
          
          form.style.animation = 'shake 0.3s ease';
          setTimeout(function() {
            form.style.animation = '';
          }, 300);
          
          password.value = '';
          password.focus();
        }
      })
      .catch(function(error) {
        console.error('Signin error:', error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if (toastMessage) toastMessage.textContent = '❌ Connection error. Please try again.';
        if (toast) {
          toast.className = 'toast show';
          toast.style.background = '#E74C3C';
        }
        if (typeof Sound !== 'undefined') Sound.locked();
      });

    } else {
      if (typeof Sound !== 'undefined') Sound.locked();
      if (toastMessage) toastMessage.textContent = '❌ Please fill in all fields correctly.';
      if (toast) {
        toast.className = 'toast show';
        toast.style.background = '#E74C3C';
      }
    }
  });

  // Real-time validation
  email.addEventListener('input', function() {
    var val = this.value.trim();
    if (val.length > 0) {
      setFieldState(this, emailError, isValidEmail(val));
    } else {
      setFieldState(this, emailError, null);
    }
  });
  
  password.addEventListener('input', function() {
    var val = this.value;
    if (val.length > 0) {
      setFieldState(this, passwordError, val.length > 2);
    } else {
      setFieldState(this, passwordError, null);
    }
  });

  // Catto video interaction
  var authCatVideo = document.getElementById('authCatVideo');
  var catUnmuted = false;
  
  function unmuteCatto() {
    if (catUnmuted || !authCatVideo) return;
    catUnmuted = true;
    authCatVideo.muted = false;
    authCatVideo.play().catch(function() {});
  }
  
  document.addEventListener('click', unmuteCatto, { once: true });
  document.addEventListener('touchstart', unmuteCatto, { once: true });

  if (authCatVideo) {
    authCatVideo.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
    });
    authCatVideo.addEventListener('mouseenter', function() {
      if (typeof Sound !== 'undefined') Sound.hover();
    });
  }

  // Hover sounds for interactive elements
  var soundHoverSelector = [
    '.brand', '.auth-submit', '.social-btn',
    '.toggle-pass', '.auth-switch a', '.card-logo-img',
    '.forgot-link', '.remember-me'
  ].join(',');

  document.querySelectorAll(soundHoverSelector).forEach(function(el) {
    var hoverTimeout;
    el.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(function() {
        if (typeof Sound !== 'undefined') Sound.hover();
      }, 60);
    });
    el.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimeout);
    });
    el.addEventListener('click', function() {
      if (typeof Sound !== 'undefined') Sound.pop();
    });
  });

  // Auto-close toast after 2.5 seconds
  if (toast) {
    setInterval(function() {
      if (toast.classList.contains('show')) {
        setTimeout(function() {
          toast.classList.remove('show');
        }, 2500);
      }
    }, 100);
  }
});