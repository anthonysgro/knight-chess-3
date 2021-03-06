import { Piece } from "../pieces";

class Pawn extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Pawn";
        this.moveTwoAvailable = true;
        this.vulnerableToEnPassant = false;
        this.value = 1;
    }
}

export default Pawn;
