// chamber/scripts/directory.js

document.addEventListener('DOMContentLoaded', () => {
    const memberContainer = document.getElementById('member-container');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    let currentMembersData = []; // Store fetched data to avoid re-fetching on toggle

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
            memberContainer.innerHTML = '<p>Failed to load vendor information. Please try again later.</p>';
        }
    }

    // Function to display members based on current view mode
    function displayMembers(members) {
        memberContainer.innerHTML = ''; // Clear previous content

        const isGridView = memberContainer.classList.contains('grid-view');

        members.forEach(member => {
            if (isGridView) {
                // Create card for grid view
                const card = document.createElement('div');
                card.classList.add('member-card');

                const image = document.createElement('img');
                image.src = `images/${member.imagefilename}`;
                image.alt = `${member.name} logo`;
                image.loading = 'lazy';

                const info = document.createElement('div');
                info.classList.add('member-info');

                const name = document.createElement('h3');
                name.textContent = member.name;

                const address = document.createElement('p');
                address.innerHTML = `<strong>Address:</strong> ${member.address}`;

                const phone = document.createElement('p');
                phone.innerHTML = `<strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a>`;

                const category = document.createElement('p');
                category.innerHTML = `<strong>Category:</strong> ${member.category}`;

                const level = document.createElement('p');
                level.innerHTML = `<strong>Membership:</strong> ${member.membershiplevel}`;
                
                const description = document.createElement('p');
                description.innerHTML = `<strong>Description:</strong> ${member.description}`;

                const website = document.createElement('a');
                website.href = member.websiteurl;
                website.textContent = 'Visit Website';
                website.target = '_blank';
                website.rel = 'noopener noreferrer';

                info.appendChild(name);
                info.appendChild(address);
                info.appendChild(phone);
                info.appendChild(category);
                info.appendChild(level);
                info.appendChild(description);
                info.appendChild(website);

                card.appendChild(image);
                card.appendChild(info);
                memberContainer.appendChild(card);
            } else {
                // Create list item for list view (no images)
                const listItem = document.createElement('div');
                listItem.classList.add('member-list-item');

                const name = document.createElement('h3');
                name.textContent = member.name;

                const address = document.createElement('p');
                address.innerHTML = `<strong>Address:</strong> ${member.address}`;

                const phone = document.createElement('p');
                phone.innerHTML = `<strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a>`;

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
                memberContainer.appendChild(listItem);
            }
        });
    }

    // Event listeners for view toggle buttons
    gridViewBtn.addEventListener('click', () => {
        if (!memberContainer.classList.contains('grid-view')) {
            memberContainer.classList.add('grid-view');
            memberContainer.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            gridViewBtn.setAttribute('aria-pressed', true);
            listViewBtn.classList.remove('active');
            listViewBtn.setAttribute('aria-pressed', false);
            displayMembers(currentMembersData); // Re-render with grid view
        }
    });

    listViewBtn.addEventListener('click', () => {
        if (!memberContainer.classList.contains('list-view')) {
            memberContainer.classList.add('list-view');
            memberContainer.classList.remove('grid-view');
            gridViewBtn.classList.remove('active');
            gridViewBtn.setAttribute('aria-pressed', false);
            listViewBtn.classList.add('active');
            listViewBtn.setAttribute('aria-pressed', true);
            displayMembers(currentMembersData); // Re-render with list view
        }
    });

    // Initial load of data when the page loads
    getMembersData();
});