const router = require('express').Router();
const Model = require('mongoose').model('parallax');

const { getBreakpointsWithExt } = require('@apiHelpers');
const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const image = require('@contr/image');

const DIR = 'parallax';

function deleteParallaxBreakpointImages(data, highCB) {
  return image.deleteBreakpointImages(
    DIR,
    data,
    getBreakpointsWithExt('png').map(item => item.name),
    highCB,
  );
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
  image.startWaterfall(res, 'insert', [
    cb => {
      crud.getItem(Model, res, {}, cb);
    },
    (result, cb) => {
      crud.updateItem(Model, res, result._id, { count: result.count + 1 }, cb);
    },
    (result, cb) => {
      image.upload(req, res, DIR, req.params.layer, cb);
    },
  ]);
});

router.put('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;

  image.startWaterfall(res, 'update', [
    cb => {
      deleteParallaxBreakpointImages({}, cb, layer);
    },
    (result, cb) => {
      image.upload(req, res, DIR, layer, cb);
    },
  ]);
});

router.delete('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;
  let data = null;

  image.startWaterfall(res, 'delete', [
    cb => {
      crud.getItem(Model, res, {}, cb);
    },
    (result, cb) => {
      data = result;
      deleteParallaxBreakpointImages(result, cb, layer);
    },
    (result, cb) => {
      crud.updateItem(Model, res, data._id, { count: data.count - 1 }, cb);
    },
  ]);
});

module.exports = router;
