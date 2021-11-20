<template lang="pug">
section#reviews.section.container.reviews
  TitleWrapper(
    title='Что обо мне говорят',
    bgIcon='stars3',
    containerAddClass='reviews-title_wrap',
    titleAddClass='reviews-title'
  )
  FeedbackItem(
    v-for='(review, index) in comments',
    :key='review._id',
    v-bind='review'
  )
</template>

<script>
import TitleWrapper from '@frontCmp/TitleWrapper';
import FeedbackItem from './FeedbackItem';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('comments');
const { mapActions } = createNamespacedHelpers('comments');

export default {
  name: 'FeedbackList',
  components: {
    TitleWrapper,
    FeedbackItem,
  },
  computed: {
    ...mapGetters(['comments']),
  },
  methods: {
    ...mapActions(['readComments']),
  },
  created() {
    this.readComments();
  },
};
</script>
