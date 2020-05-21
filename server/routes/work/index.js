const router = require("express").Router();
const Model = require("mongoose").model("work");

const { isAuth } = require("@auth");
const crud = require("@contr/crud");

router.get("/", (req, res) => {
  crud.getItems(Model, res);
});

router.post("/", isAuth, (req, res) => {
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
});

router.put("/:id", isAuth, (req, res) => {
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
});

router.delete("/:id", isAuth, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
});

module.exports = router;
