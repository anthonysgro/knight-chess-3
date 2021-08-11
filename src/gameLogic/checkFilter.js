import { convertNotation, convertBoardState } from "../scripts";
import { basicMove } from "./index";
import { cloneDeep } from "lodash";

function checkFilter(target, origin, piece, boardConfig, basicMoveObj) {
    //get variables initialized
    let validMove = basicMoveObj.validMove;
    let movedPiece = cloneDeep(piece);
    const pawnMovedTwo = basicMoveObj.pawnMovedTwo;
    const castleEvent = basicMoveObj.castleEvent;
    const enPassantEvent = basicMoveObj.enPassantEvent;
    const promotionEvent = basicMoveObj.pawnPromotion;

    //get my coordinates prepped to work with the history object
    const toNumCoords = convertNotation([target[0], target[1]]);
    const toCoord = convertBoardState(toNumCoords);
    const frNumCoords = convertNotation([origin[0], origin[1]]);
    const frCoord = convertBoardState(frNumCoords);

    //deep copy of the board configuration so we don't alter state
    let simulBoard = cloneDeep(boardConfig);

    // //perform basic move on simulated board
    simulBoard[frCoord[0]][frCoord[1]] = null;
    simulBoard[toCoord[0]][toCoord[1]] = movedPiece;

    // // The entire point of this function is to make sure a move
    // // doesn't leave a players own king in check
    let thisKing = null;
    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            const kingSearch = simulBoard[col][row];
            if (kingSearch) {
                if (kingSearch.name === "King") {
                    // Finds the king of this player on simulated board
                    if (kingSearch.color === piece.color) {
                        thisKing = cloneDeep(kingSearch);
                    }
                }
            }
        }
    }

    // // If we moved the king, we have to update its coordinates
    if (piece.id === thisKing.id) {
        thisKing.updatePositionState(convertNotation(target));
    }

    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            const testPiece = simulBoard[col][row];
            if (testPiece) {
                if (testPiece.color !== movedPiece.color) {
                    // check to see if it is is a basic move to attack our king
                    const result = basicMove(
                        thisKing.strChessCoords,
                        testPiece.strChessCoords,
                        testPiece,
                        simulBoard,
                    );

                    let castleChecker1;
                    let castleChecker2;
                    const { squaresInvolved, castleMove } = castleEvent;

                    // If castling, make sure we aren't castling through check
                    if (castleMove) {
                        castleChecker1 = basicMove(
                            squaresInvolved[0],
                            testPiece.strChessCoords,
                            testPiece,
                            simulBoard,
                        );
                        castleChecker2 = basicMove(
                            squaresInvolved[1],
                            testPiece.strChessCoords,
                            testPiece,
                            simulBoard,
                        );

                        // Takes away castling if you are going through a check
                        if (
                            castleChecker1.validMove ||
                            castleChecker2.validMove
                        ) {
                            validMove = false;
                        }
                    }
                    if (result.validMove) {
                        // If valid move of opp piece to attack king, the original move isn't valid
                        validMove = false;
                    }
                }
            }
        }
    }
    if (piece.char === "k" && target === "f8") {
        console.log(validMove, boardConfig);
    }

    return {
        validMove: validMove,
        pawnMovedTwo: pawnMovedTwo,
        castleEvent: castleEvent,
        enPassantEvent: enPassantEvent,
        promotionEvent: promotionEvent,
    };
}

export default checkFilter;
