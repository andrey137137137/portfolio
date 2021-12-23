export default {
  methods: {
    asString(classes) {
      return typeof classes === 'string';
    },
    asArray(classes) {
      return Array.isArray(classes);
    },
    asObject(classes) {
      return typeof classes === 'object';
    },
    getClassesAsObject(classes) {
      if (this.asObject(classes) && !this.asArray(classes)) {
        // for (let key in classes) {
        //   if (Object.prototype.hasOwnProperty.call(classes, key)) {
        return classes;
        //   }
        // }
      }

      if (this.asString(classes)) {
        classes = classes.split(' ');
      }

      if (this.asArray(classes)) {
        const resultClasses = {};

        classes.forEach(item => {
          resultClasses[item] = true;
        });

        return resultClasses;
      }

      return {};
    },
  },
};
