import React, { Component } from "react";

// Component Imports
import Tile from "./Tile.jsx";

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { id, startColor } = this.props;
        const idNum = id[id.length - 1];
        return (
            //Renders 8 tiles
            <div className="row" id={id}>
                <Tile id={`a${idNum}`} color={startColor} />
                <Tile id={`b${idNum}`} color={!startColor} />
                <Tile id={`c${idNum}`} color={startColor} />
                <Tile id={`d${idNum}`} color={!startColor} />
                <Tile id={`e${idNum}`} color={startColor} />
                <Tile id={`f${idNum}`} color={!startColor} />
                <Tile id={`g${idNum}`} color={startColor} />
                <Tile id={`h${idNum}`} color={!startColor} />
            </div>
        );
    }
}

export default Row;
