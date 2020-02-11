import { SET } from "@common/store/mutation-types";

const defaultData = {
  name: "",
  isTopWrapTitle: false,
  isBlog: false,
  isContent: false,
  sections: 0
};

export default {
  namespaced: true,
  state: {
    data: {
      // name: defaultData.name,
      // isTopWrapTitle: defaultData.isTopWrapTitle,
      // isBlog: defaultData.isBlog,
      // isContent: defaultData.isContent,
      // sections: defaultData.sections
    }
  },
  getters: {
    config(state) {
      return state.data;
    }
  },
  actions: {
    setConfig({ commit }, data) {
      commit(SET, data);
    }
  },
  mutations: {
    [SET](state, data) {
      const tempData = { ...defaultData, ...data };

      for (var key in tempData) {
        // if (state.data.hasOwnProperty(key)) {
        state.data[key] = tempData[key];
        // }
      }
    }
  }
};
