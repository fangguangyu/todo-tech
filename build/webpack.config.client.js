const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')  //作为前端项目要有一个html文件作为入口，加入一个模块。
const webpack = require('webpack')
const merge = require('webpack-merge')   //webpack的合并模块
const ExtractPlugin = require('extract-text-webpack-plugin')    //单独打包不包含javascript 的css代码打包。
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')  //把客户端的js代码生成一个默认文件。


const isDev = process.env.NODE_ENV === 'development'     //等译一个全局的进程变量来判断是开发环境还是生产环境。

const defaultPlugins = [
  new webpack.DefinePlugin({    //初始化plugins时判断process.env的全局变量NODE_ENV是什么环境。
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'     //webpack在打包的时候会根据这个变量去选择不同版本的vue打包库。
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),     //html-webpack-plugins 的设置这样才能浏览器才能跑起来。
  new VueClientPlugin()
]
//cross-env 模块的让window系统和mac系统的node的process.env全局变量定义为一致。


let config

const devServer = {
  port: 8888,
  host: '0.0.0.0',
  overlay: {     //如果有任何错误让起显示到浏览器上面
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' }, //允许跨域加载热更替的json文件
  historyApiFallback: true,
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true
}

if (isDev) {
  //将 baseConfig 文件配置合并起来。
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map', //帮助我们调试页面浏览器的代码。因为我们.vue写的都是es6代码，是没法直接在浏览器上调试的。 进行代码映射。
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',   //如果用style-loader时没有达到样式热重载的，用vue-style-loader才可以。
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),    //可以让页面渲染的时候不刷新。而是只加载修改那部分组件。
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {    //正式环境打包
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}


config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}
module.exports = config
