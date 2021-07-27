import React, { Component } from "react";

// React Redux Imports
import { connect } from "react-redux";

// Component Imports
import Row from "./Row.jsx";

class Chessboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { rotated } = this.props;
        const rotation = rotated ? 180 : 0;
        return (
            <div
                id="chessboard-backdrop"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
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
function mapStateToProps(state) {
    return {
        rotated: state.ui.rotated,
    };
}
export default connect(mapStateToProps)(Chessboard);
