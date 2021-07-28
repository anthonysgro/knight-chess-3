//two way converter for chess notation!
function convertNotation(arr) {
    if (typeof arr[0] === "string") {
        const letter = arr[0];
        const number = arr[1];

        const col = letter.charCodeAt(0) - 97;
        const row = parseInt(number) - 1;

        return [col, row];
    } else {
        const col = arr[0];
        const row = arr[1];
        const letter = String.fromCharCode(col + 97);
        const number = row + 1;

        return [letter, number.toString()];
    }
}

module.exports = convertNotation;
