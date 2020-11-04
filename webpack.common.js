const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[contenthash:7].js',
        publicPath: '/stillinger',
    },
    module: {
        rules: [
            {
                test: /\.([tj])sx?$/,
                exclude: /node_modules/,
                use: ['cache-loader', { loader: 'ts-loader' }],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
        }),
    ],
};
