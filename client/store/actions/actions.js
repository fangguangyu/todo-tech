export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}

//和mutations一样。修改数据的。但这个可以写异步的代码
