<template lang="pug">
  a.icon(:class="classes" :href="anchor")
</template>

<script>
export default {
  name: "ScrollButton",
  props: {
    inHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return {
        "icon--chevron_up": !this.inHeader,
        "icon--chevron_down": this.inHeader,
        scroll_btn: true,
        "scroll_btn--to_top": !this.inHeader,
        "scroll_btn--to_bottom": this.inHeader
      };
    },
    anchor() {
      return this.inHeader ? "#footer" : "#header";
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/ScrollButton/import.scss"></style>
