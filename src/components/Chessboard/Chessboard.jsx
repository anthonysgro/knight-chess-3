import React, { Component } from "react";

// Component Imports
import Row from "../Row/Row.jsx";

class Chessboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="chessboard-backdrop">
                <Row id="row-8" startColor={true} />
                <Row id="row-7" startColor={false} />
                <Row id="row-6" startColor={true} />
                <Row id="row-5" startColor={false} />
                <Row id="row-4" startColor={true} />
                <Row id="row-3" startColor={false} />
                <Row id="row-2" startColor={true} />
                <Row id="row-1" startColor={false} />
            </div>
        );
    }
}

export default Chessboard;
