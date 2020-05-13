<template lang="pug">
  transition(name="fade")
    .form-popup(v-if="message") {{message}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SubmitMessage",
  computed: {
    ...mapGetters(["message"])
  }
};
</script>
