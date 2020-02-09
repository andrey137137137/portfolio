const router = require("express").Router();

router.use("/image", require("./image"));
router.use("/slide", require("./slide"));
router.use("/skill", require("./skill"));
router.use("/post", require("./post"));
router.use("/user", require("./user"));

// router.get("*", (req, res) => {
//   res.status(404).json({ msg: "Not found", err: 404 });
// });

module.exports = router;
