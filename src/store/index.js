import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import about from "@/store/modules/about";
import blog from "@/store/modules/blog";
import frontView from "@/store/modules/frontView";

export default new Vuex.Store({
  strict: true,
  modules: {
    about,
    blog,
    frontView
  }
});
