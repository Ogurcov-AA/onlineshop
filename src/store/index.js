import Vue from 'vue'
import Vuex from 'vuex'
import product from "./module/product"
import user from './module/user'
import basket from "./module/basket";
import adminPanel from "./module/adminPanel";
import {getCategory} from "../helper/DataBase/dataBase";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        errorLoadCategory: false,
        isLoadingCategory: false,
        category: null
    },
    mutations: {
        setErrorLoadCategory(state, boolean) {
            state.errorLoadCategory = boolean
        },
        setIsLoadingCategory(state, boolean) {
            state.isLoadingCategory = boolean
        },
        setCategory(state, list) {
            state.category = list
        },
    },
    actions: {
        async getCategory({commit}) {
            try {
                commit('setErrorLoadCategory', false)
                commit('setIsLoadingCategory', true)
                let resp = await getCategory()
                commit('setCategory', resp)
                commit('setIsLoadingCategory', false)
            } catch (e) {
                commit('setErrorLoadCategory',true)
            }
        }
    },
    getters: {
        getCategory: state => state.category
    },

    modules: {
        product,
        user,
        basket,
        adminPanel
    }
})



