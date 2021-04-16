// Import action types
import { START_GAME, MOVE_PIECE } from "../../actions";

// Import Game Initializer
import { init } from "../../../gameLogic";

// Initial State
const initialState = {
    currentBoard: [
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
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
        case MOVE_PIECE:
            return state;
        default:
            return (state = init());
    }
};
