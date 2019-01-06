<template lang="pug">
  footer#footer.footer(:class="addClasses")

    a.icon.icon-chevron_up.scroll_btn.scroll_btn-to_up(v-if="isToUp" href="#header")

    FooterTop(v-if="isContent")

    ul.section.footer_bottom(:class="{'footer_bottom-bg': isContent}")
      li.container.footer_bottom__container
        p.section__desc.footer_bottom__col.footer_bottom__author &copy; Банников Андрей
        p.section__desc.footer_bottom__col.footer_bottom__desc Создаю с любовью в LoftSchool
        p.section__desc.footer_bottom__col.footer_bottom__date 2018
</template>

<script>
import addClasses from "@/common/mixins/addClasses";
import FooterTop from "./FooterTop";

export default {
  name: "FooterWrapper",
  components: {
    FooterTop
  },
  mixins: [addClasses],
  props: {
    isToUp: {
      type: Boolean,
      default: true
    },
    isContent: {
      type: Boolean,
      default: true
    }
  }
};
</script>
