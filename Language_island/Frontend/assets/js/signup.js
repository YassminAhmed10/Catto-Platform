 document.addEventListener('DOMContentLoaded', function() {
    if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
      window.location.href = 'index.html';
      return;
    }

    const form = document.getElementById('signupForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const dobError = document.getElementById('dobError');
    const genderError = document.getElementById('genderError');
    const signupEmailError = document.getElementById('signupEmailError');
    const signupPasswordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const toggleSignupPass = document.getElementById('toggleSignupPass');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    const bars = [document.getElementById('bar1'), document.getElementById('bar2'), document.getElementById('bar3')];
    const strengthHint = document.getElementById('strengthHint');

    toggleSignupPass.addEventListener('click', function() {
      const isHidden = signupPassword.type === 'password';
      signupPassword.type = isHidden ? 'text' : 'password';
      toggleSignupPass.innerHTML = isHidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
      if (typeof Sound !== 'undefined') Sound.pop();
    });

    function passwordScore(value) {
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value) && value.length >= 10) score++;
      return score;
    }

    function updateStrengthMeter() {
      const score = passwordScore(signupPassword.value);
      const labels = ['At least 8 characters', 'Good — add a number & capital', 'Strong password!'];
      const classes = ['weak', 'medium', 'strong'];

      bars.forEach((bar, i) => {
        bar.className = 'strength-bar';
        if (i < score) bar.classList.add(classes[Math.min(score, 3) - 1]);
      });

      strengthHint.textContent = signupPassword.value.length === 0
        ? 'At least 8 characters'
        : labels[Math.min(Math.max(score - 1, 0), 2)];
    }

    function setFieldState(input, errorEl, isValid) {
      if (!input || !errorEl) return;
      if (isValid) {
        input.classList.remove('error');
        errorEl.classList.remove('show');
      } else {
        input.classList.add('error');
        errorEl.classList.add('show');
      }
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    firstName.addEventListener('input', function() {
      setFieldState(firstName, firstNameError, firstName.value.trim().length > 1);
    });

    lastName.addEventListener('input', function() {
      setFieldState(lastName, lastNameError, lastName.value.trim().length > 1);
    });

    dob.addEventListener('input', function() {
      setFieldState(dob, dobError, dob.value.length > 0);
    });

    signupEmail.addEventListener('input', function() {
      setFieldState(signupEmail, signupEmailError, isValidEmail(signupEmail.value.trim()));
    });

    signupPassword.addEventListener('input', function() {
      updateStrengthMeter();
      setFieldState(signupPassword, signupPasswordError, signupPassword.value.length >= 8);
    });

    confirmPassword.addEventListener('input', function() {
      setFieldState(confirmPassword, confirmPasswordError, 
        confirmPassword.value === signupPassword.value && confirmPassword.value.length > 0);
    });

    genderRadios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        genderError.classList.remove('show');
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const firstNameVal = firstName.value.trim();
      const lastNameVal = lastName.value.trim();
      const dobVal = dob.value;
      const emailVal = signupEmail.value.trim();
      const passwordVal = signupPassword.value;
      const confirmVal = confirmPassword.value;
      
      const genderValid = Array.from(genderRadios).some(function(r) { return r.checked; });

      const firstNameValid = firstNameVal.length > 1;
      const lastNameValid = lastNameVal.length > 1;
      const dobValid = dobVal.length > 0;
      const emailValid = isValidEmail(emailVal);
      const passwordValid = passwordVal.length >= 8;
      const confirmValid = confirmVal === passwordVal && confirmVal.length > 0;

      setFieldState(firstName, firstNameError, firstNameValid);
      setFieldState(lastName, lastNameError, lastNameValid);
      setFieldState(dob, dobError, dobValid);
      setFieldState(signupEmail, signupEmailError, emailValid);
      setFieldState(signupPassword, signupPasswordError, passwordValid);
      setFieldState(confirmPassword, confirmPasswordError, confirmValid);

      genderError.classList.toggle('show', !genderValid);

      if (firstNameValid && lastNameValid && dobValid && emailValid && passwordValid && confirmValid && genderValid) {
        const gender = Array.from(genderRadios).find(function(r) { return r.checked; })?.value || 'prefer-not';
        
        fetch('../Backend/signup.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: firstNameVal,
            last_name: lastNameVal,
            email: emailVal,
            password: passwordVal,
            dob: dobVal,
            gender: gender
          })
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          if (data.success) {
            localStorage.setItem('languageIslandUser', JSON.stringify({
              first_name: firstNameVal,
              email: emailVal
            }));

            toastMessage.textContent = 'Welcome to Language Island, ' + firstNameVal + '!';
            toast.classList.remove('error');
            toast.classList.add('show');
            if (typeof Sound !== 'undefined') Sound.win();
            
            setTimeout(function() {
              window.location.href = 'index.html';
            }, 1500);
          } else {
            toastMessage.textContent = '❌ ' + data.message;
            toast.classList.add('error');
            toast.classList.add('show');
            if (typeof Sound !== 'undefined') Sound.locked();
          }
        })
        .catch(function(error) {
          toastMessage.textContent = '❌ Connection error. Please try again.';
          toast.classList.add('error');
          toast.classList.add('show');
          if (typeof Sound !== 'undefined') Sound.locked();
        });

      } else {
        if (typeof Sound !== 'undefined') Sound.locked();
        toastMessage.textContent = '❌ Please fix all errors before continuing.';
        toast.classList.add('error');
        toast.classList.add('show');
      }
    });

    // Hover sounds
    document.querySelectorAll('.brand, .auth-submit, .social-btn, .toggle-pass, .auth-switch a, .card-logo-img').forEach(function(el) {
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
  });