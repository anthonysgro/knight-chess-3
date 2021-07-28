import store from "../store";
import { createGameCode, addUserToGame } from "../store/actions";

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
}

export default enableSocketListeners;
