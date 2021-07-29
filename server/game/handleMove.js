const parseState = require("./parseState");

function handleMove(newState, gameCode, playerId, roomStates, server) {
    roomStates[gameCode] = parseState(newState);
    server.to(gameCode).emit("playerMoved", newState, playerId); // broadcast new state
}

module.exports = handleMove;
