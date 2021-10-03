const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = require('@httpSt');
const waterfall = require('async/waterfall');

const getQueryTypes = {
  many: 'find',
  one: 'findOne',
  id: 'findById',
};

function getMessage(mode, isError = false) {
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
}

function getValidatedObjects(params, keys) {
  const result = {};
  keys.forEach(key => {
    result[key] = !params[key] ? {} : params[key];
  });
  return result;
}

function getGetParams(params, mode) {
  const keys = ['fields', 'options', 'filter'];

  if (mode == 'one') {
    keys.length = 2;
  }

  return getValidatedObjects(params, keys);
}

function get(Model, res, params, mode = 'many', cb = false) {
  const method = mode ? getQueryTypes[mode] : getQueryTypes['many'];
  const { filter, fields, options } = getGetParams(params, mode);

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
}

function update(Model, res, params, cb = false) {
  const { query, data } = getValidatedObjects(params, ['query', 'data']);
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
}

const createItem = (Model, res, data, cb = false) => {
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

const deleteItem = (Model, res, id, cb = false) => {
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

const getItemById = (Model, res, id, params, cb = false) => {
  get(Model, res, { ...params, filter: id }, 'id', cb);
};

const getItem = (Model, res, params, cb = false) => {
  get(Model, res, params, 'one', cb);
};

const getItems = (Model, res, sort, params) => {
  get(Model, res, { ...params, options: { sort } });
};

const updateItem = (Model, res, id, data, cb = false) => {
  update(Model, res, { query: { id }, data }, cb);
};

const updateItemByQuery = (Model, res, params, cb = false) => {
  update(Model, res, params, cb);
};

const updateUserPassword = (Model, res, id, data) => {
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
