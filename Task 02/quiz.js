const questions = [
  {
    question: "How often do you exercise weekly?",
    options: [
      "3 times or more per week",
      "1 or 2 times per week",
      "Less than 4 times per month",
      "I don’t practise sport during the month"
    ],
    answer: 0
  },
  {
    question: "How many hours of sleep do you get on average?",
    options: ["Less than 5", "5-6", "7-8", "More than 8"],
    answer: 2
  },
  {
    question: "How many glasses of water do you drink daily?",
    options: ["1-2", "3-4", "5-6", "More than 6"],
    answer: 3
  },
  {
    question: "How do you usually commute?",
    options: ["Car", "Public Transport", "Bike/Walk", "Work from Home"],
    answer: 2
  },
  {
    question: "Do you take breaks during work?",
    options: [
      "Every hour",
      "Every 2-3 hours",
      "Only lunch break",
      "No breaks"
    ],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionCountText = document.querySelector('.question-count');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.options');
const nextButton = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress-bar');

function loadQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;
  questionCountText.textContent = `Question ${index + 1}/${questions.length}`;
  progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

  optionContainer.innerHTML = ''; 

  q.options.forEach((optionText, i) => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.textContent = `${String.fromCharCode(65 + i)}. ${optionText}`;
    btn.addEventListener('click', () => {
      
      document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');

      
      if (i === q.answer) {
        btn.dataset.correct = true;
      } else {
        btn.dataset.correct = false;
      }
    });
    optionContainer.appendChild(btn);
  });
}

nextButton.addEventListener('click', () => {
  const selected = document.querySelector('.option.selected');

  if (!selected) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (selected.dataset.correct === "true") {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector('.quiz-container').innerHTML = `
    <div class="result">
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} / ${questions.length}</p>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

loadQuestion(currentQuestionIndex);
