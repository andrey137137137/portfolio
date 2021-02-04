const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = require('@httpSt');
const waterfall = require('async/waterfall');

const getMessage = (mode, isError = false) => {
  switch (mode) {
    case 'find':
      return 'чтении записей';
    case 'findOne':
      return 'чтении записи';
    case 'insert':
      if (isError) return 'добавлении записи';
      return 'добавлена';
    case 'update':
      if (isError) return 'обновлении записи';
      return 'обновлена';
    case 'delete':
      if (isError) return 'удалении записи';
      return 'удалена';
  }
};

const sendResult = (result, res, mode = 'insert') => {
  if (!result) {
    let message = 'Запись в БД не обнаружена';

    if (mode == 'insert') {
      message = 'Невозможно добавить новую запись в БД';
    }

    return res.status(NOT_FOUND).json({ message });
  }

  const data = { message: 'Запись успешно ' + getMessage(mode) };

  if (mode == 'insert') {
    data._id = result._id;
  }

  res.status(SUCCESS).json(data);
};

const sendError = (err, res, mode) => {
  res.status(ERROR).json({
    message: `При ${getMessage(mode, true)} произошла ошибка: ${err}`,
  });
};

const get = (
  Model,
  res,
  filter,
  fields,
  options,
  mode = 'many',
  cb = false,
) => {
  const types = {
    many: 'find',
    one: 'findOne',
    id: 'findById',
  };
  const method = types[mode];

  if (cb !== false) {
    return Model[method](filter, fields, options, cb);
  }

  Model[method](filter, fields, options)
    .then(result => {
      res.status(SUCCESS).json({ result });
    })
    .catch(err => {
      sendError(err, res, mode == 'many' ? 'find' : 'findOne');
    });
};

const getItemById = (Model, res, id, fields = {}, options = {}, cb = false) => {
  get(Model, res, id, fields, options, 'id', cb);
};

const getItem = (
  Model,
  res,
  filter = {},
  fields = {},
  options = {},
  cb = false,
) => {
  get(Model, res, filter, fields, options, 'one', cb);
};

const getItems = (Model, res, sort, filter = {}, fields = {}) => {
  get(Model, res, filter, fields, { sort });
};

const createItem = (Model, data, res, cb = false) => {
  const item = new Model(data);

  if (cb !== false) {
    return item.save(cb);
  }

  item
    .save()
    .then(result => {
      sendResult(result, res, 'insert');
    })
    .catch(err => {
      sendError(err, res, 'insert');
    });
};

const update = (Model, query, data, res, cb = false) => {
  const method = query.id ? 'findByIdAndUpdate' : 'findOneAndUpdate';
  const filter = query.id ? query.id : query;

  if (cb !== false) {
    return Model[method](filter, { $set: data }, cb);
  }

  Model[method](filter, { $set: data })
    .then(result => {
      sendResult(result, res, 'update');
    })
    .catch(err => {
      sendError(err, res, 'update');
    });
};

const updateItem = (Model, id, data, res, isNotCB = false) => {
  update(Model, { id }, data, res, isNotCB);
};

const updateItemByQuery = (Model, query, data, res, isNotCB = false) => {
  update(Model, query, data, res, isNotCB);
};

const updateUserPassword = (Model, id, data, res) => {
  const { email, username, oldPassword, password, repPassword } = data;

  waterfall(
    [
      cb => {
        Model.findById(id, cb);
      },
      (user, cb) => {
        if (!user.validatePassword(oldPassword)) {
          return res
            .status(FORBIDDEN)
            .json({ message: 'Старый пароль неверный' });
        }

        if (!password || password !== repPassword) {
          return res
            .status(FORBIDDEN)
            .json({ message: 'Повтор пароля неверный' });
        }

        user.email = email;
        user.username = username;
        user.password = password;

        user.save(cb);
      },
    ],
    (err, user) => {
      if (err) {
        sendError(err, res, 'update');
      }

      sendResult(user, res, 'update');
    },
  );
};

const deleteItem = (Model, id, res, cb = false) => {
  if (cb !== false) {
    return Model.findByIdAndRemove(id, cb);
  }

  Model.findByIdAndRemove(id).then(
    result => {
      sendResult(result, res, 'delete');
    },
    err => {
      sendError(err, res, 'delete');
    },
  );
};

module.exports = {
  sendResult,
  sendError,
  getItemById,
  getItem,
  getItems,
  createItem,
  updateItem,
  updateItemByQuery,
  updateUserPassword,
  deleteItem,
};
