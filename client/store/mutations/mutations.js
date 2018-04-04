export default {
  updateCount (state, num) {
    state.count = num
  }
}
//同步操作，不能有异步的代码写再里面。
