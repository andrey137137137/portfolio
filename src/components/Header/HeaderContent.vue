<template lang="pug">
  article.header__article(:class="articleClass")

    SvgCmp(v-if="isContent" id="stars1" :addClasses="svgClass")

    a.img_wrap.header__avatar(:class="avatarClass" href="/")
      img.img_wrap__img(src="userfiles/avatar.jpg" alt="Аватарка")

    HeaderTitle(:isRelative="isContent", :isLarge="isBlog")
</template>

<script>
import addClasses from "@/mixins/addClasses";
import SvgCmp from "@/components/SvgCmp";
import HeaderTitle from "@/components/Header/HeaderTitle";

export default {
  name: "HeaderContent",
  components: {
    SvgCmp,
    HeaderTitle
  },
  mixins: [addClasses],
  props: {
    isBlog: {
      type: Boolean,
      default: false
    },
    isContent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    articleClass() {
      return {
        "header__article-relative": this.isContent,
        "header__article-padding": !this.isContent
      };
    },
    svgClass() {
      return {
        header__logo: true,
        "header__logo-for_blog": this.isBlog
      };
    },
    avatarClass() {
      return { "header__avatar-relative": this.isContent };
    }
  }
};
</script>
