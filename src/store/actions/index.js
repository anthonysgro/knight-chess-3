// Action Types
export const START_GAME = "START_GAME";
export const PICK_UP_PIECE = "PICK_UP_PIECE";
export const DROP_PIECE = "DROP_PIECE";

// Import Game Initializer
import { init } from "../../gameLogic";

// Action Creators
export const startGame = () => {
    const payload = init();
    return {
        type: START_GAME,
        payload,
    };
};

export const pickUpPiece = (piece) => {
    return {
        type: PICK_UP_PIECE,
        piece,
    };
};

export const dropPiece = (piece, to) => {
    return {
        type: DROP_PIECE,
        from: piece.strChessCoords,
        piece,
        to,
    };
};
