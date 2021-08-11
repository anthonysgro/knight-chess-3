//sound
function playChatSound() {
    let chatSound = new Audio("/sounds/Chat.mp3");
    let playChat = chatSound.play();
    if (playChat !== undefined) {
        playChat
            .then(function () {})
            .catch(function (error) {
                console.log("Failed to load capture sound");
            });
    }
}

export default playChatSound;
