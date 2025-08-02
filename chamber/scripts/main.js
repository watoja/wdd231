document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile navigation toggle ---
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');

    if (menuButton && primaryNav) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('open');
            primaryNav.setAttribute('aria-hidden', isExpanded); // Hide nav from screen readers when closed
        });

        // Close nav when a link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.classList.contains('open')) {
                    menuButton.setAttribute('aria-expanded', false);
                    primaryNav.classList.remove('open');
                    primaryNav.setAttribute('aria-hidden', true);
                }
            });
        });

        // Close nav if clicking outside of it (for larger click targets)
        document.addEventListener('click', (event) => {
            if (!primaryNav.contains(event.target) && !menuButton.contains(event.target) && primaryNav.classList.contains('open')) {
                menuButton.setAttribute('aria-expanded', false);
                primaryNav.classList.remove('open');
                primaryNav.setAttribute('aria-hidden', true);
            }
        });
    }

    // --- Dynamic copyright year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Dynamic last modified date ---
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();
    }

    // --- Weather API Integration ---
    const weatherSection = document.querySelector('.weather-section');
    if (weatherSection) {
        const weatherDisplay = document.getElementById('weather-display');
        const city = 'Masaka'; // City for weather data
        const countryCode = 'UG'; // Country code for Uganda
        // IMPORTANT: Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
        const weatherApiKey = '94aa0f4a0dcde50824b39ce69033d4ba';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${weatherApiKey}`;

        /**
         * Fetches current weather and a 3-day forecast from OpenWeatherMap API.
         */
        async function getWeatherData() {
            try {
                // Fetch current weather data
                const currentWeatherResponse = await fetch(weatherUrl);
                if (!currentWeatherResponse.ok) {
                    throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
                }
                const currentWeatherData = await currentWeatherResponse.json();

                // Fetch 5-day / 3-hour forecast data
                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) {
                    throw new Error(`HTTP error! status: ${forecastResponse.status}`);
                }
                const forecastData = await forecastResponse.json();

                displayWeather(currentWeatherData, forecastData);

            } catch (error) {
                console.error('Error fetching weather data:', error);
                if (weatherDisplay) {
                    weatherDisplay.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
                }
            }
        }

        /**
         * Renders the current weather and a 3-day forecast into the DOM.
         * @param {object} current - Current weather data object.
         * @param {object} forecast - Forecast weather data object.
         */
        function displayWeather(current, forecast) {
            if (!weatherDisplay) return;

            let weatherHTML = '';

            // --- Today's Weather ---
            weatherHTML += `
                <div class="weather-card">
                    <h4>Today's Weather</h4>
                    <div class="weather-details">
                        <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}" />
                        <div>
                            <p><strong>Current Temp:</strong> ${Math.round(current.main.temp)}°C</p>
                            <p><strong>Condition:</strong> ${current.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                        </div>
                    </div>
                </div>
            `;

            // --- Tomorrow's Forecast ---
            // The free API does not provide historical data, so "yesterday" cannot be included.
            // We'll find a single representative forecast for tomorrow.
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const tomorrowForecast = forecast.list.find(item => {
                const itemDate = new Date(item.dt * 1000);
                return itemDate.getDate() === tomorrow.getDate() && itemDate.getHours() >= 12;
            });

            if (tomorrowForecast) {
                weatherHTML += `
                    <div class="weather-card">
                        <h4>Tomorrow's Forecast</h4>
                        <div class="weather-details">
                            <img src="https://openweathermap.org/img/wn/${tomorrowForecast.weather[0].icon}.png" alt="${tomorrowForecast.weather[0].description}" />
                            <div>
                                <p><strong>Temp:</strong> ${Math.round(tomorrowForecast.main.temp)}°C</p>
                                <p><strong>Condition:</strong> ${tomorrowForecast.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                 weatherHTML += `<p>Tomorrow's forecast not available.</p>`;
            }

            weatherDisplay.innerHTML = weatherHTML;
        }

        getWeatherData();
    }

    // --- Chamber Member Spotlights ---
    const spotlightsSection = document.querySelector('.member-spotlights');
    if (spotlightsSection) {
        const spotlightsContainer = document.getElementById('spotlights-container');
        const membersDataUrl = 'data/members.json';

        /**
         * Loads member data from JSON, filters for Gold/Silver, and displays a random selection.
         */
        async function loadMemberSpotlights() {
            try {
                const response = await fetch(membersDataUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const members = await response.json();

                // Filter for members with 'Gold' or 'Silver' membership levels
                const qualifiedMembers = members.filter(member =>
                    member.membershiplevel === 'Gold' || member.membershiplevel === 'Silver'
                );

                if (qualifiedMembers.length === 0) {
                    spotlightsContainer.innerHTML = '<p>No Gold or Silver members to display at this time.</p>';
                    return;
                }

                // Shuffle the array of qualified members randomly
                const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());

                // Randomly select 2 or 3 members for the spotlight
                const numSpotlights = Math.floor(Math.random() * 2) + 2;
                const selectedSpotlights = shuffledMembers.slice(0, numSpotlights);

                displaySpotlights(selectedSpotlights);

            } catch (error) {
                console.error('Error loading member spotlights:', error);
                if (spotlightsContainer) {
                    spotlightsContainer.innerHTML = '<p>Failed to load featured businesses. Please try again later.</p>';
                }
            }
        }

        /**
         * Renders the selected member spotlights into the DOM.
         * @param {Array<object>} spotlights - An array of member objects to display.
         */
        function displaySpotlights(spotlights) {
            if (!spotlightsContainer) return;

            spotlightsContainer.innerHTML = '';
            spotlights.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('spotlight-card');

                card.innerHTML = `
                    <img src="images/${member.imagefilename}" alt="${member.name} Logo" class="logo">
                    <h4>${member.name}</h4>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><a href="${member.websiteurl}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    <p class="membership-level">Membership: ${member.membershiplevel}</p>
                `;
                spotlightsContainer.appendChild(card);
            });
        }

        loadMemberSpotlights();
    }
});

 function initializeUpdates() {
        const updatesList = document.getElementById('market-updates-list');
        const toggleButton = document.getElementById('toggle-updates-button');
        const numUpdatesToShow = 3;

        // Check if the necessary elements exist before proceeding
        if (!updatesList || !toggleButton) {
            console.warn('Market updates list or toggle button not found. The feature will not be initialized.');
            return;
        }

        const updates = updatesList.getElementsByTagName('li');

        // Initially hide all updates after the first three
        for (let i = numUpdatesToShow; i < updates.length; i++) {
            updates[i].classList.add('updates-hidden');
        }

        // Hide the button if there are 3 or fewer updates
        if (updates.length <= numUpdatesToShow) {
            toggleButton.style.display = 'none';
        } else {
            toggleButton.style.display = 'block';
            toggleButton.textContent = 'View All Updates';
        }

        // Add event listener to toggle the updates
        toggleButton.addEventListener('click', () => {
            // Check the state based on the visibility of the first hidden item
            const isShowingAll = updates[numUpdatesToShow].classList.contains('updates-hidden');

            for (let i = numUpdatesToShow; i < updates.length; i++) {
                if (isShowingAll) {
                    updates[i].classList.remove('updates-hidden');
                } else {
                    updates[i].classList.add('updates-hidden');
                }
            }

            // Change button text based on state
            if (isShowingAll) {
                toggleButton.textContent = 'Show Less';
            } else {
                toggleButton.textContent = 'View All Updates';
            }
        });
    }

    // Call the initialization function once the DOM content is loaded
    document.addEventListener('DOMContentLoaded', initializeUpdates);

    // As a fallback, also call the function on window load
    window.addEventListener('load', initializeUpdates);