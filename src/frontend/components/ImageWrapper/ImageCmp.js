export default {
  name: "ImageCmp",
  render(h) {
    return this.breakpoint ? this.sourceElem(h) : this.imgElem(h);
  },
  props: {
    path: {
      type: String,
      required: true
    },
    breakpoint: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    sourceElem(h) {
      const media = "(min-width: " + this.breakpoint + "px)";
      return <source media={media} srcset={this.path} />;
    },
    imgElem(h) {
      return <img class="img_wrap-img" src={this.path} alt={this.title} />;
    }
  }
};
