import store from "../store";
import {
    createGameCode,
    addUserToGame,
    stopLobbyLoading,
    joinGame,
    rejoinGame,
    player2Joined,
    opponentMoved,
    rematchProposed,
    rematchAccepted,
    startOnlineMultiplayer,
    opponentOffersDraw,
    opponentAcceptsDraw,
    opponentDeclinesDraw,
    opponentResigns,
    opponentLeft,
    receiveChat,
    communicationError,
} from "../store/actions";
import { parseState } from "../scripts";

function enableSocketListeners(io) {
    window.socket = io({ transports: ["websocket", "polling"] });

    // Dispatches the game code
    window.socket.on("gameCode", (gameCode) => {
        store.dispatch(createGameCode(gameCode));
    });

    // Adds a user to the game
    window.socket.on("addUserToGame", (clientId) => {
        store.dispatch(addUserToGame(clientId));
    });

    window.socket.on("joinGame", (gameState, roomCode, player1) => {
        store.dispatch(startOnlineMultiplayer());
        store.dispatch(
            joinGame(parseState(gameState, [], false), roomCode, player1),
        );
    });

    window.socket.on("rejoinGame", (gameState, roomCode) => {
        store.dispatch(startOnlineMultiplayer());
        const gameHistory = store.getState().boardState.history;
        store.dispatch(
            rejoinGame(parseState(gameState, gameHistory, true), roomCode),
        );
    });

    window.socket.on("player2Joined", (player2) => {
        store.dispatch(player2Joined(player2));
    });

    window.socket.on("playerMoved", (newState, toFromData, playerId) => {
        const gameHistory = store.getState().boardState.history;
        if (window.socket.id !== playerId) {
            store.dispatch(
                opponentMoved(
                    parseState(newState, gameHistory, true, toFromData),
                ),
            );
        }
    });

    // If a game you are trying to join does not exist
    window.socket.on("unknownGame", () => {
        store.dispatch(stopLobbyLoading("Room does not exist"));
    });

    // If a game you are trying to join has too many players
    window.socket.on("tooManyPlayers", () => {
        store.dispatch(stopLobbyLoading("This game is full"));
    });

    // Handling rematches
    window.socket.on("rematchProposed", () => {
        if (!store.getState().ui.playerProposedRematch) {
            store.dispatch(rematchProposed());
        }
    });

    window.socket.on("rematchAccepted", (gameState) => {
        store.dispatch(rematchAccepted(parseState(gameState)));
    });

    // Handling resigning and draw offers
    window.socket.on("opponentResigns", (playerId) => {
        const { thisPlayerWhite } = store.getState().gameInfo;
        if (playerId !== window.socket.id) {
            store.dispatch(opponentResigns(thisPlayerWhite));
        }
    });

    window.socket.on("opponentOffersDraw", () => {
        store.dispatch(opponentOffersDraw());
    });

    window.socket.on("opponentAcceptsDraw", () => {
        store.dispatch(opponentAcceptsDraw());
    });

    window.socket.on("opponentDeclinesDraw", () => {
        store.dispatch(opponentDeclinesDraw());
    });

    window.socket.on("opponentLeft", () => {
        const thisPlayerWhite = store.getState().gameInfo.thisPlayerWhite;
        store.dispatch(opponentLeft(thisPlayerWhite));
    });

    window.socket.on("receiveChat", (playerId, msg) => {
        if (playerId !== window.socket.id) {
            store.dispatch(receiveChat(msg, playerId));
        }
    });

    window.socket.on("communicationError", (playerId) => {
        if (playerId === window.socket.id) {
            store.dispatch(stopLobbyLoading("Server error, try new room."));
        } else {
            store.dispatch(communicationError());
        }
    });
}

export default enableSocketListeners;
