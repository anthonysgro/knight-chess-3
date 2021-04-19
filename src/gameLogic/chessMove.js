import { basicMove } from "./index";

function chessMove(to, from, piece, boardConfig) {
    const basicResult = basicMove(to, from, piece, boardConfig);
    return basicResult;
    // console.log(basicResult);
    // if (basicResult.validMove) {
    //     let finalResult = checkFiltering(
    //         to,
    //         from,
    //         piece,
    //         boardConfig,
    //         basicResult,
    //     );

    //     return finalResult;
    // } else {
    //     return {
    //         validMove: false,
    //         finalBoardConfig: boardConfig,
    //         pawnMovedTwo: false,
    //         castleEvent: {
    //             castleMove: false,
    //             rookInvolved: {},
    //             squaresInvolved: [],
    //             type: "",
    //             direction: "",
    //         },
    //         enPassantEvent: false,
    //         promotionEvent: false,
    //     };
    // }
}

export default chessMove;
