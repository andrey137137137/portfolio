<template lang="pug">
.parallax(:class='classes')
  ImageWrapper.parallax-layer(
    v-for='(item, index) in layers',
    ref='layers',
    :key='index',
    :data-depth='calcDivider(index)',
    :path='getLayerPath(index)',
    :breakpoints='breakpoints',
    :title='getTitle(index)',
    :isWrapperClass='false',
    :imgAddClasses='{ "parallax-img": true }',
    :isLazyLoading='false'
  )
</template>

<script>
import { HOME } from '@common/constants/router';
import { getScrollY } from '@common/helpers';
import ImageWrapper from '@frontCmp/ImageWrapper';

export default {
  name: 'ParallaxCmp',
  components: {
    ImageWrapper,
  },
  data() {
    return {
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
        { name: 'xlg.png', value: 2000 },
        { name: 'lg.png', value: 1200 },
        { name: 'md.png', value: 768 },
        { name: 'sm.png', value: 0 },
      ],
    };
  },
  computed: {
    areSomeLayers() {
      return this.$refs.layers[1];
    },
    isScroll() {
      return this.$route.name != HOME.name;
    },
    classes() {
      return { 'parallax--scroll': this.isScroll };
    },
  },
  methods: {
    calcDivider(index) {
      return (this.$refs.layers.length - index) * 10;
    },
    getLayerPath(index) {
      return this.path + '/layer_' + index;
    },
    getTitle(index) {
      return 'Слой ' + index;
    },
    moveLayers(event) {
      if (this.areSomeLayers) {
        const $vm = this;

        if ($vm.isScroll) {
          $vm.scrollY = getScrollY();
        }

        $vm.initialX = $vm.isScroll ? $vm.centerX : $vm.centerX - event.pageX;
        $vm.initialY = $vm.isScroll
          ? $vm.centerY - $vm.scrollY
          : $vm.centerY - event.pageY;

        $vm.$refs.layers.forEach($layerCmp => {
          const $layer = $layerCmp.$el;

          if ($vm.isScroll) {
            $vm.divider = $layer.dataset.depth / 90;
          } else {
            $vm.divider = $layer.dataset.depth / 10000;
          }

          $vm.positionY = $vm.initialY * $vm.divider;
          $vm.bottomPosition = $vm.centerY * $vm.divider;

          if ($vm.isScroll) {
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

    $vm.centerX = window.innerWidth / 2;
    $vm.centerY = window.innerHeight / 2;

    if ($vm.areSomeLayers) {
      // if ($vm.$parallaxContainer.classList.contains("parallax--scroll")) {
      //   $vm.isScroll = true;
      // }

      // $container = $vm.$parallaxContainer.firstElementChild

      if ($vm.isScroll) {
        window.addEventListener('scroll', $vm.moveLayers);
        window.dispatchEvent(new Event('scroll'));
      } else {
        window.addEventListener('mousemove', $vm.moveLayers);
      }
    }
  },
};
</script>

<style lang="scss">
@import '@frontStylesCmp/Parallax/import';
</style>
