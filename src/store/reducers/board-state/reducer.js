// Import action types
import {
    START_GAME,
    DROP_PIECE,
    PICK_UP_PIECE,
    POPULATE_MOVES,
    CREATE_GAME_CODE,
    ADD_USER_TO_GAME,
} from "../../actions";

// Import Pieces (for promotion)
import { Pawn, Rook, Knight, Bishop, Queen, King } from "../../../pieces";

// Import Game Logic
import { init, chessMove, check, populateMoves } from "../../../gameLogic";

// Import Scripts
import { convertNotation, convertBoardState } from "../../../scripts";
import { cloneDeep } from "lodash";

// Import Sounds
import {
    playMoveSound,
    playCaptureSound,
    playOutOfBoundSound,
    playNotifySound,
} from "../../../sounds";

// Initial State
const initialState = {
    boardConfig: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
    allPieces: [],
    whitePieces: [],
    blackPieces: [],
    history: [],
    stepNumber: 0,
    whiteIsNext: true,
    rotation: 0,
    endGame: false,
    selectedPiece: null,
    isDragging: false,
    selectedPieceMoves: [],
    pieceInCheck: null,
    checkmate: false,
    winningPlayer: undefined,
    player1: "",
    player2: "",
    gameCode: "",
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return (state = init());

        case DROP_PIECE: {
            const to = action.to;
            const from = action.from;
            const rotated = action.rotated;
            let piece = action.piece;
            let { id, validMoves } = piece;

            // If it isn't your turn, dont do anything. Not even a sound.
            if (piece.white !== state.whiteIsNext) {
                return (state = {
                    ...state,
                    selectedPiece: null,
                    isDragging: false,
                    selectedPieceMoves: [],
                });
            }

            const previousBoard = state.boardConfig;
            const previousWhitePieces = cloneDeep(
                state.whitePieces.filter((p) => p.id !== piece.id),
            );
            const previousBlackPieces = cloneDeep(
                state.blackPieces.filter((p) => p.id !== piece.id),
            );

            // Cycle through pieces moves to see if this was a valid one
            let move = null;
            for (let i = 0; i < validMoves.length; i++) {
                if (validMoves[i].to === to) {
                    move = validMoves[i];
                }
            }

            // If invalid move or not your turn, return
            if (!move) {
                // If you just set the piece back on it's original square, don't play the messup sound
                if (to !== piece.strChessCoords) {
                    playOutOfBoundSound();
                }
                return (state = {
                    ...state,
                    selectedPiece: null,
                    isDragging: false,
                    selectedPieceMoves: [],
                });
                // If valid move
            } else {
                // Create new board
                let newBoard = cloneDeep(previousBoard);

                // Move data object
                let {
                    pawnMovedTwo,
                    castleEvent,
                    enPassantEvent,
                    promotionEvent,
                } = move;

                // Convert coordinates to interact with board
                const idnTO = convertNotation(to);
                const idxTO = convertBoardState(idnTO);
                const idnFROM = convertNotation(from);
                const idxFROM = convertBoardState(idnFROM);

                // Update piece position
                piece.updatePositionState(idnTO);

                // Get reference to captured piece (if doesn't exist, it is null)
                const capturedPiece = newBoard[idxTO[0]][idxTO[1]];

                // Update the new board
                newBoard[idxTO[0]][idxTO[1]] = piece;
                newBoard[idxFROM[0]][idxFROM[1]] = null;

                // Restructure piece collections
                let newWhitePieces = cloneDeep(state.whitePieces);
                let newBlackPieces = cloneDeep(state.blackPieces);
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
                    playCaptureSound();
                    newWhitePieces = newWhitePieces.filter(
                        (piece) => piece.id !== capturedPiece.id,
                    );
                    newBlackPieces = newBlackPieces.filter(
                        (piece) => piece.id !== capturedPiece.id,
                    );
                } else if (!capturedPiece && !enPassantEvent) {
                    playMoveSound();
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
                        newBoard[idxTO[0]][idxTO[1] - 1] = rook;
                        newBoard[idxTO[0]][idxTO[1] + 1] = null;
                        rook.updatePositionState([idnTO[0] - 1, idnTO[1]]);
                    } else if (direction === "left" && type === "short") {
                        newBoard[idxTO[0]][idxTO[1] - 1] = rook;
                        newBoard[idxTO[0]][idxTO[1] + 1] = null;
                        rook.updatePositionState([idnTO[0] - 1, idnTO[1]]);
                    } else if (direction === "right" && type === "long") {
                        newBoard[idxTO[0]][idxTO[1] + 1] = rook;
                        newBoard[idxTO[0]][idxTO[1] - 2] = null;
                        rook.updatePositionState([idnTO[0] + 1, idnTO[1]]);
                    } else if (direction === "left" && type === "long") {
                        newBoard[idxTO[0]][idxTO[1] + 1] = rook;
                        newBoard[idxTO[0]][idxTO[1] - 2] = null;
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
                    playCaptureSound();
                    if (piece.white) {
                        const takenPawn = cloneDeep(
                            newBoard[idxTO[0] + 1][idxTO[1]],
                        );
                        // Update board
                        newBoard[idxTO[0] + 1][idxTO[1]] = null;

                        // Remove the pawn from piece collection
                        newBlackPieces = newBlackPieces.filter(
                            (piece) => piece.id !== takenPawn.id,
                        );
                    } else {
                        const takenPawn = cloneDeep(
                            newBoard[idxTO[0] - 1][idxTO[1]],
                        );
                        // Update board
                        newBoard[idxTO[0] - 1][idxTO[1]] = null;

                        // Remove the pawn from piece collection
                        newWhitePieces = newWhitePieces.filter(
                            (piece) => piece.id !== takenPawn.id,
                        );
                    }
                }

                // Creates promoted piece
                if (promotionEvent) {
                    if (piece.white) {
                        newWhitePieces = newWhitePieces.filter(
                            (p) => p.id !== piece.id,
                        );
                        const Q2 = new Queen("Q", idnTO);
                        newWhitePieces = [...newWhitePieces, Q2];
                    } else {
                        newBlackPieces = newBlackPieces.filter(
                            (p) => p.id !== piece.id,
                        );
                        const q2 = new Queen("q", idnTO);
                        newBlackPieces = [...newBlackPieces, q2];
                    }
                }

                return (state = {
                    ...state,
                    stepNumber: state.stepNumber++,
                    whiteIsNext: !state.whiteIsNext,
                    history: [...state.history, { boardConfig: newBoard }],
                    allPieces: [...newWhitePieces, ...newBlackPieces],
                    whitePieces: newWhitePieces,
                    blackPieces: newBlackPieces,
                    boardConfig: newBoard,
                    selectedPiece: null,
                    isDragging: false,
                    selectedPieceMoves: [],
                });
            }
        }

        case POPULATE_MOVES: {
            // Create deep copy of all pieces with updated moves for new board position
            const { newWhitePieces, newBlackPieces, newBoardConfig } =
                populateMoves(state.allPieces, state.boardConfig);

            // Update history immutably with up-to-date pieces
            const newHistory = [
                ...cloneDeep(state.history).slice(0, state.history.length - 1),
                { boardConfig: newBoardConfig },
            ];

            // Detect check
            const allPieces = [...newWhitePieces, ...newBlackPieces];
            const whiteKing = newWhitePieces.filter(
                (p) => p.name === "King",
            )[0];

            const blackKing = newBlackPieces.filter(
                (p) => p.name === "King",
            )[0];

            let pieceInCheck = null;

            for (let p of allPieces) {
                for (let move of p.validMoves) {
                    if (move.to === whiteKing.strChessCoords) {
                        pieceInCheck = whiteKing;
                    } else if (move.to === blackKing.strChessCoords) {
                        pieceInCheck = blackKing;
                    }
                }
            }

            // Detect Checkmate
            for (let p of allPieces) {
            }

            return (state = {
                ...state,
                allPieces: [...newWhitePieces, ...newBlackPieces],
                whitePieces: newWhitePieces,
                blackPieces: newBlackPieces,
                boardConfig: newBoardConfig,
                history: newHistory,
                pieceInCheck,
            });
        }

        case PICK_UP_PIECE: {
            const { piece } = action;
            let selectedPieceMoves = [];

            if (piece.white !== state.whiteIsNext) {
                return (state = {
                    ...state,
                    selectedPiece: piece,
                    selectedPieceMoves,
                    isDragging: true,
                });
            }

            for (let i = 0; i < piece.validMoves.length; i++) {
                selectedPieceMoves.push(piece.validMoves[i].to);
            }

            return (state = {
                ...state,
                selectedPiece: piece,
                selectedPieceMoves,
                isDragging: true,
            });
        }

        case CREATE_GAME_CODE: {
            return (state = {
                ...state,
                gameCode: action.gameCode,
            });
        }

        case ADD_USER_TO_GAME: {
            if (!state.player1) {
                return (state = {
                    ...state,
                    player1: action.socketId,
                });
            } else if (!state.player2) {
                return (state = {
                    ...state,
                    player2: action.socketId,
                });
            }
        }
        default:
            return state;
    }
};
