<template lang="pug">
  article.header__article(:class="articleClasses")

    SvgCmp(v-if="config.isContent" id="stars1" :addClasses="svgClasses")

    a.img_wrap.header__avatar(:class="avatarClasses" href="/")
      img.img_wrap__img(src="@/assets/userfiles/avatar.jpg" alt="Аватарка")

    HeaderTitle
</template>

<script>
import SvgCmp from "@components/SvgCmp";
import HeaderTitle from "./HeaderTitle";

import { mapGetters } from "vuex";

export default {
  name: "HeaderContent",
  components: {
    SvgCmp,
    HeaderTitle
  },
  computed: {
    ...mapGetters(["config"]),
    articleClasses() {
      return {
        "header__article-relative": this.config.isContent,
        "header__article-padding": !this.config.isContent
      };
    },
    svgClasses() {
      return {
        header__logo: true,
        "header__logo-for_blog": this.config.isBlog
      };
    },
    avatarClasses() {
      return { "header__avatar-relative": this.config.isContent };
    }
  }
};
</script>
