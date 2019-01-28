import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

import * as types from "@common/store/common-mutation-types";
// import about from "@common/store/modules/about";
// import blog from "@common/store/modules/blog";
import reviews from "@common/store/data/reviews.json";
import frontView from "@common/store/modules/frontView";

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
        case "review":
          // fetch("/src/common/store/data/data.json")
          //   .then(data => {
          //     return data.text();
          //   })
          //   .then(response => {
          //     // state.data = response;
          //     commit(types.SET, response);
          //   });

          console.log(reviews);
          commit(types.SET, reviews);
          break;
        default:
          axios.get(dbPage).then(response => {
            commit(types.SET, response.data[`${dbPage}s`]);
          });
      }
    },
    insertData({ dispatch }, payload) {
      axios.post(payload.dbPage, payload.data).then(() => {
        dispatch("readData");
      });
    },
    updateData({ dispatch }, payload) {
      axios.put(`${payload.dbPage}/${payload.id}`, payload.data).then(() => {
        dispatch("readData");
      });
    },
    deleteData({ dispatch }, payload) {
      axios.delete(`${payload.dbPage}/${payload.id}`).then(() => {
        dispatch("readData");
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
    // about,
    // blog,
    frontView
  }
});
