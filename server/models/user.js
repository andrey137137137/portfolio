const mongoose = require("mongoose");
const crypto = require("crypto-js/hmac-sha512");
const { SALT } = require("@config").db;

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
  email: {
    type: String,
    unique: true,
    required: [true, "Укажите описание картинки"]
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Укажите описание картинки"]
  },
  password: {
    type: String
    // required: [true, "Укажите описание картинки"]
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();

  this.password = crypto(this.password, SALT).toString();
  next();
});

// UserSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//     .toString("hex");
// };

UserSchema.methods.validatePassword = function(password) {
  // const hash = crypto
  //   .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
  //   .toString("hex");
  // return this.hash === hash;

  return this.password === crypto(password, SALT).toString();
};

mongoose.model("user", UserSchema);
