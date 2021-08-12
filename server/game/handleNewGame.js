const generateGameCode = require("./generateGameCode");

function handleNewGame(client, clientRooms, roomStates, gamecode) {
    clientRooms[client.id] = gamecode;
    // client.emit("gameCode", roomName);

    client.playerNumber = 1;
    client.join(gamecode);
}

module.exports = handleNewGame;
