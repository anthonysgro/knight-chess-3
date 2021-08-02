function handleDisconnect(client, server, clientRooms) {
    const { rooms } = server.sockets.adapter;
    const gameCode = clientRooms[client.id];
    client.leave(gameCode);

    server.to(gameCode).emit("opponentLeft");
}

module.exports = handleDisconnect;
