// chamber/scripts/form.js

document.addEventListener('DOMContentLoaded', () => {
    // For Join Page timestamp
    const joinTimestamp = document.getElementById('timestamp');
    if (joinTimestamp) {
        joinTimestamp.value = new Date().toISOString();
    }

    // For Contact Page timestamp
    const contactTimestamp = document.getElementById('contactTimestamp');
    if (contactTimestamp) {
        contactTimestamp.value = new Date().toISOString();
    }
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const form = document.querySelector('form');
    // Get the hidden timestamp input field
    const timestampField = document.getElementById('timestamp');

    if (form && timestampField) {
        // Add a 'submit' event listener to the form
        form.addEventListener('submit', () => {
            // Get the current date and time in milliseconds since the epoch
            const now = Date.now();
            // Set the value of the hidden input field to this timestamp
            timestampField.value = now;
        });
    }
});