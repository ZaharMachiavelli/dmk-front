import {
  createStore
} from "vuex";

import { ScheduleApi } from "../api/schedule";

export default createStore({
  state: {
    isAuth: false,
    user: {
      first_name: '',
      last_name: '',
      biography: '',
      username: '',
      email: '',
      favourites: [],
      id: null,
    },

  },
  mutations: {
    changeActiveLink(state, link) {
      state.activeLink = link;
    },
    changeAuth(state) {
      state.isAuth = !state.isAuth;
    },
    setUser(state, context) {
      for (let key in context) {
        state.user[key] = context[key];
      }
    },
  },
  actions: {
    FETCH_user: async ({
      commit
    }) => {
      try {
        const ctx = await ScheduleApi.getMe();
        if (ctx) {
          commit('setUser', ctx);
          return ctx;
        }

      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {},
});