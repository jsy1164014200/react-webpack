// 基本的入口文件和输出文件
// loader和各种插件
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require('html-webpack-plugin'); //打包HTML的插件

module.exports = {
    entry:path.resolve(__dirname,"src/app.js"),
    output:{
        path:path.resolve(__dirname,"publish"),
        filename:"bundle.js"
    },
    devServer: {//webpack-dev-server --config webpack.develop.config.js --devtool eval --content-base publish
        contentBase: './publish',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    },
    performance : {
        hints : false
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                loader:"babel-loader",
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test:/\.scss$/,
                loader:'style-loader!css-loader!sass-loader'
            },
            {
                test:/\.(png|jpg)$/,
                loader:"url-loader?limit=20000&name=images/[name].[ext]" //把小量的图片直接base64编码嵌入js中
            },
            {
                test:/\.html$/,
                loader: "file-loader"
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin()
    ]
};

// 可以再下载一个webpack-dev-server 它集成了webpack 并且提供热更新 服务器的功能
// webpack-dev-server --config webpack.develop.config.js --devtool eval --content-base src //指定 服务器的根目录
// content-base src相当于在本地开启一个服务器localhost：8080
