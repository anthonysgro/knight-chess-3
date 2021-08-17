const path = require("path");
const webpackConfig = {
    entry: {
        path: path.join(__dirname, "./src/index.jsx"),
    },
    output: {
        path: path.join(__dirname, "./public/bundle"),
        filename: "main.js",
    },
    resolve: {
        fallback: {
            os: require.resolve("os-browserify/browser"),
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
            "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
        },
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[hash]-[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = webpackConfig;
