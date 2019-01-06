import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";

import interceptor from "@/api/interceptor";
import store from "@/store";
import PublicApp from "@frontend/PublicApp.vue";
import router from "@frontend/router";

interceptor(axios);

Vue.use(Vuelidate);

// Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(PublicApp)
});
