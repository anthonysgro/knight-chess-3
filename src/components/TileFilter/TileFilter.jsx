import React, { useState, useEffect } from "react";

// Component Imports
import Piece from "../Piece/Piece.jsx";

// React-Redux Imports
import { connect, useSelector, useDispatch } from "react-redux";

// Redux
import { dropPiece, populateMoves } from "../../store/actions";

// Script Imports
import { convertNotation, convertBoardState } from "../../scripts";

// React DnD Imports
import { useDrop } from "react-dnd";

function TileFilter({ idNum, tileColor }) {
    const [piece, setPiece] = useState(null);
    const [classList, setClassList] = useState("tile-filter");
    const boardConfig = useSelector((state) => state.boardState.boardConfig);
    const moveableSquares = useSelector(
        (state) => state.boardState.selectedPieceMoves,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        // For setting pieces if they come to the square
        const idBS = convertBoardState(convertNotation(idNum));
        if (boardConfig) {
            const newPiece = boardConfig[idBS[0]][idBS[1]];
            if (piece !== newPiece) {
                setPiece(newPiece);
            }
        }

        // Recolors square if the piece we picked up can move to it
        if (moveableSquares.includes(idNum)) {
            if (piece) {
                setClassList(`tile-filter moveable-capturable-${tileColor}`);
            } else {
                setClassList("tile-filter moveable");
            }
        } else {
            setClassList("tile-filter");
        }
    });

    // //drag and drop configuration
    const [, drop] = useDrop({
        accept: "piece",
        drop: (item) => {
            // console.log(item.piece.strChessCoords, item.piece.name, id);
            dispatch(dropPiece(item.piece, idNum));
            dispatch(populateMoves());
            // const [fromPosition] = item.piece.id.split("_");
            // console.log(fromPosition);
            // props.onMove(boardConfig, item.id, fromPosition, chessCoordsConcat);
        },
    });

    return (
        <div id={`filter-${idNum}`} className={classList} ref={drop}>
            {piece ? (
                <Piece piece={piece} />
            ) : (
                <img src="../images/placeholder.png" alt="" />
            )}
        </div>
    );
}

export default TileFilter;
