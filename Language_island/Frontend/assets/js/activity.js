/* =========================================================
   ACTIVITY.JS - Activity Tracking System
   ========================================================= */

console.log('Activity system initializing...');

const Activity = {
    // Cache for completed activities
    _completedCache: {},
    
    // Initialize the system
    init: function() {
        console.log('Activity system initialized');
        this.loadCompletedFromStorage();
        this.setupStarDisplay();
    },
    
    // Load completed activities from session storage
    loadCompletedFromStorage: function() {
        try {
            const saved = sessionStorage.getItem('completedActivities');
            if (saved) {
                this._completedCache = JSON.parse(saved);
                console.log('Loaded completed activities:', this._completedCache);
            }
        } catch(e) {
            this._completedCache = {};
        }
    },
    
    // Save completed activities to session storage
    saveCompletedToStorage: function() {
        try {
            sessionStorage.setItem('completedActivities', JSON.stringify(this._completedCache));
        } catch(e) {}
    },
    
    // Check if an activity is completed
    isCompleted: function(type, id) {
        const key = `${type}_${id}`;
        return this._completedCache[key] === true;
    },
    
    // Mark activity as completed
    markCompleted: function(type, id) {
        const key = `${type}_${id}`;
        this._completedCache[key] = true;
        this.saveCompletedToStorage();
        console.log(` Marked ${type}:${id} as completed`);
    },
    
    // Complete an activity and earn stars
    completeActivity: function(type, id, stars = 5) {
        console.log(`Completing activity: ${type}:${id} for ${stars} stars`);
        
        // Check if already completed in this session
        if (this.isCompleted(type, id)) {
            console.log('Already completed in this session');
            return Promise.resolve({
                success: false,
                message: 'Already completed',
                alreadyCompleted: true
            });
        }
        
        return fetch('../Backend/save_activity.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                activity_type: type,
                activity_id: id,
                stars_earned: stars
            })
        })
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('Activity response:', data);
            
            if (data.success) {
                // Mark as completed in cache
                this.markCompleted(type, id);
                
                // Update UI
                this.updateStarDisplay(data.total_stars);
                
                // Show celebration
                this.showCelebration(stars, data.total_stars);
                
                // Play sound
                if (typeof Sound !== 'undefined' && Sound.win) {
                    Sound.win();
                }
            }
            
            return data;
        })
        .catch(err => {
            console.error('Activity error:', err);
            return {
                success: false,
                message: 'Network error',
                error: err
            };
        });
    },
    
    // Update star display in header and everywhere
    updateStarDisplay: function(totalStars) {
        console.log('Updating stars to:', totalStars);
        
        // Update header
        const headerStars = document.getElementById('headerStars');
        if (headerStars) {
            headerStars.textContent = totalStars || 0;
            console.log('Header stars updated to:', headerStars.textContent);
        }
        
        // Show the stars pill
        const starsPill = document.querySelector('.stars-display');
        if (starsPill) starsPill.style.display = 'flex';
        
        // Update all star displays on page
        document.querySelectorAll('.star-count, .total-stars, .stars-earned, .stars-display .stars-count').forEach(el => {
            if (el && el.id !== 'headerStars') {
                el.textContent = totalStars || 0;
            }
        });
        
        // Store in localStorage for profile
        try {
            let userData = JSON.parse(localStorage.getItem('languageIslandUser')) || {};
            userData.total_stars = totalStars;
            localStorage.setItem('languageIslandUser', JSON.stringify(userData));
            console.log('Saved total_stars to localStorage:', totalStars);
        } catch(e) {}
        
        // Dispatch event for other pages
        try {
            document.dispatchEvent(new CustomEvent('starsUpdated', { 
                detail: { totalStars: totalStars } 
            }));
            console.log('Dispatched starsUpdated event');
        } catch(e) {}
    },
    
    // Show celebration modal
    showCelebration: function(starsEarned, totalStars) {
        console.log('Showing celebration for', starsEarned, 'stars');
        
        // Remove existing modal
        let modal = document.getElementById('starEarnedModal');
        if (modal) modal.remove();
        
        modal = document.createElement('div');
        modal.id = 'starEarnedModal';
        modal.className = 'modal-backdrop star-earned-modal';
        modal.innerHTML = `
            <div class="modal-card star-earned-card">
                <div class="star-burst">🌟</div>
                <h2>+${starsEarned} Stars!</h2>
                <p>Great job! Keep up the amazing work! </p>
                <div class="star-count-display">
                    <span>⭐ Total Stars: <strong id="starEarnedTotal">${totalStars || 0}</strong></span>
                </div>
                <button class="cta-btn" id="starEarnedCloseBtn">Awesome! </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('open'), 100);
        
        // Close button
        modal.querySelector('#starEarnedCloseBtn').addEventListener('click', function() {
            modal.classList.remove('open');
            setTimeout(() => modal.remove(), 300);
        });
        
        // Click backdrop to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Auto close after 4 seconds
        setTimeout(() => {
            if (modal && modal.classList.contains('open')) {
                modal.classList.remove('open');
                setTimeout(() => modal.remove(), 300);
            }
        }, 4000);
        
        // Trigger floating stars
        this.triggerStarAnimation();
    },
    
    // Trigger star animation
    triggerStarAnimation: function() {
        const stars = ['⭐', '🌟', '✨'];
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.textContent = stars[Math.floor(Math.random() * stars.length)];
                el.style.cssText = `
                    position: fixed;
                    top: ${20 + Math.random() * 40}%;
                    left: ${10 + Math.random() * 80}%;
                    font-size: ${20 + Math.random() * 40}px;
                    pointer-events: none;
                    z-index: 10001;
                    animation: starFloat 1.8s ease-out forwards;
                `;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
            }, i * 150);
        }
    },
    
    // Setup star display
    setupStarDisplay: function() {
        // Add CSS if not exists
        if (!document.getElementById('activity-styles')) {
            const style = document.createElement('style');
            style.id = 'activity-styles';
            style.textContent = `
                @keyframes starFloat {
                    0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-200px) scale(1.5) rotate(360deg); opacity: 0; }
                }
                .star-earned-modal .modal-card.star-earned-card {
                    max-width: 380px;
                    padding: 40px 30px 30px;
                    text-align: center;
                    background: linear-gradient(135deg, #ffffff, #FFF8E7);
                    border: 3px solid #FFD23F;
                    border-radius: 28px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                    animation: starPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                @keyframes starPop {
                    0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                .star-earned-card .star-burst {
                    font-size: 72px;
                    display: block;
                    margin-bottom: 8px;
                    animation: starSpin 2s ease-in-out infinite;
                }
                @keyframes starSpin {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(20deg); }
                }
                .star-earned-card h2 {
                    font-family: var(--font-display);
                    font-size: 24px;
                    color: #2E2657;
                    margin: 0 0 4px;
                }
                .star-earned-card p {
                    color: #8C87A8;
                    font-weight: 600;
                    font-size: 15px;
                    margin: 0 0 16px;
                }
                .star-earned-card .star-count-display {
                    background: #FFF5E0;
                    padding: 10px 20px;
                    border-radius: 999px;
                    display: inline-block;
                    margin-bottom: 20px;
                    font-family: var(--font-display);
                    font-size: 16px;
                    color: #2E2657;
                    border: 2px solid #FFD23F;
                }
                .star-earned-card .star-count-display strong {
                    color: #E5563F;
                    font-size: 20px;
                }
                .star-earned-card .cta-btn {
                    background: #FF6B59;
                    color: #fff;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 999px;
                    font-family: var(--font-display);
                    font-weight: 700;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 5px 0 #C94E4E;
                    transition: all 0.15s ease;
                }
                .star-earned-card .cta-btn:hover {
                    transform: translateY(-2px);
                }
                .star-earned-card .cta-btn:active {
                    transform: translateY(3px);
                    box-shadow: 0 2px 0 #C94E4E;
                }
                @media (max-width: 480px) {
                    .star-earned-modal .modal-card.star-earned-card {
                        max-width: 320px;
                        padding: 30px 20px 24px;
                    }
                    .star-earned-card .star-burst { font-size: 52px; }
                    .star-earned-card h2 { font-size: 20px; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    Activity.init();
    console.log('Activity.js loaded successfully!');
});

// Expose globally
window.Activity = Activity;