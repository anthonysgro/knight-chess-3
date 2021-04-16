// Import action types
import { MOVE_PIECE } from "../../actions";

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
    history: [],
    stepNumber: 0,
    whiteIsNext: true,
    rotation: 0,
    endGame: false,
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case MOVE_PIECE:
            return state;
        default:
            return state;
    }
};
