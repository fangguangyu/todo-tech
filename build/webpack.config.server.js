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
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',   //是一种mmodule.exports =
    filename: 'server-entry.js',     //指定其输出的文件名字，因为没有用到缓存。所以可以不用hash
    path: path.join(__dirname, '../server-build')    //保存的文件目录。
  },
  externals: Object.keys(require('../package.json').dependencies),  //不要打包这部分的文件。得到一个数组。
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
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

//这个文件打包出来的一个json文件。只有html文件。


module.exports = config
