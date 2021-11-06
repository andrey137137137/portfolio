const router = require('express').Router();
const Model = require('mongoose').model('comment');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');

router.get('/:for', (req, res) => {
  // router.get('/', (req, res) => {
  const sort = { date: 1 };
  const filter = {};

  if (req.params.for == 'front') {
    filter.isPublished = true;
  }

  crud.getItems(Model, res, sort, { filter });
});

router.post('/', isAuth, (req, res) => {
  const { author, position, email, description } = req.body;
  crud.createItem(Model, res, {
    author,
    position,
    email,
    description,
  });
});

router.put('/:id', isAuth, (req, res) => {
  const { author, position, email, description, date, isPublished } = req.body;
  crud.updateItem(Model, res, req.params.id, {
    author,
    position,
    description,
    email,
    date: new Date(date),
    isPublished,
  });
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, res, req.params.id);
});

module.exports = router;
