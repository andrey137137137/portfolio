const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('parallax');
const { each } = require('async');
const sharp = require('sharp');
const fs = require('fs');

const { isAuth } = require('@auth');
const { getSlideImageName } = require('@apiHelpers');
const crud = require('@contr/crud');
const image = require('@contr/image');

const dir = 'slider';
const sliderBreakpoints = [
  { name: 'xl', height: 525 },
  { name: 'lg', height: 257 },
  { name: 'md', height: 215 },
  { name: 'sm', height: 93 },
];

let curID;
let curFields;
let curImage;
let uplImage;

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/:layer', isAuth, (req, res) => {
  image.startWaterfall(
    [
      cb => {
        crud.updateItem(Model, curID, { count: req.params.layer }, res, cb);
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
        image.remove(res, 'layer_' + layer, dir, layer, cb);
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
        image.remove(res, 'layer_' + layer, dir, layer, cb);
      },
      (result, cb) => {
        crud.updateItem(Model, curID, { count: layer }, res, cb);
      },
    ],
    res,
    'delete',
  );
});

module.exports = router;
