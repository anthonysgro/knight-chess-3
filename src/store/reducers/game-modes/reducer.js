import {
    START_ONLINE_MULTIPLAYER,
    START_LOCAL_MULTIPLAYER,
    START_BOT_BATTLE,
    START_SANDBOX,
    RESET_INIT,
    RENDER_CARD_BACKGROUND,
} from "../../actions";

const initialState = {
    onlineMultiplayer: false,
    localMultiplayer: false,
    botBattle: false,
    sandbox: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case START_ONLINE_MULTIPLAYER:
            return (state = {
                onlineMultiplayer: true,
                localMultiplayer: false,
                botBattle: false,
                sandbox: false,
            });
        case START_LOCAL_MULTIPLAYER:
            return (state = {
                onlineMultiplayer: false,
                localMultiplayer: true,
                botBattle: false,
                sandbox: false,
            });
        case START_BOT_BATTLE:
            return (state = {
                onlineMultiplayer: false,
                localMultiplayer: false,
                botBattle: true,
                sandbox: false,
            });
        case START_SANDBOX:
            return (state = {
                onlineMultiplayer: false,
                localMultiplayer: false,
                botBattle: false,
                sandbox: true,
            });
        case RESET_INIT: {
            return (state = initialState);
        }

        case RENDER_CARD_BACKGROUND: {
            return (state = RENDER_CARD_BACKGROUND);
        }

        default:
            return state;
    }
};
