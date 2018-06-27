const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
            __PAM_AD_API__: "'http://localhost:9001/api/v1/'",
        })
    ]
});
