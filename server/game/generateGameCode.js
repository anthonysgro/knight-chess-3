function generateGameCode(length) {
    let result = "";
    const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
        result += CHARACTERS.charAt(
            Math.floor(Math.random() * CHARACTERS.length),
        );
    }
    return result;
}
module.exports = generateGameCode;
