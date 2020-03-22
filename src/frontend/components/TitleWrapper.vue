<script>
import SvgCmp from "@components/SvgCmp";

export default {
  name: "TitleWrapper",
  render(h) {
    return h("div", { class: this.containerClasses }, [
      this.svgElem(),
      this.titleElem(h)
    ]);
  },
  props: {
    title: {
      type: String,
      required: true
    },
    containerAddClass: {
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
    bgAddClass: {
      type: String,
      default: ""
    },
    titleAddClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    containerClasses() {
      return ["title_wrap", this.containerAddClass];
    },
    bgClasses() {
      return {
        title_wrap__bg: true,
        [this.bgAddClass]: true
      };
    },
    titleClasses() {
      return [
        "section__title",
        "section__title-large",
        "title_wrap__title",
        this.titleAddClass
      ];
    }
  },
  methods: {
    svgElem() {
      return <SvgCmp id={this.bgIcon} addClasses={this.bgClasses} />;
    },
    titleElem(h) {
      return h(`h${this.titleLevel}`, {
        class: this.titleClasses,
        domProps: { innerHTML: this.title }
      });
    }
  }
};
</script>

<style lang="scss" src="@frontStylesCmp/TitleWrapper/import.scss"></style>
