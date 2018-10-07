import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    //path: '/app/:id',
    //props: (route) => ({ id: route.query.b }),   //传递一个query值过去。
    //props: true,   //传递params值过去。也可定义成一个对象。修改id传个值
    component: Todo, //这种时异步加载组件，让首页能更快的速度展现。当匹配到这个路由时再加载响应的vue
    name: 'app',
    meta: {
      title: 'this is app',
      description: 's'
    },
    //嵌套路由，当匹配到/app/test的时候加载Login组件，但需要在Todo下放一个router-view。
    //路由内的守卫。当匹配到这个路由时才会出发这个钩子。
    beforeEnter (to, from, next) {
      next()
    },
    children: [
      {
        path: '/test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
