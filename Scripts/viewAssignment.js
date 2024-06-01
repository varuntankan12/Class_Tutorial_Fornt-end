const assignmentData = (typeof (studentAssignmentData) == "string" ? JSON.parse(studentAssignmentData) : studentAssignmentData);

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
    textarea.setAttribute("disabled", true);
    textarea.value = question.student_answer;
    textarea.addEventListener('copy', (event) => event.preventDefault());
    textarea.addEventListener('paste', (event) => event.preventDefault());
    textarea.addEventListener('cut', (event) => event.preventDefault());

    const constraint = document.createElement('div');
    constraint.classList.add('right-wrong-container');

    const wordCountP = document.createElement('p');
    wordCountP.innerHTML = `<span id="word_count_of_${questionNumber}">0</span>/<span id="total_word_count_of_${questionNumber}">${question.min_words}</span>`;

    const warningP = document.createElement('p');
    warningP.classList.add(question.status);

    textareaDiv.appendChild(textarea);
    constraint.appendChild(wordCountP);
    constraint.appendChild(warningP);
    textareaDiv.appendChild(constraint);

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
    document.getElementById(`word_count_of_${index}`).textContent = wordCount == 1 ? 0 : wordCount;
}

setTimeout(() => {
    for (let i = 0; i < totalQuestions; i++) {
        const question = assignmentData.questions[i];
        updateWordCount(question.student_answer, i + 1);
    }
}, 1000);