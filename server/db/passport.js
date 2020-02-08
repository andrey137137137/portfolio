const passport = require("passport");
const LocalStrategy = require("passport-local");

const user = require("mongoose").model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[userName]",
      passwordField: "user[password]"
    },
    (userName, password, done) => {
      user
        .findOne({ userName })
        .then(user => {
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
