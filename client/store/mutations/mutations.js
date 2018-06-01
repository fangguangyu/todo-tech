export default {
  updateCount (state, num) {
    state.count = num
  },

  fillTodos (state, todos) {
    state.todos = todos
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, { id, todo }) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1,
      todo
    )
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  doLogin (state, userInfo) {
    state.user = userInfo
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
//同步操作，不能有异步的代码写再里面。
