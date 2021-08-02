const parseState = require("./parseState");
function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = parseState(initState);
    console.log(roomStates[gameCode]);
}

module.exports = createInitGameState;
