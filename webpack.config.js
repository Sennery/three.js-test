const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => { 
    return {
        entry: {
            'index': './src/index.js'
        },  

        output: {
            path: path.resolve(__dirname, (env) ? 'docs' : 'dist'),
            filename: 'scripts/[name].js'
        },

        module: {
            rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            {
                test: /\.html$/,
                loader: 'html-loader'
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                name: '[name].[ext]',
                outputPath: 'images/',
                esModule: false
                }
            },

            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
                }
            },

            {
                test: /\.glsl$/,
                use: [
                'raw-loader',
                'glslify-loader'
                ]
            }
            ],
        },

        devServer: {
            contentBase: path.join(__dirname, "dist"),
            port: 3000
        },

        plugins: [
            new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: ['index'],
            hash: true,
            }),

            new MiniCssExtractPlugin({
                filename: "styles/[name].css",
                chunkFilename: "[id].css"
            }),
        ]
    }
};