import {removeProduct, updateProduct, uploadImg, getOrder, deleteOrder} from "../../helper/DataBase/dataBase";

const adminPanel = {
    state: {
        imgUploadUrl: '',
        isLoadingAdminPanelDate: false,
        errorLoadingAdminPanelDate: false,
        orderList: '',
    }
    ,
    mutations: {
        isLoadingAdminPanelDate(state, boolean) {
            state.isLoadingAdminPanelDate = boolean
        },
        errorLoadingAdminPanelDate(state, boolean) {
            state.errorLoadingAdminPanelDate = boolean
        },
        setImgUrl(state, url) {
            state.imgUploadUrl = url
        },
        setOrder(state, list) {
            state.orderList = list
        }
    },
    actions: {
        async removeProduct({commit}, id) {
            try {
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                await removeProduct(id)
                commit('isLoadingAdminPanelDate', false)
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        },
        async updateProduct({commit}, product) {
            try {
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                await updateProduct(product)
                commit('isLoadingAdminPanelDate', false)
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        },
        async uploadingImg({commit}, data) {
            try {
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                let url = await uploadImg(data.path, data.file)
                console.log(url)
                commit('setImgUrl', url)
                commit('isLoadingAdminPanelDate', false)
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        },
        getOrderList({commit}) {
            try {
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                getOrder(resp => {
                    commit('setOrder', resp)
                    commit('isLoadingAdminPanelDate', false)
                })
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        },
        async updateCategory({commit}) {
            try {
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                let resp = await getOrder()
                commit('setOrder', resp)
                commit('isLoadingAdminPanelDate', false)
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        },
        async deleteOrder({commit}, payload) {
            try {
                console.log(payload)
                commit('errorLoadingAdminPanelDate', false)
                commit('isLoadingAdminPanelDate', true)
                await deleteOrder(payload.orderId, payload.uid)
                commit('isLoadingAdminPanelDate', false)
            } catch (e) {
                commit('errorLoadingAdminPanelDate', true)
            }
        }
    },
    getters: {
        isLoadingAdminPanelDate: state => state.isLoadingAdminPanelDate,
        errorLoadingAdminPanelDate: state => state.errorLoadingAdminPanelDate,
        imgUrl: state => state.imgUploadUrl,
        getOrder: state => state.orderList,
    }
}

export default adminPanel
