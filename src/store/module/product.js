import {getAllProduct} from "../../helper/dataBase";

const product = {
    state: {
        isLoading: false,
        productList: [],
        errorLoading: false,
    },
    mutations: {
        setLoading(state,boolean){
            state.isLoading = boolean
        },
        setProductList(state, list){
            state.productList = list
        },
        errorLoading(state,boolean){
            state.errorLoading = boolean
        }
    },
    actions: {
        async ProductList({commit}, payload){
            try {
                commit('errorLoading', false)
                commit('setLoading',true)
                const response = await getAllProduct(payload.per_page,payload.page)
                console.log(response)
                commit('setProductList', response)
                commit('setLoading', false)
            }
            catch (e)
            {
                commit('errorLoading',true)
            }
        }
    },
    getters: {
        getProductList: state => state.productList
    }
}

export default product

