import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    mode: 'history',
    routes,
    //base: '/base/',
    linkActiveCLass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    //fallback: true
    //路由后携带的参数
    /*parseQuery (query) {

    },
    stringifyQuery (obj) {

    }*/
  })
}
