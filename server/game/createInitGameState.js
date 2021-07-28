function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = JSON.parse(initState);
    console.log(roomStates);
}

module.exports = createInitGameState;
