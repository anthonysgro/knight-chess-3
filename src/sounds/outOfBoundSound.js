function playOutOfBoundSound() {
    let moveSound = new Audio("/sounds/OutOfBound.mp3");
    let playMove = moveSound.play();
    if (playMove !== undefined) {
        playMove
            .then(function () {})
            .catch(function (error) {
                console.log("Failed to load move sound");
            });
    }
}

export default playOutOfBoundSound;
