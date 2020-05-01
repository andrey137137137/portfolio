<template lang="pug">
  form.form
    slot
</template>

<script>
import ErrorElem from "@components/FormElems/ErrorElem";

export default {
  name: "FormWrapper",
  components: {
    ErrorElem
  }
};
</script>
