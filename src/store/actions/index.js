// Action Types
export const MOVE_PIECE = "MOVE_PIECE";

// Action Creators
export const movePiece = (payload) => {
    return {
        type: MOVE_PIECE,
        payload,
    };
};
