const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/app.js'],
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
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader?{"globalVars":{"nodeModulesPath":"\'./../../\'", "coreModulePath":"\'./../../\'"}}',
                    ],
                }),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    plugins: [new ExtractTextPlugin('css/styles.css')],
};
