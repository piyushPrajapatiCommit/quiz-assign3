const questions = [
    {
        q: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text ML",
            "none of the above"
        ],
        answer: 0
    },
    {
        q: "CSS is used for?",
        options: ["Logic", "Styling", "Database","Debugging"],
        answer: 1
    },
    {
        q: "JavaScript is a?",
        options: ["Programming Language", "Framework", "Database","Device"],
        answer: 0
    }
];

// Randomize questions
questions.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let timer;
let timeLeft = new Array(questions.length).fill(10);

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

function loadQuestion() {
    clearInterval(timer);

    const q = questions[current];
    questionEl.innerText = q.q;
    optionsEl.innerHTML = "";
    timerEl.innerText = "Time: " + timeLeft[current];

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });

    updateProgress();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft[current]--;
        timerEl.innerText = "Time: " + timeLeft[current];

        if (timeLeft[current] <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(index) {
    if (index === questions[current].answer) {
        score++;
        scoreEl.innerText = "Score: " + score;
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function prevQuestion() {
    clearInterval(timer);
    if (current > 0) {
        current--;
        loadQuestion();
    }
}

function updateProgress() {
    progressEl.style.width =
        ((current + 1) / questions.length) * 100 + "%";
}

function showResult() {
    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("finalScore").innerText =
        `Your Score: ${score} / ${questions.length}`;

    let high = localStorage.getItem("highScore") || 0;
    if (score > high) {
        localStorage.setItem("highScore", score);
        high = score;
    }

    document.getElementById("highScore").innerText =
        `High Score: ${high}`;
}

function restartQuiz() {
    current = 0;
    score = 0;
    timeLeft = new Array(questions.length).fill(10);
    scoreEl.innerText = "Score: 0";

    document.querySelector(".quiz-container").style.display = "block";
    document.getElementById("resultBox").style.display = "none";
    loadQuestion();
}

loadQuestion();
