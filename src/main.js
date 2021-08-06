import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import DefaultLayout from './layouts/DefaultLayout.vue'
import router from "./router/router";


Vue.component('default-layout', DefaultLayout)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
