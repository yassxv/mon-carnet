const decoderQuestions = [
  {
    question: "Qui formait le couple gay lorsque le projet sur les homosexuels était lancé ?",
    expectedAnswer: "timothee et noam",
    letterIndex: 1,
  },
  {
    question: "Nom du conflit étudié dans ce carnet ?",
    expectedAnswer: "indochine",
    letterIndex: 3,
  },
  {
    question: "Format final visé pour présenter la recherche ?",
    expectedAnswer: "theatre",
    letterIndex: 2,
  },
];

const questions = [
  {
    text: "Quel est l'objectif principal de ce carnet ?",
    options: [
      "Préparer une pièce de théâtre sérieuse sur l'Indochine",
      "Faire un résumé sans sources",
      "Comparer des jeux vidéo historiques",
    ],
    answer: "Préparer une pièce de théâtre sérieuse sur l'Indochine",
  },
  {
    text: "Pourquoi faut-il croiser les témoignages avec des archives ?",
    options: [
      "Pour supprimer les points de vue personnels",
      "Pour vérifier les faits et éviter les erreurs d'interprétation",
      "Pour raccourcir le carnet",
    ],
    answer: "Pour vérifier les faits et éviter les erreurs d'interprétation",
  },
  {
    text: "Quel tournant majeur de 1954 est étudié ?",
    options: ["Le débarquement de Normandie", "Dien Bien Phu", "La chute de Saïgon"],
    answer: "Dien Bien Phu",
  },
];

const expectedPassword = "scene";

const form = document.getElementById("quiz-form");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");

const decoderForm = document.getElementById("decoder-form");
const decodeBtn = document.getElementById("decode-btn");
const decoderMessage = document.getElementById("decoder-message");
const lockCard = document.getElementById("lock-card");

const quizPassword = document.getElementById("quiz-password");
const unlockBtn = document.getElementById("unlock-btn");
const lockMessage = document.getElementById("lock-message");
const quizActions = document.getElementById("quiz-actions");

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function renderDecoder() {
  if (!decoderForm) return;

  decoderForm.innerHTML = "";
  decoderQuestions.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "decoder-row";

    const label = document.createElement("label");
    label.className = "decoder-label";
    label.setAttribute("for", `decoder-${index}`);
    label.textContent = `${index + 1}. ${item.question} (prends la lettre n°${item.letterIndex})`;

    const input = document.createElement("input");
    input.id = `decoder-${index}`;
    input.type = "text";
    input.placeholder = "Ta réponse";

    row.appendChild(label);
    row.appendChild(input);
    decoderForm.appendChild(row);
  });
}

function decodePassword() {
  if (!decoderForm || !decoderMessage || !lockCard) return;

  const letters = [];
  let allCorrect = true;

  decoderQuestions.forEach((item, index) => {
    const input = document.getElementById(`decoder-${index}`);
    const answer = normalizeText(input?.value || "");
    const expected = normalizeText(item.expectedAnswer);

    if (answer !== expected) {
      allCorrect = false;
      return;
    }

    letters.push(expected[item.letterIndex - 1] || "");
  });

  if (!allCorrect || letters.join("") !== expectedPassword) {
    decoderMessage.textContent = "Certaines réponses ne correspondent pas. Réessaie.";
    decoderMessage.classList.add("lock-error");
    return;
  }

  decoderMessage.classList.remove("lock-error");
  decoderMessage.textContent = `Bravo ! Mot de passe trouvé : ${expectedPassword.toUpperCase()}`;
  lockCard.classList.remove("hidden");
}

function renderQuiz() {
  if (!form) return;
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
  if (!form || !result) return;
  let score = 0;

  questions.forEach((q, index) => {
    const selected = form.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && selected.value === q.answer) {
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
  if (!quizPassword || !lockMessage || !form || !quizActions || !lockCard) return;

  if (normalizeText(quizPassword.value) === expectedPassword) {
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

const startTrailBtn = document.getElementById("start-trail");
const trailStatus = document.getElementById("trail-status");
const trailData = document.getElementById("trail-data");
const mapsLink = document.getElementById("maps-link");

const museum = {
  name: "Musée de l'Armée, Invalides",
  lat: 48.8566,
  lon: 2.3126,
};

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

  const { latitude, longitude } = position.coords;
  const km = distanceKm(latitude, longitude, museum.lat, museum.lon);
  const direction = bearingText(latitude, longitude, museum.lat, museum.lon);

  trailStatus.textContent = "Position reçue. Guidage mis à jour.";
  trailData.classList.remove("hidden");
  trailData.innerHTML = `
    <li>Destination : ${museum.name}</li>
    <li>Distance estimée : ${km.toFixed(2)} km</li>
    <li>Direction générale : ${direction}</li>
    <li>Conseil : ouvre l'itinéraire pour un guidage précis rue par rue.</li>
  `;

  mapsLink.href = `https://www.google.com/maps/dir/${latitude},${longitude}/${museum.lat},${museum.lon}`;
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

if (decoderForm && decodeBtn) {
  renderDecoder();
  decodeBtn.addEventListener("click", decodePassword);
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
