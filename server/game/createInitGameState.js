function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = initState;
}

module.exports = createInitGameState;
