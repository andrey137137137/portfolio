<template lang="pug">
  div
    TopWrapper
      aside.tabs
        #scroll_menu.container.tabs__container
          a.tabs__link(
            v-for="post in dbData"
            :key="post._id"
            :href="getTabLink(post._id)") {{post.title}}

      main.section.blog
        .container.blog__container

          article.blog__post(
            v-for="(post, index) in dbData"
            :key="post._id"
            :id="post._id"
          )
            h3.section__title.blog__title {{post.title}}
            span.blog__date {{post.date}}
            p {{post.body}}

            .blog__separator(v-show="index < dbData.length - 1")

</template>

<script>
import pageConfig from "@frontend/mixins/pageConfig";
import TopWrapper from "@frontCmp/TopWrapper";

export default {
  name: "BlogView",
  components: {
    TopWrapper
  },
  mixins: [pageConfig],
  methods: {
    getTabLink(name) {
      return `#${name}`;
    }
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog/import.scss"></style>
