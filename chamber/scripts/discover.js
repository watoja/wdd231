/**
 * discover.js
 * This script handles all dynamic functionality for the discover.html page,
 * including a personalized message based on the user's last visit and
 * generating a photo gallery from a local JSON data source.
 */

// Function to handle the visit message logic and display it in the sidebar.
// It uses localStorage to track the last time the user visited the page.
function displayVisitMessage() {
    // Get the current date and time
    const now = new Date();

    // Select the HTML element where the message will be displayed
    const messageElement = document.getElementById('visit-message');

    // Retrieve the last visit timestamp from the browser's local storage
    const lastVisit = localStorage.getItem('lastVisit');

    // Check if it's the user's first visit to the page
    if (!lastVisit) {
        // If no last visit is found, display a welcome message for new visitors
        messageElement.innerHTML = `
            <p><strong>Welcome!</strong></p>
            <p>We're excited to have you on our discover page for the first time. Enjoy exploring!</p>
        `;
    } else {
        // If a last visit exists, calculate the time difference
        const lastVisitDate = new Date(parseInt(lastVisit, 10));
        const timeDifference = now.getTime() - lastVisitDate.getTime();

        // Convert the time difference from milliseconds to days
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Display a message based on the time since the last visit
        if (daysDifference < 1) {
            // If less than one day has passed
            messageElement.innerHTML = `
                <p><strong>Welcome Back!</strong></p>
                <p>It looks like you were just here. We hope you find what you're looking for!</p>
            `;
        } else if (daysDifference === 1) {
            // If exactly one day has passed
            messageElement.innerHTML = `
                <p><strong>You last visited 1 day ago.</strong></p>
                <p>A lot can change in a day! Check out our latest updates.</p>
            `;
        } else {
            // If more than one day has passed
            messageElement.innerHTML = `
                <p><strong>It's been ${daysDifference} days since your last visit.</strong></p>
                <p>We've missed you! Take a look at all the new things we have to offer.</p>
            `;
        }
    }

    // After displaying the message, update the last visit date to the current time
    // This ensures the next time the user visits, the message is accurate.
    localStorage.setItem('lastVisit', now.getTime().toString());
}

// Function to dynamically generate the photo gallery from a JSON data source.
// It creates a card for each item in the data and appends it to the gallery.
function generateGallery() {
    // Select the section where the gallery cards will be placed
    const gallery = document.getElementById('photo-gallery');

    // The JSON data is embedded directly in the script for simplicity.
    const placesData = [
        {
    "name": "Murchison Falls National Park",
    "address": "Northwestern Uganda",
    "imagefilename": "murchison.webp",
    "description": "Uganda's largest and oldest conservation area, home to spectacular waterfalls and a wide variety of wildlife including lions, elephants, and giraffes.",
    "link": "https://www.ugandawildlife.org/discover/parks/murchison-falls-national-park"
  },
  {
    "name": "Bwindi Impenetrable National Park",
    "address": "Southwestern Uganda",
    "imagefilename": "bwindi.webp",
    "description": "A UNESCO World Heritage site famous for its population of endangered mountain gorillas and its diverse rainforest ecosystem.",
    "link": "https://ugandawildlife.org/national-parks/bwindi-impenetrable-national-park/"
  },
  {
    "name": "Kasubi Tombs",
    "address": "Kasubi, Kampala",
    "imagefilename": "kasubi.webp",
    "description": "The burial grounds of four Buganda Kings and a UNESCO World Heritage site, representing a unique example of traditional African architecture.",
    "link": "https://www.tripadvisor.com/Attraction_Review-g293841-d317589-Reviews-Kasubi_Tombs-Kampala_Central_Region.html"
  },
  {
    "name": "Source of the Nile",
    "address": "Jinja, Uganda",
    "imagefilename": "nile.webp",
    "description": "The exact point where the world's longest river, the River Nile, begins its journey from Lake Victoria. A historical and scenic landmark.",
    "link": "https://www.ugandasafaristours.com/blog/the-source-of-the-nile.html"
  },
  {
    "name": "Kibale National Park",
    "address": "Western Uganda",
    "imagefilename": "kibale.webp",
    "description": "Renowned as the 'Primate Capital of the World,' it offers the best chimpanzee tracking experiences and is home to 13 other primate species.",
    "link": "https://www.ugandawildlife.org/discover/parks/kibale-national-park"
  },
  {
    "name": "Nakasero Market",
    "address": "Kampala, Uganda",
    "imagefilename": "kampala.webp",
    "description": "A bustling and chaotic hub of commerce, offering everything from fresh produce to crafts and electronics. The heart of the city's trade.",
    "link": "https://en.wikipedia.org/wiki/Nakasero_Market"
  },
  {
    "name": "Queen Elizabeth National Park",
    "address": "Western Uganda",
    "imagefilename": "eliza.webp",
    "description": "Known for its stunning landscapes, tree-climbing lions, and boat cruises on the Kazinga Channel, offering views of hippos and crocodiles.",
    "link": "https://www.ugandawildlife.org/discover/parks/queen-elizabeth-national-park"
  },
  {
    "name": "Uganda Museum",
    "address": "Kampala, Uganda",
    "imagefilename": "museum.webp",
    "description": "The oldest museum in East Africa, showcasing Uganda's rich cultural heritage, history, and natural history through a variety of exhibits.",
    "link": "https://ugandamuseums.ug/"
  }
    ];

    // Iterate through each item in the data array
    placesData.forEach(item => {
        // Create the main card container for the place
        const card = document.createElement('div');
        card.className = 'place-card';

        // Create the image element with lazy loading enabled
        const img = document.createElement('img');
        img.src = `images/${item.imagefilename}`; // Sets the image source
        img.alt = `Image of ${item.name}`; // Provides alt text for accessibility
        img.loading = 'lazy'; // Enables lazy loading for performance

        // Create a container for the card's text content
        const content = document.createElement('div');
        content.className = 'card-content';

        // Create and set the title of the place
        const title = document.createElement('h3');
        title.textContent = item.name;

        // Create and set the description
        const description = document.createElement('p');
        description.textContent = item.description;

        // Create the "Learn More" link
        const link = document.createElement('a');
        link.href = item.link; // The URL from the JSON data
        link.textContent = "Learn More";
        link.target = "_blank"; // Opens the link in a new tab
        link.rel = "noopener noreferrer"; // Security best practice

        // Assemble the card content
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(link);

        // Append the image and content to the main card container
        card.appendChild(img);
        card.appendChild(content);

        // Append the complete card to the photo gallery section
        gallery.appendChild(card);
    });
}

// Attach event listeners to ensure the scripts run only after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    generateGallery();
});
