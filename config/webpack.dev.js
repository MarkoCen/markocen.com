const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const devServer = require('./devServer');

const publicPath = '/';
const publicUrl = '';
const filename = 'static/js/bundle.js';
const chunkFilename = 'static/js/[name].chunk.js';

module.exports = {
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
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },
    module: {
        rules: [{
            oneOf: [
                {
                    test: /.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: paths.tsConfig,
                        colors: true,
                    },
                    exclude: /node_modules/,
                },
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
    devServer
}