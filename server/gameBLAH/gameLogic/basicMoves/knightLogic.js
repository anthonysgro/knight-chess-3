import { adjacentTile } from "../index";
import { getPieceWithCoords } from "../../scripts";

function knightLogic(target, origin, piece, boardConfig) {
    let validMove = false;

    //gets attacked piece info
    const attackedPiece = getPieceWithCoords(target, boardConfig);
    const capturingPiece = !!attackedPiece;
    let capturingOppPiece;

    //if we are attacking a piece, get that piece
    if (capturingPiece) {
        capturingOppPiece = attackedPiece.color !== piece.color;
    }

    //finds two steps in each direction to prepare for all knight moves
    const prelimUp = adjacentTile(origin, "up", 2, piece.color);
    const prelimRight = adjacentTile(origin, "right", 2, piece.color);
    const prelimDown = adjacentTile(origin, "down", 2, piece.color);
    const prelimLeft = adjacentTile(origin, "left", 2, piece.color);

    //knight moves
    switch (target) {
        case adjacentTile(prelimUp, "right", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimUp, "left", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimRight, "up", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimRight, "down", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimDown, "right", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimDown, "left", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimLeft, "up", 1, piece.color):
            validMove = true;
            break;
        case adjacentTile(prelimLeft, "down", 1, piece.color):
            validMove = true;
            break;
    }

    //if we are capturing our own piece, not a valid move
    if (capturingPiece && !capturingOppPiece) {
        validMove = false;
    }

    return validMove;
}

export default knightLogic;
