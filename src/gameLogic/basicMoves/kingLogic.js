import { adjacentTile, isEmptyTile } from "../index";
import { getPieceWithCoords } from "../../scripts";

function kingLogic(target, origin, piece, boardConfig) {
    //initialize information
    let validMove = false;
    let castleEvent = {
        castleMove: false,
        rookInvolved: {},
        squaresInvolved: [],
        type: "",
        direction: "",
    };

    //gets attacked piece info
    const attackedPiece = getPieceWithCoords(target, boardConfig);
    const capturingPiece = !!attackedPiece;
    let capturingOppPiece;
    if (capturingPiece) {
        capturingOppPiece = attackedPiece.color !== piece.color;
    }

    //normal move detection (1 in every direction)
    switch (target) {
        case adjacentTile(origin, "up", 1, piece.color):
            //if empty square, or capturing enemy piece, valid move
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "down", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "left", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "right", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "up-right", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "down-right", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "down-left", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
        case adjacentTile(origin, "up-left", 1, piece.color):
            validMove = isEmptyTile(target, boardConfig) || capturingOppPiece;
            break;
    }

    //enables us to switch directional information based on piece color
    let direction = [];
    if (piece.white) {
        direction.push("right");
        direction.push("left");
    } else {
        direction.push("left");
        direction.push("right");
    }

    //only search here if castling is available still (otherwise it won't work)
    if (piece.castlingAvailable) {
        //castling detection
        switch (target) {
            //short castle
            case adjacentTile(origin, direction[0], 2, piece.color):
                let shortCastSquares = [];
                let shortSquareStatus = [];
                for (let i = 1; i < 4; i++) {
                    shortCastSquares.push(
                        adjacentTile(origin, direction[0], i, piece.color),
                    );
                    shortSquareStatus.push(
                        isEmptyTile(shortCastSquares[i - 1], boardConfig),
                    );
                }

                const shortSquarePiece = getPieceWithCoords(
                    shortCastSquares[2],
                    boardConfig,
                );

                if (!shortSquarePiece) break;

                //if the squares next to the king are empty, and there's a rook that hasn't moved
                if (
                    shortSquareStatus[0] &&
                    shortSquareStatus[1] &&
                    shortSquarePiece.name === "Rook" &&
                    shortSquarePiece.hasMoved === false
                ) {
                    //change our castle event so we can process the move
                    validMove = true;
                    castleEvent.castleMove = true;
                    castleEvent.rookInvolved = shortSquarePiece;
                    castleEvent.squaresInvolved = [
                        origin,
                        shortCastSquares[0],
                        shortCastSquares[1],
                    ];

                    castleEvent.type = "short";
                    castleEvent.direction = direction[0];
                }
                break;

            //long castle
            case adjacentTile(origin, direction[1], 2, piece.color):
                let longCastSquares = [];
                let longSquareStatus = [];
                for (let i = 1; i < 5; i++) {
                    longCastSquares.push(
                        adjacentTile(origin, direction[1], i, piece.color),
                    );
                    longSquareStatus.push(
                        isEmptyTile(longCastSquares[i - 1], boardConfig),
                    );
                }

                const longSquarePiece = getPieceWithCoords(
                    longCastSquares[3],
                    boardConfig,
                );

                if (!longSquarePiece) break;

                //if the squares next to the king are empty, and there's a rook that hasn't moved
                if (
                    longSquareStatus[0] &&
                    longSquareStatus[1] &&
                    longSquareStatus[2] &&
                    longSquarePiece.name === "Rook" &&
                    longSquarePiece.hasMoved === false
                ) {
                    //change our castle event so we can process the move
                    validMove = true;
                    castleEvent.castleMove = true;
                    castleEvent.rookInvolved = longSquarePiece;
                    castleEvent.squaresInvolved = [
                        origin,
                        longCastSquares[0],
                        longCastSquares[1],
                    ];
                    castleEvent.type = "long";
                    castleEvent.direction = direction[1];
                }
                break;
        }
    }

    return { validMove, castleEvent };
}

export default kingLogic;
