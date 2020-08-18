import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Element 额外提供了一系列类名，用于在某些条件下隐藏元素
import 'element-ui/lib/theme-chalk/display.css'
import './components/pvideo/video'  // 引入视频播放插件
Vue.config.productionTip = false   // 阻止控制台打印生产模式下的消息
Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.prototype.baseURL = "/api"
Vue.prototype.$user = Vue.$cookies.get("user")




new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')



