const ejs = require('ejs')
//接收三个参数。
module.exports = async(ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }    //这个context是要传入到vueserverrender里面的
  console.log(context)
  //context是拿到这个路由下的所有的数据。
  try {
    //appString就是渲染出了其中的html代码。
    const appString = await renderer.renderToString(context)

    //运用ejs来渲染出页面，传入template是已经渲染好了的html模板。第二个参数是传入数据。
    const  html = ejs.render(template, {
      appString,
      //带有style标签的文件引用。
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (err) {
    console.log('render err', err)
    throw err
  }
}
