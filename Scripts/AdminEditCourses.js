document.getElementById('add-edit-course-form').addEventListener('submit', function (event) {
    let isValid = true;

    // Name validation
    const coursenameInput = document.getElementById('course_name_input');
    const coursenameWarning = document.getElementById('course_name_warning');
    const nameValue = coursenameInput.value.trim();
    if (nameValue === '') {
        coursenameWarning.textContent = "Courses's Name is required.";
        isValid = false;
    } else {
        nameWarning.textContent = '';
    }

    // semester count validation
    const semesterCount = document.getElementById('semester_count_input');
    const semestercountWarning = document.getElementById('semester_count_warning');
    const semesterCountValue = semesterCount.value.trim();
    if (semesterCountValue === '') {
        semestercountWarning.textContent = "semester Count is required.";
        isValid = false;
    } else if (parseInt(semesterCountValue) <= 0){
        semestercountWarning.textContent = "semester Count can't be zero or negative.";
        isValid = false;
    }else{
        semestercountWarning.textContent = '';
    }

    // branch validation
    const branches = document.querySelectorAll('.branch-input');
    branches.forEach((branch, index) => {
        const branchWarning = document.getElementById(`branch_name_warning_${index + 1}`);
        const branchValue = branch.value;
        if (branchValue === '') {
            branchWarning.textContent = 'Please Add A branch';
            isValid = false;
        } else {
            branchWarning.textContent = '';
        }
    });

    if (!isValid) {
        event.preventDefault();
    }
});


document.getElementById('add_more_branch_btn').addEventListener('click', function (event) {
    event.preventDefault();
    const container = document.getElementById('branch_input_container');
    const lastLabel = container.querySelector('.input-field:last-of-type');
    const newLabel = lastLabel.cloneNode(true);
    const lastInput = lastLabel.querySelector('input');
    const newInput = newLabel.querySelector('input');
    const lastInputIndex = parseInt(lastInput.id.split('_')[2]);
    const newInputIndex = lastInputIndex + 1;

    newLabel.setAttribute('for', `branch_input_${newInputIndex}`);
    newInput.id = `branch_input_${newInputIndex}`;
    newInput.value = '';
    newLabel.querySelector('p').id = `branch_name_warning_${newInputIndex}`;
    newLabel.querySelector('p').textContent = '';

    container.insertBefore(newLabel, container.querySelector('button'));
});



// Function to populate form with course details
function populateFormWithCourseDetails(course) {
    document.getElementById('course_name_input').value = course.name;
    document.getElementById('semester_count_input').value = course.semcount;
}

// Add event listeners to edit buttons
document.querySelectorAll('.course-details .button').forEach(button => {
    button.addEventListener('click', (event) => {
        const courseDetails = event.currentTarget.closest('.course-details');
        const courseName = courseDetails.querySelector('h3').textContent;
        const courseSemesterCount = courseDetails.querySelector('p:last-of-type').textContent.trim().split(' ')[0];

        const course = {
            name: courseName,
            semcount: courseSemesterCount,
        };

        populateFormWithCourseDetails(course);
    });
});