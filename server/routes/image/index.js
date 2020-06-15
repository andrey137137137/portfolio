const router = require("express").Router();

const { isAuth } = require("@auth");
const upload = require("@contr/upload");

router.post("/avatar", isAuth, upload(req, res, "avatar"));
router.post("/slider", isAuth, upload(req, res, "slider"));
router.post("/about", isAuth, upload(req, res, "about"));

module.exports = router;
