document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    // Toggle navigation menu visibility
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', mainNav.classList.contains('open'));
        });
    }

    // Wayfinding: Add 'active' class to current page link
    const currentPath = window.location.pathname.split('/').pop(); // Gets 'index.html', 'chamber/index.html'
    navLinks.forEach(link => {
        const linkPath = link.href.split('/').pop(); // Gets 'index.html', 'index.html' (for chamber)
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close menu when a link is clicked (for small screens)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && mainNav.classList.contains('open')) { // Adjust breakpoint as per your CSS
                mainNav.classList.remove('open');
                if (hamburgerBtn) {
                    hamburgerBtn.setAttribute('aria-expanded', false);
                }
            }
        });
    });

    // Close menu if window is resized to larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            if (hamburgerBtn) {
                hamburgerBtn.setAttribute('aria-expanded', false);
            }
        }
    });

    // --- Date Logic ---
    // Dynamically set the current year in the footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamically set the last modified date
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }

    // --- Course List and Filtering Logic ---
    const courses = [
        {
            "subject": "CSE",
            "number": 110,
            "title": "Introduction to Programming",
            "credits": 2,
            "completed": true
        },
        {
            "subject": "WDD",
            "number": 130,
            "title": "Web Fundamentals",
            "credits": 2,
            "completed": true
        },
        {
            "subject": "CSE",
            "number": 111,
            "title": "Programming with Functions",
            "credits": 2,
            "completed": true
        },
        {
            "subject": "WDD",
            "number": 231,
            "title": "Web Frontend Development I",
            "credits": 2,
            "completed": false
        },
        {
            "subject": "WDD",
            "number": 331,
            "title": "Web Frontend Development II",
            "credits": 2,
            "completed": false
        },
        {
            "subject": "CSE",
            "number": 210,
            "title": "Programming with Classes",
            "credits": 3,
            "completed": true
        },
        {
            "subject": "WDD",
            "number": 330,
            "title": "Web Backend Development",
            "credits": 3,
            "completed": false
        }
    ];

    const courseContainer = document.getElementById('course-cards-container');
    const filterAllBtn = document.getElementById('filter-all');
    const filterWddBtn = document.getElementById('filter-wdd');
    const filterCseBtn = document.getElementById('filter-cse');
    const totalCreditsSpan = document.getElementById('total-credits');

    function displayCourses(courseList) {
        if (!courseContainer) {
            console.error("Course container not found.");
            return;
        }
        courseContainer.innerHTML = ''; // Clear previous courses
        let totalCredits = 0;

        courseList.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('course-card');
            if (course.completed) {
                card.classList.add('completed');
            }

            const title = document.createElement('h3');
            title.textContent = `${course.subject} ${course.number}: ${course.title}`;

            // Add a tick mark if the course is completed
            if (course.completed) {
                const tickSpan = document.createElement('span');
                tickSpan.textContent = ' ✔️'; // Unicode checkmark
                tickSpan.classList.add('completed-tick'); // Add a class for potential styling
                title.appendChild(tickSpan);
            }

            const credits = document.createElement('p');
            credits.textContent = `Credits: ${course.credits}`;

            card.appendChild(title);
            card.appendChild(credits);
            courseContainer.appendChild(card);
        });

        // Calculate total credits using reduce function
        totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = totalCredits;
        }
    }

    function filterCourses(subject = 'all') {
        let filteredCourses;
        if (subject === 'all') {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(course => course.subject === subject.toUpperCase());
        }
        displayCourses(filteredCourses);

        // Update active button state
        if (filterAllBtn) filterAllBtn.classList.remove('active');
        if (filterWddBtn) filterWddBtn.classList.remove('active');
        if (filterCseBtn) filterCseBtn.classList.remove('active');

        if (subject === 'all' && filterAllBtn) {
            filterAllBtn.classList.add('active');
        } else if (subject === 'wdd' && filterWddBtn) {
            filterWddBtn.classList.add('active');
        } else if (subject === 'cse' && filterCseBtn) {
            filterCseBtn.classList.add('active');
        }
    }

    // Initial display of all courses, ensuring elements exist
    if (courseContainer && filterAllBtn && filterWddBtn && filterCseBtn && totalCreditsSpan) {
        filterCourses('all');

        // Event listeners for filter buttons
        filterAllBtn.addEventListener('click', () => filterCourses('all'));
        filterWddBtn.addEventListener('click', () => filterCourses('wdd'));
        filterCseBtn.addEventListener('click', () => filterCourses('cse'));
    } else {
        console.error("One or more course filter/container elements not found. Course filtering may not work.");
    }
});
