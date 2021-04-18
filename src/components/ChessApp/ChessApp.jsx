import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";

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
                    <Chessboard />
                    {/* <UserInterface /> */}
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
