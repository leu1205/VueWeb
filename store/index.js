import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        loginStatus: false,
        userName: '',
        password: ''
    },
    mutations: {
        changeStatus (state, status){
            state.loginStatus = status;
        },
        setUserName (state, user){
            state.userName = user;
        }
    },
    actions: {
        nuxtServerInit ({ commit }, { req, res }) {
            if(req.session.username){
                commit('setUserName', req.session.username);
                commit('changeStatus', true);
            } else {
                commit('setUserName', '');
                commit('changeStatus', false);
            }
        }
    }
})

export default store