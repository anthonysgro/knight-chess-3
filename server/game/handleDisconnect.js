var tryReconnect = function (client) {
    // console.log(client);
    if (client.connected === false && client.disconnected === true) {
        // use a connect() or reconnect() here if you want
        // client.connect();
    }
};

function handleDisconnect(client, server, clientRooms) {
    // const { rooms } = server.sockets.adapter;
    // const gameCode = clientRooms[client.id];
    // tryReconnect(client);
    // // If we couldn't reconnect...
    // if (!client.connected) {
    //     client.leave(gameCode);
    //     server.to(gameCode).emit("opponentLeft");
    //     // Otherwise, resubscribe to room
    // } else {
    //     clientRooms[client.id] = gameCode;
    //     client.join(gameCode);
    // }
}

module.exports = handleDisconnect;
