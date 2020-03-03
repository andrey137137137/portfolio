const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");
const { salt } = require("../../api/config").session;

const { Schema } = mongoose;

const ContactSchema = new Schema({
  icon: {
    type: String
  },
  name: {
    type: String
  },
  value: {
    type: String
  }
});

const UserSchema = new Schema({
  profile: {
    firstName: {
      type: String,
      required: [true, "Укажите описание картинки"]
    },
    lastName: {
      type: String,
      required: [true, "Укажите описание картинки"]
    },
    contacts: {
      type: Array,
      children: [ContactSchema]
    }
  },
  username: {
    type: String,
    // unique: true,
    required: [true, "Укажите описание картинки"]
  },
  password: {
    type: String
    // required: [true, "Укажите описание картинки"]
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) return next(err);

  // hash the password using our new salt
  bcrypt.hash(user.password, salt, function(err, hash) {
    if (err) {
      return next(err);
    }

    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
  // });
});

// UserSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//     .toString("hex");
// };

UserSchema.methods.validatePassword = function(password, cb) {
  // const hash = crypto
  //   .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
  //   .toString("hex");
  // return this.hash === hash;

  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

// UserSchema.methods.generateJWT = function() {
//   const today = new Date();
//   const expirationDate = new Date(today);
//   expirationDate.setDate(today.getDate() + 60);

//   return jwt.sign(
//     {
//       email: this.email,
//       id: this._id,
//       exp: parseInt(expirationDate.getTime() / 1000, 10)
//     },
//     "secret"
//   );
// };

// UserSchema.methods.toAuthJSON = function() {
//   return {
//     _id: this._id,
//     email: this.email,
//     token: this.generateJWT()
//   };
// };

mongoose.model("user", UserSchema);
