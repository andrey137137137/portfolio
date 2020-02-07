const express = require("express");
const router = express.Router();

const ctrlCrud = require("../controllers/crud");
const ctrlAvatar = require("../controllers/avatar");

router.use("/user", require("./user"));

router.get("/slide", (req, res) => {
  ctrlCrud.getItems("slide", res);
}); // READ
router.post("/slide", (req, res) => {
  ctrlCrud.createItem(
    "slide",
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
}); // CREATE
router.put("/slide/:id", (req, res) => {
  ctrlCrud.updateItem(
    "slide",
    req.params.id,
    {
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      techs: req.body.techs
    },
    res
  );
}); // UPDATE
router.delete("/slide/:id", (req, res) => {
  ctrlCrud.deleteItem("slide", req.params.id, res);
}); // DELETE

router.get("/skill", (req, res) => {
  ctrlCrud.getItems("skill", res);
}); // READ
router.post("/skill", (req, res) => {
  ctrlCrud.createItem(
    "skill",
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // CREATE
router.put("/skill/:id", (req, res) => {
  ctrlCrud.updateItem(
    "skill",
    req.params.id,
    {
      category: req.body.category,
      items: req.body.items
    },
    res
  );
}); // UPDATE
router.delete("/skill/:id", (req, res) => {
  ctrlCrud.deleteItem("skill", req.params.id, res);
}); // DELETE

router.get("/post", (req, res) => {
  ctrlCrud.getItems("post", res);
}); // READ
router.post("/post", (req, res) => {
  ctrlCrud.createItem(
    "post",
    {
      title: req.body.title,
      date: new Date(),
      body: req.body.text
    },
    res
  );
}); // CREATE
router.put("/post/:id", (req, res) => {
  ctrlCrud.updateItem(
    "post",
    req.params.id,
    {
      title: req.body.title,
      date: new Date(req.body.date),
      body: req.body.text
    },
    res
  );
}); // UPDATE
router.delete("/post/:id", (req, res) => {
  ctrlCrud.deleteItem("post", req.params.id, res);
}); // DELETE

router.get("/user", (req, res) => {
  ctrlCrud.getItems("user", res);
}); // READ
router.post("/user", (req, res) => {
  ctrlCrud.createItem(
    "user",
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      avatar: req.body.avatar,
      contacts: req.body.contacts
    },
    res
  );
}); // CREATE
router.put("/user/:id", (req, res) => {
  ctrlCrud.updateItem(
    "user",
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      avatar: req.body.avatar,
      contacts: req.body.contacts
    },
    res
  );
}); // UPDATE
router.delete("/user/:id", (req, res) => {
  ctrlCrud.deleteItem("user", req.params.id, res);
}); // DELETE

router.get("/avatar", ctrlAvatar.getAvatar);
router.post("/avatar", ctrlAvatar.setAvatar);

// router.get("*", (req, res) => {
//   res.status(404).json({ msg: "Not found", err: 404 });
// });

module.exports = router;
