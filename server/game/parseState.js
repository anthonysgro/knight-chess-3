const parsePiece = require("./parsePiece");
function parseState(state) {
    // Parse Normally
    const newState = JSON.parse(state);

    // Now we need all pieces to have the prototype inheritance for the Piece class
    const {
        allPieces,
        blackPieces,
        whitePieces,
        history,
        pieceInCheck,
        boardConfig,
    } = newState;

    const newAllPieces = [];
    for (const piece of allPieces) {
        newAllPieces.push(parsePiece(piece));
    }
    newState.allPieces = newAllPieces;

    const newBlackPieces = [];
    for (let piece of blackPieces) {
        newBlackPieces.push(parsePiece(piece));
    }
    newState.blackPieces = newBlackPieces;

    const newWhitePieces = [];
    for (const piece of whitePieces) {
        newWhitePieces.push(parsePiece(piece));
    }
    newState.whitePieces = newWhitePieces;

    const newBoardConfig = [];
    for (let i = 0; i < boardConfig.length; i++) {
        const row = [];
        for (let j = 0; j < boardConfig[i].length; j++) {
            if (boardConfig[i][j] && boardConfig[i][j].hasOwnProperty("char")) {
                row.push(parsePiece(boardConfig[i][j]));
            } else {
                row.push(null);
            }
        }
        newBoardConfig.push(row);
    }
    newState.boardConfig = newBoardConfig;

    const newHistory = [];
    for (const step of history) {
        const newHistoryItem = [];
        for (let i = 0; i < step.boardConfig.length; i++) {
            const row = [];
            for (let j = 0; j < step.boardConfig[i].length; j++) {
                if (
                    step.boardConfig[i][j] &&
                    step.boardConfig[i][j].hasOwnProperty("char")
                ) {
                    row.push(parsePiece(step.boardConfig[i][j]));
                } else {
                    row.push(null);
                }
            }
            newHistoryItem.push(row);
        }
        newHistory.push({ boardConfig: newHistoryItem });
    }

    newState.history = newHistory;

    if (pieceInCheck) {
        newState.pieceInCheck = parsePiece(pieceInCheck);
    }

    return newState;
}

module.exports = parseState;
