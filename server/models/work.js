const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите заголовок работы'],
  },
  link: {
    type: String,
    required: [true, 'Укажите ссылку работы'],
  },
  imageNames: {
    type: Array,
    default: [],
  },
  techs: {
    type: Array,
    default: [],
  },
});

mongoose.model('work', WorkSchema);
