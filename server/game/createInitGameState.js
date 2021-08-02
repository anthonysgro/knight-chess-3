function createInitGameState(gameCode, initState, roomStates) {
    roomStates[gameCode] = JSON.parse(initState);
    console.log("**********");
    console.log("CreateInitGameState");
    if (roomStates[gameCode]) {
        console.log(JSON.stringify(roomStates[gameCode]).substring(0, 50));
    } else {
        console.log("Did not create the game state in the room...");
    }
    console.log("**********");
}

module.exports = createInitGameState;
