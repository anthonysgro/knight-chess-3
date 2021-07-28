import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startGame,
    joinGame,
    setLobbyLoading,
    stopLobbyLoading,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import Loading from "./Loading.jsx";

const LobbyPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [gamecode, setGamecode] = useState(() => "");
    const [hoverSubmitCode, setHoverSubmitCode] = useState(() => false);
    const loading = useSelector((state) => state.ui.lobbyLoading);
    const lobbyMsg = useSelector((state) => state.ui.lobbyMsg);

    const editGamecode = (event) => {
        setGamecode(event.target.value);
    };

    const newGame = () => {
        window.socket.emit("newGame");
        dispatch(startGame());
    };

    const joinGame = () => {
        window.socket.emit("joinGame", gamecode);
        dispatch(setLobbyLoading());
        // setLoading(true);
        // dispatch(joinGame());
        // history.push("/#/game");
    };

    return (
        <div id="lobby-greeting">
            {loading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <h2 className="create-join-title">Create/Join Game</h2>
                    <a href="/#/game" id="new-game" onClick={newGame}>
                        Start New Game
                    </a>
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
                                value={gamecode}
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
                            onClick={joinGame}
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
        </div>
    );
};

export default LobbyPage;
