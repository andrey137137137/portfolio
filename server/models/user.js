const mongoose = require('mongoose');
const hmacSha512 = require('crypto-js/hmac-sha512');

const { SALT } = require('@config').db;

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
  },
  href: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Укажите имя пользователя'],
  },
  lastName: {
    type: String,
    required: [true, 'Укажите фамилию пользователя'],
  },
  old: {
    type: Number,
    required: [true, 'Укажите возраст пользователя'],
  },
  contacts: {
    type: Array,
    children: [ContactSchema],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Укажите email пользователя'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Укажите nikname пользователя'],
  },
  password: {
    type: String,
  },
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = hmacSha512(this.password, SALT).toString();
  next();
});

UserSchema.methods.validatePassword = function(password) {
  return this.password === hmacSha512(password, SALT).toString();
};

mongoose.model('user', UserSchema);
