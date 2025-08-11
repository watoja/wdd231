// chamber/scripts/discover.js

// Function to calculate and display the visit message
function displayVisitMessage() {
    const visitMessageEl = document.getElementById('visit-message');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisitTimestamp');

    if (!lastVisit) {
        // First visit
        visitMessageEl.innerHTML = '<p><strong>Welcome!</strong> Let us know if you have any questions.</p>';
    } else {
        const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
        const daysAgo = Math.floor((now - lastVisit) / oneDay);

        if (daysAgo < 1) {
            // Less than a day
            visitMessageEl.innerHTML = '<p><strong>Back so soon!</strong> Awesome!</p>';
        } else if (daysAgo === 1) {
            // Exactly one day
            visitMessageEl.innerHTML = '<p>You last visited <strong>1 day ago</strong>.</p>';
        } else {
            // More than a day
            visitMessageEl.innerHTML = `<p>You last visited <strong>${daysAgo} days ago</strong>.</p>`;
        }
    }

    // Save the current timestamp for the next visit
    localStorage.setItem('lastVisitTimestamp', now);
}

// Function to fetch and display the points of interest
async function getPointsOfInterest() {
    const gallery = document.getElementById('photo-gallery');

    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const points = await response.json();

        points.forEach(point => {
            const card = document.createElement('div');
            card.classList.add('discover-card');

            const title = document.createElement('h2');
            title.textContent = point.name;

            const figure = document.createElement('figure');
            const image = document.createElement('img');
            image.src = `images/${point.imagefilename}`;
            image.alt = point.name;
            image.loading = 'lazy';
            figure.appendChild(image);

            const address = document.createElement('address');
            address.textContent = point.address;

            const description = document.createElement('p');
            description.textContent = point.description;

            const learnMore = document.createElement('a');
            learnMore.href = '#'; // Placeholder link
            learnMore.textContent = 'Learn More';
            learnMore.classList.add('button-secondary');

            card.appendChild(title);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(learnMore);
            
            gallery.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load points of interest:', error);
        gallery.innerHTML = '<p>Could not load gallery content. Please try again later.</p>';
    }
}

// Run functions on page load
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    getPointsOfInterest();
});