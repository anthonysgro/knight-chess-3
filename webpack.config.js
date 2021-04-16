const path = require("path");
const webpackConfig = {
    entry: {
        path: path.join(__dirname, "./src/index.jsx"),
    },
    output: {
        path: path.join(__dirname, "./public/bundle"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
        ],
    },
};

module.exports = webpackConfig;
