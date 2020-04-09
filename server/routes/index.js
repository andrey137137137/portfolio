// const { NOT_FOUND } = require("@httpSt");
const router = require("express").Router();

router.use("/image", require("./image"));
router.use("/work", require("./work"));
router.use("/skill", require("./skill"));
router.use("/post", require("./post"));
router.use("/user", require("./user"));

// router.get("*", (req, res) => {
//   res.status(NOT_FOUND).json({ msg: "Not found", err: NOT_FOUND });
// });

module.exports = router;
