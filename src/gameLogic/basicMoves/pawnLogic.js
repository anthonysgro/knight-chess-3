import { adjacentTile, isEmptyTile } from "../index";
import { getPieceWithCoords } from "../../scripts";

function pawnLogic(target, origin, piece, boardConfig) {
    let validMove = false;
    let pawnMovedTwo = false;
    let enPassantEvent = false;
    let pawnPromotion = false;

    //attacked piece info
    const attackedPiece = getPieceWithCoords(target, boardConfig);
    const capturingPiece = !!attackedPiece;
    let capturingOppPiece;

    //if we are attacking a piece, get that piece
    if (capturingPiece) {
        capturingOppPiece = attackedPiece.color !== piece.color;
    }

    //possible pawn moves
    const tileAhead = adjacentTile(origin, "up", 1, piece.color);
    const twoTilesAhead = adjacentTile(origin, "up", 2, piece.color);
    const lAttack = adjacentTile(origin, "up-left", 1, piece.color);
    const rAttack = adjacentTile(origin, "up-right", 1, piece.color);

    switch (target) {
        //moving up one
        case tileAhead:
            //see if a piece is present at the tile
            validMove = isEmptyTile(target, boardConfig);
            break;
        //moving up two (first move only)
        case twoTilesAhead:
            //see if a piece is present at the tile
            const targetEmpty = isEmptyTile(twoTilesAhead, boardConfig);

            //also have to check if there's a piece present on the first square
            const nextTileEmpty = isEmptyTile(tileAhead, boardConfig);

            //if both are empty, and pawn hasn't moved yet
            if (targetEmpty && nextTileEmpty && piece.moveTwoAvailable) {
                pawnMovedTwo = true;
                validMove = true;
            }

            break;
        //attacking
        case lAttack:
            //if we are capturing an opponent's piece
            if (capturingOppPiece) {
                validMove = true;
                //if we aren't, it could be enpassant
            } else if (!capturingPiece) {
                //find enPassant square
                const enPassantSquare = adjacentTile(
                    lAttack,
                    "down",
                    1,
                    piece.color,
                );

                //if theres a piece
                if (!isEmptyTile(enPassantSquare, boardConfig)) {
                    //is it a pawn?
                    const passantPiece = getPieceWithCoords(
                        enPassantSquare,
                        boardConfig,
                    );
                    //if it is a pawn of the other team
                    if (
                        passantPiece.name === "Pawn" &&
                        passantPiece.color !== piece.color
                    ) {
                        //is it vulnerable to en passant?
                        if (passantPiece.vulnerableToEnPassant) {
                            validMove = true;
                            enPassantEvent = true;
                        }
                    }
                }
            }
            break;
        case rAttack:
            //if we are capturing an opponent's piece
            if (capturingOppPiece) {
                validMove = true;
            } else if (!capturingPiece) {
                //find enPassant square
                const enPassantSquare = adjacentTile(
                    rAttack,
                    "down",
                    1,
                    piece.color,
                );

                //if theres a piece
                if (!isEmptyTile(enPassantSquare, boardConfig)) {
                    //is it a pawn?
                    const passantPiece = getPieceWithCoords(
                        enPassantSquare,
                        boardConfig,
                    );
                    //if it is a pawn of the other team
                    if (
                        passantPiece.name === "Pawn" &&
                        passantPiece.color !== piece.color
                    ) {
                        //is it vulnerable to en passant?
                        if (passantPiece.vulnerableToEnPassant) {
                            validMove = true;
                            enPassantEvent = true;
                        }
                    }
                }
            }
            break;
    }

    if (validMove && (target[1] === "1" || target[1] === "8")) {
        pawnPromotion = true;
    }

    return {
        validMove: validMove,
        pawnMovedTwo: pawnMovedTwo,
        enPassantEvent: enPassantEvent,
        pawnPromotionEvent: pawnPromotion,
    };
}

export default pawnLogic;
