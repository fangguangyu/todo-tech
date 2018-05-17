import Notification from './notification.vue'
//重新把已有的函数变成构造器来重新进行定义加以覆盖。Notification就是一个构造器。
export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticaloffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      //debugger // eslint-disable-line
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  data () {
    return {
      verticaloffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
