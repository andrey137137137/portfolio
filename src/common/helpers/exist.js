export default (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  // if (typeof obj[property] !== "undefined") return true;
  return typeof obj[property] !== "undefined";
};
