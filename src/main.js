import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";

import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import interceptor from "@/api/interceptor";

interceptor(axios);

Vue.use(Vuelidate);

// Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
