const Piece = require("./piece-class/Piece");
function parsePiece(piece) {
    return Object.assign(new Piece(piece.char, piece.numberCoords), piece);
}

module.exports = parsePiece;
