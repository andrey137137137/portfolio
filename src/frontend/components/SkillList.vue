<template lang="pug">
div
  section.skills-counters(
    v-for='(category, index) in categories',
    :class='getContainerClasses(index)'
  )
    h2.section-title.skills-counters_title {{ category.category }}

    ul.clearfix.skills-list
      li.skills-item_wrap(
        v-for='(skill, index) in category.items',
        :class='getSkillItemWrapperClasses(index, category.items.length)'
      )
        .skills-item(
          :id='`${category._id}-${index}`',
          :class='getSkillItemPercentClass(0)'
        )
          svg.skills-item_circle(
            width='110',
            height='110',
            viewBox='0 0 110 110'
          )
            circle.skills-item_base(r='45', cx='55', cy='55')
            circle.skills-item_sector(
              r='45',
              cx='55',
              cy='55',
              transform='rotate(-90 55 55)'
            )
          span.skills-item_title {{ skill.name }}
</template>

<script>
import $ from 'jquery';
import { gsap, ScrollTrigger } from 'gsap/all';

export default {
  name: 'SkillList',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getContainerClasses(index) {
      return {
        'skills-counters--first': !index,
      };
    },
    getSkillItemWrapperClasses(index, length) {
      return {
        'skills-item_wrap--last': index == length - 1,
      };
    },
    getSkillItemPercentClass(percent) {
      return 'skills-item skills-item--prs_' + percent;
    },
  },
  updated() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: '+=500',
        scrub: 1,
      },
    });

    const $vm = this;

    this.categories.forEach(category => {
      category.items.map((skill, index) => {
        const $elem = $(`#${category._id}-${index}`);

        tl.to($elem, {
          onComplete() {
            $elem.addClass($vm.getSkillItemPercentClass(skill.percents));
          },
        });
      });
    });
  },
};
</script>
