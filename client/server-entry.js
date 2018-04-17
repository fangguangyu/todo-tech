import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)

    //当路由的组件的加载完了之后调用的一个回调。
    router.onReady(() => {
      //根据url来匹配到组件。之后再进行操作。
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
