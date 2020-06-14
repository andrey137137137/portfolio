import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { SUCCESS, ERROR } from "@httpSt";
import isDev from "@common/helpers/isDev";
import {
  SET,
  SET_PAGE,
  SET_SUCCESS_MESSAGE,
  SET_FORM_MESSAGE,
  SET_AUTH_STATUS,
  ADD,
  UPDATE,
  DELETE
} from "@common/store/mutation-types";
import profile from "@common/store/modules/profile";
import comments from "@common/store/modules/comments";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: isDev(),
  state: {
    data: {
      page: "",
      result: []
    },
    status: 0,
    message: "",
    authStatus: false
  },
  getters: {
    dbPage: state => state.data.page,
    dbData: state => state.data.result,
    status: state => state.status,
    message: state => state.message,
    isAuth: state => state.authStatus
  },
  actions: {
    setPage({ commit }, page) {
      commit(SET_PAGE, page);
    },
    [SET_SUCCESS_MESSAGE]({ commit }, message) {
      commit(SET_FORM_MESSAGE, {
        status: SUCCESS,
        message
      });
    },
    setFormMessage({ commit }, data) {
      commit(SET_FORM_MESSAGE, data);
    },
    readData({ state, commit }) {
      axios.get(state.data.page).then(res => {
        commit(SET, res.data.result);
      });
    },
    insertData({ state, dispatch, commit }, data) {
      axios.post(state.data.page, data).then(res => {
        data._id = res.data._id;
        dispatch(SET_SUCCESS_MESSAGE, res.data.message);
        commit(ADD, data);
      });
    },
    updateData({ state, dispatch, commit }, payload) {
      const { page } = state.data;
      const { data, id } = payload;

      let isUser = false;
      let method = "put";
      let url = `${page}/${id}`;

      if (page.slice(0, 4) == "user") {
        isUser = true;
        method = "post";
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
    setAuthStatus({ commit }, authStatus = "") {
      console.log(authStatus);

      if (authStatus !== "") {
        commit(SET_AUTH_STATUS, authStatus);
      } else {
        return axios.get("user/auth").then(res => {
          if (res.data.success) commit(SET_AUTH_STATUS, res.data.success);
        });
      }
    }
  },
  mutations: {
    [SET_PAGE](state, page) {
      state.data.page = page;
    },
    [SET_FORM_MESSAGE](state, data) {
      const { status, message } = data;

      switch (status) {
        case ERROR:
          state.message = "Невозможно подключиться к серверу";
          break;
        case 0:
          state.message = "";
          break;
        default:
          state.message = message;
      }

      state.status = status;
    },
    [SET](state, data) {
      state.data.result = data;
    },
    [ADD](state, newItem) {
      state.data.result.push(newItem);
    },
    [UPDATE](state, payload) {
      const { id, data } = payload;

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
    }
  },
  modules: {
    profile,
    comments
  }
});
