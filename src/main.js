import Vue from "vue";
// import VueRx from "vue-rx";
// import VuejsClipper from "vuejs-clipper";
import VueCookie from "vue-cookie";
import Vuelidate from "vuelidate";
import axios from "axios";

import myConfig from "../api/config";

import store from "@common/store";
import App from "@/App.vue";
import router from "@/router";

axios.interceptors.request.use(
  config => {
    const { protocol, host, port, url } = myConfig.server;

    config.baseURL = `${protocol}://${host}:${port}${url}`;
    config.timeout = 5000;
    config.headers = { "Content-Type": "application/json" };
    // config.withCredentials = true;
    console.log(config);
    return config;
  },
  error => {
    console.log(error.response.status);
    return Promise.reject();
  }
);

// Vue.use(VueRx);
// Vue.use(VuejsClipper);
Vue.use(VueCookie);
Vue.use(Vuelidate);

// Vue.config.productionTip = false;

// Vue.$cookies.config("7d");
// console.log(Vue.$cookies);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
