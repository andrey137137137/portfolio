import axios from 'axios';
import {
  SET,
  INC_LOADING,
  INC_LOADED,
  ADD,
  DELETE,
} from '@common/store/mutation-types';

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
      commit(INC_LOADING, null, { root: true });

      axios.get(`${dbPage}/front`).then(res => {
        commit(SET, res.data.result);
        commit(INC_LOADED, null, { root: true });
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
    deleteComment({ dispatch }, id) {
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
