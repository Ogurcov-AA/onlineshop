import {getBasket,addProductToBasket, deleteProductFromBasket,ordering} from "../../helper/DataBase/dataBase";

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
        getBasket({commit},uid){
            try {
                commit('loadingBasket', true)
                commit('errorLoadingBasket',false)
                getBasket(uid, res=>{
                commit('setBasket',res)
                commit('loadingBasket', false)
                })
            }catch (e) {
                console.log("error")
                commit('errorLoadingBasket', true)
            }
        },
        async addProductToBasketList({commit},payload){
            try {
                commit('loadingBasket', true)
                commit('errorLoadingBasket',false)
                await addProductToBasket(payload.uid,payload.product)
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
