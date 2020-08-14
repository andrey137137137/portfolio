const router = require('express').Router();
const Model = require('mongoose').model('comment');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');

router.get('/', (req, res) => {
  crud.getItems(Model, res, { date: 1 });
});

router.post('/', isAuth, (req, res) => {
  const { author, position, description } = req.body;
  crud.createItem(
    Model,
    {
      author,
      position,
      description,
      date: new Date(),
    },
    res,
  );
});

router.put('/:id', isAuth, (req, res) => {
  const { author, position, description, date } = req.body;
  crud.updateItem(
    Model,
    req.params.id,
    {
      author,
      position,
      description,
      date: new Date(date),
    },
    res,
  );
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
});

module.exports = router;
