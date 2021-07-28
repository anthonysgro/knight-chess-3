const generateGameCode = require("./generateGameCode");

function handleNewGame(client, clientRooms, roomStates) {
    const roomName = generateGameCode(7);

    clientRooms[client.id] = roomName;

    client.emit("gameCode", roomName);
    // client.emit("addUserToGame", client.id);

    client.playerNumber = 1;
    client.join(roomName);
}

module.exports = handleNewGame;
