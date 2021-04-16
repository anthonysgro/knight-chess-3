import React, { Component } from "react";

// Component Imports
import Piece from "../Piece/Piece.jsx";

class TileFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { idNum } = this.props;
        return (
            <div id={`filter-${idNum}`} className="tile-filter">
                <Piece />
            </div>
        );
    }
}

export default TileFilter;
