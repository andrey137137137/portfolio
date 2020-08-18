const router = require('express').Router();
const Model = require('mongoose').model('comment');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');

router.get('/', (req, res) => {
  const sort = { date: 1 };

  if (!req.session.token) sort.isPublished = true;

  crud.getItems(Model, res, sort);
});

router.post('/', isAuth, (req, res) => {
  const { author, position, email, description } = req.body;
  crud.createItem(
    Model,
    {
      author,
      position,
      email,
      description,
    },
    res,
  );
});

router.put('/:id', isAuth, (req, res) => {
  const { author, position, email, description, date, isPublished } = req.body;
  crud.updateItem(
    Model,
    req.params.id,
    {
      author,
      position,
      description,
      email,
      date: new Date(date),
      isPublished,
    },
    res,
  );
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
});

module.exports = router;
