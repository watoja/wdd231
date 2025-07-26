// chamber/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');

    if (menuButton && primaryNav) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('open');
            primaryNav.setAttribute('aria-hidden', isExpanded); // Hide nav from screen readers when closed
        });

        // Close nav when a link is clicked (useful for single-page apps or after navigation)
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('open')) {
                    menuButton.setAttribute('aria-expanded', false);
                    primaryNav.classList.remove('open');
                    primaryNav.setAttribute('aria-hidden', true);
                }
            });
        });

        // Close nav if clicking outside of it (for larger click targets)
        document.addEventListener('click', (event) => {
            if (!primaryNav.contains(event.target) && !menuButton.contains(event.target) && primaryNav.classList.contains('open')) {
                menuButton.setAttribute('aria-expanded', false);
                primaryNav.classList.remove('open');
                primaryNav.setAttribute('aria-hidden', true);
            }
        });
    }

    // Dynamic copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamic last modified date
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();
    }
});