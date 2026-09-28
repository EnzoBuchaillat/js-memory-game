/**
 * On déclare la dimension des images à 150
 * on déclare un chiffre imgStart entre 1 et 100
 * on déclare un tableau vide où sera stocker les urls des images
 * on déclare un conteneurJeu qui selectionne la div qui à comme id "game-board"
 */
const dimension = 150;
let imgStart = Math.floor(Math.random() * 100 + 1);
let images = [];
let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
const conteneurJeu = document.querySelector("#game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

/**
 * On fait une boucle qui va créer 8 url d'images via des lien picsum.photos
 * et on range ces urls dans le tableau images qu'on à créer en amont
 */
for (let i = 0; i < 8; i++) {
  let url = `https://picsum.photos/id/${imgStart + i}/${dimension}`;

  images.push(url);
}

/**
 * On créer un tableau cards où l'on va stocker les urls d'images en dupliquant pour avoir les photos en doubles pour notre memory
 */
const cards = [...images, ...images];

/**
 * Fonction qui va venir mélanger notre tableau d'élément avec la méthode Fisher Yates
 * @param {*} array un tableau d'éléments
 */
function shuffles(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
}

/**
 * Fonction qui va créer un élément via une balise et une classe en paramètre
 * @param {*} balise balise que l'on veut créer (div, h1, p...)
 * @param {*} classes classe que l'on veut ajouter à notre element créer
 * @returns un nouvelle élément avec sa classe si il y'en à une en paramètre
 */
function creerElement(balise, classes) {
  const element = document.createElement(balise);
  if (classes) {
    element.className = classes;
  }
  return element;
}

function revealCard(card) {
  const img = document.createElement("img");
  img.src = card.dataset.value;
  img.alt = "Image de mémoire";
  card.appendChild(img);
}

function checkMath() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();
    checkVictory();
  } else {
    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkVictory() {
  if (matchedCount === cards.length) {
    stopTimer();
    resultDisplay.textContent = `Victoire ! Coups : ${moves} | Temps :
${formatTime(seconds)}`;
  }
}
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Temps : ${formatTime(seconds)}`;
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
}
function formatTime(sec) {
  const min = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${min}:${s}`;
}
// Liaisons finales
restartBtn.addEventListener("click", initGame);

/**
 * Vérifie si le plateau n'est pas vérouillez, si la carte n'est pas cliqué 2 fois et si la carte n'est pas déjà retourner
 * @param {*} card Une carte de jeu
 * @returns passe à la suite si vraie
 */
function handleCardClick(card) {
  if (lockBoard == true) {
    return;
  }

  if (card.querySelector("img")) {
    return;
  }

  if (card === firstCard) {
    return;
  }

  revealCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  lockBoard = true;
  moves++;
  movesDisplay.textContent = `Coups : ${moves}`;
  checkMath();
}

/**
 * Fonction qui initialise une partie de memory
 */
function initGame() {
  conteneurJeu.innerHTML = "";
  resultDisplay.textContent = "";
  moves = 0;
  matchedCount = 0;
  seconds = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  movesDisplay.textContent = `Coups : ${moves}`;
  timerDisplay.textContent = `Temps : 00:00`;

  shuffles(cards);
  cards.forEach((imgUrl) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.dataset.value = imgUrl;
    conteneurJeu.appendChild(card);
    card.addEventListener("click", () => handleCardClick(card));
  });
  clearInterval(timerInterval);
  startTimer();
}

initGame();
