const express = require("express");
const router = express.Router();

const ctrlSkill = require("../controllers/skill");
const ctrlPost = require("../controllers/post");
const ctrlSlide = require("../controllers/slide");
const ctrlAvatar = require("../controllers/avatar");

router.get("/skill", ctrlSkill.getSkills); // READ
router.post("/skill", ctrlSkill.createSkill); // CREATE
router.put("/skill/:id", ctrlSkill.updateSkill); // UPDATE
router.delete("/skill/:id", ctrlSkill.deleteSkill); // DELETE

router.get("/slide", ctrlSlide.getSlides); // READ
router.post("/slide", ctrlSlide.createSlide); // CREATE
router.put("/slide/:id", ctrlSlide.updateSlide); // UPDATE
router.delete("/slide/:id", ctrlSlide.deleteSlide); // DELETE

router.get("/post", ctrlPost.getArticles); // READ
router.post("/post", ctrlPost.createArticle); // CREATE
router.put("/post/:id", ctrlPost.updateArticle); // UPDATE
router.delete("/post/:id", ctrlPost.deleteArticle); // DELETE

router.get("/avatar", ctrlAvatar.getAvatar);
router.post("/avatar", ctrlAvatar.setAvatar);

router.get("*", (req, res) => {
  res.status(404).json({ msg: "Not found", err: 404 });
});

module.exports = router;
