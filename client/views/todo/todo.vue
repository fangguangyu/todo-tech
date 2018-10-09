<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="handleAdd"
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      @toggle='toggleTodoState'
    />
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
    <router-view/>
  </section>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter')
    //组件内的数据可以通过路由传递过来。判断。拿值
    /*next(vm => {
      console.log('after enter vm .id is', vm.id)
    })*/
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo Update enter')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    //当用户填写了表单之后。用户准备离开可以判断其让他确定时否要离开。/
    /*if (global.confirm('are you sure')) {
      next()
    }*/
    next()
  },
  data () {
    return {
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  mounted () {
    // 当没有数据的时候才去加载数据。有数据就服用服务端渲染出来的数据
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  asyncData ({ store, router }) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(123)
    //   }, 1000)
    // })
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login')
    return Promise.resolve()
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),

    handleAdd (e) {
      // 为this.todos 数组最前面添加一个对象。
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = '' // 清空input 框力的数据。
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    // deleteTodo (id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1) // 找到当前的id删除掉1个对象。
    // },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
