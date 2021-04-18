import { convertNotation, convertBoardState } from "../scripts";

//returns piece instance with dom element
function getPieceWithDom(elem, boardConfig) {
    if (elem === undefined) {
        return undefined;
    }

    const coords = convertNotation(elem.id);
    const id = convertBoardState(coords);

    return boardConfig[id[0]][id[1]];
}

function getPieceWithCoords(coords, boardConfig) {
    if (coords === undefined || coords === null) {
        return undefined;
    }

    const convCoords = convertNotation(coords);
    const id = convertBoardState(convCoords);

    return boardConfig[id[0]][id[1]];
}

export { getPieceWithDom, getPieceWithCoords };
