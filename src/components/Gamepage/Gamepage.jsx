import React, { Component } from "react";

// Component Imports
import { ChessApp, Sidebar } from "../index";

class Gamepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar />
                <ChessApp />
            </React.Fragment>
        );
    }
}

export default Gamepage;
