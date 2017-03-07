/**
 * NÃO ALTERAR ESTE ARQUIVO
 * */
// todo : colocar carga das libs externas e plugins em arquivo de configuração
const config = require('./config');

const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

/**
 * Configurações gerais
 * */
const port = config.port;
const publicPath = `/${config.appSubUrl}`;
const appSourcePath = path.join(__dirname, './src/app');
const buildPath = path.join(__dirname, './public');
const imgPath = path.join(__dirname, './src/app/assets/img');
const sourcePath = path.join(__dirname, './src');

/**
 * Commons plugins
 * */
const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor-[hash].js',
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
        metadata: {
            title: config.appTitle
        }
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer({
                    browsers: [
                        'last 3 version',
                        'ie >= 10',
                    ],
                }),
            ],
            context: sourcePath,
        },
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Hammer: "hammerjs"
    }),
    new ExtractTextPlugin('style-[hash].css')
];

/**
 * Common rules
 * */
const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
        ],
    },
    {
        test: /\.(png|gif|jpg|svg)$/,
        include: imgPath,
        use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader?modules&importLoaders=1',
            // 'postcss-loader'
            {
                loader: 'postcss-loader?parser=postcss-js&sourceMap=inline',
                options: {
                    plugins: function () {
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            }
        ]
    }
];

if (isProduction) {
    /**
     * Production plugins
     * */
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        })
        // new ExtractTextPlugin('style-[hash].css')
    );

    /**
     * Production rules
     * */
    rules.push(
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader!postcss-loader!sass-loader',
            }),
        }
    );
} else {

    /**
     * Development plugins
     * */
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    );

    /**
     * Development rules
     * */
    rules.push(
        {
            test: /\.scss$/,
            // test: /(\.css|\.scss)$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                // Using source maps breaks urls in the CSS loader
                // https://github.com/webpack/css-loader/issues/232
                // This comment solves it, but breaks testing from a local network
                // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
                // 'css-loader?sourceMap',
                'css-loader',
                'postcss-loader',
                'sass-loader?sourceMap',
            ],
        }
    );
}

module.exports = {
    devtool: isProduction ? 'eval' : 'source-map',
    context: sourcePath,
    entry: {
        js: './index.js',
        vendor: [
            'babel-polyfill',
            'es6-promise',
            'immutable',
            'isomorphic-fetch',
            'react-dom',
            'react-redux',
            'react-router',
            'react',
            'redux-thunk',
            'redux',
            'jquery',
            'materialize-css',
            // 'font-awesome',
        ],
    },
    output: {
        path: buildPath,
        publicPath: publicPath,
        filename: 'app-[hash].js',
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            appSourcePath,
        ],
    },
    plugins,
    devServer: {
        contentBase: isProduction ? './build' : './source',
        historyApiFallback: true,
        port: port,
        compress: isProduction,
        inline: !isProduction,
        hot: !isProduction,
        host: isProduction ? '127.0.0.1' : '0.0.0.0',
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            },
        },
    },
};
