import React, { Component } from "react";

// Components Import
import Chessboard from "../Chessboard/Chessboard.jsx";

class ChessApp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

export default ChessApp;
