import { Piece } from "../pieces";

class Knight extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Knight";
        this.value = 3;
    }
}

export default Knight;
