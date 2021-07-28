const { Piece } = require("../pieces");

class Pawn extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Pawn";
        this.moveTwoAvailable = true;
        this.vulnerableToEnPassant = false;
        this.value = 1;
    }
}

module.exports = Pawn;
