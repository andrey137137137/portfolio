// const passport = require("passport");
const router = require("express").Router();
const Model = require("mongoose").model("user");

// const auth = require("./auth");
const ctrlCrud = require("../../controllers/crud");

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

router.get("/", (req, res) => {
  ctrlCrud.getItems(Model, res);
}); // READ

router.post("/", (req, res) => {
  ctrlCrud.createItem(
    Model,
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

router.put("/:id", (req, res) => {
  ctrlCrud.updateItem(
    Model,
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

router.delete("/:id", (req, res) => {
  ctrlCrud.deleteItem(Model, req.params.id, res);
}); // DELETE

// //POST login route (optional, everyone has access)
// router.post("/login", auth.optional, (req, res, next) => {
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

//   return passport.authenticate(
//     "local",
//     { session: false },
//     (err, passportUser, info) => {
//       if (err) {
//         return next(err);
//       }

//       if (passportUser) {
//         const user = passportUser;
//         Model.token = passportUser.generateJWT();

//         return res.json({ user: Model.toAuthJSON() });
//       }

//       return status(400).info;
//     }
//   )(req, res, next);
// });

// //GET current route (required, only authenticated users have access)
// router.get("/current", auth.required, (req, res, next) => {
//   const {
//     payload: { id }
//   } = req;

//   return Model.findById(id).then(user => {
//     if (!user) {
//       return res.sendStatus(400);
//     }

//     return res.json({ user: user.toAuthJSON() });
//   });
// });

module.exports = router;
