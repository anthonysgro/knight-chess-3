// Import action types
import { START_GAME, DROP_PIECE } from "../../actions";

// Import Game Logic
import { init, adjacentTile } from "../../../gameLogic";

//testing...
import { bishopLogic } from "../../../gameLogic/basicMoves";

// Initial State
const initialState = {
    currentBoard: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
    whitePieces: [],
    blackPieces: [],
    history: [],
    stepNumber: 0,
    whiteIsNext: true,
    rotation: 0,
    endGame: false,
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return (state = init());
        case DROP_PIECE:
            console.log("from: ", action.from);
            console.log("piece: ", action.piece.name);
            console.log("to: ", action.to);
            let validMove = bishopLogic(
                action.to,
                action.from,
                action.piece,
                state.currentBoard,
            );
            console.log(validMove);

            return state;
        default:
            return state;
    }
};
