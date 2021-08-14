import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startGame,
    joinGame,
    setLobbyLoading,
    stopLobbyLoading,
    startOnlineMultiplayer,
    createGameCode,
    resetInit,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import Loading from "./Loading.jsx";
import { generateGameCode } from "../scripts";
import AreYouSure from "./AreYouSure.jsx";

const LobbyPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [gamecode, setGamecode] = useState(() => "");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [hoverSubmitCode, setHoverSubmitCode] = useState(() => false);
    const loading = useSelector((state) => state.ui.lobbyLoading);
    const lobbyMsg = useSelector((state) => state.ui.lobbyMsg);
    const joinSuccessful = useSelector((state) => state.ui.joinSuccessful);
    const { onlineMultiplayer, localMultiplayer } = useSelector(
        (state) => state.gameModes,
    );

    useEffect(() => {
        if (joinSuccessful) {
            history.push("/game");
        }
    });

    const editGamecode = (event) => {
        setGamecode(event.target.value);
    };

    const newGame = () => {
        history.push("/game");
        dispatch(resetInit());
        dispatch(setLobbyLoading());
        onCloseModal1();
        const randomVal = Math.floor(Math.random() * 2);
        const playerIsWhite = !!randomVal;
        const gamecode = generateGameCode(7);

        window.socket.emit("newGame", gamecode);
        dispatch(startOnlineMultiplayer());
        dispatch(startGame(playerIsWhite));
        dispatch(createGameCode(gamecode));
    };

    const joinGame = () => {
        // Ask the server join the game, and start loading. Wait for server response
        window.socket.emit("joinGame", gamecode.toUpperCase());
        dispatch(setLobbyLoading());
        onCloseModal2();
    };

    const onOpenModal1 = () => {
        setOpen1(true);
    };

    const onCloseModal1 = () => {
        setOpen1(false);
    };

    const onOpenModal2 = () => {
        setOpen2(true);
    };

    const onCloseModal2 = () => {
        setOpen2(false);
    };

    return (
        <div id="lobby-greeting">
            {loading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h2 className="create-join-title">Online Multiplayer</h2>
                    {!localMultiplayer ? (
                        <a href="/#/game" id="new-game" onClick={newGame}>
                            Start New Game
                        </a>
                    ) : (
                        <a href="/#/lobby" id="new-game" onClick={onOpenModal1}>
                            Start New Game
                        </a>
                    )}
                    {/* <a
                        href="/#/game"
                        id="new-game"
                        onClick={!localMultiplayer ? newGame : onOpenModal1}
                    >
                        Start New Game
                    </a> */}
                    <p style={{ color: "#151930" }}>-OR-</p>
                    <label htmlFor="game-code" className="enter-game-label">
                        Enter Game Code
                    </label>
                    <div id="game-code-form">
                        <div className="game-code-container">
                            <input
                                className="game-code"
                                name="game-code"
                                maxLength="7"
                                value={gamecode.toUpperCase()}
                                onChange={editGamecode}
                            />
                        </div>
                        <button
                            disabled={gamecode.length !== 7}
                            onMouseEnter={() => setHoverSubmitCode(true)}
                            onMouseLeave={() => setHoverSubmitCode(false)}
                            style={
                                gamecode.length !== 7
                                    ? {
                                          backgroundColor: "#cacacab7",
                                          cursor: "default",
                                      }
                                    : hoverSubmitCode
                                    ? {
                                          backgroundColor: "#eb8c97",
                                          cursor: "pointer",
                                      }
                                    : { backgroundColor: "#ffabb5" }
                            }
                            onClick={
                                !localMultiplayer ? joinGame : onOpenModal2
                            }
                        >
                            Go
                        </button>
                    </div>
                    <small
                        style={{
                            color: "red",
                            marginTop: ".3rem",
                            position: "relative",
                            top: "5px",
                        }}
                    >
                        {lobbyMsg}
                    </small>
                </React.Fragment>
            )}
            <AreYouSure
                open={open1}
                onClose={onCloseModal1}
                msg={
                    "You will lose all local game progress. Are you sure you want to start an online game?"
                }
                fn1={onCloseModal1}
                fn2={newGame}
                label2="Start"
            />
            <AreYouSure
                open={open2}
                onClose={onCloseModal2}
                msg={
                    "You will lose all local game progress. Are you sure you want to join an online game?"
                }
                fn1={onCloseModal2}
                fn2={joinGame}
                label2="Join"
            />
        </div>
    );
};

export default LobbyPage;
