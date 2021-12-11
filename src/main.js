import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'

import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
