import auth from '../../auth/index.js';

const user = {
    state: {
        user: null
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        logout(state){
            state.user = null
        }
    },
    actions: {
        setCurrentUser({commit}){
            commit('setUser', auth.user())
        },
        logoutUser ({commit}){
            commit('logout')
        }
    },
    getters: {
        user: state => state.user,
        isLogged: state => (state.user !== null)
    }
}

export default user
