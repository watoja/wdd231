document.addEventListener('DOMContentLoaded', async () => {
    // --- Responsive Menu Toggle ---
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- Local Storage Demo ---
    const partnersGrid = document.getElementById('partners-grid');
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
        console.log(`Welcome back! Your last visit was on: ${new Date(lastVisit).toLocaleString()}`);
    } else {
        console.log('This is your first visit!');
    }
    localStorage.setItem('lastVisit', new Date().toISOString());

    // --- Dynamic Content Loading ---

    
    const partners = [
        {
            "name": "Innovate Solutions Inc.",
            "description": "A leading technology firm specializing in cloud computing and data analytics.",
            "logo": "https://innovatesolution.com/",
            "industry": "Technology"
        },
        {
            "name": "Global HR Group",
            "description": "Provides human resources consulting and talent management services worldwide.",
            "logo": "https://www.linkedin.com/company/the-global-hr-group/",
            "industry": "Human Resources"
        },
        {
            "name": "Creative Agency Co.",
            "description": "A full-service creative agency that partners with top freelance talent.",
            "logo": "https://thecreativeagencyco.com/",
            "industry": "Marketing"
        },
        {
            "name": "StartUp Hub Uganda",
            "description": "An incubator and networking space for new businesses and entrepreneurs in Kampala.",
            "logo": "https://startup.ug/",
            "industry": "Incubator"
        },
        {
            "name": "Eco-Friendly Tech",
            "description": "Dedicated to creating sustainable technology solutions for a greener planet.",
            "logo": "images/hero.webp",
            "industry": "Technology"
        },
        {
            "name": "Financial Futures",
            "description": "Helping businesses manage their finances with innovative software and expertise.",
            "logo": "images/hero.webp",
            "industry": "Finance"
        },
        {
            "name": "Health Connect",
            "description": "A health tech company improving patient care and clinic management.",
            "logo": "images/hero.webp",
            "industry": "Healthcare"
        },
        {
            "name": "Logistics Pro",
            "description": "Global logistics and supply chain management for small to large enterprises.",
            "logo": "images/hero.webp",
            "industry": "Logistics"
        },
        {
            "name": "Design Studio X",
            "description": "Award-winning design agency focused on branding and user experience.",
            "logo": "images/desktop.web",
            "industry": "Marketing"
        },
        {
            "name": "Code Masters",
            "description": "A software development firm specializing in complex web and mobile applications.",
            "logo": "images/wl.webp",
            "industry": "Technology"
        },
        {
            "name": "Food Fusion Co.",
            "description": "Bringing unique and innovative food products to the market.",
            "logo": "https://placehold.co/128x128/6610f2/FFFFFF?text=FFC",
            "industry": "Food & Beverage"
        },
        {
            "name": "AgriGrow Solutions",
            "description": "Using technology to improve agricultural efficiency and yield.",
            "logo": "https://placehold.co/128x128/20c997/FFFFFF?text=AGS",
            "industry": "Agriculture"
        },
        {
            "name": "EduTech Pioneers",
            "description": "Developing cutting-edge educational software and learning platforms.",
            "logo": "https://placehold.co/128x128/6f42c1/FFFFFF?text=ETP",
            "industry": "Education"
        },
        {
            "name": "Future Mobility",
            "description": "Designing and building the next generation of electric vehicles.",
            "logo": "https://placehold.co/128x128/ffc107/1c2b59?text=FM",
            "industry": "Automotive"
        },
        {
            "name": "Secure Cloud Services",
            "description": "Providing top-tier cybersecurity and secure cloud hosting solutions.",
            "logo": "https://placehold.co/128x128/e9ecef/212529?text=SCS",
            "industry": "Technology"
        },
        {
            "name": "Retail Revolution",
            "description": "Modernizing retail operations with intelligent point-of-sale systems.",
            "logo": "https://placehold.co/128x128/17a2b8/FFFFFF?text=RR",
            "industry": "Retail"
        }
    ];

    try {
        // Clear the loading message
        partnersGrid.innerHTML = '';

        // Loop through each partner in the data array using forEach()
        partners.forEach((partner, index) => {
            // Use a template literal to create the card HTML string
            const cardHTML = `
                <div class="partner-card ${index === 0 ? 'featured-card' : ''}" data-index="${index}">
                    <img class="partner-logo" src="${partner.logo}" alt="${partner.name} logo" onerror="this.onerror=null; this.src='https://placehold.co/128x128/e5e7eb/6b7280?text=Logo';">
                    <h2 class="partner-name">${partner.name}</h2>
                    <p class="partner-description">${partner.description}</p>
                    <p class="partner-industry">Industry: ${partner.industry}</p>
                </div>
            `;
            // Insert the new card into the grid
            partnersGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
        
    } catch (error) {
        console.error('Failed to load partnership data:', error);
        partnersGrid.innerHTML = `<p class="error-message">Failed to load partnership data. Please check the data source and format.</p>`;
    }


    // --- Modal Dialog Functionality ---
    const modal = document.getElementById('partner-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const modalBody = document.getElementById('modal-body');

    // Open modal when a card is clicked
    partnersGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.partner-card');
        if (card) {
            const index = card.dataset.index;
            const partner = partners[index];
            if (partner) {
                // Use a template literal to populate modal content
                modalBody.innerHTML = `
                    <div class="modal-content-inner">
                        <img class="modal-logo" src="${partner.logo}" alt="${partner.name} logo">
                        <h3>${partner.name}</h3>
                        <p><strong>Industry:</strong> ${partner.industry}</p>
                        <p>${partner.description}</p>
                    </div>
                `;
                modal.style.display = 'block';
            }
        }
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Partners Grid Functionality (if you want to add partners dynamically) ---
    // If you have a separate JSON file or a partners data array, you can
    // uncomment and adapt this section.
    // const partnersGrid = document.getElementById('partners-grid');
    // if (partnersGrid) {
    //     // Example: Dynamically create partner cards and append them
    // }
    
    // --- Partnership Form Handler ---
    const partnershipForm = document.getElementById('partnership-form');
    const statusModal = document.getElementById('status-modal');
    const statusModalBody = document.getElementById('status-modal-body');

    // Check if the form and modal elements exist on the page
    if (partnershipForm && statusModal && statusModalBody) {
        partnershipForm.addEventListener('submit', (event) => {
            // Prevent the default form submission which reloads the page
            event.preventDefault();

            // Clear any previous messages in the modal body
            statusModalBody.innerHTML = '';

            // Create and display the success message
            const successMessage = document.createElement('h3');
            successMessage.textContent = 'Thank You!';
            
            const messageText = document.createElement('p');
            messageText.textContent = 'Your partnership request has been submitted successfully. We will be in touch shortly.';

            // Append the messages to the modal body
            statusModalBody.appendChild(successMessage);
            statusModalBody.appendChild(messageText);

            // Open the status modal
            statusModal.style.display = 'block';
            
            // Reset the form fields after a successful submission
            partnershipForm.reset();
        });
    }

    // --- Modal Close Button Logic ---
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target modal ID from the data-modal-target attribute
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            // Hide the modal
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // --- Close modal when clicking outside of it ---
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

});
