const router = require("express").Router();

const ctrlAvatar = require("../controllers/avatar");

router.use("/slide", require("./slide"));
router.use("/skill", require("./skill"));
router.use("/post", require("./post"));
router.use("/user", require("./user"));

router.get("/avatar", ctrlAvatar.getAvatar);
router.post("/avatar", ctrlAvatar.setAvatar);

// router.get("*", (req, res) => {
//   res.status(404).json({ msg: "Not found", err: 404 });
// });

module.exports = router;
