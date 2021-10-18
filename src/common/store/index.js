import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { SUCCESS, ERROR } from '@httpSt';
import { exist, IS_DEV } from '@apiHelpers';
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
import parallax from '@common/store/modules/parallax';
import profile from '@common/store/modules/profile';
import comments from '@common/store/modules/comments';

Vue.use(Vuex);

function convertData(data) {
  const newData = {};

  if (exist('append', data) && exist('entries', data)) {
    for (const pair of data.entries()) {
      newData[pair[0]] = pair[1];
    }
  } else {
    return data;
  }

  return newData;
}

function isUser(page) {
  return page.slice(0, 4) == 'user';
}

export default new Vuex.Store({
  strict: IS_DEV,
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

      if (page == COMMENT) {
        page += '/back';
      }

      axios.get(page).then(res => {
        const { result } = res.data;
        const items = isUser(page) ? [result] : result;

        commit(SET, items);

        if (state.isFront) {
          commit(INC_LOADED);
        }
      });
    },
    insertData({ state, dispatch, commit }, data) {
      axios.post(state.data.page, data).then(res => {
        dispatch(SET_SUCCESS_MESSAGE, res.data.message);
        commit(ADD, {
          _id: res.data._id,
          ...convertData(data),
        });
      });
    },
    updateData({ state, dispatch, commit }, { data, id }) {
      const { page } = state.data;
      const isUserFlag = isUser(page);
      const method = isUserFlag ? 'post' : 'put';
      const url = isUserFlag ? page : `${page}/${id}`;

      axios[method](url, data).then(res => {
        let commitPayload = { id: 0, data: convertData(data) };

        if (!isUserFlag) {
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
      let index = 0;

      if (id) {
        index = state.data.result.findIndex(item => item._id == id);
        data._id = id;
      }

      state.data.result.splice(index, 1, data);
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
    parallax,
    profile,
    comments,
  },
});
