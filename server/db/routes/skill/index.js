const router = require("express").Router();
const Model = require("mongoose").model("skill");

const ctrlCrud = require("../../controllers/crud");

router.get("/", (req, res) => {
  ctrlCrud.getItems(Model, res);
}); // READ

router.post("/", (req, res) => {
  ctrlCrud.createItem(
    Model,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // CREATE

router.put("/:id", (req, res) => {
  ctrlCrud.updateItem(
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
  ctrlCrud.deleteItem(Model, req.params.id, res);
}); // DELETE

module.exports = router;
