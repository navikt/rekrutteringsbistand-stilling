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
                test: /\.([tj])sx?$/,
                exclude: /node_modules/,
                use: ['cache-loader', { loader: 'awesome-typescript-loader' }],
                // query: { presets: ['es2015', 'react', 'stage-2'] },
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
            filename: './css/styles.css',
        }),
    ],
};
