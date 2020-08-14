<template lang="pug">
a.icon(:class='classes', :href='anchor', @click.prevent='handle')
</template>

<script>
import { gsap, ScrollToPlugin } from 'gsap/all';
import { ABOUT } from '@common/constants/router';

export default {
  name: 'ScrollButton',
  props: {
    inHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { anchor: '.top_wrap-content' };
  },
  computed: {
    classes() {
      return {
        'icon--chevron_up': !this.inHeader,
        'icon--chevron_down': this.inHeader,
        scroll_btn: true,
        'scroll_btn--to_top': !this.inHeader,
        'scroll_btn--to_bottom': this.inHeader,
      };
    },
  },
  methods: {
    handle() {
      let offsetY = 0;

      if (this.$route.name == ABOUT) {
        offsetY = document.getElementById('cornerBorder').offsetHeight;
      }

      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: this.anchor, offsetY: -offsetY },
      });
    },
  },
  created() {
    gsap.registerPlugin(ScrollToPlugin);
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/ScrollButton/import';
</style>
