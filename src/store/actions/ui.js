export const RENDER_CARD_BACKGROUND = "RENDER_CARD_BACKGROUND";
export const REMOVE_CARD_BACKGROUND = "REMOVE_CARD_BACKGROUND";
export const SET_LOBBY_LOADING = "SET_LOBBY_LOADING";
export const STOP_LOBBY_LOADING = "STOP_LOBBY_LOADING";

export const renderCardBackground = () => {
    return {
        type: RENDER_CARD_BACKGROUND,
    };
};

export const removeCardBackground = () => {
    return {
        type: REMOVE_CARD_BACKGROUND,
    };
};

export const setLobbyLoading = () => {
    return {
        type: SET_LOBBY_LOADING,
    };
};

export const stopLobbyLoading = (msg) => {
    return {
        type: STOP_LOBBY_LOADING,
        msg,
    };
};
