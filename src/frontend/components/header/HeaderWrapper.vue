<template lang="pug">
  header#header.section.header(:class="classes")
    slot
</template>

<script>
export default {
  name: 'HeaderWrapper',
  computed: {
    classes() {
      const name = this.$route.name;
      return {
        'header--framed': name == 'home',
        'header--wide': name != 'home',
        'header--blog': name == 'blog',
      };
    },
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/HeaderWrapper/import';
</style>
