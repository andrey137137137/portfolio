const exist = (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  return typeof obj[property] !== 'undefined';
};

const isDev = () => {
  return process.env.NODE_ENV !== 'production';
};

module.exports = {
  exist,
  isDev,
};
