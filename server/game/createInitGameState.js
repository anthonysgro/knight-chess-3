const parseState = require("./parseState");
function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = JSON.parse(initState);
    // console.log(roomStates[gameCode]);
}

module.exports = createInitGameState;
