function getMessage(mode, isError = false) {
  switch (mode) {
    case "find":
      return "чтении записей";
    case "findOne":
      return "чтении записи";
    case "insert":
      if (isError) return "добавление записи";
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

    return res.status(404).json({ status: "Запись в БД не обнаружена" });
  }

  res.status(200).json({ status: "Запись успешно " + getMessage(mode) });
}

function sendError(err, res, mode) {
  res.status(500).json({
    status: `При ${getMessage(mode, true)} произошла ошибка: ${err}`
  });
}

function get(Model, res, filter, fields, mode = "many") {
  const types = {
    many: "find",
    one: "findOne",
    id: "findById"
  };
  const method = types[mode];

  Model[method](filter, fields)
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(sendError(err, res, mode == "many" ? "find" : "findOne"));
}

function update(Model, query, data, res) {
  const FUNC = query.id ? "findByIdAndUpdate" : "findOneAndUpdate";
  const filter = query.id ? query.id : query;

  Model[FUNC](filter, { $set: data })
    .then(sendResult(result, res, "update"))
    .catch(sendError(err, res, "update"));
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
    .then(sendResult(result, res, "insert"))
    .catch(sendError(err, res, "insert"));
};

module.exports.updateItem = (Model, id, data, res) => {
  update(Model, { id }, data, res);
};

module.exports.updateItemByQuery = (Model, query, data, res) => {
  update(Model, query, data, res);
};

module.exports.deleteItem = (Model, id, res) => {
  Model.findByIdAndRemove(id).then(
    sendResult(result, res, "delete"),
    sendError(err, res, "delete")
  );
};
