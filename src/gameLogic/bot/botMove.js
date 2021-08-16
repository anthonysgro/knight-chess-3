import { dropPiece, populateMoves } from "../../store/actions";

// Import Scripts
import { convertNotation, convertBoardState } from "../../scripts";
import { cloneDeep } from "lodash";

import evaluateBoard from "./evaluationHeuristic";
import simulateMove from "./simulateMove";
import minimaxRoot from "./findBestMove";

// Make a bot move
const makeBotMovePiece = (
    store,
    gameCode,
    thisPlayerWhite,
    underpromotion,
    gameModes,
) => {
    // Get the board state
    const { boardState } = store.getState();
    const { endGameInfo } = boardState;

    // If it is the end of the game, just return
    if (endGameInfo.endGame) return;

    // Find best move
    const { bestMoveEval, bestMoveFound } = minimaxRoot(boardState, true);
    const { piece, move } = bestMoveFound;

    console.log(bestMoveEval, bestMoveFound);

    // Bot makes that move
    store.dispatch(
        dropPiece(
            piece,
            move.to,
            gameCode,
            "",
            !thisPlayerWhite,
            underpromotion,
            gameModes,
        ),
    );

    // Populate the moves afterwards like normal
    store.dispatch(populateMoves(gameCode, ""));
};

export default makeBotMovePiece;
