import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Home from './views/Home.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
