//sound
function playConfirmationSound() {
    let confirmationSound = new Audio("/sounds/Confirmation.mp3");
    let playConfirmation = confirmationSound.play();
    if (playConfirmation !== undefined) {
        playConfirmation
            .then(function () {})
            .catch(function (error) {
                console.log("Failed to load capture sound");
            });
    }
}

export default playConfirmationSound;
