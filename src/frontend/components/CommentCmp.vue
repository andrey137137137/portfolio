<template lang="pug">
  section#reviews.section.container.reviews

    TitleWrapper(
      title="Что обо мне говорят"
      bgIcon="stars3"
      containerAddClass="reviews-title_wrap"
      titleAddClass="reviews-title"
    )

    article.col.col--float.col--tb_6.col--ds_4.reviews-article(v-for="(review, index) in comments" class="{'reviews-article--first': !index}")
      .icon.icon--quote.reviews-quote
      .img_wrap.reviews-img_wrap
        img.img_wrap-img(
          :src="'userfiles/reviews/m/' + (index + 1) + '.jpg'"
          :alt="review.author")
      .reviews-text_wrap
        p.section-desc.reviews-desc {{review.description}}
        span.reviews-author {{review.author}}
        span.reviews-status
          | &#8212;
          | {{review.status}}

</template>

<script>
import TitleWrapper from "@frontCmp/TitleWrapper";

import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("comments");

export default {
  name: "CommentCmp",
  components: {
    TitleWrapper
  },
  computed: {
    ...mapGetters(["comments"])
  },
  methods: {
    ...mapActions(["readComments"])
  },
  created() {
    this.readComments();
  }
};
</script>
