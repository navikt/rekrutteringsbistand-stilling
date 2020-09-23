const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    return merge(common, {
        mode: 'production',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /index\.html$/,
                    loader: 'mustache-loader',
                    options: {
                        render: {
                            isProduction: true,
                        },
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                MOCK_APP: false,
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
    });
};
