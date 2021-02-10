<template lang="pug">
.parallax(:class='classes')
  ImageWrapper.parallax-layer(
    v-for='number in count',
    :key='number',
    ref='layers',
    :path='getLayerPath(number)',
    :breakpoints='breakpoints',
    :title='getTitle(number)',
    :isWrapperClass='false',
    :imgAddClasses='{ "parallax-img": true }',
    :isLazyLoading='false'
  )
</template>

<script>
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
      breakpoints: [
        { name: 'xl.png', value: 1800 },
        { name: 'lg.png', value: 1200 },
        { name: 'md.png', value: 768 },
        { name: 'sm.png', value: 0 },
      ],
    };
  },
  computed: {
    ...mapGetters(['count']),
    areSomeLayers() {
      return this.count > 1;
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
    getLayerPath(index) {
      return `${this.path}/layer_${index - 1}`;
    },
    getTitle(index) {
      return `Слой ${index - 1}`;
    },
    moveLayers(event) {
      if (this.areSomeLayers) {
        const $vm = this;

        if ($vm.isScroll) {
          $vm.scrollY = getScrollY();
        } else {
          $vm.diffX = $vm.centerX - event.pageX;
        }

        $vm.diffY = $vm.isScroll ? -$vm.scrollY : $vm.centerY - event.pageY;

        $vm.$refs.layers.forEach(($layerCmp, index) => {
          const $layer = $layerCmp.$el;

          if ($vm.isScroll) {
            $vm.divider = $vm.calcDivider(index, 25, 100);
          } else {
            $vm.divider = $vm.calcDivider(index, 50, 10000);
          }

          $vm.positionY = $vm.diffY * $vm.divider;
          $vm.bottomPosition = $vm.centerY * $vm.divider;

          if ($vm.isScroll) {
            $vm.transformString = `translateY(${$vm.positionY}px)`;
          } else {
            $vm.positionX = $vm.diffX * $vm.divider;
            $vm.transformString = `translate(${$vm.positionX}px, ${$vm.positionY}px)`;
          }

          $layer.style.transform = $vm.transformString;
          $layer.firstElementChild.style.bottom = `-${$vm.bottomPosition}px`;
        });
      }
    },
  },
  created() {
    this.readCount();
  },
  mounted() {
    const $vm = this;

    $vm.centerX = window.innerWidth / 2;
    $vm.centerY = window.innerHeight / 2;

    // if ($vm.$parallaxContainer.classList.contains("parallax--scroll")) {
    //   $vm.isScroll = true;
    // }

    if ($vm.isScroll) {
      window.addEventListener('scroll', $vm.moveLayers);
      window.dispatchEvent(new Event('scroll'));
    } else {
      window.addEventListener('mousemove', $vm.moveLayers);
    }
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Parallax/import';
</style>
