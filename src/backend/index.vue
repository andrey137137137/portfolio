<template lang="pug">
  .admin
    AdminHeader
    AdminNav
    main.section.main
      router-view(v-if="isAuth")
      PageWrapper(v-else)
</template>

<script>
import axios from "axios";
import AdminHeader from "@backCmp/AdminHeader";
import AdminNav from "@backCmp/AdminNav";
import PageWrapper from "@backCmp/PageWrapper";

import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("auth");

export default {
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminNav,
    PageWrapper
  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  methods: {
    ...mapActions(["getAuthStatus"])
  },
  created() {
    this.getAuthStatus();
  }
};
</script>

<style lang="scss">
@import "@backStyles/common.scss";
@import "@backStylesCmp/header.scss";
</style>
