document.addEventListener('DOMContentLoaded', () => {
  const passages = [
    {
      title: 'Buenos días',
      level: 'Easy',
      text: 'Buenos días. Me llamo Zaza. Vivo en una isla con muchos colores.',
      lang: 'es-ES'
    },
    {
      title: 'Mi mascota',
      level: 'Easy',
      text: 'Tengo un perro pequeño. Se llama Beni. Beni es marrón y muy feliz.',
      lang: 'es-ES'
    },
    {
      title: 'El mercado',
      level: 'Medium',
      text: 'Vamos al mercado los sábados. Compramos manzanas, pan y flores amarillas.',
      lang: 'es-ES'
    },
    {
      title: 'La familia',
      level: 'Medium',
      text: 'Mi familia es grande. Tengo dos hermanos y una hermana. Mi madre cocina muy bien.',
      lang: 'es-ES'
    },
    {
      title: 'El verano',
      level: 'Hard',
      text: 'En verano vamos a la playa. El sol brilla y el agua está caliente. Me gusta nadar.',
      lang: 'es-ES'
    }
  ];

  const list = document.getElementById('readingList');
  const toast = document.getElementById('toast');
  const synth = window.speechSynthesis;
  
  // Store active speech instances
  let activeSpeeches = {};

  function showToast(message, isSuccess = false) {
    toast.textContent = message;
    toast.style.background = isSuccess ? '#58C27D' : '#2E2657';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function wrapWords(text) {
    return text.split(' ').map((w, i) => 
      `<span class="reading-word" data-word-index="${i}">${w}</span>`
    ).join(' ');
  }

  function renderList() {
    list.innerHTML = '';
    passages.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'reading-card interactive';
      card.innerHTML = `
        <div class="reading-card-head">
          <h3>${p.title} <span class="content-tag">${p.level}</span></h3>
          <button class="cta-btn small read-aloud-btn" data-index="${index}">
            🔊 Read to me
          </button>
        </div>
        <p class="reading-text" id="reading-text-${index}">${wrapWords(p.text)}</p>
        <div class="reading-progress">
          <div class="reading-progress-bar" id="progress-${index}"></div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  function speakPassage(index, btn) {
    if (!synth) {
      showToast("This device can't read aloud, but you can still read along!");
      return;
    }

    const passage = passages[index];
    
    // If already speaking this passage, pause it
    if (activeSpeeches[index] && activeSpeeches[index].speaking) {
      pauseSpeech(index, btn);
      return;
    }

    // Cancel any existing speech
    synth.cancel();
    
    // Clear all active speeches
    Object.keys(activeSpeeches).forEach(key => {
      activeSpeeches[key] = null;
    });

    const utterance = new SpeechSynthesisUtterance(passage.text);
    utterance.lang = passage.lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const words = document.querySelectorAll(`#reading-text-${index} .reading-word`);
    let wordIndex = 0;
    let progressBar = document.getElementById(`progress-${index}`);

    // Reset all words
    words.forEach(w => w.classList.remove('speaking'));

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        words.forEach(w => w.classList.remove('speaking'));
        if (words[wordIndex]) {
          words[wordIndex].classList.add('speaking');
          // Update progress
          if (progressBar) {
            const progress = ((wordIndex + 1) / words.length) * 100;
            progressBar.style.width = progress + '%';
          }
        }
        wordIndex++;
      }
    };

    utterance.onend = () => {
      words.forEach(w => w.classList.remove('speaking'));
      if (progressBar) {
        progressBar.style.width = '100%';
      }
      btn.textContent = '🔊 Read to me';
      btn.classList.remove('playing');
      activeSpeeches[index] = null;
      Sound.win();
      showToast('📖 Finished reading! Great job!', true);
      
      // Reset progress after a moment
      setTimeout(() => {
        if (progressBar) {
          progressBar.style.width = '0%';
        }
      }, 1500);
    };

    utterance.onerror = () => {
      words.forEach(w => w.classList.remove('speaking'));
      btn.textContent = '🔊 Read to me';
      btn.classList.remove('playing');
      activeSpeeches[index] = null;
      showToast('⚠️ Something went wrong. Please try again.');
    };

    // Store the active speech
    activeSpeeches[index] = {
      utterance: utterance,
      speaking: true,
      words: words,
      wordIndex: wordIndex,
      progressBar: progressBar
    };

    btn.textContent = '⏸ Pause';
    btn.classList.add('playing');
    Sound.pop();
    synth.speak(utterance);
  }

  function pauseSpeech(index, btn) {
    const active = activeSpeeches[index];
    if (!active || !active.speaking) return;

    // Pause the speech
    synth.pause();
    active.speaking = false;
    btn.textContent = '▶️ Resume';
    btn.classList.remove('playing');
    btn.classList.add('paused');
    Sound.pop();
    showToast('⏸ Paused. Click "Resume" to continue.');
  }

  function resumeSpeech(index, btn) {
    const active = activeSpeeches[index];
    if (!active || active.speaking) return;

    // Resume the speech
    synth.resume();
    active.speaking = true;
    btn.textContent = '⏸ Pause';
    btn.classList.remove('paused');
    btn.classList.add('playing');
    Sound.pop();
  }

  function stopSpeech(index, btn) {
    const active = activeSpeeches[index];
    if (active) {
      synth.cancel();
      active.speaking = false;
      active.words.forEach(w => w.classList.remove('speaking'));
      if (active.progressBar) {
        active.progressBar.style.width = '0%';
      }
      activeSpeeches[index] = null;
    }
    btn.textContent = '🔊 Read to me';
    btn.classList.remove('playing', 'paused');
  }

  // Event listener for reading buttons
  list?.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-aloud-btn');
    if (!btn) return;
    
    const index = Number(btn.dataset.index);
    const active = activeSpeeches[index];
    
    // If speech is paused, resume it
    if (active && !active.speaking) {
      resumeSpeech(index, btn);
      return;
    }
    
    // If speech is playing, pause it
    if (active && active.speaking) {
      pauseSpeech(index, btn);
      return;
    }
    
    // Start new speech
    speakPassage(index, btn);
  });

  // Handle word clicks - jump to that word
  list?.addEventListener('click', (e) => {
    const word = e.target.closest('.reading-word');
    if (!word) return;
    
    const textElement = word.closest('.reading-text');
    if (!textElement) return;
    
    const card = textElement.closest('.reading-card');
    if (!card) return;
    
    const btn = card.querySelector('.read-aloud-btn');
    if (!btn) return;
    
    const index = Number(btn.dataset.index);
    const active = activeSpeeches[index];
    
    if (active && active.speaking) {
      // Jump to this word in the speech
      const wordIndex = Array.from(textElement.querySelectorAll('.reading-word')).indexOf(word);
      if (wordIndex !== -1) {
        // Cancel current speech and restart from this word
        synth.cancel();
        active.words.forEach(w => w.classList.remove('speaking'));
        
        // Create new utterance from this word
        const passage = passages[index];
        const remainingText = passage.text.split(' ').slice(wordIndex).join(' ');
        const utterance = new SpeechSynthesisUtterance(remainingText);
        utterance.lang = passage.lang;
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        
        let newWordIndex = 0;
        utterance.onboundary = (e) => {
          if (e.name === 'word') {
            active.words.forEach(w => w.classList.remove('speaking'));
            const targetIndex = wordIndex + newWordIndex;
            if (active.words[targetIndex]) {
              active.words[targetIndex].classList.add('speaking');
              if (active.progressBar) {
                const progress = ((targetIndex + 1) / active.words.length) * 100;
                active.progressBar.style.width = progress + '%';
              }
            }
            newWordIndex++;
          }
        };
        
        utterance.onend = () => {
          active.words.forEach(w => w.classList.remove('speaking'));
          if (active.progressBar) {
            active.progressBar.style.width = '100%';
          }
          btn.textContent = '🔊 Read to me';
          btn.classList.remove('playing');
          activeSpeeches[index] = null;
          Sound.win();
          showToast('📖 Finished reading! Great job!', true);
        };
        
        activeSpeeches[index] = {
          utterance: utterance,
          speaking: true,
          words: active.words,
          wordIndex: wordIndex,
          progressBar: active.progressBar
        };
        
        synth.speak(utterance);
        Sound.pop();
      }
    }
  });

  // Handle page visibility change - pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      Object.keys(activeSpeeches).forEach(key => {
        const active = activeSpeeches[key];
        if (active && active.speaking) {
          synth.pause();
          active.speaking = false;
          const btn = document.querySelector(`.read-aloud-btn[data-index="${key}"]`);
          if (btn) {
            btn.textContent = '▶️ Resume';
            btn.classList.remove('playing');
            btn.classList.add('paused');
          }
        }
      });
    }
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    synth.cancel();
  });

  renderList();
  
  // Show welcome message
  setTimeout(() => {
    showToast('📖 Click "Read to me" to start listening!', true);
  }, 500);
});