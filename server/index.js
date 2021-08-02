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
    handleMove,
} = require("./game");

// Logging middleware
// app.use(morgan("dev"));

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
    socket.on("error", function (err) {
        console.log("Socket.IO Error");
        console.log(err.stack); // this is changed from your code in last comment
    });

    // Match Creation
    socket.on("newGame", () => handleNewGame(socket, clientRooms, roomStates));

    socket.on("createInitGameState", (gameCode, initState) =>
        createInitGameState(gameCode, initState, roomStates),
    );

    socket.on("joinGame", (gameCode) =>
        handleJoinGame(gameCode, socket, socketServer, clientRooms, roomStates),
    );

    // Simple Moving
    socket.on("movePiece", (newState, gameCode, playerId) =>
        handleMove(newState, gameCode, playerId, roomStates, socketServer),
    );

    // New Match
    socket.on("proposeRematch", (gameCode) => {
        socketServer.to(gameCode).emit("rematchProposed");
    });

    socket.on("acceptRematch", (gameCode, initState) => {
        roomStates[gameCode] = initState;
        socketServer.to(gameCode).emit("rematchAccepted", roomStates[gameCode]);
    });

    // Resigning
    socket.on("resign", (gameCode) => {
        socketServer.to(gameCode).emit("opponentResigns", socket.id);
    });

    // Drawing
    socket.on("offerDraw", (gameCode) => {
        socketServer.to(gameCode).emit("opponentOffersDraw");
    });

    socket.on("acceptDraw", (gameCode) => {
        socketServer.to(gameCode).emit("opponentAcceptsDraw");
    });

    socket.on("declinesDraw", (gameCode) => {
        socketServer.to(gameCode).emit("opponentDeclinesDraw");
    });
});
