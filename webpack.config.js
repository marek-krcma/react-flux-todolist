var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: __dirname + '/todolist/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
                //loader: "style-loader!css-loader" 
            }
        ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + '/build'
    },
    plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + '/public/index.html',
        filename: 'index.html',
        inject: 'body'
    }),
        new ExtractTextPlugin("main.css")
  ],
};