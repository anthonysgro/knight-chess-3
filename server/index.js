const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 9000;
const morgan = require("morgan");
const app = express();
const io = require("socket.io");
const {
    handleNewGame,
    handleJoinGame,
    createInitGameState,
} = require("./game");

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, "../public")));

// Send file
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling endware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "Internal server error");
});

const server = app.listen(PORT, () =>
    console.log(`

  Listening on port ${PORT}
  http://localhost:${PORT}/

`),
);

const socketServer = new io.Server(server);
const roomStates = {};
const clientRooms = {};

// Handle socket connection request from a web client
socketServer.on("connection", (socket) => {
    socket.on("newGame", () => handleNewGame(socket, clientRooms, roomStates));

    socket.on("createInitGameState", (gameCode, initState) =>
        createInitGameState(gameCode, JSON.parse(initState), roomStates),
    );

    socket.on("joinGame", (gameCode) =>
        handleJoinGame(gameCode, socket, socketServer, clientRooms, roomStates),
    );
});
