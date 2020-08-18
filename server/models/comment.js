const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: [true, 'Укажите автора отзыва'],
  },
  email: {
    type: String,
    required: [true, 'Укажите email отзыва'],
  },
  position: {
    type: String,
    required: [true, 'Укажите должность отзыва'],
  },
  description: {
    type: String,
    required: [true, 'Укажите содержимое отзыва'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

mongoose.model('comment', CommentSchema);
