import { createStore } from "vuex";
import { User } from "../types";

export default createStore({
  state: {
    user: <User>{},
  },
  getters: {
    isLoggedIn: (state): boolean => !!Object.keys(state.user).length,
    userRole: (state): string => state.user.role,
  },
  mutations: {
    SET_USER(state, user): void {
      state.user = { ...user };
    },
  },
  actions: {},
  modules: {},
});
