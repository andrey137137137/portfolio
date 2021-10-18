const router = require('express').Router();
const Model = require('mongoose').model('user');

const { isAuth, userId } = require('@auth');
const crud = require('@contr/crud');

router.get('/', isAuth, (req, res, next) => {
  crud.getItemById(Model, res, userId(req.session.token, next), {
    fields: {
      _id: 0,
      // _id: 1,
      email: 1,
      username: 1,
    },
  });
});

router.post('/', isAuth, (req, res, next) => {
  const cond = !req.body.oldPassword && !req.body.password;
  const FUNC = cond ? 'updateItem' : 'updateUserPassword';
  const data = cond
    ? {
        email: req.body.email,
        username: req.body.username,
      }
    : req.body;
  crud[FUNC](Model, res, userId(req.session.token, next), data);
});

module.exports = router;
