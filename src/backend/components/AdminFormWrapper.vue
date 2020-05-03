<template lang="pug">
  FormWrapper.form--admin
    slot
    SubmitMessage
</template>

<script>
import FormWrapper from "@components/FormElems/FormWrapper";
import SubmitMessage from "@components/FormElems/SubmitMessage";

export default {
  name: "AdminFormWrapper",
  components: {
    FormWrapper
  }
};
</script>
