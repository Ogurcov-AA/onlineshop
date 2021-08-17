import Vue from 'vue'
import Vuex from 'vuex'
import product from "./module/product"
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        product,
        user,
    }
})



