let current = "";
let xp = 0;
let correctCount = 0;
let wrongCount = 0;
let stars = [];

function start() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  next();
}

function pick() {
  current = WORDS[Math.floor(Math.random() * WORDS.length)];
  document.getElementById("card").innerText = current;
}

function next() {
  pick();
  updateStats();
}

function correct() {
  xp += 10;
  correctCount++;
  next();
}

function wrong() {
  xp = Math.max(0, xp - 2);
  wrongCount++;
  next();
}

function star() {
  if (!stars.includes(current)) stars.push(current);
  xp += 2;
  updateStats();
}

function updateStats() {
  document.getElementById("stats").innerText =
    `XP: ${xp} | ✔ ${correctCount} ✘ ${wrongCount} | ⭐ ${stars.length}`;
}

updateStats();
