const passport = require("passport");
const router = require("express").Router();
const Model = require("mongoose").model("user");

const auth = require("../auth");
const crud = require("../../controllers/crud");

// //POST new user route (optional, everyone has access)
// router.post("/", auth.optional, (req, res, next) => {
//   const {
//     body: { user }
//   } = req;

//   if (!Model.email) {
//     return res.status(422).json({
//       errors: {
//         email: "is required"
//       }
//     });
//   }

//   if (!Model.password) {
//     return res.status(422).json({
//       errors: {
//         password: "is required"
//       }
//     });
//   }

//   const finalUser = new Model(user);

//   finalUser.setPassword(Model.password);

//   return finalUser
//     .save()
//     .then(() => res.json({ user: finalUser.toAuthJSON() }));
// });

router.get("/", auth.optional, (req, res) => {
  crud.getItems(Model, res);
}); // READ

router.post("/", auth.required, (req, res) => {
  crud.createItem(
    Model,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      contacts: req.body.contacts
    },
    res
  );
}); // CREATE

router.put("/:id", auth.required, (req, res) => {
  crud.updateItem(
    Model,
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      contacts: req.body.contacts
    },
    res
  );
}); // UPDATE

router.delete("/:id", auth.required, (req, res) => {
  crud.deleteItem(Model, req.params.id, res);
}); // DELETE

router.get("/test", (req, res) => {
  res.send("hello world");
});

const authenticate = passport.authenticate("local", {
  session: false,
  successRedirect: "/home",
  failureRedirect: "/login"
});

//POST login route (optional, everyone has access)
router.post("/auth", authenticate, (req, res, next) => {
  // const user = {
  //   userName: req.params.username,
  //   password: req.params.password
  // };
  // console.log(user);
  // if (!user.userName) {
  //   return res.status(422).json({
  //     errors: {
  //       userName: "is required"
  //     }
  //   });
  // }
  // if (!user.password) {
  //   return res.status(422).json({
  //     errors: {
  //       password: "is required"
  //     }
  //   });
  // }
  // // res.send(`hello user ${username}`);
  // return passport.authenticate(
  //   "local",
  //   { session: false },
  //   (err, passportUser, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (passportUser) {
  //       const user = passportUser;
  //       user.token = passportUser.generateJWT();
  //       return res.status(200).json({ user: user.toAuthJSON() });
  //     }
  //     console.log(info);
  //     return res.status(400).send(info);
  //   }
  // )(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Model.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = router;
