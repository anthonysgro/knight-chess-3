function handleJoinGame(code, client, server, clientRooms, roomStates) {
    // console.log(server.sockets.adapter.rooms, code);
    const room = server.sockets.adapter.rooms.get(code);
    const numClients = room ? room.size : 0;
    // const numClients = allUsers ? Object.keys(allUsers).length : 0;

    console.log(room, numClients);
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

    console.log(roomStates);
    client.emit("joinGame", roomStates[code]);
}

module.exports = handleJoinGame;
