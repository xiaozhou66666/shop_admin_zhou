import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import user from './views/user/user.vue'
import roles from './views/roles.vue'
import rights from './views/rights.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        { path: '/users', component: user },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }
      ]
    }
  ]
})
