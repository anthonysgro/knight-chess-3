import store from "../store";
import {
    createGameCode,
    addUserToGame,
    stopLobbyLoading,
} from "../store/actions";

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

    window.socket.on("joinGame", () => {});

    // If a game you are trying to join does not exist
    window.socket.on("unknownGame", () => {
        store.dispatch(stopLobbyLoading("Room does not exist"));
    });

    // If a game you are trying to join has too many players
    window.socket.on("tooManyPlayers", () => {
        store.dispatch(stopLobbyLoading("This game is full"));
    });
}

export default enableSocketListeners;
