import store from "../../index";

// Import action types
import {
    START_GAME,
    START_LOCAL_GAME,
    DROP_PIECE,
    PICK_UP_PIECE,
    POPULATE_MOVES,
    JOIN_GAME,
    OPPONENT_MOVED,
    PLAYER_2_JOINED,
    ACCEPT_REMATCH,
    REMATCH_ACCEPTED,
    RESIGN,
    OPPONENT_RESIGNS,
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
    selectedPiece: null,
    isDragging: false,
    selectedPieceMoves: [],
    pieceInCheck: null,
    whiteHasPlayer: false,
    blackHasPlayer: false,
    lastMoveValid: true,
    endGameInfo: {
        checkmate: false,
        stalemate: false,
        whiteWins: false,
        blackWins: false,
        draw: false,
        insufficientMaterial: false,
        endGame: false,
        resigns: false,
    },
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return (state = {
                ...action.payload,
                whiteHasPlayer: action.playerIsWhite,
                blackHasPlayer: !action.playerIsWhite,
            });
        case START_LOCAL_GAME:
            return (state = {
                ...action.payload,
                whiteHasPlayer: true,
                blackHasPlayer: true,
            });
        case JOIN_GAME:
            return (state = {
                ...action.payload,
                whiteHasPlayer: true,
                blackHasPlayer: true,
            });
        case PLAYER_2_JOINED:
            // Play sound when the 2nd player has joined
            playNotifySound();
            return (state = {
                ...state,
                whiteHasPlayer: true,
                blackHasPlayer: true,
            });
        case ACCEPT_REMATCH:
            return (state = action.payload);
        case REMATCH_ACCEPTED:
            return (state = action.payload);
        case OPPONENT_MOVED:
            return (state = action.newState);
        case DROP_PIECE: {
            const { to, from, rotated, thisPlayerWhite, gameModes, endGame } =
                action;
            const { onlineMultiplayer, localMultiplayer, sandbox, botBattle } =
                gameModes;
            let piece = action.piece;
            let { id, validMoves } = piece;

            // If it the end of the game, do not do anything.
            if (state.endGameInfo.endGame) {
                return (state = {
                    ...state,
                    selectedPiece: null,
                    isDragging: false,
                    selectedPieceMoves: [],
                });
            }

            if (!sandbox) {
                // If it isn't your turn, dont do anything. Not even a sound.
                if (piece.white !== state.whiteIsNext) {
                    return (state = {
                        ...state,
                        selectedPiece: null,
                        isDragging: false,
                        selectedPieceMoves: [],
                    });
                }
            }

            if (onlineMultiplayer) {
                // If both players aren't in the lobby, don't do anything
                if (!state.whiteHasPlayer || !state.blackHasPlayer) {
                    return (state = {
                        ...state,
                        selectedPiece: null,
                        isDragging: false,
                        selectedPieceMoves: [],
                    });
                }
            }

            if (onlineMultiplayer || botBattle) {
                // If you grab a piece that isn't your color, don't do anything either
                if (piece.white !== thisPlayerWhite) {
                    return (state = {
                        ...state,
                        selectedPiece: piece,
                        selectedPieceMoves: [],
                        isDragging: true,
                    });
                }
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
                    lastMoveValid: false,
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

                        let newPiece = null;
                        if (action.underpromotion === "Q") {
                            newPiece = new Queen("Q", idnTO);
                        } else if (action.underpromotion === "R") {
                            newPiece = new Rook("R", idnTO);
                        } else if (action.underpromotion === "B") {
                            newPiece = new Bishop("B", idnTO);
                        } else if (action.underpromotion === "N") {
                            newPiece = new Knight("N", idnTO);
                        }

                        newWhitePieces = [...newWhitePieces, newPiece];
                    } else {
                        newBlackPieces = newBlackPieces.filter(
                            (p) => p.id !== piece.id,
                        );

                        let newPiece = null;
                        if (action.underpromotion === "Q") {
                            newPiece = new Queen("q", idnTO);
                        } else if (action.underpromotion === "R") {
                            newPiece = new Rook("r", idnTO);
                        } else if (action.underpromotion === "B") {
                            newPiece = new Bishop("b", idnTO);
                        } else if (action.underpromotion === "N") {
                            newPiece = new Knight("n", idnTO);
                        }

                        newBlackPieces = [...newBlackPieces, newPiece];
                    }
                }

                const newState = {
                    ...state,
                    stepNumber: state.stepNumber++,
                    whiteIsNext: !state.whiteIsNext,
                    history: [...state.history, { boardConfig: newBoard }],
                    allPieces: [...newWhitePieces, ...newBlackPieces],
                    whitePieces: newWhitePieces,
                    blackPieces: newBlackPieces,
                    boardConfig: newBoard,
                    selectedPiece: null,
                    lastMoveValid: true,
                    isDragging: false,
                    selectedPieceMoves: [],
                };

                return (state = newState);
            }
        }

        case POPULATE_MOVES: {
            // If it is the end of the game, don't do anything
            if (state.endGameInfo.endGame) {
                return state;
            }

            if (!state.lastMoveValid) {
                return state;
            }

            // Create deep copy of all pieces with updated moves for new board position
            const { newWhitePieces, newBlackPieces, newBoardConfig } =
                populateMoves(state.allPieces, state.boardConfig);

            // Update history immutably with up-to-date pieces
            const newHistory = [
                ...cloneDeep(state.history).slice(0),
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

            // Detect Checkmate && Stalemate
            let noMoves = true;
            if (state.whiteIsNext) {
                for (const piece of newWhitePieces) {
                    if (piece.validMoves.length > 0) {
                        noMoves = false;
                        break;
                    }
                }
            } else {
                for (const piece of newBlackPieces) {
                    if (piece.validMoves.length > 0) {
                        noMoves = false;
                        break;
                    }
                }
            }

            const checkmate = noMoves && !!pieceInCheck;
            const stalemate = noMoves && !pieceInCheck;

            // Detect draw by insufficient material
            const insufficientMaterial = false;

            const draw = stalemate || insufficientMaterial;

            if (draw || checkmate) playNotifySound();

            const newStateNoHistory = {
                ...state,
                allPieces: [...newWhitePieces, ...newBlackPieces],
                whitePieces: newWhitePieces,
                blackPieces: newBlackPieces,
                boardConfig: newBoardConfig,
                // history: newHistory,
                pieceInCheck,
                endGameInfo: {
                    checkmate,
                    stalemate,
                    whiteWins: checkmate && !state.whiteIsNext,
                    blackWins: checkmate && state.whiteIsNext,
                    draw,
                    insufficientMaterial,
                    endGame: draw || checkmate,
                },
            };

            // Emits successful move to the server to tell opponent
            window.socket.emit(
                "movePiece",
                JSON.stringify(newStateNoHistory),
                action.gameCode,
                action.playerId,
            );

            return (state = { ...newStateNoHistory, history: newHistory });
        }

        case PICK_UP_PIECE: {
            const { piece, thisPlayerWhite, gameModes } = action;
            const { onlineMultiplayer, localMultiplayer, botBattle, sandbox } =
                gameModes;
            const selectedPieceMoves = [];

            // Online multiplayer or bot battle will restrict
            // your computer from touching the other pieces
            if (onlineMultiplayer || botBattle) {
                // If it isn't a full lobby, picking up a piece does nothing
                if (!state.whiteHasPlayer || !state.blackHasPlayer) {
                    return (state = {
                        ...state,
                        selectedPiece: piece,
                        selectedPieceMoves,
                        isDragging: true,
                    });
                }

                // If you grab a piece that isn't your color, don't do anything either
                if (piece.white !== thisPlayerWhite) {
                    return (state = {
                        ...state,
                        selectedPiece: piece,
                        selectedPieceMoves,
                        isDragging: true,
                    });
                }
            }

            // You can't ever move out of turn (unless sandbox mode)
            if (localMultiplayer || onlineMultiplayer || botBattle) {
                if (piece.white !== state.whiteIsNext) {
                    // if it isn't your turn, don't populate the valid moves
                    return (state = {
                        ...state,
                        selectedPiece: piece,
                        selectedPieceMoves,
                        isDragging: true,
                    });
                }
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

        case RESIGN:
            playNotifySound();
            const whiteWins = action.online
                ? !action.thisPlayerWhite
                : !state.whiteIsNext;

            return (state = {
                ...state,
                endGameInfo: {
                    ...state.endGameInfo,
                    whiteWins: whiteWins,
                    blackWins: !whiteWins,
                    endGame: true,
                    resigns: true,
                },
            });

        case OPPONENT_RESIGNS:
            playNotifySound();
            return (state = {
                ...state,
                endGameInfo: {
                    ...state.endGameInfo,
                    whiteWins: action.thisPlayerWhite,
                    blackWins: !action.thisPlayerWhite,
                    endGame: true,
                    resigns: true,
                },
            });

        default:
            return state;
    }
};
