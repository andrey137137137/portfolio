const router = require("express").Router();
const Model = require("mongoose").model("skill");

const auth = require("../auth");
const crud = require("../../controllers/crud");

router.get("/", auth.optional, (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", auth.required, (req, res) => {
  crud.createItem(
    Model,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // CREATE

router.put("/:id", auth.required, (req, res) => {
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

router.delete("/:id", auth.required, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

module.exports = router;
