const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle-[hash:7].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react', 'stage-2'] },
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
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/styles.css',
        }),
    ],
};
