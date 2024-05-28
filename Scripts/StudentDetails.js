document.getElementById('student-details-form').addEventListener('submit', function (event) {
    let isValid = true;

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

    // Validate Course
    const courseSelect = document.getElementById('select_course');
    const courseWarning = document.getElementById('select_course_warning');
    if (courseSelect.value === '') {
        courseWarning.textContent = 'Please select a course.';
        isValid = false;
    } else {
        courseWarning.textContent = '';
    }

    // Validate Branch
    const branchSelect = document.getElementById('select_branch');
    const branchWarning = document.getElementById('select_branch_warning');
    if (branchSelect.value === '') {
        branchWarning.textContent = 'Please select a branch.';
        isValid = false;
    } else {
        branchWarning.textContent = '';
    }

    // Validate Semester
    const semesterSelect = document.getElementById('select_semester');
    const semesterWarning = document.getElementById('select_semester_warning');
    if (semesterSelect.value === '') {
        semesterWarning.textContent = 'Please select a semester.';
        isValid = false;
    } else {
        semesterWarning.textContent = '';
    }

    // Validate Roll Number
    const rollNoInput = document.getElementById('roll_no_input');
    const rollNoWarning = document.getElementById('roll_no_warning');
    if (rollNoInput.value.trim() === '') {
        rollNoWarning.textContent = 'Roll No is required.';
        isValid = false;
    } else {
        rollNoWarning.textContent = '';
    }

    // Prevent form submission if any validation fails
    if (!isValid) {
        event.preventDefault();
    }
});
