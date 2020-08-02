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
        div(:class='getSkillItemPercentClass(skill.percents)')
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
export default {
  name: 'SkillList',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      parentID: false,
      childElem: '.section-block',
      interval: 250,
      transform: 'scale(0)',
      outPosition: -500,
      timingPosition: '1s',
      timingTransform: '1s',
      elems: document.querySelectorAll(
        '#' + this.parentID + ' ' + this.childElem,
      ),
      countElems: this.elems.length,
      started: false,
      intervalID: 0,
      shiftFromCenter: 0,
      direction: 1,
      rowNumber: 0,
      evenRowElems: true,
      evenLastRowElems: true,

      eventFuncs: {},

      changedStyles: new Array(this.countElems),
      forLeftPos: 0,
      forRightPos: 0,

      index: 0,
      countRows: 0,
      countInRow: 0,
      centerRowIndex: 0,
      centerLastRowIndex: 0,
      rest: 0,
      rightBorder: 0,
      firstRestIndex: 0,

      windowResizeDelay: 0,
      windowWidth: window.innerWidth,
      screenHeightThird: 0,
    };
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

    getContainerWidth(elem) {
      let width = elem.parentNode.offsetWidth;

      width -= this.getStyle(elem.parentNode, 'paddingLeft', 'px');
      width -= this.getStyle(elem.parentNode, 'paddingRight', 'px');

      return width;
    },

    getWidth(elem, withMargins) {
      let width = elem.offsetWidth;

      withMargins = withMargins || false;

      if (withMargins) {
        width += this.getStyle(elem, 'marginLeft', 'px');
        width += this.getStyle(elem, 'marginRight', 'px');
      }

      return width;
    },

    setPositions() {
      if (this.started) {
        window.removeEventListener('resize', this.eventFuncs[0].f);
        return;
      }

      var tempArray;
      var parentWidth = this.getContainerWidth(this.elems[0]);
      var elemWidth = this.getWidth(this.elems[0], true);

      this.countInRow = parseInt(parentWidth / elemWidth);

      if (this.countElems < this.countInRow) {
        this.countInRow = this.countElems;
      } else if (!this.countInRow) {
        this.countInRow = 1;
      }

      this.countRows = Math.ceil(this.countElems / this.countInRow);
      this.centerRowIndex = parseInt(this.countInRow / 2);
      this.rightBorder = this.countInRow;
      this.rest = this.countElems % this.countInRow;
      this.firstRestIndex = this.countElems - this.rest;

      tempArray = this.correctCenterIndex(this.countInRow, this.centerRowIndex);
      this.centerRowIndex = tempArray[0];
      this.evenRowElems = tempArray[1];

      if (this.rest > 0) {
        this.centerLastRowIndex =
          parseInt(this.rest / 2) + (this.countRows - 1) * this.countInRow;
        tempArray = this.correctCenterIndex(this.rest, this.centerLastRowIndex);
        this.centerLastRowIndex = tempArray[0];
        this.evenLastRowElems = tempArray[1];
      }

      this.forLeftPos = [];
      this.forRightPos = [];

      for (var i = 0, j = 0; i < this.countInRow; i++) {
        if (i <= this.centerRowIndex) {
          if (i == this.centerRowIndex && !this.evenRowElems) {
            continue;
          }

          this.forLeftPos[i] = i;
        } else {
          this.forRightPos[j] = i;
          j++;
        }
      }

      for (var i = 0; i < this.countElems; i++) {
        this.changedStyles[i] = this.getPosition(i);

        this.elems[i].removeAttribute('style');
        this.elems[i].style.position = 'relative';

        this.elems[i].style[this.changedStyles[i]] = this.outPosition + 'px';
        this.elems[i].style.transition =
          this.changedStyles[i] + ' ' + this.timingPosition;

        if (this.transform) {
          // console.log(this.getStyle(this.elems[i], 'transform'));
          this.elems[i].style.transform = 'scale(0)';
          this.elems[i].style.transition +=
            ', transform ' + this.timingTransform;
        }
      }

      this.index = this.centerRowIndex;
    },

    getScrollY() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    getElemCenterTop(elemID) {
      this.screenHeightThird = parseInt(
        document.documentElement.clientHeight / 3,
      );
      // var elem = document.querySelector('#' + elemID + ' .container');
      // var halfHeight = parseInt(document.documentElement.clientHeight/2);
      // var elemHalfHeight = parseInt(elem.offsetHeight/2);
      // console.log(height);
      return document.getElementById(elemID).offsetTop - this.screenHeightThird;
      // return document.getElementById(elemID).offsetTop - halfHeight + elemHalfHeight;
    },

    isVisibleElem(containerID) {
      var scrollY = this.getScrollY();
      var topBorder = this.getElemCenterTop(containerID);
      // var bottomBorder = topBorder + parseInt(containerHeight);
      var bottomBorder =
        topBorder + parseInt(document.getElementById(containerID).offsetHeight);

      if (scrollY >= topBorder && scrollY <= bottomBorder) {
        return true;
      }

      return false;
    },

    show() {
      // var scrollY = this.getScrollY();
      // var elemParentTop = this.getElemCenterTop(this.parentID);

      // if (!this.started && scrollY >= elemParentTop)
      if (!this.started && this.isVisibleElem(this.parentID)) {
        this.showBlock();
        this.started = true;

        for (var i = 0, len = this.eventFuncs.length; i < len; i++) {
          window.removeEventListener(
            this.eventFuncs[i].e,
            this.eventFuncs[i].f,
          );
        }
      }
    },

    correctCenterIndex(rowLen, centerIndex) {
      let checkEvenRowElems = true;

      if (rowLen % 2 == 0) {
        centerIndex--;
      } else {
        checkEvenRowElems = false;
      }

      return [centerIndex, checkEvenRowElems];
    },

    getPosition(indx) {
      var len = this.forLeftPos.length;
      var i;

      if (
        indx >= this.firstRestIndex &&
        indx == this.centerLastRowIndex &&
        !this.evenLastRowElems
      ) {
        return 'bottom';
      }

      if (indx >= this.firstRestIndex && indx <= this.centerLastRowIndex) {
        return 'left';
      }

      if (indx > this.centerLastRowIndex && indx < this.countElems) {
        return 'right';
      }

      if (indx % this.countInRow == this.centerRowIndex && !this.evenRowElems) {
        return 'bottom';
      }

      for (i = 0; i < len; i++) {
        if (indx % this.countInRow == this.forLeftPos[i]) {
          break;
        }
      }

      if (i < len) {
        return 'left';
      }

      len = this.forRightPos.length;

      for (i = 0; i < len; i++) {
        if (indx % this.countInRow == this.forRightPos[i]) {
          break;
        }
      }

      if (i < len) {
        return 'right';
      }
    },

    showBlock() {
      if (this.transform) {
        this.elems[this.index].style.transform = 'scale(1)';
      }

      this.elems[this.index].style[this.changedStyles[this.index]] = 0;

      if (this.direction > 0) {
        this.shiftFromCenter++;
        this.index = this.centerRowIndex + this.shiftFromCenter;
        this.direction = -1;
      } else {
        this.index = this.centerRowIndex - this.shiftFromCenter;
        this.direction = 1;
      }

      if (
        this.index < this.rowNumber * this.countInRow ||
        this.index >= this.rightBorder
      ) {
        this.rowNumber++;
        this.shiftFromCenter = 0;
        this.direction = 1;

        if (this.rowNumber == this.countRows - 1 && this.rest > 0) {
          this.centerRowIndex = this.centerLastRowIndex;
          this.rightBorder = this.countElems;
        } else {
          this.centerRowIndex += this.countInRow;
          this.rightBorder = (this.rowNumber + 1) * this.countInRow;
        }

        this.index = this.centerRowIndex;
      }

      if (this.rowNumber < this.countRows) {
        const $vm = this;

        setTimeout(() => {
          requestAnimationFrame(() => {
            $vm.showBlock();
          });
        }, this.interval);
      }
    },

    resizeWindowWidth(callback) {
      if (window.innerWidth === this.windowWidth) {
        return;
      }

      if (this.windowResizeDelay) {
        clearTimeout(this.windowResizeDelay);
      }

      this.windowWidth = window.innerWidth;

      const $vm = this;

      this.windowResizeDelay = setTimeout(() => {
        callback.apply($vm);
      }, 50);
    },
  },
  mounted() {
    const $vm = this;

    this.eventFuncs = [
      {
        e: 'resize',
        f: () => {
          // $vm.setPositions();
          $vm.resizeWindowWidth($vm.setPositions);
        },
      },
      {
        e: 'resize',
        f: () => {
          $vm.show();
        },
      },
      {
        e: 'scroll',
        f: () => {
          $vm.show();
        },
      },
    ];

    for (var i = 0; i < this.eventFuncs.length; i++) {
      window.addEventListener(this.eventFuncs[i].e, this.eventFuncs[i].f);
    }

    this.setPositions();
    this.show();
  },
};
</script>
