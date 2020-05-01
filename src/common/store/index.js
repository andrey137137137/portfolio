import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import isDev from "@common/helpers/isDev";
import { SET, SET_PAGE, ADD, DELETE } from "@common/store/mutation-types";
import formMessage from "@common/store/modules/formMessage";
import auth from "@common/store/modules/auth";
import frontView from "@common/store/modules/frontView";
import comments from "@common/store/modules/comments";

export default new Vuex.Store({
  strict: isDev(),
  state: {
    data: {
      page: "",
      result: [],
    },
  },
  getters: {
    dbPage(state) {
      return state.data.page;
    },
    dbData(state) {
      return state.data.result;
    },
  },
  actions: {
    setPage({ commit }, page) {
      commit(SET_PAGE, page);
    },
    readData({ state, commit }) {
      axios.get(state.data.page).then((res) => {
        commit(SET, res.data.result);
      });
    },
    insertData({ state, dispatch }, data) {
      axios.post(state.data.page, data).then(() => {
        dispatch("readData", state.data.page);
      });
    },
    updateData({ state, dispatch }, payload) {
      const { page } = state.data;
      let method = "put";
      let url = `${page}/${payload.id}`;

      if (page.slice(0, 4) == "user") {
        method = "post";
        url = page;
      }

      axios[method](url, payload.data).then(() => {
        dispatch("readData", page);
      });
    },
    deleteData({ state, dispatch }, id) {
      axios.delete(`${state.data.page}/${id}`).then(() => {
        dispatch("readData", state.data.page);
      });
    },
  },
  mutations: {
    [SET_PAGE](state, page) {
      state.data.page = page;
    },
    [SET](state, data) {
      state.data.result = data;
    },
    [ADD](state, newItem) {
      state.data.result.push(newItem);
    },
    [DELETE](state, id) {
      state.data.result = state.data.result.filter((item) => item.id !== id);
    },
  },
  modules: {
    formMessage,
    auth,
    frontView,
    comments,
  },
});
