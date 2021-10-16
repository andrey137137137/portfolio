<template lang="pug">
.parallax(:class='classes')
  ImageWrapper.parallax-layer(
    v-for='(item, index) in count',
    :key='item',
    ref='layers',
    :path='getLayerPath()',
    :breakpoints='breakpoints',
    :title='getTitle()',
    :isWrapperClass='false',
    :imgAddClasses='getImgAddClasses(index)',
    :isLazyLoading='false'
  )
  //- .parallax-layer(ref='firstLayer')
  //-   video.parallax-img.parallax-img--first(
  //-     autoplay,
  //-     loop,
  //-     autobuffer,
  //-     muted,
  //-     playsinline
  //-   )
  //-     source(:src='path + "/night.mp4"', type='video/mp4')
</template>

<script>
import { getBreakpointsWithExt } from '@apiHelpers';
import { HOME } from '@common/constants/router';
import { getScrollY } from '@common/helpers';
import ImageWrapper from '@frontCmp/ImageWrapper';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('parallax');

export default {
  name: 'ParallaxCmp',
  components: {
    ImageWrapper,
  },
  data() {
    return {
      windowWidth: 0,
      centerX: 0,
      centerY: 0,
      diffX: 0,
      diffY: 0,
      scrollY: 0,
      divider: 0,
      positionX: 0,
      positionY: 0,
      bottomPosition: 0,
      transformString: '',
      path: '/upload/parallax',
      ext: 'png',
      // layers: [],
    };
  },
  computed: {
    ...mapGetters(['count']),
    breakpoints() {
      return getBreakpointsWithExt(this.ext);
    },
    lastLayer() {
      return this.count - 1;
    },
    isDesktop() {
      return this.windowWidth >= 1200;
    },
    isScroll() {
      return this.$route.name != HOME.name;
    },
    classes() {
      return { 'parallax--scroll': this.isScroll };
    },
  },
  methods: {
    ...mapActions(['readCount']),
    calcDivider(index, mult, divider) {
      // return ((this.count - index) * mult) / divider;
      return ((index + 1) * mult) / divider;
    },
    getLayerPath() {
      return `${this.path}/layer_${this.lastLayer}`;
    },
    getTitle() {
      return `Слой ${this.lastLayer}`;
    },
    getImgAddClasses(index) {
      return {
        'parallax-img': true,
        'parallax-img--first': !index,
        'parallax-img--other': index,
      };
    },
    moveLayers(event) {
      if (this.isDesktop) {
        const $vm = this;
        const { layers } = $vm.$refs;
        const $layers = layers ? layers : [];

        if ($vm.isScroll) {
          $vm.scrollY = getScrollY();
        } else {
          $vm.diffX = $vm.centerX - event.pageX;
        }

        $vm.diffY = $vm.isScroll ? -$vm.scrollY : $vm.centerY - event.pageY;

        $layers.forEach(($comp, index) => {
          const $layer = $comp.$el;

          if ($vm.isScroll) {
            $vm.divider = $vm.calcDivider(index, 25, 100);
          } else {
            $vm.divider = $vm.calcDivider(index, 50, 10000);
          }

          $vm.positionY = $vm.diffY * $vm.divider;

          if ($vm.isScroll) {
            $vm.transformString = `translateY(${$vm.positionY}px)`;
          } else {
            $vm.positionX = $vm.diffX * $vm.divider;
            $vm.transformString = `translate(${$vm.positionX}px, ${$vm.positionY}px)`;
          }

          $layer.style.transform = $vm.transformString;

          if (index) {
            $vm.bottomPosition = $vm.centerY * $vm.divider;
            $layer.firstElementChild.style.bottom = `-${$vm.bottomPosition}px`;
          }
        });
      }
    },
    setCenterCoords() {
      this.windowWidth = window.innerWidth;
      this.centerX = this.windowWidth / 2;
      this.centerY = window.innerHeight / 2;
    },
    resetLayers(event) {
      this.setCenterCoords();
      this.moveLayers(event);
    },
  },
  created() {
    this.readCount();
  },
  mounted() {
    this.setCenterCoords();

    // console.log(this.$refs);
    // console.log(this.layers);

    // this.layers.push(this.$refs.firstLayer);
    // this.layers.push(this.$refs.lastLayer.$el);

    // this.$refs.layers.forEach($comp => {
    //   this.layers.push($comp.$el);
    // });

    if (this.isScroll) {
      window.addEventListener('scroll', this.moveLayers);
      // window.dispatchEvent(new Event('scroll'));
    } else {
      window.addEventListener('mousemove', this.moveLayers);
    }

    window.addEventListener('resize', this.resetLayers);
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Parallax/import';
</style>
