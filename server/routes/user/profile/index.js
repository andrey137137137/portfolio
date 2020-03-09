const router = require("express").Router();
const Model = require("mongoose").model("user");

const isAuth = require("@auth");
const crud = require("@contr/crud");

router.get("/", (req, res) => {
  crud.getItems(Model, res, { profile });
}); // READ

router.put("/:id", isAuth, (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      profile: req.body.data
    },
    res
  );
}); // UPDATE

module.exports = router;
