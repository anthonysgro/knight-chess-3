function handleMove(
    newState,
    toFromData,
    gameCode,
    playerId,
    roomStates,
    server,
) {
    // roomStates[gameCode] = newState;
    server.to(gameCode).emit("playerMoved", newState, toFromData, playerId); // broadcast new state
}

module.exports = handleMove;
