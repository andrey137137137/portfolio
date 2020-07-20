import { SET, DELETE } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    inputName: "",
    error: ""
  },
  getters: {
    formInputName: state => state.inputName,
    formError: state => state.error
  },
  actions: {
    setFormError({ commit }, { inputName, error }) {
      commit(SET, { inputName, error });
    },
    clearFormError({ commit }) {
      commit(DELETE);
    }
  },
  mutations: {
    [SET](state, { inputName, error }) {
      state.inputName = inputName;
      state.error = error;
    },
    [DELETE](state) {
      state.inputName = "";
      state.error = "";
    }
  }
};
