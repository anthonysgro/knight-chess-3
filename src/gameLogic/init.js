// Piece Imports
import { Pawn, Rook, Knight, Bishop, Queen, King } from "../pieces";

//
import { populateMoves } from "./index";

function init() {
    // Remakes all pieces
    let R1 = new Rook("R", [0, 0]);
    let N1 = new Knight("N", [1, 0]);
    let B1 = new Bishop("B", [2, 0]);
    let Q1 = new Queen("Q", [3, 0]);
    let K1 = new King("K", [4, 0]);
    let B2 = new Bishop("B", [5, 0]);
    let N2 = new Knight("N", [6, 0]);
    let R2 = new Rook("R", [7, 0]);
    let P1 = new Pawn("P", [0, 1]);
    let P2 = new Pawn("P", [1, 1]);
    let P3 = new Pawn("P", [2, 1]);
    let P4 = new Pawn("P", [3, 1]);
    let P5 = new Pawn("P", [4, 1]);
    let P6 = new Pawn("P", [5, 1]);
    let P7 = new Pawn("P", [6, 1]);
    let P8 = new Pawn("P", [7, 1]);

    let r1 = new Rook("r", [0, 7]);
    let n1 = new Knight("n", [1, 7]);
    let b1 = new Bishop("b", [2, 7]);
    let q1 = new Queen("q", [3, 7]);
    let k1 = new King("k", [4, 7]);
    let b2 = new Bishop("b", [5, 7]);
    let n2 = new Knight("n", [6, 7]);
    let r2 = new Rook("r", [7, 7]);
    let p1 = new Pawn("p", [0, 6]);
    let p2 = new Pawn("p", [1, 6]);
    let p3 = new Pawn("p", [2, 6]);
    let p4 = new Pawn("p", [3, 6]);
    let p5 = new Pawn("p", [4, 6]);
    let p6 = new Pawn("p", [5, 6]);
    let p7 = new Pawn("p", [6, 6]);
    let p8 = new Pawn("p", [7, 6]);

    // Initial board configuration
    const boardConfig = [
        [r1, n1, b1, q1, k1, b2, n2, r2],
        [p1, p2, p3, p4, p5, p6, p7, p8],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [P1, P2, P3, P4, P5, P6, P7, P8],
        [R1, N1, B1, Q1, K1, B2, N2, R2],
    ];

    // Edit this and return it as board config to test any configuration
    const testBoard = [
        [null, null, null, null, k1, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [P1, null, null, null, null, null, null, null],
        [null, null, null, null, K1, null, null, null],
    ];

    //prettier-ignore
    const initWhiteGroup = [R1,N1,B1,Q1,K1,B2,N2,R2,P1,P2,P3,P4,P5,P6,P7,P8];
    // const initWhiteGroup = [K1, P1];

    //prettier-ignore
    const initBlackGroup = [r1,n1,b1,q1,k1,b2,n2,r2,p1,p2,p3,p4,p5,p6,p7,p8];
    // const initBlackGroup = [k1];

    // All Pieces
    const initAllGroup = [...initWhiteGroup, ...initBlackGroup];

    const { newWhitePieces, newBlackPieces, newBoardConfig } = populateMoves(
        initAllGroup,
        boardConfig,
        // testBoard,
    );

    // Tracks the board configuration over time
    const history = [
        {
            // This is our board representation
            boardConfig: newBoardConfig,
            from: "",
            to: "",
        },
    ];

    return {
        boardConfig: newBoardConfig,
        allPieces: [...newWhitePieces, ...newBlackPieces],
        whitePieces: newWhitePieces,
        blackPieces: newBlackPieces,
        history,
        stepNumber: 0,
        onMostRecentBoard: true,
        whiteIsNext: true,
        whiteHasPlayer: false,
        blackHasPlayer: false,
        rotation: 0,
        selectedPiece: null,
        isDragging: false,
        selectedPieceMoves: [],
        pieceInCheck: null,
        endGameInfo: {
            checkmate: false,
            stalemate: false,
            whiteWins: false,
            blackWins: false,
            draw: false,
            insufficientMaterial: false,
            endGame: false,
            resigns: false,
            someoneLeft: false,
        },
    };
}

export default init;
