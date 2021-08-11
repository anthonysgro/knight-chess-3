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
        history,
        stepNumber,
        selectedPieceMoves,
        onMostRecentBoard,
    } = useSelector((state) => state.boardState);

    const { gameCode, thisPlayerWhite, underpromotion } = useSelector(
        (state) => state.gameInfo,
    );

    const endGame = useSelector(
        (state) => state.boardState.endGameInfo.endGame,
    );

    const gameModes = useSelector((state) => state.gameModes);
    const dispatch = useDispatch();

    useEffect(() => {
        // For setting pieces if they come to the square
        const idBS = convertBoardState(convertNotation(idNum));
        // if (boardConfig) {
        //     const newPiece = boardConfig[idBS[0]][idBS[1]];
        //     if (piece !== newPiece) {
        //         setPiece(newPiece);
        //     }
        // }
        const newPiece = history.length
            ? history[stepNumber].boardConfig[idBS[0]][idBS[1]]
            : boardConfig;

        const involvedInLastMove = history.length
            ? history[stepNumber].to === idNum ||
              history[stepNumber].from === idNum
            : false;

        if (piece !== newPiece) setPiece(newPiece);

        let classListBuilder = "tile-filter";

        // Highlights the last move that happened
        if (involvedInLastMove) {
            classListBuilder += ` involved-in-last-move-tile-${tileColor}`;
        }

        // Recolors square if the piece we picked up can move to it
        if (selectedPieceMoves.includes(idNum) && onMostRecentBoard) {
            if (piece) {
                classListBuilder += ` moveable-capturable-${tileColor}`;
            } else {
                classListBuilder += " moveable";
            }
        } else if (pieceInCheck && onMostRecentBoard) {
            if (pieceInCheck.strChessCoords === idNum) {
                classListBuilder += ` ${tileColor}-check`;
            }
        }

        setClassList(classListBuilder);
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

            // If the game is still going and if you are on the up-to-date board in history
            if (!endGame && onMostRecentBoard) {
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
