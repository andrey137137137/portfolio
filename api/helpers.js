const IS_DEV = process.env.NODE_ENV !== 'production';

const exist = (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  return typeof obj[property] !== 'undefined';
};

const getSlideImageName = (id, name) => {
  return `${id}_${name}`;
};

module.exports = {
  IS_DEV,
  exist,
  getSlideImageName,
};
