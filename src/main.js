import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import DefaultLayout from './layouts/DefaultLayout.vue'
import BasketLayout from "./layouts/SearchAndAuthLayout"
import ErrorLayout from "./layouts/ErrorLayout"
import AdminLayouts from './layouts/AdminLayout'
import LoadingLayout from "./layouts/LoadingLayout"
import {router} from "./router/router"
import './plugins/firebase'
import auth from "./auth"
import store from './store/index'

export const eventBus = new Vue()

Vue.component('default-layout', DefaultLayout)
Vue.component('basket-layout', BasketLayout)
Vue.component('error-layout', ErrorLayout)
Vue.component('admin-layout', AdminLayouts)
Vue.component('loading-layout',LoadingLayout)

Vue.config.productionTip = false
auth.init(this, async (user)=>{
   await store.dispatch('setCurrentUser',user)
    if(user!==null){
        await store.dispatch('getBasket',user.uid)
    }

new Vue({
    store,
    vuetify,
    auth,
    router,
    render: h => h(App)
}).$mount('#app')
})
