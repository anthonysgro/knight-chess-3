const generateGameCode = require("./generateGameCode");

function handleNewGame(client, clientRooms) {
    const roomName = generateGameCode(7);
    console.log("hit", roomName);
    clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);

    client.join(roomName);
}

module.exports = handleNewGame;
