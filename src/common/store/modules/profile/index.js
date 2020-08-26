import axios from 'axios';
import { SET, INC_LOADING, INC_LOADED } from '@common/store/mutation-types';

export default {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    old: 0,
    email: '',
    contacts: [],
    footerDesc: 'Дизайн сайта взят от Школы онлайн образования LoftSchool.',
  },
  getters: {
    firstName: state => state.firstName,
    lastName: state => state.lastName,
    old: state => state.old,
    email: state => state.email,
    contacts: state => state.contacts,
    footerDesc: state => state.footerDesc,
  },
  actions: {
    readProfile({ commit }) {
      commit(INC_LOADING, null, { root: true });

      axios.get('user/profile').then(res => {
        commit(SET, res.data.result);
        commit(INC_LOADED, null, { root: true });
      });
    },
  },
  mutations: {
    [SET](state, data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state[key] = data[key];
        }
      }
    },
  },
};
