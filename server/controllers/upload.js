const { ERROR } = require("@httpSt");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
// const http = require("request");

function getExt(name) {
  return name.slice(name.lastIndexOf(".") + 1);
}

module.exports = function(req, res, dir) {
  const form = new formidable.IncomingForm();
  const rootPath = "public/upload";
  const uploadPath = path.join(rootPath, dir);
  let fileName;
  let filePath;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  form.uploadDir = path.join(process.cwd(), uploadPath);

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        msg: "Не удалось загрузить картинку"
      });
    }

    // console.log(files);

    fileName = files.image.name;
    filePath = path.join(uploadPath, fileName);

    fs.rename(files.image.path, filePath, err => {
      if (err) {
        console.log(err);
        fs.unlink(filePath);
        fs.rename(files.image.path, filePath);
      }

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
