// waits for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    createGame();
})

// add cards (need 2 of each card)
const cardArray = [
    {
        name: 'mercury',
        img: 'assets/images/mercury.webp'
    },
    {
        name: 'mercury',
        img: 'assets/images/mercury.webp'
    },
    {
        name: 'venus',
        img: 'assets/images/venus.webp'
    },
    {
        name: 'venus',
        img: 'assets/images/venus.webp'
    },
    {
        name: 'earth',
        img: 'assets/images/earth.webp'
    },
    {
        name: 'earth',
        img: 'assets/images/earth.webp'
    },
    {
        name: 'mars',
        img: 'assets/images/mars.webp'
    },
    {
        name: 'mars',
        img: 'assets/images/mars.webp'
    },
    {
        name: 'jupiter',
        img: 'assets/images/jupiter.webp'
    },
    {
        name: 'jupiter',
        img: 'assets/images/jupiter.webp'
    },
    {
        name: 'saturn',
        img: 'assets/images/saturn.webp'
    },
    {
        name: 'saturn',
        img: 'assets/images/saturn.webp'
    },
    {
        name: 'uranus',
        img: 'assets/images/uranus.webp'
    },
    {
        name: 'uranus',
        img: 'assets/images/uranus.webp'
    },
    {
        name: 'neptune',
        img: 'assets/images/neptune.webp'
    },
    {
        name: 'neptune',
        img: 'assets/images/neptune.webp'
    },
];

/**
 *  adds the cards to the grid to create the game board
 */
function createGame() {
    
    let grid = document.getElementsByClassName('grid')[0];

    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'assets/images/back.webp');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }  
}

// shuffles the cards using the Fisher Yates method
// taken from https://www.w3schools.com/js/js_array_sort.asp
for (let i = cardArray.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = cardArray[i]
    cardArray[i] = cardArray[j]
    cardArray[j] = k
}

/**
 *  checks for matches
 */
function checkCards() {
    
    let cards = document.querySelectorAll('img');
    let cardOne = cardsFlippedId[0];
    let cardTwo = cardsFlippedId[1];

    if (cardsFlipped[0] !== cardsFlipped[1]) {
        cards[cardOne].setAttribute('src', 'assets/images/back.webp');
        cards[cardTwo].setAttribute('src', 'assets/images/back.webp');
    } else {
        cards[cardOne].removeEventListener('click', flipCard);
        cards[cardTwo].removeEventListener('click', flipCard);
    }
    cardsFlipped = [];
    cardsFlippedId = [];
}

let cardsFlipped = [];
let cardsFlippedId = [];
/**
 *  flips the cards over
 */
function flipCard() {

    let cardId = this.getAttribute('data-id');

    cardsFlipped.push(cardArray[cardId].name);
    cardsFlippedId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsFlipped.length === 2) {
        setTimeout(checkCards, 500);
    }
}