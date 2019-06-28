import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    next()
    return
  }
  // next()
  // console.log(to, from)
  if (localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
})

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
