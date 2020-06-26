import { SET, DELETE } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    error: ""
  },
  getters: {
    formError: state => state.error
  },
  actions: {
    set({ commit }, error) {
      commit(SET, error);
    },
    delete({ commit }) {
      commit(DELETE);
    }
  },
  mutations: {
    [SET](state, error) {
      state.error = error;
    },
    [DELETE](state) {
      state.error = "";
    }
  }
};
