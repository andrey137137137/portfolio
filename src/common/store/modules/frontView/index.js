import axios from "axios";
import { SET_TITLE, SET_PROFILE } from "@common/store/mutation-types";

export default {
  namespaced: true,
  state: {
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
    title: state => state.title,
    profile: state => state.userProfile
  },
  actions: {
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
