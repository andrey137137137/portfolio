import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import { FORBIDDEN, ERROR } from "@httpSt";
import isDev from "@common/helpers/isDev";
import {
  SET,
  SET_PAGE,
  SET_FORM_MESSAGE,
  ADD,
  DELETE,
} from "@common/store/mutation-types";
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
      status: 0,
      message: "",
    },
  },
  getters: {
    dbPage: (state) => state.data.page,
    dbData: (state) => state.data.result,
    status: (state) => state.status,
    message: (state) => state.message,
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
    insertData({ state, dispatch, commit }, data) {
      axios.post(state.data.page, data).then(() => {
        commit(ADD, data);
      });
    },
    updateData({ state, dispatch, commit }, payload) {
      const { page } = state.data;
      let method = "put";
      let url = `${page}/${payload.id}`;

      if (page.slice(0, 4) == "user") {
        method = "post";
        url = page;
      }

      axios[method](url, payload.data).then(() => {
        commit(SET, payload.data);
      });
    },
    deleteData({ state, dispatch, commit }, id) {
      axios.delete(`${state.data.page}/${id}`).then(() => {
        commit(DELETE, id);
      });
    },
  },
  mutations: {
    [SET_PAGE](state, page) {
      state.data.page = page;
    },
    [SET_FORM_MESSAGE](state, data) {
      const { status, message } = data;

      switch (status) {
        case FORBIDDEN:
          state.message = message;
          break;
        case ERROR:
          state.message = "Невозможно подключиться к серверу";
          break;
        case 0:
          state.message = "";
          break;
      }

      state.status = status;
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
