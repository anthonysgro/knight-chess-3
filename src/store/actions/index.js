// Action Types
export const MOVE_PIECE = "MOVE_PIECE";
export const START_GAME = "START_GAME";

// Action Creators
export const movePiece = (payload) => {
    return {
        type: MOVE_PIECE,
        payload,
    };
};

export const startGame = (payload) => {
    return {
        type: START_GAME,
        payload,
    };
};
