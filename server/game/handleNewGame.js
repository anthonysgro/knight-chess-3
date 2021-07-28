const generateGameCode = require("./generateGameCode");

function handleNewGame(client, clientRooms) {
    const roomName = generateGameCode(7);

    clientRooms[client.id] = roomName;

    client.emit("gameCode", roomName);
    client.emit("addUserToGame", client.id);

    client.join(roomName);
}

module.exports = handleNewGame;
