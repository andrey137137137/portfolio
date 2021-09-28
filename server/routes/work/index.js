const path = require('path');
const router = require('express').Router();
const Model = require('mongoose').model('work');
const { IncomingForm } = require('formidable');
const { each } = require('async');
const sharp = require('sharp');

const { isAuth } = require('@auth');
const { exist, getSlideImageName } = require('@apiHelpers');
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
let curImageIndex = -1;
let uplImages = null;

function setCurImageIndex() {
  for (var index = curImageIndex + 1; index < uplImages.length; index++) {
    if (uplImages[index]) {
      curImageIndex = index;
      break;
    }
  }
}

function uploadBreakpointImages(uplImage, data, highCB) {
  if (!uplImage) {
    return highCB(null, data);
  }

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
            getSlideImageName(curID, curFields.imageNames[curImageIndex]),
          ),
          cb,
        );
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function uploadAllBreakpointImages(data, highCB) {
  if (!uplImages) {
    return highCB(null, data);
  }

  curID = data._id;

  each(
    uplImages,
    (uplImage, cb) => {
      uploadBreakpointImages(uplImage, data, cb);
      setCurImageIndex();
    },
    (err, info) => {
      return highCB(err, info);
    },
  );
}

function deleteSliderBreakpointImages(data, highCB) {
  console.log(data);
  if (!data.imageNames[curImageIndex]) {
    return highCB(null, data);
  }

  return image.deleteBreakpointImages(
    breakpoints.map(item => {
      return path.join(
        item.name,
        getSlideImageName(curID, data.imageNames[curImageIndex]),
      );
    }),
    data,
    dir,
    highCB,
  );
}

function deleteAllImages(data, highCB) {
  for (
    curImageIndex = 0;
    curImageIndex < data.imageNames.length;
    curImageIndex++
  ) {
    if (data.imageNames[curImageIndex]) {
      break;
    }
  }

  if (curImageIndex >= data.imageNames.length) {
    return highCB(null, data);
  }

  curImageIndex = 0;

  each(
    data.imageNames,
    (imageName, cb) => {
      deleteSliderBreakpointImages(data, cb);
      curImageIndex++;
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

    const { title, link, imageNames, techs } = fields;

    curFields = {
      title,
      link,
      imageNames: JSON.parse(imageNames),
      techs: JSON.parse(techs),
    };

    if (exist('rmImageIndex', fields)) {
      curImageIndex = fields.rmImageIndex;
    } else if (exist('selectedImages', fields)) {
      const selectedImages = JSON.parse(fields.selectedImages);
      uplImages = [];
      selectedImages.forEach((selectedImage, index) => {
        uplImages.push(selectedImage ? files['image' + index] : null);
      });
      setCurImageIndex();
    }

    console.log('rmImageIndex: ' + fields.rmImageIndex);
    console.log('selectedImages: ' + fields.selectedImages);
    console.log('mode: ' + mode);
    console.log('curImageIndex: ' + curImageIndex);
    console.log('imageNames: ' + curFields.imageNames);
    console.log('uplImages: ' + uplImages);

    const curImageName = curFields.imageNames[curImageIndex];
    const condition = mode == 'update' && curImageIndex >= 0 && !curImageName;

    console.log('condition: ' + condition);
    console.log('curImageName: ' + curImageName);
    console.log('!curImageName: ' + !curImageName);

    if (uplImages || (mode == 'update' && curImageIndex >= 0)) {
      image.startWaterfall(withImageCallbacksArray, res, mode, uplImages);
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
        uploadAllBreakpointImages(result, cb);
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
        uploadAllBreakpointImages(result, cb);
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
