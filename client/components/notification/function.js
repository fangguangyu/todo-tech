import Vue from 'vue'
import Component from './func-notification'

//把这个构造器再重新构造一遍。再进行extend一次。生成一个新的Dom节点。
const NotificationConstructor = Vue.extend(Component)

const instances = []
//给组件添加一个id
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  console.log(index)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticaloffset =
      parseInt(instances[i].verticaloffset) - removeHeight - 16
  }
}

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
  instance.vm.visible = true

  //放置的位置。
  let verticaloffset = 0
  instances.forEach(item => {
    verticaloffset += item.$el.offsetHeight + 16
  })
  instance.verticaloffset = verticaloffset
  verticaloffset += 16
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
