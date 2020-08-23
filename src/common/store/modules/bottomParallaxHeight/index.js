import {
  SET_BOTTOM_HEIGHT,
  SET_FOOTER_HEIGHT,
} from '@common/store/mutation-types';

export default {
  namespaced: true,
  state: {
    bottomHeight: 0,
    footerHeight: 0,
  },
  getters: {
    bottomHeight: state => state.bottomHeight,
    footerHeight: state => state.footerHeight,
  },
  actions: {
    setBottomHeight({ commit }, bottomHeight) {
      commit(SET_BOTTOM_HEIGHT, { bottomHeight });
    },
    setFooterHeight({ commit }, footerHeight) {
      commit(SET_FOOTER_HEIGHT, { footerHeight });
    },
  },
  mutations: {
    [SET_BOTTOM_HEIGHT](state, { bottomHeight }) {
      state.bottomHeight = bottomHeight;
    },
    [SET_FOOTER_HEIGHT](state, { footerHeight }) {
      state.footerHeight = footerHeight;
    },
  },
};
