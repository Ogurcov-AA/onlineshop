import auth from "../../auth";

const user = {
    state: {
        user: null
    },
    mutations: {
        setUser(state,user) {
            state.user = user
        },
        logout(state) {
            auth.logout()
            state.user = null
        },
    },
    actions: {
        setCurrentUser({commit}, user) {
              commit('setUser', user)
        },
        logoutUser({commit}) {
            commit('logout')
        },
    },
    getters: {
        user: state => state.user,
        isLogged: state => (state.user !== null),
        isAdmin: state => state.user!==null && state.user?.uid === '3PPDQeRVgqSS7dvjyrgVuDW6fiL2'
    }
}

export default user
