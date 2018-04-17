const Koa = require('koa')    //node服务端的一个框架。
/*const send = require('koa-send')
const path = require('path')*/
const pageRouter = require('./routers/dev-ssr')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'


//koa的中间件
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)    //把请求给打印出来。
    await next()    //执行下一个中间件。
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message    //如果是开发环境。则把错误的信息显示到页面上去。
    } else {
      ctx.bosy = 'please try again later'
    }
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

/*app.use(async (ctx, next) => {
  if (ctx.path === 'http://127.0.0.1:3333/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})*/

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})


