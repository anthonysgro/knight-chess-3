const { Piece } = require("../pieces");

class Knight extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Knight";
        this.value = 3;
    }
}

module.exports = Knight;
