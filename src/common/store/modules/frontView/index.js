import axios from "axios";
import {
  // SET_CONFIG,
  SET_TITLE,
  SET_PROFILE
} from "@common/store/mutation-types";

// const defaultData = {
//   pageConfig: {
//     title: "",
//     isTopWrapTitle: false,
//     isBlog: false,
//     isContent: false,
//     sections: 0
//   }
// };

export default {
  namespaced: true,
  state: {
    // pageConfig: {
    //   title: defaultData.title,
    //   isTopWrapTitle: defaultData.isTopWrapTitle,
    //   isBlog: defaultData.isBlog,
    //   isContent: defaultData.isContent,
    //   sections: defaultData.sections
    // },
    title: "",
    userProfile: {
      firstName: "",
      lastName: "",
      old: 0,
      email: "",
      contacts: [],
      footerDesc: "Дизайн сайта взят от Школы онлайн образования LoftSchool."
    }
  },
  getters: {
    // config: state => state.pageConfig,
    title: state => state.title,
    profile: state => state.userProfile
  },
  actions: {
    // setConfig({ commit }, data) {
    //   commit(SET_CONFIG, data);
    // },
    setTitle({ commit }, title) {
      commit(SET_TITLE, title);
    },
    setProfile({ commit }) {
      axios.get("user/profile").then(res => {
        commit(SET_PROFILE, res.data.result);
      });
    }
  },
  mutations: {
    // [SET_CONFIG](state, data) {
    //   const tempData = { ...defaultData.pageConfig, ...data };

    //   for (const key in tempData) {
    //     state.pageConfig[key] = tempData[key];
    //   }
    // },
    [SET_TITLE](state, title) {
      state.title = title;
    },
    [SET_PROFILE](state, data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state.userProfile[key] = data[key];
        }
      }
    }
  }
};
