// 定义前端用于请求的接口，返回数据给前端

const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

// 判断是否已经登录。
const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}
apiRouter
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async (ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })
module.exports = apiRouter
