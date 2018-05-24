import model from '../../model/client-model'

const handleError = () => {
  //hand
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },

  fetchTodos ({ commit }) {
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  }
}

//和mutations一样。修改数据的。但这个可以写异步的代码
