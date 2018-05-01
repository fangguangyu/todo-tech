import Vue from 'vue'
import Component from './func-notification'

//把这个构造器再重新构造一遍。再进行extend一次。生成一个新的Dom节点。
const NotificationConstructor = Vue.extend(Component)

const instances = []
//给组件添加一个id
let seed = 1

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notifiction_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  //放置的位置。
  let verticaloffset = 0
  instances.forEach(item => {
    verticaloffset += item.$el.offsetHeight + 16
  })
  instance.verticaloffset = verticaloffset
  verticaloffset += 16
  instances.push(instance)
  return instance.vm
}

export default notify