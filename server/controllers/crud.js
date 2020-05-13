const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = require("@httpSt");
const waterfall = require("async/waterfall");

function getMessage(mode, isError = false) {
  switch (mode) {
    case "find":
      return "чтении записей";
    case "findOne":
      return "чтении записи";
    case "insert":
      if (isError) return "добавлении записи";
      return "добавлена";
    case "update":
      if (isError) return "обновлении записи";
      return "обновлена";
    case "delete":
      if (isError) return "удалении записи";
      return "удалена";
  }
}

function sendResult(result, res, mode = "insert") {
  if (!result) {
    if (mode == "insert") {
      return;
    }

    return res.status(NOT_FOUND).json({ message: "Запись в БД не обнаружена" });
  }

  res.status(SUCCESS).json({ message: "Запись успешно " + getMessage(mode) });
}

function sendError(err, res, mode) {
  res.status(ERROR).json({
    message: `При ${getMessage(mode, true)} произошла ошибка: ${err}`,
  });
}

function get(Model, res, filter, fields, mode = "many") {
  const types = {
    many: "find",
    one: "findOne",
    id: "findById",
  };
  const method = types[mode];

  Model[method](filter, fields)
    .then((result) => {
      res.status(SUCCESS).json({ result });
    })
    .catch((err) => {
      sendError(err, res, mode == "many" ? "find" : "findOne");
    });
}

function update(Model, query, data, res) {
  const FUNC = query.id ? "findByIdAndUpdate" : "findOneAndUpdate";
  const filter = query.id ? query.id : query;

  Model[FUNC](filter, { $set: data })
    .then((result) => {
      sendResult(result, res, "update");
    })
    .catch((err) => {
      sendError(err, res, "update");
    });
}

module.exports.getItemById = (Model, res, id, fields = {}) => {
  get(Model, res, id, fields, "id");
};

module.exports.getItem = (Model, res, filter = {}, fields = {}) => {
  get(Model, res, filter, fields, "one");
};

module.exports.getItems = (Model, res, filter = {}, fields = {}) => {
  get(Model, res, filter, fields);
};

module.exports.createItem = (Model, data, res) => {
  const item = new Model(data);

  item
    .save()
    .then((result) => {
      sendResult(result, res, "insert");
    })
    .catch((err) => {
      sendError(err, res, "insert");
    });
};

module.exports.updateItem = (Model, id, data, res) => {
  update(Model, { id }, data, res);
};

module.exports.updateItemByQuery = (Model, query, data, res) => {
  update(Model, query, data, res);
};

module.exports.updateUserPassword = (Model, id, data, res) => {
  const { email, username, oldPassword, password, repPassword } = data;

  waterfall(
    [
      (cb) => {
        Model.findById(id, cb);
      },
      (user, cb) => {
        if (!user.validatePassword(oldPassword)) {
          return res
            .status(FORBIDDEN)
            .json({ message: "Старый пароль неверный" });
        }

        if (!password || password !== repPassword) {
          return res
            .status(FORBIDDEN)
            .json({ message: "Повтор пароля неверный" });
        }

        user.email = email;
        user.username = username;
        user.password = password;

        user.save(cb);
      },
    ],
    (err, user) => {
      if (err) sendError(err, res, "update");
      sendResult(user, res, "update");
    },
  );
};

module.exports.deleteItem = (Model, id, res) => {
  Model.findByIdAndRemove(id).then(
    (result) => {
      sendResult(result, res, "delete");
    },
    (err) => {
      sendError(err, res, "delete");
    },
  );
};
