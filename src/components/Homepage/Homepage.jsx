import React, { Component } from "react";

// Component Imports
import renderCards from "./Card";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        renderCards();
    }

    render() {
        return (
            <React.Fragment>
                <div id="falling-chess-pieces">
                    <div className="card">
                        <div className="card-text"></div>
                    </div>
                    {/* <div class="card queen">
                        <div class="card-text"></div>
                    </div>
                    <div class="card bishop">
                        <div class="card-text"></div>
                    </div>
                    <div class="card rook">
                        <div class="card-text"></div>
                    </div>
                    <div class="card knight">
                        <div class="card-text"></div>
                    </div>
                    <div class="card pawn">
                        <div class="card-text"></div>
                    </div> */}
                </div>
                <div id="main-h1-container">
                    <h1>
                        Play chess against friends from the comfort of your own
                        home
                    </h1>
                    <a id="opening-button" href="/game">
                        play
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default Homepage;
