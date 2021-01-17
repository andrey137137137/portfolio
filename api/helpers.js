const IS_DEV = process.env.NODE_ENV !== 'production';

const exist = (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  return typeof obj[property] !== 'undefined';
};

const getSlideName = (id, name, index) => {
  return `${id}_${name}_${index}`;
};

module.exports = {
  IS_DEV,
  exist,
  getSlideName,
};
