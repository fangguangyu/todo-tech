import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '你得先登录'
    })
    bus.$emit('auth')
  }
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
  },
  addTodo ({ commit }, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
      }).catch(err => {
        handleError(err)
      })
  },
  deleteTodo ({ commit }, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  deleteAllCompleted ({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        notify({
          content: '清理一下'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        }).catch(err => {
          handleError(err)
          reject(err)
        })
    })
  }
}

//和mutations一样。修改数据的。但这个可以写异步的代码
