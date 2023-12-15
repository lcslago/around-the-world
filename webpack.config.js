const path = require('path');
const HtmlPluginClass = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const HtmlMinimizer = require('html-minimizer-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtract.loader, 'css-loader'] }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizer(), new HtmlMinimizer(), '...']
    },
    plugins: [
        new HtmlPluginClass({
            template: './index.html',
            favicon: './favico.svg',
            hash: true
        }),
        new MiniCssExtract({
            filename: 'style.css'
        }),
        new Webpack.optimize.ModuleConcatenationPlugin()
    ]
};