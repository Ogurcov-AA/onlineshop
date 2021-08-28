import {getBasket,addProductToBasket, deleteProductFromBasket,ordering} from "../../helper/dataBase";

const basket = {
    state: {
        isLoadingBasket: false,
        basket: [],
        errorLoadingBasket: false,
    },
    mutations: {
        loadingBasket(state,boolean){
            state.isLoadingBasket = boolean
        },
        errorLoadingBasket(state, boolean){
            state.errorLoadingBasket = boolean
        },
        setBasket(state,basket){
            state.basket = basket
        }
    },
    actions: {
       async getBasket({commit},uid){
            try {
                commit('loadingBasket', true)
                commit('errorLoadingBasket',false)
                const resp = await getBasket(uid)
                commit('setBasket',resp)
                commit('loadingBasket', false)
            }catch (e) {
                console.log("error")
                commit('errorLoadingBasket', true)
            }
        },
        async addProductToBasketList({commit},payload){
            try {
                commit('loadingBasket', true)
                commit('errorLoadingBasket',false)
                const resp = await addProductToBasket(payload.uid,payload.product)
                commit('setBasket',resp)
                commit('loadingBasket', false)
            }catch (e) {
                commit('errorLoadingBasket',true)
            }
        },
        deleteProduct({commit},payload){
           commit('errorLoading', false)
           deleteProductFromBasket(payload.basketProductId,payload.uid)
        },
        addOrder({commit},payload){
            try {
            commit('loadingBasket', true)
            commit('errorLoadingBasket',false)
                console.log(payload.order)
            ordering(payload.uid, payload.order)
            commit('loadingBasket', false)
        }catch (e) {
            commit('errorLoadingBasket',true)
        }

        }
    },
    getters: {
        basket: state => state.basket
    }
}

export default basket
