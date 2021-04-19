// Import action types
import {
    START_GAME,
    DROP_PIECE,
    PICK_UP_PIECE,
    POPULATE_MOVES,
} from "../../actions";

// Import Game Logic
import { init, chessMove, check, populateMoves } from "../../../gameLogic";

// Import Scripts
import { convertNotation, convertBoardState } from "../../../scripts";
import { cloneDeep } from "lodash";

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
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return (state = init());
        case DROP_PIECE: {
            const to = action.to;
            const from = action.from;
            let piece = action.piece;
            let { id, validMoves } = piece;

            const previousBoard = state.boardConfig;
            const previousWhitePieces = cloneDeep(
                state.whitePieces.filter((p) => p.id !== piece.id),
            );
            const previousBlackPieces = cloneDeep(
                state.blackPieces.filter((p) => p.id !== piece.id),
            );

            // See if the move was valid
            let move = null;
            for (let i = 0; i < validMoves.length; i++) {
                if (validMoves[i].to === to) {
                    move = validMoves[i];
                }
            }

            // If invalid move, return
            if (!move) {
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
                    validMove,
                    newBoardConfig,
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

                // Update one-time move restrictions
                if (piece.name === "King") {
                    piece.castlingAvailable = false;
                } else if (piece.name === "Pawn") {
                    piece.moveTwoAvailable = false;
                } else if (piece.name === "Rook") {
                    piece.hasMoved = true;
                }

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

                // Detect check
                // check(piece, newBoard);

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
            const {
                newWhitePieces,
                newBlackPieces,
                newBoardConfig,
            } = populateMoves(state.allPieces, state.boardConfig);

            // Update history immutably with up-to-date pieces
            const newHistory = [
                ...cloneDeep(state.history).slice(0, state.history.length - 1),
                { boardConfig: newBoardConfig },
            ];
            // console.log(newHistory);

            return (state = {
                ...state,
                allPieces: [...newWhitePieces, ...newBlackPieces],
                whitePieces: newWhitePieces,
                blackPieces: newBlackPieces,
                boardConfig: newBoardConfig,
                history: newHistory,
            });
        }
        case PICK_UP_PIECE: {
            const piece = action.piece;
            const board = state.boardConfig;
            let selectedPieceMoves = [];
            for (let col = 0; col < 8; col++) {
                for (let row = 0; row < 8; row++) {
                    // Get reference to tile and test move
                    const tile = convertNotation([col, row]).join("");
                    let { validMove } = chessMove(
                        tile,
                        piece.strChessCoords,
                        piece,
                        board,
                    );

                    if (validMove) {
                        selectedPieceMoves.push(tile);
                    }
                }
            }
            return (state = {
                ...state,
                selectedPiece: action.piece,
                selectedPieceMoves,
                isDragging: true,
            });
        }

        default:
            return state;
    }
};
