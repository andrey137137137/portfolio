const mongoose = require("mongoose");
// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = mongoose.model("user");

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //   console.log(user);
    //   done(err, user);
    // });
    User.findById(id, done);
  });

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (!user.validatePassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  passport.authenticationMiddleware = require("./routes/auth").isAuth;
};
