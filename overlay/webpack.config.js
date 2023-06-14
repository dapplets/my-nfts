const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const fs = require('fs');

module.exports = {
    mode: 'development',
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/, /\.svg$/, /\.png$/, /\.jpg$/],
                use: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "public/index.html" }),
        new ForkTsCheckerWebpackPlugin(),
        new WebpackAssetsManifest(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 3007,
        https: {
          key: fs.readFileSync('src/secret/localhost/localhost.decrypted.key'),
          cert: fs.readFileSync('src/secret/localhost/localhost.crt')
        },
        hot: false,
        inline: false,
        liveReload: false,
        open: false
    }
};