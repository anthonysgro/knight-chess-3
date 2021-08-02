function handleMove(newState, gameCode, playerId, roomStates, server) {
    roomStates[gameCode] = newState;
    server.to(gameCode).emit("playerMoved", newState, playerId); // broadcast new state
}

module.exports = handleMove;
