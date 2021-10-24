const router = require('express').Router();
const Model = require('mongoose').model('parallax');

const { getPositiveValue, getBreakpointsWithExt } = require('@apiHelpers');
const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const image = require('@contr/image');

const DIR = 'parallax';

function getBreakpointsWithExtPng() {
  return getBreakpointsWithExt('png').map(item => item.name);
}

router.get('/', (req, res) => {
  crud.getItem(Model, res, {
    fields: {
      _id: 0,
      __v: 0,
    },
  });
});

router.post('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;

  if (image.isAnyBreakpointImage(DIR, getBreakpointsWithExtPng(), layer)) {
    return image.upload(req, res, DIR, layer);
  } else {
    image.startWaterfall(res, 'insert', [
      cb => {
        crud.getItem(Model, res, {}, cb);
      },
      (result, cb) => {
        crud.updateItem(
          Model,
          res,
          result._id,
          { count: getPositiveValue(result.count) + 1 },
          cb,
        );
      },
      (result, cb) => {
        image.upload(req, res, DIR, layer, cb);
      },
    ]);
  }
});

router.put('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;
  let data = null;

  image.startWaterfall(res, 'delete', [
    cb => {
      crud.getItem(Model, res, {}, cb);
    },
    (result, cb) => {
      data = result;
      // image.deleteBreakpointImages(
      //   DIR,
      //   data,
      //   getBreakpointsWithExtPng(),
      //   cb,
      //   layer,
      // );
      image.remove(res, '', DIR, layer, cb);
    },
    (result, cb) => {
      const newCount = getPositiveValue(data.count);
      crud.updateItem(
        Model,
        res,
        data._id,
        { count: getPositiveValue(newCount - 1) },
        cb,
      );
    },
  ]);
});

module.exports = router;
