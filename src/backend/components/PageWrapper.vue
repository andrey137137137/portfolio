<template lang="pug">
  .container
    h1.section__title.section__main_title.main__big_title Страница "{{title}}"
    slot
</template>

<script>
export default {
  name: "PageWrapper",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
