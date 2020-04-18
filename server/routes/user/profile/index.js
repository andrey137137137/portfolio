const router = require("express").Router();
const Model = require("mongoose").model("user");

const { isAuth, userId } = require("@auth");
const crud = require("@contr/crud");

router.get("/", (req, res) => {
  crud.getItem(
    Model,
    res,
    {},
    {
      _id: 0,
      __v: 0,
      username: 0,
      password: 0,
    },
  );
});

router.post("/", isAuth, (req, res, next) => {
  const { firstName, lastName, contacts } = req.body;

  crud.updateItem(
    Model,
    userId(req.session.token, next),
    {
      firstName,
      lastName,
      contacts,
    },
    res,
  );
});

module.exports = router;
