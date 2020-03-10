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
      _id: false,
      email: true,
      profile: true
    }
  );
});

router.post("/", isAuth, (req, res, next) => {
  crud.updateItem(
    Model,
    userId(req.session.token, next),
    {
      profile: req.body.data
    },
    res
  );
});

module.exports = router;
