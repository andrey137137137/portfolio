<template lang="pug">
Fragment
  FeedbackList
  FeedbackForm
</template>

<script>
import { Fragment } from 'vue-fragment';
import FeedbackList from './FeedbackList';
import FeedbackForm from './FeedbackForm';

export default {
  name: 'FeedbackCmp',
  components: {
    Fragment,
    FeedbackList,
    FeedbackForm,
  },
};
</script>
