const questions = [
  {
    id: "q8",
    text: "Quelle bataille marque la fin de la guerre en 1954 ?",
    type: "single",
    options: ["La bataille de Verdun", "La bataille de Diên Biên Phu", "La bataille de Séoul", "La bataille d’Alger"],
    answer: ["La bataille de Diên Biên Phu"],
  },
  {
    id: "q3",
    text: "Quel événement de 1945 crée un vide politique en Indochine et favorise les revendications d’indépendance ?",
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
    id: "q10",
    text: "La guerre d’Indochine est souvent considérée comme l’amorce de quel conflit plus large ?",
    type: "single",
    options: ["La guerre de Corée", "La guerre d’Algérie", "La guerre du Vietnam", "La guerre du Golfe"],
    answer: ["La guerre du Vietnam"],
  },
  {
    id: "q1",
    text: "En quelle année le conflit armé entre la France et le mouvement indépendantiste vietnamien commence-t-il réellement ?",
    type: "single",
    options: ["1939", "1945", "1946", "1950"],
    answer: ["1946"],
  },
  {
    id: "q6",
    text: "Quelle figure politique symbolise la lutte indépendantiste vietnamienne ?",
    type: "single",
    options: ["Mao Zedong", "Hô Chi Minh", "Kim Il-sung", "Tchang Kaï-chek"],
    answer: ["Hô Chi Minh"],
  },
  {
    id: "q4",
    text: "À partir de 1950, quel pays soutient massivement la France sur le plan financier et matériel ?",
    type: "single",
    options: ["Le Royaume-Uni", "L’Espagne", "Les États-Unis", "L’Australie"],
    answer: ["Les États-Unis"],
  },
  {
    id: "q9",
    text: "Que devient le Vietnam après les accords de 1954 ?",
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
    id: "q2",
    text: "Quel mouvement affronte principalement les forces françaises pendant la guerre d'Indochine ?",
    type: "single",
    options: ["Le Kuomintang", "Le Viet Minh", "L’OTAN", "L’Armée rouge"],
    answer: ["Le Viet Minh"],
  },
  {
    id: "q7",
    text: "Pourquoi cette guerre est-elle particulièrement difficile pour les soldats français ?",
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
    id: "q5",
    text: "Pourquoi les États-Unis soutiennent-ils la France dans ce conflit ?",
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
    id: "q11",
    text: "Qui avait initialement le rôle de jouer le couple gay dans le groupe ? (2 réponses)",
    type: "multiple",
    options: ["Faiza", "Lois", "Adrien", "Clémence", "Yassine"],
    answer: ["Yassine", "Adrien"],
  },
];

const rewardCode = "DIEN1954";
const codeHints = [
  "Case 1 : mets la lettre n°1 du mot <strong>Diên</strong> (bonne réponse de la question sur la bataille finale).",
  "Case 2 : mets la lettre n°2 du mot <strong>VIet</strong> (bonne réponse sur le mouvement qui combat la France).",
  "Case 3 : mets la lettre n°2 du mot <strong>dÉfaite</strong> (bonne réponse sur l’événement de 1945).",
  "Case 4 : mets la lettre n°1 du mot <strong>Nord</strong> (bonne réponse sur le Vietnam après 1954).",
  "Case 5 : mets le chiffre n°1 de la réponse <strong>1946</strong> (question sur le début du conflit).",
  "Case 6 : mets le chiffre n°2 de la réponse <strong>1946</strong>.",
  "Case 7 : mets le chiffre n°3 de <strong>1954</strong> (dans la question sur la fin de la guerre).",
  "Case 8 : mets le chiffre n°4 de <strong>1954</strong>.",
];

const form = document.getElementById("quiz-form");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");

const codePanel = document.getElementById("code-panel");
const codeSlots = document.getElementById("code-slots");
const decodeSteps = document.getElementById("decode-steps");
const lockCodeInput = document.getElementById("lock-code");
const unlockLockBtn = document.getElementById("unlock-lock-btn");
const lockMessage = document.getElementById("lock-message");
const lockIcon = document.getElementById("lock-icon");
const unlockNote = document.getElementById("unlock-note");

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
    fieldset.className = "quiz-card";

    const legend = document.createElement("legend");
    legend.innerHTML = `<span class="question-index">${index + 1}</span> ${q.text}`;
    fieldset.appendChild(legend);

    q.options.forEach((option) => {
      const label = document.createElement("label");
      label.className = "quiz-option";

      const input = document.createElement("input");
      input.type = q.type === "multiple" ? "checkbox" : "radio";
      input.name = `question-${index}`;
      input.value = option;

      const optionText = document.createElement("span");
      optionText.textContent = option;

      label.appendChild(input);
      label.appendChild(optionText);
      fieldset.appendChild(label);
    });

    form.appendChild(fieldset);
  });
}

function renderCodeHints() {
  if (!codeSlots || !decodeSteps) return;

  codeSlots.innerHTML = rewardCode
    .split("")
    .map((_, index) => `<span class="code-slot">${index + 1}</span>`)
    .join("");

  decodeSteps.innerHTML = codeHints.map((hint) => `<li>${hint}</li>`).join("");
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
  result.textContent = `Résultat : ${score}/${questions.length} (${percent}%).`;

  if (score === questions.length && codePanel) {
    codePanel.classList.remove("hidden");
    renderCodeHints();
  } else if (codePanel) {
    codePanel.classList.add("hidden");
    if (lockMessage) lockMessage.textContent = "";
    if (unlockNote) unlockNote.classList.add("hidden");
    if (lockIcon) {
      lockIcon.classList.remove("unlocked");
      lockIcon.textContent = "🔒";
    }
  }
}

function resetQuiz() {
  if (!form || !result) return;
  form.reset();
  result.textContent = "";
  if (codePanel) codePanel.classList.add("hidden");
  if (lockCodeInput) lockCodeInput.value = "";
  if (lockMessage) lockMessage.textContent = "";
  if (unlockNote) unlockNote.classList.add("hidden");
  if (lockIcon) {
    lockIcon.classList.remove("unlocked");
    lockIcon.textContent = "🔒";
  }
}

function unlockKnowledgeLock() {
  if (!lockCodeInput || !lockMessage || !lockIcon || !unlockNote || !codePanel) return;

  if (normalizeText(lockCodeInput.value) === normalizeText(rewardCode)) {
    lockMessage.textContent = "Code validé : cadenas déverrouillé.";
    lockMessage.classList.remove("lock-error");
    codePanel.classList.add("opened");
    lockIcon.classList.add("unlocked");
    lockIcon.textContent = "🔓";
    unlockNote.classList.remove("hidden");
  } else {
    lockMessage.textContent = "Code incorrect. Reprends les consignes du quiz puis réessaie.";
    lockMessage.classList.add("lock-error");
    codePanel.classList.add("shake");
    setTimeout(() => codePanel.classList.remove("shake"), 500);
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

if (form && result && checkBtn && resetBtn) {
  renderQuiz();
  checkBtn.addEventListener("click", evaluateQuiz);
  resetBtn.addEventListener("click", resetQuiz);
}

if (unlockLockBtn && lockCodeInput) {
  unlockLockBtn.addEventListener("click", unlockKnowledgeLock);
  lockCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      unlockKnowledgeLock();
    }
  });
}

if (startTrailBtn) {
  startTrailBtn.addEventListener("click", startTrail);
}
