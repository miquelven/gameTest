import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
  ],
});
