const cards = [];
const colors = ["#00a4ff", "#740032", "#785eea", "#f7cd21", "#ffabb5"];
const classNames = ["king", "queen", "rook", "bishop", "knight", "pawn"];

// Global variables to store our browser's window size
let browserWidth;
let browserHeight;

// Specify the number of cards you want visible
var numberOfCards = 6;

// Flag to reset the position of the cards
let resetPosition = false;

// Handle accessibility
var enableAnimations = false;
var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

// Handle animation accessibility preferences
function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
        enableAnimations = false;
    } else {
        enableAnimations = true;
    }
}
setAccessibilityState();

reduceMotionQuery.addListener(setAccessibilityState);

//
// It all starts here...
//
function renderCards() {
    if (enableAnimations) {
        window.addEventListener("DOMContentLoaded", generateCards, false);
        window.addEventListener("resize", setResetFlag, false);
    }
}

function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

// Trigger a reset of all the cards' positions
//
function setResetFlag(e) {
    resetPosition = true;
}

// Card constructor
function Card(element, speed, xPos, yPos) {
    // set initial card properties
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;

    // declare variables used for card's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

    // declare variables used for cards's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;
}

// Update instance function
Card.prototype.update = function () {
    // using some trigonometry to determine our x and y position
    this.counter += this.speed / 5000;
    this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
    this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

    // setting our card's position
    setTransform(
        Math.round(this.xPos),
        Math.round(this.yPos),
        this.scale,
        this.element,
    );

    // if card goes below the browser window, move it back to the top
    if (this.yPos > browserHeight) {
        this.yPos = -200;
    }
};

function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

//
// Responsible for moving each card by calling its update function
//
function moveCards() {
    if (enableAnimations) {
        for (const card of cards) {
            card.update();
        }
    }

    // Reset the position of all the cards to a new value
    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        for (let card of cards) {
            card.xPos = getPosition(50, browserWidth);
            card.yPos = getPosition(50, browserHeight);
        }

        resetPosition = false;
    }

    requestAnimationFrame(moveCards);
}

function generateCards() {
    // get our card element from the DOM and store it
    let originalCard = document.querySelector(".card");
    const numberOfCards = 6;

    // access our card element's parent container
    let cardContainer = originalCard.parentNode;
    cardContainer.style.display = "block";

    // get our browser's size
    const browserWidth = document.documentElement.clientWidth;
    const browserHeight = document.documentElement.clientHeight;

    // create each individual card
    for (var i = 0; i < numberOfCards; i++) {
        // clone our original card and add it to cardContainer
        const cardClone = originalCard.cloneNode(true);
        cardContainer.appendChild(cardClone);

        // set our card's initial position and related properties
        const initialXPos = getPosition(50, browserWidth);
        const initialYPos = getPosition(50, browserHeight);
        const speed = 5 + Math.random() * 40;

        // create our card object
        const cardObject = new Card(cardClone, speed, initialXPos, initialYPos);
        cards.push(cardObject);
    }

    // remove the original card because we no longer need it visible
    cardContainer.removeChild(originalCard);

    moveCards();
}

export default renderCards;
