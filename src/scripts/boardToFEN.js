import { chessMove } from "../gameLogic";
import convertNotation from "./convertNotation";

function boardToFen(gameState) {
    const board = gameState.boardConfig;
    const { whiteIsNext, whitePieces, blackPieces } = gameState;
    let result = "";

    // Handles the position string
    for (let i = 0; i < board.length; i++) {
        let empty = 0;
        for (let j = 0; j < board[i].length; j++) {
            const piece = board[i][j];
            if (piece) {
                if (empty > 0) {
                    result += empty.toString();
                    empty = 0;
                }

                result += piece.char;
            } else {
                empty += 1;
            }
        }

        if (empty > 0) {
            result += empty.toString();
        }

        if (i < board.length - 1) {
            result += "/";
        }
    }

    // Who is next
    result += whiteIsNext ? " w " : " b ";

    // Castling
    const whiteKing = whitePieces.filter((p) => p.char === "K")[0];
    const blackKing = blackPieces.filter((p) => p.char === "k")[0];
    const wKingRook = whitePieces.filter((p) => p.originalCoords === "h1")[0];
    const wQueenRook = whitePieces.filter((p) => p.originalCoords === "a1")[0];
    const bKingRook = blackPieces.filter((p) => p.originalCoords === "h8")[0];
    const bQueenRook = blackPieces.filter((p) => p.originalCoords === "a8")[0];

    let castlingStr = "";
    if (whiteKing.castlingAvailable) {
        if (wKingRook && !wKingRook.hasMoved) castlingStr += "K";
        if (wQueenRook && !wQueenRook.hasMoved) castlingStr += "Q";
    }

    if (blackKing.castlingAvailable) {
        if (bKingRook && !bKingRook.hasMoved) castlingStr += "k";
        if (bQueenRook && !bQueenRook.hasMoved) castlingStr += "q";
    }

    result += castlingStr || "- ";

    // Add a space for the next thing if there isn't one
    if (result[result.length - 1] !== " ") result += " ";

    // En passant encoding
    const whitePawns = whitePieces.filter((p) => p.char === "P");
    const blackPawns = blackPieces.filter((p) => p.char === "p");

    const [vulnPawns, enemyPawns] = whiteIsNext
        ? [blackPawns, whitePawns]
        : [whitePawns, blackPawns];

    let foundEnPassant = "";
    for (const pawn of vulnPawns) {
        if (pawn.vulnerableToEnPassant) {
            const coords = pawn.numberCoords;
            const squareToTake = [
                coords[0],
                whiteIsNext ? coords[1] + 1 : coords[1] - 1,
            ];

            // Convert coordinates to interact with board
            const vulnSquare = convertNotation(squareToTake);

            let canTake = false;
            for (const enemyPawn of enemyPawns) {
                const { validMove } = chessMove(
                    `${vulnSquare[0]}${vulnSquare[1]}`,
                    enemyPawn.strChessCoords,
                    enemyPawn,
                    board,
                );
                if (validMove) {
                    canTake = true;
                    break;
                }
            }
            if (canTake) foundEnPassant = `${vulnSquare[0]}${vulnSquare[1]} `;

            break;
        }
    }

    result += foundEnPassant || "- ";

    // Moves without a pawn move or something else yada yada i dont need it
    result += "0 1";

    return result;
}

export default boardToFen;
