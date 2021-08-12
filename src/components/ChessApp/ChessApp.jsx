import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";
import UserInterface from "../UserInterface/UserInterface.jsx";

// Redux Imports
import { connect } from "react-redux";
import {
    startGame,
    startLocalGame,
    toggleSidebar,
    rotateBoard,
    resetRotation,
    forceRotation,
    stopLobbyLoading,
} from "../../store/actions";

class ChessApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { botBattle, localMultiplayer, onlineMultiplayer, sandbox } =
            this.props.gameModes;

        // Online multiplayer setup
        if (onlineMultiplayer) {
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

            // End the lobby loading screen
            this.props.stopLobbyLoading();
        }

        // Local multiplayer setup
        if (localMultiplayer) {
            this.props.resetRotation();
            this.props.startLocalGame();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { localMultiplayer } = this.props.gameModes;

        if (
            localMultiplayer &&
            prevProps.history &&
            prevProps.history.length < this.props.history.length &&
            this.props.autoRotate &&
            this.props.onMostRecentBoard
        ) {
            if (this.props.whiteIsNext) {
                this.props.resetRotation();
            } else {
                this.props.forceRotation();
            }
        }
    }

    render() {
        return (
            <div id="chess-app" className="major-comp">
                <div id="interface-container" className="major-comp">
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
        gameModes: state.gameModes,
        history: state.boardState.history,
        whiteIsNext: state.boardState.whiteIsNext,
        autoRotate: state.ui.autoRotate,
        onMostRecentBoard: state.boardState.onMostRecentBoard,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        initGame: () => dispatch(startGame()),
        startLocalGame: () => dispatch(startLocalGame()),
        rotateBoard: () => dispatch(rotateBoard()),
        resetRotation: () => dispatch(resetRotation()),
        forceRotation: () => dispatch(forceRotation()),
        stopLobbyLoading: () => dispatch(stopLobbyLoading()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessApp);
