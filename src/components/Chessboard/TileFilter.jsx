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
    const [controlled, setControlled] = useState(false);
    const {
        whiteIsNext,
        pieceInCheck,
        boardConfig,
        whiteHasPlayer,
        blackHasPlayer,
    } = useSelector((state) => state.boardState);
    const { gameCode, thisPlayerWhite, underpromotion } = useSelector(
        (state) => state.gameInfo,
    );
    const moveableSquares = useSelector(
        (state) => state.boardState.selectedPieceMoves,
    );
    const endGame = useSelector(
        (state) => state.boardState.endGameInfo.endGame,
    );

    const gameModes = useSelector((state) => state.gameModes);
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
        } else if (pieceInCheck) {
            if (pieceInCheck.strChessCoords === idNum) {
                setClassList(`tile-filter ${tileColor}-check`);
            } else {
                setClassList("tile-filter");
            }
        } else {
            setClassList("tile-filter");
        }
    });

    // //drag and drop configuration
    const [, drop] = useDrop({
        accept: "piece",
        drop: (item) => {
            dispatch(
                dropPiece(
                    item.piece,
                    idNum,
                    gameCode,
                    window.socket.id,
                    thisPlayerWhite,
                    underpromotion,
                    gameModes,
                ),
            );

            // If the game is still going and it was a valid move
            if (!endGame) {
                if (gameModes.onlineMultiplayer) {
                    // In order to move, it must be your turn, both players must be in the lobby, and
                    // it must be your color piece
                    if (
                        item.piece.white === whiteIsNext &&
                        thisPlayerWhite === item.piece.white &&
                        whiteHasPlayer &&
                        blackHasPlayer
                    ) {
                        dispatch(populateMoves(gameCode, window.socket.id));
                    }
                } else if (gameModes.localMultiplayer) {
                    // In order to move, it must the correct turn
                    if (item.piece.white === whiteIsNext) {
                        dispatch(populateMoves(gameCode, window.socket.id));
                    }
                } else if (gameModes.botBattle) {
                    // It must be your turn, and it must be your color piece
                    if (
                        item.piece.white === whiteIsNext &&
                        thisPlayerWhite === item.piece.white
                    ) {
                        dispatch(populateMoves(gameCode, window.socket.id));
                    }
                }
            }
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
