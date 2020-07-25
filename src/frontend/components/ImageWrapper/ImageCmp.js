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
  methods: {
    sourceElem() {
      const media = '(min-width: ' + this.breakpoint + 'px)';
      return <source media={media} srcset={this.path} />;
    },
    imgElem(h) {
      return h('img', {
        class: this.classes,
        attrs: { src: this.path, alt: this.title },
      });
    },
  },
};
