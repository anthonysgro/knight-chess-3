import React, { Component } from "react";

// React-Redux Imports
import { connect } from "react-redux";
import {
    acceptRematch,
    proposeRematch,
    toggleSidebar,
    rotateBoard,
} from "../../store/actions";

class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            checkmate,
            whiteWins,
            blackWins,
            pieceInCheck,
            whiteIsNext,
            endGame,
        } = this.props.endGameInfo;
        const { player1, player2, gameCode } = this.props.gameInfo;
        const { pendingRematch, playerProposedRematch } = this.props.ui;

        const turnMsg = whiteIsNext ? "White's Turn" : "Black's Turn";

        let mainMsg = "";
        if (!player2) {
            mainMsg = `Waiting for player to join. Game code: ${gameCode}`;
        } else {
            if (checkmate) {
                mainMsg = `${whiteWins ? "White" : "Black"} won, checkmate!`;
            } else if (endGame) {
                mainMsg = `Draw by --insert draw reason--!`;
            } else if (pieceInCheck) {
                const possessive = pieceInCheck.white ? "White's" : "Black's";
                mainMsg = `${possessive} ${pieceInCheck.name} is in check!`;
            }
        }

        if (playerProposedRematch) {
            mainMsg = "Please wait for opponent's response.";
        } else if (pendingRematch) {
            mainMsg = "Opponent offered rematch";
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
                            Your Username
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
                            // onClick={() => this.props.moveBack(event)}
                        >
                            &lt;
                        </button>
                        <button
                            className="redbtn history-btn"
                            id="forward"
                            // onClick={() => this.props.moveForward(event)}
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
                            Show Chat
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
                                pendingRematch
                                    ? () => this.props.acceptRematch(gameCode)
                                    : () => this.props.proposeRematch(gameCode)
                            }
                        >
                            {playerProposedRematch ? "Wait" : "New Game"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        endGameInfo: state.boardState.endGameInfo,
        gameInfo: state.gameInfo,
        ui: state.ui,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
        acceptRematch: (gameCode) => dispatch(acceptRematch(gameCode)),
        proposeRematch: (gameCode) => dispatch(proposeRematch(gameCode)),
        rotateBoard: () => dispatch(rotateBoard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInterface);
