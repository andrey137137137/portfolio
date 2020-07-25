<template lang="pug">
  PageWrapper(page="Имя пользователя и email")
    UsernameForm(
      :username="dbData.username"
      :email="dbData.email")
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
