const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
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
    required: [true, "Укажите картинку работы"]
  },
  techs: {
    type: Array,
    required: [true, "Укажите картинку работы"]
  }
});

// просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model("slide", SlideSchema);
