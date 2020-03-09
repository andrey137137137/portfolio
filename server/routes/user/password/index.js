const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth } = require("@auth");
const crud = require("@contr/crud");

router.get("/", isAuth, (req, res) => {
  crud.getItems(Model, res, { email, username });
}); // READ

router.put("/:id", isAuth, (req, res) => {
  const { email, username, password } = req.body;

  crud.updateItem(
    Model,
    req.params.id,
    {
      email,
      username,
      password
    },
    res
  );
}); // UPDATE

module.exports = router;
