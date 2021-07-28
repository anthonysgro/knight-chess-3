import { getPieceWithCoords } from "../scripts";

function isEmptyTile(target, boardConfig) {
    //see if a piece is present at the tile
    const piecePresent = getPieceWithCoords(target, boardConfig);

    //if it is null, it's empty!
    return !piecePresent;
}

export default isEmptyTile;
