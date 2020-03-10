const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const {
  SIGNATURE
  // EXPIRATION
} = require("@config").jwt;
const { isAuth } = require("@auth");
const crud = require("@contr/crud");

router.get("/", (req, res) => {
  crud.getItem(Model, res, { _id: false, profile: true });
}); // READ

router.post("/", isAuth, (req, res) => {
  jwt.verify(req.session.token, SIGNATURE, (err, decoded) => {
    if (err) next(err);

    crud.updateItem(
      Model,
      decoded.id,
      {
        profile: req.body.data
      },
      res
    );
  });
}); // UPDATE

module.exports = router;
