<template lang="pug">
  article.header-article(:class="containerClasses")

    SvgCmp.header-logo(v-if="isContent" name="stars1" :addClasses="svgClasses")

    router-link.img_wrap.header-avatar(:class="avatarClasses" to="/")
      img.img_wrap-img(src="/upload/avatar.jpg" alt="Аватарка")

    HeaderTitle
</template>

<script>
import SvgCmp from "@components/SvgCmp";
import HeaderTitle from "./HeaderTitle";

export default {
  name: "HeaderContent",
  components: {
    SvgCmp,
    HeaderTitle
  },
  computed: {
    isContent() {
      return this.$route.name != "home";
    },
    containerClasses() {
      return {
        "header-article--relative": this.isContent,
        "header-article--padding": !this.isContent
      };
    },
    svgClasses() {
      return {
        "header-logo--for_blog": this.$route.name == "blog"
      };
    },
    avatarClasses() {
      return { "header-avatar--relative": this.isContent };
    }
  }
};
</script>
