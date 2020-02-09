const router = require("express").Router();

const auth = require("../auth");
const upload = require("../../controllers/upload");

router.post("/avatar", upload.avatar);
router.post("/slider", upload.slider);
router.post("/comments", upload.comments);

module.exports = router;
