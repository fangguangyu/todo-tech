import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 's'
    }
    //嵌套路由，当匹配到/app/test的时候加载Login组件，但需要在Todo下放一个router-view。
  },
  {
    path: '/login',
    component: Login
  }
]
