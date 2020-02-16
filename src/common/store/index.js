import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import { SET, SET_PAGE, ADD, DELETE } from "@common/store/mutation-types";
import auth from "@common/store/modules/auth";
import frontView from "@common/store/modules/frontView";
import comments from "@common/store/modules/comments";
// import works from "@common/store/data/works";

export default new Vuex.Store({
  strict: true,
  state: {
    data: {
      page: "",
      items: []
    }
  },
  getters: {
    dbPage(state) {
      return state.data.page;
    },
    dbData(state) {
      return state.data.items;
    }
  },
  actions: {
    setPage({ commit }, page) {
      commit(SET_PAGE, page);
    },
    readData({ state, commit }) {
      // if (state.data.page == "slide") {
      //   commit(SET, works);
      // } else {
      axios.get(state.data.page).then(res => {
        commit(SET, res.data.items);
      });
      // }
    },
    insertData({ state, dispatch }, data) {
      axios.post(state.data.page, data).then(() => {
        dispatch("readData", state.data.page);
      });
    },
    updateData({ state, dispatch }, payload) {
      axios.put(`${state.data.page}/${payload.id}`, payload.data).then(() => {
        dispatch("readData", state.data.page);
      });
    },
    deleteData({ state, dispatch }, id) {
      axios.delete(`${state.data.page}/${id}`).then(() => {
        dispatch("readData", state.data.page);
      });
    }
  },
  mutations: {
    [SET_PAGE](state, page) {
      state.data.page = page;
    },
    [SET](state, data) {
      state.data.items = data;
    },
    [ADD](state, newItem) {
      state.data.items.push(newItem);
    },
    [DELETE](state, id) {
      state.data.items = state.data.items.filter(item => item.id !== id);
    }
  },
  modules: {
    auth,
    frontView,
    comments
  }
});
