const router = require('express').Router();
const Model = require('mongoose').model('skill');

const { isAuth } = require('@auth');
const crud = require('@contr/crud');

router.get('/', (req, res) => {
  crud.getItems(Model, res, { _id: 1 });
});

router.post('/', isAuth, (req, res) => {
  crud.createItem(Model, res, {
    category: req.body.category,
    items: req.body.items,
  });
});

router.put('/:id', isAuth, (req, res) => {
  crud.updateItem(Model, res, req.params.id, {
    category: req.body.category,
    items: req.body.items,
  });
});

router.delete('/:id', isAuth, (req, res) => {
  crud.deleteItem(Model, res, req.params.id);
});

module.exports = router;
