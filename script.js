const questions = [
  {
    text: "En quelle année le Vietnam est-il officiellement divisé en deux ?",
    options: ["1945", "1954", "1968"],
    answer: "1954",
  },
  {
    text: "Quelle offensive a marqué un tournant en 1968 ?",
    options: ["L'offensive du Têt", "La bataille de Dien Bien Phu", "L'opération Rolling Thunder"],
    answer: "L'offensive du Têt",
  },
  {
    text: "Quel pays soutient majoritairement le Sud-Vietnam ?",
    options: ["Les États-Unis", "La Chine", "Le Japon"],
    answer: "Les États-Unis",
  },
  {
    text: "Que se passe-t-il en 1975 ?",
    options: ["Début de la guerre", "Accords de Genève", "Chute de Saïgon"],
    answer: "Chute de Saïgon",
  },
  {
    text: "Quel élément a beaucoup influencé l'opinion publique ?",
    options: ["Les jeux vidéo", "Les médias et images de guerre", "Les JO"],
    answer: "Les médias et images de guerre",
  },
];

const form = document.getElementById("quiz-form");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const lockCard = document.getElementById("lock-card");
const quizPassword = document.getElementById("quiz-password");
const unlockBtn = document.getElementById("unlock-btn");
const lockMessage = document.getElementById("lock-message");
const quizActions = document.getElementById("quiz-actions");
const accessCode = "indochine1954";

function renderQuiz() {
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `${index + 1}. ${q.text}`;
    fieldset.appendChild(legend);

    q.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      label.appendChild(input);
      label.append(` ${option}`);
      fieldset.appendChild(label);
    });

    form.appendChild(fieldset);
  });
}

function evaluateQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = form.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score += 1;
    }
  });

  const percent = Math.round((score / questions.length) * 100);
  let message = `Tu as ${score}/${questions.length} (${percent}%).`;

  if (percent === 100) {
    message += " Excellent, tu maîtrises très bien le sujet !";
  } else if (percent >= 60) {
    message += " Bon travail, continue pour consolider les détails.";
  } else {
    message += " Revois les sections contexte et carnet, puis retente le quiz.";
  }

  result.textContent = message;
}

function resetQuiz() {
  form.reset();
  result.textContent = "";
}

function unlockQuiz() {
  if (!quizPassword || !lockMessage || !form || !quizActions || !lockCard) return;

  if (quizPassword.value.trim().toLowerCase() === accessCode) {
    form.classList.remove("hidden");
    quizActions.classList.remove("hidden");
    lockCard.classList.add("hidden");
    lockMessage.textContent = "";
    renderQuiz();
  } else {
    lockMessage.textContent = "Mot de passe incorrect. Réessaie.";
    lockMessage.classList.add("lock-error");
    lockCard.classList.add("shake");
    setTimeout(() => lockCard.classList.remove("shake"), 500);
  }
}

if (form && result && checkBtn && resetBtn && unlockBtn && quizPassword) {
  checkBtn.addEventListener("click", evaluateQuiz);
  resetBtn.addEventListener("click", resetQuiz);
  unlockBtn.addEventListener("click", unlockQuiz);
  quizPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      unlockQuiz();
    }
  });
}
