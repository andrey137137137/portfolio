<template lang="pug">
  #parallax.parallax(:class="classes")
    //- .parallax-container
    //- li.parallax-layer(
    //-   v-for="(item, index) in layers"
    //-   :key="index"
    //-   :data-depth="item")
    ImageWrapper.parallax-layer(
      v-for="(item, index) in layers"
      :key="index"
      :data-depth="item"
      :path="getLayerPath(index)"
      :breakpoints="breakpoints"
      :title="getTitle(index)"
      :isWrapperClass="false"
      :imgAddClasses="{'parallax-img': true}")
    //- .parallax-content
</template>

<script>
import $ from 'jquery';
import ImageWrapper from '@frontCmp/ImageWrapper';

export default {
  name: 'ParallaxCmp',
  components: {
    ImageWrapper,
  },
  data() {
    return {
      $parallaxContainer: null,
      // $container,
      $layers: false,
      centerX: 0,
      centerY: 0,
      initialX: 0,
      initialY: 0,
      scrollY: 0,
      divider: 0,
      positionX: 0,
      positionY: 0,
      bottomPosition: 0,
      transformString: '',
      path: '/upload/parallax',
      ext: 'png',
      layers: [100, 100, 90, 80, 70, 60, 15, 10],
      breakpoints: [
        { name: 'ds.png', value: 1200 },
        { name: 'tb.png', value: 768 },
        { name: 'mb.png', value: 0 },
      ],
    };
  },
  computed: {
    isScroll() {
      return this.$route.name != 'home';
    },
    classes() {
      return { 'parallax--scroll': this.isScroll };
    },
  },
  methods: {
    getLayerPath(index) {
      return this.path + '/layer_' + (index + 1);
    },
    getTitle(index) {
      return 'Слой ' + index;
    },
    moveLayers(event) {
      const $vm = this;
      const isScroll = this.isScroll;

      if (isScroll) {
        this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
      }

      this.initialX = isScroll ? this.centerX : this.centerX - event.pageX;
      this.initialY = isScroll
        ? this.centerY - this.scrollY
        : this.centerY - event.pageY;

      if (this.$layers) {
        [].slice.call(this.$layers).forEach(function($layer, index) {
          if (isScroll) {
            $vm.divider = (index + 1) / 90;
          } else {
            $vm.divider = ((index + 1) * $layer.dataset.depth) / 10000;
          }

          // console.log($layer.dataset.depth);

          $vm.positionY = $vm.initialY * $vm.divider;
          $vm.bottomPosition = (window.innerHeight / 2) * $vm.divider;

          if (isScroll) {
            $vm.transformString = `translateY(${$vm.positionY}px)`;
          } else {
            $vm.positionX = $vm.initialX * $vm.divider;
            $vm.transformString = `translate(${$vm.positionX}px, ${$vm.positionY}px)`;
          }

          $layer.style.transform = $vm.transformString;
          $layer.firstElementChild.style.bottom = `-${$vm.bottomPosition}px`;
        });
      }
    },
  },
  mounted() {
    const $vm = this;

    $(document).ready(() => {
      const isScroll = $vm.isScroll;

      $vm.$parallaxContainer = document.getElementById('parallax');

      $vm.centerX = window.innerWidth / 2;
      $vm.centerY = window.innerHeight / 2;

      if ($vm.$parallaxContainer) {
        // if ($vm.$parallaxContainer.classList.contains("parallax--scroll")) {
        //   isScroll = true;
        // }

        // $container = $vm.$parallaxContainer.firstElementChild
        $vm.$layers = $vm.$parallaxContainer.children;

        if (isScroll) {
          window.addEventListener('scroll', $vm.moveLayers);
          window.dispatchEvent(new Event('scroll'));
        } else {
          window.addEventListener('mousemove', $vm.moveLayers);
        }
      }
    });
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Parallax/import';
</style>
