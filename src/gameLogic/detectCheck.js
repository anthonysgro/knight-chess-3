import { basicMove } from "./index";

// Says if enemy king in check with board configuration and most recently moved piece
function check(movedPiece, boardConfig) {
    let dealtCheck = false;
    let oppKing = null;

    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            // Cycles through all same-color pieces
            const piece = boardConfig[col][row];

            if (piece) {
                if (piece.color !== movedPiece.color && piece.name === "King") {
                    oppKing = piece;
                }
            }
        }
    }

    // console.log(oppKing, dealtCheck);

    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            // Cycles through all same-color pieces
            const cycleTilePiece = boardConfig[col][row];
            if (cycleTilePiece) {
                if (cycleTilePiece.color === movedPiece.color) {
                    // Searches all basic moves
                    const dealCheckDetection = basicMove(
                        oppKing.strChessCoords,
                        cycleTilePiece.strChessCoords,
                        cycleTilePiece,
                        boardConfig,
                    );

                    // If enemy king is within a basic movement, it's a check
                    if (dealCheckDetection.validMove) {
                        return {
                            dealtCheck: true,
                            kingSquare: oppKing.strChessCoords,
                        };
                    }
                }
            }
        }
    }

    return {
        dealtCheck: false,
        kingSquare: undefined,
    };
}

export default check;
