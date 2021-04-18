import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

// React DnD Imports
import { useDrag, DragPreviewImage, DragLayer } from "react-dnd";

// Redux Imports
import { pickUpPiece } from "../../store/actions";

function Piece({ piece }) {
    const { imageFile } = piece;
    const dispatch = useDispatch();

    // drag and drop configuration
    const [{ isDragging }, drag, preview] = useDrag({
        type: "piece",
        item: { piece },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() };
        },
    });

    const opacityStyle = {
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src={imageFile} />
            <img
                style={{ ...opacityStyle }}
                ref={drag}
                src={imageFile}
                onDragStart={() => dispatch(pickUpPiece(piece))}
                // onDragEnd={}
            />
        </React.Fragment>
    );
}

export default Piece;
