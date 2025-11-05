// Mock data for now — will be replaced with database data later
const quizData = [
  {
    question: "Which planet is the setting for the Stormlight Archive?",
    options: ["Scadrial", "Roshar", "Nalthis", "Sel"],
    answer: "Roshar"
  },
  {
    question: "What is the primary magic system on Scadrial?",
    options: ["AonDor", "Allomancy", "Surgebinding", "Awakening"],
    answer: "Allomancy"
  },
  {
    question: "Which character is known as the Survivor of Hathsin?",
    options: ["Kaladin", "Kelsier", "Dalinar", "Vasher"],
    answer: "Kelsier"
  },
  {
    question: "What substance fuels most magic in the Cosmere?",
    options: ["Investiture", "Stormlight", "Lerasium", "Shadesmar Essence"],
    answer: "Investiture"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function startQuiz() {
  showQuestion();
}

function showQuestion() {
  const current = quizData[currentQuestionIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(option, current.answer));
    optionsEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(selected, correct) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "linear-gradient(45deg, #6aff00, #2ecc71)";
    } else if (btn.textContent === selected) {
      btn.style.background = "linear-gradient(45deg, #ff4d4d, #cc0000)";
    }
  });

  if (selected === correct) score++;
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = "Quiz Complete!";
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  resultEl.textContent = `You got ${score} out of ${quizData.length} correct!`;
  resultEl.classList.remove("hidden");
}

startQuiz();
