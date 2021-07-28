function handleJoinGame(code, client, server, clientRooms, roomStates) {
    const room = server.sockets.adapter.rooms.get(code);
    const numClients = room ? room.size : 0;

    if (numClients === 0) {
        client.emit("unknownGame");
        return;
    } else if (numClients > 1) {
        client.emit("tooManyPlayers");
        return;
    }

    clientRooms[client.id] = code;
    client.join(code);
    client.playerNumber = 2;

    client.emit("joinGame", JSON.stringify(roomStates[code]), code);
}

module.exports = handleJoinGame;
