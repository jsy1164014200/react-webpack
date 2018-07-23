// 基本的入口文件和输出文件
// loader和各种插件
let path = require("path");

module.exports = {
    entry:path.resolve(__dirname,"src/app.js"),
    output:{
        path:path.resolve(__dirname,"publish"),
        filename:"bundle.js"
    },
    module:{
        // loaders:[
        //     // {test:/\.css$/,loader:"style!css"}
        // ]
    }
};