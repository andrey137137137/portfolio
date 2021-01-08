<template lang="pug">
SectionWrapper(
  ref='container',
  :name='id',
  :isContainerClass='false',
  :isOwnContainerClass='true'
)
  ul(style='display: none')
    li(v-for='item in items') {{ item.title }}

  .slider-demo
    ImageList(
      :isDemoSlide='true',
      :transitionName='transitionName',
      :isLoaded='isLoaded',
      :index='curIndex',
      :path='imagePath',
      :breakpoints='demoImgBreakpoints',
      :alt='alt',
      :imgAddClasses='demoImgClasses'
    )

  article.slider-text_wrap
    AnimateStr(
      transitionName='slider-title',
      rootElem='h2',
      :str='title',
      :commonKey='curIndex',
      :addClasses='titleClasses'
    )
    AnimateStr(
      transitionName='slider-techs',
      rootElem='p',
      :str='techs',
      :commonKey='curIndex',
      :addClasses='techsClasses'
    )
    transition(appear, name='slide-fade')
      a.clearfix.btn.slider-btn(
        v-show='isLoaded',
        :href='link',
        target='_blank'
      )
        span.icon.icon--link.slider-btn_icon
        span.slider-btn_text Посмотреть сайт

  .clearfix.slider-nav
    ArrowButton(
      :isLoaded='isLoaded',
      :index='curIndex',
      :handle='handlePrev',
      :imagePath='imagePath',
      :imageBreakpoints='prevImgBreakpoints',
      :title='prevTitle',
      :isNext='false'
    )
    ArrowButton(
      :isLoaded='isLoaded',
      :index='curIndex',
      :handle='handleNext',
      :imagePath='imagePath',
      :imageBreakpoints='nextImgBreakpoints',
      :title='nextTitle'
    )
</template>

<script>
import {
  IMAGES_LOADING,
  PRELOADER_CLASSES_REMOVING,
  PRELOADER_HIDDEN,
} from '@common/constants/timeouts';
import { getScrollY } from '@common/helpers';
import imageMixin from '@common/mixins/imageMixin';
import SectionWrapper from '@frontCmp/SectionWrapper';
import ImageWrapper from '@frontCmp/ImageWrapper';
import ImageList from './ImageList';
import AnimateStr from './AnimateStr';
import ArrowButton from './ArrowButton';

