function checkValidEmail() {
    // Email validation
    const emailInput = document.getElementById('email_input');
    const emailWarning = document.getElementById('email_warning');
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        emailWarning.textContent = 'Email is required.';
        return false;
    } else if (!validateEmail(emailValue)) {
        emailWarning.textContent = 'Please enter a valid email address.';
        return false;
    } else {
        emailWarning.textContent = '';
    }

    return true;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}