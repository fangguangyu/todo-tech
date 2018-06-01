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
    commit('startLoading')
    model.getAllTodos()
      .then(data => {
        commit('endLoading')
        commit('fillTodos', data)
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('updateTodo', { id, todo: data })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('endLoading')
        commit('deleteAllCompleted')
        notify({
          content: '清理一下'
        })
      }).catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  login ({ commit }, { username, password }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('endLoading')
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        }).catch(err => {
          commit('endLoading')
          handleError(err)
          reject(err)
        })
    })
  }
}

//和mutations一样。修改数据的。但这个可以写异步的代码
