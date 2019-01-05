<template lang="pug">
  header#header.section.header(:class="addClasses")
    slot
</template>

<script>
import addClasses from "@/mixins/addClasses";

export default {
  name: "HeaderWrapper",
  mixins: [addClasses]
};
</script>
