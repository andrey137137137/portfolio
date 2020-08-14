import axios from 'axios';

import { SET, ADD, DELETE } from '@common/store/mutation-types';
// import reviews from '@common/store/data/reviews.json';

const dbPage = 'comment';

export default {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {
    comments: state => state.data,
  },
  actions: {
    readComments({ commit }) {
      // commit(SET, reviews);
      axios.get(dbPage).then(res => {
        commit(SET, res.data.result);
      });
    },
    insertComment({ dispatch }, { data }) {
      axios.post(dbPage, data).then(() => {
        dispatch('readData');
      });
    },
    updateComment({ dispatch }, { id, data }) {
      axios.put(`${dbPage}/${id}`, data).then(() => {
        dispatch('readData');
      });
    },
    deleteComment({ dispatch }, { id }) {
      axios.delete(`${dbPage}/${id}`).then(() => {
        dispatch('readData');
      });
    },
  },
  mutations: {
    [SET](state, data) {
      state.data = data;
    },
    [ADD](state, newItem) {
      state.data.push(newItem);
    },
    [DELETE](state, id) {
      state.data = state.data.filter(item => item.id !== id);
    },
  },
};
