import * as types from "./mutation-types";

export default {
  state: {
    data: {
      name: "",
      isTopWrapTitle: false,
      isBlog: false,
      isContent: false,
      sections: 0
    }
  },
  getters: {
    config(state) {
      return state.data;
    }
  },
  actions: {
    setConfig({ commit }, data) {
      commit(types.SET, data);
    }
  },
  mutations: {
    [types.SET](state, data) {
      for (var key in data) {
        if (state.data.hasOwnProperty(key)) {
          state.data[key] = data[key];
        }
      }
    }
  }
};
