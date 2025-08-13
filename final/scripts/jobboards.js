document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Content Loading for Job Boards ---
    const jobboards = [
        {
            "title": "Freelance Web Developer",
            "company": "Innovate Solutions Inc.",
            "location": "Remote",
            "description": "Develop and maintain responsive websites for various client projects. Requires expertise in HTML, CSS, JavaScript, and React.",
            "type": "Contract",
            "link": "https://www.linkedin.com/jobs/view/4282207512/?alternateChannel=search&eBP=NOT_ELIGIBLE_FOR_CHARGING&refId=jCaOPhnpTmiFDPfDYGJYtg%3D%3D&trackingId=RPYUPDHT0OdmHjRiPRoEnA%3D%3D"
        },
        {
            "title": "Junior Graphic Designer",
            "company": "Creative Agency Co.",
            "location": "Kampala, Uganda",
            "description": "Assist the senior design team in creating digital and print materials. Proficiency in Adobe Creative Suite is a must.",
            "type": "Full-Time",
            "link": "https://www.linkedin.com/jobs/view/4283304925/?alternateChannel=search&eBP=NOT_ELIGIBLE_FOR_CHARGING&refId=d0G5lAogGEpiJa6%2FoVqIWA%3D%3D&trackingId=%2BMpd7MobSZKONXkDEJK3tw%3D%3D"
        },
        {
            "title": "IT Support Specialist",
            "company": "Global HR Group",
            "location": "Nairobi, Kenya",
            "description": "Provide technical support to employees and manage network infrastructure. Experience with Windows and Linux is preferred.",
            "type": "Full-Time",
            "link": "https://www.linkedin.com/jobs/view/4270715973/?alternateChannel=search&eBP=NOT_ELIGIBLE_FOR_CHARGING&refId=YdVWVXVArdU5yrtegUBsVQ%3D%3D&trackingId=oF5MxGIUklKyZHP0%2FuUb6A%3D%3D"
        },
        {
            "title": "Social Media Manager",
            "company": "StartUp Hub Uganda",
            "location": "Kampala, Uganda",
            "description": "Manage social media campaigns, create content, and engage with the community to increase brand visibility.",
            "type": "Part-Time",
            "link": "https://www.linkedin.com/jobs/view/4283163030/?alternateChannel=search&eBP=NOT_ELIGIBLE_FOR_CHARGING&refId=E0nauFlWM%2FlaI5j49Rbj6g%3D%3D&trackingId=Mx%2B0lWf5DmOU%2Fr906rNI1w%3D%3D"
        },
        {
            "title": "Content Writer",
            "company": "Innovate Solutions Inc.",
            "location": "Remote",
            "description": "Write engaging articles, blog posts, and website copy. Must have excellent command of the English language and a strong portfolio.",
            "type": "Contract",
            "link": "https://www.linkedin.com/jobs/search/?currentJobId=4267174845&keywords=content%20writer&origin=SWITCH_SEARCH_VERTICAL "
        },
        {
            "title": "Senior UX/UI Designer",
            "company": "Creative Agency Co.",
            "location": "Remote",
            "description": "Lead the design process for new products, from wireframes to final mockups. Requires a deep understanding of user experience principles.",
            "type": "Full-Time",
            "link": "https://www.linkedin.com/jobs/search/?currentJobId=4262277310&geoId=106943612&keywords=senior%20ui%20ux&origin=JOB_SEARCH_PAGE_KEYWORD_AUTOCOMPLETE&refresh=true "
        }
    ];

    const jobListingsContainer = document.getElementById('employers-list');

    if (jobListingsContainer) {
        jobListingsContainer.innerHTML = '';
        jobboards.forEach(job => {
            // Use a template literal to create a clickable card HTML string
            const jobCardHTML = `
                <a href="${job.link}" class="job-card-link" target="_blank" rel="noopener noreferrer">
                    <div class="job-card">
                        <h2 class="job-title">${job.title}</h2>
                        <p class="job-company">${job.company}</p>
                        <p class="job-location">${job.location}</p>
                        <p class="job-description">${job.description}</p>
                        <span class="job-type ${job.type.toLowerCase().replace('-', '')}">${job.type}</span>
                    </div>
                </a>
            `;
            jobListingsContainer.insertAdjacentHTML('beforeend', jobCardHTML);
        });
    }

    // --- Responsive Menu Toggle ---
    const hamburgerBtn = document.getElementById('menu-button');
    const navList = document.getElementById('primary-nav');

    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('is-open');
        });
    }
});

