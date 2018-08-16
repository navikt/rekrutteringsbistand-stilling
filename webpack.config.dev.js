const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [{
            test: /index\.html$/,
            loader: 'mustache-loader',
            options: {
                render: {
                    isProduction: false,
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            __PAM_CONTEXT_PATH__: "''",
            __PAM_AD_API__: "'https://pam-ad-api.nais.preprod.local/api/v1/'",
            __PAM_SEARCH_API__: "'https://pam-ad-api.nais.preprod.local/search-api/'",
            __PAM_LOGIN_URL__: "'http://localhost:9015/login'"
        }),
        new HtmlWebpackPlugin({
                template: './src/index.html'
            }
        )
    ]
});
