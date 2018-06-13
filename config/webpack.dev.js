const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const devServer = require('./devServer');
const loaders = require('./loaders');

const publicPath = '/';
const publicUrl = '';
const filename = 'static/js/bundle.js';
const chunkFilename = 'static/js/[name].chunk.js';
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];

module.exports = {
    devServer,    
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack/hot/only-dev-server',
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename,
        chunkFilename,
        publicPath,
    },
    resolve: {
        extensions
    },
    module: {
        rules: [{
            oneOf: [
                // order matters
                loaders.urlLoader,
                loaders.tsLoader,
                loaders.sassLoader,
                loaders.cssLoader,
                loaders.fileLoader,
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    performance: {
        hints: false,
    },
}