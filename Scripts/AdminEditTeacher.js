document.getElementById('add-edit-teacher-form').addEventListener('submit', function (event) {
    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('name_input');
    const nameWarning = document.getElementById('name_warning');
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        nameWarning.textContent = "Teacher's Name is required.";
        isValid = false;
    } else {
        nameWarning.textContent = '';
    }

    // Identity key validation
    const identityKeyInput = document.getElementById('identity_key_input');
    const identityKeyWarning = document.getElementById('identity_key_warning');
    const identityKeyValue = identityKeyInput.value.trim();
    if (identityKeyValue === '') {
        identityKeyWarning.textContent = "Teacher's Identity Key is required.";
        isValid = false;
    } else {
        identityKeyWarning.textContent = '';
    }

    // Subject validation
    const selectSubjects = document.querySelectorAll('.select-subject');
    selectSubjects.forEach((selectSubject, index) => {
        const subjectWarning = document.getElementById(`subject_warning_${index + 1}`);
        const subjectValue = selectSubject.value;
        if (subjectValue === '') {
            subjectWarning.textContent = 'Please select a subject.';
            isValid = false;
        } else {
            subjectWarning.textContent = '';
        }
    });

    if (!isValid) {
        event.preventDefault();
    }
});

document.getElementById('generate-key-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const identityKeyInput = document.getElementById('identity_key_input');
    identityKeyInput.value = Math.random().toString(36).substring(2, 15);
});


document.getElementById('add_more_subject_btn').addEventListener('click', function (event) {
    event.preventDefault();
    const container = document.getElementById('select-subject-container');
    const lastLabel = container.querySelector('.input-field:last-of-type');
    const newLabel = lastLabel.cloneNode(true);
    const lastSelect = lastLabel.querySelector('select');
    const newSelect = newLabel.querySelector('select');
    const lastSelectIndex = parseInt(lastSelect.id.split('_')[2]);
    const newSelectIndex = lastSelectIndex + 1;

    newLabel.setAttribute('for', `select_Subject_${newSelectIndex}`);
    newSelect.id = `select_Subject_${newSelectIndex}`;
    newSelect.value = '';
    newLabel.querySelector('p').id = `subject_warning_${newSelectIndex}`;
    newLabel.querySelector('p').textContent = '';

    // Remove selected option from the new select
    const selectedValue = lastSelect.value;
    const options = newSelect.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === selectedValue) {
            option.remove();
        }
    });

    container.insertBefore(newLabel, container.querySelector('button'));
});



// Function to populate form with teacher details
function populateFormWithTeacherDetails(teacher) {
    document.getElementById('name_input').value = teacher.name;
    document.getElementById('identity_key_input').value = teacher.key;
}

// Add event listeners to edit buttons
document.querySelectorAll('.teacher-details .button').forEach(button => {
    button.addEventListener('click', (event) => {
        const teacherDetails = event.currentTarget.closest('.teacher-details');
        const teacherName = teacherDetails.querySelector('h3').textContent;
        const teacherKey = teacherDetails.querySelector('p').textContent.trim().split(' ')[0];

        const teacher = {
            name: teacherName,
            key: teacherKey,
        };

        populateFormWithTeacherDetails(teacher);
    });
});