const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')    //读取ejs模板的内容。
const MemoryFS = require('memory-fs')   //用来存放文件的模块 加快加载。
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)    //拿到webpack.config.server写好的代码可以直接用node去run
const mfs = new MemoryFS()   //跟fs的唯一区别是不把数据写入磁盘上面。
serverCompiler.outputFileSystem = mfs  //定义好了输出地址存放在mfs里面

let bundle    //webpack.config.server每次打包生成的json文件。也相当与html
//服务端打包。
serverCompiler.watch({}, (err, stats) => {     //监听数据有没有发生变化，如果发生变化则再进行一个打包。
  if (err) throw err
  stats = stats.toJson()  //当文件打包是eslint出现的错误也输出出来。
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(err))
  //当发生出错时把错误打包出来。

  const bundlePath = path.join(    //知道这个bundle输出的文件地址目录在哪里。
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'    //使用了VueServerRenderer插件默认输出的文件名
  )
  //因为是一个json文件。所以要json。parse一下。在内存中读取这个文件。并指定他的编码为utf-8
  //此时就拿到了一个bundle的html文件了。
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

//也是一个koa的中间件。 判断bundle是否存在。如果不错在。给用户返回一个加载中。
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '加载中'
    return
  }

  //通过axios请求去拿到我们clientserver下面的js文件。
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  //拿到了这个ejs的html渲染模板的内容。
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'), 'utf-8'
  )

  //定义一个renderer
  //帮我们生成一个renderer 函数function可以供我们直接去调用。只渲染appstring。就是bundle的内容
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx,renderer, template)
}


const router = new Router()
router.get('*', handleSSR)

module.exports = router













