import { Piece } from "../pieces";

class Bishop extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Bishop";
        this.value = 3;
    }
}

export default Bishop;
