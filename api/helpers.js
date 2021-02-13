const IS_DEV = process.env.NODE_ENV !== 'production';

const deviceBreakpoints = [
  { name: 'xl', value: 1800 },
  { name: 'lg', value: 1200 },
  { name: 'md', value: 768 },
  { name: 'sm', value: 0 },
];

const getBreakpointNames = (isFirstSmallest = true) => {
  const breakpointNames = deviceBreakpoints.map(item => item.name);
  return isFirstSmallest ? breakpointNames.reverse() : breakpointNames;
};

const getBreakpointsWithExt = (ext, exludes = []) => {
  const breakpoints = [];

  deviceBreakpoints.forEach(item => {
    const { name, value } = item;

    for (let index = 0; index < exludes.length; index++) {
      if (name == exludes[index]) {
        return;
      }
    }

    breakpoints.push({ name: `${name}.${ext}`, value });
  });

  return breakpoints;
};

const exist = (property, obj = window) => {
  // return Object.prototype.hasOwnProperty.call(obj, property);
  return typeof obj[property] !== 'undefined';
};

const getSlideImageName = (id, name) => {
  return `${id}_${name}`;
};

module.exports = {
  IS_DEV,
  deviceBreakpoints,
  getBreakpointNames,
  getBreakpointsWithExt,
  exist,
  getSlideImageName,
};
