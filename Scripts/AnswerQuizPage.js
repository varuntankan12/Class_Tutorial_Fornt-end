const data_of_quiz = (typeof (quizData) == "string" ? JSON.parse(quizData) : quizData);
const requiredTime = (Number.parseInt(timeLimit) * 60);
let remainingTime = requiredTime;
const totalQuestions = Number.parseInt(data_of_quiz.total_questions);

let currentQuestionIndex = 0;
let userAnswers = new Array(data_of_quiz.Total_Questions).fill(null);

setTimeout(() => {
    document.getElementById('quiz_data_container').innerHTML = "";
}, 1000);

console.log(data_of_quiz, requiredTime, totalQuestions);

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

document.addEventListener('DOMContentLoaded', () => {
    screenWidthRestriction();
    loadQuestion(currentQuestionIndex);
});

function loadQuestion(index) {
    const questionData = data_of_quiz.questions[index];
    document.getElementById('question_text').innerHTML = questionData.question;
    document.getElementById("marks").textContent = `${questionData.marks}`;
    const optionsContainer = document.getElementById('options_container');
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.innerHTML = `<span class="radio ${userAnswers[index] === option ? 'checked' : ''}"></span><p>${option}</p>`;
        button.addEventListener('click', () => {
            document.getElementById(`ques-${index + 1}`).classList.add('choosed');
            userAnswers[index] = option;
            loadQuestion(currentQuestionIndex);
            // if (currentQuestionIndex < data_of_quiz.questions.length - 1) {
            //     currentQuestionIndex++;
            //     loadQuestion(currentQuestionIndex);
            // }
            // else {
            //     loadQuestion(currentQuestionIndex);
            // }
        });
        optionsContainer.appendChild(button);
    });

    document.getElementById('ques_num').innerHTML = `Q.${index + 1}`;
    document.getElementById('prev').disabled = index === 0;
    document.getElementById('next').disabled = index === data_of_quiz.questions.length - 1;
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < data_of_quiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

document.getElementById('clear').addEventListener('click', () => {
    document.getElementById(`ques-${currentQuestionIndex + 1}`).classList.remove('choosed');
    userAnswers[currentQuestionIndex] = null;
    loadQuestion(currentQuestionIndex);
});

const totalQuestionsContainer = document.getElementById('total_questions_container');
data_of_quiz.questions.forEach((_, index) => {
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

document.getElementById("quiz_form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (confirm("do you really want to Submit..?")) {
        console.log(userAnswers);
        let check = true;
        if (userAnswers.length < 10) {
            check = false;
        }
        userAnswers.forEach((value, index) => {
            if (value === null) {
                check = false;
            }
        });
        if (check) {
            let submitData = { ...data_of_quiz };
            console.log(submitData);
            submitData.questions = submitData.questions.map((question, index) => {
                return { ...question, "correct_answer": (userAnswers[index] == null ? null : userAnswers[index]),"student_answer":"" };
            });
            console.log(submitData);
            document.getElementById("answer").value = JSON.stringify(submitData);
            this.submit();
        }
        else {
            warning.classList.toggle('hidden-imp');
            warning_data.textContent = "Please, Fill all the answers before submission.";
        }
    }
    else {
        console.log(userAnswers);
    }
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