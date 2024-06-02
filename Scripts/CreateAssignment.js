document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.input-form');
    const saveAndNextButton = document.getElementById('save_next_button');
    const questionContainer = document.getElementById('total_question_container');
    let questionsArray = [];
    let currentEditIndex = -1;

    // Event listener for Save & Next button
    saveAndNextButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Validate form
        if (validateForm()) {
            // Collect form data
            const questionData = collectFormData();

            if (currentEditIndex === -1) {
                // Add new question
                questionsArray.push(questionData);
            } else {
                // Edit existing question
                questionsArray[currentEditIndex] = questionData;
                currentEditIndex = -1;
            }

            console.log('Questions Array:', questionsArray);

            // Render questions
            renderQuestions();

            // Clear form
            form.reset();
        }
    });

    function validateForm() {
        let valid = true;

        // Validate question
        const questionInput = document.getElementById('question_input');
        const quesWarning = document.getElementById('question_input_warning');
        if (questionInput.value.trim() === '') {
            valid = false;
            quesWarning.textContent = 'Question is Required.';
        } else {
            quesWarning.textContent = '';
        }

        // Validate wordlimit
        const minWords = document.getElementById('min_words');
        const minWordsWarning = document.getElementById('min_words_warning');
        if (minWords.value.trim() === '') {
            minWordsWarning.textContent = 'Minimum words limit are required.';
            valid = false;
        } else {
            minWordsWarning.textContent = '';
        }

        return valid;
    }

    function collectFormData() {
        const question = document.getElementById('question_input').value.trim();
        const minWords = document.getElementById('min_words').value.trim();
        const maxWords = document.getElementById('max_words').value.trim();
        return { question, minWords, maxWords };
    }

    function renderQuestions() {
        questionContainer.innerHTML = ''; // Clear the container first
        questionsArray.forEach((questionData, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-container';
            questionDiv.innerHTML = `
                <div class="question">
                    <div class="question-data">
                            <span id="ques_no_${index + 1}">${index + 1}.</span>
                            <p id="question_content_of_${index + 1}">${questionData.question}</p>
                    </div>
                    <div class="edit-buttons flex-center-column">
                        <button id="edit_btn_of_ques_${index + 1}" data-index="${index}">
                            <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 3.66797H4.66667C3.95942 3.66797 3.28115 3.94892 2.78105 4.44902C2.28095 4.94911 2 5.62739 2 6.33464V25.0013C2 25.7085 2.28095 26.3868 2.78105 26.8869C3.28115 27.387 3.95942 27.668 4.66667 27.668H23.3333C24.0406 27.668 24.7189 27.387 25.219 26.8869C25.719 26.3868 26 25.7085 26 25.0013V15.668"
                                    stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M22.4998 3.16827C23.0303 2.63784 23.7497 2.33984 24.4998 2.33984C25.25 2.33984 25.9694 2.63784 26.4998 3.16827C27.0303 3.6987 27.3283 4.41813 27.3283 5.16827C27.3283 5.91842 27.0303 6.63784 26.4998 7.16827L13.9998 19.6683L8.6665 21.0016L9.99984 15.6683L22.4998 3.16827Z"
                                    stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button id="delete_btn_of_ques_${index + 1}" class="delete-button" data-index="${index}">
                            <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.00016 27.3346C2.00016 28.2187 2.35135 29.0665 2.97647 29.6917C3.60159 30.3168 4.44944 30.668 5.3335 30.668H18.6668C19.5509 30.668 20.3987 30.3168 21.0239 29.6917C21.649 29.0665 22.0002 28.2187 22.0002 27.3346V7.33464H2.00016V27.3346ZM5.3335 10.668H18.6668V27.3346H5.3335V10.668ZM17.8335 2.33464L16.1668 0.667969H7.8335L6.16683 2.33464H0.333496V5.66797H23.6668V2.33464H17.8335Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            questionContainer.appendChild(questionDiv);

            // Add event listeners for edit and delete buttons
            document.getElementById(`edit_btn_of_ques_${index + 1}`).addEventListener('click', function () {
                editQuestion(index);
            });
            document.getElementById(`delete_btn_of_ques_${index + 1}`).addEventListener('click', function () {
                deleteQuestion(index);
            });
        });
    }

    function editQuestion(index) {
        const questionData = questionsArray[index];
        document.getElementById('question_input').value = questionData.question;
        document.getElementById('min_words').value = questionData.minWords;
        document.getElementById('max_words').value = questionData.maxWords;
        currentEditIndex = index;
    }

    function deleteQuestion(index) {
        questionsArray.splice(index, 1);
        renderQuestions();
    }

    document.getElementById('quiz_submit_form').addEventListener('submit', function (event) {
        event.preventDefault();
        const assignmentName = document.getElementById('assignment_name');
        const assignmentNameWarning = document.getElementById('assignment_name_warning');
        const lastDateOfAssignment = document.getElementById('last_date_of_assignment');
        const lastDateOfAssignmentWarning = document.getElementById('last_date_of_assignment_warning');
        let valid = true;

        if (assignmentName.value.trim() == '') {
            assignmentNameWarning.textContent = "Date Required."
            valid = false;
        } else {
            assignmentNameWarning.textContent = '';
        }

        if (lastDateOfAssignment.value.trim() == '') {
            lastDateOfAssignmentWarning.textContent = "Date Required."
            valid = false;
        } else {
            lastDateOfAssignmentWarning.textContent = '';
        }

        if (questionsArray.length == 0) {
            document.getElementById('warning').textContent = "atleast one question is required";
            valid = false;
        }

        if (valid) {

            let obj = {
                "total_questions": questionsArray.length,
                "questions": questionsArray
            }

            document.getElementById("complete_quiz_data").value = JSON.stringify(obj);
            console.log(obj);
            // console.log(document.getElementById("complete_quiz_data").value);
            setTimeout(() => {
                this.submit();
            }, 500);
        }
    });
});

