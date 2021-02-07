import axios from 'axios';
import { SET, INC_LOADING, INC_LOADED } from '@common/store/mutation-types';

const dbPage = 'parallax';

export default {
  namespaced: true,
  state: {
    count: 0,
  },
  getters: {
    count: state => state.count,
  },
  actions: {
    readCount({ commit }) {
      commit(INC_LOADING, null, { root: true });

      axios.get(dbPage).then(res => {
        commit(SET, res.data.result);
        commit(INC_LOADED, null, { root: true });
      });
    },
    insertLayer({ dispatch }, { data }) {
      axios.post(dbPage, data).then(() => {
        dispatch('readData');
      });
    },
    updateLayer({ dispatch }, { id, data }) {
      axios.put(`${dbPage}/${id}`, data).then(() => {
        dispatch('readData');
      });
    },
    deleteLayer({ dispatch }, { id }) {
      axios.delete(`${dbPage}/${id}`).then(() => {
        dispatch('readData');
      });
    },
  },
  mutations: {
    [SET](state, data) {
      state.count = data.count;
    },
  },
};
