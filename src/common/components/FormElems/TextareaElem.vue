<template lang="pug">
  textarea.form__input(
    v-model="state"
    :class="validationClass"
    :placeholder="placeholder"
    @blur.once="val.$touch()")
</template>

<script>
import formElem from "@/mixins/formElem";

export default {
  name: "TextareaElem",
  mixins: [formElem]
};
</script>
