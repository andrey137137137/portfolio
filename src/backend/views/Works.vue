<template lang="pug">
PageWrapper
  UploadForm(page='works', :breakpoints='["sm", "md", "lg"]')
  SlideForm(v-for='slide in dbData', :key='slide._id', :item='slide')
  h3.form-legend Добавить запись
  SlideForm
</template>

<script>
import pageDataMixin from '@backend/mixins/pageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import UploadForm from '@backCmp/forms/UploadForm';
import SlideForm from '@backCmp/forms/SlideForm';

export default {
  name: 'AdminWorksView',
  components: {
    PageWrapper,
    UploadForm,
    SlideForm,
  },
  mixins: [pageDataMixin],
};
</script>
