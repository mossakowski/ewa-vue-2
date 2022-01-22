import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BIcon, BIconCheck } from 'bootstrap-vue'
import Vuex from 'vuex'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('BIcon', BIcon);
Vue.component('BIconCheck', BIconCheck);
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.config.productionTip = false

Vue.use(VueSocketIOExt, io(process.env.VUE_APP_SOCKETIOORIGIN,{ origins: process.env.VUE_APP_SOCKETIOORIGIN }), { store });

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
