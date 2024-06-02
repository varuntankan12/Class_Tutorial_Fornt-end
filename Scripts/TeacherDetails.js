document.getElementById('teacher-details-form').addEventListener('submit', function (event) {
    let isValid = true;

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

    const positionNameInput = document.getElementById('position_input');
    const positionNameWarning = document.getElementById('position_warning');
    if (positionNameInput.value.trim() === '') {
        positionNameWarning.textContent = 'Position Name is required.';
        isValid = false;
    } else {
        positionNameWarning.textContent = '';
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

    // Subject validation
    const selectSubject = document.getElementById('select_main_subject');
    const subjectWarning = document.getElementById(`select_main_subject_warning`);
    const subjectValue = selectSubject.value;
    if (subjectValue === '') {
        subjectWarning.textContent = 'Please select a subject.';
        isValid = false;
    } else {
        subjectWarning.textContent = '';
    }

    // Prevent form submission if any validation fails
    if (!isValid) {
        event.preventDefault();
    }
});
