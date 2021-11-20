<template lang="pug">
article.col.col--float.col--tb_6.col--ds_4.reviews-article
  .icon.icon--quote.reviews-quote
  .img_wrap.reviews-img_wrap
    img.img_wrap-img(:src='"userfiles/reviews/m/image.jpg"', :alt='author')
  .reviews-text_wrap
    p.section-desc.reviews-desc {{ description }}
    span.reviews-author {{ author }}
    span.reviews-status
      | &#8212;
      | {{ position }}
</template>

<script>
export default {
  name: 'FeedbackItem',
  props: {
    author: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
  },
};
</script>
