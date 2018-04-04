const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')   //webpack的合并模块
const baseConfig  = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

//将 baseConfig 文件配置合并起来。
config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map', //帮助我们调试页面浏览器的代码。因为我们.vue写的都是es6代码，是没法直接在浏览器上调试的。 进行代码映射。
  output: {
    libraryTarget: 'commonjs2',    //定义出口是一种什么样的形式。 module.export 形式。
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),  //不要打包这部分的文件。
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
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: ([
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server'
    }),
    new VueServerPlugin()
  ])
})




module.exports = config
