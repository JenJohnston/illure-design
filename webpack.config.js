const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
const plugins = [
    new CopyWebpackPlugin(
        {
            patterns: [
                { from: path.resolve(__dirname, './static') }
            ]
        }
    ),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(
        {
            template: './src/index.html'
        }
    ),
    new ReactRefreshWebpackPlugin()
    
]

let mode = "development"
let target = "web"

if (process.env.NODE_ENV === "production")
{
    mode = "production"
}

module.exports =
{
    mode: mode,
    target: target,
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: "./images/[hash][ext][query]"
    },

    module: 
    {
        rules:
        [
            {
                test: /\.(png|gif|webp|jpg)$/i,
                type: "asset",
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'file-loader'],
                type: "asset" 
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: ""},
                    }, 
                    "css-loader",
                    "postcss-loader", 
                    "sass-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 
                {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            }
            
        ]
    },

    plugins: plugins,

    resolve: 
    {
        extensions: [".js", ".jsx"]
    },

    devtool: "source-map",
    devServer:
    {
        static: "./dist",
        historyApiFallback: true,
        hot: true,
        

    }
}