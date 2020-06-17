const { ERROR } = require("@httpSt");
const { IncomingForm } = require("formidable");
const fs = require("fs");
const path = require("path");
// const http = require("request");

// function getExt(name) {
//   return name.slice(name.lastIndexOf(".") + 1);
// }

module.exports = function(req, res, dir = "") {
  const form = new IncomingForm();
  const rootPath = "public/upload";
  const uploadPath = dir ? path.join(rootPath, dir) : rootPath;
  let fileName;
  let filePath;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = path.join(process.cwd(), uploadPath);

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: "Не удалось загрузить изображение"
      });
    }

    // console.log(files);

    fileName = files.image.name;
    filePath = path.join(uploadPath, fileName);

    fs.rename(files.image.path, filePath, err => {
      if (err) {
        // fs.unlink(filePath);
        // fs.rename(files.image.path, filePath);
        return res.status(ERROR).json({
          message: "Не удалось переместить изображение"
        });
      }

      res.send({
        message: "Изображение успешно добавлено"
      });

      // const pathApi = "/api/avatar";
      // let dir = filePath.substr(filePath.indexOf("\\"));
      // const requestOptions = {
      //   url: apiOptions.server + pathApi,
      //   method: "POST",
      //   json: {
      //     name: fields.name,
      //     picture: dir
      //   }
      // };

      // http(requestOptions, (error, response, body) => {
      //   if (error) {
      //     return res.status(ERROR).json({
      //       msg: "Картинка не сохранилась в БД " + error,
      //
      //     });
      //   }
      //   res.json({ msg: "Картинка успешно загружена", status: "Ok" });
      // });
    });
  });
};
