// Action Types
export const START_ONLINE_MULTIPLAYER = "START_MULTIPLAYER";
export const START_LOCAL_MULTIPLAYER = "START_LOCAL_MULTIPLAYER";
export const START_BOT_BATTLE = "START_BOT_BATTLE";
export const START_SANDBOX = "START_SANDBOX";

// Import Game Initializer
import { init } from "../../gameLogic";

export const startOnlineMultiplayer = () => {
    return {
        type: START_ONLINE_MULTIPLAYER,
    };
};

export const startLocalMultiplayer = () => {
    return {
        type: START_LOCAL_MULTIPLAYER,
    };
};

export const startBotBattle = () => {
    const payload = init();
    return {
        type: START_BOT_BATTLE,
        payload,
    };
};

export const startSandbox = () => {
    return {
        type: START_SANDBOX,
    };
};
