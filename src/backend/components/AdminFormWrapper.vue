<template lang="pug">
FormWrapper.form--admin
  slot
</template>

<script>
import FormWrapper from '@components/formElems/FormWrapper';

export default {
  name: 'AdminFormWrapper',
  components: {
    FormWrapper,
  },
};
</script>
