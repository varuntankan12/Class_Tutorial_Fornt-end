

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

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    let isValid = false;

    isValid = checkValidEmail();
    isValid = checkValidPassword();

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


// Event listeners for radio buttons
document.getElementById('student').addEventListener('change', updateRadioLabelColors);
document.getElementById('teacher').addEventListener('change', updateRadioLabelColors);

// Initial call to set the correct colors
updateRadioLabelColors();