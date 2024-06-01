document.getElementById('student-details-form').addEventListener('submit', function (event) {
    let isValid = true;

    // Validate first Name
    const firstNameInput = document.getElementById('first_name_input');
    const firstNameWarning = document.getElementById('first_name_warning');
    if (firstNameInput.value.trim() === '') {
        firstNameWarning.textContent = 'First Name is required.';
        isValid = false;
    } else {
        firstNameWarning.textContent = '';
    }

    // Validate lastName
    const lastNameInput = document.getElementById('last_name_input');
    const lastNameWarning = document.getElementById('last_name_warning');
    if (lastNameInput.value.trim() === '') {
        lastNameWarning.textContent = 'Last Name is required.';
        isValid = false;
    } else {
        lastNameWarning.textContent = '';
    }

    // Validate Father's Name
    const fatherNameInput = document.getElementById('father_name_input');
    const fatherNameWarning = document.getElementById('father_name_warning');
    if (fatherNameInput.value.trim() === '') {
        fatherNameWarning.textContent = 'Father\'s Name is required.';
        isValid = false;
    } else {
        fatherNameWarning.textContent = '';
    }

    // Validate Mobile Number
    const mobileInput = document.getElementById('mobile_input');
    const mobileWarning = document.getElementById('mobile_warning');
    const region = document.getElementById('region');

    const mobileValue = mobileInput.value.trim();
    if (mobileValue === '') {
        mobileWarning.textContent = 'Mobile Number is required.';
        region.style.bottom = '32px';
        isValid = false;
    } else if (!/^\d{10}$/.test(mobileValue)) {
        mobileWarning.textContent = 'Please enter a valid 10-digit mobile number.';
        region.style.bottom = '32px';
        isValid = false;
    } else {
        mobileWarning.textContent = '';
        region.style.bottom = '12px';
    }

    // Validate Date of Birth
    const dobInput = document.getElementById('dob_input');
    const dobWarning = document.getElementById('dob_warning');
    if (dobInput.value.trim() === '') {
        dobWarning.textContent = 'Date of Birth is required.';
        isValid = false;
    } else {
        dobWarning.textContent = '';
    }

    // Validate Address
    const addressInput = document.getElementById('address_input');
    const addressWarning = document.getElementById('address_warning');
    if (addressInput.value.trim() === '') {
        addressWarning.textContent = 'Address is required.';
        isValid = false;
    } else {
        addressWarning.textContent = '';
    }

    // Prevent form submission if any validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

document.getElementById('edit_image_button').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('pop_up').classList.toggle('hidden-imp');
});

function previewFile(input) {
    var preview = document.getElementById('preview');
    var file = input.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        console.log(reader.result);
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function changeURL() {
    let preview = document.getElementById('preview');
    preview.setAttribute('src', 'assets/ProfilePreviewMale.svg');
}