const consultOpeningBook = (
    FEN,
    boardConfig,
    gameCode,
    thisPlayerWhite,
    underpromotion,
    gameModes,
    store,
    dropPiece,
) => {
    let moveMade = false;

    // If player plays "e4"
    if (FEN === "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1") {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[1][4] : boardConfig[1][2],
                randomChance === 0 ? "e5" : "c5",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );

        moveMade = true;
    }

    // If nf3, continue with ruy lopez or protect pawn
    if (
        FEN === "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[0][1] : boardConfig[1][3],
                randomChance === 0 ? "c6" : "d6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN === "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[1][3],
                "d6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[3][4],
                "d4",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "r1b1kbnr/pppp1ppp/2n2q2/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[0][6],
                "e7",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN === "r1bqkbnr/ppp2ppp/2np4/8/2BNP3/8/PPP2PPP/RNBQK2R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[0][5] : boardConfig[0][6],
                randomChance === 0 ? "e7" : "f6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[3][2] : boardConfig[0][6],
                randomChance === 0 ? "d4" : "f6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/pp2pppp/3p1n2/2P5/4P3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[2][5],
                "e4",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (FEN === "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 1") {
        store.dispatch(
            dropPiece(
                boardConfig[0][6],
                "f6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/pp2pppp/3p1n2/2p5/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[3][2],
                "d4",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[1][0],
                "a6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );

        moveMade = true;
    }

    if (
        FEN ===
        "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[1][0] : boardConfig[0][6],
                randomChance === 0 ? "a6" : "f6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[2][0] : boardConfig[0][6],
                randomChance === 0 ? "b5" : "f6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/1p3ppp/p2p1n2/4p3/4P3/2N4P/PPP1NPP1/R1BQKB1R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[1][7],
                "h5",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "r1bqkb1r/pppp1ppp/2n5/1B2p3/4n3/5N2/PPPP1PPP/RNBQR1K1 b kq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[4][4],
                "d6",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[0][5] : boardConfig[2][5],
                randomChance === 0 ? "c5" : "e4",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 0 1"
    ) {
        const randomChance = Math.floor(Math.random() * 2);
        store.dispatch(
            dropPiece(
                randomChance === 0 ? boardConfig[1][4] : boardConfig[1][4],
                randomChance === 0 ? "e6" : "e5",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N1B3/PPP1BPPP/R2QK2R b KQkq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[0][5],
                "e7",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }

    if (
        FEN ===
        "rnbqk2r/1p2bppp/p2ppn2/8/3NP3/2N1B3/PPP1BPPP/R2Q1RK1 b kq - 0 1"
    ) {
        store.dispatch(
            dropPiece(
                boardConfig[0][4],
                "g8",
                gameCode,
                "",
                !thisPlayerWhite,
                underpromotion,
                gameModes,
            ),
        );
        moveMade = true;
    }
    return moveMade;
};

export default consultOpeningBook;
