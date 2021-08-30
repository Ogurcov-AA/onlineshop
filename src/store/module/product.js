import {getAllProduct, getProduct, getRating, updateRating} from "../../helper/DataBase/dataBase";

const product = {
    state: {
        isLoading: false,
        productList: [],
        currentProduct: null,
        errorLoading: false,
        rating: null,
    },
    mutations: {
        setLoading(state, boolean) {
            state.isLoading = boolean
        },
        setProductList(state, list) {
            Array.prototype.push.apply(state.productList, list);
        },
        clearProductList(state) {
            state.productList = []
        },
        setProduct(state, productInfo) {
            state.currentProduct = productInfo
        },
        setRating(state, rating) {
            state.rating = rating
        },
        errorLoading(state, boolean) {
            state.errorLoading = boolean
        }
    },
    actions: {
        ProductList({commit}) {
            try {
                commit('clearProductList')
                commit('errorLoading', false)
                commit('setLoading', true)
                getAllProduct((obj) => {
                    commit('clearProductList')
                    commit('setProductList', obj)
                    commit('setLoading', false)
                })
            } catch (e) {
                commit('errorLoading', true)
            }
        },
        async getProduct({commit}, productID) {
            try {
                commit('setProduct', null)
                commit('errorLoading', false)
                commit('setLoading', true)
                const response = await getProduct(productID)
                commit('setProduct', response)
                commit('setLoading', false)
            } catch (e) {
                console.log("error")
                commit('errorLoading', true)
            }
        },

        getRating({commit}, payload) {
            try {
                commit('setRating', null)
                commit('errorLoading', false)
                commit('setLoading', true)
                getRating(payload.productId, payload.uid, (obj) => {
                    commit('setRating', obj)
                })
                commit('setLoading', false)
            } catch (e) {
                console.log("error")
                commit('errorLoading', true)
            }
        },
        updateRating({commit}, payload) {
            try {
                commit('errorLoading', false)
                commit('setLoading', true)
                updateRating(payload.productId, payload.uid, payload.rating)
                commit('setLoading', false)
            } catch (e) {
                console.log("error")
                commit('errorLoading', true)
            }
        },
    },
    getters: {
        getProductList: state => state.productList,
        getProduct: state => state.currentProduct,
        getErrorLoading: state => state.errorLoading,
        getLoadingFlag: state => state.isLoading,
        getRating: state => state.rating
    }
}

export default product

