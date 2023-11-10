import Vue from "vue";
import Vuex from "vuex";
import {delaySim} from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        registeredUsers: [],
        authenticatedUser: null
    },
    getters: {
        findUser(state) {
            return (email) => state.registeredUsers.find((user) => user.email === email);
        },
        isAuthenticated(state) {
            return state.authenticatedUser != null;
        }
    },
    mutations: {
        registerUser(state, user) {
            state.registeredUsers.push(user);
        },
        setAuthUser(state, authUser) {
            state.authenticatedUser = authUser;
        }
    },
    actions: {
        async registerUserAsync({commit}, user) {
            await delaySim(300);
            commit("registerUser", user);
        },
        async loginUserAsync({commit, getters}, loginData) {
            await delaySim(300);
            const user = getters.findUser(loginData.email);
            if (!user || user.password !== loginData.password) {
                return null;
            }

            commit("setAuthUser", user);

            return user;
        },
        logoutUser({commit}) {
            commit("setAuthUser", null)
        }
    },
});
