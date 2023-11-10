import Vue from "vue";
import Vuex from "vuex";
import {delaySim} from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        registeredUsers: [],
        authenticatedUser: null,
        receiverUser: {
            username: "receiver-user",
            profilePicture: "/assets/receiver-profile-pic.jpg"
        },
        messages: []
    },
    getters: {
        findUser(state) {
            return (email) => state.registeredUsers.find((user) => user.email === email);
        },
        isAuthenticated(state) {
            return state.authenticatedUser != null;
        },
        getAuthenticatedUser(state) {
            return state.authenticatedUser;
        },
        getMessages(state) {
            return state.messages;
        },
        getReceiver(state) {
            return state.receiverUser;
        }
    },
    mutations: {
        registerUser(state, user) {
            state.registeredUsers.push(user);
        },
        setAuthUser(state, authUser) {
            state.authenticatedUser = authUser;
        },
        addMessage(state, message) {
            state.messages.push((message));
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
        },
        async sendMessageAsync({commit}, message) {
            await delaySim(300);
            commit("addMessage", message);
        }
    },
});
