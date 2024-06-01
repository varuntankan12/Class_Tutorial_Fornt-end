const student_quiz_data = (typeof (studentQuizData) == "string" ? JSON.parse(studentQuizData) : studentQuizData);
const teacher_quiz_data = (typeof (teacherQuizData) == "string" ? JSON.parse(teacherQuizData) : teacherQuizData);

const totalQuestions = Number.parseInt(student_quiz_data.total_questions);

let currentQuestionIndex = 0;
let userAnswers = new Array(student_quiz_data.Total_Questions).fill(null);

setTimeout(() => {
    document.getElementById('quiz_data_container').innerHTML = "";
}, 1000);

console.log(student_quiz_data, totalQuestions);

const warning = document.getElementById('warning_container');
const warning_data = document.getElementById('warning');

document.getElementById('exit').addEventListener('click', function () {
    warning.classList.toggle("hidden-imp")
});

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    warning.classList.toggle('hidden-imp');
    warning_data.textContent = "This Feature is not Allowed on This Page."
})

document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.key === 'I') {
        event.preventDefault();
        warning.classList.toggle('hidden-imp');
        warning_data.textContent = "You are Not allowed to open Inspect Tool.";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    screenWidthRestriction();
    let Result = findStudentMarks();
    console.log(Result);
    setTimeout(() => {
        document.getElementById("student_marks").textContent = Result.obtained;
        document.getElementById("total_marks").textContent = Result.total;
    }, 500);
    loadQuestion(currentQuestionIndex);
});

function findStudentMarks() {
    let totalMarks = 0;
    let studentMark = 0;
    student_quiz_data.questions.forEach((question,index) => {
        const correct_question = teacher_quiz_data.questions[index];
        totalMarks = totalMarks + Number.parseInt(question.marks);
        if (correct_question.correct_answer == '' || correct_question.correct_answer == null || correct_question.correct_answer == undefined) {
            warning.classList.toggle('hidden-imp');
            warning_data.textContent = "Complete Result is not declaired yet."
            return { total: 0, obtained: 0 };
        }
        else if (question.student_answer == correct_question.correct_answer) {
            studentMark = studentMark + Number.parseInt(question.marks);
        }
    });

    return { total: totalMarks, obtained: studentMark };
}

function loadQuestion(index) {
    const questionData = student_quiz_data.questions[index];
    const correctQuestionData = teacher_quiz_data.questions[index];
    document.getElementById('question_text').innerHTML = questionData.question;
    const optionsContainer = document.getElementById('options_container');
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, i) => {
        const button = document.createElement('button');
        { (questionData.student_answer == option && correctQuestionData.correct_answer != '') ? ((questionData.student_answer == correctQuestionData.correct_answer) ? button.classList.add("right") : button.classList.add("wrong")) : "" };
        button.innerHTML = `<span class="radio ${questionData.student_answer == option ? 'checked' : ''}"></span><p>${option}</p><p class="end">${questionData.student_answer == option ? (questionData.student_answer == correctQuestionData.correct_answer ? "+" + questionData.marks : "+0") : ""}</p>`;
        optionsContainer.appendChild(button);
    });

    document.getElementById('ques_num').innerHTML = `Q.${index + 1}`;
    document.getElementById('prev').disabled = index === 0;
    document.getElementById('next').disabled = index === student_quiz_data.questions.length - 1;
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < student_quiz_data.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

const totalQuestionsContainer = document.getElementById('total_questions_container');
student_quiz_data.questions.forEach((_, index) => {
    const span = document.createElement('span');
    span.classList.add('question-number');
    span.id = `ques-${index + 1}`;
    span.textContent = index + 1;
    span.addEventListener('click', () => {
        currentQuestionIndex = index;
        loadQuestion(index);
    });
    totalQuestionsContainer.appendChild(span);
});

function screenWidthRestriction() {
    if (window.outerWidth < 900) {
        const clonewarning = warning.cloneNode(true);
        const warning_contnet = clonewarning.querySelector('p');
        let body = document.getElementById("quiz-container");
        clonewarning.classList.remove('hidden-imp');
        warning_contnet.textContent = "This Page cannot be opened in this Device, Please use a Laptop or a Desktop to continue.";
        body.innerHTML = "";
        body.appendChild(clonewarning);
    }
}