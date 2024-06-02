const assignmentData = (typeof (studentAssignmentData) == "string" ? JSON.parse(studentAssignmentData) : studentAssignmentData);

const container = document.getElementById('questions_container');
const totalQuestions = assignmentData.total_questions;
let teacherAnswers = new Array(totalQuestions).fill(null);

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
    textarea.setAttribute("disabled", true);
    textarea.value = question.student_answer;
    textarea.addEventListener('copy', (event) => event.preventDefault());
    textarea.addEventListener('paste', (event) => event.preventDefault());
    textarea.addEventListener('cut', (event) => event.preventDefault());

    const constraint = document.createElement('div');
    constraint.classList.add('right-wrong-container');

    const wordCountP = document.createElement('p');
    wordCountP.innerHTML = `<span id="word_count_of_${questionNumber}">0</span>/<span id="total_word_count_of_${questionNumber}">${question.min_words}</span>`;

    const statusDiv = document.createElement('div');
    const button1 = document.createElement('button');
    button1.classList.add("wrong");
    button1.id = `wrong_${questionNumber}`;
    button1.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M27.7431 22.4936L19.2495 14L27.7431 5.50636C27.9059 5.34162 27.9971 5.11937 27.9971 4.8878C27.9971 4.65622 27.9059 4.43398 27.7431 4.26923L23.7308 0.256889C23.6496 0.175465 23.5532 0.110859 23.4471 0.0667756C23.3409 0.0226924 23.2271 0 23.1122 0C22.9973 0 22.8835 0.0226924 22.7773 0.0667756C22.6712 0.110859 22.5748 0.175465 22.4936 0.256889L14 8.75053L5.50636 0.256889C5.34229 0.0928686 5.11979 0.000726909 4.8878 0.000726909C4.6558 0.000726909 4.4333 0.0928686 4.26923 0.256889L0.256889 4.26923C0.175465 4.35036 0.110859 4.44676 0.0667756 4.5529C0.0226924 4.65905 0 4.77286 0 4.8878C0 5.00273 0.0226924 5.11654 0.0667756 5.22269C0.110859 5.32884 0.175465 5.42524 0.256889 5.50636L8.75053 14L0.256889 22.4936C0.0928686 22.6577 0.000726909 22.8802 0.000726909 23.1122C0.000726909 23.3442 0.0928686 23.5667 0.256889 23.7308L4.26923 27.7431C4.35036 27.8245 4.44676 27.8891 4.5529 27.9332C4.65905 27.9773 4.77286 28 4.8878 28C5.00273 28 5.11654 27.9773 5.22269 27.9332C5.32884 27.8891 5.42524 27.8245 5.50636 27.7431L14 19.2495L22.4936 27.7431C22.6577 27.9071 22.8802 27.9993 23.1122 27.9993C23.3442 27.9993 23.5667 27.9071 23.7308 27.7431L27.7431 23.7308C27.8245 23.6496 27.8891 23.5532 27.9332 23.4471C27.9773 23.3409 28 23.2271 28 23.1122C28 22.9973 27.9773 22.8835 27.9332 22.7773C27.8891 22.6712 27.8245 22.5748 27.7431 22.4936Z"
                fill="#D02727" fill-opacity="0.2" />
        </svg>
    `;

    const button2 = document.createElement('button');
    button2.classList.add("right");
    button2.id = `right_${questionNumber}`;
    button2.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M25.7898 0.543197C25.2963 0.268075 24.7535 0.093114 24.1924 0.0283205C23.6313 -0.0364729 23.063 0.0101716 22.5199 0.165587C21.9768 0.321003 21.4697 0.582141 21.0274 0.934067C20.5851 1.28599 20.2165 1.7218 19.9425 2.21658L11.9604 16.6072L7.39213 12.0307C6.99551 11.6193 6.52109 11.2912 5.99653 11.0655C5.47197 10.8397 4.90778 10.7209 4.33689 10.7159C3.766 10.711 3.19984 10.8199 2.67145 11.0365C2.14305 11.2531 1.663 11.5729 1.2593 11.9773C0.855609 12.3818 0.536356 12.8627 0.320171 13.392C0.103987 13.9214 -0.00479853 14.4886 0.000162336 15.0605C0.00512321 15.6324 0.123731 16.1976 0.349065 16.7231C0.5744 17.2486 0.901947 17.7239 1.3126 18.1212L9.91166 26.7358C10.7243 27.552 11.8207 28 12.9514 28L13.5469 27.9569C14.2059 27.8646 14.8345 27.6202 15.3833 27.2432C15.932 26.8661 16.3859 26.3666 16.7092 25.7839L27.458 6.40111C27.7325 5.90674 27.907 5.36307 27.9717 4.80112C28.0364 4.23918 27.9899 3.66998 27.835 3.12601C27.6801 2.58205 27.4198 2.07398 27.0689 1.63082C26.7179 1.18766 26.2833 0.818084 25.7898 0.543197Z"
                fill="#3C6E71" fill-opacity="0.2" />
        </svg>
    `

    statusDiv.appendChild(button1);
    statusDiv.appendChild(button2);

    textareaDiv.appendChild(textarea);
    constraint.appendChild(wordCountP);
    constraint.appendChild(statusDiv);
    textareaDiv.appendChild(constraint);

    button1.addEventListener('click',function(){
        this.classList.add('checked');
        button2.classList.remove('checked');
        teacherAnswers[index] = "wrong";
    })

    button2.addEventListener('click', function () {
        this.classList.add('checked');
        button1.classList.remove('checked');
        teacherAnswers[index] = "right";
    })

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

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (confirm("do you really want to Submit..?")) {
        let valid = true;
        for (let i = 0; i < totalQuestions; i++) {
            if(teacherAnswers[i] == null){
                valid = false;
                document.getElementById('warning').textContent = "Please Check All questions before submission";
            }
        }

        if (valid) {
            document.getElementById('warning').textContent = "";
            console.log(teacherAnswers);
            let submitData = { ...assignmentData };
            console.log(submitData);
            submitData.questions = submitData.questions.map((question, index) => {
                return { ...question, "status": teacherAnswers[index] };
            });
            console.log(submitData);
            document.getElementById("answer_of_assignment").value = JSON.stringify(submitData);
            this.submit()
        }
    }
    else {
        console.log(userAnswers);
    }
});