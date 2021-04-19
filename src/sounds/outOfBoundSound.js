function playOutOfBoundSound() {
    let outOfBoundSound = new Audio("/sounds/OutOfBound.mp3");
    let playOutOfBound = outOfBoundSound.play();
    if (playOutOfBound !== undefined) {
        playOutOfBound
            .then(function () {})
            .catch(function (error) {
                console.log("Failed to load move sound");
            });
    }
}

export default playOutOfBoundSound;
