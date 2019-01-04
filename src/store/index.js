import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import about from "@/store/modules/about/about.js";
import blog from "@/store/modules/blog/blog.js";

const store = new Vuex.Store({
  modules: {
    about,
    blog
  }
});

export default store;
