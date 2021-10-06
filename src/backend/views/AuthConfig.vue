<template lang="pug">
PageWrapper
  UsernameForm(v-for='item in dbData', :key='item._id', :params='item')
</template>

<script>
import pageDataMixin from '@backend/mixins/pageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import UsernameForm from '@backCmp/forms/UsernameForm';

export default {
  name: 'AdminAuthConfigView',
  components: {
    PageWrapper,
    UsernameForm,
  },
  mixins: [pageDataMixin],
};
</script>
