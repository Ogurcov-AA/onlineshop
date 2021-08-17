import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import DefaultLayout from './layouts/DefaultLayout.vue'
import {router} from "./router/router";
import './plugins/firebase'
import auth from "./auth";
import store from './store/index'

Vue.component('default-layout', DefaultLayout)

Vue.config.productionTip = false

new Vue({
  beforeCreate () {
    auth.init(this)
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
