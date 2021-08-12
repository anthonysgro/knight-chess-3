function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = initState;
    if (roomStates[gameCode]) {
        console.log(
            "CREATE INIT GAME STATE",
            roomStates[gameCode].substring(0, 100),
        );
    } else {
        console.log(" CREATE INIT GAME STATE:", "IT ISNT HERE!");
    }
}

module.exports = createInitGameState;
