// This single event listener waits for the entire page to load before running the code.
document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Hero Image Loading ---
    // Select the div that will act as the container for the hero image.
    const heroImageContainer = document.querySelector('.hero-image-placeholder');

    // Check if the container exists to prevent errors.
    if (heroImageContainer) {
        // Create a new image element in memory.
        const heroImage = document.createElement('img');
        
        // Set the 'src' attribute to the path of your image file.
        heroImage.src = "images/hero.webp";
        // Set the 'alt' attribute for accessibility.
        heroImage.alt = "The ultimate job search";
        
        // Append the newly created image element to the container in the HTML.
        heroImageContainer.appendChild(heroImage);
    }

    // --- Responsive Menu Toggle ---
    // Get the hamburger menu button and the navigation list.
    const hamburgerBtn = document.getElementById('menu-button');
    const navList = document.getElementById('primary-nav');

    // Check if both elements exist.
    if (hamburgerBtn && navList) {
        // Add a click event listener to toggle the menu.
        hamburgerBtn.addEventListener('click', () => {
            // Check the current state of the 'aria-expanded' attribute.
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle the attribute value to reflect the new state.
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the 'is-open' CSS class on the navigation list.
            // Your CSS should handle the visibility and animation of the menu based on this class.
            navList.classList.toggle('open');
        });
    }

    // --- Dynamic Footer Content ---
    // Get the span elements for the current year and last modified date.
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedSpan = document.getElementById('lastModified');

    // Check if the elements exist and update their content.
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});
