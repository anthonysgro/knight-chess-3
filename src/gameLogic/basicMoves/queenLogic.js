import { adjacentTile, continuousPieceMovement } from "../index";

function queenLogic(target, origin, piece, boardConfig) {
    let validMove = false;

    //we are going to find the direction by making one true
    let queenDirection = "";

    //this is to handle our queening (a new queen won't have an origin square)
    if (!origin) {
        return validMove;
    }

    //find what direction we are going in
    for (let i = 1; i <= 8; i++) {
        switch (target) {
            case adjacentTile(origin, "up", i, piece.color):
                queenDirection = "up";
                break;
            case adjacentTile(origin, "down", i, piece.color):
                queenDirection = "down";
                break;
            case adjacentTile(origin, "left", i, piece.color):
                queenDirection = "left";
                break;
            case adjacentTile(origin, "right", i, piece.color):
                queenDirection = "right";
                break;
            case adjacentTile(origin, "up-right", i, piece.color):
                queenDirection = "up-right";
                break;
            case adjacentTile(origin, "down-right", i, piece.color):
                queenDirection = "down-right";
                break;
            case adjacentTile(origin, "down-left", i, piece.color):
                queenDirection = "down-left";
                break;
            case adjacentTile(origin, "up-left", i, piece.color):
                queenDirection = "up-left";
                break;
        }
    }

    //use function to return valid moves in any direction
    let validQueenMoves = continuousPieceMovement(
        origin,
        queenDirection,
        piece,
        boardConfig,
    );

    //if valid move...
    if (validQueenMoves.includes(target)) {
        validMove = true;
    }

    return validMove;
}

export default queenLogic;
