const router = require("express").Router();
const Model = require("mongoose").model("post");

const auth = require("../auth");
const crud = require("../../controllers/crud");

router.get("/", (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", (req, res) => {
  crud.createItem(
    Model,
    {
      title: req.body.title,
      date: new Date(),
      body: req.body.text
    },
    res
  );
}); // CREATE

router.put("/:id", (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      title: req.body.title,
      date: new Date(req.body.date),
      body: req.body.text
    },
    res
  );
}); // UPDATE

router.delete("/:id", (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

module.exports = router;
