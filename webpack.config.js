/**
 * Created by Andy--张剑 on 2017/3/1.
 */
var webpack =require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'html-withimg-loader!index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            filename:  function(getPath) {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
}