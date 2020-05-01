import { FORBIDDEN } from "@httpSt";
import { FORM_SET_MESSAGE } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
    status: 0,
    message: "",
  },
  getters: {
    status(state) {
      return state.status;
    },
    message(state) {
      return state.message;
    },
  },
  actions: {
    setFormMessage({ commit }, data) {
      commit(FORM_SET_MESSAGE, data);
    },
  },
  mutations: {
    [FORM_SET_MESSAGE](state, data) {
      const { status, message } = data;

      switch (status) {
        case FORBIDDEN:
          state.message = message;
          break;
        case 0:
          state.message = "";
          break;

        default:
          state.message = "Невозможно подключиться к серверу";
      }

      state.status = status;
    },
  },
};
