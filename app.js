let WORDS = JSON.parse(localStorage.getItem("words") || "[]");

let current = "";
let xp = 0;
let correctCount = 0;
let wrongCount = 0;
let stars = [];

let started = false;

function start() {
  started = true;
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  next();
}

/* =========================
   CORE GAME LOGIC
========================= */

function pick() {
  if (!WORDS || WORDS.length === 0) {
    document.getElementById("card").innerText = "NO WORDS LOADED";
    return;
  }

  current = WORDS[Math.floor(Math.random() * WORDS.length)];
  document.getElementById("card").innerText = current;
}

function next() {
  pick();
  updateStats();
}

/* =========================
   ACTIONS
========================= */

function correct() {
  if (!started) return;

  xp += 10;
  correctCount++;
  next();
}

function wrong() {
  if (!started) return;

  xp = Math.max(0, xp - 2);
  wrongCount++;
  next();
}

function star() {
  if (!started) return;

  if (!stars.includes(current)) stars.push(current);
  xp += 2;

  save();
  updateStats();
}

function skip() {
  if (!started) return;
  next();
}

/* =========================
   STATS
========================= */

function updateStats() {
  const stats = document.getElementById("stats");
  if (!stats) return;

  stats.innerText =
    `XP: ${xp} | ✔ ${correctCount} ✘ ${wrongCount} | ⭐ ${stars.length} | Words: ${WORDS.length}`;
}

/* =========================
   STORAGE SYSTEM
========================= */

function saveWords() {
  localStorage.setItem("words", JSON.stringify(WORDS));
  localStorage.setItem("stars", JSON.stringify(stars));
}

/* =========================
   IMPORT SYSTEM (FIXED)
========================= */

function importFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;

    let newWords = text
      .toUpperCase()
      .split(/\r?\n/)
      .map(w => w.trim())
      .map(w => w.replace(/[^A-Z]/g, ""))
      .filter(w => w.length === 5);

    WORDS = [...WORDS, ...newWords];
    WORDS = [...new Set(WORDS)];

    saveWords();
    updateStats();

    alert(`Imported ${newWords.length} words`);
  };

  reader.readAsText(file);
}

/* =========================
   MANUAL INPUT (OPTIONAL)
========================= */

function addManualWords() {
  const text = document.getElementById("manual").value;

  let newWords = text
    .toUpperCase()
    .split(/\n/)
    .map(w => w.trim())
    .map(w => w.replace(/[^A-Z]/g, ""))
    .filter(w => w.length === 5);

  WORDS = [...WORDS, ...newWords];
  WORDS = [...new Set(WORDS)];

  saveWords();
  updateStats();

  document.getElementById("manual").value = "";

  alert(`Added ${newWords.length} words`);
}

/* =========================
   INIT
========================= */

updateStats();
