import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'

// 用户相关组件
import Users from './components/user/Users.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 重定向
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 要访问的路径
  // from 从哪个路径跳转
  // next 放行

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login') // 无token,强制跳转至登录页
  next() // 有token,允许跳转至访问页面
})
export default router
