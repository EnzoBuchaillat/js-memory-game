# js-memory-game

Jeu de Memory en JavaScript natif, sans framework ni dépendance.

**Démo en ligne : [enzobuchaillat.github.io/js-memory-game](https://enzobuchaillat.github.io/js-memory-game/)**

## Principe

Le plateau contient 16 cartes face cachée, soit 8 paires d'images. Le joueur retourne deux cartes par tour : si les images sont identiques, la paire reste visible, sinon les cartes se retournent. La partie est gagnée quand toutes les paires sont trouvées. Le score affiche le nombre de coups et le temps écoulé.

## Technologies

- **HTML5** : structure sémantique (`main`, titres, bouton).
- **CSS3** : plateau en **CSS Grid** (`repeat(4, 1fr)`), cartes carrées avec `aspect-ratio`, barre de stats en Flexbox, adaptation mobile via media query.
- **JavaScript Vanilla ES6** : `const`/`let`, fonctions fléchées, template literals, spread operator, `dataset`, `padStart`.
- **Picsum Photos** : source des images (`https://picsum.photos/id/{id}/150`). Une série de 8 identifiants consécutifs est tirée au hasard à chaque chargement de la page.

## Fonctionnalités

### Mélange Fisher-Yates

Les 8 URLs d'images sont dupliquées avec le spread operator (`[...images, ...images]`), puis le tableau est mélangé avec l'algorithme de Fisher-Yates. Le parcours part de la fin du tableau et échange chaque élément avec un élément d'index aléatoire compris entre 0 et sa position. Chaque permutation a la même probabilité d'apparaître.

### Génération dynamique du plateau

Les cartes sont créées en JavaScript (`document.createElement`). L'URL de l'image est stockée dans un attribut `data-value`, et l'image n'est insérée dans le DOM qu'au moment où la carte est retournée : elle n'est pas visible dans le code HTML avant le clic.

### Accessibilité (A11y / ARIA)

- Chaque carte porte `role="button"` pour être annoncée comme un élément interactif par les lecteurs d'écran.
- `tabindex="0"` place les cartes dans l'ordre de tabulation du clavier.
- Les images révélées ont un attribut `alt`.
- La page est déclarée en français (`lang="fr"`) et la balise `viewport` est présente pour l'affichage mobile.

### Asynchronisme

- **`setInterval`** : le chronomètre incrémente le temps chaque seconde et met à jour l'affichage au format `mm:ss`.
- **`setTimeout`** : en cas d'erreur, les deux cartes restent visibles 800 ms avant d'être retournées.
- Un verrou (`lockBoard`) bloque les clics pendant ce délai pour empêcher de retourner une troisième carte.

### Logique de jeu

- Compteur de coups, incrémenté à chaque paire de cartes retournée.
- Un double clic sur la même carte, ou un clic sur une carte déjà révélée, est ignoré.
- Les paires trouvées sont marquées par un contour vert (classe `matched`).
- Détection de la victoire : le chronomètre s'arrête et le résultat s'affiche.
- Bouton **Rejouer** : vide le plateau, remet les compteurs à zéro, arrête l'ancien intervalle, mélange à nouveau les cartes et relance le chronomètre.

## Structure du projet

```
js-memory-game/
├── index.html
├── CSS/
│   └── style.css
└── JS/
    └── script.js
```

## Lancer le projet en local

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/EnzoBuchaillat/js-memory-game.git
   cd js-memory-game
   ```

2. Ouvrir `index.html` dans un navigateur.

   Le projet n'a aucune dépendance ni étape de build. Pour servir les fichiers via un serveur local, au choix :

   ```bash
   # Python
   python3 -m http.server 8000

   # Node.js
   npx serve .
   ```

   Puis ouvrir `http://localhost:8000` (ou l'adresse indiquée par `serve`). L'extension **Live Server** de VS Code fonctionne aussi.

Une connexion internet est nécessaire pour charger les images depuis Picsum Photos.

## Auteur

Enzo Buchaillat, [@EnzoBuchaillat](https://github.com/EnzoBuchaillat)
