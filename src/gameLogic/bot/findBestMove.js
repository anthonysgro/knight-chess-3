import simulateMove from "./simulateMove";
import evaluateBoard from "./evaluationHeuristic";

// Gets all available moves for whoever's turn it is
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

// The starting point of our search: takes in the current
// board position and generates a tree for all possible moves
function minimaxRoot(game, isMaximisingPlayer, depth = 3) {
    const movePossibilities = getMoves(game);

    let bestMove = Infinity;
    let bestMoveFound;

    for (const [piece, move] of movePossibilities) {
        const testBoardConfig = simulateMove(game, piece, move);

        const evaluation = minimax(
            testBoardConfig,
            !isMaximisingPlayer,
            -10000,
            10000,
            depth - 1,
        );

        if (evaluation <= bestMove) {
            bestMove = evaluation;
            bestMoveFound = { piece, move };
        }
    }

    return { bestMoveEval: bestMove, bestMoveFound };
}

function minimax(game, isMaximisingPlayer, alpha, beta, depth) {
    // when we get to the end of depth, evaluate the final board
    if (depth === 0) return evaluateBoard(game);

    const movePossibilities = getMoves(game);

    // Change perspective of point values depending on who's turn it is
    let bestMove = isMaximisingPlayer ? -Infinity : Infinity;
    for (const [piece, move] of movePossibilities) {
        const testBoardConfig = simulateMove(game, piece, move);

        // Minimax! If you are maximizing score, find max, else find minimum score
        // Chess is fighting in opposite directions from the eval perspective
        bestMove = isMaximisingPlayer
            ? Math.max(
                  bestMove,
                  minimax(
                      testBoardConfig,
                      !isMaximisingPlayer,
                      alpha,
                      beta,
                      depth - 1,
                  ),
              )
            : Math.min(
                  bestMove,
                  minimax(
                      testBoardConfig,
                      !isMaximisingPlayer,
                      alpha,
                      beta,
                      depth - 1,
                  ),
              );

        alpha = isMaximisingPlayer ? Math.max(alpha, bestMove) : alpha;
        beta = !isMaximisingPlayer ? Math.min(beta, bestMove) : beta;
        if (beta <= alpha) return bestMove;
    }

    return bestMove;
}

export default minimaxRoot;
