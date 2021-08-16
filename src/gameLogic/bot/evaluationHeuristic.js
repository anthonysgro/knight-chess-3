function evaluateBoard(boardState) {
    const { allPieces, whitePieces, blackPieces, whiteIsNext, endGameInfo } =
        boardState;

    let materialDifference = 0;
    for (const piece of allPieces) {
        const pieceColorMultiplier = piece.white ? 1 : -1;
        if (piece.name === "Pawn") {
            materialDifference += pieceColorMultiplier * 10;
        } else if (piece.name === "Knight") {
            materialDifference += pieceColorMultiplier * 30;
        } else if (piece.name === "Bishop") {
            materialDifference += pieceColorMultiplier * 30;
        } else if (piece.name === "Rook") {
            materialDifference += pieceColorMultiplier * 50;
        } else if (piece.name === "Queen") {
            materialDifference += pieceColorMultiplier * 90;
        } else if (piece.name === "King") {
            materialDifference += pieceColorMultiplier * 900;
        }
    }

    // if (endGameInfo.checkmate)

    return materialDifference;
}

export default evaluateBoard;
