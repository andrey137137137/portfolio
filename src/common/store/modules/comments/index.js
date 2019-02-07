import axios from "axios";

import * as types from "@common/store/common-mutation-types";
import reviews from "@common/store/data/reviews.json";

const dbPage = "comment";

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    comments(state) {
      return state.data;
    }
  },
  actions: {
    readComment({ commit }) {
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
    },
    insertComment({ dispatch }, payload) {
      axios.post(dbPage, payload.data).then(() => {
        dispatch("readData");
      });
    },
    updateComment({ dispatch }, payload) {
      axios.put(`${dbPage}/${payload.id}`, payload.data).then(() => {
        dispatch("readData");
      });
    },
    deleteComment({ dispatch }, payload) {
      axios.delete(`${dbPage}/${payload.id}`).then(() => {
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
  }
};