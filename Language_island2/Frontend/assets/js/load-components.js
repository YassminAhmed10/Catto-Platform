/* =========================================================
   LOAD-COMPONENTS.JS - Dynamically loads header and sidebar
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to load HTML component
    function loadComponent(elementId, filePath, callback) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load ' + filePath);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                if (callback) callback();
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    }

    // Load Header
    loadComponent('header-placeholder', 'header.html', function() {
        console.log('Header loaded successfully');
        
        // Re-initialize header JS after loading
        if (typeof initHeader === 'function') {
            initHeader();
        } else if (typeof window.initHeader === 'function') {
            window.initHeader();
        }
    });

    // Load Sidebar
    loadComponent('sidebar-placeholder', 'sidebar.html', function() {
        console.log('Sidebar loaded successfully');
    });

});