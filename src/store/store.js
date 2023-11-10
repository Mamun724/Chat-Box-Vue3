import Vue from "vue";
import Vuex from "vuex";
import { delaySim } from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registeredUsers: [],
  },
  getters: {
    findUser(state) {
      return (email) =>
        state.registeredUsers.find((user) => user.email === email);
    },
  },
  mutations: {
    registerUser(state, user) {
      state.registeredUsers.push(user);
    },
  },
  actions: {
    async registerUserAsync({ commit }, user) {
      await delaySim(300);
      commit("registerUser", user);
    },
  },
});
