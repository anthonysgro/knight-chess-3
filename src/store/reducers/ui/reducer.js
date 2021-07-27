// Import Actions
import {
    TOGGLE_SIDEBAR,
    ROTATE_BOARD,
    RENDER_CARD_BACKGROUND,
    REMOVE_CARD_BACKGROUND,
} from "../../actions";

import { renderCards, removeCards } from "../../../card";

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
        case RENDER_CARD_BACKGROUND:
            renderCards();
            return (state = {
                ...state,
                cardsFalling: true,
            });
        case REMOVE_CARD_BACKGROUND:
            removeCards();
            return (state = {
                ...state,
                cardsFalling: false,
            });
        default:
            return state;
    }
};
