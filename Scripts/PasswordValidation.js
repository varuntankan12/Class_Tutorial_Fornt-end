function checkValidPassword() {
    // Password validation
    const passwordInput = document.getElementById('password_input');
    const passwordWarning = document.getElementById('password_warning');
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === '') {
        passwordWarning.textContent = 'Password is required.';
        return false;
    } else {
        passwordWarning.textContent = '';
    }

    return true;
}

// Toggle password visibility
document.getElementById('view_hide_btn').addEventListener('click', function () {
    const passwordField = document.getElementById('password_input');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.src = 'assets/ceye.svg';
    } else {
        passwordField.type = 'password';
        this.src = 'assets/eye.svg';
    }
});