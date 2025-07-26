document.addEventListener('DOMContentLoaded', () => {
    const membersDisplay = document.getElementById('members-display');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modification date in footer
    document.getElementById('lastModified').textContent = document.lastModified;

    // Toggle mobile navigation
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Optional: Add ARIA attributes for accessibility
        const isExpanded = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close nav when a link is clicked (for single-page nav or after navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    });

    // Store fetched data to avoid re-fetching on toggle
    let currentMembersData = []; 

    // Function to fetch members data
    async function getMembersData() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            currentMembersData = await response.json(); // Store the fetched data
            displayMembers(currentMembersData); // Display members initially
        } catch (error) {
            console.error('Error fetching members data:', error);
            membersDisplay.innerHTML = '<p>Failed to load vendor information. Please try again later.</p>';
        }
    }

    // Function to display members based on current view mode
    function displayMembers(members) {
        membersDisplay.innerHTML = ''; // Clear previous content

        // Check current view mode based on class on the display section
        const isGridView = membersDisplay.classList.contains('grid-view');

        members.forEach(member => {
            if (isGridView) {
                // Create card for grid view
                const card = document.createElement('div');
                card.classList.add('member-card');

                const image = document.createElement('img');
                image.src = `images/${member.imagefilename}`;
                image.alt = `${member.name} logo`;
                image.loading = 'lazy'; // Lazy load images for performance

                const info = document.createElement('div');
                info.classList.add('member-info');

                const name = document.createElement('h3');
                name.textContent = member.name;

                const address = document.createElement('p');
                address.innerHTML = `<strong>Address:</strong> ${member.address}`;

                const phone = document.createElement('p');
                phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

                const category = document.createElement('p');
                category.innerHTML = `<strong>Category:</strong> ${member.category}`;

                const level = document.createElement('p');
                level.innerHTML = `<strong>Membership:</strong> ${member.membershiplevel}`;
                
                const description = document.createElement('p');
                description.innerHTML = `<strong>Description:</strong> ${member.description}`;

                const website = document.createElement('a');
                website.href = member.websiteurl;
                website.textContent = 'Visit Website';
                website.target = '_blank'; // Open in new tab
                website.rel = 'noopener noreferrer'; // Security best practice

                info.appendChild(name);
                info.appendChild(address);
                info.appendChild(phone);
                info.appendChild(category);
                info.appendChild(level);
                info.appendChild(description);
                info.appendChild(website);


                card.appendChild(image);
                card.appendChild(info);
                membersDisplay.appendChild(card);
            } else {
                // Create list item for list view (no images)
                const listItem = document.createElement('div');
                listItem.classList.add('member-list-item');

                const name = document.createElement('h3');
                name.textContent = member.name;

                const address = document.createElement('p');
                address.innerHTML = `<strong>Address:</strong> ${member.address}`;

                const phone = document.createElement('p');
                phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

                const category = document.createElement('p');
                category.innerHTML = `<strong>Category:</strong> ${member.category}`;

                const level = document.createElement('p');
                level.innerHTML = `<strong>Membership:</strong> ${member.membershiplevel}`;

                const website = document.createElement('a');
                website.href = member.websiteurl;
                website.textContent = 'Visit Website';
                website.target = '_blank';
                website.rel = 'noopener noreferrer';

                listItem.appendChild(name);
                listItem.appendChild(address);
                listItem.appendChild(phone);
                listItem.appendChild(category);
                listItem.appendChild(level);
                listItem.appendChild(website);
                membersDisplay.appendChild(listItem);
            }
        });
    }

    // Event listeners for view toggle buttons
    gridViewBtn.addEventListener('click', () => {
        if (!membersDisplay.classList.contains('grid-view')) {
            membersDisplay.classList.add('grid-view');
            membersDisplay.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            displayMembers(currentMembersData); // Re-render with grid view
        }
    });

    listViewBtn.addEventListener('click', () => {
        if (!membersDisplay.classList.contains('list-view')) {
            membersDisplay.classList.add('list-view');
            membersDisplay.classList.remove('grid-view');
            gridViewBtn.classList.remove('active');
            listViewBtn.classList.add('active');
            displayMembers(currentMembersData); // Re-render with list view
        }
    });

    // Initial load of data when the page loads
    getMembersData();
});