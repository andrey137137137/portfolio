<template lang="pug">
  ul.section.footer_top
    li.container.footer_top-container

      p.col.col--ds_float.col--ds_4.col--xds_4.section-desc.footer_top-col.footer_top-desc Этот сайт я делаю в рамках обучения в Школе онлайн образования LoftSchool.

      NavCmp(:inHeader="false")

      ContactList(
        classBlock="footer_top-contacts"
        classElemSeparator="_"
        :addClasses="contactClasses")
</template>

<script>
import NavCmp from "@frontCmp/NavCmp";
import ContactList from "@frontCmp/ContactList";

export default {
  name: "FooterTop",
  components: {
    NavCmp,
    ContactList
  },
  data() {
    return {
      contactClasses: {
        col: true,
        "col--tb_float": true,
        "col--tb_6": true,
        "col--ds_3": true,
        "col--xds_4": true,
        "footer_top-col": true
      }
    };
  }
};
</script>
