import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
axios.interceptors.request.use(config => {
  // 统一添加 Authorization 请求头
  config.headers.Authorization = localStorage.getItem('token')
  // 一定要返回 config
  return config
})
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

var ElTreeGrid = require('element-tree-grid')
Vue.component(ElTreeGrid.name, ElTreeGrid)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
