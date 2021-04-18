import React, { useState, useEffect } from "react";

// Component Imports
import Piece from "../Piece/Piece.jsx";

// React-Redux Imports
import { connect, useSelector, useDispatch } from "react-redux";

// Redux
import { dropPiece } from "../../store/actions";

// Script Imports
import { convertNotation, convertBoardState } from "../../scripts";

// React DnD Imports
import { useDrop } from "react-dnd";

function TileFilter({ idNum }) {
    const [piece, setPiece] = useState(null);
    const [id, setId] = useState(idNum);
    const boardConfig = useSelector((state) => state.boardState.boardConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        const idBS = convertBoardState(convertNotation(id));
        if (boardConfig) {
            const newPiece = boardConfig[idBS[0]][idBS[1]];
            if (piece !== newPiece) {
                setPiece(newPiece);
            }
        }
    });

    // //drag and drop configuration
    const [, drop] = useDrop({
        accept: "piece",
        drop: (item) => {
            // console.log(item.piece.strChessCoords, item.piece.name, id);
            dispatch(dropPiece(item.piece, id));
            // const [fromPosition] = item.piece.id.split("_");
            // console.log(fromPosition);
            // props.onMove(boardConfig, item.id, fromPosition, chessCoordsConcat);
        },
    });

    return (
        <div id={`filter-${id}`} className="tile-filter" ref={drop}>
            {piece ? (
                <Piece piece={piece} />
            ) : (
                <img src="../images/placeholder.png" alt="" />
            )}
        </div>
    );
}

export default TileFilter;
