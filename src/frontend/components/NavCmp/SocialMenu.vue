<template lang="pug">
  .socials(:class="containerClasses")
    a.icon.socials-link(
      v-for="link in contacts"
      :key="link.href"
      :class="iconClass(link.icon)"
      target="_blank"
      :href="link.href"
      :title="link.name")
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'SocialMenu',
  props: {
    inHeader: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['contacts']),
    isContent() {
      return this.$route.name != 'home';
    },
    id() {
      return this.inHeader && this.isContent ? 'main_menu' : '';
    },
    containerClasses() {
      if (this.inHeader) {
        return {
          'header-socials': true,
          'header-socials--left': this.isContent,
        };
      }

      return {
        'footer_top-socials': true,
      };
    },
  },
  methods: {
    iconClass: icon => {
      return { [`icon--${icon}`]: true };
    },
  },
};
</script>

<style lang="scss" src="@frontStylesCmp/SocialMenu/import.scss"></style>
