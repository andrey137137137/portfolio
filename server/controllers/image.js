const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const each = require('async/each');
const sharp = require('sharp');

const rootPath = 'public/upload';
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

function sendMessage(res, err, messages, info = false) {
  if (err) {
    return res.status(ERROR).json({ message: messages.error });
  }

  const data = { message: messages.success };

  if (info) data.info = info;

  res.send(data);
}

function setUploadPath(dir) {
  uploadPath = dir ? path.join(rootPath, dir) : rootPath;
}

// function resizeImage(breakpoint, res) {
//   console.log(resizeUploadPath);

//   sharp(filePath)
//     .resize({
//       background: { r: 0, g: 0, b: 0, alpha: 0 },
//       height: breakpoint.height,
//     })
//     .toFile(path.join(resizeUploadPath, fileName), (err, info) => {
//       sendMessage(res, err, info);
//     });
// }

function deleteImage(res, path, msgError, msgSuccess = false) {
  fs.unlink(path, err => {
    if (err) {
      res.status(ERROR).json({ message: msgError });
    }

    if (msgSuccess) {
      res.send({ message: msgSuccess });
    }
  });
}

module.exports.upload = (req, res, dir = '', layer = -1) => {
  const form = new IncomingForm();

  setUploadPath(dir);

  if (layer >= 0) {
    uploadPath = path.join(uploadPath, 'layer_' + layer);
  }

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = path.join(process.cwd(), uploadPath);

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: 'Не удалось загрузить изображение',
      });
    }

    const filePath = files.image.path;
    const fileName = files.image.name;

    if (dir != sliderDir) {
      fs.rename(filePath, path.join(uploadPath, fileName), err => {
        sendMessage(res, err);
      });
    } else {
      each(
        sliderBreakpoints,
        (breakpoint, callback) => {
          const resizeUploadPath = path.join(uploadPath, breakpoint.name);

          if (!fs.existsSync(resizeUploadPath)) {
            fs.mkdirSync(resizeUploadPath);
          }

          console.log(resizeUploadPath);

          sharp(filePath)
            .resize({
              background: { r: 0, g: 0, b: 0, alpha: 0 },
              height: breakpoint.height,
            })
            .toFile(path.join(resizeUploadPath, fileName), callback);
        },
        (err, info) => {
          sendMessage(
            res,
            err,
            {
              success: 'Изображение успешно добавлено',
              error: 'Не удалось переместить изображение',
            },
            info,
          );

          deleteImage(res, filePath, 'Не удалось удалить временный файл');
        },
      );
    }
  });
};

module.exports.delete = (res, imageName, dir = '') => {
  const messages = {
    success: 'Изображение успешно удалено',
    error: 'Не удалось удалить изображение',
  };

  setUploadPath(dir);

  if (dir != sliderDir) {
    deleteImage(
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
