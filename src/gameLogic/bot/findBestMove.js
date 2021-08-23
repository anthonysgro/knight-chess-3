import evaluateBoard from "./evaluationHeuristic";

function minimax(game, depth, alpha, beta, isMaximizingPlayer, sum, color) {
    if (game.game_over()) return [null, sum];
    const children = game.ugly_moves({ verbose: true });

    // Sort moves randomly, so the same move isn't always picked on ties
    children.sort((a, b) => 0.5 - Math.random());

    let currMove;
    // Maximum depth exceeded or node is a terminal node (no children)
    if (depth === 0 || children.length === 0) return [null, sum];

    // Find maximum/minimum from list of 'children' (possible moves)
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove;
    for (var i = 0; i < children.length; i++) {
        currMove = children[i];

        // Note: in our case, the 'children' are simply modified game states
        const currPrettyMove = game.ugly_move(currMove);
        // If it is a draw, sum is 0
        const newSum = game.in_draw()
            ? 0
            : // if this player checkmated, they value this at Infinity
            game.in_checkmate() && isMaximizingPlayer
            ? Number.MAX_SAFE_INTEGER
            : // Same goes if they are getting checkmated
            game.in_checkmate() && !isMaximizingPlayer
            ? Number.MIN_SAFE_INTEGER
            : evaluateBoard(currPrettyMove, sum, color);

        // const newSum = evaluateBoard(currPrettyMove, sum, color);

        const [childBestMove, childValue] = minimax(
            game,
            children.length < 3 ? depth : depth - 1,
            alpha,
            beta,
            !isMaximizingPlayer,
            newSum,
            color,
        );

        game.undo();

        if (isMaximizingPlayer) {
            if (childValue > maxValue) {
                maxValue = childValue;
                bestMove = currPrettyMove;
            }
            if (childValue > alpha) {
                alpha = childValue;
            }
        } else {
            if (childValue < minValue) {
                minValue = childValue;
                bestMove = currPrettyMove;
            }
            if (childValue < beta) {
                beta = childValue;
            }
        }

        // Alpha-beta pruning
        if (alpha >= beta) {
            break;
        }
    }

    if (isMaximizingPlayer) {
        return [bestMove, maxValue];
    } else {
        return [bestMove, minValue];
    }
}

// The starting point of our search: takes in the current
// board position and generates a tree for all possible moves
// function minimax(game, depth, alpha, beta, isMaximizingPlayer, sum, color) {
//     const children = game.ugly_moves({ verbose: true });

//     // Sort moves randomly, so the same move isn't always picked on ties
//     children.sort((a, b) => 0.5 - Math.random());

//     let currMove;

//     // Maximum depth exceeded or node is a terminal node (no children)
//     if (depth === 0 || children.length === 0) return [null, sum];

//     // Find maximum/minimum from list of 'children' (possible moves)
//     let maxValue = Number.NEGATIVE_INFINITY;
//     let minValue = Number.POSITIVE_INFINITY;
//     let bestMove;

//     for (const currMove of children) {
//         // In our case, the 'children' are simply modified game states
//         const currPrettyMove = game.ugly_move(currMove);

//         // if () {
//         //     maxValue = Infinity;
//         // } else if (game.in_checkmate() && !isMaximizingPlayer) {
//         //     maxValue = -Infinity;
//         // }

//         // If it is a draw, sum is 0
//         const newSum = evaluateBoard(currPrettyMove, sum, color);
//         // game.in_draw()
//         //     ? 0
//         //     : // if this player checkmated, they value this at Infinity
//         //     game.in_checkmate() && isMaximizingPlayer
//         //     ? Infinity
//         //     : // Same goes if they are getting checkmated
//         //     game.in_checkmate() && !isMaximizingPlayer
//         //     ? -Infinity
//         // :

//         const [childBestMove, childValue] = minimax(
//             game,
//             depth - 1,
//             alpha,
//             beta,
//             !isMaximizingPlayer,
//             newSum,
//             color,
//         );

//         game.undo();

//         if (isMaximizingPlayer) {
//             if (childValue > maxValue) {
//                 maxValue = childValue;
//                 bestMove = currPrettyMove;
//             }
//             if (childValue > alpha) {
//                 alpha = childValue;
//             }
//         } else {
//             if (childValue < minValue) {
//                 minValue = childValue;
//                 bestMove = currPrettyMove;
//             }
//             if (childValue < beta) {
//                 beta = childValue;
//             }
//         }

//         // Alpha-beta pruning
//         if (alpha >= beta) {
//             break;
//         }
//     }

//     if (isMaximizingPlayer) {
//         return [bestMove, maxValue];
//     } else {
//         return [bestMove, minValue];
//     }
// }

export default minimax;

//
//
//
// function minimax(game, depth, alpha, beta, isMaximizingPlayer, sum, color) {
//     positionCount++;
//     var children = game.ugly_moves({ verbose: true });

//     // Sort moves randomly, so the same move isn't always picked on ties
//     children.sort(function (a, b) {
//         return 0.5 - Math.random();
//     });

//     var currMove;
//     // Maximum depth exceeded or node is a terminal node (no children)
//     if (depth === 0 || children.length === 0) {
//         return [null, sum];
//     }

//     // Find maximum/minimum from list of 'children' (possible moves)
//     var maxValue = Number.NEGATIVE_INFINITY;
//     var minValue = Number.POSITIVE_INFINITY;
//     var bestMove;
//     for (var i = 0; i < children.length; i++) {
//         currMove = children[i];

//         // Note: in our case, the 'children' are simply modified game states
//         var currPrettyMove = game.ugly_move(currMove);
//         var newSum = evaluateBoard(currPrettyMove, sum, color);
//         var [childBestMove, childValue] = minimax(
//             game,
//             depth - 1,
//             alpha,
//             beta,
//             !isMaximizingPlayer,
//             newSum,
//             color,
//         );

//         game.undo();

//         if (isMaximizingPlayer) {
//             if (childValue > maxValue) {
//                 maxValue = childValue;
//                 bestMove = currPrettyMove;
//             }
//             if (childValue > alpha) {
//                 alpha = childValue;
//             }
//         } else {
//             if (childValue < minValue) {
//                 minValue = childValue;
//                 bestMove = currPrettyMove;
//             }
//             if (childValue < beta) {
//                 beta = childValue;
//             }
//         }

//         // Alpha-beta pruning
//         if (alpha >= beta) {
//             break;
//         }
//     }

//     if (isMaximizingPlayer) {
//         return [bestMove, maxValue];
//     } else {
//         return [bestMove, minValue];
//     }
// }
