import React, { Component } from "react";

// React-Redux Imports
import { connect } from "react-redux";
import { startGame, toggleSidebar, rotateBoard } from "../../store/actions";

class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            checkmate,
            winningPlayer,
            pieceInCheck,
            whiteIsNext,
            endGame,
        } = this.props;

        const turnMsg = whiteIsNext ? "White's Turn" : "Black's Turn";

        let mainMsg = "";
        if (checkmate) {
            mainMsg = `${winningPlayer} won, checkmate!`;
        } else if (endGame) {
            mainMsg = `Draw by --insert draw reason--!`;
        } else if (pieceInCheck) {
            const possessive = pieceInCheck.white ? "White's" : "Black's";
            mainMsg = `${possessive} ${pieceInCheck.name} is in check!`;
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
                            {mainMsg}
                        </div>
                    </div>
                    <div className="row-2-element">
                        <button
                            id="newGame-btn"
                            className="btn greenBtn second-row-fdbck"
                            style={{ visibility: "hidden" }}
                            onClick={() => this.props.restartGame()}
                        >
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        checkmate: state.boardState.checkmate,
        winningPlayer: state.boardState.winningPlayer,
        pieceInCheck: state.boardState.pieceInCheck,
        whiteIsNext: state.boardState.whiteIsNext,
        endGame: state.boardState.endGame,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
        restartGame: () => dispatch(startGame()),
        rotateBoard: () => dispatch(rotateBoard()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInterface);
