const parseState = require("./parseState");

function handleMove(newState, gameCode, playerId, roomStates, server) {
    roomStates[gameCode] = newState;
    console.log("****");
    console.log("PLAYER MOVED");
    server.to(gameCode).emit("playerMoved", newState, playerId); // broadcast new state
}

module.exports = handleMove;
