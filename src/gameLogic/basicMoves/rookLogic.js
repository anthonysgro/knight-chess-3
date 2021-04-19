import { adjacentTile, continuousPieceMovement } from "../index";

function rookLogic(target, origin, piece, boardConfig) {
    let validMove = false;

    //we are going to find the direction by making one true
    let rookDirection = "";

    //find what direction we are going in
    for (let i = 1; i <= 8; i++) {
        switch (target) {
            case adjacentTile(origin, "up", i, piece.color):
                rookDirection = "up";
                break;
            case adjacentTile(origin, "down", i, piece.color):
                rookDirection = "down";
                break;
            case adjacentTile(origin, "left", i, piece.color):
                rookDirection = "left";
                break;
            case adjacentTile(origin, "right", i, piece.color):
                rookDirection = "right";
                break;
        }
    }

    //use function to return valid moves in any direction
    let validRookMoves = continuousPieceMovement(
        origin,
        rookDirection,
        piece,
        boardConfig,
    );

    //if valid move...
    if (validRookMoves.includes(target)) {
        validMove = true;
    }

    return validMove;
}

export default rookLogic;
