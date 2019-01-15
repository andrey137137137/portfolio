<script>
import addClasses from "@common/mixins/addClasses";
import SvgCmp from "@components/SvgCmp";

export default {
  name: "TitleWrapper",
  mixins: [addClasses],
  render(h) {
    const elems = [
      <SvgCmp id={this.bgIcon} addClasses={this.bgClasses} />,
      h(`h${this.titleLevel}`, {
        class: this.titleClasses,
        domProps: { innerHTML: this.title }
      })
    ];

    return h("div", { class: this.containerClasses }, elems);
  },
  props: {
    title: {
      type: String,
      required: true
    },
    titleLevel: {
      type: Number,
      default: 1
    },
    bgIcon: {
      type: String,
      default: "stars2"
    },
    bgAddClasses: {
      type: Object,
      default() {
        return {};
      }
    },
    titleAddClasses: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    containerClasses() {
      return {
        title_wrap: true,
        ...this.addClasses
      };
    },
    bgClasses() {
      return {
        title_wrap__bg: true,
        ...this.bgAddClasses
      };
    },
    titleClasses() {
      return {
        section__title: true,
        "section__title-large": true,
        title_wrap__title: true,
        ...this.titleAddClasses
      };
    }
  },
  methods: {
    svgElem() {
      return <SvgCmp id={this.bgIcon} addClasses={this.bgClasses} />;
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/TitleWrapper.scss">
</style>
