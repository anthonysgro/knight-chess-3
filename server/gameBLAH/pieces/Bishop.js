const { Piece } = require("../pieces");

class Bishop extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Bishop";
        this.value = 3;
    }
}

module.exports = Bishop;
