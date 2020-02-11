import axios from "axios";

import {
  AUTH_LOGIN,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  USER_SUCCESS
} from "@common/store/mutation-types";

const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
  "user/me": { GET: { name: "doggo", title: "sir" } }
};

const apiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || "GET"]);
        console.log(`Mocked '${url}' - ${method || "GET"}`);
        console.log("response: ", mocks[url][method || "GET"]);
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("user-token") || "",
    status: "",
    profile: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
  },
  actions: {
    login: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit(AUTH_LOGIN);
        axios
          .post("auth", user)
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("user-token", token); // store the token in localstorage
            // you have your token, now log in your user :)
            apiCall({ url: "user/me" })
              .then(resp => {
                commit(USER_SUCCESS, resp);
              })
              .catch(() => {
                commit(AUTH_ERROR);
                // if resp is unauthorized, logout, to
                dispatch("logout");
              });
            commit(AUTH_SUCCESS, token);
            resolve(resp);
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
            reject(err);
          });
      });
    },
    logout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("user-token"); // clear your user's token from localstorage
        resolve();
      });
    }
  },
  mutations: {
    [AUTH_LOGIN]: state => {
      state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    [AUTH_ERROR]: state => {
      state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
      state.token = "";
      state.profile = {};
    },
    [USER_SUCCESS]: (state, resp) => {
      state.status = "success";
      Vue.set(state, "profile", resp);
    }
  }
};
