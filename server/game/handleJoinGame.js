function handleJoinGame(code, client, server, clientRooms, roomStates) {
    const room = server.sockets.adapter.rooms.get(code);
    const numClients = room ? room.size : 0;

    if (!room) {
        client.emit("unknownGame");
        return;
    }

    if (!room.has(client.id)) {
        if (numClients === 0) {
            client.emit("unknownGame");
            return;
        } else if (numClients > 1) {
            client.emit("tooManyPlayers");
            return;
        }

        let player1 = "";
        for (const player of room.values()) {
            player1 = player;
        }

        clientRooms[client.id] = code;
        client.join(code);
        client.playerNumber = 2;

        if (!roomStates[code]) {
            server.to(code).emit("communicationError", client.id);
        }

        client.emit("joinGame", roomStates[code], code, player1);
        server.to(code).emit("player2Joined", client.id);

        roomStates[code] = "";
    } else {
        client.emit("rejoinGame", roomStates[code], code);
    }
}

module.exports = handleJoinGame;
