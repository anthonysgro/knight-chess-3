// Action Types
export const START_GAME = "START_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const PICK_UP_PIECE = "PICK_UP_PIECE";
export const DROP_PIECE = "DROP_PIECE";
export const POPULATE_MOVES = "POPULATE_MOVES";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const ROTATE_BOARD = "ROTATE_BOARD";
export const CREATE_GAME_CODE = "CREATE_GAME_CODE";
export const ADD_USER_TO_GAME = "ADD_USER_TO_GAME";
export const PLAYER_2_JOINED = "PLAYER_2_JOINED";
export const OPPONENT_MOVED = "OPPONENT_MOVED";

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

export const pickUpPiece = (piece) => {
    return {
        type: PICK_UP_PIECE,
        piece,
    };
};

export const dropPiece = (piece, to, gameCode, playerId) => {
    return {
        type: DROP_PIECE,
        from: piece.strChessCoords,
        piece,
        to,
        gameCode,
        playerId,
    };
};

export const opponentMoved = (newState) => {
    return {
        type: OPPONENT_MOVED,
        newState,
    };
};

export const populateMoves = () => {
    return {
        type: POPULATE_MOVES,
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
