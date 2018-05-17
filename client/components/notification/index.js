import Notification from './notification.vue'
import notify from './function'
//全局注册一个组件。
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
