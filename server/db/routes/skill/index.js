const router = require("express").Router();
const Model = require("mongoose").model("skill");

const auth = require("../api/auth");
const crud = require("../api/crud");

router.get("/", (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", (req, res) => {
  crud.createItem(
    Model,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // CREATE

router.put("/:id", (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // UPDATE

router.delete("/:id", (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

module.exports = router;
