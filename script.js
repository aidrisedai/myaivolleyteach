// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// ---------- Quiz ----------
const questions = [
  {
    q: "How many players does each team have on the court?",
    options: ["4", "6", "8", "11"],
    answer: 1,
    explain: "Standard indoor volleyball has 6 players per team.",
  },
  {
    q: "What is the maximum number of touches a team can use before returning the ball?",
    options: ["2", "3", "4", "Unlimited"],
    answer: 1,
    explain: "Three touches max — typically pass, set, hit.",
  },
  {
    q: "Which player runs the offense, like a quarterback?",
    options: ["Libero", "Middle blocker", "Setter", "Server"],
    answer: 2,
    explain: "The setter sets up attacks and directs the offense.",
  },
  {
    q: "In the forearm pass (bump), you should mainly use your...",
    options: ["Palms", "Fingertips", "Legs and platform", "Head"],
    answer: 2,
    explain: "Bend your knees and lift with your legs — don't swing your arms.",
  },
  {
    q: "Which offensive system uses a single setter for the whole game?",
    options: ["4-2", "6-2", "5-1", "5-2"],
    answer: 2,
    explain: "The 5-1 uses one setter and is common at higher levels.",
  },
  {
    q: "A points-to-win set is normally played to how many points (win by 2)?",
    options: ["15", "21", "25", "30"],
    answer: 2,
    explain: "Sets go to 25 (must win by 2). A deciding set is often to 15.",
  },
  {
    q: "'Tooling the block' means...",
    options: [
      "Blocking with two hands",
      "Hitting off the blocker's hands to score",
      "Setting a quick ball",
      "Serving underhand",
    ],
    answer: 1,
    explain: "You aim off the blocker's hands so the ball deflects out.",
  },
];

let current = 0;
let score = 0;
let answered = false;
const quizCard = document.getElementById("quizCard");

function renderQuestion() {
  answered = false;
  const item = questions[current];
  quizCard.innerHTML = `
    <p class="quiz__progress">Question ${current + 1} of ${questions.length} · Score: ${score}</p>
    <p class="quiz__q">${item.q}</p>
    <div class="quiz__options">
      ${item.options
        .map(
          (opt, i) =>
            `<button class="quiz__opt" data-i="${i}">${opt}</button>`
        )
        .join("")}
    </div>
    <p class="quiz__feedback" id="feedback"></p>
  `;
  quizCard.querySelectorAll(".quiz__opt").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.i, 10)));
  });
}

function handleAnswer(choice) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = quizCard.querySelectorAll(".quiz__opt");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add("correct");
    if (i === choice && choice !== item.answer) btn.classList.add("wrong");
  });

  const feedback = document.getElementById("feedback");
  if (choice === item.answer) {
    score++;
    feedback.textContent = "✅ Correct! " + item.explain;
    feedback.style.color = "#1b9c8f";
  } else {
    feedback.textContent = "❌ Not quite. " + item.explain;
    feedback.style.color = "#d43a4c";
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "quiz__next";
  nextBtn.textContent = current < questions.length - 1 ? "Next question →" : "See my result";
  nextBtn.addEventListener("click", () => {
    current++;
    if (current < questions.length) renderQuestion();
    else renderResult();
  });
  quizCard.appendChild(nextBtn);
}

function renderResult() {
  const pct = Math.round((score / questions.length) * 100);
  let message;
  if (pct === 100) message = "🏆 Perfect! You know your volleyball.";
  else if (pct >= 70) message = "🔥 Great job — you're getting solid!";
  else if (pct >= 40) message = "👍 Nice start — review the levels and try again.";
  else message = "📚 Keep learning — revisit the Basics and give it another go.";

  quizCard.innerHTML = `
    <div class="quiz__result">
      <h3>Quiz complete!</h3>
      <p class="quiz__score">${score}/${questions.length}</p>
      <p>${message}</p>
      <button class="quiz__next" id="restart">Try again</button>
    </div>
  `;
  document.getElementById("restart").addEventListener("click", () => {
    current = 0;
    score = 0;
    renderQuestion();
  });
}

renderQuestion();
