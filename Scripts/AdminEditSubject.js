document.getElementById('add-edit-subject-form').addEventListener('submit', function (event) {
    let isValid = true;

    // subject Name validation
    const nameInput = document.getElementById('subject_name');
    const nameWarning = document.getElementById('subject_name_warning');
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        nameWarning.textContent = "Subject's Name is required.";
        isValid = false;
    } else {
        nameWarning.textContent = '';
    }

    // Course validation
    const course = document.getElementById('select_course');
    const courseWarning = document.getElementById('select_course_warning');
    const courseValue = course.value.trim();
    if (courseValue === '') {
        courseWarning.textContent = "Subject's Name is required.";
        isValid = false;
    } else {
        courseWarning.textContent = '';
    }

    // branch validation
    const branch = document.getElementById('select_branch');
    const branchWarning = document.getElementById('select_branch_warning');
    const branchValue = branch.value.trim();
    if (branchValue === '') {
        branchWarning.textContent = "Branch's Name is required.";
        isValid = false;
    } else {
        branchWarning.textContent = '';
    }

    // semester validation
    const semester = document.getElementById('select_semester');
    const semesterWarning = document.getElementById('select_semester_warning');
    const semesterValue = semester.value.trim();
    if (semesterValue === '') {
        semesterWarning.textContent = "Subject's Name is required.";
        isValid = false;
    } else {
        semesterWarning.textContent = '';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// Function to populate form with subject details
function populateFormWithSubjectDetails(subject) {
    document.getElementById('subject_name').value = subject.name;
}

// Add event listeners to edit buttons
document.querySelectorAll('.subject-details .button').forEach(button => {
    button.addEventListener('click', (event) => {
        const subjectDetails = event.currentTarget.closest('.subject-details');
        const subjectName = subjectDetails.querySelector('h3').textContent;

        const subject = {
            name: subjectName,
        };

        populateFormWithSubjectDetails(subject);
    });
});