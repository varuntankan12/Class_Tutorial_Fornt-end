document.getElementById('forget-password-form').addEventListener('submit', function (event) {
    let isValid = false;  // Prevent form submission

    const emailInput = document.getElementById('email_input');
    const emailValue = emailInput.value.trim();

    const alreadyPresent = sessionStorage.getItem('resetEmail');

    isValid = checkValidEmail();

    // Store the email in session storage
    // if (isValid) {
    //     const alreadyPresent = sessionStorage.getItem('resetEmail');
    //     if ((alreadyPresent == '' || alreadyPresent == null) && emailValue != '') {
    //         sessionStorage.setItem('resetEmail',emailValue);
    //     }
    //     else {
    //         sessionStorage.removeItem('resetEmail');
    //     }

    // }

    if(alreadyPresent){
        emailValue = alreadyPresent;
    }

    if (isValid) {
        sessionStorage.setItem('resetEmail', emailValue);
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// Function to update form elements
function updateForm(email) {
    document.getElementById('form-heading').textContent = 'Check Email';
    document.getElementById('form-paragraph').innerHTML = `We have sent the reset email to <br> ${email}`;

    const emailField = document.getElementById('email_field');
    emailField.style.display = 'none';

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = 'Resend Email';
}

const presentEmail = sessionStorage.getItem('resetEmail');
if (presentEmail != '' && presentEmail != null) {
    updateForm(presentEmail);
}