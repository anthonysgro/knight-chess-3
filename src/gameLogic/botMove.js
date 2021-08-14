import { dropPiece, populateMoves } from "../store/actions";

const makeBotMovePiece = (
    store,
    gameCode,
    thisPlayerWhite,
    underpromotion,
    gameModes,
) => {
    const boardState = store.getState().boardState;
    if (boardState.endGameInfo.endGame) return;
    const botPieces = !boardState.whiteIsNext
        ? boardState.blackPieces
        : boardState.whitePieces;
    const movePossibilities = [];
    for (const piece of botPieces) {
        for (const move of piece.validMoves) {
            movePossibilities.push({ piece, move });
        }
    }
    const randIdx = Math.floor(Math.random() * movePossibilities.length);
    const { piece, move } = movePossibilities[randIdx];

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
