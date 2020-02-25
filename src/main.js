import Vue from "vue";
// import VueRx from "vue-rx";
// import VuejsClipper from "vuejs-clipper";
import VueCookie from "vue-cookie";
import Vuelidate from "vuelidate";
import axios from "axios";

import interceptor from "../api/interceptor";

import store from "@common/store";
import App from "@/App.vue";
import router from "@/router";

interceptor(axios);

// Vue.use(VueRx);
// Vue.use(VuejsClipper);
Vue.use(VueCookie);
Vue.use(Vuelidate);

// Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
