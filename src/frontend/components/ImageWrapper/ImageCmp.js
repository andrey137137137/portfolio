export default {
  name: 'ImageCmp',
  render(h) {
    return this.breakpoint ? this.sourceElem() : this.imgElem(h);
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    classes: {
      type: Object,
      required: true,
    },
    breakpoint: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isVisible: false,
      imgRef: 'img',
      lazyloadThrottleTimeout: 0,
    };
  },
  methods: {
    sourceElem() {
      const media = '(min-width: ' + this.breakpoint + 'px)';
      return (
        <source
          ref={this.imgRef}
          media={media}
          data-src={this.path}
          srcset=""
        />
      );
    },
    imgElem(h) {
      return h('img', {
        class: this.classes,
        attrs: { 'data-src': this.path, src: '', alt: this.title },
        ref: this.imgRef,
      });
    },
    setSrc() {
      const img = this.$refs[this.imgRef];
      const srcAttr = this.breakpoint ? 'srcset' : 'src';

      img[srcAttr] = img.dataset.src;
      img.removeAttribute('data-src');
      this.isVisible = true;
    },
    lazyload() {
      const $vm = this;
      const img = this.$refs[this.imgRef];

      if (this.lazyloadThrottleTimeout) {
        clearTimeout(this.lazyloadThrottleTimeout);
      }

      this.lazyloadThrottleTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;

        if (img.offsetTop < window.innerHeight + scrollTop) {
          $vm.setSrc();
        }

        if ($vm.isVisible) {
          document.removeEventListener('scroll', $vm.lazyload);
          window.removeEventListener('resize', $vm.lazyload);
          window.removeEventListener('orientationChange', $vm.lazyload);
        }
      }, 20);
    },
  },
  mounted() {
    const img = this.$refs[this.imgRef];

    if ('IntersectionObserver' in window) {
      const $vm = this;
      const imageObserver = new IntersectionObserver((entry, observer) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          $vm.setSrc();
          imageObserver.unobserve(image);
        }
      });

      imageObserver.observe(img);
    } else {
      document.addEventListener('scroll', this.lazyload);
      window.addEventListener('resize', this.lazyload);
      window.addEventListener('orientationChange', this.lazyload);
    }
  },
};
