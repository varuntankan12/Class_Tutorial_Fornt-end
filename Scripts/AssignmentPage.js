const assignmentData = (typeof (Data) == "string" ? JSON.parse(Data) : Data);

const container = document.getElementById('questions_container');
const totalQuestions = assignmentData.total_questions;
let userAnswers = new Array(totalQuestions).fill(null);

setTimeout(() => {
    document.getElementById('assignment_data_container').innerHTML = "";
}, 1000);

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
})

document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.key === 'I') {
        event.preventDefault();
        alert("You can't use Inspect Tools.")
    }
});

assignmentData.questions.forEach((question, index) => {
    const questionNumber = index + 1;

    // Create question element
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    // Create question data element
    const questionData = document.createElement('div');
    questionData.classList.add('question-data');
    questionData.id = `answer_field_${questionNumber}`;

    // Create label
    const label = document.createElement('label');
    label.setAttribute('for', `answer_input_${questionNumber}`);
    label.classList.add('input-field');

    const span = document.createElement('span');
    span.textContent = `${questionNumber}.`;

    const p = document.createElement('p');
    p.innerHTML = question.question;

    label.appendChild(span);
    label.appendChild(p);

    // Create textarea
    const textareaDiv = document.createElement('div');
    const textarea = document.createElement('textarea');
    textarea.id = `answer_input_${questionNumber}`;
    textarea.placeholder = "Enter Your Answer.";
    textarea.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key == 'Backspace') {
            updateWordCount(textarea.value, index + 1);
        }
    });
    textarea.addEventListener('copy', (event) => event.preventDefault());
    textarea.addEventListener('paste', (event) => event.preventDefault());
    textarea.addEventListener('cut', (event) => event.preventDefault());

    const wordCountP = document.createElement('p');
    wordCountP.innerHTML = `<span id="word_count_of_${questionNumber}">0</span>/<span id="total_word_count_of_${questionNumber}">${question.min_words}</span>`;

    const warningP = document.createElement('p');
    warningP.classList.add("red");
    warningP.id = `warning_of_${questionNumber}`;

    textareaDiv.appendChild(textarea);
    textareaDiv.appendChild(wordCountP);
    textareaDiv.appendChild(warningP);

    questionData.appendChild(label);
    questionData.appendChild(textareaDiv);

    // Append question data to question element
    questionElement.appendChild(questionData);

    // Create and append line divider
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    questionElement.appendChild(lineDiv);

    // Append question element to container
    container.appendChild(questionElement);
});

function updateWordCount(input, index) {
    const wordCount = input.trim().split(/\s+/).length;
    document.getElementById(`word_count_of_${index}`).textContent = wordCount;
}

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (confirm("do you really want to Submit..?")) {
        let valid = true;
        for (let i = 0; i < totalQuestions; i++) {
            const input = document.getElementById(`answer_input_${i + 1}`).value;
            const warning = document.getElementById(`warning_of_${i + 1}`);
            const ques = assignmentData.questions[i];
            const wordLimit = ques.min_words;
            if (input == '') {
                warning.textContent = "This Field is Required.";
                valid = false;
            }
            else if (input.trim().split(/\s+/).length < wordLimit) {
                warning.textContent = `minimum ${wordLimit} words are Required.`;
                valid = false;
            }
            else{
                warning.textContent = "";
            }
            userAnswers[i] = input;
        }

        if (valid) {
            console.log(userAnswers);
            let submitData = { ...assignmentData };
            console.log(submitData);
            submitData.questions = submitData.questions.map((question, index) => {
                return { ...question, "student_answer": (userAnswers[index] == null ? null : userAnswers[index]) };
            });
            console.log(submitData);
            document.getElementById("answer_of_student").value = JSON.stringify(submitData);
            this.submit()
        }
    }
    else {
        console.log(userAnswers);
    }
});

