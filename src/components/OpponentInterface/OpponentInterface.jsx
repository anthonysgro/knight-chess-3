import React, { Component } from "react";

class OpponentInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="opp-interface" className="user-interface">
                <div id="opponent-ui-row" className="ui-row-1">
                    <div className="row-1-element">
                        <div className="placeholder-line"></div>
                    </div>
                    <div className="row-1-element">
                        <div
                            id="opponent-username"
                            className="single-line-important-text"
                        >
                            Opponent Name
                        </div>
                    </div>
                    <div className="row-1-element">
                        <div className="placeholder-line"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OpponentInterface;
