const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')     //作为前端项目要有一个html文件作为入口，加入一个模块。
const webpack = require('webpack')
const merge = require('webpack-merge')   //webpack的合并模块
const baseConfig  = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({    //初始化plugins时判断process.env的全局变量NODE_ENV是什么环境。
    'process.env': {
      NODE_ENV: '"development"' //webpack在打包的时候会根据这个变量去选择不同版本的vue打包库。
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })     //html-webpack-plugins 的设置这样才能浏览器才能跑起来。挂载点
]
//cross-env 模块的让window系统和mac系统的node的process.env全局变量定义为一致。


const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {     //如果有任何错误让起显示到浏览器上面
    errors: true,
  },
  hot: true
}

let config

//将 baseConfig 文件配置合并起来。
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
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
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vur from 'vue'  就是指定我们import 进来的vue是哪个版本的vue
  //默认vue import进来的都是runtime.common.js ,
  //默认开发环境import 进来的是vue.runtime.esm.js
  //正式环境是 vue.runtime.min.js,
  //有没有runtime的区别在于我们可不可以在我们的对象中去写template.
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),    //可以让页面渲染的时候不刷新。而是只加载修改那部分组件。
    new webpack.NoEmitOnErrorsPlugin(),
  ])
})




module.exports = config
