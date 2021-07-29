// Script Imports
const convertNotation = require("./convertNotation");
const imageSelector = require("./imageSelector");

// Piece class to preserve inherited complex object during JSON parsing from client
class Piece {
    constructor(char, coords) {
        //init char
        this.char = char;

        //color info
        this.white = char.toUpperCase() === char;
        this.color = this.white ? "white" : "black";

        //coordinate info
        this.numberCoords = [];
        this.chessCoords = [];
        this.strChessCoords = "";

        //image info
        this.imageFile = imageSelector(char);

        //unique id
        this.id = "";
        this.alive = true;

        // Stores available moves
        this.validMoves = [];

        // initializes id and coordinates
        this.updatePositionState(coords);
    }

    //updates coordinates and id
    updatePositionState(newNumCoords) {
        this.numberCoords = newNumCoords;
        this.chessCoords = convertNotation(newNumCoords);
        this.strChessCoords = `${this.chessCoords[0]}${this.chessCoords[1]}`;
        this.id = `${
            this.strChessCoords +
            "_" +
            this.char.toUpperCase() +
            "_" +
            this.color
        }`;
    }

    render() {
        return `<img src=${this.imageFile}></img>`;
    }
}

module.exports = Piece;
