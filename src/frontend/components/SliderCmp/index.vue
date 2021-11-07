<template lang="pug">
SectionWrapper(
  ref='container',
  :name='id',
  :isContainerClass='false',
  :isOwnContainerClass='true'
)
  //- ul(style='display: none')
  //-   li(v-for='item in items') { item.title }

  .slider-demo
    ImageList(
      :isDemoSlide='true',
      :transitionName='transitionName',
      :isLoaded='isLoaded',
      :index='curIndex',
      :path='imagePath',
      :breakpoints='demoImgBreakpoints',
      :imageFullNames='demoImageFullNames',
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
      :newIndex='prevIndex',
      :handle='handlePrev',
      :imagePath='imagePath',
      :imageBreakpoints='arrowImageBreakpoints',
      :imageFullNames='prevImageFullNames',
      :title='prevTitle',
      :isNext='false'
    )
    ArrowButton(
      :isLoaded='isLoaded',
      :index='curIndex',
      :newIndex='nextIndex',
      :handle='handleNext',
      :imagePath='imagePath',
      :imageBreakpoints='arrowImageBreakpoints',
      :imageFullNames='nextImageFullNames',
      :title='nextTitle'
    )
</template>

<script>
import { exist } from '@apiHelpers';
import {
  IMAGES_LOADING,
  PRELOADER_CLASSES_REMOVING,
  PRELOADER_HIDDEN,
} from '@common/constants/timeouts';
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
      demoImgBreakpoints: [
        { name: `xl/`, value: 768 },
        { name: `lg/`, value: 0 },
      ],
      arrowImageBreakpoints: [
        { name: 'lg/', value: 1200 },
        { name: 'md/', value: 768 },
        { name: 'sm/', value: 0 },
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
    count() {
      return this.items ? this.items.length : 0;
    },
    prevIndex() {
      const tempIndex = this.curIndex - 1;

      if (tempIndex < 0) {
        return this.count - 1;
      }

      return tempIndex;
    },
    nextIndex() {
      return (this.curIndex + 1) % this.count;
    },
    demoImageFullNames() {
      return this.getImageFullNames(this.curIndex);
    },
    prevImageFullNames() {
      return this.getImageFullNames(this.prevIndex);
    },
    nextImageFullNames() {
      return this.getImageFullNames(this.nextIndex);
    },
    prevImgBreakpoints() {
      return this.getArrowImgBreakpoints(this.prevImg);
    },
    nextImgBreakpoints() {
      return this.getArrowImgBreakpoints(this.nextImg);
    },
    title() {
      return this.getActualStr(this.curIndex, 'title');
    },
    alt() {
      const number = this.curIndex + 1;
      return number + '. ' + this.title;
    },
    prevTitle() {
      return this.getActualStr(this.prevIndex, 'title');
    },
    nextTitle() {
      return this.getActualStr(this.nextIndex, 'title');
    },
    techs() {
      return this.getActualValue(this.curIndex, 'techs', 'Array').join(', ');
    },
    link() {
      return this.getActualStr(this.curIndex, 'link');
    },
  },
  methods: {
    getActualValue(index, prop, type = 'String') {
      if (!this.count || !exist(prop, this.items[0])) {
        switch (type) {
          case 'Number':
            return 0;
          case 'Array':
            return [];
          default:
            return '';
        }
      }
      return this.items[index][prop];
    },
    getActualStr(index, prop) {
      return this.getActualValue(index, prop);
    },
    getImageFullNames(index) {
      return {
        id: this.getActualValue(index, '_id', 'Number'),
        imageNames: this.getActualValue(index, 'imageNames', 'Array'),
      };
    },
    animate() {
      if (this.isVisible) {
        this.intervalID = requestAnimationFrame(this.nextSlide);
      } else {
        this.resetInterval();
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
    changeSlide(nowTime, oldIndex, transitionMethod) {
      this.incDurationStep(nowTime);

      if (!this.durationStep) {
        this.curIndex = oldIndex;
        this.transitionMethod = transitionMethod;

        console.log('Slider:');
        console.log(this.curIndex);
      }

      this.animate();
    },
    prevSlide(nowTime) {
      this.changeSlide(nowTime, this.prevIndex, 'scroll_down');
    },
    nextSlide(nowTime) {
      this.changeSlide(nowTime, this.nextIndex, 'scroll_up');
    },
    handleChangeSlide(isNext = true) {
      console.log(this.durationStep);

      // if (!this.durationStep) {
      this.resetInterval();

      const time = performance.now();

      if (!isNext) {
        this.prevSlide(time);
      } else {
        this.nextSlide(time);
      }
      // }
    },
    handlePrev() {
      this.handleChangeSlide(false);
    },
    handleNext() {
      this.handleChangeSlide();
    },
    calcVisible() {
      for (; !this.$refs.container.$el; );

      const container = this.$refs.container.$el;
      const windowHeight = document.documentElement.clientHeight;
      const elemHeight = container.offsetHeight;
      const targetHeight =
        windowHeight > elemHeight ? windowHeight : elemHeight;
      const targetHalfHeight = parseInt(targetHeight / 2);
      const topBorder = container.getBoundingClientRect().top;
      const bottomBorder = topBorder + parseInt(elemHeight);

      console.log('Container:');
      console.log(targetHeight);
      console.log(topBorder);
      console.log(bottomBorder);

      if (
        topBorder + targetHalfHeight <= targetHeight &&
        bottomBorder >= targetHalfHeight
      ) {
        return true;
      }

      return false;
    },
    autoplay() {
      const oldIsVisible = this.isVisible;

      this.isVisible = this.calcVisible();

      if (!oldIsVisible && this.isVisible && !this.durationStep) {
        this.nextSlide(performance.now());
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
        // window.addEventListener('resize', $vm.handleScreen);
        // window.addEventListener('scroll', $vm.handleScreen);
        // $vm.autoplay();
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
