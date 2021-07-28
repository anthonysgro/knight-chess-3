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
        color = "w";
    } else {
        color = "b";
    }

    let piece;
    if (pieceIsPawn) {
        piece = "P";
    } else if (pieceIsRook) {
        piece = "R";
    } else if (pieceIsKnight) {
        piece = "N";
    } else if (pieceIsBishop) {
        piece = "B";
    } else if (pieceIsQueen) {
        piece = "Q";
    } else if (pieceIsKing) {
        piece = "K";
    }

    return `../images/pieces/alpha/${color}${charCap}.svg`;
}

module.exports = imageSelector;
