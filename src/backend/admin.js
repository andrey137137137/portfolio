import Vue from "vue";
import Vuelidate from "vuelidate";
import axios from "axios";

import interceptor from "@common/api/interceptor";
import store from "@common/store";
import AdminApp from "@backend/AdminApp.vue";
import router from "@backend/router";

interceptor(axios);

Vue.use(Vuelidate);

// Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(AdminApp)
});
