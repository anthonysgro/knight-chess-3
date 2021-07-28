function enableSocketListeners() {
    window.socket = io();

    // window.socket.on("init", handleInit);
    window.socket.on("gameCode", (gameCode) => {
        console.log(gameCode);
    });
}

export default enableSocketListeners;
