// Import Actions
import {
    TOGGLE_SIDEBAR,
    ROTATE_BOARD,
    RENDER_CARD_BACKGROUND,
    REMOVE_CARD_BACKGROUND,
    SET_LOBBY_LOADING,
    STOP_LOBBY_LOADING,
    JOIN_GAME,
    RESET_ROTATION,
    PROPOSE_REMATCH,
    ACCEPT_REMATCH,
    REMATCH_PROPOSED,
    REMATCH_ACCEPTED,
} from "../../actions";

import { renderCards, removeCards } from "../../../card";

const initialState = {
    sidebarOpen: false,
    rotated: false,
    cardsFalling: false,
    lobbyLoading: false,
    lobbyMsg: "",
    joinSuccessful: false,
    pendingRematch: false,
    playerProposedRematch: false,
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
        case RESET_ROTATION:
            return (state = {
                ...state,
                rotated: false,
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
        case SET_LOBBY_LOADING:
            return (state = {
                ...state,
                lobbyLoading: true,
                lobbyMsg: "",
            });
        case STOP_LOBBY_LOADING:
            return (state = {
                ...state,
                lobbyLoading: false,
                lobbyMsg: action.msg || "",
            });
        case JOIN_GAME:
            return (state = {
                ...state,
                joinSuccessful: true,
                lobbyLoading: false,
            });
        case PROPOSE_REMATCH:
            return (state = {
                ...state,
                pendingRematch: true,
                playerProposedRematch: true,
            });
        case ACCEPT_REMATCH:
            return (state = {
                ...state,
                pendingRematch: false,
            });
        case REMATCH_PROPOSED:
            return (state = {
                ...state,
                pendingRematch: true,
            });
        case REMATCH_ACCEPTED:
            return (state = {
                ...state,
                pendingRematch: false,
                playerProposedRematch: false,
            });
        default:
            return state;
    }
};
