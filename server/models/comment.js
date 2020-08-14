const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: [true, 'Укажите автора отзыва'],
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
    required: [true, 'Укажите дату отзыва'],
  },
});

mongoose.model('comment', CommentSchema);
