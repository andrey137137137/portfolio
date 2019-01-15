import axios from "axios";
import * as types from "@/store/common-mutation-types";

const dbPage = "post";

export default {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    posts(state) {
      return state.data;
    }
  },
  actions: {
    getPosts({ commit }) {
      axios.get(dbPage).then(response => {
        commit(types.SET, response.data.posts);
      });
    },
    createPost({ dispatch }, data) {
      axios.post(dbPage, data).then(() => {
        dispatch("getPosts");
      });
    },
    updatePost({ dispatch }, post) {
      axios.put(`${dbPage}/${post.id}`, post.data).then(() => {
        dispatch("getPosts");
      });
    },
    deletePost({ dispatch }, id) {
      axios.delete(`${dbPage}/${id}`).then(() => {
        dispatch("getPosts");
      });
    }
  },
  mutations: {
    [types.SET](state, data) {
      state.data = data;
    },
    [types.ADD](state, newItem) {
      state.data.push(newItem);
    },
    [types.DELETE](state, id) {
      state.data = state.data.filter(item => item.id !== id);
    }
  }
};
