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