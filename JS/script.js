/**
 * On déclare la dimension des images à 150
 * on déclare un chiffre imgStart entre 1 et 100
 * on déclare un tableau vide où sera stocker les urls des images
 */
let dimension = 150;
let imgStart = Math.floor(Math.random() * 100 + 1);
let images = [];

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
let cards = [...images, ...images];

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
  const element = document.createAttribute(balise);
  if (classes) {
    element.className = classes;
  }
  return element;
}

/**
 * Fonction qui initialise une partie de memory
 */
function initGame() {
  shuffles(cards);

  /**
   * Créer un div avec la classe card pour chaque éléments du tableau cards
   */
  cards.forEach(creerElement("div", "card"));
}

initGame();
