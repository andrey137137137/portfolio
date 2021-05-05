const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { each } = require('async');
const sharp = require('sharp');

const { isAuth } = require('@auth');
const { getSlideImageName } = require('@apiHelpers');
const crud = require('@contr/crud');
const image = require('@contr/image');

const dir = 'slider';
const breakpoints = [
  // { name: 'xl', height: 525 },
  // { name: 'lg', height: 257 },
  // { name: 'md', height: 215 },
  // { name: 'sm', height: 93 },
  { name: 'xl', height: 369 },
  { name: 'lg', height: 186 },
  { name: 'md', height: 153 },
  { name: 'sm', height: 76 },
];

let curRes;
let curID;
let curMode;
let curFields;
let curImage;
let uplImage;

function uploadBreakpointImages(data, highCB) {
  if (!uplImage) {
    return highCB(null, data);
  }

  curID = data._id;

  each(
    breakpoints,
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

function deleteSliderBreakpointImages(data, highCB) {
  console.log(data);
  if (!data.imageNames[curImage]) {
    return highCB(null, data);
  }

  return image.deleteBreakpointImages(
    breakpoints.map(item => {
      return path.join(
        item.name,
        getSlideImageName(curID, data.imageNames[curImage]),
      );
    }),
    data,
    dir,
    highCB,
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
      deleteSliderBreakpointImages(data, cb);
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
    uploadDir: image.getTempPath(dir),
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

    const curImageName = [null];

    const condition =
      mode == 'update' && curImage >= 0
        ? !curFields.imageNames[curImage]
        : false;

    uplImage = files.image;

    console.log('mode: ' + mode);
    console.log('curImage: ' + curImage);
    console.log('imageNames: ' + curFields.imageNames);
    console.log('image: ' + files.image);
    console.log('condition: ' + condition);
    console.log('condition: ' + !!null);
    console.log('curImageName: ' + !curImageName[0]);

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
        uploadBreakpointImages(result, cb);
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
        deleteSliderBreakpointImages(result, cb);
      },
      (result, cb) => {
        crud.updateItem(Model, curID, curFields, res, cb);
      },
      (result, cb) => {
        uploadBreakpointImages(result, cb);
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
