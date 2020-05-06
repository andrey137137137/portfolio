import { SET } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    checked: false,
  },
  getters: {
    isFlipped: (state) => state.checked,
  },
  actions: {
    flipCheck({ commit }, checked) {
      commit(SET, checked);
    },
  },
  mutations: {
    [SET](state, checked) {
      state.checked = checked;
    },
  },
};
