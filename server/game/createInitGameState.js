const parseState = require("./parseState");
function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = parseState(initState);
}

module.exports = createInitGameState;
