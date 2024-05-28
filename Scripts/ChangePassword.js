function strongPassword(password) {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return { isValid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!hasLowerCase) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasUpperCase) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasDigit) {
        return { isValid: false, message: 'Password must contain at least one numeric digit.' };
    }
    if (!hasSpecialChar) {
        return { isValid: false, message: 'Password must contain at least one special character.' };
    }
    return { isValid: true, message: '' };
}

// Handle form submission
document.getElementById('reset-password-form').addEventListener('submit', function (event) {
    let isValid = true;

    //password validation
    const passworddescription = document.getElementById('password_desc');

    const password = document.getElementById('Enter_new_password_input');
    const passwordwarning = document.getElementById('Enter_new_password_warning');
    const passwordValue = password.value.trim();
    if (passwordValue === '') {
        passwordwarning.textContent = 'Password is required.';
        isValid = false;
    }
    else {
        const isStrongdata = strongPassword(passwordValue);
        if (!isStrongdata.isValid) {
            passwordwarning.textContent = 'Weak Password.';
            passworddescription.textContent = isStrongdata.message;
            password.style.border = '1px solid red';
            isValid = false;
        }
        else {
            passwordwarning.textContent = '';
            password.style.border = 'none';
        }
    }

    //confirm password validation
    const confirmpassword = document.getElementById('confirm_new_password_input');
    const confirmpasswordwarning = document.getElementById('confirm_new_password_warning');
    const confirmpasswordValue = confirmpassword.value.trim();
    if (confirmpasswordValue === '') {
        confirmpasswordwarning.textContent = 'Password is required.';
        isValid = false;
    }
    else {
        const isStrongdata = strongPassword(confirmpasswordValue);
        if (!isStrongdata.isValid) {
            confirmpasswordwarning.textContent = 'Weak Password.';
            confirmpassword.style.border = '1px solid red';
            passworddescription.textContent = isStrongdata.message;
            isValid = false;
        }
        else {
            confirmpasswordwarning.textContent = '';
            confirmpassword.style.border = 'none';
        }
    }

    //check passwords and confirm password
    if (passwordValue !== confirmpasswordValue) {
        passworddescription.textContent = 'Input Password Does not match.'
        isValid = false;
    }

    if (isValid) {
        sessionStorage.setItem('passwordChanged', "changed");
    }

    if (!isValid) {
        event.preventDefault();
    }
});

document.getElementById('view_hide_btn_crt_new').addEventListener('click', function () {
    const passwordField = document.getElementById('Enter_new_password_input');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = 'assets/ceye.svg';
    } else {
        passwordField.type = 'password';
        this.src = 'assets/eye.svg';
    }
});

const confirmPasswordVisibilityBtn = document.getElementById('view_hide_btn_cnfrm_new').addEventListener('click', function () {
    const passwordField = document.getElementById('confirm_new_password_input');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = 'assets/ceye.svg';
    } else {
        passwordField.type = 'password';
        this.src = 'assets/eye.svg';
    }
});

// Function to update form elements.
function updateForm() {
    document.getElementById('form-heading').textContent = 'Reset complete!';
    document.getElementById('form-paragraph').innerHTML = `All done! We have sent an email to your registerd email ID to confirm.`;

    document.getElementById('new_password').style.display = 'none';
    document.getElementById('confirm_new_password').style.display = 'none';

    const submitButton = document.getElementById('submit-button');
    submitButton.textContent = 'Back to Login';
    submitButton.addEventListener('click', function () {
        document.getElementById('back_to_login').click();

    });
}

const alreadyChanged = sessionStorage.getItem('passwordChanged');
if (alreadyChanged != null) {
    updateForm();
}