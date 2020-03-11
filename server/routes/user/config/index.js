const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth, userId } = require("@auth");
const crud = require("@contr/crud");

router.get("/", isAuth, (req, res, next) => {
  crud.getItemById(Model, res, userId(req.session.token, next), {
    _id: false,
    email: true,
    username: true
  });
});

router.post("/", isAuth, (req, res, next) => {
  const { email, username, password } = req.body;

  crud.updateItem(
    Model,
    userId(req.session.token, next),
    {
      email,
      username,
      password
    },
    res
  );
});

module.exports = router;
