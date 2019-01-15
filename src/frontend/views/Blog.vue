<template lang="pug">
  PageWrapper
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";

import { mapActions } from "vuex";

export default {
  name: "BlogView",
  components: {
    PageWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Блог",
      isBlog: true,
      isContent: true,
      sections: 2
    });
  }
};
</script>
