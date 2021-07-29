// Action Types
export const START_GAME = "START_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const PICK_UP_PIECE = "PICK_UP_PIECE";
export const DROP_PIECE = "DROP_PIECE";
export const POPULATE_MOVES = "POPULATE_MOVES";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const ROTATE_BOARD = "ROTATE_BOARD";
export const RESET_ROTATION = "RESET_ROTATION";
export const CREATE_GAME_CODE = "CREATE_GAME_CODE";
export const ADD_USER_TO_GAME = "ADD_USER_TO_GAME";
export const PLAYER_2_JOINED = "PLAYER_2_JOINED";
export const OPPONENT_MOVED = "OPPONENT_MOVED";

// Import Game Initializer
import { init } from "../../gameLogic";

// Action Creators
export const startGame = (playerIsWhite) => {
    const payload = init();
    return {
        type: START_GAME,
        payload,
        playerIsWhite,
    };
};

export const joinGame = (gameState, roomCode, player1) => {
    return {
        type: JOIN_GAME,
        payload: gameState,
        gameCode: roomCode,
        player1,
    };
};

export const player2Joined = (player2) => {
    return {
        type: PLAYER_2_JOINED,
        player2,
    };
};

export const pickUpPiece = (piece, thisPlayerWhite) => {
    return {
        type: PICK_UP_PIECE,
        piece,
        thisPlayerWhite,
    };
};

export const dropPiece = (piece, to, gameCode, playerId, thisPlayerWhite) => {
    return {
        type: DROP_PIECE,
        from: piece.strChessCoords,
        piece,
        to,
        gameCode,
        playerId,
        thisPlayerWhite,
    };
};

export const opponentMoved = (newState) => {
    return {
        type: OPPONENT_MOVED,
        newState,
    };
};

export const populateMoves = (gameCode, playerId) => {
    return {
        type: POPULATE_MOVES,
        gameCode,
        playerId,
    };
};

export const toggleSidebar = () => {
    return {
        type: TOGGLE_SIDEBAR,
    };
};

export const rotateBoard = () => {
    return {
        type: ROTATE_BOARD,
    };
};

export const resetRotation = () => {
    return {
        type: RESET_ROTATION,
    };
};

export const createGameCode = (gameCode) => {
    return {
        type: CREATE_GAME_CODE,
        gameCode,
    };
};

export const addUserToGame = (socketId) => {
    return {
        type: ADD_USER_TO_GAME,
        socketId,
    };
};
