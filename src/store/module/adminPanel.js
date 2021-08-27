import {removeProduct, updateProduct, uploadImg} from "../../helper/dataBase";

const adminPanel = {
    state: {
        imgUploadUrl: '',
        isLoadingAdminPanelDate: false,
        errorLoadingAdminPanelDate: false,
    }
    ,
    mutations: {
        isLoadingAdminPanelDate(state, boolean) {
            state.isLoadingAdminPanelDate = boolean
        },
        errorLoadingAdminPanelDate(state, boolean) {
            state.errorLoadingAdminPanelDate = boolean
        },
        setImgUrl(state, url){
            state.imgUploadUrl = url
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
        }
    },
    getters: {
        isLoadingAdminPanelDate: state => state.isLoadingAdminPanelDate,
        errorLoadingAdminPanelDate: state => state.errorLoadingAdminPanelDate,
        imgUrl: state=> state.imgUploadUrl
    }
}

export default adminPanel
