<template lang="pug">
table
  tr
    td
      FeedbackItem
</template>

<script>
import FeedbackItem from '../src/frontend/components/FeedbackCmp/FeedbackItem';

export default {
  name: 'letterTemplate',
  components: {
    FeedbackItem,
  },
};
</script>

<style lang="scss">
@import '@styles/app';
</style>
