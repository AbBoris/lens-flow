const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dist = 'dist';
const isTestMode = process.env.NODE_ENV == 'test';
const isPublishing = !!process.env.PUBLISHING;

config = {
    context: path.resolve('./'),

    output: {
        filename: `${dist}/[name].js`,
        publicPath: '/',
        libraryTarget: !isTestMode && isPublishing ? 'commonjs' : undefined,
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.less'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        declaration: false,
                    },
                },
                exclude: [/node_modules/, /dist/],
            },
        ],
    },

    devtool: isPublishing ? 'source-map' : 'eval',

    devServer: {
        contentBase: path.resolve(dist),
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'lens-flow',
            filename: path.resolve('./dist', 'index.html'),
        }),
        new CleanWebpackPlugin([dist]),
    ],
};

if (isTestMode) {
    config.entry = {specs: './index.spec'};
} else {
    config.entry = {lens: './index'};
}

module.exports = config;
