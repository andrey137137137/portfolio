import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import * as types from "@common/store/common-mutation-types";
import works from "@common/store/data/works.json";
import frontView from "@common/store/modules/frontView";
import comments from "@common/store/modules/comments";

export default new Vuex.Store({
  strict: true,
  state: {
    data: []
  },
  getters: {
    dbData(state) {
      return state.data;
    }
  },
  actions: {
    readData({ commit }, dbPage) {
      switch (dbPage) {
        case "work":
          // fetch("/src/common/store/data/data.json")
          //   .then(data => {
          //     return data.text();
          //   })
          //   .then(response => {
          //     // state.data = response;
          //     commit(types.SET, response);
          //   });

          console.log(works);
          commit(types.SET, works);
          break;
        default:
          axios.get(dbPage).then(response => {
            commit(types.SET, response.data[`${dbPage}s`]);
          });
      }
    },
    insertData({ dispatch }, payload) {
      axios.post(payload.dbPage, payload.data).then(() => {
        dispatch("readData", payload.dbPage);
      });
    },
    updateData({ dispatch }, payload) {
      axios.put(`${payload.dbPage}/${payload.id}`, payload.data).then(() => {
        dispatch("readData", payload.dbPage);
      });
    },
    deleteData({ dispatch }, payload) {
      axios.delete(`${payload.dbPage}/${payload.id}`).then(() => {
        dispatch("readData", payload.dbPage);
      });
    }
  },
  mutations: {
    [types.SET](state, data) {
      state.data = data;
    },
    [types.ADD](state, newItem) {
      state.data.push(newItem);
    },
    [types.DELETE](state, id) {
      state.data = state.data.filter(item => item.id !== id);
    }
  },
  modules: {
    frontView,
    comments
  }
});
