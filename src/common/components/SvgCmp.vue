<template lang="pug">
  svg(:class="addClassesMixin" xmlns="http://www.w3.org/2000/svg")
    use(:xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink")
</template>

<script>
import addClassesMixin from "@common/mixins/addClassesMixin";

export default {
  name: "SvgCmp",
  mixins: [addClassesMixin],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconPath() {
      let icon = require(`@assets/svg/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, "default")) {
        icon = icon.default;
      }

      return icon.url;
    }
  }
};
</script>
