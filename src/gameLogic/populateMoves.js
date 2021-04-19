// Game Logic
import { chessMove } from "./index";

// Script Imports
import { clone, cloneDeep } from "lodash";
import { convertNotation, convertBoardState } from "../scripts";

function populateMoves(allPieces, boardConfig) {
    let newAllPieces = cloneDeep(allPieces);
    let newWhitePieces = [];
    let newBlackPieces = [];

    // Populate valid moves for all pieces
    newAllPieces.forEach((piece) => {
        piece.validMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const id = convertNotation([i, j]).join("");
                const moveData = chessMove(
                    id,
                    piece.strChessCoords,
                    piece,
                    boardConfig,
                );
                if (moveData.validMove) {
                    piece.validMoves = [
                        ...piece.validMoves,
                        {
                            to: id,
                            from: piece.strChessCoords,
                            ...moveData,
                        },
                    ];
                }
            }
        }

        if (piece.color === "white") {
            newWhitePieces.push(piece);
        } else {
            newBlackPieces.push(piece);
        }
    });

    const tempAll = [...newWhitePieces, ...newBlackPieces];
    let newBoardConfig = cloneDeep(boardConfig);

    // Sync board configuration
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const idBS = convertBoardState([i, j]);
            const square = convertNotation([i, j]).join("");

            // Cycle through pieces
            for (let k = 0; k < tempAll.length; k++) {
                if (square === tempAll[k].strChessCoords) {
                    newBoardConfig[idBS[0]][idBS[1]] = tempAll[k];
                }
            }
        }
    }

    // console.log(newBoardConfig);

    return { newWhitePieces, newBlackPieces, newBoardConfig };
}

export default populateMoves;
