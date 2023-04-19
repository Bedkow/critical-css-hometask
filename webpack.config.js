const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(scss)$/,
                use: [
                    miniCss.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new CriticalCssPlugin({
            dimensions: [{width:320, height: 568},{width:768, height: 1024}, {width:1600, height: 900}],
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            target: 'index.html',
            inline: true,
            extract: true,
            width: 375,
            height: 565,
        }),
    ],
};
