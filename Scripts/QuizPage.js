const data_of_quiz = (typeof (quizData) == "string" ? JSON.parse(quizData) : quizData);
const requiredTime = (Number.parseInt(timeLimit) * 60);
let remainingTime = requiredTime;
const totalQuestions = Number.parseInt(data_of_quiz.total_questions);

let currentQuestionIndex = 0;
let userAnswers = new Array(data_of_quiz.Total_Questions).fill(null);

setTimeout(() => {
    document.getElementById('quiz_data_container').innerHTML = "";
}, 1000);

const warning = document.getElementById('warning_container');
const warning_data = document.getElementById('warning');
const fullscreenModal = document.getElementById('fullscreen_modal');
const confirmFullscreenButton = document.getElementById('confirm_fullscreen');

document.getElementById('exit').addEventListener('click', function (event) {
    event.preventDefault();
    warning.classList.toggle("hidden-imp")
});

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    warning.classList.toggle('hidden-imp');
    warning_data.textContent = "This Feature is not Allowed on This Page."
})



document.addEventListener('DOMContentLoaded', () => {
    // Function to request fullscreen mode
    function enterFullscreen() {
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer.requestFullscreen) {
            quizContainer.requestFullscreen();
        } else if (quizContainer.mozRequestFullScreen) { // Firefox
            quizContainer.mozRequestFullScreen();
        } else if (quizContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
            quizContainer.webkitRequestFullscreen();
        } else if (quizContainer.msRequestFullscreen) { // IE/Edge
            quizContainer.msRequestFullscreen();
        }
    }

    // Function to show warning and re-enter fullscreen
    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            fullscreenModal.classList.toggle("hidden-imp");
            hideData();
        }
    }

    // Show modal to confirm fullscreen mode
    confirmFullscreenButton.addEventListener('click', (event) => {
        event.preventDefault();
        fullscreenModal.classList.add("hidden-imp");
        loadQuestion(currentQuestionIndex);
        enterFullscreen();
    });

    // Add event listener for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    screenWidthRestriction();
    startTimer();
    loadQuestion(currentQuestionIndex);
});

document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.key === 'I') {
        event.preventDefault();
        warning.classList.toggle('hidden-imp');
        warning_data.textContent = "You are Not allowed to open Inspect Tool.";
    }
});

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimerDisplay();
        } else if (remainingTime === 0) {
            clearInterval(timerInterval);
            const form = document.getElementById("quiz_form");
            let submitData = { ...data_of_quiz };
            submitData.questions = submitData.questions.map((question, index) => {
                return { ...question, "student_answer": (userAnswers[index] == null ? null : userAnswers[index]) };
            });
            console.log(submitData);
            document.getElementById("answer").value = JSON.stringify(submitData);
            form.submit();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    document.getElementById('hour').textContent = `${hours < 10 ? '0' : ''}${hours}`;
    document.getElementById('min').textContent = `${minutes < 10 ? '0' : ''}${minutes}`;
    document.getElementById('sec').textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
}

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

function hideData() {
    document.getElementById('question_text').innerHTML = "This is a Sample Question and there is only sample options.";
    document.getElementById('options_container').innerHTML = `<button><span class="radio"></span><p>Sample Option</p></button><button><span class="radio"></span><p>Sample Option</p></button><button><span class="radio"></span><p>Sample Option</p></button><button><span class="radio"></span><p>Sample Option</p></button>`;
}

document.getElementById("quiz_form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (confirm("do you really want to Submit..?")) {
        console.log(userAnswers);
        let submitData = { ...data_of_quiz };
        console.log(submitData);
        submitData.questions = submitData.questions.map((question, index) => {
            return { ...question, "student_answer": (userAnswers[index] == null ? null : userAnswers[index]) };
        });
        console.log(submitData);
        document.getElementById("answer").value = JSON.stringify(submitData);
        this.submit();
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