import { dropPiece, populateMoves } from "../../store/actions";

// Import Scripts
import { convertNotation, convertBoardState } from "../../scripts";
import { cloneDeep } from "lodash";

import evaluateBoard from "./evaluationHeuristic";
import simulateMove from "./simulateMove";
import minimaxRoot from "./findBestMove";
import boardToFen from "../../scripts/boardToFEN";
import consultOpeningBook from "./consultOpeningBook";

import Chess from "./chess";

let globalEval = 0;

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
    const { endGameInfo, boardConfig } = boardState;

    // If it is the end of the game, just return
    if (endGameInfo.endGame) return;

    // Turn our board into FEN to efficiently traverse the space
    const FEN = boardToFen(boardState);
    const game = new Chess(FEN);

    // console.log(game);
    const depth = 3;
    const alpha = -Infinity;
    const beta = Infinity;

    // Find best move
    const [bestMove, bestMoveValue] = minimaxRoot(
        game,
        depth,
        alpha,
        beta,
        true,
        globalEval,
        "b",
    );

    globalEval = evaluateBoard(bestMove, globalEval, "b");

    const idnFROM = convertNotation(bestMove.from);
    const idxFROM = convertBoardState(idnFROM);

    const piece = boardConfig[idxFROM[0]][idxFROM[1]];

    const moveMade = consultOpeningBook(
        FEN,
        boardConfig,
        gameCode,
        thisPlayerWhite,
        underpromotion,
        gameModes,
        store,
        dropPiece,
    );

    if (!moveMade) {
        // Bot makes that move
        store.dispatch(
            dropPiece(
                piece,
                bestMove.to,
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
    }

    // Populate the moves afterwards like normal
    store.dispatch(populateMoves(gameCode, ""));
};

export default makeBotMovePiece;
