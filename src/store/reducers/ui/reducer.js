// Import Actions
import { TOGGLE_SIDEBAR, ROTATE_BOARD } from "../../actions";

const initialState = {
    sidebarOpen: false,
    rotated: false,
    cardsFalling: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return (state = {
                ...state,
                sidebarOpen: !state.sidebarOpen,
            });
        case ROTATE_BOARD:
            return (state = {
                ...state,
                rotated: !state.rotated,
            });

        default:
            return state;
    }
};
