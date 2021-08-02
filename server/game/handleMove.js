function handleMove(newState, gameCode, playerId, roomStates, server) {
    roomStates[gameCode] = newState;
    console.log("**********");
    console.log("PLAYER MOVED");
    if (roomStates[gameCode]) {
        console.log(newState.substring(0, 50));
    } else {
        console.log("No state sent on move somehow...");
    }
    console.log("**********");
    server.to(gameCode).emit("playerMoved", newState, playerId); // broadcast new state
}

module.exports = handleMove;
