<template lang="pug">
  form.form(:class="addClasses")
    slot
</template>

<script>
import addClasses from "@/common/mixins/addClasses";

export default {
  name: "FormWrapper",
  mixins: [addClasses]
};
</script>
