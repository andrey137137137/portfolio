const router = require("express").Router();

const { isAuth } = require("@auth");
const upload = require("@contr/upload");

router.post("/avatar", isAuth, upload.avatar);
router.post("/slider", isAuth, upload.slider);
router.post("/comments", isAuth, upload.comments);

module.exports = router;
