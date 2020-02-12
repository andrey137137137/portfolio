const passport = require("passport");
const LocalStrategy = require("passport-local");

const Model = require("mongoose").model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[userName]",
      passwordField: "user[password]"
    },
    (username, password, done) => {
      Model.findOne({ username })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { "username or password": "is invalid" }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
