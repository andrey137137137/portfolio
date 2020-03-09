<template lang="pug">
  PageWrapper(page="Личные данные")
    UserForm(
      v-for="user in dbData"
      :key="user._id"
      :item="user")
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import UserForm from "@backCmp/Forms/UserForm";
export default {
  name: "AdminUserView",
  components: {
    PageWrapper,
    UserForm
  },
  mixins: [pageData]
};
</script>
