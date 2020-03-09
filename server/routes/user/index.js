const router = require("express").Router();
const Model = require("mongoose").model("user");

router.get("/reg", (req, res) => {
  const User = new Model({
    profile: {
      firstName: "Андрей",
      lastName: "Банников",
      contacts: []
    },
    username: "andrey21",
    password: ""
  });

  return User.save().then(() => res.json({ user: User }));
});

router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/password", require("./password"));

module.exports = router;
