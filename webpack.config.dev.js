const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: {
            index: './index.html'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __PAM_CONTEXT_PATH__: "''",
            __PAM_AD_API__: "'https://pam-ad-api.nais.oera-q.local/api/v1/'",
            __PAM_LOGIN_URL__: "'http://localhost:9014/login'"
        }),
        new HtmlWebpackPlugin({
                template: './src/index.html'
            }
        )
    ]
});
