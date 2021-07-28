import { convertNotation, convertBoardState } from "../scripts";

//sets up a vector pointing to a tile
function adjacentTile(from, direction, length, color) {
    //if we get input from off the board, just return undefined
    if (from === undefined) {
        return undefined;
    }

    const VALID_DIRECTIONS = [
        "up",
        "up-right",
        "right",
        "down-right",
        "down",
        "down-left",
        "left",
        "up-left",
    ];

    const BOARD = [
        ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
        ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
        ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
        ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
        ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
        ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
        ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
        ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
    ];

    if (!VALID_DIRECTIONS.includes(direction)) {
        return null;
    }

    //gets origin coordinates from player's perspective
    let frCoords = convertNotation(from);
    let resultCoords = [,];

    //if color is black, get from perspective
    if (color === "black") {
        frCoords = [7 - frCoords[0], 7 - frCoords[1]];
    }

    //determines result coordinates with magnitude param
    if (direction === "down-right") {
        resultCoords = [frCoords[0] + 1 * length, frCoords[1] - 1 * length];
    } else if (direction === "down") {
        resultCoords = [frCoords[0], frCoords[1] - 1 * length];
    } else if (direction === "down-left") {
        resultCoords = [frCoords[0], frCoords[1] - 1 * length];
    }

    //gets our result coords with an initial direction and magnitude
    switch (direction) {
        case "up":
            resultCoords = [frCoords[0], frCoords[1] + 1 * length];
            break;
        case "up-right":
            resultCoords = [frCoords[0] + 1 * length, frCoords[1] + 1 * length];
            break;
        case "right":
            resultCoords = [frCoords[0] + 1 * length, frCoords[1]];
            break;
        case "down-right":
            resultCoords = [frCoords[0] + 1 * length, frCoords[1] - 1 * length];
            break;
        case "down":
            resultCoords = [frCoords[0], frCoords[1] - 1 * length];
            break;
        case "down-left":
            resultCoords = [frCoords[0] - 1 * length, frCoords[1] - 1 * length];
            break;
        case "left":
            resultCoords = [frCoords[0] - 1 * length, frCoords[1]];
            break;
        case "up-left":
            resultCoords = [frCoords[0] - 1 * length, frCoords[1] + 1 * length];
            break;
    }

    //catches off-board moves before it returns a proper square
    const xOffBoard = resultCoords[0] < 0 || resultCoords[0] > 7;
    const yOffBoard = resultCoords[1] < 0 || resultCoords[1] > 7;
    if (xOffBoard || yOffBoard) {
        return undefined;
    }

    //returns chess coordinates
    if (color === "white") {
        resultCoords = convertBoardState(resultCoords);
        return BOARD[resultCoords[0]][resultCoords[1]];
    } else {
        return BOARD[resultCoords[1]][7 - resultCoords[0]];
    }
}

export default adjacentTile;
