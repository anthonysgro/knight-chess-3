import React, { useState, useEffect } from "react";

// React-Redux Imports
import { useSelector } from "react-redux";

// Component Imports
import TileFilter from "../TileFilter/TileFilter.jsx";

// Script Imports
import { convertNotation, convertBoardState } from "../../scripts";

function Tile({ id, color }) {
    const tileColor = color ? "light-square" : "dark-square";
    const [classList, setClassList] = useState(`tile ${tileColor}`);
    const boardConfig = useSelector((state) => state.boardState.boardConfig);
    const moveableSquares = useSelector(
        (state) => state.boardState.selectedPieceMoves,
    );

    useEffect(() => {
        const idBS = convertBoardState(convertNotation(id));
        const piece = boardConfig[idBS[0]][idBS[1]];
        if (moveableSquares.includes(id) && piece) {
            setClassList(
                `tile ${tileColor} moveable-capturable-parent-${tileColor}`,
            );
        } else {
            setClassList(`tile ${tileColor}`);
        }
    });

    return (
        <div id={id} className={classList}>
            <TileFilter idNum={id} tileColor={tileColor} />
        </div>
    );
}

export default Tile;
