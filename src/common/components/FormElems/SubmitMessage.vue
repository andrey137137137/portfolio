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

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.fade-enter-to, .fade-leave /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 1;
}
</style>
