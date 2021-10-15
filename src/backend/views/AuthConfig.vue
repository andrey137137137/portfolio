<template lang="pug">
PageWrapper
  UsernameForm(v-for='item in dbData', :key='item.username', :params='item')
</template>

<script>
import userPageDataMixin from '@backend/mixins/userPageDataMixin';
import PageWrapper from '@backCmp/PageWrapper';
import UsernameForm from '@backCmp/forms/UsernameForm';

export default {
  name: 'AdminAuthConfigView',
  components: {
    PageWrapper,
    UsernameForm,
  },
  mixins: [userPageDataMixin],
};
</script>
