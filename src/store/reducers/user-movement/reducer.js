// Import action types
import { PICK_UP_PIECE, DROP_PIECE } from "../../actions";

const initialState = {
    selectedPiece: null,
    isDragging: false,
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case PICK_UP_PIECE:
            return (state = {
                ...state,
                selectedPiece: action.piece,
                isDragging: true,
            });
        case DROP_PIECE:
            return (state = {
                ...state,
                selectedPiece: null,
                isDragging: false,
            });
        default:
            return state;
    }
};
