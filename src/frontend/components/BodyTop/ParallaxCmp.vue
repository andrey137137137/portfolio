<template lang="pug">
  ul#parallax.parallax(:class="{'parallax-scroll': isScrolled}")
    //- .parallax__container
    li.parallax__layer(v-for="path in images")
      img.parallax__img(:src="path")
    //- .parallax__content
</template>

<script>
import addClasses from "@/common/mixins/addClasses";

export default {
  name: "ParallaxCmp",
  mixins: [addClasses],
  props: {
    isScrolled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      path: "../../assets/img/parallax",
      ext: "png",
      layers: 2,
      images: [
        "../../assets/img/parallax/layer_1.png",
        "../../assets/img/parallax/layer_2.png"
      ]
    };
  }
  // computed: {
  //   images() {
  //     const data = [];

  //     for (var i = 1; i <= this.layers; i++) {
  //       data.push(`${this.path}/layer_${i}.${this.ext}`);
  //     }

  //     return data;
  //   }
  // }
};
</script>
