import React, { useState, useEffect } from "react";

const LobbyPage = () => {
    const [gamecode, setGamecode] = useState(() => "");
    const [hoverSubmitCode, setHoverSubmitCode] = useState(() => false);

    const editGamecode = (event) => {
        setGamecode(event.target.value);
    };

    return (
        <div id="lobby-greeting">
            <h2 className="create-join-title">Create/Join Game</h2>
            <a href="/#/game" id="new-game">
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
                            ? { backgroundColor: "#eb8c97", cursor: "pointer" }
                            : { backgroundColor: "#ffabb5" }
                    }
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default LobbyPage;
