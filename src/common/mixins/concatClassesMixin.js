// import { exist } from '@apiHelpers';

const STRING_TYPE = 'string';
const ARRAY_TYPE = 'array';
const OBJECT_TYPE = 'object';

export default {
  data() {
    return {
      classesType: false,
    };
  },
  computed: {
    asString() {
      return this.classesType === STRING_TYPE;
    },
    asArray() {
      return this.classesType === ARRAY_TYPE;
    },
    asObject() {
      return this.classesType === OBJECT_TYPE;
    },
  },
  methods: {
    // areClassesAsString(classes) {
    //   return typeof classes === STRING_TYPE;
    // },
    // areClassesAsArray(classes) {
    //   return Array.isArray(classes);
    // },
    areClasses(classes) {
      if (typeof classes === STRING_TYPE) {
        this.classesType = STRING_TYPE;
        return;
      }

      if (Array.isArray(classes)) {
        this.classesType = ARRAY_TYPE;
        return;
      }

      if (typeof classes === OBJECT_TYPE) {
        for (let key in classes) {
          if (Object.prototype.hasOwnProperty.call(classes, key)) {
            this.classesType = OBJECT_TYPE;
            return;
          }
        }
      }

      this.classesType = false;
      return;
    },
    getClassesAsObject(classes) {
      this.areClasses(classes);

      if (!this.classesType) {
        return {};
      }

      if (this.asObject) {
        return classes;
      }

      if (this.asString) {
        classes = classes.split(' ');
      }

      const resultClasses = {};

      classes.forEach(item => {
        resultClasses[item] = true;
      });

      return resultClasses;
    },
  },
};
