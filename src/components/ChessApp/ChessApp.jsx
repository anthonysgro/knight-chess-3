import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";
import OpponentInterface from "../OpponentInterface/OpponentInterface.jsx";
import UserInterface from "../UserInterface/UserInterface.jsx";

// Redux Imports
import { connect } from "react-redux";
import {
    startGame,
    toggleSidebar,
    rotateBoard,
    resetRotation,
} from "../../store/actions";

class ChessApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.resetRotation();

        const { player1, player2, gameCode, thisPlayerWhite } =
            this.props.gameInfo;

        // If you are the player that started the session, update server with the initial position
        if (player1 && !player2) {
            window.socket.emit(
                "createInitGameState",
                gameCode,
                JSON.stringify(this.props.initBoardState),
            );
        }

        // If you are black, rotate the board
        if (!thisPlayerWhite) {
            this.props.rotateBoard();
        }
    }

    render() {
        return (
            <div id="chess-app" className="major-comp">
                <div id="interface-container" className="major-comp">
                    {/* <OpponentInterface /> */}
                    <Chessboard />
                    <UserInterface />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        initBoardState: state.boardState,
        gameInfo: state.gameInfo,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        initGame: () => dispatch(startGame()),
        rotateBoard: () => dispatch(rotateBoard()),
        resetRotation: () => dispatch(resetRotation()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessApp);
