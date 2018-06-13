const autoprefixer = require('autoprefixer');
const paths = require('./paths');

module.exports.tsLoader = {
    test: /.tsx?$/,
    loader: 'ts-loader',
    options: {
        configFile: paths.tsConfig,
        colors: true,
    },
    exclude: /node_modules/,
};

module.exports.sassLoader = {
    test: /.scss$/,
    use: [
        'style-loader',
        {
            loader: require.resolve('css-loader'),
            options: {
                modules: true,
                localIdentName: '__[hash:base64:10]__',
                importLoaders: 1,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        },
        'sass-loader'
    ]
};

module.exports.cssLoader = {
    test: /.css$/,
    use: [
        'style-loader',
        {
            loader: require.resolve('css-loader'),
            options: {
                modules: true,
                localIdentName: '__[hash:base64:10]__',
                importLoaders: 1,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        }
    ]
}

module.exports.fileLoader =  {
    exclude: [/\.js$/, /\.html$/, /\.json$/],
    loader: 'file-loader',
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    },
};

module.exports.urlLoader = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
    },
};