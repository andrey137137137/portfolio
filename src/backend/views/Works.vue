<template lang="pug">
PageWrapper
  SlideForm(v-for='slide in dbData', :key='slide._id', :item='slide')
  h3.form-legend Добавить запись
  SlideForm
</template>

<script>
import pageDataMixin from '@backend/mixins/pageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import SlideForm from '@backCmp/forms/SlideForm';

export default {
  name: 'AdminWorksView',
  components: {
    PageWrapper,
    SlideForm,
  },
  mixins: [pageDataMixin],
};
</script>
