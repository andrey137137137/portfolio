const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
// const http = require("request");

function getExt(name) {
  const start = name.lastIndexOf(".");
  return name.slice(start + 1);
}

module.exports.index = function(req, res) {
  const form = new formidable.IncomingForm();
  const upload = "public/upload";
  let fileName;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({
        msg: "Не удалось загрузить картинку",
        status: "Error"
      });
    }

    fileName = path.join(upload, `avatar.${getExt(files.image.name)}`);

    fs.rename(files.image.path, fileName, function(err) {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(files.image.path, fileName);
      }

      // const pathApi = "/api/avatar";
      // let dir = fileName.substr(fileName.indexOf("\\"));
      // const requestOptions = {
      //   url: apiOptions.server + pathApi,
      //   method: "POST",
      //   json: {
      //     name: fields.name,
      //     picture: dir
      //   }
      // };

      // http(requestOptions, function(error, response, body) {
      //   if (error) {
      //     return res.json({
      //       msg: "Картинка не сохранилась в БД " + error,
      //       status: "Error"
      //     });
      //   }
      //   res.json({ msg: "Картинка успешно загружена", status: "Ok" });
      // });
    });
  });
};
