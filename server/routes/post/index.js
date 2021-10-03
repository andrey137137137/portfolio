const router = require('express').Router();
const Model = require('mongoose').model('post');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');

router.get('/', (req, res) => {
  crud.getItems(Model, res, { title: 1 });
});

router.post('/', isAuth, (req, res) => {
  crud.createItem(Model, res, {
    title: req.body.title,
    date: new Date(),
    body: req.body.text,
  });
});

router.put('/:id', isAuth, (req, res) => {
  crud.updateItem(Model, res, req.params.id, {
    title: req.body.title,
    date: new Date(req.body.date),
    body: req.body.text,
  });
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, res, req.params.id);
});

module.exports = router;
