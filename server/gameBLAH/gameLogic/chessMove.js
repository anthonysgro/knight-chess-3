import { basicMove, checkFilter } from "./index";

function chessMove(to, from, piece, boardConfig) {
    const basicResult = basicMove(to, from, piece, boardConfig);
    if (basicResult.validMove) {
        const finalResult = checkFilter(
            to,
            from,
            piece,
            boardConfig,
            basicResult,
        );

        return finalResult;
    }
    return basicResult;
}

export default chessMove;
