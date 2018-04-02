const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

//cross-env 模块的让window系统和mac系统的node的process.env全局变量定义为一致。

const isDev = process.env.NODE_ENV === 'development'     //等译一个全局的进程变量来判断是开发环境还是生产环境。

const config = {
    target: 'web', //运行再web浏览器
    entry: path.join(__dirname, '../client/index.js'),  //入口文件。
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')    //打包的出口文件目录
    },
    module: {      //编译vue,js,图片的loader。
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,   //不包含解析这部分的代码。
                enforce: 'pre'    //先进行代码检测，预处理，如果检测不通过的话直接报错，就不用通过下面的loader进行解析了。
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}



module.exports = config
