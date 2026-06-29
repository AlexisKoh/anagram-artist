let WORDS = JSON.parse(localStorage.getItem("words")) || [];
function saveWords() {
  localStorage.setItem("words", JSON.stringify(WORDS));
}
function importFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const text = e.target.result;

    const newWords = text
      .toUpperCase()
      .split("\n")
      .map(w => w.trim())
      .filter(w => /^[A-Z]{5}$/.test(w));

    WORDS.push(...newWords);
    WORDS = [...new Set(WORDS)];

    saveWords();
    alert("Imported " + newWords.length + " words!");
  };

  reader.readAsText(file);
}
function addManual() {
  const text = document.getElementById("manual").value;

  const newWords = text
    .toUpperCase()
    .split("\n")
    .map(w => w.trim())
    .filter(w => /^[A-Z]{5}$/.test(w));

  WORDS.push(...newWords);
  WORDS = [...new Set(WORDS)];

  saveWords();

  document.getElementById("manual").value = "";
  alert("Added " + newWords.length + " words!");
}
