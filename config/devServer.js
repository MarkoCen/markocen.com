const paths = require('./paths');

const publicPath = '/';
const host = 'localhost';
const port = '1250';

module.exports = {
    publicPath,
    contentBase: paths.appBuild,

    compress: true,
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    quiet: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    proxy: {
        "/api/**": {
            target: "http://localhost:7070",
            changeOrigin: true,
            cookieDomainRewrite: {
                "*": ""
            }
        }
    },
    host,
    port
};