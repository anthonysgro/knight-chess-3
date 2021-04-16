import { Piece } from "../pieces";

class Queen extends Piece {
    constructor(char, coords) {
        super(char, coords);
        this.name = "Queen";
        this.value = 9;
    }
}

export default Queen;
