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

    const {
        boardConfig,
        allPieces,
        whitePieces,
        blackPieces,
        history,
        stepNumber,
        onMostRecentBoard,
        whiteIsNext,
        rotation,
        selectedPiece,
        isDragging,
        selectedPieceMoves,
        pieceInCheck,
        whiteHasPlayer,
        blackHasPlayer,
        lastMoveValid,
        endGameInfo,
    } = boardState;

    // If it is the end of the game, just return
    if (endGameInfo.endGame) return;

    const bestMove = minimaxRoot(boardState, true);

    // const botPieces = !whiteIsNext ? blackPieces : whitePieces;

    // const movePossibilities = [];
    // for (const piece of botPieces) {
    //     for (const move of piece.validMoves) {
    //         const testBoardConfig = simulateMove(boardState, piece, move);
    //         const evaluation = evaluateBoard(testBoardConfig);
    //         movePossibilities.push({ piece, move, evaluation });
    //     }
    // }

    // movePossibilities.sort((a, b) => a.evaluation - b.evaluation);
    const [piece, move] = bestMove;

    console.log(bestMove);
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

    store.dispatch(populateMoves(gameCode, ""));
};

export default makeBotMovePiece;
