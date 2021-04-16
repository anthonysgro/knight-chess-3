import { Piece } from "../pieces";

class Rook extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Rook";
        this.hasMoved = false;
        this.value = 5;
    }
}

export default Rook;
