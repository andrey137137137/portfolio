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
    // required: ""
  },
  techs: {
    type: Array,
    required: [true, "Укажите картинку работы"]
  }
});

// просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model("work", WorkSchema);
