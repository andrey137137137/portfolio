<template lang="pug">
  PageWrapper
</template>

<script>
import PageWrapper from "@frontCmp/PageWrapper";
import SectionWrapper from "@frontCmp/SectionWrapper";

import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    PageWrapper,
    SectionWrapper
  },
  methods: {
    ...mapActions(["setConfig"])
  },
  created() {
    this.setConfig({
      name: "Обо мне",
      isContent: true,
      sections: 4
    });
  }
};
</script>
