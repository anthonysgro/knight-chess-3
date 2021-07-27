import React, { useState, useEffect } from "react";

const LobbyPage = () => {
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
            <div className="game-code-container">
                <input
                    className="game-code"
                    name="game-code"
                    maxlength="7"
                    value="8371922"
                />
            </div>
        </div>
    );
};

export default LobbyPage;
