const questions = [
  {
    text: "1) En quelle année commence réellement le conflit armé entre la France et le mouvement indépendantiste vietnamien ?",
    type: "single",
    options: ["1939", "1945", "1946", "1950"],
    answer: ["1946"],
  },
  {
    text: "2) Quel mouvement combat principalement les forces françaises pendant la guerre ?",
    type: "single",
    options: ["Le Kuomintang", "Le Viet Minh", "L’OTAN", "L’Armée rouge"],
    answer: ["Le Viet Minh"],
  },
  {
    text: "3) Quel événement de 1945 crée un vide politique en Indochine et favorise les revendications d’indépendance ?",
    type: "single",
    options: [
      "La chute de l’Empire ottoman",
      "La défaite du Japon pendant la Seconde Guerre mondiale",
      "La mort de Staline",
      "La création de l’ONU",
    ],
    answer: ["La défaite du Japon pendant la Seconde Guerre mondiale"],
  },
  {
    text: "4) Quel pays aide financièrement et matériellement la France surtout à partir de 1950 ?",
    type: "single",
    options: ["Le Royaume-Uni", "L’Espagne", "Les États-Unis", "L’Australie"],
    answer: ["Les États-Unis"],
  },
  {
    text: "5) Pourquoi les États-Unis soutiennent-ils la France ?",
    type: "single",
    options: [
      "Pour récupérer des colonies",
      "Pour lutter contre l’expansion du communisme pendant la guerre froide",
      "Pour contrôler le commerce du riz",
      "Pour aider le Japon",
    ],
    answer: ["Pour lutter contre l’expansion du communisme pendant la guerre froide"],
  },
  {
    text: "6) Quel chef incarne la lutte indépendantiste vietnamienne ?",
    type: "single",
    options: ["Mao Zedong", "Hô Chi Minh", "Kim Il-sung", "Tchang Kaï-chek"],
    answer: ["Hô Chi Minh"],
  },
  {
    text: "7) Pourquoi la guerre est-elle difficile pour les soldats français ?",
    type: "single",
    options: [
      "À cause du froid extrême",
      "À cause du désert",
      "À cause de la jungle, du climat et de la guérilla",
      "À cause des combats en mer",
    ],
    answer: ["À cause de la jungle, du climat et de la guérilla"],
  },
  {
    text: "8) Quelle bataille met fin à la guerre en 1954 ?",
    type: "single",
    options: ["La bataille de Verdun", "La bataille de Diên Biên Phu", "La bataille de Séoul", "La bataille d’Alger"],
    answer: ["La bataille de Diên Biên Phu"],
  },
  {
    text: "9) Après 1954, que devient le Vietnam ?",
    type: "single",
    options: [
      "Il reste une colonie française",
      "Il est divisé en deux zones, Nord et Sud",
      "Il devient une seule monarchie",
      "Il est annexé par la Chine",
    ],
    answer: ["Il est divisé en deux zones, Nord et Sud"],
  },
  {
    text: "10) La guerre d’Indochine est souvent considérée comme le début de quel conflit plus large ?",
    type: "single",
    options: ["La guerre de Corée", "La guerre d’Algérie", "La guerre du Vietnam", "La guerre du Golfe"],
    answer: ["La guerre du Vietnam"],
  },
  {
    text: "11) Qui avait le rôle initial de jouer le couple gay dans le groupe ? (2 réponses)",
    type: "multiple",
    options: ["Faiza", "Lois", "Adrien", "Clémence", "Yassine"],
    answer: ["Faiza", "Lois"],
  },
];

const expectedPassword = "indochine";

const form = document.getElementById("quiz-form");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");

const quizPassword = document.getElementById("quiz-password");
const unlockBtn = document.getElementById("unlock-btn");
const lockMessage = document.getElementById("lock-message");
const lockCard = document.getElementById("lock-card");
const lockIcon = document.getElementById("lock-icon");
const unlockNote = document.getElementById("unlock-note");
const quizActions = document.getElementById("quiz-actions");

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function renderQuiz() {
  if (!form) return;
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = q.text;
    fieldset.appendChild(legend);

    q.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = q.type === "multiple" ? "checkbox" : "radio";
      input.name = `question-${index}`;
      input.value = option;

      label.appendChild(input);
      label.append(` ${option}`);
      fieldset.appendChild(label);
    });

    form.appendChild(fieldset);
  });
}

function isQuestionCorrect(question, selectedValues) {
  if (selectedValues.length !== question.answer.length) return false;

  const normalizedSelection = selectedValues.map(normalizeText).sort();
  const normalizedAnswers = question.answer.map(normalizeText).sort();

  return normalizedSelection.every((choice, idx) => choice === normalizedAnswers[idx]);
}

