import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// React-Redux Imports
import { connect } from "react-redux";
import {
    acceptRematch,
    proposeRematch,
    toggleSidebar,
    rotateBoard,
    startLocalGame,
    moveForward,
    moveBackward,
    resetInit,
    startBotBattle,
} from "../../store/actions";

import AreYouSure from "../AreYouSure.jsx";

class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.leaveOnlineGame = this.leaveOnlineGame.bind(this);
    }

    onOpenModal() {
        this.setState({ open: true });
    }

    onCloseModal() {
        this.setState({ open: false });
    }

    leaveOnlineGame() {
        this.props.resetInit();
        window.socket.emit("leaveGame");
        this.props.history.push("/");
    }

    render() {
        const {
            checkmate,
            whiteWins,
            blackWins,
            pieceInCheck,
            endGame,
            resigns,
            someoneLeft,
            serverError,
        } = this.props.endGameInfo;
        const whiteIsNext = this.props.whiteIsNext;
        const { player1, player2, gameCode } = this.props.gameInfo;
        const { pendingRematch, playerProposedRematch } = this.props.ui;
        const { onlineMultiplayer, localMultiplayer, botBattle, sandbox } =
            this.props.gameModes;

        const turnMsg = whiteIsNext ? "White's Turn" : "Black's Turn";

        let mainMsg = "";
        if (onlineMultiplayer) {
            if (!player2) {
                mainMsg = `Waiting for player to join. Game code: ${gameCode}`;
            } else {
                if (checkmate) {
                    mainMsg = `${
                        whiteWins ? "White" : "Black"
                    } won, checkmate!`;
                } else if (resigns) {
                    mainMsg = `${whiteWins ? "Black" : "White"} resigned! ${
                        whiteWins ? "White" : "Black"
                    } wins.`;
                } else if (someoneLeft) {
                    mainMsg = `${!whiteWins ? "Black" : "White"} left! ${
                        !whiteWins ? "White" : "Black"
                    } wins.`;
                } else if (serverError) {
                    mainMsg = `There was a server error, please try creating a new game.`;
                } else if (endGame) {
                    mainMsg = `Draw by --insert draw reason--!`;
                } else if (pieceInCheck) {
                    const possessive = pieceInCheck.white
                        ? "White's"
                        : "Black's";
                    mainMsg = `${possessive} ${pieceInCheck.name} is in check!`;
                }
            }

            if (playerProposedRematch) {
                mainMsg = "Please wait for opponent's response.";
            } else if (pendingRematch) {
                mainMsg = "Opponent offered rematch";
            }
        } else if (localMultiplayer) {
            if (checkmate) {
                mainMsg = `${whiteWins ? "White" : "Black"} won, checkmate!`;
            } else if (resigns) {
                mainMsg = `${whiteWins ? "Black" : "White"} resigned! ${
                    whiteWins ? "White" : "Black"
                } wins.`;
            } else if (endGame) {
                mainMsg = `Draw by --insert draw reason--!`;
            } else {
                mainMsg = "Local Multiplayer Mode";
            }
        } else if (botBattle) {
            mainMsg = "New Bot Battle";
        }

        return (
            <div id="player-interface" className="user-interface">
                <div id="player-ui-row" className="ui-row-1">
                    <div className="row-1-element">
                        <button
                            className="redbtn"
                            id="flip-board-btn"
                            onClick={() => this.props.rotateBoard()}
                        >
                            Flip Board
                        </button>
                    </div>
                    <div className="row-1-element">
                        <div
                            id="player-username"
                            className="single-line-important-text"
                        >
                            {onlineMultiplayer ? "Online" : "Local"}
                        </div>
                    </div>
                    <div className="row-1-element">
                        <div
                            id="turn-information"
                            className="single-line-important-text"
                        >
                            {turnMsg}
                        </div>
                    </div>
                    <div className="row-1-element">
                        <button
                            className="redbtn history-btn"
                            id="back"
                            onClick={() => this.props.moveBackward()}
                        >
                            &lt;
                        </button>
                        <button
                            className="redbtn history-btn"
                            id="forward"
                            onClick={() => this.props.moveForward()}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="ui-row-2">
                    {/* placeholder element */}
                    <div className="row-2-element">
                        <button
                            id="rules-btn"
                            className="greenbtn"
                            onClick={() => this.props.toggleSidebar()}
                        >
                            {onlineMultiplayer ? "Show Chat" : "Settings"}
                        </button>{" "}
                    </div>
                    <div className="row-2-element">
                        <div
                            className="multi-line-important-text second-row-fdbck"
                            id="user-feedback"
                        >
                            <span style={{ padding: "0 .5rem" }}>
                                {mainMsg}
                            </span>
                        </div>
                    </div>
                    <div className="row-2-element">
                        {endGame && !someoneLeft ? (
                            <button
                                id="newGame-btn"
                                className="btn greenBtn second-row-fdbck"
                                disabled={playerProposedRematch}
                                style={
                                    !endGame
                                        ? { visibility: "hidden" }
                                        : { visibility: "visible" }
                                }
                                onClick={
                                    onlineMultiplayer
                                        ? pendingRematch
                                            ? () =>
                                                  this.props.acceptRematch(
                                                      gameCode,
                                                  )
                                            : () =>
                                                  this.props.proposeRematch(
                                                      gameCode,
                                                  )
                                        : localMultiplayer
                                        ? () => this.props.newLocalGame()
                                        : botBattle
                                        ? () => this.props.newBotBattle()
                                        : () => {}
                                }
                            >
                                {onlineMultiplayer
                                    ? playerProposedRematch
                                        ? "Wait"
                                        : "New Game"
                                    : "New Game"}
                            </button>
                        ) : (
                            <button
                                id="newGame-btn"
                                className="btn greenBtn second-row-fdbck"
                                style={{ margin: "0px 15px" }}
                                onClick={
                                    someoneLeft
                                        ? this.leaveOnlineGame
                                        : this.onOpenModal
                                }
                            >
                                Leave
                            </button>
                        )}
                    </div>
                </div>
                <AreYouSure
                    open={this.state.open}
                    onClose={this.onCloseModal}
                    msg={
                        onlineMultiplayer
                            ? "You have an online game in progress. If you leave, you will forfeit the match. Are you sure you want to leave?"
                            : "You will lose all game progress. Are you sure you want to leave?"
                    }
                    fn1={this.onCloseModal}
                    fn2={this.leaveOnlineGame}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        endGameInfo: state.boardState.endGameInfo,
        whiteIsNext: state.boardState.whiteIsNext,
        stepNumber: state.boardState.stepNumber,
        gameInfo: state.gameInfo,
        ui: state.ui,
        gameModes: state.gameModes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
        acceptRematch: (gameCode) => dispatch(acceptRematch(gameCode)),
        proposeRematch: (gameCode) => dispatch(proposeRematch(gameCode)),
        rotateBoard: () => dispatch(rotateBoard()),
        newLocalGame: () => dispatch(startLocalGame()),
        moveForward: () => dispatch(moveForward()),
        moveBackward: () => dispatch(moveBackward()),
        resetInit: () => dispatch(resetInit()),
        newBotBattle: () => dispatch(startBotBattle()),
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UserInterface),
);
