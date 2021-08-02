// Action Types
export const START_GAME = "START_GAME";
export const RESET_INIT = "RESET_INIT";
export const JOIN_GAME = "JOIN_GAME";
export const REJOIN_GAME = "REJOIN_GAME";
export const PICK_UP_PIECE = "PICK_UP_PIECE";
export const DROP_PIECE = "DROP_PIECE";
export const POPULATE_MOVES = "POPULATE_MOVES";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const ROTATE_BOARD = "ROTATE_BOARD";
export const RESET_ROTATION = "RESET_ROTATION";
export const FORCE_ROTATION = "FORCE_ROTATION";
export const CREATE_GAME_CODE = "CREATE_GAME_CODE";
export const ADD_USER_TO_GAME = "ADD_USER_TO_GAME";
export const PLAYER_2_JOINED = "PLAYER_2_JOINED";
export const OPPONENT_MOVED = "OPPONENT_MOVED";
export const PROPOSE_REMATCH = "PROPOSE_REMATCH";
export const REMATCH_PROPOSED = "REMATCH_PROPOSED";
export const ACCEPT_REMATCH = "ACCEPT_REMATCH";
export const REMATCH_ACCEPTED = "REMATCH_ACCEPTED";
export const START_LOCAL_GAME = "START_LOCAL_GAME";
export const EDIT_UNDERPROMOTION = "EDIT_UNDERPROMOTION";
export const RESIGN = "RESIGN";
export const OPPONENT_RESIGNS = "OPPONENT_RESIGNS";
export const OFFER_DRAW = "OFFER_DRAW";
export const OPPONENT_OFFERS_DRAW = "OPPONENT_OFFERS_DRAW";
export const OPPONENT_DECLINES_DRAW = "OPPONENT_DECLINES_DRAW";
export const OPPONENT_ACCEPTS_DRAW = "OPPONENT_ACCEPTS_DRAW";
export const DECLINE_DRAW = "DECLINE_DRAW";
export const ACCEPT_DRAW = "ACCEPT_DRAW";
export const OPPONENT_LEFT = "OPPONENT_LEFT";

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

export const resetInit = () => {
    return {
        type: RESET_INIT,
    };
};

export const startLocalGame = () => {
    const payload = init();
    return {
        type: START_LOCAL_GAME,
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

export const rejoinGame = (gameState, roomCode) => {
    return {
        type: REJOIN_GAME,
        payload: gameState,
        gameCode: roomCode,
    };
};

export const player2Joined = (player2) => {
    return {
        type: PLAYER_2_JOINED,
        player2,
    };
};

export const pickUpPiece = (piece, thisPlayerWhite, gameModes) => {
    return {
        type: PICK_UP_PIECE,
        piece,
        thisPlayerWhite,
        gameModes,
    };
};

export const dropPiece = (
    piece,
    to,
    gameCode,
    playerId,
    thisPlayerWhite,
    underpromotion,
    gameModes,
) => {
    return {
        type: DROP_PIECE,
        from: piece.strChessCoords,
        piece,
        to,
        gameCode,
        playerId,
        thisPlayerWhite,
        underpromotion,
        gameModes,
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

export const forceRotation = () => {
    return {
        type: FORCE_ROTATION,
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

export const proposeRematch = (gameCode) => {
    window.socket.emit("proposeRematch", gameCode);

    return {
        type: PROPOSE_REMATCH,
    };
};

export const acceptRematch = (gameCode) => {
    const payload = {
        ...init(),
        whiteHasPlayer: true,
        blackHasPlayer: true,
    };

    window.socket.emit("acceptRematch", gameCode, JSON.stringify(payload));

    return {
        type: ACCEPT_REMATCH,
        payload,
    };
};

export const rematchProposed = () => {
    return {
        type: REMATCH_PROPOSED,
    };
};

export const rematchAccepted = (gameState) => {
    return {
        type: REMATCH_ACCEPTED,
        payload: gameState,
    };
};

export const editUnderpromotion = ({ target }) => {
    return {
        type: EDIT_UNDERPROMOTION,
        value: target.value,
    };
};

export const resign = (gameCode, online, thisPlayerWhite) => {
    if (online) {
        window.socket.emit("resign", gameCode);
    }

    return {
        type: RESIGN,
        online,
        thisPlayerWhite,
    };
};

export const opponentResigns = (thisPlayerWhite) => {
    return {
        type: OPPONENT_RESIGNS,
        thisPlayerWhite,
    };
};

export const offerDraw = (gameCode) => {
    window.socket.emit("offerDraw", gameCode);

    return {
        type: OFFER_DRAW,
    };
};

export const opponentOffersDraw = () => {
    return {
        type: OPPONENT_OFFERS_DRAW,
    };
};

export const declineDraw = (gameCode) => {
    window.socket.emit("declineDraw", gameCode);
    return {
        type: DECLINE_DRAW,
    };
};

export const opponentDeclinesDraw = () => {
    return {
        type: OPPONENT_DECLINES_DRAW,
    };
};

export const acceptDraw = () => {
    window.socket.emit("acceptDraw", gameCode);
    return {
        type: ACCEPT_DRAW,
    };
};

export const opponentAcceptsDraw = () => {
    return {
        type: OPPONENT_ACCEPTS_DRAW,
    };
};

export const opponentLeft = (thisPlayerWhite) => {
    return {
        type: OPPONENT_LEFT,
        online: true,
        thisPlayerWhite,
    };
};
