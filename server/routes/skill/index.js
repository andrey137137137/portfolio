const router = require("express").Router();
const Model = require("mongoose").model("skill");

const { isAuth } = require("@auth");
const crud = require("@contr/crud");

router.get("/", (req, res) => {
  crud.getItems(Model, res);
});

router.post("/", isAuth, (req, res) => {
  crud.createItem(
    Model,
    {
      category: req.body.category,
      items: req.body.items,
    },
    res,
  );
});

router.put("/:id", isAuth, (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      category: req.body.category,
      items: req.body.items,
    },
    res,
  );
});

router.delete("/:id", isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
});

module.exports = router;
