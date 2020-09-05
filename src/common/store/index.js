import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { SUCCESS, ERROR } from '@httpSt';
import isDev from '@common/helpers/isDev';
import { COMMENT } from '@common/constants/router';
import {
  SET,
  SET_PAGE,
  SET_SUCCESS_MESSAGE,
  SET_IS_FRONT,
  SET_FORM_MESSAGE,
  CLOSE_FORM_MESSAGE,
  SET_AUTH_STATUS,
  INC_LOADING,
  INC_LOADED,
  RESET_LOADED,
  ADD,
  UPDATE,
  DELETE,
} from '@common/store/mutation-types';
import frontFormError from '@common/store/modules/frontFormError';
import profile from '@common/store/modules/profile';
import comments from '@common/store/modules/comments';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: isDev(),
  state: {
    data: {
      page: '',
      result: [],
    },
    loadingCount: 1,
    loadedCount: 0,
    status: 0,
    message: '',
    isFront: false,
    isFormMessageClosed: false,
    authStatus: false,
  },
  getters: {
    dbPage: state => state.data.page,
    dbData: state => state.data.result,
    dbDataLoadingCount: state => state.loadingCount,
    dbDataLoadedCount: state => state.loadedCount,
    status: state => state.status,
    message: state => state.message,
    isFormMessageClosed: state => state.isFormMessageClosed,
    isAuth: state => state.authStatus,
  },
  actions: {
    isItFront({ commit }, isFront) {
      commit(SET_IS_FRONT, isFront);
    },
    resetLoadedCounters({ commit }) {
      commit(RESET_LOADED);
    },
    setPage({ state, commit }, page) {
      if (state.isFront) {
        commit(INC_LOADING);
      }
      commit(SET_PAGE, page);
    },
    [SET_SUCCESS_MESSAGE]({ commit }, message) {
      commit(SET_FORM_MESSAGE, {
        status: SUCCESS,
        message,
      });
    },
    setFormMessage({ commit }, data) {
      commit(SET_FORM_MESSAGE, data);
    },
    [CLOSE_FORM_MESSAGE]({ commit }) {
      commit(CLOSE_FORM_MESSAGE);
    },
    readData({ state, commit }) {
      let { page } = state.data;

      if (page == COMMENT) page += '/back';

      axios.get(page).then(res => {
        commit(SET, res.data.result);
        if (state.isFront) {
          commit(INC_LOADED);
        }
      });
    },
    insertData({ state, dispatch, commit }, data) {
      axios.post(state.data.page, data).then(res => {
        data._id = res.data._id;
        dispatch(SET_SUCCESS_MESSAGE, res.data.message);
        commit(ADD, data);
      });
    },
    updateData({ state, dispatch, commit }, { data, id }) {
      const { page } = state.data;

      let isUser = false;
      let method = 'put';
      let url = `${page}/${id}`;

      if (page.slice(0, 4) == 'user') {
        isUser = true;
        method = 'post';
        url = page;
      }

      axios[method](url, data).then(res => {
        const commitPayload = { id: 0, data };

        if (!isUser) {
          commitPayload.id = id;
        }

        dispatch(SET_SUCCESS_MESSAGE, res.data.message);
        commit(UPDATE, commitPayload);
      });
    },
    deleteData({ state, dispatch, commit }, id) {
      axios.delete(`${state.data.page}/${id}`).then(res => {
        dispatch(SET_SUCCESS_MESSAGE, res.data.message);
        commit(DELETE, id);
      });
    },
    getAuthStatus({ commit }) {
      return axios.get('user/auth').then(res => {
        commit(SET_AUTH_STATUS, res.data.success);
      });
    },
    setAuthStatus({ commit }, status) {
      commit(SET_AUTH_STATUS, status);
    },
  },
  mutations: {
    [INC_LOADING](state) {
      state.loadingCount++;
    },
    [INC_LOADED](state) {
      state.loadedCount++;
    },
    [RESET_LOADED](state) {
      state.loadingCount = 0;
      state.loadedCount = 0;
    },
    [SET_PAGE](state, page) {
      state.data.page = page;
    },
    [SET_IS_FRONT](state, isFront) {
      state.isFront = isFront;
    },
    [SET_FORM_MESSAGE](state, { status, message }) {
      switch (status) {
        case ERROR:
          state.message = 'Невозможно подключиться к серверу';
          break;
        case 0:
          state.message = '';
          break;
        default:
          state.message = message;
      }

      state.status = status;
      state.isFormMessageClosed = false;
    },
    [CLOSE_FORM_MESSAGE](state) {
      state.isFormMessageClosed = true;
    },
    [SET](state, data) {
      state.data.result = data;
    },
    [ADD](state, newItem) {
      state.data.result.push(newItem);
    },
    [UPDATE](state, { id, data }) {
      if (id) {
        const index = state.data.result.findIndex(item => item._id == id);
        data._id = id;
        state.data.result.splice(index, 1, data);
      } else {
        state.data.result = data;
      }
    },
    [DELETE](state, id) {
      state.data.result = state.data.result.filter(item => item._id !== id);
    },
    [SET_AUTH_STATUS](state, authStatus) {
      state.authStatus = authStatus;
    },
  },
  modules: {
    frontFormError,
    profile,
    comments,
  },
});
