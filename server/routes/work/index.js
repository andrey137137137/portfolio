const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { waterfall, each } = require('async');
const sharp = require('sharp');
const fs = require('fs');

const { isAuth } = require('@auth');
const { getSlideName } = require('@apiHelpers');
const crud = require('@contr/crud');
const image = require('@contr/image');

const sliderDir = 'slider';
const sliderBreakpoints = [
  { name: 'xl', height: 525 },
  { name: 'lg', height: 257 },
  { name: 'md', height: 215 },
  { name: 'sm', height: 93 },
];

let curRes;
let curID;
let curMode;
let curFields;
let curSlide;
let uplImage;

function uploadSlide(data, highCB) {
  if (!uplImage) {
    return highCB(null, data);
  }

  curID = data._id;

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const resizeUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
      );

      image.makeDir(resizeUploadPath);

      sharp(uplImage.path)
        .resize({
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          height: breakpoint.height,
        })
        .toFile(
          path.join(
            resizeUploadPath,
            getSlideName(curID, curFields.imageNames, curSlide),
          ),
          cb,
        );
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function deleteSlide(data, highCB) {
  if (!data.imageNames[curSlide]) {
    return highCB(null, data);
  }

  image.setUploadPath(sliderDir);

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
        getSlideName(curID, data.imageNames, curSlide),
      );

      if (fs.existsSync(deleteUploadPath)) {
        fs.unlink(deleteUploadPath, cb);
      } else {
        cb(null, data);
      }
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function deleteAllSlides(data, highCB) {
  for (curSlide = 0; curSlide < data.imageNames.length; curSlide++) {
    if (data.imageNames[curSlide]) {
      break;
    }
  }

  if (curSlide >= data.imageNames.length) {
    return highCB(null, data);
  }

  curSlide = 0;

  each(
    data.imageNames,
    (item, cb) => {
      deleteSlide(data, cb);
      curSlide++;
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function waterfallCB(err, result) {
  if (uplImage) {
    uplImage = false;
  }

  if (err) {
    return crud.sendError(err, curRes, curMode);
  }

  return crud.sendResult(result, curRes, curMode);
}

function startWaterfall(callbackArray) {
  waterfall(callbackArray, (err, result) => {
    if (uplImage) {
      return fs.unlink(uplImage.path, waterfallCB);
    }

    waterfallCB(err, result);
  });
}

function formParse(req, res, mode, withoutSlideCB, withSlideCallbacksArray) {
  curRes = res;
  curMode = mode;

  const form = new IncomingForm({
    uploadDir: image.getTempPath(sliderDir),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return crud.sendError(err, curRes, curMode);
    }

    const { title, link, imageNames, selectedImageIndex, techs } = fields;

    curSlide = selectedImageIndex;
    curFields = {
      title,
      link,
      imageNames: JSON.parse(imageNames),
      techs: JSON.parse(techs),
    };

    const condition =
      mode == 'update' && curSlide >= 0 ? !imageNames[curSlide] : false;

    uplImage = files.image;

    console.log('Value: ' + imageNames);

    if (uplImage || condition) {
      startWaterfall(withSlideCallbacksArray);
    } else {
      withoutSlideCB();
    }
  });
}

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  formParse(
    req,
    res,
    'insert',
    () => {
      crud.createItem(Model, curFields, res);
    },
    [
      cb => {
        crud.createItem(Model, curFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(result, cb);
      },
    ],
  );
});

router.put('/:id', isAuth, (req, res) => {
  curID = req.params.id;

  formParse(
    req,
    res,
    'update',
    () => {
      crud.updateItem(Model, curID, curFields, res);
    },
    [
      cb => {
        crud.getItemById(Model, res, curID, {}, {}, cb);
      },
      (result, cb) => {
        deleteSlide(result, cb);
      },
      (result, cb) => {
        crud.updateItem(Model, curID, curFields, res, cb);
      },
      (result, cb) => {
        uploadSlide(result, cb);
      },
    ],
  );
});

router.delete('/:id', isAuth, (req, res) => {
  curID = req.params.id;
  curRes = res;
  curMode = 'delete';

  startWaterfall([
    cb => {
      crud.getItemById(Model, res, curID, {}, {}, cb);
    },
    (result, cb) => {
      deleteAllSlides(result, cb);
    },
    (result, cb) => {
      crud.deleteItem(Model, curID, res, cb);
    },
  ]);
});

module.exports = router;
