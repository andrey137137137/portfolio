const router = require('express').Router();
const Model = require('mongoose').model('user');

const { isAuth, userId } = require('@auth');
const crud = require('@contr/crud');

router.get('/', isAuth, (req, res, next) => {
  crud.getItemById(Model, res, userId(req.session.token, next), {
    _id: 0,
    email: 1,
    username: 1,
  });
});

router.post('/', isAuth, (req, res, next) => {
  const cond = !req.body.oldPassword && !req.body.password;
  const FUNC = cond ? 'updateItem' : 'updateUserPassword';

  crud[FUNC](
    Model,
    userId(req.session.token, next),
    cond
      ? {
          email: req.body.email,
          username: req.body.username,
        }
      : req.body,
    res,
  );
});

module.exports = router;
