import { getPieceWithCoords } from "../scripts";
import { adjacentTile } from "../gameLogic";
// import { isEmpty } from "lodash";

//returns array of valid moves
function continuousPieceMovement(origin, direction, piece, boardConfig) {
    let validMoves = [];
    if (!direction) return validMoves;

    //loop through all pieces in a direction to collect valid moves
    for (let i = 1; i <= 8; i++) {
        //loop through the tiles
        const currentTile = adjacentTile(origin, direction, i, piece.color);

        //see if a piece is present at the tile
        const piecePresent = getPieceWithCoords(currentTile, boardConfig);

        //if we are off the board, break
        if (piecePresent === undefined) {
            break;
        }

        //if we encounter a piece
        if (piecePresent) {
            //and it is the same color, break
            if (piecePresent.color === piece.color) {
                break;
                //if capturable, it is a valid move but stop searching
            } else {
                validMoves.push(currentTile);
                break;
            }
        }

        //returns valid move until we hit a piece
        validMoves.push(currentTile);
    }

    return validMoves;
}

export default continuousPieceMovement;
