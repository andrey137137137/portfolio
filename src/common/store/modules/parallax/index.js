import axios from 'axios';
import { SET, INC_LOADING, INC_LOADED } from '@common/store/mutation-types';

const dbPage = 'parallax';

export default {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {
    layers: state => state.data,
  },
  actions: {
    readLayers({ commit }) {
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
  },
  mutations: {
    [SET](state, data) {
      state.data = data;
    },
  },
};
