//this function returns an image file based on string input
function imageSelector(pieceStr) {
    //if empty, placeholder
    if (pieceStr === " ") {
        return "../images/placeholder.png";
    }

    //case insensitive for piece and color determination
    const charCap = pieceStr.toUpperCase();

    const pieceIsWhite = charCap === pieceStr;
    const pieceIsKnight = charCap === "N";
    const pieceIsBishop = charCap === "B";
    const pieceIsQueen = charCap === "Q";
    const pieceIsKing = charCap === "K";
    const pieceIsRook = charCap === "R";
    const pieceIsPawn = charCap === "P";

    let color;
    if (pieceIsWhite) {
        color = "white";
    } else {
        color = "black";
    }

    let piece;
    if (pieceIsPawn) {
        piece = "pawn";
    } else if (pieceIsRook) {
        piece = "rook";
    } else if (pieceIsKnight) {
        piece = "knight";
    } else if (pieceIsBishop) {
        piece = "bishop";
    } else if (pieceIsQueen) {
        piece = "queen";
    } else if (pieceIsKing) {
        piece = "king";
    }

    return `../images/${color}-${piece}.png`;
}

export default imageSelector;
