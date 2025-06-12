// Universal Navigation Active States
function setActiveNavigation() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Add active states to header navigation
    const headerLinks = document.querySelectorAll('.navbar-link');
    headerLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add active states to footer navigation
    const footerLinks = document.querySelectorAll('.footer-link-main');
    footerLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// CSS for active states (will be injected if not already present)
function injectActiveStateCSS() {
    const existingStyle = document.getElementById('navigation-active-styles');
    if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'navigation-active-styles';
        style.textContent = `
            /* Navigation Active States */
            .navbar-link.active,
            .footer-link-main.active {
                background: rgba(255, 255, 255, 0.2) !important;
                border-radius: 8px !important;
                padding: 8px 16px !important;
                margin: 0 4px !important;
                color: white !important;
                transition: all 0.3s ease !important;
            }
            
            .navbar-link.active:hover,
            .footer-link-main.active:hover {
                background: rgba(255, 255, 255, 0.3) !important;
                transform: translateY(-2px) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    injectActiveStateCSS();
    
    // Set active states after a brief delay to ensure header/footer are loaded
    setTimeout(() => {
        setActiveNavigation();
    }, 100);
    
    // Also set when header/footer finish loading (for async loading)
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        const observer = new MutationObserver(() => {
            setActiveNavigation();
        });
        observer.observe(headerContainer, { childList: true });
    }
    
    if (footerContainer) {
        const observer = new MutationObserver(() => {
            setActiveNavigation();
        });
        observer.observe(footerContainer, { childList: true });
    }
});

// Export for manual calling if needed
window.setActiveNavigation = setActiveNavigation; 