const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const each = require('async/each');

const rootPath = path.join('public', 'upload');
const sliderDir = 'slider';
const sliderBreakpoints = [
  { name: 'xl', height: 525 },
  { name: 'lg', height: 257 },
  { name: 'md', height: 215 },
  { name: 'sm', height: 93 },
];

let uploadPath;
// let resizeUploadPath;
// let filePath;
// let fileName;

const sendMessage = (res, err, messages, info = false) => {
  if (err) {
    return res.status(ERROR).json({ message: messages.error });
  }

  const data = { message: messages.success };

  if (info) data.info = info;

  res.send(data);
};

const makeDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const setUploadPath = (dir, layer = -1) => {
  uploadPath = dir ? path.join(rootPath, dir) : rootPath;

  if (layer >= 0) {
    uploadPath = path.join(uploadPath, 'layer_' + layer);
  }

  makeDir(uploadPath);
};

const getUploadDir = (dir, layer = -1) => {
  setUploadPath(dir, layer);
  return path.join(process.cwd(), uploadPath);
};

// const resizeImage = (breakpoint, res) => {
//   console.log(resizeUploadPath);

//   sharp(filePath)
//     .resize({
//       background: { r: 0, g: 0, b: 0, alpha: 0 },
//       height: breakpoint.height,
//     })
//     .toFile(path.join(resizeUploadPath, fileName), (err, info) => {
//       sendMessage(res, err, info);
//     });
// };

const unlinkImage = (res, path, msgError, msgSuccess = false) => {
  fs.unlink(path, err => {
    if (err) {
      res.status(ERROR).json({ message: msgError });
    }

    if (msgSuccess) {
      res.send({ message: msgSuccess });
    }
  });
};

const upload = (req, res, dir = '', layer = -1) => {
  const form = new IncomingForm();

  form.uploadDir = getUploadDir(dir, layer);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: 'Не удалось загрузить изображение',
      });
    }

    const filePath = files.image.path;
    const fileName = files.image.name;

    fs.rename(filePath, path.join(uploadPath, fileName), err => {
      sendMessage(res, err);
    });
  });
};

const remove = (res, imageName, dir = '') => {
  const messages = {
    success: 'Изображение успешно удалено',
    error: 'Не удалось удалить изображение',
  };

  setUploadPath(dir);

  if (dir != sliderDir) {
    unlinkImage(
      res,
      path.join(uploadPath, imageName),
      messages.error,
      messages.success,
    );
  } else {
    each(
      sliderBreakpoints,
      (breakpoint, callback) => {
        const deleteUploadPath = path.join(uploadPath, breakpoint.name);

        console.log(deleteUploadPath);

        fs.unlink(path.join(deleteUploadPath, imageName), callback);
      },
      (err, info) => {
        sendMessage(res, err, messages, info);
      },
    );
  }
};

module.exports = {
  uploadPath,
  makeDir,
  setUploadPath,
  getUploadDir,
  upload,
  remove,
};