function evaluateQuiz() {
  if (!form || !result) return;
  let score = 0;

  questions.forEach((question, index) => {
    const selected = [...form.querySelectorAll(`input[name="question-${index}"]:checked`)];
    const selectedValues = selected.map((input) => input.value);

    if (isQuestionCorrect(question, selectedValues)) {
      score += 1;
    }
  });

  const percent = Math.round((score / questions.length) * 100);
  result.textContent = `Tu as ${score}/${questions.length} (${percent}%).`;
}

function resetQuiz() {
  if (!form || !result) return;
  form.reset();
  result.textContent = "";
}

function unlockQuiz() {
  if (!quizPassword || !lockMessage || !form || !quizActions || !lockCard || !lockIcon || !unlockNote) return;

  if (normalizeText(quizPassword.value) === expectedPassword) {
    renderQuiz();
    form.classList.remove("hidden");
    quizActions.classList.remove("hidden");
    lockMessage.textContent = "Mot de passe validé.";
    lockMessage.classList.remove("lock-error");
    lockIcon.classList.add("unlocked");
    lockIcon.textContent = "🔓";
    unlockNote.classList.remove("hidden");
  } else {
    lockMessage.textContent = "Mot de passe incorrect. Réessaie.";
    lockMessage.classList.add("lock-error");
    lockCard.classList.add("shake");
    setTimeout(() => lockCard.classList.remove("shake"), 500);
  }
}

const startTrailBtn = document.getElementById("start-trail");
const trailStatus = document.getElementById("trail-status");
const trailData = document.getElementById("trail-data");
const mapsLink = document.getElementById("maps-link");

const trailSteps = [
  {
    name: "Musée de l'Armée, Invalides",
    lat: 48.8566,
    lon: 2.3126,
    doneText: "Étape 1 validée : musée atteint. Passe maintenant à la bibliothèque.",
  },
  {
    name: "Bibliothèque publique d'information (Centre Pompidou)",
    lat: 48.8606,
    lon: 2.3522,
    doneText: "Étape 2 validée : mission terminée. Cherche le livre « De l'Indochine française aux adieux à Saïgon ».",
  },
];

let currentStep = 0;

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const earth = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return earth * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function bearingText(lat1, lon1, lat2, lon2) {
  const y = Math.sin(toRadians(lon2 - lon1)) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(toRadians(lon2 - lon1));
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  const normalized = (brng + 360) % 360;
  const dirs = ["nord", "nord-est", "est", "sud-est", "sud", "sud-ouest", "ouest", "nord-ouest"];
  return dirs[Math.round(normalized / 45) % 8];
}

function updateTrail(position) {
  if (!trailStatus || !trailData || !mapsLink) return;

  const step = trailSteps[currentStep];
  const { latitude, longitude } = position.coords;
  const km = distanceKm(latitude, longitude, step.lat, step.lon);
  const direction = bearingText(latitude, longitude, step.lat, step.lon);

  if (km < 0.25 && currentStep < trailSteps.length - 1) {
    trailStatus.textContent = step.doneText;
    currentStep += 1;
  } else if (km < 0.25) {
    trailStatus.textContent = step.doneText;
  } else {
    trailStatus.textContent = `Position reçue. Étape ${currentStep + 1} en cours.`;
  }

  const activeStep = trailSteps[currentStep];
  const activeKm = distanceKm(latitude, longitude, activeStep.lat, activeStep.lon);
  const activeDirection = bearingText(latitude, longitude, activeStep.lat, activeStep.lon);

  trailData.classList.remove("hidden");
  trailData.innerHTML = `
    <li>Étape actuelle : ${activeStep.name}</li>
    <li>Distance estimée : ${activeKm.toFixed(2)} km</li>
    <li>Direction générale : ${activeDirection}</li>
    <li>Conseil : ouvre l'itinéraire pour un guidage précis rue par rue.</li>
  `;

  mapsLink.href = `https://www.google.com/maps/dir/${latitude},${longitude}/${activeStep.lat},${activeStep.lon}`;
  mapsLink.classList.remove("hidden");
}

function startTrail() {
  if (!trailStatus) return;

  if (!navigator.geolocation) {
    trailStatus.textContent = "La géolocalisation n'est pas disponible sur ton appareil.";
    trailStatus.classList.add("lock-error");
    return;
  }

  trailStatus.classList.remove("lock-error");
  trailStatus.textContent = "Recherche de ta position...";

  navigator.geolocation.watchPosition(
    updateTrail,
    () => {
      trailStatus.textContent = "Impossible d'accéder à la position. Vérifie les autorisations.";
      trailStatus.classList.add("lock-error");
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 12000 },
  );
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

if (startTrailBtn) {
  startTrailBtn.addEventListener("click", startTrail);
}
