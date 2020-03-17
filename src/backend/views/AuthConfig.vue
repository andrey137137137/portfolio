<template lang="pug">
  PageWrapper(page="Имя пользователя и email")
    //- UsernameForm(
    //-   v-for="user in dbData"
    //-   :key="user.email"
    //-   :item="user")
    UsernameForm(
      :username="dbData.username"
      :email="dbData.email")
</template>

<script>
import pageData from "@backend/mixins/pageData";
import PageWrapper from "@backCmp/PageWrapper";
import UsernameForm from "@backCmp/Forms/UsernameForm";
export default {
  name: "AdminAuthConfigView",
  components: {
    PageWrapper,
    UsernameForm
  },
  mixins: [pageData]
};
</script>
