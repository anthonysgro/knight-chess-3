import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";
import OpponentInterface from "../OpponentInterface/OpponentInterface.jsx";
import UserInterface from "../UserInterface/UserInterface.jsx";

// Redux Imports
import { connect } from "react-redux";
import { startGame, toggleSidebar } from "../../store/actions";

class ChessApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { player1, player2, gameCode } = this.props.gameInfo;

        // If you are the player that started the session, update server with the initial position
        if (player1 && !player2) {
            window.socket.emit(
                "createInitGameState",
                gameCode,
                JSON.stringify(this.props.initBoardState),
            );
        }
    }

    componentDidUpdate(prevState, prevProps) {
        // const { player1, player2, gameCode } = this.props.gameInfo;
        // if (player1 && !player2) {
        // }
        // if player initialized the game and there is no room name
        // if (this.props.gameInfo.player1 === window.socket.id) {
        //     // Tells the server what our initial board state is for the next player to join
        //     if (prevProps.roomName !== this.props.roomName) {
        //         window.socket.emit(
        //             "createInitGameState",
        //             this.props.roomName,
        //             JSON.stringify(this.props.initBoardState),
        //         );
        //     }
        // } else if (this.props.gameInfo.player2 === window.socket.id) {
        // }
        // When we get our roomName back from the server, tell it we have an initial game state
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChessApp);
