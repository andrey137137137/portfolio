<template lang="pug">
  textarea.form__input(
    v-model="state"
    :class="validationClasses"
    :placeholder="placeholder"
    @blur.once="val.$touch()")
</template>

<script>
import formElem from "@common/mixins/formElem";

export default {
  name: "TextareaElem",
  mixins: [formElem]
};
</script>
