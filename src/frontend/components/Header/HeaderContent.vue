<template lang="pug">
  article.header-article(:class="containerClasses")

    SvgCmp.header-logo(v-if="config.isContent" name="stars1" :addClasses="svgClasses")

    router-link.img_wrap.header-avatar(:class="avatarClasses" to="/")
      img.img_wrap-img(src="/upload/avatar.jpg" alt="Аватарка")

    HeaderTitle
</template>

<script>
import SvgCmp from "@components/SvgCmp";
import HeaderTitle from "./HeaderTitle";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "HeaderContent",
  components: {
    SvgCmp,
    HeaderTitle
  },
  computed: {
    ...mapGetters(["config"]),
    containerClasses() {
      return {
        "header-article--relative": this.config.isContent,
        "header-article--padding": !this.config.isContent
      };
    },
    svgClasses() {
      return {
        "header-logo--for_blog": this.config.isBlog
      };
    },
    avatarClasses() {
      return { "header-avatar--relative": this.config.isContent };
    }
  }
};
</script>
