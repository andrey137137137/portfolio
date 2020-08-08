<template lang="pug">
transition(name='fade', mode='out-in')
  router-view
</template>

<script>
export default {
  name: 'Admin',
};
</script>

<style lang="scss">
@import '@styles/app.scss';
</style>
