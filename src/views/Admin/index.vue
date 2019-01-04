<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminNav from "@/components/Admin/AdminNav";

export default {
  name: "App",
  components: {
    AdminHeader,
    AdminNav
  }
};
</script>

<style lang="scss">
.main {
  background: url("../../assets/img/bg.jpg") center center / cover no-repeat;
}
</style>
