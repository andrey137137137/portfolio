const { ERROR } = require('@httpSt');
const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const each = require('async/each');
const sharp = require('sharp');

let uploadPath;
let resizeUploadPath;
let filePath;
let fileName;

// function getExt(name) {
//   return name.slice(name.lastIndexOf(".") + 1);
// }

function sendMessage(res, err, info = false) {
  if (err) {
    return res.status(ERROR).json({
      message: 'Не удалось переместить изображение',
    });
  }

  const data = {
    message: 'Изображение успешно добавлено',
  };

  if (info) data.info = info;

  res.send(data);
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

module.exports = function(req, res, dir = '', layer = -1) {
  const form = new IncomingForm();
  const rootPath = 'public/upload';

  uploadPath = dir ? path.join(rootPath, dir) : rootPath;

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

    filePath = files.image.path;
    fileName = files.image.name;

    if (dir == 'slider') {
      each(
        [
          { name: 'xl', height: 525 },
          { name: 'lg', height: 257 },
          { name: 'md', height: 215 },
          { name: 'sm', height: 93 },
        ],
        (breakpoint, callback) => {
          resizeUploadPath = path.join(uploadPath, breakpoint.name);

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
          sendMessage(res, err, info);

          fs.unlink(filePath, err => {
            if (err) {
              res.status(ERROR).json({
                message: 'Не удалось удалить временный файл',
              });
            }
          });
        },
      );
    } else {
      fs.rename(filePath, path.join(uploadPath, fileName), err => {
        sendMessage(res, err);
      });
    }
  });
};
