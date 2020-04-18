import axios from "axios";

import { SET_CONFIG, SET_PROFILE } from "@common/store/mutation-types";

const defaultData = {
  pageConfig: {
    name: "",
    isTopWrapTitle: false,
    isBlog: false,
    isContent: false,
    sections: 0,
  },
};

export default {
  namespaced: true,
  state: {
    pageConfig: {
      name: defaultData.name,
      isTopWrapTitle: defaultData.isTopWrapTitle,
      isBlog: defaultData.isBlog,
      isContent: defaultData.isContent,
      sections: defaultData.sections,
    },
    userProfile: {
      firstName: "",
      lastName: "",
      email: "",
      contacts: [],
    },
  },
  getters: {
    config(state) {
      return state.pageConfig;
    },
    profile(state) {
      return state.userProfile;
    },
  },
  actions: {
    setConfig({ commit }, data) {
      commit(SET_CONFIG, data);
      axios.get("user/profile").then((res) => {
        commit(SET_PROFILE, res.data.result);
      });
    },
  },
  mutations: {
    [SET_CONFIG](state, data) {
      const tempData = { ...defaultData.pageConfig, ...data };

      for (const key in tempData) {
        state.pageConfig[key] = tempData[key];
      }
    },
    [SET_PROFILE](state, data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state.userProfile[key] = data[key];
        }
      }
    },
  },
};
