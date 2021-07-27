import random from "random/dist/cjs";

const cards = [];
const classNames = [
    "bK",
    "bQ",
    "bR",
    "bB",
    "bN",
    "bP",
    "wK",
    "wQ",
    "wR",
    "wB",
    "wN",
    "wP",
];

// Global variables to store our browser's window size
let browserWidth = document.documentElement.clientHeight;
let browserHeight = document.documentElement.clientHeight;

// Specify the number of cards you want visible
const numberOfCards = 12;

// Flag to reset the position of the cards
let resetPosition = false;

// Handle accessibility
let enableAnimations = false;
let reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Card constructor
function Card(element, speed, xPos, yPos, angle, angularMomentum) {
    // set initial card properties
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;
    this.angle = angle;
    this.angularMomentum = angularMomentum;

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
    // this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
    this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);
    this.angle = this.angle + this.angularMomentum;

    // if card goes below the browser window, move it back to the top
    if (this.yPos > browserHeight * 2) {
        this.yPos = 400;
        // this.xPos = Math.random() * (browserWidth * 2 - 200);
        this.xPos = random.uniformInt(0, browserWidth * 2 - 200)();
        this.speed = 30 + Math.random() * 60;
        this.angle = Math.random() * 360;
        this.angularMomentum = 0.1 + Math.random() * 0.5;
    }

    // setting our card's position
    setTransform(this.xPos, Math.round(this.yPos), this.angle, this.element);
};

// Edits the actual spot on the screen
function setTransform(xPos, yPos, angle, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${angle}deg)`;
}

// Finds position of the card
function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

// Responsible for moving each card by calling its update function
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

// Generates the cards
function generateCards() {
    // get our card element from the DOM and store it
    let originalCard = document.querySelector(".card");

    // access our card element's parent container
    let cardContainer = originalCard.parentNode;
    // cardContainer.style.display = "block";

    // get our browser's size
    const browserWidth = document.documentElement.clientWidth;
    const browserHeight = document.documentElement.clientHeight;

    // create each individual card
    for (let i = 0; i < numberOfCards; i++) {
        // clone our original card and add it to cardContainer
        const cardClone = originalCard.cloneNode(true);

        cardClone.classList.add(classNames[i]);

        cardClone.style.zIndex = "-1";
        cardContainer.appendChild(cardClone);

        // set our card's initial position and related properties
        const initialXPos = random.uniformInt(0, browserWidth * 2 - 200)();
        // const initialXPos = Math.random() * (browserWidth * 2 - 200);
        const initialYPos = 100 + Math.random() * 400;
        const speed = 30 + Math.random() * 60;
        const initialAngle = Math.random() * 360;
        const angularMomentum = 0.1 + Math.random() * 0.5;

        // create our card object
        const cardObject = new Card(
            cardClone,
            speed,
            initialXPos,
            initialYPos,
            initialAngle,
            angularMomentum,
        );

        cards.push(cardObject);
    }

    // remove the original card because we no longer need it visible
    cardContainer.removeChild(originalCard);

    moveCards();
}

// Handle animation accessibility preferences
function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
        enableAnimations = false;
    } else {
        enableAnimations = true;
    }
}

// Trigger a reset of all the cards' positions
function setResetFlag(e) {
    resetPosition = true;
}

// Adds event listeners for card generation
function renderCards() {
    setAccessibilityState();
    reduceMotionQuery.addListener(setAccessibilityState);

    if (enableAnimations) {
        if (document.readyState !== "loading") {
            generateCards();
        } else {
            window.addEventListener("DOMContentLoaded", generateCards, false);
        }

        // window.addEventListener("resize", setResetFlag, false);
    }
}

function removeCards() {
    window.removeEventListener("DOMContentLoaded", generateCards);
    for (const card of cards) {
        console.log(card.element);
        card.element.remove();
    }
}

export { renderCards, removeCards };
