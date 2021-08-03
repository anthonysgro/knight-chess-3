import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// React DnD Imports
import { useDrag, DragPreviewImage, DragLayer } from "react-dnd";

// Redux Imports
import { pickUpPiece } from "../../store/actions";

function Piece({ piece }) {
    const { imageFile } = piece;
    const [rotation, setRotation] = useState(0);
    const { rotated } = useSelector((state) => state.ui);
    const { thisPlayerWhite } = useSelector((state) => state.gameInfo);
    const gameModes = useSelector((state) => state.gameModes);
    const endGame = useSelector(
        (state) => state.boardState.endGameInfo.endGame,
    );
    const { onMostRecentBoard } = useSelector((state) => state.boardState);

    const dispatch = useDispatch();

    // drag and drop configuration
    const [{ isDragging }, drag, preview] = useDrag({
        type: "piece",
        item: { piece },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() };
        },
    });

    // Opacity styling based on if piece is being dragged
    const opacityStyle = {
        opacity: isDragging ? 0.5 : 1,
    };

    // Rotation styling based on total board orientation
    if (rotated && rotation === 0) setRotation(180);
    if (!rotated && rotation === 180) setRotation(0);

    const rotateStyle = {
        transform: `rotate(${rotation}deg)`,
    };

    return (
        <React.Fragment>
            {/* <DragPreviewImage
                connect={preview}
                src={imageFile}
            /> */}
            <img
                style={{ ...opacityStyle, ...rotateStyle }}
                ref={drag}
                src={imageFile}
                onDragStart={
                    // if it the end of the game or you aren't on the most
                    // recent board, do not illuminate square on the board
                    endGame || !onMostRecentBoard
                        ? () => {}
                        : () =>
                              dispatch(
                                  pickUpPiece(
                                      piece,
                                      thisPlayerWhite,
                                      gameModes,
                                  ),
                              )
                }
                // onDragEnd={}
            />
        </React.Fragment>
    );
}

export default Piece;
