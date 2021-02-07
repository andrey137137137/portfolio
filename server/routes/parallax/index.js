const router = require('express').Router();
const Model = require('mongoose').model('parallax');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');
const image = require('@contr/image');

const dir = 'parallax';
const prefix = 'layer_';

router.get('/', (req, res) => {
  crud.getItem(
    Model,
    res,
    {},
    {
      _id: 0,
      __v: 0,
    },
  );
});

router.post('/:layer', isAuth, (req, res) => {
  image.startWaterfall(
    [
      cb => {
        crud.getItem(Model, res, {}, {}, {}, cb);
      },
      (result, cb) => {
        crud.updateItem(
          Model,
          result._id,
          { count: result.count + 1 },
          res,
          cb,
        );
      },
      (result, cb) => {
        image.upload(req, res, dir, req.params.layer, cb);
      },
    ],
    res,
    'insert',
  );
});

router.put('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;

  image.startWaterfall(
    [
      cb => {
        image.remove(res, prefix + layer, dir, layer, cb);
      },
      (result, cb) => {
        image.upload(req, res, dir, layer, cb);
      },
    ],
    res,
    'update',
  );
});

router.delete('/:layer', isAuth, (req, res) => {
  const { layer } = req.params;

  image.startWaterfall(
    [
      cb => {
        crud.getItem(Model, res, {}, {}, {}, cb);
      },
      (result, cb) => {
        image.remove(res, prefix + layer, dir, layer, cb);
      },
      (result, cb) => {
        crud.updateItem(
          Model,
          { count: result.count - 1 },
          { count: layer },
          res,
          cb,
        );
      },
    ],
    res,
    'delete',
  );
});

module.exports = router;
