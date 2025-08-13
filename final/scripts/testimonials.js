document.addEventListener('DOMContentLoaded', async () => {
    const testimonialsListContainer = document.getElementById('testimonials-list');

    if (testimonialsListContainer) {
        try {
            // Fetch the data from the testimonials.json file using async/await
            // Note: Update this path if the file is in a different directory.
            const response = await fetch('data/testimonials.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const testimonials = await response.json();

            // Loop through the fetched data and create cards
            testimonials.forEach(testimonial => {
                // Create the main card div
                const card = document.createElement('div');
                card.className = 'testimonial-card';

                // Create the testimonial text paragraph
                const text = document.createElement('p');
                text.className = 'testimonial-text';
                text.textContent = `"${testimonial.text}"`;

                // Create a container for the footer content
                const footer = document.createElement('div');
                footer.className = 'testimonial-footer';

                // Create the author's name
                const author = document.createElement('h3');
                author.className = 'testimonial-author';
                author.textContent = testimonial.author;

                // Create the author's role and company details
                const details = document.createElement('p');
                details.className = 'testimonial-details';
                details.textContent = `${testimonial.role} at ${testimonial.company}`;

                // Create the rating container
                const ratingContainer = document.createElement('div');
                ratingContainer.className = 'testimonial-rating';
                
                // Loop to create 5 stars, filling based on the rating value
                for (let i = 0; i < 5; i++) {
                    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    star.setAttribute('class', 'star-icon');
                    star.setAttribute('viewBox', '0 0 24 24');
                    
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('fill-rule', 'evenodd');
                    path.setAttribute('d', 'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.241 1.025-.749 1.846-1.666 1.258L12 18.271l-4.224 2.81c-.917.608-2.152-.232-1.666-1.257l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z');
                    path.setAttribute('clip-rule', 'evenodd');

                    star.appendChild(path);

                    if (i >= testimonial.rating) {
                        // Unfilled stars are a slightly darker color
                        star.style.fill = '#e9ecef'; 
                    }
                    ratingContainer.appendChild(star);
                }

                // Create the badge for 'from'
                const fromBadge = document.createElement('span');
                fromBadge.className = 'testimonial-from';
                fromBadge.textContent = testimonial.from;


                // Append elements to the footer
                footer.appendChild(author);
                footer.appendChild(details);
                footer.appendChild(ratingContainer);

                // Append all parts to the card
                card.appendChild(fromBadge);
                card.appendChild(text);
                card.appendChild(footer);

                // Append the card to the main container
                testimonialsListContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching or processing testimonial data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load testimonial data. Please make sure the JSON file exists and a local web server is running.';
            errorMessage.style.color = 'red';
            testimonialsListContainer.appendChild(errorMessage);
        }
    }
});
