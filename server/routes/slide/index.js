const router = require("express").Router();
const Model = require("mongoose").model("slide");

const auth = require("../auth");
const crud = require("../../controllers/crud");

router.get("/", auth.optional, (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", auth.required, (req, res) => {
  crud.createItem(
    Model,
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
}); // CREATE

router.put("/:id", auth.required, (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
}); // UPDATE

router.delete("/:id", auth.required, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

module.exports = router;
