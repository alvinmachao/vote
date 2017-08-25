var path = require("path"),
    webpack = require('webpack'),
    htmlWebpackPlugin = require("html-webpack-plugin");
var ROOT_Path = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_Path, "app");
var BUILD_PATH = path.resolve(ROOT_Path, 'build');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
    //开启dev source map
    devtool: "eval-source-map",
    //开启webpack dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        //配置loaders
        rules: [
            //配置preloaders 将eslint 添加进入
            /*{
             test: /\.jsx?$/,
             enforce: 'pre',
             loaders: ['eslint-loader'],
             include: APP_PATH
             },*/
            {
                test: /\.jsx?$/,
                exclude: /^node_modules$/,
                loaders: ['babel-loader'],
                include: APP_PATH
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loaders: ['style-loader', 'css-loader'],
                include: APP_PATH
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
                include: APP_PATH
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]


    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Vote",
            template: "./app/index.html",
            inject: "body"
        })
    ]

};