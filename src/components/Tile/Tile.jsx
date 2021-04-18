import React, { Component } from "react";

// Component Imports
import TileFilter from "../TileFilter/TileFilter.jsx";

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
        };
    }
    render() {
        const { id, color } = this.props;

        // Class Name maker
        const tileColor = color ? "light-square" : "dark-square";
        const className = "tile " + tileColor;

        return (
            <div id={id} className={className}>
                <TileFilter idNum={id} />
            </div>
        );
    }
}

export default Tile;
