<template lang="pug">
  PageWrapper
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";

import { mapActions } from "vuex";

export default {
  name: "WorksView",
  components: {
    PageWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Мои работы",
      isTopWrapTitle: true,
      isContent: true,
      sections: 3
    });
  }
};
</script>
