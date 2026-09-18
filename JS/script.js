let dimension = 150;
let imgStart = Math.floor(Math.random() * 100 + 1);
let images = [];

for (let i = 0; i < 8; i++) {
  let url = `https://picsum.photos/id/${imgStart + i}/${dimension}`;

  images.push(url);
}

let cards = [...images, ...images];

function shuffles(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
}

shuffles(cards);
