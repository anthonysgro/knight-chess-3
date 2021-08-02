import { Piece, Pawn, Rook, Knight, Bishop, Queen, King } from "../pieces";
import { cloneDeep } from "lodash";

function parsePiece(piece) {
    let newPiece = {};
    if (piece.name === "Pawn") {
        newPiece = Object.assign(
            new Pawn(piece.char, piece.numberCoords),
            piece,
        );
    } else if (piece.name === "Knight") {
        newPiece = Object.assign(
            new Knight(piece.char, piece.numberCoords),
            piece,
        );
    } else if (piece.name === "Bishop") {
        newPiece = Object.assign(
            new Bishop(piece.char, piece.numberCoords),
            piece,
        );
    } else if (piece.name === "Rook") {
        newPiece = Object.assign(
            new Rook(piece.char, piece.numberCoords),
            piece,
        );
    } else if (piece.name === "Queen") {
        newPiece = Object.assign(
            new Queen(piece.char, piece.numberCoords),
            piece,
        );
    } else if (piece.name === "King") {
        newPiece = Object.assign(
            new King(piece.char, piece.numberCoords),
            piece,
        );
    }

    return newPiece;
}

function parseState(state, oldHistory, updateHistory) {
    // Parse Normally
    const newState = JSON.parse(state);
    console.log(newState);
    // Now we need all pieces to have the prototype inheritance for the Piece class
    const { allPieces, blackPieces, whitePieces, pieceInCheck, boardConfig } =
        newState;

    const newAllPieces = [];
    for (const piece of allPieces) {
        newAllPieces.push(parsePiece(piece));
    }
    newState.allPieces = newAllPieces;

    const newBlackPieces = [];
    for (let piece of blackPieces) {
        newBlackPieces.push(parsePiece(piece));
    }
    newState.blackPieces = newBlackPieces;

    const newWhitePieces = [];
    for (const piece of whitePieces) {
        newWhitePieces.push(parsePiece(piece));
    }
    newState.whitePieces = newWhitePieces;

    const newBoardConfig = [];
    for (let i = 0; i < boardConfig.length; i++) {
        const row = [];
        for (let j = 0; j < boardConfig[i].length; j++) {
            let thisPiece = boardConfig[i][j];
            if (thisPiece && thisPiece.hasOwnProperty("char")) {
                // Check if king to see if we need to parse the rook on a castle move
                if (thisPiece.name === "King") {
                    let newValidMoves = [];
                    for (const validMove of thisPiece.validMoves) {
                        if (validMove.castleEvent.castleMove) {
                            const newValidMove = {
                                ...validMove,
                                castleEvent: {
                                    ...validMove.castleEvent,
                                    rookInvolved: parsePiece(
                                        validMove.castleEvent.rookInvolved,
                                    ),
                                },
                            };
                            newValidMoves.push(newValidMove);
                        } else {
                            newValidMoves.push(validMove);
                        }
                    }
                    thisPiece.validMoves = newValidMoves;
                }
                // Parse the piece
                row.push(parsePiece(thisPiece));
            } else {
                row.push(null);
            }
        }
        newBoardConfig.push(row);
    }
    newState.boardConfig = newBoardConfig;

    // const newHistory = [];
    // for (const step of history) {
    //     const newHistoryItem = [];
    //     for (let i = 0; i < step.boardConfig.length; i++) {
    //         const row = [];
    //         for (let j = 0; j < step.boardConfig[i].length; j++) {
    //             if (
    //                 step.boardConfig[i][j] &&
    //                 step.boardConfig[i][j].hasOwnProperty("char")
    //             ) {
    //                 row.push(parsePiece(step.boardConfig[i][j]));
    //             } else {
    //                 row.push(null);
    //             }
    //         }
    //         newHistoryItem.push(row);
    //     }
    //     newHistory.push({ boardConfig: newHistoryItem });
    // }

    // newState.history = newHistory;

    // Update history immutably with up-to-date pieces

    if (updateHistory) {
        const newHistory =
            oldHistory.length > 0
                ? [
                      ...cloneDeep(oldHistory).slice(0, oldHistory.length - 1),
                      { boardConfig: newBoardConfig },
                  ]
                : [{ boardConfig: newBoardConfig }];

        newState.history = newHistory;
    } else {
        newState.history = [];
    }

    if (pieceInCheck) {
        newState.pieceInCheck = parsePiece(pieceInCheck);
    }

    return newState;
}

export default parseState;
