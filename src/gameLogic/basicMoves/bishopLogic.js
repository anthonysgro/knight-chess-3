import { adjacentTile, continuousPieceMovement } from "../index";

function bishopLogic(target, origin, piece, boardConfig) {
    let validMove = false;
    //we are going to find the direction by making one true
    let bishopDirection = "";

    //find what direction we are going in
    for (let i = 1; i <= 8; i++) {
        switch (target) {
            case adjacentTile(origin, "down-left", i, piece.color):
                bishopDirection = "down-left";
                break;
            case adjacentTile(origin, "up-right", i, piece.color):
                bishopDirection = "up-right";
                break;
            case adjacentTile(origin, "down-right", i, piece.color):
                bishopDirection = "down-right";
                break;
            case adjacentTile(origin, "up-left", i, piece.color):
                bishopDirection = "up-left";
                break;
        }
    }

    if (!bishopDirection) return validMove;

    //use function to return valid moves in any direction
    let validBishopMoves = continuousPieceMovement(
        origin,
        bishopDirection,
        piece,
        boardConfig,
    );

    //if valid move...
    if (validBishopMoves.includes(target)) {
        validMove = true;
    }

    return validMove;
}

export default bishopLogic;
