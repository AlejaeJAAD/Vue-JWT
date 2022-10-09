import Vue from "vue";
import Vuex from "vuex";
import AuthManager from "@/store/modules/AuthManager";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AuthManager,
  }
});