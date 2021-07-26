import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";
import OpponentInterface from "../OpponentInterface/OpponentInterface.jsx";
import UserInterface from "../UserInterface/UserInterface.jsx";

// Redux Imports
import { connect } from "react-redux";
import { startGame } from "../../store/actions";

class ChessApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.initGame();
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

function mapDispatchToProps(dispatch) {
    return {
        initGame: () => dispatch(startGame()),
    };
}

export default connect(null, mapDispatchToProps)(ChessApp);
