import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()
//vuex外部绑定的一个state状态
store.registerModule('c', {
  state: {
    text: 3
  }
})
//解绑
store.unregisterModule('c')

//监听state数据的变化调用的函数
/*store.watch((state) => state.count + 1, (newCount) => {
  console.log('监听到的steate的值的变化调用的异步' + newCount)
})*/

//监听mutation调用产生的回调
/*
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
*/

//监听action的调用。
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

//路由守卫，每次路由跳转或者刷新都会执行下面3条
router.beforeEach((to, from, next) => {
  console.log('vefore each invoked')
  next()
  /*if (to.fullPath === '/app') {
    next('/login')
  } else {
    next()
  }*/
})

router.beforeResolve((to, from, next) => {
  console.log('vefore resolve invoked')
  next()
})

router.afterEach((to, from, next) => {
  console.log('vefore each invoked')
  next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
