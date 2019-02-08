<template lang="pug">
  transition(name="fade")
    router-view
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "@styles/app.scss";
</style>
