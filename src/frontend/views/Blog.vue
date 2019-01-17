<template lang="pug">
  PageWrapper
    TopWrapper
      aside.tabs
        #scroll_menu.container.tabs__container
          a.tabs__link(
            v-for="post in posts"
            :key="post._id"
            :href="getTabLink(post._id)") {{post.title}}

      main.section.blog
        .container.blog__container

          article.blog__post(
            v-for="(post, index) in posts"
            :key="post._id"
            :id="post._id"
          )
            h3.section__title.blog__title {{post.title}}
            span.blog__date {{post.date}}
            p {{post.body}}

            .blog__separator(v-show="index < posts.length - 1")

</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import TopWrapper from "@frontCmp/TopWrapper";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("blog");
const viewMapGetters = createNamespacedHelpers("frontView").mapGetters;
const viewMapActions = createNamespacedHelpers("frontView").mapActions;

export default {
  name: "BlogView",
  components: {
    PageWrapper,
    TopWrapper
  },
  computed: {
    ...mapGetters(["posts"]),
    ...viewMapGetters(["config"])
  },
  methods: {
    ...mapActions(["getPosts"]),
    ...viewMapActions(["setConfig"]),
    getTabLink(name) {
      return `#${name}`;
    }
  },
  created() {
    this.getPosts();
    this.setConfig({
      name: "Блог",
      isBlog: true,
      isContent: true,
      sections: 2
    });
  }
};
</script>

<style lang="scss" src="@frontStylesPgs/Blog.scss">
</style>
