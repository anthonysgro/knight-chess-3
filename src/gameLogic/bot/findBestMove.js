import simulateMove from "./simulateMove";
import evaluateBoard from "./evaluationHeuristic";

function getMoves(game) {
    const piecesToTest = !game.whiteIsNext
        ? game.blackPieces
        : game.whitePieces;

    const movePossibilities = [];
    for (const piece of piecesToTest) {
        for (const move of piece.validMoves) {
            movePossibilities.push([piece, move]);
        }
    }

    return movePossibilities;
}

function minimaxRoot(game, isMaximisingPlayer, depth = 2) {
    const movePossibilities = getMoves(game);

    let bestMove = Infinity;
    let bestMoveFound;

    for (const [piece, move] of movePossibilities) {
        const testBoardConfig = simulateMove(game, piece, move);

        // console.log(testBoardConfig);
        const evaluation = minimax(
            testBoardConfig,
            !isMaximisingPlayer,
            depth - 1,
        );

        if (evaluation <= bestMove) {
            bestMove = evaluation;
            bestMoveFound = [piece, move];
        }
    }

    return bestMoveFound;
}

function minimax(game, isMaximisingPlayer, depth) {
    if (depth === 0) {
        return evaluateBoard(game);
    }

    const movePossibilities = getMoves(game);

    let bestMove = isMaximisingPlayer ? -Infinity : Infinity;
    for (const [piece, move] of movePossibilities) {
        const testBoardConfig = simulateMove(game, piece, move);

        bestMove = isMaximisingPlayer
            ? Math.max(
                  bestMove,
                  minimax(testBoardConfig, !isMaximisingPlayer, depth - 1),
              )
            : Math.min(
                  bestMove,
                  minimax(testBoardConfig, !isMaximisingPlayer, depth - 1),
              );
    }

    return bestMove;
}

export default minimaxRoot;
