const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = mongoose.model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[userName]",
      passwordField: "user[password]"
    },
    (userName, password, done) => {
      User.findOne({ userName })
        .then(user => {
          console.log(user);

          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "userName or password": "is invalid" }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
