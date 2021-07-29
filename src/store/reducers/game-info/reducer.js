import {
    CREATE_GAME_CODE,
    ADD_USER_TO_GAME,
    START_GAME,
    JOIN_GAME,
    PLAYER_2_JOINED,
} from "../../actions";

const initialState = {
    winningPlayer: undefined,
    player1: "",
    player2: "",
    thisPlayerWhite: false,
    gameCode: "",
};

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME_CODE: {
            return (state = {
                ...state,
                gameCode: action.gameCode,
            });
        }

        case START_GAME: {
            return (state = {
                ...state,
                player1: window.socket.id,
                thisPlayerWhite: action.playerIsWhite,
            });
        }

        case JOIN_GAME: {
            const otherPlayerWhite = action.payload.whiteHasPlayer;

            return (state = {
                ...state,
                player1: action.player1,
                player2: window.socket.id,
                gameCode: action.gameCode,
                thisPlayerWhite: !otherPlayerWhite,
            });
        }

        case PLAYER_2_JOINED: {
            return (state = {
                ...state,
                player2: action.player2,
            });
        }

        case ADD_USER_TO_GAME: {
            if (!state.player1) {
                return (state = {
                    ...state,
                    player1: action.socketId,
                });
            } else if (!state.player2) {
                return (state = {
                    ...state,
                    player2: action.socketId,
                });
            }
        }

        default: {
            return state;
        }
    }
};
