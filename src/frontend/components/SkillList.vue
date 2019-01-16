<template lang="pug">
  div
    section.skills__counters(
      v-for="(category, index) in categories"
      :class="getContainerClasses(index)"
    )
      h2.section__title.skills__counters_title {{category.category}}

      ul.clearfix.skills__list
        li.skills__item_wrap(
          v-for="(skill, index) in category.skills"
          :class="getSkillItemWrapperClasses(index, category.skills.length)"
        )
          div(:class="getSkillItemPercentClass(skill.percents)")
            svg.skills__item_circle(width="110" height="110" viewBox="0 0 110 110")
              circle.skills__item_base(r="45" cx="55" cy="55")
              circle.skills__item_sector(r="45" cx="55" cy="55" transform="rotate(-90 55 55)")
            span.skills__item_title {{skill.title}}
</template>

<script>
export default {
  name: "SkillList",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    getContainerClasses(index) {
      return {
        "skills__counters-first": !index
      };
    },
    getSkillItemWrapperClasses(index, length) {
      return {
        "skills__item_wrap-last": index == length - 1
      };
    },
    getSkillItemPercentClass(percent) {
      return "skills__item skills__item-prs_" + percent;
    }
  }
};
</script>
