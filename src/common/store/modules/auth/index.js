import axios from "axios";

import { SET } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    status: false,
  },
  getters: {
    isAuth: (state) => state.status,
  },
  actions: {
    getAuthStatus({ commit }) {
      axios.get("user/auth").then((res) => {
        if (res.data.success) commit(SET, res.data.success);
      });
    },
    setAuthStatus({ commit }, status) {
      commit(SET, status);
    },
  },
  mutations: {
    [SET](state, status) {
      state.status = status;
    },
  },
};
