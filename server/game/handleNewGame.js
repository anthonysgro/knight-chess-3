const generateGameCode = require("./generateGameCode");

function handleNewGame(client, clientRooms, roomStates) {
    const roomName = generateGameCode(7);

    clientRooms[client.id] = roomName;

    console.log(roomName);
    client.emit("gameCode", roomName);

    client.playerNumber = 1;
    client.join(roomName);
}

module.exports = handleNewGame;
