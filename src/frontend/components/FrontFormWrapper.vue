<template lang="pug">
  FormWrapper.form--front
    slot
</template>

<script>
import FormWrapper from "@components/FormElems/FormWrapper";

export default {
  name: "FrontFormWrapper",
  components: {
    FormWrapper
  }
};
</script>
