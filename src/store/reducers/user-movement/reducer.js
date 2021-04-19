// Import action types
import { PICK_UP_PIECE, DROP_PIECE } from "../../actions";

const initialState = {};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case PICK_UP_PIECE:
            return state;
        case DROP_PIECE:
            return state;
        default:
            return state;
    }
};
