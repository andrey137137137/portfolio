import axios from "axios";

import { AUTH_SET_STATUS } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    status: false
  },
  getters: {
    isAuth: state => state.status
  },
  actions: {
    getAuthStatus: ({ commit }) => {
      axios.get("user/auth").then(res => {
        if (res.data.success) commit(AUTH_SET_STATUS, res.data.success);
      });
    },
    setAuthStatus: ({ commit }, status) => {
      commit(AUTH_SET_STATUS, status);
    }
  },
  mutations: {
    [AUTH_SET_STATUS]: (state, status) => {
      state.status = status;
    }
  }
};
