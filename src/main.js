import Vue from "vue";
// import VueRx from "vue-rx";
// import VuejsClipper from "vuejs-clipper";
// import Vuelidate from "vuelidate";
import axios from "axios";

import myConfig from "../api/config";

import store from "@common/store";
import App from "@/App.vue";
import router from "@/router";

axios.interceptors.request.use(
  config => {
    const { PROTOCOL, HOST, PORT, URL } = myConfig.server;

    config.baseURL = `${PROTOCOL}://${HOST}:${PORT}${URL}`;
    config.timeout = 5000;
    config.headers = { "Content-Type": "application/json" };
    config.withCredentials = true;

    return config;
  },
  err => {
    console.log(err.response.status);
    return Promise.reject();
  }
);

// Vue.use(VueRx);
// Vue.use(VuejsClipper);
// Vue.use(Vuelidate);

// Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
