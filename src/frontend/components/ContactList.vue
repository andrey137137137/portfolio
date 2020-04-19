<template lang="pug">
  ul(:class="containerClasses")
    li(
      v-for="item in links"
      :key="item.link"
      :class="itemClasses"
    )
      i.icon(v-if="isIconed" :class="iconClasses(item.icon)")
      span(v-if="isIconed" :class="itemTitleClass") {{item.icon}}
      a(:class="linkClass" :href="item.link" target="_blank") {{item.name}}
</template>

<script>
import addClasses from "@common/mixins/addClasses";

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("frontView");

export default {
  name: "ContactList",
  mixins: [addClasses],
  props: {
    classBlock: {
      type: String,
      required: true
    },
    classElemSeparator: {
      type: String,
      default: "-"
    },
    addItemClasses: {
      type: Object,
      default() {
        return {};
      }
    },
    isIconed: {
      type: Boolean,
      default: false
    }
  },
  // data() {
  //   return {
  //     links: [
  //       {
  //         icon: "skype",
  //         name: "andrey27x777@gmail.com",
  //         link: "skype:andrey27x777@gmail.com"
  //       },
  //       {
  //         icon: "envelope",
  //         name: "andrey27x777@gmail.com",
  //         link: "mailto: andrey27x777@gmail.com"
  //       },
  //       {
  //         icon: "phone",
  //         name: "...",
  //         link: ""
  //       },
  //       {
  //         icon: "map_marker",
  //         name: "Одесса",
  //         link:
  //           "https://www.google.com.ua/maps/place/%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B8%D0%B9+%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9+%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9+%D1%82%D0%B5%D0%B0%D1%82%D1%80+%D0%BE%D0%BF%D0%B5%D1%80%D1%8B+%D0%B8+%D0%B1%D0%B0%D0%BB%D0%B5%D1%82%D0%B0/@46.4854787,30.7402854,18z/data=!4m13!1m7!3m6!1s0x40c6318a0b864c43:0x129f8fe28cf2176c!2z0J7QtNC10YHRgdCwLCDQntC00LXRgdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2NTAwMA!3b1!8m2!3d46.482526!4d30.7233095!3m4!1s0x40c631985b45cb0b:0x6e315e968e5b2a42!8m2!3d46.4854787!4d30.7411794"
  //       }
  //     ]
  //   };
  // },
  computed: {
    ...mapGetters(["profile"]),
    email() {
      return {
        icon: "envelope",
        name: this.profile.email,
        link: "mailto: " + this.profile.email
      };
    },
    mapMarker() {
      return {
        icon: "map_marker",
        name: "Одесса",
        link:
          "https://www.google.com.ua/maps/place/%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B8%D0%B9+%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9+%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9+%D1%82%D0%B5%D0%B0%D1%82%D1%80+%D0%BE%D0%BF%D0%B5%D1%80%D1%8B+%D0%B8+%D0%B1%D0%B0%D0%BB%D0%B5%D1%82%D0%B0/@46.4854787,30.7402854,18z/data=!4m13!1m7!3m6!1s0x40c6318a0b864c43:0x129f8fe28cf2176c!2z0J7QtNC10YHRgdCwLCDQntC00LXRgdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2NTAwMA!3b1!8m2!3d46.482526!4d30.7233095!3m4!1s0x40c631985b45cb0b:0x6e315e968e5b2a42!8m2!3d46.4854787!4d30.7411794"
      };
    },
    links() {
      return [this.email, ...this.profile.contacts, this.mapMarker];
    },
    classPrefix() {
      return this.classBlock + this.classElemSeparator;
    },
    listClass() {
      return this.classPrefix + "list";
    },
    itemClass() {
      return this.classPrefix + "item";
    },
    iconClass() {
      return this.classPrefix + "icon";
    },
    itemTitleClass() {
      return this.classPrefix + "item_title";
    },
    linkClass() {
      return this.classPrefix + "link";
    },
    containerClasses() {
      return {
        ...this.addClasses,
        [this.listClass]: true
      };
    },
    itemClasses() {
      return {
        ...this.addItemClasses,
        [this.itemClass]: true
      };
    }
  },
  methods: {
    iconClasses(icon) {
      return [`icon--${icon}`, this.iconClass];
    }
  }
};
</script>
