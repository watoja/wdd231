document.addEventListener('DOMContentLoaded', async () => {
    const employersListContainer = document.getElementById('employers-list');

    if (employersListContainer) {
        try {
            // Fetch the data from the employers.json file using async/await
            const response = await fetch('data/employers.json');
            
            if (!response.ok) {
                // If the response is not OK, throw an error with the status
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const employers = await response.json();

            // Loop through the fetched data and create cards for the new design
            employers.forEach(employer => {
                // Create the main card div
                const employerCard = document.createElement('div');
                employerCard.className = 'employer-card';

                // Create the image container
                const imageContainer = document.createElement('div');
                imageContainer.className = 'company-image-container';

                // Add verified badge inside the image container if applicable
                if (employer.verified) {
                    const verifiedBadge = document.createElement('div');
                    verifiedBadge.className = 'verified-badge';
                    verifiedBadge.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.655 3.397 1.549a4.49 4.49 0 0 1 3.498 1.583 4.491 4.491 0 0 1 1.583 3.498A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.583 3.498 4.49 4.49 0 0 1-3.498 1.583A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.583A4.491 4.491 0 0 1 3.75 12a4.49 4.49 0 0 1 1.549-3.397 4.49 4.49 0 0 1 1.583-3.498ZM10.5 14.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Zm.75-5.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V9Z" clip-rule="evenodd" />
                        </svg>
                    `;
                    imageContainer.appendChild(verifiedBadge);
                }

                // Create the content container for text
                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                // Create the header section for the company name and rating
                const companyHeader = document.createElement('div');
                companyHeader.className = 'company-header';

                const companyName = document.createElement('h2');
                companyName.className = 'company-name';
                companyName.textContent = employer.companyName;

                const ratingDiv = document.createElement('div');
                ratingDiv.className = 'rating';
                ratingDiv.innerHTML = `
                    <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.241 1.025-.749 1.846-1.666 1.258L12 18.271l-4.224 2.81c-.917.608-2.152-.232-1.666-1.257l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                    <span>${employer.rating}</span>
                `;

                // Append company name and rating to the header
                companyHeader.appendChild(companyName);
                companyHeader.appendChild(ratingDiv);

                // Create info section for industry and location
                const companyInfo = document.createElement('div');
                companyInfo.className = 'company-info';
                companyInfo.innerHTML = `
                    <p><span>Industry:</span> ${employer.industry}</p>
                    <p><span>Location:</span> ${employer.location}</p>
                `;

                // Create bio section
                const companyBio = document.createElement('p');
                companyBio.className = 'company-bio';
                companyBio.textContent = employer.bio;

                // Append elements to the card content
                cardContent.appendChild(companyHeader);
                cardContent.appendChild(companyInfo);
                cardContent.appendChild(companyBio);

                // Append image container and card content to the main card
                employerCard.appendChild(imageContainer);
                employerCard.appendChild(cardContent);

                // Append the card to the container
                employersListContainer.appendChild(employerCard);
            });
        } catch (error) {
            console.error('Error fetching or processing employer data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load employer data. Please make sure the JSON file exists and a local web server is running.';
            errorMessage.style.color = 'red';
            employersListContainer.appendChild(errorMessage);
        }
    }
});
