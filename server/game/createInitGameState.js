function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = JSON.parse(initState);
}

module.exports = createInitGameState;
