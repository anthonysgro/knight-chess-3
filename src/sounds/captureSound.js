//sound
function playCaptureSound() {
    let captureSound = new Audio("/sounds/Capture.mp3");
    let playCapture = captureSound.play();
    if (playCapture !== undefined) {
        playCapture
            .then(function () {})
            .catch(function (error) {
                console.log("Failed to load capture sound");
            });
    }
}

export default playCaptureSound;
