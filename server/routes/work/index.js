const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { each } = require('async');
const sharp = require('sharp');
const fs = require('fs');

const { isAuth } = require('@auth');
const { getSlideImageName } = require('@apiHelpers');
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
let curImage;
let uplImage;

function uploadImage(data, highCB) {
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
            getSlideImageName(curID, curFields.imageNames[curImage]),
          ),
          cb,
        );
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function deleteImage(data, highCB) {
  if (!data.imageNames[curImage]) {
    return highCB(null, data);
  }

  image.setUploadPath(sliderDir);

  each(
    sliderBreakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(
        image.getUploadPath(),
        breakpoint.name,
        getSlideImageName(curID, data.imageNames[curImage]),
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

function deleteAllImages(data, highCB) {
  for (curImage = 0; curImage < data.imageNames.length; curImage++) {
    if (data.imageNames[curImage]) {
      break;
    }
  }

  if (curImage >= data.imageNames.length) {
    return highCB(null, data);
  }

  curImage = 0;

  each(
    data.imageNames,
    (imageName, cb) => {
      deleteImage(data, cb);
      curImage++;
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function formParse(req, res, mode, withoutImageCB, withImageCallbacksArray) {
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

    curImage = selectedImageIndex;
    curFields = {
      title,
      link,
      imageNames: JSON.parse(imageNames),
      techs: JSON.parse(techs),
    };

    const condition =
      mode == 'update' && curImage >= 0 ? !imageNames[curImage] : false;

    uplImage = files.image;

    console.log('Values: ' + imageNames);

    if (uplImage || condition) {
      image.startWaterfall(withImageCallbacksArray, res, mode, uplImage);
    } else {
      withoutImageCB();
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
        uploadImage(result, cb);
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
        deleteImage(result, cb);
      },
      (result, cb) => {
        crud.updateItem(Model, curID, curFields, res, cb);
      },
      (result, cb) => {
        uploadImage(result, cb);
      },
    ],
  );
});

router.delete('/:id', isAuth, (req, res) => {
  curID = req.params.id;
  curRes = res;
  curMode = 'delete';

  image.startWaterfall(
    [
      cb => {
        crud.getItemById(Model, res, curID, {}, {}, cb);
      },
      (result, cb) => {
        deleteAllImages(result, cb);
      },
      (result, cb) => {
        crud.deleteItem(Model, curID, res, cb);
      },
    ],
    res,
    curMode,
  );
});

module.exports = router;
