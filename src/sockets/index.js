import store from "../store";
import {
    createGameCode,
    addUserToGame,
    stopLobbyLoading,
    joinGame,
    player2Joined,
    opponentMoved,
    rematchProposed,
    rematchAccepted,
} from "../store/actions";
import { parseState } from "../scripts";

function enableSocketListeners() {
    window.socket = io();

    // Dispatches the game code
    window.socket.on("gameCode", (gameCode) => {
        store.dispatch(createGameCode(gameCode));
    });

    // Adds a user to the game
    window.socket.on("addUserToGame", (clientId) => {
        store.dispatch(addUserToGame(clientId));
    });

    window.socket.on("joinGame", (gameState, roomCode, player1) => {
        store.dispatch(joinGame(parseState(gameState), roomCode, player1));
    });

    window.socket.on("player2Joined", (player2) => {
        store.dispatch(player2Joined(player2));
    });

    window.socket.on("playerMoved", (newState, playerId) => {
        if (window.socket.id !== playerId) {
            store.dispatch(opponentMoved(parseState(newState)));
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
}

export default enableSocketListeners;
