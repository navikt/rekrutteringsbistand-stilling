const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) =>
    merge(common, {
        mode: 'development',
        devtool: 'eval-cheap-source-map',
        devServer: {
            historyApiFallback: {
                index: '/stillinger',
            },
        },
        module: {
            rules: [
                {
                    test: /index\.html$/,
                    loader: 'mustache-loader',
                    options: {
                        render: {
                            isProduction: false,
                        },
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                STILLING_REKRUTTERINGSBISTAND_BASE_URL:
                    "'http://localhost:9501/rekrutteringsbistand-api'",
                STILLING_LOGIN_URL:
                    "'http://localhost:9501/rekrutteringsbistand-api/local/cookie-isso'",
                STILLING_VIS_STILLING_URL: "'https://www-q0.nav.no/arbeid/stilling'",
                MOCK_APP: env.MOCK_APP,
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
    });
