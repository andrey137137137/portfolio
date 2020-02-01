const express = require("express");
const router = express.Router();

const ctrlCrud = require("../controllers/crud");
const ctrlAvatar = require("../controllers/avatar");

router.get("/slide", ctrlCrud.getSlides); // READ
router.post("/slide", ctrlCrud.createSlide); // CREATE
router.put("/slide/:id", ctrlCrud.updateSlide); // UPDATE
router.delete("/slide/:id", ctrlCrud.deleteSlide); // DELETE

router.get("/skill", ctrlCrud.getSkills); // READ
router.post("/skill", ctrlCrud.createSkill); // CREATE
router.put("/skill/:id", ctrlCrud.updateSkill); // UPDATE
router.delete("/skill/:id", ctrlCrud.deleteSkill); // DELETE

router.get("/post", ctrlCrud.getPosts); // READ
router.post("/post", ctrlCrud.createPost); // CREATE
router.put("/post/:id", ctrlCrud.updatePost); // UPDATE
router.delete("/post/:id", ctrlCrud.deletePost); // DELETE

router.get("/user", ctrlCrud.getUser); // READ
router.post("/user", ctrlCrud.createUser); // CREATE
router.put("/user/:id", ctrlCrud.updateUser); // UPDATE
router.delete("/user/:id", ctrlCrud.deleteUser); // DELETE

router.get("/avatar", ctrlAvatar.getAvatar);
router.post("/avatar", ctrlAvatar.setAvatar);

router.get("*", (req, res) => {
  res.status(404).json({ msg: "Not found", err: 404 });
});

module.exports = router;