export default {
  name: 'SliderCmp',
  components: {
    SectionWrapper,
    ImageWrapper,
    ImageList,
    AnimateStr,
    ArrowButton,
  },
  mixins: [imageMixin],
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            imageName: 'test1.jpg',
            link: 'http://test1.link/',
            techs: ['html 1', 'css 1', 'js 1'],
            title: 'Test Title 1',
          },
          {
            imageName: 'test2.jpg',
            link: 'http://test2.link/',
            techs: ['html 2', 'css 2', 'js 2'],
            title: 'Test Title 2',
          },
          {
            imageName: 'test3.jpg',
            link: 'http://test3.link/',
            techs: ['html 3', 'css 3', 'js 3'],
            title: 'Test Title 3',
          },
        ];
      },
    },
    id: {
      type: String,
      default: 'slider',
    },
  },
  data() {
    return {
      isLoaded: false,
      isVisible: false,
      transitionMethod: 'scroll_up',
      prevTime: 0,
      duration: 3000,
      durationStep: 0,
      curIndex: 0,
      timeoutID: null,
      intervalID: null,
      imagePath: '/upload/slider',
      imageExt: 'png',
      arrowImageBreakpoints: [
        { name: 'lg', value: 1200 },
        { name: 'md', value: 768 },
        { name: 'sm', value: 0 },
      ],
      demoImgClasses: {
        'img_wrap-img': true,
        'slider-img': true,
      },
      titleClasses: {
        'section-title': true,
        'section-title--uppercase': true,
        'section-title--underlined': true,
        'slider-title': true,
      },
      techsClasses: {
        'section-desc': true,
        'slider-desc': true,
      },
    };
  },
  computed: {
    transitionName() {
      return `slider--${this.transitionMethod}`;
    },
    prevIndex() {
      const tempIndex = this.curIndex - 1;

      if (tempIndex < 0) {
        return this.items.length - 1;
      }

      return tempIndex;
    },
    nextIndex() {
      return (this.curIndex + 1) % this.items.length;
    },
    demoImg() {
      return this.getImg(this.curIndex);
    },
    prevImg() {
      return this.getImg(this.prevIndex);
    },
    nextImg() {
      return this.getImg(this.nextIndex);
    },
    demoImgBreakpoints() {
      return [
        { name: `xl/${this.demoImg}`, value: 768 },
        { name: `lg/${this.demoImg}`, value: 0 },
      ];
    },
    prevImgBreakpoints() {
      return this.getArrowImgBreakpoints(this.prevImg, this.imageExt);
    },
    nextImgBreakpoints() {
      return this.getArrowImgBreakpoints(this.nextImg, this.imageExt);
    },
    title() {
      return this.items[this.curIndex].title;
    },
    alt() {
      const number = this.curIndex + 1;
      return number + '. ' + this.title;
    },
    prevTitle() {
      return this.items[this.prevIndex].title;
    },
    nextTitle() {
      return this.items[this.nextIndex].title;
    },
    techs() {
      return this.items[this.curIndex].techs.join(', ');
    },
    link() {
      return this.items[this.curIndex].link;
    },
  },
  methods: {
    getImg(index) {
      return this.getFullImageName(
        this.items[index]._id,
        this.items[index].imageName,
      );
    },
    getArrowImgBreakpoints(imageName) {
      return this.arrowImageBreakpoints.map(breakpoint => {
        return {
          name: `${breakpoint.name}/${imageName}`,
          value: breakpoint.value,
        };
      });
    },
    animate() {
      if (this.isVisible) {
        this.intervalID = requestAnimationFrame(this.nextSlide);
      }
    },
    resetInterval() {
      cancelAnimationFrame(this.intervalID);
      this.durationStep = 0;
      this.prevTime = 0;
    },
    incDurationStep(nowTime) {
      this.durationStep += Math.floor(nowTime - (this.prevTime || nowTime));

      if (this.durationStep >= this.duration) {
        this.durationStep = 0;
      }

      this.prevTime = nowTime;
    },
    prevSlide(nowTime) {
      this.incDurationStep(nowTime);
      if (!this.durationStep) {
        this.curIndex = this.prevIndex;
        this.transitionMethod = 'scroll_down';
      }
      this.animate();
    },
    nextSlide(nowTime) {
      this.incDurationStep(nowTime);
      if (!this.durationStep) {
        this.curIndex = this.nextIndex;
        this.transitionMethod = 'scroll_up';
      }
      this.animate();
    },
    handlePrev() {
      // if (!this.durationStep) {
      this.resetInterval();
      this.prevSlide(performance.now());
      // }
    },
    handleNext() {
      // if (!this.durationStep) {
      this.resetInterval();
      this.nextSlide(performance.now());
      // }
    },
    calcVisible() {
      for (; !this.$refs.container.$el; );

      const container = this.$refs.container.$el;
      const scrollY = getScrollY();
      // const topBorder =
      //   container.offsetTop -
      //   parseInt(document.documentElement.clientHeight / 3);
      const topBorder = container.offsetTop + 601;
      const bottomBorder = topBorder + parseInt(container.offsetHeight);

      console.log('Container:');
      console.log(scrollY);
      console.log(topBorder);
      console.log(bottomBorder);

      if (scrollY >= topBorder && scrollY <= bottomBorder) {
        return true;
      }

      return false;
    },
    autoplay() {
      this.isVisible = this.calcVisible();

      if (this.isVisible) {
        this.handleNext();
      }
    },
    handleScreen() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      const $vm = this;

      $vm.timeoutID = setTimeout(() => {
        $vm.autoplay();
      }, 100);
    },
  },
  mounted() {
    const $vm = this;

    $vm.$nextTick(() => {
      $vm.prevTime = performance.now();

      // setTimeout(() => {
      //   $vm.isLoaded = true;
      // }, IMAGES_LOADING + PRELOADER_CLASSES_REMOVING + PRELOADER_HIDDEN);

      setTimeout(() => {
        window.addEventListener('resize', $vm.handleScreen);
        window.addEventListener('scroll', $vm.handleScreen);
        $vm.autoplay();
        $vm.isLoaded = true;
      }, $vm.duration + IMAGES_LOADING + PRELOADER_CLASSES_REMOVING + PRELOADER_HIDDEN);
    });
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
