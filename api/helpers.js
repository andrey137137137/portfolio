const exist = (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  return typeof obj[property] !== 'undefined';
};

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  exist,
  IS_DEV,
};
