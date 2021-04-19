import { convertNotation, convertBoardState } from "../scripts";
import { cloneDeep } from "lodash/clonedeep";

function checkFilter(target, origin, piece, boardConfig, basicMoveObj) {
    //get variables initialized
    let validMove = basicMoveObj.validMove;
    const pawnMovedTwo = basicMoveObj.pawnMovedTwo;
    const castleEvent = basicMoveObj.castleEvent;
    const enPassantEvent = basicMoveObj.enPassantEvent;
    const promotionEvent = basicMoveObj.pawnPromotionEvent;

    //get my coordinates prepped to work with the history object
    const toNumCoords = convertNotation([target[0], target[1]]);
    const toCoord = boardStateConverter(toNumCoords);
    const frNumCoords = convertNotation([origin[0], origin[1]]);
    const frCoord = boardStateConverter(frNumCoords);

    let newBoard = cloneDeep(boardConfig);
}

export default checkFilter;
