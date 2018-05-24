export default {
  updateCount (state, num) {
    state.count = num
  },

  fillTodos (state, todos) {
    state.todos = todos
  }


}
//同步操作，不能有异步的代码写再里面。
