const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  title: {
    type: String,
    required: [true, "Укажите заголовок работы"]
  },
  link: {
    type: String,
    required: [true, "Укажите ссылку работы"]
  },
  image: {
    type: String,
    default: ""
  },
  techs: {
    type: Array,
    required: [true, "Укажите картинку работы"]
  }
});

mongoose.model("work", WorkSchema);
