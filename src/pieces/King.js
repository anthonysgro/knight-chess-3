import { Piece } from "../pieces";

class King extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "King";
        this.castlingAvailable = true;
        this.value = 1000;
    }
}

export default King;
