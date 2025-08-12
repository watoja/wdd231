

// Function to get a query parameter from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to format the date and time from the timestamp
function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp, 10));
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'N/A';
    }
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to display the form data
function displayFormData() {
    const orgName = getQueryParam('orgName');
    const firstName = getQueryParam('firstName');
    const lastName = getQueryParam('lastName');
    const email = getQueryParam('email');
    const phone = getQueryParam('phone');
    const timestamp = getQueryParam('timestamp');
    const formattedTimestamp = formatTimestamp(timestamp);

    // Get the display elements and populate them
    if (orgName) {
        document.getElementById('display-orgName').textContent = orgName;
    }
    if (firstName) {
        document.getElementById('display-firstName').textContent = firstName;
    }
    if (lastName) {
        document.getElementById('display-lastName').textContent = lastName;
    }
    if (email) {
        document.getElementById('display-email').textContent = email;
    }
    if (phone) {
        document.getElementById('display-phone').textContent = phone;
    }
    if (formattedTimestamp) {
        document.getElementById('display-timestamp').textContent = formattedTimestamp;
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', displayFormData);
