<template lang="pug">
PageWrapper
  CommentForm(v-for='comment in dbData', :key='comment._id', :item='comment')
</template>

<script>
import pageDataMixin from '@backend/mixins/pageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import CommentForm from '@backCmp/forms/CommentForm';

export default {
  name: 'AdminCommentsView',
  components: {
    PageWrapper,
    CommentForm,
  },
  mixins: [pageDataMixin],
};
</script>
