const parseState = require("./parseState");
function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = JSON.parse(initState);
    console.log(roomStates[gameCode].substring(0, 50));
}

module.exports = createInitGameState;
