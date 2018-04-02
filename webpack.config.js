const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')     //作为前端项目要有一个html文件作为入口，加入一个模块。
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')    //单独全局的 的css代码打包。.vue文件的css文件不打包在一起，因为.vue文件当渲染到这个组件才会去加载这部分的代码。

//cross-env 模块的让window系统和mac系统的node的process.env全局变量定义为一致。

const isDev = process.env.NODE_ENV === 'development'     //等译一个全局的进程变量来判断是开发环境还是生产环境。

const config = {
  target: 'web', //运行再web浏览器
  entry: path.join(__dirname, 'client/index.js'),  //入口文件。
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')    //打包的出口文件。
  },
  module: {      //编译vue,js,图片的loader。
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({    //初始化plugins时判断process.env的全局变量NODE_ENV是什么环境。
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'     //webpack在打包的时候会根据这个变量去选择不同版本的vue打包库。
      }
    }),
    new HTMLPlugin()     //html-webpack-plugins 的设置这样才能浏览器才能跑起来。
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
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
  config.devtool = '#cheap-module-eval-source-map'    //帮助我们调试页面浏览器的代码。因为我们.vue写的都是es6代码，是没法直接在浏览器上调试的。 进行代码映射。
  config.devServer = {    //node服务监听端口的内容。
    port: 8000,
    host: '0.0.0.0',
    overlay: {     //如果有任何错误让起显示到浏览器上面
      errors: true,
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),    //可以让页面渲染的时候不刷新。而是只加载修改那部分组件。
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {    //正式环境打包
  config.entry = {
    app: path.join(__dirname, 'client/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(     //用的是单独打包css工具的ExtractPlugin
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
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
    },
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
