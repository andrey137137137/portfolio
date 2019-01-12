<template lang="pug">
  input.form__input(
    :type="type"
    v-model="state"
    :class="validationClass"
    :placeholder="placeholder"
    @blur.once="val.$touch()")
</template>

<script>
import formElem from "@common/mixins/formElem";

export default {
  name: "InputElem",
  mixins: [formElem]
};
</script>
