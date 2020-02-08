const router = require("express").Router();

const ctrlUpload = require("../controllers/upload");

router.post("/avatar", ctrlUpload.avatar);
router.post("/slider", ctrlUpload.slider);
router.post("/comments", ctrlUpload.comments);

// router.get("*", (req, res) => {
//   res.status(404).json({ msg: "Not found", err: 404 });
// });

module.exports = router;
