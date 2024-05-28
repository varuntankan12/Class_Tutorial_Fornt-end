

// Function to handle radio button background color
function updateRadioLabelColors() {
    const studentRadio = document.getElementById('student');
    const teacherRadio = document.getElementById('teacher');
    const studentLabel = document.getElementById('student_label');
    const teacherLabel = document.getElementById('teacher_label');
    const emailField = document.getElementById('email_field');
    const identityKeyLabel = document.createElement('label');
    identityKeyLabel.setAttribute('for', 'identity_key_input');
    identityKeyLabel.classList.add('input-field');
    identityKeyLabel.setAttribute('id', 'identity_key_field');
    identityKeyLabel.innerHTML = `
        Identity Key <span class="red">*</span><br>
        <input type="text" class="input" id="identity_key_input" placeholder="Enter Identity Key">
        <p id="identity_key_warning" class="red"></p>
    `;

    if (studentRadio.checked) {
        studentLabel.style.backgroundColor = 'var(--button-color)';
        studentLabel.style.color = 'var(--white)';
        teacherLabel.style.backgroundColor = 'transparent';
        teacherLabel.style.color = 'var(--bg-color2)';
        const existingField = document.getElementById('identity_key_field');
        if (existingField) existingField.remove();
    } else if (teacherRadio.checked) {
        studentLabel.style.backgroundColor = 'transparent';
        studentLabel.style.color = 'var(--bg-color2)';
        teacherLabel.style.backgroundColor = 'var(--button-color)';
        teacherLabel.style.color = 'var(--white)';
        const existingField = document.getElementById('identity_key_field');
        if (!existingField) {
            emailField.insertAdjacentElement('afterend', identityKeyLabel);
        }
    }
}

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
document.getElementById('signup-form').addEventListener('submit', function (event) {
    let isValid = false;

    const firstname = document.getElementById('first_name_input');
    const firstnamewarning = document.getElementById('first_name__warning');
    const firstnameValue = firstname.value.trim();
    if (firstnameValue === '') {
        firstnamewarning.textContent = 'First Name is required.';
        isValid = false;
    }
    else {
        firstnamewarning.textContent = '';
    }


    const lastname = document.getElementById('last_name_input');
    const lastnamewarning = document.getElementById('last_name_warning');
    const lastnameValue = lastname.value.trim();
    if (lastnameValue === '') {
        lastnamewarning.textContent = 'Last name is required.';
        isValid = false;
    }
    else {
        lastnamewarning.textContent = '';
    }

    isValid = checkValidEmail();

    //password validation
    const passworddescription = document.getElementById('password_desc');

    const password = document.getElementById('create_password_input');
    const passwordwarning = document.getElementById('create_password_warning');
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
    const confirmpassword = document.getElementById('confirm_password_input');
    const confirmpasswordwarning = document.getElementById('confirm_password_warning');
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

    // Identity Key validation (only for teacher)
    const teacherRadio = document.getElementById('teacher');
    if (teacherRadio.checked) {
        const identityKeyInput = document.getElementById('identity_key_input');
        const identityKeyWarning = document.getElementById('identity_key_warning');
        const identityKeyValue = identityKeyInput.value.trim();
        if (identityKeyValue === '') {
            identityKeyWarning.textContent = 'Identity Key is required.';
            isValid = false;
        } else {
            identityKeyWarning.textContent = '';
        }
    }


    if (!isValid) {
        event.preventDefault();
    }
});

const createPasswordVisibilityBtn = document.getElementById('view_hide_btn_crt').addEventListener('click', function () {
    const passwordField = document.getElementById('create_password_input');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = 'assets/ceye.svg';
    } else {
        passwordField.type = 'password';
        this.src = 'assets/eye.svg';
    }
});
const confirmPasswordVisibilityBtn = document.getElementById('view_hide_btn_cnfrm').addEventListener('click', function () {
    const passwordField = document.getElementById('confirm_password_input');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = 'assets/ceye.svg';
    } else {
        passwordField.type = 'password';
        this.src = 'assets/eye.svg';
    }
});

// Event listeners for radio buttons
document.getElementById('student').addEventListener('change', updateRadioLabelColors);
document.getElementById('teacher').addEventListener('change', updateRadioLabelColors);

// Initial call to set the correct colors
updateRadioLabelColors();