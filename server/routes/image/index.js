const router = require("express").Router();

const auth = require("../auth");
const upload = require("../../controllers/upload");

router.post("/avatar", auth.required, upload.avatar);
router.post("/slider", auth.required, upload.slider);
router.post("/comments", auth.required, upload.comments);

module.exports = router;
