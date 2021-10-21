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
    // insertLayer({ dispatch }, { layer, data }) {
    //   axios.post(`${dbPage}/${layer}`, data).then(() => {
    //     dispatch('readCount');
    //   });
    // },
    // updateLayer({ dispatch }, { layer, data }) {
    //   axios.put(`${dbPage}/${layer}`, data).then(() => {
    //     dispatch('readCount');
    //   });
    // },
    deleteLayer({ dispatch }, layer) {
      axios.delete(`${dbPage}/${layer}`).then(() => {
        dispatch('readCount');
      });
    },
  },
  mutations: {
    [SET](state, data) {
      state.count = data.count;
    },
  },
};
