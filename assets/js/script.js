//imports the cards from file cards.js
import {
    cardArray
} from './cards.js'

//variables
let scoreDisplay = document.getElementById("score");
let matchedDisplay = document.getElementById("matched");
let resultDisplay = document.getElementById("result");
let buttonChange = document.getElementById("reset");
let cardsWon = [];
let cardsFlipped = [];
let cardsFlippedId = [];
let cardScore = [];

/**
 *  adds the cards to the grid to create the game board
 */
function createBoard() {
    
    let grid = document.getElementsByClassName('grid')[0];

    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'assets/images/back.webp');
        card.setAttribute('data-id', i);
        card.setAttribute('alt', 'back');
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }  
}

// shuffles the cards using the Fisher Yates method
// taken from https://www.w3schools.com/js/js_array_sort.asp
for (let i = cardArray.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = cardArray[i];
    cardArray[i] = cardArray[j];
    cardArray[j] = k;
}

/**
 *  checks for matches and updates statistics
 */
function checkCards() {
    
    let cards = document.querySelectorAll('img');
    let cardOne = cardsFlippedId[0];
    let cardTwo = cardsFlippedId[1];

    if (cardsFlipped[0] === cardsFlipped[1]) {
        cards[cardOne].removeEventListener('click', flipCard);
        cards[cardTwo].removeEventListener('click', flipCard);
        cardsWon.push(cardsFlipped);
    } else {
        cards[cardOne].setAttribute('src', 'assets/images/back.webp');
        cards[cardOne].setAttribute('alt', 'back');
        cards[cardTwo].setAttribute('src', 'assets/images/back.webp');
        cards[cardTwo].setAttribute('alt', 'back');
    }
    cardsFlipped = [];
    cardsFlippedId = [];

    scoreDisplay.textContent = cardScore.length / 2;
    matchedDisplay.textContent = cardsWon.length;
    
    checkWon;
}

/**
 *  checks for game being won
 */
function checkWon() {
        
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You matched all the planets!';
        buttonChange.textContent = 'Play Again';
    }
}

/**
 *  flips the cards over
 */
function flipCard() {

    let cardId = this.getAttribute('data-id');

    cardsFlipped.push(cardArray[cardId].name);
    cardsFlippedId.push(cardId);
    cardScore.push(1);
    this.setAttribute('src', cardArray[cardId].img);
    this.setAttribute('alt', cardArray[cardId].name);

    if (cardsFlipped.length === 2) {
        setTimeout(checkCards, 500);
        
    }
}

// waits for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    createBoard();
});