<template lang="pug">
  section#reviews.section.container.reviews

    TitleWrapper(
      title="Что обо мне говорят"
      bgIcon="stars3"
      containerAddClass="reviews__title_wrap"
      titleAddClass="reviews__title"
    )

    article.col.col-float.col-tb_6.col-ds_4.reviews__article(v-for="(review, index) in items" class="{'reviews__article-first': !index}")
      .icon.icon-quote.reviews__quote
      picture.img_wrap.reviews__img_wrap
        source.img_wrap__img(srcset="userfiles/reviews/m/" + (index + 1) + ".jpg" media="(min-width: 768px)")
        img.img_wrap__img(srcset="userfiles/reviews/s/" + (index + 1) + ".jpg" alt="review.author")
      .reviews__text_wrap
        p.section__desc.reviews__desc {{review.description}}
        span.reviews__author {{review.author}}
        span.reviews__status
          | &#8212;
          | {{review.status}}

</template>

<script>
import TitleWrapper from "@frontCmp/TitleWrapper";

export default {
  name: "CommentCmp",
  components: {
    TitleWrapper
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>
