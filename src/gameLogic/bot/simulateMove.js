// Import Scripts
import { convertNotation, convertBoardState } from "../../scripts";
import { cloneDeep } from "lodash";
import { populateMoves } from "..";

function simulateMove(boardState, piece, move) {
    const { allPieces, whitePieces, blackPieces, boardConfig, whiteIsNext } =
        boardState;

    // Move data object
    const {
        pawnMovedTwo,
        castleEvent,
        enPassantEvent,
        promotionEvent,
        to,
        from,
    } = move;

    // Get deep copy reference to all the pieces
    const previousWhitePieces = cloneDeep(
        whitePieces.filter((p) => p.id !== piece.id),
    );
    const previousBlackPieces = cloneDeep(
        blackPieces.filter((p) => p.id !== piece.id),
    );

    // Deep clone the board and piece so we can mutate them
    const board = cloneDeep(boardConfig);
    piece = cloneDeep(piece);

    // Convert coordinates to interact with board
    const idnTO = convertNotation(to);
    const idxTO = convertBoardState(idnTO);
    const idnFROM = convertNotation(from);
    const idxFROM = convertBoardState(idnFROM);

    // Update piece position
    piece.updatePositionState(idnTO);

    // Get reference to captured piece (if doesn't exist, it is null)
    const capturedPiece = board[idxTO[0]][idxTO[1]];

    // Update the new board
    board[idxTO[0]][idxTO[1]] = piece;
    board[idxFROM[0]][idxFROM[1]] = null;

    // Restructure piece collections
    let newWhitePieces = cloneDeep(whitePieces);
    let newBlackPieces = cloneDeep(blackPieces);
    if (piece.color === "white") {
        newWhitePieces = [...previousWhitePieces, piece];
    } else {
        newBlackPieces = [...previousBlackPieces, piece];
    }

    // Update one-time move restrictions
    if (piece.name === "King") {
        piece.castlingAvailable = false;
    } else if (piece.name === "Pawn") {
        piece.moveTwoAvailable = false;
        if (pawnMovedTwo) {
            piece.vulnerableToEnPassant = true;
        }
    } else if (piece.name === "Rook") {
        piece.hasMoved = true;
    }

    // Reset enPassant Vulnerability for all pieces
    newWhitePieces.forEach((p) => {
        if (p.name === "Pawn" && p.id !== piece.id) {
            p.vulnerableToEnPassant = false;
        }
    });

    newBlackPieces.forEach((p) => {
        if (p.name === "Pawn" && p.id !== piece.id) {
            p.vulnerableToEnPassant = false;
        }
    });

    // If a piece was captured, remove it from piece collections
    if (capturedPiece) {
        newWhitePieces = newWhitePieces.filter(
            (piece) => piece.id !== capturedPiece.id,
        );
        newBlackPieces = newBlackPieces.filter(
            (piece) => piece.id !== capturedPiece.id,
        );
    }

    // Move rook if castling
    if (castleEvent.castleMove) {
        const { direction, type } = castleEvent;
        let rook = castleEvent.rookInvolved;

        // Remove rook from piece collection
        if (rook.white) {
            newWhitePieces = newWhitePieces.filter(
                (piece) => piece.id !== rook.id,
            );
        } else {
            newBlackPieces = newBlackPieces.filter(
                (piece) => piece.id !== rook.id,
            );
        }

        // Change rook position and attributes
        if (direction === "right" && type === "short") {
            board[idxTO[0]][idxTO[1] - 1] = rook;
            board[idxTO[0]][idxTO[1] + 1] = null;
            rook.updatePositionState([idnTO[0] - 1, idnTO[1]]);
        } else if (direction === "left" && type === "short") {
            board[idxTO[0]][idxTO[1] - 1] = rook;
            board[idxTO[0]][idxTO[1] + 1] = null;
            rook.updatePositionState([idnTO[0] - 1, idnTO[1]]);
        } else if (direction === "right" && type === "long") {
            board[idxTO[0]][idxTO[1] + 1] = rook;
            board[idxTO[0]][idxTO[1] - 2] = null;
            rook.updatePositionState([idnTO[0] + 1, idnTO[1]]);
        } else if (direction === "left" && type === "long") {
            board[idxTO[0]][idxTO[1] + 1] = rook;
            board[idxTO[0]][idxTO[1] - 2] = null;
            rook.updatePositionState([idnTO[0] + 1, idnTO[1]]);
        }

        // Add rook back
        if (rook.white) {
            newWhitePieces = [...newWhitePieces, rook];
        } else {
            newBlackPieces = [...newBlackPieces, rook];
        }
    }

    // Updates enPassant captures
    if (enPassantEvent) {
        if (piece.white) {
            const takenPawn = cloneDeep(board[idxTO[0] + 1][idxTO[1]]);
            // Update board
            board[idxTO[0] + 1][idxTO[1]] = null;

            // Remove the pawn from piece collection
            newBlackPieces = newBlackPieces.filter(
                (piece) => piece.id !== takenPawn.id,
            );
        } else {
            const takenPawn = cloneDeep(board[idxTO[0] - 1][idxTO[1]]);
            // Update board
            board[idxTO[0] - 1][idxTO[1]] = null;

            // Remove the pawn from piece collection
            newWhitePieces = newWhitePieces.filter(
                (piece) => piece.id !== takenPawn.id,
            );
        }
    }

    // Creates promoted piece
    if (promotionEvent) {
        let newPiece = null;
        if (piece.white) {
            newWhitePieces = newWhitePieces.filter((p) => p.id !== piece.id);

            // Bot doesn't understand underpromotion right now
            // if (action.underpromotion === "Q") {
            //     newPiece = new Queen("Q", idnTO);
            // } else if (action.underpromotion === "R") {
            //     newPiece = new Rook("R", idnTO);
            // } else if (action.underpromotion === "B") {
            //     newPiece = new Bishop("B", idnTO);
            // } else if (action.underpromotion === "N") {
            //     newPiece = new Knight("N", idnTO);
            // }

            newPiece = new Queen("Q", idnTO);

            newWhitePieces = [...newWhitePieces, newPiece];
        } else {
            newBlackPieces = newBlackPieces.filter((p) => p.id !== piece.id);

            // if (action.underpromotion === "Q") {
            //     newPiece = new Queen("q", idnTO);
            // } else if (action.underpromotion === "R") {
            //     newPiece = new Rook("r", idnTO);
            // } else if (action.underpromotion === "B") {
            //     newPiece = new Bishop("b", idnTO);
            // } else if (action.underpromotion === "N") {
            //     newPiece = new Knight("n", idnTO);
            // }

            newPiece = new Queen("q", idnTO);
            newBlackPieces = [...newBlackPieces, newPiece];
        }
        board[idxTO[0]][idxTO[1]] = newPiece;
    }

    // Create deep copy of all pieces with updated moves for new board position
    const newCollections = populateMoves(
        [...newWhitePieces, ...newBlackPieces],
        board,
    );

    newWhitePieces = newCollections.newWhitePieces;
    newBlackPieces = newCollections.newBlackPieces;

    return {
        whiteIsNext: !whiteIsNext,
        allPieces: [...newWhitePieces, ...newBlackPieces],
        whitePieces: newWhitePieces,
        blackPieces: newBlackPieces,
        boardConfig: board,
        lastMoveValid: true,
    };
}

export default simulateMove;
